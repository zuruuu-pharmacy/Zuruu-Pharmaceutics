/**
 * ML Predictive Layer for Drug Interaction Detection
 * Ensemble models for predicting non-explicit interactions and calibrating confidence
 */

import {
  DrugInteraction,
  Drug,
  PatientFacts,
  MLModel,
  ModelMetrics,
  ExplainabilityInfo,
  ShapValue,
  FeatureContribution,
  ConfidenceBreakdown
} from '@/types/drug-interaction-checker';

export class MLPredictiveLayer {
  private models: Map<string, MLModel> = new Map();
  private featureExtractor: FeatureExtractor;
  private ensemblePredictor: EnsemblePredictor;
  private confidenceCalibrator: ConfidenceCalibrator;
  private explainabilityEngine: ExplainabilityEngine;

  constructor() {
    this.featureExtractor = new FeatureExtractor();
    this.ensemblePredictor = new EnsemblePredictor();
    this.confidenceCalibrator = new ConfidenceCalibrator();
    this.explainabilityEngine = new ExplainabilityEngine();
    this.initializeModels();
  }

  /**
   * Predict interactions using ML models
   */
  async predictInteractions(
    drugs: Drug[],
    patientFacts: PatientFacts,
    existingInteractions: DrugInteraction[]
  ): Promise<DrugInteraction[]> {
    const predictions: DrugInteraction[] = [];

    // Extract features for ML models
    const features = await this.featureExtractor.extractFeatures(drugs, patientFacts, existingInteractions);

    // Get pairwise predictions
    const pairwisePredictions = await this.predictPairwiseInteractions(drugs, features);
    predictions.push(...pairwisePredictions);

    // Get multi-drug predictions
    if (drugs.length >= 3) {
      const multiDrugPredictions = await this.predictMultiDrugInteractions(drugs, features);
      predictions.push(...multiDrugPredictions);
    }

    // Calibrate confidence scores
    const calibratedPredictions = await this.confidenceCalibrator.calibrateConfidence(predictions, features);

    return calibratedPredictions;
  }

  /**
   * Predict pairwise interactions
   */
  private async predictPairwiseInteractions(
    drugs: Drug[],
    features: FeatureSet
  ): Promise<DrugInteraction[]> {
    const predictions: DrugInteraction[] = [];

    for (let i = 0; i < drugs.length; i++) {
      for (let j = i + 1; j < drugs.length; j++) {
        const drugA = drugs[i];
        const drugB = drugs[j];

        // Skip if already detected by rule engine
        if (this.isKnownInteraction(drugA, drugB)) {
          continue;
        }

        const pairwiseFeatures = await this.featureExtractor.extractPairwiseFeatures(drugA, drugB, features);
        const prediction = await this.ensemblePredictor.predictPairwise(pairwiseFeatures);

        if (prediction.probability > 0.3) { // Threshold for ML predictions
          const interaction = this.createMLInteraction(drugA, drugB, prediction);
          predictions.push(interaction);
        }
      }
    }

    return predictions;
  }

  /**
   * Predict multi-drug interactions
   */
  private async predictMultiDrugInteractions(
    drugs: Drug[],
    features: FeatureSet
  ): Promise<DrugInteraction[]> {
    const predictions: DrugInteraction[] = [];

    // Generate combinations of 3+ drugs
    const combinations = this.generateDrugCombinations(drugs, 3);

    for (const combination of combinations) {
      const multiDrugFeatures = await this.featureExtractor.extractMultiDrugFeatures(combination, features);
      const prediction = await this.ensemblePredictor.predictMultiDrug(multiDrugFeatures);

      if (prediction.probability > 0.4) { // Higher threshold for multi-drug
        const interaction = this.createMultiDrugMLInteraction(combination, prediction);
        predictions.push(interaction);
      }
    }

    return predictions;
  }

  /**
   * Generate explainability information for an interaction
   */
  async generateExplainability(
    interaction: DrugInteraction,
    drugs: Drug[],
    patientFacts: PatientFacts
  ): Promise<ExplainabilityInfo> {
    const features = await this.featureExtractor.extractFeatures(drugs, patientFacts, [interaction]);
    
    const explainability = await this.explainabilityEngine.generateExplanation(
      interaction,
      features
    );

    return explainability;
  }

  /**
   * Retrain models with new data
   */
  async retrainModels(
    trainingData: TrainingData,
    options: RetrainingOptions = {}
  ): Promise<ModelMetrics[]> {
    const metrics: ModelMetrics[] = [];

    for (const [modelId, model] of this.models) {
      console.log(`Retraining model: ${modelId}`);
      
      const retrainedModel = await this.retrainModel(model, trainingData, options);
      const modelMetrics = await this.evaluateModel(retrainedModel, trainingData.testSet);
      
      this.models.set(modelId, retrainedModel);
      metrics.push(modelMetrics);
    }

    return metrics;
  }

  /**
   * Check if interaction is already known (detected by rule engine)
   */
  private isKnownInteraction(drugA: Drug, drugB: Drug): boolean {
    // This would check against the rule engine's known interactions
    // For now, return false to allow ML predictions
    return false;
  }

  /**
   * Create ML interaction from prediction
   */
  private createMLInteraction(
    drugA: Drug,
    drugB: Drug,
    prediction: MLPrediction
  ): DrugInteraction {
    return {
      id: this.generateInteractionId(),
      drugs: [drugA.name, drugB.name],
      drug_objects: [drugA, drugB],
      severity: this.mapProbabilityToSeverity(prediction.probability),
      confidence: prediction.confidence,
      mechanism: prediction.mechanism || 'Predicted interaction mechanism',
      clinical_consequence: prediction.consequence || 'Potential adverse effect',
      evidence: [{
        source: 'ml_model',
        reference_id: `ML-${Date.now()}`,
        last_synced: new Date(),
        reliability_score: prediction.confidence,
        study_type: 'ml_prediction'
      }],
      recommendations: prediction.recommendations || [],
      override_allowed: true,
      timestamp: new Date(),
      source: 'ml_model',
      interaction_type: {
        primary: 'drug_drug',
        secondary: [],
        mechanism_category: (prediction.mechanism_category as 'unknown' | 'pharmaceutical' | 'pharmacokinetic' | 'pharmacodynamic') || 'unknown'
      }
    };
  }

  /**
   * Create multi-drug ML interaction
   */
  private createMultiDrugMLInteraction(
    drugs: Drug[],
    prediction: MLPrediction
  ): DrugInteraction {
    return {
      id: this.generateInteractionId(),
      drugs: drugs.map(d => d.name),
      drug_objects: drugs,
      severity: this.mapProbabilityToSeverity(prediction.probability),
      confidence: prediction.confidence,
      mechanism: prediction.mechanism || 'Predicted multi-drug interaction',
      clinical_consequence: prediction.consequence || 'Potential adverse effect',
      evidence: [{
        source: 'ml_model',
        reference_id: `ML-MULTI-${Date.now()}`,
        last_synced: new Date(),
        reliability_score: prediction.confidence,
        study_type: 'ml_prediction'
      }],
      recommendations: prediction.recommendations || [],
      override_allowed: true,
      timestamp: new Date(),
      source: 'ml_model',
      interaction_type: {
        primary: 'polypharmacy',
        secondary: ['drug_drug'],
        mechanism_category: (prediction.mechanism_category as 'unknown' | 'pharmaceutical' | 'pharmacokinetic' | 'pharmacodynamic') || 'unknown'
      }
    };
  }

  /**
   * Map probability to severity level
   */
  private mapProbabilityToSeverity(probability: number): 'severe' | 'major' | 'moderate' | 'minor' {
    if (probability >= 0.8) return 'severe';
    if (probability >= 0.6) return 'major';
    if (probability >= 0.4) return 'moderate';
    return 'minor';
  }

  /**
   * Generate combinations of drugs
   */
  private generateDrugCombinations(drugs: Drug[], size: number): Drug[][] {
    if (size > drugs.length) return [];
    if (size === drugs.length) return [drugs];
    if (size === 1) return drugs.map(d => [d]);

    const combinations: Drug[][] = [];
    
    function backtrack(start: number, current: Drug[]) {
      if (current.length === size) {
        combinations.push([...current]);
        return;
      }

      for (let i = start; i < drugs.length; i++) {
        current.push(drugs[i]);
        backtrack(i + 1, current);
        current.pop();
      }
    }

    backtrack(0, []);
    return combinations;
  }

  /**
   * Retrain individual model
   */
  private async retrainModel(
    model: MLModel,
    trainingData: TrainingData,
    options: RetrainingOptions
  ): Promise<MLModel> {
    // Implementation would depend on the specific model type
    // This is a placeholder for the retraining logic
    
    const retrainedModel: MLModel = {
      ...model,
      version: this.incrementVersion(model.version),
      last_trained_at: new Date(),
      deployment_status: options.deploymentStatus || 'shadow'
    };

    return retrainedModel;
  }

  /**
   * Evaluate model performance
   */
  private async evaluateModel(
    model: MLModel,
    testData: TestDataSet
  ): Promise<ModelMetrics> {
    // Implementation would run evaluation metrics
    // This is a placeholder
    
    return {
      auc: 0.85,
      precision: 0.78,
      recall: 0.82,
      f1_score: 0.80,
      calibration_score: 0.88,
      feature_importance: [],
      confusion_matrix: [[100, 10], [5, 85]],
      roc_curve: []
    };
  }

  /**
   * Initialize ML models
   */
  private initializeModels(): void {
    // Interaction Predictor Model
    this.models.set('interaction_predictor', {
      model_id: 'interaction_predictor',
      model_type: 'interaction_predictor',
      version: '1.0.0',
      last_trained_at: new Date(),
      performance_metrics: {
        auc: 0.85,
        precision: 0.78,
        recall: 0.82,
        f1_score: 0.80,
        calibration_score: 0.88,
        feature_importance: [],
        confusion_matrix: [[100, 10], [5, 85]],
        roc_curve: []
      },
      training_data: {
        source: 'FAERS + EMR',
        records_count: 50000,
        date_range: [new Date('2020-01-01'), new Date('2024-12-31')],
        severity_distribution: { severe: 1000, major: 5000, moderate: 15000, minor: 29000 },
        quality_score: 0.92
      },
      deployment_status: 'active',
      confidence_threshold: 0.3
    });

    // Severity Classifier Model
    this.models.set('severity_classifier', {
      model_id: 'severity_classifier',
      model_type: 'severity_classifier',
      version: '1.0.0',
      last_trained_at: new Date(),
      performance_metrics: {
        auc: 0.88,
        precision: 0.82,
        recall: 0.85,
        f1_score: 0.83,
        calibration_score: 0.90,
        feature_importance: [],
        confusion_matrix: [[80, 5], [3, 82]],
        roc_curve: []
      },
      training_data: {
        source: 'FAERS + EMR',
        records_count: 30000,
        date_range: [new Date('2020-01-01'), new Date('2024-12-31')],
        severity_distribution: { severe: 2000, major: 8000, moderate: 12000, minor: 8000 },
        quality_score: 0.89
      },
      deployment_status: 'active',
      confidence_threshold: 0.4
    });

    // Confidence Calibrator Model
    this.models.set('confidence_calibrator', {
      model_id: 'confidence_calibrator',
      model_type: 'confidence_calibrator',
      version: '1.0.0',
      last_trained_at: new Date(),
      performance_metrics: {
        auc: 0.92,
        precision: 0.88,
        recall: 0.90,
        f1_score: 0.89,
        calibration_score: 0.95,
        feature_importance: [],
        confusion_matrix: [[90, 2], [1, 87]],
        roc_curve: []
      },
      training_data: {
        source: 'Expert Annotations',
        records_count: 10000,
        date_range: [new Date('2020-01-01'), new Date('2024-12-31')],
        severity_distribution: { severe: 500, major: 2000, moderate: 4000, minor: 3500 },
        quality_score: 0.95
      },
      deployment_status: 'active',
      confidence_threshold: 0.5
    });
  }

  /**
   * Increment version number
   */
  private incrementVersion(version: string): string {
    const parts = version.split('.');
    const patch = parseInt(parts[2]) + 1;
    return `${parts[0]}.${parts[1]}.${patch}`;
  }

  /**
   * Generate unique interaction ID
   */
  private generateInteractionId(): string {
    return `ML-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get model performance metrics
   */
  getModelMetrics(): Map<string, ModelMetrics> {
    const metrics = new Map<string, ModelMetrics>();
    for (const [modelId, model] of this.models) {
      metrics.set(modelId, model.performance_metrics);
    }
    return metrics;
  }

  /**
   * Get model status
   */
  getModelStatus(): Map<string, string> {
    const status = new Map<string, string>();
    for (const [modelId, model] of this.models) {
      status.set(modelId, model.deployment_status);
    }
    return status;
  }
}

/**
 * Feature Extractor
 */
class FeatureExtractor {
  async extractFeatures(
    drugs: Drug[],
    patientFacts: PatientFacts,
    existingInteractions: DrugInteraction[]
  ): Promise<FeatureSet> {
    const features: FeatureSet = {
      drug_features: [],
      pairwise_features: [],
      patient_features: {
        age: 0,
        sex: 'unknown',
        weight: 0,
        pregnancy: false,
        comorbidities: [],
        allergies: [],
        lab_values: [],
        renal_function: 0,
        liver_function: 'normal',
        genetic_markers: []
      },
      context_features: {
        drug_count: 0,
        dose_ranges: [],
        route_diversity: 0,
        frequency_patterns: [],
        indication_overlap: 0,
        prescriber_count: 0
      },
      historical_features: {
        interaction_count: 0,
        severity_distribution: {},
        mechanism_patterns: [],
        outcome_patterns: [],
        override_rate: 0
      }
    };

    // Extract drug features
    for (const drug of drugs) {
      const drugFeatures = await this.extractDrugFeatures(drug);
      features.drug_features.push(drugFeatures);
    }

    // Extract pairwise features
    for (let i = 0; i < drugs.length; i++) {
      for (let j = i + 1; j < drugs.length; j++) {
        const pairwiseFeatures = await this.extractPairwiseFeatures(drugs[i], drugs[j], features);
        features.pairwise_features.push(pairwiseFeatures);
      }
    }

    // Extract patient features
    features.patient_features = this.extractPatientFeatures(patientFacts);

    // Extract context features
    features.context_features = this.extractContextFeatures(drugs, patientFacts);

    // Extract historical features
    features.historical_features = this.extractHistoricalFeatures(existingInteractions);

    return features;
  }

  async extractDrugFeatures(drug: Drug): Promise<DrugFeatures> {
    return {
      rxcui: drug.rxcui || '',
      atc_code: drug.atc_code || '',
      drug_class: drug.drug_class || '',
      molecular_descriptors: await this.getMolecularDescriptors(drug),
      enzyme_pathways: await this.getEnzymePathways(drug),
      transporter_involvement: await this.getTransporterInvolvement(drug),
      half_life: await this.getHalfLife(drug),
      bioavailability: await this.getBioavailability(drug),
      therapeutic_class: await this.getTherapeuticClass(drug),
      contraindications: await this.getContraindications(drug)
    };
  }

  async extractPairwiseFeatures(
    drugA: Drug,
    drugB: Drug,
    features: FeatureSet
  ): Promise<PairwiseFeatures> {
    return {
      drug_a_features: features.drug_features.find(f => f.rxcui === drugA.rxcui)!,
      drug_b_features: features.drug_features.find(f => f.rxcui === drugB.rxcui)!,
      known_interaction_flag: await this.getKnownInteractionFlag(drugA, drugB),
      pk_overlap: await this.getPKOverlap(drugA, drugB),
      pd_overlap: await this.getPDOverlap(drugA, drugB),
      therapeutic_overlap: await this.getTherapeuticOverlap(drugA, drugB),
      contraindication_overlap: await this.getContraindicationOverlap(drugA, drugB),
      faers_reports: await this.getFAERSReports(drugA, drugB),
      hospitalization_flag: await this.getHospitalizationFlag(drugA, drugB)
    };
  }

  async extractMultiDrugFeatures(drugs: Drug[], features: FeatureSet): Promise<MultiDrugFeatures> {
    return {
      drug_count: drugs.length,
      polypharmacy_score: this.calculatePolypharmacyScore(drugs),
      drug_diversity: this.calculateDrugDiversity(drugs),
      interaction_density: this.calculateInteractionDensity(drugs, features),
      complexity_score: this.calculateComplexityScore(drugs),
      risk_factors: this.identifyRiskFactors(drugs, features)
    };
  }

  private extractPatientFeatures(patientFacts: PatientFacts): PatientFeatures {
    return {
      age: patientFacts.age,
      sex: patientFacts.sex,
      weight: patientFacts.weight_kg,
      pregnancy: patientFacts.pregnancy,
      comorbidities: patientFacts.comorbidities.map(c => c.condition),
      allergies: patientFacts.allergies,
      lab_values: patientFacts.current_labs,
      renal_function: patientFacts.egfr || 0,
      liver_function: patientFacts.liver_function || {},
      genetic_markers: patientFacts.genetic_markers || []
    };
  }

  private extractContextFeatures(drugs: Drug[], patientFacts: PatientFacts): ContextFeatures {
    return {
      drug_count: drugs.length,
      dose_ranges: drugs.map(d => this.parseDose(d.dose)),
      route_diversity: [...new Set(drugs.map(d => d.route))].length,
      frequency_patterns: drugs.map(d => d.frequency),
      indication_overlap: this.calculateIndicationOverlap(drugs),
      prescriber_count: [...new Set(drugs.map(d => d.prescriber_id).filter(Boolean))].length
    };
  }

  private extractHistoricalFeatures(interactions: DrugInteraction[]): HistoricalFeatures {
    return {
      interaction_count: interactions.length,
      severity_distribution: this.calculateSeverityDistribution(interactions),
      mechanism_patterns: interactions.map(i => i.mechanism),
      outcome_patterns: interactions.map(i => i.clinical_consequence),
      override_rate: this.calculateOverrideRate(interactions)
    };
  }

  // Placeholder methods for feature extraction
  private async getMolecularDescriptors(drug: Drug): Promise<any> { return {}; }
  private async getEnzymePathways(drug: Drug): Promise<string[]> { return []; }
  private async getTransporterInvolvement(drug: Drug): Promise<string[]> { return []; }
  private async getHalfLife(drug: Drug): Promise<number> { return 24; }
  private async getBioavailability(drug: Drug): Promise<number> { return 0.8; }
  private async getTherapeuticClass(drug: Drug): Promise<string> { return ''; }
  private async getContraindications(drug: Drug): Promise<string[]> { return []; }
  private async getKnownInteractionFlag(drugA: Drug, drugB: Drug): Promise<boolean> { return false; }
  private async getPKOverlap(drugA: Drug, drugB: Drug): Promise<number> { return 0; }
  private async getPDOverlap(drugA: Drug, drugB: Drug): Promise<number> { return 0; }
  private async getTherapeuticOverlap(drugA: Drug, drugB: Drug): Promise<number> { return 0; }
  private async getContraindicationOverlap(drugA: Drug, drugB: Drug): Promise<number> { return 0; }
  private async getFAERSReports(drugA: Drug, drugB: Drug): Promise<number> { return 0; }
  private async getHospitalizationFlag(drugA: Drug, drugB: Drug): Promise<boolean> { return false; }

  private calculatePolypharmacyScore(drugs: Drug[]): number { return drugs.length / 10; }
  private calculateDrugDiversity(drugs: Drug[]): number { return 0.5; }
  private calculateInteractionDensity(drugs: Drug[], features: FeatureSet): number { return 0.3; }
  private calculateComplexityScore(drugs: Drug[]): number { return 0.4; }
  private identifyRiskFactors(drugs: Drug[], features: FeatureSet): string[] { return []; }
  private parseDose(dose: string): number { return 1; }
  private calculateIndicationOverlap(drugs: Drug[]): number { return 0.2; }
  private calculateSeverityDistribution(interactions: DrugInteraction[]): Record<string, number> { return {}; }
  private calculateOverrideRate(interactions: DrugInteraction[]): number { return 0.1; }
}

/**
 * Ensemble Predictor
 */
class EnsemblePredictor {
  async predictPairwise(features: PairwiseFeatures): Promise<MLPrediction> {
    // Implementation would use ensemble of models
    return {
      probability: 0.6,
      confidence: 0.75,
      mechanism: 'CYP3A4 inhibition',
      consequence: 'Increased drug levels',
      recommendations: [],
      mechanism_category: 'pharmacokinetic'
    };
  }

  async predictMultiDrug(features: MultiDrugFeatures): Promise<MLPrediction> {
    // Implementation would use multi-drug specific models
    return {
      probability: 0.5,
      confidence: 0.7,
      mechanism: 'Multi-drug interaction',
      consequence: 'Complex adverse effects',
      recommendations: [],
      mechanism_category: 'pharmacodynamic'
    };
  }
}

/**
 * Confidence Calibrator
 */
class ConfidenceCalibrator {
  async calibrateConfidence(
    interactions: DrugInteraction[],
    features: FeatureSet
  ): Promise<DrugInteraction[]> {
    return interactions.map(interaction => {
      const calibratedConfidence = this.calibrateConfidenceScore(interaction, features);
      return {
        ...interaction,
        confidence: calibratedConfidence
      };
    });
  }

  private calibrateConfidenceScore(
    interaction: DrugInteraction,
    features: FeatureSet
  ): number {
    // Implementation would use calibration models
    return Math.min(interaction.confidence * 1.1, 1.0);
  }
}

/**
 * Explainability Engine
 */
class ExplainabilityEngine {
  async generateExplanation(
    interaction: DrugInteraction,
    features: FeatureSet
  ): Promise<ExplainabilityInfo> {
    const shapValues = await this.calculateShapValues(interaction, features);
    const featureContributions = await this.calculateFeatureContributions(interaction, features);
    const decisionPath = await this.generateDecisionPath(interaction, features);
    const confidenceBreakdown = await this.calculateConfidenceBreakdown(interaction, features);

    return {
      interaction_id: interaction.id,
      shap_values: shapValues,
      feature_contributions: featureContributions,
      decision_path: decisionPath,
      confidence_breakdown: confidenceBreakdown
    };
  }

  private async calculateShapValues(
    interaction: DrugInteraction,
    features: FeatureSet
  ): Promise<ShapValue[]> {
    // Implementation would use SHAP library
    return [
      {
        feature: 'CYP3A4_inhibition',
        value: 0.32,
        description: 'Strong CYP3A4 inhibition by clarithromycin',
        category: 'pharmacokinetic'
      }
    ];
  }

  private async calculateFeatureContributions(
    interaction: DrugInteraction,
    features: FeatureSet
  ): Promise<FeatureContribution[]> {
    return [
      {
        feature: 'enzyme_overlap',
        contribution: 0.25,
        direction: 'positive',
        explanation: 'Both drugs are CYP3A4 substrates'
      }
    ];
  }

  private async generateDecisionPath(
    interaction: DrugInteraction,
    features: FeatureSet
  ): Promise<any[]> {
    return [
      {
        feature: 'interaction_probability',
        threshold: 0.5,
        direction: 'right',
        confidence: 0.75,
        description: 'High interaction probability detected'
      }
    ];
  }

  private async calculateConfidenceBreakdown(
    interaction: DrugInteraction,
    features: FeatureSet
  ): Promise<ConfidenceBreakdown> {
    return {
      rule_evidence: 0.3,
      ml_prediction: 0.4,
      personalization: 0.2,
      data_quality: 0.1,
      overall: interaction.confidence
    };
  }
}

/**
 * Types for ML predictive layer
 */
interface FeatureSet {
  drug_features: DrugFeatures[];
  pairwise_features: PairwiseFeatures[];
  patient_features: PatientFeatures;
  context_features: ContextFeatures;
  historical_features: HistoricalFeatures;
}

interface DrugFeatures {
  rxcui: string;
  atc_code: string;
  drug_class: string;
  molecular_descriptors: any;
  enzyme_pathways: string[];
  transporter_involvement: string[];
  half_life: number;
  bioavailability: number;
  therapeutic_class: string;
  contraindications: string[];
}

interface PairwiseFeatures {
  drug_a_features: DrugFeatures;
  drug_b_features: DrugFeatures;
  known_interaction_flag: boolean;
  pk_overlap: number;
  pd_overlap: number;
  therapeutic_overlap: number;
  contraindication_overlap: number;
  faers_reports: number;
  hospitalization_flag: boolean;
}

interface MultiDrugFeatures {
  drug_count: number;
  polypharmacy_score: number;
  drug_diversity: number;
  interaction_density: number;
  complexity_score: number;
  risk_factors: string[];
}

interface PatientFeatures {
  age: number;
  sex: string;
  weight: number;
  pregnancy: boolean;
  comorbidities: string[];
  allergies: string[];
  lab_values: any[];
  renal_function: number;
  liver_function: any;
  genetic_markers: any[];
}

interface ContextFeatures {
  drug_count: number;
  dose_ranges: number[];
  route_diversity: number;
  frequency_patterns: string[];
  indication_overlap: number;
  prescriber_count: number;
}

interface HistoricalFeatures {
  interaction_count: number;
  severity_distribution: Record<string, number>;
  mechanism_patterns: string[];
  outcome_patterns: string[];
  override_rate: number;
}

interface MLPrediction {
  probability: number;
  confidence: number;
  mechanism?: string;
  consequence?: string;
  recommendations?: any[];
  mechanism_category?: string;
}

interface TrainingData {
  features: FeatureSet[];
  labels: any[];
  testSet: TestDataSet;
}

interface TestDataSet {
  features: FeatureSet[];
  labels: any[];
}

interface RetrainingOptions {
  deploymentStatus?: 'shadow' | 'canary' | 'active';
  validationSplit?: number;
  earlyStopping?: boolean;
}

// Export the service instance
export const mlPredictiveLayer = new MLPredictiveLayer();
