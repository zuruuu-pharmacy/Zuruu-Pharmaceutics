/**
 * Deterministic Rule Engine for Drug Interaction Detection
 * Uses curated interaction database to produce authoritative alerts
 */

import {
  DrugInteraction,
  InteractionType,
  Evidence,
  Recommendation,
  Drug,
  PatientFacts,
  PatientAdjustments,
  SeverityLevel,
  MechanismType
} from '@/types/drug-interaction-checker';

export class RuleEngine {
  private interactionDatabase: InteractionDatabase;
  private severityRules: SeverityRuleSet;
  private mechanismRules: MechanismRuleSet;
  private personalizationRules: PersonalizationRuleSet;
  private cache: Map<string, DrugInteraction[]> = new Map();

  constructor() {
    this.interactionDatabase = new InteractionDatabase();
    this.severityRules = new SeverityRuleSet();
    this.mechanismRules = new MechanismRuleSet();
    this.personalizationRules = new PersonalizationRuleSet();
  }

  /**
   * Check for interactions between drugs
   */
  async checkInteractions(
    drugs: Drug[],
    patientFacts?: PatientFacts,
    options: RuleEngineOptions = {}
  ): Promise<DrugInteraction[]> {
    const cacheKey = this.generateCacheKey(drugs, patientFacts);
    
    // Check cache first
    if (this.cache.has(cacheKey) && !options.bypassCache) {
      return this.cache.get(cacheKey)!;
    }

    const interactions: DrugInteraction[] = [];

    // Check pairwise interactions
    for (let i = 0; i < drugs.length; i++) {
      for (let j = i + 1; j < drugs.length; j++) {
        const drugA = drugs[i];
        const drugB = drugs[j];
        
        const pairwiseInteractions = await this.checkPairwiseInteraction(drugA, drugB);
        interactions.push(...pairwiseInteractions);
      }
    }

    // Check multi-drug interactions (3+ drugs)
    if (drugs.length >= 3) {
      const multiDrugInteractions = await this.checkMultiDrugInteractions(drugs);
      interactions.push(...multiDrugInteractions);
    }

    // Check drug-disease interactions
    if (patientFacts) {
      const drugDiseaseInteractions = await this.checkDrugDiseaseInteractions(drugs, patientFacts);
      interactions.push(...drugDiseaseInteractions);
    }

    // Check drug-allergy interactions
    if (patientFacts?.allergies) {
      const drugAllergyInteractions = await this.checkDrugAllergyInteractions(drugs, patientFacts.allergies);
      interactions.push(...drugAllergyInteractions);
    }

    // Apply personalization rules
    if (patientFacts && options.enablePersonalization !== false) {
      const personalizedInteractions = this.applyPersonalizationRules(interactions, patientFacts);
      interactions.splice(0, interactions.length, ...personalizedInteractions);
    }

    // Filter by severity threshold
    const filteredInteractions = this.filterBySeverity(interactions, options.severityThreshold);

    // Cache results
    this.cache.set(cacheKey, filteredInteractions);

    return filteredInteractions;
  }

  /**
   * Check pairwise interaction between two drugs
   */
  private async checkPairwiseInteraction(
    drugA: Drug,
    drugB: Drug
  ): Promise<DrugInteraction[]> {
    const interactions: DrugInteraction[] = [];

    // Get interaction data from database
    const interactionData = await this.interactionDatabase.getInteractionData(
      drugA.rxcui || drugA.name,
      drugB.rxcui || drugB.name
    );

    if (!interactionData) {
      return interactions;
    }

    for (const data of interactionData) {
      const interaction = this.createInteractionFromData(data, [drugA, drugB]);
      interactions.push(interaction);
    }

    return interactions;
  }

  /**
   * Check multi-drug interactions
   */
  private async checkMultiDrugInteractions(drugs: Drug[]): Promise<DrugInteraction[]> {
    const interactions: DrugInteraction[] = [];
    
    // Check for known multi-drug interaction patterns
    const patterns = await this.interactionDatabase.getMultiDrugPatterns(drugs.length);
    
    for (const pattern of patterns) {
      const matches = this.findPatternMatches(drugs, pattern);
      if (matches.length > 0) {
        const interaction = this.createMultiDrugInteraction(matches, pattern);
        interactions.push(interaction);
      }
    }

    return interactions;
  }

  /**
   * Check drug-disease interactions
   */
  private async checkDrugDiseaseInteractions(
    drugs: Drug[],
    patientFacts: PatientFacts
  ): Promise<DrugInteraction[]> {
    const interactions: DrugInteraction[] = [];

    for (const drug of drugs) {
      for (const comorbidity of patientFacts.comorbidities) {
        const interactionData = await this.interactionDatabase.getDrugDiseaseInteraction(
          drug.rxcui || drug.name,
          comorbidity.condition
        );

        if (interactionData) {
          const interaction = this.createDrugDiseaseInteraction(
            drug,
            comorbidity,
            interactionData
          );
          interactions.push(interaction);
        }
      }
    }

    return interactions;
  }

  /**
   * Check drug-allergy interactions
   */
  private async checkDrugAllergyInteractions(
    drugs: Drug[],
    allergies: string[]
  ): Promise<DrugInteraction[]> {
    const interactions: DrugInteraction[] = [];

    for (const drug of drugs) {
      for (const allergy of allergies) {
        const interactionData = await this.interactionDatabase.getDrugAllergyInteraction(
          drug.rxcui || drug.name,
          allergy
        );

        if (interactionData) {
          const interaction = this.createDrugAllergyInteraction(
            drug,
            allergy,
            interactionData
          );
          interactions.push(interaction);
        }
      }
    }

    return interactions;
  }

  /**
   * Create interaction from database data
   */
  private createInteractionFromData(
    data: InteractionData,
    drugs: Drug[]
  ): DrugInteraction {
    return {
      id: this.generateInteractionId(),
      drugs: drugs.map(d => d.name),
      drug_objects: drugs,
      severity: data.severity as SeverityLevel,
      confidence: data.confidence || 0.95,
      mechanism: data.mechanism,
      clinical_consequence: data.clinical_consequence,
      evidence: data.evidence || [],
      recommendations: data.recommendations || [],
      override_allowed: data.severity !== 'severe',
      timestamp: new Date(),
      source: 'rule_engine',
      interaction_type: {
        primary: (data.interaction_type?.primary as 'polypharmacy' | 'drug_drug' | 'drug_disease' | 'drug_allergy' | 'drug_food' | 'drug_lab') || 'drug_drug',
        secondary: data.interaction_type?.secondary || [],
        mechanism_category: (data.interaction_type?.mechanism_category as 'unknown' | 'pharmaceutical' | 'pharmacokinetic' | 'pharmacodynamic') || 'pharmacokinetic'
      },
      pharmacokinetic_details: data.pharmacokinetic_details,
      pharmacodynamic_details: data.pharmacodynamic_details
    };
  }

  /**
   * Create multi-drug interaction
   */
  private createMultiDrugInteraction(
    matchingDrugs: Drug[],
    pattern: MultiDrugPattern
  ): DrugInteraction {
    return {
      id: this.generateInteractionId(),
      drugs: matchingDrugs.map(d => d.name),
      drug_objects: matchingDrugs,
      severity: pattern.severity,
      confidence: pattern.confidence,
      mechanism: pattern.mechanism,
      clinical_consequence: pattern.clinical_consequence,
      evidence: pattern.evidence,
      recommendations: pattern.recommendations,
      override_allowed: pattern.severity !== 'severe',
      timestamp: new Date(),
      source: 'rule_engine',
      interaction_type: {
        primary: 'polypharmacy',
        secondary: ['drug_drug'],
        mechanism_category: 'pharmacodynamic'
      }
    };
  }

  /**
   * Create drug-disease interaction
   */
  private createDrugDiseaseInteraction(
    drug: Drug,
    comorbidity: any,
    data: DrugDiseaseInteractionData
  ): DrugInteraction {
    return {
      id: this.generateInteractionId(),
      drugs: [drug.name, comorbidity.condition],
      drug_objects: [drug],
      severity: data.severity,
      confidence: data.confidence,
      mechanism: data.mechanism,
      clinical_consequence: data.clinical_consequence,
      evidence: data.evidence,
      recommendations: data.recommendations,
      override_allowed: data.severity !== 'severe',
      timestamp: new Date(),
      source: 'rule_engine',
      interaction_type: {
        primary: 'drug_disease',
        secondary: [],
        mechanism_category: 'pharmacodynamic'
      }
    };
  }

  /**
   * Create drug-allergy interaction
   */
  private createDrugAllergyInteraction(
    drug: Drug,
    allergy: string,
    data: DrugAllergyInteractionData
  ): DrugInteraction {
    return {
      id: this.generateInteractionId(),
      drugs: [drug.name, allergy],
      drug_objects: [drug],
      severity: 'severe', // Allergies are typically severe
      confidence: 0.98,
      mechanism: `Cross-reactivity with ${allergy}`,
      clinical_consequence: `Risk of allergic reaction including anaphylaxis`,
      evidence: data.evidence,
      recommendations: [
        {
          type: 'contraindicate',
          reason: 'Patient has documented allergy',
          available: true
        }
      ],
      override_allowed: false,
      timestamp: new Date(),
      source: 'rule_engine',
      interaction_type: {
        primary: 'drug_allergy',
        secondary: [],
        mechanism_category: 'pharmacodynamic'
      }
    };
  }

  /**
   * Apply personalization rules based on patient factors
   */
  private applyPersonalizationRules(
    interactions: DrugInteraction[],
    patientFacts: PatientFacts
  ): DrugInteraction[] {
    return interactions.map(interaction => {
      const adjustments = this.personalizationRules.calculateAdjustments(
        interaction,
        patientFacts
      );

      if (adjustments.overall_adjustment !== 1.0) {
        return {
          ...interaction,
          patient_adjustments: adjustments,
          severity: this.adjustSeverity(interaction.severity, adjustments),
          confidence: Math.min(interaction.confidence * adjustments.overall_adjustment, 1.0)
        };
      }

      return interaction;
    });
  }

  /**
   * Adjust severity based on patient factors
   */
  private adjustSeverity(
    currentSeverity: SeverityLevel,
    adjustments: PatientAdjustments
  ): SeverityLevel {
    if (adjustments.overall_adjustment > 1.2) {
      // Upgrade severity
      const severityLevels: SeverityLevel[] = ['minor', 'moderate', 'major', 'severe'];
      const currentIndex = severityLevels.indexOf(currentSeverity);
      if (currentIndex < severityLevels.length - 1) {
        return severityLevels[currentIndex + 1];
      }
    }
    
    return currentSeverity;
  }

  /**
   * Filter interactions by severity threshold
   */
  private filterBySeverity(
    interactions: DrugInteraction[],
    threshold?: SeverityLevel
  ): DrugInteraction[] {
    if (!threshold) {
      return interactions;
    }

    const severityOrder: Record<SeverityLevel, number> = {
      'minor': 1,
      'moderate': 2,
      'major': 3,
      'severe': 4,
      'none': 0
    };

    const thresholdLevel = severityOrder[threshold];
    
    return interactions.filter(interaction => 
      severityOrder[interaction.severity] >= thresholdLevel
    );
  }

  /**
   * Find pattern matches in drug list
   */
  private findPatternMatches(drugs: Drug[], pattern: MultiDrugPattern): Drug[] {
    const matchingDrugs: Drug[] = [];
    
    for (const requiredDrug of pattern.required_drugs) {
      const match = drugs.find(drug => 
        drug.rxcui === requiredDrug.rxcui || 
        drug.name.toLowerCase().includes(requiredDrug.name.toLowerCase())
      );
      
      if (match) {
        matchingDrugs.push(match);
      } else {
        return []; // Pattern not satisfied
      }
    }
    
    return matchingDrugs;
  }

  /**
   * Generate unique interaction ID
   */
  private generateInteractionId(): string {
    return `INT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate cache key
   */
  private generateCacheKey(drugs: Drug[], patientFacts?: PatientFacts): string {
    const drugIds = drugs.map(d => d.rxcui || d.name).sort().join(',');
    const patientId = patientFacts?.patient_id || 'no-patient';
    return `${drugIds}_${patientId}`;
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): any {
    return {
      size: this.cache.size,
      memoryUsage: this.estimateMemoryUsage()
    };
  }

  private estimateMemoryUsage(): number {
    let size = 0;
    for (const [key, value] of this.cache) {
      size += key.length + JSON.stringify(value).length;
    }
    return size;
  }
}

/**
 * Interaction Database
 */
class InteractionDatabase {
  private data: Map<string, InteractionData[]> = new Map();

  async getInteractionData(drugA: string, drugB: string): Promise<InteractionData[] | null> {
    const key = this.generateKey(drugA, drugB);
    return this.data.get(key) || null;
  }

  async getMultiDrugPatterns(drugCount: number): Promise<MultiDrugPattern[]> {
    // Return patterns for the specified number of drugs
    return [];
  }

  async getDrugDiseaseInteraction(drug: string, disease: string): Promise<DrugDiseaseInteractionData | null> {
    // Return drug-disease interaction data
    return null;
  }

  async getDrugAllergyInteraction(drug: string, allergy: string): Promise<DrugAllergyInteractionData | null> {
    // Return drug-allergy interaction data
    return null;
  }

  private generateKey(drugA: string, drugB: string): string {
    // Ensure consistent ordering
    const [first, second] = [drugA, drugB].sort();
    return `${first}|${second}`;
  }
}

/**
 * Severity Rule Set
 */
class SeverityRuleSet {
  private rules: SeverityRule[] = [];

  getSeverityLevel(mechanism: string, evidence: Evidence[]): SeverityLevel {
    // Apply rules to determine severity level
    return 'moderate';
  }
}

/**
 * Mechanism Rule Set
 */
class MechanismRuleSet {
  private rules: MechanismRule[] = [];

  getMechanismDetails(mechanism: string): MechanismDetails {
    // Return detailed mechanism information
    return {
      category: 'pharmacokinetic',
      enzymes: [],
      transporters: [],
      description: mechanism
    };
  }
}

/**
 * Personalization Rule Set
 */
class PersonalizationRuleSet {
  private rules: PersonalizationRule[] = [];

  calculateAdjustments(
    interaction: DrugInteraction,
    patientFacts: PatientFacts
  ): PatientAdjustments {
    const adjustments: PatientAdjustments = {
      age_factor: 1.0,
      weight_factor: 1.0,
      renal_factor: 1.0,
      hepatic_factor: 1.0,
      pregnancy_factor: 1.0,
      comorbidity_factors: {},
      genetic_factors: {},
      lab_factors: {},
      overall_adjustment: 1.0
    };

    // Age adjustments
    if (patientFacts.age > 75) {
      adjustments.age_factor = 1.2;
    } else if (patientFacts.age < 18) {
      adjustments.age_factor = 1.1;
    }

    // Renal function adjustments
    if (patientFacts.egfr && patientFacts.egfr < 30) {
      adjustments.renal_factor = 1.3;
    } else if (patientFacts.egfr && patientFacts.egfr < 60) {
      adjustments.renal_factor = 1.1;
    }

    // Pregnancy adjustments
    if (patientFacts.pregnancy) {
      adjustments.pregnancy_factor = 1.5;
    }

    // Calculate overall adjustment
    adjustments.overall_adjustment = 
      adjustments.age_factor *
      adjustments.weight_factor *
      adjustments.renal_factor *
      adjustments.hepatic_factor *
      adjustments.pregnancy_factor;

    return adjustments;
  }
}

/**
 * Types for rule engine
 */
interface RuleEngineOptions {
  severityThreshold?: SeverityLevel;
  enablePersonalization?: boolean;
  bypassCache?: boolean;
}

interface InteractionData {
  severity: string;
  confidence?: number;
  mechanism: string;
  clinical_consequence: string;
  evidence?: Evidence[];
  recommendations?: Recommendation[];
  interaction_type?: {
    primary: string;
    secondary: string[];
    mechanism_category: string;
  };
  pharmacokinetic_details?: any;
  pharmacodynamic_details?: any;
}

interface MultiDrugPattern {
  required_drugs: Drug[];
  severity: SeverityLevel;
  confidence: number;
  mechanism: string;
  clinical_consequence: string;
  evidence: Evidence[];
  recommendations: Recommendation[];
}

interface DrugDiseaseInteractionData {
  severity: SeverityLevel;
  confidence: number;
  mechanism: string;
  clinical_consequence: string;
  evidence: Evidence[];
  recommendations: Recommendation[];
}

interface DrugAllergyInteractionData {
  evidence: Evidence[];
}

interface SeverityRule {
  condition: string;
  severity: SeverityLevel;
  confidence: number;
}

interface MechanismRule {
  mechanism: string;
  details: MechanismDetails;
}

interface PersonalizationRule {
  condition: string;
  adjustment_factor: number;
}

interface MechanismDetails {
  category: string;
  enzymes: string[];
  transporters: string[];
  description: string;
}


// Export the service instance
export const ruleEngine = new RuleEngine();
