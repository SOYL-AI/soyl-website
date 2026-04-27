import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Two limiters keyed on IP. Audio is ~3-5x more expensive per request than text,
// so its limit is tighter.
type LimitResult = { success: boolean; limit: number; remaining: number; reset: number }
type Limiter = { limit(id: string): Promise<LimitResult> }

// In dev (or whenever Upstash creds aren't configured), fall back to a no-op
// limiter so the build never fails and `npm run dev` works without secrets.
// Production with creds present uses the real sliding-window limiter.
const isConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
)

const noopLimiter: Limiter = {
  async limit() {
    return { success: true, limit: 0, remaining: 0, reset: 0 }
  },
}

function makeLimiter(prefix: string, max: number, window: `${number} ${'s' | 'm' | 'h' | 'd'}`): Limiter {
  if (!isConfigured) return noopLimiter
  return new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(max, window),
    analytics: true,
    prefix,
  })
}

export const textRatelimit = makeLimiter('butler:text', 15, '1 h')
export const audioRatelimit = makeLimiter('butler:audio', 5, '1 h')

export function getClientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'
  )
}
