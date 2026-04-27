import { NextRequest, NextResponse } from 'next/server'
import { audioRatelimit, getClientIp } from '@/lib/ratelimit'
import { checkSession, incrementSession } from '@/lib/session-cap'

export async function POST(req: NextRequest) {
  // 1. Session cap (cheap, no Redis call)
  const session = await checkSession()
  if (session.full) {
    return NextResponse.json(
      { detail: 'Demo session complete.', session_complete: true },
      { status: 429 }
    )
  }

  // 2. IP rate limit (audio is tighter — TTS+STT+LLM cost ~3-5x text)
  const ip = getClientIp(req)
  const { success, limit, remaining, reset } = await audioRatelimit.limit(ip)
  if (!success) {
    const minutesUntilReset = Math.max(1, Math.ceil((reset - Date.now()) / 60000))
    return NextResponse.json(
      { detail: `Rate limit reached. Try again in ${minutesUntilReset} minutes.`, rate_limited: true },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': String(limit),
          'X-RateLimit-Remaining': String(remaining),
          'X-RateLimit-Reset': String(reset),
        },
      }
    )
  }

  // 3. Proxy to agent backend
  const formData = await req.formData()
  const agentUrl = process.env.AGENT_API_URL ?? 'http://localhost:8000'

  try {
    const res = await fetch(`${agentUrl}/api/chat/audio`, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    if (res.ok) await incrementSession()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ detail: 'Could not reach the AI agent. Please try again.' }, { status: 503 })
  }
}
