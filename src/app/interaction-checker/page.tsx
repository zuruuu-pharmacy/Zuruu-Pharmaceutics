"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, AlertTriangle, CheckCircle, Search, Brain, MessageSquare, Eye } from "lucide-react";

type Severity = 'mild' | 'moderate' | 'severe';

interface InteractionRow {
  drugA: string;
  drugB: string;
  severity: Severity;
  mechanism: string;
  recommendation: string;
  confidence: number; // 0-100
  refs?: { label: string; url: string }[];
  flags?: string[]; // patient-specific flags
}

const mockCheck = (drugs: string[]): InteractionRow[] => {
  const normalized = drugs.map(d => d.trim()).filter(Boolean).map(d => d[0].toUpperCase() + d.slice(1).toLowerCase());
  const out: InteractionRow[] = [];
  for (let i = 0; i < normalized.length; i++) {
    for (let j = i + 1; j < normalized.length; j++) {
      const a = normalized[i], b = normalized[j];
      if (!a || !b) continue;
      // simple illustrative rules
      if ((a.includes('Simvastatin') && b.includes('Clarithromycin')) || (b.includes('Simvastatin') && a.includes('Clarithromycin'))) {
        out.push({ drugA: a, drugB: b, severity: 'severe', mechanism: 'CYP3A4 inhibition', recommendation: 'Switch to Pravastatin or Rosuvastatin', confidence: 94, refs: [{ label: 'FDA Label', url: 'https://www.fda.gov' }] });
      } else if ((a.includes('Warfarin') && b.includes('Aspirin')) || (b.includes('Warfarin') && a.includes('Aspirin'))) {
        out.push({ drugA: a, drugB: b, severity: 'moderate', mechanism: 'Additive anticoagulation/platelet inhibition', recommendation: 'Monitor INR; consider PPI or alternative', confidence: 88, refs: [{ label: 'Lexicomp', url: 'https://www.lexicomp.com' }] });
      } else if ((a.includes('Ibuprofen') && b.includes('Aspirin')) || (b.includes('Ibuprofen') && a.includes('Aspirin'))) {
        out.push({ drugA: a, drugB: b, severity: 'mild', mechanism: 'Competitive COX binding', recommendation: 'Separate dosing or use Acetaminophen', confidence: 72, refs: [{ label: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov' }] });
      }
    }
  }
  return out;
};

export default function InteractionCheckerPage() {
  const [inputs, setInputs] = useState<string[]>(['', '', '']);
  const [results, setResults] = useState<InteractionRow[]>([]);
  const [showConfidence, setShowConfidence] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [audit, setAudit] = useState<{ time: string; action: 'accepted' | 'overridden'; reason?: string; payload: InteractionRow }[]>([]);

  // Mock patient profile & inventory
  const patient = { name: 'John Doe', age: 54, gender: 'M', allergies: ['Penicillin'], conditions: ['Hyperlipidemia'], currentMeds: ['Simvastatin 20mg'], renal: false, hepatic: false };
  const inventoryAlternatives: Record<string, string[]> = {
    Simvastatin: ['Pravastatin 20mg (In stock)', 'Rosuvastatin 10mg (Low stock)'],
    Warfarin: ['Apixaban 5mg (In stock)', 'Dabigatran 110mg (In stock)'],
    Ibuprofen: ['Acetaminophen 500mg (In stock)']
  };

  const counts = useMemo(() => ({
    severe: results.filter(r => r.severity === 'severe').length,
    moderate: results.filter(r => r.severity === 'moderate').length,
    mild: results.filter(r => r.severity === 'mild').length
  }), [results]);

  const check = () => {
    const base = mockCheck(inputs);
    // patient-specific flags
    const withFlags = base.map(r => {
      const flags: string[] = [];
      if (patient.allergies.some(a => (r.drugA + ' ' + r.drugB).toLowerCase().includes(a.toLowerCase()))) flags.push('Allergy risk');
      if (patient.conditions.some(c => r.mechanism.toLowerCase().includes('cyp3a4') && c.toLowerCase().includes('hyperlip'))) flags.push('Condition caution');
      return { ...r, flags };
    });
    setResults(withFlags);
  };

  const setDrug = (idx: number, val: string) => {
    setInputs(prev => prev.map((v, i) => (i === idx ? val : v)));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Top Panel */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Interaction Engine</h1>
          <p className="text-gray-600 mt-2">Detect drug-drug/disease/allergy risks with explainable recommendations</p>
        </div>
        <div className="flex gap-2 items-center">
          <Button onClick={check}>
            <FlaskConical className="w-4 h-4 mr-2" /> Check Interactions
          </Button>
          <Button variant="outline" onClick={() => setShowConfidence(s => !s)}>
            <Brain className="w-4 h-4 mr-2" /> {showConfidence ? 'Hide' : 'Show'} Confidence
        </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Search className="w-5 h-5" /> Drug Inputs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {inputs.map((val, i) => (
              <Input key={i} placeholder={`Drug ${i + 1}`} value={val} onChange={e => setDrug(i, e.target.value)} />
            ))}
          </div>
          <div className="mt-3 text-sm text-gray-600">Tip: Add Simvastatin + Clarithromycin, or Warfarin + Aspirin for sample data.</div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Main Grid */}
        <div className="xl:col-span-9">
          <Card>
            <CardHeader>
              <CardTitle>Drug Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              {results.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No interactions yet. Enter drugs and click Check.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Drug 1</TableHead>
                      <TableHead>Drug 2</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Risk Mechanism</TableHead>
                      <TableHead>Recommendation</TableHead>
                      {showConfidence && <TableHead>Confidence</TableHead>}
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((r, idx) => (
                      <React.Fragment key={idx}>
                      <TableRow>
                        <TableCell className="font-medium">{r.drugA}</TableCell>
                        <TableCell>{r.drugB}</TableCell>
                        <TableCell>
                          <Badge variant={r.severity === 'severe' ? 'destructive' : r.severity === 'moderate' ? 'warning' : 'info'}>{r.severity}</Badge>
                        </TableCell>
                        <TableCell>{r.mechanism}</TableCell>
                        <TableCell>{r.recommendation}</TableCell>
                        {showConfidence && <TableCell>{r.confidence}%</TableCell>}
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setAudit(prev => [...prev, { time: new Date().toISOString(), action: 'accepted', payload: r }])}>Accept</Button>
                            <Button size="sm" variant="outline" onClick={() => { const reason = window.prompt('Override reason'); setAudit(prev => [...prev, { time: new Date().toISOString(), action: 'overridden', reason: reason || 'N/A', payload: r }]); }}>Override</Button>
                            <Button size="sm" variant="ghost" onClick={() => setExpanded(expanded === idx ? null : idx)}><Eye className="w-4 h-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expanded === idx && (
                        <TableRow>
                          <TableCell colSpan={7}>
                            <div className="p-3 rounded-md border">
                              <div className="flex flex-wrap gap-2 mb-2">
                                {r.flags && r.flags.map((f, i) => (<Badge key={i} variant="warning">{f}</Badge>))}
                              </div>
                              <p className="text-sm text-gray-700 mb-2">References:</p>
                              <ul className="list-disc pl-5 text-sm">
                                {(r.refs || []).map((ref, i) => (
                                  <li key={i}><a className="text-blue-600 underline" href={ref.url} target="_blank" rel="noreferrer">{ref.label}</a></li>
                                ))}
                              </ul>
                              <p className="text-sm mt-3 mb-1 font-medium">Alternatives in inventory:</p>
                              <ul className="list-disc pl-5 text-sm">
                                {(inventoryAlternatives[r.drugA] || []).map((alt, i) => (<li key={i}>{alt}</li>))}
                              </ul>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-3 space-y-6">
        <Card>
          <CardHeader>
              <CardTitle>Alert Summary</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="destructive">Severe: {counts.severe}</Badge>
                <Badge variant="warning">Moderate: {counts.moderate}</Badge>
                <Badge variant="info">Mild: {counts.mild}</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5" /> AI Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">Ask: “Explain the CYP3A4 interaction” or “Notify prescriber with recommendation”.</p>
              <div className="mt-3 flex gap-2">
                <Button variant="outline">Explain Mechanism</Button>
                <Button variant="outline">Notify Prescriber</Button>
            </div>
          </CardContent>
        </Card>
          <Card>
            <CardHeader>
              <CardTitle>Audit Trail</CardTitle>
            </CardHeader>
            <CardContent>
              {audit.length === 0 ? <p className="text-sm text-gray-600">No decisions logged yet.</p> : (
                <ul className="text-sm space-y-1">
                  {audit.slice(-5).reverse().map((a, i) => (
                    <li key={i}>
                      <span className="font-medium capitalize">{a.action}</span> • {new Date(a.time).toLocaleTimeString()} • {a.payload.drugA}+{a.payload.drugB} {a.reason ? `• ${a.reason}` : ''}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Simple analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Interaction Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-md border text-center">
              <p className="text-2xl font-bold">{audit.filter(a => a.action === 'accepted').length}</p>
              <p className="text-sm text-gray-600">Interactions Prevented</p>
            </div>
            <div className="p-4 rounded-md border text-center">
              <p className="text-2xl font-bold">{counts.severe}/{results.length}</p>
              <p className="text-sm text-gray-600">Severe Share</p>
            </div>
            <div className="p-4 rounded-md border">
              <p className="text-sm font-medium mb-2">Top flagged combos</p>
              <ul className="text-sm space-y-1">
                {results.slice(0,3).map((r,i) => (<li key={i}>{r.drugA} + {r.drugB} — {r.severity}</li>))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

