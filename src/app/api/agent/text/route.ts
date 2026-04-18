import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const agentUrl = process.env.AGENT_API_URL ?? 'http://localhost:8000'

  try {
    const res = await fetch(`${agentUrl}/api/chat/text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ detail: 'Could not reach the AI agent. Please try again.' }, { status: 503 })
  }
}
