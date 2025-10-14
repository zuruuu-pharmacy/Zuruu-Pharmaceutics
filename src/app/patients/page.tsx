"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  LogOut, 
  Heart, 
  Brain, 
  Stethoscope, 
  Phone, 
  Upload, 
  FileText, 
  ShoppingCart, 
  Bell,
  Plus,
  Edit,
  Trash2,
  Download,
  Share,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Camera,
  Image,
  Send,
  Search,
  Filter,
  SortAsc,
  Eye,
  BarChart3,
  TrendingUp,
  Activity,
  Shield,
  Zap,
  Target,
  Award,
  BookOpen,
  Video,
  MessageCircle,
  Download as DownloadIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  Trash2 as TrashIcon,
  Eye as EyeIcon,
  Filter as FilterIcon,
  SortAsc as SortAscIcon,
  MoreHorizontal as MoreHorizontalIcon,
  User,
  Users,
  FileText as FileTextIcon,
  Search as SearchIcon,
  Settings,
  UserPlus,
  Edit3,
  Phone as PhoneIcon,
  Mail,
  MapPin,
  Calendar as CalendarIcon,
  AlertCircle,
  CheckCircle as CheckCircleIcon,
  Clock as ClockIcon,
  X,
  Save,
  Minus,
  ChevronRight,
  ChevronDown,
  Mic,
  MicOff,
  Upload as UploadIcon,
  Share2,
  Copy,
  ExternalLink,
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
  UserX,
  Pill,
  TestTube,
  ClipboardList,
  User as UserIcon,
  Heart as HeartIcon,
  Zap as ZapIcon,
  Target as TargetIcon,
  Award as AwardIcon,
  BookOpen as BookOpenIcon,
  Video as VideoIcon,
  MessageCircle as MessageCircleIcon,
  Camera as CameraIcon
} from 'lucide-react';

// Mock data structures
interface HealthRecord {
  id: string;
  date: string;
  type: 'appointment' | 'lab_result' | 'medication' | 'vaccination' | 'surgery';
  title: string;
  description: string;
  doctor?: string;
  status: 'completed' | 'pending' | 'scheduled' | 'active';
}

interface NutritionPlan {
  id: string;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  calories: number;
  nutrients: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  time: string;
  completed: boolean;
}

interface SymptomEntry {
  id: string;
  date: string;
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  aiInsights: string;
  recommendations: string[];
}

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

interface Prescription {
  id: string;
  drugName: string;
  dosage: string;
  frequency: string;
  doctor: string;
  date: string;
  image?: string;
  status: 'active' | 'completed' | 'expired';
}

interface LabReport {
  id: string;
  testName: string;
  date: string;
  results: Array<{
    parameter: string;
    value: string;
    normalRange: string;
    status: 'normal' | 'abnormal' | 'critical';
  }>;
  doctor: string;
  aiAnalysis: string;
}

interface MedicationOrder {
  id: string;
  drugName: string;
  quantity: number;
  dosage: string;
  price: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  orderDate: string;
  deliveryDate?: string;
}

interface AdherenceRecord {
  id: string;
  medication: string;
  scheduledTime: string;
  takenTime?: string;
  status: 'taken' | 'missed' | 'late';
  date: string;
}

export default function PatientDashboard() {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState<string>('health-history');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([
    {
      id: '1',
      date: '2024-01-15',
      type: 'appointment',
      title: 'Annual Checkup',
      description: 'Routine physical examination with Dr. Smith',
      doctor: 'Dr. Sarah Smith',
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-01-10',
      type: 'lab_result',
      title: 'Blood Test Results',
      description: 'Complete blood count and lipid panel',
      doctor: 'Dr. Sarah Smith',
      status: 'completed'
    },
    {
      id: '3',
      date: '2024-01-20',
      type: 'medication',
      title: 'Metformin Prescription',
      description: '500mg twice daily for diabetes management',
      doctor: 'Dr. Sarah Smith',
      status: 'active'
    }
  ]);

  const [nutritionPlans, setNutritionPlans] = useState<NutritionPlan[]>([
    {
      id: '1',
      meal: 'breakfast',
      name: 'Oatmeal with Berries',
      calories: 320,
      nutrients: { protein: 12, carbs: 58, fat: 6, fiber: 8 },
      time: '8:00 AM',
      completed: true
    },
    {
      id: '2',
      meal: 'lunch',
      name: 'Grilled Chicken Salad',
      calories: 450,
      nutrients: { protein: 35, carbs: 20, fat: 25, fiber: 6 },
      time: '1:00 PM',
      completed: false
    }
  ]);

  const [symptomEntries, setSymptomEntries] = useState<SymptomEntry[]>([
    {
      id: '1',
      date: '2024-01-18',
      symptoms: ['Headache', 'Fatigue'],
      severity: 'mild',
      duration: '2 days',
      aiInsights: 'Symptoms may be related to stress or lack of sleep. Consider rest and hydration.',
      recommendations: ['Get adequate sleep', 'Stay hydrated', 'Practice stress management']
    }
  ]);

  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'Dr. Sarah Smith',
      relationship: 'Primary Care Physician',
      phone: '+1-555-0123',
      isPrimary: true
    },
    {
      id: '2',
      name: 'Emergency Services',
      relationship: 'Emergency',
      phone: '911',
      isPrimary: false
    }
  ]);

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: '1',
      drugName: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      doctor: 'Dr. Sarah Smith',
      date: '2024-01-15',
      status: 'active'
    }
  ]);

  const [labReports, setLabReports] = useState<LabReport[]>([
    {
      id: '1',
      testName: 'Complete Blood Count',
      date: '2024-01-10',
      results: [
        { parameter: 'Hemoglobin', value: '14.2 g/dL', normalRange: '12.0-15.5', status: 'normal' },
        { parameter: 'White Blood Cells', value: '7.2 K/μL', normalRange: '4.5-11.0', status: 'normal' }
      ],
      doctor: 'Dr. Sarah Smith',
      aiAnalysis: 'All parameters are within normal range. No immediate concerns detected.'
    }
  ]);

  const [medicationOrders, setMedicationOrders] = useState<MedicationOrder[]>([
    {
      id: '1',
      drugName: 'Metformin 500mg',
      quantity: 60,
      dosage: '500mg',
      price: 25.99,
      status: 'pending',
      orderDate: '2024-01-20'
    }
  ]);

  const [adherenceRecords, setAdherenceRecords] = useState<AdherenceRecord[]>([
    {
      id: '1',
      medication: 'Metformin',
      scheduledTime: '8:00 AM',
      takenTime: '8:15 AM',
      status: 'taken',
      date: '2024-01-20'
    },
    {
      id: '2',
      medication: 'Metformin',
      scheduledTime: '8:00 PM',
      takenTime: undefined,
      status: 'missed',
      date: '2024-01-19'
    }
  ]);

  const handleFeatureClick = (feature: string) => {
    setIsLoading(true);
    setActiveFeature(feature);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const addHealthRecord = () => {
    const newRecord: HealthRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      type: 'appointment',
      title: 'New Health Record',
      description: 'Description of the health record',
      doctor: 'Dr. Smith',
      status: 'pending'
    };
    setHealthRecords([newRecord, ...healthRecords]);
  };

  const addSymptomEntry = () => {
    const newEntry: SymptomEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      symptoms: ['New Symptom'],
      severity: 'mild',
      duration: '1 day',
      aiInsights: 'AI analysis will be provided based on symptoms.',
      recommendations: ['Consult with healthcare provider if symptoms persist']
    };
    setSymptomEntries([newEntry, ...symptomEntries]);
  };

  const addEmergencyContact = () => {
    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      name: 'New Contact',
      relationship: 'Family',
      phone: '+1-555-0000',
      isPrimary: false
    };
    setEmergencyContacts([...emergencyContacts, newContact]);
  };

  const uploadPrescription = (file: File) => {
    const newPrescription: Prescription = {
      id: Date.now().toString(),
      drugName: 'New Prescription',
      dosage: 'As prescribed',
      frequency: 'As directed',
      doctor: 'Dr. Unknown',
      date: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setPrescriptions([newPrescription, ...prescriptions]);
  };

  const orderMedication = (medication: string, quantity: number) => {
    const newOrder: MedicationOrder = {
      id: Date.now().toString(),
      drugName: medication,
      quantity: quantity,
      dosage: 'As prescribed',
      price: Math.random() * 50 + 10,
      status: 'pending',
      orderDate: new Date().toISOString().split('T')[0]
    };
    setMedicationOrders([newOrder, ...medicationOrders]);
  };

  const markMedicationTaken = (recordId: string) => {
    setAdherenceRecords(records => 
      records.map(record => 
        record.id === recordId 
          ? { ...record, status: 'taken' as const, takenTime: new Date().toLocaleTimeString() }
          : record
      )
    );
  };

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'health-history':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Health History</h2>
              <button 
                onClick={addHealthRecord}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Add Record
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthRecords.map((record) => (
                <motion.div
                  key={record.id}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      {record.type === 'appointment' && <Calendar className="w-5 h-5 text-blue-500" />}
                      {record.type === 'lab_result' && <TestTube className="w-5 h-5 text-green-500" />}
                      {record.type === 'medication' && <Pill className="w-5 h-5 text-purple-500" />}
                      {record.type === 'vaccination' && <Shield className="w-5 h-5 text-orange-500" />}
                      {record.type === 'surgery' && <Stethoscope className="w-5 h-5 text-red-500" />}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === 'completed' ? 'bg-green-100 text-green-800' :
                        record.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {record.status}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{record.date}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{record.title}</h3>
                  <p className="text-gray-600 mb-3">{record.description}</p>
                  {record.doctor && (
                    <p className="text-sm text-gray-500">Doctor: {record.doctor}</p>
                  )}
                  
                  <div className="flex space-x-2 mt-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                    <button className="text-gray-600 hover:text-gray-800 text-sm">Edit</button>
                    <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'nutrition-coach':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">AI Nutrition Coach</h2>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <Plus className="w-4 h-4 inline mr-2" />
                Add Meal
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Today's Nutrition Plan</h3>
                {nutritionPlans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    className="bg-white rounded-lg p-4 shadow border border-gray-100"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                        <p className="text-sm text-gray-600">{plan.meal} • {plan.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{plan.calories} cal</p>
                        <div className={`w-3 h-3 rounded-full ${plan.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 text-xs text-gray-600">
                      <div>Protein: {plan.nutrients.protein}g</div>
                      <div>Carbs: {plan.nutrients.carbs}g</div>
                      <div>Fat: {plan.nutrients.fat}g</div>
                      <div>Fiber: {plan.nutrients.fiber}g</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Brain className="w-6 h-6 text-green-600" />
                    <h4 className="font-semibold text-gray-900">Personalized Advice</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Increase water intake to 8-10 glasses daily</li>
                    <li>• Add more leafy greens to your meals</li>
                    <li>• Consider taking a vitamin D supplement</li>
                    <li>• Limit processed foods and added sugars</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 shadow border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Daily Goals</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Calories</span>
                      <span className="text-sm font-medium">1,200 / 2,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'symptom-checker':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Symptom Checker</h2>
              <button 
                onClick={addSymptomEntry}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Add Symptoms
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Symptom Entries</h3>
                {symptomEntries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    className="bg-white rounded-lg p-4 shadow border border-gray-100"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-gray-500">{entry.date}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        entry.severity === 'mild' ? 'bg-green-100 text-green-800' :
                        entry.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {entry.severity}
                      </span>
                    </div>
                    
                    <div className="mb-2">
                      <p className="font-semibold text-gray-900">Symptoms:</p>
                      <p className="text-sm text-gray-600">{entry.symptoms.join(', ')}</p>
                    </div>
                    
                    <div className="mb-2">
                      <p className="font-semibold text-gray-900">Duration:</p>
                      <p className="text-sm text-gray-600">{entry.duration}</p>
                    </div>
                    
                    <div className="mb-2">
                      <p className="font-semibold text-gray-900">AI Insights:</p>
                      <p className="text-sm text-gray-600">{entry.aiInsights}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">AI Symptom Analysis</h3>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Brain className="w-6 h-6 text-orange-600" />
                    <h4 className="font-semibold text-gray-900">Smart Analysis</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    Our AI analyzes your symptoms and provides insights based on medical knowledge and patterns.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">Symptom pattern recognition</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">Risk assessment</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">Recommendation engine</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Quick Symptom Entry</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Enter your symptoms..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                      <option>Select severity</option>
                      <option>Mild</option>
                      <option>Moderate</option>
                      <option>Severe</option>
                    </select>
                    <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
                      Analyze Symptoms
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'emergency-help':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Emergency Help</h2>
              <button 
                onClick={addEmergencyContact}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Add Contact
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Emergency Contacts</h3>
                {emergencyContacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    className="bg-white rounded-lg p-4 shadow border border-gray-100"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                        <p className="text-sm text-gray-600">{contact.relationship}</p>
                      </div>
                      {contact.isPrimary && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          Primary
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{contact.phone}</span>
                    </div>
                    
                    <div className="flex space-x-2 mt-3">
                      <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                        Call Now
                      </button>
                      <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors">
                        Edit
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                
                <div className="bg-red-50 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    <h4 className="font-semibold text-gray-900">Emergency Services</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    In case of a medical emergency, call 911 immediately or go to the nearest emergency room.
                  </p>
                  <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                    Call 911
                  </button>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Poison Control</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    For poison-related emergencies, contact the Poison Control Center.
                  </p>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Call Poison Control
                  </button>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Heart className="w-6 h-6 text-green-600" />
                    <h4 className="font-semibold text-gray-900">Mental Health Crisis</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    For mental health emergencies, contact the National Suicide Prevention Lifeline.
                  </p>
                  <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                    Call Crisis Line
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'upload-prescription':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Upload Prescription</h2>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                <Upload className="w-4 h-4 inline mr-2" />
                Upload New
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Upload Area</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Upload Prescription Image</h4>
                  <p className="text-gray-600 mb-4">Drag and drop your prescription image here, or click to browse</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadPrescription(file);
                    }}
                    className="hidden"
                    id="prescription-upload"
                  />
                  <label
                    htmlFor="prescription-upload"
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
                  >
                    Choose File
                  </label>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Brain className="w-6 h-6 text-purple-600" />
                    <h4 className="font-semibold text-gray-900">AI Prescription Reader</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Automatically extracts medication information</li>
                    <li>• Identifies dosage and frequency</li>
                    <li>• Verifies doctor information</li>
                    <li>• Checks for potential interactions</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Prescriptions</h3>
                {prescriptions.map((prescription) => (
                  <motion.div
                    key={prescription.id}
                    className="bg-white rounded-lg p-4 shadow border border-gray-100"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{prescription.drugName}</h4>
                        <p className="text-sm text-gray-600">{prescription.dosage} • {prescription.frequency}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        prescription.status === 'active' ? 'bg-green-100 text-green-800' :
                        prescription.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {prescription.status}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      <p>Doctor: {prescription.doctor}</p>
                      <p>Date: {prescription.date}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                      <button className="text-green-600 hover:text-green-800 text-sm">Order Refill</button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">Edit</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'analyze-lab-report':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Analyze Lab Report</h2>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                <Plus className="w-4 h-4 inline mr-2" />
                Upload Report
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Lab Reports</h3>
                {labReports.map((report) => (
                  <motion.div
                    key={report.id}
                    className="bg-white rounded-lg p-4 shadow border border-gray-100"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{report.testName}</h4>
                        <p className="text-sm text-gray-600">Date: {report.date}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">View Full Report</button>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      {report.results.map((result, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">{result.parameter}</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{result.value}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              result.status === 'normal' ? 'bg-green-100 text-green-800' :
                              result.status === 'abnormal' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {result.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-blue-50 rounded p-3">
                      <p className="text-sm text-gray-700">
                        <strong>AI Analysis:</strong> {report.aiAnalysis}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">AI Lab Analysis</h3>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Brain className="w-6 h-6 text-indigo-600" />
                    <h4 className="font-semibold text-gray-900">Smart Analysis</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    Our AI analyzes your lab results and provides explanations in simple terms.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">Normal range interpretation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">Trend analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">Health insights</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Upload New Report</h4>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                      Analyze Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'order-medicines':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Order Medicines</h2>
              <button 
                onClick={() => orderMedication('New Medication', 30)}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                New Order
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Active Orders</h3>
                {medicationOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    className="bg-white rounded-lg p-4 shadow border border-gray-100"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{order.drugName}</h4>
                        <p className="text-sm text-gray-600">Quantity: {order.quantity} • {order.dosage}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Order Date: {order.orderDate}</span>
                      <span className="font-semibold text-gray-900">${order.price.toFixed(2)}</span>
                    </div>
                    
                    {order.deliveryDate && (
                      <p className="text-sm text-gray-600 mb-2">Delivery: {order.deliveryDate}</p>
                    )}
                    
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Track</button>
                      <button className="text-green-600 hover:text-green-800 text-sm">Reorder</button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">Cancel</button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Quick Order</h3>
                <div className="bg-white rounded-lg p-4 shadow border border-gray-100">
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Search medications..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option>Select quantity</option>
                      <option>30 tablets</option>
                      <option>60 tablets</option>
                      <option>90 tablets</option>
                    </select>
                    <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <ShoppingCart className="w-6 h-6 text-teal-600" />
                    <h4 className="font-semibold text-gray-900">Order Benefits</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Free delivery on orders over $50</li>
                    <li>• Same-day delivery available</li>
                    <li>• Prescription verification</li>
                    <li>• Insurance coverage check</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 shadow border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Cart Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>$0.00</span>
                    </div>
                  </div>
                  <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors mt-3">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'adherence-tracker':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Adherence Tracker</h2>
              <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors">
                <Plus className="w-4 h-4 inline mr-2" />
                Add Medication
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Today's Medications</h3>
                {adherenceRecords.map((record) => (
                  <motion.div
                    key={record.id}
                    className="bg-white rounded-lg p-4 shadow border border-gray-100"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{record.medication}</h4>
                        <p className="text-sm text-gray-600">Scheduled: {record.scheduledTime}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === 'taken' ? 'bg-green-100 text-green-800' :
                        record.status === 'missed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {record.status}
                      </span>
                    </div>
                    
                    {record.takenTime && (
                      <p className="text-sm text-gray-600 mb-2">Taken at: {record.takenTime}</p>
                    )}
                    
                    <div className="flex space-x-2">
                      {record.status !== 'taken' && (
                        <button 
                          onClick={() => markMedicationTaken(record.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                        >
                          Mark Taken
                        </button>
                      )}
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Set Reminder</button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">Edit</button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Adherence Statistics</h3>
                
                <div className="bg-white rounded-lg p-4 shadow border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-3">This Week</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Metformin</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Adherence</span>
                        <span>78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Bell className="w-6 h-6 text-pink-600" />
                    <h4 className="font-semibold text-gray-900">Smart Reminders</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Customizable reminder times</li>
                    <li>• Multiple notification methods</li>
                    <li>• Missed dose alerts</li>
                    <li>• Refill reminders</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 shadow border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Set Reminder</h4>
                  <div className="space-y-3">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                      <option>Select medication</option>
                      <option>Metformin</option>
                      <option>Lisinopril</option>
                    </select>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                    <button className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors">
                      Set Reminder
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
              { id: 'health-history', label: 'Health History', icon: FileText },
              { id: 'nutrition-coach', label: 'AI Nutrition Coach', icon: Heart },
              { id: 'symptom-checker', label: 'Symptom Checker', icon: Stethoscope },
              { id: 'emergency-help', label: 'Emergency Help', icon: Phone },
              { id: 'upload-prescription', label: 'Upload Prescription', icon: Upload },
              { id: 'analyze-lab-report', label: 'Analyze Lab Report', icon: TestTube },
              { id: 'order-medicines', label: 'Order Medicines', icon: ShoppingCart },
              { id: 'adherence-tracker', label: 'Adherence Tracker', icon: Bell }
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
    </div>
  );
}