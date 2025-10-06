"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, AlertTriangle, AlertCircle, CheckCircle, XCircle, Clock, Calendar,
  TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus, Percent, Tag, MapPin,
  ShoppingCart, Package, Globe, Wifi, Layers, Archive, Truck, Box, Megaphone,
  Building, Clipboard, BookOpen, Scale, Gavel, Lock, Key, CheckSquare, Square,
  Play, Pause, Send, Share2, Image, Video, FileText, Printer, BarChart3, PieChart,
  LineChart, Activity, Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload,
  Settings, Bell, RefreshCw, RotateCcw, QrCode, ScanLine, Barcode, Database,
  Network, Cpu, Brain, CheckCircle as CheckCircleIcon, XCircle as XCircleIcon,
  AlertTriangle as AlertTriangleIcon, Clock as ClockIcon, Calendar as CalendarIcon,
  User, Users, Star, Award, Phone, Mail, MessageSquare, Camera, Mic, Headphones,
  Volume2, VolumeX, Wifi as WifiIcon, Battery, Signal, Bluetooth, Hospital,
  UserCheck, UserPlus, UserMinus, UserX, UserEdit, UserSearch, UserSettings, Map,
  Navigation, Compass, Home, Building2, Ambulance, Siren, Zap, Flame, Skull, Cross,
  FirstAid, Heart, Shield as ShieldIcon, Stethoscope, Monitor, HardDrive, Wrench,
  Tool, Cog, Power, PowerOff, AlertCircle as AlertCircleIcon, DollarSign, Target,
  Pill, Syringe, Microscope, TestTube, Beaker, Flask, Droplet, Thermometer,
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

// Patient safety data simulation
const safetyMetrics = {
  totalIncidents: 24,
  resolvedIncidents: 18,
  pendingIncidents: 6,
  criticalIncidents: 3,
  averageResolutionTime: 2.4,
  safetyScore: 94.2,
  riskLevel: 'Low',
  complianceRate: 96.8
};

const safetyIncidents = [
  {
    id: 'INC001',
    type: 'Medication Error',
    severity: 'High',
    status: 'Resolved',
    patientId: 'PAT001',
    patientName: 'John Smith',
    department: 'ICU',
    reportedBy: 'Dr. Sarah Johnson',
    reportedDate: '2024-01-15T10:30:00Z',
    resolvedDate: '2024-01-15T14:45:00Z',
    description: 'Incorrect dosage administered',
    actionTaken: 'Patient monitored, dosage corrected',
    followUp: 'Completed',
    riskLevel: 'High',
    category: 'Medication Safety'
  },
  {
    id: 'INC002',
    type: 'Fall Risk',
    severity: 'Medium',
    status: 'Pending',
    patientId: 'PAT002',
    patientName: 'Mary Wilson',
    department: 'Orthopedics',
    reportedBy: 'Nurse Lisa Brown',
    reportedDate: '2024-01-16T08:15:00Z',
    resolvedDate: null,
    description: 'Patient fall prevention measures not followed',
    actionTaken: 'Risk assessment updated',
    followUp: 'In Progress',
    riskLevel: 'Medium',
    category: 'Patient Safety'
  },
  {
    id: 'INC003',
    type: 'Infection Control',
    severity: 'Critical',
    status: 'Active',
    patientId: 'PAT003',
    patientName: 'Robert Davis',
    department: 'Surgery',
    reportedBy: 'Dr. Michael Chen',
    reportedDate: '2024-01-17T16:20:00Z',
    resolvedDate: null,
    description: 'Surgical site infection prevention protocol breach',
    actionTaken: 'Immediate isolation measures',
    followUp: 'Ongoing',
    riskLevel: 'Critical',
    category: 'Infection Control'
  }
];

const riskAssessment = [
  {
    id: 'RISK001',
    riskType: 'Medication Safety',
    riskLevel: 'High',
    probability: 85,
    impact: 'High',
    mitigation: 'Enhanced medication verification',
    status: 'Active',
    lastAssessed: '2024-01-10T00:00:00Z',
    nextAssessment: '2024-02-10T00:00:00Z',
    responsible: 'Dr. Sarah Johnson',
    department: 'Pharmacy'
  },
  {
    id: 'RISK002',
    riskType: 'Patient Falls',
    riskLevel: 'Medium',
    probability: 65,
    impact: 'Medium',
    mitigation: 'Fall prevention protocols',
    status: 'Monitored',
    lastAssessed: '2024-01-08T00:00:00Z',
    nextAssessment: '2024-02-08T00:00:00Z',
    responsible: 'Nurse Lisa Brown',
    department: 'Nursing'
  },
  {
    id: 'RISK003',
    riskType: 'Infection Control',
    riskLevel: 'Critical',
    probability: 90,
    impact: 'Critical',
    mitigation: 'Enhanced infection control measures',
    status: 'Active',
    lastAssessed: '2024-01-12T00:00:00Z',
    nextAssessment: '2024-02-12T00:00:00Z',
    responsible: 'Dr. Michael Chen',
    department: 'Infection Control'
  }
];

const safetyTrends = [
  { month: 'Jan', incidents: 8, resolved: 6, critical: 2, safetyScore: 92.5 },
  { month: 'Feb', incidents: 6, resolved: 5, critical: 1, safetyScore: 94.2 },
  { month: 'Mar', incidents: 7, resolved: 6, critical: 1, safetyScore: 93.8 },
  { month: 'Apr', incidents: 5, resolved: 4, critical: 1, safetyScore: 95.1 },
  { month: 'May', incidents: 4, resolved: 3, critical: 0, safetyScore: 96.2 },
  { month: 'Jun', incidents: 3, resolved: 2, critical: 1, safetyScore: 94.8 }
];

const safetyCategories = [
  { category: 'Medication Safety', incidents: 8, percentage: 33.3, trend: 'down' },
  { category: 'Patient Falls', incidents: 6, percentage: 25.0, trend: 'down' },
  { category: 'Infection Control', incidents: 5, percentage: 20.8, trend: 'up' },
  { category: 'Equipment Safety', incidents: 3, percentage: 12.5, trend: 'down' },
  { category: 'Environmental', incidents: 2, percentage: 8.3, trend: 'stable' }
];

const safetyAlerts = [
  {
    id: 'ALERT001',
    type: 'Critical',
    title: 'High Risk Patient Identified',
    description: 'Patient with multiple risk factors requires immediate attention',
    priority: 'High',
    status: 'Active',
    createdDate: '2024-01-17T14:30:00Z',
    assignedTo: 'Dr. Sarah Johnson',
    department: 'ICU',
    actionRequired: 'Immediate risk assessment and intervention'
  },
  {
    id: 'ALERT002',
    type: 'Warning',
    title: 'Safety Protocol Breach',
    description: 'Infection control protocol not followed in Surgery Ward',
    priority: 'Medium',
    status: 'Pending',
    createdDate: '2024-01-17T16:20:00Z',
    assignedTo: 'Nurse Lisa Brown',
    department: 'Surgery',
    actionRequired: 'Review and reinforce safety protocols'
  },
  {
    id: 'ALERT003',
    type: 'Info',
    title: 'Safety Training Due',
    description: 'Quarterly safety training for 15 staff members',
    priority: 'Low',
    status: 'Scheduled',
    createdDate: '2024-01-17T09:00:00Z',
    assignedTo: 'Safety Officer',
    department: 'All',
    actionRequired: 'Schedule and conduct safety training'
  }
];

export default function PatientSafetyMonitoring() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('incidents');
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [showIncidentForm, setShowIncidentForm] = useState(false);

  // Filter incidents
  const filteredIncidents = safetyIncidents.filter(incident => {
    const matchesSearch = incident.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.reportedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'All' || incident.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'All' || incident.status === selectedStatus;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Active': return 'bg-red-100 text-red-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLevelColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Patient Safety Monitoring
            </h1>
            <p className="text-gray-600 mt-2">Incident tracking and risk management</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowIncidentForm(true)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Report Incident
            </Button>
            <Button
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Safety Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Incidents',
              value: safetyMetrics.totalIncidents.toString(),
              change: '-12.5%',
              trend: 'down',
              icon: AlertTriangle,
              color: 'from-red-500 to-orange-500'
            },
            {
              title: 'Safety Score',
              value: `${safetyMetrics.safetyScore}%`,
              change: '+2.1%',
              trend: 'up',
              icon: Shield,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Critical Incidents',
              value: safetyMetrics.criticalIncidents.toString(),
              change: '-25.0%',
              trend: 'down',
              icon: AlertCircle,
              color: 'from-red-500 to-pink-500'
            },
            {
              title: 'Compliance Rate',
              value: `${safetyMetrics.complianceRate}%`,
              change: '+1.8%',
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
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="incidents" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span>Safety Incidents</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search incidents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Severity</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredIncidents.map((incident, index) => (
                    <motion.div
                      key={incident.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedIncident(incident)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{incident.type}</h3>
                            <Badge className={getSeverityColor(incident.severity)}>
                              {incident.severity}
                            </Badge>
                            <Badge className={getStatusColor(incident.status)}>
                              {incident.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {incident.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Patient: {incident.patientName} | Department: {incident.department}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Reported by: {incident.reportedBy}</span>
                            <span className="text-sm text-gray-600">Date: {new Date(incident.reportedDate).toLocaleDateString()}</span>
                            <span className="text-sm text-gray-600">Risk: {incident.riskLevel}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{incident.severity}</p>
                          <p className="text-sm text-gray-600">Severity</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{incident.status}</p>
                          <p className="text-sm text-gray-600">Status</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{incident.riskLevel}</p>
                          <p className="text-sm text-gray-600">Risk Level</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedIncident(incident);
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

          <TabsContent value="risks" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  <span>Risk Assessment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskAssessment.map((risk, index) => (
                    <motion.div
                      key={risk.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <Shield className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{risk.riskType}</h3>
                            <Badge className={getRiskLevelColor(risk.riskLevel)}>
                              {risk.riskLevel} Risk
                            </Badge>
                            <Badge className={getStatusColor(risk.status)}>
                              {risk.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Mitigation: {risk.mitigation}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Probability: {risk.probability}%</span>
                            <span className="text-sm text-gray-600">Impact: {risk.impact}</span>
                            <span className="text-sm text-gray-600">Responsible: {risk.responsible}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{risk.probability}%</p>
                          <p className="text-sm text-gray-600">Probability</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{risk.impact}</p>
                          <p className="text-sm text-gray-600">Impact</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{risk.status}</p>
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

          <TabsContent value="alerts" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-red-600" />
                  <span>Safety Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {safetyAlerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <Bell className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                            <Badge className={getSeverityColor(alert.priority)}>
                              {alert.priority} Priority
                            </Badge>
                            <Badge className={getStatusColor(alert.status)}>
                              {alert.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {alert.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Assigned to: {alert.assignedTo}</span>
                            <span className="text-sm text-gray-600">Department: {alert.department}</span>
                            <span className="text-sm text-gray-600">Created: {formatTimeAgo(alert.createdDate)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{alert.priority}</p>
                          <p className="text-sm text-gray-600">Priority</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{alert.status}</p>
                          <p className="text-sm text-gray-600">Status</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{alert.type}</p>
                          <p className="text-sm text-gray-600">Type</p>
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
                    <LineChart className="w-5 h-5 text-red-600" />
                    <span>Safety Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={safetyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={3} />
                      <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="critical" stroke="#f59e0b" strokeWidth={3} />
                      <Line type="monotone" dataKey="safetyScore" stroke="#3b82f6" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-red-600" />
                    <span>Incident Categories</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={safetyCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="incidents"
                      >
                        {safetyCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : index === 1 ? '#f59e0b' : index === 2 ? '#3b82f6' : index === 3 ? '#10b981' : '#8b5cf6'} />
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
                    <span>Safety Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Incidents</span>
                      <span className="font-bold text-red-600">{safetyMetrics.totalIncidents}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Resolved</span>
                      <span className="font-bold text-green-600">{safetyMetrics.resolvedIncidents}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pending</span>
                      <span className="font-bold text-yellow-600">{safetyMetrics.pendingIncidents}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Safety Score</span>
                      <span className="font-bold text-blue-600">{safetyMetrics.safetyScore}%</span>
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
                      <span className="text-gray-600">Critical Risks</span>
                      <span className="font-bold text-red-600">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">High Risks</span>
                      <span className="font-bold text-orange-600">5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Medium Risks</span>
                      <span className="font-bold text-yellow-600">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Low Risks</span>
                      <span className="font-bold text-green-600">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>Response Times</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Resolution</span>
                      <span className="font-bold text-blue-600">{safetyMetrics.averageResolutionTime}h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Critical Response</span>
                      <span className="font-bold text-red-600">15min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">High Priority</span>
                      <span className="font-bold text-orange-600">1h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Medium Priority</span>
                      <span className="font-bold text-yellow-600">4h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Incident Detail Modal */}
        <Dialog open={!!selectedIncident} onOpenChange={() => setSelectedIncident(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>Incident Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedIncident && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-10 h-10 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedIncident.type}</h2>
                      <Badge className={getSeverityColor(selectedIncident.severity)}>
                        {selectedIncident.severity}
                      </Badge>
                      <Badge className={getStatusColor(selectedIncident.status)}>
                        {selectedIncident.status}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">Patient: {selectedIncident.patientName} | Department: {selectedIncident.department}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Reported By</Label>
                        <p className="font-semibold">{selectedIncident.reportedBy}</p>
                      </div>
                      <div>
                        <Label>Reported Date</Label>
                        <p className="font-semibold">{new Date(selectedIncident.reportedDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <Label>Risk Level</Label>
                        <p className="font-semibold">{selectedIncident.riskLevel}</p>
                      </div>
                      <div>
                        <Label>Category</Label>
                        <p className="font-semibold">{selectedIncident.category}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Incident Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{selectedIncident.description}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Action Taken</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{selectedIncident.actionTaken}</p>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedIncident(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Update Incident
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Incident Modal */}
        <Dialog open={showIncidentForm} onOpenChange={setShowIncidentForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-red-600" />
                <span>Report New Incident</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Incident Type</Label>
                  <Input id="type" placeholder="Enter incident type" />
                </div>
                <div>
                  <Label htmlFor="severity">Severity</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
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
                  <Label htmlFor="patient">Patient Name</Label>
                  <Input id="patient" placeholder="Enter patient name" />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" placeholder="Enter department" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter incident description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowIncidentForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Report Incident
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
