# Deployment — Butler AI Live Demo

End-to-end runbook to take the Butler AI demo from "code merged" to "guests can actually talk to it on production."

There are three moving pieces:

1. **Frontend (this repo)** — Next.js app on Vercel.
2. **Agent backend** — FastAPI service (Asterisk + LangGraph + RAG) on Railway.
3. **Rate-limit store** — Upstash Redis serverless instance.

Everything is wired so the frontend calls `/api/agent/text` and `/api/agent/audio`, those routes enforce limits via Upstash, and on success they proxy to the FastAPI agent. The agent is the only piece that needs heavy compute; everything else is serverless.

---

## 0. What you need before starting

- A Railway account (https://railway.app) — for the FastAPI agent.
- A Vercel account connected to the GitHub repo.
- An Upstash account (https://console.upstash.com) — Redis serverless.
- The agent backend repo (separate from this one) cloned and ready to push.
- Any third-party API keys the agent needs (OpenAI, ElevenLabs, Twilio SIP creds, etc.) — exact list lives in the agent repo's `.env.example`.

---

## 1. Stand up the FastAPI agent on Railway

The agent is the single biggest dependency. Get it green first; the frontend is useless without it.

### 1a. Create a Railway project

1. Sign in to https://railway.app.
2. **New Project → Deploy from GitHub repo** → select the agent repo.
3. Railway auto-detects FastAPI via the `Procfile` or `requirements.txt`. If detection misses, set:
   - **Build command:** `pip install -r requirements.txt`
   - **Start command:** `uvicorn main:app --host 0.0.0.0 --port $PORT` (substitute the actual entrypoint module).

### 1b. Configure environment variables

In Railway → project → **Variables** tab, add every entry from the agent's `.env.example`:

```
OPENAI_API_KEY=...
ELEVENLABS_API_KEY=...
ASTERISK_HOST=...
TWILIO_SIP_USERNAME=...
TWILIO_SIP_PASSWORD=...
DATABASE_URL=...
# ...whatever else the agent expects
```

Pin them to the **production** environment. Don't share keys across staging if you can avoid it.

### 1c. Generate a public URL

Railway → project → **Settings → Networking → Generate Domain**. You'll get something like `butler-agent-production.up.railway.app`. Copy it — this is the value you'll set as `AGENT_API_URL` on Vercel.

### 1d. Smoke-test

```bash
curl https://butler-agent-production.up.railway.app/api/chat/text \
  -H 'Content-Type: application/json' \
  -d '{"query": "ping", "history": []}'
```

You should get a JSON body back (whatever the agent's healthy response shape is — likely `{ response, history }`). If you get a 502, check Railway logs; the most common failures are missing env vars and Asterisk SIP not reachable from Railway's egress.

### 1e. Notes / gotchas

- **Asterisk PBX:** Railway containers can outbound-dial Twilio SIP fine, but they are not great at receiving SIP traffic directly. If the agent expects inbound SIP, host Asterisk on a small VM (Hetzner CX22 is what we use elsewhere) and have the Railway agent talk to it over the network.
- **Cold starts:** Railway's free tier sleeps after inactivity. For a public demo, upgrade to the Hobby plan or higher so requests don't randomly time out.
- **Logs:** Railway's CLI (`railway logs`) is the fastest way to debug 5xx responses.

---

## 2. Stand up Upstash Redis

The frontend's rate limits require this. Without it, the demo still runs (the limiters fall back to no-op, see [`src/lib/ratelimit.ts`](../src/lib/ratelimit.ts)), but the demo is unprotected — bots can drain agent budget in minutes.

### 2a. Create the database

1. Go to https://console.upstash.com → **Create Database**.
2. **Type:** Regional (Global is overkill and more expensive for this use case).
3. **Region:** pick the same region as your Vercel deployment (e.g. `us-east-1` or `eu-west-1`). Latency matters because the limiter is in the request path.
4. **Eviction:** leave default.
5. **TLS:** on.

### 2b. Grab the REST credentials

In the database → **REST API** tab, copy:
- `UPSTASH_REDIS_REST_URL` (looks like `https://<id>.upstash.io`)
- `UPSTASH_REDIS_REST_TOKEN` (long base64 string)

These two values go to Vercel in the next step.

### 2c. Sanity check

```bash
curl https://<your-id>.upstash.io/get/test \
  -H "Authorization: Bearer <token>"
```

Should return `{"result":null}`. If you get 401, the token is wrong; if you get a network error, you copied the wrong URL.

---

## 3. Deploy the frontend on Vercel

### 3a. Connect the repo

1. https://vercel.com → **Add New → Project** → import the `soyl-website` repo.
2. **Framework preset:** Next.js (auto-detected).
3. **Root directory:** `soyl-website` (this directory — Vercel needs this set if the repo has multiple packages).
4. **Build & output:** defaults are fine — `next build` is the build command.
5. **Node version:** 20.x or 22.x (Next.js 16 requires ≥ 18.18).

### 3b. Set environment variables

Vercel → project → **Settings → Environment Variables**. Add three, scoped to **Production, Preview, and Development**:

| Variable | Value | Type |
|---|---|---|
| `AGENT_API_URL` | `https://butler-agent-production.up.railway.app` (no trailing slash) | Encrypted |
| `UPSTASH_REDIS_REST_URL` | `https://<your-id>.upstash.io` | Encrypted |
| `UPSTASH_REDIS_REST_TOKEN` | the long token from §2b | Encrypted |

**Why all three environments?** Preview deployments (PR builds) hit the same agent and same rate-limit store, so reviewers see real behavior. If you want preview to be a sandbox, point preview's `AGENT_API_URL` at a staging Railway service instead.

### 3c. Deploy

Push to `main` (or merge a PR). Vercel auto-builds. Watch the build log — failures usually fall into:
- **Missing env vars:** the build won't fail, but the demo will throw at request time. The dev no-op fallback only activates when `UPSTASH_REDIS_REST_URL` is unset; if it's set but wrong, you get a real Redis error.
- **TypeScript errors:** rare since we run lint/build locally before merging.

### 3d. Verify

After deploy:

1. **Hit the redirect:** `curl -I https://soyl.cloud/speak` → expect `308 → /products/butler-ai`.
2. **Open the demo:** `https://soyl.cloud/products/butler-ai#try-butler`. Should scroll to the Try Butler section.
3. **Send a text message** in the demo. Should round-trip through Vercel → Upstash (rate-limit check) → Railway (agent) → back. Latency target: < 2s for text, < 5s for audio.
4. **Hammer it:** in browser devtools, run a quick loop posting to `/api/agent/text` 16 times. The 16th should return 429 with `{ rate_limited: true }`. The UI should swap to the "Demo limit reached" overlay.
5. **Clear the cookie** (`butler_demo_session`) and retry — the session counter should reset.

---

## 4. Pre-launch checklist

Before publishing the demo URL anywhere public:

- [ ] Agent deployed and `curl` smoke-test returns valid JSON.
- [ ] Upstash credentials set on Vercel for **all three** environments.
- [ ] `AGENT_API_URL` points at the live Railway URL, not `localhost:8000`.
- [ ] `/speak` returns 308 to `/products/butler-ai`.
- [ ] Demo loads and a text message round-trips successfully.
- [ ] Voice mic button works in production (HTTPS is required for `getUserMedia` — Vercel handles this).
- [ ] Rate-limit overlay appears after 16 text requests in an hour.
- [ ] Session-complete overlay appears after 21 messages.
- [ ] CTAs in Navbar and homepage hero jump to `#try-butler` and the section scrolls into view (the `scroll-mt-24` on the section accounts for the sticky nav).
- [ ] Mobile: chat is the first thing visitors see; screenshots stack below.
- [ ] Founder hover interaction on `/about` still works (no regression from this round).

---

## 5. Day-2 operations

### Tuning the limits

In [`src/lib/ratelimit.ts`](../src/lib/ratelimit.ts):

```ts
export const textRatelimit  = makeLimiter('butler:text',  15, '1 h')
export const audioRatelimit = makeLimiter('butler:audio',  5, '1 h')
```

Change the numbers, redeploy, done. The Upstash analytics dashboard shows hit rates so you can tune empirically. If you bump caps significantly, also bump `MAX_MESSAGES` in [`src/lib/session-cap.ts`](../src/lib/session-cap.ts) (currently 20).

### Killing the demo temporarily

Two options:

1. **Soft kill:** set `AGENT_API_URL` on Vercel to an invalid URL. Demo loads, but every request returns the "Could not reach the AI agent" 503 — visitors see an error toast.
2. **Hard kill:** comment out `<ButlerDemoSection />` in [`src/app/products/[slug]/page.tsx`](../src/app/products/[slug]/page.tsx) and redeploy. Section disappears entirely.

### Real PMS screenshots

Currently the screenshots panel renders Tailwind divs. To swap in real images:

1. Generate three PNGs (Midjourney prompts in [`public/images/butler-demo/PROMPTS.md`](../public/images/butler-demo/PROMPTS.md)) at 1600×1000.
2. Place at `public/images/butler-demo/01-dashboard.png`, `02-transcript.png`, `03-agents.png`.
3. Replace each `<DashboardMockup />` etc. inside `CARDS` in [`PMSScreenshotsPanel.tsx`](../src/components/products/butler-demo/PMSScreenshotsPanel.tsx) with `<Image src="/images/butler-demo/01-dashboard.png" alt="..." fill className="object-cover" />`.

### Rotating Upstash credentials

If a token leaks: Upstash → database → **REST API → Reset Token**. Update the value on Vercel for all three environments. Redeploy (Vercel doesn't pick up env changes automatically for already-built deployments — push a new commit or hit the "Redeploy" button).

### Watching agent costs

OpenAI / ElevenLabs / Twilio dashboards. The session cap (20 msg/24h) and IP rate limits are the primary cost defense; if you see a spike, check Upstash analytics first to see whether the limiters are firing.

---

## 6. Rollback

If a deploy breaks production:

- **Vercel:** project → **Deployments** → find the last good one → ⋯ → **Promote to Production**. Instant.
- **Railway:** project → **Deployments** → ⋯ → **Redeploy** on the previous build. Slower (~30s container restart) but works.
- **Upstash:** no rollback needed — it's just a key-value store. If you need to clear all rate-limit state for a panic-recovery, the Upstash console has a "Flush" button per database.

---

## 7. Cost ballpark

Rough monthly cost for the demo at low-to-moderate traffic (a few hundred sessions/day):

| Service | Tier | Approximate cost |
|---|---|---|
| Vercel | Hobby (free) or Pro ($20/mo) | $0–20 |
| Railway | Hobby ($5/mo + usage) | $5–25 |
| Upstash Redis | Pay-as-you-go | < $1 |
| OpenAI (LLM) | gpt-4o-mini for the demo | $5–30 depending on traffic |
| ElevenLabs (TTS) | Starter / Creator | $5–22 |

Total: **~$15–100/mo** for the live public demo. The 20-message session cap is the main lever holding this down — without it, a single curious visitor could burn through hours of TTS in an afternoon.
