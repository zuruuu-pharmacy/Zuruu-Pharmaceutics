"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Workflow, Zap, Brain, Cpu, Target, TrendingUp, TrendingDown, ArrowUp, ArrowDown,
  Minus, Percent, Tag, MapPin, ShoppingCart, Package, Globe, Wifi, Layers, Archive,
  Truck, Box, Megaphone, Building, Clipboard, BookOpen, Scale, Gavel, Lock, Key,
  CheckSquare, Square, Play, Pause, Send, Share2, Image, Video, FileText, Printer,
  BarChart3, PieChart, LineChart, Activity, Search, Filter, Plus, Edit, Trash2, Eye,
  Download, Upload, Settings, Bell, RefreshCw, RotateCcw, QrCode, ScanLine, Barcode,
  Database, Network, CheckCircle, XCircle, AlertTriangle, Clock, Calendar, User, Users,
  Star, Award, Phone, Mail, MessageSquare, Camera, Mic, Headphones, Volume2, VolumeX,
  Wifi as WifiIcon, Battery, Signal, Bluetooth, Hospital, UserCheck, UserPlus,
  UserMinus, UserX, UserEdit, UserSearch, UserSettings, Map, Navigation, Compass,
  Home, Building2, Ambulance, Siren, Zap as ZapIcon, Flame, Skull, Cross, FirstAid,
  Heart, Shield, Stethoscope, Monitor, HardDrive, Wrench, Tool, Cog, Power, PowerOff,
  AlertCircle, DollarSign, Target as TargetIcon, Pill, Syringe, Microscope, TestTube,
  Beaker, Flask, Droplet, Thermometer, Bandage, X, Plus as PlusIcon, Truck, Warehouse,
  ShoppingCart as ShoppingCartIcon, GitBranch, GitCommit, GitMerge, GitPullRequest
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

// Workflow optimization data simulation
const optimizationMetrics = {
  totalWorkflows: 45,
  optimizedWorkflows: 38,
  pendingOptimization: 7,
  averageEfficiency: 87.3,
  timeSaved: 1240,
  costReduction: 15.8,
  automationRate: 72.5,
  aiAccuracy: 94.2
};

const workflowProcesses = [
  {
    id: 'WF001',
    name: 'Patient Admission',
    department: 'Emergency',
    status: 'Optimized',
    efficiency: 92.5,
    timeSaved: 45,
    costReduction: 12.3,
    automation: 85,
    lastOptimized: '2024-01-10T00:00:00Z',
    nextReview: '2024-04-10T00:00:00Z',
    responsible: 'Dr. Sarah Johnson',
    steps: 8,
    bottlenecks: 1,
    priority: 'High'
  },
  {
    id: 'WF002',
    name: 'Medication Dispensing',
    department: 'Pharmacy',
    status: 'In Progress',
    efficiency: 78.2,
    timeSaved: 23,
    costReduction: 8.7,
    automation: 65,
    lastOptimized: '2024-01-05T00:00:00Z',
    nextReview: '2024-03-05T00:00:00Z',
    responsible: 'Pharmacy Manager',
    steps: 12,
    bottlenecks: 3,
    priority: 'Medium'
  },
  {
    id: 'WF003',
    name: 'Lab Results Processing',
    department: 'Laboratory',
    status: 'Needs Optimization',
    efficiency: 65.8,
    timeSaved: 8,
    costReduction: 3.2,
    automation: 45,
    lastOptimized: '2023-12-15T00:00:00Z',
    nextReview: '2024-02-15T00:00:00Z',
    responsible: 'Lab Director',
    steps: 15,
    bottlenecks: 5,
    priority: 'Critical'
  }
];

const aiRecommendations = [
  {
    id: 'REC001',
    type: 'Process Automation',
    title: 'Automate Patient Check-in',
    description: 'Implement AI-powered patient check-in system to reduce wait times',
    impact: 'High',
    effort: 'Medium',
    timeframe: '6 weeks',
    savings: 35,
    confidence: 89.2,
    status: 'Pending',
    department: 'Emergency',
    responsible: 'IT Director'
  },
  {
    id: 'REC002',
    type: 'Resource Optimization',
    title: 'Optimize Staff Scheduling',
    description: 'Use AI to predict patient flow and optimize staff allocation',
    impact: 'Medium',
    effort: 'Low',
    timeframe: '4 weeks',
    savings: 18,
    confidence: 92.5,
    status: 'In Progress',
    department: 'All',
    responsible: 'HR Director'
  },
  {
    id: 'REC003',
    type: 'Cost Reduction',
    title: 'Streamline Supply Chain',
    description: 'Implement predictive analytics for medical supply management',
    impact: 'High',
    effort: 'High',
    timeframe: '12 weeks',
    savings: 45,
    confidence: 87.3,
    status: 'Planning',
    department: 'Procurement',
    responsible: 'Supply Chain Manager'
  }
];

const performanceData = [
  { month: 'Jan', efficiency: 82.5, timeSaved: 180, costReduction: 8.2, automation: 65 },
  { month: 'Feb', efficiency: 85.2, timeSaved: 195, costReduction: 9.1, automation: 68 },
  { month: 'Mar', efficiency: 87.8, timeSaved: 210, costReduction: 10.3, automation: 72 },
  { month: 'Apr', efficiency: 89.1, timeSaved: 225, costReduction: 11.5, automation: 75 },
  { month: 'May', efficiency: 91.3, timeSaved: 240, costReduction: 12.8, automation: 78 },
  { month: 'Jun', efficiency: 87.3, timeSaved: 255, costReduction: 15.8, automation: 72 }
];

const departmentEfficiency = [
  { department: 'Emergency', efficiency: 92.5, automation: 85, timeSaved: 45, costReduction: 12.3 },
  { department: 'ICU', efficiency: 88.7, automation: 78, timeSaved: 38, costReduction: 10.8 },
  { department: 'Surgery', efficiency: 91.2, automation: 82, timeSaved: 42, costReduction: 11.5 },
  { department: 'Pharmacy', efficiency: 78.2, automation: 65, timeSaved: 23, costReduction: 8.7 },
  { department: 'Laboratory', efficiency: 65.8, automation: 45, timeSaved: 8, costReduction: 3.2 }
];

const automationRules = [
  {
    id: 'RULE001',
    name: 'Auto Patient Assignment',
    type: 'Patient Flow',
    status: 'Active',
    triggers: 1247,
    successRate: 94.2,
    lastTriggered: '2024-01-17T14:30:00Z',
    createdBy: 'Dr. Sarah Johnson',
    department: 'Emergency',
    description: 'Automatically assign patients to available beds based on priority and medical needs'
  },
  {
    id: 'RULE002',
    name: 'Medication Alerts',
    type: 'Safety',
    status: 'Active',
    triggers: 892,
    successRate: 96.8,
    lastTriggered: '2024-01-17T16:20:00Z',
    createdBy: 'Pharmacy Manager',
    department: 'Pharmacy',
    description: 'Send alerts for drug interactions and dosage adjustments'
  },
  {
    id: 'RULE003',
    name: 'Supply Reorder',
    type: 'Inventory',
    status: 'Active',
    triggers: 456,
    successRate: 91.5,
    lastTriggered: '2024-01-17T09:15:00Z',
    createdBy: 'Supply Chain Manager',
    department: 'Procurement',
    description: 'Automatically reorder medical supplies when stock levels are low'
  }
];

export default function WorkflowOptimization() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [activeTab, setActiveTab] = useState('workflows');
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  const [showWorkflowForm, setShowWorkflowForm] = useState(false);

  // Filter workflows
  const filteredWorkflows = workflowProcesses.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.responsible.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || workflow.status === selectedStatus;
    const matchesPriority = selectedPriority === 'All' || workflow.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Optimized': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Needs Optimization': return 'bg-red-100 text-red-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Planning': return 'bg-blue-100 text-blue-800';
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Workflow Optimization
            </h1>
            <p className="text-gray-600 mt-2">AI-powered process optimization and automation</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowWorkflowForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Workflow
            </Button>
            <Button
              variant="outline"
              className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button
              variant="outline"
              className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Optimization Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Workflows',
              value: optimizationMetrics.totalWorkflows.toString(),
              change: '+8.5%',
              trend: 'up',
              icon: Workflow,
              color: 'from-indigo-500 to-blue-500'
            },
            {
              title: 'Average Efficiency',
              value: `${optimizationMetrics.averageEfficiency}%`,
              change: '+3.2%',
              trend: 'up',
              icon: TrendingUp,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Time Saved (hrs)',
              value: optimizationMetrics.timeSaved.toString(),
              change: '+15.8%',
              trend: 'up',
              icon: Clock,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Cost Reduction',
              value: `${optimizationMetrics.costReduction}%`,
              change: '+2.1%',
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
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Workflow className="w-5 h-5 text-indigo-600" />
                    <span>Workflow Processes</span>
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
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Optimized">Optimized</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Needs Optimization">Needs Optimization</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Priority</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
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
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Workflow className="w-6 h-6 text-indigo-600" />
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
                              {workflow.department}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Responsible: {workflow.responsible} | Steps: {workflow.steps} | Bottlenecks: {workflow.bottlenecks}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Efficiency: {workflow.efficiency}%</span>
                            <span className="text-sm text-gray-600">Time Saved: {workflow.timeSaved}min</span>
                            <span className="text-sm text-gray-600">Cost Reduction: {workflow.costReduction}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{workflow.efficiency}%</p>
                          <p className="text-sm text-gray-600">Efficiency</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{workflow.timeSaved}min</p>
                          <p className="text-sm text-gray-600">Time Saved</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{workflow.costReduction}%</p>
                          <p className="text-sm text-gray-600">Cost Reduction</p>
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

          <TabsContent value="recommendations" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-indigo-600" />
                  <span>AI Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiRecommendations.map((recommendation, index) => (
                    <motion.div
                      key={recommendation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Brain className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{recommendation.title}</h3>
                            <Badge className={getImpactColor(recommendation.impact)}>
                              {recommendation.impact} Impact
                            </Badge>
                            <Badge className={getStatusColor(recommendation.status)}>
                              {recommendation.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {recommendation.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{recommendation.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Confidence: {recommendation.confidence}%</span>
                            <span className="text-sm text-gray-600">Timeframe: {recommendation.timeframe}</span>
                            <span className="text-sm text-gray-600">Savings: {recommendation.savings}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{recommendation.confidence}%</p>
                          <p className="text-sm text-gray-600">Confidence</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{recommendation.savings}%</p>
                          <p className="text-sm text-gray-600">Savings</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{recommendation.status}</p>
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

          <TabsContent value="automation" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-indigo-600" />
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
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Zap className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{rule.name}</h3>
                            <Badge className={getStatusColor(rule.status)}>
                              {rule.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {rule.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Triggers: {rule.triggers}</span>
                            <span className="text-sm text-gray-600">Success Rate: {rule.successRate}%</span>
                            <span className="text-sm text-gray-600">Department: {rule.department}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{rule.triggers}</p>
                          <p className="text-sm text-gray-600">Triggers</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{rule.successRate}%</p>
                          <p className="text-sm text-gray-600">Success Rate</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{rule.status}</p>
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
                    <LineChart className="w-5 h-5 text-indigo-600" />
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
                      <Line type="monotone" dataKey="efficiency" stroke="#6366f1" strokeWidth={3} />
                      <Line type="monotone" dataKey="timeSaved" stroke="#3b82f6" strokeWidth={3} />
                      <Line type="monotone" dataKey="costReduction" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="automation" stroke="#f59e0b" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-indigo-600" />
                    <span>Department Efficiency</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={departmentEfficiency}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="efficiency" fill="#6366f1" />
                      <Bar dataKey="automation" fill="#3b82f6" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <span>Optimization Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Workflows</span>
                      <span className="font-bold text-indigo-600">{optimizationMetrics.totalWorkflows}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Optimized</span>
                      <span className="font-bold text-green-600">{optimizationMetrics.optimizedWorkflows}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pending</span>
                      <span className="font-bold text-yellow-600">{optimizationMetrics.pendingOptimization}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Efficiency</span>
                      <span className="font-bold text-blue-600">{optimizationMetrics.averageEfficiency}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <span>Automation Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Automation Rate</span>
                      <span className="font-bold text-blue-600">{optimizationMetrics.automationRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">AI Accuracy</span>
                      <span className="font-bold text-green-600">{optimizationMetrics.aiAccuracy}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Time Saved</span>
                      <span className="font-bold text-orange-600">{optimizationMetrics.timeSaved}h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cost Reduction</span>
                      <span className="font-bold text-green-600">{optimizationMetrics.costReduction}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <span>Performance Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Efficiency Gain</span>
                      <span className="font-bold text-green-600">+12.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Time Reduction</span>
                      <span className="font-bold text-blue-600">-18.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cost Savings</span>
                      <span className="font-bold text-green-600">-15.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">ROI</span>
                      <span className="font-bold text-purple-600">+245%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Workflow Detail Modal */}
        <Dialog open={!!selectedWorkflow} onOpenChange={() => setSelectedWorkflow(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Workflow className="w-5 h-5 text-indigo-600" />
                <span>Workflow Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedWorkflow && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Workflow className="w-10 h-10 text-indigo-600" />
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
                    <p className="text-gray-700 mb-4">Department: {selectedWorkflow.department} | Responsible: {selectedWorkflow.responsible}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Efficiency</Label>
                        <p className="font-semibold">{selectedWorkflow.efficiency}%</p>
                      </div>
                      <div>
                        <Label>Time Saved</Label>
                        <p className="font-semibold">{selectedWorkflow.timeSaved} minutes</p>
                      </div>
                      <div>
                        <Label>Cost Reduction</Label>
                        <p className="font-semibold">{selectedWorkflow.costReduction}%</p>
                      </div>
                      <div>
                        <Label>Automation</Label>
                        <p className="font-semibold">{selectedWorkflow.automation}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Workflow Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Steps</span>
                          <span className="font-semibold">{selectedWorkflow.steps}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Bottlenecks</span>
                          <span className="font-semibold">{selectedWorkflow.bottlenecks}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Last Optimized</span>
                          <span className="font-semibold">{formatTimeAgo(selectedWorkflow.lastOptimized)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Next Review</span>
                          <span className="font-semibold">{new Date(selectedWorkflow.nextReview).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Performance Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Efficiency</span>
                          <span className="font-semibold">{selectedWorkflow.efficiency}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Time Saved</span>
                          <span className="font-semibold">{selectedWorkflow.timeSaved} min</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Cost Reduction</span>
                          <span className="font-semibold">{selectedWorkflow.costReduction}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Automation</span>
                          <span className="font-semibold">{selectedWorkflow.automation}%</span>
                        </div>
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
                    Optimize Workflow
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
                <Plus className="w-5 h-5 text-indigo-600" />
                <span>New Workflow</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Workflow Name</Label>
                  <Input id="name" placeholder="Enter workflow name" />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="ICU">ICU</SelectItem>
                      <SelectItem value="Surgery">Surgery</SelectItem>
                      <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="Laboratory">Laboratory</SelectItem>
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
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="responsible">Responsible</Label>
                  <Input id="responsible" placeholder="Enter responsible person" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter workflow description" />
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