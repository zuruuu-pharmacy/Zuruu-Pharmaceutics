"use client";

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Phone, Send, Calendar, Filter, Users, Activity, TrendingUp } from 'lucide-react';

type RefillStatus = 'due' | 'reminded' | 'completed' | 'missed' | 'escalated';

interface RefillQueueItem {
  refillId: string;
  patientId: string;
  patientName: string;
  drug: string;
  dose: string;
  daysLeft: number;
  modality: 'store' | 'delivery';
  status: RefillStatus;
  assignedTo?: string;
  channels: Array<'SMS' | 'Push' | 'Email'>;
}

interface AdherenceEvent {
  eventId: string;
  patientId: string;
  rxId: string;
  eventType: 'refill' | 'self_report' | 'mems_open' | 'outreach_logged';
  value: number;
  timestamp: string; // ISO
  source: string;
}

const mockQueue: RefillQueueItem[] = [
  { refillId: 'REF-001', patientId: 'P-0001', patientName: 'John Doe', drug: 'Metformin', dose: '500 mg', daysLeft: 2, modality: 'store', status: 'due', channels: ['SMS'] },
  { refillId: 'REF-002', patientId: 'P-0002', patientName: 'Sarah Lee', drug: 'Atorvastatin', dose: '20 mg', daysLeft: 5, modality: 'delivery', status: 'reminded', channels: ['Push','SMS'] },
  { refillId: 'REF-003', patientId: 'P-0003', patientName: 'Michael Chen', drug: 'Lisinopril', dose: '10 mg', daysLeft: 1, modality: 'store', status: 'due', channels: ['SMS','Email'] }
];

const mockEvents: AdherenceEvent[] = [
  { eventId: 'AE-1', patientId: 'P-0001', rxId: 'RX-1', eventType: 'refill', value: 1, timestamp: '2025-10-01T08:00:00Z', source: 'pharmacy_system' },
  { eventId: 'AE-2', patientId: 'P-0001', rxId: 'RX-1', eventType: 'self_report', value: 1, timestamp: '2025-10-05T08:00:00Z', source: 'patient_app' },
  { eventId: 'AE-3', patientId: 'P-0001', rxId: 'RX-1', eventType: 'refill', value: 1, timestamp: '2025-10-11T08:00:00Z', source: 'pharmacy_system' }
];

export default function RefillAdherenceTracker() {
  const [queue, setQueue] = useState<RefillQueueItem[]>(mockQueue);
  const [search, setSearch] = useState('');
  const [branch, setBranch] = useState('Main');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selected, setSelected] = useState<RefillQueueItem | null>(queue[0] ?? null);

  const kpis = useMemo(() => {
    const activeTracked = 128; // mock
    const pdc = 84; // mock PDC last 90 days
    const due7 = queue.filter(q => q.daysLeft <= 7 && q.status !== 'completed').length;
    const openTasks = 6; // mock
    return { activeTracked, pdc, due7, openTasks };
  }, [queue]);

  const filteredQueue = useMemo(() => {
    return queue
      .filter(q => !search || `${q.patientName} ${q.drug}`.toLowerCase().includes(search.toLowerCase()))
      .sort((a,b) => a.daysLeft - b.daysLeft);
  }, [queue, search]);

  const notify = (item: RefillQueueItem, channel: 'SMS' | 'Push' | 'Email') => {
    setQueue(prev => prev.map(q => q.refillId === item.refillId ? { ...q, status: 'reminded' } : q));
  };

  const markAutoRefill = (item: RefillQueueItem) => {
    setQueue(prev => prev.map(q => q.refillId === item.refillId ? { ...q, modality: 'delivery' } : q));
  };

  const pdcValue = kpis.pdc;
  const mprValue = 92; // mock

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-end">
            <div className="lg:col-span-2">
              <label className="block text-sm mb-1">Search</label>
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Patient / Drug / Rx" />
            </div>
            <div>
              <label className="block text-sm mb-1">Branch</label>
              <select value={branch} onChange={e => setBranch(e.target.value)} className="w-full px-3 py-2 border rounded-lg border-[var(--c-neutral-300)]">
                <option>Main</option>
                <option>Downtown</option>
                <option>Satellite</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">From</label>
              <Input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">To</label>
              <Input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export</Button>
              <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filters</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active prescriptions tracked', value: kpis.activeTracked, icon: Users },
          { label: '% Adherent (PDC, 90d)', value: `${pdcValue}%`, icon: Activity },
          { label: 'Refills due in 7 days', value: kpis.due7, icon: Calendar },
          { label: 'Open intervention tasks', value: kpis.openTasks, icon: TrendingUp }
        ].map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--c-neutral-600)] uppercase">{k.label}</p>
                  <p className="text-2xl font-bold mt-1">{k.value}</p>
                </div>
                <k.icon className="w-6 h-6 text-[var(--c-neutral-500)]" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Refill Queue (30%) */}
        <div className="xl:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Refill Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[520px] overflow-y-auto">
                {filteredQueue.map(item => (
                  <motion.div key={item.refillId} whileHover={{ scale: 1.01 }} className="p-3 border rounded-lg cursor-pointer"
                    onClick={() => setSelected(item)}
                    title={`${item.patientName} • ${item.drug} ${item.dose} • ${item.daysLeft} days left`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.patientName} <span className="text-xs text-[var(--c-neutral-500)]">({item.patientId})</span></p>
                        <p className="text-xs text-[var(--c-neutral-600)]">{item.drug} {item.dose} • {item.modality === 'delivery' ? 'Delivery' : 'In-store'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{item.daysLeft} days</p>
                        <Badge variant={item.status === 'due' ? 'info' : item.status === 'completed' ? 'success' : item.status === 'missed' ? 'critical' : 'warning'}>{item.status}</Badge>
                      </div>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); notify(item,'SMS'); }}><Send className="w-3 h-3 mr-1" /> Remind</Button>
                      <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}><Phone className="w-3 h-3 mr-1" /> Call</Button>
                      <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); markAutoRefill(item); }}>Auto-refill</Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient Detail & Timeline (45%) */}
        <div className="xl:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Patient Detail & Adherence</CardTitle>
            </CardHeader>
            <CardContent>
              {selected ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold">{selected.patientName}</p>
                      <p className="text-sm text-[var(--c-neutral-600)]">Patient ID: {selected.patientId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Adherence score</p>
                      <p className="text-2xl font-bold">{pdcValue}%</p>
                    </div>
                  </div>
                  {/* Timeline placeholder */}
                  <div className="h-40 rounded-md bg-[var(--c-neutral-100)] flex items-center justify-center text-[var(--c-neutral-500)]">
                    Timeline (fills, self-reports, MEMS)
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    <div>
                      <p className="text-xl font-bold">{pdcValue}%</p>
                      <p className="text-xs text-[var(--c-neutral-600)]">PDC (90d)</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold">{mprValue}%</p>
                      <p className="text-xs text-[var(--c-neutral-600)]">MPR</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold">{selected.daysLeft}</p>
                      <p className="text-xs text-[var(--c-neutral-600)]">Days Left</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold">Oct 1</p>
                      <p className="text-xs text-[var(--c-neutral-600)]">Last Fill</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Add note (autosave WIP)" />
                    <Button variant="outline">Open Outreach Task</Button>
                  </div>
                </div>
              ) : (
                <p className="text-[var(--c-neutral-600)]">Select a patient from the queue.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Insights & Actions (25%) */}
        <div className="xl:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>AI Insight</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">High risk — missed 2 of last 3 refills. Confidence 82%.</p>
              <div className="mt-3 space-y-2">
                <Button className="w-full" variant="outline">Send SMS Reminder</Button>
                <Button className="w-full" variant="outline">Call Now</Button>
                <Button className="w-full" variant="outline">Schedule Counseling</Button>
                <Button className="w-full" variant="outline">Enroll Auto-refill</Button>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Outreach History</p>
                <ul className="text-sm space-y-1 text-[var(--c-neutral-700)]">
                  <li>2025-10-03 09:01 SMS sent (delivered)</li>
                  <li>2025-10-05 10:22 Patient confirmed via app</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Adherence Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-40 bg-[var(--c-neutral-100)] rounded-md flex items-center justify-center text-[var(--c-neutral-500)]">Missed doses heatmap</div>
            <div className="h-40 bg-[var(--c-neutral-100)] rounded-md flex items-center justify-center text-[var(--c-neutral-500)]">Cohort trends</div>
            <div className="h-40 bg-[var(--c-neutral-100)] rounded-md flex items-center justify-center text-[var(--c-neutral-500)]">Intervention effect</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


