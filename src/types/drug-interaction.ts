export interface Drug {
  id: string;
  name: string;
  genericName: string;
  brandName: string;
  drugClass: string;
  therapeuticClass: string;
  mechanism: string;
  indications: string[];
  contraindications: string[];
  sideEffects: string[];
  dosageForm: string;
  strength: string;
  route: string;
  halfLife: number; // hours
  metabolism: string[];
  excretion: string;
  proteinBinding: number; // percentage
  bioavailability: number; // percentage
  cypEnzymes: {
    substrate: string[];
    inhibitor: string[];
    inducer: string[];
  };
  pregnancyCategory: 'A' | 'B' | 'C' | 'D' | 'X';
  lactationRisk: 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
  blackBoxWarning?: string;
  rxNormId?: string;
  drugBankId?: string;
  pubChemId?: string;
  fdaId?: string;
}

export interface DrugInteraction {
  id: string;
  drugA: Drug;
  drugB: Drug;
  interactionType: 'major' | 'moderate' | 'minor' | 'none';
  severity: number; // 0-100
  mechanism: string;
  clinicalConsequence: string;
  evidenceLevel: 'high' | 'moderate' | 'low';
  sources: InteractionSource[];
  onset: 'immediate' | 'delayed' | 'unknown';
  duration: 'short' | 'medium' | 'long' | 'unknown';
  reversibility: 'reversible' | 'irreversible' | 'unknown';
  management: string;
  monitoring: string[];
  contraindicated: boolean;
  requiresDoseAdjustment: boolean;
  alternativeDrugs: Drug[];
  lastUpdated: Date;
  confidence: number; // AI confidence score 0-100
}

export interface InteractionSource {
  name: string;
  url: string;
  reliability: 'high' | 'moderate' | 'low';
  lastUpdated: Date;
}

export interface AIPrediction {
  id: string;
  drugPair: {
    drugA: Drug;
    drugB: Drug;
  };
  predictedSeverity: number; // 0-100
  confidence: number; // 0-100
  mechanisticBasis: string;
  riskFactors: string[];
  timeSeriesAnalysis: {
    peakRiskTime: number; // hours
    riskDuration: number; // hours
    riskPattern: 'immediate' | 'delayed' | 'cumulative' | 'variable';
  };
  patientSpecificFactors: {
    age: number;
    gender: 'male' | 'female' | 'other';
    comorbidities: string[];
    allergies: string[];
    currentMedications: Drug[];
    renalFunction: 'normal' | 'mild' | 'moderate' | 'severe';
    hepaticFunction: 'normal' | 'mild' | 'moderate' | 'severe';
  };
  modelVersion: string;
  trainingData: string[];
  lastUpdated: Date;
}

export interface SafetyRecommendation {
  id: string;
  interactionId: string;
  priority: 'high' | 'medium' | 'low';
  action: 'contraindicate' | 'monitor' | 'adjust_dose' | 'replace_drug' | 'proceed_with_caution';
  description: string;
  rationale: string;
  implementation: string[];
  monitoring: string[];
  followUp: string;
  alternativeOptions: {
    drug: Drug;
    reason: string;
    interactionScore: number;
  }[];
  requiresPrescriberConsultation: boolean;
  pharmacistOverrideAllowed: boolean;
  documentationRequired: boolean;
}

export interface InteractionAlert {
  id: string;
  type: 'interaction' | 'allergy' | 'contraindication' | 'dose_adjustment';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  message: string;
  drugPair: {
    drugA: Drug;
    drugB: Drug;
  };
  patientId?: string;
  prescriptionId?: string;
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  actionTaken: 'viewed' | 'ignored' | 'addressed' | 'escalated';
  justification?: string;
  requiresAction: boolean;
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number; // kg
  height: number; // cm
  allergies: {
    drug: string;
    reaction: string;
    severity: 'mild' | 'moderate' | 'severe';
  }[];
  comorbidities: {
    condition: string;
    severity: 'mild' | 'moderate' | 'severe';
    controlled: boolean;
  }[];
  currentMedications: {
    drug: Drug;
    dosage: string;
    frequency: string;
    startDate: Date;
    prescriber: string;
  }[];
  renalFunction: {
    status: 'normal' | 'mild' | 'moderate' | 'severe';
    gfr: number;
    lastTested: Date;
  };
  hepaticFunction: {
    status: 'normal' | 'mild' | 'moderate' | 'severe';
    alt: number;
    ast: number;
    lastTested: Date;
  };
  pregnancyStatus: 'not_pregnant' | 'pregnant' | 'lactating' | 'unknown';
  smokingStatus: 'never' | 'former' | 'current';
  alcoholUse: 'none' | 'light' | 'moderate' | 'heavy';
}

export interface InteractionCheckRequest {
  drugs: Drug[];
  patientProfile?: PatientProfile;
  includeAI: boolean;
  includeAlternatives: boolean;
  severityThreshold: 'all' | 'moderate' | 'major';
}

export interface InteractionCheckResult {
  requestId: string;
  timestamp: Date;
  interactions: DrugInteraction[];
  aiPredictions: AIPrediction[];
  recommendations: SafetyRecommendation[];
  alerts: InteractionAlert[];
  summary: {
    totalInteractions: number;
    majorInteractions: number;
    moderateInteractions: number;
    minorInteractions: number;
    contraindicated: number;
    requiresMonitoring: number;
    overallRiskScore: number;
  };
  processingTime: number; // milliseconds
  modelVersion: string;
}

export interface DrugSearchResult {
  drug: Drug;
  score: number;
  matchType: 'exact' | 'partial' | 'fuzzy';
  highlightedName: string;
}

export interface InteractionHeatmapData {
  drugs: Drug[];
  interactions: {
    drugAIndex: number;
    drugBIndex: number;
    severity: number;
    type: 'major' | 'moderate' | 'minor' | 'none';
  }[];
  riskZones: {
    x: number;
    y: number;
    radius: number;
    severity: number;
  }[];
}

export interface InteractionReport {
  id: string;
  patientId?: string;
  prescriptionId?: string;
  pharmacistId: string;
  timestamp: Date;
  interactions: DrugInteraction[];
  recommendations: SafetyRecommendation[];
  actions: {
    action: string;
    timestamp: Date;
    pharmacistId: string;
    justification?: string;
  }[];
  exportFormat: 'pdf' | 'excel' | 'json';
  status: 'draft' | 'finalized' | 'sent';
  sentTo?: string;
  sentAt?: Date;
}

export interface InteractionSettings {
  enableAI: boolean;
  enableRealTimeAlerts: boolean;
  severityThreshold: 'all' | 'moderate' | 'major';
  autoCheckOnPrescription: boolean;
  requireJustificationForOverride: boolean;
  enablePatientSpecificWarnings: boolean;
  enableHeatmapVisualization: boolean;
  enableExport: boolean;
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
    inApp: boolean;
  };
  dataSources: {
    drugBank: boolean;
    fda: boolean;
    micromedex: boolean;
    pubChem: boolean;
    rxNorm: boolean;
  };
  aiModelSettings: {
    confidenceThreshold: number;
    enableTimeSeriesAnalysis: boolean;
    enablePatientSpecificPrediction: boolean;
    modelVersion: string;
  };
}
