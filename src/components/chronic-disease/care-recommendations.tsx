"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  Download, 
  Share, 
  Settings, 
  Bell, 
  Search, 
  Filter, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Shield, 
  Zap, 
  Brain, 
  Pill, 
  Heart, 
  AlertCircle, 
  Info, 
  HelpCircle, 
  Award, 
  Database, 
  Cloud, 
  Wifi, 
  WifiOff,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  Home,
  ShoppingCart,
  CreditCard,
  Receipt,
  Archive,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Mail,
  Phone,
  Droplets,
  Wind,
  Stethoscope,
  Thermometer,
  Scale,
  Monitor,
  Smartphone,
  Edit,
  Trash2,
  Save,
  Send
} from 'lucide-react';

import { 
  CareRecommendation, 
  CarePlan, 
  Patient, 
  ChronicDisease, 
  DiseaseType 
} from '@/types/chronic-disease';

interface CareRecommendationsProps {
  patient: Patient;
  recommendations: CareRecommendation[];
  carePlans: CarePlan[];
  onImplementRecommendation: (recommendation: CareRecommendation) => void;
  onNotifyPatient: (recommendation: CareRecommendation) => void;
  onConsultPhysician: (recommendation: CareRecommendation) => void;
  onGenerateReport: () => void;
  onCreateCarePlan: () => void;
}

export default function CareRecommendations({ 
  patient, 
  recommendations, 
  carePlans, 
  onImplementRecommendation, 
  onNotifyPatient, 
  onConsultPhysician, 
  onGenerateReport, 
  onCreateCarePlan 
}: CareRecommendationsProps) {
  const [selectedRecommendation, setSelectedRecommendation] = useState<CareRecommendation | null>(null);
  const [showCarePlans, setShowCarePlans] = useState(false);
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'moderate' | 'high' | 'urgent'>('all');
  const [filterType, setFilterType] = useState<'all' | 'medication_adjustment' | 'lifestyle_change' | 'monitoring' | 'referral' | 'education'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in_progress' | 'completed' | 'cancelled'>('all');
  const [showCreatePlan, setShowCreatePlan] = useState(false);

  const filteredRecommendations = recommendations.filter(rec => {
    const priorityMatch = filterPriority === 'all' || rec.priority === filterPriority;
    const typeMatch = filterType === 'all' || rec.type === filterType;
    const statusMatch = filterStatus === 'all' || rec.status === filterStatus;
    return priorityMatch && typeMatch && statusMatch;
  });

  const getDiseaseIcon = (diseaseType: DiseaseType) => {
    switch (diseaseType) {
      case 'diabetes': return <Droplets className="w-4 h-4" />;
      case 'hypertension': return <Heart className="w-4 h-4" />;
      case 'asthma': return <Wind className="w-4 h-4" />;
      case 'copd': return <Wind className="w-4 h-4" />;
      case 'hyperlipidemia': return <Droplets className="w-4 h-4" />;
      case 'cardiovascular': return <Heart className="w-4 h-4" />;
      case 'thyroid': return <Activity className="w-4 h-4" />;
      default: return <Stethoscope className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'medication_adjustment': return <Pill className="w-4 h-4" />;
      case 'lifestyle_change': return <Activity className="w-4 h-4" />;
      case 'monitoring': return <Eye className="w-4 h-4" />;
      case 'referral': return <Users className="w-4 h-4" />;
      case 'education': return <FileText className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'medication_adjustment': return 'text-blue-600 bg-blue-100';
      case 'lifestyle_change': return 'text-green-600 bg-green-100';
      case 'monitoring': return 'text-orange-600 bg-orange-100';
      case 'referral': return 'text-purple-600 bg-purple-100';
      case 'education': return 'text-teal-600 bg-teal-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <XCircle className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'moderate': return <AlertCircle className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderCarePlans = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Active Care Plans</h3>
        <button
          onClick={() => setShowCarePlans(!showCarePlans)}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          {showCarePlans ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
      
      <AnimatePresence>
        {showCarePlans && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {carePlans.map((plan) => (
              <motion.div
                key={plan.id}
                className="border border-gray-200 rounded-lg p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{plan.title}</h4>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    plan.status === 'active' ? 'bg-green-100 text-green-800' :
                    plan.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    plan.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {plan.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Goals:</span>
                    <span className="font-medium ml-1">{plan.goals.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Interventions:</span>
                    <span className="font-medium ml-1">{plan.interventions.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Next Review:</span>
                    <span className="font-medium ml-1">{plan.nextReview.toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <button
              onClick={onCreateCarePlan}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-teal-500 hover:text-teal-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Care Plan</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderRecommendationCard = (recommendation: CareRecommendation, index: number) => (
    <motion.div
      key={recommendation.id}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            {getDiseaseIcon(recommendation.diseaseType)}
            <h3 className="text-lg font-semibold text-gray-900">{recommendation.title}</h3>
            <span className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 ${getTypeColor(recommendation.type)}`}>
              {getTypeIcon(recommendation.type)}
              <span className="capitalize">{recommendation.type.replace('_', ' ')}</span>
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{recommendation.description}</p>
          <p className="text-sm text-gray-700">{recommendation.rationale}</p>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-3 py-1 text-sm rounded-full flex items-center space-x-1 ${getPriorityColor(recommendation.priority)}`}>
            {getPriorityIcon(recommendation.priority)}
            <span className="capitalize">{recommendation.priority}</span>
          </span>
          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(recommendation.status)}`}>
            {recommendation.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Implementation Steps */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Implementation Steps</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {recommendation.implementation.map((step, stepIndex) => (
              <li key={stepIndex}>{step}</li>
            ))}
          </ul>
        </div>

        {/* Expected Outcome */}
        <div>
          <h4 className="font-medium text-gray-900 mb-1">Expected Outcome</h4>
          <p className="text-sm text-gray-700">{recommendation.expectedOutcome}</p>
        </div>

        {/* Monitoring Required */}
        {recommendation.monitoringRequired.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Monitoring Required</h4>
            <div className="flex flex-wrap gap-2">
              {recommendation.monitoringRequired.map((item, itemIndex) => (
                <span key={itemIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Timeline and Follow-up */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Timeframe</h4>
            <p className="text-sm text-gray-700">{recommendation.timeframe}</p>
          </div>
          {recommendation.followUpRequired && recommendation.followUpDate && (
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Follow-up Date</h4>
              <p className="text-sm text-gray-700">{recommendation.followUpDate.toLocaleDateString()}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Created: {recommendation.createdAt.toLocaleDateString()}
            </div>
            {recommendation.completedAt && (
              <div className="text-sm text-gray-600">
                Completed: {recommendation.completedAt.toLocaleDateString()}
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            {recommendation.status === 'pending' && (
              <button
                onClick={() => onImplementRecommendation(recommendation)}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Implement</span>
              </button>
            )}
            <button
              onClick={() => onNotifyPatient(recommendation)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Notify Patient</span>
            </button>
            <button
              onClick={() => onConsultPhysician(recommendation)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Consult Physician</span>
            </button>
            <button
              onClick={() => setSelectedRecommendation(selectedRecommendation?.id === recommendation.id ? null : recommendation)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {selectedRecommendation?.id === recommendation.id && (
          <motion.div
            className="mt-6 pt-6 border-t border-gray-200 space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Detailed Notes</h4>
              <p className="text-sm text-gray-700">{recommendation.notes}</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Progress Tracking</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">Implementation Progress</span>
                  <span className="text-sm text-gray-600">
                    {recommendation.status === 'completed' ? '100%' :
                     recommendation.status === 'in_progress' ? '50%' :
                     recommendation.status === 'pending' ? '0%' : '0%'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      recommendation.status === 'completed' ? 'bg-green-500' :
                      recommendation.status === 'in_progress' ? 'bg-blue-500' :
                      'bg-gray-300'
                    }`}
                    style={{ 
                      width: recommendation.status === 'completed' ? '100%' :
                             recommendation.status === 'in_progress' ? '50%' : '0%'
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Related Resources</h4>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-blue-50 rounded-lg text-left hover:bg-blue-100 transition-colors">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Patient Education</span>
                  </div>
                  <p className="text-xs text-blue-700 mt-1">Educational materials and guides</p>
                </button>
                <button className="p-3 bg-green-50 rounded-lg text-left hover:bg-green-100 transition-colors">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Lifestyle Tips</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">Diet and exercise recommendations</p>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Target className="w-8 h-8 text-green-600" />
            <span>Care Recommendations</span>
          </h2>
          <p className="text-gray-600">Personalized care plans and intervention strategies</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={onCreateCarePlan}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Care Plan</span>
          </button>
          <button
            onClick={onGenerateReport}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Care Plans */}
      {renderCarePlans()}

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="medication_adjustment">Medication Adjustment</option>
              <option value="lifestyle_change">Lifestyle Change</option>
              <option value="monitoring">Monitoring</option>
              <option value="referral">Referral</option>
              <option value="education">Education</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search recommendations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Recommendations', value: recommendations.length, color: 'blue', icon: Target },
          { title: 'Urgent Priority', value: recommendations.filter(r => r.priority === 'urgent').length, color: 'red', icon: AlertTriangle },
          { title: 'In Progress', value: recommendations.filter(r => r.status === 'in_progress').length, color: 'orange', icon: Activity },
          { title: 'Completed', value: recommendations.filter(r => r.status === 'completed').length, color: 'green', icon: CheckCircle }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {filteredRecommendations.length > 0 ? (
          filteredRecommendations.map((recommendation, index) => 
            renderRecommendationCard(recommendation, index)
          )
        ) : (
          <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-100 text-center">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recommendations Found</h3>
            <p className="text-gray-600">No care recommendations match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
