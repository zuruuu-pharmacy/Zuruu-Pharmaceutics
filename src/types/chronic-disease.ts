export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  photo?: string;
  dateOfBirth: Date;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  insuranceInfo: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
  lastCheckup: Date;
  nextScheduledCheckup?: Date;
  stabilityScore: number; // 0-100
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  activeDiseases: ChronicDisease[];
  medications: Medication[];
  allergies: Allergy[];
  lifestyleFactors: LifestyleFactors;
}

export interface ChronicDisease {
  id: string;
  name: string;
  type: DiseaseType;
  diagnosisDate: Date;
  severity: 'mild' | 'moderate' | 'severe';
  status: 'stable' | 'improving' | 'deteriorating' | 'unstable';
  currentMedications: string[];
  targetValues: DiseaseTargets;
  lastAssessment: Date;
  nextAssessment?: Date;
  notes: string;
  complications: string[];
  riskFactors: string[];
}

export type DiseaseType = 
  | 'diabetes'
  | 'hypertension'
  | 'asthma'
  | 'copd'
  | 'hyperlipidemia'
  | 'cardiovascular'
  | 'thyroid'
  | 'kidney_disease'
  | 'arthritis'
  | 'depression'
  | 'anxiety'
  | 'other';

export interface DiseaseTargets {
  diabetes?: {
    fastingGlucose: { min: number; max: number; unit: string };
    postprandialGlucose: { min: number; max: number; unit: string };
    hba1c: { min: number; max: number; unit: string };
    bloodPressure: { systolic: { min: number; max: number }; diastolic: { min: number; max: number } };
  };
  hypertension?: {
    systolic: { min: number; max: number };
    diastolic: { min: number; max: number };
    heartRate: { min: number; max: number };
  };
  asthma?: {
    peakFlow: { min: number; max: number; unit: string };
    fev1: { min: number; max: number; unit: string };
    symptomFrequency: { min: number; max: number; unit: string };
  };
  hyperlipidemia?: {
    ldl: { min: number; max: number; unit: string };
    hdl: { min: number; max: number; unit: string };
    triglycerides: { min: number; max: number; unit: string };
    totalCholesterol: { min: number; max: number; unit: string };
  };
  cardiovascular?: {
    heartRate: { min: number; max: number };
    bloodPressure: { systolic: { min: number; max: number }; diastolic: { min: number; max: number } };
    ejectionFraction?: { min: number; max: number; unit: string };
  };
  thyroid?: {
    tsh: { min: number; max: number; unit: string };
    t3: { min: number; max: number; unit: string };
    t4: { min: number; max: number; unit: string };
  };
}

export interface VitalReading {
  id: string;
  patientId: string;
  diseaseType: DiseaseType;
  readingType: VitalType;
  value: number;
  unit: string;
  timestamp: Date;
  source: 'manual' | 'device' | 'lab' | 'ehr';
  deviceId?: string;
  notes?: string;
  isAbnormal: boolean;
  severity: 'normal' | 'mild' | 'moderate' | 'severe';
}

export type VitalType = 
  | 'blood_pressure_systolic'
  | 'blood_pressure_diastolic'
  | 'heart_rate'
  | 'blood_glucose_fasting'
  | 'blood_glucose_postprandial'
  | 'hba1c'
  | 'ldl_cholesterol'
  | 'hdl_cholesterol'
  | 'triglycerides'
  | 'total_cholesterol'
  | 'peak_flow'
  | 'fev1'
  | 'tsh'
  | 't3'
  | 't4'
  | 'bmi'
  | 'weight'
  | 'height'
  | 'temperature'
  | 'oxygen_saturation';

export interface Medication {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  frequency: string;
  route: string;
  startDate: Date;
  endDate?: Date;
  prescriber: string;
  indication: string;
  adherence: number; // percentage
  lastTaken?: Date;
  nextDue?: Date;
  sideEffects: string[];
  effectiveness: 'excellent' | 'good' | 'fair' | 'poor';
  notes: string;
}

export interface Allergy {
  id: string;
  allergen: string;
  reaction: string;
  severity: 'mild' | 'moderate' | 'severe';
  onsetDate: Date;
  notes: string;
}

export interface LifestyleFactors {
  smoking: {
    status: 'never' | 'former' | 'current';
    packYears?: number;
    quitDate?: Date;
  };
  alcohol: {
    status: 'none' | 'light' | 'moderate' | 'heavy';
    drinksPerWeek?: number;
  };
  exercise: {
    frequency: 'none' | 'light' | 'moderate' | 'intense';
    minutesPerWeek?: number;
    type?: string;
  };
  diet: {
    quality: 'poor' | 'fair' | 'good' | 'excellent';
    restrictions: string[];
    supplements: string[];
  };
  sleep: {
    hoursPerNight: number;
    quality: 'poor' | 'fair' | 'good' | 'excellent';
    disorders: string[];
  };
  stress: {
    level: 'low' | 'moderate' | 'high';
    management: string[];
  };
}

export interface AIPrediction {
  id: string;
  patientId: string;
  diseaseType: DiseaseType;
  predictionType: 'disease_progression' | 'medication_response' | 'complication_risk' | 'adherence_risk';
  prediction: string;
  confidence: number; // 0-100
  timeframe: string;
  riskScore: number; // 0-100
  factors: string[];
  recommendations: string[];
  modelVersion: string;
  generatedAt: Date;
  expiresAt: Date;
}

export interface AIAlert {
  id: string;
  patientId: string;
  diseaseType: DiseaseType;
  alertType: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  actionRequired: boolean;
  actionTaken?: string;
  actionTakenBy?: string;
  actionTakenAt?: Date;
  relatedReadings: string[];
  relatedMedications: string[];
}

export interface CareRecommendation {
  id: string;
  patientId: string;
  diseaseType: DiseaseType;
  type: 'medication_adjustment' | 'lifestyle_change' | 'monitoring' | 'referral' | 'education';
  priority: 'low' | 'moderate' | 'high' | 'urgent';
  title: string;
  description: string;
  rationale: string;
  implementation: string[];
  expectedOutcome: string;
  timeframe: string;
  monitoringRequired: string[];
  followUpRequired: boolean;
  followUpDate?: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdBy: string;
  createdAt: Date;
  completedBy?: string;
  completedAt?: Date;
  notes: string;
}

export interface CarePlan {
  id: string;
  patientId: string;
  diseaseType: DiseaseType;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  goals: CareGoal[];
  interventions: CareIntervention[];
  monitoringSchedule: MonitoringSchedule[];
  milestones: CareMilestone[];
  createdBy: string;
  createdAt: Date;
  lastUpdated: Date;
  nextReview: Date;
}

export interface CareGoal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  unit: string;
  targetDate: Date;
  status: 'not_started' | 'in_progress' | 'achieved' | 'not_achieved';
  progress: number; // 0-100
  notes: string;
}

export interface CareIntervention {
  id: string;
  type: 'medication' | 'lifestyle' | 'monitoring' | 'education' | 'referral';
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  frequency: string;
  status: 'active' | 'completed' | 'discontinued';
  effectiveness: number; // 0-100
  notes: string;
}

export interface MonitoringSchedule {
  id: string;
  vitalType: VitalType;
  frequency: string;
  timeOfDay?: string;
  device?: string;
  reminderEnabled: boolean;
  lastReading?: Date;
  nextReading?: Date;
  notes: string;
}

export interface CareMilestone {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  status: 'pending' | 'achieved' | 'missed';
  achievedDate?: Date;
  notes: string;
}

export interface DiseaseTrend {
  id: string;
  patientId: string;
  diseaseType: DiseaseType;
  vitalType: VitalType;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  dataPoints: TrendDataPoint[];
  trend: 'improving' | 'stable' | 'deteriorating' | 'volatile';
  trendStrength: number; // -100 to 100
  averageValue: number;
  minValue: number;
  maxValue: number;
  lastUpdated: Date;
}

export interface TrendDataPoint {
  timestamp: Date;
  value: number;
  unit: string;
  isAbnormal: boolean;
  notes?: string;
}

export interface DiseaseReport {
  id: string;
  patientId: string;
  diseaseType: DiseaseType;
  reportType: 'summary' | 'detailed' | 'trend_analysis' | 'risk_assessment';
  title: string;
  generatedAt: Date;
  generatedBy: string;
  period: {
    startDate: Date;
    endDate: Date;
  };
  summary: {
    totalReadings: number;
    abnormalReadings: number;
    averageValues: Record<string, number>;
    trends: Record<string, string>;
    riskScore: number;
    stabilityScore: number;
  };
  sections: ReportSection[];
  recommendations: string[];
  attachments: string[];
  status: 'draft' | 'final' | 'sent';
  sentTo?: string[];
  sentAt?: Date;
}

export interface ReportSection {
  id: string;
  title: string;
  type: 'text' | 'chart' | 'table' | 'image';
  content: any;
  order: number;
}

export interface DiseaseAnalytics {
  patientId: string;
  diseaseType: DiseaseType;
  period: {
    startDate: Date;
    endDate: Date;
  };
  metrics: {
    adherenceRate: number;
    stabilityScore: number;
    riskScore: number;
    improvementRate: number;
    complicationRisk: number;
  };
  trends: {
    vitalTrends: Record<string, string>;
    medicationTrends: Record<string, string>;
    lifestyleTrends: Record<string, string>;
  };
  comparisons: {
    vsPreviousPeriod: Record<string, number>;
    vsPopulationAverage: Record<string, number>;
    vsTargetValues: Record<string, number>;
  };
  insights: string[];
  recommendations: string[];
  lastUpdated: Date;
}

export interface ChronicDiseaseSettings {
  enableAI: boolean;
  enableRealTimeAlerts: boolean;
  enableWearableIntegration: boolean;
  enableEHRIntegration: boolean;
  alertThresholds: {
    critical: number;
    high: number;
    moderate: number;
    low: number;
  };
  monitoringFrequency: {
    diabetes: string;
    hypertension: string;
    asthma: string;
    hyperlipidemia: string;
    cardiovascular: string;
    thyroid: string;
  };
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
    inApp: boolean;
  };
  dataRetention: {
    readings: number; // days
    reports: number; // days
    predictions: number; // days
  };
  privacySettings: {
    shareWithPatient: boolean;
    shareWithFamily: boolean;
    shareWithPhysician: boolean;
    anonymizeData: boolean;
  };
}
