"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  User, 
  Settings, 
  LogOut,
  BarChart3,
  Users,
  FileText,
  AlertTriangle,
  History,
  RefreshCw,
  Package,
  TrendingUp,
  MessageCircle,
  Menu,
  X,
  Mic,
  MicOff,
  ChevronDown,
  ChevronRight,
  Plus,
  Filter,
  Download,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  Heart,
  Activity,
  Shield,
  Zap,
  Calendar,
  PieChart,
  LineChart,
  Thermometer,
  Droplets,
  Scale,
  Pill,
  Stethoscope,
  ClipboardList,
  TestTube,
  Calculator,
  BookOpen,
  Award,
  Target,
  Brain,
  Phone,
  Video,
  Send,
  Paperclip,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Wifi,
  WifiOff,
  Database,
  Cloud,
  Lock,
  Unlock,
  HelpCircle,
  Info,
  Check,
  X as XIcon,
  ArrowRight,
  ArrowLeft,
  Home,
  Star,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  TrendingDown,
  Minus,
  Maximize,
  Minimize,
  RotateCcw,
  Bookmark,
  BookmarkCheck,
  ThumbsUp as ThumbsUpIcon,
  ThumbsDown as ThumbsDownIcon,
  Smile as SmileIcon,
  Frown as FrownIcon,
  Meh as MehIcon,
  TrendingDown as TrendingDownIcon,
  Minus as MinusIcon,
  Maximize as MaximizeIcon,
  Minimize as MinimizeIcon,
  RotateCcw as RotateCcwIcon,
  Bookmark as BookmarkIcon,
  BookmarkCheck as BookmarkCheckIcon
} from 'lucide-react';

export default function PharmacistDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'refill', message: '5 refills pending', time: '2m ago', urgent: true },
    { id: 2, type: 'side-effect', message: '2 patients reported mild side effects', time: '15m ago', urgent: false },
    { id: 3, type: 'low-stock', message: 'Amoxicillin stock low', time: '1h ago', urgent: true }
  ]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Simulate voice input
    setTimeout(() => setIsListening(false), 3000);
  };

  const navigationItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: BarChart3 },
    { id: 'patients', label: 'Patient & Health Management', icon: Users },
    { id: 'prescriptions', label: 'Prescription Management', icon: FileText },
    { id: 'interactions', label: 'AI Drug Interaction Checker', icon: AlertTriangle },
    { id: 'chronic-disease', label: 'Chronic Disease Tracker', icon: Stethoscope },
    { id: 'history', label: 'Medication History Tracker', icon: History },
    { id: 'refills', label: 'Refill & Adherence Monitor', icon: RefreshCw },
    { id: 'inventory', label: 'Inventory & Stock Management', icon: Package },
    { id: 'analytics', label: 'Analytics & Reports', icon: TrendingUp },
    { id: 'communication', label: 'Pharmacist–Patient Communication', icon: MessageCircle },
    { id: 'settings', label: 'Settings & Preferences', icon: Settings }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* AI Suggestion */}
      <motion.div
        className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-xl p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-3">
          <Brain className="w-6 h-6 text-teal-600" />
          <div>
            <p className="font-semibold text-gray-900">AI Suggestion</p>
            <p className="text-sm text-gray-700">Today, 5 refills are pending and 2 patients reported mild side effects.</p>
          </div>
        </div>
      </motion.div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Patients', value: '1,247', growth: '+8%', color: 'blue', icon: Users },
          { title: 'Prescriptions Today', value: '89', growth: '+12%', color: 'purple', icon: FileText },
          { title: 'Refill Alerts', value: '23', growth: '-3%', color: 'orange', icon: RefreshCw },
          { title: 'Inventory Status', value: 'Good', growth: '5 Low', color: 'green', icon: Package }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className={`text-3xl font-bold text-${metric.color}-600`}>{metric.value}</p>
                <p className="text-xs text-green-600 mt-2">{metric.growth}</p>
              </div>
              <metric.icon className={`w-8 h-8 text-${metric.color}-500`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Data Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Activity Overview */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Patient Activity Overview</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs bg-teal-100 text-teal-700 rounded-full">Week</button>
              <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">Month</button>
            </div>
          </div>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Patient Activity Chart</p>
            </div>
          </div>
        </motion.div>

        {/* Prescription Trends */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Prescription Trends</h3>
            <Filter className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Drug Categories Chart</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Insights Widget */}
      <motion.div
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-6 h-6 text-teal-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
          <span className="px-2 py-1 text-xs bg-teal-100 text-teal-700 rounded-full">92% Confidence</span>
        </div>
        <p className="text-gray-700 mb-4">Top 3 drugs with side effect reports this week:</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <span className="font-medium">Metformin</span>
            <span className="text-sm text-red-600">3 reports</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <span className="font-medium">Atorvastatin</span>
            <span className="text-sm text-yellow-600">2 reports</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
            <span className="font-medium">Lisinopril</span>
            <span className="text-sm text-orange-600">1 report</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Refills */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Refills</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">John Doe</p>
                <p className="text-sm text-gray-600">Metformin 500mg</p>
                <p className="text-xs text-gray-500">Due: Oct 20</p>
              </div>
              <button className="px-3 py-1 text-xs bg-teal-100 text-teal-700 rounded-full hover:bg-teal-200 transition-colors">
                Send Reminder
              </button>
            </div>
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Ayesha</p>
                <p className="text-sm text-gray-600">Atorvastatin 20mg</p>
                <p className="text-xs text-gray-500">Due: Oct 22</p>
              </div>
              <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
                Refill Now
              </button>
            </div>
          </div>
        </motion.div>

        {/* Low Stock Medicines */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Medicines</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Amoxicillin</p>
                <p className="text-sm text-gray-600">18 units remaining</p>
              </div>
              <span className="text-red-600 font-semibold">🔴 Critical</span>
            </div>
            <div className="flex items-center justify-between p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Ibuprofen</p>
                <p className="text-sm text-gray-600">35 units remaining</p>
              </div>
              <span className="text-yellow-600 font-semibold">🟠 Low</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Left Panel - Patient List */}
      <div className="lg:col-span-1 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Patient List</h3>
            <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
          {[
            { name: 'John Doe', age: 45, status: 'Stable', lastVisit: '2 days ago' },
            { name: 'Sarah Wilson', age: 32, status: 'Under Observation', lastVisit: '1 week ago' },
            { name: 'Michael Brown', age: 58, status: 'Stable', lastVisit: '3 days ago' },
            { name: 'Emily Davis', age: 28, status: 'Stable', lastVisit: '5 days ago' }
          ].map((patient, index) => (
            <motion.div
              key={patient.name}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-teal-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{patient.name}</p>
                  <p className="text-sm text-gray-600">Age: {patient.age}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      patient.status === 'Stable' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {patient.status}
                    </span>
                    <span className="text-xs text-gray-500">{patient.lastVisit}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Panel - Patient Details */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">John Doe</h3>
              <p className="text-gray-600">Age: 45 | Male | ID: #12345</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Stable</span>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">3 Active Rx</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <button className="p-3 text-center border border-teal-200 bg-teal-50 rounded-lg">
              <User className="w-6 h-6 text-teal-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-teal-700">Profile</span>
            </button>
            <button className="p-3 text-center border border-gray-200 rounded-lg hover:bg-gray-50">
              <History className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Medication</span>
            </button>
            <button className="p-3 text-center border border-gray-200 rounded-lg hover:bg-gray-50">
              <AlertTriangle className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Adverse Events</span>
            </button>
            <button className="p-3 text-center border border-gray-200 rounded-lg hover:bg-gray-50">
              <Activity className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Vitals</span>
            </button>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Current Medications</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <p className="font-medium">Metformin 500mg</p>
                    <p className="text-sm text-gray-600">Twice daily with meals</p>
                  </div>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Active</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <p className="font-medium">Atorvastatin 20mg</p>
                    <p className="text-sm text-gray-600">Once daily at bedtime</p>
                  </div>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Active</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-teal-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-5 h-5 text-teal-600" />
                <h4 className="font-semibold text-gray-900">AI Summary</h4>
              </div>
              <p className="text-sm text-gray-700">Adherence Score: 92% | Risk Level: Low | Next refill due in 5 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrescriptions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Prescription Management</h2>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add New Prescription</span>
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search prescriptions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { 
                patient: 'John Doe', 
                doctor: 'Dr. Smith', 
                medication: 'Metformin 500mg', 
                dosage: 'Twice daily', 
                status: 'Active',
                date: '2024-01-15'
              },
              { 
                patient: 'Sarah Wilson', 
                doctor: 'Dr. Johnson', 
                medication: 'Lisinopril 10mg', 
                dosage: 'Once daily', 
                status: 'Refill Due',
                date: '2024-01-10'
              }
            ].map((prescription, index) => (
              <motion.div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Pill className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{prescription.medication}</p>
                      <p className="text-sm text-gray-600">{prescription.patient} • {prescription.doctor}</p>
                      <p className="text-xs text-gray-500">{prescription.dosage} • {prescription.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      prescription.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {prescription.status}
                    </span>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-teal-600">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDrugInteractionChecker = () => {
    const [drugs, setDrugs] = useState(['']);
    const [interactions, setInteractions] = useState<Array<{
      drugs: string[];
      severity: string;
      description: string;
      recommendation: string;
    }>>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const addDrugInput = () => {
      if (drugs.length < 10) {
        setDrugs([...drugs, '']);
      }
    };

    const updateDrug = (index: number, value: string) => {
      const newDrugs = [...drugs];
      newDrugs[index] = value;
      setDrugs(newDrugs);
    };

    const removeDrug = (index: number) => {
      if (drugs.length > 1) {
        const newDrugs = drugs.filter((_, i) => i !== index);
        setDrugs(newDrugs);
      }
    };

    const checkInteractions = () => {
      setIsAnalyzing(true);
      // Simulate AI analysis
      setTimeout(() => {
        setInteractions([
          {
            drugs: ['Warfarin', 'Aspirin'],
            severity: 'Severe',
            description: 'Increased bleeding risk due to additive anticoagulant effects',
            recommendation: 'Monitor INR closely and consider alternative pain management'
          },
          {
            drugs: ['Metformin', 'Alcohol'],
            severity: 'Moderate',
            description: 'Increased risk of lactic acidosis and hypoglycemia',
            recommendation: 'Advise patient to limit alcohol consumption and monitor blood glucose'
          }
        ]);
        setIsAnalyzing(false);
      }, 2000);
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">AI Drug Interaction Checker</h2>
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-teal-600" />
            <span className="text-sm text-gray-600">Powered by AI</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Medications</h3>
            <div className="space-y-3">
              {drugs.map((drug, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={drug}
                    onChange={(e) => updateDrug(index, e.target.value)}
                    placeholder={`Medication ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  {drugs.length > 1 && (
                    <button
                      onClick={() => removeDrug(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <XIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {drugs.length < 10 && (
                <button
                  onClick={addDrugInput}
                  className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-teal-500 hover:text-teal-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Medication</span>
                </button>
              )}
            </div>
            <button
              onClick={checkInteractions}
              disabled={isAnalyzing || drugs.every(d => !d.trim())}
              className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Check Interactions</span>
                </>
              )}
            </button>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Interaction Results</h3>
            {interactions.length === 0 ? (
              <div className="text-center py-8">
                <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Enter medications to check for interactions</p>
              </div>
            ) : (
              <div className="space-y-4">
                {interactions.map((interaction, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      interaction.severity === 'Severe' 
                        ? 'bg-red-50 border-red-200' 
                        : interaction.severity === 'Moderate'
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-green-50 border-green-200'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                        interaction.severity === 'Severe' 
                          ? 'text-red-500' 
                          : interaction.severity === 'Moderate'
                          ? 'text-yellow-500'
                          : 'text-green-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {interaction.drugs.join(' + ')}
                          </h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            interaction.severity === 'Severe' 
                              ? 'bg-red-100 text-red-700' 
                              : interaction.severity === 'Moderate'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {interaction.severity}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{interaction.description}</p>
                        <div className="p-3 bg-white rounded-lg border">
                          <p className="text-sm font-medium text-gray-900 mb-1">Recommendation:</p>
                          <p className="text-sm text-gray-700">{interaction.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AI Voice Assistant */}
        <motion.div
          className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-3">
            <Volume2 className="w-6 h-6 text-teal-600" />
            <div>
              <p className="font-semibold text-gray-900">AI Voice Assistant</p>
              <p className="text-sm text-gray-700">
                "Interaction found between warfarin and aspirin — risk of bleeding increased."
              </p>
            </div>
            <button className="ml-auto p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  };


  const renderRefillMonitor = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filterStatus, setFilterStatus] = useState('all');
    const [refillData] = useState([
      { patient: 'John Doe', medication: 'Metformin 500mg', dueDate: '2024-01-20', status: 'upcoming', adherence: 92 },
      { patient: 'Sarah Wilson', medication: 'Lisinopril 10mg', dueDate: '2024-01-22', status: 'upcoming', adherence: 88 },
      { patient: 'Michael Brown', medication: 'Atorvastatin 20mg', dueDate: '2024-01-18', status: 'missed', adherence: 65 },
      { patient: 'Emily Davis', medication: 'Omeprazole 20mg', dueDate: '2024-01-15', status: 'completed', adherence: 95 }
    ]);

    const filteredRefills = refillData.filter(refill => {
      if (filterStatus === 'all') return true;
      return refill.status === filterStatus;
    });

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'completed': return 'text-green-600 bg-green-100';
        case 'upcoming': return 'text-blue-600 bg-blue-100';
        case 'missed': return 'text-red-600 bg-red-100';
        default: return 'text-gray-600 bg-gray-100';
      }
    };

    const getAdherenceColor = (adherence: number) => {
      if (adherence >= 90) return 'text-green-600';
      if (adherence >= 75) return 'text-yellow-600';
      return 'text-red-600';
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Refill & Adherence Monitor</h2>
          <div className="flex items-center space-x-3">
            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Refill Reminder</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Refill Calendar</h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 font-medium text-gray-900">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
              <motion.div
                key={day}
                className={`p-2 text-center text-sm rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${
                  day === selectedDate.getDate() ? 'bg-teal-100 text-teal-600 font-semibold' : 'text-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {day}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filter and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Status</h3>
              <div className="space-y-2">
                {[
                  { value: 'all', label: 'All Refills', count: refillData.length },
                  { value: 'upcoming', label: 'Upcoming', count: refillData.filter(r => r.status === 'upcoming').length },
                  { value: 'missed', label: 'Missed', count: refillData.filter(r => r.status === 'missed').length },
                  { value: 'completed', label: 'Completed', count: refillData.filter(r => r.status === 'completed').length }
                ].map(filter => (
                  <button
                    key={filter.value}
                    onClick={() => setFilterStatus(filter.value)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      filterStatus === filter.value
                        ? 'bg-teal-50 text-teal-600 border border-teal-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{filter.label}</span>
                      <span className="text-sm text-gray-500">{filter.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Refill List</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {filteredRefills.map((refill, index) => (
                    <motion.div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                            <Pill className="w-6 h-6 text-teal-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{refill.medication}</p>
                            <p className="text-sm text-gray-600">{refill.patient}</p>
                            <p className="text-xs text-gray-500">Due: {refill.dueDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">Adherence</p>
                            <p className={`text-lg font-semibold ${getAdherenceColor(refill.adherence)}`}>
                              {refill.adherence}%
                            </p>
                          </div>
                          <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(refill.status)}`}>
                            {refill.status}
                          </span>
                          <div className="flex space-x-2">
                            {refill.status === 'upcoming' && (
                              <button className="px-3 py-1 text-xs bg-teal-100 text-teal-700 rounded-full hover:bg-teal-200 transition-colors">
                                Send Reminder
                              </button>
                            )}
                            {refill.status === 'missed' && (
                              <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors">
                                Contact Patient
                              </button>
                            )}
                            <button className="p-2 text-gray-400 hover:text-blue-600">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Adherence Trends Chart */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Adherence Trends</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Adherence Trends Chart</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAnalytics = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const [chartData] = useState({
      drugCategories: [
        { name: 'Antibiotics', value: 35, color: '#3B82F6' },
        { name: 'Analgesics', value: 25, color: '#10B981' },
        { name: 'Antidiabetics', value: 20, color: '#F59E0B' },
        { name: 'Cardiovascular', value: 15, color: '#EF4444' },
        { name: 'Others', value: 5, color: '#8B5CF6' }
      ],
      prescriptionVolume: [
        { month: 'Jan', prescriptions: 120 },
        { month: 'Feb', prescriptions: 135 },
        { month: 'Mar', prescriptions: 110 },
        { month: 'Apr', prescriptions: 145 },
        { month: 'May', prescriptions: 160 },
        { month: 'Jun', prescriptions: 175 }
      ],
      peakHours: [
        { hour: '8-9 AM', prescriptions: 45 },
        { hour: '9-10 AM', prescriptions: 65 },
        { hour: '10-11 AM', prescriptions: 55 },
        { hour: '11-12 PM', prescriptions: 40 },
        { hour: '1-2 PM', prescriptions: 35 },
        { hour: '2-3 PM', prescriptions: 50 },
        { hour: '3-4 PM', prescriptions: 60 },
        { hour: '4-5 PM', prescriptions: 70 }
      ]
    });

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Total Prescriptions', value: '1,247', change: '+12%', color: 'blue', icon: FileText },
            { title: 'Patient Satisfaction', value: '4.8/5', change: '+0.2', color: 'green', icon: Star },
            { title: 'Average Fill Time', value: '8.5 min', change: '-1.2 min', color: 'purple', icon: Clock },
            { title: 'Revenue', value: '$45.2K', change: '+8%', color: 'teal', icon: TrendingUp }
          ].map((metric, index) => (
            <motion.div
              key={metric.title}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-xs text-green-600 mt-2">{metric.change}</p>
                </div>
                <metric.icon className={`w-8 h-8 text-${metric.color}-500`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Drug Categories Pie Chart */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Drug Categories Dispensed</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Drug Categories Chart</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {chartData.drugCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{category.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Prescription Volume Line Chart */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Prescription Volume Over Time</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Prescription Volume Chart</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Peak Hours Heatmap */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Peak Prescription Hours</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {chartData.peakHours.map((hour, index) => (
              <div key={index} className="text-center">
                <div
                  className="h-16 rounded-lg flex items-center justify-center text-white text-sm font-medium"
                  style={{
                    backgroundColor: `rgba(20, 184, 166, ${hour.prescriptions / 70})`
                  }}
                >
                  {hour.prescriptions}
                </div>
                <p className="text-xs text-gray-600 mt-1">{hour.hour}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Insight Summary */}
        <motion.div
          className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-6 h-6 text-teal-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI Insight Summary</h3>
            <span className="px-2 py-1 text-xs bg-teal-100 text-teal-700 rounded-full">94% Confidence</span>
          </div>
          <div className="space-y-3">
            <p className="text-gray-700">"90% of diabetic patients adhered to medication this month, showing a 5% improvement from last month."</p>
            <p className="text-gray-700">"Peak prescription hours are 4-5 PM, suggesting optimal staffing during this period."</p>
            <p className="text-gray-700">"Antibiotic prescriptions increased by 15% this month, indicating seasonal flu patterns."</p>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderCommunication = () => {
    // Import the PatientChatManagement component
    const PatientChatManagement = React.lazy(() => import('@/components/patient-chat/patient-chat-management'));
    
    return (
      <React.Suspense fallback={
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Patient Chat & Tele-Consultation System...</p>
        </div>
      }>
        <PatientChatManagement onNavigateToDashboard={() => setActiveTab('overview')} />
      </React.Suspense>
    );
  };

  const renderInventory = () => {
    // Import the InventoryManagement component
    const InventoryManagement = React.lazy(() => import('@/components/inventory/inventory-management'));
    
    return (
      <React.Suspense fallback={
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Inventory Management...</p>
        </div>
      }>
        <InventoryManagement onNavigateToDashboard={() => setActiveTab('overview')} />
      </React.Suspense>
    );
  };

  const renderInteractions = () => {
    // Import the DrugInteractionManagement component
    const DrugInteractionManagement = React.lazy(() => import('@/components/drug-interaction-checker/drug-interaction-management'));
    
    return (
      <React.Suspense fallback={
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading AI Drug Interaction Checker...</p>
        </div>
      }>
        <DrugInteractionManagement onNavigateToDashboard={() => setActiveTab('overview')} />
      </React.Suspense>
    );
  };

  const renderChronicDisease = () => {
    // Import the ChronicDiseaseManagement component
    const ChronicDiseaseManagement = React.lazy(() => import('@/components/chronic-disease/chronic-disease-management'));
    
    return (
      <React.Suspense fallback={
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading Chronic Disease Tracker...</p>
        </div>
      }>
        <ChronicDiseaseManagement onNavigateToDashboard={() => setActiveTab('overview')} />
      </React.Suspense>
    );
  };

  const renderSettings = () => {
    const [activeSettingsTab, setActiveSettingsTab] = useState('profile');
    const [settings, setSettings] = useState({
      notifications: {
        email: true,
        sms: false,
        push: true,
        refillReminders: true,
        lowStockAlerts: true,
        interactionAlerts: true
      },
      ai: {
        voiceAssistant: true,
        autoSuggestions: true,
        interactionChecking: true,
        predictiveAnalytics: true
      },
      display: {
        theme: 'light',
        fontSize: 'medium',
        highContrast: false,
        reducedMotion: false
      }
    });

    const updateSetting = (category: string, key: string, value: any) => {
      setSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category as keyof typeof prev],
          [key]: value
        }
      }));
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Settings & Preferences</h2>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
              <div className="space-y-2">
                {[
                  { id: 'profile', label: 'Profile & Account', icon: User },
                  { id: 'notifications', label: 'Notifications', icon: Bell },
                  { id: 'ai', label: 'AI Preferences', icon: Brain },
                  { id: 'display', label: 'Display & Theme', icon: Settings },
                  { id: 'security', label: 'Security', icon: Shield },
                  { id: 'backup', label: 'Backup & Export', icon: Cloud }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSettingsTab(tab.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                      activeSettingsTab === tab.id
                        ? 'bg-teal-50 text-teal-600 border border-teal-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              {activeSettingsTab === 'profile' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Profile & Account</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue="Dr. Sarah Smith"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="sarah.smith@zuruu.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                      <input
                        type="text"
                        defaultValue="PH123456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSettingsTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
                  <div className="space-y-4">
                    {Object.entries(settings.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <p className="text-sm text-gray-600">
                            {key === 'email' && 'Receive notifications via email'}
                            {key === 'sms' && 'Receive notifications via SMS'}
                            {key === 'push' && 'Receive push notifications'}
                            {key === 'refillReminders' && 'Get notified about upcoming refills'}
                            {key === 'lowStockAlerts' && 'Get notified about low stock levels'}
                            {key === 'interactionAlerts' && 'Get notified about drug interactions'}
                          </p>
                        </div>
                        <button
                          onClick={() => updateSetting('notifications', key, !value)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-teal-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSettingsTab === 'ai' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">AI Preferences</h3>
                  <div className="space-y-4">
                    {Object.entries(settings.ai).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <p className="text-sm text-gray-600">
                            {key === 'voiceAssistant' && 'Enable AI voice assistant for interactions'}
                            {key === 'autoSuggestions' && 'Show AI-powered suggestions and recommendations'}
                            {key === 'interactionChecking' && 'Automatically check for drug interactions'}
                            {key === 'predictiveAnalytics' && 'Use AI for predictive analytics and forecasting'}
                          </p>
                        </div>
                        <button
                          onClick={() => updateSetting('ai', key, !value)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-teal-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSettingsTab === 'display' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Display & Theme</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <p className="font-medium text-gray-900 mb-2">Theme</p>
                      <div className="flex space-x-3">
                        <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                          <Sun className="w-5 h-5 text-yellow-500" />
                          <p className="text-sm mt-1">Light</p>
                        </button>
                        <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                          <Moon className="w-5 h-5 text-blue-500" />
                          <p className="text-sm mt-1">Dark</p>
                        </button>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <p className="font-medium text-gray-900 mb-2">Font Size</p>
                      <div className="flex space-x-3">
                        {['Small', 'Medium', 'Large'].map(size => (
                          <button
                            key={size}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      {Object.entries(settings.display).slice(2).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            <p className="text-sm text-gray-600">
                              {key === 'highContrast' && 'Increase contrast for better visibility'}
                              {key === 'reducedMotion' && 'Reduce animations and transitions'}
                            </p>
                          </div>
                          <button
                            onClick={() => updateSetting('display', key, !value)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              value ? 'bg-teal-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'patients':
        return renderPatients();
      case 'prescriptions':
        return renderPrescriptions();
      case 'interactions':
        return renderInteractions();
      case 'chronic-disease':
        return renderChronicDisease();
      case 'inventory':
        return renderInventory();
      case 'refills':
        return renderRefillMonitor();
      case 'analytics':
        return renderAnalytics();
      case 'communication':
        return renderCommunication();
      case 'settings':
        return renderSettings();
      default:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading {activeTab}...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <motion.header
        className="bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold">Zuruu Pharmaceutics</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patient, drug, or report..."
                  className="w-full pl-10 pr-12 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/30 focus:border-transparent"
                />
                <button
                  onClick={toggleVoiceInput}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors"
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4 text-red-300" />
                  ) : (
                    <Mic className="w-4 h-4 text-white/70" />
                  )}
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <MessageSquare className="w-5 h-5" />
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <User className="w-5 h-5" />
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Left Sidebar */}
        <motion.aside
          className={`bg-white shadow-lg transition-all duration-300 ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-teal-50 text-teal-600 border-l-4 border-teal-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Welcome Header */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome back, Dr. Smith 👋
                </h2>
                <p className="text-gray-600">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Current Time</p>
                <p className="text-lg font-semibold text-gray-900">
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              © 2025 Zuruu Pharmaceutics — Empowering Pharmacists with AI
            </p>
            <p className="text-sm text-gray-500">v2.1.5</p>
          </div>
        </div>
      </footer>
    </div>
  );
}