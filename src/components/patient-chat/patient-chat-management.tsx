"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Phone, 
  Video, 
  Settings, 
  Bell, 
  Search, 
  Filter, 
  Plus, 
  User, 
  Users, 
  Eye, 
  Brain, 
  Target, 
  Activity, 
  Pill, 
  Droplets, 
  Wind, 
  Heart, 
  Stethoscope, 
  Thermometer, 
  Scale, 
  Monitor, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  Zap, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  HelpCircle, 
  Award, 
  Database, 
  Cloud, 
  Mail, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Menu, 
  Home, 
  ShoppingCart, 
  CreditCard, 
  Receipt, 
  Archive, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Edit, 
  Trash2, 
  Copy, 
  ExternalLink, 
  RefreshCw, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Repeat, 
  Shuffle, 
  Volume1, 
  Volume2, 
  Headphones,
  Lock,
  Unlock,
  Key,
  Download,
  Upload,
  Share,
  FileText,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Maximize,
  Minimize,
  RotateCcw,
  Globe,
  Languages
} from 'lucide-react';

import PatientListPanel from './patient-list-panel';
import ChatInterface from './chat-interface';
import VideoConsultation from './video-consultation';
import AIConsultationSupport from './ai-consultation-support';

import { 
  Patient, 
  Conversation, 
  ChatMessage, 
  VideoCall, 
  AIConsultationSupport as AISupport, 
  Notification 
} from '@/types/patient-chat';

interface PatientChatManagementProps {
  onNavigateToDashboard: () => void;
}

export default function PatientChatManagement({ 
  onNavigateToDashboard 
}: PatientChatManagementProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeView, setActiveView] = useState<'list' | 'chat' | 'video'>('list');
  const [showAISupport, setShowAISupport] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const [patients] = useState<Patient[]>([]);
  const [conversations] = useState<Conversation[]>([]);
  const [messages] = useState<ChatMessage[]>([]);
  const [aiSupport] = useState<AISupport[]>([]);

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setActiveView('chat');
  };

  const handleStartChat = (patient: Patient) => {
    setSelectedPatient(patient);
    setActiveView('chat');
  };

  const handleStartVideoCall = (patient: Patient) => {
    setSelectedPatient(patient);
    setActiveView('video');
  };

  const handleStartVoiceCall = (patient: Patient) => {
    setSelectedPatient(patient);
    setActiveView('chat'); // Voice calls use chat interface
  };

  const handleSendMessage = (content: string, type?: string, attachments?: any[]) => {
    console.log('Sending message:', content, type, attachments);
    // Implement message sending logic
  };

  const handleUploadFile = (file: File) => {
    console.log('Uploading file:', file.name);
    // Implement file upload logic
  };

  const handleEndCall = () => {
    setActiveView('chat');
    // Implement call ending logic
  };

  const handleToggleVideo = () => {
    console.log('Toggle video');
    // Implement video toggle logic
  };

  const handleToggleAudio = () => {
    console.log('Toggle audio');
    // Implement audio toggle logic
  };

  const handleToggleScreenShare = () => {
    console.log('Toggle screen share');
    // Implement screen share toggle logic
  };

  const handleToggleRecording = () => {
    console.log('Toggle recording');
    // Implement recording toggle logic
  };

  const handleInviteParticipant = (email: string) => {
    console.log('Inviting participant:', email);
    // Implement participant invitation logic
  };

  const handleSaveNotes = (notes: string) => {
    console.log('Saving notes:', notes);
    // Implement notes saving logic
  };

  const handleGenerateSummary = () => {
    console.log('Generating summary');
    // Implement summary generation logic
  };

  const handleAcknowledgeSupport = (supportId: string) => {
    console.log('Acknowledging support:', supportId);
    // Implement support acknowledgment logic
  };

  const handleApplyRecommendation = (recommendation: string) => {
    console.log('Applying recommendation:', recommendation);
    // Implement recommendation application logic
  };

  const handleEscalateToDoctor = (reason: string) => {
    console.log('Escalating to doctor:', reason);
    // Implement doctor escalation logic
  };

  const handleTranslateMessage = (messageId: string, targetLanguage: string) => {
    console.log('Translating message:', messageId, targetLanguage);
    // Implement message translation logic
  };

  const handleGenerateResponse = (context: string) => {
    console.log('Generating response:', context);
    // Implement response generation logic
  };

  const handleViewPatientProfile = (patient: Patient) => {
    console.log('Viewing patient profile:', patient.name);
    // Implement patient profile viewing logic
  };

  const handleToggleAIAssistant = () => {
    setShowAISupport(!showAISupport);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'list':
        return (
          <PatientListPanel
            patients={patients}
            conversations={conversations}
            notifications={notifications}
            onSelectPatient={handleSelectPatient}
            onStartChat={handleStartChat}
            onStartVideoCall={handleStartVideoCall}
            onStartVoiceCall={handleStartVoiceCall}
            selectedPatient={selectedPatient || undefined}
            onViewPatientProfile={handleViewPatientProfile}
          />
        );
      case 'chat':
        return selectedPatient ? (
          <div className="flex h-full">
            <div className="flex-1">
              <ChatInterface
                patient={selectedPatient}
                conversation={conversations.find(c => c.patientId === selectedPatient.id) || {} as Conversation}
                messages={messages}
                aiSupport={aiSupport}
                onSendMessage={handleSendMessage}
                onStartVideoCall={() => setActiveView('video')}
                onStartVoiceCall={() => handleStartVoiceCall(selectedPatient)}
                onUploadFile={handleUploadFile}
                onToggleAIAssistant={handleToggleAIAssistant}
                onViewPatientProfile={() => handleViewPatientProfile(selectedPatient)}
              />
            </div>
            {showAISupport && (
              <div className="w-80">
                <AIConsultationSupport
                  patient={selectedPatient}
                  messages={messages}
                  aiSupport={aiSupport}
                  onAcknowledgeSupport={handleAcknowledgeSupport}
                  onApplyRecommendation={handleApplyRecommendation}
                  onEscalateToDoctor={handleEscalateToDoctor}
                  onTranslateMessage={handleTranslateMessage}
                  onGenerateResponse={handleGenerateResponse}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Patient Selected</h3>
              <p className="text-gray-600">Select a patient from the list to start a conversation.</p>
            </div>
          </div>
        );
      case 'video':
        return selectedPatient ? (
          <VideoConsultation
            patient={selectedPatient}
            videoCall={{} as VideoCall}
            participants={[]}
            consultationNotes={[]}
            onEndCall={handleEndCall}
            onToggleVideo={handleToggleVideo}
            onToggleAudio={handleToggleAudio}
            onToggleScreenShare={handleToggleScreenShare}
            onToggleRecording={handleToggleRecording}
            onInviteParticipant={handleInviteParticipant}
            onSaveNotes={handleSaveNotes}
            onGenerateSummary={handleGenerateSummary}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Patient Selected</h3>
              <p className="text-gray-600">Select a patient from the list to start a video consultation.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onNavigateToDashboard}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Patient Chat & Tele-Consultation</h1>
                <p className="text-sm text-gray-600">Secure real-time communication with patients</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Quick Stats */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">24</div>
                  <div className="text-xs text-gray-500">Active Chats</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">3</div>
                  <div className="text-xs text-gray-500">Video Calls</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">12</div>
                  <div className="text-xs text-gray-500">AI Alerts</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-600">8</div>
                  <div className="text-xs text-gray-500">Follow-ups</div>
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
                  <Bell className="w-5 h-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
              </div>

              {/* AI Support Toggle */}
              <button
                onClick={handleToggleAIAssistant}
                className={`p-2 rounded-lg transition-colors ${
                  showAISupport 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
                title="AI Assistant"
              >
                <Brain className="w-5 h-5" />
              </button>

              {/* Settings */}
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'list', label: 'Patient List', icon: Users, description: 'Browse and select patients' },
              { id: 'chat', label: 'Chat Interface', icon: MessageCircle, description: 'Text messaging and support' },
              { id: 'video', label: 'Video Consultation', icon: Video, description: 'Face-to-face consultations' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors group ${
                  activeView === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">{tab.label}</div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-600">
                    {tab.description}
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-140px)]">
        {renderContent()}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col space-y-3">
          <button className="w-14 h-14 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-colors flex items-center justify-center group">
            <Plus className="w-6 h-6" />
          </button>
          
          <div className="bg-white rounded-full shadow-lg p-2">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
