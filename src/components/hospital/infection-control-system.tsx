"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, AlertTriangle, Heart, Activity, Zap, Target, CheckCircle, XCircle,
  TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus, Percent, Tag,
  MapPin, ShoppingCart, Package, Globe, Wifi, Layers, Archive, Truck,
  Box, Megaphone, Building, Clipboard, BookOpen, Scale, Gavel, Lock,
  Key, CheckSquare, Square, Play, Pause, Send, Share2, Image, Video,
  FileText, Printer, BarChart3, PieChart, LineChart, Activity as ActivityIcon,
  Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings, Bell,
  RefreshCw, RotateCcw, QrCode, ScanLine, Barcode, Database,
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
  LineChart as LineChartIcon, Activity as ActivityIcon3, AlertTriangle as AlertTriangleIcon, Clock as ClockIcon, Calendar, User, Users as UsersIcon,
  DollarSign, Star, Award, Phone, Mail, MessageSquare, Camera, Mic, Headphones,
  Volume2, VolumeX, Wifi as WifiIcon2, Battery, Signal, Bluetooth, Hospital,
  UserCheck, UserPlus, UserMinus, UserX, UserEdit, UserSearch, UserSettings,
  Map, Navigation, Compass, Home, Building2, Building as BuildingIcon2,
  Ambulance, Siren, Zap as ZapIcon, Flame, Skull, Cross, FirstAid, Heart as HeartIcon,
  Shield as ShieldIcon, AlertTriangle as AlertTriangleIcon2, Activity as ActivityIcon4, Clock as ClockIcon2, Users as UsersIcon2, Target as TargetIcon, Pill, Syringe,
  Microscope, TestTube, Beaker, Flask, Droplet, Thermometer, Bandage, X, Plus as PlusIcon,
  Wrench, Tool, Cog, Settings as SettingsIcon, Power, PowerOff, AlertCircle,
  Stethoscope, Monitor, Cpu, HardDrive, Wifi as WifiIcon3, Battery as BatteryIcon, Signal as SignalIcon, Bluetooth as BluetoothIcon
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

// Infection control data simulation
const infectionData = [
  {
    id: 'INF001',
    patientName: 'Sarah Johnson',
    patientId: 'PAT001',
    infectionType: 'MRSA',
    severity: 'High',
    status: 'Active',
    isolationRequired: true,
    isolationType: 'Contact Precautions',
    diagnosisDate: '2024-01-15T08:30:00Z',
    expectedRecovery: '2024-01-25T00:00:00Z',
    location: 'ICU Ward 2',
    room: 'ICU-201',
    assignedStaff: ['Dr. Michael Chen', 'Nurse Jennifer Lee'],
    precautions: ['Hand Hygiene', 'PPE Required', 'Contact Isolation'],
    riskFactors: ['Immunocompromised', 'Recent Surgery', 'Antibiotic Use'],
    treatment: ['Vancomycin', 'Linezolid'],
    monitoring: {
      temperature: 38.5,
      whiteBloodCells: 12.5,
      cReactiveProtein: 45.2,
      lastCheck: '2024-01-15T14:00:00Z'
    }
  },
  {
    id: 'INF002',
    patientName: 'Robert Williams',
    patientId: 'PAT002',
    infectionType: 'C. difficile',
    severity: 'Medium',
    status: 'Active',
    isolationRequired: true,
    isolationType: 'Contact Precautions',
    diagnosisDate: '2024-01-14T16:45:00Z',
    expectedRecovery: '2024-01-22T00:00:00Z',
    location: 'General Ward',
    room: 'WARD-305',
    assignedStaff: ['Dr. Emily Rodriguez', 'Nurse David Kim'],
    precautions: ['Hand Hygiene', 'PPE Required', 'Contact Isolation', 'Dedicated Equipment'],
    riskFactors: ['Antibiotic Use', 'Advanced Age', 'Recent Hospitalization'],
    treatment: ['Metronidazole', 'Fidaxomicin'],
    monitoring: {
      temperature: 37.8,
      whiteBloodCells: 8.2,
      cReactiveProtein: 28.5,
      lastCheck: '2024-01-15T10:30:00Z'
    }
  },
  {
    id: 'INF003',
    patientName: 'Maria Garcia',
    patientId: 'PAT003',
    infectionType: 'VRE',
    severity: 'High',
    status: 'Resolved',
    isolationRequired: false,
    isolationType: 'None',
    diagnosisDate: '2024-01-10T12:15:00Z',
    expectedRecovery: '2024-01-15T00:00:00Z',
    location: 'Pediatrics',
    room: 'PED-102',
    assignedStaff: ['Dr. James Wilson', 'Nurse Lisa Brown'],
    precautions: ['Hand Hygiene', 'PPE Required'],
    riskFactors: ['Immunocompromised', 'Antibiotic Use'],
    treatment: ['Daptomycin', 'Linezolid'],
    monitoring: {
      temperature: 36.8,
      whiteBloodCells: 6.5,
      cReactiveProtein: 12.3,
      lastCheck: '2024-01-15T08:00:00Z'
    }
  }
];

const infectionMetrics = {
  totalInfections: 23,
  activeInfections: 18,
  resolvedInfections: 5,
  highRiskInfections: 8,
  isolationRooms: 12,
  complianceRate: 94.2,
  handHygieneRate: 96.8,
  ppeCompliance: 98.5
};

const complianceData = [
  { month: 'Jan', handHygiene: 94.5, ppeCompliance: 96.2, isolation: 92.8 },
  { month: 'Feb', handHygiene: 95.2, ppeCompliance: 97.1, isolation: 94.2 },
  { month: 'Mar', handHygiene: 96.8, ppeCompliance: 98.5, isolation: 95.8 },
  { month: 'Apr', handHygiene: 95.1, ppeCompliance: 97.8, isolation: 93.5 },
  { month: 'May', handHygiene: 97.2, ppeCompliance: 98.9, isolation: 96.2 },
  { month: 'Jun', handHygiene: 96.8, ppeCompliance: 98.5, isolation: 95.1 }
];

const infectionTypes = [
  { type: 'MRSA', count: 8, percentage: 34.8, color: '#ef4444' },
  { type: 'C. difficile', count: 6, percentage: 26.1, color: '#f59e0b' },
  { type: 'VRE', count: 4, percentage: 17.4, color: '#3b82f6' },
  { type: 'Other', count: 5, percentage: 21.7, color: '#10b981' }
];

const preventionProtocols = [
  {
    id: 'PROT001',
    name: 'Hand Hygiene Protocol',
    category: 'Standard Precautions',
    compliance: 96.8,
    lastAudit: '2024-01-10T00:00:00Z',
    nextAudit: '2024-02-10T00:00:00Z',
    staffTrained: 156,
    totalStaff: 160,
    status: 'Active'
  },
  {
    id: 'PROT002',
    name: 'PPE Usage Protocol',
    category: 'Personal Protective Equipment',
    compliance: 98.5,
    lastAudit: '2024-01-12T00:00:00Z',
    nextAudit: '2024-02-12T00:00:00Z',
    staffTrained: 152,
    totalStaff: 160,
    status: 'Active'
  },
  {
    id: 'PROT003',
    name: 'Isolation Precautions',
    category: 'Transmission-Based Precautions',
    compliance: 94.2,
    lastAudit: '2024-01-08T00:00:00Z',
    nextAudit: '2024-02-08T00:00:00Z',
    staffTrained: 148,
    totalStaff: 160,
    status: 'Active'
  }
];

export default function InfectionControlSystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInfectionType, setSelectedInfectionType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('infections');
  const [selectedInfection, setSelectedInfection] = useState<any>(null);
  const [showInfectionForm, setShowInfectionForm] = useState(false);

  // Filter infections
  const filteredInfections = infectionData.filter(infection => {
    const matchesSearch = infection.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         infection.infectionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         infection.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedInfectionType === 'All' || infection.infectionType === selectedInfectionType;
    const matchesStatus = selectedStatus === 'All' || infection.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Monitoring': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIsolationColor = (isolation: boolean) => {
    return isolation ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Infection Control & Prevention
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive infection monitoring and prevention protocols</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowInfectionForm(true)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Infection
            </Button>
            <Button
              variant="outline"
              className="border-yellow-200 text-yellow-600 hover:bg-yellow-50"
            >
              <Shield className="w-4 h-4 mr-2" />
              Protocols
            </Button>
            <Button
              variant="outline"
              className="border-yellow-200 text-yellow-600 hover:bg-yellow-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Infection Control Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Infections',
              value: infectionMetrics.totalInfections.toString(),
              change: '+8.3%',
              trend: 'up',
              icon: AlertTriangle,
              color: 'from-yellow-500 to-amber-500'
            },
            {
              title: 'Active Infections',
              value: infectionMetrics.activeInfections.toString(),
              change: '+12.5%',
              trend: 'up',
              icon: Heart,
              color: 'from-red-500 to-pink-500'
            },
            {
              title: 'Compliance Rate',
              value: `${infectionMetrics.complianceRate}%`,
              change: '+2.1%',
              trend: 'up',
              icon: Shield,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Hand Hygiene',
              value: `${infectionMetrics.handHygieneRate}%`,
              change: '+1.5%',
              trend: 'up',
              icon: CheckCircle,
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
            <TabsTrigger value="infections">Infections</TabsTrigger>
            <TabsTrigger value="protocols">Protocols</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="infections" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <span>Infection Cases</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search infections..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedInfectionType} onValueChange={setSelectedInfectionType}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Types</SelectItem>
                        <SelectItem value="MRSA">MRSA</SelectItem>
                        <SelectItem value="C. difficile">C. difficile</SelectItem>
                        <SelectItem value="VRE">VRE</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                        <SelectItem value="Monitoring">Monitoring</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredInfections.map((infection, index) => (
                    <motion.div
                      key={infection.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedInfection(infection)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Shield className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{infection.patientName}</h3>
                            <Badge className={getStatusColor(infection.status)}>
                              {infection.status}
                            </Badge>
                            <Badge className={getSeverityColor(infection.severity)}>
                              {infection.severity}
                            </Badge>
                            <Badge className={getIsolationColor(infection.isolationRequired)}>
                              {infection.isolationRequired ? 'Isolation' : 'No Isolation'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{infection.infectionType} | {infection.location}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Diagnosed: {formatTimeAgo(infection.diagnosisDate)}</span>
                            <span className="text-sm text-gray-600">Room: {infection.room}</span>
                            <span className="text-sm text-gray-600">Isolation: {infection.isolationType}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{infection.monitoring.temperature}°C</p>
                          <p className="text-sm text-gray-600">Temperature</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{infection.monitoring.whiteBloodCells}</p>
                          <p className="text-sm text-gray-600">WBC Count</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{infection.monitoring.cReactiveProtein}</p>
                          <p className="text-sm text-gray-600">CRP</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedInfection(infection);
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

          <TabsContent value="protocols" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-yellow-600" />
                  <span>Prevention Protocols</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {preventionProtocols.map((protocol, index) => (
                    <motion.div
                      key={protocol.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Shield className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{protocol.name}</h3>
                            <Badge className="bg-blue-100 text-blue-800">
                              {protocol.category}
                            </Badge>
                            <Badge className={protocol.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {protocol.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Compliance: {protocol.compliance}%</span>
                            <span className="text-sm text-gray-600">Staff Trained: {protocol.staffTrained}/{protocol.totalStaff}</span>
                            <span className="text-sm text-gray-600">Last Audit: {formatTimeAgo(protocol.lastAudit)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{protocol.compliance}%</p>
                          <p className="text-sm text-gray-600">Compliance</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{protocol.staffTrained}</p>
                          <p className="text-sm text-gray-600">Trained</p>
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

          <TabsContent value="compliance" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-yellow-600" />
                  <span>Compliance Monitoring</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={complianceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="handHygiene" stroke="#f59e0b" strokeWidth={3} />
                    <Line type="monotone" dataKey="ppeCompliance" stroke="#3b82f6" strokeWidth={3} />
                    <Line type="monotone" dataKey="isolation" stroke="#ef4444" strokeWidth={3} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-yellow-600" />
                    <span>Infection Types</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={infectionTypes}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                      >
                        {infectionTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Infection Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Infections</span>
                      <span className="font-bold text-yellow-600">{infectionMetrics.totalInfections}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active Infections</span>
                      <span className="font-bold text-red-600">{infectionMetrics.activeInfections}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Isolation Rooms</span>
                      <span className="font-bold text-blue-600">{infectionMetrics.isolationRooms}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">PPE Compliance</span>
                      <span className="font-bold text-green-600">{infectionMetrics.ppeCompliance}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Infection Detail Modal */}
        <Dialog open={!!selectedInfection} onOpenChange={() => setSelectedInfection(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-yellow-600" />
                <span>Infection Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedInfection && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Shield className="w-10 h-10 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedInfection.patientName}</h2>
                      <Badge className={getStatusColor(selectedInfection.status)}>
                        {selectedInfection.status}
                      </Badge>
                      <Badge className={getSeverityColor(selectedInfection.severity)}>
                        {selectedInfection.severity}
                      </Badge>
                      <Badge className={getIsolationColor(selectedInfection.isolationRequired)}>
                        {selectedInfection.isolationRequired ? 'Isolation Required' : 'No Isolation'}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">{selectedInfection.infectionType} | {selectedInfection.location}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Diagnosis Date</Label>
                        <p className="font-semibold">{new Date(selectedInfection.diagnosisDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <Label>Expected Recovery</Label>
                        <p className="font-semibold">{new Date(selectedInfection.expectedRecovery).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <Label>Location</Label>
                        <p className="font-semibold">{selectedInfection.location}</p>
                      </div>
                      <div>
                        <Label>Room</Label>
                        <p className="font-semibold">{selectedInfection.room}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Precautions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedInfection.precautions.map((precaution: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm">{precaution}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Treatment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedInfection.treatment.map((medication: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Pill className="w-4 h-4 text-blue-600" />
                            <span className="text-sm">{medication}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedInfection(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Update Infection
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Infection Modal */}
        <Dialog open={showInfectionForm} onOpenChange={setShowInfectionForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-yellow-600" />
                <span>New Infection Case</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input id="patientName" placeholder="Enter patient name" />
                </div>
                <div>
                  <Label htmlFor="infectionType">Infection Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MRSA">MRSA</SelectItem>
                      <SelectItem value="C. difficile">C. difficile</SelectItem>
                      <SelectItem value="VRE">VRE</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="severity">Severity</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter location" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowInfectionForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Infection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
