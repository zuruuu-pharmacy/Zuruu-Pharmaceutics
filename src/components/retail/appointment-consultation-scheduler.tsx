"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar,
  Clock,
  Video,
  MapPin,
  User,
  Phone,
  Mail,
  Plus,
  Sync,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Bell,
  CheckCircle,
  AlertCircle,
  XCircle,
  Play,
  Pause,
  Edit,
  Trash2,
  ExternalLink,
  Download,
  Share2,
  MessageSquare,
  Heart,
  Stethoscope,
  Pill,
  Brain,
  Eye,
  Activity,
  Zap,
  Star,
  Award,
  Target,
  Settings,
  HelpCircle,
  Info,
  AlertTriangle,
  Check,
  X,
  MoreHorizontal,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  RefreshCw,
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
  SignalZero
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

// Types and interfaces
interface Appointment {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorPhoto: string;
  appointmentType: 'video' | 'in-person' | 'follow-up' | 'counselling';
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  location?: string;
  videoLink?: string;
  fee?: number;
  notes?: string;
  isActive?: boolean;
}

interface BookingStep {
  id: number;
  title: string;
  completed: boolean;
}

interface TimeSlot {
  time: string;
  available: boolean;
  doctorId: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  photo: string;
  availableSlots: TimeSlot[];
  rating: number;
  experience: string;
}

interface AISuggestion {
  id: string;
  type: 'missed-followup' | 'checkup-reminder' | 'specialist-referral';
  title: string;
  description: string;
  action: string;
  priority: 'low' | 'medium' | 'high';
}

// Mock data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Sara Ahmed',
    doctorSpecialty: 'Cardiologist',
    doctorPhoto: '/api/placeholder/40/40',
    appointmentType: 'video',
    date: '2024-01-16',
    time: '4:30 PM',
    status: 'confirmed',
    videoLink: 'https://zoom.us/j/123456789',
    fee: 150,
    isActive: true
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    doctorSpecialty: 'Dermatologist',
    doctorPhoto: '/api/placeholder/40/40',
    appointmentType: 'in-person',
    date: '2024-01-18',
    time: '10:00 AM',
    status: 'pending',
    location: 'Zuruu Medical Center, Room 205',
    fee: 120
  },
  {
    id: '3',
    doctorName: 'Dr. Emily Rodriguez',
    doctorSpecialty: 'General Physician',
    doctorPhoto: '/api/placeholder/40/40',
    appointmentType: 'follow-up',
    date: '2024-01-20',
    time: '2:15 PM',
    status: 'confirmed',
    location: 'Zuruu Medical Center, Room 101',
    fee: 100
  }
];

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sara Ahmed',
    specialty: 'Cardiologist',
    photo: '/api/placeholder/40/40',
    availableSlots: [
      { time: '9:00 AM', available: true, doctorId: '1' },
      { time: '10:30 AM', available: true, doctorId: '1' },
      { time: '2:00 PM', available: false, doctorId: '1' },
      { time: '3:30 PM', available: true, doctorId: '1' }
    ],
    rating: 4.8,
    experience: '8 years'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    photo: '/api/placeholder/40/40',
    availableSlots: [
      { time: '9:30 AM', available: true, doctorId: '2' },
      { time: '11:00 AM', available: true, doctorId: '2' },
      { time: '1:30 PM', available: true, doctorId: '2' },
      { time: '4:00 PM', available: false, doctorId: '2' }
    ],
    rating: 4.6,
    experience: '6 years'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'General Physician',
    photo: '/api/placeholder/40/40',
    availableSlots: [
      { time: '8:00 AM', available: true, doctorId: '3' },
      { time: '9:30 AM', available: false, doctorId: '3' },
      { time: '11:00 AM', available: true, doctorId: '3' },
      { time: '2:30 PM', available: true, doctorId: '3' }
    ],
    rating: 4.9,
    experience: '12 years'
  }
];

const mockAISuggestions: AISuggestion[] = [
  {
    id: '1',
    type: 'missed-followup',
    title: 'Missed Follow-ups',
    description: 'You\'ve missed 2 follow-ups. Would you like to reschedule?',
    action: 'Reschedule',
    priority: 'high'
  },
  {
    id: '2',
    type: 'checkup-reminder',
    title: 'Check-up Reminder',
    description: 'Your last consultation was 3 months ago — schedule a check-up?',
    action: 'Schedule',
    priority: 'medium'
  },
  {
    id: '3',
    type: 'specialist-referral',
    title: 'Specialist Referral',
    description: 'Based on your recent blood pressure logs, you might need: Cardiologist.',
    action: 'Book Now',
    priority: 'low'
  }
];

export default function AppointmentConsultationScheduler() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>(mockAISuggestions);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAppointmentType, setSelectedAppointmentType] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAppointmentTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'in-person': return <MapPin className="w-4 h-4" />;
      case 'follow-up': return <RefreshCw className="w-4 h-4" />;
      case 'counselling': return <MessageSquare className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getAppointmentTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-person': return 'bg-green-100 text-green-800 border-green-200';
      case 'follow-up': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'counselling': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const canJoinCall = (appointment: Appointment) => {
    if (appointment.appointmentType !== 'video' || appointment.status !== 'confirmed') {
      return false;
    }
    
    const appointmentDateTime = new Date(`${appointment.date} ${appointment.time}`);
    const now = new Date();
    const timeDiff = appointmentDateTime.getTime() - now.getTime();
    const minutesDiff = timeDiff / (1000 * 60);
    
    return minutesDiff <= 10 && minutesDiff >= -30; // Can join 10 mins before or 30 mins after
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         appointment.doctorSpecialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const renderHeader = () => (
    <motion.div 
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Appointments & Consultations</h1>
        <p className="text-gray-600">Manage your medical appointments and consultations</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Button 
          className="bg-teal-600 hover:bg-teal-700 text-white"
          onClick={() => setShowBookingModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Book Appointment
        </Button>
        
        <Button variant="outline">
          <Sync className="w-4 h-4 mr-2" />
          Sync Calendar
        </Button>
      </div>
    </motion.div>
  );

  const renderAppointmentCard = (appointment: Appointment, index: number) => (
    <motion.div
      key={appointment.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className={`transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
        appointment.isActive ? 'ring-2 ring-teal-500 shadow-lg' : ''
      }`}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            {/* Doctor Photo */}
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            
            {/* Appointment Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{appointment.doctorName}</h3>
                  <p className="text-sm text-gray-600">{appointment.doctorSpecialty}</p>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getAppointmentTypeColor(appointment.appointmentType)}>
                    {getAppointmentTypeIcon(appointment.appointmentType)}
                    <span className="ml-1 capitalize">{appointment.appointmentType.replace('-', ' ')}</span>
                  </Badge>
                  
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status === 'confirmed' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {appointment.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                    {appointment.status === 'cancelled' && <XCircle className="w-3 h-3 mr-1" />}
                    <span className="capitalize">{appointment.status}</span>
                  </Badge>
                </div>
              </div>
              
              <div className="mt-3 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Wed, Oct 16 — {appointment.time}</span>
                </div>
                
                {appointment.appointmentType === 'in-person' && appointment.location && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{appointment.location}</span>
                  </div>
                )}
                
                {appointment.appointmentType === 'video' && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Video className="w-4 h-4 mr-2" />
                    <span>Video Call</span>
                  </div>
                )}
                
                {appointment.fee && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Fee: ${appointment.fee}</span>
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
                {canJoinCall(appointment) && (
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                    <Play className="w-3 h-3 mr-1" />
                    Join Call
                  </Button>
                )}
                
                <Button size="sm" variant="outline">
                  <Edit className="w-3 h-3 mr-1" />
                  Reschedule
                </Button>
                
                <Button size="sm" variant="outline">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Add to Calendar
                </Button>
                
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                  <X className="w-3 h-3 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderNoAppointmentsState = () => (
    <motion.div
      className="text-center py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Calendar className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No upcoming consultations</h3>
      <p className="text-gray-600 mb-6">Book your next visit today.</p>
      <Button 
        className="bg-teal-600 hover:bg-teal-700"
        onClick={() => setShowBookingModal(true)}
      >
        <Plus className="w-4 h-4 mr-2" />
        Book Appointment
      </Button>
    </motion.div>
  );

  const renderAppointmentsOverview = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment, index) => renderAppointmentCard(appointment, index))
        ) : (
          renderNoAppointmentsState()
        )}
      </div>
    </div>
  );

  const renderBookingWizard = () => (
    <div className="space-y-6">
      {/* Step 1: Appointment Type */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Select Appointment Type</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'in-person', label: 'In-Person Visit', icon: <MapPin className="w-5 h-5" /> },
            { id: 'video', label: 'Video Consultation', icon: <Video className="w-5 h-5" /> },
            { id: 'counselling', label: 'Pharmacy Counselling', icon: <MessageSquare className="w-5 h-5" /> },
            { id: 'follow-up', label: 'Follow-up Review', icon: <RefreshCw className="w-5 h-5" /> }
          ].map((type) => (
            <Button
              key={type.id}
              variant={selectedAppointmentType === type.id ? 'default' : 'outline'}
              className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                selectedAppointmentType === type.id ? 'bg-teal-600 hover:bg-teal-700' : ''
              }`}
              onClick={() => setSelectedAppointmentType(type.id)}
            >
              {type.icon}
              <span className="text-sm">{type.label}</span>
            </Button>
          ))}
        </div>
      </div>
      
      {/* Step 2: Select Specialist */}
      {selectedAppointmentType && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-900">Select Specialist</h3>
          <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a specialist" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Physician</SelectItem>
              <SelectItem value="dermatologist">Dermatologist</SelectItem>
              <SelectItem value="cardiologist">Cardiologist</SelectItem>
              <SelectItem value="pharmacist">Pharmacist</SelectItem>
              <SelectItem value="counsellor">Mental Health Counsellor</SelectItem>
            </SelectContent>
          </Select>
          
          {/* AI Suggestion */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>AI Suggestion:</strong> Based on your recent blood pressure logs, you might need: Cardiologist.
            </p>
          </div>
        </motion.div>
      )}
      
      {/* Step 3: Choose Date & Time */}
      {selectedDoctor && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-900">Choose Date & Time</h3>
          
          {/* Mini Calendar */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 font-semibold text-gray-600">{day}</div>
              ))}
              {Array.from({ length: 31 }, (_, i) => {
                const date = i + 1;
                const isAvailable = date % 3 !== 0; // Mock availability
                return (
                  <button
                    key={date}
                    className={`p-2 rounded hover:bg-teal-100 transition-colors ${
                      isAvailable ? 'text-gray-900 hover:bg-teal-100' : 'text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!isAvailable}
                    onClick={() => setSelectedDate(date.toString())}
                  >
                    {date}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Available Time Slots */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Available Time Slots</h4>
            <div className="grid grid-cols-2 gap-2">
              {['9:00 AM', '10:30 AM', '2:00 PM', '3:30 PM'].map((time) => (
                <Button
                  key={time}
                  variant="outline"
                  size="sm"
                  className="text-teal-600 border-teal-200 hover:bg-teal-50"
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Step 4: Confirmation Summary */}
      {selectedTime && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-900">Confirmation Summary</h3>
          
          <Card className="border-teal-200">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Dr. Sara Ahmed</h4>
                    <p className="text-sm text-gray-600">Cardiologist</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Wed, Oct 16 — {selectedTime}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    {selectedAppointmentType === 'video' ? (
                      <>
                        <Video className="w-4 h-4 mr-2" />
                        <span>Zoom/Teams link will be provided</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>Zuruu Medical Center, Room 205</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium">Fee: $150</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Button className="w-full bg-teal-600 hover:bg-teal-700">
            <CheckCircle className="w-4 h-4 mr-2" />
            Confirm Appointment
          </Button>
        </motion.div>
      )}
    </div>
  );

  const renderAISuggestions = () => (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <Card className="border-l-4 border-l-teal-600">
        <CardHeader>
          <Button
            variant="ghost"
            className="flex items-center justify-between w-full p-0 h-auto"
            onClick={() => setShowAISuggestions(!showAISuggestions)}
          >
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-teal-600" />
              <span>AI Scheduler Suggestions</span>
            </CardTitle>
            {showAISuggestions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </CardHeader>
        
        <AnimatePresence>
          {showAISuggestions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {aiSuggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion.id}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className={`p-2 rounded-full ${
                        suggestion.priority === 'high' ? 'bg-red-100' :
                        suggestion.priority === 'medium' ? 'bg-yellow-100' :
                        'bg-green-100'
                      }`}>
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600">{suggestion.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          {suggestion.action}
                        </Button>
                        <Button size="sm" variant="ghost">
                          Dismiss
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );

  const renderBookingModal = () => (
    <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book New Appointment</DialogTitle>
        </DialogHeader>
        {renderBookingWizard()}
      </DialogContent>
    </Dialog>
  );

  if (isMobile) {
    return (
      <div className="space-y-6 pb-20">
        {renderHeader()}
        
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="booking">Book New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appointments" className="space-y-4">
            {renderAppointmentsOverview()}
          </TabsContent>
          
          <TabsContent value="booking" className="space-y-4">
            {renderBookingWizard()}
          </TabsContent>
        </Tabs>
        
        {renderAISuggestions()}
        {renderBookingModal()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderHeader()}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel - Appointments Overview (60%) */}
        <div className="lg:col-span-2">
          {renderAppointmentsOverview()}
        </div>
        
        {/* Right Panel - Booking Interface (40%) */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Book New Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              {renderBookingWizard()}
            </CardContent>
          </Card>
          
          {renderAISuggestions()}
        </div>
      </div>
      
      {renderBookingModal()}
    </div>
  );
}
