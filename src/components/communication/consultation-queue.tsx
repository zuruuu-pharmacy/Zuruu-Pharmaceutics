"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Video, 
  Phone, 
  Clock, 
  User, 
  AlertCircle, 
  CheckCircle, 
  X, 
  Bot, 
  Star, 
  Filter, 
  Search, 
  MoreVertical,
  Calendar,
  MapPin,
  Stethoscope,
  Pill,
  Heart,
  Activity,
  Shield,
  Zap,
  TrendingUp,
  Users,
  FileText,
  Bell
} from 'lucide-react';

interface ConsultationRequest {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar?: string;
  type: 'chat' | 'video' | 'voice';
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  reason: string;
  conditions: string[];
  currentMedications: string[];
  allergies: string[];
  requestedAt: Date;
  estimatedDuration: number; // in minutes
  aiPreScreening?: {
    summary: string;
    suggestedActions: string[];
    riskLevel: 'low' | 'medium' | 'high';
    keywords: string[];
  };
  priority: number;
  location?: string;
  preferredLanguage?: string;
}

interface ConsultationQueueProps {
  onAcceptRequest: (request: ConsultationRequest) => void;
  onRejectRequest: (requestId: string) => void;
  onAssignRequest: (requestId: string, pharmacistId: string) => void;
}

export default function ConsultationQueue({ 
  onAcceptRequest, 
  onRejectRequest, 
  onAssignRequest 
}: ConsultationQueueProps) {
  const [requests, setRequests] = useState<ConsultationRequest[]>([
    {
      id: '1',
      patientId: 'p1',
      patientName: 'John Doe',
      type: 'video',
      urgency: 'high',
      status: 'pending',
      reason: 'Experiencing severe side effects from new medication',
      conditions: ['Diabetes', 'Hypertension'],
      currentMedications: ['Metformin 500mg', 'Lisinopril 10mg'],
      allergies: ['Penicillin'],
      requestedAt: new Date(Date.now() - 1000 * 60 * 5),
      estimatedDuration: 15,
      aiPreScreening: {
        summary: 'Patient reports severe nausea and dizziness after starting new medication. Possible drug interaction or adverse reaction.',
        suggestedActions: ['Check drug interactions', 'Verify dosage', 'Consider alternative medication'],
        riskLevel: 'high',
        keywords: ['severe', 'nausea', 'dizziness', 'side effects']
      },
      priority: 9,
      location: 'New York, NY',
      preferredLanguage: 'English'
    },
    {
      id: '2',
      patientId: 'p2',
      patientName: 'Sarah Wilson',
      type: 'chat',
      urgency: 'medium',
      status: 'pending',
      reason: 'Need help with medication timing and food interactions',
      conditions: ['Diabetes'],
      currentMedications: ['Metformin 500mg'],
      allergies: [],
      requestedAt: new Date(Date.now() - 1000 * 60 * 10),
      estimatedDuration: 10,
      aiPreScreening: {
        summary: 'Patient asking about proper timing of Metformin with meals and potential food interactions.',
        suggestedActions: ['Explain meal timing', 'Discuss food interactions', 'Provide dietary guidance'],
        riskLevel: 'low',
        keywords: ['timing', 'food', 'meals', 'interactions']
      },
      priority: 6,
      location: 'Los Angeles, CA',
      preferredLanguage: 'English'
    },
    {
      id: '3',
      patientId: 'p3',
      patientName: 'Michael Brown',
      type: 'voice',
      urgency: 'low',
      status: 'pending',
      reason: 'General question about prescription refill process',
      conditions: ['Hypertension'],
      currentMedications: ['Atorvastatin 20mg'],
      allergies: [],
      requestedAt: new Date(Date.now() - 1000 * 60 * 15),
      estimatedDuration: 5,
      aiPreScreening: {
        summary: 'Patient needs assistance with prescription refill process and insurance coverage.',
        suggestedActions: ['Explain refill process', 'Check insurance coverage', 'Schedule pickup'],
        riskLevel: 'low',
        keywords: ['refill', 'prescription', 'insurance', 'pickup']
      },
      priority: 3,
      location: 'Chicago, IL',
      preferredLanguage: 'English'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'priority' | 'time' | 'urgency'>('priority');
  const [showAIPreScreening, setShowAIPreScreening] = useState<string | null>(null);

  const filteredRequests = requests
    .filter(request => {
      const matchesFilter = filter === 'all' || request.status === filter;
      const matchesSearch = request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.reason.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          return b.priority - a.priority;
        case 'time':
          return b.requestedAt.getTime() - a.requestedAt.getTime();
        case 'urgency':
          const urgencyOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
        default:
          return 0;
      }
    });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return <AlertCircle className="w-4 h-4" />;
      case 'high': return <Activity className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'voice': return <Phone className="w-5 h-5" />;
      case 'chat': return <MessageSquare className="w-5 h-5" />;
      default: return <MessageSquare className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-blue-600 bg-blue-100';
      case 'voice': return 'text-green-600 bg-green-100';
      case 'chat': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleAcceptRequest = (request: ConsultationRequest) => {
    setRequests(prev => 
      prev.map(r => 
        r.id === request.id 
          ? { ...r, status: 'accepted' as const }
          : r
      )
    );
    onAcceptRequest(request);
  };

  const handleRejectRequest = (requestId: string) => {
    setRequests(prev => 
      prev.map(r => 
        r.id === requestId 
          ? { ...r, status: 'cancelled' as const }
          : r
      )
    );
    onRejectRequest(requestId);
  };

  const handleAIPreScreening = (requestId: string) => {
    setShowAIPreScreening(showAIPreScreening === requestId ? null : requestId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Consultation Queue</h2>
          <p className="text-gray-600">Manage incoming consultation requests</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-teal-600" />
            <span className="text-sm font-medium text-gray-700">
              {requests.filter(r => r.status === 'pending').length} pending
            </span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients or reasons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="priority">Sort by Priority</option>
              <option value="time">Sort by Time</option>
              <option value="urgency">Sort by Urgency</option>
            </select>
          </div>
        </div>
      </div>

      {/* Queue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Requests', value: requests.length, color: 'blue', icon: MessageSquare },
          { label: 'Pending', value: requests.filter(r => r.status === 'pending').length, color: 'orange', icon: Clock },
          { label: 'In Progress', value: requests.filter(r => r.status === 'in-progress').length, color: 'purple', icon: Activity },
          { label: 'Completed Today', value: requests.filter(r => r.status === 'completed').length, color: 'green', icon: CheckCircle }
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
              <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Request List */}
      <div className="space-y-4">
        {filteredRequests.map((request, index) => (
          <motion.div
            key={request.id}
            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{request.patientName}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getUrgencyColor(request.urgency)}`}>
                        <span className="flex items-center space-x-1">
                          {getUrgencyIcon(request.urgency)}
                          <span className="capitalize">{request.urgency}</span>
                        </span>
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(request.type)}`}>
                        <span className="flex items-center space-x-1">
                          {getTypeIcon(request.type)}
                          <span className="capitalize">{request.type}</span>
                        </span>
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{request.reason}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimeAgo(request.requestedAt)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{request.estimatedDuration} min</span>
                      </span>
                      {request.location && (
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{request.location}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {request.conditions.map((condition, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                          {condition}
                        </span>
                      ))}
                      {request.currentMedications.map((med, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                          {med}
                        </span>
                      ))}
                      {request.allergies.map((allergy, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                          {allergy}
                        </span>
                      ))}
                    </div>

                    {request.aiPreScreening && (
                      <div className="mt-3">
                        <button
                          onClick={() => handleAIPreScreening(request.id)}
                          className="flex items-center space-x-2 text-sm text-purple-600 hover:text-purple-700 transition-colors"
                        >
                          <Bot className="w-4 h-4" />
                          <span>View AI Pre-screening</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAIPreScreening(request.id)}
                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    title="AI Pre-screening"
                  >
                    <Bot className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleRejectRequest(request.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Reject Request"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleAcceptRequest(request)}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Accept</span>
                  </button>
                </div>
              </div>

              {/* AI Pre-screening Details */}
              <AnimatePresence>
                {showAIPreScreening === request.id && request.aiPreScreening && (
                  <motion.div
                    className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <Bot className="w-5 h-5 text-purple-600" />
                      <h4 className="font-semibold text-purple-900">AI Pre-screening Summary</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        request.aiPreScreening.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                        request.aiPreScreening.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {request.aiPreScreening.riskLevel} risk
                      </span>
                    </div>
                    
                    <p className="text-sm text-purple-800 mb-3">{request.aiPreScreening.summary}</p>
                    
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-purple-900">Suggested Actions:</h5>
                      <ul className="list-disc list-inside space-y-1">
                        {request.aiPreScreening.suggestedActions.map((action, idx) => (
                          <li key={idx} className="text-sm text-purple-700">{action}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-purple-900 mb-2">Key Terms:</h5>
                      <div className="flex flex-wrap gap-1">
                        {request.aiPreScreening.keywords.map((keyword, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests found</h3>
          <p className="text-gray-600">No consultation requests match your current filters.</p>
        </div>
      )}
    </div>
  );
}
