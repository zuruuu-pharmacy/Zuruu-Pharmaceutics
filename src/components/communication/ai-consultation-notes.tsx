"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  FileText, 
  Save, 
  Edit, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  User, 
  Pill, 
  Heart, 
  Activity, 
  Brain, 
  Zap, 
  Download, 
  Share, 
  Copy, 
  Trash2, 
  Plus, 
  Minus,
  Eye,
  EyeOff,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Calendar,
  Stethoscope,
  Shield,
  TrendingUp,
  X
} from 'lucide-react';

interface ConsultationNote {
  id: string;
  patientId: string;
  patientName: string;
  date: Date;
  type: 'chat' | 'video' | 'voice';
  duration: number; // in minutes
  status: 'draft' | 'review' | 'approved' | 'archived';
  content: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
  aiGenerated: boolean;
  aiConfidence: number; // 0-100
  keywords: string[];
  riskLevel: 'low' | 'medium' | 'high';
  followUpRequired: boolean;
  followUpDate?: Date;
  medicationsDiscussed: string[];
  sideEffectsReported: string[];
  recommendations: string[];
  pharmacistNotes: string;
  patientFeedback?: {
    rating: number;
    comments: string;
  };
}

interface AIConsultationNotesProps {
  patientId: string;
  patientName: string;
  onSave: (note: ConsultationNote) => void;
  onClose: () => void;
}

export default function AIConsultationNotes({ 
  patientId, 
  patientName, 
  onSave, 
  onClose 
}: AIConsultationNotesProps) {
  const [note, setNote] = useState<ConsultationNote>({
    id: Date.now().toString(),
    patientId,
    patientName,
    date: new Date(),
    type: 'video',
    duration: 15,
    status: 'draft',
    content: {
      subjective: '',
      objective: '',
      assessment: '',
      plan: ''
    },
    aiGenerated: true,
    aiConfidence: 0,
    keywords: [],
    riskLevel: 'low',
    followUpRequired: false,
    medicationsDiscussed: [],
    sideEffectsReported: [],
    recommendations: [],
    pharmacistNotes: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Simulate AI generation
  useEffect(() => {
    if (note.aiGenerated && note.content.subjective === '') {
      generateAINotes();
    }
  }, []);

  const generateAINotes = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const generatedNote: ConsultationNote = {
        ...note,
        content: {
          subjective: 'Patient reports mild nausea and dizziness after starting Metformin 500mg. No other symptoms reported. Patient is concerned about side effects and wants to know if this is normal.',
          objective: 'Patient appears alert and oriented. No visible signs of distress. Blood pressure and heart rate within normal limits. Patient is taking medication as prescribed.',
          assessment: 'Likely mild gastrointestinal side effects from Metformin initiation. No signs of serious adverse reactions. Patient education needed regarding common side effects and management strategies.',
          plan: '1. Continue Metformin as prescribed with meals\n2. Monitor symptoms for 1-2 weeks\n3. Patient education on side effect management\n4. Follow up in 1 week if symptoms persist\n5. Consider dose adjustment if needed'
        },
        aiConfidence: 87,
        keywords: ['nausea', 'dizziness', 'metformin', 'side effects', 'gastrointestinal'],
        riskLevel: 'low' as const,
        medicationsDiscussed: ['Metformin 500mg'],
        sideEffectsReported: ['nausea', 'dizziness'],
        recommendations: [
          'Take with food to reduce gastrointestinal side effects',
          'Monitor blood glucose levels regularly',
          'Report any severe or persistent side effects',
          'Maintain regular follow-up with healthcare provider'
        ]
      };
      
      setNote(generatedNote);
      setIsGenerating(false);
    }, 2000);
  };

  const handleContentChange = (section: keyof typeof note.content, value: string) => {
    setNote(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [section]: value
      }
    }));
  };

  const handleAddMedication = (medication: string) => {
    if (medication.trim() && !note.medicationsDiscussed.includes(medication.trim())) {
      setNote(prev => ({
        ...prev,
        medicationsDiscussed: [...prev.medicationsDiscussed, medication.trim()]
      }));
    }
  };

  const handleRemoveMedication = (medication: string) => {
    setNote(prev => ({
      ...prev,
      medicationsDiscussed: prev.medicationsDiscussed.filter(m => m !== medication)
    }));
  };

  const handleAddSideEffect = (sideEffect: string) => {
    if (sideEffect.trim() && !note.sideEffectsReported.includes(sideEffect.trim())) {
      setNote(prev => ({
        ...prev,
        sideEffectsReported: [...prev.sideEffectsReported, sideEffect.trim()]
      }));
    }
  };

  const handleRemoveSideEffect = (sideEffect: string) => {
    setNote(prev => ({
      ...prev,
      sideEffectsReported: prev.sideEffectsReported.filter(s => s !== sideEffect)
    }));
  };

  const handleAddRecommendation = (recommendation: string) => {
    if (recommendation.trim() && !note.recommendations.includes(recommendation.trim())) {
      setNote(prev => ({
        ...prev,
        recommendations: [...prev.recommendations, recommendation.trim()]
      }));
    }
  };

  const handleRemoveRecommendation = (recommendation: string) => {
    setNote(prev => ({
      ...prev,
      recommendations: prev.recommendations.filter(r => r !== recommendation)
    }));
  };

  const handleSave = () => {
    onSave(note);
  };

  const handleAISuggestions = () => {
    const suggestions = [
      'Add medication timing instructions',
      'Include dietary recommendations',
      'Note patient compliance concerns',
      'Add follow-up scheduling details',
      'Include emergency contact information'
    ];
    setAiSuggestions(suggestions);
    setShowAISuggestions(true);
  };

  const getRiskLevelColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Consultation Notes</h2>
              <p className="text-sm text-gray-600">{patientName} • {note.date.toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Preview"
            >
              {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            <button
              onClick={handleAISuggestions}
              className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              title="AI Suggestions"
            >
              <Bot className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Status */}
      {note.aiGenerated && (
        <div className="p-4 bg-purple-50 border-b border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bot className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">AI Generated Notes</span>
              <span className={`px-2 py-1 text-xs rounded-full ${getConfidenceColor(note.aiConfidence)}`}>
                {note.aiConfidence}% confidence
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs rounded-full border ${getRiskLevelColor(note.riskLevel)}`}>
                {note.riskLevel} risk
              </span>
              <span className="text-xs text-gray-600">
                {note.keywords.length} keywords identified
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {isGenerating ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">AI is generating consultation notes...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* SOAP Format */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subjective */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Subjective</span>
                  </span>
                </label>
                <textarea
                  value={note.content.subjective}
                  onChange={(e) => handleContentChange('subjective', e.target.value)}
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="Patient's reported symptoms and concerns..."
                  disabled={!isEditing}
                />
              </div>

              {/* Objective */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="flex items-center space-x-2">
                    <Stethoscope className="w-4 h-4" />
                    <span>Objective</span>
                  </span>
                </label>
                <textarea
                  value={note.content.objective}
                  onChange={(e) => handleContentChange('objective', e.target.value)}
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="Observable findings and vital signs..."
                  disabled={!isEditing}
                />
              </div>

              {/* Assessment */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="flex items-center space-x-2">
                    <Brain className="w-4 h-4" />
                    <span>Assessment</span>
                  </span>
                </label>
                <textarea
                  value={note.content.assessment}
                  onChange={(e) => handleContentChange('assessment', e.target.value)}
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="Clinical assessment and diagnosis..."
                  disabled={!isEditing}
                />
              </div>

              {/* Plan */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Plan</span>
                  </span>
                </label>
                <textarea
                  value={note.content.plan}
                  onChange={(e) => handleContentChange('plan', e.target.value)}
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="Treatment plan and follow-up..."
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Medications Discussed */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="flex items-center space-x-2">
                    <Pill className="w-4 h-4" />
                    <span>Medications Discussed</span>
                  </span>
                </label>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {note.medicationsDiscussed.map((med, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center space-x-2"
                      >
                        <span>{med}</span>
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveMedication(med)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add medication..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddMedication(e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const input = document.querySelector('input[placeholder="Add medication..."]') as HTMLInputElement;
                          if (input.value) {
                            handleAddMedication(input.value);
                            input.value = '';
                          }
                        }}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Side Effects Reported */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <span className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Side Effects Reported</span>
                  </span>
                </label>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {note.sideEffectsReported.map((effect, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm flex items-center space-x-2"
                      >
                        <span>{effect}</span>
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveSideEffect(effect)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add side effect..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddSideEffect(e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const input = document.querySelector('input[placeholder="Add side effect..."]') as HTMLInputElement;
                          if (input.value) {
                            handleAddSideEffect(input.value);
                            input.value = '';
                          }
                        }}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Recommendations</span>
                </span>
              </label>
              <div className="space-y-2">
                <div className="space-y-2">
                  {note.recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-green-800 flex-1">{rec}</span>
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveRecommendation(rec)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Add recommendation..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddRecommendation(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const input = document.querySelector('input[placeholder="Add recommendation..."]') as HTMLInputElement;
                        if (input.value) {
                          handleAddRecommendation(input.value);
                          input.value = '';
                        }
                      }}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Pharmacist Notes */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <span className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Additional Pharmacist Notes</span>
                </span>
              </label>
              <textarea
                value={note.pharmacistNotes}
                onChange={(e) => setNote(prev => ({ ...prev, pharmacistNotes: e.target.value }))}
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                placeholder="Additional notes or observations..."
                disabled={!isEditing}
              />
            </div>

            {/* Follow-up */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={note.followUpRequired}
                  onChange={(e) => setNote(prev => ({ ...prev, followUpRequired: e.target.checked }))}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <span className="text-sm font-medium text-gray-700">Follow-up required</span>
              </label>
              {note.followUpRequired && (
                <input
                  type="date"
                  value={note.followUpDate?.toISOString().split('T')[0] || ''}
                  onChange={(e) => setNote(prev => ({ 
                    ...prev, 
                    followUpDate: e.target.value ? new Date(e.target.value) : undefined 
                  }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* AI Suggestions Panel */}
      <AnimatePresence>
        {showAISuggestions && (
          <motion.div
            className="border-t border-gray-200 bg-purple-50 p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <Bot className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-900">AI Suggestions</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // Add suggestion to appropriate section
                    setShowAISuggestions(false);
                  }}
                  className="text-left p-3 bg-white border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <span className="text-sm text-purple-800">{suggestion}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>Duration: {note.duration} minutes</span>
          <span>Type: {note.type}</span>
          <span>Status: {note.status}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Notes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
