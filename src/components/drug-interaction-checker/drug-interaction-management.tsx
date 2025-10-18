/**
 * Main Drug Interaction Management Component
 * Integrates all DIC components into a unified interface
 */

'use client';

import React, { useState, useCallback } from 'react';
import {
  Shield,
  Search,
  FileText,
  Scan,
  Settings,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  Brain,
  Zap,
  RefreshCw,
  Download,
  Upload,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

import { InteractionCheckerMain } from './interaction-checker-main';
import { PrescriptionIntegration } from './prescription-integration';
import { BatchScanner } from './batch-scanner';

import {
  DrugInteraction,
  AlternativeDrug,
  MonitoringPlan,
  OverrideRecord,
  BatchCheckResult
} from '@/types/drug-interaction-checker';

interface DrugInteractionManagementProps {
  onNavigateToDashboard?: () => void;
  initialMode?: 'checker' | 'prescription' | 'batch';
  showAnalytics?: boolean;
  showSettings?: boolean;
}

const DrugInteractionManagement: React.FC<DrugInteractionManagementProps> = ({
  onNavigateToDashboard,
  initialMode = 'checker',
  showAnalytics = true,
  showSettings = true
}) => {
  // State management
  const [activeMode, setActiveMode] = useState<'checker' | 'prescription' | 'batch'>(initialMode);
  const [showSidebar, setShowSidebar] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalChecks: 0,
    interactionsDetected: 0,
    overrides: 0,
    avgProcessingTime: 0,
    errorRate: 0,
    severityDistribution: {
      severe: 0,
      major: 0,
      moderate: 0,
      minor: 0,
      none: 0
    }
  });

  // Sample prescription data
  const samplePrescription = {
    id: 'RX-001234',
    patient_id: 'P-001234',
    patient_name: 'John Doe',
    prescriber_name: 'Dr. Sarah Johnson',
    prescriber_id: 'D-998',
    date: new Date(),
    drugs: [
      {
        id: 'drug-1',
        name: 'Simvastatin',
        strength: '40 mg',
        dose: '1 tablet',
        route: 'oral' as const,
        frequency: 'once daily'
      },
      {
        id: 'drug-2',
        name: 'Clarithromycin',
        strength: '500 mg',
        dose: '1 tablet',
        route: 'oral' as const,
        frequency: 'twice daily'
      }
    ],
    status: 'pending' as const,
    notes: 'Patient has hypertension and diabetes'
  };

  /**
   * Handle interaction detection
   */
  const handleInteractionDetected = useCallback((interactions: DrugInteraction[]) => {
    setAnalytics(prev => ({
      ...prev,
      totalChecks: prev.totalChecks + 1,
      interactionsDetected: prev.interactionsDetected + interactions.length,
      severityDistribution: interactions.reduce((acc, interaction) => {
        acc[interaction.severity] = (acc[interaction.severity] || 0) + 1;
        return acc;
      }, prev.severityDistribution)
    }));
  }, []);

  /**
   * Handle alternative suggestion
   */
  const handleAlternativeSuggested = useCallback((alternatives: AlternativeDrug[]) => {
    console.log('Alternatives suggested:', alternatives);
  }, []);

  /**
   * Handle override
   */
  const handleOverride = useCallback((override: OverrideRecord) => {
    setAnalytics(prev => ({
      ...prev,
      overrides: prev.overrides + 1
    }));
    console.log('Interaction overridden:', override);
  }, []);

  /**
   * Handle prescriber contact
   */
  const handleContactPrescriber = useCallback((prescriberId: string, message: string) => {
    console.log('Contacting prescriber:', prescriberId, message);
  }, []);

  /**
   * Handle batch completion
   */
  const handleBatchComplete = useCallback((results: BatchCheckResult) => {
    console.log('Batch completed:', results);
    setAnalytics(prev => ({
      ...prev,
      totalChecks: prev.totalChecks + results.processed_patients
    }));
  }, []);

  /**
   * Get mode icon
   */
  const getModeIcon = (mode: string) => {
    const icons = {
      checker: <Search className="w-5 h-5" />,
      prescription: <FileText className="w-5 h-5" />,
      batch: <Scan className="w-5 h-5" />
    };
    return icons[mode as keyof typeof icons] || icons.checker;
  };

  /**
   * Get mode title
   */
  const getModeTitle = (mode: string) => {
    const titles = {
      checker: 'Interaction Checker',
      prescription: 'Prescription Integration',
      batch: 'Batch Scanner'
    };
    return titles[mode as keyof typeof titles] || titles.checker;
  };

  /**
   * Get mode description
   */
  const getModeDescription = (mode: string) => {
    const descriptions = {
      checker: 'Check individual drug combinations for interactions',
      prescription: 'Review prescriptions with integrated interaction checking',
      batch: 'Process multiple prescriptions in batch mode'
    };
    return descriptions[mode as keyof typeof descriptions] || descriptions.checker;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Drug Interaction Checker</h1>
                <p className="text-sm text-gray-500">AI-powered interaction detection and analysis</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {showAnalytics && (
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Activity className="w-4 h-4" />
                  <span>Analytics</span>
                  {showSidebar ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              )}
              
              {onNavigateToDashboard && (
                <button
                  onClick={onNavigateToDashboard}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Back to Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        {showSidebar && showAnalytics && (
          <div className="w-80 bg-white shadow-sm border-r">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Analytics</h3>
              
              {/* Key Metrics */}
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">Total Checks</span>
                    <Database className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-900">{analytics.totalChecks}</div>
                </div>
                
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-orange-900">Interactions Detected</span>
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-orange-900">{analytics.interactionsDetected}</div>
                </div>
                
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-red-900">Overrides</span>
                    <RefreshCw className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold text-red-900">{analytics.overrides}</div>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-900">Avg Processing Time</span>
                    <Clock className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-900">{analytics.avgProcessingTime}ms</div>
                </div>
              </div>

              {/* Severity Distribution */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Severity Distribution</h4>
                <div className="space-y-2">
                  {Object.entries(analytics.severityDistribution).map(([severity, count]) => (
                    <div key={severity} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 capitalize">{severity}</span>
                      <span className="text-sm font-medium text-gray-900">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Health */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">System Health</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Rule Engine</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Healthy</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">ML Models</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Healthy</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Data Sources</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Synced</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Activity</h4>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">Simvastatin + Clarithromycin</div>
                    <div className="text-xs text-gray-500">Major interaction detected - 2 minutes ago</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">Batch scan completed</div>
                    <div className="text-xs text-gray-500">25 prescriptions processed - 5 minutes ago</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="font-medium">Override logged</div>
                    <div className="text-xs text-gray-500">Severe interaction overridden - 10 minutes ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Mode Selector */}
          <div className="bg-white shadow-sm border-b">
            <div className="px-6 py-4">
              <div className="flex items-center space-x-1">
                {(['checker', 'prescription', 'batch'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setActiveMode(mode)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      activeMode === mode
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {getModeIcon(mode)}
                    <span className="font-medium">{getModeTitle(mode)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {activeMode === 'checker' && (
              <InteractionCheckerMain
                onInteractionDetected={handleInteractionDetected}
                onAlternativeSuggested={handleAlternativeSuggested}
              />
            )}
            
            {activeMode === 'prescription' && (
              <PrescriptionIntegration
                prescription={samplePrescription}
                onInteractionDetected={handleInteractionDetected}
                onOverride={handleOverride}
                onAlternativeSuggested={handleAlternativeSuggested}
                onContactPrescriber={handleContactPrescriber}
              />
            )}
            
            {activeMode === 'batch' && (
              <BatchScanner
                onBatchComplete={handleBatchComplete}
                onItemComplete={(item, results) => {
                  handleInteractionDetected(results.interactions);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugInteractionManagement;
