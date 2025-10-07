"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Microscope, TestTube, Beaker, FlaskConical, Droplet, Thermometer, Bandage, X, Plus as PlusIcon,
  TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus, Percent, Tag,
  MapPin, ShoppingCart, Package, Globe, Wifi, Layers, Archive, Truck,
  Box, Megaphone, Building, Clipboard, BookOpen, Scale, Gavel, Lock,
  Key, CheckSquare, Square, Play, Pause, Send, Share2, Image, Video,
  FileText, Printer, BarChart3, PieChart, LineChart, Activity as ActivityIcon,
  Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings, Bell,
  Zap, RefreshCw, RotateCcw, QrCode, ScanLine, Barcode, Database,
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
  UserCheck, UserPlus, UserMinus, UserX, UserSearch,
  Map, Navigation, Compass, Home, Building2, Building as BuildingIcon2,
  Ambulance, Siren, Zap as ZapIcon, Flame, Skull, Cross, Heart,
  Shield, Stethoscope, AlertTriangle, Activity, Clock, Users, Target, Pill, Syringe
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

// Laboratory management data simulation
const labTests = [
  {
    id: 'TEST001',
    testName: 'Complete Blood Count (CBC)',
    patientName: 'Sarah Johnson',
    patientId: 'PAT001',
    testType: 'Hematology',
    status: 'Completed',
    priority: 'Routine',
    orderedBy: 'Dr. Michael Chen',
    orderedDate: '2024-01-15T08:30:00Z',
    completedDate: '2024-01-15T10:45:00Z',
    results: {
      hemoglobin: { value: '12.5 g/dL', normal: '12-16', status: 'Normal' },
      hematocrit: { value: '38%', normal: '36-46', status: 'Normal' },
      wbc: { value: '7.2 K/μL', normal: '4.5-11', status: 'Normal' },
      platelets: { value: '285 K/μL', normal: '150-450', status: 'Normal' }
    },
    technician: 'Lab Tech Jennifer Lee',
    equipment: 'Automated Hematology Analyzer',
    qualityControl: 'Passed',
    turnaroundTime: 135
  },
  {
    id: 'TEST002',
    testName: 'Basic Metabolic Panel (BMP)',
    patientName: 'Robert Williams',
    patientId: 'PAT002',
    testType: 'Chemistry',
    status: 'In Progress',
    priority: 'Urgent',
    orderedBy: 'Dr. Emily Rodriguez',
    orderedDate: '2024-01-15T14:15:00Z',
    completedDate: null,
    results: null,
    technician: 'Lab Tech David Kim',
    equipment: 'Chemistry Analyzer',
    qualityControl: 'In Progress',
    turnaroundTime: null
  },
  {
    id: 'TEST003',
    testName: 'Blood Culture',
    patientName: 'Maria Garcia',
    patientId: 'PAT003',
    testType: 'Microbiology',
    status: 'Pending',
    priority: 'High',
    orderedBy: 'Dr. James Wilson',
    orderedDate: '2024-01-15T16:00:00Z',
    completedDate: null,
    results: null,
    technician: 'Lab Tech Lisa Brown',
    equipment: 'Blood Culture System',
    qualityControl: 'Pending',
    turnaroundTime: null
  }
];

const labMetrics = {
  totalTests: 1247,
  completedTests: 1156,
  pendingTests: 67,
  criticalResults: 23,
  averageTurnaroundTime: 2.5,
  qualityControlPass: 99.2,
  equipmentUptime: 96.8,
  staffEfficiency: 94.5
};

const testData = [
  { month: 'Jan', tests: 1200, accuracy: 99.5, turnaround: 2.2 },
  { month: 'Feb', tests: 1350, accuracy: 99.8, turnaround: 2.1 },
  { month: 'Mar', tests: 1420, accuracy: 99.7, turnaround: 2.3 },
  { month: 'Apr', tests: 1380, accuracy: 99.9, turnaround: 2.0 },
  { month: 'May', tests: 1560, accuracy: 99.8, turnaround: 2.1 },
  { month: 'Jun', tests: 1680, accuracy: 99.9, turnaround: 1.9 }
];

const equipmentData = [
  {
    name: 'Automated Hematology Analyzer',
    status: 'Operational',
    uptime: 98.5,
    lastMaintenance: '2024-01-10T00:00:00Z',
    nextMaintenance: '2024-02-10T00:00:00Z',
    testsPerDay: 45,
    efficiency: 94.2
  },
  {
    name: 'Chemistry Analyzer',
    status: 'Operational',
    uptime: 96.8,
    lastMaintenance: '2024-01-05T00:00:00Z',
    nextMaintenance: '2024-02-05T00:00:00Z',
    testsPerDay: 38,
    efficiency: 91.5
  },
  {
    name: 'Microbiology Incubator',
    status: 'Maintenance',
    uptime: 89.2,
    lastMaintenance: '2024-01-15T00:00:00Z',
    nextMaintenance: '2024-01-20T00:00:00Z',
    testsPerDay: 12,
    efficiency: 87.3
  }
];

const qualityControlData = [
  { test: 'Hemoglobin', target: 12.0, actual: 12.1, deviation: 0.8, status: 'Pass' },
  { test: 'Glucose', target: 100, actual: 98, deviation: -2.0, status: 'Pass' },
  { test: 'Creatinine', target: 1.0, actual: 1.2, deviation: 20.0, status: 'Fail' },
  { test: 'Cholesterol', target: 200, actual: 195, deviation: -2.5, status: 'Pass' }
];

export default function LaboratoryManagementSystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTestType, setSelectedTestType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('tests');
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [showTestForm, setShowTestForm] = useState(false);

  // Filter tests
  const filteredTests = labTests.filter(test => {
    const matchesSearch = test.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.orderedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTestType = selectedTestType === 'All' || test.testType === selectedTestType;
    const matchesStatus = selectedStatus === 'All' || test.status === selectedStatus;
    return matchesSearch && matchesTestType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Urgent': return 'bg-orange-100 text-orange-800';
      case 'High': return 'bg-yellow-100 text-yellow-800';
      case 'Routine': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResultStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'text-green-600';
      case 'High': return 'text-red-600';
      case 'Low': return 'text-blue-600';
      default: return 'text-gray-600';
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
              Laboratory Management System
            </h1>
            <p className="text-gray-600 mt-2">Test ordering, results tracking, and quality control</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowTestForm(true)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Test
            </Button>
            <Button
              variant="outline"
              className="border-cyan-200 text-cyan-600 hover:bg-cyan-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </Button>
            <Button
              variant="outline"
              className="border-cyan-200 text-cyan-600 hover:bg-cyan-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Laboratory Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Tests',
              value: labMetrics.totalTests.toString(),
              change: '+12.5%',
              trend: 'up',
              icon: TestTube,
              color: 'from-cyan-500 to-teal-500'
            },
            {
              title: 'Completed Tests',
              value: labMetrics.completedTests.toString(),
              change: '+8.3%',
              trend: 'up',
              icon: CheckCircle,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Critical Results',
              value: labMetrics.criticalResults.toString(),
              change: '+15.2%',
              trend: 'up',
              icon: AlertTriangle,
              color: 'from-red-500 to-pink-500'
            },
            {
              title: 'Avg Turnaround',
              value: `${labMetrics.averageTurnaroundTime}h`,
              change: '-5.2%',
              trend: 'down',
              icon: Clock,
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
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="quality">Quality Control</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="tests" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Microscope className="w-5 h-5 text-cyan-600" />
                    <span>Laboratory Tests</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search tests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedTestType} onValueChange={setSelectedTestType}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Test Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Types</SelectItem>
                        <SelectItem value="Hematology">Hematology</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        <SelectItem value="Microbiology">Microbiology</SelectItem>
                        <SelectItem value="Immunology">Immunology</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTests.map((test, index) => (
                    <motion.div
                      key={test.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedTest(test)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                          <Microscope className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{test.testName}</h3>
                            <Badge className={getStatusColor(test.status)}>
                              {test.status}
                            </Badge>
                            <Badge className={getPriorityColor(test.priority)}>
                              {test.priority}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {test.testType}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Patient: {test.patientName} | Ordered by: {test.orderedBy}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Ordered: {formatTimeAgo(test.orderedDate)}</span>
                            <span className="text-sm text-gray-600">Technician: {test.technician}</span>
                            <span className="text-sm text-gray-600">Equipment: {test.equipment}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{test.turnaroundTime ? `${test.turnaroundTime}m` : 'N/A'}</p>
                          <p className="text-sm text-gray-600">Turnaround</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{test.qualityControl}</p>
                          <p className="text-sm text-gray-600">QC Status</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTest(test);
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

          <TabsContent value="equipment" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Beaker className="w-5 h-5 text-cyan-600" />
                  <span>Laboratory Equipment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {equipmentData.map((equipment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                          <Beaker className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{equipment.name}</h3>
                            <Badge className={equipment.status === 'Operational' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {equipment.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Uptime: {equipment.uptime}%</span>
                            <span className="text-sm text-gray-600">Tests/Day: {equipment.testsPerDay}</span>
                            <span className="text-sm text-gray-600">Efficiency: {equipment.efficiency}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{equipment.uptime}%</p>
                          <p className="text-sm text-gray-600">Uptime</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{equipment.testsPerDay}</p>
                          <p className="text-sm text-gray-600">Tests/Day</p>
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

          <TabsContent value="quality" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Scale className="w-5 h-5 text-cyan-600" />
                  <span>Quality Control</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qualityControlData.map((qc, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                          <Scale className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{qc.test}</h3>
                            <Badge className={qc.status === 'Pass' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {qc.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Target: {qc.target}</span>
                            <span className="text-sm text-gray-600">Actual: {qc.actual}</span>
                            <span className="text-sm text-gray-600">Deviation: {qc.deviation}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{qc.actual}</p>
                          <p className="text-sm text-gray-600">Actual Value</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{qc.deviation}%</p>
                          <p className="text-sm text-gray-600">Deviation</p>
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
                    <LineChart className="w-5 h-5 text-cyan-600" />
                    <span>Test Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={testData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="tests" stroke="#06b6d4" strokeWidth={3} />
                      <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="turnaround" stroke="#f59e0b" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Laboratory Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Quality Control Pass</span>
                      <span className="font-bold text-green-600">{labMetrics.qualityControlPass}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Equipment Uptime</span>
                      <span className="font-bold text-blue-600">{labMetrics.equipmentUptime}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Staff Efficiency</span>
                      <span className="font-bold text-purple-600">{labMetrics.staffEfficiency}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pending Tests</span>
                      <span className="font-bold text-orange-600">{labMetrics.pendingTests}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Test Detail Modal */}
        <Dialog open={!!selectedTest} onOpenChange={() => setSelectedTest(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Microscope className="w-5 h-5 text-cyan-600" />
                <span>Test Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedTest && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Microscope className="w-10 h-10 text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedTest.testName}</h2>
                      <Badge className={getStatusColor(selectedTest.status)}>
                        {selectedTest.status}
                      </Badge>
                      <Badge className={getPriorityColor(selectedTest.priority)}>
                        {selectedTest.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">Patient: {selectedTest.patientName} | Ordered by: {selectedTest.orderedBy}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Test Type</Label>
                        <p className="font-semibold">{selectedTest.testType}</p>
                      </div>
                      <div>
                        <Label>Technician</Label>
                        <p className="font-semibold">{selectedTest.technician}</p>
                      </div>
                      <div>
                        <Label>Equipment</Label>
                        <p className="font-semibold">{selectedTest.equipment}</p>
                      </div>
                      <div>
                        <Label>Quality Control</Label>
                        <p className="font-semibold">{selectedTest.qualityControl}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedTest.results && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Test Results</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {Object.entries(selectedTest.results).map(([key, result]: [string, any]) => (
                            <div key={key} className="flex justify-between items-center">
                              <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                              <div className="text-right">
                                <span className={`font-bold ${getResultStatusColor(result.status)}`}>
                                  {result.value}
                                </span>
                                <p className="text-sm text-gray-500">Normal: {result.normal}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Test Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Ordered Date</span>
                            <span className="font-semibold">{new Date(selectedTest.orderedDate).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Completed Date</span>
                            <span className="font-semibold">{selectedTest.completedDate ? new Date(selectedTest.completedDate).toLocaleString() : 'N/A'}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Turnaround Time</span>
                            <span className="font-semibold">{selectedTest.turnaroundTime ? `${selectedTest.turnaroundTime} minutes` : 'N/A'}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Priority</span>
                            <span className="font-semibold">{selectedTest.priority}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedTest(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Update Test
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Test Modal */}
        <Dialog open={showTestForm} onOpenChange={setShowTestForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-cyan-600" />
                <span>New Laboratory Test</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="testName">Test Name</Label>
                  <Input id="testName" placeholder="Enter test name" />
                </div>
                <div>
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input id="patientName" placeholder="Enter patient name" />
                </div>
                <div>
                  <Label htmlFor="testType">Test Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select test type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hematology">Hematology</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Microbiology">Microbiology</SelectItem>
                      <SelectItem value="Immunology">Immunology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Routine">Routine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowTestForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Test
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
