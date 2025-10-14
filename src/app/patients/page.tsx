"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  LogOut, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Upload, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Heart, 
  Pill, 
  Activity, 
  MessageCircle, 
  Shield, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  QrCode, 
  Download, 
  Send, 
  Bell, 
  Star, 
  TrendingUp, 
  AlertCircle, 
  X, 
  Save, 
  Camera, 
  Scan,
  Brain,
  Zap,
  Target,
  Award,
  Settings,
  Lock,
  Unlock,
  History,
  FileImage,
  Stethoscope,
  TestTube,
  ClipboardList,
  BookOpen,
  ShieldCheck,
  UserCheck,
  Database,
  Cloud,
  Wifi,
  WifiOff,
  BarChart3
} from 'lucide-react';

// Types
interface Patient {
  id: string;
  fullName: string;
  age: number;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
  phone: string;
  address: string;
  profilePicture?: string;
  uniqueId: string;
  qrCode: string;
  healthStatus: 'stable' | 'under-review' | 'high-risk';
  createdAt: string;
  lastUpdated: string;
  medicalHistory: MedicalRecord[];
  allergies: Allergy[];
  prescriptions: Prescription[];
  aiSummary: AISummary;
  accessLogs: AccessLog[];
}

interface MedicalRecord {
  id: string;
  type: 'lab-report' | 'prescription' | 'discharge-summary' | 'scan' | 'other';
  title: string;
  date: string;
  fileUrl: string;
  extractedData?: any;
  aiAnalysis?: string;
  uploadedBy: string;
}

interface Allergy {
  id: string;
  type: 'drug' | 'food' | 'environmental';
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  dateAdded: string;
}

interface Prescription {
  id: string;
  drugName: string;
  dosage: string;
  duration: string;
  frequency: string;
  prescriberName: string;
  prescriberLicense: string;
  dispensingDate: string;
  pharmacistInitials: string;
  status: 'active' | 'completed' | 'expired' | 'discontinued';
  isChronic: boolean;
  adherenceScore?: number;
}

interface AISummary {
  topConditions: string[];
  keyAllergies: string[];
  currentMedications: string[];
  potentialInteractions: string[];
  riskFactors: string[];
  lastUpdated: string;
}

interface AccessLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  timestamp: string;
  details: string;
}

// Mock data
const mockPatients: Patient[] = [
  {
    id: '1',
    fullName: 'Ayesha Khan',
    age: 42,
    dateOfBirth: '1982-03-15',
    gender: 'Female',
    email: 'ayesha.khan@email.com',
    phone: '+92-300-1234567',
    address: '123 Main Street, Karachi, Pakistan',
    uniqueId: 'PAT-2024-001',
    qrCode: 'QR-001',
    healthStatus: 'under-review',
    createdAt: '2024-01-15',
    lastUpdated: '2024-10-14',
    medicalHistory: [
      {
        id: '1',
        type: 'lab-report',
        title: 'Blood Glucose Test',
        date: '2024-10-10',
        fileUrl: '/reports/glucose-test.pdf',
        extractedData: { glucose: '180 mg/dL', hba1c: '8.2%' },
        aiAnalysis: 'Elevated blood glucose levels detected. HbA1c indicates poor diabetes control.',
        uploadedBy: 'Dr. Faraz Ahmed'
      }
    ],
    allergies: [
      {
        id: '1',
        type: 'drug',
        name: 'Penicillin',
        severity: 'severe',
        description: 'Causes severe allergic reaction',
        dateAdded: '2024-01-15'
      }
    ],
    prescriptions: [
      {
        id: '1',
        drugName: 'Metformin',
        dosage: '500mg',
        duration: '3 months',
        frequency: 'Twice daily',
        prescriberName: 'Dr. Faraz Ahmed',
        prescriberLicense: 'MD-12345',
        dispensingDate: '2024-10-01',
        pharmacistInitials: 'SJ',
        status: 'active',
        isChronic: true,
        adherenceScore: 85
      }
    ],
    aiSummary: {
      topConditions: ['Type 2 Diabetes', 'Hypertension'],
      keyAllergies: ['Penicillin (Severe)'],
      currentMedications: ['Metformin 500mg', 'Lisinopril 10mg'],
      potentialInteractions: ['Monitor blood glucose with Metformin'],
      riskFactors: ['Poor diabetes control', 'Elevated HbA1c'],
      lastUpdated: '2024-10-14'
    },
    accessLogs: [
      {
        id: '1',
        userId: 'pharm001',
        userName: 'Sarah Johnson',
        action: 'Profile Viewed',
        timestamp: '2024-10-14 10:30:00',
        details: 'Accessed patient profile for medication review'
      }
    ]
  }
];

export default function PatientProfiles() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showAccessCodeModal, setShowAccessCodeModal] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [newPatient, setNewPatient] = useState<Partial<Patient>>({
    fullName: '',
    dateOfBirth: '',
    gender: 'Male',
    email: '',
    phone: '',
    address: '',
    uniqueId: `PAT-2024-${String(patients.length + 1).padStart(3, '0')}`,
    qrCode: `QR-${String(patients.length + 1).padStart(3, '0')}`,
    healthStatus: 'stable'
  });

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleAddPatient = () => {
    setShowAccessCodeModal(true);
  };

  const verifyAccessCode = () => {
    if (accessCode === '239773') {
      setShowAccessCodeModal(false);
      setShowAddPatientModal(true);
      setAccessCode('');
    } else {
      alert('Invalid access code. Only authorized personnel can add patients.');
      setAccessCode('');
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'stable':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high-risk':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getHealthStatusIcon = (status: string) => {
    switch (status) {
      case 'stable':
        return <CheckCircle className="w-4 h-4" />;
      case 'under-review':
        return <Clock className="w-4 h-4" />;
      case 'high-risk':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'severe':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      case 'discontinued':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.uniqueId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || patient.healthStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderOverview = (patient: Patient) => (
    <div className="space-y-6">
      {/* Patient Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {patient.fullName.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{patient.fullName}</h2>
            <p className="text-gray-600">ID: {patient.uniqueId} • Age: {patient.age} • {patient.gender}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getHealthStatusColor(patient.healthStatus)}`}>
                {getHealthStatusIcon(patient.healthStatus)}
                <span className="ml-1 capitalize">{patient.healthStatus.replace('-', ' ')}</span>
              </span>
              <span className="text-sm text-gray-500">Last updated: {patient.lastUpdated}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center">
              <QrCode className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-xs text-gray-500 mt-1">QR Code</p>
          </div>
        </div>
      </div>

      {/* AI Health Summary */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-900">AI Health Summary</h3>
          <span className="text-xs text-gray-500">Updated: {patient.aiSummary.lastUpdated}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Top Conditions</h4>
            <div className="space-y-1">
              {patient.aiSummary.topConditions.map((condition, index) => (
                <span key={index} className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mr-2 mb-1">
                  {condition}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Key Allergies</h4>
            <div className="space-y-1">
              {patient.aiSummary.keyAllergies.map((allergy, index) => (
                <span key={index} className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm mr-2 mb-1">
                  {allergy}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Current Medications</h4>
            <div className="space-y-1">
              {patient.aiSummary.currentMedications.map((med, index) => (
                <span key={index} className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm mr-2 mb-1">
                  {med}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Risk Factors</h4>
            <div className="space-y-1">
              {patient.aiSummary.riskFactors.map((risk, index) => (
                <span key={index} className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm mr-2 mb-1">
                  {risk}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Prescriptions</p>
              <p className="text-2xl font-bold text-blue-600">{patient.prescriptions.filter(p => p.status === 'active').length}</p>
            </div>
            <Pill className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Allergies</p>
              <p className="text-2xl font-bold text-red-600">{patient.allergies.length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Medical Records</p>
              <p className="text-2xl font-bold text-green-600">{patient.medicalHistory.length}</p>
            </div>
            <FileText className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Adherence Score</p>
              <p className="text-2xl font-bold text-purple-600">
                {patient.prescriptions.length > 0 ? 
                  Math.round(patient.prescriptions.reduce((acc, p) => acc + (p.adherenceScore || 0), 0) / patient.prescriptions.length) : 
                  0}%
              </p>
            </div>
            <Target className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAllergies = (patient: Patient) => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Allergies & Sensitivities</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 inline mr-2" />
          Add Allergy
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {patient.allergies.map((allergy) => (
          <div key={allergy.id} className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">{allergy.name}</h4>
                <p className="text-sm text-gray-600 capitalize">{allergy.type} Allergy</p>
                <p className="text-sm text-gray-700 mt-1">{allergy.description}</p>
                <p className="text-xs text-gray-500 mt-2">Added: {allergy.dateAdded}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(allergy.severity)}`}>
                {allergy.severity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPrescriptions = (patient: Patient) => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Prescription Records</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 inline mr-2" />
          Add Prescription
        </button>
      </div>
      
      <div className="space-y-4">
        {patient.prescriptions.map((prescription) => (
          <div key={prescription.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-gray-900">{prescription.drugName}</h4>
                <p className="text-gray-600">{prescription.dosage} • {prescription.frequency}</p>
                <p className="text-sm text-gray-500">Duration: {prescription.duration}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                  {prescription.status}
                </span>
                {prescription.isChronic && (
                  <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium ml-2">
                    Chronic
                  </span>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Prescriber:</strong> {prescription.prescriberName}</p>
                <p><strong>License:</strong> {prescription.prescriberLicense}</p>
              </div>
              <div>
                <p><strong>Dispensed:</strong> {prescription.dispensingDate}</p>
                <p><strong>Pharmacist:</strong> {prescription.pharmacistInitials}</p>
              </div>
            </div>
            
            {prescription.adherenceScore && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Adherence Score</span>
                  <span>{prescription.adherenceScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${prescription.adherenceScore}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderReports = (patient: Patient) => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Medical Records</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Upload className="w-4 h-4 inline mr-2" />
          Upload Report
        </button>
      </div>
      
      <div className="space-y-4">
        {patient.medicalHistory.map((record) => (
          <div key={record.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  {record.type === 'lab-report' ? <TestTube className="w-6 h-6 text-blue-600" /> :
                   record.type === 'prescription' ? <Pill className="w-6 h-6 text-blue-600" /> :
                   record.type === 'scan' ? <Scan className="w-6 h-6 text-blue-600" /> :
                   <FileText className="w-6 h-6 text-blue-600" />}
                </div>
        <div>
                  <h4 className="text-lg font-bold text-gray-900">{record.title}</h4>
                  <p className="text-gray-600 capitalize">{record.type.replace('-', ' ')}</p>
                  <p className="text-sm text-gray-500">Date: {record.date} • Uploaded by: {record.uploadedBy}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {record.aiAnalysis && (
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-blue-900">AI Analysis</span>
                </div>
                <p className="text-blue-800 text-sm">{record.aiAnalysis}</p>
              </div>
            )}
            
            {record.extractedData && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">Extracted Data</h5>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(record.extractedData).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
        </div>
  );

  const renderNotes = (patient: Patient) => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Pharmacist Notes</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 inline mr-2" />
          Add Note
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              SJ
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
              <p className="text-sm text-gray-500">Pharmacist • 2024-10-14 10:30 AM</p>
            </div>
          </div>
          <p className="text-gray-700">
            Patient shows good adherence to Metformin. Blood glucose levels are improving. 
            Recommend follow-up consultation with endocrinologist for HbA1c review.
          </p>
            </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <motion.header
        className="relative bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500 text-white rounded-xl mx-4 mt-4 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <motion.h1
              className="text-4xl font-bold mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Patient Profiles
            </motion.h1>
            <motion.p
              className="text-xl text-blue-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              360° Patient Data Management System
            </motion.p>
          </div>
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Users className="w-16 h-16 text-white" />
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Search and Filter Bar */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search patients by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="stable">Stable</option>
                <option value="under-review">Under Review</option>
                <option value="high-risk">High Risk</option>
              </select>
              
              <button
                onClick={handleAddPatient}
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Add Patient
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {selectedPatient ? (
          <div className="space-y-6">
            {/* Patient Header */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.fullName}</h2>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-200">
                {[
                  { id: 'overview', label: 'Overview', icon: BarChart3 },
                  { id: 'allergies', label: 'Allergies', icon: AlertTriangle },
                  { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
                  { id: 'reports', label: 'Reports', icon: FileText },
                  { id: 'notes', label: 'Notes', icon: MessageCircle }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 inline mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              {activeTab === 'overview' && renderOverview(selectedPatient)}
              {activeTab === 'allergies' && renderAllergies(selectedPatient)}
              {activeTab === 'prescriptions' && renderPrescriptions(selectedPatient)}
              {activeTab === 'reports' && renderReports(selectedPatient)}
              {activeTab === 'notes' && renderNotes(selectedPatient)}
            </div>
          </div>
        ) : (
          /* Patient List */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <motion.div
                key={patient.id}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {patient.fullName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{patient.fullName}</h3>
                    <p className="text-sm text-gray-600">ID: {patient.uniqueId}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getHealthStatusColor(patient.healthStatus)}`}>
                    {getHealthStatusIcon(patient.healthStatus)}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Age: {patient.age} • {patient.gender}</p>
                  <p>Phone: {patient.phone}</p>
                  <p>Active Prescriptions: {patient.prescriptions.filter(p => p.status === 'active').length}</p>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Last updated: {patient.lastUpdated}</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Profile →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Access Code Modal */}
      <AnimatePresence>
        {showAccessCodeModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-center">
                <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Access Required</h3>
                <p className="text-gray-600 mb-6">Enter access code to add new patients</p>
                
                <input
                  type="password"
                  placeholder="Enter access code"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                />
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAccessCodeModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={verifyAccessCode}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Patient Modal */}
      <AnimatePresence>
        {showAddPatientModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Add New Patient</h3>
                <button
                  onClick={() => setShowAddPatientModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newPatient.fullName}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={newPatient.dateOfBirth}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, gender: e.target.value as 'Male' | 'Female' | 'Other' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Health Status</label>
                  <select
                    value={newPatient.healthStatus}
                    onChange={(e) => setNewPatient(prev => ({ ...prev, healthStatus: e.target.value as 'stable' | 'under-review' | 'high-risk' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="stable">Stable</option>
                    <option value="under-review">Under Review</option>
                    <option value="high-risk">High Risk</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  value={newPatient.address}
                  onChange={(e) => setNewPatient(prev => ({ ...prev, address: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAddPatientModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Add patient logic here
                    setShowAddPatientModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Patient
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Home Button */}
      <motion.div
        className="fixed bottom-6 left-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <button
          onClick={handleBackToHome}
          className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center space-x-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </motion.div>
    </div>
  );
}