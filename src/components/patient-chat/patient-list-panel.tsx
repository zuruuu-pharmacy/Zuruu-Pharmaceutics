"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MessageCircle, 
  Phone, 
  Video, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Users, 
  User, 
  Calendar, 
  Bell, 
  Star, 
  MoreVertical, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  Archive, 
  Trash2, 
  Edit, 
  Settings,
  Heart,
  Activity,
  Pill,
  Droplets,
  Wind,
  Stethoscope,
  Thermometer,
  Scale,
  Monitor,
  Smartphone,
  Wifi,
  WifiOff,
  Zap,
  Shield,
  Target,
  TrendingUp,
  TrendingDown,
  Info,
  HelpCircle,
  Award,
  Database,
  Cloud,
  Mail,
  Phone as PhoneIcon,
  MessageSquare,
  Video as VideoIcon,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Download,
  Upload,
  Share,
  Copy,
  ExternalLink,
  Lock,
  Unlock,
  Key,
  Eye as EyeIcon,
  EyeOff,
  RefreshCw,
  Play, 
  Pause,
  SkipForward,
  SkipBack,
  Repeat,
  Shuffle,
  Volume1,
  Headphones,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Camera as CameraIcon,
  CameraOff as CameraOffIcon,
  Maximize as MaximizeIcon,
  Minimize as MinimizeIcon,
  RotateCcw as RotateCcwIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Share as ShareIcon,
  Copy as CopyIcon,
  ExternalLink as ExternalLinkIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Key as KeyIcon,
  Eye as EyeIcon2,
  EyeOff as EyeOffIcon,
  RefreshCw as RefreshCwIcon,
  Play as PlayIcon, 
  Pause as PauseIcon,
  SkipForward as SkipForwardIcon,
  SkipBack as SkipBackIcon,
  Repeat as RepeatIcon,
  Shuffle as ShuffleIcon,
  Volume1 as Volume1Icon,
  Headphones as HeadphonesIcon
} from 'lucide-react';

import { 
  Patient, 
  Conversation, 
  Notification 
} from '@/types/patient-chat';

interface PatientListPanelProps {
  patients: Patient[];
  conversations: Conversation[];
  notifications: Notification[];
  onSelectPatient: (patient: Patient) => void;
  onStartChat: (patient: Patient) => void;
  onStartVideoCall: (patient: Patient) => void;
  onStartVoiceCall: (patient: Patient) => void;
  selectedPatient?: Patient;
  onViewPatientProfile: (patient: Patient) => void;
}

export default function PatientListPanel({
  patients,
  conversations,
  notifications,
  onSelectPatient,
  onStartChat,
  onStartVideoCall,
  onStartVoiceCall,
  selectedPatient,
  onViewPatientProfile
}: PatientListPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'active' | 'pending' | 'follow-ups' | 'alerts'>('all');
  const [sortBy, setSortBy] = useState<'urgency' | 'disease' | 'adherence' | 'activity'>('activity');
  const [showFilters, setShowFilters] = useState(false);
  const [filterDisease, setFilterDisease] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Mock data for demonstration
  const [mockPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Ali Raza',
      age: 52,
      gender: 'male',
      photo: '/api/placeholder/60/60',
      phone: '+92-300-1234567',
      email: 'ali.raza@email.com',
      address: 'Karachi, Pakistan',
      emergencyContact: {
        name: 'Fatima Raza',
        phone: '+92-300-7654321',
        relationship: 'Wife'
      },
      insuranceInfo: {
        provider: 'State Life Insurance',
        policyNumber: 'SL-2023-001',
        groupNumber: 'GRP-001'
      },
      medicalHistory: {
        diseases: ['Hypertension', 'Diabetes'],
        allergies: ['Penicillin'],
        currentMedications: ['Amlodipine', 'Metformin'],
        lastCheckup: new Date('2024-01-15')
      },
      preferences: {
        language: 'English',
        communicationMethod: 'all',
        notificationPreferences: {
          email: true,
          sms: true,
          push: true
        }
      },
      status: 'online',
      lastSeen: new Date('2024-01-20T10:30:00'),
      adherenceScore: 85,
      riskLevel: 'moderate'
    },
    {
      id: '2',
      name: 'Ayesha Khan',
      age: 45,
      gender: 'female',
      photo: '/api/placeholder/60/60',
      phone: '+92-300-2345678',
      email: 'ayesha.khan@email.com',
      address: 'Lahore, Pakistan',
      emergencyContact: {
        name: 'Ahmed Khan',
        phone: '+92-300-8765432',
        relationship: 'Husband'
      },
      insuranceInfo: {
        provider: 'State Life Insurance',
        policyNumber: 'SL-2023-002',
        groupNumber: 'GRP-001'
      },
      medicalHistory: {
        diseases: ['Type 2 Diabetes', 'Hypertension'],
        allergies: ['Sulfonamides'],
        currentMedications: ['Metformin', 'Lisinopril'],
        lastCheckup: new Date('2024-01-18')
      },
      preferences: {
        language: 'Urdu',
        communicationMethod: 'video',
        notificationPreferences: {
          email: true,
          sms: false,
          push: true
        }
      },
      status: 'idle',
      lastSeen: new Date('2024-01-20T09:15:00'),
      adherenceScore: 72,
      riskLevel: 'high'
    },
    {
      id: '3',
      name: 'Muhammad Hassan',
      age: 38,
      gender: 'male',
      photo: '/api/placeholder/60/60',
      phone: '+92-300-3456789',
      email: 'm.hassan@email.com',
      address: 'Islamabad, Pakistan',
      emergencyContact: {
        name: 'Sara Hassan',
        phone: '+92-300-9876543',
        relationship: 'Sister'
      },
      insuranceInfo: {
        provider: 'State Life Insurance',
        policyNumber: 'SL-2023-003',
        groupNumber: 'GRP-002'
      },
      medicalHistory: {
        diseases: ['Asthma'],
        allergies: ['Dust', 'Pollen'],
        currentMedications: ['Salbutamol', 'Budesonide'],
        lastCheckup: new Date('2024-01-12')
      },
      preferences: {
        language: 'English',
        communicationMethod: 'chat',
        notificationPreferences: {
          email: false,
          sms: true,
          push: true
        }
      },
      status: 'offline',
      lastSeen: new Date('2024-01-19T16:45:00'),
      adherenceScore: 95,
      riskLevel: 'low'
    }
  ]);

  const [mockConversations] = useState<Conversation[]>([
    {
      id: '1',
      patientId: '1',
      pharmacistId: 'pharm-001',
      title: 'Dizziness after medication',
      status: 'active',
      priority: 'high',
      category: 'side_effects',
      createdAt: new Date('2024-01-20T08:00:00'),
      updatedAt: new Date('2024-01-20T10:30:00'),
      lastMessageAt: new Date('2024-01-20T10:30:00'),
      messageCount: 12,
      unreadCount: 3,
      tags: ['urgent', 'side-effects'],
      aiSummary: 'Patient reporting dizziness after taking Amlodipine. Possible hypotension.',
      followUpRequired: true,
      followUpDate: new Date('2024-01-23T10:00:00'),
      consultationType: 'mixed',
      duration: 15,
      satisfaction: 4
    },
    {
      id: '2',
      patientId: '2',
      pharmacistId: 'pharm-001',
      title: 'Blood sugar monitoring',
      status: 'pending',
      priority: 'normal',
      category: 'medication_question',
      createdAt: new Date('2024-01-20T09:15:00'),
      updatedAt: new Date('2024-01-20T09:15:00'),
      lastMessageAt: new Date('2024-01-20T09:15:00'),
      messageCount: 5,
      unreadCount: 1,
      tags: ['diabetes', 'monitoring'],
      aiSummary: 'Patient asking about blood sugar monitoring frequency.',
      followUpRequired: false,
      consultationType: 'chat',
      duration: 8
    }
  ]);

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm) ||
                         patient.medicalHistory.diseases.some(disease => 
                           disease.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesDisease = filterDisease === 'all' || 
                          patient.medicalHistory.diseases.includes(filterDisease);
    
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    
    const matchesPriority = filterPriority === 'all' || patient.riskLevel === filterPriority;
    
    return matchesSearch && matchesDisease && matchesStatus && matchesPriority;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <div className="w-3 h-3 bg-green-500 rounded-full"></div>;
      case 'idle': return <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>;
      case 'offline': return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>;
      default: return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'idle': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDiseaseIcon = (disease: string) => {
    if (disease.toLowerCase().includes('diabetes')) return <Droplets className="w-4 h-4" />;
    if (disease.toLowerCase().includes('hypertension') || disease.toLowerCase().includes('blood pressure')) return <Heart className="w-4 h-4" />;
    if (disease.toLowerCase().includes('asthma')) return <Wind className="w-4 h-4" />;
    if (disease.toLowerCase().includes('heart') || disease.toLowerCase().includes('cardiac')) return <Heart className="w-4 h-4" />;
    return <Stethoscope className="w-4 h-4" />;
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'high': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'normal': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'low': return <Info className="w-4 h-4 text-blue-500" />;
      default: return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const getConversationForPatient = (patientId: string) => {
    return mockConversations.find(conv => conv.patientId === patientId);
  };

  const getUnreadCount = (patientId: string) => {
    const conversation = getConversationForPatient(patientId);
    return conversation?.unreadCount || 0;
  };

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="w-full h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Patient Communications</h2>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients, diseases, or messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="activity">Last Activity</option>
            <option value="urgency">Urgency</option>
            <option value="disease">Disease Type</option>
            <option value="adherence">Adherence Score</option>
          </select>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Disease</label>
                  <select
                    value={filterDisease}
                    onChange={(e) => setFilterDisease(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="all">All Diseases</option>
                    <option value="Diabetes">Diabetes</option>
                    <option value="Hypertension">Hypertension</option>
                    <option value="Asthma">Asthma</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="online">Online</option>
                    <option value="idle">Idle</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-4">
          {[
            { id: 'all', label: 'All Patients', count: filteredPatients.length },
            { id: 'active', label: 'Active Chats', count: mockConversations.filter(c => c.status === 'active').length },
            { id: 'pending', label: 'Pending', count: mockConversations.filter(c => c.status === 'pending').length },
            { id: 'follow-ups', label: 'Follow-ups', count: mockConversations.filter(c => c.followUpRequired).length },
            { id: 'alerts', label: 'AI Alerts', count: notifications.filter(n => !n.read).length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex items-center space-x-2 py-3 px-2 border-b-2 transition-colors ${
                selectedTab === tab.id
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="font-medium">{tab.label}</span>
              {tab.count > 0 && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  selectedTab === tab.id
                    ? 'bg-teal-100 text-teal-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Patient List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {filteredPatients.map((patient) => {
            const conversation = getConversationForPatient(patient.id);
            const unreadCount = getUnreadCount(patient.id);
            const isSelected = selectedPatient?.id === patient.id;

            return (
              <motion.div
                key={patient.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  isSelected
                    ? 'border-teal-500 bg-teal-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onSelectPatient(patient)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-teal-600" />
                    </div>
                    {getStatusIcon(patient.status)}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      {getStatusIcon(patient.status)}
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{patient.name}</h3>
                      <div className="flex items-center space-x-2">
                        {unreadCount > 0 && (
                          <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                            {unreadCount}
                          </span>
                        )}
                        <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(patient.riskLevel)}`}>
                          {patient.riskLevel.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(patient.status)}`}>
                        {patient.status.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatLastSeen(patient.lastSeen)}
                      </span>
                    </div>

                    {/* Diseases */}
                    <div className="flex items-center space-x-1 mb-2">
                      {patient.medicalHistory.diseases.slice(0, 2).map((disease, index) => (
                        <div key={index} className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {getDiseaseIcon(disease)}
                          <span>{disease}</span>
                        </div>
                      ))}
                      {patient.medicalHistory.diseases.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{patient.medicalHistory.diseases.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* Last Message Preview */}
                    {conversation && (
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">
                          {conversation.aiSummary || 'No recent messages'}
                        </p>
                        <div className="flex items-center space-x-1">
                          {getPriorityIcon(conversation.priority)}
                          <span className="text-xs text-gray-500">
                            {formatLastSeen(conversation.lastMessageAt)}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Adherence Score */}
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Adherence</span>
                        <span className="font-medium">{patient.adherenceScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            patient.adherenceScore >= 80 ? 'bg-green-500' :
                            patient.adherenceScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${patient.adherenceScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartChat(patient);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Start Chat"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartVoiceCall(patient);
                      }}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      title="Voice Call"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartVideoCall(patient);
                      }}
                      className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                      title="Video Call"
                    >
                      <Video className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewPatientProfile(patient);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="View Profile"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          <Plus className="w-5 h-5" />
          <span>New Consultation</span>
        </button>
      </div>
    </div>
  );
}
