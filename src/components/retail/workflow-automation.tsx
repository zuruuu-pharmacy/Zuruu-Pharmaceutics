"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Settings, Play, Pause, Square, RotateCcw, RefreshCw, CheckCircle, XCircle,
  AlertTriangle, Clock, Calendar, User, Users, Target, Shield, Database, Network,
  Cpu, Brain, Activity, TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus,
  Percent, Tag, MapPin, ShoppingCart, Package, Smartphone, Globe, Wifi,
  Layers, Archive, Truck, Box, Megaphone, Building, Clipboard, BookOpen, Scale,
  Gavel, Lock, Key, CheckSquare, Square as SquareIcon, Play as PlayIcon, Pause as PauseIcon,
  Square as SquareIcon2, Send, Share2, Image, Video, FileText, Printer, BarChart3,
  PieChart, LineChart, Activity as ActivityIcon, Search, Filter, Plus, Edit, Trash2,
  Eye, Download, Upload, Save, Bell, DollarSign, Star, Heart, Award
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

// Workflow automation data simulation
const workflows = [
  {
    id: 'WF001',
    name: 'Prescription Processing',
    description: 'Automated prescription validation and processing workflow',
    status: 'Active',
    priority: 'High',
    category: 'Prescription',
    trigger: 'New prescription received',
    actions: [
      'Validate prescription details',
      'Check drug interactions',
      'Verify insurance coverage',
      'Generate prescription label',
      'Send notification to pharmacist'
    ],
    conditions: [
      'Prescription is valid',
      'Patient has insurance',
      'Drug is in stock'
    ],
    lastRun: '2024-01-15T14:30:00Z',
    nextRun: '2024-01-15T15:00:00Z',
    successRate: 94.5,
    totalRuns: 1247,
    avgExecutionTime: 2.3,
    createdBy: 'Dr. Smith',
    createdAt: '2024-01-01T09:00:00Z'
  },
  {
    id: 'WF002',
    name: 'Inventory Reorder',
    description: 'Automated inventory reordering based on stock levels',
    status: 'Active',
    priority: 'Medium',
    category: 'Inventory',
    trigger: 'Stock level below threshold',
    actions: [
      'Check current stock levels',
      'Calculate reorder quantity',
      'Generate purchase order',
      'Send order to supplier',
      'Update inventory records'
    ],
    conditions: [
      'Stock level < minimum threshold',
      'Supplier is available',
      'Budget allows purchase'
    ],
    lastRun: '2024-01-15T10:15:00Z',
    nextRun: '2024-01-16T10:00:00Z',
    successRate: 89.2,
    totalRuns: 892,
    avgExecutionTime: 1.8,
    createdBy: 'Lisa Wang',
    createdAt: '2024-01-05T11:30:00Z'
  },
  {
    id: 'WF003',
    name: 'Customer Notification',
    description: 'Automated customer notifications for prescription ready',
    status: 'Active',
    priority: 'Low',
    category: 'Communication',
    trigger: 'Prescription ready for pickup',
    actions: [
      'Check customer preferences',
      'Send SMS notification',
      'Send email notification',
      'Update customer record',
      'Log notification sent'
    ],
    conditions: [
      'Prescription is ready',
      'Customer has valid contact info',
      'Notification preferences set'
    ],
    lastRun: '2024-01-15T16:45:00Z',
    nextRun: '2024-01-15T17:00:00Z',
    successRate: 97.8,
    totalRuns: 2156,
    avgExecutionTime: 0.5,
    createdBy: 'John Davis',
    createdAt: '2024-01-10T14:20:00Z'
  }
];

const automationRules = [
  {
    id: 'RULE001',
    name: 'Low Stock Alert',
    description: 'Send alert when stock falls below minimum threshold',
    trigger: 'Stock level < 10',
    action: 'Send email to manager',
    status: 'Active',
    category: 'Inventory',
    frequency: 'Real-time',
    lastTriggered: '2024-01-15T09:30:00Z',
    triggerCount: 23
  },
  {
    id: 'RULE002',
    name: 'Prescription Expiry',
    description: 'Notify customer when prescription is about to expire',
    trigger: 'Prescription expires in 7 days',
    action: 'Send SMS and email reminder',
    status: 'Active',
    category: 'Prescription',
    frequency: 'Daily',
    lastTriggered: '2024-01-15T08:00:00Z',
    triggerCount: 45
  },
  {
    id: 'RULE003',
    name: 'Payment Failure',
    description: 'Handle failed payment attempts automatically',
    trigger: 'Payment failed',
    action: 'Retry payment and notify customer',
    status: 'Active',
    category: 'Billing',
    frequency: 'Real-time',
    lastTriggered: '2024-01-15T11:20:00Z',
    triggerCount: 12
  }
];

const workflowMetrics = {
  totalWorkflows: 15,
  activeWorkflows: 12,
  pausedWorkflows: 3,
  totalExecutions: 8947,
  successRate: 92.3,
  avgExecutionTime: 1.8,
  totalRules: 28,
  activeRules: 25
};

const executionData = [
  { month: 'Jan', executions: 1200, success: 1104, failed: 96 },
  { month: 'Feb', executions: 1350, success: 1242, failed: 108 },
  { month: 'Mar', executions: 1500, success: 1380, failed: 120 },
  { month: 'Apr', executions: 1420, success: 1306, failed: 114 },
  { month: 'May', executions: 1680, success: 1546, failed: 134 },
  { month: 'Jun', executions: 1890, success: 1742, failed: 148 }
];

export default function WorkflowAutomation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('workflows');
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  const [showWorkflowForm, setShowWorkflowForm] = useState(false);

  // Filter workflows
  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || workflow.status === selectedStatus;
    const matchesCategory = selectedCategory === 'All' || workflow.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Stopped': return 'bg-red-100 text-red-800';
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
    if (rate >= 95) return 'text-green-600';
    if (rate >= 90) return 'text-yellow-600';
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
              Workflow Automation
            </h1>
            <p className="text-gray-600 mt-2">Automated process management and task orchestration</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowWorkflowForm(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Workflow
            </Button>
            <Button
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
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

        {/* Automation Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Workflows',
              value: workflowMetrics.totalWorkflows.toString(),
              change: '+15.2%',
              trend: 'up',
              icon: Zap,
              color: 'from-purple-500 to-violet-500'
            },
            {
              title: 'Active Workflows',
              value: workflowMetrics.activeWorkflows.toString(),
              change: '+8.7%',
              trend: 'up',
              icon: Play,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Success Rate',
              value: `${workflowMetrics.successRate}%`,
              change: '+2.1%',
              trend: 'up',
              icon: CheckCircle,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Total Executions',
              value: workflowMetrics.totalExecutions.toLocaleString(),
              change: '+22.5%',
              trend: 'up',
              icon: Activity,
              color: 'from-orange-500 to-red-500'
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
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="executions">Executions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <span>Automation Workflows</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search workflows..."
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
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Paused">Paused</SelectItem>
                        <SelectItem value="Stopped">Stopped</SelectItem>
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
                        <SelectItem value="Communication">Communication</SelectItem>
                        <SelectItem value="Billing">Billing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredWorkflows.map((workflow, index) => (
                    <motion.div
                      key={workflow.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedWorkflow(workflow)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Zap className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{workflow.name}</h3>
                            <Badge className={getStatusColor(workflow.status)}>
                              {workflow.status}
                            </Badge>
                            <Badge className={getPriorityColor(workflow.priority)}>
                              {workflow.priority}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {workflow.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{workflow.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Trigger: {workflow.trigger}</span>
                            <span className="text-sm text-gray-600">Last Run: {formatTimeAgo(workflow.lastRun)}</span>
                            <span className="text-sm text-gray-600">Created: {workflow.createdBy}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className={`font-semibold ${getSuccessRateColor(workflow.successRate)}`}>
                            {workflow.successRate}%
                          </p>
                          <p className="text-sm text-gray-600">Success Rate</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{workflow.totalRuns}</p>
                          <p className="text-sm text-gray-600">Total Runs</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{workflow.avgExecutionTime}s</p>
                          <p className="text-sm text-gray-600">Avg Time</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedWorkflow(workflow);
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

          <TabsContent value="rules" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  <span>Automation Rules</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {automationRules.map((rule, index) => (
                    <motion.div
                      key={rule.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Settings className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{rule.name}</h3>
                            <Badge className="bg-green-100 text-green-800">
                              {rule.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {rule.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Trigger: {rule.trigger}</span>
                            <span className="text-sm text-gray-600">Action: {rule.action}</span>
                            <span className="text-sm text-gray-600">Frequency: {rule.frequency}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{rule.triggerCount}</p>
                          <p className="text-sm text-gray-600">Triggers</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{formatTimeAgo(rule.lastTriggered)}</p>
                          <p className="text-sm text-gray-600">Last Triggered</p>
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

          <TabsContent value="executions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-purple-600" />
                    <span>Execution Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={executionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="executions" stroke="#8b5cf6" strokeWidth={3} />
                      <Line type="monotone" dataKey="success" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={3} />
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
                      <span className="text-gray-600">Total Executions</span>
                      <span className="font-bold text-purple-600">{workflowMetrics.totalExecutions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-bold text-green-600">{workflowMetrics.successRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Execution Time</span>
                      <span className="font-bold text-blue-600">{workflowMetrics.avgExecutionTime}s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active Rules</span>
                      <span className="font-bold text-orange-600">{workflowMetrics.activeRules}</span>
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
                  <Settings className="w-5 h-5 text-purple-600" />
                  <span>Automation Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="autoExecution">Auto Execution</Label>
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
                      <Label htmlFor="maxConcurrent">Max Concurrent Executions</Label>
                      <Input id="maxConcurrent" type="number" placeholder="10" />
                    </div>
                    <div>
                      <Label htmlFor="retryAttempts">Retry Attempts</Label>
                      <Input id="retryAttempts" type="number" placeholder="3" />
                    </div>
                    <div>
                      <Label htmlFor="timeout">Execution Timeout (seconds)</Label>
                      <Input id="timeout" type="number" placeholder="300" />
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

        {/* Workflow Detail Modal */}
        <Dialog open={!!selectedWorkflow} onOpenChange={() => setSelectedWorkflow(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-purple-600" />
                <span>Workflow Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedWorkflow && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                    <Zap className="w-10 h-10 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedWorkflow.name}</h2>
                      <Badge className={getStatusColor(selectedWorkflow.status)}>
                        {selectedWorkflow.status}
                      </Badge>
                      <Badge className={getPriorityColor(selectedWorkflow.priority)}>
                        {selectedWorkflow.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">{selectedWorkflow.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Trigger</Label>
                        <p className="font-semibold">{selectedWorkflow.trigger}</p>
                      </div>
                      <div>
                        <Label>Category</Label>
                        <p className="font-semibold">{selectedWorkflow.category}</p>
                      </div>
                      <div>
                        <Label>Success Rate</Label>
                        <p className="font-semibold">{selectedWorkflow.successRate}%</p>
                      </div>
                      <div>
                        <Label>Total Runs</Label>
                        <p className="font-semibold">{selectedWorkflow.totalRuns}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedWorkflow.actions.map((action: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm">{action}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Conditions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedWorkflow.conditions.map((condition: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm">{condition}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedWorkflow(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Workflow
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Workflow Modal */}
        <Dialog open={showWorkflowForm} onOpenChange={setShowWorkflowForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-purple-600" />
                <span>Create New Workflow</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workflowName">Workflow Name</Label>
                  <Input id="workflowName" placeholder="Enter workflow name" />
                </div>
                <div>
                  <Label htmlFor="workflowCategory">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Prescription">Prescription</SelectItem>
                      <SelectItem value="Inventory">Inventory</SelectItem>
                      <SelectItem value="Communication">Communication</SelectItem>
                      <SelectItem value="Billing">Billing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="workflowTrigger">Trigger</Label>
                  <Input id="workflowTrigger" placeholder="Enter trigger condition" />
                </div>
                <div>
                  <Label htmlFor="workflowPriority">Priority</Label>
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
                <Label htmlFor="workflowDescription">Description</Label>
                <Textarea id="workflowDescription" placeholder="Enter workflow description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowWorkflowForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Workflow
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}