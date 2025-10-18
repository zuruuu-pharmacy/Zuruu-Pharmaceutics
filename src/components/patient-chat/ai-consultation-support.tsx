"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Target, 
  Activity, 
  Pill, 
  Droplets, 
  Wind, 
  Heart, 
  Stethoscope, 
  Thermometer, 
  Scale, 
  Monitor, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  Zap, 
  Shield, 
  Bell, 
  Info, 
  HelpCircle, 
  Award, 
  Database, 
  Cloud, 
  Mail, 
  Phone, 
  Calendar, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Minus, 
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
  Edit, 
  Trash2, 
  Copy, 
  ExternalLink, 
  RefreshCw, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Repeat, 
  Shuffle, 
  Volume1, 
  Volume2, 
  Headphones,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Key,
  Download,
  Upload,
  Share,
  MessageCircle,
  FileText,
  Video,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Maximize,
  Minimize,
  RotateCcw,
  User,
  Users,
  Settings,
  Globe,
  Languages
} from 'lucide-react';

import { 
  AIConsultationSupport as AISupportType, 
  Patient, 
  ChatMessage 
} from '@/types/patient-chat';

interface AIConsultationSupportProps {
  patient: Patient;
  messages: ChatMessage[];
  aiSupport: AISupportType[];
  onAcknowledgeSupport: (supportId: string) => void;
  onApplyRecommendation: (recommendation: string) => void;
  onEscalateToDoctor: (reason: string) => void;
  onTranslateMessage: (messageId: string, targetLanguage: string) => void;
  onGenerateResponse: (context: string) => void;
}

export default function AIConsultationSupport({
  patient,
  messages,
  aiSupport,
  onAcknowledgeSupport,
  onApplyRecommendation,
  onEscalateToDoctor,
  onTranslateMessage,
  onGenerateResponse
}: AIConsultationSupportProps) {
  const [activeTab, setActiveTab] = useState<'alerts' | 'recommendations' | 'analysis' | 'translation'>('alerts');
  const [selectedSupport, setSelectedSupport] = useState<AISupportType | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [isGenerating, setIsGenerating] = useState(false);

  const getSupportIcon = (type: string) => {
    switch (type) {
      case 'drug_interaction': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'symptom_analysis': return <Brain className="w-5 h-5 text-purple-500" />;
      case 'recommendation': return <Target className="w-5 h-5 text-green-500" />;
      case 'alert': return <Bell className="w-5 h-5 text-orange-500" />;
      case 'translation': return <Globe className="w-5 h-5 text-blue-500" />;
      default: return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSupportColor = (type: string, severity: string) => {
    if (type === 'drug_interaction' || severity === 'critical') {
      return 'bg-red-50 border-red-200';
    }
    if (type === 'alert' || severity === 'high') {
      return 'bg-orange-50 border-orange-200';
    }
    if (type === 'recommendation' || severity === 'moderate') {
      return 'bg-green-50 border-green-200';
    }
    if (type === 'translation' || severity === 'low') {
      return 'bg-blue-50 border-blue-200';
    }
    return 'bg-gray-50 border-gray-200';
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getDiseaseIcon = (disease: string) => {
    if (disease.toLowerCase().includes('diabetes')) return <Droplets className="w-4 h-4" />;
    if (disease.toLowerCase().includes('hypertension') || disease.toLowerCase().includes('blood pressure')) return <Heart className="w-4 h-4" />;
    if (disease.toLowerCase().includes('asthma')) return <Wind className="w-4 h-4" />;
    if (disease.toLowerCase().includes('heart') || disease.toLowerCase().includes('cardiac')) return <Heart className="w-4 h-4" />;
    return <Stethoscope className="w-4 h-4" />;
  };

  const renderDrugInteractionAlert = (support: AISupportType) => (
    <div className="space-y-4">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="w-6 h-6 text-red-500 mt-1" />
        <div className="flex-1">
          <h4 className="font-semibold text-red-900">Drug Interaction Detected</h4>
          <p className="text-sm text-red-800 mt-1">{support.content}</p>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h5 className="font-medium text-red-900 mb-2">Evidence</h5>
        <ul className="list-disc list-inside text-sm text-red-800 space-y-1">
          {support.evidence.map((evidence, index) => (
            <li key={index}>{evidence}</li>
          ))}
        </ul>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h5 className="font-medium text-yellow-900 mb-2">Immediate Actions</h5>
        <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
          {support.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => onApplyRecommendation('Monitor patient closely for adverse effects')}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Monitor Patient
        </button>
        <button
          onClick={() => onEscalateToDoctor('Drug interaction detected - requires physician review')}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Escalate to Doctor
        </button>
      </div>
    </div>
  );

  const renderSymptomAnalysis = (support: AISupportType) => (
    <div className="space-y-4">
      <div className="flex items-start space-x-3">
        <Brain className="w-6 h-6 text-purple-500 mt-1" />
        <div className="flex-1">
          <h4 className="font-semibold text-purple-900">Symptom Analysis</h4>
          <p className="text-sm text-purple-800 mt-1">{support.content}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h5 className="font-medium text-purple-900 mb-2">Possible Causes</h5>
          <ul className="list-disc list-inside text-sm text-purple-800 space-y-1">
            {support.evidence.map((cause, index) => (
              <li key={index}>{cause}</li>
            ))}
          </ul>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h5 className="font-medium text-green-900 mb-2">Recommended Actions</h5>
          <ul className="list-disc list-inside text-sm text-green-800 space-y-1">
            {support.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => onApplyRecommendation('Ask patient about symptom severity and duration')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Ask Patient
        </button>
        <button
          onClick={() => onApplyRecommendation('Suggest monitoring vital signs')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Monitor Vitals
        </button>
      </div>
    </div>
  );

  const renderRecommendation = (support: AISupportType) => (
    <div className="space-y-4">
      <div className="flex items-start space-x-3">
        <Target className="w-6 h-6 text-green-500 mt-1" />
        <div className="flex-1">
          <h4 className="font-semibold text-green-900">AI Recommendation</h4>
          <p className="text-sm text-green-800 mt-1">{support.content}</p>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h5 className="font-medium text-green-900 mb-2">Implementation Steps</h5>
        <ul className="list-disc list-inside text-sm text-green-800 space-y-1">
          {support.recommendations.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => onApplyRecommendation(support.content)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Apply Recommendation
        </button>
        <button
          onClick={() => onGenerateResponse(support.content)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Generate Response
        </button>
      </div>
    </div>
  );

  const renderTranslation = (support: AISupportType) => (
    <div className="space-y-4">
      <div className="flex items-start space-x-3">
        <Globe className="w-6 h-6 text-blue-500 mt-1" />
        <div className="flex-1">
          <h4 className="font-semibold text-blue-900">Translation Available</h4>
          <p className="text-sm text-blue-800 mt-1">{support.content}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Language
          </label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="en">English</option>
            <option value="ur">Urdu</option>
            <option value="ar">Arabic</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="font-medium text-blue-900 mb-2">Translated Message</h5>
          <p className="text-sm text-blue-800">
            {support.content} (Translated to {targetLanguage})
          </p>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => onTranslateMessage('message-id', targetLanguage)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Apply Translation
        </button>
        <button
          onClick={() => onGenerateResponse(support.content)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Generate Response
        </button>
      </div>
    </div>
  );

  const renderSupportDetails = (support: AISupportType) => {
    switch (support.type) {
      case 'drug_interaction':
        return renderDrugInteractionAlert(support);
      case 'symptom_analysis':
        return renderSymptomAnalysis(support);
      case 'recommendation':
        return renderRecommendation(support);
      case 'translation':
        return renderTranslation(support);
      default:
        return (
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              {getSupportIcon(support.type)}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">AI Support</h4>
                <p className="text-sm text-gray-700 mt-1">{support.content}</p>
              </div>
            </div>
            {support.recommendations.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-2">Recommendations</h5>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {support.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
    }
  };

  const unacknowledgedSupport = aiSupport.filter(support => !support.acknowledged);

  return (
    <div className="w-full h-full bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>AI Consultation Support</span>
          </h2>
          <div className="flex items-center space-x-2">
            {unacknowledgedSupport.length > 0 && (
              <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                {unacknowledgedSupport.length} unacknowledged
              </span>
            )}
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4">
          <nav className="flex space-x-8">
            {[
              { id: 'alerts', label: 'Alerts', count: unacknowledgedSupport.filter(s => s.severity === 'critical' || s.severity === 'high').length },
              { id: 'recommendations', label: 'Recommendations', count: aiSupport.filter(s => s.type === 'recommendation').length },
              { id: 'analysis', label: 'Analysis', count: aiSupport.filter(s => s.type === 'symptom_analysis').length },
              { id: 'translation', label: 'Translation', count: aiSupport.filter(s => s.type === 'translation').length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id
                      ? 'bg-purple-100 text-purple-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'alerts' && (
          <div className="p-4 space-y-4">
            {unacknowledgedSupport
              .filter(support => support.severity === 'critical' || support.severity === 'high')
              .map((support) => (
                <motion.div
                  key={support.id}
                  className={`p-4 rounded-lg border ${getSupportColor(support.type, support.severity)} ${
                    !support.acknowledged ? 'ring-2 ring-purple-200' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getSupportIcon(support.type)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{support.content}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(support.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getSeverityBadge(support.severity)}`}>
                        {support.severity.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getConfidenceColor(support.confidence)}`}>
                        {support.confidence}% confidence
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {support.recommendations.length} recommendation{support.recommendations.length !== 1 ? 's' : ''}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedSupport(support);
                          setShowDetails(true);
                        }}
                        className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => onAcknowledgeSupport(support.id)}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Acknowledge
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="p-4 space-y-4">
            {aiSupport
              .filter(support => support.type === 'recommendation')
              .map((support) => (
                <motion.div
                  key={support.id}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start space-x-3">
                    <Target className="w-5 h-5 text-green-500 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-900">{support.content}</h3>
                      <p className="text-sm text-green-700 mt-1">
                        Confidence: {support.confidence}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="p-4 space-y-4">
            {aiSupport
              .filter(support => support.type === 'symptom_analysis')
              .map((support) => (
                <motion.div
                  key={support.id}
                  className="p-4 bg-purple-50 border border-purple-200 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start space-x-3">
                    <Brain className="w-5 h-5 text-purple-500 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-purple-900">{support.content}</h3>
                      <p className="text-sm text-purple-700 mt-1">
                        Confidence: {support.confidence}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        )}

        {activeTab === 'translation' && (
          <div className="p-4 space-y-4">
            {aiSupport
              .filter(support => support.type === 'translation')
              .map((support) => (
                <motion.div
                  key={support.id}
                  className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start space-x-3">
                    <Globe className="w-5 h-5 text-blue-500 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900">Translation Available</h3>
                      <p className="text-sm text-blue-700 mt-1">{support.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </div>

      {/* Support Details Modal */}
      <AnimatePresence>
        {showDetails && selectedSupport && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-2/3 max-w-4xl max-h-[80vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    AI Support Details
                  </h2>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {renderSupportDetails(selectedSupport)}

                <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => onAcknowledgeSupport(selectedSupport.id)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Acknowledge
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
