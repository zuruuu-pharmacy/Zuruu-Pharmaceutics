"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, Heart, Activity, Clock, Shield, Stethoscope, 
  TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus, Percent, Tag,
  MapPin, ShoppingCart, Package, Globe, Wifi, Layers, Archive, Truck,
  Box, Megaphone, Building, Clipboard, BookOpen, Scale, Gavel, Lock,
  Key, CheckSquare, Square, Play, Pause, Send, Share2, Image, Video,
  FileText, Printer, BarChart3, PieChart, LineChart, Activity as ActivityIcon,
  Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings, Bell,
  Target, Zap, RefreshCw, RotateCcw, QrCode, ScanLine, Barcode, Database,
  Network, Cpu, Brain, Activity as ActivityIcon2, TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon, ArrowUp as ArrowUpIcon, ArrowDown as ArrowDownIcon,
  Minus as MinusIcon, Percent as PercentIcon, Tag as TagIcon, MapPin as MapPinIcon,
  ShoppingCart as ShoppingCartIcon, Package as PackageIcon, Globe as GlobeIcon,
  Wifi as WifiIcon, Layers as LayersIcon, Archive as ArchiveIcon, Truck as TruckIcon,
  Box as BoxIcon, Megaphone as MegaphoneIcon, Building as BuildingIcon,
  Clipboard as ClipboardIcon, BookOpen as BookOpenIcon, Scale as ScaleIcon,
  Gavel as GavelIcon, Lock as LockIcon, Key as KeyIcon, CheckSquare as CheckSquareIcon,
  Square as SquareIcon, Play as PlayIcon, Pause as PauseIcon, Send as SendIcon,
  Share2 as Share2Icon, Image as ImageIcon, Video as VideoIcon, FileText as FileTextIcon,
  Printer as PrinterIcon, BarChart3 as BarChart3Icon, PieChart as PieChartIcon,
  LineChart as LineChartIcon, Activity as ActivityIcon3, CheckCircle, XCircle,
  AlertTriangle as AlertTriangleIcon, Clock as ClockIcon, Calendar, User, Users as UsersIcon,
  DollarSign, Star, Award, Phone, Mail, MessageSquare, Camera, Mic, Headphones,
  Volume2, VolumeX, Wifi as WifiIcon2, Battery, Signal, Bluetooth, Hospital,
  Pill, Syringe, Microscope, Thermometer, Bandage, X, Plus as PlusIcon,
  UserCheck, UserPlus, UserMinus, UserX, UserEdit, UserSearch, UserSettings,
  Map, Navigation, Compass, Home, Building2, Building as BuildingIcon2,
  Ambulance, Siren, Zap as ZapIcon, Flame, Skull, Cross, FirstAid
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

// Emergency response data simulation
const emergencyCases = [
  {
    id: 'EMERG001',
    patientName: 'John Smith',
    age: 45,
    gender: 'Male',
    triageLevel: 'Critical',
    priority: 'Immediate',
    chiefComplaint: 'Chest Pain',
    vitalSigns: {
      heartRate: 120,
      bloodPressure: '180/110',
      temperature: 101.2,
      oxygenSaturation: 88
    },
    arrivalTime: '2024-01-15T14:30:00Z',
    estimatedWaitTime: 0,
    assignedDoctor: 'Dr. Sarah Thompson',
    assignedNurse: 'Nurse Jennifer Lee',
    location: 'Trauma Bay 1',
    status: 'Active',
    interventions: ['Oxygen Therapy', 'IV Access', 'Cardiac Monitoring'],
    allergies: ['Penicillin'],
    medications: ['Aspirin', 'Nitroglycerin'],
    familyContact: 'Mary Smith (555) 123-4567'
  },
  {
    id: 'EMERG002',
    patientName: 'Emma Davis',
    age: 28,
    gender: 'Female',
    triageLevel: 'Urgent',
    priority: 'High',
    chiefComplaint: 'Severe Abdominal Pain',
    vitalSigns: {
      heartRate: 95,
      bloodPressure: '140/90',
      temperature: 99.8,
      oxygenSaturation: 96
    },
    arrivalTime: '2024-01-15T15:15:00Z',
    estimatedWaitTime: 15,
    assignedDoctor: 'Dr. Michael Chen',
    assignedNurse: 'Nurse Robert Wilson',
    location: 'Exam Room 3',
    status: 'Active',
    interventions: ['Pain Management', 'IV Access', 'Ultrasound'],
    allergies: ['None'],
    medications: ['Morphine', 'Ondansetron'],
    familyContact: 'David Davis (555) 234-5678'
  },
  {
    id: 'EMERG003',
    patientName: 'Robert Johnson',
    age: 62,
    gender: 'Male',
    triageLevel: 'Moderate',
    priority: 'Medium',
    chiefComplaint: 'Fall with Head Injury',
    vitalSigns: {
      heartRate: 85,
      bloodPressure: '130/80',
      temperature: 98.6,
      oxygenSaturation: 98
    },
    arrivalTime: '2024-01-15T16:00:00Z',
    estimatedWaitTime: 45,
    assignedDoctor: 'Dr. Emily Rodriguez',
    assignedNurse: 'Nurse Lisa Brown',
    location: 'Waiting Area',
    status: 'Waiting',
    interventions: ['Neurological Assessment', 'CT Scan'],
    allergies: ['None'],
    medications: ['Acetaminophen'],
    familyContact: 'Linda Johnson (555) 345-6789'
  }
];

const emergencyMetrics = {
  totalCases: 47,
  activeCases: 12,
  criticalCases: 3,
  averageWaitTime: 23,
  responseTime: 4.2,
  patientSatisfaction: 4.3,
  mortalityRate: 1.8,
  readmissionRate: 5.2,
  ambulanceArrivals: 8
};

const triageData = [
  { level: 'Critical', count: 3, color: '#ef4444', waitTime: 0 },
  { level: 'Urgent', count: 5, color: '#f59e0b', waitTime: 15 },
  { level: 'Moderate', count: 8, color: '#3b82f6', waitTime: 45 },
  { level: 'Low', count: 12, color: '#10b981', waitTime: 120 }
];

const responseData = [
  { hour: '00:00', arrivals: 2, discharges: 1, active: 8 },
  { hour: '06:00', arrivals: 5, discharges: 3, active: 10 },
  { hour: '12:00', arrivals: 8, discharges: 4, active: 14 },
  { hour: '18:00', arrivals: 6, discharges: 2, active: 18 },
  { hour: '24:00', arrivals: 3, discharges: 5, active: 16 }
];

const resourceData = [
  {
    resource: 'Trauma Bays',
    total: 8,
    available: 2,
    occupied: 6,
    utilization: 75
  },
  {
    resource: 'Exam Rooms',
    total: 15,
    available: 8,
    occupied: 7,
    utilization: 47
  },
  {
    resource: 'Ambulance Bays',
    total: 4,
    available: 1,
    occupied: 3,
    utilization: 75
  },
  {
    resource: 'CT Scanner',
    total: 2,
    available: 1,
    occupied: 1,
    utilization: 50
  }
];

export default function EmergencyResponseSystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTriage, setSelectedTriage] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('cases');
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [showCaseForm, setShowCaseForm] = useState(false);

  // Filter cases
  const filteredCases = emergencyCases.filter(emergencyCase => {
    const matchesSearch = emergencyCase.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emergencyCase.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emergencyCase.assignedDoctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTriage = selectedTriage === 'All' || emergencyCase.triageLevel === selectedTriage;
    const matchesStatus = selectedStatus === 'All' || emergencyCase.status === selectedStatus;
    return matchesSearch && matchesTriage && matchesStatus;
  });

  const getTriageColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'Urgent': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Moderate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Immediate': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800';
      case 'Waiting': return 'bg-yellow-100 text-yellow-800';
      case 'Discharged': return 'bg-green-100 text-green-800';
      case 'Admitted': return 'bg-blue-100 text-blue-800';
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Emergency Response System
            </h1>
            <p className="text-gray-600 mt-2">Rapid emergency triage and resource allocation</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowCaseForm(true)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Emergency
            </Button>
            <Button
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <Ambulance className="w-4 h-4 mr-2" />
              Call Ambulance
            </Button>
            <Button
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Emergency Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Active Cases',
              value: emergencyMetrics.activeCases.toString(),
              change: '+15.2%',
              trend: 'up',
              icon: AlertTriangle,
              color: 'from-red-500 to-orange-500'
            },
            {
              title: 'Critical Cases',
              value: emergencyMetrics.criticalCases.toString(),
              change: '+8.3%',
              trend: 'up',
              icon: Heart,
              color: 'from-red-600 to-pink-600'
            },
            {
              title: 'Avg Wait Time',
              value: `${emergencyMetrics.averageWaitTime}m`,
              change: '-12.5%',
              trend: 'down',
              icon: Clock,
              color: 'from-orange-500 to-yellow-500'
            },
            {
              title: 'Response Time',
              value: `${emergencyMetrics.responseTime}m`,
              change: '-5.2%',
              trend: 'down',
              icon: Zap,
              color: 'from-yellow-500 to-green-500'
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
            <TabsTrigger value="cases">Cases</TabsTrigger>
            <TabsTrigger value="triage">Triage</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="cases" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span>Emergency Cases</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search cases..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedTriage} onValueChange={setSelectedTriage}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Triage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Levels</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Waiting">Waiting</SelectItem>
                        <SelectItem value="Discharged">Discharged</SelectItem>
                        <SelectItem value="Admitted">Admitted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCases.map((emergencyCase, index) => (
                    <motion.div
                      key={emergencyCase.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedCase(emergencyCase)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{emergencyCase.patientName}</h3>
                            <Badge className={getTriageColor(emergencyCase.triageLevel)}>
                              {emergencyCase.triageLevel}
                            </Badge>
                            <Badge className={getPriorityColor(emergencyCase.priority)}>
                              {emergencyCase.priority}
                            </Badge>
                            <Badge className={getStatusColor(emergencyCase.status)}>
                              {emergencyCase.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{emergencyCase.chiefComplaint}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Arrival: {formatTimeAgo(emergencyCase.arrivalTime)}</span>
                            <span className="text-sm text-gray-600">Doctor: {emergencyCase.assignedDoctor}</span>
                            <span className="text-sm text-gray-600">Location: {emergencyCase.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{emergencyCase.vitalSigns.heartRate} BPM</p>
                          <p className="text-sm text-gray-600">Heart Rate</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{emergencyCase.vitalSigns.bloodPressure}</p>
                          <p className="text-sm text-gray-600">Blood Pressure</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{emergencyCase.vitalSigns.temperature}°F</p>
                          <p className="text-sm text-gray-600">Temperature</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCase(emergencyCase);
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

          <TabsContent value="triage" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FirstAid className="w-5 h-5 text-red-600" />
                  <span>Triage Levels</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {triageData.map((triage, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">{triage.level}</h3>
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: triage.color }}></div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Count</span>
                              <span className="font-bold text-gray-900">{triage.count}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Wait Time</span>
                              <span className="font-bold text-blue-600">{triage.waitTime}m</span>
                            </div>
                            <Progress value={(triage.count / 28) * 100} className="w-full" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-red-600" />
                  <span>Resource Allocation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resourceData.map((resource, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <Building className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{resource.resource}</h3>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Total: {resource.total}</span>
                            <span className="text-sm text-gray-600">Available: {resource.available}</span>
                            <span className="text-sm text-gray-600">Occupied: {resource.occupied}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{resource.utilization}%</p>
                          <p className="text-sm text-gray-600">Utilization</p>
                        </div>
                        <Progress value={resource.utilization} className="w-20" />
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
                    <LineChart className="w-5 h-5 text-red-600" />
                    <span>Emergency Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={responseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="arrivals" stroke="#ef4444" strokeWidth={3} />
                      <Line type="monotone" dataKey="discharges" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Cases</span>
                      <span className="font-bold text-red-600">{emergencyMetrics.totalCases}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Patient Satisfaction</span>
                      <span className="font-bold text-green-600">{emergencyMetrics.patientSatisfaction}/5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Mortality Rate</span>
                      <span className="font-bold text-red-600">{emergencyMetrics.mortalityRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Readmission Rate</span>
                      <span className="font-bold text-orange-600">{emergencyMetrics.readmissionRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Ambulance Arrivals</span>
                      <span className="font-bold text-blue-600">{emergencyMetrics.ambulanceArrivals}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Emergency Case Detail Modal */}
        <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>Emergency Case Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedCase && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-10 h-10 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedCase.patientName}</h2>
                      <Badge className={getTriageColor(selectedCase.triageLevel)}>
                        {selectedCase.triageLevel}
                      </Badge>
                      <Badge className={getPriorityColor(selectedCase.priority)}>
                        {selectedCase.priority}
                      </Badge>
                      <Badge className={getStatusColor(selectedCase.status)}>
                        {selectedCase.status}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">Chief Complaint: {selectedCase.chiefComplaint}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Age</Label>
                        <p className="font-semibold">{selectedCase.age} years</p>
                      </div>
                      <div>
                        <Label>Gender</Label>
                        <p className="font-semibold">{selectedCase.gender}</p>
                      </div>
                      <div>
                        <Label>Arrival Time</Label>
                        <p className="font-semibold">{formatTimeAgo(selectedCase.arrivalTime)}</p>
                      </div>
                      <div>
                        <Label>Wait Time</Label>
                        <p className="font-semibold">{selectedCase.estimatedWaitTime} minutes</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Vital Signs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Heart Rate</span>
                          <span className="font-bold text-red-600">{selectedCase.vitalSigns.heartRate} BPM</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Blood Pressure</span>
                          <span className="font-bold text-blue-600">{selectedCase.vitalSigns.bloodPressure}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Temperature</span>
                          <span className="font-bold text-orange-600">{selectedCase.vitalSigns.temperature}°F</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Oxygen Saturation</span>
                          <span className="font-bold text-green-600">{selectedCase.vitalSigns.oxygenSaturation}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Interventions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedCase.interventions.map((intervention: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm">{intervention}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedCase(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Update Case
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Emergency Case Modal */}
        <Dialog open={showCaseForm} onOpenChange={setShowCaseForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-red-600" />
                <span>New Emergency Case</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input id="patientName" placeholder="Enter patient name" />
                </div>
                <div>
                  <Label htmlFor="patientAge">Age</Label>
                  <Input id="patientAge" type="number" placeholder="Enter age" />
                </div>
                <div>
                  <Label htmlFor="triageLevel">Triage Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select triage level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="chiefComplaint">Chief Complaint</Label>
                  <Input id="chiefComplaint" placeholder="Enter chief complaint" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCaseForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Case
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
