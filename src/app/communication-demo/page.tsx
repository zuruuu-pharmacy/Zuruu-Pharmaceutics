"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Video, 
  Phone, 
  Bot, 
  Shield, 
  Zap, 
  Users, 
  Clock, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  Pause, 
  RotateCcw,
  Settings,
  Download,
  Share,
  Eye,
  Heart,
  Brain,
  Activity,
  TrendingUp,
  BarChart3,
  Calendar,
  FileText,
  User,
  Stethoscope,
  Pill,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

import CommunicationDashboard from '@/components/communication/communication-dashboard';
import PatientChatInterface from '@/components/communication/patient-chat-interface';
import VideoConsultation from '@/components/communication/video-consultation';
import ConsultationQueue from '@/components/communication/consultation-queue';
import AIConsultationNotes from '@/components/communication/ai-consultation-notes';
import ConsultationScheduler from '@/components/communication/consultation-scheduler';
import CommunicationAnalytics from '@/components/communication/communication-analytics';

export default function CommunicationDemo() {
  const [activeDemo, setActiveDemo] = useState<'overview' | 'chat' | 'video' | 'queue' | 'notes' | 'scheduler' | 'analytics'>('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      title: 'AI Pre-screening',
      description: 'AI bot gathers patient information and assesses urgency',
      icon: Bot,
      color: 'purple'
    },
    {
      title: 'Queue Management',
      description: 'Intelligent prioritization and routing of consultation requests',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Live Communication',
      description: 'Multi-channel communication with patients (chat, voice, video)',
      icon: MessageSquare,
      color: 'green'
    },
    {
      title: 'AI Assistance',
      description: 'Real-time AI suggestions and clinical decision support',
      icon: Brain,
      color: 'teal'
    },
    {
      title: 'Documentation',
      description: 'AI-generated consultation notes and follow-up scheduling',
      icon: FileText,
      color: 'orange'
    },
    {
      title: 'Analytics',
      description: 'Comprehensive insights and performance metrics',
      icon: BarChart3,
      color: 'red'
    }
  ];

  const features = [
    {
      title: 'Multi-Channel Communication',
      description: 'Seamlessly switch between chat, voice, and video consultations',
      icon: MessageSquare,
      color: 'blue',
      stats: '3 communication modes'
    },
    {
      title: 'AI-Powered Assistance',
      description: 'Intelligent suggestions, pre-screening, and note generation',
      icon: Bot,
      color: 'purple',
      stats: '94% accuracy'
    },
    {
      title: 'Real-Time Collaboration',
      description: 'Live chat, screen sharing, and collaborative note-taking',
      icon: Users,
      color: 'green',
      stats: 'Real-time sync'
    },
    {
      title: 'Secure & Compliant',
      description: 'End-to-end encryption with HIPAA/GDPR compliance',
      icon: Shield,
      color: 'teal',
      stats: '100% secure'
    },
    {
      title: 'Intelligent Scheduling',
      description: 'AI-optimized appointment booking and queue management',
      icon: Calendar,
      color: 'orange',
      stats: '35% efficiency gain'
    },
    {
      title: 'Comprehensive Analytics',
      description: 'Detailed insights into communication patterns and performance',
      icon: BarChart3,
      color: 'red',
      stats: '20+ metrics'
    }
  ];

  const stats = [
    { label: 'Consultations Today', value: '156', change: '+12%', icon: MessageSquare },
    { label: 'AI Assistance Used', value: '89', change: '+25%', icon: Bot },
    { label: 'Patient Satisfaction', value: '4.7/5', change: '+0.2', icon: Star },
    { label: 'Response Time', value: '2.3s', change: '-15%', icon: Clock }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Patient Chat / Tele-Consultation System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive, AI-powered communication platform that enables pharmacists to provide 
            exceptional patient care through multiple channels with intelligent assistance.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isPlaying ? 'Pause Demo' : 'Start Demo'}</span>
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-green-600 mt-2">{stat.change}</p>
              </div>
              <stat.icon className="w-8 h-8 text-teal-500" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Demo Steps */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                currentStep === index
                  ? `border-${step.color}-500 bg-${step.color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 bg-${step.color}-100 rounded-full flex items-center justify-center`}>
                  <step.icon className={`w-6 h-6 text-${step.color}-600`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
              {currentStep === index && (
                <motion.div
                  className="flex items-center space-x-2 text-sm text-teal-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Active Step</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="flex items-center justify-center space-x-4 mt-8">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <div className="flex space-x-2">
            {demoSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentStep === index ? 'bg-teal-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentStep(Math.min(demoSteps.length - 1, currentStep + 1))}
            disabled={currentStep === demoSteps.length - 1}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-12 h-12 bg-${feature.color}-100 rounded-full flex items-center justify-center`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.stats}</p>
              </div>
            </div>
            <p className="text-gray-700">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Transform Patient Communication?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Experience the future of pharmacy care with our AI-powered communication platform. 
          Start your free trial today and see the difference.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
            <Play className="w-5 h-5" />
            <span>Start Free Trial</span>
          </button>
          <button className="px-6 py-3 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>View Live Demo</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderDemoContent = () => {
    switch (activeDemo) {
      case 'overview':
        return renderOverview();
      case 'chat':
        return (
          <div className="max-w-4xl mx-auto">
            <PatientChatInterface
              patient={{
                id: '1',
                name: 'John Doe',
                status: 'online',
                conditions: ['Diabetes', 'Hypertension'],
                currentMedications: ['Metformin 500mg', 'Lisinopril 10mg'],
                allergies: ['Penicillin']
              }}
              onClose={() => setActiveDemo('overview')}
              onVideoCall={() => setActiveDemo('video')}
              onVoiceCall={() => console.log('Voice call started')}
            />
          </div>
        );
      case 'video':
        return (
          <div className="max-w-6xl mx-auto">
            <VideoConsultation
              patient={{
                id: '1',
                name: 'John Doe',
                status: 'online'
              }}
              onClose={() => setActiveDemo('overview')}
              onEndCall={() => setActiveDemo('notes')}
            />
          </div>
        );
      case 'queue':
        return (
          <ConsultationQueue
            onAcceptRequest={(request) => {
              console.log('Accepted request:', request);
              setActiveDemo('chat');
            }}
            onRejectRequest={(requestId) => console.log('Rejected request:', requestId)}
            onAssignRequest={(requestId, pharmacistId) => console.log('Assigned request:', requestId, 'to pharmacist:', pharmacistId)}
          />
        );
      case 'notes':
        return (
          <div className="max-w-6xl mx-auto">
            <AIConsultationNotes
              patientId="1"
              patientName="John Doe"
              onSave={(note) => {
                console.log('Saved notes:', note);
                setActiveDemo('overview');
              }}
              onClose={() => setActiveDemo('overview')}
            />
          </div>
        );
      case 'scheduler':
        return (
          <ConsultationScheduler
            onBookSlot={(slot) => console.log('Booked slot:', slot)}
            onEditSlot={(slot) => console.log('Edited slot:', slot)}
            onDeleteSlot={(slotId) => console.log('Deleted slot:', slotId)}
          />
        );
      case 'analytics':
        return (
          <CommunicationAnalytics
            timeRange="week"
            onTimeRangeChange={(range) => console.log('Time range changed:', range)}
          />
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Communication System Demo</h1>
            </div>
            
            <nav className="flex items-center space-x-4">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'chat', label: 'Chat', icon: MessageSquare },
                { id: 'video', label: 'Video', icon: Video },
                { id: 'queue', label: 'Queue', icon: Users },
                { id: 'notes', label: 'Notes', icon: FileText },
                { id: 'scheduler', label: 'Scheduler', icon: Calendar },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDemo(tab.id as any)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeDemo === tab.id
                      ? 'bg-teal-100 text-teal-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDemo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderDemoContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © 2024 Zuruu Pharmaceutics — Empowering Pharmacists with AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
