"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, Camera, Mic, MicOff, Phone, PhoneOff, Users, User, MessageSquare, FileText,
  TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus, Percent, Tag, MapPin,
  ShoppingCart, Package, Globe, Wifi, Layers, Archive, Truck, Box, Megaphone,
  Building, Clipboard, BookOpen, Scale, Gavel, Lock, Key, CheckSquare, Square,
  Play, Pause, Send, Share2, Image, Video as VideoIcon, FileText as FileTextIcon,
  Printer, BarChart3, PieChart, LineChart, Activity as ActivityIcon, Search, Filter,
  Plus, Edit, Trash2, Eye, Download, Upload, Settings, Bell, RefreshCw, RotateCcw,
  QrCode, ScanLine, Barcode, Database, Network, Cpu, Brain, Activity as ActivityIcon2,
  TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon, ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon, Minus as MinusIcon, Percent as PercentIcon, Tag as TagIcon,
  MapPin as MapPinIcon, ShoppingCart as ShoppingCartIcon, Package as PackageIcon,
  Globe as GlobeIcon, Wifi as WifiIcon, Layers as LayersIcon, Archive as ArchiveIcon,
  Truck as TruckIcon, Box as BoxIcon, Megaphone as MegaphoneIcon, Building as BuildingIcon,
  Clipboard as ClipboardIcon, BookOpen as BookOpenIcon, Scale as ScaleIcon, Gavel as GavelIcon,
  Lock as LockIcon, Key as KeyIcon, CheckSquare as CheckSquareIcon, Square as SquareIcon,
  Play as PlayIcon, Pause as PauseIcon, Send as SendIcon, Share2 as Share2Icon,
  Image as ImageIcon, Video as VideoIcon2, FileText as FileTextIcon2, Printer as PrinterIcon,
  BarChart3 as BarChart3Icon, PieChart as PieChartIcon, LineChart as LineChartIcon,
  Activity as ActivityIcon3, AlertTriangle as AlertTriangleIcon, Clock as ClockIcon,
  Calendar, User as UserIcon, Users as UsersIcon, Star, Award, Phone as PhoneIcon, Mail,
  MessageSquare as MessageSquareIcon, Camera as CameraIcon, Mic as MicIcon, Headphones,
  Volume2, VolumeX, Wifi as WifiIcon2, Battery, Signal, Bluetooth, Hospital, UserCheck,
  UserPlus, UserMinus, UserX, UserEdit, UserSearch, UserSettings, Map, Navigation,
  Compass, Home, Building2, Building as BuildingIcon2, Ambulance, Siren, Zap, Flame,
  Skull, Cross, FirstAid, Heart, Shield, AlertTriangle, Activity as ActivityIcon4,
  Clock as ClockIcon2, Users as UsersIcon2, Target, Pill, Syringe, Microscope, TestTube,
  Beaker, Flask, Droplet, Thermometer, Bandage, X, Plus as PlusIcon, Wrench, Tool, Cog,
  Settings as SettingsIcon, Power, PowerOff, AlertCircle, Stethoscope, Monitor, Cpu as CpuIcon,
  HardDrive, Wifi as WifiIcon3, Battery as BatteryIcon, Signal as SignalIcon,
  Bluetooth as BluetoothIcon, Star as StarIcon, Heart as HeartIcon, Zap as ZapIcon,
  CheckCircle, XCircle, Target as TargetIcon, Award as AwardIcon, Shield as ShieldIcon,
  AlertTriangle as AlertTriangleIcon2, Activity as ActivityIcon5, Clock as ClockIcon3,
  Users as UsersIcon3, Target as TargetIcon2, Pill as PillIcon, Syringe as SyringeIcon,
  DollarSign, TrendingUp as TrendingUpIcon2, TrendingDown as TrendingDownIcon2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Telemedicine data simulation
const consultationData = [
  {
    id: 'CONS001',
    patientName: 'Sarah Johnson',
    patientId: 'PAT001',
    doctorName: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    status: 'Scheduled',
    scheduledTime: '2024-01-15T14:00:00Z',
    duration: 30,
    type: 'Video Consultation',
    platform: 'Zoom',
    reason: 'Follow-up for heart condition',
    notes: 'Patient reports chest pain, needs medication adjustment',
    insurance: 'Blue Cross Blue Shield',
    copay: 25,
    location: 'Patient Home',
    connectionQuality: 'Excellent',
    recordingConsent: true,
    prescriptionSent: false
  },
  {
    id: 'CONS002',
    patientName: 'Robert Williams',
    patientId: 'PAT002',
    doctorName: 'Dr. Emily Rodriguez',
    specialty: 'Dermatology',
    status: 'In Progress',
    scheduledTime: '2024-01-15T10:30:00Z',
    duration: 45,
    type: 'Video Consultation',
    platform: 'Microsoft Teams',
    reason: 'Skin rash evaluation',
    notes: 'Patient shows photos of rash, needs prescription',
    insurance: 'Aetna',
    copay: 30,
    location: 'Patient Home',
    connectionQuality: 'Good',
    recordingConsent: true,
    prescriptionSent: true
  },
  {
    id: 'CONS003',
    patientName: 'Maria Garcia',
    patientId: 'PAT003',
    doctorName: 'Dr. James Wilson',
    specialty: 'Pediatrics',
    status: 'Completed',
    scheduledTime: '2024-01-14T16:00:00Z',
    duration: 20,
    type: 'Phone Consultation',
    platform: 'Phone',
    reason: 'Child fever consultation',
    notes: 'Child has fever, prescribed medication',
    insurance: 'Cigna',
    copay: 20,
    location: 'Patient Home',
    connectionQuality: 'Good',
    recordingConsent: false,
    prescriptionSent: true
  }
];

const telemedicineMetrics = {
  totalConsultations: 1247,
  activeConsultations: 23,
  completedConsultations: 1200,
  cancelledConsultations: 24,
  averageDuration: 28,
  patientSatisfaction: 94.5,
  connectionSuccess: 98.2,
  prescriptionRate: 78.3
};

const consultationTrends = [
  { month: 'Jan', consultations: 180, satisfaction: 92.5, duration: 25 },
  { month: 'Feb', consultations: 195, satisfaction: 93.8, duration: 27 },
  { month: 'Mar', consultations: 210, satisfaction: 94.2, duration: 26 },
  { month: 'Apr', consultations: 225, satisfaction: 95.1, duration: 28 },
  { month: 'May', consultations: 240, satisfaction: 94.8, duration: 29 },
  { month: 'Jun', consultations: 255, satisfaction: 95.3, duration: 30 }
];

const specialtyData = [
  { specialty: 'General Practice', consultations: 45, percentage: 28.1, avgDuration: 25 },
  { specialty: 'Cardiology', consultations: 32, percentage: 20.0, avgDuration: 35 },
  { specialty: 'Dermatology', consultations: 28, percentage: 17.5, avgDuration: 20 },
  { specialty: 'Pediatrics', consultations: 25, percentage: 15.6, avgDuration: 30 },
  { specialty: 'Mental Health', consultations: 20, percentage: 12.5, avgDuration: 45 },
  { specialty: 'Other', consultations: 10, percentage: 6.3, avgDuration: 25 }
];

const platformData = [
  { platform: 'Zoom', usage: 45, percentage: 45.0, quality: 98.5 },
  { platform: 'Microsoft Teams', usage: 30, percentage: 30.0, quality: 97.2 },
  { platform: 'Google Meet', usage: 15, percentage: 15.0, quality: 96.8 },
  { platform: 'Phone', usage: 10, percentage: 10.0, quality: 99.1 }
];

const digitalHealthTools = [
  {
    id: 'TOOL001',
    name: 'Remote Patient Monitoring',
    type: 'Vital Signs',
    status: 'Active',
    patients: 156,
    accuracy: 96.8,
    lastUpdate: '2024-01-15T12:00:00Z',
    features: ['Blood Pressure', 'Heart Rate', 'Temperature', 'Oxygen Saturation']
  },
  {
    id: 'TOOL002',
    name: 'AI Symptom Checker',
    type: 'Diagnostic Support',
    status: 'Active',
    patients: 89,
    accuracy: 92.3,
    lastUpdate: '2024-01-15T10:30:00Z',
    features: ['Symptom Analysis', 'Risk Assessment', 'Recommendation Engine']
  },
  {
    id: 'TOOL003',
    name: 'Digital Prescription',
    type: 'Medication Management',
    status: 'Active',
    patients: 234,
    accuracy: 99.1,
    lastUpdate: '2024-01-15T14:15:00Z',
    features: ['E-Prescription', 'Drug Interaction Check', 'Pharmacy Integration']
  }
];

export default function TelemedicinePlatform() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [activeTab, setActiveTab] = useState('consultations');
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  // Filter consultations
  const filteredConsultations = consultationData.filter(consultation => {
    const matchesSearch = consultation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultation.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultation.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || consultation.status === selectedStatus;
    const matchesSpecialty = selectedSpecialty === 'All' || consultation.specialty === selectedSpecialty;
    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConnectionQualityColor = (quality: string) => {
    switch (quality) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-yellow-100 text-yellow-800';
      case 'Poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Telemedicine Platform
            </h1>
            <p className="text-gray-600 mt-2">Virtual care delivery and remote consultation management</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowConsultationForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Consultation
            </Button>
            <Button
              variant="outline"
              className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
            >
              <Video className="w-4 h-4 mr-2" />
              Start Call
            </Button>
            <Button
              variant="outline"
              className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Telemedicine Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Consultations',
              value: telemedicineMetrics.totalConsultations.toString(),
              change: '+15.2%',
              trend: 'up',
              icon: Video,
              color: 'from-indigo-500 to-purple-500'
            },
            {
              title: 'Active Sessions',
              value: telemedicineMetrics.activeConsultations.toString(),
              change: '+8.3%',
              trend: 'up',
              icon: Users,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Patient Satisfaction',
              value: `${telemedicineMetrics.patientSatisfaction}%`,
              change: '+2.1%',
              trend: 'up',
              icon: Heart,
              color: 'from-pink-500 to-rose-500'
            },
            {
              title: 'Connection Success',
              value: `${telemedicineMetrics.connectionSuccess}%`,
              change: '+1.5%',
              trend: 'up',
              icon: Wifi,
              color: 'from-blue-500 to-cyan-500'
            }
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-5`} />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                      <div className="flex items-center mt-2">
                        {metric.trend === 'up' ? (
                          <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full bg-gradient-to-br ${metric.color} text-white`}>
                      <metric.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="tools">Digital Tools</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="consultations" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Video className="w-5 h-5 text-indigo-600" />
                    <span>Virtual Consultations</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search consultations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Specialties</SelectItem>
                        <SelectItem value="Cardiology">Cardiology</SelectItem>
                        <SelectItem value="Dermatology">Dermatology</SelectItem>
                        <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="General Practice">General Practice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredConsultations.map((consultation, index) => (
                    <motion.div
                      key={consultation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedConsultation(consultation)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Video className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{consultation.patientName}</h3>
                            <Badge className={getStatusColor(consultation.status)}>
                              {consultation.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {consultation.specialty}
                            </Badge>
                            <Badge variant="outline" className="text-purple-600 border-purple-200">
                              {consultation.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Doctor: {consultation.doctorName} | Platform: {consultation.platform}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Scheduled: {formatTimeAgo(consultation.scheduledTime)}</span>
                            <span className="text-sm text-gray-600">Duration: {consultation.duration}min</span>
                            <span className="text-sm text-gray-600">Location: {consultation.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{consultation.duration}min</p>
                          <p className="text-sm text-gray-600">Duration</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{consultation.platform}</p>
                          <p className="text-sm text-gray-600">Platform</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${getConnectionQualityColor(consultation.connectionQuality).includes('green') ? 'text-green-600' : 'text-yellow-600'}`}>
                            {consultation.connectionQuality}
                          </p>
                          <p className="text-sm text-gray-600">Quality</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedConsultation(consultation);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-indigo-600" />
                  <span>Digital Health Tools</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {digitalHealthTools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Cpu className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                            <Badge className={tool.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {tool.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {tool.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Patients: {tool.patients} | Accuracy: {tool.accuracy}%</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Last Update: {formatTimeAgo(tool.lastUpdate)}</span>
                            <span className="text-sm text-gray-600">Features: {tool.features.length}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{tool.patients}</p>
                          <p className="text-sm text-gray-600">Patients</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{tool.accuracy}%</p>
                          <p className="text-sm text-gray-600">Accuracy</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{tool.status}</p>
                          <p className="text-sm text-gray-600">Status</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-indigo-600" />
                    <span>Consultation Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={consultationTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="consultations" stroke="#6366f1" strokeWidth={3} />
                      <Line type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="duration" stroke="#f59e0b" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-purple-600" />
                    <span>Specialty Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={specialtyData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="consultations"
                      >
                        {specialtyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#6366f1' : index === 1 ? '#10b981' : index === 2 ? '#f59e0b' : index === 3 ? '#ef4444' : index === 4 ? '#8b5cf6' : '#6b7280'} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Video className="w-5 h-5 text-green-600" />
                    <span>Platform Usage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platformData.map((platform, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600">{platform.platform}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-blue-600">{platform.usage}%</span>
                          <span className="text-sm text-gray-500">({platform.quality}% quality)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Avg Duration</span>
                      <span className="font-bold text-green-600">{telemedicineMetrics.averageDuration}min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Satisfaction</span>
                      <span className="font-bold text-blue-600">{telemedicineMetrics.patientSatisfaction}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Connection Success</span>
                      <span className="font-bold text-purple-600">{telemedicineMetrics.connectionSuccess}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Prescription Rate</span>
                      <span className="font-bold text-orange-600">{telemedicineMetrics.prescriptionRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span>Consultation Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total</span>
                      <span className="font-bold text-indigo-600">{telemedicineMetrics.totalConsultations}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active</span>
                      <span className="font-bold text-green-600">{telemedicineMetrics.activeConsultations}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Completed</span>
                      <span className="font-bold text-blue-600">{telemedicineMetrics.completedConsultations}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cancelled</span>
                      <span className="font-bold text-red-600">{telemedicineMetrics.cancelledConsultations}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-indigo-600" />
                  <span>Platform Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Default Platform</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Zoom">Zoom</SelectItem>
                          <SelectItem value="Microsoft Teams">Microsoft Teams</SelectItem>
                          <SelectItem value="Google Meet">Google Meet</SelectItem>
                          <SelectItem value="Phone">Phone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Default Duration (minutes)</Label>
                      <Input placeholder="30" />
                    </div>
                    <div>
                      <Label>Recording Consent Required</Label>
                      <Checkbox defaultChecked />
                    </div>
                    <div>
                      <Label>Prescription Integration</Label>
                      <Checkbox defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Consultation Detail Modal */}
        <Dialog open={!!selectedConsultation} onOpenChange={() => setSelectedConsultation(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Video className="w-5 h-5 text-indigo-600" />
                <span>Consultation Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedConsultation && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Video className="w-10 h-10 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedConsultation.patientName}</h2>
                      <Badge className={getStatusColor(selectedConsultation.status)}>
                        {selectedConsultation.status}
                      </Badge>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        {selectedConsultation.specialty}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">Doctor: {selectedConsultation.doctorName} | Platform: {selectedConsultation.platform}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Reason</Label>
                        <p className="font-semibold">{selectedConsultation.reason}</p>
                      </div>
                      <div>
                        <Label>Duration</Label>
                        <p className="font-semibold">{selectedConsultation.duration} minutes</p>
                      </div>
                      <div>
                        <Label>Insurance</Label>
                        <p className="font-semibold">{selectedConsultation.insurance}</p>
                      </div>
                      <div>
                        <Label>Copay</Label>
                        <p className="font-semibold">${selectedConsultation.copay}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Consultation Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{selectedConsultation.notes}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Technical Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Platform</span>
                          <span className="font-semibold">{selectedConsultation.platform}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Connection Quality</span>
                          <span className="font-semibold">{selectedConsultation.connectionQuality}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Recording Consent</span>
                          <span className="font-semibold">{selectedConsultation.recordingConsent ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Prescription Sent</span>
                          <span className="font-semibold">{selectedConsultation.prescriptionSent ? 'Yes' : 'No'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedConsultation(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Update Consultation
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Consultation Modal */}
        <Dialog open={showConsultationForm} onOpenChange={setShowConsultationForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-indigo-600" />
                <span>New Consultation</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input id="patientName" placeholder="Enter patient name" />
                </div>
                <div>
                  <Label htmlFor="doctorName">Doctor Name</Label>
                  <Input id="doctorName" placeholder="Enter doctor name" />
                </div>
                <div>
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Dermatology">Dermatology</SelectItem>
                      <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="General Practice">General Practice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="platform">Platform</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Zoom">Zoom</SelectItem>
                      <SelectItem value="Microsoft Teams">Microsoft Teams</SelectItem>
                      <SelectItem value="Google Meet">Google Meet</SelectItem>
                      <SelectItem value="Phone">Phone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConsultationForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Consultation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
