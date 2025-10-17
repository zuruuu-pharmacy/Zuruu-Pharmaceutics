"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, 
  Search, 
  BarChart3, 
  Brain, 
  Target, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users, 
  FileText, 
  Download, 
  Share, 
  Settings, 
  Bell, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  PieChart, 
  LineChart, 
  Shield, 
  Zap, 
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
  Calendar,
  Droplets,
  Wind,
  Thermometer,
  Scale,
  Monitor,
  Smartphone,
  Filter
} from 'lucide-react';

import ChronicDiseaseTracker from './chronic-disease-tracker';
import AIDiseasePredictor from './ai-disease-predictor';
import CareRecommendations from './care-recommendations';

import { 
  Patient, 
  ChronicDisease, 
  AIPrediction, 
  AIAlert, 
  CareRecommendation, 
  CarePlan 
} from '@/types/chronic-disease';

interface ChronicDiseaseManagementProps {
  onNavigateToDashboard: () => void;
  selectedPatient?: Patient;
}

export default function ChronicDiseaseManagement({ 
  onNavigateToDashboard, 
  selectedPatient 
}: ChronicDiseaseManagementProps) {
  const [activeTab, setActiveTab] = useState<'tracker' | 'ai-predictor' | 'recommendations'>('tracker');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: '1', type: 'alert', message: 'Critical: HbA1c rising to 8.2%', time: '2 min ago', unread: true },
    { id: '2', type: 'info', message: 'AI prediction confidence: 87%', time: '5 min ago', unread: true },
    { id: '3', type: 'success', message: 'Care plan implemented successfully', time: '10 min ago', unread: false }
  ]);

  const [patients] = useState<Patient[]>([]);
  const [predictions] = useState<AIPrediction[]>([]);
  const [alerts] = useState<AIAlert[]>([]);
  const [recommendations] = useState<CareRecommendation[]>([]);
  const [carePlans] = useState<CarePlan[]>([]);

  const [quickStats] = useState({
    totalPatients: 1247,
    activeDiseases: 23,
    highRiskPatients: 5,
    recommendationsGenerated: 18,
    aiPredictions: 12,
    alerts: 8
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const handleViewDetails = (prediction: AIPrediction) => {
    console.log('View prediction details:', prediction);
    // Implement view details functionality
  };

  const handleGenerateReport = () => {
    console.log('Generate report');
    // Implement report generation
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    console.log('Acknowledge alert:', alertId);
    // Implement alert acknowledgment
  };

  const handleImplementRecommendation = (recommendation: CareRecommendation) => {
    console.log('Implement recommendation:', recommendation);
    // Implement recommendation functionality
  };

  const handleNotifyPatient = (recommendation: CareRecommendation) => {
    console.log('Notify patient:', recommendation);
    // Implement patient notification
  };

  const handleConsultPhysician = (recommendation: CareRecommendation) => {
    console.log('Consult physician:', recommendation);
    // Implement physician consultation
  };

  const handleCreateCarePlan = () => {
    console.log('Create care plan');
    // Implement care plan creation
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'info': return <Info className="w-4 h-4 text-blue-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'alert': return 'bg-red-50 border-red-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      case 'success': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'tracker':
        return (
          <ChronicDiseaseTracker
            onNavigateToDashboard={onNavigateToDashboard}
            selectedPatient={selectedPatient}
          />
        );
      case 'ai-predictor':
        return (
          <AIDiseasePredictor
            patient={selectedPatient || {} as Patient}
            predictions={predictions}
            alerts={alerts}
            onViewDetails={handleViewDetails}
            onGenerateReport={handleGenerateReport}
            onAcknowledgeAlert={handleAcknowledgeAlert}
          />
        );
      case 'recommendations':
        return (
          <CareRecommendations
            patient={selectedPatient || {} as Patient}
            recommendations={recommendations}
            carePlans={carePlans}
            onImplementRecommendation={handleImplementRecommendation}
            onNotifyPatient={handleNotifyPatient}
            onConsultPhysician={handleConsultPhysician}
            onGenerateReport={handleGenerateReport}
            onCreateCarePlan={handleCreateCarePlan}
          />
        );
      default:
        return (
          <ChronicDiseaseTracker
            onNavigateToDashboard={onNavigateToDashboard}
            selectedPatient={selectedPatient}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onNavigateToDashboard}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Chronic Disease Tracker</h1>
                <p className="text-sm text-gray-600">Monitor and manage long-term patient conditions</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Quick Stats */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{quickStats.totalPatients.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Total Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-red-600">{quickStats.highRiskPatients}</div>
                  <div className="text-xs text-gray-500">High Risk</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-orange-600">{quickStats.activeDiseases}</div>
                  <div className="text-xs text-gray-500">Active Diseases</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">{quickStats.recommendationsGenerated}</div>
                  <div className="text-xs text-gray-500">Recommendations</div>
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
                  <Bell className="w-5 h-5" />
                  {notifications.filter(n => n.unread).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.filter(n => n.unread).length}
                    </span>
                  )}
                </button>
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'tracker', label: 'Disease Tracker', icon: Stethoscope, description: 'Patient monitoring and vitals' },
              { id: 'ai-predictor', label: 'AI Predictor', icon: Brain, description: 'Risk analysis and forecasts' },
              { id: 'recommendations', label: 'Care Plans', icon: Target, description: 'Intervention strategies' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors group ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">{tab.label}</div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-600">
                    {tab.description}
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {renderContent()}
      </div>

      {/* Mobile Notifications Panel */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl"
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${getNotificationColor(notification.type)} ${
                      notification.unread ? 'ring-2 ring-teal-200' : ''
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="flex items-start space-x-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col space-y-3">
          <button className="w-14 h-14 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-colors flex items-center justify-center group">
            <Plus className="w-6 h-6" />
          </button>
          
          <div className="bg-white rounded-full shadow-lg p-2">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
