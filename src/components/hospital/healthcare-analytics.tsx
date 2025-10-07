"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3, TrendingUp, Brain, Cpu, Database, Activity, Target, Zap, Shield,
  TrendingDown, ArrowUp, ArrowDown, Minus, Percent, Tag, MapPin, ShoppingCart,
  Package, Globe, Wifi, Layers, Archive, Box, Megaphone, Building,
  Clipboard, BookOpen, Scale, Gavel, Lock, Key, CheckSquare, Square, Play,
  Pause, Send, Share2, Image, Video, FileText, Printer, PieChart, LineChart,
  Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings, Bell,
  RefreshCw, RotateCcw, QrCode, ScanLine, Barcode, Network, CheckCircle, XCircle,
  AlertTriangle, Clock, Calendar, User, Users, Star, Award, Phone, Mail,
  MessageSquare, Camera, Mic, Headphones, Volume2, VolumeX, Wifi as WifiIcon,
  Battery, Signal, Bluetooth, Hospital, UserCheck, UserPlus, UserMinus, UserX,
  UserSearch, Map, Navigation, Compass, Home, Building2,
  Ambulance, Siren, Zap as ZapIcon, Flame, Skull, Cross, Heart,
  Shield as ShieldIcon, Stethoscope, Monitor, HardDrive, Wrench, Cog,
  Power, PowerOff, AlertCircle, DollarSign, Target as TargetIcon, Pill, Syringe,
  Microscope, TestTube, Beaker, FlaskConical, Droplet, Thermometer, Bandage, X,
  Plus as PlusIcon, Truck, Warehouse, ShoppingCart as ShoppingCartIcon
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

// Healthcare analytics data simulation
const analyticsMetrics = {
  totalPatients: 1247,
  averageLOS: 4.2,
  readmissionRate: 12.5,
  patientSatisfaction: 94.8,
  costPerPatient: 8500,
  revenueGrowth: 8.5,
  efficiencyScore: 92.3,
  predictiveAccuracy: 89.7
};

const patientFlowData = [
  { month: 'Jan', admissions: 180, discharges: 175, readmissions: 22, satisfaction: 92.5 },
  { month: 'Feb', admissions: 195, discharges: 190, readmissions: 24, satisfaction: 93.8 },
  { month: 'Mar', admissions: 210, discharges: 205, readmissions: 26, satisfaction: 94.2 },
  { month: 'Apr', admissions: 225, discharges: 220, readmissions: 28, satisfaction: 95.1 },
  { month: 'May', admissions: 240, discharges: 235, readmissions: 30, satisfaction: 94.8 },
  { month: 'Jun', admissions: 255, discharges: 250, readmissions: 32, satisfaction: 95.3 }
];

const departmentPerformance = [
  { department: 'Emergency', patients: 320, efficiency: 96.2, cost: 12000, satisfaction: 94.5 },
  { department: 'ICU', patients: 85, efficiency: 94.8, cost: 25000, satisfaction: 92.8 },
  { department: 'Surgery', patients: 180, efficiency: 98.1, cost: 18000, satisfaction: 96.2 },
  { department: 'Cardiology', patients: 120, efficiency: 95.5, cost: 15000, satisfaction: 93.8 },
  { department: 'Pediatrics', patients: 95, efficiency: 97.2, cost: 10000, satisfaction: 95.8 }
];

const predictiveInsights = [
  {
    id: 'INSIGHT001',
    type: 'Risk Prediction',
    title: 'High Readmission Risk',
    description: '15 patients identified with 85% readmission probability',
    confidence: 89.2,
    impact: 'High',
    recommendation: 'Implement enhanced discharge planning',
    affectedPatients: 15,
    timeframe: 'Next 30 days',
    status: 'Active'
  },
  {
    id: 'INSIGHT002',
    type: 'Resource Optimization',
    title: 'ICU Capacity Forecast',
    description: 'Predicted 20% increase in ICU demand next week',
    confidence: 92.5,
    impact: 'Medium',
    recommendation: 'Prepare additional ICU resources',
    affectedPatients: 45,
    timeframe: 'Next 7 days',
    status: 'Active'
  },
  {
    id: 'INSIGHT003',
    type: 'Cost Optimization',
    title: 'Supply Chain Efficiency',
    description: 'Potential 15% cost reduction in medical supplies',
    confidence: 87.3,
    impact: 'High',
    recommendation: 'Review supplier contracts',
    affectedPatients: 0,
    timeframe: 'Next 60 days',
    status: 'Planning'
  }
];

const aiModels = [
  {
    id: 'MODEL001',
    name: 'Readmission Prediction',
    type: 'Machine Learning',
    accuracy: 89.7,
    lastTrained: '2024-01-10T00:00:00Z',
    predictions: 1247,
    status: 'Active',
    performance: 'Excellent',
    features: ['Patient Demographics', 'Medical History', 'Lab Results', 'Medications']
  },
  {
    id: 'MODEL002',
    name: 'Resource Demand Forecasting',
    type: 'Time Series',
    accuracy: 92.3,
    lastTrained: '2024-01-08T00:00:00Z',
    predictions: 890,
    status: 'Active',
    performance: 'Good',
    features: ['Historical Data', 'Seasonal Patterns', 'Patient Flow', 'Staff Availability']
  },
  {
    id: 'MODEL003',
    name: 'Cost Optimization',
    type: 'Optimization',
    accuracy: 85.1,
    lastTrained: '2024-01-05T00:00:00Z',
    predictions: 456,
    status: 'Training',
    performance: 'Improving',
    features: ['Cost Data', 'Utilization Rates', 'Efficiency Metrics', 'Quality Scores']
  }
];

const kpiData = [
  { metric: 'Patient Satisfaction', current: 94.8, target: 95.0, trend: 'up', change: '+1.2%' },
  { metric: 'Readmission Rate', current: 12.5, target: 10.0, trend: 'down', change: '-2.1%' },
  { metric: 'Average LOS', current: 4.2, target: 4.0, trend: 'down', change: '-0.3%' },
  { metric: 'Cost per Patient', current: 8500, target: 8000, trend: 'down', change: '-3.5%' },
  { metric: 'Revenue Growth', current: 8.5, target: 10.0, trend: 'up', change: '+2.8%' },
  { metric: 'Efficiency Score', current: 92.3, target: 95.0, trend: 'up', change: '+1.8%' }
];

const realTimeData = [
  { time: '00:00', patients: 45, occupancy: 78, alerts: 2 },
  { time: '04:00', patients: 38, occupancy: 65, alerts: 1 },
  { time: '08:00', patients: 52, occupancy: 89, alerts: 3 },
  { time: '12:00', patients: 48, occupancy: 82, alerts: 2 },
  { time: '16:00', patients: 55, occupancy: 95, alerts: 4 },
  { time: '20:00', patients: 42, occupancy: 72, alerts: 1 }
];

export default function HealthcareAnalytics() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedImpact, setSelectedImpact] = useState('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedInsight, setSelectedInsight] = useState<any>(null);
  const [showInsightForm, setShowInsightForm] = useState(false);

  // Filter insights
  const filteredInsights = predictiveInsights.filter(insight => {
    const matchesSearch = insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         insight.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         insight.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || insight.type === selectedType;
    const matchesImpact = selectedImpact === 'All' || insight.impact === selectedImpact;
    return matchesSearch && matchesType && matchesImpact;
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
      case 'Training': return 'bg-blue-100 text-blue-800';
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Healthcare Analytics
            </h1>
            <p className="text-gray-600 mt-2">Advanced data visualization and predictive insights</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowInsightForm(true)}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Insight
            </Button>
            <Button
              variant="outline"
              className="border-violet-200 text-violet-600 hover:bg-violet-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button
              variant="outline"
              className="border-violet-200 text-violet-600 hover:bg-violet-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Analytics Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Patients',
              value: analyticsMetrics.totalPatients.toString(),
              change: '+12.5%',
              trend: 'up',
              icon: Users,
              color: 'from-violet-500 to-purple-500'
            },
            {
              title: 'Patient Satisfaction',
              value: `${analyticsMetrics.patientSatisfaction}%`,
              change: '+2.1%',
              trend: 'up',
              icon: Heart,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Predictive Accuracy',
              value: `${analyticsMetrics.predictiveAccuracy}%`,
              change: '+3.5%',
              trend: 'up',
              icon: Brain,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Efficiency Score',
              value: `${analyticsMetrics.efficiencyScore}%`,
              change: '+1.8%',
              trend: 'up',
              icon: Target,
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
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="models">AI Models</TabsTrigger>
            <TabsTrigger value="realtime">Real-time</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-violet-600" />
                    <span>Patient Flow Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={patientFlowData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="admissions" stroke="#8b5cf6" strokeWidth={3} />
                      <Line type="monotone" dataKey="discharges" stroke="#3b82f6" strokeWidth={3} />
                      <Line type="monotone" dataKey="readmissions" stroke="#ef4444" strokeWidth={3} />
                      <Line type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Department Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={departmentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="efficiency" fill="#8b5cf6" />
                      <Bar dataKey="satisfaction" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kpiData.map((kpi, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg">{kpi.metric}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-gray-900">{kpi.current}</span>
                          <span className="text-sm text-gray-600">Target: {kpi.target}</span>
                        </div>
                        <Progress value={(kpi.current / kpi.target) * 100} className="w-full" />
                        <div className="flex justify-between items-center">
                          <span className={`text-sm font-medium ${getTrendColor(kpi.trend)}`}>
                            {kpi.change}
                          </span>
                          <span className="text-sm text-gray-600">vs Target</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-violet-600" />
                    <span>Predictive Insights</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search insights..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Types</SelectItem>
                        <SelectItem value="Risk Prediction">Risk Prediction</SelectItem>
                        <SelectItem value="Resource Optimization">Resource Optimization</SelectItem>
                        <SelectItem value="Cost Optimization">Cost Optimization</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedImpact} onValueChange={setSelectedImpact}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Impact" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Impact</SelectItem>
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
                  {filteredInsights.map((insight, index) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedInsight(insight)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                          <Brain className="w-6 h-6 text-violet-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                            <Badge className={getImpactColor(insight.impact)}>
                              {insight.impact} Impact
                            </Badge>
                            <Badge className={getStatusColor(insight.status)}>
                              {insight.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {insight.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Confidence: {insight.confidence}%</span>
                            <span className="text-sm text-gray-600">Timeframe: {insight.timeframe}</span>
                            <span className="text-sm text-gray-600">Affected: {insight.affectedPatients}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{insight.confidence}%</p>
                          <p className="text-sm text-gray-600">Confidence</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{insight.affectedPatients}</p>
                          <p className="text-sm text-gray-600">Affected</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{insight.status}</p>
                          <p className="text-sm text-gray-600">Status</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedInsight(insight);
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

          <TabsContent value="models" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-violet-600" />
                  <span>AI Models</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiModels.map((model, index) => (
                    <motion.div
                      key={model.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                          <Cpu className="w-6 h-6 text-violet-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{model.name}</h3>
                            <Badge className={getStatusColor(model.status)}>
                              {model.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {model.type}
                            </Badge>
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              {model.performance}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Accuracy: {model.accuracy}% | Predictions: {model.predictions}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Last Trained: {formatTimeAgo(model.lastTrained)}</span>
                            <span className="text-sm text-gray-600">Features: {model.features.length}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{model.accuracy}%</p>
                          <p className="text-sm text-gray-600">Accuracy</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{model.predictions}</p>
                          <p className="text-sm text-gray-600">Predictions</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{model.performance}</p>
                          <p className="text-sm text-gray-600">Performance</p>
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

          <TabsContent value="realtime" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-violet-600" />
                  <span>Real-time Monitoring</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={realTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="patients" stroke="#8b5cf6" strokeWidth={3} />
                    <Line type="monotone" dataKey="occupancy" stroke="#3b82f6" strokeWidth={3} />
                    <Line type="monotone" dataKey="alerts" stroke="#ef4444" strokeWidth={3} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Insight Detail Modal */}
        <Dialog open={!!selectedInsight} onOpenChange={() => setSelectedInsight(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-violet-600" />
                <span>Insight Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedInsight && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center">
                    <Brain className="w-10 h-10 text-violet-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedInsight.title}</h2>
                      <Badge className={getImpactColor(selectedInsight.impact)}>
                        {selectedInsight.impact} Impact
                      </Badge>
                      <Badge className={getStatusColor(selectedInsight.status)}>
                        {selectedInsight.status}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">{selectedInsight.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Confidence</Label>
                        <p className="font-semibold">{selectedInsight.confidence}%</p>
                      </div>
                      <div>
                        <Label>Timeframe</Label>
                        <p className="font-semibold">{selectedInsight.timeframe}</p>
                      </div>
                      <div>
                        <Label>Affected Patients</Label>
                        <p className="font-semibold">{selectedInsight.affectedPatients}</p>
                      </div>
                      <div>
                        <Label>Type</Label>
                        <p className="font-semibold">{selectedInsight.type}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recommendation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{selectedInsight.recommendation}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Impact Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Impact Level</span>
                          <span className="font-semibold">{selectedInsight.impact}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Confidence</span>
                          <span className="font-semibold">{selectedInsight.confidence}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Affected Patients</span>
                          <span className="font-semibold">{selectedInsight.affectedPatients}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Timeframe</span>
                          <span className="font-semibold">{selectedInsight.timeframe}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedInsight(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Update Insight
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Insight Modal */}
        <Dialog open={showInsightForm} onOpenChange={setShowInsightForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-violet-600" />
                <span>New Insight</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Insight Title</Label>
                  <Input id="title" placeholder="Enter insight title" />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Risk Prediction">Risk Prediction</SelectItem>
                      <SelectItem value="Resource Optimization">Resource Optimization</SelectItem>
                      <SelectItem value="Cost Optimization">Cost Optimization</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="impact">Impact</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select impact" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="confidence">Confidence (%)</Label>
                  <Input id="confidence" placeholder="Enter confidence" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowInsightForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Insight
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
