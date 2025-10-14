"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  LogOut, 
  Users, 
  Clock, 
  Bell, 
  Shield, 
  Activity, 
  MessageCircle, 
  Brain, 
  CheckCircle, 
  TrendingUp, 
  Mic, 
  FileText, 
  Eye, 
  Calculator, 
  Package, 
  AlertTriangle, 
  QrCode, 
  Calendar, 
  ShoppingCart, 
  MapPin, 
  CreditCard, 
  Printer, 
  BarChart3, 
  TrendingDown, 
  AlertCircle, 
  Star, 
  Database, 
  Bot, 
  Megaphone, 
  BookOpen,
  Heart,
  Pill,
  Stethoscope,
  Zap,
  Target,
  Award,
  Settings,
  Plus,
  Search,
  UserPlus,
  Upload,
  X,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin as MapPinIcon,
  Calendar as CalendarIcon,
  User,
  Camera,
  Download,
  Filter,
  SortAsc,
  MoreHorizontal,
  Lock,
  Unlock,
  Eye as EyeIcon,
  MessageSquare,
  FileImage,
  FileText as FileTextIcon,
  AlertCircle as AlertCircleIcon,
  CheckCircle as CheckCircleIcon,
  Clock as ClockIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Info,
  HelpCircle,
  ExternalLink,
  Copy,
  Share2,
  Flag,
  Tag,
  Star as StarIcon,
  Heart as HeartIcon,
  Zap as ZapIcon,
  Target as TargetIcon,
  Award as AwardIcon,
  BookOpen as BookOpenIcon,
  Video,
  MessageCircle as MessageCircleIcon,
  Camera as CameraIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  Trash2 as TrashIcon,
  Eye as EyeIconAlt,
  Filter as FilterIcon,
  SortAsc as SortAscIcon,
  MoreHorizontal as MoreHorizontalIcon
} from 'lucide-react';

// Data structures for Patient Profiles
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
  notes: Note[];
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
  frequency: string;
  duration: string;
  prescriberName: string;
  prescriberLicense: string;
  dispensingDate: string;
  pharmacistInitials: string;
  status: 'active' | 'completed' | 'expired' | 'discontinued';
  category: 'chronic' | 'acute';
  refillReminder?: boolean;
  adherenceLog: AdherenceEntry[];
}

interface AdherenceEntry {
  date: string;
  taken: boolean;
  notes?: string;
}

interface AISummary {
  topConditions: string[];
  keyAllergies: string[];
  currentMedications: string[];
  potentialInteractions: string[];
  riskFactors: string[];
  lastUpdated: string;
}

interface Note {
  id: string;
  content: string;
  author: string;
  date: string;
  type: 'pharmacist' | 'system' | 'patient';
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
        extractedData: { glucose: '180 mg/dL', status: 'high' },
        aiAnalysis: 'Elevated blood glucose levels detected. Consider medication review.',
        uploadedBy: 'Dr. Ahmed'
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
        frequency: 'Twice daily',
        duration: '3 months',
        prescriberName: 'Dr. Faraz Ahmed',
        prescriberLicense: 'LIC-12345',
        dispensingDate: '2024-10-01',
        pharmacistInitials: 'SJ',
        status: 'active',
        category: 'chronic',
        refillReminder: true,
        adherenceLog: [
          { date: '2024-10-14', taken: true },
          { date: '2024-10-13', taken: true },
          { date: '2024-10-12', taken: false, notes: 'Forgot morning dose' }
        ]
      }
    ],
    aiSummary: {
      topConditions: ['Type 2 Diabetes', 'Hypertension'],
      keyAllergies: ['Penicillin (Severe)'],
      currentMedications: ['Metformin 500mg', 'Lisinopril 10mg'],
      potentialInteractions: ['Monitor blood sugar with Metformin'],
      riskFactors: ['High blood glucose', 'Medication non-adherence risk'],
      lastUpdated: '2024-10-14'
    },
    notes: [
      {
        id: '1',
        content: 'Patient needs follow-up for blood sugar control',
        author: 'Sarah Johnson (Pharmacist)',
        date: '2024-10-14',
        type: 'pharmacist'
      }
    ]
  }
];

export default function PatientDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activePatientTab, setActivePatientTab] = useState<string>('overview');
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [isAccessCodeModalOpen, setIsAccessCodeModalOpen] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isPatientDetailModalOpen, setIsPatientDetailModalOpen] = useState(false);

  const handleBackToHome = () => {
    router.push('/');
  };

  // Helper functions
  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-green-100 text-green-800 border-green-200';
      case 'under-review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high-risk': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getHealthStatusIcon = (status: string) => {
    switch (status) {
      case 'stable': return <CheckCircle className="w-4 h-4" />;
      case 'under-review': return <Clock className="w-4 h-4" />;
      case 'high-risk': return <AlertTriangle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      case 'discontinued': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Event handlers
  const handleAddPatient = () => {
    setIsAccessCodeModalOpen(true);
  };

  const handleAccessCodeSubmit = () => {
    if (accessCode === '239773') {
      setIsAccessCodeModalOpen(false);
      setIsAddPatientModalOpen(true);
      setAccessCode('');
    } else {
      alert('Invalid access code. Only authorized personnel can add patients.');
    }
  };

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsPatientDetailModalOpen(true);
    setActivePatientTab('overview');
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.uniqueId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || patient.healthStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sections = [
    {
      id: 'overview',
      title: 'Dashboard Overview',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600',
      description: 'Welcome to your comprehensive patient management system'
    },
    {
      id: 'patient-health',
      title: 'Patient & Health Management',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      features: [
        { name: 'Patient Profiles', description: 'Store full medical histories, allergies, and prescriptions', icon: Users, functional: true },
        { name: 'Medication History Tracker', description: 'Timeline of drugs dispensed and responses', icon: Clock },
        { name: 'Refill Reminders', description: 'Auto-alerts for patients and pharmacist when refills are due', icon: Bell },
        { name: 'AI Drug Interaction Checker', description: 'Detects unsafe combinations instantly', icon: Shield },
        { name: 'Chronic Disease Tracker', description: 'Monitors blood sugar, BP, and cholesterol trends', icon: Activity },
        { name: 'Patient Chat/Tele-Consultation', description: 'Secure messaging or video call between patient and pharmacist', icon: MessageCircle }
      ]
    },
    {
      id: 'ai-predictive',
      title: 'AI & Predictive Features',
      icon: Brain,
      color: 'from-purple-500 to-purple-600',
      features: [
        { name: 'AI Symptom Analyzer', description: 'Patient enters symptoms → AI gives possible conditions and OTC options', icon: Stethoscope },
        { name: 'AI Prescription Verification', description: 'Checks prescriptions for missing or unsafe elements', icon: CheckCircle },
        { name: 'AI Stock Prediction', description: 'Predicts which medicines will be in high demand soon', icon: TrendingUp },
        { name: 'AI Adherence Scoring', description: 'Detects if a patient is likely to skip doses based on patterns', icon: Target },
        { name: 'AI Counseling Assistant', description: 'Generates personalized advice for each patient (diet, drug timing, precautions)', icon: Bot },
        { name: 'Voice Assistant', description: 'Allows elderly or disabled patients to speak commands or ask queries', icon: Mic }
      ]
    },
    {
      id: 'prescription-dispensing',
      title: 'Prescription & Dispensing',
      icon: Pill,
      color: 'from-green-500 to-green-600',
      features: [
        { name: 'E-Prescription Upload', description: 'Upload or receive prescriptions directly from doctors', icon: FileText },
        { name: 'OCR Handwriting Reader', description: 'Converts handwritten prescriptions into digital text', icon: Eye },
        { name: 'Prescription Approval Workflow', description: 'Pharmacist reviews → verifies → dispenses', icon: CheckCircle },
        { name: 'Drug Substitute Finder', description: 'AI suggests cheaper or equivalent alternatives', icon: Search },
        { name: 'Dosage Calculator', description: 'Calculates pediatric, geriatric, or renal-adjusted doses automatically', icon: Calculator }
      ]
    },
    {
      id: 'inventory-management',
      title: 'Inventory & Pharmacy Management',
      icon: Package,
      color: 'from-orange-500 to-orange-600',
      features: [
        { name: 'Smart Inventory Alerts', description: 'Notifies low stock, near expiry, or recalled drugs', icon: AlertTriangle },
        { name: 'Barcode/QR Integration', description: 'Fast drug scanning and tracking', icon: QrCode },
        { name: 'Batch & Expiry Tracking', description: 'Each drug tracked by lot number and expiry date', icon: Calendar },
        { name: 'Purchase Order Automation', description: 'Auto-generate supplier orders when stock is low', icon: Package },
        { name: 'Supplier Integration', description: 'Track availability and pricing from distributors in real-time', icon: TrendingUp }
      ]
    },
    {
      id: 'online-ordering',
      title: 'Online Ordering & Delivery',
      icon: ShoppingCart,
      color: 'from-teal-500 to-teal-600',
      features: [
        { name: 'Patient Medicine Ordering System', description: 'Patients place orders directly', icon: ShoppingCart },
        { name: 'Delivery Tracking Dashboard', description: 'Real-time map view of deliveries', icon: MapPin },
        { name: 'Secure Online Payment Gateway', description: 'Supports cards, Easypaisa, JazzCash, etc.', icon: CreditCard },
        { name: 'Smart Packaging Label Generator', description: 'Auto-prints label with patient name, dose, precautions', icon: Printer }
      ]
    },
    {
      id: 'reports-analytics',
      title: 'Reports & Analytics',
      icon: BarChart3,
      color: 'from-indigo-500 to-indigo-600',
      features: [
        { name: 'Sales & Revenue Dashboard', description: 'Daily/weekly/monthly analytics', icon: BarChart3 },
        { name: 'Drug Usage Insights', description: 'Identifies high-selling or high-risk medications', icon: TrendingDown },
        { name: 'ADR & Pharmacovigilance Reporting', description: 'One-click submission of adverse drug reactions', icon: AlertCircle },
        { name: 'Performance & Feedback Reports', description: 'Track patient satisfaction and pharmacist efficiency', icon: Star }
      ]
    },
    {
      id: 'advanced-features',
      title: 'Advanced Features',
      icon: Zap,
      color: 'from-pink-500 to-pink-600',
      features: [
        { name: 'Blockchain Prescription Vault', description: 'Tamper-proof record of prescriptions', icon: Database },
        { name: 'Smart Dosage Delivery Robot Integration', description: 'Integration with your AI robot project', icon: Bot },
        { name: 'AI-Powered Marketing Tool', description: 'Suggests which products to promote', icon: Megaphone },
        { name: 'Drug Recall Alert System', description: 'Real-time notifications from regulatory bodies', icon: AlertTriangle },
        { name: 'E-Learning Hub', description: 'Continuous education modules for pharmacists', icon: BookOpen }
      ]
    }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Patient Management System</h2>
        <p className="text-lg text-gray-600 mb-8">Comprehensive healthcare management with 35+ advanced features</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.slice(1).map((section) => (
          <motion.div
            key={section.id}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => setActiveSection(section.id)}
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center mb-4`}>
              <section.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{section.features?.length || 0} features</p>
            <div className="flex items-center text-blue-600 text-sm font-medium">
              <span>Explore Features</span>
              <Plus className="w-4 h-4 ml-1" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSection = (section: any) => {
    // Special handling for Patient Profiles
    if (section.id === 'patient-health') {
  return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center`}>
              <section.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              <p className="text-gray-600">{section.features?.length || 0} advanced features</p>
            </div>
          </div>

          {/* Patient Profiles - Fully Functional */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
        <div>
                  <h3 className="text-xl font-bold text-gray-900">Patient Profiles</h3>
                  <p className="text-gray-600">Store full medical histories, allergies, and prescriptions</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ Fully Functional
                </span>
                <button
                  onClick={handleAddPatient}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Add Patient</span>
                </button>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search patients by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="stable">Stable</option>
                  <option value="under-review">Under Review</option>
                  <option value="high-risk">High Risk</option>
                </select>
              </div>
            </div>

            {/* Patient Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.map((patient) => (
                <motion.div
                  key={patient.id}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => handlePatientClick(patient)}
                >
                  {/* Profile Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                      {patient.fullName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{patient.fullName}</h4>
                      <p className="text-sm text-gray-600">ID: {patient.uniqueId}</p>
                    </div>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getHealthStatusColor(patient.healthStatus)}`}>
                      {getHealthStatusIcon(patient.healthStatus)}
                      <span className="capitalize">{patient.healthStatus.replace('-', ' ')}</span>
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{patient.age} years old • {patient.gender}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{patient.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{patient.email}</span>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="font-semibold text-gray-900">{patient.prescriptions.length}</div>
                      <div className="text-gray-600">Prescriptions</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="font-semibold text-gray-900">{patient.allergies.length}</div>
                      <div className="text-gray-600">Allergies</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="font-semibold text-gray-900">{patient.medicalHistory.length}</div>
                      <div className="text-gray-600">Records</div>
                    </div>
                  </div>

                  {/* AI Summary Preview */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">AI Summary</span>
                    </div>
                    <p className="text-xs text-blue-800">
                      {patient.aiSummary.topConditions.slice(0, 2).join(', ')} • 
                      {patient.aiSummary.keyAllergies.length > 0 && ` ${patient.aiSummary.keyAllergies.length} allergies`}
                    </p>
        </div>
                </motion.div>
              ))}
      </div>

            {filteredPatients.length === 0 && (
            <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <button
                  onClick={handleAddPatient}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200"
                >
                Add First Patient
                </button>
              </div>
            )}
          </div>

          {/* Other Features - Coming Soon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.features?.slice(1).map((feature: any, index: number) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Coming Soon
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Learn More →
                      </button>
                    </div>
                  </div>
            </div>
              </motion.div>
            ))}
      </div>
    </div>
  );
}

    // Default rendering for other sections
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center`}>
            <section.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
            <p className="text-gray-600">{section.features?.length || 0} advanced features</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {section.features?.map((feature: any, index: number) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Coming Soon
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

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
              Patient Dashboard
            </motion.h1>
            <motion.p
              className="text-xl text-blue-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              35+ Advanced Healthcare Features
            </motion.p>
          </div>
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Heart className="w-16 h-16 text-white" />
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Navigation Tabs */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="flex flex-wrap">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 min-w-0 px-4 py-4 text-center transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <section.icon className="w-5 h-5 mx-auto mb-2" />
                <span className="text-sm font-medium block truncate">{section.title}</span>
              </motion.button>
            ))}
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
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          {activeSection === 'overview' ? renderOverview() : renderSection(sections.find(s => s.id === activeSection))}
        </div>
      </motion.div>

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

      {/* Access Code Modal */}
      {isAccessCodeModalOpen && (
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
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Required</h2>
              <p className="text-gray-600">Enter access code to add new patients</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Access Code</label>
                <input
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter access code..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsAccessCodeModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAccessCodeSubmit}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200"
                >
                  Verify
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Patient Detail Modal */}
      {isPatientDetailModalOpen && selectedPatient && (
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div 
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setIsPatientDetailModalOpen(false)}
          />
          
          <motion.div
            className="w-full max-w-4xl bg-white shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {selectedPatient.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.fullName}</h2>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">ID: {selectedPatient.uniqueId}</span>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getHealthStatusColor(selectedPatient.healthStatus)}`}>
                      {getHealthStatusIcon(selectedPatient.healthStatus)}
                      <span className="capitalize">{selectedPatient.healthStatus.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsPatientDetailModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'allergies', label: 'Allergies', icon: AlertTriangle },
                { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
                { id: 'reports', label: 'Reports', icon: FileText },
                { id: 'notes', label: 'Notes', icon: MessageSquare }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePatientTab(tab.id)}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                    activePatientTab === tab.id
                      ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4 inline mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {activePatientTab === 'overview' && (
                <div className="space-y-6">
                  {/* AI Summary */}
                  <div className="bg-blue-50 rounded-xl p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Brain className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-bold text-blue-900">AI Health Summary</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">Top Conditions</h4>
                        <ul className="space-y-1">
                          {selectedPatient.aiSummary.topConditions.map((condition, index) => (
                            <li key={index} className="text-blue-700 text-sm">• {condition}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">Key Allergies</h4>
                        <ul className="space-y-1">
                          {selectedPatient.aiSummary.keyAllergies.map((allergy, index) => (
                            <li key={index} className="text-blue-700 text-sm">• {allergy}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Age & DOB</p>
                            <p className="font-medium">{selectedPatient.age} years old • {selectedPatient.dateOfBirth}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Gender</p>
                            <p className="font-medium">{selectedPatient.gender}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium">{selectedPatient.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{selectedPatient.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPinIcon className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Address</p>
                            <p className="font-medium">{selectedPatient.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-gray-900">{selectedPatient.prescriptions.length}</div>
                          <div className="text-sm text-gray-600">Prescriptions</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-gray-900">{selectedPatient.allergies.length}</div>
                          <div className="text-sm text-gray-600">Allergies</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-gray-900">{selectedPatient.medicalHistory.length}</div>
                          <div className="text-sm text-gray-600">Records</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-gray-900">{selectedPatient.notes.length}</div>
                          <div className="text-sm text-gray-600">Notes</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePatientTab === 'allergies' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Allergies & Sensitivities</h3>
                  <div className="space-y-3">
                    {selectedPatient.allergies.map((allergy) => (
                      <div key={allergy.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">{allergy.name}</h4>
                            <p className="text-sm text-gray-600 capitalize">{allergy.type} Allergy</p>
                            <p className="text-sm text-gray-700 mt-1">{allergy.description}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(allergy.severity)}`}>
                            {allergy.severity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activePatientTab === 'prescriptions' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Current Prescriptions</h3>
                  <div className="space-y-3">
                    {selectedPatient.prescriptions.map((prescription) => (
                      <div key={prescription.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{prescription.drugName}</h4>
                            <p className="text-sm text-gray-600">{prescription.dosage} • {prescription.frequency}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                            {prescription.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><strong>Prescriber:</strong> {prescription.prescriberName}</p>
                          <p><strong>Dispensed:</strong> {prescription.dispensingDate}</p>
                          <p><strong>Duration:</strong> {prescription.duration}</p>
                          {prescription.refillReminder && (
                            <p className="text-orange-600"><strong>Refill Reminder:</strong> Active</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activePatientTab === 'reports' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Medical Records</h3>
                  <div className="space-y-3">
                    {selectedPatient.medicalHistory.map((record) => (
                      <div key={record.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">{record.title}</h4>
                            <p className="text-sm text-gray-600">Date: {record.date}</p>
                            <p className="text-sm text-gray-600">Type: {record.type}</p>
                            {record.aiAnalysis && (
                              <p className="text-sm text-blue-700 mt-2 bg-blue-50 p-2 rounded">
                                <strong>AI Analysis:</strong> {record.aiAnalysis}
                              </p>
                            )}
                          </div>
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activePatientTab === 'notes' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Notes & Comments</h3>
                  <div className="space-y-3">
                    {selectedPatient.notes.map((note) => (
                      <div key={note.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium text-gray-900">{note.author}</p>
                          <span className="text-sm text-gray-500">{note.date}</span>
                        </div>
                        <p className="text-gray-700">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}