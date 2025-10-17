import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { refill_id, channel } = body || {};
  if (!refill_id || !channel) {
    return NextResponse.json({ error: 'refill_id and channel required' }, { status: 400 });
  }
  // Stub: pretend we sent a message
  return NextResponse.json({ success: true, refill_id, channel, sent_at: new Date().toISOString() });
}


