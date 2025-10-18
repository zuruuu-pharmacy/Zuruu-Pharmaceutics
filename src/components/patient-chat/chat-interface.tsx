"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Paperclip, 
  Mic, 
  MicOff, 
  Camera, 
  Smile, 
  MoreVertical, 
  Phone, 
  Video, 
  User, 
  Clock, 
  Check, 
  CheckCheck, 
  AlertTriangle, 
  Info, 
  Heart, 
  ThumbsUp, 
  ThumbsDown, 
  Star, 
  Eye, 
  Download, 
  Share, 
  Copy, 
  Trash2, 
  Edit, 
  Archive, 
  Flag, 
  Shield, 
  Lock, 
  Unlock, 
  Key, 
  Brain, 
  Zap, 
  Target, 
  Activity, 
  Pill, 
  Droplets, 
  Wind, 
  Stethoscope, 
  Thermometer, 
  Scale, 
  Monitor, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  RotateCcw, 
  Upload, 
  ExternalLink, 
  RefreshCw, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Repeat, 
  Shuffle, 
  Volume1, 
  Headphones, 
  Mic as MicIcon, 
  MicOff as MicOffIcon, 
  Camera as CameraIcon, 
  CameraOff as CameraOffIcon, 
  Maximize as MaximizeIcon, 
  Minimize as MinimizeIcon, 
  RotateCcw as RotateCcwIcon, 
  Upload as UploadIcon, 
  ExternalLink as ExternalLinkIcon, 
  RefreshCw as RefreshCwIcon, 
  Play as PlayIcon, 
  Pause as PauseIcon, 
  SkipForward as SkipForwardIcon, 
  SkipBack as SkipBackIcon, 
  Repeat as RepeatIcon, 
  Shuffle as ShuffleIcon, 
  Volume1 as Volume1Icon, 
  Headphones as HeadphonesIcon,
  MessageCircle,
  Phone as PhoneIcon,
  Video as VideoIcon,
  Calendar,
  Bell,
  Settings,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  X,
  Menu,
  Home,
  ShoppingCart,
  CreditCard,
  Receipt,
  Archive as ArchiveIcon,
  Star as StarIcon,
  ThumbsUp as ThumbsUpIcon,
  ThumbsDown as ThumbsDownIcon,
  Eye as EyeIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Copy as CopyIcon,
  Trash2 as Trash2Icon,
  Edit as EditIcon,
  Archive as ArchiveIcon2,
  Flag as FlagIcon,
  Shield as ShieldIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Key as KeyIcon,
  Brain as BrainIcon,
  Zap as ZapIcon,
  Target as TargetIcon,
  Activity as ActivityIcon,
  Pill as PillIcon,
  Droplets as DropletsIcon,
  Wind as WindIcon,
  Stethoscope as StethoscopeIcon,
  Thermometer as ThermometerIcon,
  Scale as ScaleIcon,
  Monitor as MonitorIcon,
  Smartphone as SmartphoneIcon,
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon,
  Volume2 as Volume2Icon,
  VolumeX as VolumeXIcon,
  Maximize as MaximizeIcon2,
  Minimize as MinimizeIcon2,
  RotateCcw as RotateCcwIcon2,
  Upload as UploadIcon2,
  ExternalLink as ExternalLinkIcon2,
  RefreshCw as RefreshCwIcon2,
  Play as PlayIcon2, 
  Pause as PauseIcon2,
  SkipForward as SkipForwardIcon2,
  SkipBack as SkipBackIcon2,
  Repeat as RepeatIcon2,
  Shuffle as ShuffleIcon2,
  Volume1 as Volume1Icon2,
  Headphones as HeadphonesIcon2,
  Globe
} from 'lucide-react';

import { 
  Patient, 
  ChatMessage, 
  Conversation, 
  ChatAttachment,
  AIConsultationSupport 
} from '@/types/patient-chat';

interface ChatInterfaceProps {
  patient: Patient;
  conversation: Conversation;
  messages: ChatMessage[];
  aiSupport: AIConsultationSupport[];
  onSendMessage: (content: string, type?: string, attachments?: ChatAttachment[]) => void;
  onStartVideoCall: () => void;
  onStartVoiceCall: () => void;
  onUploadFile: (file: File) => void;
  onToggleAIAssistant: () => void;
  onViewPatientProfile: () => void;
}

export default function ChatInterface({
  patient,
  conversation,
  messages,
  aiSupport,
  onSendMessage,
  onStartVideoCall,
  onStartVoiceCall,
  onUploadFile,
  onToggleAIAssistant,
  onViewPatientProfile
}: ChatInterfaceProps) {
  const [messageInput, setMessageInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [showAISupport, setShowAISupport] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock quick replies
  const quickReplies = [
    "How are you feeling today?",
    "Please share your recent blood sugar readings.",
    "Have you experienced any side effects?",
    "When did you last take your medication?",
    "Are you following your prescribed dosage?",
    "Do you need a refill of your medication?",
    "How is your blood pressure today?",
    "Any questions about your treatment plan?"
  ];

  // Mock emojis
  const emojis = ['😊', '😢', '😮', '😡', '👍', '👎', '❤️', '🎉', '🤔', '😴', '💊', '🏥', '❤️‍🩹', '🩺', '💉', '🩹'];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      onSendMessage(messageInput.trim());
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => onUploadFile(file));
    }
  };

  const handleQuickReply = (reply: string) => {
    setMessageInput(reply);
    setShowQuickReplies(false);
  };

  const handleEmojiClick = (emoji: string) => {
    setMessageInput(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMessageStatusIcon = (message: ChatMessage) => {
    if (message.senderType === 'pharmacist') {
      if (message.readAt) {
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      } else if (message.deliveredAt) {
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      } else {
        return <Check className="w-4 h-4 text-gray-400" />;
      }
    }
    return null;
  };

  const getAISupportIcon = (type: string) => {
    switch (type) {
      case 'drug_interaction': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'symptom_analysis': return <Brain className="w-4 h-4 text-purple-500" />;
      case 'recommendation': return <Target className="w-4 h-4 text-green-500" />;
      case 'alert': return <Bell className="w-4 h-4 text-orange-500" />;
      case 'translation': return <Globe className="w-4 h-4 text-blue-500" />;
      default: return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAISupportColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'high': return 'bg-orange-50 border-orange-200';
      case 'moderate': return 'bg-yellow-50 border-yellow-200';
      case 'low': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-teal-600" />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                patient.status === 'online' ? 'bg-green-500' :
                patient.status === 'idle' ? 'bg-yellow-500' : 'bg-gray-400'
              }`}></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{patient.name}</h3>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  patient.status === 'online' ? 'bg-green-100 text-green-800' :
                  patient.status === 'idle' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {patient.status}
                </span>
                <span className="text-xs text-gray-500">
                  {patient.medicalHistory.diseases.slice(0, 2).join(', ')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onViewPatientProfile}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="View Patient Profile"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={onStartVoiceCall}
              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
              title="Voice Call"
            >
              <Phone className="w-5 h-5" />
            </button>
            <button
              onClick={onStartVideoCall}
              className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
              title="Video Call"
            >
              <Video className="w-5 h-5" />
            </button>
            <button
              onClick={onToggleAIAssistant}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
              title="AI Assistant"
            >
              <Brain className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AI Summary Ribbon */}
        {conversation.aiSummary && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">AI Summary:</span>
              <span className="text-sm text-blue-800">{conversation.aiSummary}</span>
            </div>
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            className={`flex ${message.senderType === 'pharmacist' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.senderType === 'pharmacist' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {/* Avatar */}
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                {message.senderType === 'pharmacist' ? (
                  <User className="w-4 h-4 text-gray-600" />
                ) : message.senderType === 'ai' ? (
                  <Brain className="w-4 h-4 text-blue-600" />
                ) : (
                  <User className="w-4 h-4 text-teal-600" />
                )}
              </div>

              {/* Message Bubble */}
              <div className={`rounded-lg p-3 ${
                message.senderType === 'pharmacist' 
                  ? 'bg-blue-600 text-white' 
                  : message.senderType === 'ai'
                  ? 'bg-purple-100 text-purple-900 border border-purple-200'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{message.content}</p>
                
                {/* Attachments */}
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center space-x-2 p-2 bg-white bg-opacity-20 rounded">
                        <Paperclip className="w-4 h-4" />
                        <span className="text-xs truncate">{attachment.fileName}</span>
                        <button className="text-xs underline">Download</button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Message Metadata */}
                <div className={`flex items-center justify-between mt-2 text-xs ${
                  message.senderType === 'pharmacist' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  <span>{formatTime(message.timestamp)}</span>
                  <div className="flex items-center space-x-1">
                    {getMessageStatusIcon(message)}
                    {message.isEncrypted && <Lock className="w-3 h-3" />}
                  </div>
                </div>

                {/* AI Metadata */}
                {message.metadata && (
                  <div className="mt-2 p-2 bg-white bg-opacity-10 rounded text-xs">
                    {message.metadata.aiConfidence && (
                      <div className="flex items-center space-x-1">
                        <Brain className="w-3 h-3" />
                        <span>AI Confidence: {message.metadata.aiConfidence}%</span>
                      </div>
                    )}
                    {message.metadata.drugInteractionFlag && (
                      <div className="flex items-center space-x-1 text-red-300">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Drug Interaction Detected</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-teal-600" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* AI Support Panel */}
      <AnimatePresence>
        {showAISupport && aiSupport.length > 0 && (
          <motion.div
            className="border-t border-gray-200 bg-gray-50 p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900 flex items-center space-x-2">
                <Brain className="w-4 h-4 text-purple-600" />
                <span>AI Support</span>
              </h4>
              {aiSupport.map((support) => (
                <div key={support.id} className={`p-3 rounded-lg border ${getAISupportColor(support.severity)}`}>
                  <div className="flex items-start space-x-2">
                    {getAISupportIcon(support.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{support.content}</p>
                      {support.recommendations.length > 0 && (
                        <ul className="mt-1 text-xs text-gray-700 list-disc list-inside">
                          {support.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <button className="text-xs text-blue-600 hover:text-blue-800">
                      Acknowledge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Replies */}
      <AnimatePresence>
        {showQuickReplies && (
          <motion.div
            className="border-t border-gray-200 bg-gray-50 p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900">Quick Replies</h4>
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="p-2 text-left text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emoji Picker */}
      <AnimatePresence>
        {showEmojiPicker && (
          <motion.div
            className="border-t border-gray-200 bg-gray-50 p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900">Emojis</h4>
              <div className="grid grid-cols-8 gap-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleEmojiClick(emoji)}
                    className="p-2 text-lg hover:bg-white rounded-lg transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          {/* Attachment Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Attach File"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Quick Replies Button */}
          <button
            onClick={() => setShowQuickReplies(!showQuickReplies)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Quick Replies"
          >
            <MessageCircle className="w-5 h-5" />
          </button>

          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              rows={1}
            />
          </div>

          {/* Emoji Button */}
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Emoji"
          >
            <Smile className="w-5 h-5" />
          </button>

          {/* Voice Recording Button */}
          <button
            onMouseDown={() => setIsRecording(true)}
            onMouseUp={() => setIsRecording(false)}
            onMouseLeave={() => setIsRecording(false)}
            className={`p-2 rounded-lg transition-colors ${
              isRecording 
                ? 'text-red-600 bg-red-100' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
            title="Voice Message"
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Send Message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
        />
      </div>
    </div>
  );
}
