import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { refill_id } = body || {};
  if (!refill_id) return NextResponse.json({ error: 'refill_id required' }, { status: 400 });
  // Stub completion
  return NextResponse.json({ success: true, refill_id, completed_at: new Date().toISOString() });
}


