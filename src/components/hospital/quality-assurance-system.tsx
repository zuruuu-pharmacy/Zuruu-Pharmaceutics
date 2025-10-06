"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, Shield, CheckCircle, XCircle, AlertTriangle, Target, TrendingUp, TrendingDown,
  ArrowUp, ArrowDown, Minus, Percent, Tag, MapPin, ShoppingCart, Package, Globe, Wifi,
  Layers, Archive, Truck, Box, Megaphone, Building, Clipboard, BookOpen, Scale, Gavel,
  Lock, Key, CheckSquare, Square, Play, Pause, Send, Share2, Image, Video, FileText,
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
  Image as ImageIcon, Video as VideoIcon, FileText as FileTextIcon, Printer as PrinterIcon,
  BarChart3 as BarChart3Icon, PieChart as PieChartIcon, LineChart as LineChartIcon,
  Activity as ActivityIcon3, AlertTriangle as AlertTriangleIcon, Clock as ClockIcon,
  Calendar, User, Users as UsersIcon, DollarSign, Star, Award as AwardIcon, Phone, Mail,
  MessageSquare, Camera, Mic, Headphones, Volume2, VolumeX, Wifi as WifiIcon2, Battery,
  Signal, Bluetooth, Hospital, UserCheck, UserPlus, UserMinus, UserX, UserEdit, UserSearch,
  UserSettings, Map, Navigation, Compass, Home, Building2, Building as BuildingIcon2,
  Ambulance, Siren, Zap, Flame, Skull, Cross, FirstAid, Heart, Shield as ShieldIcon,
  AlertTriangle as AlertTriangleIcon2, Activity as ActivityIcon4, Clock as ClockIcon2,
  Users as UsersIcon2, Target as TargetIcon, Pill, Syringe, Microscope, TestTube, Beaker,
  Flask, Droplet, Thermometer, Bandage, X, Plus as PlusIcon, Wrench, Tool, Cog,
  Settings as SettingsIcon, Power, PowerOff, AlertCircle, Stethoscope, Monitor, Cpu as CpuIcon,
  HardDrive, Wifi as WifiIcon3, Battery as BatteryIcon, Signal as SignalIcon,
  Bluetooth as BluetoothIcon, Star as StarIcon, Heart as HeartIcon, Zap as ZapIcon
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

// Quality assurance data simulation
const qualityMetrics = [
  {
    id: 'QM001',
    metric: 'Patient Safety Score',
    currentValue: 94.2,
    targetValue: 95.0,
    trend: 'up',
    change: '+2.1%',
    status: 'Good',
    category: 'Safety',
    lastUpdated: '2024-01-15T14:30:00Z',
    responsible: 'Dr. Sarah Thompson',
    department: 'Quality Assurance',
    benchmarks: {
      national: 92.5,
      regional: 93.8,
      hospital: 94.2
    }
  },
  {
    id: 'QM002',
    metric: 'Medication Error Rate',
    currentValue: 0.8,
    targetValue: 0.5,
    trend: 'down',
    change: '-15.2%',
    status: 'Needs Improvement',
    category: 'Safety',
    lastUpdated: '2024-01-15T10:15:00Z',
    responsible: 'Dr. Michael Chen',
    department: 'Pharmacy',
    benchmarks: {
      national: 1.2,
      regional: 0.9,
      hospital: 0.8
    }
  },
  {
    id: 'QM003',
    metric: 'Readmission Rate',
    currentValue: 12.5,
    targetValue: 10.0,
    trend: 'down',
    change: '-8.3%',
    status: 'Improving',
    category: 'Outcomes',
    lastUpdated: '2024-01-15T16:45:00Z',
    responsible: 'Dr. Emily Rodriguez',
    department: 'Patient Care',
    benchmarks: {
      national: 15.2,
      regional: 13.8,
      hospital: 12.5
    }
  },
  {
    id: 'QM004',
    metric: 'Patient Satisfaction',
    currentValue: 88.7,
    targetValue: 90.0,
    trend: 'up',
    change: '+3.5%',
    status: 'Good',
    category: 'Experience',
    lastUpdated: '2024-01-15T12:00:00Z',
    responsible: 'Nurse Jennifer Lee',
    department: 'Patient Services',
    benchmarks: {
      national: 85.3,
      regional: 87.1,
      hospital: 88.7
    }
  }
];

const qualityData = {
  totalMetrics: 24,
  onTarget: 18,
  needsImprovement: 4,
  critical: 2,
  averageScore: 91.5,
  improvementRate: 8.2,
  complianceRate: 94.8,
  accreditationScore: 96.2
};

const performanceData = [
  { month: 'Jan', safety: 92.5, outcomes: 88.3, experience: 85.2, efficiency: 90.1 },
  { month: 'Feb', safety: 93.2, outcomes: 89.1, experience: 86.8, efficiency: 91.5 },
  { month: 'Mar', safety: 94.8, outcomes: 90.2, experience: 87.5, efficiency: 92.8 },
  { month: 'Apr', safety: 93.1, outcomes: 89.5, experience: 86.2, efficiency: 91.2 },
  { month: 'May', safety: 95.2, outcomes: 91.8, experience: 88.9, efficiency: 93.5 },
  { month: 'Jun', safety: 94.8, outcomes: 91.2, experience: 88.3, efficiency: 93.1 }
];

const departmentScores = [
  { department: 'Emergency', score: 96.2, trend: 'up', change: '+2.1%' },
  { department: 'ICU', score: 94.8, trend: 'up', change: '+1.5%' },
  { department: 'Surgery', score: 93.5, trend: 'down', change: '-0.8%' },
  { department: 'Pediatrics', score: 95.1, trend: 'up', change: '+3.2%' },
  { department: 'Cardiology', score: 92.8, trend: 'up', change: '+1.8%' }
];

const improvementInitiatives = [
  {
    id: 'II001',
    name: 'Medication Safety Program',
    category: 'Safety',
    status: 'Active',
    priority: 'High',
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-06-30T00:00:00Z',
    progress: 65,
    responsible: 'Dr. Michael Chen',
    budget: 50000,
    spent: 32500,
    impact: 'Reduced medication errors by 25%',
    nextReview: '2024-02-15T00:00:00Z'
  },
  {
    id: 'II002',
    name: 'Patient Experience Enhancement',
    category: 'Experience',
    status: 'Active',
    priority: 'Medium',
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-12-31T00:00:00Z',
    progress: 35,
    responsible: 'Nurse Jennifer Lee',
    budget: 75000,
    spent: 26250,
    impact: 'Improved patient satisfaction scores',
    nextReview: '2024-02-20T00:00:00Z'
  },
  {
    id: 'II003',
    name: 'Readmission Reduction Initiative',
    category: 'Outcomes',
    status: 'Planning',
    priority: 'High',
    startDate: '2024-02-01T00:00:00Z',
    endDate: '2024-08-31T00:00:00Z',
    progress: 15,
    responsible: 'Dr. Emily Rodriguez',
    budget: 100000,
    spent: 15000,
    impact: 'Target 20% reduction in readmissions',
    nextReview: '2024-02-10T00:00:00Z'
  }
];

const auditData = [
  {
    id: 'AUD001',
    auditType: 'Patient Safety',
    department: 'Emergency',
    auditor: 'Dr. Sarah Thompson',
    date: '2024-01-15T09:00:00Z',
    score: 94.5,
    status: 'Completed',
    findings: 3,
    critical: 0,
    recommendations: 8
  },
  {
    id: 'AUD002',
    auditType: 'Medication Management',
    department: 'Pharmacy',
    auditor: 'Dr. Michael Chen',
    date: '2024-01-12T14:30:00Z',
    score: 91.2,
    status: 'In Progress',
    findings: 5,
    critical: 1,
    recommendations: 12
  },
  {
    id: 'AUD003',
    auditType: 'Infection Control',
    department: 'ICU',
    auditor: 'Nurse Jennifer Lee',
    date: '2024-01-10T11:15:00Z',
    score: 96.8,
    status: 'Completed',
    findings: 2,
    critical: 0,
    recommendations: 5
  }
];

export default function QualityAssuranceSystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('metrics');
  const [selectedMetric, setSelectedMetric] = useState<any>(null);
  const [showMetricForm, setShowMetricForm] = useState(false);

  // Filter metrics
  const filteredMetrics = qualityMetrics.filter(metric => {
    const matchesSearch = metric.metric.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         metric.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         metric.responsible.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || metric.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || metric.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Good': return 'bg-green-100 text-green-800';
      case 'Needs Improvement': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Improving': return 'bg-blue-100 text-blue-800';
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

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Quality Assurance & Patient Safety
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive quality monitoring and improvement initiatives</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowMetricForm(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Metric
            </Button>
            <Button
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Award className="w-4 h-4 mr-2" />
              Reports
            </Button>
            <Button
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Quality Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Metrics',
              value: qualityData.totalMetrics.toString(),
              change: '+5.2%',
              trend: 'up',
              icon: Target,
              color: 'from-purple-500 to-violet-500'
            },
            {
              title: 'On Target',
              value: qualityData.onTarget.toString(),
              change: '+8.3%',
              trend: 'up',
              icon: CheckCircle,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Average Score',
              value: `${qualityData.averageScore}%`,
              change: '+2.1%',
              trend: 'up',
              icon: Award,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Compliance Rate',
              value: `${qualityData.complianceRate}%`,
              change: '+1.5%',
              trend: 'up',
              icon: Shield,
              color: 'from-yellow-500 to-amber-500'
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
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
            <TabsTrigger value="audits">Audits</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="metrics" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    <span>Quality Metrics</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search metrics..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Categories</SelectItem>
                        <SelectItem value="Safety">Safety</SelectItem>
                        <SelectItem value="Outcomes">Outcomes</SelectItem>
                        <SelectItem value="Experience">Experience</SelectItem>
                        <SelectItem value="Efficiency">Efficiency</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Needs Improvement">Needs Improvement</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="Improving">Improving</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedMetric(metric)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Target className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{metric.metric}</h3>
                            <Badge className={getStatusColor(metric.status)}>
                              {metric.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {metric.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Responsible: {metric.responsible} | Department: {metric.department}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Current: {metric.currentValue}%</span>
                            <span className="text-sm text-gray-600">Target: {metric.targetValue}%</span>
                            <span className="text-sm text-gray-600">Updated: {formatTimeAgo(metric.lastUpdated)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{metric.currentValue}%</p>
                          <p className="text-sm text-gray-600">Current</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{metric.targetValue}%</p>
                          <p className="text-sm text-gray-600">Target</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${getTrendColor(metric.trend)}`}>
                            {metric.change}
                          </p>
                          <p className="text-sm text-gray-600">Change</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMetric(metric);
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

          <TabsContent value="initiatives" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span>Improvement Initiatives</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {improvementInitiatives.map((initiative, index) => (
                    <motion.div
                      key={initiative.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Award className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{initiative.name}</h3>
                            <Badge className={getPriorityColor(initiative.priority)}>
                              {initiative.priority}
                            </Badge>
                            <Badge className={initiative.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {initiative.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {initiative.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Responsible: {initiative.responsible}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Progress: {initiative.progress}%</span>
                            <span className="text-sm text-gray-600">Budget: ${initiative.budget.toLocaleString()}</span>
                            <span className="text-sm text-gray-600">Spent: ${initiative.spent.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{initiative.progress}%</p>
                          <p className="text-sm text-gray-600">Progress</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">${initiative.budget.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Budget</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{initiative.status}</p>
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

          <TabsContent value="audits" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span>Quality Audits</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditData.map((audit, index) => (
                    <motion.div
                      key={audit.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Shield className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{audit.auditType}</h3>
                            <Badge className={audit.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {audit.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {audit.department}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Auditor: {audit.auditor} | Date: {new Date(audit.date).toLocaleDateString()}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Score: {audit.score}%</span>
                            <span className="text-sm text-gray-600">Findings: {audit.findings}</span>
                            <span className="text-sm text-gray-600">Critical: {audit.critical}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{audit.score}%</p>
                          <p className="text-sm text-gray-600">Score</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{audit.findings}</p>
                          <p className="text-sm text-gray-600">Findings</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{audit.recommendations}</p>
                          <p className="text-sm text-gray-600">Recommendations</p>
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
                    <LineChart className="w-5 h-5 text-purple-600" />
                    <span>Performance Trends</span>
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
                      <Line type="monotone" dataKey="safety" stroke="#8b5cf6" strokeWidth={3} />
                      <Line type="monotone" dataKey="outcomes" stroke="#3b82f6" strokeWidth={3} />
                      <Line type="monotone" dataKey="experience" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="efficiency" stroke="#f59e0b" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Department Scores</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={departmentScores}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" fill="#8b5cf6" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <span>Quality Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">On Target</span>
                      <span className="font-bold text-green-600">{qualityData.onTarget}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Needs Improvement</span>
                      <span className="font-bold text-yellow-600">{qualityData.needsImprovement}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Critical</span>
                      <span className="font-bold text-red-600">{qualityData.critical}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Accreditation Score</span>
                      <span className="font-bold text-blue-600">{qualityData.accreditationScore}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span>Improvement Rate</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Improvement Rate</span>
                      <span className="font-bold text-green-600">{qualityData.improvementRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Compliance Rate</span>
                      <span className="font-bold text-blue-600">{qualityData.complianceRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Score</span>
                      <span className="font-bold text-purple-600">{qualityData.averageScore}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    <span>Risk Assessment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Critical Issues</span>
                      <span className="font-bold text-red-600">{qualityData.critical}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Needs Improvement</span>
                      <span className="font-bold text-yellow-600">{qualityData.needsImprovement}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Risk Level</span>
                      <span className="font-bold text-green-600">Low</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Metric Detail Modal */}
        <Dialog open={!!selectedMetric} onOpenChange={() => setSelectedMetric(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-600" />
                <span>Metric Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedMetric && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                    <Target className="w-10 h-10 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedMetric.metric}</h2>
                      <Badge className={getStatusColor(selectedMetric.status)}>
                        {selectedMetric.status}
                      </Badge>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        {selectedMetric.category}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">Responsible: {selectedMetric.responsible} | Department: {selectedMetric.department}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Current Value</Label>
                        <p className="font-semibold">{selectedMetric.currentValue}%</p>
                      </div>
                      <div>
                        <Label>Target Value</Label>
                        <p className="font-semibold">{selectedMetric.targetValue}%</p>
                      </div>
                      <div>
                        <Label>Trend</Label>
                        <p className="font-semibold">{selectedMetric.trend}</p>
                      </div>
                      <div>
                        <Label>Change</Label>
                        <p className="font-semibold">{selectedMetric.change}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Benchmarks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(selectedMetric.benchmarks).map(([key, value]: [string, any]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-gray-600 capitalize">{key}</span>
                            <span className="font-semibold">{value}%</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Current vs Target</span>
                          <span className="font-semibold">
                            {selectedMetric.currentValue >= selectedMetric.targetValue ? '✓' : '✗'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Trend</span>
                          <span className="font-semibold">{selectedMetric.trend}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Change</span>
                          <span className="font-semibold">{selectedMetric.change}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Last Updated</span>
                          <span className="font-semibold">{formatTimeAgo(selectedMetric.lastUpdated)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedMetric(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Metric
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Metric Modal */}
        <Dialog open={showMetricForm} onOpenChange={setShowMetricForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-purple-600" />
                <span>New Quality Metric</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="metricName">Metric Name</Label>
                  <Input id="metricName" placeholder="Enter metric name" />
                </div>
                <div>
                  <Label htmlFor="metricCategory">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Safety">Safety</SelectItem>
                      <SelectItem value="Outcomes">Outcomes</SelectItem>
                      <SelectItem value="Experience">Experience</SelectItem>
                      <SelectItem value="Efficiency">Efficiency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="currentValue">Current Value</Label>
                  <Input id="currentValue" placeholder="Enter current value" />
                </div>
                <div>
                  <Label htmlFor="targetValue">Target Value</Label>
                  <Input id="targetValue" placeholder="Enter target value" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowMetricForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Metric
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
