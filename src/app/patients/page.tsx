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
  MoreHorizontal as MoreHorizontalIcon,
  // Medication History Tracker Icons
  History,
  TrendingUp as TrendingUpIconAlt,
  AlertTriangle as AlertTriangleIcon,
  CheckCircle as CheckCircleIconAlt,
  XCircle,
  RefreshCw,
  FileSpreadsheet,
  BarChart,
  PieChart,
  LineChart,
  Activity as ActivityIcon,
  Zap as ZapIconAlt,
  Target as TargetIconAlt,
  Calendar as CalendarIconAlt,
  Clock as ClockIconAlt,
  User as UserIcon,
  MessageSquare as MessageSquareIcon,
  Flag as FlagIcon,
  AlertCircle as AlertCircleIconAlt,
  CheckCircle2,
  XCircle as XCircleIcon,
  Minus,
  Plus as PlusIcon,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Play,
  Pause,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Octagon,
  Diamond,
  Heart as HeartIconAlt,
  Smile,
  Frown,
  Meh,
  ThumbsUp,
  ThumbsDown,
  Star as StarIconAlt,
  Bookmark,
  BookmarkCheck,
  BookmarkX,
  Tag as TagIcon,
  Hash,
  AtSign,
  DollarSign,
  Percent,
  Hash as HashIcon,
  AtSign as AtSignIcon,
  DollarSign as DollarSignIcon,
  Percent as PercentIcon,
  Hash as HashIconAlt,
  AtSign as AtSignIconAlt,
  DollarSign as DollarSignIconAlt,
  Percent as PercentIconAlt
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

// Medication History Tracker Data Structures
interface MedicationHistoryEntry {
  id: string;
  drugName: string;
  brandName?: string;
  genericName: string;
  strength: string; // e.g., "500mg"
  dosage: string; // e.g., "BID", "TID", "OD"
  frequency: string; // e.g., "Twice daily"
  duration: string; // e.g., "14 days"
  startDate: string;
  endDate: string;
  prescriberName: string;
  prescriberLicense: string;
  dispensingDate: string;
  pharmacistInitials: string;
  status: 'active' | 'completed' | 'discontinued' | 'expired';
  responseStatus: 'well-tolerated' | 'mild-issues' | 'adverse-reaction' | 'unknown';
  effectivenessRating?: number; // 1-10 scale
  sideEffects: SideEffect[];
  adherenceLog: AdherenceEntry[];
  refillHistory: RefillEntry[];
  aiAnalysis?: string;
  flags: MedicationFlag[];
  createdAt: string;
  lastUpdated: string;
}

interface SideEffect {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  reportedDate: string;
  reportedBy: 'patient' | 'pharmacist' | 'doctor';
  resolved: boolean;
  resolutionDate?: string;
}

interface AdherenceEntry {
  id: string;
  date: string;
  taken: boolean;
  notes?: string;
  reportedBy: 'patient' | 'pharmacist' | 'system';
  timeOfDay?: string;
}

interface RefillEntry {
  id: string;
  refillDate: string;
  quantity: number;
  pharmacistInitials: string;
  notes?: string;
  autoRefill: boolean;
}

interface MedicationFlag {
  id: string;
  type: 'allergy' | 'interaction' | 'contraindication' | 'monitoring' | 'discontinued';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  flaggedBy: string;
  flaggedDate: string;
  resolved: boolean;
  resolutionDate?: string;
}

interface MedicationAnalytics {
  averageAdherence: number; // percentage
  totalMedications: number;
  activeMedications: number;
  discontinuedMedications: number;
  topSideEffects: { name: string; count: number }[];
  adherenceTrend: 'improving' | 'declining' | 'stable';
  missedDosesLast30Days: number;
  drugSwitchFrequency: number;
  averageEffectivenessRating: number;
  riskScore: number; // 1-10 scale
  lastUpdated: string;
}

interface MedicationTimelineFilter {
  timeRange: '3months' | '6months' | '1year' | 'all';
  category: 'all' | 'antibiotics' | 'antihypertensives' | 'antidiabetics' | 'pain-relief' | 'other';
  status: 'all' | 'active' | 'completed' | 'discontinued' | 'expired';
  responseStatus: 'all' | 'well-tolerated' | 'mild-issues' | 'adverse-reaction' | 'unknown';
  sortBy: 'date' | 'effectiveness' | 'adherence' | 'alphabetical';
}

interface ExportOptions {
  format: 'pdf' | 'csv';
  dateRange: {
    start: string;
    end: string;
  };
  includeAnalytics: boolean;
  includeSideEffects: boolean;
  includeAdherenceLog: boolean;
  includeNotes: boolean;
}

// Mock data for Medication History Tracker
const mockMedicationHistory: MedicationHistoryEntry[] = [
  {
    id: 'med-1',
    drugName: 'Metformin',
    brandName: 'Glucophage',
    genericName: 'Metformin HCl',
    strength: '500mg',
    dosage: 'BID',
    frequency: 'Twice daily',
    duration: '90 days',
    startDate: '2024-08-01',
    endDate: '2024-10-30',
    prescriberName: 'Dr. Faraz Ahmed',
    prescriberLicense: 'LIC-12345',
    dispensingDate: '2024-08-01',
    pharmacistInitials: 'SJ',
    status: 'active',
    responseStatus: 'well-tolerated',
    effectivenessRating: 8,
    sideEffects: [
      {
        id: 'se-1',
        name: 'Mild nausea',
        severity: 'mild',
        description: 'Occasional nausea after morning dose',
        reportedDate: '2024-08-15',
        reportedBy: 'patient',
        resolved: true,
        resolutionDate: '2024-08-20'
      }
    ],
    adherenceLog: [
      { id: 'ad-1', date: '2024-10-14', taken: true, reportedBy: 'patient', timeOfDay: '08:00' },
      { id: 'ad-2', date: '2024-10-14', taken: true, reportedBy: 'patient', timeOfDay: '20:00' },
      { id: 'ad-3', date: '2024-10-13', taken: true, reportedBy: 'patient', timeOfDay: '08:00' },
      { id: 'ad-4', date: '2024-10-13', taken: false, notes: 'Forgot evening dose', reportedBy: 'patient', timeOfDay: '20:00' },
      { id: 'ad-5', date: '2024-10-12', taken: true, reportedBy: 'patient', timeOfDay: '08:00' },
      { id: 'ad-6', date: '2024-10-12', taken: true, reportedBy: 'patient', timeOfDay: '20:00' }
    ],
    refillHistory: [
      {
        id: 'ref-1',
        refillDate: '2024-08-01',
        quantity: 60,
        pharmacistInitials: 'SJ',
        autoRefill: false
      },
      {
        id: 'ref-2',
        refillDate: '2024-09-01',
        quantity: 60,
        pharmacistInitials: 'SJ',
        autoRefill: true
      }
    ],
    aiAnalysis: 'Good adherence pattern with 95% compliance. Mild GI side effects resolved with time. Continue current regimen.',
    flags: [],
    createdAt: '2024-08-01',
    lastUpdated: '2024-10-14'
  },
  {
    id: 'med-2',
    drugName: 'Amoxicillin',
    brandName: 'Amoxil',
    genericName: 'Amoxicillin',
    strength: '500mg',
    dosage: 'TID',
    frequency: 'Three times daily',
    duration: '7 days',
    startDate: '2024-09-15',
    endDate: '2024-09-22',
    prescriberName: 'Dr. Sarah Khan',
    prescriberLicense: 'LIC-67890',
    dispensingDate: '2024-09-15',
    pharmacistInitials: 'SJ',
    status: 'completed',
    responseStatus: 'mild-issues',
    effectivenessRating: 7,
    sideEffects: [
      {
        id: 'se-2',
        name: 'Mild rash',
        severity: 'mild',
        description: 'Small red spots on arms',
        reportedDate: '2024-09-18',
        reportedBy: 'patient',
        resolved: true,
        resolutionDate: '2024-09-25'
      }
    ],
    adherenceLog: [
      { id: 'ad-7', date: '2024-09-15', taken: true, reportedBy: 'patient', timeOfDay: '08:00' },
      { id: 'ad-8', date: '2024-09-15', taken: true, reportedBy: 'patient', timeOfDay: '14:00' },
      { id: 'ad-9', date: '2024-09-15', taken: true, reportedBy: 'patient', timeOfDay: '20:00' },
      { id: 'ad-10', date: '2024-09-16', taken: true, reportedBy: 'patient', timeOfDay: '08:00' },
      { id: 'ad-11', date: '2024-09-16', taken: true, reportedBy: 'patient', timeOfDay: '14:00' },
      { id: 'ad-12', date: '2024-09-16', taken: true, reportedBy: 'patient', timeOfDay: '20:00' }
    ],
    refillHistory: [
      {
        id: 'ref-3',
        refillDate: '2024-09-15',
        quantity: 21,
        pharmacistInitials: 'SJ',
        autoRefill: false
      }
    ],
    aiAnalysis: 'Course completed successfully. Mild allergic reaction noted - consider alternative antibiotic for future infections.',
    flags: [
      {
        id: 'flag-1',
        type: 'allergy',
        severity: 'medium',
        description: 'Mild allergic reaction to Amoxicillin',
        flaggedBy: 'Dr. Sarah Khan',
        flaggedDate: '2024-09-18',
        resolved: false
      }
    ],
    createdAt: '2024-09-15',
    lastUpdated: '2024-09-22'
  },
  {
    id: 'med-3',
    drugName: 'Lisinopril',
    brandName: 'Prinivil',
    genericName: 'Lisinopril',
    strength: '10mg',
    dosage: 'OD',
    frequency: 'Once daily',
    duration: '30 days',
    startDate: '2024-10-01',
    endDate: '2024-10-31',
    prescriberName: 'Dr. Faraz Ahmed',
    prescriberLicense: 'LIC-12345',
    dispensingDate: '2024-10-01',
    pharmacistInitials: 'SJ',
    status: 'active',
    responseStatus: 'well-tolerated',
    effectivenessRating: 9,
    sideEffects: [],
    adherenceLog: [
      { id: 'ad-13', date: '2024-10-14', taken: true, reportedBy: 'patient', timeOfDay: '08:00' },
      { id: 'ad-14', date: '2024-10-13', taken: true, reportedBy: 'patient', timeOfDay: '08:00' },
      { id: 'ad-15', date: '2024-10-12', taken: true, reportedBy: 'patient', timeOfDay: '08:00' },
      { id: 'ad-16', date: '2024-10-11', taken: true, reportedBy: 'patient', timeOfDay: '08:00' },
      { id: 'ad-17', date: '2024-10-10', taken: true, reportedBy: 'patient', timeOfDay: '08:00' }
    ],
    refillHistory: [
      {
        id: 'ref-4',
        refillDate: '2024-10-01',
        quantity: 30,
        pharmacistInitials: 'SJ',
        autoRefill: true
      }
    ],
    aiAnalysis: 'Excellent adherence and effectiveness. Blood pressure well controlled. Continue current regimen.',
    flags: [],
    createdAt: '2024-10-01',
    lastUpdated: '2024-10-14'
  },
  {
    id: 'med-4',
    drugName: 'Ibuprofen',
    brandName: 'Advil',
    genericName: 'Ibuprofen',
    strength: '400mg',
    dosage: 'PRN',
    frequency: 'As needed',
    duration: '14 days',
    startDate: '2024-09-20',
    endDate: '2024-10-04',
    prescriberName: 'Dr. Sarah Khan',
    prescriberLicense: 'LIC-67890',
    dispensingDate: '2024-09-20',
    pharmacistInitials: 'SJ',
    status: 'completed',
    responseStatus: 'adverse-reaction',
    effectivenessRating: 3,
    sideEffects: [
      {
        id: 'se-3',
        name: 'Stomach upset',
        severity: 'moderate',
        description: 'Severe stomach pain and nausea',
        reportedDate: '2024-09-22',
        reportedBy: 'patient',
        resolved: true,
        resolutionDate: '2024-09-25'
      }
    ],
    adherenceLog: [
      { id: 'ad-18', date: '2024-09-20', taken: true, reportedBy: 'patient', timeOfDay: '14:00' },
      { id: 'ad-19', date: '2024-09-21', taken: true, reportedBy: 'patient', timeOfDay: '10:00' },
      { id: 'ad-20', date: '2024-09-22', taken: true, reportedBy: 'patient', timeOfDay: '16:00' }
    ],
    refillHistory: [
      {
        id: 'ref-5',
        refillDate: '2024-09-20',
        quantity: 20,
        pharmacistInitials: 'SJ',
        autoRefill: false
      }
    ],
    aiAnalysis: 'Discontinued due to adverse GI effects. Patient intolerant to NSAIDs. Consider alternative pain management.',
    flags: [
      {
        id: 'flag-2',
        type: 'contraindication',
        severity: 'high',
        description: 'Severe GI intolerance to Ibuprofen',
        flaggedBy: 'Dr. Sarah Khan',
        flaggedDate: '2024-09-22',
        resolved: false
      }
    ],
    createdAt: '2024-09-20',
    lastUpdated: '2024-10-04'
  }
];

const mockMedicationAnalytics: MedicationAnalytics = {
  averageAdherence: 87,
  totalMedications: 4,
  activeMedications: 2,
  discontinuedMedications: 2,
  topSideEffects: [
    { name: 'Mild nausea', count: 1 },
    { name: 'Mild rash', count: 1 },
    { name: 'Stomach upset', count: 1 }
  ],
  adherenceTrend: 'improving',
  missedDosesLast30Days: 1,
  drugSwitchFrequency: 1,
  averageEffectivenessRating: 6.75,
  riskScore: 3,
  lastUpdated: '2024-10-14'
};

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
          { id: 'ad-1', date: '2024-10-14', taken: true, reportedBy: 'patient' as const },
          { id: 'ad-2', date: '2024-10-13', taken: true, reportedBy: 'patient' as const },
          { id: 'ad-3', date: '2024-10-12', taken: false, notes: 'Forgot morning dose', reportedBy: 'patient' as const }
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
  
  // Medication History Tracker State
  const [medicationHistory, setMedicationHistory] = useState<MedicationHistoryEntry[]>(mockMedicationHistory);
  const [medicationAnalytics, setMedicationAnalytics] = useState<MedicationAnalytics>(mockMedicationAnalytics);
  const [selectedMedication, setSelectedMedication] = useState<MedicationHistoryEntry | null>(null);
  const [isMedicationDetailModalOpen, setIsMedicationDetailModalOpen] = useState(false);
  const [isAddFeedbackModalOpen, setIsAddFeedbackModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [timelineFilter, setTimelineFilter] = useState<MedicationTimelineFilter>({
    timeRange: 'all',
    category: 'all',
    status: 'all',
    responseStatus: 'all',
    sortBy: 'date'
  });
  const [activeTimelineView, setActiveTimelineView] = useState<'timeline' | 'analytics'>('timeline');
  const [newFeedback, setNewFeedback] = useState({
    medicationId: '',
    effectivenessRating: 5,
    sideEffects: '',
    notes: ''
  });

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

  // Medication History Tracker Helper Functions
  const getResponseStatusColor = (status: string) => {
    switch (status) {
      case 'well-tolerated': return 'bg-green-100 text-green-800 border-green-200';
      case 'mild-issues': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'adverse-reaction': return 'bg-red-100 text-red-800 border-red-200';
      case 'unknown': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getResponseStatusIcon = (status: string) => {
    switch (status) {
      case 'well-tolerated': return <CheckCircle className="w-4 h-4" />;
      case 'mild-issues': return <AlertTriangle className="w-4 h-4" />;
      case 'adverse-reaction': return <XCircle className="w-4 h-4" />;
      case 'unknown': return <HelpCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getFlagColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFlagIcon = (type: string) => {
    switch (type) {
      case 'allergy': return <AlertTriangle className="w-4 h-4" />;
      case 'interaction': return <Shield className="w-4 h-4" />;
      case 'contraindication': return <XCircle className="w-4 h-4" />;
      case 'monitoring': return <Eye className="w-4 h-4" />;
      case 'discontinued': return <Minus className="w-4 h-4" />;
      default: return <Flag className="w-4 h-4" />;
    }
  };

  const getEffectivenessColor = (rating: number) => {
    if (rating >= 8) return 'text-green-600';
    if (rating >= 6) return 'text-yellow-600';
    if (rating >= 4) return 'text-orange-600';
    return 'text-red-600';
  };

  const getEffectivenessIcon = (rating: number) => {
    if (rating >= 8) return <ThumbsUp className="w-4 h-4" />;
    if (rating >= 6) return <Meh className="w-4 h-4" />;
    if (rating >= 4) return <Frown className="w-4 h-4" />;
    return <ThumbsDown className="w-4 h-4" />;
  };

  const calculateAdherencePercentage = (adherenceLog: AdherenceEntry[]) => {
    if (adherenceLog.length === 0) return 0;
    const takenCount = adherenceLog.filter(entry => entry.taken).length;
    return Math.round((takenCount / adherenceLog.length) * 100);
  };

  const getAdherenceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    if (percentage >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
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

  // Medication History Tracker Event Handlers
  const handleMedicationClick = (medication: MedicationHistoryEntry) => {
    setSelectedMedication(medication);
    setIsMedicationDetailModalOpen(true);
  };

  const handleAddFeedback = (medicationId: string) => {
    setNewFeedback(prev => ({ ...prev, medicationId }));
    setIsAddFeedbackModalOpen(true);
  };

  const handleSubmitFeedback = () => {
    if (newFeedback.medicationId && newFeedback.effectivenessRating) {
      // Update medication with new feedback
      setMedicationHistory(prev => prev.map(med => {
        if (med.id === newFeedback.medicationId) {
          return {
            ...med,
            effectivenessRating: newFeedback.effectivenessRating,
            sideEffects: newFeedback.sideEffects ? [
              ...med.sideEffects,
              {
                id: `se-${Date.now()}`,
                name: 'Patient reported side effect',
                severity: 'mild' as const,
                description: newFeedback.sideEffects,
                reportedDate: new Date().toISOString().split('T')[0],
                reportedBy: 'patient' as const,
                resolved: false
              }
            ] : med.sideEffects,
            lastUpdated: new Date().toISOString().split('T')[0]
          };
        }
        return med;
      }));
      
      // Reset form
      setNewFeedback({
        medicationId: '',
        effectivenessRating: 5,
        sideEffects: '',
        notes: ''
      });
      setIsAddFeedbackModalOpen(false);
    }
  };

  const handleExportData = () => {
    setIsExportModalOpen(true);
  };

  const handleExportSubmit = (options: ExportOptions) => {
    // Simulate export functionality
    console.log('Exporting medication history with options:', options);
    alert(`Exporting medication history as ${options.format.toUpperCase()} for date range ${options.dateRange.start} to ${options.dateRange.end}`);
    setIsExportModalOpen(false);
  };

  const filteredMedications = medicationHistory.filter(medication => {
    const matchesTimeRange = timelineFilter.timeRange === 'all' || 
      (() => {
        const now = new Date();
        const medDate = new Date(medication.startDate);
        const diffInDays = Math.floor((now.getTime() - medDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (timelineFilter.timeRange) {
          case '3months': return diffInDays <= 90;
          case '6months': return diffInDays <= 180;
          case '1year': return diffInDays <= 365;
          default: return true;
        }
      })();
    
    const matchesStatus = timelineFilter.status === 'all' || medication.status === timelineFilter.status;
    const matchesResponseStatus = timelineFilter.responseStatus === 'all' || medication.responseStatus === timelineFilter.responseStatus;
    
    return matchesTimeRange && matchesStatus && matchesResponseStatus;
  }).sort((a, b) => {
    switch (timelineFilter.sortBy) {
      case 'date': return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      case 'effectiveness': return (b.effectivenessRating || 0) - (a.effectivenessRating || 0);
      case 'adherence': return calculateAdherencePercentage(b.adherenceLog) - calculateAdherencePercentage(a.adherenceLog);
      case 'alphabetical': return a.drugName.localeCompare(b.drugName);
      default: return 0;
    }
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
        { name: 'Medication History Tracker', description: 'Timeline of drugs dispensed and responses', icon: Clock, functional: true },
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

          {/* Medication History Tracker - Fully Functional */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <History className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Medication History Tracker</h3>
                  <p className="text-gray-600">Timeline of drugs dispensed and responses</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ Fully Functional
                </span>
                <button
                  onClick={handleExportData}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 mb-6">
              <button
                onClick={() => setActiveTimelineView('timeline')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTimelineView === 'timeline'
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <History className="w-4 h-4 inline mr-2" />
                Timeline View
              </button>
              <button
                onClick={() => setActiveTimelineView('analytics')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTimelineView === 'analytics'
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BarChart className="w-4 h-4 inline mr-2" />
                Analytics View
              </button>
            </div>

            {activeTimelineView === 'timeline' ? (
              <>
                {/* Filter Bar */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
                    <select
                      value={timelineFilter.timeRange}
                      onChange={(e) => setTimelineFilter(prev => ({ ...prev, timeRange: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    >
                      <option value="all">All Time</option>
                      <option value="3months">Last 3 Months</option>
                      <option value="6months">Last 6 Months</option>
                      <option value="1year">Last Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={timelineFilter.status}
                      onChange={(e) => setTimelineFilter(prev => ({ ...prev, status: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="discontinued">Discontinued</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Response</label>
                    <select
                      value={timelineFilter.responseStatus}
                      onChange={(e) => setTimelineFilter(prev => ({ ...prev, responseStatus: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    >
                      <option value="all">All Responses</option>
                      <option value="well-tolerated">Well Tolerated</option>
                      <option value="mild-issues">Mild Issues</option>
                      <option value="adverse-reaction">Adverse Reaction</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                    <select
                      value={timelineFilter.sortBy}
                      onChange={(e) => setTimelineFilter(prev => ({ ...prev, sortBy: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    >
                      <option value="date">Date</option>
                      <option value="effectiveness">Effectiveness</option>
                      <option value="adherence">Adherence</option>
                      <option value="alphabetical">Alphabetical</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => setTimelineFilter({
                        timeRange: 'all',
                        category: 'all',
                        status: 'all',
                        responseStatus: 'all',
                        sortBy: 'date'
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  {filteredMedications.map((medication, index) => (
                    <motion.div
                      key={medication.id}
                      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      onClick={() => handleMedicationClick(medication)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          {/* Medication Header */}
                          <div className="flex items-center space-x-4 mb-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              medication.responseStatus === 'well-tolerated' ? 'bg-green-100' :
                              medication.responseStatus === 'mild-issues' ? 'bg-yellow-100' :
                              medication.responseStatus === 'adverse-reaction' ? 'bg-red-100' : 'bg-gray-100'
                            }`}>
                              <Pill className={`w-6 h-6 ${
                                medication.responseStatus === 'well-tolerated' ? 'text-green-600' :
                                medication.responseStatus === 'mild-issues' ? 'text-yellow-600' :
                                medication.responseStatus === 'adverse-reaction' ? 'text-red-600' : 'text-gray-600'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="text-lg font-bold text-gray-900">{medication.drugName}</h4>
                                {medication.brandName && (
                                  <span className="text-sm text-gray-500">({medication.brandName})</span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{medication.genericName} • {medication.strength}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getResponseStatusColor(medication.responseStatus)}`}>
                                {getResponseStatusIcon(medication.responseStatus)}
                                <span className="capitalize">{medication.responseStatus.replace('-', ' ')}</span>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(medication.status)}`}>
                                {medication.status}
                              </div>
                            </div>
                          </div>

                          {/* Medication Details */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Dosage & Frequency</p>
                              <p className="font-medium">{medication.dosage} • {medication.frequency}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Duration</p>
                              <p className="font-medium">{medication.duration}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Prescriber</p>
                              <p className="font-medium">{medication.prescriberName}</p>
                            </div>
                          </div>

                          {/* Progress and Stats */}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-center">
                              <div className={`text-2xl font-bold ${getEffectivenessColor(medication.effectivenessRating || 0)}`}>
                                {medication.effectivenessRating || 'N/A'}
                              </div>
                              <div className="text-xs text-gray-600">Effectiveness</div>
                            </div>
                            <div className="text-center">
                              <div className={`text-2xl font-bold ${getAdherenceColor(calculateAdherencePercentage(medication.adherenceLog))}`}>
                                {calculateAdherencePercentage(medication.adherenceLog)}%
                              </div>
                              <div className="text-xs text-gray-600">Adherence</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">{medication.sideEffects.length}</div>
                              <div className="text-xs text-gray-600">Side Effects</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">{medication.flags.length}</div>
                              <div className="text-xs text-gray-600">Flags</div>
                            </div>
                          </div>

                          {/* Flags */}
                          {medication.flags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {medication.flags.map((flag) => (
                                <div key={flag.id} className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getFlagColor(flag.severity)}`}>
                                  {getFlagIcon(flag.type)}
                                  <span>{flag.type}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredMedications.length === 0 && (
                  <div className="text-center py-12">
                    <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No medications found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your filter criteria</p>
                  </div>
                )}
              </>
            ) : (
              /* Analytics View */
              <div className="space-y-6">
                {/* Analytics Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600 font-medium">Average Adherence</p>
                        <p className="text-3xl font-bold text-green-700">{medicationAnalytics.averageAdherence}%</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Active Medications</p>
                        <p className="text-3xl font-bold text-blue-700">{medicationAnalytics.activeMedications}</p>
                      </div>
                      <Pill className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-orange-600 font-medium">Missed Doses (30d)</p>
                        <p className="text-3xl font-bold text-orange-700">{medicationAnalytics.missedDosesLast30Days}</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-orange-600" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-purple-600 font-medium">Risk Score</p>
                        <p className="text-3xl font-bold text-purple-700">{medicationAnalytics.riskScore}/10</p>
                      </div>
                      <Shield className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                </div>

                {/* Top Side Effects */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Side Effects</h3>
                  <div className="space-y-3">
                    {medicationAnalytics.topSideEffects.map((effect, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-700">{effect.name}</span>
                        <span className="text-sm text-gray-500">{effect.count} reports</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <Brain className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-900">AI Insights</h3>
                  </div>
                  <div className="space-y-3 text-blue-800">
                    <p>• Adherence trend: <span className="font-semibold capitalize">{medicationAnalytics.adherenceTrend}</span></p>
                    <p>• Average effectiveness rating: <span className="font-semibold">{medicationAnalytics.averageEffectivenessRating}/10</span></p>
                    <p>• Drug switch frequency: <span className="font-semibold">{medicationAnalytics.drugSwitchFrequency} switches</span></p>
                    <p>• Overall risk assessment: <span className="font-semibold">Low risk</span> - Continue current monitoring</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Other Features - Coming Soon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.features?.slice(2).map((feature: any, index: number) => (
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

      {/* Medication Detail Modal */}
      {isMedicationDetailModalOpen && selectedMedication && (
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div 
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setIsMedicationDetailModalOpen(false)}
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
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                  selectedMedication.responseStatus === 'well-tolerated' ? 'bg-green-100' :
                  selectedMedication.responseStatus === 'mild-issues' ? 'bg-yellow-100' :
                  selectedMedication.responseStatus === 'adverse-reaction' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <Pill className={`w-8 h-8 ${
                    selectedMedication.responseStatus === 'well-tolerated' ? 'text-green-600' :
                    selectedMedication.responseStatus === 'mild-issues' ? 'text-yellow-600' :
                    selectedMedication.responseStatus === 'adverse-reaction' ? 'text-red-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedMedication.drugName}</h2>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">{selectedMedication.genericName} • {selectedMedication.strength}</span>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getResponseStatusColor(selectedMedication.responseStatus)}`}>
                      {getResponseStatusIcon(selectedMedication.responseStatus)}
                      <span className="capitalize">{selectedMedication.responseStatus.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsMedicationDetailModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Medication Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dosage:</span>
                        <span className="font-medium">{selectedMedication.dosage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Frequency:</span>
                        <span className="font-medium">{selectedMedication.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{selectedMedication.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Start Date:</span>
                        <span className="font-medium">{formatDate(selectedMedication.startDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">End Date:</span>
                        <span className="font-medium">{formatDate(selectedMedication.endDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Prescriber:</span>
                        <span className="font-medium">{selectedMedication.prescriberName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Effectiveness & Adherence */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className={`text-3xl font-bold ${getEffectivenessColor(selectedMedication.effectivenessRating || 0)}`}>
                          {selectedMedication.effectivenessRating || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-600">Effectiveness Rating</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className={`text-3xl font-bold ${getAdherenceColor(calculateAdherencePercentage(selectedMedication.adherenceLog))}`}>
                          {calculateAdherencePercentage(selectedMedication.adherenceLog)}%
                        </div>
                        <div className="text-sm text-gray-600">Adherence Rate</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Side Effects */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Side Effects</h3>
                    {selectedMedication.sideEffects.length > 0 ? (
                      <div className="space-y-2">
                        {selectedMedication.sideEffects.map((effect) => (
                          <div key={effect.id} className="p-3 border border-gray-200 rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-900">{effect.name}</h4>
                                <p className="text-sm text-gray-600">{effect.description}</p>
                                <p className="text-xs text-gray-500 mt-1">Reported: {formatDate(effect.reportedDate)}</p>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(effect.severity)}`}>
                                {effect.severity}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No side effects reported</p>
                    )}
                  </div>

                  {/* Flags */}
                  {selectedMedication.flags.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Flags & Alerts</h3>
                      <div className="space-y-2">
                        {selectedMedication.flags.map((flag) => (
                          <div key={flag.id} className="p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-2 mb-1">
                              {getFlagIcon(flag.type)}
                              <span className="font-medium text-gray-900 capitalize">{flag.type}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFlagColor(flag.severity)}`}>
                                {flag.severity}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{flag.description}</p>
                            <p className="text-xs text-gray-500 mt-1">Flagged by: {flag.flaggedBy} on {formatDate(flag.flaggedDate)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI Analysis */}
                  {selectedMedication.aiAnalysis && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Analysis</h3>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Brain className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-medium text-blue-900">Clinical Insights</span>
                        </div>
                        <p className="text-blue-800 text-sm">{selectedMedication.aiAnalysis}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => handleAddFeedback(selectedMedication.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Add Feedback</span>
                </button>
                <button
                  onClick={() => setIsMedicationDetailModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Add Feedback Modal */}
      {isAddFeedbackModalOpen && (
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
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Medication Feedback</h2>
              <p className="text-gray-600">Help improve medication management</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Effectiveness Rating (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newFeedback.effectivenessRating}
                  onChange={(e) => setNewFeedback(prev => ({ ...prev, effectivenessRating: parseInt(e.target.value) }))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Poor (1)</span>
                  <span className="font-medium">{newFeedback.effectivenessRating}/10</span>
                  <span>Excellent (10)</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Side Effects (Optional)</label>
                <textarea
                  value={newFeedback.sideEffects}
                  onChange={(e) => setNewFeedback(prev => ({ ...prev, sideEffects: e.target.value }))}
                  placeholder="Describe any side effects experienced..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
                <textarea
                  value={newFeedback.notes}
                  onChange={(e) => setNewFeedback(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any additional comments..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsAddFeedbackModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitFeedback}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Export Modal */}
      {isExportModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl p-8 max-w-lg w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Export Medication History</h2>
              <p className="text-gray-600">Choose your export options</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="format" value="pdf" defaultChecked className="mr-2" />
                    <span>PDF Report</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="format" value="csv" className="mr-2" />
                    <span>CSV Data</span>
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    defaultValue="2024-01-01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Include Data</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span>Analytics Summary</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span>Side Effects</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span>Adherence Log</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span>Notes & Comments</span>
                  </label>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsExportModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleExportSubmit({
                    format: 'pdf',
                    dateRange: { start: '2024-01-01', end: new Date().toISOString().split('T')[0] },
                    includeAnalytics: true,
                    includeSideEffects: true,
                    includeAdherenceLog: true,
                    includeNotes: true
                  })}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200"
                >
                  Export Data
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}