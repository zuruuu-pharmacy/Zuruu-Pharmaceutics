"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitBranch, GitCommit, GitMerge, GitPullRequest, Network, Database, Cpu, Brain,
  Activity, TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus, Percent, Tag,
  MapPin, ShoppingCart, Package, Smartphone, Globe, Wifi, Layers, Archive, Truck,
  Box, Megaphone, Building, Clipboard, BookOpen, Scale, Gavel, Lock, Key,
  CheckSquare, Square, Play, Pause, Send, Share2, Image, Video, FileText, Printer,
  BarChart3, PieChart, LineChart, Activity as ActivityIcon, Search, Filter, Plus,
  Edit, Trash2, Eye, Download, Upload, Settings, Bell, DollarSign, Star, Heart,
  Award, RefreshCw, RotateCcw, QrCode, ScanLine, Barcode, Database as DatabaseIcon,
  Network as NetworkIcon, Cpu as CpuIcon, Brain as BrainIcon, Activity as ActivityIcon2,
  TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon, ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon, Minus as MinusIcon, Percent as PercentIcon, Tag as TagIcon,
  MapPin as MapPinIcon, ShoppingCart as ShoppingCartIcon, Package as PackageIcon,
  Smartphone as SmartphoneIcon, Globe as GlobeIcon, Wifi as WifiIcon, Layers as LayersIcon,
  Archive as ArchiveIcon, Truck as TruckIcon, Box as BoxIcon, Megaphone as MegaphoneIcon,
  Building as BuildingIcon, Clipboard as ClipboardIcon, BookOpen as BookOpenIcon,
  Scale as ScaleIcon, Gavel as GavelIcon, Lock as LockIcon, Key as KeyIcon,
  CheckSquare as CheckSquareIcon, Square as SquareIcon, Play as PlayIcon, Pause as PauseIcon,
  Send as SendIcon, Share2 as Share2Icon, Image as ImageIcon, Video as VideoIcon,
  FileText as FileTextIcon, Printer as PrinterIcon, BarChart3 as BarChart3Icon,
  PieChart as PieChartIcon, LineChart as LineChartIcon, Activity as ActivityIcon3,
  Shield, CheckCircle, XCircle, AlertTriangle, Clock, Calendar, User, Users, Target, Zap
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

// Third-party integrations data simulation
const integrations = [
  {
    id: 'INT001',
    name: 'Stripe Payment Gateway',
    description: 'Payment processing and transaction management',
    category: 'Payment',
    status: 'Connected',
    priority: 'High',
    provider: 'Stripe Inc.',
    version: 'v3.2.1',
    lastSync: '2024-01-15T14:30:00Z',
    nextSync: '2024-01-15T15:00:00Z',
    apiCalls: 1247,
    successRate: 99.2,
    avgResponseTime: 0.8,
    createdBy: 'Dev Team',
    createdAt: '2024-01-01T09:00:00Z',
    endpoints: [
      'POST /v1/charges',
      'GET /v1/charges/{id}',
      'POST /v1/refunds',
      'GET /v1/balance'
    ],
    features: [
      'Payment processing',
      'Refund handling',
      'Webhook support',
      'Multi-currency'
    ]
  },
  {
    id: 'INT002',
    name: 'QuickBooks Accounting',
    description: 'Financial data synchronization and reporting',
    category: 'Accounting',
    status: 'Connected',
    priority: 'High',
    provider: 'Intuit',
    version: 'v2.8.5',
    lastSync: '2024-01-15T10:15:00Z',
    nextSync: '2024-01-16T10:00:00Z',
    apiCalls: 892,
    successRate: 97.8,
    avgResponseTime: 1.2,
    createdBy: 'Finance Team',
    createdAt: '2024-01-05T11:30:00Z',
    endpoints: [
      'GET /v3/company/{companyId}/items',
      'POST /v3/company/{companyId}/invoices',
      'GET /v3/company/{companyId}/customers',
      'GET /v3/company/{companyId}/reports'
    ],
    features: [
      'Invoice sync',
      'Customer data',
      'Financial reports',
      'Tax calculations'
    ]
  },
  {
    id: 'INT003',
    name: 'Twilio SMS Service',
    description: 'SMS notifications and customer communication',
    category: 'Communication',
    status: 'Disconnected',
    priority: 'Medium',
    provider: 'Twilio',
    version: 'v1.4.2',
    lastSync: '2024-01-14T16:45:00Z',
    nextSync: '2024-01-15T16:00:00Z',
    apiCalls: 2156,
    successRate: 95.4,
    avgResponseTime: 0.5,
    createdBy: 'Marketing Team',
    createdAt: '2024-01-10T14:20:00Z',
    endpoints: [
      'POST /v1/Messages',
      'GET /v1/Messages/{sid}',
      'POST /v1/Verify/Services',
      'GET /v1/Accounts/{sid}/Usage'
    ],
    features: [
      'SMS sending',
      'Message tracking',
      'Delivery reports',
      'Phone verification'
    ]
  }
];

const integrationMetrics = {
  totalIntegrations: 28,
  connectedIntegrations: 25,
  disconnectedIntegrations: 3,
  totalApiCalls: 8947,
  averageSuccessRate: 97.5,
  averageResponseTime: 1.2,
  totalDataTransferred: 125000,
  activeWebhooks: 15
};

const apiEndpoints = [
  {
    name: 'Payment Processing',
    endpoint: '/api/v1/payments',
    method: 'POST',
    calls: 1247,
    successRate: 99.2,
    avgResponseTime: 0.8,
    status: 'Active'
  },
  {
    name: 'Inventory Sync',
    endpoint: '/api/v1/inventory',
    method: 'GET',
    calls: 892,
    successRate: 97.8,
    avgResponseTime: 1.2,
    status: 'Active'
  },
  {
    name: 'Customer Data',
    endpoint: '/api/v1/customers',
    method: 'GET',
    calls: 654,
    successRate: 98.5,
    avgResponseTime: 0.9,
    status: 'Active'
  },
  {
    name: 'Order Management',
    endpoint: '/api/v1/orders',
    method: 'POST',
    calls: 456,
    successRate: 96.2,
    avgResponseTime: 1.1,
    status: 'Active'
  }
];

const performanceData = [
  { month: 'Jan', apiCalls: 1200, successRate: 97.5, responseTime: 1.2 },
  { month: 'Feb', apiCalls: 1350, successRate: 98.1, responseTime: 1.1 },
  { month: 'Mar', apiCalls: 1500, successRate: 98.3, responseTime: 1.0 },
  { month: 'Apr', apiCalls: 1420, successRate: 97.8, responseTime: 1.1 },
  { month: 'May', apiCalls: 1680, successRate: 98.5, responseTime: 0.9 },
  { month: 'Jun', apiCalls: 1890, successRate: 98.7, responseTime: 0.8 }
];

export default function ThirdPartyIntegrations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('integrations');
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
  const [showIntegrationForm, setShowIntegrationForm] = useState(false);

  // Filter integrations
  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || integration.status === selectedStatus;
    const matchesCategory = selectedCategory === 'All' || integration.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected': return 'bg-green-100 text-green-800';
      case 'Disconnected': return 'bg-red-100 text-red-800';
      case 'Connecting': return 'bg-yellow-100 text-yellow-800';
      case 'Error': return 'bg-orange-100 text-orange-800';
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

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 98) return 'text-green-600';
    if (rate >= 95) return 'text-yellow-600';
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
              Third-Party Integrations
            </h1>
            <p className="text-gray-600 mt-2">API management and system connections</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowIntegrationForm(true)}
              className="bg-slate-600 hover:bg-slate-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Integration
            </Button>
            <Button
              variant="outline"
              className="border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
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

        {/* Integration Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Integrations',
              value: integrationMetrics.totalIntegrations.toString(),
              change: '+12.5%',
              trend: 'up',
              icon: Network,
              color: 'from-slate-500 to-gray-500'
            },
            {
              title: 'Connected',
              value: integrationMetrics.connectedIntegrations.toString(),
              change: '+8.3%',
              trend: 'up',
              icon: CheckCircle,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'API Calls',
              value: integrationMetrics.totalApiCalls.toLocaleString(),
              change: '+22.1%',
              trend: 'up',
              icon: Activity,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Success Rate',
              value: `${integrationMetrics.averageSuccessRate}%`,
              change: '+1.2%',
              trend: 'up',
              icon: TrendingUp,
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
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="integrations" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Network className="w-5 h-5 text-slate-600" />
                    <span>Integration Management</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search integrations..."
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
                        <SelectItem value="Connected">Connected</SelectItem>
                        <SelectItem value="Disconnected">Disconnected</SelectItem>
                        <SelectItem value="Connecting">Connecting</SelectItem>
                        <SelectItem value="Error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Categories</SelectItem>
                        <SelectItem value="Payment">Payment</SelectItem>
                        <SelectItem value="Accounting">Accounting</SelectItem>
                        <SelectItem value="Communication">Communication</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredIntegrations.map((integration, index) => (
                    <motion.div
                      key={integration.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedIntegration(integration)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                          <Network className="w-6 h-6 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                            <Badge className={getStatusColor(integration.status)}>
                              {integration.status}
                            </Badge>
                            <Badge className={getPriorityColor(integration.priority)}>
                              {integration.priority}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {integration.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{integration.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Provider: {integration.provider}</span>
                            <span className="text-sm text-gray-600">Version: {integration.version}</span>
                            <span className="text-sm text-gray-600">Last Sync: {formatTimeAgo(integration.lastSync)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className={`font-semibold ${getSuccessRateColor(integration.successRate)}`}>
                            {integration.successRate}%
                          </p>
                          <p className="text-sm text-gray-600">Success Rate</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{integration.apiCalls}</p>
                          <p className="text-sm text-gray-600">API Calls</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{integration.avgResponseTime}s</p>
                          <p className="text-sm text-gray-600">Avg Response</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedIntegration(integration);
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

          <TabsContent value="endpoints" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GitBranch className="w-5 h-5 text-slate-600" />
                  <span>API Endpoints</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiEndpoints.map((endpoint, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                          <GitBranch className="w-6 h-6 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{endpoint.name}</h3>
                            <Badge className="bg-green-100 text-green-800">
                              {endpoint.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {endpoint.method}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{endpoint.endpoint}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Calls: {endpoint.calls}</span>
                            <span className="text-sm text-gray-600">Success: {endpoint.successRate}%</span>
                            <span className="text-sm text-gray-600">Response: {endpoint.avgResponseTime}s</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{endpoint.calls}</p>
                          <p className="text-sm text-gray-600">Total Calls</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${getSuccessRateColor(endpoint.successRate)}`}>
                            {endpoint.successRate}%
                          </p>
                          <p className="text-sm text-gray-600">Success Rate</p>
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
                    <span>Integration Performance</span>
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
                      <Line type="monotone" dataKey="apiCalls" stroke="#475569" strokeWidth={3} />
                      <Line type="monotone" dataKey="successRate" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="responseTime" stroke="#3b82f6" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Integration Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total API Calls</span>
                      <span className="font-bold text-slate-600">{integrationMetrics.totalApiCalls.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Success Rate</span>
                      <span className="font-bold text-green-600">{integrationMetrics.averageSuccessRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Response Time</span>
                      <span className="font-bold text-blue-600">{integrationMetrics.averageResponseTime}s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Data Transferred</span>
                      <span className="font-bold text-purple-600">{integrationMetrics.totalDataTransferred.toLocaleString()} MB</span>
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
                  <Settings className="w-5 h-5 text-slate-600" />
                  <span>Integration Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="autoSync">Auto Sync</Label>
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
                      <Label htmlFor="syncFrequency">Sync Frequency</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="retryAttempts">Retry Attempts</Label>
                      <Input id="retryAttempts" type="number" placeholder="3" />
                    </div>
                    <div>
                      <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                      <Input id="timeout" type="number" placeholder="30" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button>
                      <Settings className="w-4 h-4 mr-2" />
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

        {/* Integration Detail Modal */}
        <Dialog open={!!selectedIntegration} onOpenChange={() => setSelectedIntegration(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Network className="w-5 h-5 text-slate-600" />
                <span>Integration Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedIntegration && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                    <Network className="w-10 h-10 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedIntegration.name}</h2>
                      <Badge className={getStatusColor(selectedIntegration.status)}>
                        {selectedIntegration.status}
                      </Badge>
                      <Badge className={getPriorityColor(selectedIntegration.priority)}>
                        {selectedIntegration.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">{selectedIntegration.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Provider</Label>
                        <p className="font-semibold">{selectedIntegration.provider}</p>
                      </div>
                      <div>
                        <Label>Version</Label>
                        <p className="font-semibold">{selectedIntegration.version}</p>
                      </div>
                      <div>
                        <Label>Success Rate</Label>
                        <p className="font-semibold">{selectedIntegration.successRate}%</p>
                      </div>
                      <div>
                        <Label>API Calls</Label>
                        <p className="font-semibold">{selectedIntegration.apiCalls}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">API Endpoints</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedIntegration.endpoints.map((endpoint: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-mono">{endpoint}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedIntegration.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-blue-600" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedIntegration(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Integration
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Integration Modal */}
        <Dialog open={showIntegrationForm} onOpenChange={setShowIntegrationForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-slate-600" />
                <span>Add New Integration</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="integrationName">Integration Name</Label>
                  <Input id="integrationName" placeholder="Enter integration name" />
                </div>
                <div>
                  <Label htmlFor="integrationCategory">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Payment">Payment</SelectItem>
                      <SelectItem value="Accounting">Accounting</SelectItem>
                      <SelectItem value="Communication">Communication</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="integrationProvider">Provider</Label>
                  <Input id="integrationProvider" placeholder="Enter provider name" />
                </div>
                <div>
                  <Label htmlFor="integrationPriority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="integrationDescription">Description</Label>
                <Textarea id="integrationDescription" placeholder="Enter integration description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowIntegrationForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Integration
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}