"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Microscope, FlaskConical, TestTube, Beaker, FileText, BookOpen, Target, TrendingUp,
  TrendingDown, ArrowUp, ArrowDown, Minus, Percent, Tag, MapPin, ShoppingCart,
  Package, Globe, Wifi, Layers, Archive, Box, Megaphone, Building, Clipboard,
  Scale, Gavel, Lock, Key, CheckSquare, Square, Play, Pause, Send, Share2, Image,
  Video, Printer, BarChart3, PieChart, LineChart, Activity, Search, Filter, Plus,
  Edit, Trash2, Eye, Download, Upload, Settings, Bell, RefreshCw, RotateCcw, QrCode,
  ScanLine, Barcode, Database, Network, Cpu, Brain, CheckCircle, XCircle, AlertTriangle,
  Clock, Calendar, User, Users, Star, Award, Phone, Mail, MessageSquare, Camera, Mic,
  Headphones, Volume2, VolumeX, Wifi as WifiIcon, Battery, Signal, Bluetooth, Hospital,
  UserCheck, UserPlus, UserMinus, UserX, UserSearch, Map,
  Navigation, Compass, Home, Building2, Ambulance, Siren, Zap, Flame, Skull, Cross,
  Heart, Shield, Stethoscope, Monitor, HardDrive, Wrench, Cog, Power,
  PowerOff, AlertCircle, DollarSign, Target as TargetIcon, Pill, Syringe, Microscope as MicroscopeIcon,
  TestTube as TestTubeIcon, Beaker as BeakerIcon, FlaskConical as FlaskIcon, Droplet, Thermometer,
  Bandage, X, Plus as PlusIcon, Truck, Warehouse, ShoppingCart as ShoppingCartIcon
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

// Clinical research data simulation
const researchMetrics = {
  activeStudies: 28,
  completedStudies: 156,
  enrolledPatients: 1247,
  dataPoints: 45678,
  publicationRate: 89.2,
  grantFunding: 2450000,
  researchStaff: 45,
  collaborationRate: 94.5
};

const researchStudies = [
  {
    id: 'STUDY001',
    title: 'Cardiovascular Disease Prevention',
    phase: 'Phase III',
    status: 'Active',
    enrollment: 245,
    targetEnrollment: 300,
    startDate: '2023-06-15T00:00:00Z',
    endDate: '2024-12-15T00:00:00Z',
    principalInvestigator: 'Dr. Sarah Johnson',
    department: 'Cardiology',
    funding: 450000,
    protocol: 'Randomized Controlled Trial',
    primaryEndpoint: 'Cardiovascular Events',
    secondaryEndpoints: ['Quality of Life', 'Biomarkers'],
    dataCollection: 78.5,
    compliance: 94.2,
    adverseEvents: 12,
    seriousAdverseEvents: 2
  },
  {
    id: 'STUDY002',
    title: 'Oncology Treatment Optimization',
    phase: 'Phase II',
    status: 'Recruiting',
    enrollment: 89,
    targetEnrollment: 150,
    startDate: '2024-01-10T00:00:00Z',
    endDate: '2025-06-10T00:00:00Z',
    principalInvestigator: 'Dr. Michael Chen',
    department: 'Oncology',
    funding: 320000,
    protocol: 'Single Arm Study',
    primaryEndpoint: 'Response Rate',
    secondaryEndpoints: ['Progression Free Survival', 'Overall Survival'],
    dataCollection: 45.2,
    compliance: 91.8,
    adverseEvents: 8,
    seriousAdverseEvents: 1
  },
  {
    id: 'STUDY003',
    title: 'Neurological Biomarker Discovery',
    phase: 'Phase I',
    status: 'Planning',
    enrollment: 0,
    targetEnrollment: 50,
    startDate: '2024-03-01T00:00:00Z',
    endDate: '2024-12-01T00:00:00Z',
    principalInvestigator: 'Dr. Emily Rodriguez',
    department: 'Neurology',
    funding: 180000,
    protocol: 'Observational Study',
    primaryEndpoint: 'Biomarker Levels',
    secondaryEndpoints: ['Cognitive Function', 'Disease Progression'],
    dataCollection: 0,
    compliance: 0,
    adverseEvents: 0,
    seriousAdverseEvents: 0
  }
];

const researchData = [
  { month: 'Jan', studies: 8, enrollments: 45, publications: 3, funding: 180000 },
  { month: 'Feb', studies: 12, enrollments: 52, publications: 4, funding: 220000 },
  { month: 'Mar', studies: 15, enrollments: 48, publications: 5, funding: 195000 },
  { month: 'Apr', studies: 18, enrollments: 61, publications: 6, funding: 245000 },
  { month: 'May', studies: 22, enrollments: 55, publications: 7, funding: 210000 },
  { month: 'Jun', studies: 28, enrollments: 67, publications: 8, funding: 280000 }
];

const studyPhases = [
  { phase: 'Phase I', count: 8, percentage: 28.6, success: 75.0 },
  { phase: 'Phase II', count: 12, percentage: 42.9, success: 66.7 },
  { phase: 'Phase III', count: 6, percentage: 21.4, success: 83.3 },
  { phase: 'Phase IV', count: 2, percentage: 7.1, success: 100.0 }
];

const researchCollaborations = [
  {
    id: 'COLLAB001',
    institution: 'Harvard Medical School',
    study: 'Cardiovascular Disease Prevention',
    type: 'Data Sharing',
    status: 'Active',
    startDate: '2023-08-15T00:00:00Z',
    contact: 'Dr. John Smith',
    department: 'Cardiology',
    contribution: 'Patient Data',
    progress: 78.5
  },
  {
    id: 'COLLAB002',
    institution: 'Mayo Clinic',
    study: 'Oncology Treatment Optimization',
    type: 'Joint Research',
    status: 'Active',
    startDate: '2024-01-20T00:00:00Z',
    contact: 'Dr. Jane Wilson',
    department: 'Oncology',
    contribution: 'Clinical Expertise',
    progress: 45.2
  },
  {
    id: 'COLLAB003',
    institution: 'Johns Hopkins University',
    study: 'Neurological Biomarker Discovery',
    type: 'Technology Transfer',
    status: 'Planning',
    startDate: '2024-03-01T00:00:00Z',
    contact: 'Dr. Robert Davis',
    department: 'Neurology',
    contribution: 'Laboratory Equipment',
    progress: 0
  }
];

export default function ClinicalResearchIntegration() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('studies');
  const [selectedStudy, setSelectedStudy] = useState<any>(null);
  const [showStudyForm, setShowStudyForm] = useState(false);

  // Filter studies
  const filteredStudies = researchStudies.filter(study => {
    const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.principalInvestigator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPhase = selectedPhase === 'All' || study.phase === selectedPhase;
    const matchesStatus = selectedStatus === 'All' || study.status === selectedStatus;
    return matchesSearch && matchesPhase && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Recruiting': return 'bg-blue-100 text-blue-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Phase I': return 'bg-red-100 text-red-800';
      case 'Phase II': return 'bg-orange-100 text-orange-800';
      case 'Phase III': return 'bg-yellow-100 text-yellow-800';
      case 'Phase IV': return 'bg-green-100 text-green-800';
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Clinical Research Integration
            </h1>
            <p className="text-gray-600 mt-2">Research protocol management and data collection</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowStudyForm(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Study
            </Button>
            <Button
              variant="outline"
              className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button
              variant="outline"
              className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Research Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Active Studies',
              value: researchMetrics.activeStudies.toString(),
              change: '+12.5%',
              trend: 'up',
              icon: Microscope,
              color: 'from-emerald-500 to-teal-500'
            },
            {
              title: 'Enrolled Patients',
              value: researchMetrics.enrolledPatients.toString(),
              change: '+8.2%',
              trend: 'up',
              icon: Users,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Publication Rate',
              value: `${researchMetrics.publicationRate}%`,
              change: '+3.5%',
              trend: 'up',
              icon: FileText,
              color: 'from-purple-500 to-pink-500'
            },
            {
              title: 'Grant Funding',
              value: `$${(researchMetrics.grantFunding / 1000000).toFixed(1)}M`,
              change: '+15.8%',
              trend: 'up',
              icon: DollarSign,
              color: 'from-orange-500 to-amber-500'
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
            <TabsTrigger value="studies">Studies</TabsTrigger>
            <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
            <TabsTrigger value="data">Data Collection</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="studies" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Microscope className="w-5 h-5 text-emerald-600" />
                    <span>Research Studies</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search studies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedPhase} onValueChange={setSelectedPhase}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Phase" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Phases</SelectItem>
                        <SelectItem value="Phase I">Phase I</SelectItem>
                        <SelectItem value="Phase II">Phase II</SelectItem>
                        <SelectItem value="Phase III">Phase III</SelectItem>
                        <SelectItem value="Phase IV">Phase IV</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Recruiting">Recruiting</SelectItem>
                        <SelectItem value="Planning">Planning</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudies.map((study, index) => (
                    <motion.div
                      key={study.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedStudy(study)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Microscope className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{study.title}</h3>
                            <Badge className={getPhaseColor(study.phase)}>
                              {study.phase}
                            </Badge>
                            <Badge className={getStatusColor(study.status)}>
                              {study.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {study.department}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">PI: {study.principalInvestigator} | Protocol: {study.protocol}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Enrollment: {study.enrollment}/{study.targetEnrollment}</span>
                            <span className="text-sm text-gray-600">Data Collection: {study.dataCollection}%</span>
                            <span className="text-sm text-gray-600">Compliance: {study.compliance}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{study.enrollment}/{study.targetEnrollment}</p>
                          <p className="text-sm text-gray-600">Enrollment</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{study.dataCollection}%</p>
                          <p className="text-sm text-gray-600">Data Collection</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{study.compliance}%</p>
                          <p className="text-sm text-gray-600">Compliance</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStudy(study);
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

          <TabsContent value="collaborations" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span>Research Collaborations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {researchCollaborations.map((collab, index) => (
                    <motion.div
                      key={collab.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{collab.institution}</h3>
                            <Badge className={getStatusColor(collab.status)}>
                              {collab.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {collab.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Study: {collab.study} | Contact: {collab.contact}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Department: {collab.department}</span>
                            <span className="text-sm text-gray-600">Contribution: {collab.contribution}</span>
                            <span className="text-sm text-gray-600">Progress: {collab.progress}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{collab.progress}%</p>
                          <p className="text-sm text-gray-600">Progress</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{collab.type}</p>
                          <p className="text-sm text-gray-600">Type</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{collab.status}</p>
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

          <TabsContent value="data" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-emerald-600" />
                  <span>Data Collection</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Data Points</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-emerald-600">{researchMetrics.dataPoints.toLocaleString()}</p>
                        <p className="text-sm text-gray-600 mt-2">Total Data Points Collected</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Collection Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-blue-600">94.2%</p>
                        <p className="text-sm text-gray-600 mt-2">Average Collection Rate</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Data Quality</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-600">96.8%</p>
                        <p className="text-sm text-gray-600 mt-2">Data Quality Score</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-emerald-600" />
                    <span>Research Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={researchData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="studies" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="enrollments" stroke="#3b82f6" strokeWidth={3} />
                      <Line type="monotone" dataKey="publications" stroke="#8b5cf6" strokeWidth={3} />
                      <Line type="monotone" dataKey="funding" stroke="#f59e0b" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-emerald-600" />
                    <span>Study Phases</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={studyPhases}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                      >
                        {studyPhases.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : index === 1 ? '#f59e0b' : index === 2 ? '#3b82f6' : '#10b981'} />
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
                    <Microscope className="w-5 h-5 text-green-600" />
                    <span>Research Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active Studies</span>
                      <span className="font-bold text-emerald-600">{researchMetrics.activeStudies}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Completed Studies</span>
                      <span className="font-bold text-green-600">{researchMetrics.completedStudies}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Enrolled Patients</span>
                      <span className="font-bold text-blue-600">{researchMetrics.enrolledPatients}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Research Staff</span>
                      <span className="font-bold text-purple-600">{researchMetrics.researchStaff}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Publications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Publication Rate</span>
                      <span className="font-bold text-blue-600">{researchMetrics.publicationRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">This Year</span>
                      <span className="font-bold text-green-600">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Impact Factor</span>
                      <span className="font-bold text-purple-600">8.5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Citations</span>
                      <span className="font-bold text-orange-600">1,247</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span>Funding</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Funding</span>
                      <span className="font-bold text-green-600">${(researchMetrics.grantFunding / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">This Year</span>
                      <span className="font-bold text-blue-600">$1.2M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-bold text-purple-600">78.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Collaboration Rate</span>
                      <span className="font-bold text-orange-600">{researchMetrics.collaborationRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Study Detail Modal */}
        <Dialog open={!!selectedStudy} onOpenChange={() => setSelectedStudy(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Microscope className="w-5 h-5 text-emerald-600" />
                <span>Study Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedStudy && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Microscope className="w-10 h-10 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedStudy.title}</h2>
                      <Badge className={getPhaseColor(selectedStudy.phase)}>
                        {selectedStudy.phase}
                      </Badge>
                      <Badge className={getStatusColor(selectedStudy.status)}>
                        {selectedStudy.status}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">PI: {selectedStudy.principalInvestigator} | Department: {selectedStudy.department}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Enrollment</Label>
                        <p className="font-semibold">{selectedStudy.enrollment}/{selectedStudy.targetEnrollment}</p>
                      </div>
                      <div>
                        <Label>Funding</Label>
                        <p className="font-semibold">${selectedStudy.funding.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label>Data Collection</Label>
                        <p className="font-semibold">{selectedStudy.dataCollection}%</p>
                      </div>
                      <div>
                        <Label>Compliance</Label>
                        <p className="font-semibold">{selectedStudy.compliance}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Study Protocol</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Protocol Type</span>
                          <span className="font-semibold">{selectedStudy.protocol}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Primary Endpoint</span>
                          <span className="font-semibold">{selectedStudy.primaryEndpoint}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Start Date</span>
                          <span className="font-semibold">{new Date(selectedStudy.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">End Date</span>
                          <span className="font-semibold">{new Date(selectedStudy.endDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Safety Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Adverse Events</span>
                          <span className="font-semibold">{selectedStudy.adverseEvents}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Serious Adverse Events</span>
                          <span className="font-semibold">{selectedStudy.seriousAdverseEvents}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Data Collection</span>
                          <span className="font-semibold">{selectedStudy.dataCollection}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Compliance</span>
                          <span className="font-semibold">{selectedStudy.compliance}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedStudy(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Update Study
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Study Modal */}
        <Dialog open={showStudyForm} onOpenChange={setShowStudyForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                <span>New Study</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Study Title</Label>
                  <Input id="title" placeholder="Enter study title" />
                </div>
                <div>
                  <Label htmlFor="phase">Phase</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select phase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Phase I">Phase I</SelectItem>
                      <SelectItem value="Phase II">Phase II</SelectItem>
                      <SelectItem value="Phase III">Phase III</SelectItem>
                      <SelectItem value="Phase IV">Phase IV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="pi">Principal Investigator</Label>
                  <Input id="pi" placeholder="Enter PI name" />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Oncology">Oncology</SelectItem>
                      <SelectItem value="Neurology">Neurology</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Study Description</Label>
                <Textarea id="description" placeholder="Enter study description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowStudyForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Study
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
