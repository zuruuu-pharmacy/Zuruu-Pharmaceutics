"use client";

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Activity, Heart, Syringe, TrendingUp } from 'lucide-react';

type Disease = 'diabetes' | 'hypertension' | 'hyperlipidemia' | 'thyroid' | 'asthma';

interface PatientSnapshot {
  id: string;
  name: string;
  disease: Disease;
  latest: Record<string, number>;
  adherence: number; // 0-100
  risk: number; // 0-100
}

const mockPatients: PatientSnapshot[] = [
  { id: 'P-0001', name: 'John Doe', disease: 'diabetes', latest: { hba1c: 8.1, fasting: 148 }, adherence: 82, risk: 76 },
  { id: 'P-0002', name: 'Sarah Lee', disease: 'hypertension', latest: { sbp: 148, dbp: 92, hr: 84 }, adherence: 63, risk: 82 },
  { id: 'P-0003', name: 'Michael Chen', disease: 'asthma', latest: { pefr: 370 }, adherence: 55, risk: 68 },
];

export default function ChronicDiseaseTracker() {
  const [query, setQuery] = useState('');
  const [disease, setDisease] = useState<Disease | 'all'>('all');
  const patients = useMemo(() => mockPatients
    .filter(p => disease === 'all' ? true : p.disease === disease)
    .filter(p => !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.id.toLowerCase().includes(query.toLowerCase()))
  , [query, disease]);

  const kpi = useMemo(() => ({
    total: patients.length,
    controlled: patients.filter(p => (p.disease === 'diabetes' ? (p.latest.hba1c ?? 0) < 7.0 : p.disease === 'hypertension' ? (p.latest.sbp ?? 0) < 140 && (p.latest.dbp ?? 0) < 90 : true)).length,
    avgAdh: Math.round(patients.reduce((a,p)=>a+p.adherence,0)/Math.max(1,patients.length)),
    highRisk: patients.filter(p => p.risk >= 80).length
  }), [patients]);

  return (
    <div className="space-y-6">
      {/* Top Panel */}
      <Card>
        <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-6 gap-4 items-end">
          <div className="lg:col-span-2">
            <label className="block text-sm mb-1">Search (Patient / ID)</label>
            <Input value={query} onChange={e=>setQuery(e.target.value)} placeholder="e.g. John or P-0001" />
          </div>
          <div>
            <label className="block text-sm mb-1">Disease</label>
            <select value={disease} onChange={e=>setDisease(e.target.value as any)} className="w-full px-3 py-2 border rounded-lg border-[var(--c-neutral-300)]">
              <option value="all">All</option>
              <option value="diabetes">Diabetes</option>
              <option value="hypertension">Hypertension</option>
              <option value="hyperlipidemia">Hyperlipidemia</option>
              <option value="thyroid">Thyroid</option>
              <option value="asthma">Asthma/COPD</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><TrendingUp className="w-4 h-4 mr-2" /> Weekly Summary</Button>
            <Button variant="outline"><Users className="w-4 h-4 mr-2" /> Population Analytics</Button>
          </div>
        </CardContent>
      </Card>

      {/* KPI strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Patients in module', value: kpi.total, icon: Users },
          { label: 'In control', value: kpi.controlled, icon: Activity },
          { label: 'Avg adherence', value: `${kpi.avgAdh}%`, icon: Heart },
          { label: 'High-risk patients', value: kpi.highRisk, icon: Syringe },
        ].map((x,i)=> (
          <Card key={x.label}><CardContent className="p-6 flex items-center justify-between"><div><p className="text-sm text-[var(--c-neutral-600)] uppercase">{x.label}</p><p className="text-2xl font-bold mt-1">{x.value}</p></div><x.icon className="w-6 h-6 text-[var(--c-neutral-500)]" /></CardContent></Card>
        ))}
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Graph panel */}
        <div className="xl:col-span-8">
          <Card>
            <CardHeader><CardTitle>Trend Visualization</CardTitle></CardHeader>
            <CardContent>
              <div className="h-56 rounded-md bg-[var(--c-neutral-100)] flex items-center justify-center text-[var(--c-neutral-500)]">Line graph: parameter vs time (placeholder)</div>
              <div className="mt-4 flex gap-2">
                <Badge variant="success">Green: Controlled</Badge>
                <Badge variant="warning">Yellow: Borderline</Badge>
                <Badge variant="critical">Red: Uncontrolled</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Right insights */}
        <div className="xl:col-span-4 space-y-6">
          <Card>
            <CardHeader><CardTitle>AI Insights</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm">Risk Level: High (82%)</p>
              <p className="text-sm">Adherence: 63%</p>
              <p className="text-sm">Recommendation: Schedule follow-up & suggest dose reevaluation</p>
              <p className="text-sm">Confidence: 91%</p>
              <div className="mt-3 space-y-2">
                <Button variant="outline" className="w-full">Schedule counseling</Button>
                <Button variant="outline" className="w-full">Notify physician</Button>
                <Button variant="outline" className="w-full">Recommend labs</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Patient Snapshot</CardTitle></CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Latest vitals:</span> HbA1c 8.1%, SBP/DBP 148/92</p>
                <p><span className="font-medium">Current meds:</span> Metformin, Amlodipine</p>
                <p><span className="font-medium">Recent refills:</span> 2025-10-01, 2025-09-01</p>
              </div>
              <div className="mt-3">
                <Input placeholder="Add note" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


