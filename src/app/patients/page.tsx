"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  LogOut, 
  Search, 
  Bell, 
  MessageCircle, 
  HelpCircle, 
  User, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  Pill,
  Calendar,
  FileText,
  Brain,
  CreditCard,
  BarChart3,
  Settings,
  Heart,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  CheckCircle,
  Download,
  Eye,
  Edit,
  Plus,
  Minus,
  Filter,
  SortAsc,
  MoreHorizontal,
  Phone,
  Video,
  Mail,
  MapPin,
  Star,
  Shield,
  Lock,
  Globe,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Save,
  Share,
  Copy,
  ExternalLink,
  Upload,
  Camera,
  Mic,
  MicOff,
  Send,
  Paperclip,
  Smile,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Bookmark,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Target,
  Award,
  Zap,
  Activity,
  Thermometer,
  Droplets,
  Scale,
  Stethoscope,
  TestTube,
  Microscope,
  ClipboardList,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  User as UserIcon,
  Users,
  Building,
  Car,
  Plane,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Signal,
  SignalHigh,
  SignalLow,
  SignalZero,
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon,
  Battery as BatteryIcon,
  BatteryLow as BatteryLowIcon,
  Signal as SignalIcon,
  SignalHigh as SignalHighIcon,
  SignalLow as SignalLowIcon,
  SignalZero as SignalZeroIcon
} from 'lucide-react';

// Mock data interfaces
interface Medication {
  id: string;
  name: string;
  strength: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  status: 'Active' | 'Completed' | 'Discontinued';
  refillDate?: string;
  sideEffects: string[];
}

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: 'Online' | 'In-person';
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

interface HealthVital {
  id: string;
  type: 'Heart Rate' | 'Blood Pressure' | 'Blood Sugar' | 'Weight';
  value: string;
  unit: string;
  date: string;
  status: 'Normal' | 'Elevated' | 'Low';
  trend: 'up' | 'down' | 'stable';
}

interface RefillReminder {
  id: string;
  medicationName: string;
  daysLeft: number;
  status: 'green' | 'yellow' | 'red';
  autoRefill: boolean;
}

interface HealthReport {
  id: string;
  type: string;
  date: string;
  status: 'Reviewed' | 'Pending';
  doctor: string;
  summary: string;
}

interface DailyTask {
  id: string;
  title: string;
  completed: boolean;
  time: string;
  priority: 'high' | 'medium' | 'low';
}

interface ChatMessage {
  id: string;
  sender: 'patient' | 'doctor' | 'pharmacist';
  message: string;
  timestamp: string;
  read: boolean;
}

export default function PatientDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [showHelp, setShowHelp] = useState(false);

  // Mock data
  const [medications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Metformin',
      strength: '500mg',
      dosage: '1 tablet',
      frequency: 'Twice daily',
      startDate: '2024-01-15',
      status: 'Active',
      refillDate: '2024-02-15',
      sideEffects: ['Mild nausea']
    },
    {
      id: '2',
      name: 'Lisinopril',
      strength: '10mg',
      dosage: '1 tablet',
      frequency: 'Once daily',
      startDate: '2024-01-10',
      status: 'Active',
      refillDate: '2024-02-10',
      sideEffects: []
    }
  ]);

  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      doctorName: 'Dr. Sarah Smith',
      specialty: 'Cardiology',
      date: '2024-02-15',
      time: '10:00 AM',
      type: 'Online',
      status: 'Upcoming'
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Johnson',
      specialty: 'Endocrinology',
      date: '2024-02-20',
      time: '2:30 PM',
      type: 'In-person',
      status: 'Upcoming'
    }
  ]);

  const [healthVitals] = useState<HealthVital[]>([
    {
      id: '1',
      type: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      date: '2024-01-20',
      status: 'Normal',
      trend: 'stable'
    },
    {
      id: '2',
      type: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      date: '2024-01-20',
      status: 'Normal',
      trend: 'down'
    }
  ]);

  const [refillReminders] = useState<RefillReminder[]>([
    {
      id: '1',
      medicationName: 'Metformin',
      daysLeft: 5,
      status: 'yellow',
      autoRefill: false
    },
    {
      id: '2',
      medicationName: 'Lisinopril',
      daysLeft: 10,
      status: 'green',
      autoRefill: true
    }
  ]);

  const [healthReports] = useState<HealthReport[]>([
    {
      id: '1',
      type: 'Blood Test',
      date: '2024-01-15',
      status: 'Reviewed',
      doctor: 'Dr. Sarah Smith',
      summary: 'All parameters within normal range'
    },
    {
      id: '2',
      type: 'ECG',
      date: '2024-01-10',
      status: 'Reviewed',
      doctor: 'Dr. Michael Johnson',
      summary: 'Normal sinus rhythm'
    }
  ]);

  const [dailyTasks] = useState<DailyTask[]>([
    {
      id: '1',
      title: 'Take Metformin (Morning)',
      completed: true,
      time: '8:00 AM',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Log Blood Pressure',
      completed: false,
      time: '9:00 AM',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Attend Cardiology Appointment',
      completed: false,
      time: '10:00 AM',
      priority: 'high'
    }
  ]);

  const [chatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'doctor',
      message: 'Your recent lab results look good. Continue with current medication.',
      timestamp: '2024-01-20 10:30',
      read: true
    },
    {
      id: '2',
      sender: 'patient',
      message: 'Thank you, doctor. Should I schedule a follow-up?',
      timestamp: '2024-01-20 10:35',
      read: true
    }
  ]);

  const handleBackToHome = () => {
    router.push('/');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Normal':
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'Completed':
      case 'Reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'Discontinued':
      case 'Cancelled':
      case 'red':
        return 'bg-red-100 text-red-800';
      case 'Pending':
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800';
      case 'Elevated':
        return 'bg-orange-100 text-orange-800';
      case 'Low':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Medications Active</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+2 this month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
              <Pill className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Appointments This Month</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+1 this week</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Adherence Rate</p>
              <p className="text-2xl font-bold text-gray-900">92%</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+5% this week</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Health Score</p>
              <p className="text-2xl font-bold text-gray-900">84/100</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+3 this month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Patient Profile Overview */}
      <motion.div
        className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">AS</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Alex Smith</h3>
              <p className="text-gray-600">Patient ID: P-2024-001</p>
              <p className="text-gray-600">Male, 35 years old</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Primary Conditions</p>
            <p className="font-medium text-gray-900">Diabetes Type 2, Hypertension</p>
            <p className="text-sm text-gray-600">Allergies: Penicillin</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Primary Doctor</p>
            <p className="font-medium text-gray-900">Dr. Sarah Smith</p>
            <p className="text-sm text-gray-600">Cardiology</p>
          </div>
          <div className="flex space-x-2">
            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
              <Edit className="w-4 h-4 inline mr-2" />
              Edit Profile
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4 inline mr-2" />
              Download Summary
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Medication History Tracker */}
        <div className="lg:col-span-2">
          <motion.div
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Medication History</h3>
              <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {medications.map((med) => (
                <div key={med.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <Pill className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{med.name} {med.strength}</h4>
                      <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
                      <p className="text-xs text-gray-500">Started: {med.startDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(med.status)}`}>
                      {med.status}
                    </span>
                    {med.refillDate && (
                      <p className="text-xs text-gray-500 mt-1">Refill: {med.refillDate}</p>
                    )}
                    <button className="text-teal-600 hover:text-teal-700 text-sm font-medium mt-1">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Refill Reminders */}
        <div>
          <motion.div
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Refill Reminders</h3>
            <div className="space-y-3">
              {refillReminders.map((reminder) => (
                <div key={reminder.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{reminder.medicationName}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reminder.status)}`}>
                      {reminder.daysLeft} days left
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <button className="bg-teal-600 text-white px-3 py-1 rounded text-sm hover:bg-teal-700 transition-colors">
                      Request Refill
                    </button>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={reminder.autoRefill}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="ml-2 text-xs text-gray-600">Auto-refill</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Appointment Schedule */}
      <motion.div
        className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
          <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
            View Calendar
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{appointment.doctorName}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  appointment.type === 'Online' ? 'bg-blue-100 text-blue-800' : 'bg-teal-100 text-teal-800'
                }`}>
                  {appointment.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{appointment.specialty}</p>
              <p className="text-sm text-gray-600 mb-3">{appointment.date} at {appointment.time}</p>
              <button className={`w-full py-2 rounded text-sm font-medium transition-colors ${
                appointment.type === 'Online' 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}>
                {appointment.type === 'Online' ? 'Join Call' : 'View Details'}
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Health Vitals & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Vitals */}
        <motion.div
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Vitals</h3>
          <div className="space-y-4">
            {healthVitals.map((vital) => (
              <div key={vital.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    {vital.type === 'Heart Rate' && <Heart className="w-4 h-4 text-teal-600" />}
                    {vital.type === 'Blood Pressure' && <Activity className="w-4 h-4 text-teal-600" />}
                    {vital.type === 'Blood Sugar' && <Droplets className="w-4 h-4 text-teal-600" />}
                    {vital.type === 'Weight' && <Scale className="w-4 h-4 text-teal-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{vital.type}</p>
                    <p className="text-sm text-gray-600">{vital.value} {vital.unit}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vital.status)}`}>
                    {vital.status}
                  </span>
                  <div className="flex items-center mt-1">
                    {vital.trend === 'up' && <TrendingUp className="w-3 h-3 text-red-500" />}
                    {vital.trend === 'down' && <TrendingDown className="w-3 h-3 text-green-500" />}
                    {vital.trend === 'stable' && <Minus className="w-3 h-3 text-gray-500" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Health Insights */}
        <motion.div
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI Health Insights</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-teal-50 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">
                Your average blood pressure increased 5% from last week. Consider scheduling a review for Metformin dosage.
              </p>
              <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                Learn More
              </button>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">
                Great job! Your medication adherence rate improved to 92% this week.
              </p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Progress
              </button>
            </div>
            <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
              <Brain className="w-4 h-4 inline mr-2" />
              Chat with AI Assistant
            </button>
          </div>
        </motion.div>
      </div>

      {/* Daily Tasks */}
      <motion.div
        className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Today's Tasks</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Completion Rate:</span>
            <span className="text-sm font-medium text-teal-600">67%</span>
          </div>
        </div>
        <div className="space-y-3">
          {dailyTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <div>
                  <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-600">{task.time}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderMedications = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Medications</h2>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
          <Plus className="w-4 h-4 inline mr-2" />
          Add Medication
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medications.map((med) => (
          <motion.div
            key={med.id}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <Pill className="w-6 h-6 text-teal-600" />
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(med.status)}`}>
                {med.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{med.name}</h3>
            <p className="text-gray-600 mb-1">{med.strength}</p>
            <p className="text-gray-600 mb-1">{med.dosage}</p>
            <p className="text-gray-600 mb-4">{med.frequency}</p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-teal-600 text-white py-2 rounded text-sm hover:bg-teal-700 transition-colors">
                View Details
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded text-sm hover:bg-gray-200 transition-colors">
                Edit
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
          <Plus className="w-4 h-4 inline mr-2" />
          Schedule Appointment
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {appointments.map((appointment) => (
          <motion.div
            key={appointment.id}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                appointment.type === 'Online' ? 'bg-blue-100 text-blue-800' : 'bg-teal-100 text-teal-800'
              }`}>
                {appointment.type}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{appointment.doctorName}</h3>
            <p className="text-gray-600 mb-1">{appointment.specialty}</p>
            <p className="text-gray-600 mb-1">{appointment.date}</p>
            <p className="text-gray-600 mb-4">{appointment.time}</p>
            <button className={`w-full py-2 rounded text-sm font-medium transition-colors ${
              appointment.type === 'Online' 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}>
              {appointment.type === 'Online' ? 'Join Call' : 'View Details'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderHealthRecords = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Health Records</h2>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
          <Plus className="w-4 h-4 inline mr-2" />
          Add Record
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthReports.map((report) => (
          <motion.div
            key={report.id}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                {report.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.type}</h3>
            <p className="text-gray-600 mb-1">{report.date}</p>
            <p className="text-gray-600 mb-1">Dr. {report.doctor}</p>
            <p className="text-gray-600 mb-4 text-sm">{report.summary}</p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-teal-600 text-white py-2 rounded text-sm hover:bg-teal-700 transition-colors">
                View
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded text-sm hover:bg-gray-200 transition-colors">
                Download
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderAIAssistant = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="w-8 h-8 text-teal-600" />
        <h2 className="text-2xl font-bold text-gray-900">AI Health Assistant</h2>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Dr. AI Assistant</h3>
            <p className="text-gray-600">Available 24/7 for health questions</p>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="p-4 bg-teal-50 rounded-lg">
            <p className="text-sm text-gray-700">
              Hello! I'm your AI health assistant. I can help you with medication questions, 
              symptom analysis, health tips, and general health information. How can I assist you today?
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Ask me anything about your health..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="w-8 h-8 text-teal-600" />
        <h2 className="text-2xl font-bold text-gray-900">Chat & Consultation</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversations</h3>
            <div className="space-y-3">
              <div className="p-3 bg-teal-50 rounded-lg cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Dr. Sarah Smith</h4>
                    <p className="text-sm text-gray-600">Your recent lab results look good...</p>
                  </div>
                  <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 h-96 flex flex-col">
            <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${
                    message.sender === 'patient' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'patient' ? 'text-teal-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <CreditCard className="w-8 h-8 text-teal-600" />
        <h2 className="text-2xl font-bold text-gray-900">Billing & Payments</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Due</h3>
          <p className="text-2xl font-bold text-red-600">$125.50</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Last Payment</h3>
          <p className="text-2xl font-bold text-green-600">$89.99</p>
          <p className="text-sm text-gray-600">Jan 15, 2024</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Due</h3>
          <p className="text-2xl font-bold text-orange-600">$45.00</p>
          <p className="text-sm text-gray-600">Feb 15, 2024</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">INV-001</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Medication Refill</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$89.99</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Paid</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">INV-002</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-20</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Consultation Fee</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$125.50</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Due</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-6 border-t border-gray-200">
          <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="w-8 h-8 text-teal-600" />
        <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Trends</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Medication Adherence</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Adherence chart would go here</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="w-8 h-8 text-teal-600" />
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Dark Mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">High Contrast</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Font Size</span>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Email Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">SMS Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Push Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'medications':
        return renderMedications();
      case 'appointments':
        return renderAppointments();
      case 'health-records':
        return renderHealthRecords();
      case 'ai-assistant':
        return renderAIAssistant();
      case 'chat':
        return renderChat();
      case 'billing':
        return renderBilling();
      case 'reports':
        return renderReports();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Zuruu Pharmaceutics</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search medications, prescriptions, or doctors..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button
                onClick={() => setShowChat(!showChat)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-gray-600" />
              </button>
              
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <HelpCircle className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AS</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                
                <AnimatePresence>
                  {showProfileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                    >
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                      <hr className="my-1" />
                      <button
                        onClick={handleBackToHome}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          className={`bg-gray-50 border-r border-gray-200 transition-all duration-300 ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}
          initial={{ width: 256 }}
          animate={{ width: sidebarCollapsed ? 64 : 256 }}
        >
          <nav className="p-4 space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'medications', label: 'My Medications', icon: Pill },
              { id: 'appointments', label: 'My Appointments', icon: Calendar },
              { id: 'health-records', label: 'Health Records', icon: FileText },
              { id: 'ai-assistant', label: 'AI Health Assistant', icon: Brain },
              { id: 'chat', label: 'Chat / Consultation', icon: MessageCircle },
              { id: 'billing', label: 'Billing & Payments', icon: CreditCard },
              { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </button>
            ))}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">© 2025 Zuruu Pharmaceutics</span>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-teal-600" />
                <span className="text-sm text-gray-600">HIPAA Compliant</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Data Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}