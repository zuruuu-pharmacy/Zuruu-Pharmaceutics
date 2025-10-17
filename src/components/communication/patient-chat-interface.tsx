"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  Mic, 
  MicOff,
  Smile,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Bot,
  Shield,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  X,
  MessageSquare,
  FileText,
  Image as ImageIcon,
  Download,
  Star,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'pharmacist' | 'patient' | 'ai';
  message: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'voice' | 'video';
  status: 'sent' | 'delivered' | 'read';
  isAI?: boolean;
  attachments?: {
    type: string;
    url: string;
    name: string;
  }[];
}

interface Patient {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'busy';
  lastSeen?: Date;
  conditions: string[];
  currentMedications: string[];
  allergies: string[];
  lastRefill?: Date;
}

interface ChatInterfaceProps {
  patient: Patient;
  onClose: () => void;
  onVideoCall: () => void;
  onVoiceCall: () => void;
}

export default function PatientChatInterface({ 
  patient, 
  onClose, 
  onVideoCall, 
  onVoiceCall 
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'patient',
      message: 'Hi, I have a question about my medication',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: 'text',
      status: 'read'
    },
    {
      id: '2',
      sender: 'pharmacist',
      message: 'Hello! I\'m here to help. What would you like to know?',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      type: 'text',
      status: 'read'
    },
    {
      id: '3',
      sender: 'patient',
      message: 'I\'m experiencing some mild nausea after taking Metformin',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      type: 'text',
      status: 'read'
    },
    {
      id: '4',
      sender: 'pharmacist',
      message: 'That\'s a common side effect. Try taking it with food. If it persists, let me know.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      type: 'text',
      status: 'read'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate AI suggestions based on conversation
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender === 'patient') {
      const suggestions = generateAISuggestions(lastMessage.message);
      setAiSuggestions(suggestions);
      setShowAISuggestions(true);
    }
  }, [messages]);

  const generateAISuggestions = (message: string): string[] => {
    const suggestions: string[] = [];
    
    if (message.toLowerCase().includes('nausea')) {
      suggestions.push('Take with food', 'Check if taken with other medications', 'Monitor for other side effects');
    } else if (message.toLowerCase().includes('dose')) {
      suggestions.push('Check prescription details', 'Verify timing', 'Confirm with doctor if needed');
    } else if (message.toLowerCase().includes('refill')) {
      suggestions.push('Check prescription validity', 'Verify insurance coverage', 'Schedule pickup');
    } else {
      suggestions.push('Ask about specific symptoms', 'Check medication timing', 'Verify dosage instructions');
    }
    
    return suggestions;
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'pharmacist',
        message: newMessage.trim(),
        timestamp: new Date(),
        type: 'text',
        status: 'sent'
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      setIsTyping(false);
      
      // Simulate patient response after 2 seconds
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'patient',
          message: 'Thank you for the advice!',
          timestamp: new Date(),
          type: 'text',
          status: 'read'
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    } else {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'pharmacist',
        message: `Shared file: ${file.name}`,
        timestamp: new Date(),
        type: 'file',
        status: 'sent',
        attachments: [{
          type: file.type,
          url: URL.createObjectURL(file),
          name: file.name
        }]
      };
      
      setMessages(prev => [...prev, message]);
    }
  };

  const handleVoiceRecording = () => {
    setIsRecording(!isRecording);
    // Simulate voice recording
    if (!isRecording) {
      setTimeout(() => {
        const voiceMessage: Message = {
          id: Date.now().toString(),
          sender: 'pharmacist',
          message: 'Voice message',
          timestamp: new Date(),
          type: 'voice',
          status: 'sent',
          attachments: [{
            type: 'audio',
            url: '#',
            name: 'voice-message.mp3'
          }]
        };
        setMessages(prev => [...prev, voiceMessage]);
        setIsRecording(false);
      }, 3000);
    }
  };

  const handleAISuggestion = (suggestion: string) => {
    setNewMessage(suggestion);
    setShowAISuggestions(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Clock className="w-3 h-3 text-gray-400" />;
      case 'delivered': return <CheckCircle className="w-3 h-3 text-blue-500" />;
      case 'read': return <CheckCircle className="w-3 h-3 text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col ${
      isFullscreen ? 'fixed inset-0 z-50' : 'h-[600px]'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-teal-600" />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                patient.status === 'online' ? 'bg-green-500' : 
                patient.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
              }`}></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{patient.name}</h3>
              <p className="text-sm text-gray-600">
                {patient.status === 'online' ? 'Online' : 
                 patient.status === 'busy' ? 'Busy' : 'Offline'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAISuggestions(!showAISuggestions)}
              className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
              title="AI Suggestions"
            >
              <Bot className="w-5 h-5" />
            </button>
            <button
              onClick={onVoiceCall}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Voice Call"
            >
              <Phone className="w-5 h-5" />
            </button>
            <button
              onClick={onVideoCall}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Video Call"
            >
              <Video className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            className={`flex ${message.sender === 'pharmacist' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.sender === 'pharmacist'
                ? 'bg-teal-600 text-white'
                : message.sender === 'ai'
                ? 'bg-purple-100 text-purple-900 border border-purple-200'
                : 'bg-gray-100 text-gray-900'
            }`}>
              {message.sender === 'ai' && (
                <div className="flex items-center space-x-1 mb-1">
                  <Bot className="w-3 h-3" />
                  <span className="text-xs font-medium">AI Assistant</span>
                </div>
              )}
              
              <p className="text-sm">{message.message}</p>
              
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-1">
                  {message.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-white/20 rounded">
                      {attachment.type.startsWith('image/') ? (
                        <ImageIcon className="w-4 h-4" />
                      ) : attachment.type.startsWith('audio/') ? (
                        <Volume2 className="w-4 h-4" />
                      ) : (
                        <FileText className="w-4 h-4" />
                      )}
                      <span className="text-xs truncate">{attachment.name}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between mt-1">
                <span className={`text-xs ${
                  message.sender === 'pharmacist' ? 'text-teal-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </span>
                {message.sender === 'pharmacist' && (
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(message.status)}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs ml-2">Typing...</span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* AI Suggestions Panel */}
      <AnimatePresence>
        {showAISuggestions && aiSuggestions.length > 0 && (
          <motion.div
            className="border-t border-gray-200 bg-purple-50 p-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Bot className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">AI Suggestions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleAISuggestion(suggestion)}
                  className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            title="Attach File"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-10"
            />
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded transition-colors"
            >
              <Smile className="w-4 h-4" />
            </button>
          </div>
          
          <button
            onClick={handleVoiceRecording}
            className={`p-2 rounded-lg transition-colors ${
              isRecording 
                ? 'text-red-600 bg-red-100' 
                : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
            }`}
            title="Voice Message"
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            title="Send Message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>End-to-end encrypted</span>
          </span>
          <span className="flex items-center space-x-1">
            <Paperclip className="w-3 h-3" />
            <span>File sharing available</span>
          </span>
          <span className="flex items-center space-x-1">
            <Mic className="w-3 h-3" />
            <span>Voice messages supported</span>
          </span>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileUpload}
        className="hidden"
        accept="image/*,audio/*,.pdf,.doc,.docx"
      />
    </div>
  );
}
