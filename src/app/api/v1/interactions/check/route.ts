import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { drugs = [] } = await request.json();
  if (!Array.isArray(drugs) || drugs.length < 2) {
    return NextResponse.json({ error: 'Provide at least two drugs' }, { status: 400 });
  }
  // Simple mock check mirroring UI rules
  const normalized = drugs.map((d: string) => d?.trim()).filter(Boolean);
  const out: any[] = [];
  for (let i = 0; i < normalized.length; i++) {
    for (let j = i + 1; j < normalized.length; j++) {
      const a = normalized[i], b = normalized[j];
      if ((/simvastatin/i.test(a) && /clarithromycin/i.test(b)) || (/simvastatin/i.test(b) && /clarithromycin/i.test(a))) {
        out.push({ a, b, severity: 'severe', mechanism: 'CYP3A4 inhibition', recommendation: 'Switch to Pravastatin or Rosuvastatin', confidence: 94 });
      }
    }
  }
  return NextResponse.json({ data: out });
}


