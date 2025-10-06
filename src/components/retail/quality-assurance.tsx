"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, CheckCircle, XCircle, AlertTriangle, Clock, Calendar, User, Users,
  Target, Zap, Database, Network, Cpu, Brain, Activity, TrendingUp, TrendingDown,
  ArrowUp, ArrowDown, Minus, Percent, Tag, MapPin, ShoppingCart, Package, Smartphone,
  Globe, Wifi, Layers, Archive, Truck, Box, Megaphone, Building, Clipboard, BookOpen,
  Scale, Gavel, Lock, Key, CheckSquare, Square, Play, Pause, Send, Share2, Image,
  Video, FileText, Printer, BarChart3, PieChart, LineChart, Activity as ActivityIcon,
  Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings, Bell,
  DollarSign, Star, Heart, Award, RefreshCw, RotateCcw, QrCode, ScanLine, Barcode,
  Database as DatabaseIcon, Network as NetworkIcon, Cpu as CpuIcon, Brain as BrainIcon,
  Activity as ActivityIcon2, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon,
  ArrowUp as ArrowUpIcon, ArrowDown as ArrowDownIcon, Minus as MinusIcon, Percent as PercentIcon,
  Tag as TagIcon, MapPin as MapPinIcon, ShoppingCart as ShoppingCartIcon, Package as PackageIcon,
  Smartphone as SmartphoneIcon, Globe as GlobeIcon, Wifi as WifiIcon, Layers as LayersIcon,
  Archive as ArchiveIcon, Truck as TruckIcon, Box as BoxIcon, Megaphone as MegaphoneIcon,
  Building as BuildingIcon, Clipboard as ClipboardIcon, BookOpen as BookOpenIcon,
  Scale as ScaleIcon, Gavel as GavelIcon, Lock as LockIcon, Key as KeyIcon,
  CheckSquare as CheckSquareIcon, Square as SquareIcon, Play as PlayIcon, Pause as PauseIcon,
  Send as SendIcon, Share2 as Share2Icon, Image as ImageIcon, Video as VideoIcon,
  FileText as FileTextIcon, Printer as PrinterIcon, BarChart3 as BarChart3Icon,
  PieChart as PieChartIcon, LineChart as LineChartIcon, Activity as ActivityIcon3
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
const qualityTests = [
  {
    id: 'QT001',
    name: 'Prescription Accuracy Test',
    description: 'Automated testing of prescription processing accuracy',
    category: 'Prescription',
    status: 'Passed',
    priority: 'High',
    testType: 'Automated',
    lastRun: '2024-01-15T10:30:00Z',
    nextRun: '2024-01-16T10:00:00Z',
    successRate: 98.5,
    totalRuns: 1247,
    avgExecutionTime: 2.3,
    createdBy: 'QA Team',
    createdAt: '2024-01-01T09:00:00Z',
    testSteps: [
      'Validate prescription data format',
      'Check drug interaction rules',
      'Verify dosage calculations',
      'Test insurance validation',
      'Validate prescription output'
    ],
    requirements: [
      'Prescription data must be valid',
      'Drug interactions must be checked',
      'Dosage calculations must be accurate',
      'Insurance validation must work',
      'Output must be properly formatted'
    ]
  },
  {
    id: 'QT002',
    name: 'Inventory Accuracy Test',
    description: 'Testing inventory tracking and stock management accuracy',
    category: 'Inventory',
    status: 'Failed',
    priority: 'Medium',
    testType: 'Manual',
    lastRun: '2024-01-15T14:15:00Z',
    nextRun: '2024-01-16T14:00:00Z',
    successRate: 89.2,
    totalRuns: 892,
    avgExecutionTime: 1.8,
    createdBy: 'QA Team',
    createdAt: '2024-01-05T11:30:00Z',
    testSteps: [
      'Check stock level accuracy',
      'Verify reorder point calculations',
      'Test inventory updates',
      'Validate stock alerts',
      'Check inventory reports'
    ],
    requirements: [
      'Stock levels must be accurate',
      'Reorder points must be calculated correctly',
      'Inventory updates must work',
      'Stock alerts must trigger properly',
      'Reports must be accurate'
    ]
  },
  {
    id: 'QT003',
    name: 'Payment Processing Test',
    description: 'Testing payment processing and transaction handling',
    category: 'Payment',
    status: 'Passed',
    priority: 'High',
    testType: 'Automated',
    lastRun: '2024-01-15T16:45:00Z',
    nextRun: '2024-01-16T16:00:00Z',
    successRate: 97.8,
    totalRuns: 2156,
    avgExecutionTime: 0.5,
    createdBy: 'QA Team',
    createdAt: '2024-01-10T14:20:00Z',
    testSteps: [
      'Test payment validation',
      'Check transaction processing',
      'Verify payment confirmation',
      'Test refund processing',
      'Validate payment records'
    ],
    requirements: [
      'Payment validation must work',
      'Transactions must process correctly',
      'Confirmations must be sent',
      'Refunds must work properly',
      'Records must be accurate'
    ]
  }
];

const qualityMetrics = {
  totalTests: 45,
  passedTests: 42,
  failedTests: 3,
  successRate: 93.3,
  avgExecutionTime: 1.8,
  totalRuns: 8947,
  criticalIssues: 2,
  highPriorityIssues: 5,
  mediumPriorityIssues: 8,
  lowPriorityIssues: 12
};

const complianceChecks = [
  {
    id: 'CC001',
    name: 'HIPAA Compliance',
    description: 'Healthcare data privacy and security compliance',
    status: 'Compliant',
    priority: 'Critical',
    lastChecked: '2024-01-15T09:00:00Z',
    nextCheck: '2024-01-22T09:00:00Z',
    complianceScore: 98.5,
    requirements: [
      'Patient data encryption',
      'Access control implementation',
      'Audit trail maintenance',
      'Data backup procedures',
      'Incident response plan'
    ]
  },
  {
    id: 'CC002',
    name: 'FDA Compliance',
    description: 'Food and Drug Administration compliance',
    status: 'Non-Compliant',
    priority: 'High',
    lastChecked: '2024-01-14T14:30:00Z',
    nextCheck: '2024-01-21T14:30:00Z',
    complianceScore: 85.2,
    requirements: [
      'Drug labeling compliance',
      'Storage temperature monitoring',
      'Expiration date tracking',
      'Recall procedures',
      'Documentation requirements'
    ]
  },
  {
    id: 'CC003',
    name: 'PCI DSS Compliance',
    description: 'Payment card industry data security standards',
    status: 'Compliant',
    priority: 'High',
    lastChecked: '2024-01-15T11:15:00Z',
    nextCheck: '2024-01-22T11:15:00Z',
    complianceScore: 96.8,
    requirements: [
      'Card data encryption',
      'Secure network architecture',
      'Access control measures',
      'Regular security testing',
      'Incident response procedures'
    ]
  }
];

const qualityData = [
  { month: 'Jan', tests: 120, passed: 115, failed: 5, compliance: 95.2 },
  { month: 'Feb', tests: 135, passed: 128, failed: 7, compliance: 94.8 },
  { month: 'Mar', tests: 150, passed: 142, failed: 8, compliance: 94.7 },
  { month: 'Apr', tests: 142, passed: 136, failed: 6, compliance: 95.8 },
  { month: 'May', tests: 168, passed: 158, failed: 10, compliance: 94.0 },
  { month: 'Jun', tests: 189, passed: 178, failed: 11, compliance: 94.2 }
];

export default function QualityAssurance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('tests');
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [showTestForm, setShowTestForm] = useState(false);

  // Filter tests
  const filteredTests = qualityTests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || test.status === selectedStatus;
    const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Passed': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Running': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Quality Assurance
            </h1>
            <p className="text-gray-600 mt-2">Testing protocols and compliance monitoring</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowTestForm(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Test
            </Button>
            <Button
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Quality Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Tests',
              value: qualityMetrics.totalTests.toString(),
              change: '+12.5%',
              trend: 'up',
              icon: Shield,
              color: 'from-orange-500 to-red-500'
            },
            {
              title: 'Success Rate',
              value: `${qualityMetrics.successRate}%`,
              change: '+2.1%',
              trend: 'up',
              icon: CheckCircle,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Failed Tests',
              value: qualityMetrics.failedTests.toString(),
              change: '-15.2%',
              trend: 'down',
              icon: XCircle,
              color: 'from-red-500 to-pink-500'
            },
            {
              title: 'Critical Issues',
              value: qualityMetrics.criticalIssues.toString(),
              change: '-25.0%',
              trend: 'down',
              icon: AlertTriangle,
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
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="tests" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-orange-600" />
                    <span>Quality Tests</span>
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
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Passed">Passed</SelectItem>
                        <SelectItem value="Failed">Failed</SelectItem>
                        <SelectItem value="Running">Running</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Categories</SelectItem>
                        <SelectItem value="Prescription">Prescription</SelectItem>
                        <SelectItem value="Inventory">Inventory</SelectItem>
                        <SelectItem value="Payment">Payment</SelectItem>
                        <SelectItem value="Security">Security</SelectItem>
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
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <Shield className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{test.name}</h3>
                            <Badge className={getStatusColor(test.status)}>
                              {test.status}
                            </Badge>
                            <Badge className={getPriorityColor(test.priority)}>
                              {test.priority}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {test.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{test.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Type: {test.testType}</span>
                            <span className="text-sm text-gray-600">Last Run: {formatTimeAgo(test.lastRun)}</span>
                            <span className="text-sm text-gray-600">Created: {test.createdBy}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{test.successRate}%</p>
                          <p className="text-sm text-gray-600">Success Rate</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{test.totalRuns}</p>
                          <p className="text-sm text-gray-600">Total Runs</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{test.avgExecutionTime}s</p>
                          <p className="text-sm text-gray-600">Avg Time</p>
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

          <TabsContent value="compliance" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  <span>Compliance Checks</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceChecks.map((check, index) => (
                    <motion.div
                      key={check.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{check.name}</h3>
                            <Badge className={getStatusColor(check.status)}>
                              {check.status}
                            </Badge>
                            <Badge className={getPriorityColor(check.priority)}>
                              {check.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{check.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Last Check: {formatTimeAgo(check.lastChecked)}</span>
                            <span className="text-sm text-gray-600">Next Check: {formatTimeAgo(check.nextCheck)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className={`font-semibold ${getComplianceColor(check.complianceScore)}`}>
                            {check.complianceScore}%
                          </p>
                          <p className="text-sm text-gray-600">Score</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{check.requirements.length}</p>
                          <p className="text-sm text-gray-600">Requirements</p>
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
                    <LineChart className="w-5 h-5 text-orange-600" />
                    <span>Quality Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={qualityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="tests" stroke="#f97316" strokeWidth={3} />
                      <Line type="monotone" dataKey="passed" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={3} />
                      <Line type="monotone" dataKey="compliance" stroke="#3b82f6" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Quality Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Test Runs</span>
                      <span className="font-bold text-orange-600">{qualityMetrics.totalRuns.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-bold text-green-600">{qualityMetrics.successRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Execution Time</span>
                      <span className="font-bold text-blue-600">{qualityMetrics.avgExecutionTime}s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Critical Issues</span>
                      <span className="font-bold text-red-600">{qualityMetrics.criticalIssues}</span>
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
                  <Settings className="w-5 h-5 text-orange-600" />
                  <span>Quality Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="autoTesting">Auto Testing</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled">Enabled</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="testFrequency">Test Frequency</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="complianceThreshold">Compliance Threshold</Label>
                      <Input id="complianceThreshold" type="number" placeholder="95" />
                    </div>
                    <div>
                      <Label htmlFor="alertLevel">Alert Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button>
                      <Save className="w-4 h-4 mr-2" />
                      Save Settings
                    </Button>
                    <Button variant="outline">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Test Detail Modal */}
        <Dialog open={!!selectedTest} onOpenChange={() => setSelectedTest(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-orange-600" />
                <span>Test Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedTest && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                    <Shield className="w-10 h-10 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedTest.name}</h2>
                      <Badge className={getStatusColor(selectedTest.status)}>
                        {selectedTest.status}
                      </Badge>
                      <Badge className={getPriorityColor(selectedTest.priority)}>
                        {selectedTest.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">{selectedTest.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Category</Label>
                        <p className="font-semibold">{selectedTest.category}</p>
                      </div>
                      <div>
                        <Label>Test Type</Label>
                        <p className="font-semibold">{selectedTest.testType}</p>
                      </div>
                      <div>
                        <Label>Success Rate</Label>
                        <p className="font-semibold">{selectedTest.successRate}%</p>
                      </div>
                      <div>
                        <Label>Total Runs</Label>
                        <p className="font-semibold">{selectedTest.totalRuns}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Test Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedTest.testSteps.map((step: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedTest.requirements.map((requirement: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm">{requirement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedTest(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Test
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
                <Plus className="w-5 h-5 text-orange-600" />
                <span>Create New Test</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="testName">Test Name</Label>
                  <Input id="testName" placeholder="Enter test name" />
                </div>
                <div>
                  <Label htmlFor="testCategory">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Prescription">Prescription</SelectItem>
                      <SelectItem value="Inventory">Inventory</SelectItem>
                      <SelectItem value="Payment">Payment</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="testType">Test Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Automated">Automated</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Integration">Integration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="testPriority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="testDescription">Description</Label>
                <Textarea id="testDescription" placeholder="Enter test description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowTestForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Test
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}