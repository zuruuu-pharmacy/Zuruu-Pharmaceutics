"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Maximize, 
  Minimize,
  X,
  User,
  Settings,
  Share,
  MoreVertical,
  Volume2,
  VolumeX,
  Camera,
  CameraOff,
  MessageSquare,
  FileText,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  Bot,
  Shield,
  Wifi,
  WifiOff
} from 'lucide-react';

interface VideoConsultationProps {
  patient: {
    id: string;
    name: string;
    avatar?: string;
    status: 'online' | 'offline' | 'busy';
  };
  onClose: () => void;
  onEndCall: () => void;
}

export default function VideoConsultation({ 
  patient, 
  onClose, 
  onEndCall 
}: VideoConsultationProps) {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('excellent');
  const [showChat, setShowChat] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [showAIInsights, setShowAIInsights] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const patientVideoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulate call duration timer
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Simulate connection quality changes
  useEffect(() => {
    const qualityInterval = setInterval(() => {
      const qualities: ('excellent' | 'good' | 'poor')[] = ['excellent', 'good', 'poor'];
      const randomQuality = qualities[Math.floor(Math.random() * qualities.length)];
      setConnectionQuality(randomQuality);
    }, 10000);

    return () => clearInterval(qualityInterval);
  }, []);

  // Simulate AI insights during call
  useEffect(() => {
    const insightsInterval = setInterval(() => {
      const insights = [
        'Patient appears comfortable discussing medication',
        'No signs of distress or confusion detected',
        'Good eye contact and engagement',
        'Patient understands dosage instructions clearly'
      ];
      const randomInsight = insights[Math.floor(Math.random() * insights.length)];
      setAiInsights(prev => [...prev.slice(-2), randomInsight]);
    }, 30000);

    return () => clearInterval(insightsInterval);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getConnectionQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getConnectionQualityIcon = (quality: string) => {
    switch (quality) {
      case 'excellent': return <Wifi className="w-4 h-4" />;
      case 'good': return <Wifi className="w-4 h-4" />;
      case 'poor': return <WifiOff className="w-4 h-4" />;
      default: return <Wifi className="w-4 h-4" />;
    }
  };

  const handleEndCall = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    onEndCall();
  };

  const handleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    // Simulate screen sharing
  };

  const handleRecording = () => {
    setIsRecording(!isRecording);
    // Simulate recording
  };

  const handleSaveNotes = () => {
    // Save notes to patient record
    console.log('Notes saved:', notes);
    setShowNotes(false);
  };

  return (
    <div className={`bg-black text-white ${isFullscreen ? 'fixed inset-0 z-50' : 'h-[600px] rounded-xl overflow-hidden'}`}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{patient.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">
                  {formatDuration(callDuration)}
                </span>
                <div className={`flex items-center space-x-1 ${getConnectionQualityColor(connectionQuality)}`}>
                  {getConnectionQualityIcon(connectionQuality)}
                  <span className="text-xs capitalize">{connectionQuality}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAIInsights(!showAIInsights)}
              className="p-2 text-gray-300 hover:text-purple-400 hover:bg-purple-500/20 rounded-lg transition-colors"
              title="AI Insights"
            >
              <Bot className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowChat(!showChat)}
              className="p-2 text-gray-300 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
              title="Chat"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="p-2 text-gray-300 hover:text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
              title="Notes"
            >
              <FileText className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-300 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Area */}
      <div className="relative w-full h-full">
        {/* Patient Video (Main) */}
        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-16 h-16 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{patient.name}</h3>
            <p className="text-gray-300">Video call in progress</p>
            {isScreenSharing && (
              <div className="mt-4 p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <p className="text-sm text-blue-300">Screen sharing active</p>
              </div>
            )}
          </div>
        </div>

        {/* Pharmacist Video (Picture-in-Picture) */}
        <div className="absolute top-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden border-2 border-white/20">
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        {/* AI Insights Overlay */}
        <AnimatePresence>
          {showAIInsights && (
            <motion.div
              className="absolute top-20 left-4 w-80 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center space-x-2 mb-3">
                <Bot className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">AI Insights</span>
              </div>
              <div className="space-y-2">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="text-xs text-gray-300 bg-gray-800/50 p-2 rounded">
                    {insight}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Overlay */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              className="absolute top-20 right-4 w-80 h-96 bg-black/80 backdrop-blur-sm rounded-lg border border-blue-500/30 flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="p-3 border-b border-gray-700">
                <h4 className="text-sm font-medium text-blue-300">Quick Chat</h4>
              </div>
              <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                <div className="text-xs text-gray-400 text-center">
                  Chat messages will appear here during the call
                </div>
              </div>
              <div className="p-3 border-t border-gray-700">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full px-3 py-2 bg-gray-800 text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notes Overlay */}
        <AnimatePresence>
          {showNotes && (
            <motion.div
              className="absolute top-20 left-4 w-80 h-96 bg-black/80 backdrop-blur-sm rounded-lg border border-green-500/30 flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="p-3 border-b border-gray-700">
                <h4 className="text-sm font-medium text-green-300">Consultation Notes</h4>
              </div>
              <div className="flex-1 p-3">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about the consultation..."
                  className="w-full h-full bg-gray-800 text-white text-sm rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
                />
              </div>
              <div className="p-3 border-t border-gray-700 flex space-x-2">
                <button
                  onClick={handleSaveNotes}
                  className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowNotes(false)}
                  className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/50 to-transparent p-6">
        <div className="flex items-center justify-center space-x-4">
          {/* Video Toggle */}
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-3 rounded-full transition-colors ${
              isVideoOn 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
            title={isVideoOn ? "Turn off video" : "Turn on video"}
          >
            {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </button>

          {/* Mic Toggle */}
          <button
            onClick={() => setIsMicOn(!isMicOn)}
            className={`p-3 rounded-full transition-colors ${
              isMicOn 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
            title={isMicOn ? "Mute microphone" : "Unmute microphone"}
          >
            {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </button>

          {/* Screen Share */}
          <button
            onClick={handleScreenShare}
            className={`p-3 rounded-full transition-colors ${
              isScreenSharing 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
            title={isScreenSharing ? "Stop sharing" : "Share screen"}
          >
            <Share className="w-6 h-6" />
          </button>

          {/* Recording */}
          <button
            onClick={handleRecording}
            className={`p-3 rounded-full transition-colors ${
              isRecording 
                ? 'bg-red-600 text-white hover:bg-red-700 animate-pulse' 
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
            title={isRecording ? "Stop recording" : "Start recording"}
          >
            <Camera className="w-6 h-6" />
          </button>

          {/* End Call */}
          <button
            onClick={handleEndCall}
            className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            title="End call"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>

        {/* Status Bar */}
        <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-300">
          <span className="flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>End-to-end encrypted</span>
          </span>
          <span className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{formatDuration(callDuration)}</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              connectionQuality === 'excellent' ? 'bg-green-500' :
              connectionQuality === 'good' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="capitalize">{connectionQuality} connection</span>
          </span>
        </div>
      </div>
    </div>
  );
}
