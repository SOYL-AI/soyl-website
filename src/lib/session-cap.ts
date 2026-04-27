import { cookies } from 'next/headers'

const SESSION_COOKIE = 'butler_demo_session'
const MAX_MESSAGES = 20

export async function checkSession() {
  const store = await cookies()
  const cookie = store.get(SESSION_COOKIE)
  const count = cookie ? parseInt(cookie.value, 10) || 0 : 0
  return {
    count,
    remaining: Math.max(0, MAX_MESSAGES - count),
    full: count >= MAX_MESSAGES,
  }
}

export async function incrementSession() {
  const store = await cookies()
  const cookie = store.get(SESSION_COOKIE)
  const count = cookie ? parseInt(cookie.value, 10) || 0 : 0
  const next = count + 1
  store.set(SESSION_COOKIE, String(next), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  })
  return next
}
