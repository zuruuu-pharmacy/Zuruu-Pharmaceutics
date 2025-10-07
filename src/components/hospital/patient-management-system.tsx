"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Heart, Activity, Clock, AlertTriangle, Shield, Stethoscope, 
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
  Bed, Pill, Syringe, Microscope, Thermometer, Bandage, X, Plus as PlusIcon,
  UserCheck, UserPlus, UserMinus, UserX, UserSearch
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

// Patient management data simulation
const patients = [
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
    nextCheckup: '2024-01-15T14:00:00Z',
    insurance: 'Blue Cross Blue Shield',
    emergencyContact: 'John Johnson (555) 123-4567',
    allergies: ['Penicillin', 'Latex'],
    medications: ['Aspirin', 'Metoprolol', 'Atorvastatin'],
    medicalHistory: ['Hypertension', 'Diabetes Type 2'],
    labResults: [
      { test: 'Troponin I', value: '2.5 ng/mL', normal: '0.0-0.04', status: 'High' },
      { test: 'CK-MB', value: '45 U/L', normal: '0-25', status: 'High' },
      { test: 'BNP', value: '850 pg/mL', normal: '0-100', status: 'High' }
    ]
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
    nextCheckup: '2024-01-15T16:00:00Z',
    insurance: 'Medicare',
    emergencyContact: 'Mary Williams (555) 234-5678',
    allergies: ['None'],
    medications: ['Morphine', 'Acetaminophen'],
    medicalHistory: ['Osteoporosis', 'Hypertension'],
    labResults: [
      { test: 'Hemoglobin', value: '12.5 g/dL', normal: '12-16', status: 'Normal' },
      { test: 'WBC Count', value: '8.2 K/μL', normal: '4.5-11', status: 'Normal' },
      { test: 'Platelets', value: '285 K/μL', normal: '150-450', status: 'Normal' }
    ]
  }
];

const patientMetrics = {
  totalPatients: 1247,
  newAdmissions: 23,
  discharges: 18,
  averageStay: 4.2,
  readmissionRate: 8.3,
  patientSatisfaction: 4.6,
  bedOccupancy: 87.5,
  emergencyAdmissions: 12
};

const admissionData = [
  { month: 'Jan', admissions: 120, discharges: 115, readmissions: 8 },
  { month: 'Feb', admissions: 135, discharges: 130, readmissions: 9 },
  { month: 'Mar', admissions: 142, discharges: 138, readmissions: 7 },
  { month: 'Apr', admissions: 138, discharges: 135, readmissions: 8 },
  { month: 'May', admissions: 156, discharges: 152, readmissions: 6 },
  { month: 'Jun', admissions: 168, discharges: 165, readmissions: 5 }
];

export default function PatientManagementSystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('patients');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showPatientForm, setShowPatientForm] = useState(false);

  // Filter patients
  const filteredPatients = patients.filter(patient => {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Patient Management System
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive patient records and medical workflow management</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowPatientForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              New Patient
            </Button>
            <Button
              variant="outline"
              className="border-green-200 text-green-600 hover:bg-green-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Records
            </Button>
            <Button
              variant="outline"
              className="border-green-200 text-green-600 hover:bg-green-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Patient Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Patients',
              value: patientMetrics.totalPatients.toString(),
              change: '+12.5%',
              trend: 'up',
              icon: Users,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'New Admissions',
              value: patientMetrics.newAdmissions.toString(),
              change: '+8.3%',
              trend: 'up',
              icon: UserPlus,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Discharges',
              value: patientMetrics.discharges.toString(),
              change: '+15.2%',
              trend: 'up',
              icon: UserMinus,
              color: 'from-purple-500 to-violet-500'
            },
            {
              title: 'Patient Satisfaction',
              value: patientMetrics.patientSatisfaction.toString(),
              change: '+0.3',
              trend: 'up',
              icon: Star,
              color: 'from-yellow-500 to-orange-500'
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
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="admissions">Admissions</TabsTrigger>
            <TabsTrigger value="medical">Medical Records</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <span>Patient Directory</span>
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
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Heart className="w-6 h-6 text-green-600" />
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

          <TabsContent value="admissions" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserPlus className="w-5 h-5 text-green-600" />
                  <span>Admission Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={admissionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="admissions" stroke="#10b981" strokeWidth={3} />
                    <Line type="monotone" dataKey="discharges" stroke="#3b82f6" strokeWidth={3} />
                    <Line type="monotone" dataKey="readmissions" stroke="#f59e0b" strokeWidth={3} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medical" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clipboard className="w-5 h-5 text-green-600" />
                  <span>Medical Records</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patients.map((patient, index) => (
                    <motion.div
                      key={patient.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                          <p className="text-sm text-gray-600">{patient.diagnosis}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Age: {patient.age}</span>
                            <span className="text-sm text-gray-600">Gender: {patient.gender}</span>
                            <span className="text-sm text-gray-600">Insurance: {patient.insurance}</span>
                          </div>
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
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <span>Patient Demographics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Age</span>
                      <span className="font-bold text-green-600">52.3 years</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Gender Distribution</span>
                      <span className="font-bold text-blue-600">52% Female, 48% Male</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Stay</span>
                      <span className="font-bold text-purple-600">{patientMetrics.averageStay} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Readmission Rate</span>
                      <span className="font-bold text-red-600">{patientMetrics.readmissionRate}%</span>
                    </div>
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
                      <span className="text-gray-600">Patient Satisfaction</span>
                      <span className="font-bold text-green-600">{patientMetrics.patientSatisfaction}/5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Bed Occupancy</span>
                      <span className="font-bold text-blue-600">{patientMetrics.bedOccupancy}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Emergency Admissions</span>
                      <span className="font-bold text-red-600">{patientMetrics.emergencyAdmissions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">New Admissions Today</span>
                      <span className="font-bold text-purple-600">{patientMetrics.newAdmissions}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Patient Detail Modal */}
        <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-green-600" />
                <span>Patient Medical Record</span>
              </DialogTitle>
            </DialogHeader>
            {selectedPatient && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="w-10 h-10 text-green-600" />
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
                      <CardTitle className="text-lg">Lab Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedPatient.labResults.map((result: any, index: number) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-600">{result.test}</span>
                            <div className="text-right">
                              <span className={`font-bold ${
                                result.status === 'High' ? 'text-red-600' : 
                                result.status === 'Low' ? 'text-blue-600' : 'text-green-600'
                              }`}>
                                {result.value}
                              </span>
                              <p className="text-sm text-gray-500">Normal: {result.normal}</p>
                            </div>
                          </div>
                        ))}
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
                    Edit Record
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
                <UserPlus className="w-5 h-5 text-green-600" />
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
                <UserPlus className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
