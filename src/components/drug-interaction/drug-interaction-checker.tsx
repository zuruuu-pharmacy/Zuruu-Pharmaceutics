"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Brain, 
  Shield, 
  Activity, 
  Zap, 
  Eye, 
  Download, 
  Share, 
  Filter, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  Settings, 
  Bell, 
  FileText, 
  Users, 
  Pill, 
  Heart, 
  AlertCircle, 
  Info, 
  HelpCircle, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Target, 
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
  BarChart3,
  PieChart,
  LineChart,
  Scatter
} from 'lucide-react';

import { 
  Drug, 
  DrugInteraction, 
  AIPrediction, 
  SafetyRecommendation, 
  InteractionAlert, 
  PatientProfile, 
  InteractionCheckRequest, 
  InteractionCheckResult, 
  DrugSearchResult,
  InteractionHeatmapData
} from '@/types/drug-interaction';

interface DrugInteractionCheckerProps {
  onViewDetails: (interaction: DrugInteraction) => void;
  onGenerateReport: (result: InteractionCheckResult) => void;
  onSendToPrescriber: (interaction: DrugInteraction) => void;
  patientProfile?: PatientProfile;
}

export default function DrugInteractionChecker({ 
  onViewDetails, 
  onGenerateReport, 
  onSendToPrescriber,
  patientProfile 
}: DrugInteractionCheckerProps) {
  const [activeView, setActiveView] = useState<'analysis' | 'ai-prediction' | 'recommendations'>('analysis');
  const [searchTermA, setSearchTermA] = useState('');
  const [searchTermB, setSearchTermB] = useState('');
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>([]);
  const [searchResultsA, setSearchResultsA] = useState<DrugSearchResult[]>([]);
  const [searchResultsB, setSearchResultsB] = useState<DrugSearchResult[]>([]);
  const [showSearchA, setShowSearchA] = useState(false);
  const [showSearchB, setShowSearchB] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<InteractionCheckResult | null>(null);
  const [alerts, setAlerts] = useState<InteractionAlert[]>([]);
  const [showPatientWarnings, setShowPatientWarnings] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);

  // Mock data for demonstration
  const [mockDrugs] = useState<Drug[]>([
    {
      id: '1',
      name: 'Warfarin',
      genericName: 'Warfarin',
      brandName: 'Coumadin',
      drugClass: 'Anticoagulant',
      therapeuticClass: 'Vitamin K Antagonist',
      mechanism: 'Inhibits vitamin K epoxide reductase',
      indications: ['Atrial fibrillation', 'Deep vein thrombosis', 'Pulmonary embolism'],
      contraindications: ['Active bleeding', 'Severe hypertension', 'Pregnancy'],
      sideEffects: ['Bleeding', 'Bruising', 'Nausea'],
      dosageForm: 'Tablet',
      strength: '5mg',
      route: 'Oral',
      halfLife: 40,
      metabolism: ['CYP2C9', 'CYP1A2', 'CYP3A4'],
      excretion: 'Renal',
      proteinBinding: 99,
      bioavailability: 100,
      cypEnzymes: {
        substrate: ['CYP2C9', 'CYP1A2', 'CYP3A4'],
        inhibitor: [],
        inducer: []
      },
      pregnancyCategory: 'X',
      lactationRisk: 'L4',
      blackBoxWarning: 'Risk of bleeding',
      rxNormId: '855332',
      drugBankId: 'DB00682',
      pubChemId: '54678486',
      fdaId: 'FDA-12345'
    },
    {
      id: '2',
      name: 'Amoxicillin',
      genericName: 'Amoxicillin',
      brandName: 'Amoxil',
      drugClass: 'Antibiotic',
      therapeuticClass: 'Penicillin',
      mechanism: 'Inhibits bacterial cell wall synthesis',
      indications: ['Bacterial infections', 'Respiratory infections', 'UTI'],
      contraindications: ['Penicillin allergy', 'Severe renal impairment'],
      sideEffects: ['Diarrhea', 'Nausea', 'Rash'],
      dosageForm: 'Capsule',
      strength: '500mg',
      route: 'Oral',
      halfLife: 1.3,
      metabolism: ['Hepatic'],
      excretion: 'Renal',
      proteinBinding: 20,
      bioavailability: 95,
      cypEnzymes: {
        substrate: [],
        inhibitor: [],
        inducer: []
      },
      pregnancyCategory: 'B',
      lactationRisk: 'L2',
      rxNormId: '7980',
      drugBankId: 'DB01060',
      pubChemId: '33613',
      fdaId: 'FDA-67890'
    }
  ]);

  const [mockInteractions] = useState<DrugInteraction[]>([
    {
      id: '1',
      drugA: mockDrugs[0],
      drugB: mockDrugs[1],
      interactionType: 'moderate',
      severity: 65,
      mechanism: 'Disruption of gut flora leading to reduced vitamin K synthesis',
      clinicalConsequence: 'May increase INR and bleeding risk',
      evidenceLevel: 'high',
      sources: [
        {
          name: 'DrugBank',
          url: 'https://go.drugbank.com',
          reliability: 'high',
          lastUpdated: new Date()
        }
      ],
      onset: 'delayed',
      duration: 'medium',
      reversibility: 'reversible',
      management: 'Monitor INR closely, consider dose adjustment',
      monitoring: ['INR', 'Bleeding signs', 'Stool consistency'],
      contraindicated: false,
      requiresDoseAdjustment: true,
      alternativeDrugs: [],
      lastUpdated: new Date(),
      confidence: 92
    }
  ]);

  const [mockAIPredictions] = useState<AIPrediction[]>([
    {
      id: '1',
      drugPair: {
        drugA: mockDrugs[0],
        drugB: mockDrugs[1]
      },
      predictedSeverity: 68,
      confidence: 87,
      mechanisticBasis: 'Shared metabolic pathways and gut flora disruption',
      riskFactors: ['Age >65', 'Renal impairment', 'Concurrent NSAID use'],
      timeSeriesAnalysis: {
        peakRiskTime: 72,
        riskDuration: 168,
        riskPattern: 'delayed'
      },
      patientSpecificFactors: {
        age: 72,
        gender: 'male',
        comorbidities: ['Hypertension', 'Diabetes'],
        allergies: ['Penicillin'],
        currentMedications: [],
        renalFunction: 'mild',
        hepaticFunction: 'normal'
      },
      modelVersion: 'v2.1.3',
      trainingData: ['FAERS', 'MedDRA', 'Internal Data'],
      lastUpdated: new Date()
    }
  ]);

  const [mockRecommendations] = useState<SafetyRecommendation[]>([
    {
      id: '1',
      interactionId: '1',
      priority: 'high',
      action: 'monitor',
      description: 'Monitor INR closely during antibiotic therapy',
      rationale: 'Antibiotics can disrupt gut flora and affect vitamin K synthesis',
      implementation: [
        'Check INR before starting antibiotic',
        'Monitor INR every 2-3 days during therapy',
        'Adjust warfarin dose as needed'
      ],
      monitoring: ['INR', 'Bleeding signs', 'Stool consistency'],
      followUp: 'Recheck INR 1 week after antibiotic completion',
      alternativeOptions: [
        {
          drug: mockDrugs[1],
          reason: 'Lower interaction risk',
          interactionScore: 25
        }
      ],
      requiresPrescriberConsultation: true,
      pharmacistOverrideAllowed: true,
      documentationRequired: true
    }
  ]);

  const handleDrugSearch = useCallback(async (query: string, type: 'A' | 'B') => {
    if (query.length < 2) return;
    
    // Simulate API call
    const results = mockDrugs
      .filter(drug => 
        drug.name.toLowerCase().includes(query.toLowerCase()) ||
        drug.genericName.toLowerCase().includes(query.toLowerCase())
      )
      .map(drug => ({
        drug,
        score: 95,
        matchType: 'exact' as const,
        highlightedName: drug.name
      }))
      .slice(0, 5);

    if (type === 'A') {
      setSearchResultsA(results);
    } else {
      setSearchResultsB(results);
    }
  }, []);

  const handleDrugSelect = (drug: Drug, type: 'A' | 'B') => {
    if (type === 'A') {
      setSearchTermA(drug.name);
      setSelectedDrugs(prev => [drug, ...prev.filter(d => d.id !== drug.id)]);
    } else {
      setSearchTermB(drug.name);
      setSelectedDrugs(prev => [drug, ...prev.filter(d => d.id !== drug.id)]);
    }
    setShowSearchA(false);
    setShowSearchB(false);
  };

  const handleAddDrug = () => {
    // Add more drugs to check
    setSelectedDrugs(prev => [...prev, mockDrugs[0]]);
  };

  const handleRemoveDrug = (drugId: string) => {
    setSelectedDrugs(prev => prev.filter(d => d.id !== drugId));
  };

  const handleRunCheck = async () => {
    if (selectedDrugs.length < 2) return;
    
    setIsChecking(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result: InteractionCheckResult = {
      requestId: `req_${Date.now()}`,
      timestamp: new Date(),
      interactions: mockInteractions,
      aiPredictions: mockAIPredictions,
      recommendations: mockRecommendations,
      alerts: [],
      summary: {
        totalInteractions: 1,
        majorInteractions: 0,
        moderateInteractions: 1,
        minorInteractions: 0,
        contraindicated: 0,
        requiresMonitoring: 1,
        overallRiskScore: 65
      },
      processingTime: 2000,
      modelVersion: 'v2.1.3'
    };
    
    setCheckResult(result);
    setIsChecking(false);
  };

  const getSeverityColor = (severity: string | number) => {
    if (typeof severity === 'string') {
      switch (severity) {
        case 'major': return 'text-red-600 bg-red-100 border-red-200';
        case 'moderate': return 'text-orange-600 bg-orange-100 border-orange-200';
        case 'minor': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
        case 'none': return 'text-green-600 bg-green-100 border-green-200';
        default: return 'text-gray-600 bg-gray-100 border-gray-200';
      }
    } else {
      if (severity >= 80) return 'text-red-600 bg-red-100 border-red-200';
      if (severity >= 60) return 'text-orange-600 bg-orange-100 border-orange-200';
      if (severity >= 40) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      return 'text-green-600 bg-green-100 border-green-200';
    }
  };

  const getSeverityIcon = (severity: string | number) => {
    if (typeof severity === 'string') {
      switch (severity) {
        case 'major': return <XCircle className="w-4 h-4" />;
        case 'moderate': return <AlertTriangle className="w-4 h-4" />;
        case 'minor': return <AlertCircle className="w-4 h-4" />;
        case 'none': return <CheckCircle className="w-4 h-4" />;
        default: return <Info className="w-4 h-4" />;
      }
    } else {
      if (severity >= 80) return <XCircle className="w-4 h-4" />;
      if (severity >= 60) return <AlertTriangle className="w-4 h-4" />;
      if (severity >= 40) return <AlertCircle className="w-4 h-4" />;
      return <CheckCircle className="w-4 h-4" />;
    }
  };

  const renderAnalysisView = () => (
    <div className="space-y-6">
      {/* Drug Input Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Drug Interaction Analysis</h3>
        
        <div className="space-y-4">
          {/* Drug A Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Drug A</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for drug A..."
                value={searchTermA}
                onChange={(e) => {
                  setSearchTermA(e.target.value);
                  handleDrugSearch(e.target.value, 'A');
                }}
                onFocus={() => setShowSearchA(true)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            
            <AnimatePresence>
              {showSearchA && searchResultsA.length > 0 && (
                <motion.div
                  className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {searchResultsA.map((result) => (
                    <button
                      key={result.drug.id}
                      onClick={() => handleDrugSelect(result.drug, 'A')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <Pill className="w-4 h-4 text-teal-600" />
                      <div>
                        <div className="font-medium text-gray-900">{result.drug.name}</div>
                        <div className="text-sm text-gray-500">{result.drug.genericName}</div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Drug B Input */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Drug B</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for drug B..."
                value={searchTermB}
                onChange={(e) => {
                  setSearchTermB(e.target.value);
                  handleDrugSearch(e.target.value, 'B');
                }}
                onFocus={() => setShowSearchB(true)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            
            <AnimatePresence>
              {showSearchB && searchResultsB.length > 0 && (
                <motion.div
                  className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {searchResultsB.map((result) => (
                    <button
                      key={result.drug.id}
                      onClick={() => handleDrugSelect(result.drug, 'B')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <Pill className="w-4 h-4 text-teal-600" />
                      <div>
                        <div className="font-medium text-gray-900">{result.drug.name}</div>
                        <div className="text-sm text-gray-500">{result.drug.genericName}</div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Add More Drugs */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleAddDrug}
              className="flex items-center space-x-2 px-4 py-2 text-teal-600 border border-teal-300 rounded-lg hover:bg-teal-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add More Drugs</span>
            </button>
            
            <button
              onClick={handleRunCheck}
              disabled={selectedDrugs.length < 2 || isChecking}
              className="flex items-center space-x-2 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Brain className="w-4 h-4" />
              <span>{isChecking ? 'Checking...' : 'Run AI Check'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Selected Drugs */}
      {selectedDrugs.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Drugs</h3>
          <div className="flex flex-wrap gap-3">
            {selectedDrugs.map((drug) => (
              <motion.div
                key={drug.id}
                className="flex items-center space-x-2 px-3 py-2 bg-teal-100 text-teal-800 rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Pill className="w-4 h-4" />
                <span className="font-medium">{drug.name}</span>
                <button
                  onClick={() => handleRemoveDrug(drug.id)}
                  className="text-teal-600 hover:text-teal-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {checkResult && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Interaction Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{checkResult.summary.totalInteractions}</div>
                <div className="text-sm text-gray-600">Total Interactions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{checkResult.summary.majorInteractions}</div>
                <div className="text-sm text-gray-600">Major</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{checkResult.summary.moderateInteractions}</div>
                <div className="text-sm text-gray-600">Moderate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{checkResult.summary.minorInteractions}</div>
                <div className="text-sm text-gray-600">Minor</div>
              </div>
            </div>
          </div>

          {/* Interaction Details */}
          {checkResult.interactions.map((interaction) => (
            <motion.div
              key={interaction.id}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {interaction.drugA.name} + {interaction.drugB.name}
                  </h4>
                  <p className="text-sm text-gray-600">{interaction.mechanism}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 text-sm rounded-full flex items-center space-x-1 ${getSeverityColor(interaction.interactionType)}`}>
                    {getSeverityIcon(interaction.interactionType)}
                    <span className="capitalize">{interaction.interactionType}</span>
                  </span>
                  <button
                    onClick={() => onViewDetails(interaction)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-gray-900">Clinical Consequence</h5>
                  <p className="text-sm text-gray-700">{interaction.clinicalConsequence}</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900">Management</h5>
                  <p className="text-sm text-gray-700">{interaction.management}</p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900">Monitoring Required</h5>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {interaction.monitoring.map((item, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Confidence: {interaction.confidence}%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Activity className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Evidence: {interaction.evidenceLevel}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onSendToPrescriber(interaction)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                    >
                      Send to Prescriber
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
      )}
    </div>
  );

  const renderAIPredictionView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Predictive Risk Analysis</h3>
        
        {mockAIPredictions.map((prediction) => (
          <motion.div
            key={prediction.id}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Risk Score */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Predicted Risk Score</h4>
                <p className="text-sm text-gray-600">AI-powered interaction prediction</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-orange-600">{prediction.predictedSeverity}%</div>
                <div className="text-sm text-gray-600">Confidence: {prediction.confidence}%</div>
              </div>
            </div>

            {/* Mechanistic Basis */}
            <div>
              <h5 className="font-medium text-gray-900">Mechanistic Basis</h5>
              <p className="text-sm text-gray-700">{prediction.mechanisticBasis}</p>
            </div>

            {/* Risk Factors */}
            <div>
              <h5 className="font-medium text-gray-900">Risk Factors</h5>
              <div className="flex flex-wrap gap-2 mt-1">
                {prediction.riskFactors.map((factor, index) => (
                  <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                    {factor}
                  </span>
                ))}
              </div>
            </div>

            {/* Time Series Analysis */}
            <div>
              <h5 className="font-medium text-gray-900">Time Series Analysis</h5>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">{prediction.timeSeriesAnalysis.peakRiskTime}h</div>
                  <div className="text-xs text-gray-600">Peak Risk Time</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">{prediction.timeSeriesAnalysis.riskDuration}h</div>
                  <div className="text-xs text-gray-600">Risk Duration</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 capitalize">{prediction.timeSeriesAnalysis.riskPattern}</div>
                  <div className="text-xs text-gray-600">Risk Pattern</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderRecommendationsView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Recommendations & Actions</h3>
        
        {mockRecommendations.map((recommendation) => (
          <motion.div
            key={recommendation.id}
            className="border border-gray-200 rounded-lg p-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{recommendation.description}</h4>
                <p className="text-sm text-gray-600">{recommendation.rationale}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                recommendation.priority === 'high' ? 'bg-red-100 text-red-800' :
                recommendation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {recommendation.priority} priority
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
                <h5 className="font-medium text-gray-900">Monitoring Required</h5>
                <div className="flex flex-wrap gap-2 mt-1">
                  {recommendation.monitoring.map((item, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Follow-up: {recommendation.followUp}
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200">
                    Implement
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Override
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
    switch (activeView) {
      case 'analysis':
        return renderAnalysisView();
      case 'ai-prediction':
        return renderAIPredictionView();
      case 'recommendations':
        return renderRecommendationsView();
      default:
        return renderAnalysisView();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Shield className="w-8 h-8 text-red-600" />
            <span>AI Drug Interaction Checker</span>
          </h2>
          <p className="text-gray-600">Safeguard patients with AI-powered interaction detection</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowPatientWarnings(!showPatientWarnings)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>Patient Warnings</span>
          </button>
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Heatmap</span>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'analysis', label: 'Interaction Analysis', icon: Search },
              { id: 'ai-prediction', label: 'AI Risk Score', icon: Brain },
              { id: 'recommendations', label: 'Safety Actions', icon: Shield }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeView === tab.id
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
    </div>
  );
}
