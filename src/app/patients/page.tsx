"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Users, 
  FileText, 
  Heart, 
  Search, 
  Plus, 
  BarChart3, 
  Clock, 
  Shield, 
  Activity,
  TrendingUp,
  Calendar,
  Bell,
  Settings,
  LogOut,
  Stethoscope,
  ClipboardList,
  TestTube,
  Pill,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Star,
  Zap,
  Target,
  Award,
  BookOpen,
  Video,
  MessageCircle,
  Camera,
  Download,
  Share,
  Edit,
  Trash2,
  Eye,
  Filter,
  SortAsc,
  MoreHorizontal,
  UserPlus,
  Edit3,
  AlertCircle,
  X,
  Save,
  Minus,
  ChevronRight,
  ChevronDown,
  Mic,
  MicOff,
  Upload,
  Share2,
  Copy,
  ExternalLink,
  Search as SearchIcon,
  SortDesc,
  Grid,
  List,
  MoreVertical,
  Flag,
  Tag,
  Info,
  HelpCircle,
  Lock,
  Unlock,
  ShieldCheck,
  UserCheck,
  UserX
} from 'lucide-react';

// Mock patient data structure
interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  email: string;
  address: string;
  status: 'Active' | 'Needs Refill' | 'Critical';
  profilePicture?: string;
  allergies: Array<{
    type: string;
    severity: 'Mild' | 'Moderate' | 'Severe';
  }>;
  prescriptions: Array<{
    drug: string;
    dosage: string;
    doctor: string;
    issuedDate: string;
    notes?: string;
    duration?: string;
    refills?: number;
  }>;
  medicalHistory: string[];
  labReports: Array<{
    test: string;
    date: string;
    result: string;
    status: 'Normal' | 'Abnormal' | 'Critical';
  }>;
  doctorNotes: Array<{
    doctor: string;
    date: string;
    note: string;
  }>;
  medicationHistory: Array<{
    id: string;
    drugName: string;
    dosage: string;
    dateDispensed: string;
    pharmacistId: string;
    pharmacistName: string;
    response: '😊' | '😐' | '😞';
    notes: string;
    durationDays: number;
    category: string;
    branch: string;
  }>;
}

// Mock data
const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Ayesha Khan',
    age: 42,
    gender: 'Female',
    contact: '+92-300-1234567',
    email: 'ayesha.khan@email.com',
    address: '123 Main Street, Karachi, Pakistan',
    status: 'Needs Refill',
    allergies: [
      { type: 'Penicillin', severity: 'Severe' },
      { type: 'Dust', severity: 'Mild' }
    ],
    prescriptions: [
      {
        drug: 'Metformin',
        dosage: '500mg twice daily',
        doctor: 'Dr. Faraz Ahmed',
        issuedDate: '2025-09-10',
        notes: 'Monitor blood sugar weekly',
        duration: '3 months',
        refills: 2
      }
    ],
    medicalHistory: ['Diabetes Type II', 'Hypertension'],
    labReports: [
      { test: 'Blood Glucose', date: '2025-09-15', result: '95 mg/dL', status: 'Normal' },
      { test: 'HbA1c', date: '2025-09-15', result: '6.2%', status: 'Normal' }
    ],
    doctorNotes: [
      { doctor: 'Dr. Faraz Ahmed', date: '2025-09-10', note: 'Patient responding well to Metformin. Continue current dosage.' }
    ],
    medicationHistory: [
      {
        id: '1',
        drugName: 'Metformin',
        dosage: '500mg twice daily',
        dateDispensed: '2025-09-10',
        pharmacistId: 'pharm001',
        pharmacistName: 'Sarah Johnson',
        response: '😊',
        notes: 'Patient reported improved blood sugar control after 2 weeks',
        durationDays: 14,
        category: 'Antidiabetic',
        branch: 'Main Branch'
      },
      {
        id: '2',
        drugName: 'Metformin',
        dosage: '500mg twice daily',
        dateDispensed: '2025-08-15',
        pharmacistId: 'pharm002',
        pharmacistName: 'Michael Chen',
        response: '😐',
        notes: 'Initial prescription, patient adjusting to medication',
        durationDays: 7,
        category: 'Antidiabetic',
        branch: 'Main Branch'
      },
      {
        id: '3',
        drugName: 'Glipizide',
        dosage: '5mg once daily',
        dateDispensed: '2025-07-20',
        pharmacistId: 'pharm001',
        pharmacistName: 'Sarah Johnson',
        response: '😞',
        notes: 'Patient experienced hypoglycemia episodes, switched to Metformin',
        durationDays: 21,
        category: 'Antidiabetic',
        branch: 'Main Branch'
      }
    ]
  },
  {
    id: '2',
    name: 'Ahmed Hassan',
    age: 35,
    gender: 'Male',
    contact: '+92-301-9876543',
    email: 'ahmed.hassan@email.com',
    address: '456 Park Avenue, Lahore, Pakistan',
    status: 'Active',
    allergies: [
      { type: 'Shellfish', severity: 'Moderate' }
    ],
    prescriptions: [
      {
        drug: 'Lisinopril',
        dosage: '10mg once daily',
        doctor: 'Dr. Sarah Malik',
        issuedDate: '2025-09-05',
        notes: 'Monitor blood pressure',
        duration: '6 months',
        refills: 4
      }
    ],
    medicalHistory: ['Hypertension'],
    labReports: [
      { test: 'Blood Pressure', date: '2025-09-12', result: '120/80 mmHg', status: 'Normal' }
    ],
    doctorNotes: [
      { doctor: 'Dr. Sarah Malik', date: '2025-09-05', note: 'Blood pressure well controlled with current medication.' }
    ],
    medicationHistory: [
      {
        id: '4',
        drugName: 'Lisinopril',
        dosage: '10mg once daily',
        dateDispensed: '2025-09-05',
        pharmacistId: 'pharm003',
        pharmacistName: 'Emily Davis',
        response: '😊',
        notes: 'Excellent blood pressure control, no side effects reported',
        durationDays: 30,
        category: 'Antihypertensive',
        branch: 'Downtown Branch'
      },
      {
        id: '5',
        drugName: 'Amlodipine',
        dosage: '5mg once daily',
        dateDispensed: '2025-08-01',
        pharmacistId: 'pharm002',
        pharmacistName: 'Michael Chen',
        response: '😐',
        notes: 'Moderate blood pressure reduction, some ankle swelling',
        durationDays: 21,
        category: 'Antihypertensive',
        branch: 'Downtown Branch'
      }
    ]
  },
  {
    id: '3',
    name: 'Fatima Ali',
    age: 28,
    gender: 'Female',
    contact: '+92-302-5555555',
    email: 'fatima.ali@email.com',
    address: '789 Garden Road, Islamabad, Pakistan',
    status: 'Critical',
    allergies: [
      { type: 'Latex', severity: 'Severe' },
      { type: 'Aspirin', severity: 'Moderate' }
    ],
    prescriptions: [
      {
        drug: 'Warfarin',
        dosage: '5mg once daily',
        doctor: 'Dr. Omar Sheikh',
        issuedDate: '2025-09-08',
        notes: 'Monitor INR weekly',
        duration: '1 year',
        refills: 11
      }
    ],
    medicalHistory: ['Atrial Fibrillation', 'Deep Vein Thrombosis'],
    labReports: [
      { test: 'INR', date: '2025-09-14', result: '3.2', status: 'Critical' }
    ],
    doctorNotes: [
      { doctor: 'Dr. Omar Sheikh', date: '2025-09-14', note: 'INR elevated. Reduce Warfarin dose to 3mg daily. Recheck in 3 days.' }
    ],
    medicationHistory: [
      {
        id: '6',
        drugName: 'Warfarin',
        dosage: '5mg once daily',
        dateDispensed: '2025-09-08',
        pharmacistId: 'pharm001',
        pharmacistName: 'Sarah Johnson',
        response: '😞',
        notes: 'INR elevated to 3.2, dose reduction required',
        durationDays: 6,
        category: 'Anticoagulant',
        branch: 'Main Branch'
      },
      {
        id: '7',
        drugName: 'Warfarin',
        dosage: '3mg once daily',
        dateDispensed: '2025-08-15',
        pharmacistId: 'pharm003',
        pharmacistName: 'Emily Davis',
        response: '😊',
        notes: 'Stable INR levels, good therapeutic response',
        durationDays: 24,
        category: 'Anticoagulant',
        branch: 'Main Branch'
      },
      {
        id: '8',
        drugName: 'Aspirin',
        dosage: '81mg once daily',
        dateDispensed: '2025-07-20',
        pharmacistId: 'pharm002',
        pharmacistName: 'Michael Chen',
        response: '😞',
        notes: 'Patient developed allergic reaction, discontinued',
        durationDays: 3,
        category: 'Antiplatelet',
        branch: 'Main Branch'
      }
    ]
  }
];

export default function PatientDashboard() {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState<string>('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isPatientPanelOpen, setIsPatientPanelOpen] = useState(false);
  const [activePatientTab, setActivePatientTab] = useState<string>('profile');
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [medicationHistoryFilter, setMedicationHistoryFilter] = useState({
    search: '',
    dateRange: 'all',
    category: 'all',
    responseType: 'all'
  });

  const handleFeatureClick = (feature: string) => {
    setIsLoading(true);
    setActiveFeature(feature);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsPatientPanelOpen(true);
    setActivePatientTab('profile');
  };

  const closePatientPanel = () => {
    setIsPatientPanelOpen(false);
    setSelectedPatient(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Needs Refill':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'border-green-300';
      case 'Needs Refill':
        return 'border-orange-300';
      case 'Critical':
        return 'border-red-300';
      default:
        return 'border-gray-300';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Severe':
        return 'bg-red-100 text-red-800';
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Mild':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getResponseColor = (response: string) => {
    switch (response) {
      case '😊':
        return 'bg-green-100 text-green-800';
      case '😐':
        return 'bg-gray-100 text-gray-800';
      case '😞':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimelineLineColor = (history: any[]) => {
    const positiveCount = history.filter(h => h.response === '😊').length;
    const negativeCount = history.filter(h => h.response === '😞').length;
    const total = history.length;
    
    if (total === 0) return 'from-gray-300 to-gray-400';
    
    const positiveRatio = positiveCount / total;
    const negativeRatio = negativeCount / total;
    
    if (positiveRatio > 0.6) return 'from-green-400 to-green-500';
    if (negativeRatio > 0.3) return 'from-red-400 to-red-500';
    return 'from-yellow-400 to-yellow-500';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getFilteredMedicationHistory = (patient: Patient) => {
    let filtered = patient.medicationHistory;
    
    if (medicationHistoryFilter.search) {
      filtered = filtered.filter(h => 
        h.drugName.toLowerCase().includes(medicationHistoryFilter.search.toLowerCase()) ||
        h.category.toLowerCase().includes(medicationHistoryFilter.search.toLowerCase())
      );
    }
    
    if (medicationHistoryFilter.responseType !== 'all') {
      const responseMap = { 'positive': '😊', 'neutral': '😐', 'adverse': '😞' };
      filtered = filtered.filter(h => h.response === responseMap[medicationHistoryFilter.responseType as keyof typeof responseMap]);
    }
    
    return filtered.sort((a, b) => new Date(b.dateDispensed).getTime() - new Date(a.dateDispensed).getTime());
  };

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Medications</p>
                    <p className="text-3xl font-bold text-blue-600">8</p>
                  </div>
                  <Pill className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">All up to date</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Upcoming Appointments</p>
                    <p className="text-3xl font-bold text-green-600">3</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-xs text-blue-600 mt-2">Next: Tomorrow 2 PM</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Lab Results</p>
                    <p className="text-3xl font-bold text-orange-600">5</p>
                  </div>
                  <TestTube className="w-8 h-8 text-orange-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">2 new results</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Health Score</p>
                    <p className="text-3xl font-bold text-purple-600">85</p>
                  </div>
                  <Heart className="w-8 h-8 text-purple-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">+5 from last month</p>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Medication taken: Metformin</p>
                    <p className="text-sm text-gray-600">500mg - 2 hours ago</p>
                  </div>
                  <span className="text-xs text-gray-500">2h ago</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Appointment scheduled</p>
                    <p className="text-sm text-gray-600">Dr. Smith - Tomorrow at 2:00 PM</p>
                  </div>
                  <span className="text-xs text-gray-500">4h ago</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg">
                  <TestTube className="w-5 h-5 text-orange-500" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Lab results available</p>
                    <p className="text-sm text-gray-600">Blood glucose test - Normal range</p>
                  </div>
                  <span className="text-xs text-gray-500">6h ago</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'medications':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Medications</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 inline mr-2" />
                Add Medication
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Medications</h3>
                <div className="space-y-3">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Metformin 500mg</p>
                        <p className="text-sm text-gray-600">Take twice daily with meals</p>
                        <p className="text-xs text-gray-500">Prescribed by Dr. Smith</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Next dose: 8:00 AM</span>
                        <button className="text-blue-600 hover:text-blue-800">Mark as taken</button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Lisinopril 10mg</p>
                        <p className="text-sm text-gray-600">Take once daily in the morning</p>
                        <p className="text-xs text-gray-500">Prescribed by Dr. Johnson</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Next dose: 7:00 AM</span>
                        <button className="text-blue-600 hover:text-blue-800">Mark as taken</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Medication Schedule</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">Morning (7:00 AM)</p>
                        <p className="text-sm text-gray-600">Lisinopril 10mg</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">Breakfast (8:00 AM)</p>
                        <p className="text-sm text-gray-600">Metformin 500mg</p>
                      </div>
                      <Clock className="w-5 h-5 text-orange-500" />
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">Dinner (7:00 PM)</p>
                        <p className="text-sm text-gray-600">Metformin 500mg</p>
                      </div>
                      <Clock className="w-5 h-5 text-orange-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'appointments':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 inline mr-2" />
                Schedule Appointment
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
                <div className="space-y-3">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Dr. Sarah Smith</p>
                        <p className="text-sm text-gray-600">General Checkup</p>
                        <p className="text-xs text-gray-500">Tomorrow, Dec 15 at 2:00 PM</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Confirmed</span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Reschedule</button>
                      <button className="text-red-600 hover:text-red-800 text-sm">Cancel</button>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Dr. Michael Johnson</p>
                        <p className="text-sm text-gray-600">Follow-up Visit</p>
                        <p className="text-xs text-gray-500">Dec 20 at 10:30 AM</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Confirmed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Visits</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Dr. Emily Davis</p>
                        <p className="text-sm text-gray-600">Lab Results Review</p>
                        <p className="text-xs text-gray-500">Dec 10, 2024</p>
                      </div>
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Completed</span>
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Dr. Sarah Smith</p>
                        <p className="text-sm text-gray-600">Medication Adjustment</p>
                        <p className="text-xs text-gray-500">Dec 5, 2024</p>
                      </div>
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'health':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Health Records</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 inline mr-2" />
                Add Record
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vital Signs</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Blood Pressure</p>
                      <p className="text-sm text-gray-600">120/80 mmHg</p>
                    </div>
                    <span className="text-green-600 font-semibold">Normal</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Heart Rate</p>
                      <p className="text-sm text-gray-600">72 bpm</p>
                    </div>
                    <span className="text-green-600 font-semibold">Normal</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Blood Glucose</p>
                      <p className="text-sm text-gray-600">95 mg/dL</p>
                    </div>
                    <span className="text-green-600 font-semibold">Normal</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lab Results</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Complete Blood Count</p>
                        <p className="text-sm text-gray-600">All values within normal range</p>
                        <p className="text-xs text-gray-500">Dec 10, 2024</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Normal</span>
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Lipid Panel</p>
                        <p className="text-sm text-gray-600">Cholesterol: 180 mg/dL</p>
                        <p className="text-xs text-gray-500">Dec 10, 2024</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Normal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Edit className="w-4 h-4 inline mr-2" />
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <p className="text-gray-900">John Doe</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <p className="text-gray-900">March 15, 1985</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <p className="text-gray-900">(555) 123-4567</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">john.doe@email.com</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <p className="text-gray-900">123 Main St, City, State 12345</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Jane Doe</p>
                        <p className="text-sm text-gray-600">Spouse</p>
                        <p className="text-xs text-gray-500">(555) 987-6543</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Primary</span>
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Robert Smith</p>
                        <p className="text-sm text-gray-600">Brother</p>
                        <p className="text-xs text-gray-500">(555) 456-7890</p>
                      </div>
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Secondary</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tools':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Health Tools</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Heart className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Symptom Checker</h3>
                <p className="text-gray-600 text-sm">Get insights about your symptoms and when to seek medical care.</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <BarChart3 className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Health Tracker</h3>
                <p className="text-gray-600 text-sm">Track your daily health metrics and monitor your progress over time.</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Calendar className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Appointment Scheduler</h3>
                <p className="text-gray-600 text-sm">Schedule and manage your medical appointments with ease.</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Chat with Doctor</h3>
                <p className="text-gray-600 text-sm">Connect with healthcare providers for quick consultations.</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Download className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Download Records</h3>
                <p className="text-gray-600 text-sm">Download your medical records and lab results in PDF format.</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Bell className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Medication Reminders</h3>
                <p className="text-gray-600 text-sm">Set up custom reminders for your medications and appointments.</p>
              </motion.div>
            </div>
          </div>
        );

      case 'profiles':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Patient Profiles</h2>
              <div className="flex space-x-3">
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <SearchIcon className="w-4 h-4 inline mr-2" />
                  Search Patients
                </button>
                <button 
                  onClick={() => setIsAddPatientModalOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <UserPlus className="w-4 h-4 inline mr-2" />
                  Add Patient
                </button>
              </div>
            </div>

            {/* Patient Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {patients.map((patient) => (
                <motion.div
                  key={patient.id}
                  className={`bg-white rounded-2xl p-6 shadow-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${getStatusBorderColor(patient.status)}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePatientClick(patient)}
                >
                  {/* Profile Picture */}
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{patient.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{patient.age} years old • {patient.gender}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-2 text-center text-xs text-gray-500">
                    <div className="flex items-center justify-center space-x-1">
                      <Pill className="w-3 h-3" />
                      <span>{patient.prescriptions.length} Rx</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{patient.allergies.length} Allergies</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'medication-history':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Medication History Tracker</h2>
              <div className="flex space-x-3">
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <Download className="w-4 h-4 inline mr-2" />
                  Export PDF
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <Download className="w-4 h-4 inline mr-2" />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 sticky top-0 z-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Search by drug name or category..."
                    value={medicationHistoryFilter.search}
                    onChange={(e) => setMedicationHistoryFilter(prev => ({ ...prev, search: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <select
                    value={medicationHistoryFilter.dateRange}
                    onChange={(e) => setMedicationHistoryFilter(prev => ({ ...prev, dateRange: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Dates</option>
                    <option value="last30">Last 30 Days</option>
                    <option value="last90">Last 90 Days</option>
                    <option value="lastyear">Last Year</option>
                  </select>
                </div>
                <div>
                  <select
                    value={medicationHistoryFilter.category}
                    onChange={(e) => setMedicationHistoryFilter(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    <option value="Antidiabetic">Antidiabetic</option>
                    <option value="Antihypertensive">Antihypertensive</option>
                    <option value="Anticoagulant">Anticoagulant</option>
                    <option value="Antiplatelet">Antiplatelet</option>
                  </select>
                </div>
                <div>
                  <select
                    value={medicationHistoryFilter.responseType}
                    onChange={(e) => setMedicationHistoryFilter(prev => ({ ...prev, responseType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Responses</option>
                    <option value="positive">Positive (😊)</option>
                    <option value="neutral">Neutral (😐)</option>
                    <option value="adverse">Adverse (😞)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Patient Selection */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Patient to View History</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {patients.map((patient) => {
                  const filteredHistory = getFilteredMedicationHistory(patient);
                  return (
                    <motion.div
                      key={patient.id}
                      className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:shadow-md transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        setSelectedPatient(patient);
                        setActivePatientTab('medication-history');
                        setIsPatientPanelOpen(true);
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-600">{filteredHistory.length} medication entries</p>
                        </div>
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getTimelineLineColor(patient.medicationHistory)}`} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Timeline Preview */}
            {selectedPatient && (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {selectedPatient.name}'s Medication Timeline
                </h3>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className={`absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b ${getTimelineLineColor(selectedPatient.medicationHistory)}`} />
                  
                  {/* Timeline Nodes */}
                  <div className="space-y-6">
                    {getFilteredMedicationHistory(selectedPatient).map((entry, index) => (
                      <motion.div
                        key={entry.id}
                        className="relative flex items-start space-x-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        {/* Timeline Node */}
                        <div className="relative z-10 flex-shrink-0">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${getResponseColor(entry.response)}`}>
                            {entry.response}
                          </div>
                        </div>
                        
                        {/* Event Card */}
                        <motion.div
                          className="flex-1 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-gray-900">{entry.drugName}</h4>
                              <p className="text-sm text-gray-600">{entry.dosage}</p>
                            </div>
                            <span className="text-xs text-gray-500">{formatDate(entry.dateDispensed)}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{entry.notes}</p>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>Duration: {entry.durationDays} days</span>
                            <span>{entry.pharmacistName} • {entry.branch}</span>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading feature...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Cinematic Hero Header */}
      <motion.header
        className="relative bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500 text-white rounded-xl mx-4 mt-4 p-8 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12" />
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full -translate-x-8 -translate-y-8" />
        </div>

        <div className="relative z-10">
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
                className="text-xl text-blue-100 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Manage your health and medical care
              </motion.p>
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span className="text-sm">John Doe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">Health Score: 85</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">HIPAA Protected</span>
                </div>
              </motion.div>
            </div>
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User className="w-16 h-16 text-white" />
              </div>
            </motion.div>
          </div>
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
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'medications', label: 'Medications', icon: Pill },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'health', label: 'Health Records', icon: FileText },
              { id: 'profiles', label: 'Patient Profiles', icon: Users },
              { id: 'medication-history', label: 'Medication History', icon: Clock },
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'tools', label: 'Tools', icon: Settings }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => handleFeatureClick(tab.id)}
                className={`flex-1 min-w-0 px-4 py-4 text-center transition-all duration-200 ${
                  activeFeature === tab.id
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className="w-5 h-5 mx-auto mb-2" />
                <span className="text-sm font-medium block truncate">{tab.label}</span>
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
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading {activeFeature}...</p>
          </div>
        ) : (
          renderFeatureContent()
        )}
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

      {/* Patient Details Side Panel */}
      {isPatientPanelOpen && selectedPatient && (
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div 
            className="flex-1 bg-black bg-opacity-50"
            onClick={closePatientPanel}
          />
          
          {/* Side Panel */}
          <motion.div
            className="w-full max-w-2xl bg-white shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedPatient.name}</h2>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedPatient.status)}`}>
                    {selectedPatient.status}
                  </span>
                </div>
              </div>
              <button
                onClick={closePatientPanel}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {[
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'allergies', label: 'Allergies', icon: AlertCircle },
                { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
                { id: 'lab-reports', label: 'Lab Reports', icon: TestTube },
                { id: 'doctor-notes', label: 'Doctor Notes', icon: FileText },
                { id: 'medication-history', label: 'Med History', icon: Clock }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePatientTab(tab.id)}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activePatientTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
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
              {activePatientTab === 'profile' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{selectedPatient.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Age</p>
                        <p className="font-medium">{selectedPatient.age} years old</p>
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
                        <p className="text-sm text-gray-500">Contact</p>
                        <p className="font-medium">{selectedPatient.contact}</p>
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
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{selectedPatient.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Medical History</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPatient.medicalHistory.map((condition, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activePatientTab === 'allergies' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Allergies</h3>
                  <div className="space-y-3">
                    {selectedPatient.allergies.map((allergy, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{allergy.type}</p>
                            <p className="text-sm text-gray-600">Allergy Type</p>
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
                    {selectedPatient.prescriptions.map((prescription, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{prescription.drug}</p>
                            <p className="text-sm text-gray-600">{prescription.dosage}</p>
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><strong>Doctor:</strong> {prescription.doctor}</p>
                          <p><strong>Issued:</strong> {prescription.issuedDate}</p>
                          {prescription.duration && <p><strong>Duration:</strong> {prescription.duration}</p>}
                          {prescription.refills && <p><strong>Refills:</strong> {prescription.refills}</p>}
                          {prescription.notes && <p><strong>Notes:</strong> {prescription.notes}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activePatientTab === 'lab-reports' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Lab Reports</h3>
                  <div className="space-y-3">
                    {selectedPatient.labReports.map((report, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{report.test}</p>
                            <p className="text-sm text-gray-600">Date: {report.date}</p>
                            <p className="text-sm text-gray-600">Result: {report.result}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            report.status === 'Normal' ? 'bg-green-100 text-green-800' :
                            report.status === 'Abnormal' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activePatientTab === 'doctor-notes' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Doctor Notes</h3>
                  <div className="space-y-3">
                    {selectedPatient.doctorNotes.map((note, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium text-gray-900">{note.doctor}</p>
                          <p className="text-sm text-gray-500">{note.date}</p>
                        </div>
                        <p className="text-gray-700">{note.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activePatientTab === 'medication-history' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Medication History Timeline</h3>
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className={`absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b ${getTimelineLineColor(selectedPatient.medicationHistory)}`} />
                    
                    {/* Timeline Nodes */}
                    <div className="space-y-4">
                      {getFilteredMedicationHistory(selectedPatient).map((entry, index) => (
                        <motion.div
                          key={entry.id}
                          className="relative flex items-start space-x-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          {/* Timeline Node */}
                          <div className="relative z-10 flex-shrink-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${getResponseColor(entry.response)}`}>
                              {entry.response}
                            </div>
                          </div>
                          
                          {/* Event Card */}
                          <div className="flex-1 bg-gray-50 rounded-lg p-3">
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <h4 className="font-semibold text-gray-900 text-sm">{entry.drugName}</h4>
                                <p className="text-xs text-gray-600">{entry.dosage}</p>
                              </div>
                              <span className="text-xs text-gray-500">{formatDate(entry.dateDispensed)}</span>
                            </div>
                            <p className="text-xs text-gray-700 mb-1">{entry.notes}</p>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                              <span>Duration: {entry.durationDays} days</span>
                              <span>{entry.pharmacistName}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
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

