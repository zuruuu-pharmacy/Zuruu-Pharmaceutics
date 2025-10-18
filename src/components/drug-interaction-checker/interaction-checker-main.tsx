/**
 * Main Drug Interaction Checker Component
 * Provides the primary interface for checking drug interactions
 */

'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Loader2,
  Shield,
  FileText,
  Download,
  Settings,
  RefreshCw,
  Zap,
  Brain,
  Activity,
  Clock,
  Database,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Filter,
  SortAsc,
  SortDesc
} from 'lucide-react';

import {
  InteractionCheckRequest,
  InteractionCheckResponse,
  DrugInteraction,
  Drug,
  PatientFacts,
  InteractionSummary,
  AlternativeDrug,
  MonitoringPlan,
  ExplainabilityInfo
} from '@/types/drug-interaction-checker';

// Local interface for drugs with ID
interface DrugWithId extends Drug {
  id: string;
}

import { drugInteractionCheckerService } from '@/services/drug-interaction-checker';

interface InteractionCheckerMainProps {
  patientId?: string;
  initialDrugs?: Drug[];
  onInteractionDetected?: (interactions: DrugInteraction[]) => void;
  onAlternativeSuggested?: (alternatives: AlternativeDrug[]) => void;
  showPatientSelector?: boolean;
  showAdvancedOptions?: boolean;
  compactMode?: boolean;
}

export const InteractionCheckerMain: React.FC<InteractionCheckerMainProps> = ({
  patientId = 'P-001234',
  initialDrugs = [],
  onInteractionDetected,
  onAlternativeSuggested,
  showPatientSelector = true,
  showAdvancedOptions = true,
  compactMode = false
}) => {
  // State management
  const [drugs, setDrugs] = useState<DrugWithId[]>(initialDrugs.map((drug, index) => ({ ...drug, id: `drug-${index}` })));
  const [patientFacts, setPatientFacts] = useState<PatientFacts>({
    patient_id: patientId,
    age: 50,
    sex: 'male',
    weight_kg: 70,
    pregnancy: false,
    allergies: [],
    comorbidities: [],
    current_labs: []
  });

  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<InteractionCheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedInteraction, setSelectedInteraction] = useState<DrugInteraction | null>(null);
  const [showExplainability, setShowExplainability] = useState(false);
  const [explainabilityData, setExplainabilityData] = useState<ExplainabilityInfo | null>(null);

  // UI state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sortBy, setSortBy] = useState<'severity' | 'confidence' | 'drugs'>('severity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterSeverity, setFilterSeverity] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState<Set<string>>(new Set());

  // Options
  const [options, setOptions] = useState({
    include_ml_predictions: true,
    personalization_enabled: true,
    include_alternatives: true,
    include_monitoring_plans: true,
    severity_threshold: 'moderate' as const,
    max_alternatives: 5
  });

  /**
   * Add a new drug to the list
   */
  const addDrug = useCallback((drug: Drug) => {
    const newDrug: DrugWithId = {
      ...drug,
      id: `drug-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setDrugs(prev => [...prev, newDrug]);
  }, []);

  /**
   * Remove a drug from the list
   */
  const removeDrug = useCallback((drugId: string) => {
    setDrugs(prev => prev.filter(drug => drug.id !== drugId));
  }, []);

  /**
   * Update a drug in the list
   */
  const updateDrug = useCallback((drugId: string, updates: Partial<DrugWithId>) => {
    setDrugs(prev => prev.map(drug => 
      drug.id === drugId ? { ...drug, ...updates } : drug
    ));
  }, []);

  /**
   * Run interaction check
   */
  const runInteractionCheck = useCallback(async () => {
    if (drugs.length < 2) {
      setError('Please add at least 2 drugs to check for interactions');
      return;
    }

    setIsChecking(true);
    setError(null);
    setResults(null);

    try {
      const request: InteractionCheckRequest = {
        patient_id: patientId,
        patient_facts: patientFacts,
        drugs: drugs.map(({ id, ...drug }) => drug),
        context: {
          user_id: 'pharmacist-001',
          source: 'interaction_checker_ui'
        },
        options
      };

      const response = await drugInteractionCheckerService.checkInteractions(request);
      setResults(response);

      // Notify parent components
      if (onInteractionDetected) {
        onInteractionDetected(response.interactions);
      }
      if (onAlternativeSuggested && response.alternatives) {
        onAlternativeSuggested(response.alternatives);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check interactions');
    } finally {
      setIsChecking(false);
    }
  }, [drugs, patientFacts, patientId, options, onInteractionDetected, onAlternativeSuggested]);

  /**
   * Get explainability for an interaction
   */
  const getExplainability = useCallback(async (interaction: DrugInteraction) => {
    try {
      const explainability = await drugInteractionCheckerService.generateExplainability(
        interaction.id,
        drugs,
        patientFacts
      );
      setExplainabilityData(explainability);
      setShowExplainability(true);
    } catch (err) {
      console.error('Failed to get explainability:', err);
    }
  }, [drugs, patientFacts]);

  /**
   * Sort interactions
   */
  const sortedInteractions = useMemo(() => {
    if (!results?.interactions) return [];

    let sorted = [...results.interactions];

    // Apply severity filter
    if (filterSeverity.length > 0) {
      sorted = sorted.filter(interaction => filterSeverity.includes(interaction.severity));
    }

    // Sort by selected criteria
    sorted.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'severity':
          const severityOrder = { severe: 4, major: 3, moderate: 2, minor: 1, none: 0 };
          comparison = severityOrder[a.severity] - severityOrder[b.severity];
          break;
        case 'confidence':
          comparison = a.confidence - b.confidence;
          break;
        case 'drugs':
          comparison = a.drugs.join(', ').localeCompare(b.drugs.join(', '));
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [results?.interactions, sortBy, sortOrder, filterSeverity]);

  /**
   * Get severity color
   */
  const getSeverityColor = (severity: string): string => {
    const colors = {
      severe: 'text-red-600 bg-red-50 border-red-200',
      major: 'text-orange-600 bg-orange-50 border-orange-200',
      moderate: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      minor: 'text-blue-600 bg-blue-50 border-blue-200',
      none: 'text-green-600 bg-green-50 border-green-200'
    };
    return colors[severity as keyof typeof colors] || colors.none;
  };

  /**
   * Get severity icon
   */
  const getSeverityIcon = (severity: string) => {
    const icons = {
      severe: <XCircle className="w-4 h-4" />,
      major: <AlertTriangle className="w-4 h-4" />,
      moderate: <Info className="w-4 h-4" />,
      minor: <CheckCircle className="w-4 h-4" />,
      none: <CheckCircle className="w-4 h-4" />
    };
    return icons[severity as keyof typeof icons] || icons.none;
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${compactMode ? 'p-4' : 'p-6'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Drug Interaction Checker</h2>
            <p className="text-sm text-gray-500">AI-powered interaction detection and analysis</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {showAdvancedOptions && (
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Options</span>
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
          
          <button
            onClick={runInteractionCheck}
            disabled={isChecking || drugs.length < 2}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isChecking ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Zap className="w-4 h-4" />
            )}
            <span>Check Interactions</span>
          </button>
        </div>
      </div>

      {/* Drug Input Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Drugs to Check</h3>
          <span className="text-sm text-gray-500">{drugs.length} drugs added</span>
        </div>

        {/* Drug List */}
        <div className="space-y-3">
          {drugs.map((drug, index) => (
            <div key={drug.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{drug.name}</span>
                  {drug.strength && (
                    <span className="text-sm text-gray-500">({drug.strength})</span>
                  )}
                </div>
                {drug.generic_name && drug.generic_name !== drug.name && (
                  <p className="text-xs text-gray-500">Generic: {drug.generic_name}</p>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => removeDrug(drug.id)}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Add Drug Button */}
          <button
            onClick={() => addDrug({ name: 'New Drug', strength: '', dose: '', route: 'oral', frequency: '' })}
            className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
          >
            <div className="flex items-center justify-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Add Drug</span>
            </div>
          </button>
        </div>
      </div>

      {/* Advanced Options */}
      {showAdvanced && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Advanced Options</h4>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.include_ml_predictions}
                onChange={(e) => setOptions(prev => ({ ...prev, include_ml_predictions: e.target.checked }))}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Include ML predictions</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.personalization_enabled}
                onChange={(e) => setOptions(prev => ({ ...prev, personalization_enabled: e.target.checked }))}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Enable personalization</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.include_alternatives}
                onChange={(e) => setOptions(prev => ({ ...prev, include_alternatives: e.target.checked }))}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Include alternatives</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={options.include_monitoring_plans}
                onChange={(e) => setOptions(prev => ({ ...prev, include_monitoring_plans: e.target.checked }))}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Include monitoring plans</span>
            </label>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Results Section */}
      {results && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-blue-900">Interaction Summary</h3>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-700">
                  {results.metadata.processing_time_ms}ms
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">{results.summary.total_interactions}</div>
                <div className="text-sm text-blue-700">Total Interactions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">{results.summary.max_severity}</div>
                <div className="text-sm text-blue-700">Max Severity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">
                  {Math.round(results.summary.estimated_risk_score * 100)}%
                </div>
                <div className="text-sm text-blue-700">Risk Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">
                  {results.summary.requires_attention ? 'Yes' : 'No'}
                </div>
                <div className="text-sm text-blue-700">Attention Needed</div>
              </div>
            </div>
          </div>

          {/* Filters and Sorting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={filterSeverity.join(',')}
                  onChange={(e) => setFilterSeverity(e.target.value ? e.target.value.split(',') : [])}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="">All Severities</option>
                  <option value="severe">Severe</option>
                  <option value="major">Major</option>
                  <option value="moderate">Moderate</option>
                  <option value="minor">Minor</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="severity">Severity</option>
                <option value="confidence">Confidence</option>
                <option value="drugs">Drug Names</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Interactions List */}
          <div className="space-y-4">
            {sortedInteractions.map((interaction) => (
              <div
                key={interaction.id}
                className={`border rounded-lg p-4 ${getSeverityColor(interaction.severity)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getSeverityIcon(interaction.severity)}
                      <h4 className="font-medium">{interaction.drugs.join(' + ')}</h4>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/50">
                        {interaction.severity.toUpperCase()}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/50">
                        {Math.round(interaction.confidence * 100)}% confidence
                      </span>
                    </div>
                    
                    <p className="text-sm mb-2">{interaction.clinical_consequence}</p>
                    
                    {interaction.mechanism && (
                      <p className="text-xs opacity-75 mb-2">
                        <strong>Mechanism:</strong> {interaction.mechanism}
                      </p>
                    )}

                    {/* Recommendations */}
                    {interaction.recommendations && interaction.recommendations.length > 0 && (
                      <div className="mt-3">
                        <h5 className="text-sm font-medium mb-2">Recommendations:</h5>
                        <ul className="text-sm space-y-1">
                          {interaction.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="w-1.5 h-1.5 bg-current rounded-full mt-2 flex-shrink-0" />
                              <span>{rec.reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => getExplainability(interaction)}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded transition-colors"
                      title="Explain why"
                    >
                      <Brain className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => setShowDetails(prev => {
                        const newSet = new Set(prev);
                        if (newSet.has(interaction.id)) {
                          newSet.delete(interaction.id);
                        } else {
                          newSet.add(interaction.id);
                        }
                        return newSet;
                      })}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded transition-colors"
                      title="Toggle details"
                    >
                      {showDetails.has(interaction.id) ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {showDetails.has(interaction.id) && (
                  <div className="mt-4 pt-4 border-t border-current/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Evidence */}
                      {interaction.evidence && interaction.evidence.length > 0 && (
                        <div>
                          <h6 className="text-sm font-medium mb-2">Evidence:</h6>
                          <ul className="text-xs space-y-1">
                            {interaction.evidence.map((evidence, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <Database className="w-3 h-3" />
                                <span>{evidence.source}</span>
                                {evidence.url && (
                                  <a
                                    href={evidence.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                  >
                                    View
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Clinical Consequence */}
                      {interaction.clinical_consequence && (
                        <div>
                          <h6 className="text-sm font-medium mb-2">Clinical Consequence:</h6>
                          <p className="text-xs">{interaction.clinical_consequence}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Alternatives */}
          {results.alternatives && results.alternatives.length > 0 && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-medium text-green-900 mb-3">Alternative Drugs</h3>
              <div className="space-y-3">
                {results.alternatives.map((alt, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                    <div>
                      <div className="font-medium text-green-900">{alt.drug_name}</div>
                      <div className="text-sm text-green-700">{alt.reason}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-green-600">
                        Efficacy: {Math.round(alt.efficacy_rating * 100)}%
                      </div>
                      <div className="text-sm text-green-600">
                        Safety: {Math.round(alt.safety_rating * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Monitoring Plans */}
          {results.monitoring_recommendations && results.monitoring_recommendations.length > 0 && (
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="text-lg font-medium text-purple-900 mb-3">Monitoring Plans</h3>
              <div className="space-y-3">
                {results.monitoring_recommendations.map((plan, index) => (
                  <div key={index} className="p-3 bg-white rounded border">
                    <div className="font-medium text-purple-900 mb-2">Monitoring Plan {index + 1}</div>
                    <div className="text-sm text-purple-700 space-y-1">
                      <div><strong>Frequency:</strong> {plan.frequency}</div>
                      <div><strong>Duration:</strong> {plan.duration}</div>
                      <div><strong>Tests:</strong> {plan.lab_tests.map(test => test.test_name).join(', ')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Explainability Modal */}
      {showExplainability && explainabilityData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">AI Explanation</h3>
              <button
                onClick={() => setShowExplainability(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">SHAP Values:</h4>
                  <div className="space-y-2">
                    {explainabilityData.shap_values.map((shap, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{shap.description}</span>
                        <span className="text-sm font-medium">{shap.value.toFixed(3)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Feature Contributions:</h4>
                  <div className="space-y-2">
                    {explainabilityData.feature_contributions.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{feature.feature}</span>
                        <span className="text-sm font-medium">{Math.round(feature.contribution * 100)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Confidence breakdown:</h4>
                  <div className="space-y-2">
                    {Object.entries(explainabilityData.confidence_breakdown).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                        <span className="text-sm font-medium">{Math.round(value * 100)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};
