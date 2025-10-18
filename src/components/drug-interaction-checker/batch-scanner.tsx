/**
 * Batch Scanner Component
 * For scanning multiple prescriptions or drug lists for interactions
 */

'use client';

import React, { useState, useCallback, useRef, useMemo } from 'react';
import {
  Scan,
  FileText,
  Upload,
  Download,
  Trash2,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Loader2,
  Shield,
  Activity,
  Clock,
  Database,
  Eye,
  EyeOff,
  Filter,
  SortAsc,
  SortDesc,
  ChevronDown,
  ChevronUp,
  Zap,
  Brain,
  RefreshCw,
  Settings
} from 'lucide-react';

import {
  InteractionCheckRequest,
  InteractionCheckResponse,
  DrugInteraction,
  Drug,
  PatientFacts,
  BatchCheckRequest,
  BatchCheckResult,
  BatchPatientResult
} from '@/types/drug-interaction-checker';

import { drugInteractionCheckerService } from '@/services/drug-interaction-checker';

interface BatchItem {
  id: string;
  patient_id: string;
  patient_name: string;
  drugs: Drug[];
  status: 'pending' | 'checking' | 'completed' | 'error';
  results?: InteractionCheckResponse;
  error?: string;
}

interface BatchScannerProps {
  onBatchComplete?: (results: BatchCheckResult) => void;
  onItemComplete?: (item: BatchItem, results: InteractionCheckResponse) => void;
  maxConcurrent?: number;
  showProgress?: boolean;
  autoStart?: boolean;
}

export const BatchScanner: React.FC<BatchScannerProps> = ({
  onBatchComplete,
  onItemComplete,
  maxConcurrent = 5,
  showProgress = true,
  autoStart = false
}) => {
  // State management
  const [items, setItems] = useState<BatchItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    include_ml_predictions: true,
    personalization_enabled: true,
    include_alternatives: true,
    include_monitoring_plans: true,
    severity_threshold: 'moderate' as const,
    max_concurrent: maxConcurrent
  });

  // UI state
  const [sortBy, setSortBy] = useState<'patient' | 'status' | 'severity'>('patient');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState<Set<string>>(new Set());
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Add items from file upload
   */
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        if (Array.isArray(data)) {
          const newItems: BatchItem[] = data.map((item, index) => ({
            id: `item-${Date.now()}-${index}`,
            patient_id: item.patient_id || `P-${index + 1}`,
            patient_name: item.patient_name || `Patient ${index + 1}`,
            drugs: item.drugs || [],
            status: 'pending' as const
          }));
          
          setItems(prev => [...prev, ...newItems]);
        }
      } catch (error) {
        console.error('Failed to parse file:', error);
      }
    };
    
    reader.readAsText(file);
  }, []);

  /**
   * Add single item manually
   */
  const addItem = useCallback((item: Omit<BatchItem, 'id' | 'status'>) => {
    const newItem: BatchItem = {
      ...item,
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending'
    };
    
    setItems(prev => [...prev, newItem]);
  }, []);

  /**
   * Remove items
   */
  const removeItems = useCallback((itemIds: string[]) => {
    setItems(prev => prev.filter(item => !itemIds.includes(item.id)));
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      itemIds.forEach(id => newSet.delete(id));
      return newSet;
    });
  }, []);

  /**
   * Process batch
   */
  const processBatch = useCallback(async () => {
    if (items.length === 0) return;

    setIsProcessing(true);
    setCurrentIndex(0);
    setProcessedCount(0);
    setErrorCount(0);

    const pendingItems = items.filter(item => item.status === 'pending');
    const results: BatchPatientResult[] = [];

    // Process items in chunks
    const chunkSize = settings.max_concurrent;
    const chunks = [];
    for (let i = 0; i < pendingItems.length; i += chunkSize) {
      chunks.push(pendingItems.slice(i, i + chunkSize));
    }

    for (const chunk of chunks) {
      const promises = chunk.map(async (item) => {
        // Update status to checking
        setItems(prev => prev.map(i => 
          i.id === item.id ? { ...i, status: 'checking' } : i
        ));

        try {
          // Create patient facts (mock data)
          const patientFacts: PatientFacts = {
            patient_id: item.patient_id,
            age: 50,
            sex: 'male',
            weight_kg: 70,
            pregnancy: false,
            allergies: [],
            comorbidities: [],
            current_labs: []
          };

          const request: InteractionCheckRequest = {
            patient_id: item.patient_id,
            patient_facts: patientFacts,
            drugs: item.drugs,
            context: {
              user_id: 'pharmacist-001',
              source: 'batch_scanner'
            },
            options: {
              include_ml_predictions: settings.include_ml_predictions,
              personalization_enabled: settings.personalization_enabled,
              include_alternatives: settings.include_alternatives,
              include_monitoring_plans: settings.include_monitoring_plans,
              severity_threshold: settings.severity_threshold,
              max_alternatives: 5
            }
          };

          const response = await drugInteractionCheckerService.checkInteractions(request);

          // Update item with results
          setItems(prev => prev.map(i => 
            i.id === item.id ? { ...i, status: 'completed', results: response } : i
          ));

          setProcessedCount(prev => prev + 1);

          if (onItemComplete) {
            onItemComplete(item, response);
          }

          results.push({
            patient_id: item.patient_id,
            status: 'success',
            interactions: response.interactions,
            summary: response.summary
          });

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          
          setItems(prev => prev.map(i => 
            i.id === item.id ? { ...i, status: 'error', error: errorMessage } : i
          ));

          setErrorCount(prev => prev + 1);
          setProcessedCount(prev => prev + 1);

          results.push({
            patient_id: item.patient_id,
            status: 'failed',
            interactions: [],
            summary: {
              max_severity: 'none',
              flag: false,
              total_interactions: 0,
              severity_counts: {},
              requires_attention: false,
              estimated_risk_score: 0,
              confidence_range: [0, 0]
            },
            errors: [errorMessage]
          });
        }
      });

      await Promise.all(promises);
    }

    // Create batch result
    const batchResult: BatchCheckResult = {
      batch_id: `batch-${Date.now()}`,
      status: 'completed',
      total_patients: items.length,
      processed_patients: processedCount,
      failed_patients: errorCount,
      results,
      started_at: new Date(),
      completed_at: new Date(),
      errors: results.filter(r => r.status === 'failed').map(r => r.errors?.[0] || '').filter(Boolean)
    };

    if (onBatchComplete) {
      onBatchComplete(batchResult);
    }

    setIsProcessing(false);
  }, [items, settings, onItemComplete, onBatchComplete]);

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
   * Get status color
   */
  const getStatusColor = (status: string): string => {
    const colors = {
      pending: 'text-gray-600 bg-gray-50 border-gray-200',
      checking: 'text-blue-600 bg-blue-50 border-blue-200',
      completed: 'text-green-600 bg-green-50 border-green-200',
      error: 'text-red-600 bg-red-50 border-red-200'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  /**
   * Get status icon
   */
  const getStatusIcon = (status: string) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      checking: <Loader2 className="w-4 h-4 animate-spin" />,
      completed: <CheckCircle className="w-4 h-4" />,
      error: <XCircle className="w-4 h-4" />
    };
    return icons[status as keyof typeof icons] || icons.pending;
  };

  /**
   * Get max severity from results
   */
  const getMaxSeverity = (item: BatchItem): string => {
    if (!item.results?.interactions) return 'none';
    
    const severities = item.results.interactions.map(i => i.severity);
    const severityLevels = { severe: 4, major: 3, moderate: 2, minor: 1, none: 0 };
    
    return severities.reduce((max, severity) => 
      severityLevels[severity] > severityLevels[max] ? severity : max, 'none'
    );
  };

  /**
   * Sort and filter items
   */
  const sortedItems = useMemo(() => {
    let filtered = items;

    // Apply status filter
    if (filterStatus.length > 0) {
      filtered = filtered.filter(item => filterStatus.includes(item.status));
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'patient':
          comparison = a.patient_name.localeCompare(b.patient_name);
          break;
        case 'status':
          const statusOrder: Record<string, number> = { error: 0, checking: 1, pending: 2, completed: 3 };
          comparison = statusOrder[a.status] - statusOrder[b.status];
          break;
        case 'severity':
          const severityOrder: Record<string, number> = { severe: 4, major: 3, moderate: 2, minor: 1, none: 0 };
          const aSeverity = getMaxSeverity(a);
          const bSeverity = getMaxSeverity(b);
          comparison = severityOrder[aSeverity] - severityOrder[bSeverity];
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [items, sortBy, sortOrder, filterStatus]);

  /**
   * Export results
   */
  const exportResults = useCallback(() => {
    const completedItems = items.filter(item => item.status === 'completed' && item.results);
    const exportData = completedItems.map(item => ({
      patient_id: item.patient_id,
      patient_name: item.patient_name,
      drugs: item.drugs.map(d => d.name),
      interactions: item.results?.interactions.map(i => ({
        drugs: i.drugs,
        severity: i.severity,
        confidence: i.confidence,
        description: i.clinical_consequence
      })),
      summary: item.results?.summary
    }));

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch-interaction-results-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [items]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Scan className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Batch Interaction Scanner</h2>
              <p className="text-sm text-gray-500">Check multiple prescriptions for drug interactions</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
              {showSettings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            <button
              onClick={processBatch}
              disabled={isProcessing || items.length === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              <span>{isProcessing ? 'Processing...' : 'Start Batch'}</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {showProgress && (isProcessing || processedCount > 0) && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm text-gray-600">
                {processedCount} / {items.length} processed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(processedCount / items.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Settings */}
        {showSettings && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Batch Settings</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.include_ml_predictions}
                  onChange={(e) => setSettings(prev => ({ ...prev, include_ml_predictions: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Include ML predictions</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.personalization_enabled}
                  onChange={(e) => setSettings(prev => ({ ...prev, personalization_enabled: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Enable personalization</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.include_alternatives}
                  onChange={(e) => setSettings(prev => ({ ...prev, include_alternatives: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Include alternatives</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.include_monitoring_plans}
                  onChange={(e) => setSettings(prev => ({ ...prev, include_monitoring_plans: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Include monitoring plans</span>
              </label>
              
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-700">Max Concurrent:</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={settings.max_concurrent}
                  onChange={(e) => setSettings(prev => ({ ...prev, max_concurrent: parseInt(e.target.value) }))}
                  className="w-20 text-sm border border-gray-300 rounded px-2 py-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Upload JSON</span>
          </button>
          
          <button
            onClick={exportResults}
            disabled={items.filter(item => item.status === 'completed').length === 0}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span>Export Results</span>
          </button>
          
          {selectedItems.size > 0 && (
            <button
              onClick={() => removeItems(Array.from(selectedItems))}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Remove Selected ({selectedItems.size})</span>
            </button>
          )}
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterStatus.join(',')}
                onChange={(e) => setFilterStatus(e.target.value ? e.target.value.split(',') : [])}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="checking">Checking</option>
                <option value="completed">Completed</option>
                <option value="error">Error</option>
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
              <option value="patient">Patient Name</option>
              <option value="status">Status</option>
              <option value="severity">Max Severity</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            Items ({items.length}) - {processedCount} processed, {errorCount} errors
          </h3>
        </div>
        
        <div className="divide-y">
          {sortedItems.map((item) => {
            const maxSeverity = getMaxSeverity(item);
            
            return (
              <div key={item.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.id)}
                        onChange={(e) => {
                          setSelectedItems(prev => {
                            const newSet = new Set(prev);
                            if (e.target.checked) {
                              newSet.add(item.id);
                            } else {
                              newSet.delete(item.id);
                            }
                            return newSet;
                          });
                        }}
                        className="rounded border-gray-300"
                      />
                      
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(item.status)}
                        <h4 className="font-medium text-gray-900">{item.patient_name}</h4>
                        <span className="text-sm text-gray-500">({item.patient_id})</span>
                      </div>
                      
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                        {item.status.toUpperCase()}
                      </span>
                      
                      {item.status === 'completed' && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(maxSeverity)}`}>
                          {maxSeverity.toUpperCase()}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      <strong>Drugs:</strong> {item.drugs.map(d => d.name).join(', ')}
                    </div>
                    
                    {item.error && (
                      <div className="text-sm text-red-600 mb-2">
                        <strong>Error:</strong> {item.error}
                      </div>
                    )}
                    
                    {item.results && (
                      <div className="text-sm text-gray-600">
                        <strong>Interactions:</strong> {item.results.summary.total_interactions} found
                        {item.results.summary.requires_attention && (
                          <span className="ml-2 text-orange-600 font-medium">(Requires Attention)</span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {item.results && (
                      <button
                        onClick={() => {
                          setShowDetails(prev => {
                            const newSet = new Set(prev);
                            if (newSet.has(item.id)) {
                              newSet.delete(item.id);
                            } else {
                              newSet.add(item.id);
                            }
                            return newSet;
                          });
                        }}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                        title="Toggle details"
                      >
                        {showDetails.has(item.id) ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {showDetails.has(item.id) && item.results && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="space-y-4">
                      {/* Summary */}
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <h5 className="text-sm font-medium text-gray-900 mb-2">Summary</h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Total Interactions:</span>
                            <span className="ml-2 font-medium">{item.results.summary.total_interactions}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Max Severity:</span>
                            <span className="ml-2 font-medium">{item.results.summary.max_severity}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Risk Score:</span>
                            <span className="ml-2 font-medium">
                              {Math.round(item.results.summary.estimated_risk_score * 100)}%
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Processing Time:</span>
                            <span className="ml-2 font-medium">{item.results.metadata.processing_time_ms}ms</span>
                          </div>
                        </div>
                      </div>

                      {/* Interactions */}
                      {item.results.interactions.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-900 mb-2">Interactions</h5>
                          <div className="space-y-2">
                            {item.results.interactions.map((interaction, index) => (
                              <div key={index} className={`p-3 rounded-lg border ${getSeverityColor(interaction.severity)}`}>
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium">{interaction.drugs.join(' + ')}</span>
                                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/50">
                                    {interaction.severity.toUpperCase()}
                                  </span>
                                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/50">
                                    {Math.round(interaction.confidence * 100)}%
                                  </span>
                                </div>
                                <p className="text-sm">{interaction.clinical_consequence}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
