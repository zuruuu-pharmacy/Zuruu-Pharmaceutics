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
  SignalZero as SignalZeroIcon,
  X
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
      {/* Section 2: Patient Summary Panel */}
      <div className="space-y-6" style={{ marginTop: '24px' }}>
        {/* Health Summary Banner Card */}
        <motion.div
          className="w-full rounded-2xl p-8 relative overflow-hidden"
          style={{
            height: '180px',
            background: 'linear-gradient(135deg, #009688 0%, #00BFA5 100%)',
            borderRadius: '16px'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center justify-between h-full relative z-10">
            {/* Left Side - Content */}
            <div className="flex-1">
              <motion.h1
                className="text-white mb-2"
                style={{
                  fontSize: '24px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Welcome back, John Doe
              </motion.h1>
              
              <motion.p
                className="text-white mb-4"
                style={{
                  opacity: 0.8,
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.8, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Last login: 14 Oct 2025 | Next Appointment: 18 Oct 2025
              </motion.p>
              
              <motion.button
                className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: 'white',
                  color: '#009688',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Full Profile
              </motion.button>
            </div>

            {/* Right Side - Visual Elements */}
            <div className="flex items-center space-x-6">
              {/* Health Score Donut Chart */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center border-4"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'white'
                  }}
                >
                  <div className="text-center">
                    <div
                      className="text-white font-bold"
                      style={{
                        fontSize: '18px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700
                      }}
                    >
                      82%
                    </div>
                    <div
                      className="text-white text-xs"
                      style={{
                        opacity: 0.8,
                        fontFamily: 'Inter, sans-serif'
                      }}
                    >
                      Health Index
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Pulse Line Illustration */}
              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="flex items-end space-x-1">
                  {[20, 35, 25, 45, 30, 50, 40, 35, 25, 30].map((height, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-full"
                      style={{
                        width: '4px',
                        height: `${height}px`,
                        opacity: 0.7
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}px` }}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full"></div>
          </div>
        </motion.div>

        {/* Compact Info Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Active Medications Card */}
          <motion.div
            className="bg-white rounded-xl p-6 relative cursor-pointer transition-all duration-200 hover:shadow-lg"
            style={{
              height: '120px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              borderRadius: '12px'
            }}
            whileHover={{ y: -2 }}
            onClick={() => setActiveSection('medications')}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#E0F2F1' }}
              >
                <Pill
                  className="w-4 h-4"
                  style={{ color: '#009688' }}
                />
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div
              className="font-bold mb-1"
              style={{
                fontSize: '26px',
                color: '#212121',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700
              }}
            >
              5 Active
            </div>
            <div
              className="text-sm"
              style={{
                color: '#6B6B6B',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400
              }}
            >
              3 chronic | 2 acute
            </div>
          </motion.div>

          {/* Upcoming Appointments Card */}
          <motion.div
            className="bg-white rounded-xl p-6 relative cursor-pointer transition-all duration-200 hover:shadow-lg"
            style={{
              height: '120px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              borderRadius: '12px'
            }}
            whileHover={{ y: -2 }}
            onClick={() => setActiveSection('appointments')}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#E0F2F1' }}
              >
                <Calendar
                  className="w-4 h-4"
                  style={{ color: '#009688' }}
                />
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div
              className="font-bold mb-1"
              style={{
                fontSize: '26px',
                color: '#212121',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700
              }}
            >
              2 Scheduled
            </div>
            <div
              className="text-sm"
              style={{
                color: '#6B6B6B',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400
              }}
            >
              Next in 3 days
            </div>
          </motion.div>

          {/* Adherence Score Card */}
          <motion.div
            className="bg-white rounded-xl p-6 relative cursor-pointer transition-all duration-200 hover:shadow-lg"
            style={{
              height: '120px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              borderRadius: '12px'
            }}
            whileHover={{ y: -2 }}
            onClick={() => setActiveSection('reports')}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#E0F2F1' }}
              >
                <CheckCircle
                  className="w-4 h-4"
                  style={{ color: '#009688' }}
                />
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div
              className="font-bold mb-1"
              style={{
                fontSize: '26px',
                color: '#212121',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700
              }}
            >
              92%
            </div>
            <div
              className="text-sm"
              style={{
                color: '#6B6B6B',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400
              }}
            >
              Excellent adherence
            </div>
          </motion.div>

          {/* Recent Refills Card */}
          <motion.div
            className="bg-white rounded-xl p-6 relative cursor-pointer transition-all duration-200 hover:shadow-lg"
            style={{
              height: '120px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              borderRadius: '12px'
            }}
            whileHover={{ y: -2 }}
            onClick={() => setActiveSection('medications')}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#E0F2F1' }}
              >
                <RotateCcw
                  className="w-4 h-4"
                  style={{ color: '#009688' }}
                />
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div
              className="font-bold mb-1"
              style={{
                fontSize: '26px',
                color: '#212121',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700
              }}
            >
              3 Refills Done
            </div>
            <div
              className="text-sm"
              style={{
                color: '#6B6B6B',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400
              }}
            >
              Last refill 5 days ago
            </div>
          </motion.div>
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
    <div className="min-h-screen bg-white">
      {/* Section 1.2: Top Header Bar - Exact Specifications */}
      <motion.header
        className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50"
        style={{ 
          height: '72px',
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.08)'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div 
          className="flex items-center justify-between h-full px-6"
          style={{ maxWidth: '1440px', margin: '0 auto' }}
        >
          {/* Left Section - Logo Area */}
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              aria-label="Toggle sidebar"
            >
              {sidebarCollapsed ? <ChevronRight className="w-5 h-5 text-gray-600" /> : <ChevronLeft className="w-5 h-5 text-gray-600" />}
            </button>
            <button
              onClick={() => setActiveSection('dashboard')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
            >
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#009688' }}
              >
                <Pill className="w-4 h-4 text-white" />
              </div>
              <span 
                className="font-bold text-xl"
                style={{ 
                  color: '#009688',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700
                }}
              >
                Zuruu Pharmaceutics
              </span>
            </button>
          </motion.div>

          {/* Center Section - Search Bar */}
          <motion.div 
            className="flex-1 max-w-lg mx-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative">
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                style={{ color: '#757575' }}
              />
              <input
                type="text"
                placeholder="Search medications, prescriptions, or doctors…"
                className="w-full pl-10 pr-10 py-2 border rounded-full focus:outline-none focus:ring-3 transition-all duration-200"
                style={{
                  height: '40px',
                  borderColor: '#E0E0E0',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                  backgroundColor: 'white'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#009688';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0,150,136,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E0E0E0';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Right Section - Quick Icons + Profile */}
          <motion.div 
            className="flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Notifications Bell */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
              aria-label="Notifications"
            >
              <Bell 
                className="w-6 h-6 transition-colors duration-200"
                style={{ color: '#757575' }}
              />
              <span 
                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: '#E53935' }}
              ></span>
              <div className="absolute top-0 right-0 w-1 h-1 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
            
            {/* Chat Icon */}
            <button
              onClick={() => setShowChat(!showChat)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
              aria-label="Messages"
            >
              <MessageCircle 
                className="w-6 h-6 transition-colors duration-200"
                style={{ color: '#757575' }}
              />
              <div className="absolute top-0 right-0 w-1 h-1 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
            
            {/* Help Icon */}
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
              aria-label="Help Center"
            >
              <HelpCircle 
                className="w-6 h-6 transition-colors duration-200"
                style={{ color: '#757575' }}
              />
              <div className="absolute top-0 right-0 w-1 h-1 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
            
            {/* Profile Avatar */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-all duration-200"
                aria-label="Profile menu"
              >
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center border-2"
                  style={{ 
                    backgroundColor: '#009688',
                    borderColor: '#009688'
                  }}
                >
                  <span className="text-white text-sm font-bold">AS</span>
                </div>
                <ChevronDown 
                  className="w-4 h-4 transition-colors duration-200"
                  style={{ color: '#757575' }}
                />
              </button>
              
              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 mt-2 w-45 bg-white rounded-lg shadow-lg border py-2 z-50"
                    style={{
                      width: '180px',
                      borderColor: '#E0E0E0',
                      boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                      borderRadius: '10px'
                    }}
                  >
                    <a 
                      href="#" 
                      className="block px-4 py-2 text-sm transition-colors duration-200 hover:bg-gray-50"
                      style={{ 
                        color: '#212121',
                        fontFamily: 'Inter, sans-serif'
                      }}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.backgroundColor = '#E0F2F1';
                        target.style.color = '#009688';
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.backgroundColor = 'transparent';
                        target.style.color = '#212121';
                      }}
                    >
                      My Profile
                    </a>
                    <a 
                      href="#" 
                      className="block px-4 py-2 text-sm transition-colors duration-200 hover:bg-gray-50"
                      style={{ 
                        color: '#212121',
                        fontFamily: 'Inter, sans-serif'
                      }}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.backgroundColor = '#E0F2F1';
                        target.style.color = '#009688';
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.backgroundColor = 'transparent';
                        target.style.color = '#212121';
                      }}
                    >
                      Settings
                    </a>
                    <hr className="my-1" style={{ borderColor: '#E0E0E0' }} />
                    <button
                      onClick={handleBackToHome}
                      className="block w-full text-left px-4 py-2 text-sm transition-colors duration-200 hover:bg-gray-50"
                      style={{ 
                        color: '#E53935',
                        fontFamily: 'Inter, sans-serif'
                      }}
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.header>

      <div className="flex" style={{ marginTop: '72px' }}>
        {/* Section 1.3: Sidebar Navigation - Exact Specifications */}
        <motion.aside
          className="fixed left-0 top-0 h-full border-r transition-all duration-300 ease-in-out"
          style={{
            width: sidebarCollapsed ? '80px' : '260px',
            backgroundColor: '#F2F4F6',
            borderColor: '#E0E0E0',
            height: '100vh',
            zIndex: 40
          }}
          initial={{ width: 260, x: -260 }}
          animate={{ 
            width: sidebarCollapsed ? 80 : 260,
            x: 0
          }}
          transition={{ duration: 0.3, ease: "ease-in-out" }}
        >
          <nav className="p-6 space-y-2 h-full overflow-y-auto">
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
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: activeSection === item.id ? '#009688' : 'transparent',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: activeSection === item.id ? 500 : 400
                }}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="text-sm font-medium truncate">{item.label}</span>
                )}
              </button>
            ))}
            
            {/* Collapse Toggle Button */}
            <div className="absolute bottom-6 left-6 right-6">
              <button
                onClick={toggleSidebar}
                className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle sidebar"
              >
                {sidebarCollapsed ? <ChevronRight className="w-5 h-5 text-gray-600" /> : <ChevronLeft className="w-5 h-5 text-gray-600" />}
              </button>
            </div>
          </nav>
        </motion.aside>

        {/* Section 1.4: Main Content Area - Exact Specifications */}
        <main 
          className="flex-1 transition-all duration-300 ease-in-out"
          style={{
            marginLeft: sidebarCollapsed ? '80px' : '260px',
            backgroundColor: '#FFFFFF',
            padding: '24px',
            maxWidth: '1200px',
            marginTop: '72px'
          }}
        >
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.5
            }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>

      {/* Footer - HIPAA Compliance */}
      <footer 
        className="bg-white border-t mt-auto"
        style={{ 
          borderColor: '#E0E0E0',
          marginTop: 'auto'
        }}
      >
        <div 
          className="flex items-center justify-between py-4 px-6"
          style={{ maxWidth: '1440px', margin: '0 auto' }}
        >
          <div className="flex items-center space-x-4">
            <span 
              className="text-sm"
              style={{ 
                color: '#757575',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              © 2025 Zuruu Pharmaceutics
            </span>
            <div className="flex items-center space-x-2">
              <Shield 
                className="w-4 h-4"
                style={{ color: '#009688' }}
              />
              <span 
                className="text-sm"
                style={{ 
                  color: '#757575',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                HIPAA Compliant
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <a 
              href="#" 
              className="text-sm transition-colors duration-200 hover:opacity-80"
              style={{ 
                color: '#757575',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm transition-colors duration-200 hover:opacity-80"
              style={{ 
                color: '#757575',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-sm transition-colors duration-200 hover:opacity-80"
              style={{ 
                color: '#757575',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Data Security
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}