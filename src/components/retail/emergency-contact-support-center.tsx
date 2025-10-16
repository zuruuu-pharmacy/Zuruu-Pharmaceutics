"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone,
  MapPin,
  Ambulance,
  User,
  MessageSquare,
  Send,
  FileText,
  HelpCircle,
  Star,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  Upload,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  RefreshCw,
  Settings,
  Info,
  AlertCircle,
  Check,
  X,
  MoreHorizontal,
  ExternalLink,
  Copy,
  Share2,
  Bell,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  Wind as WindIcon,
  Camera,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Signal,
  SignalHigh,
  SignalLow,
  SignalZero,
  PieChart,
  BarChart3,
  LineChart,
  Activity,
  Target,
  Award,
  Trophy,
  Zap,
  Brain,
  Heart,
  Stethoscope,
  Pill,
  Apple,
  Dumbbell,
  BookOpen,
  Video,
  MapPin as MapPinIcon,
  User as UserIcon,
  Phone as PhoneIcon,
  Mail,
  Calendar,
  Clock as ClockIcon,
  CreditCard,
  Receipt,
  Shield,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

// Types and interfaces
interface EmergencyContact {
  id: string;
  name: string;
  type: 'doctor' | 'family' | 'emergency';
  phone: string;
  isPrimary: boolean;
}

interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  assignedAgent?: string;
  messages: ChatMessage[];
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: number;
  phone: string;
  emergencyServices: boolean;
  rating: number;
}

// Mock data
const mockEmergencyContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'Dr. Sarah Ahmed',
    type: 'doctor',
    phone: '+91-9876543210',
    isPrimary: true
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    type: 'doctor',
    phone: '+91-9876543211',
    isPrimary: false
  },
  {
    id: '3',
    name: 'John Smith (Family)',
    type: 'family',
    phone: '+91-9876543212',
    isPrimary: true
  }
];

const mockSupportTickets: SupportTicket[] = [
  {
    id: 'SP12345',
    subject: 'Unable to access lab reports',
    description: 'I cannot download my recent blood test results from the portal.',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2024-01-15',
    assignedAgent: 'Sarah Johnson',
    messages: [
      {
        id: '1',
        sender: 'user',
        message: 'I cannot download my recent blood test results from the portal.',
        timestamp: '2024-01-15 10:30',
        isRead: true
      },
      {
        id: '2',
        sender: 'agent',
        message: 'I understand your concern. Let me help you access your lab reports. Can you please try clearing your browser cache and logging in again?',
        timestamp: '2024-01-15 10:35',
        isRead: true
      }
    ]
  },
  {
    id: 'SP12346',
    subject: 'Insurance claim rejected',
    description: 'My recent insurance claim was rejected without explanation.',
    status: 'open',
    priority: 'high',
    createdAt: '2024-01-14',
    messages: [
      {
        id: '1',
        sender: 'user',
        message: 'My recent insurance claim was rejected without explanation.',
        timestamp: '2024-01-14 14:20',
        isRead: true
      }
    ]
  }
];

const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'How do I access my lab reports?',
    answer: 'You can access your lab reports by logging into your account and navigating to the "Lab Reports" section. All reports are available for download in PDF format.',
    category: 'Reports',
    helpful: 45
  },
  {
    id: '2',
    question: 'How can I change my appointment date?',
    answer: 'To reschedule an appointment, go to the "Appointments" section, find your upcoming appointment, and click "Reschedule". You can then select a new date and time.',
    category: 'Appointments',
    helpful: 38
  },
  {
    id: '3',
    question: 'What should I do if I forgot my password?',
    answer: 'Click on "Forgot Password" on the login page and enter your registered email address. You will receive a password reset link via email.',
    category: 'Account',
    helpful: 52
  },
  {
    id: '4',
    question: 'How do I claim insurance?',
    answer: 'Navigate to the "Billing & Insurance" section, select the bill you want to claim, and click "Submit Claim". Make sure to have your insurance details ready.',
    category: 'Insurance',
    helpful: 29
  }
];

const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'City General Hospital',
    address: '123 Medical District, City Center',
    distance: 2.5,
    phone: '+91-11-23456789',
    emergencyServices: true,
    rating: 4.5
  },
  {
    id: '2',
    name: 'Zuruu Medical Center',
    address: '456 Health Plaza, Downtown',
    distance: 1.8,
    phone: '+91-11-23456790',
    emergencyServices: true,
    rating: 4.8
  },
  {
    id: '3',
    name: 'Emergency Care Clinic',
    address: '789 Urgent Care Lane, Suburb',
    distance: 3.2,
    phone: '+91-11-23456791',
    emergencyServices: true,
    rating: 4.2
  }
];

export default function EmergencyContactSupportCenter() {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(mockEmergencyContacts);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(mockSupportTickets);
  const [faqs, setFaqs] = useState<FAQ[]>(mockFAQs);
  const [hospitals, setHospitals] = useState<Hospital[]>(mockHospitals);
  const [showEmergencyCall, setShowEmergencyCall] = useState(false);
  const [showHospitalMap, setShowHospitalMap] = useState(false);
  const [showAmbulanceRequest, setShowAmbulanceRequest] = useState(false);
  const [showAlertDoctor, setShowAlertDoctor] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    issueType: 'technical'
  });
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: ''
  });
  const [isMobile, setIsMobile] = useState(false);
  const [ambulanceETA, setAmbulanceETA] = useState(8);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Ambulance ETA countdown
  useEffect(() => {
    if (showAmbulanceRequest && ambulanceETA > 0) {
      const timer = setInterval(() => {
        setAmbulanceETA(prev => prev - 1);
      }, 60000); // Decrease every minute
      return () => clearInterval(timer);
    }
  }, [showAmbulanceRequest, ambulanceETA]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleEmergencyCall = () => {
    setShowEmergencyCall(true);
  };

  const confirmEmergencyCall = () => {
    // In a real app, this would trigger the actual emergency call
    alert('Emergency call initiated to 112');
    setShowEmergencyCall(false);
  };

  const handleAmbulanceRequest = () => {
    setShowAmbulanceRequest(true);
    setAmbulanceETA(8); // Reset ETA
  };

  const cancelAmbulanceRequest = () => {
    setShowAmbulanceRequest(false);
    setAmbulanceETA(8);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString(),
        isRead: true
      };
      
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate agent response
      setTimeout(() => {
        const agentMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          message: 'Thank you for your message. How can I assist you today?',
          timestamp: new Date().toLocaleTimeString(),
          isRead: false
        };
        setChatMessages(prev => [...prev, agentMessage]);
      }, 2000);
    }
  };

  const submitTicket = () => {
    const ticket: SupportTicket = {
      id: `SP${Date.now()}`,
      subject: newTicket.subject,
      description: newTicket.description,
      status: 'open',
      priority: 'medium',
      createdAt: new Date().toISOString().split('T')[0],
      messages: []
    };
    
    setSupportTickets(prev => [...prev, ticket]);
    setNewTicket({ subject: '', description: '', issueType: 'technical' });
    setShowTicketForm(false);
    alert(`Your support ticket #${ticket.id} has been created.`);
  };

  const submitFeedback = () => {
    if (feedback.rating > 0) {
      alert('Thank you for your feedback! We value your input.');
      setFeedback({ rating: 0, comment: '' });
    }
  };

  const renderQuickEmergencyActions = () => (
    <motion.div
      className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-6 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-red-800 mb-2">Emergency Actions</h2>
        <p className="text-red-600">Quick access to emergency services and healthcare providers</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Emergency Call */}
        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 text-white mb-3 shadow-lg"
            onClick={handleEmergencyCall}
          >
            <Phone className="w-8 h-8" />
          </Button>
          <p className="text-sm font-bold text-red-800 uppercase">Emergency Call</p>
          <p className="text-xs text-red-600">Call 112/911</p>
        </motion.div>

        {/* Nearest Hospital */}
        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 text-white mb-3 shadow-lg"
            onClick={() => setShowHospitalMap(true)}
          >
            <MapPin className="w-8 h-8" />
          </Button>
          <p className="text-sm font-bold text-red-800 uppercase">Nearest Hospital</p>
          <p className="text-xs text-red-600">Find emergency care</p>
        </motion.div>

        {/* Request Ambulance */}
        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 text-white mb-3 shadow-lg"
            onClick={handleAmbulanceRequest}
          >
            <Ambulance className="w-8 h-8" />
          </Button>
          <p className="text-sm font-bold text-red-800 uppercase">Request Ambulance</p>
          <p className="text-xs text-red-600">Emergency transport</p>
        </motion.div>

        {/* Alert Doctor/Family */}
        <motion.div
          className="text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 text-white mb-3 shadow-lg"
            onClick={() => setShowAlertDoctor(true)}
          >
            <User className="w-8 h-8" />
          </Button>
          <p className="text-sm font-bold text-red-800 uppercase">Alert Contacts</p>
          <p className="text-xs text-red-600">Notify doctor/family</p>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderSupportCenter = () => (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Live Support Chat */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-teal-600" />
            <span>Talk to a Support Agent</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">Get instant help with your questions and concerns.</p>
            <Button 
              className="bg-teal-600 hover:bg-teal-700"
              onClick={() => setShowLiveChat(true)}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Start Live Chat
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Ticket System */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit Ticket */}
        <Card>
          <CardHeader>
            <CardTitle>Submit Support Ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Issue Type</label>
              <Select value={newTicket.issueType} onValueChange={(value) => setNewTicket(prev => ({ ...prev, issueType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Subject</label>
              <Input
                placeholder="Brief description of your issue"
                value={newTicket.subject}
                onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <Textarea
                placeholder="Please provide detailed information about your issue"
                value={newTicket.description}
                onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>
            
            <Button 
              className="w-full"
              onClick={submitTicket}
              disabled={!newTicket.subject || !newTicket.description}
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Ticket
            </Button>
          </CardContent>
        </Card>

        {/* Ticket Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>Your Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {supportTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setShowTicketDetails(true);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">#{ticket.id}</span>
                    <div className="flex space-x-2">
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status.replace('-', ' ')}
                      </Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{ticket.subject}</p>
                  <p className="text-xs text-gray-500">Created: {ticket.createdAt}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ & Help Center */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.id} className="border rounded-lg">
                  <button
                    className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-50"
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  >
                    <span className="font-medium text-sm">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      expandedFAQ === faq.id ? 'rotate-180' : ''
                    }`} />
                  </button>
                  <AnimatePresence>
                    {expandedFAQ === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 pt-0 text-sm text-gray-600">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Widget */}
        <Card>
          <CardHeader>
            <CardTitle>Your Feedback Helps Us Improve</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Rating</label>
              <div className="flex space-x-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                    className="text-2xl"
                  >
                    <Star className={`w-6 h-6 ${
                      star <= feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Comments (Optional)</label>
              <Textarea
                placeholder="Tell us how we can improve..."
                value={feedback.comment}
                onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
                maxLength={300}
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">{feedback.comment.length}/300 characters</p>
            </div>
            
            <Button 
              className="w-full"
              onClick={submitFeedback}
              disabled={feedback.rating === 0}
            >
              <Star className="w-4 h-4 mr-2" />
              Submit Feedback
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );

  const renderEmergencyCallModal = () => (
    <Dialog open={showEmergencyCall} onOpenChange={setShowEmergencyCall}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <span>Emergency Call Confirmation</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to initiate an emergency call to 112?
          </p>
          <p className="text-sm text-gray-500">
            This will connect you directly to emergency services.
          </p>
          <div className="flex space-x-3">
            <Button 
              className="flex-1 bg-red-600 hover:bg-red-700"
              onClick={confirmEmergencyCall}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Emergency
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setShowEmergencyCall(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderHospitalMapModal = () => (
    <Dialog open={showHospitalMap} onOpenChange={setShowHospitalMap}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Nearest Emergency Hospitals</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {hospitals.map((hospital) => (
            <Card key={hospital.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{hospital.address}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>📞 {hospital.phone}</span>
                    <span>📍 {hospital.distance} km away</span>
                    <span>⭐ {hospital.rating}/5</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <MapPin className="w-3 h-3 mr-1" />
                    Directions
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="w-3 h-3 mr-1" />
                    Call
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderAmbulanceRequestModal = () => (
    <Dialog open={showAmbulanceRequest} onOpenChange={setShowAmbulanceRequest}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-red-600">
            <Ambulance className="w-5 h-5" />
            <span>Ambulance Request</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">{ambulanceETA} min</div>
            <p className="text-gray-600">Estimated arrival time</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Driver:</span>
              <span className="font-medium">Rajesh Kumar</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Vehicle:</span>
              <span className="font-medium">AMB-001</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Contact:</span>
              <span className="font-medium">+91-9876543210</span>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Ambulance is on the way to your location</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((8 - ambulanceETA) / 8) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={cancelAmbulanceRequest}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderAlertDoctorModal = () => (
    <Dialog open={showAlertDoctor} onOpenChange={setShowAlertDoctor}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alert Your Contacts</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-700">
            Send an emergency alert to your saved contacts:
          </p>
          
          <div className="space-y-3">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-gray-600">{contact.phone}</p>
                  <Badge variant="outline" className="text-xs">
                    {contact.type}
                  </Badge>
                </div>
                <Button size="sm" variant="outline">
                  <Send className="w-3 h-3 mr-1" />
                  Alert
                </Button>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Alert Message:</strong> "Emergency Alert: [Your Name] may need assistance. Location: [GPS coordinates]."
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderLiveChatDrawer = () => (
    <Drawer open={showLiveChat} onOpenChange={setShowLiveChat}>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader>
          <DrawerTitle>Live Support Chat</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 flex flex-col p-4">
          <div className="flex-1 overflow-y-auto space-y-3 mb-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-teal-600 text-white'
                      : message.sender === 'agent'
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-blue-100 text-blue-900'
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button onClick={sendMessage}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );

  const renderTicketDetailsModal = () => (
    <Dialog open={showTicketDetails} onOpenChange={setShowTicketDetails}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Support Ticket #{selectedTicket?.id}</DialogTitle>
        </DialogHeader>
        {selectedTicket && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(selectedTicket.status)}>
                {selectedTicket.status.replace('-', ' ')}
              </Badge>
              <Badge className={getPriorityColor(selectedTicket.priority)}>
                {selectedTicket.priority}
              </Badge>
            </div>
            
            <div>
              <h3 className="font-semibold">{selectedTicket.subject}</h3>
              <p className="text-gray-600 mt-1">{selectedTicket.description}</p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Conversation History</h4>
              {selectedTicket.messages.map((message) => (
                <div key={message.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">
                      {message.sender === 'user' ? 'You' : 'Support Agent'}
                    </span>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700">{message.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  if (isMobile) {
    return (
      <div className="space-y-6 pb-20">
        {renderQuickEmergencyActions()}
        {renderSupportCenter()}
        {renderEmergencyCallModal()}
        {renderHospitalMapModal()}
        {renderAmbulanceRequestModal()}
        {renderAlertDoctorModal()}
        {renderLiveChatDrawer()}
        {renderTicketDetailsModal()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderQuickEmergencyActions()}
      {renderSupportCenter()}
      {renderEmergencyCallModal()}
      {renderHospitalMapModal()}
      {renderAmbulanceRequestModal()}
      {renderAlertDoctorModal()}
      {renderLiveChatDrawer()}
      {renderTicketDetailsModal()}
    </div>
  );
}
