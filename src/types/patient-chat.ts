export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  photo?: string;
  phone: string;
  email: string;
  address: string;
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
  medicalHistory: {
    diseases: string[];
    allergies: string[];
    currentMedications: string[];
    lastCheckup: Date;
  };
  preferences: {
    language: string;
    communicationMethod: 'chat' | 'video' | 'voice' | 'all';
    notificationPreferences: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  status: 'online' | 'idle' | 'offline';
  lastSeen: Date;
  adherenceScore: number; // 0-100
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'patient' | 'pharmacist' | 'ai';
  content: string;
  messageType: 'text' | 'image' | 'file' | 'voice' | 'video' | 'prescription' | 'lab_report';
  timestamp: Date;
  readAt?: Date;
  deliveredAt?: Date;
  attachments?: ChatAttachment[];
  reactions?: MessageReaction[];
  isEncrypted: boolean;
  metadata?: {
    aiConfidence?: number;
    drugInteractionFlag?: boolean;
    symptomAnalysis?: string;
    recommendation?: string;
  };
}

export interface ChatAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: Date;
  isEncrypted: boolean;
  description?: string;
}

export interface MessageReaction {
  id: string;
  userId: string;
  emoji: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  patientId: string;
  pharmacistId: string;
  title: string;
  status: 'active' | 'pending' | 'closed' | 'archived';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  category: 'general' | 'medication_question' | 'side_effects' | 'refill_request' | 'emergency' | 'follow_up';
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
  lastMessage?: ChatMessage;
  messageCount: number;
  unreadCount: number;
  tags: string[];
  aiSummary?: string;
  followUpRequired: boolean;
  followUpDate?: Date;
  consultationType: 'chat' | 'video' | 'voice' | 'mixed';
  duration?: number; // in minutes
  satisfaction?: number; // 1-5 rating
  notes?: string;
}

export interface VideoCall {
  id: string;
  conversationId: string;
  patientId: string;
  pharmacistId: string;
  status: 'scheduled' | 'ringing' | 'active' | 'ended' | 'missed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
  duration?: number; // in minutes
  quality: 'hd' | 'sd' | 'low';
  recordingEnabled: boolean;
  recordingUrl?: string;
  participants: CallParticipant[];
  notes?: string;
  summary?: string;
  aiTranscription?: string;
  screenShareEnabled: boolean;
  drawingEnabled: boolean;
  language?: string;
  translationEnabled: boolean;
}

export interface CallParticipant {
  id: string;
  name: string;
  role: 'patient' | 'pharmacist' | 'doctor' | 'caregiver';
  joinedAt: Date;
  leftAt?: Date;
  isMuted: boolean;
  isVideoEnabled: boolean;
  connectionQuality: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface AIConsultationSupport {
  id: string;
  conversationId: string;
  type: 'drug_interaction' | 'symptom_analysis' | 'recommendation' | 'alert' | 'translation';
  confidence: number; // 0-100
  content: string;
  evidence: string[];
  recommendations: string[];
  severity: 'low' | 'moderate' | 'high' | 'critical';
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  actionTaken?: string;
  actionTakenBy?: string;
  actionTakenAt?: Date;
}

export interface ConsultationNote {
  id: string;
  conversationId: string;
  patientId: string;
  pharmacistId: string;
  type: 'soap' | 'summary' | 'follow_up' | 'prescription_review';
  content: {
    subjective?: string;
    objective?: string;
    assessment?: string;
    plan?: string;
    summary?: string;
    recommendations?: string[];
    followUpActions?: string[];
  };
  aiGenerated: boolean;
  aiConfidence?: number;
  keywords: string[];
  medicationsDiscussed: string[];
  sideEffectsReported: string[];
  vitalSigns?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    weight?: number;
    bloodGlucose?: number;
  };
  timestamp: Date;
  lastModified: Date;
  isFinalized: boolean;
  patientFeedback?: {
    rating: number;
    comments: string;
  };
}

export interface ConsultationSchedule {
  id: string;
  patientId: string;
  pharmacistId: string;
  type: 'video' | 'voice' | 'chat';
  title: string;
  description: string;
  scheduledAt: Date;
  duration: number; // in minutes
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  reminderSent: boolean;
  reminderSentAt?: Date;
  reminderMethod: 'email' | 'sms' | 'push' | 'all';
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: Date;
  };
  notes?: string;
  preparationNotes?: string[];
  followUpRequired: boolean;
  followUpDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'message' | 'call_request' | 'follow_up' | 'alert' | 'reminder' | 'system';
  title: string;
  message: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  category: 'communication' | 'scheduling' | 'medical' | 'system';
  timestamp: Date;
  read: boolean;
  readAt?: Date;
  actionRequired: boolean;
  actionUrl?: string;
  actionText?: string;
  metadata?: {
    conversationId?: string;
    patientId?: string;
    callId?: string;
    scheduleId?: string;
  };
  expiresAt?: Date;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

export interface ChatAnalytics {
  id: string;
  pharmacistId: string;
  period: {
    startDate: Date;
    endDate: Date;
  };
  metrics: {
    totalConversations: number;
    totalMessages: number;
    totalVideoCalls: number;
    totalVoiceCalls: number;
    averageResponseTime: number; // in minutes
    averageCallDuration: number; // in minutes
    patientSatisfaction: number; // 1-5 average
    aiAssistanceUsed: number;
    drugInteractionsDetected: number;
    followUpCompliance: number; // percentage
    emergencyEscalations: number;
  };
  trends: {
    dailyConversations: Record<string, number>;
    hourlyActivity: Record<string, number>;
    consultationTypes: Record<string, number>;
    diseaseCategories: Record<string, number>;
    responseTimeTrend: Record<string, number>;
  };
  insights: string[];
  recommendations: string[];
  lastUpdated: Date;
}

export interface ChatSettings {
  userId: string;
  notifications: {
    newMessage: boolean;
    videoCall: boolean;
    voiceCall: boolean;
    followUpReminder: boolean;
    aiAlert: boolean;
    soundEnabled: boolean;
    vibrationEnabled: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
  };
  privacy: {
    showOnlineStatus: boolean;
    allowVideoCalls: boolean;
    allowVoiceCalls: boolean;
    allowScreenShare: boolean;
    allowRecording: boolean;
    dataRetention: number; // days
    autoDeleteMessages: boolean;
    autoDeleteAfter: number; // days
  };
  ai: {
    enableAIAssistant: boolean;
    enableDrugInteractionCheck: boolean;
    enableSymptomAnalysis: boolean;
    enableAutoTranslation: boolean;
    enableSmartRecommendations: boolean;
    enableAutoSummarization: boolean;
    aiConfidenceThreshold: number; // 0-100
  };
  communication: {
    defaultLanguage: string;
    enableTranslation: boolean;
    supportedLanguages: string[];
    voiceToTextEnabled: boolean;
    textToSpeechEnabled: boolean;
    quickReplyTemplates: string[];
  };
  security: {
    enableEndToEndEncryption: boolean;
    enableTwoFactorAuth: boolean;
    sessionTimeout: number; // minutes
    requireConsentForRecording: boolean;
    enableAuditLogging: boolean;
  };
}

export interface QuickReply {
  id: string;
  category: 'greeting' | 'medication' | 'side_effects' | 'refill' | 'follow_up' | 'emergency';
  title: string;
  content: string;
  isDefault: boolean;
  usageCount: number;
  lastUsed?: Date;
  createdBy: string;
  createdAt: Date;
}

export interface ChatTemplate {
  id: string;
  name: string;
  category: 'consultation' | 'follow_up' | 'education' | 'emergency';
  content: string;
  variables: string[];
  isActive: boolean;
  usageCount: number;
  lastUsed?: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmergencyProtocol {
  id: string;
  triggerKeywords: string[];
  severity: 'low' | 'moderate' | 'high' | 'critical';
  immediateActions: string[];
  escalationSteps: {
    step: number;
    action: string;
    timeframe: string;
    contact?: string;
  }[];
  documentationRequired: boolean;
  followUpRequired: boolean;
  followUpTimeframe: string;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatReport {
  id: string;
  type: 'conversation' | 'consultation' | 'performance' | 'compliance';
  title: string;
  description: string;
  generatedAt: Date;
  generatedBy: string;
  period: {
    startDate: Date;
    endDate: Date;
  };
  data: any;
  format: 'pdf' | 'excel' | 'json' | 'csv';
  status: 'generating' | 'ready' | 'failed';
  downloadUrl?: string;
  expiresAt?: Date;
  isScheduled: boolean;
  scheduleFrequency?: 'daily' | 'weekly' | 'monthly';
  recipients: string[];
  lastGenerated?: Date;
}

export interface ChatIntegration {
  id: string;
  name: string;
  type: 'ehr' | 'calendar' | 'pharmacy_system' | 'lab_system' | 'notification_service';
  status: 'active' | 'inactive' | 'error';
  configuration: any;
  lastSync?: Date;
  syncFrequency: number; // minutes
  errorCount: number;
  lastError?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatAuditLog {
  id: string;
  userId: string;
  action: 'message_sent' | 'message_read' | 'call_started' | 'call_ended' | 'file_uploaded' | 'ai_alert_acknowledged' | 'settings_changed';
  resourceType: 'conversation' | 'message' | 'call' | 'file' | 'settings';
  resourceId: string;
  details: any;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  success: boolean;
  errorMessage?: string;
}

export interface ChatSession {
  id: string;
  userId: string;
  sessionToken: string;
  startTime: Date;
  lastActivity: Date;
  endTime?: Date;
  ipAddress: string;
  userAgent: string;
  isActive: boolean;
  deviceInfo: {
    type: 'desktop' | 'mobile' | 'tablet';
    os: string;
    browser: string;
    version: string;
  };
  location?: {
    country: string;
    region: string;
    city: string;
    timezone: string;
  };
}
