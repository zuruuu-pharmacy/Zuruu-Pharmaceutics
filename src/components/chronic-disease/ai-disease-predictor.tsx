"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Target, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Zap, 
  BarChart3, 
  PieChart, 
  RefreshCw, 
  Settings, 
  Download, 
  Share, 
  Eye, 
  Filter, 
  Search, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  Bell, 
  FileText, 
  Users, 
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
  Stethoscope,
  Thermometer,
  Scale,
  Monitor,
  Smartphone
} from 'lucide-react';

import { 
  AIPrediction, 
  AIAlert, 
  Patient, 
  ChronicDisease, 
  DiseaseType,
  VitalReading 
} from '@/types/chronic-disease';

interface AIDiseasePredictorProps {
  patient: Patient;
  predictions: AIPrediction[];
  alerts: AIAlert[];
  onViewDetails: (prediction: AIPrediction) => void;
  onGenerateReport: () => void;
  onAcknowledgeAlert: (alertId: string) => void;
}

export default function AIDiseasePredictor({ 
  patient, 
  predictions, 
  alerts, 
  onViewDetails, 
  onGenerateReport, 
  onAcknowledgeAlert 
}: AIDiseasePredictorProps) {
  const [selectedPrediction, setSelectedPrediction] = useState<AIPrediction | null>(null);
  const [showAlerts, setShowAlerts] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'disease_progression' | 'medication_response' | 'complication_risk' | 'adherence_risk'>('all');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'low' | 'moderate' | 'high' | 'critical'>('all');

  const filteredPredictions = predictions.filter(prediction => {
    const typeMatch = filterType === 'all' || prediction.predictionType === filterType;
    const severityMatch = filterSeverity === 'all' || 
      (prediction.riskScore >= 80 && filterSeverity === 'critical') ||
      (prediction.riskScore >= 60 && prediction.riskScore < 80 && filterSeverity === 'high') ||
      (prediction.riskScore >= 40 && prediction.riskScore < 60 && filterSeverity === 'moderate') ||
      (prediction.riskScore < 40 && filterSeverity === 'low');
    return typeMatch && severityMatch;
  });

  const filteredAlerts = alerts.filter(alert => {
    const severityMatch = filterSeverity === 'all' || alert.severity === filterSeverity;
    return severityMatch;
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

  const getPredictionTypeIcon = (type: string) => {
    switch (type) {
      case 'disease_progression': return <TrendingUp className="w-4 h-4" />;
      case 'medication_response': return <Pill className="w-4 h-4" />;
      case 'complication_risk': return <AlertTriangle className="w-4 h-4" />;
      case 'adherence_risk': return <Target className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const getPredictionTypeColor = (type: string) => {
    switch (type) {
      case 'disease_progression': return 'text-blue-600 bg-blue-100';
      case 'medication_response': return 'text-green-600 bg-green-100';
      case 'complication_risk': return 'text-red-600 bg-red-100';
      case 'adherence_risk': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (riskScore: number) => {
    if (riskScore >= 80) return 'text-red-600 bg-red-100 border-red-200';
    if (riskScore >= 60) return 'text-orange-600 bg-orange-100 border-orange-200';
    if (riskScore >= 40) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-green-600 bg-green-100 border-green-200';
  };

  const getRiskIcon = (riskScore: number) => {
    if (riskScore >= 80) return <XCircle className="w-4 h-4" />;
    if (riskScore >= 60) return <AlertTriangle className="w-4 h-4" />;
    if (riskScore >= 40) return <AlertCircle className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
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

  const handleGenerateNewPrediction = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Brain className="w-8 h-8 text-purple-600" />
            <span>AI Disease Predictor</span>
          </h2>
          <p className="text-gray-600">Advanced AI models for disease progression and risk prediction</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="disease_progression">Disease Progression</option>
            <option value="medication_response">Medication Response</option>
            <option value="complication_risk">Complication Risk</option>
            <option value="adherence_risk">Adherence Risk</option>
          </select>
          
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical (≥80%)</option>
            <option value="high">High (60-79%)</option>
            <option value="moderate">Moderate (40-59%)</option>
            <option value="low">Low (&lt;40%)</option>
          </select>
          
          <button
            onClick={handleGenerateNewPrediction}
            disabled={isGenerating}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            <Zap className="w-4 h-4" />
            <span>{isGenerating ? 'Generating...' : 'Generate Prediction'}</span>
          </button>
          
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* AI Model Status */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">AI Model Status</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Model Active</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">v2.1.3</div>
            <div className="text-sm text-gray-600">Model Version</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">87.5%</div>
            <div className="text-sm text-gray-600">Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">2.3s</div>
            <div className="text-sm text-gray-600">Avg Response</div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Real-Time Alerts</h3>
          <button
            onClick={() => setShowAlerts(!showAlerts)}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            {showAlerts ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
        
        <AnimatePresence>
          {showAlerts && (
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {filteredAlerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${getAlertColor(alert.alertType)} ${
                    !alert.acknowledged ? 'ring-2 ring-teal-200' : ''
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.alertType)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{alert.title}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                          alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                          alert.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {alert.timestamp.toLocaleString()}
                        </span>
                        {!alert.acknowledged && (
                          <button
                            onClick={() => onAcknowledgeAlert(alert.id)}
                            className="px-3 py-1 text-xs bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200"
                          >
                            Acknowledge
                          </button>
                        )}
                      </div>
                    </div>
                    {!alert.acknowledged && (
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Predictions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">AI Predictions</h3>
          <div className="text-sm text-gray-600">
            {filteredPredictions.length} prediction{filteredPredictions.length !== 1 ? 's' : ''} found
          </div>
        </div>
        
        {filteredPredictions.length > 0 ? (
          filteredPredictions.map((prediction, index) => (
            <motion.div
              key={prediction.id}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getDiseaseIcon(prediction.diseaseType)}
                    <h3 className="text-lg font-semibold text-gray-900">{prediction.prediction}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 ${getPredictionTypeColor(prediction.predictionType)}`}>
                      {getPredictionTypeIcon(prediction.predictionType)}
                      <span className="capitalize">{prediction.predictionType.replace('_', ' ')}</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Timeframe: {prediction.timeframe}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getRiskColor(prediction.riskScore).split(' ')[0]}`}>
                      {prediction.riskScore}%
                    </div>
                    <div className="text-sm text-gray-600">Risk Score</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-semibold ${getConfidenceColor(prediction.confidence).split(' ')[0]}`}>
                      {prediction.confidence}%
                    </div>
                    <div className="text-sm text-gray-600">Confidence</div>
                  </div>
                  <button
                    onClick={() => setSelectedPrediction(selectedPrediction?.id === prediction.id ? null : prediction)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">Contributing Factors</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {prediction.factors.map((factor, factorIndex) => (
                      <span key={factorIndex} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">AI Recommendations</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {prediction.recommendations.map((rec, recIndex) => (
                      <li key={recIndex}>{rec}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <span className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 ${getRiskColor(prediction.riskScore)}`}>
                        {getRiskIcon(prediction.riskScore)}
                        <span>
                          {prediction.riskScore >= 80 ? 'Critical Risk' :
                           prediction.riskScore >= 60 ? 'High Risk' :
                           prediction.riskScore >= 40 ? 'Moderate Risk' : 'Low Risk'}
                        </span>
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Model: {prediction.modelVersion}
                    </div>
                    <div className="text-sm text-gray-600">
                      Expires: {prediction.expiresAt.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onViewDetails(prediction)}
                      className="px-3 py-1 text-sm bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200"
                    >
                      View Details
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      Export
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-100 text-center">
            <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No AI Predictions Available</h3>
            <p className="text-gray-600">Generate AI predictions to see risk analysis results.</p>
          </div>
        )}
      </div>

      {/* Generate Report Button */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Risk Assessment Report</h3>
            <p className="text-sm text-gray-600">Generate comprehensive risk analysis report</p>
          </div>
          <button
            onClick={onGenerateReport}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}