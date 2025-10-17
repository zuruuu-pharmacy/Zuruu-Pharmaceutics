"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Video, 
  Phone, 
  Users, 
  Clock, 
  Bell, 
  Search, 
  Filter, 
  Settings, 
  Bot, 
  TrendingUp, 
  Activity, 
  CheckCircle, 
  AlertCircle, 
  Star, 
  BarChart3, 
  Calendar, 
  User, 
  Plus, 
  MoreVertical,
  Shield,
  Zap,
  Heart,
  Pill,
  Stethoscope,
  FileText,
  Download,
  Share,
  Eye,
  Edit,
  Trash2,
  Archive,
  RefreshCw
} from 'lucide-react';

import PatientChatInterface from './patient-chat-interface';
import VideoConsultation from './video-consultation';
import ConsultationQueue from './consultation-queue';
import AIConsultationNotes from './ai-consultation-notes';

interface Patient {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'busy';
  lastSeen?: Date;
  conditions: string[];
  currentMedications: string[];
  allergies: string[];
  lastRefill?: Date;
  lastConsultation?: Date;
  totalConsultations: number;
  satisfactionRating: number;
}

interface ConsultationStats {
  totalToday: number;
  activeNow: number;
  averageDuration: number;
  satisfactionScore: number;
  aiAssistanceUsed: number;
  emergencyAlerts: number;
}

export default function CommunicationDashboard() {
  const [activeTab, setActiveTab] = useState<'queue' | 'chat' | 'video' | 'notes' | 'analytics'>('queue');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [pharmacistStatus, setPharmacistStatus] = useState<'online' | 'busy' | 'offline'>('online');
  const [notifications, setNotifications] = useState([
    { id: '1', type: 'consultation', message: 'New consultation request from John Doe', time: '2m ago', urgent: true },
    { id: '2', type: 'emergency', message: 'Patient reported severe side effects', time: '5m ago', urgent: true },
    { id: '3', type: 'reminder', message: 'Follow-up consultation due in 1 hour', time: '15m ago', urgent: false }
  ]);

  const [stats, setStats] = useState<ConsultationStats>({
    totalToday: 23,
    activeNow: 3,
    averageDuration: 12.5,
    satisfactionScore: 4.7,
    aiAssistanceUsed: 18,
    emergencyAlerts: 2
  });

  const [patients] = useState<Patient[]>([
    {
      id: '1',
      name: 'John Doe',
      status: 'online',
      conditions: ['Diabetes', 'Hypertension'],
      currentMedications: ['Metformin 500mg', 'Lisinopril 10mg'],
      allergies: ['Penicillin'],
      lastConsultation: new Date(Date.now() - 1000 * 60 * 30),
      totalConsultations: 12,
      satisfactionRating: 4.8
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      status: 'offline',
      conditions: ['Diabetes'],
      currentMedications: ['Metformin 500mg'],
      allergies: [],
      lastConsultation: new Date(Date.now() - 1000 * 60 * 60 * 2),
      totalConsultations: 8,
      satisfactionRating: 4.6
    },
    {
      id: '3',
      name: 'Michael Brown',
      status: 'busy',
      conditions: ['Hypertension'],
      currentMedications: ['Atorvastatin 20mg'],
      allergies: [],
      lastConsultation: new Date(Date.now() - 1000 * 60 * 60 * 4),
      totalConsultations: 15,
      satisfactionRating: 4.9
    }
  ]);

  const handleAcceptRequest = (request: any) => {
    const patient = patients.find(p => p.id === request.patientId);
    if (patient) {
      setSelectedPatient(patient);
      if (request.type === 'video') {
        setShowVideo(true);
        setActiveTab('video');
      } else {
        setShowChat(true);
        setActiveTab('chat');
      }
    }
  };

  const handleRejectRequest = (requestId: string) => {
    console.log('Rejected request:', requestId);
  };

  const handleAssignRequest = (requestId: string, pharmacistId: string) => {
    console.log('Assigned request:', requestId, 'to pharmacist:', pharmacistId);
  };

  const handleCloseChat = () => {
    setShowChat(false);
    setSelectedPatient(null);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
    setSelectedPatient(null);
  };

  const handleEndCall = () => {
    setShowVideo(false);
    setShowNotes(true);
    setActiveTab('notes');
  };

  const handleSaveNotes = (note: any) => {
    console.log('Saved notes:', note);
    setShowNotes(false);
    setSelectedPatient(null);
  };

  const handleCloseNotes = () => {
    setShowNotes(false);
    setSelectedPatient(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'busy': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4" />;
      case 'busy': return <Clock className="w-4 h-4" />;
      case 'offline': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Communication Analytics</h2>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Consultations Today', value: stats.totalToday, change: '+12%', color: 'blue', icon: MessageSquare },
          { title: 'Active Now', value: stats.activeNow, change: '+3', color: 'green', icon: Activity },
          { title: 'Avg Duration', value: `${stats.averageDuration} min`, change: '-2 min', color: 'purple', icon: Clock },
          { title: 'Satisfaction Score', value: `${stats.satisfactionScore}/5`, change: '+0.2', color: 'yellow', icon: Star }
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultation Types</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Consultation Types Chart</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Satisfaction Trends</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Satisfaction Trends Chart</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Bot className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">94% Confidence</span>
        </div>
        <div className="space-y-3">
          <p className="text-gray-700">"AI assistance was used in 78% of consultations today, improving response time by 35%."</p>
          <p className="text-gray-700">"Most common consultation topics: medication side effects (45%), dosage questions (30%), refill requests (25%)."</p>
          <p className="text-gray-700">"Patient satisfaction increased by 15% since implementing AI-powered suggestions."</p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'queue':
        return (
          <ConsultationQueue
            onAcceptRequest={handleAcceptRequest}
            onRejectRequest={handleRejectRequest}
            onAssignRequest={handleAssignRequest}
          />
        );
      case 'chat':
        return selectedPatient ? (
          <PatientChatInterface
            patient={selectedPatient}
            onClose={handleCloseChat}
            onVideoCall={() => {
              setShowChat(false);
              setShowVideo(true);
              setActiveTab('video');
            }}
            onVoiceCall={() => {
              // Handle voice call
              console.log('Starting voice call with', selectedPatient.name);
            }}
          />
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Chat</h3>
            <p className="text-gray-600">Select a patient from the queue to start chatting</p>
          </div>
        );
      case 'video':
        return selectedPatient ? (
          <VideoConsultation
            patient={selectedPatient}
            onClose={handleCloseVideo}
            onEndCall={handleEndCall}
          />
        ) : (
          <div className="text-center py-12">
            <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Video Call</h3>
            <p className="text-gray-600">Select a patient from the queue to start a video call</p>
          </div>
        );
      case 'notes':
        return selectedPatient ? (
          <AIConsultationNotes
            patientId={selectedPatient.id}
            patientName={selectedPatient.name}
            onSave={handleSaveNotes}
            onClose={handleCloseNotes}
          />
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Notes to Display</h3>
            <p className="text-gray-600">Complete a consultation to view or create notes</p>
          </div>
        );
      case 'analytics':
        return renderAnalytics();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Communication</h1>
          <p className="text-gray-600">Manage consultations, chat, and video calls with patients</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Pharmacist Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              pharmacistStatus === 'online' ? 'bg-green-500' :
              pharmacistStatus === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
            }`}></div>
            <span className="text-sm font-medium text-gray-700 capitalize">{pharmacistStatus}</span>
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            )}
          </button>
          
          {/* Settings */}
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Consultations', value: stats.activeNow, color: 'green', icon: Activity },
          { label: 'Today\'s Total', value: stats.totalToday, color: 'blue', icon: MessageSquare },
          { label: 'AI Assistance', value: stats.aiAssistanceUsed, color: 'purple', icon: Bot },
          { label: 'Emergency Alerts', value: stats.emergencyAlerts, color: 'red', icon: AlertCircle }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white rounded-xl p-4 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</p>
              </div>
              <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'queue', label: 'Consultation Queue', icon: Users },
              { id: 'chat', label: 'Active Chat', icon: MessageSquare },
              { id: 'video', label: 'Video Calls', icon: Video },
              { id: 'notes', label: 'Consultation Notes', icon: FileText },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showChat && selectedPatient && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-4xl mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <PatientChatInterface
                patient={selectedPatient}
                onClose={handleCloseChat}
                onVideoCall={() => {
                  setShowChat(false);
                  setShowVideo(true);
                }}
                onVoiceCall={() => {
                  console.log('Starting voice call');
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showVideo && selectedPatient && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-6xl mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <VideoConsultation
                patient={selectedPatient}
                onClose={handleCloseVideo}
                onEndCall={handleEndCall}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNotes && selectedPatient && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-6xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <AIConsultationNotes
                patientId={selectedPatient.id}
                patientName={selectedPatient.name}
                onSave={handleSaveNotes}
                onClose={handleCloseNotes}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
