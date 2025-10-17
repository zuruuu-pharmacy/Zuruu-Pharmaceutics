"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Target, 
  Activity, 
  Clock, 
  Users, 
  FileText, 
  Download, 
  Share, 
  Mail, 
  Phone, 
  MessageSquare, 
  Bell, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  Settings, 
  Filter, 
  Search, 
  Award, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  HelpCircle, 
  Info, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  LineChart, 
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
  Pill,
  Heart,
  AlertCircle,
  Zap,
  Brain
} from 'lucide-react';

import { SafetyRecommendation, DrugInteraction, Drug } from '@/types/drug-interaction';

interface SafetyRecommendationsProps {
  recommendations: SafetyRecommendation[];
  interactions: DrugInteraction[];
  onImplementRecommendation: (recommendation: SafetyRecommendation) => void;
  onOverrideRecommendation: (recommendation: SafetyRecommendation, justification: string) => void;
  onSendToPrescriber: (recommendation: SafetyRecommendation) => void;
  onGenerateReport: () => void;
}

export default function SafetyRecommendations({ 
  recommendations, 
  interactions, 
  onImplementRecommendation, 
  onOverrideRecommendation, 
  onSendToPrescriber, 
  onGenerateReport 
}: SafetyRecommendationsProps) {
  const [selectedRecommendation, setSelectedRecommendation] = useState<SafetyRecommendation | null>(null);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [justification, setJustification] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [filterAction, setFilterAction] = useState<'all' | 'contraindicate' | 'monitor' | 'adjust_dose' | 'replace_drug' | 'proceed_with_caution'>('all');
  const [showAlternatives, setShowAlternatives] = useState(false);

  const filteredRecommendations = recommendations.filter(rec => {
    const priorityMatch = filterPriority === 'all' || rec.priority === filterPriority;
    const actionMatch = filterAction === 'all' || rec.action === filterAction;
    return priorityMatch && actionMatch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <XCircle className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'contraindicate': return 'text-red-600 bg-red-100';
      case 'monitor': return 'text-orange-600 bg-orange-100';
      case 'adjust_dose': return 'text-yellow-600 bg-yellow-100';
      case 'replace_drug': return 'text-blue-600 bg-blue-100';
      case 'proceed_with_caution': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'contraindicate': return <XCircle className="w-4 h-4" />;
      case 'monitor': return <Eye className="w-4 h-4" />;
      case 'adjust_dose': return <Edit className="w-4 h-4" />;
      case 'replace_drug': return <RefreshCw className="w-4 h-4" />;
      case 'proceed_with_caution': return <AlertTriangle className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const handleOverride = () => {
    if (selectedRecommendation && justification.trim()) {
      onOverrideRecommendation(selectedRecommendation, justification);
      setShowOverrideModal(false);
      setJustification('');
      setSelectedRecommendation(null);
    }
  };

  const renderRecommendationCard = (recommendation: SafetyRecommendation, index: number) => (
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
            <span className={`px-3 py-1 text-sm rounded-full flex items-center space-x-1 ${getPriorityColor(recommendation.priority)}`}>
              {getPriorityIcon(recommendation.priority)}
              <span className="capitalize">{recommendation.priority} Priority</span>
            </span>
            <span className={`px-3 py-1 text-sm rounded-full flex items-center space-x-1 ${getActionColor(recommendation.action)}`}>
              {getActionIcon(recommendation.action)}
              <span className="capitalize">{recommendation.action.replace('_', ' ')}</span>
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{recommendation.description}</h3>
          <p className="text-sm text-gray-600">{recommendation.rationale}</p>
        </div>
        <div className="flex items-center space-x-2">
          {recommendation.requiresPrescriberConsultation && (
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
              Prescriber Required
            </span>
          )}
          {recommendation.documentationRequired && (
            <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
              Documentation Required
            </span>
          )}
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

        {/* Monitoring Required */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Monitoring Required</h4>
          <div className="flex flex-wrap gap-2">
            {recommendation.monitoring.map((item, itemIndex) => (
              <span key={itemIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Follow-up */}
        <div>
          <h4 className="font-medium text-gray-900 mb-1">Follow-up</h4>
          <p className="text-sm text-gray-700">{recommendation.followUp}</p>
        </div>

        {/* Alternative Options */}
        {recommendation.alternativeOptions.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Alternative Options</h4>
            <div className="space-y-2">
              {recommendation.alternativeOptions.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Pill className="w-4 h-4 text-teal-600" />
                    <div>
                      <div className="font-medium text-gray-900">{option.drug.name}</div>
                      <div className="text-sm text-gray-600">{option.reason}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{option.interactionScore}%</div>
                    <div className="text-xs text-gray-600">Interaction Score</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {recommendation.pharmacistOverrideAllowed ? 'Override Allowed' : 'No Override'}
            </div>
            <div className="text-sm text-gray-600">
              {recommendation.documentationRequired ? 'Documentation Required' : 'No Documentation'}
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onImplementRecommendation(recommendation)}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Implement</span>
            </button>
            {recommendation.pharmacistOverrideAllowed && (
              <button
                onClick={() => {
                  setSelectedRecommendation(recommendation);
                  setShowOverrideModal(true);
                }}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
              >
                <XCircle className="w-4 h-4" />
                <span>Override</span>
              </button>
            )}
            <button
              onClick={() => onSendToPrescriber(recommendation)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Send to Prescriber</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderOverrideModal = () => (
    <AnimatePresence>
      {showOverrideModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Override Recommendation</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please provide justification for overriding this safety recommendation:
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Justification</label>
              <textarea
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                placeholder="Enter your justification for overriding this recommendation..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowOverrideModal(false);
                  setJustification('');
                  setSelectedRecommendation(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleOverride}
                disabled={!justification.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                Override
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Shield className="w-8 h-8 text-green-600" />
            <span>Safety Recommendations & Actions</span>
          </h2>
          <p className="text-gray-600">Guided recommendations for safe medication management</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAlternatives(!showAlternatives)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Show Alternatives</span>
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
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Actions</option>
              <option value="contraindicate">Contraindicate</option>
              <option value="monitor">Monitor</option>
              <option value="adjust_dose">Adjust Dose</option>
              <option value="replace_drug">Replace Drug</option>
              <option value="proceed_with_caution">Proceed with Caution</option>
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
          { title: 'High Priority', value: recommendations.filter(r => r.priority === 'high').length, color: 'red', icon: AlertTriangle },
          { title: 'Requires Prescriber', value: recommendations.filter(r => r.requiresPrescriberConsultation).length, color: 'orange', icon: Users },
          { title: 'Override Allowed', value: recommendations.filter(r => r.pharmacistOverrideAllowed).length, color: 'green', icon: CheckCircle }
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
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recommendations Found</h3>
            <p className="text-gray-600">No safety recommendations match your current filters.</p>
          </div>
        )}
      </div>

      {/* Override Modal */}
      {renderOverrideModal()}
    </div>
  );
}
