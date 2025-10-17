"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  User, 
  Pill, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Download,
  Printer,
  Scan,
  Camera,
  Search,
  Plus,
  Minus,
  X,
  ArrowRight,
  ArrowLeft,
  Shield,
  Stethoscope,
  Activity,
  Calendar,
  MapPin,
  Phone,
  Mail,
  QrCode,
  Barcode,
  Zap,
  Brain,
  Heart,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  prescriberId: string;
  prescriberName: string;
  prescriberLicense: string;
  medications: Medication[];
  status: 'intake' | 'verification' | 'interaction-check' | 'stock-check' | 'pharmacist-approval' | 'dispense' | 'complete';
  createdAt: string;
  verifiedAt?: string;
  dispensedAt?: string;
  rawPrescription?: string;
  notes?: string;
}

interface Medication {
  id: string;
  name: string;
  strength: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  instructions: string;
  atcCode: string;
  interactions?: Interaction[];
  allergies?: Allergy[];
  stockAvailable?: boolean;
  batchSelected?: string;
}

interface Interaction {
  severity: 'minor' | 'moderate' | 'severe';
  description: string;
  recommendation: string;
  drugs: string[];
}

interface Allergy {
  substance: string;
  reaction: string;
  severity: 'mild' | 'moderate' | 'severe';
}

interface Prescriber {
  id: string;
  name: string;
  license: string;
  registrationStatus: 'active' | 'suspended' | 'expired';
  specialty: string;
  contact: string;
}

const mockPrescriptions: Prescription[] = [
  {
    id: 'RX-0456',
    patientId: 'P-000123',
    patientName: 'John Doe',
    prescriberId: 'DR-001',
    prescriberName: 'Dr. Sarah Smith',
    prescriberLicense: 'MD123456',
    status: 'verification',
    createdAt: '2024-01-15T10:30:00Z',
    medications: [
      {
        id: '1',
        name: 'Metformin',
        strength: '500mg',
        dosage: '1 tablet',
        frequency: 'Twice daily',
        duration: '30 days',
        quantity: 60,
        instructions: 'Take with meals',
        atcCode: 'A10BA02',
        stockAvailable: true,
        batchSelected: 'L-2024-001'
      }
    ]
  }
];

const mockPrescribers: Prescriber[] = [
  {
    id: 'DR-001',
    name: 'Dr. Sarah Smith',
    license: 'MD123456',
    registrationStatus: 'active',
    specialty: 'Internal Medicine',
    contact: '+1-555-0123'
  }
];

const workflowSteps = [
  { id: 'intake', label: 'Intake', icon: Upload },
  { id: 'verification', label: 'Prescriber Verification', icon: User },
  { id: 'interaction-check', label: 'Interaction Check', icon: AlertTriangle },
  { id: 'stock-check', label: 'Stock Check', icon: Pill },
  { id: 'pharmacist-approval', label: 'Pharmacist Approval', icon: Shield },
  { id: 'dispense', label: 'Dispense', icon: CheckCircle },
  { id: 'complete', label: 'Complete', icon: CheckCircle2 }
];

const PrescriptionWorkflow: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [allergies, setAllergies] = useState<Allergy[]>([]);

  const getStepStatus = (stepIndex: number, prescription: Prescription) => {
    const stepId = workflowSteps[stepIndex].id;
    const currentStepIndex = workflowSteps.findIndex(s => s.id === prescription.status);
    
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'pending';
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-[var(--c-accent-600)] bg-[var(--c-accent-100)]';
      case 'current': return 'text-[var(--c-primary-600)] bg-[var(--c-primary-100)]';
      case 'pending': return 'text-[var(--c-neutral-500)] bg-[var(--c-neutral-100)]';
      default: return 'text-[var(--c-neutral-500)] bg-[var(--c-neutral-100)]';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'intake': return 'info';
      case 'verification': return 'warning';
      case 'interaction-check': return 'warning';
      case 'stock-check': return 'warning';
      case 'pharmacist-approval': return 'warning';
      case 'dispense': return 'success';
      case 'complete': return 'success';
      default: return 'default';
    }
  };

  const runInteractionCheck = (medications: Medication[]) => {
    // Simulate AI interaction check
    const mockInteractions: Interaction[] = [
      {
        severity: 'moderate',
        description: 'Increased risk of hypoglycemia when combined with insulin',
        recommendation: 'Monitor blood glucose levels closely',
        drugs: ['Metformin', 'Insulin']
      }
    ];
    setInteractions(mockInteractions);
    setShowInteractionModal(true);
  };

  const checkPrescriberVerification = (prescriberLicense: string) => {
    const prescriber = mockPrescribers.find(p => p.license === prescriberLicense);
    return prescriber || { registrationStatus: 'unverified' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1">Prescription Verification & Dispensing</h1>
          <p className="text-body mt-2">Manage prescription intake, verification, and dispensing workflow</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => setShowUploadModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Prescription
          </Button>
        </div>
      </div>

      {/* Workflow Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Prescription Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStepColor(getStepStatus(index, selectedPrescription || prescriptions[0]))}`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium mt-2">{step.label}</span>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-[var(--c-neutral-200)] mx-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prescriptions List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Prescriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prescription ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Prescriber</TableHead>
                <TableHead>Medications</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptions.map((prescription) => (
                <TableRow key={prescription.id} interactive>
                  <TableCell>
                    <span className="font-mono text-sm">{prescription.id}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{prescription.patientName}</p>
                      <p className="text-sm text-[var(--c-neutral-600)]">{prescription.patientId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{prescription.prescriberName}</p>
                      <p className="text-sm text-[var(--c-neutral-600)]">{prescription.prescriberLicense}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {prescription.medications.map((med) => (
                        <Badge key={med.id} variant="outline" size="sm">
                          {med.name} {med.strength}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(prescription.status) as any}>
                      {prescription.status.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(prescription.createdAt).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="p-1" onClick={() => setSelectedPrescription(prescription)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Prescription Detail Modal */}
      {selectedPrescription && (
        <PrescriptionDetailModal
          prescription={selectedPrescription}
          onClose={() => setSelectedPrescription(null)}
          onStatusChange={(status) => {
            setPrescriptions(prev => prev.map(p =>
              p.id === selectedPrescription.id ? { ...p, status: status as any } : p   
            ));
          }}
          onInteractionCheck={runInteractionCheck}
        />
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={(prescription) => {
            setPrescriptions(prev => [...prev, prescription]);
            setShowUploadModal(false);
          }}
        />
      )}

      {/* Interaction Check Modal */}
      {showInteractionModal && (
        <InteractionModal
          interactions={interactions}
          allergies={allergies}
          onClose={() => setShowInteractionModal(false)}
          onApprove={() => {
            setShowInteractionModal(false);
            // Continue workflow
          }}
        />
      )}
    </div>
  );
};

// Prescription Detail Modal
const PrescriptionDetailModal: React.FC<{
  prescription: Prescription;
  onClose: () => void;
  onStatusChange: (status: string) => void;
  onInteractionCheck: (medications: Medication[]) => void;
}> = ({ prescription, onClose, onStatusChange, onInteractionCheck }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [prescriberStatus, setPrescriberStatus] = useState<any>(null);

  useEffect(() => {
    const status = checkPrescriberVerification(prescription.prescriberLicense);
    setPrescriberStatus(status);
  }, [prescription.prescriberLicense]);

  const checkPrescriberVerification = (license: string) => {
    const prescriber = mockPrescribers.find(p => p.license === license);
    return prescriber || { registrationStatus: 'unverified' };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'intake': return 'info';
      case 'verification': return 'warning';
      case 'interaction-check': return 'warning';
      case 'stock-check': return 'warning';
      case 'pharmacist-approval': return 'warning';
      case 'dispense': return 'success';
      case 'complete': return 'success';
      default: return 'default';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[var(--c-surface)] rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        {/* Header */}
        <div className="p-6 border-b border-[var(--c-neutral-200)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[var(--c-primary-100)] rounded-lg flex items-center justify-center">
                <FileText className="w-8 h-8 text-[var(--c-primary-600)]" />
              </div>
              <div>
                <h2 className="text-h2">{prescription.id}</h2>
                <p className="text-body">{prescription.patientName} • {prescription.prescriberName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant={getStatusColor(prescription.status) as any}>
                {prescription.status.replace('-', ' ')}
              </Badge>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[var(--c-neutral-200)]">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'medications', label: 'Medications' },
              { id: 'verification', label: 'Verification' },
              { id: 'interactions', label: 'Interactions' },
              { id: 'dispensing', label: 'Dispensing' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-[var(--c-primary-500)] text-[var(--c-primary-600)]'
                    : 'border-transparent text-[var(--c-neutral-600)] hover:text-[var(--c-neutral-900)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-h3 mb-4">Patient Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[var(--c-neutral-600)]">Name:</span>
                      <span className="font-medium">{prescription.patientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--c-neutral-600)]">Patient ID:</span>
                      <span className="font-medium">{prescription.patientId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--c-neutral-600)]">Created:</span>
                      <span className="font-medium">
                        {new Date(prescription.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-h3 mb-4">Prescriber Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[var(--c-neutral-600)]">Name:</span>
                      <span className="font-medium">{prescription.prescriberName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--c-neutral-600)]">License:</span>
                      <span className="font-medium">{prescription.prescriberLicense}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--c-neutral-600)]">Status:</span>
                      <Badge variant={prescriberStatus?.registrationStatus === 'active' ? 'success' : 'warning'}>
                        {prescriberStatus?.registrationStatus || 'Unverified'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'medications' && (
            <div className="space-y-4">
              <h3 className="text-h3">Medications</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescription.medications.map((medication) => (
                    <TableRow key={medication.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{medication.name}</p>
                          <p className="text-sm text-[var(--c-neutral-600)]">{medication.strength}</p>
                        </div>
                      </TableCell>
                      <TableCell>{medication.dosage}</TableCell>
                      <TableCell>{medication.frequency}</TableCell>
                      <TableCell>{medication.duration}</TableCell>
                      <TableCell>{medication.quantity}</TableCell>
                      <TableCell>
                        <Badge variant={medication.stockAvailable ? 'success' : 'destructive'}>
                          {medication.stockAvailable ? 'Available' : 'Out of Stock'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm" className="p-1">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-1">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {activeTab === 'verification' && (
            <div className="space-y-6">
              <h3 className="text-h3">Prescriber Verification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Prescriber Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[var(--c-neutral-600)]">Name:</span>
                        <span className="font-medium">{prescription.prescriberName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--c-neutral-600)]">License:</span>
                        <span className="font-medium">{prescription.prescriberLicense}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--c-neutral-600)]">Status:</span>
                        <Badge variant={prescriberStatus?.registrationStatus === 'active' ? 'success' : 'warning'}>
                          {prescriberStatus?.registrationStatus || 'Unverified'}
                        </Badge>
                      </div>
                      {prescriberStatus?.specialty && (
                        <div className="flex justify-between">
                          <span className="text-[var(--c-neutral-600)]">Specialty:</span>
                          <span className="font-medium">{prescriberStatus.specialty}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Verification Actions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button 
                        className="w-full" 
                        onClick={() => onStatusChange('interaction-check')}
                        disabled={prescriberStatus?.registrationStatus !== 'active'}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Verify Prescriber
                      </Button>
                      <Button variant="outline" className="w-full">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Flag for Review
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact Prescriber
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'interactions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-h3">Drug Interaction & Allergy Check</h3>
                <Button onClick={() => onInteractionCheck(prescription.medications)}>
                  <Brain className="w-4 h-4 mr-2" />
                  Run AI Check
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Drug Interactions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-[var(--c-neutral-400)] mx-auto mb-4" />
                      <p className="text-[var(--c-neutral-600)]">No interactions detected</p>
                      <p className="text-sm text-[var(--c-neutral-500)]">Run AI check to analyze</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Heart className="w-5 h-5" />
                      <span>Allergy Check</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <CheckCircle className="w-12 h-12 text-[var(--c-accent-400)] mx-auto mb-4" />
                      <p className="text-[var(--c-neutral-600)]">No allergies detected</p>
                      <p className="text-sm text-[var(--c-neutral-500)]">Patient allergy profile clear</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'dispensing' && (
            <div className="space-y-6">
              <h3 className="text-h3">Dispensing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Pill className="w-5 h-5" />
                      <span>Batch Selection</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {prescription.medications.map((medication) => (
                        <div key={medication.id} className="p-3 border border-[var(--c-neutral-200)] rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{medication.name}</p>
                              <p className="text-sm text-[var(--c-neutral-600)]">Qty: {medication.quantity}</p>
                            </div>
                            <select className="px-3 py-1 border border-[var(--c-neutral-300)] rounded">
                              <option>Select Batch</option>
                              <option>L-2024-001 (50 units)</option>
                              <option>L-2024-002 (30 units)</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Printer className="w-5 h-5" />
                      <span>Dispensing Actions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Dispense & Print Label
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Printer className="w-4 h-4 mr-2" />
                        Print Label Only
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Upload Modal Component
const UploadModal: React.FC<{
  onClose: () => void;
  onUpload: (prescription: Prescription) => void;
}> = ({ onClose, onUpload }) => {
  const [uploadMethod, setUploadMethod] = useState<'manual' | 'pdf' | 'scan'>('manual');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[var(--c-surface)] rounded-xl shadow-xl max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="p-6 border-b border-[var(--c-neutral-200)]">
          <h2 className="text-h2">New Prescription Intake</h2>
          <p className="text-body mt-2">Choose how you want to add the prescription</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setUploadMethod('manual')}
              className={`p-4 border rounded-lg text-center transition-colors ${
                uploadMethod === 'manual'
                  ? 'border-[var(--c-primary-500)] bg-[var(--c-primary-50)]'
                  : 'border-[var(--c-neutral-200)] hover:bg-[var(--c-neutral-50)]'
              }`}
            >
              <FileText className="w-8 h-8 mx-auto mb-2 text-[var(--c-primary-600)]" />
              <p className="font-medium">Manual Entry</p>
              <p className="text-sm text-[var(--c-neutral-600)]">Type prescription details</p>
            </button>
            <button
              onClick={() => setUploadMethod('pdf')}
              className={`p-4 border rounded-lg text-center transition-colors ${
                uploadMethod === 'pdf'
                  ? 'border-[var(--c-primary-500)] bg-[var(--c-primary-50)]'
                  : 'border-[var(--c-neutral-200)] hover:bg-[var(--c-neutral-50)]'
              }`}
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-[var(--c-primary-600)]" />
              <p className="font-medium">Upload PDF</p>
              <p className="text-sm text-[var(--c-neutral-600)]">Upload prescription image</p>
            </button>
            <button
              onClick={() => setUploadMethod('scan')}
              className={`p-4 border rounded-lg text-center transition-colors ${
                uploadMethod === 'scan'
                  ? 'border-[var(--c-primary-500)] bg-[var(--c-primary-50)]'
                  : 'border-[var(--c-neutral-200)] hover:bg-[var(--c-neutral-50)]'
              }`}
            >
              <Camera className="w-8 h-8 mx-auto mb-2 text-[var(--c-primary-600)]" />
              <p className="font-medium">Scan/OCR</p>
              <p className="text-sm text-[var(--c-neutral-600)]">Scan with camera</p>
            </button>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => {
              // Create mock prescription
              const newPrescription: Prescription = {
                id: `RX-${Date.now()}`,
                patientId: 'P-000124',
                patientName: 'Jane Smith',
                prescriberId: 'DR-002',
                prescriberName: 'Dr. John Wilson',
                prescriberLicense: 'MD789012',
                status: 'intake',
                createdAt: new Date().toISOString(),
                medications: []
              };
              onUpload(newPrescription);
            }}>
              Continue
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Interaction Modal Component
const InteractionModal: React.FC<{
  interactions: Interaction[];
  allergies: Allergy[];
  onClose: () => void;
  onApprove: () => void;
}> = ({ interactions, allergies, onClose, onApprove }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return 'destructive';
      case 'moderate': return 'warning';
      case 'minor': return 'info';
      default: return 'default';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[var(--c-surface)] rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="p-6 border-b border-[var(--c-neutral-200)]">
          <h2 className="text-h2">Drug Interaction & Allergy Analysis</h2>
          <p className="text-body mt-2">AI-powered safety check results</p>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
          {interactions.length > 0 ? (
            <div>
              <h3 className="text-h3 mb-4">Drug Interactions Found</h3>
              {interactions.map((interaction, index) => (
                <Card key={index} className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Badge variant={getSeverityColor(interaction.severity) as any}>
                        {interaction.severity}
                      </Badge>
                      <div className="flex-1">
                        <p className="font-medium mb-2">{interaction.drugs.join(' + ')}</p>
                        <p className="text-sm text-[var(--c-neutral-700)] mb-2">{interaction.description}</p>
                        <p className="text-sm text-[var(--c-neutral-600)]">{interaction.recommendation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-[var(--c-accent-400)] mx-auto mb-4" />
              <h3 className="text-h3 mb-2">No Interactions Detected</h3>
              <p className="text-[var(--c-neutral-600)]">All medications are safe to dispense together</p>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-[var(--c-neutral-200)] flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onApprove}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Approve & Continue
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PrescriptionWorkflow;
