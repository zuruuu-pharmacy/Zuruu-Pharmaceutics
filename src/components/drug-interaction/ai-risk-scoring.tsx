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
  LineChart, 
  Scatter, 
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
  Calendar
} from 'lucide-react';

import { AIPrediction, Drug, PatientProfile, InteractionHeatmapData } from '@/types/drug-interaction';

interface AIRiskScoringProps {
  predictions: AIPrediction[];
  patientProfile?: PatientProfile;
  onViewDetails: (prediction: AIPrediction) => void;
  onGenerateReport: () => void;
}

export default function AIRiskScoring({ 
  predictions, 
  patientProfile, 
  onViewDetails, 
  onGenerateReport 
}: AIRiskScoringProps) {
  const [selectedPrediction, setSelectedPrediction] = useState<AIPrediction | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showTimeSeries, setShowTimeSeries] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const [heatmapData] = useState<InteractionHeatmapData>({
    drugs: predictions.map(p => p.drugPair.drugA).concat(predictions.map(p => p.drugPair.drugB)),
    interactions: predictions.map((p, index) => ({
      drugAIndex: index * 2,
      drugBIndex: index * 2 + 1,
      severity: p.predictedSeverity,
      type: p.predictedSeverity >= 80 ? 'major' : p.predictedSeverity >= 60 ? 'moderate' : 'minor'
    })),
    riskZones: predictions.map((p, index) => ({
      x: (index * 2) * 50 + 25,
      y: (index * 2 + 1) * 50 + 25,
      radius: Math.max(10, p.predictedSeverity / 5),
      severity: p.predictedSeverity
    }))
  });

  const filteredPredictions = predictions.filter(prediction => {
    if (filterSeverity === 'all') return true;
    if (filterSeverity === 'high') return prediction.predictedSeverity >= 80;
    if (filterSeverity === 'medium') return prediction.predictedSeverity >= 60 && prediction.predictedSeverity < 80;
    if (filterSeverity === 'low') return prediction.predictedSeverity < 60;
    return true;
  });

  const getSeverityColor = (severity: number) => {
    if (severity >= 80) return 'text-red-600 bg-red-100 border-red-200';
    if (severity >= 60) return 'text-orange-600 bg-orange-100 border-orange-200';
    if (severity >= 40) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-green-600 bg-green-100 border-green-200';
  };

  const getSeverityIcon = (severity: number) => {
    if (severity >= 80) return <XCircle className="w-4 h-4" />;
    if (severity >= 60) return <AlertTriangle className="w-4 h-4" />;
    if (severity >= 40) return <AlertCircle className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const handleGenerateNewPrediction = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
  };

  const renderHeatmap = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Interaction Risk Heatmap</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Share className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="relative h-96 bg-gray-50 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Interactive Heatmap Visualization</p>
            <p className="text-sm text-gray-400">Drug interaction risk zones and patterns</p>
          </div>
        </div>
        
        {/* Risk Zones */}
        {heatmapData.riskZones.map((zone, index) => (
          <div
            key={index}
            className="absolute rounded-full opacity-60"
            style={{
              left: zone.x - zone.radius / 2,
              top: zone.y - zone.radius / 2,
              width: zone.radius,
              height: zone.radius,
              backgroundColor: zone.severity >= 80 ? '#ef4444' : 
                              zone.severity >= 60 ? '#f59e0b' : 
                              zone.severity >= 40 ? '#eab308' : '#10b981'
            }}
          />
        ))}
      </div>
      
      <div className="mt-4 flex items-center justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-600">High Risk (≥80%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Medium Risk (60-79%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Low Risk (40-59%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Minimal Risk (<40%)</span>
        </div>
      </div>
    </div>
  );

  const renderTimeSeriesAnalysis = (prediction: AIPrediction) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Series Risk Analysis</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{prediction.timeSeriesAnalysis.peakRiskTime}h</div>
            <div className="text-sm text-gray-600">Peak Risk Time</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Activity className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{prediction.timeSeriesAnalysis.riskDuration}h</div>
            <div className="text-sm text-gray-600">Risk Duration</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 capitalize">{prediction.timeSeriesAnalysis.riskPattern}</div>
            <div className="text-sm text-gray-600">Risk Pattern</div>
          </div>
        </div>
        
        <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Risk Timeline Chart</p>
            <p className="text-xs text-gray-400">Interactive time series visualization</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatientSpecificFactors = (prediction: AIPrediction) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient-Specific Risk Factors</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Demographics</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Age</span>
              <span className="text-sm font-medium">{prediction.patientSpecificFactors.age} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Gender</span>
              <span className="text-sm font-medium capitalize">{prediction.patientSpecificFactors.gender}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Organ Function</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Renal Function</span>
              <span className={`text-sm font-medium px-2 py-1 rounded text-xs ${
                prediction.patientSpecificFactors.renalFunction === 'normal' ? 'bg-green-100 text-green-800' :
                prediction.patientSpecificFactors.renalFunction === 'mild' ? 'bg-yellow-100 text-yellow-800' :
                prediction.patientSpecificFactors.renalFunction === 'moderate' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {prediction.patientSpecificFactors.renalFunction}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Hepatic Function</span>
              <span className={`text-sm font-medium px-2 py-1 rounded text-xs ${
                prediction.patientSpecificFactors.hepaticFunction === 'normal' ? 'bg-green-100 text-green-800' :
                prediction.patientSpecificFactors.hepaticFunction === 'mild' ? 'bg-yellow-100 text-yellow-800' :
                prediction.patientSpecificFactors.hepaticFunction === 'moderate' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {prediction.patientSpecificFactors.hepaticFunction}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="font-medium text-gray-900 mb-3">Comorbidities</h4>
        <div className="flex flex-wrap gap-2">
          {prediction.patientSpecificFactors.comorbidities.map((comorbidity, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              {comorbidity}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="font-medium text-gray-900 mb-3">Allergies</h4>
        <div className="flex flex-wrap gap-2">
          {prediction.patientSpecificFactors.allergies.map((allergy, index) => (
            <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
              {allergy}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Brain className="w-8 h-8 text-purple-600" />
            <span>AI Predictive Risk Scoring</span>
          </h2>
          <p className="text-gray-600">Advanced AI models for interaction prediction and risk assessment</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">All Severities</option>
            <option value="high">High Risk (≥80%)</option>
            <option value="medium">Medium Risk (60-79%)</option>
            <option value="low">Low Risk (<60%)</option>
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

      {/* Heatmap Visualization */}
      {showHeatmap && renderHeatmap()}

      {/* Predictions List */}
      <div className="space-y-4">
        {filteredPredictions.map((prediction, index) => (
          <motion.div
            key={prediction.id}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {prediction.drugPair.drugA.name} + {prediction.drugPair.drugB.name}
                </h3>
                <p className="text-sm text-gray-600">{prediction.mechanisticBasis}</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getSeverityColor(prediction.predictedSeverity).split(' ')[0]}`}>
                    {prediction.predictedSeverity}%
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
                <h4 className="font-medium text-gray-900">Risk Factors</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {prediction.riskFactors.map((factor, factorIndex) => (
                    <span key={factorIndex} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <span className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 ${getSeverityColor(prediction.predictedSeverity)}`}>
                      {getSeverityIcon(prediction.predictedSeverity)}
                      <span>
                        {prediction.predictedSeverity >= 80 ? 'High Risk' :
                         prediction.predictedSeverity >= 60 ? 'Medium Risk' :
                         prediction.predictedSeverity >= 40 ? 'Low Risk' : 'Minimal Risk'}
                      </span>
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Model: {prediction.modelVersion}
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

            {/* Expanded Details */}
            <AnimatePresence>
              {selectedPrediction?.id === prediction.id && (
                <motion.div
                  className="mt-6 pt-6 border-t border-gray-200 space-y-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {renderTimeSeriesAnalysis(prediction)}
                  {renderPatientSpecificFactors(prediction)}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
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
