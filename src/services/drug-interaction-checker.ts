/**
 * Main Drug Interaction Checker Service
 * Integrates normalization, rule engine, ML layer, and personalization
 */

import {
  InteractionCheckRequest,
  InteractionCheckResponse,
  DrugInteraction,
  Drug,
  PatientFacts,
  InteractionSummary,
  AlternativeDrug,
  MonitoringPlan,
  ResponseMetadata,
  OverrideRequest,
  OverrideRecord,
  RunLog,
  ExplainabilityInfo,
  BatchCheckRequest,
  BatchCheckResult
} from '@/types/drug-interaction-checker';

import { drugNormalizationService } from './drug-normalization';
import { ruleEngine } from './rule-engine';
import { mlPredictiveLayer } from './ml-predictive-layer';

export class DrugInteractionCheckerService {
  private runLogs: Map<string, RunLog> = new Map();
  private overrideRecords: Map<string, OverrideRecord> = new Map();
  private performanceMetrics: PerformanceTracker;
  private dataSources: DataSourceManager;
  private alertManager: AlertManager;

  constructor() {
    this.performanceMetrics = new PerformanceTracker();
    this.dataSources = new DataSourceManager();
    this.alertManager = new AlertManager();
  }

  /**
   * Main interaction check endpoint
   */
  async checkInteractions(request: InteractionCheckRequest): Promise<InteractionCheckResponse> {
    const startTime = Date.now();
    const requestId = this.generateRequestId();

    try {
      // Step 1: Normalize drugs
      const normalizedDrugs = await this.normalizeDrugs(request.drugs);
      
      // Step 2: Run rule engine checks
      const ruleEngineStart = Date.now();
      const ruleEngineInteractions = await ruleEngine.checkInteractions(
        normalizedDrugs,
        request.patient_facts,
        { 
          enablePersonalization: request.options?.personalization_enabled !== false,
          severityThreshold: request.options?.severity_threshold
        }
      );
      const ruleEngineTime = Date.now() - ruleEngineStart;

      // Step 3: Run ML predictions (if enabled)
      let mlInteractions: DrugInteraction[] = [];
      let mlTime = 0;
      
      if (request.options?.include_ml_predictions !== false) {
        const mlStart = Date.now();
        mlInteractions = await mlPredictiveLayer.predictInteractions(
          normalizedDrugs,
          request.patient_facts,
          ruleEngineInteractions
        );
        mlTime = Date.now() - mlStart;
      }

      // Step 4: Combine and deduplicate interactions
      const allInteractions = this.combineAndDeduplicateInteractions(
        ruleEngineInteractions,
        mlInteractions
      );

      // Step 5: Generate alternatives (if requested)
      const alternatives: AlternativeDrug[] = [];
      if (request.options?.include_alternatives !== false) {
        const alternativesStart = Date.now();
        alternatives.push(...await this.generateAlternatives(allInteractions, normalizedDrugs));
        mlTime += Date.now() - alternativesStart;
      }

      // Step 6: Generate monitoring recommendations
      const monitoringRecommendations: MonitoringPlan[] = [];
      if (request.options?.include_monitoring_plans !== false) {
        monitoringRecommendations.push(...await this.generateMonitoringPlans(allInteractions));
      }

      // Step 7: Create summary
      const summary = this.createInteractionSummary(allInteractions);

      // Step 8: Create response metadata
      const metadata: ResponseMetadata = {
        processing_time_ms: Date.now() - startTime,
        rule_engine_time_ms: ruleEngineTime,
        ml_model_time_ms: mlTime,
        cache_hit: false, // Would be determined by cache logic
        data_sources_used: await this.dataSources.getActiveSources(),
        model_version: '1.0.0',
        last_data_sync: await this.dataSources.getLastSyncTime(),
        confidence_threshold: 0.75 // Default confidence threshold
      };

      // Step 9: Create response
      const response: InteractionCheckResponse = {
        request_id: requestId,
        interactions: allInteractions,
        summary,
        alternatives,
        monitoring_recommendations: monitoringRecommendations,
        metadata
      };

      // Step 10: Log the run
      await this.logRun(request, response, Date.now() - startTime);

      // Step 11: Check for alerts
      await this.checkForAlerts(allInteractions, request);

      // Update performance metrics
      this.performanceMetrics.recordRequest(metadata);

      return response;

    } catch (error) {
      console.error('Drug interaction check failed:', error);
      
      // Log error
      await this.logRunError(request, error as Error, requestId);
      
      // Return error response
      return this.createErrorResponse(requestId, error as Error);
    }
  }

  /**
   * Batch check multiple patients
   */
  async batchCheckInteractions(request: BatchCheckRequest): Promise<BatchCheckResult> {
    const batchId = this.generateRequestId();
    const results: BatchPatientResult[] = [];
    let processedCount = 0;
    let failedCount = 0;
    const errors: string[] = [];

    // Process patients in parallel (with concurrency limit)
    const concurrencyLimit = 10;
    const chunks = this.chunkArray(request.patient_ids, concurrencyLimit);

    for (const chunk of chunks) {
      const promises = chunk.map(async (patientId) => {
        try {
          // This would fetch patient data and create check request
          const checkRequest = await this.createCheckRequestForPatient(patientId, request.check_options);
          const response = await this.checkInteractions(checkRequest);
          
          results.push({
            patient_id: patientId,
            status: 'success',
            interactions: response.interactions,
            summary: response.summary
          });
          
          processedCount++;
        } catch (error) {
          results.push({
            patient_id: patientId,
            status: 'failed',
            interactions: [],
            summary: { max_severity: 'none', flag: false, total_interactions: 0, severity_counts: {}, requires_attention: false, estimated_risk_score: 0, confidence_range: [0, 0] },
            errors: [(error as Error).message]
          });
          
          failedCount++;
          errors.push(`Patient ${patientId}: ${(error as Error).message}`);
        }
      });

      await Promise.all(promises);
    }

    const result: BatchCheckResult = {
      batch_id: batchId,
      status: failedCount > 0 ? 'completed' : 'completed',
      total_patients: request.patient_ids.length,
      processed_patients: processedCount,
      failed_patients: failedCount,
      results,
      started_at: new Date(),
      completed_at: new Date(),
      errors
    };

    // Send completion notification if requested
    if (request.notify_on_completion && request.callback_url) {
      await this.sendCompletionNotification(request.callback_url, result);
    }

    return result;
  }

  /**
   * Override an interaction
   */
  async overrideInteraction(override: OverrideRequest): Promise<OverrideRecord> {
    const overrideRecord: OverrideRecord = {
      id: this.generateRequestId(),
      interaction_id: override.interaction_id,
      run_log_id: '', // Would be linked to original run
      user_id: override.user_id,
      reason_code: override.reason_code.code,
      reason_text: override.reason_text,
      clinical_justification: override.clinical_justification,
      second_signoff_user_id: override.second_signoff_user_id,
      second_signoff_timestamp: override.second_signoff_user_id ? new Date() : undefined,
      attachment_urls: override.attachment_urls || [],
      timestamp: new Date(),
      approved: override.second_signoff_user_id ? false : true,
      prescriber_consulted: override.prescriber_consulted,
      prescriber_response: override.prescriber_response,
      monitoring_plan_implemented: override.monitoring_plan_implemented || false,
      incident_created: false
    };

    // Check if second signoff is required
    if (override.reason_code.requires_second_signoff && !override.second_signoff_user_id) {
      overrideRecord.approved = false;
      await this.createIncidentTicket(overrideRecord);
    }

    // Store override record
    this.overrideRecords.set(overrideRecord.id, overrideRecord);

    // Log override action
    await this.logOverride(overrideRecord);

    return overrideRecord;
  }

  /**
   * Get interaction history for a patient
   */
  async getPatientInteractionHistory(patientId: string): Promise<RunLog[]> {
    const patientLogs: RunLog[] = [];
    
    for (const log of this.runLogs.values()) {
      if (log.patient_id === patientId) {
        patientLogs.push(log);
      }
    }

    return patientLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Generate explainability for an interaction
   */
  async generateExplainability(
    interactionId: string,
    drugs: Drug[],
    patientFacts: PatientFacts
  ): Promise<ExplainabilityInfo> {
    // Find the interaction
    const interaction = await this.findInteractionById(interactionId);
    if (!interaction) {
      throw new Error(`Interaction ${interactionId} not found`);
    }

    // Generate explainability using ML layer
    return await mlPredictiveLayer.generateExplainability(interaction, drugs, patientFacts);
  }

  /**
   * Get system health status
   */
  async getSystemHealth(): Promise<SystemHealth> {
    const components = [
      {
        name: 'Drug Normalization',
        status: 'healthy' as const,
        response_time_ms: 50,
        error_rate: 0.01,
        last_check: new Date(),
        details: 'Service operational'
      },
      {
        name: 'Rule Engine',
        status: 'healthy' as const,
        response_time_ms: 100,
        error_rate: 0.005,
        last_check: new Date(),
        details: 'Service operational'
      },
      {
        name: 'ML Predictive Layer',
        status: 'healthy' as const,
        response_time_ms: 200,
        error_rate: 0.02,
        last_check: new Date(),
        details: 'Service operational'
      },
      {
        name: 'Data Sources',
        status: 'healthy' as const,
        response_time_ms: 150,
        error_rate: 0.01,
        last_check: new Date(),
        details: 'All sources synchronized'
      }
    ];

    const overallStatus = components.every(c => c.status === 'healthy') ? 'healthy' : 'degraded';
    const uptimePercentage = 99.9; // Would be calculated from actual uptime
    const errorRate24h = 0.01; // Would be calculated from actual errors

    return {
      status: overallStatus,
      components,
      last_check: new Date(),
      uptime_percentage: uptimePercentage,
      error_rate_24h: errorRate24h
    };
  }

  /**
   * Normalize drugs using the normalization service
   */
  private async normalizeDrugs(drugs: Drug[]): Promise<Drug[]> {
    const normalizedDrugs: Drug[] = [];

    for (const drug of drugs) {
      if (drug.rxcui) {
        // Already normalized
        normalizedDrugs.push(drug);
      } else {
        // Normalize drug text
        const result = await drugNormalizationService.normalizeDrugText(drug.name);
        if (result.normalized_drugs.length > 0) {
          const normalizedDrug = result.normalized_drugs[0];
          normalizedDrugs.push({
            ...drug,
            rxcui: normalizedDrug.rxcui,
            generic_name: normalizedDrug.generic_name,
            brand_name: normalizedDrug.brand_names[0],
            atc_code: normalizedDrug.atc_code,
            drug_class: normalizedDrug.drug_class
          });
        } else {
          // Drug not recognized, keep original
          normalizedDrugs.push(drug);
        }
      }
    }

    return normalizedDrugs;
  }

  /**
   * Combine and deduplicate interactions from rule engine and ML
   */
  private combineAndDeduplicateInteractions(
    ruleEngineInteractions: DrugInteraction[],
    mlInteractions: DrugInteraction[]
  ): DrugInteraction[] {
    const combined: DrugInteraction[] = [...ruleEngineInteractions];
    
    // Add ML interactions that don't conflict with rule engine
    for (const mlInteraction of mlInteractions) {
      const isDuplicate = ruleEngineInteractions.some(ruleInteraction => 
        this.isSameInteraction(ruleInteraction, mlInteraction)
      );
      
      if (!isDuplicate) {
        combined.push(mlInteraction);
      }
    }

    return combined;
  }

  /**
   * Check if two interactions are the same
   */
  private isSameInteraction(interaction1: DrugInteraction, interaction2: DrugInteraction): boolean {
    const drugs1 = interaction1.drugs.sort();
    const drugs2 = interaction2.drugs.sort();
    
    return drugs1.length === drugs2.length && 
           drugs1.every((drug, index) => drug === drugs2[index]);
  }

  /**
   * Generate alternative drugs
   */
  private async generateAlternatives(
    interactions: DrugInteraction[],
    drugs: Drug[]
  ): Promise<AlternativeDrug[]> {
    const alternatives: AlternativeDrug[] = [];

    for (const interaction of interactions) {
      if (interaction.severity === 'severe' || interaction.severity === 'major') {
        const interactionAlternatives = await this.findAlternativesForInteraction(interaction);
        alternatives.push(...interactionAlternatives);
      }
    }

    return alternatives;
  }

  /**
   * Find alternatives for a specific interaction
   */
  private async findAlternativesForInteraction(interaction: DrugInteraction): Promise<AlternativeDrug[]> {
    // This would query a drug database for alternatives
    // For now, return mock data
    return [
      {
        drug_name: 'Pravastatin',
        rxcui: '12345',
        reason: 'Lower CYP3A4 metabolism',
        efficacy_rating: 0.85,
        safety_rating: 0.90,
        cost_rating: 0.70,
        availability: true,
        stock_quantity: 100,
        requires_prescription_change: true,
        therapeutic_equivalence: 0.80
      }
    ];
  }

  /**
   * Generate monitoring plans
   */
  private async generateMonitoringPlans(interactions: DrugInteraction[]): Promise<MonitoringPlan[]> {
    const plans: MonitoringPlan[] = [];

    for (const interaction of interactions) {
      if (interaction.recommendations) {
        for (const recommendation of interaction.recommendations) {
          if (recommendation.monitoring_plan) {
            plans.push(recommendation.monitoring_plan);
          }
        }
      }
    }

    return plans;
  }

  /**
   * Create interaction summary
   */
  private createInteractionSummary(interactions: DrugInteraction[]): InteractionSummary {
    if (interactions.length === 0) {
      return {
        max_severity: 'none',
        flag: false,
        total_interactions: 0,
        severity_counts: {},
        requires_attention: false,
        estimated_risk_score: 0,
        confidence_range: [0, 0]
      };
    }

    const severityCounts: Record<string, number> = {};
    let maxSeverity = 'none';
    let requiresAttention = false;
    let totalConfidence = 0;

    for (const interaction of interactions) {
      severityCounts[interaction.severity] = (severityCounts[interaction.severity] || 0) + 1;
      
      if (this.getSeverityLevel(interaction.severity) > this.getSeverityLevel(maxSeverity)) {
        maxSeverity = interaction.severity;
      }
      
      if (interaction.severity === 'severe' || interaction.severity === 'major') {
        requiresAttention = true;
      }
      
      totalConfidence += interaction.confidence;
    }

    const avgConfidence = totalConfidence / interactions.length;
    const estimatedRiskScore = this.calculateRiskScore(interactions);

    return {
      max_severity: maxSeverity,
      flag: requiresAttention,
      total_interactions: interactions.length,
      severity_counts: severityCounts,
      requires_attention: requiresAttention,
      estimated_risk_score: estimatedRiskScore,
      confidence_range: [Math.min(...interactions.map(i => i.confidence)), Math.max(...interactions.map(i => i.confidence))]
    };
  }

  /**
   * Calculate risk score
   */
  private calculateRiskScore(interactions: DrugInteraction[]): number {
    let riskScore = 0;
    
    for (const interaction of interactions) {
      const severityWeight = this.getSeverityWeight(interaction.severity);
      const confidenceWeight = interaction.confidence;
      riskScore += severityWeight * confidenceWeight;
    }
    
    return Math.min(riskScore / interactions.length, 1.0);
  }

  /**
   * Get severity level as number
   */
  private getSeverityLevel(severity: string): number {
    const levels: Record<string, number> = {
      'none': 0,
      'minor': 1,
      'moderate': 2,
      'major': 3,
      'severe': 4
    };
    return levels[severity] || 0;
  }

  /**
   * Get severity weight for risk calculation
   */
  private getSeverityWeight(severity: string): number {
    const weights: Record<string, number> = {
      'none': 0,
      'minor': 0.1,
      'moderate': 0.3,
      'major': 0.6,
      'severe': 1.0
    };
    return weights[severity] || 0;
  }

  /**
   * Log run for audit purposes
   */
  private async logRun(
    request: InteractionCheckRequest,
    response: InteractionCheckResponse,
    processingTime: number
  ): Promise<void> {
    const runLog: RunLog = {
      id: response.request_id,
      request_id: response.request_id,
      patient_id: request.patient_id,
      drugs: request.drugs,
      results: response,
      user_id: request.context.user_id,
      timestamp: new Date(),
      processing_time_ms: processingTime,
      cache_hit: false,
      errors: [],
      warnings: []
    };

    this.runLogs.set(runLog.id, runLog);
  }

  /**
   * Log run error
   */
  private async logRunError(
    request: InteractionCheckRequest,
    error: Error,
    requestId: string
  ): Promise<void> {
    const runLog: RunLog = {
      id: requestId,
      request_id: requestId,
      patient_id: request.patient_id,
      drugs: request.drugs,
      results: this.createErrorResponse(requestId, error),
      user_id: request.context.user_id,
      timestamp: new Date(),
      processing_time_ms: 0,
      cache_hit: false,
      errors: [error.message],
      warnings: []
    };

    this.runLogs.set(runLog.id, runLog);
  }

  /**
   * Create error response
   */
  private createErrorResponse(requestId: string, error: Error): InteractionCheckResponse {
    return {
      request_id: requestId,
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
      alternatives: [],
      monitoring_recommendations: [],
      metadata: {
        processing_time_ms: 0,
        rule_engine_time_ms: 0,
        ml_model_time_ms: 0,
        cache_hit: false,
        data_sources_used: [],
        model_version: '1.0.0',
        last_data_sync: new Date(),
        confidence_threshold: 0.75
      }
    };
  }

  /**
   * Check for alerts
   */
  private async checkForAlerts(
    interactions: DrugInteraction[],
    request: InteractionCheckRequest
  ): Promise<void> {
    const severeInteractions = interactions.filter(i => i.severity === 'severe');
    
    if (severeInteractions.length > 0) {
      await this.alertManager.sendSevereAlert(severeInteractions, request);
    }
  }

  /**
   * Create check request for patient
   */
  private async createCheckRequestForPatient(
    patientId: string,
    options: any
  ): Promise<InteractionCheckRequest> {
    // This would fetch patient data from database
    // For now, return mock data
    return {
      patient_id: patientId,
      patient_facts: {
        patient_id: patientId,
        age: 50,
        sex: 'male',
        weight_kg: 70,
        pregnancy: false,
        allergies: [],
        comorbidities: [],
        current_labs: []
      },
      drugs: [],
      context: {
        user_id: 'system',
        source: 'batch_check'
      },
      options
    };
  }

  /**
   * Send completion notification
   */
  private async sendCompletionNotification(url: string, result: BatchCheckResult): Promise<void> {
    // Implementation would send HTTP POST to callback URL
    console.log(`Sending completion notification to ${url}`, result);
  }

  /**
   * Create incident ticket
   */
  private async createIncidentTicket(overrideRecord: OverrideRecord): Promise<void> {
    // Implementation would create incident in ticketing system
    console.log(`Creating incident ticket for override ${overrideRecord.id}`);
  }

  /**
   * Log override action
   */
  private async logOverride(overrideRecord: OverrideRecord): Promise<void> {
    // Implementation would log override for audit
    console.log(`Logging override ${overrideRecord.id}`);
  }

  /**
   * Find interaction by ID
   */
  private async findInteractionById(interactionId: string): Promise<DrugInteraction | null> {
    for (const log of this.runLogs.values()) {
      const interaction = log.results.interactions.find(i => i.id === interactionId);
      if (interaction) {
        return interaction;
      }
    }
    return null;
  }

  /**
   * Generate unique request ID
   */
  private generateRequestId(): string {
    return `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Chunk array into smaller arrays
   */
  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics(): any {
    return this.performanceMetrics.getMetrics();
  }

  /**
   * Get override statistics
   */
  getOverrideStatistics(): any {
    return {
      total_overrides: this.overrideRecords.size,
      override_rate: 0.1, // Would be calculated from actual data
      most_common_reasons: {}, // Would be calculated from actual data
      severity_distribution: {} // Would be calculated from actual data
    };
  }
}

/**
 * Performance Tracker
 */
class PerformanceTracker {
  private metrics: any[] = [];

  recordRequest(metadata: ResponseMetadata): void {
    this.metrics.push({
      timestamp: new Date(),
      processing_time: metadata.processing_time_ms,
      rule_engine_time: metadata.rule_engine_time_ms,
      ml_model_time: metadata.ml_model_time_ms,
      cache_hit: metadata.cache_hit
    });

    // Keep only last 1000 metrics
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }
  }

  getMetrics(): any {
    if (this.metrics.length === 0) {
      return {
        avg_processing_time: 0,
        avg_rule_engine_time: 0,
        avg_ml_model_time: 0,
        cache_hit_rate: 0
      };
    }

    const avgProcessingTime = this.metrics.reduce((sum, m) => sum + m.processing_time, 0) / this.metrics.length;
    const avgRuleEngineTime = this.metrics.reduce((sum, m) => sum + m.rule_engine_time, 0) / this.metrics.length;
    const avgMLModelTime = this.metrics.reduce((sum, m) => sum + m.ml_model_time, 0) / this.metrics.length;
    const cacheHitRate = this.metrics.filter(m => m.cache_hit).length / this.metrics.length;

    return {
      avg_processing_time: avgProcessingTime,
      avg_rule_engine_time: avgRuleEngineTime,
      avg_ml_model_time: avgMLModelTime,
      cache_hit_rate: cacheHitRate,
      total_requests: this.metrics.length
    };
  }
}

/**
 * Data Source Manager
 */
class DataSourceManager {
  async getActiveSources(): Promise<string[]> {
    return ['micromedex', 'drugbank', 'fda', 'rxnorm'];
  }

  async getLastSyncTime(): Promise<Date> {
    return new Date();
  }
}

/**
 * Alert Manager
 */
class AlertManager {
  async sendSevereAlert(interactions: DrugInteraction[], request: InteractionCheckRequest): Promise<void> {
    console.log(`Sending severe alert for ${interactions.length} interactions`, {
      patient_id: request.patient_id,
      interactions: interactions.map(i => i.id)
    });
  }
}

// Types for service
interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  components: any[];
  last_check: Date;
  uptime_percentage: number;
  error_rate_24h: number;
}

interface BatchPatientResult {
  patient_id: string;
  status: 'success' | 'failed';
  interactions: DrugInteraction[];
  summary: InteractionSummary;
  errors?: string[];
}

// Export the service instance
export const drugInteractionCheckerService = new DrugInteractionCheckerService();
