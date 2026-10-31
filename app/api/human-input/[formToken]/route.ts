import type { NextRequest } from 'next/server'
import { API_KEY, API_URL } from '@/config/server'
import { getInfo, setSession } from '@/app/api/utils/common'

const jsonHeaders = {
  'Content-Type': 'application/json',
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ formToken: string }> }) {
  const { formToken } = await params
  const { sessionId } = getInfo(request)
  const res = await fetch(`${API_URL}/form/human_input/${formToken}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    cache: 'no-store',
  })
  return new Response(await res.text(), {
    status: res.status,
    headers: {
      ...jsonHeaders,
      ...setSession(sessionId),
    },
  })
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ formToken: string }> }) {
  const { formToken } = await params
  const payload = await request.json()
  const { user, sessionId } = getInfo(request)
  const res = await fetch(`${API_URL}/form/human_input/${formToken}`, {
    method: 'POST',
    headers: {
      ...jsonHeaders,
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      ...payload,
      user,
    }),
    cache: 'no-store',
  })
  return new Response(await res.text(), {
    status: res.status,
    headers: {
      ...jsonHeaders,
      ...setSession(sessionId),
    },
  })
}
