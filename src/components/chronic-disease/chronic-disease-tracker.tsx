"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
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
  Target, 
  Shield, 
  Zap, 
  Brain, 
  Pill, 
  Stethoscope, 
  Thermometer, 
  Droplets, 
  Wind, 
  Scale, 
  Monitor, 
  Smartphone, 
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
  Award, 
  Database, 
  Cloud, 
  HelpCircle, 
  Info, 
  AlertCircle
} from 'lucide-react';

import { 
  Patient, 
  ChronicDisease, 
  VitalReading, 
  AIPrediction, 
  AIAlert, 
  CareRecommendation, 
  DiseaseTrend, 
  DiseaseType 
} from '@/types/chronic-disease';

interface ChronicDiseaseTrackerProps {
  onNavigateToDashboard: () => void;
  selectedPatient?: Patient;
}

export default function ChronicDiseaseTracker({ 
  onNavigateToDashboard, 
  selectedPatient 
}: ChronicDiseaseTrackerProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'visualization' | 'ai-prediction' | 'recommendations'>('overview');
  const [selectedDisease, setSelectedDisease] = useState<DiseaseType | 'all'>('all');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Mock data for demonstration
  const [patients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Ayesha Khan',
      age: 45,
      gender: 'female',
      photo: '/api/placeholder/60/60',
      dateOfBirth: new Date('1978-05-15'),
      contactInfo: {
        phone: '+92-300-1234567',
        email: 'ayesha.khan@email.com',
        address: 'Karachi, Pakistan'
      },
      emergencyContact: {
        name: 'Ahmed Khan',
        phone: '+92-300-7654321',
        relationship: 'Husband'
      },
      insuranceInfo: {
        provider: 'State Life Insurance',
        policyNumber: 'SL-2023-001',
        groupNumber: 'GRP-001'
      },
      lastCheckup: new Date('2024-01-15'),
      nextScheduledCheckup: new Date('2024-02-15'),
      stabilityScore: 76,
      riskLevel: 'moderate',
      activeDiseases: [
        {
          id: '1',
          name: 'Type 2 Diabetes',
          type: 'diabetes',
          diagnosisDate: new Date('2020-03-10'),
          severity: 'moderate',
          status: 'deteriorating',
          currentMedications: ['Metformin', 'Sitagliptin'],
          targetValues: {
            diabetes: {
              fastingGlucose: { min: 70, max: 130, unit: 'mg/dL' },
              postprandialGlucose: { min: 80, max: 180, unit: 'mg/dL' },
              hba1c: { min: 6.0, max: 7.0, unit: '%' },
              bloodPressure: { systolic: { min: 90, max: 140 }, diastolic: { min: 60, max: 90 } }
            }
          },
          lastAssessment: new Date('2024-01-15'),
          nextAssessment: new Date('2024-02-15'),
          notes: 'HbA1c rising, needs medication adjustment',
          complications: [],
          riskFactors: ['Family history', 'Obesity', 'Sedentary lifestyle']
        },
        {
          id: '2',
          name: 'Hypertension',
          type: 'hypertension',
          diagnosisDate: new Date('2019-08-20'),
          severity: 'mild',
          status: 'unstable',
          currentMedications: ['Lisinopril', 'Amlodipine'],
          targetValues: {
            hypertension: {
              systolic: { min: 90, max: 140 },
              diastolic: { min: 60, max: 90 },
              heartRate: { min: 60, max: 100 }
            }
          },
          lastAssessment: new Date('2024-01-15'),
          nextAssessment: new Date('2024-02-15'),
          notes: 'BP spikes in recent readings',
          complications: [],
          riskFactors: ['Diabetes', 'Family history', 'High salt intake']
        }
      ],
      medications: [],
      allergies: [],
      lifestyleFactors: {
        smoking: { status: 'never' },
        alcohol: { status: 'none' },
        exercise: { frequency: 'light', minutesPerWeek: 60 },
        diet: { quality: 'fair', restrictions: [], supplements: [] },
        sleep: { hoursPerNight: 6, quality: 'fair', disorders: [] },
        stress: { level: 'moderate', management: [] }
      }
    }
  ]);

  const [alerts] = useState<AIAlert[]>([
    {
      id: '1',
      patientId: '1',
      diseaseType: 'diabetes',
      alertType: 'warning',
      title: 'HbA1c Rising Trend',
      message: 'HbA1c has increased to 8.2% - above target range of 7.0%',
      severity: 'high',
      timestamp: new Date('2024-01-20T10:30:00'),
      acknowledged: false,
      actionRequired: true,
      relatedReadings: ['1', '2', '3'],
      relatedMedications: ['1', '2']
    },
    {
      id: '2',
      patientId: '1',
      diseaseType: 'hypertension',
      alertType: 'critical',
      title: 'Blood Pressure Spike',
      message: 'BP readings: 150/95 → 155/98 → 162/100 - immediate attention needed',
      severity: 'critical',
      timestamp: new Date('2024-01-20T14:15:00'),
      acknowledged: false,
      actionRequired: true,
      relatedReadings: ['4', '5', '6'],
      relatedMedications: ['3', '4']
    }
  ]);

  const [predictions] = useState<AIPrediction[]>([
    {
      id: '1',
      patientId: '1',
      diseaseType: 'diabetes',
      predictionType: 'disease_progression',
      prediction: 'High probability (81%) of uncontrolled diabetes within 2 weeks',
      confidence: 87,
      timeframe: '2 weeks',
      riskScore: 81,
      factors: ['Rising HbA1c', 'Poor medication adherence', 'Lifestyle factors'],
      recommendations: ['Add DPP-4 inhibitor', 'Increase monitoring frequency', 'Lifestyle counseling'],
      modelVersion: 'v2.1.3',
      generatedAt: new Date('2024-01-20T09:00:00'),
      expiresAt: new Date('2024-02-20T09:00:00')
    }
  ]);

  const [recommendations] = useState<CareRecommendation[]>([
    {
      id: '1',
      patientId: '1',
      diseaseType: 'diabetes',
      type: 'medication_adjustment',
      priority: 'high',
      title: 'Add DPP-4 Inhibitor',
      description: 'Consider adding Sitagliptin to current Metformin therapy',
      rationale: 'HbA1c plateauing with current regimen, DPP-4 inhibitor may improve control',
      implementation: ['Review patient history', 'Check for contraindications', 'Start with low dose'],
      expectedOutcome: 'Improved glucose control within 4-6 weeks',
      timeframe: '4-6 weeks',
      monitoringRequired: ['Blood glucose', 'HbA1c', 'Side effects'],
      followUpRequired: true,
      followUpDate: new Date('2024-02-15'),
      status: 'pending',
      createdBy: 'AI System',
      createdAt: new Date('2024-01-20T09:00:00'),
      notes: 'Patient has good adherence to Metformin'
    }
  ]);

  const currentPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

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

  const getDiseaseColor = (diseaseType: DiseaseType) => {
    switch (diseaseType) {
      case 'diabetes': return 'bg-blue-100 text-blue-800';
      case 'hypertension': return 'bg-red-100 text-red-800';
      case 'asthma': return 'bg-green-100 text-green-800';
      case 'copd': return 'bg-green-100 text-green-800';
      case 'hyperlipidemia': return 'bg-yellow-100 text-yellow-800';
      case 'cardiovascular': return 'bg-red-100 text-red-800';
      case 'thyroid': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'text-green-600 bg-green-100';
      case 'improving': return 'text-blue-600 bg-blue-100';
      case 'deteriorating': return 'text-orange-600 bg-orange-100';
      case 'unstable': return 'text-red-600 bg-red-100';
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

  const getAlertIcon = (alertType: string) => {
    switch (alertType) {
      case 'critical': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'info': return <Info className="w-4 h-4 text-blue-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAlertColor = (alertType: string) => {
    switch (alertType) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-orange-50 border-orange-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const renderPatientOverview = () => (
    <div className="space-y-6">
      {/* Patient Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-teal-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{currentPatient.name}</h2>
            <p className="text-gray-600">ID: {currentPatient.id} • Age: {currentPatient.age} • {currentPatient.gender}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(currentPatient.riskLevel)}`}>
                  {currentPatient.riskLevel.toUpperCase()} RISK
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Activity className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Stability: {currentPatient.stabilityScore}%</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Last checkup: {currentPatient.lastCheckup.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-teal-600">{currentPatient.stabilityScore}%</div>
            <div className="text-sm text-gray-600">Stability Score</div>
          </div>
        </div>
      </div>

      {/* Active Diseases */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Diseases</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentPatient.activeDiseases.map((disease) => (
            <motion.div
              key={disease.id}
              className="border border-gray-200 rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getDiseaseIcon(disease.type)}
                  <h4 className="font-semibold text-gray-900">{disease.name}</h4>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(disease.status)}`}>
                  {disease.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Severity:</span>
                  <span className="font-medium capitalize">{disease.severity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Diagnosed:</span>
                  <span className="font-medium">{disease.diagnosisDate.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Medications:</span>
                  <span className="font-medium">{disease.currentMedications.length}</span>
                </div>
                {disease.notes && (
                  <div className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Notes:</span> {disease.notes}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vitals Summary */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Vitals Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Blood Pressure', value: '142/88', unit: 'mmHg', trend: 'up', status: 'high' },
            { title: 'Blood Glucose', value: '165', unit: 'mg/dL', trend: 'up', status: 'high' },
            { title: 'HbA1c', value: '8.2', unit: '%', trend: 'up', status: 'high' }
          ].map((vital, index) => (
            <motion.div
              key={vital.title}
              className="border border-gray-200 rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{vital.title}</h4>
                <div className="flex items-center space-x-1">
                  {vital.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-red-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {vital.value} <span className="text-sm font-normal text-gray-600">{vital.unit}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  vital.status === 'high' ? 'bg-red-100 text-red-800' :
                  vital.status === 'normal' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {vital.status.toUpperCase()}
                </span>
                <span className="text-xs text-gray-500">Last 24h</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Summary Widget */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-3">
          <Brain className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Health Summary</h3>
        </div>
        <p className="text-gray-700">
          Patient stability score: <span className="font-semibold text-purple-600">76%</span> — trending downward due to inconsistent BP readings and rising HbA1c levels. 
          <span className="font-semibold text-orange-600"> Immediate attention recommended</span> for medication adjustment.
        </p>
      </div>
    </div>
  );

  const renderDiseaseVisualization = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Disease-Specific Data Visualization</h3>
        
        {/* Disease Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {currentPatient.activeDiseases.map((disease) => (
              <button
                key={disease.id}
                onClick={() => setSelectedDisease(disease.type)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  selectedDisease === disease.type
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {getDiseaseIcon(disease.type)}
                <span className="font-medium">{disease.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Visualization Content */}
        <div className="space-y-6">
          {selectedDisease === 'diabetes' && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Diabetes Monitoring</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Glucose Trend Chart</p>
                    <p className="text-xs text-gray-400">Last 30 days</p>
                  </div>
                </div>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">HbA1c Progress</p>
                    <p className="text-xs text-gray-400">Target: 7.0%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedDisease === 'hypertension' && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Blood Pressure Monitoring</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">BP Fluctuation Chart</p>
                    <p className="text-xs text-gray-400">Systolic/Diastolic</p>
                  </div>
                </div>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Medication Adherence</p>
                    <p className="text-xs text-gray-400">Last 7 days</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAIPrediction = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Predictions & Risk Analysis</h3>
        
        {predictions.map((prediction) => (
          <motion.div
            key={prediction.id}
            className="border border-gray-200 rounded-lg p-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{prediction.prediction}</h4>
                <p className="text-sm text-gray-600">Timeframe: {prediction.timeframe}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600">{prediction.riskScore}%</div>
                <div className="text-sm text-gray-600">Risk Score</div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-gray-900">Contributing Factors</h5>
                <div className="flex flex-wrap gap-2 mt-1">
                  {prediction.factors.map((factor, index) => (
                    <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900">AI Recommendations</h5>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {prediction.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Confidence: {prediction.confidence}% • Model: {prediction.modelVersion}
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200">
                    View Details
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Export
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Care Recommendations</h3>
        
        {recommendations.map((recommendation) => (
          <motion.div
            key={recommendation.id}
            className="border border-gray-200 rounded-lg p-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{recommendation.title}</h4>
                <p className="text-sm text-gray-600">{recommendation.description}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                recommendation.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                recommendation.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                recommendation.priority === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {recommendation.priority.toUpperCase()}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-gray-900">Implementation Steps</h5>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {recommendation.implementation.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-medium text-gray-900">Expected Outcome</h5>
                <p className="text-sm text-gray-700">{recommendation.expectedOutcome}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Timeframe: {recommendation.timeframe}
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200">
                    Implement
                  </button>
                  <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                    Notify Patient
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Consult Physician
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderPatientOverview();
      case 'visualization':
        return renderDiseaseVisualization();
      case 'ai-prediction':
        return renderAIPrediction();
      case 'recommendations':
        return renderRecommendations();
      default:
        return renderPatientOverview();
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
              {/* Patient Selector */}
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} ({patient.age}y)
                  </option>
                ))}
              </select>

              {/* Alerts */}
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
                  <Bell className="w-5 h-5" />
                  {alerts.filter(a => !a.acknowledged).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {alerts.filter(a => !a.acknowledged).length}
                    </span>
                  )}
                </button>
              </div>

              {/* Refresh */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Patient Overview', icon: Users, description: 'Vitals and disease summary' },
              { id: 'visualization', label: 'Data Visualization', icon: BarChart3, description: 'Disease-specific charts' },
              { id: 'ai-prediction', label: 'AI Predictions', icon: Brain, description: 'Risk analysis and forecasts' },
              { id: 'recommendations', label: 'Care Recommendations', icon: Target, description: 'Action plans and interventions' }
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
