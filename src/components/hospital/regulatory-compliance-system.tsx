"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Gavel, FileText, CheckCircle, XCircle, AlertTriangle, Clock, Calendar,
  TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus, Percent, Tag, MapPin,
  Package, Globe, Wifi, Layers, Archive, Box, Megaphone,
  Building, Clipboard, BookOpen, Scale, Lock, Key, CheckSquare, Square, Play,
  Pause, Send, Share2, Image, Video, Printer, BarChart3, PieChart, LineChart,
  Activity, Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings,
  Bell, RefreshCw, RotateCcw, QrCode, ScanLine, Barcode, Database, Network, Cpu,
  Brain, CheckCircle as CheckCircleIcon, XCircle as XCircleIcon, AlertTriangle as AlertTriangleIcon,
  Clock as ClockIcon, Calendar as CalendarIcon, User, Users, Star, Award, Phone,
  Mail, MessageSquare, Camera, Mic, Headphones, Volume2, VolumeX, Wifi as WifiIcon,
  Battery, Signal, Bluetooth, Hospital, UserCheck, UserPlus, UserMinus, UserX,
  UserSearch, Map, Navigation, Compass, Home, Building2,
  Ambulance, Siren, Zap, Flame, Skull, Cross, Heart, Shield as ShieldIcon,
  Stethoscope, Monitor, HardDrive, Wrench, Cog, Power, PowerOff, AlertCircle,
  DollarSign, Target, Pill, Syringe, Microscope, TestTube, Beaker, Droplet,
  Thermometer, Bandage, X, Plus as PlusIcon, Truck, Warehouse, ShoppingCart
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

// Regulatory compliance data simulation
const complianceData = [
  {
    id: 'COMP001',
    regulation: 'HIPAA Compliance',
    category: 'Privacy & Security',
    status: 'Compliant',
    lastAudit: '2024-01-10T00:00:00Z',
    nextAudit: '2024-07-10T00:00:00Z',
    score: 98.5,
    requirements: 15,
    completed: 15,
    responsible: 'Dr. Sarah Thompson',
    department: 'IT Security',
    violations: 0,
    riskLevel: 'Low',
    documentation: 'Complete',
    training: 'Current'
  },
  {
    id: 'COMP002',
    regulation: 'Joint Commission Standards',
    category: 'Quality & Safety',
    status: 'Compliant',
    lastAudit: '2024-01-05T00:00:00Z',
    nextAudit: '2024-07-05T00:00:00Z',
    score: 96.2,
    requirements: 28,
    completed: 27,
    responsible: 'Dr. Michael Chen',
    department: 'Quality Assurance',
    violations: 1,
    riskLevel: 'Medium',
    documentation: 'Complete',
    training: 'Current'
  },
  {
    id: 'COMP003',
    regulation: 'CMS Conditions of Participation',
    category: 'Medicare/Medicaid',
    status: 'Non-Compliant',
    lastAudit: '2024-01-15T00:00:00Z',
    nextAudit: '2024-04-15T00:00:00Z',
    score: 78.5,
    requirements: 22,
    completed: 17,
    responsible: 'Dr. Emily Rodriguez',
    department: 'Administration',
    violations: 5,
    riskLevel: 'High',
    documentation: 'Incomplete',
    training: 'Overdue'
  }
];

const complianceMetrics = {
  totalRegulations: 45,
  compliant: 38,
  nonCompliant: 5,
  atRisk: 2,
  averageScore: 92.8,
  violations: 12,
  upcomingAudits: 8,
  trainingOverdue: 15
};

const auditData = [
  { month: 'Jan', score: 92.5, violations: 3, audits: 5 },
  { month: 'Feb', score: 94.2, violations: 2, audits: 4 },
  { month: 'Mar', score: 93.8, violations: 4, audits: 6 },
  { month: 'Apr', score: 95.1, violations: 1, audits: 3 },
  { month: 'May', score: 96.2, violations: 2, audits: 5 },
  { month: 'Jun', score: 94.8, violations: 3, audits: 4 }
];

const regulationCategories = [
  { category: 'Privacy & Security', count: 12, percentage: 26.7, compliance: 95.2 },
  { category: 'Quality & Safety', count: 15, percentage: 33.3, compliance: 92.8 },
  { category: 'Medicare/Medicaid', count: 8, percentage: 17.8, compliance: 88.5 },
  { category: 'Labor Standards', count: 6, percentage: 13.3, compliance: 96.1 },
  { category: 'Environmental', count: 4, percentage: 8.9, compliance: 94.3 }
];

const auditSchedule = [
  {
    id: 'AUDIT001',
    regulation: 'HIPAA Compliance',
    auditor: 'External Audit Firm',
    scheduledDate: '2024-02-15T09:00:00Z',
    status: 'Scheduled',
    duration: 3,
    scope: 'Full Assessment',
    preparation: 'In Progress',
    documents: 45,
    responsible: 'Dr. Sarah Thompson'
  },
  {
    id: 'AUDIT002',
    regulation: 'Joint Commission Standards',
    auditor: 'Joint Commission',
    scheduledDate: '2024-03-20T10:00:00Z',
    status: 'Scheduled',
    duration: 5,
    scope: 'Comprehensive Review',
    preparation: 'Complete',
    documents: 78,
    responsible: 'Dr. Michael Chen'
  },
  {
    id: 'AUDIT003',
    regulation: 'CMS Conditions',
    auditor: 'CMS Inspector',
    scheduledDate: '2024-04-10T08:00:00Z',
    status: 'Pending',
    duration: 2,
    scope: 'Focused Review',
    preparation: 'Not Started',
    documents: 32,
    responsible: 'Dr. Emily Rodriguez'
  }
];

const trainingData = [
  {
    id: 'TRAIN001',
    course: 'HIPAA Privacy Training',
    category: 'Privacy & Security',
    participants: 156,
    completed: 142,
    completionRate: 91.0,
    lastUpdated: '2024-01-10T00:00:00Z',
    nextDue: '2024-07-10T00:00:00Z',
    status: 'Current'
  },
  {
    id: 'TRAIN002',
    course: 'Patient Safety Training',
    category: 'Quality & Safety',
    participants: 89,
    completed: 78,
    completionRate: 87.6,
    lastUpdated: '2024-01-05T00:00:00Z',
    nextDue: '2024-07-05T00:00:00Z',
    status: 'Current'
  },
  {
    id: 'TRAIN003',
    course: 'Infection Control Training',
    category: 'Quality & Safety',
    participants: 234,
    completed: 198,
    completionRate: 84.6,
    lastUpdated: '2023-12-15T00:00:00Z',
    nextDue: '2024-06-15T00:00:00Z',
    status: 'Overdue'
  }
];

export default function RegulatoryComplianceSystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('compliance');
  const [selectedCompliance, setSelectedCompliance] = useState<any>(null);
  const [showComplianceForm, setShowComplianceForm] = useState(false);

  // Filter compliance items
  const filteredCompliance = complianceData.filter(item => {
    const matchesSearch = item.regulation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.responsible.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': return 'bg-green-100 text-green-800';
      case 'Non-Compliant': return 'bg-red-100 text-red-800';
      case 'At Risk': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLevelColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
              Regulatory Compliance
            </h1>
            <p className="text-gray-600 mt-2">Healthcare regulations and accreditation management</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowComplianceForm(true)}
              className="bg-slate-600 hover:bg-slate-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Regulation
            </Button>
            <Button
              variant="outline"
              className="border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <FileText className="w-4 h-4 mr-2" />
              Reports
            </Button>
            <Button
              variant="outline"
              className="border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Compliance Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Regulations',
              value: complianceMetrics.totalRegulations.toString(),
              change: '+2.1%',
              trend: 'up',
              icon: Gavel,
              color: 'from-slate-500 to-gray-500'
            },
            {
              title: 'Compliant',
              value: complianceMetrics.compliant.toString(),
              change: '+5.2%',
              trend: 'up',
              icon: CheckCircle,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Average Score',
              value: `${complianceMetrics.averageScore}%`,
              change: '+1.8%',
              trend: 'up',
              icon: Shield,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Violations',
              value: complianceMetrics.violations.toString(),
              change: '-12.5%',
              trend: 'down',
              icon: AlertTriangle,
              color: 'from-red-500 to-pink-500'
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
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="audits">Audits</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="compliance" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-slate-600" />
                    <span>Regulatory Compliance</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search regulations..."
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
                        <SelectItem value="Privacy & Security">Privacy & Security</SelectItem>
                        <SelectItem value="Quality & Safety">Quality & Safety</SelectItem>
                        <SelectItem value="Medicare/Medicaid">Medicare/Medicaid</SelectItem>
                        <SelectItem value="Labor Standards">Labor Standards</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Compliant">Compliant</SelectItem>
                        <SelectItem value="Non-Compliant">Non-Compliant</SelectItem>
                        <SelectItem value="At Risk">At Risk</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCompliance.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedCompliance(item)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                          <Shield className="w-6 h-6 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{item.regulation}</h3>
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                            <Badge className={getRiskLevelColor(item.riskLevel)}>
                              {item.riskLevel} Risk
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {item.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Responsible: {item.responsible} | Department: {item.department}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Score: {item.score}%</span>
                            <span className="text-sm text-gray-600">Requirements: {item.completed}/{item.requirements}</span>
                            <span className="text-sm text-gray-600">Violations: {item.violations}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{item.score}%</p>
                          <p className="text-sm text-gray-600">Score</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{item.completed}/{item.requirements}</p>
                          <p className="text-sm text-gray-600">Requirements</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{item.violations}</p>
                          <p className="text-sm text-gray-600">Violations</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCompliance(item);
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

          <TabsContent value="audits" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-slate-600" />
                  <span>Audit Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditSchedule.map((audit, index) => (
                    <motion.div
                      key={audit.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                          <FileText className="w-6 h-6 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{audit.regulation}</h3>
                            <Badge className={audit.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}>
                              {audit.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {audit.scope}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Auditor: {audit.auditor} | Date: {new Date(audit.scheduledDate).toLocaleDateString()}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Duration: {audit.duration} days</span>
                            <span className="text-sm text-gray-600">Documents: {audit.documents}</span>
                            <span className="text-sm text-gray-600">Preparation: {audit.preparation}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{audit.duration} days</p>
                          <p className="text-sm text-gray-600">Duration</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{audit.documents}</p>
                          <p className="text-sm text-gray-600">Documents</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{audit.status}</p>
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

          <TabsContent value="training" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-slate-600" />
                  <span>Compliance Training</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainingData.map((training, index) => (
                    <motion.div
                      key={training.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{training.course}</h3>
                            <Badge className={training.status === 'Current' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {training.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {training.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Participants: {training.participants} | Completed: {training.completed}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Completion Rate: {training.completionRate}%</span>
                            <span className="text-sm text-gray-600">Next Due: {new Date(training.nextDue).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{training.completionRate}%</p>
                          <p className="text-sm text-gray-600">Completion</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{training.completed}</p>
                          <p className="text-sm text-gray-600">Completed</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{training.status}</p>
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
                    <LineChart className="w-5 h-5 text-slate-600" />
                    <span>Compliance Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={auditData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="score" stroke="#475569" strokeWidth={3} />
                      <Line type="monotone" dataKey="violations" stroke="#ef4444" strokeWidth={3} />
                      <Line type="monotone" dataKey="audits" stroke="#3b82f6" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-blue-600" />
                    <span>Regulation Categories</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={regulationCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                      >
                        {regulationCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#475569' : index === 1 ? '#3b82f6' : index === 2 ? '#f59e0b' : index === 3 ? '#ef4444' : '#8b5cf6'} />
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
                    <Shield className="w-5 h-5 text-green-600" />
                    <span>Compliance Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Compliant</span>
                      <span className="font-bold text-green-600">{complianceMetrics.compliant}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Non-Compliant</span>
                      <span className="font-bold text-red-600">{complianceMetrics.nonCompliant}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">At Risk</span>
                      <span className="font-bold text-yellow-600">{complianceMetrics.atRisk}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Score</span>
                      <span className="font-bold text-blue-600">{complianceMetrics.averageScore}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span>Risk Assessment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Violations</span>
                      <span className="font-bold text-red-600">{complianceMetrics.violations}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Upcoming Audits</span>
                      <span className="font-bold text-blue-600">{complianceMetrics.upcomingAudits}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Training Overdue</span>
                      <span className="font-bold text-orange-600">{complianceMetrics.trainingOverdue}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>Upcoming Deadlines</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Next Audit</span>
                      <span className="font-bold text-blue-600">Feb 15</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Training Due</span>
                      <span className="font-bold text-orange-600">Mar 20</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Documentation</span>
                      <span className="font-bold text-green-600">Apr 10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Compliance Detail Modal */}
        <Dialog open={!!selectedCompliance} onOpenChange={() => setSelectedCompliance(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-slate-600" />
                <span>Compliance Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedCompliance && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                    <Shield className="w-10 h-10 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedCompliance.regulation}</h2>
                      <Badge className={getStatusColor(selectedCompliance.status)}>
                        {selectedCompliance.status}
                      </Badge>
                      <Badge className={getRiskLevelColor(selectedCompliance.riskLevel)}>
                        {selectedCompliance.riskLevel} Risk
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">Responsible: {selectedCompliance.responsible} | Department: {selectedCompliance.department}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Score</Label>
                        <p className="font-semibold">{selectedCompliance.score}%</p>
                      </div>
                      <div>
                        <Label>Requirements</Label>
                        <p className="font-semibold">{selectedCompliance.completed}/{selectedCompliance.requirements}</p>
                      </div>
                      <div>
                        <Label>Violations</Label>
                        <p className="font-semibold">{selectedCompliance.violations}</p>
                      </div>
                      <div>
                        <Label>Last Audit</Label>
                        <p className="font-semibold">{new Date(selectedCompliance.lastAudit).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Compliance Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Status</span>
                          <span className="font-semibold">{selectedCompliance.status}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Risk Level</span>
                          <span className="font-semibold">{selectedCompliance.riskLevel}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Documentation</span>
                          <span className="font-semibold">{selectedCompliance.documentation}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Training</span>
                          <span className="font-semibold">{selectedCompliance.training}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Audit Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Last Audit</span>
                          <span className="font-semibold">{new Date(selectedCompliance.lastAudit).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Next Audit</span>
                          <span className="font-semibold">{new Date(selectedCompliance.nextAudit).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Score</span>
                          <span className="font-semibold">{selectedCompliance.score}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Violations</span>
                          <span className="font-semibold">{selectedCompliance.violations}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedCompliance(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Update Compliance
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Compliance Modal */}
        <Dialog open={showComplianceForm} onOpenChange={setShowComplianceForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-slate-600" />
                <span>Add New Regulation</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="regulation">Regulation Name</Label>
                  <Input id="regulation" placeholder="Enter regulation name" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Privacy & Security">Privacy & Security</SelectItem>
                      <SelectItem value="Quality & Safety">Quality & Safety</SelectItem>
                      <SelectItem value="Medicare/Medicaid">Medicare/Medicaid</SelectItem>
                      <SelectItem value="Labor Standards">Labor Standards</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="responsible">Responsible Person</Label>
                  <Input id="responsible" placeholder="Enter responsible person" />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" placeholder="Enter department" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowComplianceForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Regulation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
