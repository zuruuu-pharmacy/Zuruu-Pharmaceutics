"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Activity, Users, Clock, AlertTriangle, Shield, Stethoscope, 
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
  Bed, Pill, Syringe, Microscope, Thermometer, Bandage, X, Plus as PlusIcon
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

// Hospital overview data simulation
const hospitalMetrics = {
  totalPatients: 1247,
  bedOccupancy: 87.5,
  averageWaitTime: 23,
  emergencyCases: 12,
  staffOnDuty: 156,
  equipmentUptime: 94.2,
  patientSatisfaction: 4.6,
  readmissionRate: 8.3,
  mortalityRate: 2.1,
  infectionRate: 1.8
};

const patientData = [
  {
    id: 'PAT001',
    name: 'Sarah Johnson',
    age: 45,
    gender: 'Female',
    admissionDate: '2024-01-15T08:30:00Z',
    department: 'Cardiology',
    room: 'ICU-201',
    status: 'Critical',
    priority: 'High',
    diagnosis: 'Acute Myocardial Infarction',
    vitalSigns: {
      heartRate: 95,
      bloodPressure: '140/90',
      temperature: 98.6,
      oxygenSaturation: 96
    },
    assignedDoctor: 'Dr. Michael Chen',
    nextCheckup: '2024-01-15T14:00:00Z'
  },
  {
    id: 'PAT002',
    name: 'Robert Williams',
    age: 62,
    gender: 'Male',
    admissionDate: '2024-01-15T10:15:00Z',
    department: 'Orthopedics',
    room: 'WARD-305',
    status: 'Stable',
    priority: 'Medium',
    diagnosis: 'Hip Fracture',
    vitalSigns: {
      heartRate: 78,
      bloodPressure: '120/80',
      temperature: 98.2,
      oxygenSaturation: 98
    },
    assignedDoctor: 'Dr. Emily Rodriguez',
    nextCheckup: '2024-01-15T16:00:00Z'
  },
  {
    id: 'PAT003',
    name: 'Maria Garcia',
    age: 34,
    gender: 'Female',
    admissionDate: '2024-01-15T11:45:00Z',
    department: 'Pediatrics',
    room: 'PED-102',
    status: 'Good',
    priority: 'Low',
    diagnosis: 'Pneumonia',
    vitalSigns: {
      heartRate: 88,
      bloodPressure: '110/70',
      temperature: 99.1,
      oxygenSaturation: 94
    },
    assignedDoctor: 'Dr. James Wilson',
    nextCheckup: '2024-01-15T18:00:00Z'
  }
];

const departmentData = [
  { name: 'Emergency', patients: 45, capacity: 50, utilization: 90 },
  { name: 'ICU', patients: 28, capacity: 30, utilization: 93 },
  { name: 'Cardiology', patients: 32, capacity: 40, utilization: 80 },
  { name: 'Orthopedics', patients: 24, capacity: 30, utilization: 80 },
  { name: 'Pediatrics', patients: 18, capacity: 25, utilization: 72 },
  { name: 'Neurology', patients: 15, capacity: 20, utilization: 75 }
];

const performanceData = [
  { month: 'Jan', patients: 1200, satisfaction: 4.5, waitTime: 25 },
  { month: 'Feb', patients: 1350, satisfaction: 4.6, waitTime: 23 },
  { month: 'Mar', patients: 1420, satisfaction: 4.7, waitTime: 22 },
  { month: 'Apr', patients: 1380, satisfaction: 4.6, waitTime: 24 },
  { month: 'May', patients: 1560, satisfaction: 4.8, waitTime: 20 },
  { month: 'Jun', patients: 1680, satisfaction: 4.7, waitTime: 21 }
];

const emergencyAlerts = [
  {
    id: 'ALERT001',
    type: 'Critical',
    message: 'Patient in Room ICU-201 requires immediate attention',
    timestamp: '2024-01-15T14:30:00Z',
    priority: 'High',
    department: 'ICU',
    assignedTo: 'Dr. Michael Chen'
  },
  {
    id: 'ALERT002',
    type: 'Warning',
    message: 'Equipment maintenance due for MRI Scanner #2',
    timestamp: '2024-01-15T13:45:00Z',
    priority: 'Medium',
    department: 'Radiology',
    assignedTo: 'Maintenance Team'
  },
  {
    id: 'ALERT003',
    type: 'Info',
    message: 'New patient admission in Emergency Department',
    timestamp: '2024-01-15T14:15:00Z',
    priority: 'Low',
    department: 'Emergency',
    assignedTo: 'Dr. Sarah Thompson'
  }
];

export default function HospitalOverviewDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showPatientForm, setShowPatientForm] = useState(false);

  // Filter patients
  const filteredPatients = patientData.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.assignedDoctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || patient.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'All' || patient.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Stable': return 'bg-yellow-100 text-yellow-800';
      case 'Good': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'Warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Hospital Overview Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Real-time hospital operations and patient care monitoring</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowPatientForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Patient
            </Button>
            <Button
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Hospital Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              title: 'Total Patients',
              value: hospitalMetrics.totalPatients.toString(),
              change: '+12.5%',
              trend: 'up',
              icon: Users,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Bed Occupancy',
              value: `${hospitalMetrics.bedOccupancy}%`,
              change: '+5.2%',
              trend: 'up',
              icon: Bed,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Avg Wait Time',
              value: `${hospitalMetrics.averageWaitTime}m`,
              change: '-8.3%',
              trend: 'down',
              icon: Clock,
              color: 'from-orange-500 to-red-500'
            },
            {
              title: 'Emergency Cases',
              value: hospitalMetrics.emergencyCases.toString(),
              change: '+15.7%',
              trend: 'up',
              icon: AlertTriangle,
              color: 'from-red-500 to-pink-500'
            },
            {
              title: 'Staff On Duty',
              value: hospitalMetrics.staffOnDuty.toString(),
              change: '+2.1%',
              trend: 'up',
              icon: Heart,
              color: 'from-purple-500 to-violet-500'
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
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-blue-600" />
                    <span>Hospital Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="patients" stroke="#3b82f6" strokeWidth={3} />
                      <Line type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="waitTime" stroke="#f59e0b" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <span>Department Utilization</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={departmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="utilization" fill="#3b82f6" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span>Quality Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Patient Satisfaction</span>
                      <span className="font-bold text-green-600">{hospitalMetrics.patientSatisfaction}/5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Readmission Rate</span>
                      <span className="font-bold text-blue-600">{hospitalMetrics.readmissionRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Mortality Rate</span>
                      <span className="font-bold text-red-600">{hospitalMetrics.mortalityRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Infection Rate</span>
                      <span className="font-bold text-orange-600">{hospitalMetrics.infectionRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                    <span>Equipment Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Equipment Uptime</span>
                      <span className="font-bold text-green-600">{hospitalMetrics.equipmentUptime}%</span>
                    </div>
                    <Progress value={hospitalMetrics.equipmentUptime} className="w-full" />
                    <div className="text-sm text-gray-500">
                      {hospitalMetrics.equipmentUptime >= 95 ? 'Excellent' : 
                       hospitalMetrics.equipmentUptime >= 90 ? 'Good' : 'Needs Attention'}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-purple-600" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Patient discharged from ICU-201</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">New admission in Emergency</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Equipment maintenance completed</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Staff shift change completed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span>Patient Management</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search patients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Departments</SelectItem>
                        <SelectItem value="Cardiology">Cardiology</SelectItem>
                        <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                        <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="ICU">ICU</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="Stable">Stable</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredPatients.map((patient, index) => (
                    <motion.div
                      key={patient.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Heart className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                            <Badge className={getStatusColor(patient.status)}>
                              {patient.status}
                            </Badge>
                            <Badge className={getPriorityColor(patient.priority)}>
                              {patient.priority}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {patient.department}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{patient.diagnosis}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Room: {patient.room}</span>
                            <span className="text-sm text-gray-600">Doctor: {patient.assignedDoctor}</span>
                            <span className="text-sm text-gray-600">Admitted: {formatTimeAgo(patient.admissionDate)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{patient.vitalSigns.heartRate} BPM</p>
                          <p className="text-sm text-gray-600">Heart Rate</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{patient.vitalSigns.bloodPressure}</p>
                          <p className="text-sm text-gray-600">Blood Pressure</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{patient.vitalSigns.temperature}°F</p>
                          <p className="text-sm text-gray-600">Temperature</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPatient(patient);
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

          <TabsContent value="departments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departmentData.map((dept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Hospital className="w-5 h-5 text-blue-600" />
                        <span>{dept.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Patients</span>
                          <span className="font-bold text-blue-600">{dept.patients}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Capacity</span>
                          <span className="font-bold text-gray-600">{dept.capacity}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Utilization</span>
                          <span className="font-bold text-green-600">{dept.utilization}%</span>
                        </div>
                        <Progress value={dept.utilization} className="w-full" />
                        <div className="text-sm text-gray-500">
                          {dept.utilization >= 90 ? 'High Utilization' : 
                           dept.utilization >= 70 ? 'Moderate Utilization' : 'Low Utilization'}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span>Emergency Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyAlerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`p-4 rounded-lg border-2 ${getAlertTypeColor(alert.type)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{alert.message}</h4>
                            <Badge className={getAlertTypeColor(alert.type)}>
                              {alert.type}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Department: {alert.department}</span>
                            <span>Assigned: {alert.assignedTo}</span>
                            <span>Time: {formatTimeAgo(alert.timestamp)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="w-4 h-4" />
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
        </Tabs>

        {/* Patient Detail Modal */}
        <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-blue-600" />
                <span>Patient Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedPatient && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <Heart className="w-10 h-10 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                      <Badge className={getStatusColor(selectedPatient.status)}>
                        {selectedPatient.status}
                      </Badge>
                      <Badge className={getPriorityColor(selectedPatient.priority)}>
                        {selectedPatient.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">Diagnosis: {selectedPatient.diagnosis}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Age</Label>
                        <p className="font-semibold">{selectedPatient.age} years</p>
                      </div>
                      <div>
                        <Label>Gender</Label>
                        <p className="font-semibold">{selectedPatient.gender}</p>
                      </div>
                      <div>
                        <Label>Room</Label>
                        <p className="font-semibold">{selectedPatient.room}</p>
                      </div>
                      <div>
                        <Label>Doctor</Label>
                        <p className="font-semibold">{selectedPatient.assignedDoctor}</p>
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
                          <span className="font-bold text-red-600">{selectedPatient.vitalSigns.heartRate} BPM</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Blood Pressure</span>
                          <span className="font-bold text-blue-600">{selectedPatient.vitalSigns.bloodPressure}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Temperature</span>
                          <span className="font-bold text-orange-600">{selectedPatient.vitalSigns.temperature}°F</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Oxygen Saturation</span>
                          <span className="font-bold text-green-600">{selectedPatient.vitalSigns.oxygenSaturation}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Care Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Admission Date</span>
                          <span className="font-semibold">{new Date(selectedPatient.admissionDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Next Checkup</span>
                          <span className="font-semibold">{new Date(selectedPatient.nextCheckup).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Department</span>
                          <span className="font-semibold">{selectedPatient.department}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Priority</span>
                          <span className="font-semibold">{selectedPatient.priority}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedPatient(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Patient
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Patient Modal */}
        <Dialog open={showPatientForm} onOpenChange={setShowPatientForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-blue-600" />
                <span>Add New Patient</span>
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
                  <Label htmlFor="patientGender">Gender</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="patientDepartment">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="ICU">ICU</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="patientDiagnosis">Diagnosis</Label>
                <Textarea id="patientDiagnosis" placeholder="Enter diagnosis" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPatientForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
