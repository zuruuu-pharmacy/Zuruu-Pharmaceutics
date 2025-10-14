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
  Calendar as CalendarIcon,
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
  MoreHorizontal
} from 'lucide-react';

export default function PatientDashboard() {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState<string>('overview');
  const [isLoading, setIsLoading] = useState(false);

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
    </div>
  );
}

