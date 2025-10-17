import { NextResponse } from 'next/server';

export async function GET(_req: Request, context: any) {
  const { id } = context.params as { id: string };
  // Mock metrics
  const data = {
    patient_id: id,
    pdc_90d: 84,
    mpr_90d: 92,
    events: [
      { event_id: 'AE-1', type: 'refill', timestamp: '2025-10-01T08:00:00Z' },
      { event_id: 'AE-2', type: 'self_report', timestamp: '2025-10-05T08:00:00Z' }
    ],
    risk_score: 63
  };
  return NextResponse.json({ data });
}


