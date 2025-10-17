"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Heart,
  AlertTriangle,
  FileText,
  Pill,
  Activity,
  Clock,
  Shield,
  Download,
  Upload,
  Filter,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  Star,
  MessageSquare,
  Video,
  Camera,
  FileImage,
  Stethoscope,
  Zap,
  Brain,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  CheckCircle,
  XCircle,
  Info,
  Bell,
  Settings,
  Lock,
  Unlock,
  Share,
  Copy,
  Trash2,
  Archive,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  contacts: Contact[];
  address: Address;
  emergencyContact: EmergencyContact;
  allergies: Allergy[];
  chronicConditions: ChronicCondition[];
  currentMedications: CurrentMedication[];
  medicationHistory: MedicationHistory[];
  immunizations: Immunization[];
  labResults: LabResult[];
  consent: Consent[];
  lastVisit: string;
  status: 'active' | 'inactive' | 'deceased';
  notes?: string;
}

interface Contact {
  type: 'mobile' | 'home' | 'work' | 'email';
  value: string;
  verified: boolean;
  primary: boolean;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

interface Allergy {
  substance: string;
  reaction: string;
  severity: 'mild' | 'moderate' | 'severe';
  onsetDate: string;
  notes?: string;
}

interface ChronicCondition {
  condition: string;
  diagnosisDate: string;
  status: 'active' | 'controlled' | 'resolved';
  notes?: string;
}

interface CurrentMedication {
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  prescriber: string;
  status: 'active' | 'discontinued';
}

interface MedicationHistory {
  medication: string;
  dosage: string;
  startDate: string;
  endDate: string;
  reason: string;
  prescriber: string;
}

interface Immunization {
  vaccine: string;
  date: string;
  nextDue?: string;
  provider: string;
}

interface LabResult {
  test: string;
  date: string;
  result: string;
  normalRange: string;
  status: 'normal' | 'abnormal' | 'critical';
  provider: string;
}

interface Consent {
  type: 'share' | 'treatment' | 'research';
  target: string;
  grantedAt: string;
  expires: string;
  status: 'active' | 'expired' | 'revoked';
}

const mockPatients: Patient[] = [
  {
    id: 'P-000123',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1985-05-12',
    gender: 'male',
    contacts: [
      { type: 'mobile', value: '+1-555-0123', verified: true, primary: true },
      { type: 'email', value: 'john.doe@email.com', verified: true, primary: false }
    ],
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1-555-0124',
      email: 'jane.doe@email.com'
    },
    allergies: [
      {
        substance: 'Penicillin',
        reaction: 'Hives and rash',
        severity: 'moderate',
        onsetDate: '2020-03-15',
        notes: 'Patient reported reaction during childhood'
      }
    ],
    chronicConditions: [
      {
        condition: 'Type 2 Diabetes',
        diagnosisDate: '2020-01-15',
        status: 'controlled',
        notes: 'Well controlled with metformin'
      }
    ],
    currentMedications: [
      {
        medication: 'Metformin 500mg',
        dosage: '1 tablet',
        frequency: 'Twice daily',
        startDate: '2020-01-20',
        prescriber: 'Dr. Sarah Smith',
        status: 'active'
      }
    ],
    medicationHistory: [],
    immunizations: [
      {
        vaccine: 'COVID-19 (Pfizer)',
        date: '2021-03-15',
        nextDue: '2022-03-15',
        provider: 'CVS Pharmacy'
      }
    ],
    labResults: [
      {
        test: 'HbA1c',
        date: '2023-12-01',
        result: '6.2%',
        normalRange: '< 7.0%',
        status: 'normal',
        provider: 'LabCorp'
      }
    ],
    consent: [
      {
        type: 'share',
        target: 'Dr. Sarah Smith',
        grantedAt: '2023-01-01T00:00:00Z',
        expires: '2024-01-01T00:00:00Z',
        status: 'active'
      }
    ],
    lastVisit: '2024-01-15',
    status: 'active'
  }
];

const PatientManagement: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showPatientDetail, setShowPatientDetail] = useState(false);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Filter patients
  useEffect(() => {
    const filtered = patients.filter(patient => {
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      const patientId = patient.id.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase()) || 
             patientId.includes(searchTerm.toLowerCase());
    });
    setFilteredPatients(filtered);
  }, [patients, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'deceased': return 'destructive';
      default: return 'default';
    }
  };

  const getAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1">Patient Management</h1>
          <p className="text-body mt-2">Comprehensive patient records and health information</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button size="sm" onClick={() => setShowAddPatient(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--c-neutral-500)]" />
                <Input
                  type="text"
                  placeholder="Search by patient name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <select className="px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--c-primary-500)] focus:border-transparent">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="deceased">Deceased</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Patient Records ({filteredPatients.length} patients)</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age/Gender</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id} interactive>
                    <TableCell>
                      <span className="font-mono text-sm">{patient.id}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[var(--c-primary-100)] rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-[var(--c-primary-600)]" />
                        </div>
                        <div>
                          <p className="font-medium">{patient.firstName} {patient.lastName}</p>
                          <p className="text-sm text-[var(--c-neutral-600)]">
                            DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{getAge(patient.dateOfBirth)} years</p>
                        <p className="text-sm text-[var(--c-neutral-600)] capitalize">{patient.gender}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{patient.contacts.find(c => c.primary)?.value}</p>
                        <p className="text-xs text-[var(--c-neutral-600)]">
                          {patient.contacts.find(c => c.type === 'email')?.value}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {new Date(patient.lastVisit).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(patient.status) as any}>
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" className="p-1" onClick={() => {
                          setSelectedPatient(patient);
                          setShowPatientDetail(true);
                        }}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Patient Detail Modal */}
      {showPatientDetail && selectedPatient && (
        <PatientDetailModal
          patient={selectedPatient}
          onClose={() => setShowPatientDetail(false)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      )}

      {/* Add Patient Modal */}
      {showAddPatient && (
        <AddPatientModal
          onClose={() => setShowAddPatient(false)}
          onSave={(patient) => {
            setPatients(prev => [...prev, patient]);
            setShowAddPatient(false);
          }}
        />
      )}
    </div>
  );
};

// Patient Detail Modal Component
const PatientDetailModal: React.FC<{
  patient: Patient;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}> = ({ patient, onClose, activeTab, onTabChange }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['overview']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const getAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
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
              <div className="w-16 h-16 bg-[var(--c-primary-100)] rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-[var(--c-primary-600)]" />
              </div>
              <div>
                <h2 className="text-h2">{patient.firstName} {patient.lastName}</h2>
                <p className="text-body">{patient.id} • {getAge(patient.dateOfBirth)} years • {patient.gender}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="success">Active</Badge>
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
              { id: 'allergies', label: 'Allergies' },
              { id: 'conditions', label: 'Conditions' },
              { id: 'labs', label: 'Lab Results' },
              { id: 'immunizations', label: 'Immunizations' },
              { id: 'activity', label: 'Activity Log' },
              { id: 'consent', label: 'Consent & Privacy' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
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
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="w-5 h-5" />
                    <span>Contact Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Primary Contacts</h4>
                      <div className="space-y-2">
                        {patient.contacts.map((contact, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${contact.verified ? 'bg-[var(--c-accent-500)]' : 'bg-[var(--c-neutral-400)]'}`} />
                            <span className="text-sm">{contact.value}</span>
                            <Badge variant="outline" size="sm">{contact.type}</Badge>
                            {contact.primary && <Badge variant="info" size="sm">Primary</Badge>}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Address</h4>
                      <div className="text-sm text-[var(--c-neutral-700)]">
                        <p>{patient.address.street}</p>
                        <p>{patient.address.city}, {patient.address.state} {patient.address.zipCode}</p>
                        <p>{patient.address.country}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Emergency Contact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[var(--c-warning-100)] rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-[var(--c-warning-600)]" />
                    </div>
                    <div>
                      <p className="font-medium">{patient.emergencyContact.name}</p>
                      <p className="text-sm text-[var(--c-neutral-600)]">{patient.emergencyContact.relationship}</p>
                      <p className="text-sm text-[var(--c-neutral-600)]">{patient.emergencyContact.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Pill className="w-8 h-8 text-[var(--c-primary-600)] mx-auto mb-2" />
                    <p className="text-2xl font-bold">{patient.currentMedications.length}</p>
                    <p className="text-sm text-[var(--c-neutral-600)]">Active Medications</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <AlertTriangle className="w-8 h-8 text-[var(--c-warning-600)] mx-auto mb-2" />
                    <p className="text-2xl font-bold">{patient.allergies.length}</p>
                    <p className="text-sm text-[var(--c-neutral-600)]">Allergies</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Heart className="w-8 h-8 text-[var(--c-error-600)] mx-auto mb-2" />
                    <p className="text-2xl font-bold">{patient.chronicConditions.length}</p>
                    <p className="text-sm text-[var(--c-neutral-600)]">Chronic Conditions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Activity className="w-8 h-8 text-[var(--c-accent-600)] mx-auto mb-2" />
                    <p className="text-2xl font-bold">{patient.labResults.length}</p>
                    <p className="text-sm text-[var(--c-neutral-600)]">Lab Results</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'medications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-h3">Current Medications</h3>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Medication
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Prescriber</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patient.currentMedications.map((medication, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Pill className="w-4 h-4 text-[var(--c-primary-600)]" />
                          <span className="font-medium">{medication.medication}</span>
                        </div>
                      </TableCell>
                      <TableCell>{medication.dosage}</TableCell>
                      <TableCell>{medication.frequency}</TableCell>
                      <TableCell>{new Date(medication.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{medication.prescriber}</TableCell>
                      <TableCell>
                        <Badge variant={medication.status === 'active' ? 'success' : 'warning'}>
                          {medication.status}
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

          {activeTab === 'allergies' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-h3">Allergies & Adverse Reactions</h3>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Allergy
                </Button>
              </div>
              {patient.allergies.map((allergy, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Badge variant={allergy.severity === 'severe' ? 'destructive' : allergy.severity === 'moderate' ? 'warning' : 'info'}>
                        {allergy.severity}
                      </Badge>
                      <div className="flex-1">
                        <h4 className="font-medium">{allergy.substance}</h4>
                        <p className="text-sm text-[var(--c-neutral-700)] mb-2">{allergy.reaction}</p>
                        <p className="text-xs text-[var(--c-neutral-600)]">
                          Onset: {new Date(allergy.onsetDate).toLocaleDateString()}
                        </p>
                        {allergy.notes && (
                          <p className="text-sm text-[var(--c-neutral-600)] mt-2">{allergy.notes}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'labs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-h3">Lab Results</h3>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Lab Result
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Normal Range</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Provider</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patient.labResults.map((lab, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{lab.test}</TableCell>
                      <TableCell>{new Date(lab.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{lab.result}</TableCell>
                      <TableCell className="text-sm text-[var(--c-neutral-600)]">{lab.normalRange}</TableCell>
                      <TableCell>
                        <Badge variant={lab.status === 'normal' ? 'success' : lab.status === 'abnormal' ? 'warning' : 'destructive'}>
                          {lab.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{lab.provider}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Add Patient Modal Component
const AddPatientModal: React.FC<{
  onClose: () => void;
  onSave: (patient: Patient) => void;
}> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'male' as 'male' | 'female' | 'other',
    mobile: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: ''
  });

  const handleSave = () => {
    const newPatient: Patient = {
      id: `P-${Date.now()}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      contacts: [
        { type: 'mobile', value: formData.mobile, verified: false, primary: true },
        { type: 'email', value: formData.email, verified: false, primary: false }
      ],
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: 'USA'
      },
      emergencyContact: {
        name: formData.emergencyName,
        relationship: formData.emergencyRelationship,
        phone: formData.emergencyPhone
      },
      allergies: [],
      chronicConditions: [],
      currentMedications: [],
      medicationHistory: [],
      immunizations: [],
      labResults: [],
      consent: [],
      lastVisit: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    onSave(newPatient);
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
          <h2 className="text-h2">Add New Patient</h2>
          <p className="text-body mt-2">Create a new patient record</p>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              required
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              required
            />
            <Input
              label="Date of Birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
              required
            />
            <div>
              <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value as any})}
                className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--c-primary-500)] focus:border-transparent"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <Input
              label="Mobile Phone"
              value={formData.mobile}
              onChange={(e) => setFormData({...formData, mobile: e.target.value})}
              required
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <Input
              label="Street Address"
              value={formData.street}
              onChange={(e) => setFormData({...formData, street: e.target.value})}
            />
            <Input
              label="City"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
            />
            <Input
              label="State"
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value})}
            />
            <Input
              label="ZIP Code"
              value={formData.zipCode}
              onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
            />
            <Input
              label="Emergency Contact Name"
              value={formData.emergencyName}
              onChange={(e) => setFormData({...formData, emergencyName: e.target.value})}
            />
            <Input
              label="Emergency Contact Relationship"
              value={formData.emergencyRelationship}
              onChange={(e) => setFormData({...formData, emergencyRelationship: e.target.value})}
            />
            <Input
              label="Emergency Contact Phone"
              value={formData.emergencyPhone}
              onChange={(e) => setFormData({...formData, emergencyPhone: e.target.value})}
            />
          </div>
        </div>
        <div className="p-6 border-t border-[var(--c-neutral-200)] flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Create Patient
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PatientManagement;
