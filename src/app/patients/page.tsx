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
  X,
  RefreshCw
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
  const [unreadNotifications, setUnreadNotifications] = useState(5);
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [showHelp, setShowHelp] = useState(false);

  // Mock notification data
  const notifications = [
    {
      id: '1',
      type: 'refill_reminder',
      title: 'John Doe\'s Metformin refill due in 3 days',
      message: 'Metformin 500mg | BID - Last refill: Sep 18, 2024',
      time: '2 hours ago',
      urgent: true,
      read: false,
      patientId: '1',
      medicationId: '1'
    },
    {
      id: '2',
      type: 'overdue_alert',
      title: 'Ahmed Hassan\'s Insulin refill overdue by 2 days',
      message: 'Insulin Glargine | Daily - Critical medication',
      time: '4 hours ago',
      urgent: true,
      read: false,
      patientId: '3',
      medicationId: '3'
    },
    {
      id: '3',
      type: 'adherence_warning',
      title: 'Sarah Smith\'s adherence dropped to 78%',
      message: 'Lisinopril 10mg - Consider intervention',
      time: '6 hours ago',
      urgent: false,
      read: false,
      patientId: '2',
      medicationId: '2'
    },
    {
      id: '4',
      type: 'refill_reminder',
      title: 'Maria Garcia\'s Atorvastatin refill due in 12 days',
      message: 'Atorvastatin 20mg | QD - Excellent adherence (95%)',
      time: '1 day ago',
      urgent: false,
      read: true,
      patientId: '4',
      medicationId: '4'
    },
    {
      id: '5',
      type: 'system_update',
      title: 'New AI insights available',
      message: 'Updated risk assessment for 3 patients',
      time: '2 days ago',
      urgent: false,
      read: true,
      patientId: null,
      medicationId: null
    }
  ];

  const handleNotificationClick = (notification: any) => {
    // Mark as read
    if (!notification.read) {
      setUnreadNotifications(prev => Math.max(0, prev - 1));
    }
    
    // Navigate based on notification type
    if (notification.type === 'refill_reminder' || notification.type === 'overdue_alert') {
      setActiveSection('refill-reminders');
    } else if (notification.type === 'adherence_warning') {
      setActiveSection('medications');
    }
    
    setShowNotifications(false);
  };

  const handleMarkAllAsRead = () => {
    setUnreadNotifications(0);
  };

  const handleSnoozeNotification = (notificationId: string) => {
    // Mock function - would snooze notification
    console.log(`Snoozing notification ${notificationId}`);
  };

  const handleSendMessage = (patientId: string) => {
    // Mock function - would open chat with patient
    console.log(`Opening chat with patient ${patientId}`);
    setActiveSection('chat');
    setShowNotifications(false);
  };




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

  const renderRefillReminders = () => {
    const [selectedTimeRange, setSelectedTimeRange] = useState('30days');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [selectedRefill, setSelectedRefill] = useState<any>(null);
    const [showRefillModal, setShowRefillModal] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showExportDropdown, setShowExportDropdown] = useState(false);

    // Mock refill data
    const refillData = [
      {
        id: '1',
        patientName: 'John Doe',
        patientAvatar: 'JD',
        medication: 'Metformin 500mg',
        dosage: 'BID',
        daysRemaining: 3,
        refillDue: '2024-10-18',
        urgency: 'orange',
        lastRefill: '2024-09-18',
        adherence: 85,
        status: 'pending'
      },
      {
        id: '2',
        patientName: 'Sarah Smith',
        patientAvatar: 'SS',
        medication: 'Lisinopril 10mg',
        dosage: 'QD',
        daysRemaining: 8,
        refillDue: '2024-10-23',
        urgency: 'green',
        lastRefill: '2024-09-23',
        adherence: 92,
        status: 'pending'
      },
      {
        id: '3',
        patientName: 'Ahmed Hassan',
        patientAvatar: 'AH',
        medication: 'Insulin Glargine',
        dosage: 'Daily',
        daysRemaining: -2,
        refillDue: '2024-10-13',
        urgency: 'red',
        lastRefill: '2024-09-13',
        adherence: 78,
        status: 'overdue'
      },
      {
        id: '4',
        patientName: 'Maria Garcia',
        patientAvatar: 'MG',
        medication: 'Atorvastatin 20mg',
        dosage: 'QD',
        daysRemaining: 12,
        refillDue: '2024-10-27',
        urgency: 'green',
        lastRefill: '2024-09-27',
        adherence: 95,
        status: 'pending'
      }
    ];

    const getUrgencyColor = (urgency: string) => {
      switch (urgency) {
        case 'green': return '#10B981';
        case 'orange': return '#F59E0B';
        case 'red': return '#EF4444';
        default: return '#6B7280';
      }
    };

    const getUrgencyText = (urgency: string) => {
      switch (urgency) {
        case 'green': return 'Safe';
        case 'orange': return 'Warning';
        case 'red': return 'Critical';
        default: return 'Unknown';
      }
    };

    const handleRefillClick = (refill: any) => {
      setSelectedRefill(refill);
      setShowRefillModal(true);
    };

    const handleSendReminder = (refillId: string) => {
      // Mock function - would send actual reminder
      console.log(`Sending reminder for refill ${refillId}`);
    };

    const handleMarkAsDone = (refillId: string) => {
      // Mock function - would mark refill as completed
      console.log(`Marking refill ${refillId} as done`);
    };

    const handleExportData = (format: string) => {
      // Mock function - would export data in specified format
      console.log(`Exporting refill data as ${format}`);
      setShowExportDropdown(false);
      
      // Simulate export process
      const exportData = {
        format,
        timestamp: new Date().toISOString(),
        data: refillData,
        summary: {
          totalRefills: refillData.length,
          overdueCount: refillData.filter(r => r.daysRemaining < 0).length,
          complianceRate: 87
        }
      };
      
      console.log('Export data:', exportData);
    };

  return (
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Refill Reminders & Alerts</h2>
            <p className="text-gray-600 mt-1">Automated medication refill tracking and notifications</p>
        </div>
      </div>

        {/* Top Toolbar */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-gray-900">Refill Reminder Center</h3>
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="7days">Next 7 Days</option>
                <option value="30days">Next 30 Days</option>
                <option value="90days">Next 90 Days</option>
              </select>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  notificationsEnabled 
                    ? 'bg-teal-100 text-teal-600' 
                    : 'bg-gray-100 text-gray-400'
                }`}
                title="Toggle notifications"
              >
                <Bell className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced AI Analytics Panel */}
        <motion.div
          className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6 border border-teal-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-teal-600" />
              <h3 className="text-xl font-semibold text-gray-900">AI Analytics & Insights</h3>
            </div>
            <button className="text-sm text-teal-600 hover:text-teal-700 transition-colors">
              <RefreshCw className="w-4 h-4 inline mr-1" />
              Refresh Analysis
            </button>
          </div>
          
          {/* Primary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-600">Refill Compliance</div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-teal-600 mb-1">87%</div>
              <div className="text-xs text-gray-500">+5% vs last month</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-600">Overdue Refills</div>
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-red-600 mb-1">2</div>
              <div className="text-xs text-gray-500">Critical attention needed</div>
              <div className="mt-2">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                <span className="text-xs text-gray-600">Ahmed Hassan, John Doe</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-600">Risk Score</div>
                <Shield className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-yellow-600 mb-1">Low</div>
              <div className="text-xs text-gray-500">Overall assessment</div>
              <div className="mt-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-600">Auto-Reminders</div>
                <Bell className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-600 mb-1">12</div>
              <div className="text-xs text-gray-500">Sent this week</div>
              <div className="mt-2">
                <span className="text-xs text-gray-600">92% response rate</span>
              </div>
            </div>
          </div>

          {/* AI Insights & Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Assessment */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <AlertTriangle className="w-4 h-4 text-orange-500 mr-2" />
                Risk Assessment
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-red-800">High Risk</div>
                    <div className="text-xs text-red-600">Ahmed Hassan - Insulin overdue</div>
                  </div>
                  <div className="text-xs text-red-500 font-medium">Critical</div>
                </div>
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-yellow-800">Medium Risk</div>
                    <div className="text-xs text-yellow-600">John Doe - Adherence declining</div>
                  </div>
                  <div className="text-xs text-yellow-500 font-medium">Monitor</div>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-green-800">Low Risk</div>
                    <div className="text-xs text-green-600">Sarah Smith, Maria Garcia</div>
                  </div>
                  <div className="text-xs text-green-500 font-medium">Stable</div>
                </div>
              </div>
            </div>

            {/* Smart Recommendations */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Brain className="w-4 h-4 text-blue-500 mr-2" />
                Smart Recommendations
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-800 mb-1">Immediate Action</div>
                  <div className="text-xs text-blue-600">Contact Ahmed Hassan for insulin refill - critical medication</div>
                  <button className="mt-2 text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors">
                    Take Action
                  </button>
                </div>
                <div className="p-3 bg-teal-50 rounded-lg">
                  <div className="text-sm font-medium text-teal-800 mb-1">Optimization</div>
                  <div className="text-xs text-teal-600">Consider extended-release Metformin for John Doe</div>
                  <button className="mt-2 text-xs bg-teal-600 text-white px-2 py-1 rounded hover:bg-teal-700 transition-colors">
                    Review
                  </button>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-green-800 mb-1">Maintenance</div>
                  <div className="text-xs text-green-600">Continue current regimen for Sarah & Maria</div>
                  <button className="mt-2 text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition-colors">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Predictive Analytics */}
          <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <TrendingUp className="w-4 h-4 text-purple-500 mr-2" />
              Predictive Analytics
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">94%</div>
                <div className="text-sm text-gray-600">Predicted compliance next month</div>
                <div className="text-xs text-green-600 mt-1">↑ Improving trend</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">3</div>
                <div className="text-sm text-gray-600">Potential refill delays</div>
                <div className="text-xs text-orange-600 mt-1">Early intervention needed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">$2,340</div>
                <div className="text-sm text-gray-600">Estimated cost savings</div>
                <div className="text-xs text-blue-600 mt-1">From improved adherence</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Zone A: Upcoming Refill Cards */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Refills</h4>
            <div className="space-y-4">
              {refillData.map((refill) => (
                <motion.div
                  key={refill.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer transition-all duration-200 hover:shadow-md"
                  style={{
                    borderLeft: `4px solid ${getUrgencyColor(refill.urgency)}`
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleRefillClick(refill)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-teal-600 font-semibold text-sm">{refill.patientAvatar}</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">{refill.patientName}</h5>
                        <p className="text-sm text-gray-600">{refill.medication} | {refill.dosage}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          refill.urgency === 'green' ? 'bg-green-100 text-green-800' :
                          refill.urgency === 'orange' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {getUrgencyText(refill.urgency)}
                        </span>
                        <span className="text-sm text-gray-600">
                          {refill.daysRemaining < 0 ? `${Math.abs(refill.daysRemaining)} days overdue` : 
                           `${refill.daysRemaining} days remaining`}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Due: {refill.refillDue}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Adherence: {refill.adherence}%</span>
                      <span>Last refill: {refill.lastRefill}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSendReminder(refill.id);
                        }}
                        className="px-3 py-1 bg-teal-600 text-white text-xs rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        Send Reminder
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsDone(refill.id);
                        }}
                        className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Mark as Done
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Zone B: Alert Timeline */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Refill Timeline</h4>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="space-y-4">
                {refillData.map((refill, index) => (
                  <motion.div
                    key={refill.id}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => handleRefillClick(refill)}
                  >
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: getUrgencyColor(refill.urgency) }}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{refill.patientName}</p>
                      <p className="text-xs text-gray-600">{refill.medication}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{refill.refillDue}</p>
                      <p className="text-xs text-gray-400">
                        {refill.daysRemaining < 0 ? 'Overdue' : `${refill.daysRemaining}d left`}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Settings Panel Modal */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
            >
              <motion.div
                className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Notification Settings</h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Notification Frequency */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Notification Frequency</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input type="radio" name="frequency" value="immediate" className="text-teal-600" defaultChecked />
                        <span className="text-sm text-gray-700">Immediate alerts for critical medications</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="radio" name="frequency" value="daily" className="text-teal-600" />
                        <span className="text-sm text-gray-700">Daily summary at 9:00 AM</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="radio" name="frequency" value="weekly" className="text-teal-600" />
                        <span className="text-sm text-gray-700">Weekly summary on Mondays</span>
                      </label>
                    </div>
                  </div>

                  {/* Urgency Thresholds */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Urgency Thresholds</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Critical Alert</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                          <option value="0">Same day</option>
                          <option value="1">1 day before</option>
                          <option value="2">2 days before</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Warning Alert</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                          <option value="3">3 days before</option>
                          <option value="5">5 days before</option>
                          <option value="7">1 week before</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Reminder Alert</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                          <option value="7">1 week before</option>
                          <option value="14">2 weeks before</option>
                          <option value="30">1 month before</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Channel Preferences */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Notification Channels</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Bell className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">Dashboard notifications</span>
                        </div>
                        <input type="checkbox" defaultChecked className="text-teal-600" />
                      </label>
                      <label className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">Email notifications</span>
                        </div>
                        <input type="checkbox" defaultChecked className="text-teal-600" />
                      </label>
                      <label className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <MessageCircle className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">SMS notifications</span>
                        </div>
                        <input type="checkbox" className="text-teal-600" />
                      </label>
                      <label className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">Push notifications</span>
                        </div>
                        <input type="checkbox" defaultChecked className="text-teal-600" />
                      </label>
                    </div>
                  </div>

                  {/* Auto-Message Templates */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Auto-Message Templates</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Refill Reminder Template</label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          rows={3}
                          defaultValue="Hi {patient_name}, your {medication_name} refill is due in {days_remaining} days. Please contact us to schedule your refill. - Zuruu Pharmacy"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Overdue Alert Template</label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          rows={3}
                          defaultValue="URGENT: {patient_name}, your {medication_name} refill is overdue by {days_overdue} days. Please contact us immediately. - Zuruu Pharmacy"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* AI Suggestions */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">AI Features</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Brain className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">Enable AI suggestions</span>
                        </div>
                        <input type="checkbox" defaultChecked className="text-teal-600" />
                      </label>
                      <label className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <TrendingUp className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">Predictive analytics</span>
                        </div>
                        <input type="checkbox" defaultChecked className="text-teal-600" />
                      </label>
                      <label className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">Risk assessment alerts</span>
                        </div>
                        <input type="checkbox" defaultChecked className="text-teal-600" />
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-6 border-t border-gray-200 mt-6">
                  <button className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
                    Save Settings
                  </button>
                  <button 
                    onClick={() => setShowSettings(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Refill Detail Modal */}
        <AnimatePresence>
          {showRefillModal && selectedRefill && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRefillModal(false)}
            >
              <motion.div
                className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Refill Details</h3>
                  <button
                    onClick={() => setShowRefillModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedRefill.medication}</h4>
                    <p className="text-sm text-gray-600">Patient: {selectedRefill.patientName}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Dosage:</span>
                      <p className="font-medium">{selectedRefill.dosage}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Days Remaining:</span>
                      <p className="font-medium">{selectedRefill.daysRemaining}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Refill:</span>
                      <p className="font-medium">{selectedRefill.lastRefill}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Adherence:</span>
                      <p className="font-medium">{selectedRefill.adherence}%</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    <button className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
                      Approve Refill
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                      Send Reminder
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderMedications = () => {
    const [selectedMedication, setSelectedMedication] = useState<string | null>(null);
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    const [timeRange, setTimeRange] = useState('6months');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [zoomLevel, setZoomLevel] = useState(1);
    const [showExportDropdown, setShowExportDropdown] = useState(false);

    // Debug logging
    console.log('renderMedications called');

    // Mock medication data with timeline information
    const timelineMedications = [
      {
        id: '1',
        name: 'Metformin',
        strength: '500mg',
        dosage: '500 mg twice daily',
        frequency: 'BID',
        startDate: '2024-08-01',
        endDate: '2024-10-01',
        status: 'Active',
        adherence: 85,
        effectiveness: 4,
        drugClass: 'Antidiabetic',
        color: 'green',
        sideEffects: [
          { date: '2024-08-15', effect: 'Mild nausea', severity: 'mild' },
          { date: '2024-09-02', effect: 'Stomach upset', severity: 'mild' }
        ],
        notes: 'Patient reports good glucose control. Continue current dose.',
        attachments: ['lab_report_aug.pdf']
      },
      {
        id: '2',
        name: 'Lisinopril',
        strength: '10mg',
        dosage: '10 mg once daily',
        frequency: 'QD',
        startDate: '2024-07-15',
        endDate: '2024-12-15',
        status: 'Active',
        adherence: 92,
        effectiveness: 5,
        drugClass: 'Antihypertensive',
        color: 'red',
        sideEffects: [],
        notes: 'Excellent blood pressure control. No side effects reported.',
        attachments: []
      },
      {
        id: '3',
        name: 'Amoxicillin',
        strength: '500mg',
        dosage: '500 mg three times daily',
        frequency: 'TID',
        startDate: '2024-09-20',
        endDate: '2024-09-27',
        status: 'Discontinued',
        adherence: 100,
        effectiveness: 5,
        drugClass: 'Antibiotic',
        color: 'blue',
        sideEffects: [
          { date: '2024-09-22', effect: 'Mild diarrhea', severity: 'mild' }
        ],
        notes: 'Course completed successfully. Infection resolved.',
        attachments: []
      }
    ];

    const getDrugClassColor = (drugClass: string) => {
      switch (drugClass) {
        case 'Antibiotic': return '#3B82F6'; // Blue
        case 'Antihypertensive': return '#EF4444'; // Red
        case 'Antidiabetic': return '#10B981'; // Green
        case 'Supplement': return '#F59E0B'; // Yellow
        default: return '#009688'; // Teal
      }
    };

    const renderAdherenceBar = (adherence: number) => {
      const filledBars = Math.round(adherence / 10);
  return (
        <div className="flex items-center space-x-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < filledBars ? 'bg-teal-500' : 'bg-gray-200'
              }`}
            />
          ))}
          <span className="text-xs text-gray-600 ml-2">{adherence}%</span>
        </div>
      );
    };

    const renderEffectivenessStars = (rating: number) => {
      return (
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      );
    };

    const handleExportData = (format: string) => {
      // Mock function - would export data in specified format
      console.log(`Exporting medication data as ${format}`);
      setShowExportDropdown(false);
      
      // Simulate export process
      const exportData = {
        format,
        timestamp: new Date().toISOString(),
        data: timelineMedications,
        summary: {
          totalMedications: timelineMedications.length,
          activeMedications: timelineMedications.filter(m => m.status === 'Active').length,
          averageAdherence: Math.round(timelineMedications.reduce((acc, m) => acc + m.adherence, 0) / timelineMedications.length)
        }
      };
      
      console.log('Export data:', exportData);
    };

    return (
      <div className="space-y-6">
        {/* Debug Info */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">Debug: renderMedications function is working</p>
          <p className="text-xs text-blue-600">Medications count: {timelineMedications.length}</p>
        </div>
        
        {/* Section Header with Controls */}
        <div className="flex items-center justify-between">
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Medication History Tracker</h2>
            <p className="text-gray-600 mt-1">Interactive timeline view of your medication journey</p>
        </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button 
                    onClick={() => setShowExportDropdown(!showExportDropdown)}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </button>
                  
                  {/* Export Dropdown */}
                  <AnimatePresence>
                    {showExportDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                      >
                        <div className="py-1">
                          <button 
                            onClick={() => handleExportData('PDF')}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Export as PDF
                          </button>
                          <button 
                            onClick={() => handleExportData('CSV')}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Export as CSV
                          </button>
                          <button 
                            onClick={() => handleExportData('Excel')}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                          >
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Export as Excel
                          </button>
                          <button 
                            onClick={() => handleExportData('Share')}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                          >
                            <Share className="w-4 h-4 mr-2" />
                            Share Report
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
      </div>

        {/* Filter Controls */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search medications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Medications</option>
              <option value="Active">Active</option>
              <option value="Discontinued">Discontinued</option>
              <option value="Pending">Pending Refill</option>
            </select>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="1month">Last Month</option>
              <option value="3months">3 Months</option>
              <option value="6months">6 Months</option>
              <option value="1year">1 Year</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-600 px-2">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
                <Plus className="w-4 h-4" />
            </button>
            </div>
        </div>

        {/* AI Analytics Panel */}
        <motion.div
          className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-4 border border-teal-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-2 mb-3">
            <Brain className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI Analytics Summary</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-600 mb-1">Adherence Trend</div>
              <div className="text-lg font-bold text-teal-600">+5% this month</div>
              <div className="text-xs text-gray-500">Improving consistently</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-600 mb-1">Therapy Stability</div>
              <div className="text-lg font-bold text-green-600">Stable</div>
              <div className="text-xs text-gray-500">No changes needed</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-600 mb-1">Risk Assessment</div>
              <div className="text-lg font-bold text-yellow-600">Low Risk</div>
              <div className="text-xs text-gray-500">Continue monitoring</div>
            </div>
          </div>
        </motion.div>

        {/* Timeline Container */}
        <div 
          className="bg-gray-50 rounded-lg p-6 relative overflow-hidden"
          style={{ 
            height: '700px',
            backgroundColor: '#FAFAFA'
          }}
        >
          {/* Timeline Axis */}
          <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
          
          {/* Current Day Indicator */}
          <div 
            className="absolute top-1/2 w-1 h-8 bg-teal-500 transform -translate-y-1/2 rounded-full"
            style={{
              left: '70%',
              boxShadow: '0 0 10px rgba(0, 150, 136, 0.5)',
              animation: 'pulse 2s infinite'
            }}
          ></div>

          {/* Date Markers */}
          <div className="absolute top-1/2 left-6 right-6 transform -translate-y-1/2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 w-px h-3 bg-gray-400"
                style={{ left: `${i * 8.33}%` }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                  {i % 2 === 0 ? `Aug ${i * 15 + 1}` : ''}
                </div>
              </div>
            ))}
          </div>

          {/* Medication Cards */}
          <div className="relative h-full">
            {timelineMedications.map((med, index) => (
              <motion.div
                key={med.id}
                className="absolute bg-white rounded-xl shadow-lg border border-gray-100 cursor-pointer"
                style={{
                  width: '320px',
                  height: '160px',
                  left: `${20 + index * 25}%`,
                  top: index % 2 === 0 ? '20%' : '60%',
                  transform: `scale(${zoomLevel})`,
                  borderLeft: `4px solid ${getDrugClassColor(med.drugClass)}`
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setExpandedCard(expandedCard === med.id ? null : med.id)}
              >
                {/* Connector Line to Timeline */}
                <div 
                  className="absolute w-px bg-teal-500"
                  style={{
                    height: index % 2 === 0 ? '60px' : '60px',
                    top: index % 2 === 0 ? '100%' : '-60px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="absolute w-2 h-2 bg-teal-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    style={{ top: index % 2 === 0 ? '100%' : '0%' }}></div>
                </div>

                <div className="p-4 h-full flex flex-col">
                  {/* Top Row */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900" style={{ fontSize: '18px' }}>
                      {med.name} {med.strength}
                    </h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Middle Section */}
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">{med.dosage}</p>
                    <p className="text-xs text-gray-500 mb-2">
                      {med.startDate} → {med.endDate}
                    </p>
                  </div>

                  {/* Bottom Row - Mini Analytics */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Adherence:</span>
                      {renderAdherenceBar(med.adherence)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Effectiveness:</span>
                      {renderEffectivenessStars(med.effectiveness)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(med.status)}`}>
                        {med.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expandable Response Logs */}
                <AnimatePresence>
                  {expandedCard === med.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 rounded-b-xl shadow-lg z-10"
                    >
                      <div className="p-4 space-y-4">
                        {/* Side Effects */}
                        {med.sideEffects.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Side Effects</h4>
                            <div className="space-y-2">
                              {med.sideEffects.map((effect, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                  <span className="text-gray-700">{effect.effect}</span>
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    effect.severity === 'mild' ? 'bg-yellow-100 text-yellow-800' :
                                    effect.severity === 'moderate' ? 'bg-orange-100 text-orange-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {effect.severity}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Pharmacist Notes */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Pharmacist Notes</h4>
                          <p className="text-sm text-gray-700">{med.notes}</p>
                        </div>

                        {/* Attachments */}
                        {med.attachments.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Attachments</h4>
                            <div className="space-y-1">
                              {med.attachments.map((attachment, idx) => (
                                <div key={idx} className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                                  <FileText className="w-4 h-4" />
                                  <span>{attachment}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-2 border-t border-gray-200">
                          <button className="flex-1 bg-teal-600 text-white py-2 rounded text-sm hover:bg-teal-700 transition-colors">
                            Edit Notes
                          </button>
                          <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded text-sm hover:bg-gray-200 transition-colors">
                            Add Attachment
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <h4 className="font-semibold text-gray-900 mb-3">Drug Class Legend</h4>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#3B82F6' }}></div>
              <span className="text-sm text-gray-600">Antibiotics</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#EF4444' }}></div>
              <span className="text-sm text-gray-600">Antihypertensives</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10B981' }}></div>
              <span className="text-sm text-gray-600">Antidiabetics</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#F59E0B' }}></div>
              <span className="text-sm text-gray-600">Supplements</span>
            </div>
          </div>
      </div>
    </div>
  );
  };

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

  const renderInteractionChecker = () => {
    const [smartMode, setSmartMode] = useState(true);
    const [showSettings, setShowSettings] = useState(false);
    const [showInteractionModal, setShowInteractionModal] = useState(false);
    const [selectedInteraction, setSelectedInteraction] = useState<any>(null);
    const [riskLevel, setRiskLevel] = useState('moderate');
    const [interactionCount, setInteractionCount] = useState(2);

    // Mock interaction data
    const interactions = [
      {
        id: '1',
        type: 'Drug-Drug Interaction',
        drugs: ['Warfarin', 'Aspirin'],
        severity: 'High',
        mechanism: 'Increased bleeding risk due to platelet inhibition',
        recommendation: 'Avoid combination or monitor INR closely',
        confidence: 94,
        evidence: 'FDA LexiComp Database, updated 2025'
      },
      {
        id: '2',
        type: 'Drug-Disease Interaction',
        drugs: ['Metoprolol', 'Asthma'],
        severity: 'Moderate',
        mechanism: 'Beta-blockers can worsen bronchospasm in asthma patients',
        recommendation: 'Consider alternative antihypertensive or monitor closely',
        confidence: 87,
        evidence: 'WHO Drug Safety Database'
      }
    ];

    const getSeverityColor = (severity: string) => {
      switch (severity) {
        case 'High': return 'bg-red-100 text-red-800 border-red-200';
        case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'Low': return 'bg-green-100 text-green-800 border-green-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    };

    const getRiskLevelColor = (level: string) => {
      switch (level) {
        case 'high': return 'bg-red-500';
        case 'moderate': return 'bg-yellow-500';
        case 'low': return 'bg-green-500';
        default: return 'bg-gray-500';
      }
    };

    const handleInteractionClick = (interaction: any) => {
      setSelectedInteraction(interaction);
      setShowInteractionModal(true);
    };

    return (
      <div className="space-y-6">
        {/* Header & Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-900">AI Drug Interaction Checker</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Smart Mode:</span>
                <button
                  onClick={() => setSmartMode(!smartMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    smartMode ? 'bg-teal-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      smartMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm ${smartMode ? 'text-teal-600' : 'text-gray-500'}`}>
                  {smartMode ? 'ON' : 'OFF'}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-gray-600">
            Automatically analyzes prescriptions and clinical records for unsafe combinations in real time.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Medication Input & Patient Context */}
          <div className="space-y-6">
            {/* Current Medications */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Medications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Warfarin 5mg</h4>
                    <p className="text-sm text-gray-600">Once daily • Dr. Smith</p>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Aspirin 81mg</h4>
                    <p className="text-sm text-gray-600">Once daily • Dr. Johnson</p>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Metoprolol 50mg</h4>
                    <p className="text-sm text-gray-600">Twice daily • Dr. Brown</p>
                  </div>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-teal-500 hover:text-teal-600 transition-colors">
                <Plus className="w-5 h-5 inline mr-2" />
                Add New Medication
              </button>
            </div>

            {/* Patient Conditions */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Conditions</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <span className="text-sm text-blue-800">Hypertension</span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <span className="text-sm text-blue-800">Type 2 Diabetes</span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <span className="text-sm text-blue-800">Mild Asthma</span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Allergies */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Known Allergies</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                  <span className="text-sm text-red-800">Penicillin (Severe Rash)</span>
                  <button className="text-red-600 hover:text-red-800">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                  <span className="text-sm text-red-800">Sulfa Drugs (Hives)</span>
                  <button className="text-red-600 hover:text-red-800">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - AI Detection Output */}
          <div className="space-y-6">
            {/* Summary Risk Meter */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={riskLevel === 'high' ? 'text-red-500' : riskLevel === 'moderate' ? 'text-yellow-500' : 'text-green-500'}
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={`${riskLevel === 'high' ? '75' : riskLevel === 'moderate' ? '50' : '25'}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${riskLevel === 'high' ? 'text-red-600' : riskLevel === 'moderate' ? 'text-yellow-600' : 'text-green-600'}`}>
                        {riskLevel === 'high' ? 'High' : riskLevel === 'moderate' ? 'Moderate' : 'Low'}
                      </div>
                      <div className="text-xs text-gray-500">Risk Level</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600">
                Current Risk Level: {riskLevel === 'high' ? 'High' : riskLevel === 'moderate' ? 'Moderate' : 'Low'} — {interactionCount} potential conflicts detected.
              </p>
            </div>

            {/* Interaction Result Table */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detected Interactions</h3>
              <div className="space-y-4">
                {interactions.map((interaction) => (
                  <motion.div
                    key={interaction.id}
                    className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all hover:shadow-md ${getSeverityColor(interaction.severity)}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleInteractionClick(interaction)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{interaction.type}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-white px-2 py-1 rounded-full">
                          {interaction.confidence}% confidence
                        </span>
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <strong>Drugs:</strong> {interaction.drugs.join(' + ')}
                      </p>
                      <p className="text-sm">
                        <strong>Mechanism:</strong> {interaction.mechanism}
                      </p>
                      <p className="text-sm">
                        <strong>Recommendation:</strong> {interaction.recommendation}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interaction Detail Modal */}
        <AnimatePresence>
          {showInteractionModal && selectedInteraction && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInteractionModal(false)}
            >
              <motion.div
                className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Interaction Analysis</h3>
                  <button
                    onClick={() => setShowInteractionModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Drugs Involved</h4>
                    <p className="text-gray-700">{selectedInteraction.drugs.join(' + ')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Pharmacokinetic Explanation</h4>
                    <p className="text-gray-700">{selectedInteraction.mechanism}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Clinical Guidance</h4>
                    <p className="text-gray-700">{selectedInteraction.recommendation}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Evidence Source</h4>
                    <p className="text-gray-700">{selectedInteraction.evidence}</p>
                  </div>
                  
                  <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    <button className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
                      Recommend Alternate Drug
                    </button>
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Add Monitoring Plan
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                      Ignore Alert
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'medications':
        return renderMedications();
      case 'interaction-checker':
        return renderInteractionChecker();
      case 'refill-reminders':
        return renderRefillReminders();
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
            {/* Enhanced Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
                aria-label="Notifications"
              >
                <Bell 
                  className="w-6 h-6 transition-colors duration-200"
                  style={{ color: '#757575' }}
                />
                {unreadNotifications > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: '#E53935' }}
                  >
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </span>
                )}
                <div className="absolute top-0 right-0 w-1 h-1 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </button>
              
              {/* Notification Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    style={{
                      maxHeight: '500px',
                      overflowY: 'auto'
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                      <div className="flex items-center space-x-2">
                        {unreadNotifications > 0 && (
                          <button
                            onClick={handleMarkAllAsRead}
                            className="text-sm text-teal-600 hover:text-teal-700 transition-colors"
                          >
                            Mark all read
                          </button>
                        )}
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Notification List */}
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                          <p>No notifications</p>
                        </div>
                      ) : (
                        notifications.map((notification, index) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
                              !notification.read ? 'bg-teal-50' : ''
                            }`}
                            onClick={() => handleNotificationClick(notification)}
                          >
                            <div className="flex items-start space-x-3">
                              {/* Notification Icon */}
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                notification.urgent 
                                  ? 'bg-red-100' 
                                  : notification.type === 'system_update'
                                  ? 'bg-blue-100'
                                  : 'bg-teal-100'
                              }`}>
                                {notification.type === 'refill_reminder' && (
                                  <Pill className={`w-4 h-4 ${notification.urgent ? 'text-red-600' : 'text-teal-600'}`} />
                                )}
                                {notification.type === 'overdue_alert' && (
                                  <AlertTriangle className="w-4 h-4 text-red-600" />
                                )}
                                {notification.type === 'adherence_warning' && (
                                  <TrendingDown className="w-4 h-4 text-orange-600" />
                                )}
                                {notification.type === 'system_update' && (
                                  <Brain className="w-4 h-4 text-blue-600" />
                                )}
                              </div>
                              
                              {/* Notification Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className={`text-sm font-medium ${
                                    !notification.read ? 'text-gray-900' : 'text-gray-700'
                                  }`}>
                                    {notification.title}
                                  </h4>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0"></div>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                  {notification.message}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs text-gray-500">{notification.time}</span>
                                  <div className="flex items-center space-x-2">
                                    {notification.patientId && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleSendMessage(notification.patientId);
                                        }}
                                        className="text-xs text-teal-600 hover:text-teal-700 transition-colors"
                                      >
                                        <MessageCircle className="w-3 h-3 inline mr-1" />
                                        Message
                                      </button>
                                    )}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSnoozeNotification(notification.id);
                                      }}
                                      className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                      <Clock className="w-3 h-3 inline mr-1" />
                                      Snooze
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                    
                    {/* Footer */}
                    <div className="p-3 border-t border-gray-200 bg-gray-50">
                      <button
                        onClick={() => {
                          setActiveSection('refill-reminders');
                          setShowNotifications(false);
                        }}
                        className="w-full text-sm text-teal-600 hover:text-teal-700 transition-colors font-medium"
                      >
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
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
              { id: 'interaction-checker', label: 'Safety & Interactions', icon: Shield },
              { id: 'refill-reminders', label: 'Refill Reminders', icon: Bell },
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