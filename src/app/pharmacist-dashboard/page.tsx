"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Pill, 
  Users, 
  FileText, 
  AlertTriangle, 
  Search, 
  Plus, 
  BarChart3, 
  Clock, 
  Shield, 
  Heart,
  Activity,
  TrendingUp,
  Calendar,
  Bell,
  Settings,
  LogOut,
  User,
  Stethoscope,
  ClipboardList,
  TestTube,
  Calculator,
  BookOpen,
  Award,
  Target,
  Zap
} from 'lucide-react';

export default function PharmacistDashboard() {
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
                    <p className="text-sm font-medium text-gray-600">Active Prescriptions</p>
                    <p className="text-3xl font-bold text-blue-600">247</p>
                  </div>
                  <Pill className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">+12% from last month</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Patients Served</p>
                    <p className="text-3xl font-bold text-green-600">1,234</p>
                  </div>
                  <Users className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">+8% from last month</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Drug Interactions</p>
                    <p className="text-3xl font-bold text-orange-600">23</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-orange-500" />
                </div>
                <p className="text-xs text-red-600 mt-2">-3 from yesterday</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Inventory Value</p>
                    <p className="text-3xl font-bold text-purple-600">$45.2K</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-purple-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">+5% from last month</p>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                  <Pill className="w-5 h-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">New prescription for John Doe</p>
                    <p className="text-sm text-gray-600">Metformin 500mg - 2 hours ago</p>
                  </div>
                  <span className="text-xs text-gray-500">2h ago</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                  <Users className="w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Patient consultation completed</p>
                    <p className="text-sm text-gray-600">Sarah Wilson - Diabetes management</p>
                  </div>
                  <span className="text-xs text-gray-500">4h ago</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Drug interaction alert</p>
                    <p className="text-sm text-gray-600">Warfarin + Aspirin interaction detected</p>
                  </div>
                  <span className="text-xs text-gray-500">6h ago</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'prescriptions':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Prescription Management</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 inline mr-2" />
                New Prescription
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Prescriptions</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Dr. Smith - Patient: John Doe</p>
                        <p className="text-sm text-gray-600">Lisinopril 10mg, 30 tablets</p>
                        <p className="text-xs text-gray-500">Prescribed: 2 hours ago</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pending</span>
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Dr. Johnson - Patient: Jane Smith</p>
                        <p className="text-sm text-gray-600">Metformin 500mg, 60 tablets</p>
                        <p className="text-xs text-gray-500">Prescribed: 4 hours ago</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pending</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Fills</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Atorvastatin 20mg</p>
                        <p className="text-sm text-gray-600">Patient: Robert Brown</p>
                        <p className="text-xs text-gray-500">Filled: 1 hour ago</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Completed</span>
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Omeprazole 20mg</p>
                        <p className="text-sm text-gray-600">Patient: Lisa Davis</p>
                        <p className="text-xs text-gray-500">Filled: 3 hours ago</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'patients':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Patient Management</h2>
              <div className="flex space-x-3">
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <Search className="w-4 h-4 inline mr-2" />
                  Search Patients
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Patient
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient List</h3>
                <div className="space-y-3">
                  <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">John Doe</p>
                          <p className="text-sm text-gray-600">DOB: 1985-03-15 | ID: #12345</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">3 Active Rx</p>
                        <p className="text-xs text-gray-500">Last visit: 2 days ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Jane Smith</p>
                          <p className="text-sm text-gray-600">DOB: 1990-07-22 | ID: #12346</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">1 Active Rx</p>
                        <p className="text-xs text-gray-500">Last visit: 1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Stethoscope className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-gray-900">Patient Consultation</span>
                    </div>
                  </button>
                  <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <ClipboardList className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-gray-900">Medication Review</span>
                    </div>
                  </button>
                  <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <TestTube className="w-5 h-5 text-purple-500" />
                      <span className="font-medium text-gray-900">Lab Results</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'inventory':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 inline mr-2" />
                Add Medication
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alert</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">Metformin 500mg</p>
                        <p className="text-sm text-gray-600">Current stock: 15 units</p>
                      </div>
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Low Stock</span>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">Lisinopril 10mg</p>
                        <p className="text-sm text-gray-600">Current stock: 25 units</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Warning</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Medications</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Atorvastatin 20mg</p>
                      <p className="text-sm text-gray-600">Stock: 150 units</p>
                    </div>
                    <span className="text-green-600 font-semibold">Good</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Omeprazole 20mg</p>
                      <p className="text-sm text-gray-600">Stock: 120 units</p>
                    </div>
                    <span className="text-green-600 font-semibold">Good</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'interactions':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Drug Interaction Checker</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Search className="w-4 h-4 inline mr-2" />
                Check Interactions
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Severe Interaction</p>
                        <p className="text-sm text-gray-600">Warfarin + Aspirin</p>
                        <p className="text-xs text-gray-500">Increased bleeding risk</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Moderate Interaction</p>
                        <p className="text-sm text-gray-600">Metformin + Alcohol</p>
                        <p className="text-xs text-gray-500">Increased hypoglycemia risk</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Check</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medication 1</label>
                    <input
                      type="text"
                      placeholder="Enter medication name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medication 2</label>
                    <input
                      type="text"
                      placeholder="Enter medication name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Check Interactions
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tools':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Pharmacy Tools</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Calculator className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Dose Calculator</h3>
                <p className="text-gray-600 text-sm">Calculate accurate medication dosages based on patient weight, age, and condition.</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <BookOpen className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Drug Information</h3>
                <p className="text-gray-600 text-sm">Access comprehensive drug information, side effects, and contraindications.</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <FileText className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Prescription Generator</h3>
                <p className="text-gray-600 text-sm">Generate professional prescriptions with proper formatting and dosage instructions.</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Award className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Continuing Education</h3>
                <p className="text-gray-600 text-sm">Access pharmacy continuing education courses and certification programs.</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Target className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Therapeutic Monitoring</h3>
                <p className="text-gray-600 text-sm">Monitor therapeutic drug levels and adjust dosages for optimal patient outcomes.</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Reference</h3>
                <p className="text-gray-600 text-sm">Fast access to common drug interactions, dosing guidelines, and clinical protocols.</p>
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
                Pharmacist Dashboard
              </motion.h1>
              <motion.p
                className="text-xl text-blue-100 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Professional pharmacy management and patient care
              </motion.p>
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span className="text-sm">Real-time Updates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">Patient-Centered</span>
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
                <Pill className="w-16 h-16 text-white" />
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
              { id: 'prescriptions', label: 'Prescriptions', icon: FileText },
              { id: 'patients', label: 'Patients', icon: Users },
              { id: 'inventory', label: 'Inventory', icon: Pill },
              { id: 'interactions', label: 'Interactions', icon: AlertTriangle },
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
