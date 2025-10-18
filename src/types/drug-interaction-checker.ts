// AI Drug Interaction Checker - Complete Data Models
// Developer-grade specification implementation

export type SeverityLevel = 'none' | 'minor' | 'moderate' | 'major' | 'severe';

export type MechanismType = 'pharmacokinetic' | 'pharmacodynamic' | 'pharmaceutical' | 'unknown';

export interface PatientFacts {
  patient_id: string;
  age: number;
  sex: 'male' | 'female' | 'other';
  weight_kg: number;
  height_cm?: number;
  pregnancy: boolean;
  pregnancy_weeks?: number;
  allergies: string[];
  comorbidities: Comorbidity[];
  current_labs: LabValue[];
  creatinine?: number;
  egfr?: number;
  inr?: number;
  liver_function?: LiverFunction;
  renal_function?: RenalFunction;
  ethnicity?: string;
  genetic_markers?: GeneticMarker[];
}

export interface Comorbidity {
  condition: string;
  severity: 'mild' | 'moderate' | 'severe';
  icd10_code?: string;
  onset_date?: Date;
  controlled: boolean;
}

export interface LabValue {
  test_name: string;
  value: number;
  unit: string;
  reference_range: string;
  date: Date;
  abnormal: boolean;
}

export interface LiverFunction {
  alt?: number;
  ast?: number;
  bilirubin?: number;
  albumin?: number;
  inr?: number;
  child_pugh_score?: number;
  meld_score?: number;
}

export interface RenalFunction {
  creatinine: number;
  egfr: number;
  ckd_stage: number;
  dialysis: boolean;
  transplant: boolean;
}

export interface GeneticMarker {
  gene: string;
  variant: string;
  phenotype: string;
  clinical_significance: string;
}

export interface Drug {
  name: string;
  rxcui?: string;
  strength: string;
  dose: string;
  frequency: string;
  route: 'oral' | 'iv' | 'im' | 'sc' | 'topical' | 'inhalation' | 'other';
  start_date?: Date;
  end_date?: Date;
  indication?: string;
  prescriber_id?: string;
  generic_name?: string;
  brand_name?: string;
  atc_code?: string;
  drug_class?: string;
  is_combination?: boolean;
  components?: Drug[];
}

export interface DrugInteraction {
  id: string;
  drugs: string[];
  drug_objects: Drug[];
  severity: 'severe' | 'major' | 'moderate' | 'minor' | 'none';
  confidence: number; // 0-1
  mechanism: string;
  clinical_consequence: string;
  evidence: Evidence[];
  recommendations: Recommendation[];
  override_allowed: boolean;
  patient_adjustments?: PatientAdjustments;
  timestamp: Date;
  source: 'rule_engine' | 'ml_model' | 'hybrid';
  interaction_type: InteractionType;
  pharmacokinetic_details?: PharmacokineticDetails;
  pharmacodynamic_details?: PharmacodynamicDetails;
}

export interface InteractionType {
  primary: 'drug_drug' | 'drug_disease' | 'drug_allergy' | 'drug_food' | 'drug_lab' | 'polypharmacy';
  secondary?: string[];
  mechanism_category: 'pharmacokinetic' | 'pharmacodynamic' | 'pharmaceutical' | 'unknown';
}

export interface PharmacokineticDetails {
  enzymes_affected: Enzyme[];
  transporters_affected: Transporter[];
  absorption_changes?: string;
  distribution_changes?: string;
  metabolism_changes?: string;
  elimination_changes?: string;
  half_life_impact?: string;
  bioavailability_impact?: string;
}

export interface PharmacodynamicDetails {
  receptor_effects?: string[];
  pathway_interactions?: string[];
  additive_effects?: string[];
  antagonistic_effects?: string[];
  synergistic_effects?: string[];
}

export interface Enzyme {
  name: string;
  type: 'cyp' | 'other';
  inhibition_strength?: 'weak' | 'moderate' | 'strong';
  induction_strength?: 'weak' | 'moderate' | 'strong';
  substrate_drugs?: string[];
}

export interface Transporter {
  name: string;
  type: 'p_gp' | 'bcrp' | 'oatp' | 'other';
  effect: 'inhibition' | 'induction' | 'substrate';
  clinical_significance: string;
}

export interface Evidence {
  source: 'micromedex' | 'drugbank' | 'fda' | 'pubmed' | 'lexicomp' | 'local' | 'ml_model';
  reference_id: string;
  url?: string;
  title?: string;
  snippet?: string;
  last_synced: Date;
  reliability_score: number; // 0-1
  study_type?: 'case_report' | 'case_series' | 'cohort' | 'rct' | 'meta_analysis' | 'expert_opinion' | 'ml_prediction';
  patient_count?: number;
  severity_rating?: string;
}

export interface Recommendation {
  type: 'substitute' | 'monitor' | 'dose_adjust' | 'contraindicate' | 'consult' | 'discontinue';
  drug?: string;
  alternative_drug?: string;
  reason: string;
  available: boolean;
  cost_impact?: 'low' | 'medium' | 'high';
  efficacy_rating?: number; // 0-1
  monitoring_plan?: MonitoringPlan;
  dose_adjustment?: DoseAdjustment;
}

export interface MonitoringPlan {
  lab_tests: LabTest[];
  frequency: string;
  duration: string;
  symptoms_to_watch: string[];
  action_thresholds: ActionThreshold[];
}

export interface LabTest {
  test_name: string;
  baseline_value?: number;
  target_range: string;
  critical_values?: string;
}

export interface ActionThreshold {
  condition: string;
  threshold: number;
  action: string;
}

export interface DoseAdjustment {
  current_dose: string;
  recommended_dose: string;
  adjustment_factor: number;
  rationale: string;
  monitoring_required: boolean;
}

export interface PatientAdjustments {
  age_factor: number;
  weight_factor: number;
  renal_factor: number;
  hepatic_factor: number;
  pregnancy_factor: number;
  comorbidity_factors: Record<string, number>;
  genetic_factors: Record<string, number>;
  lab_factors: Record<string, number>;
  overall_adjustment: number;
}

export interface InteractionCheckRequest {
  patient_id: string;
  patient_facts: PatientFacts;
  drugs: Drug[];
  context: RequestContext;
  options?: CheckOptions;
}

export interface RequestContext {
  prescriber_id?: string;
  visit_id?: string;
  prescription_id?: string;
  user_id: string;
  session_id?: string;
  source: 'prescription' | 'dispense' | 'refill' | 'consultation' | 'batch_check' | 'batch_scanner' | 'interaction_checker_ui' | 'prescription_integration';
}

export interface CheckOptions {
  include_ml_predictions: boolean;
  include_alternatives: boolean;
  severity_threshold: 'minor' | 'moderate' | 'major' | 'severe';
  max_alternatives: number;
  include_monitoring_plans: boolean;
  personalization_enabled: boolean;
}

export interface InteractionCheckResponse {
  request_id: string;
  interactions: DrugInteraction[];
  summary: InteractionSummary;
  alternatives: AlternativeDrug[];
  monitoring_recommendations: MonitoringPlan[];
  metadata: ResponseMetadata;
}

export interface InteractionSummary {
  max_severity: string;
  flag: boolean;
  total_interactions: number;
  severity_counts: Record<string, number>;
  requires_attention: boolean;
  estimated_risk_score: number; // 0-1
  confidence_range: [number, number];
}

export interface AlternativeDrug {
  drug_name: string;
  rxcui: string;
  reason: string;
  efficacy_rating: number;
  safety_rating: number;
  cost_rating: number;
  availability: boolean;
  stock_quantity?: number;
  requires_prescription_change: boolean;
  therapeutic_equivalence: number; // 0-1
}

export interface ResponseMetadata {
  processing_time_ms: number;
  rule_engine_time_ms: number;
  ml_model_time_ms?: number;
  cache_hit: boolean;
  data_sources_used: string[];
  model_version: string;
  last_data_sync: Date;
  confidence_threshold: number;
}

export interface OverrideRequest {
  interaction_id: string;
  user_id: string;
  reason_code: OverrideReason;
  reason_text: string;
  clinical_justification: string;
  attachment_urls?: string[];
  second_signoff_user_id?: string;
  prescriber_consulted: boolean;
  prescriber_response?: string;
  monitoring_plan_implemented?: boolean;
}

export interface OverrideReason {
  code: 'clinical_justification' | 'lack_alternatives' | 'short_course' | 'consulted_prescriber' | 'patient_preference' | 'emergency' | 'other';
  description: string;
  requires_second_signoff: boolean;
}

export interface OverrideRecord {
  id: string;
  interaction_id: string;
  run_log_id: string;
  user_id: string;
  reason_code: string;
  reason_text: string;
  clinical_justification: string;
  second_signoff_user_id?: string;
  second_signoff_timestamp?: Date;
  attachment_urls: string[];
  timestamp: Date;
  approved: boolean;
  prescriber_consulted: boolean;
  prescriber_response?: string;
  monitoring_plan_implemented: boolean;
  incident_created: boolean;
  incident_id?: string;
}

export interface RunLog {
  id: string;
  request_id: string;
  patient_id: string;
  drugs: Drug[];
  results: InteractionCheckResponse;
  user_id: string;
  timestamp: Date;
  processing_time_ms: number;
  cache_hit: boolean;
  errors: string[];
  warnings: string[];
}

export interface DataSource {
  source_id: string;
  name: string;
  type: 'interaction_db' | 'drug_db' | 'safety_alert' | 'formulary';
  priority: number;
  last_synced_at: Date;
  version: string;
  status: 'active' | 'inactive' | 'error';
  sync_frequency_hours: number;
  reliability_score: number;
  coverage_stats: CoverageStats;
}

export interface CoverageStats {
  total_drugs: number;
  total_interactions: number;
  severity_distribution: Record<string, number>;
  last_updated: Date;
  completeness_score: number;
}

export interface MLModel {
  model_id: string;
  model_type: 'interaction_predictor' | 'severity_classifier' | 'confidence_calibrator';
  version: string;
  last_trained_at: Date;
  performance_metrics: ModelMetrics;
  training_data: TrainingDataInfo;
  deployment_status: 'shadow' | 'canary' | 'active' | 'deprecated';
  confidence_threshold: number;
}

export interface ModelMetrics {
  auc: number;
  precision: number;
  recall: number;
  f1_score: number;
  calibration_score: number;
  feature_importance: FeatureImportance[];
  confusion_matrix: number[][];
  roc_curve: ROCPoint[];
}

export interface FeatureImportance {
  feature_name: string;
  importance_score: number;
  feature_type: string;
  description: string;
}

export interface ROCPoint {
  threshold: number;
  tpr: number;
  fpr: number;
}

export interface TrainingDataInfo {
  source: string;
  records_count: number;
  date_range: [Date, Date];
  severity_distribution: Record<string, number>;
  quality_score: number;
}

export interface ExplainabilityInfo {
  interaction_id: string;
  shap_values: ShapValue[];
  feature_contributions: FeatureContribution[];
  decision_path: DecisionNode[];
  confidence_breakdown: ConfidenceBreakdown;
}

export interface ShapValue {
  feature: string;
  value: number;
  description: string;
  category: string;
}

export interface FeatureContribution {
  feature: string;
  contribution: number;
  direction: 'positive' | 'negative';
  explanation: string;
}

export interface DecisionNode {
  feature: string;
  threshold: number;
  direction: 'left' | 'right';
  confidence: number;
  description: string;
}

export interface ConfidenceBreakdown {
  rule_evidence: number;
  ml_prediction: number;
  personalization: number;
  data_quality: number;
  overall: number;
}

export interface AlertSettings {
  severity_thresholds: Record<string, boolean>;
  notification_channels: NotificationChannel[];
  escalation_rules: EscalationRule[];
  auto_actions: AutoAction[];
  user_preferences: UserPreference[];
}

export interface NotificationChannel {
  type: 'email' | 'sms' | 'push' | 'in_app';
  enabled: boolean;
  recipients: string[];
  severity_levels: string[];
}

export interface EscalationRule {
  condition: string;
  severity_levels: string[];
  action: string;
  timeout_minutes: number;
  recipients: string[];
}

export interface AutoAction {
  trigger: string;
  action: string;
  severity_levels: string[];
  enabled: boolean;
  parameters: Record<string, any>;
}

export interface UserPreference {
  user_id: string;
  alert_frequency: 'immediate' | 'batch' | 'daily';
  severity_preferences: Record<string, boolean>;
  notification_preferences: Record<string, boolean>;
  auto_override_threshold: number;
}

export interface AuditLog {
  id: string;
  event_type: 'interaction_check' | 'override' | 'data_sync' | 'model_update' | 'config_change';
  user_id: string;
  timestamp: Date;
  details: Record<string, any>;
  ip_address: string;
  user_agent: string;
  session_id: string;
  patient_id?: string;
  interaction_id?: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
}

export interface PerformanceMetrics {
  timestamp: Date;
  api_latency_p50: number;
  api_latency_p95: number;
  api_latency_p99: number;
  error_rate: number;
  cache_hit_rate: number;
  ml_model_latency: number;
  rule_engine_latency: number;
  override_rate: number;
  alert_counts: Record<string, number>;
  active_users: number;
  requests_per_minute: number;
}

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  components: ComponentHealth[];
  last_check: Date;
  uptime_percentage: number;
  error_rate_24h: number;
}

export interface ComponentHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  response_time_ms: number;
  error_rate: number;
  last_check: Date;
  details: string;
}

export interface DrugNormalizationResult {
  input_text: string;
  normalized_drugs: NormalizedDrug[];
  confidence: number;
  fuzzy_matches: FuzzyMatch[];
  unrecognized: boolean;
  suggestions: string[];
}

export interface NormalizedDrug {
  rxcui: string;
  name: string;
  generic_name: string;
  brand_names: string[];
  strength: string;
  dosage_form: string;
  route: string;
  atc_code: string;
  drug_class: string;
  confidence: number;
  is_combination: boolean;
}

export interface FuzzyMatch {
  rxcui: string;
  name: string;
  similarity_score: number;
  match_type: 'exact' | 'fuzzy' | 'phonetic' | 'semantic';
}

export interface BatchCheckRequest {
  patient_ids: string[];
  check_options: CheckOptions;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  callback_url?: string;
  notify_on_completion: boolean;
}

export interface BatchCheckResult {
  batch_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  total_patients: number;
  processed_patients: number;
  failed_patients: number;
  results: BatchPatientResult[];
  started_at: Date;
  completed_at?: Date;
  errors: string[];
}

export interface BatchPatientResult {
  patient_id: string;
  status: 'success' | 'failed';
  interactions: DrugInteraction[];
  summary: InteractionSummary;
  errors?: string[];
}

export interface ReportRequest {
  report_type: 'interaction_summary' | 'override_analysis' | 'performance_metrics' | 'adverse_events';
  date_range: [Date, Date];
  filters: ReportFilters;
  format: 'json' | 'csv' | 'pdf' | 'excel';
  include_details: boolean;
}

export interface ReportFilters {
  patient_ids?: string[];
  drug_classes?: string[];
  severity_levels?: string[];
  prescriber_ids?: string[];
  interaction_types?: string[];
  override_reasons?: string[];
}

export interface ReportResult {
  report_id: string;
  status: 'generating' | 'ready' | 'failed';
  download_url?: string;
  generated_at: Date;
  expires_at: Date;
  record_count: number;
  file_size_bytes: number;
}

// UI Component Props
export interface InteractionAlertProps {
  interaction: DrugInteraction;
  onOverride: (override: OverrideRequest) => void;
  onSuggestAlternative: (drug: string) => void;
  onContactPrescriber: (interaction: DrugInteraction) => void;
  onViewDetails: (interaction: DrugInteraction) => void;
  onScheduleMonitoring: (plan: MonitoringPlan) => void;
  showActions: boolean;
  compact: boolean;
}

export interface InteractionPanelProps {
  interactions: DrugInteraction[];
  onInteractionSelect: (interaction: DrugInteraction) => void;
  onOverride: (override: OverrideRequest) => void;
  onBulkAction: (action: string, interactions: DrugInteraction[]) => void;
  showFilters: boolean;
  showSummary: boolean;
  sortBy: 'severity' | 'confidence' | 'timestamp' | 'drugs';
  groupBy: 'severity' | 'drug_class' | 'mechanism' | 'none';
}

export interface OverrideModalProps {
  interaction: DrugInteraction;
  onConfirm: (override: OverrideRequest) => void;
  onCancel: () => void;
  onUploadAttachment: (file: File) => Promise<string>;
  secondSignoffRequired: boolean;
  availableSignoffUsers: User[];
}

export interface User {
  id: string;
  name: string;
  role: 'pharmacist' | 'manager' | 'physician' | 'admin';
  license_number?: string;
  specialization?: string;
  can_override_severe: boolean;
  can_second_signoff: boolean;
}

export interface AlternativeDrugModalProps {
  interaction: DrugInteraction;
  alternatives: AlternativeDrug[];
  onSelect: (alternative: AlternativeDrug) => void;
  onCancel: () => void;
  showInventory: boolean;
  showCost: boolean;
  showEfficacy: boolean;
}

export interface MonitoringPlanModalProps {
  plan: MonitoringPlan;
  interaction: DrugInteraction;
  onSchedule: (plan: MonitoringPlan) => void;
  onCancel: () => void;
  onEdit: (plan: MonitoringPlan) => void;
  editable: boolean;
}

export interface ExplainabilityModalProps {
  explainability: ExplainabilityInfo;
  interaction: DrugInteraction;
  onClose: () => void;
  showTechnicalDetails: boolean;
  showShapValues: boolean;
  showDecisionPath: boolean;
}

// Configuration Types
export interface DICConfiguration {
  system_settings: SystemSettings;
  data_sources: DataSource[];
  ml_models: MLModel[];
  personalization_rules: PersonalizationRule[];
  alert_settings: AlertSettings;
  override_workflows: OverrideWorkflow[];
  monitoring_config: MonitoringConfig;
}

export interface SystemSettings {
  enable_ml_predictions: boolean;
  enable_personalization: boolean;
  enable_real_time_checks: boolean;
  enable_batch_processing: boolean;
  cache_ttl_minutes: number;
  max_concurrent_requests: number;
  default_confidence_threshold: number;
  emergency_mode: boolean;
}

export interface PersonalizationRule {
  rule_id: string;
  name: string;
  condition: string;
  adjustment_factor: number;
  severity_upgrade: boolean;
  applicable_interactions: string[];
  patient_criteria: PatientCriteria;
  enabled: boolean;
}

export interface PatientCriteria {
  age_range?: [number, number];
  weight_range?: [number, number];
  egfr_range?: [number, number];
  conditions?: string[];
  medications?: string[];
  labs?: LabCriteria[];
  pregnancy: boolean;
  genetic_markers?: string[];
}

export interface LabCriteria {
  test_name: string;
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte';
  value: number;
  unit: string;
}

export interface OverrideWorkflow {
  severity_level: string;
  requires_second_signoff: boolean;
  allowed_reasons: string[];
  mandatory_fields: string[];
  escalation_rules: string[];
  notification_recipients: string[];
  incident_creation: boolean;
}

export interface MonitoringConfig {
  performance_metrics: boolean;
  model_drift_detection: boolean;
  alert_fatigue_monitoring: boolean;
  user_behavior_analysis: boolean;
  data_quality_monitoring: boolean;
  audit_logging: boolean;
  retention_policies: RetentionPolicy[];
}

export interface RetentionPolicy {
  data_type: string;
  retention_days: number;
  archive_after_days: number;
  delete_after_days: number;
  compliance_requirements: string[];
}
