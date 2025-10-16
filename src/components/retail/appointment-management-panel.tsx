"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar,
  Clock,
  User,
  Video,
  Phone,
  MessageSquare,
  Mic,
  MicOff,
  VideoOff,
  Camera,
  PhoneOff,
  Send,
  Upload,
  CheckCircle,
  AlertCircle,
  X,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Building,
  Stethoscope,
  Heart,
  Brain,
  Eye,
  Zap,
  Bell,
  Settings,
  MoreVertical,
  Edit,
  Trash2,
  Download,
  Share2,
  Star,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { Textarea } from '@/components/ui/textarea';

// Types and interfaces
interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  doctorAvatar: string;
  hospital: string;
  date: string;
  time: string;
  duration: number;
  mode: 'in-person' | 'online';
  status: 'upcoming' | 'completed' | 'cancelled' | 'rescheduled';
  type: 'consultation' | 'follow-up' | 'emergency' | 'routine';
  notes?: string;
  meetingLink?: string;
  prescription?: string;
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  avatar: string;
  hospital: string;
  rating: number;
  availableSlots: string[];
}

interface ChatMessage {
  id: string;
  sender: 'doctor' | 'patient';
  message: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  fileUrl?: string;
}

// Mock data
const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Ahmed',
    specialization: 'Endocrinologist',
    avatar: '/api/placeholder/60/60',
    hospital: 'MedCenter Hospital',
    rating: 4.8,
    availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Cardiologist',
    avatar: '/api/placeholder/60/60',
    hospital: 'Heart Care Center',
    rating: 4.9,
    availableSlots: ['08:00', '09:30', '11:00', '13:00', '14:30', '16:00']
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Dermatologist',
    avatar: '/api/placeholder/60/60',
    hospital: 'Skin Health Clinic',
    rating: 4.7,
    availableSlots: ['09:00', '10:30', '12:00', '14:00', '15:30']
  }
];

const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctorId: '1',
    doctorName: 'Dr. Sarah Ahmed',
    doctorSpecialization: 'Endocrinologist',
    doctorAvatar: '/api/placeholder/60/60',
    hospital: 'MedCenter Hospital',
    date: '2024-01-25',
    time: '14:00',
    duration: 30,
    mode: 'online',
    status: 'upcoming',
    type: 'consultation',
    meetingLink: 'https://meet.zuruu.com/abc123'
  },
  {
    id: '2',
    doctorId: '2',
    doctorName: 'Dr. Michael Chen',
    doctorSpecialization: 'Cardiologist',
    doctorAvatar: '/api/placeholder/60/60',
    hospital: 'Heart Care Center',
    date: '2024-01-20',
    time: '10:00',
    duration: 45,
    mode: 'in-person',
    status: 'completed',
    type: 'follow-up',
    prescription: 'Continue current medication, follow up in 3 months'
  },
  {
    id: '3',
    doctorId: '3',
    doctorName: 'Dr. Emily Rodriguez',
    doctorSpecialization: 'Dermatologist',
    doctorAvatar: '/api/placeholder/60/60',
    hospital: 'Skin Health Clinic',
    date: '2024-01-18',
    time: '15:30',
    duration: 30,
    mode: 'online',
    status: 'cancelled',
    type: 'consultation'
  }
];

const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'doctor',
    message: 'Hello! How are you feeling today?',
    timestamp: '14:00',
    type: 'text'
  },
  {
    id: '2',
    sender: 'patient',
    message: 'Hi Dr. Ahmed, I\'m feeling better but still have some concerns about my blood sugar levels.',
    timestamp: '14:01',
    type: 'text'
  },
  {
    id: '3',
    sender: 'doctor',
    message: 'I can see your recent lab results. Let\'s discuss your medication adjustments.',
    timestamp: '14:02',
    type: 'text'
  }
];

export default function AppointmentManagementPanel() {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(mockAppointments[0]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  const [isInCall, setIsInCall] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter appointments
  const filteredAppointments = mockAppointments.filter(appointment => {
    if (filterStatus === 'all') return true;
    return appointment.status === filterStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSpecializationIcon = (specialization: string) => {
    switch (specialization.toLowerCase()) {
      case 'cardiologist': return <Heart className="w-4 h-4" />;
      case 'endocrinologist': return <Stethoscope className="w-4 h-4" />;
      case 'dermatologist': return <Eye className="w-4 h-4" />;
      case 'neurologist': return <Brain className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const renderHeader = () => (
    <motion.div 
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Appointments & Teleconsultations</h1>
        <p className="text-gray-600">Schedule and manage your medical appointments</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Button 
          className="bg-teal-600 hover:bg-teal-700 text-white"
          onClick={() => setShowBookingDialog(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Book New
        </Button>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex border rounded-lg">
          <Button
            variant={viewMode === 'month' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('month')}
            className="rounded-r-none"
          >
            Month
          </Button>
          <Button
            variant={viewMode === 'week' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('week')}
            className="rounded-l-none"
          >
            Week
          </Button>
        </div>
      </div>
    </motion.div>
  );

  const renderCalendar = () => (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Calendar</span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 font-semibold text-gray-600">{day}</div>
            ))}
            {Array.from({ length: 31 }, (_, i) => {
              const date = i + 1;
              const hasAppointment = mockAppointments.some(apt => 
                new Date(apt.date).getDate() === date
              );
              return (
                <motion.div
                  key={date}
                  className={`p-2 cursor-pointer rounded-lg hover:bg-teal-50 ${
                    hasAppointment ? 'bg-teal-100 text-teal-800' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {date}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Booking Card */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Booking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Doctor" />
            </SelectTrigger>
            <SelectContent>
              {mockDoctors.map(doctor => (
                <SelectItem key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialization}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="grid grid-cols-2 gap-3">
            <Input type="date" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="09:00">09:00 AM</SelectItem>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="11:00">11:00 AM</SelectItem>
                <SelectItem value="14:00">02:00 PM</SelectItem>
                <SelectItem value="15:00">03:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="in-person">In-Person</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="w-full bg-teal-600 hover:bg-teal-700">
            Book Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderAppointmentsList = () => (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-3">
          {filteredAppointments.filter(apt => apt.status === 'upcoming').map((appointment) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:border-teal-300 ${
                  selectedAppointment?.id === appointment.id ? 'border-2 border-teal-600 shadow-md' : 'border-gray-200'
                }`}
                onClick={() => setSelectedAppointment(appointment)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-teal-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900">{appointment.doctorName}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        {getSpecializationIcon(appointment.doctorSpecialization)}
                        <span className="ml-1">{appointment.doctorSpecialization}</span>
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        {appointment.mode === 'online' ? (
                          <Video className="w-4 h-4 text-teal-600" />
                        ) : (
                          <MapPin className="w-4 h-4 text-gray-600" />
                        )}
                        <span className="text-xs text-gray-500">
                          {appointment.mode === 'online' ? 'Online' : 'In-Person'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-3">
          {filteredAppointments.filter(apt => apt.status === 'completed').map((appointment) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:border-teal-300 ${
                  selectedAppointment?.id === appointment.id ? 'border-2 border-teal-600 shadow-md' : 'border-gray-200'
                }`}
                onClick={() => setSelectedAppointment(appointment)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900">{appointment.doctorName}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        {getSpecializationIcon(appointment.doctorSpecialization)}
                        <span className="ml-1">{appointment.doctorSpecialization}</span>
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                      {appointment.prescription && (
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          Prescription
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
        
        <TabsContent value="cancelled" className="space-y-3">
          {filteredAppointments.filter(apt => apt.status === 'cancelled').map((appointment) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:border-teal-300 ${
                  selectedAppointment?.id === appointment.id ? 'border-2 border-teal-600 shadow-md' : 'border-gray-200'
                }`}
                onClick={() => setSelectedAppointment(appointment)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <X className="w-6 h-6 text-red-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900">{appointment.doctorName}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        {getSpecializationIcon(appointment.doctorSpecialization)}
                        <span className="ml-1">{appointment.doctorSpecialization}</span>
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Plus className="w-3 h-3 mr-1" />
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </motion.div>
  );

  const renderAppointmentDetails = () => {
    if (!selectedAppointment) return null;

    return (
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {/* Appointment Summary Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">{selectedAppointment.doctorName}</CardTitle>
                  <p className="text-gray-600 flex items-center">
                    {getSpecializationIcon(selectedAppointment.doctorSpecialization)}
                    <span className="ml-1">{selectedAppointment.doctorSpecialization}</span>
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Building className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedAppointment.hospital}</span>
                  </div>
                </div>
              </div>
              <Badge className={getStatusColor(selectedAppointment.status)}>
                {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {new Date(selectedAppointment.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{selectedAppointment.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                {selectedAppointment.mode === 'online' ? (
                  <Video className="w-4 h-4 text-teal-600" />
                ) : (
                  <MapPin className="w-4 h-4 text-gray-600" />
                )}
                <span className="text-sm text-gray-600">
                  {selectedAppointment.mode === 'online' ? 'Online Consultation' : 'In-Person Visit'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{selectedAppointment.duration} minutes</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              {selectedAppointment.status === 'upcoming' && selectedAppointment.mode === 'online' && (
                <Button 
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={() => setIsInCall(true)}
                >
                  <Video className="w-4 h-4 mr-2" />
                  Join Call
                </Button>
              )}
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Reschedule
              </Button>
              <Button variant="outline" className="text-red-600 hover:text-red-700">
                <Trash2 className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Video Consultation Interface */}
        {isInCall && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Video Consultation</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsInCall(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Video Windows */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center border-2 border-teal-300">
                      <div className="text-center text-white">
                        <User className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm">Dr. {selectedAppointment.doctorName}</p>
                      </div>
                    </div>
                    <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <User className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm">You</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Control Bar */}
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant={isMicOn ? "default" : "destructive"}
                      size="sm"
                      onClick={() => setIsMicOn(!isMicOn)}
                    >
                      {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant={isCameraOn ? "default" : "destructive"}
                      size="sm"
                      onClick={() => setIsCameraOn(!isCameraOn)}
                    >
                      {isCameraOn ? <Camera className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowChat(!showChat)}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setIsInCall(false)}
                    >
                      <PhoneOff className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Chat Sidebar */}
        {showChat && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Chat</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowChat(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Messages */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs p-3 rounded-lg ${
                            message.sender === 'patient'
                              ? 'bg-teal-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Message Input */}
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* File Upload */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload File
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Prescription */}
        {selectedAppointment.prescription && (
          <Card>
            <CardHeader>
              <CardTitle>Prescription</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{selectedAppointment.prescription}</p>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Prescription
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.div>
    );
  };

  const renderAIAssistant = () => (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5 }}
    >
      <Button
        size="lg"
        className="w-14 h-14 rounded-full bg-teal-600 hover:bg-teal-700 shadow-lg"
        onClick={() => setShowAIAssistant(!showAIAssistant)}
      >
        <Brain className="w-6 h-6" />
      </Button>
      
      <AnimatePresence>
        {showAIAssistant && (
          <motion.div
            className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Zuruu AI Assistant</h3>
              <p className="text-sm text-gray-600">Need help scheduling? Ask me anything!</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700">
                  "Book me with a cardiologist next Tuesday morning"
                </p>
              </div>
              <div className="bg-teal-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700">
                  I found 3 available slots with Dr. Michael Chen on Tuesday:
                </p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• 09:00 AM</li>
                  <li>• 10:30 AM</li>
                  <li>• 14:00 PM</li>
                </ul>
              </div>
              <Input placeholder="Ask me anything..." />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const renderBookingDialog = () => (
    <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book New Appointment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Doctor" />
            </SelectTrigger>
            <SelectContent>
              {mockDoctors.map(doctor => (
                <SelectItem key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialization}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="grid grid-cols-2 gap-3">
            <Input type="date" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="09:00">09:00 AM</SelectItem>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="11:00">11:00 AM</SelectItem>
                <SelectItem value="14:00">02:00 PM</SelectItem>
                <SelectItem value="15:00">03:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="in-person">In-Person</SelectItem>
            </SelectContent>
          </Select>
          
          <Textarea placeholder="Additional notes (optional)" />
          
          <div className="flex space-x-3">
            <Button 
              className="flex-1 bg-teal-600 hover:bg-teal-700"
              onClick={() => setShowBookingDialog(false)}
            >
              Book Appointment
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowBookingDialog(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (isMobile) {
    return (
      <div className="space-y-6">
        {renderHeader()}
        
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-4">
            {renderCalendar()}
          </TabsContent>
          
          <TabsContent value="appointments" className="space-y-4">
            {renderAppointmentsList()}
            {selectedAppointment && (
              <div className="mt-6">
                {renderAppointmentDetails()}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {renderAIAssistant()}
        {renderBookingDialog()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderHeader()}
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Panel - Calendar & Booking (40%) */}
        <div className="lg:col-span-2 space-y-6">
          {renderCalendar()}
          {renderAppointmentsList()}
        </div>

        {/* Right Panel - Appointment Details (60%) */}
        <div className="lg:col-span-3">
          {selectedAppointment ? (
            renderAppointmentDetails()
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select an Appointment</h3>
                <p className="text-gray-600">Choose an appointment from the list to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {renderAIAssistant()}
      {renderBookingDialog()}
    </div>
  );
}
