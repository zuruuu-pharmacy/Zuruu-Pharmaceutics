import { NextResponse } from 'next/server';

const mockQueue = [
  { refill_id: 'REF-001', rx_id: 'RX-1', patient_id: 'P-0001', days_left: 2, status: 'due', assigned_to: 'pharm_01', auto_refill: false, channels: ['SMS','Push'] },
  { refill_id: 'REF-002', rx_id: 'RX-2', patient_id: 'P-0002', days_left: 5, status: 'reminded', assigned_to: 'pharm_02', auto_refill: false, channels: ['SMS'] },
];

export async function GET() {
  return NextResponse.json({ data: mockQueue, page: 1, limit: mockQueue.length, total: mockQueue.length });
}


