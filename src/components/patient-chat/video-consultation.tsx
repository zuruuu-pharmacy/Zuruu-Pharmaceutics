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
  Camera, 
  CameraOff, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Settings, 
  Users, 
  Share, 
  MessageCircle, 
  FileText, 
  Download, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  User, 
  Heart, 
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
  Zap, 
  Brain, 
  Target, 
  Bell, 
  Info, 
  HelpCircle, 
  Award, 
  Database, 
  Cloud, 
  Mail, 
  Phone as PhoneIcon, 
  Calendar, 
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
  Headphones,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Camera as CameraIcon,
  CameraOff as CameraOffIcon,
  Maximize as MaximizeIcon,
  Minimize as MinimizeIcon,
  Settings as SettingsIcon,
  Users as UsersIcon,
  Share as ShareIcon,
  MessageCircle as MessageCircleIcon,
  FileText as FileTextIcon,
  Download as DownloadIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Shield as ShieldIcon,
  AlertTriangle as AlertTriangleIcon,
  CheckCircle as CheckCircleIcon,
  Clock as ClockIcon,
  User as UserIcon,
  Heart as HeartIcon,
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
  Zap as ZapIcon,
  Brain as BrainIcon,
  Target as TargetIcon,
  Bell as BellIcon,
  Info as InfoIcon,
  HelpCircle as HelpCircleIcon,
  Award as AwardIcon,
  Database as DatabaseIcon,
  Cloud as CloudIcon,
  Mail as MailIcon,
  Phone as PhoneIcon2,
  Calendar as CalendarIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  Plus as PlusIcon,
  Minus as MinusIcon,
  X as XIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  ShoppingCart as ShoppingCartIcon,
  CreditCard as CreditCardIcon,
  Receipt as ReceiptIcon,
  Archive as ArchiveIcon,
  Star as StarIcon,
  ThumbsUp as ThumbsUpIcon,
  ThumbsDown as ThumbsDownIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  Copy as CopyIcon,
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
  Square,
  Circle
} from 'lucide-react';

import { 
  Patient, 
  VideoCall, 
  CallParticipant, 
  ConsultationNote 
} from '@/types/patient-chat';

interface VideoConsultationProps {
  patient: Patient;
  videoCall: VideoCall;
  participants: CallParticipant[];
  consultationNotes: ConsultationNote[];
  onEndCall: () => void;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
  onToggleScreenShare: () => void;
  onToggleRecording: () => void;
  onInviteParticipant: (email: string) => void;
  onSaveNotes: (notes: string) => void;
  onGenerateSummary: () => void;
}

export default function VideoConsultation({
  patient,
  videoCall,
  participants,
  consultationNotes,
  onEndCall,
  onToggleVideo,
  onToggleAudio,
  onToggleScreenShare,
  onToggleRecording,
  onInviteParticipant,
  onSaveNotes,
  onGenerateSummary
}: VideoConsultationProps) {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const [notes, setNotes] = useState('');
  const [callDuration, setCallDuration] = useState(0);
  const [inviteEmail, setInviteEmail] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good');

  const videoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const callStartTime = useRef<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const duration = Math.floor((now.getTime() - callStartTime.current.getTime()) / 1000);
      setCallDuration(duration);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getConnectionQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-blue-500';
      case 'fair': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getConnectionQualityIcon = (quality: string) => {
    switch (quality) {
      case 'excellent': return <Wifi className="w-4 h-4" />;
      case 'good': return <Wifi className="w-4 h-4" />;
      case 'fair': return <Wifi className="w-4 h-4" />;
      case 'poor': return <WifiOff className="w-4 h-4" />;
      default: return <Wifi className="w-4 h-4" />;
    }
  };

  const handleToggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    onToggleVideo();
  };

  const handleToggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    onToggleAudio();
  };

  const handleToggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    onToggleScreenShare();
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    onToggleRecording();
  };

  const handleSaveNotes = () => {
    onSaveNotes(notes);
  };

  const handleInviteParticipant = () => {
    if (inviteEmail.trim()) {
      onInviteParticipant(inviteEmail.trim());
      setInviteEmail('');
      setShowInviteModal(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Video Area */}
      <div className="flex-1 relative">
        {/* Main Video */}
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
          />
          
          {/* Connection Quality Indicator */}
          <div className="absolute top-4 left-4 flex items-center space-x-2 px-3 py-2 bg-black bg-opacity-50 rounded-lg">
            <div className={`${getConnectionQualityColor(connectionQuality)}`}>
              {getConnectionQualityIcon(connectionQuality)}
            </div>
            <span className="text-white text-sm font-medium">
              {connectionQuality.toUpperCase()}
            </span>
          </div>

          {/* Call Duration */}
          <div className="absolute top-4 right-4 flex items-center space-x-2 px-3 py-2 bg-black bg-opacity-50 rounded-lg">
            <Clock className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">
              {formatDuration(callDuration)}
            </span>
          </div>

          {/* Recording Indicator */}
          {isRecording && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 px-3 py-2 bg-red-600 rounded-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">RECORDING</span>
            </div>
          )}

          {/* Patient Info Overlay */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-3 px-4 py-3 bg-black bg-opacity-50 rounded-lg">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="text-white font-semibold">{patient.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-green-400 text-sm">● Online</span>
                <span className="text-gray-300 text-sm">
                  {patient.medicalHistory.diseases.slice(0, 2).join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Local Video (Picture-in-Picture) */}
          <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
            <video
              ref={localVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
          </div>
        </div>

        {/* Control Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <div className="flex items-center justify-center space-x-4">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleAudio}
              className={`p-4 rounded-full transition-colors ${
                isAudioEnabled 
                  ? 'bg-white text-gray-900 hover:bg-gray-100' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isAudioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </button>

            {/* Video Toggle */}
            <button
              onClick={handleToggleVideo}
              className={`p-4 rounded-full transition-colors ${
                isVideoEnabled 
                  ? 'bg-white text-gray-900 hover:bg-gray-100' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </button>

            {/* Screen Share */}
            <button
              onClick={handleToggleScreenShare}
              className={`p-4 rounded-full transition-colors ${
                isScreenSharing 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              <Share className="w-6 h-6" />
            </button>

            {/* Recording */}
            <button
              onClick={handleToggleRecording}
              className={`p-4 rounded-full transition-colors ${
                isRecording 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              {isRecording ? <Square className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
            </button>

            {/* End Call */}
            <button
              onClick={onEndCall}
              className="p-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Consultation Tools</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowParticipants(!showParticipants)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Users className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Participants Panel */}
        <AnimatePresence>
          {showParticipants && (
            <motion.div
              className="border-b border-gray-200 p-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Participants</h4>
                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{participant.role}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {participant.isMuted && <MicOff className="w-4 h-4 text-red-500" />}
                      {!participant.isVideoEnabled && <VideoOff className="w-4 h-4 text-red-500" />}
                      <div className={`w-2 h-2 rounded-full ${
                        participant.connectionQuality === 'excellent' ? 'bg-green-500' :
                        participant.connectionQuality === 'good' ? 'bg-blue-500' :
                        participant.connectionQuality === 'fair' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notes Panel */}
        <AnimatePresence>
          {showNotes && (
            <motion.div
              className="flex-1 p-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Live Notes</h4>
                  <button
                    onClick={handleSaveNotes}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save
                  </button>
                </div>
                
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Take notes during the consultation..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                />

                {/* AI Suggestions */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-700">AI Suggestions</h5>
                  <div className="space-y-1">
                    <button className="w-full p-2 text-left text-sm bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100 transition-colors">
                      Check blood pressure readings
                    </button>
                    <button className="w-full p-2 text-left text-sm bg-green-50 text-green-800 rounded-lg hover:bg-green-100 transition-colors">
                      Review medication adherence
                    </button>
                    <button className="w-full p-2 text-left text-sm bg-orange-50 text-orange-800 rounded-lg hover:bg-orange-100 transition-colors">
                      Assess side effects
                    </button>
                  </div>
                </div>

                {/* Generate Summary Button */}
                <button
                  onClick={onGenerateSummary}
                  className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Brain className="w-4 h-4" />
                  <span>Generate AI Summary</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-96"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Invite Participant</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleInviteParticipant}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Invite
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
