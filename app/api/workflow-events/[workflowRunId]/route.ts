import type { NextRequest } from 'next/server'
import { API_KEY, API_URL } from '@/config/server'
import { getInfo, setSession } from '@/app/api/utils/common'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest, { params }: { params: Promise<{ workflowRunId: string }> }) {
  const { workflowRunId } = await params
  const { user, sessionId } = getInfo(request)

  const url = new URL(`${API_URL}/workflow/${workflowRunId}/events`)
  url.searchParams.set('user', user)
  url.searchParams.set('include_state_snapshot', 'true')
  url.searchParams.set('continue_on_pause', 'true')

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Accept: 'text/event-stream',
    },
    cache: 'no-store',
  })

  if (!res.ok || !res.body) {
    return new Response(await res.text(), {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
        ...setSession(sessionId),
      },
    })
  }

  return new Response(res.body, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
      ...setSession(sessionId),
    },
  })
}
