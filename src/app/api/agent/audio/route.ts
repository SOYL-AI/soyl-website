import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const agentUrl = process.env.AGENT_API_URL ?? 'http://localhost:8000'

  try {
    const res = await fetch(`${agentUrl}/api/chat/audio`, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ detail: 'Could not reach the AI agent. Please try again.' }, { status: 503 })
  }
}
