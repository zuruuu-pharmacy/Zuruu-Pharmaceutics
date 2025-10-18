/**
 * Prescription Integration Component
 * Integrates drug interaction checking into prescription workflow
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Loader2,
  Shield,
  FileText,
  User,
  Calendar,
  Clock,
  Zap,
  Brain,
  Activity,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Download,
  Send,
  Phone,
  MessageSquare
} from 'lucide-react';

import {
  InteractionCheckRequest,
  InteractionCheckResponse,
  DrugInteraction,
  Drug,
  PatientFacts,
  OverrideRequest,
  OverrideRecord,
  AlternativeDrug,
  MonitoringPlan
} from '@/types/drug-interaction-checker';

import { drugInteractionCheckerService } from '@/services/drug-interaction-checker';

interface Prescription {
  id: string;
  patient_id: string;
  patient_name: string;
  prescriber_name: string;
  prescriber_id: string;
  date: Date;
  drugs: Drug[];
  status: 'draft' | 'pending' | 'approved' | 'dispensed';
  notes?: string;
}

interface PrescriptionIntegrationProps {
  prescription: Prescription;
  onInteractionDetected?: (interactions: DrugInteraction[]) => void;
  onOverride?: (override: OverrideRecord) => void;
  onAlternativeSuggested?: (alternatives: AlternativeDrug[]) => void;
  onContactPrescriber?: (prescriberId: string, message: string) => void;
  showInlineAlerts?: boolean;
  showOverrideModal?: boolean;
  autoCheckOnLoad?: boolean;
}

export const PrescriptionIntegration: React.FC<PrescriptionIntegrationProps> = ({
  prescription,
  onInteractionDetected,
  onOverride,
  onAlternativeSuggested,
  onContactPrescriber,
  showInlineAlerts = true,
  showOverrideModal = true,
  autoCheckOnLoad = true
}) => {
  // State management
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<InteractionCheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [patientFacts, setPatientFacts] = useState<PatientFacts | null>(null);
  const [showDetails, setShowDetails] = useState<Set<string>>(new Set());
  const [selectedInteraction, setSelectedInteraction] = useState<DrugInteraction | null>(null);
  const [showOverrideModalState, setShowOverrideModalState] = useState(false);
  const [overrideReason, setOverrideReason] = useState('');
  const [overrideJustification, setOverrideJustification] = useState('');
  const [showAlternatives, setShowAlternatives] = useState<Set<string>>(new Set());

  // Load patient facts on mount
  useEffect(() => {
    loadPatientFacts();
  }, [prescription.patient_id]);

  // Auto-check interactions on load
  useEffect(() => {
    if (autoCheckOnLoad && prescription.drugs.length >= 2 && patientFacts) {
      runInteractionCheck();
    }
  }, [autoCheckOnLoad, prescription.drugs, patientFacts]);

  /**
   * Load patient facts from database
   */
  const loadPatientFacts = useCallback(async () => {
    try {
      // This would fetch from actual patient database
      const facts: PatientFacts = {
        patient_id: prescription.patient_id,
        age: 45,
        sex: 'female',
        weight_kg: 65,
        pregnancy: false,
        allergies: ['Penicillin'],
        comorbidities: [{ condition: 'Hypertension', severity: 'moderate', controlled: true }],
        current_labs: [
          { test_name: 'Creatinine', value: 1.2, unit: 'mg/dL', reference_range: '0.6-1.2', date: new Date(), abnormal: false }
        ]
      };
      setPatientFacts(facts);
    } catch (err) {
      console.error('Failed to load patient facts:', err);
    }
  }, [prescription.patient_id]);

  /**
   * Run interaction check
   */
  const runInteractionCheck = useCallback(async () => {
    if (!patientFacts || prescription.drugs.length < 2) {
      return;
    }

    setIsChecking(true);
    setError(null);

    try {
      const request: InteractionCheckRequest = {
        patient_id: prescription.patient_id,
        patient_facts: patientFacts,
        drugs: prescription.drugs,
        context: {
          user_id: 'pharmacist-001',
          source: 'prescription_integration'
        },
        options: {
          include_ml_predictions: true,
          personalization_enabled: true,
          include_alternatives: true,
          include_monitoring_plans: true,
          severity_threshold: 'moderate',
          max_alternatives: 5
        }
      };

      const response = await drugInteractionCheckerService.checkInteractions(request);
      setResults(response);

      if (onInteractionDetected) {
        onInteractionDetected(response.interactions);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check interactions');
    } finally {
      setIsChecking(false);
    }
  }, [patientFacts, prescription, onInteractionDetected]);

  /**
   * Handle override
   */
  const handleOverride = useCallback(async () => {
    if (!selectedInteraction || !overrideReason || !overrideJustification) {
      return;
    }

    try {
      const overrideRequest: OverrideRequest = {
        interaction_id: selectedInteraction.id,
        user_id: 'pharmacist-001',
        reason_code: {
          code: overrideReason as 'clinical_justification' | 'lack_alternatives' | 'short_course' | 'consulted_prescriber' | 'patient_preference' | 'emergency' | 'other',
          description: overrideJustification,
          requires_second_signoff: selectedInteraction.severity === 'severe'
        },
        reason_text: overrideJustification,
        clinical_justification: overrideJustification,
        prescriber_consulted: false,
        monitoring_plan_implemented: false
      };

      const overrideRecord = await drugInteractionCheckerService.overrideInteraction(overrideRequest);
      
      if (onOverride) {
        onOverride(overrideRecord);
      }

      setShowOverrideModalState(false);
      setOverrideReason('');
      setOverrideJustification('');
      setSelectedInteraction(null);

    } catch (err) {
      console.error('Failed to override interaction:', err);
    }
  }, [selectedInteraction, overrideReason, overrideJustification, onOverride]);

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

  /**
   * Get inline alert for drug
   */
  const getInlineAlert = (drug: Drug) => {
    if (!results?.interactions) return null;

    const drugInteractions = results.interactions.filter(interaction =>
      interaction.drugs.includes(drug.name)
    );

    if (drugInteractions.length === 0) return null;

    const maxSeverity = drugInteractions.reduce((max, interaction) => {
      const severityLevels: Record<string, number> = { severe: 4, major: 3, moderate: 2, minor: 1, none: 0 };
      return severityLevels[interaction.severity] > severityLevels[max] ? interaction.severity : max;
    }, 'none');

    return {
      severity: maxSeverity,
      count: drugInteractions.length,
      interactions: drugInteractions
    };
  };

  return (
    <div className="space-y-6">
      {/* Prescription Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Prescription Review</h2>
            <p className="text-sm text-gray-500">Prescription #{prescription.id}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              prescription.status === 'approved' ? 'bg-green-100 text-green-800' :
              prescription.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              prescription.status === 'draft' ? 'bg-gray-100 text-gray-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {prescription.status.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">{prescription.patient_name}</p>
              <p className="text-xs text-gray-500">Patient ID: {prescription.patient_id}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">{prescription.prescriber_name}</p>
              <p className="text-xs text-gray-500">Prescriber ID: {prescription.prescriber_id}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {prescription.date.toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500">
                {prescription.date.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* Patient Facts Summary */}
        {patientFacts && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Patient Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Age:</span>
                <span className="ml-2 font-medium">{patientFacts.age} years</span>
              </div>
              <div>
                <span className="text-gray-500">Sex:</span>
                <span className="ml-2 font-medium capitalize">{patientFacts.sex}</span>
              </div>
              <div>
                <span className="text-gray-500">Weight:</span>
                <span className="ml-2 font-medium">{patientFacts.weight_kg} kg</span>
              </div>
              <div>
                <span className="text-gray-500">Allergies:</span>
                <span className="ml-2 font-medium">{patientFacts.allergies.length}</span>
              </div>
            </div>
          </div>
        )}

        {/* Interaction Check Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Drug Interaction Check</span>
            {isChecking && <Loader2 className="w-4 h-4 animate-spin text-blue-600" />}
          </div>
          
          <button
            onClick={runInteractionCheck}
            disabled={isChecking}
            className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Zap className="w-4 h-4" />
            <span>Recheck</span>
          </button>
        </div>
      </div>

      {/* Prescribed Drugs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">Prescribed Drugs</h3>
        </div>
        
        <div className="divide-y">
          {prescription.drugs.map((drug, index) => {
            const alert = getInlineAlert(drug);
            
            return (
              <div key={index} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-gray-900">{drug.name}</h4>
                      {drug.strength && (
                        <span className="text-sm text-gray-500">({drug.strength})</span>
                      )}
                      {drug.generic_name && drug.generic_name !== drug.name && (
                        <span className="text-xs text-gray-400">Generic: {drug.generic_name}</span>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      <div><strong>Dose:</strong> {drug.dose}</div>
                      <div><strong>Route:</strong> {drug.route}</div>
                      {drug.frequency && <div><strong>Frequency:</strong> {drug.frequency}</div>}
                    </div>
                  </div>
                  
                  {/* Inline Alert */}
                  {showInlineAlerts && alert && (
                    <div className={`ml-4 p-2 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                      <div className="flex items-center space-x-2">
                        {getSeverityIcon(alert.severity)}
                        <span className="text-sm font-medium">
                          {alert.count} interaction{alert.count > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interaction Results */}
      {results && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Interaction Results</h3>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {results.metadata.processing_time_ms}ms
                </span>
              </div>
            </div>
          </div>
          
          {results.interactions.length === 0 ? (
            <div className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No Interactions Detected</h4>
              <p className="text-gray-500">All prescribed drugs are safe to use together.</p>
            </div>
          ) : (
            <div className="divide-y">
              {results.interactions.map((interaction) => (
                <div key={interaction.id} className="p-6">
                  <div className={`border rounded-lg p-4 ${getSeverityColor(interaction.severity)}`}>
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
                          onClick={() => {
                            setShowDetails(prev => {
                              const newSet = new Set(prev);
                              if (newSet.has(interaction.id)) {
                                newSet.delete(interaction.id);
                              } else {
                                newSet.add(interaction.id);
                              }
                              return newSet;
                            });
                          }}
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

                    {/* Action Buttons */}
                    <div className="mt-4 pt-4 border-t border-current/20">
                      <div className="flex items-center space-x-3">
                        {interaction.severity === 'severe' || interaction.severity === 'major' ? (
                          <>
                            <button
                              onClick={() => {
                                setSelectedInteraction(interaction);
                                setShowOverrideModalState(true);
                              }}
                              className="flex items-center space-x-2 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>Override</span>
                            </button>
                            
                            <button
                              onClick={() => onContactPrescriber?.(prescription.prescriber_id, `Interaction alert: ${interaction.drugs.join(' + ')} - ${interaction.severity}`)}
                              className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <MessageSquare className="w-4 h-4" />
                              <span>Contact Prescriber</span>
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => {
                              setShowAlternatives(prev => {
                                const newSet = new Set(prev);
                                if (newSet.has(interaction.id)) {
                                  newSet.delete(interaction.id);
                                } else {
                                  newSet.add(interaction.id);
                                }
                                return newSet;
                              });
                            }}
                            className="flex items-center space-x-2 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <Brain className="w-4 h-4" />
                            <span>View Alternatives</span>
                          </button>
                        )}
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
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Alternatives */}
      {results?.alternatives && results.alternatives.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">Alternative Drugs</h3>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {results.alternatives.map((alt, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
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
                    <div className="text-sm text-green-600">
                      Available: {alt.availability ? 'Yes' : 'No'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Override Modal */}
      {showOverrideModalState && selectedInteraction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Override Interaction</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Interaction:</strong> {selectedInteraction.drugs.join(' + ')}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Severity:</strong> {selectedInteraction.severity.toUpperCase()}
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Override Reason
                </label>
                <select
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">Select a reason</option>
                  <option value="clinical_justification">Clinical justification</option>
                  <option value="lack_alternatives">No suitable alternative available</option>
                  <option value="short_course">Short course treatment</option>
                  <option value="consulted_prescriber">Prescriber consulted and approved</option>
                  <option value="patient_preference">Patient preference after counseling</option>
                  <option value="emergency">Emergency situation</option>
                  <option value="other">Other reason</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clinical Justification
                </label>
                <textarea
                  value={overrideJustification}
                  onChange={(e) => setOverrideJustification(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Provide detailed clinical justification..."
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowOverrideModalState(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleOverride}
                disabled={!overrideReason || !overrideJustification}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Override
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
