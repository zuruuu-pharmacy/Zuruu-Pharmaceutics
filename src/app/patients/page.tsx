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
  Search
} from 'lucide-react';

export default function PatientDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('overview');

  const handleBackToHome = () => {
    router.push('/');
  };

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
        { name: 'Patient Profiles', description: 'Store full medical histories, allergies, and prescriptions', icon: Users },
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

  const renderSection = (section: any) => (
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
    </div>
  );
}