"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, CheckCircle, XCircle, AlertTriangle, FileText, Calendar, Clock, Search,
  Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings, Bell, Target, Zap,
  Activity, BarChart3, TrendingUp, TrendingDown, ArrowUp, ArrowDown, Star, Heart,
  Award, Database, Network, Cpu, Brain, RefreshCw, RotateCcw, Printer, Mail, Phone,
  MapPin, Users, Package, ShoppingCart, DollarSign, Percent, Tag, Lock, Key,
  Clipboard, BookOpen, Scale, Gavel, Building, User, CheckSquare, Square
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

// Compliance data simulation
const complianceRequirements = [
  {
    id: 'REQ001',
    title: 'HIPAA Compliance',
    category: 'Privacy & Security',
    status: 'Compliant',
    priority: 'High',
    dueDate: '2024-12-31',
    lastReview: '2024-01-15',
    nextReview: '2024-04-15',
    description: 'Health Insurance Portability and Accountability Act compliance for patient data protection',
    requirements: [
      'Patient data encryption',
      'Access control systems',
      'Audit trail maintenance',
      'Staff training completion',
      'Incident response procedures'
    ],
    completed: 5,
    total: 5,
    score: 100
  },
  {
    id: 'REQ002',
    title: 'FDA Drug Safety',
    category: 'Pharmaceutical',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2024-06-30',
    lastReview: '2024-01-10',
    nextReview: '2024-02-10',
    description: 'FDA requirements for drug safety monitoring and adverse event reporting',
    requirements: [
      'Drug inventory tracking',
      'Expiry date monitoring',
      'Adverse event reporting',
      'Quality control procedures',
      'Staff certification'
    ],
    completed: 3,
    total: 5,
    score: 60
  },
  {
    id: 'REQ003',
    title: 'OSHA Workplace Safety',
    category: 'Safety',
    status: 'Compliant',
    priority: 'Medium',
    dueDate: '2024-03-31',
    lastReview: '2024-01-05',
    nextReview: '2024-04-05',
    description: 'Occupational Safety and Health Administration workplace safety standards',
    requirements: [
      'Safety training programs',
      'Emergency procedures',
      'Equipment maintenance',
      'Incident reporting',
      'Health monitoring'
    ],
    completed: 5,
    total: 5,
    score: 100
  },
  {
    id: 'REQ004',
    title: 'DEA Controlled Substances',
    category: 'Controlled Substances',
    status: 'Non-Compliant',
    priority: 'Critical',
    dueDate: '2024-02-15',
    lastReview: '2024-01-01',
    nextReview: '2024-01-15',
    description: 'Drug Enforcement Administration requirements for controlled substance handling',
    requirements: [
      'Controlled substance inventory',
      'Prescription verification',
      'Secure storage protocols',
      'Staff background checks',
      'Regular audits'
    ],
    completed: 2,
    total: 5,
    score: 40
  },
  {
    id: 'REQ005',
    title: 'State Pharmacy Board',
    category: 'Licensing',
    status: 'Compliant',
    priority: 'High',
    dueDate: '2024-08-31',
    lastReview: '2024-01-12',
    nextReview: '2024-04-12',
    description: 'State pharmacy board licensing and operational requirements',
    requirements: [
      'Pharmacist licensing',
      'Pharmacy permit renewal',
      'Record keeping standards',
      'Patient counseling protocols',
      'Continuing education'
    ],
    completed: 5,
    total: 5,
    score: 100
  }
];

const auditTrail = [
  {
    id: 'AUD001',
    action: 'HIPAA Training Completed',
    user: 'Dr. Sarah Johnson',
    timestamp: '2024-01-15 14:30:00',
    category: 'Training',
    status: 'Completed',
    details: 'Completed annual HIPAA compliance training module'
  },
  {
    id: 'AUD002',
    action: 'Controlled Substance Audit',
    user: 'Mike Chen',
    timestamp: '2024-01-14 10:15:00',
    category: 'Audit',
    status: 'In Progress',
    details: 'Monthly controlled substance inventory audit initiated'
  },
  {
    id: 'AUD003',
    action: 'Patient Data Access',
    user: 'Emily Rodriguez',
    timestamp: '2024-01-14 09:45:00',
    category: 'Access',
    status: 'Completed',
    details: 'Accessed patient prescription history for consultation'
  },
  {
    id: 'AUD004',
    action: 'Drug Disposal',
    user: 'David Kim',
    timestamp: '2024-01-13 16:20:00',
    category: 'Disposal',
    status: 'Completed',
    details: 'Disposed of expired medications following DEA guidelines'
  },
  {
    id: 'AUD005',
    action: 'Incident Report',
    user: 'System',
    timestamp: '2024-01-13 11:30:00',
    category: 'Incident',
    status: 'Reported',
    details: 'Automated alert: Unusual access pattern detected'
  }
];

const complianceMetrics = {
  totalRequirements: complianceRequirements.length,
  compliantRequirements: complianceRequirements.filter(r => r.status === 'Compliant').length,
  nonCompliantRequirements: complianceRequirements.filter(r => r.status === 'Non-Compliant').length,
  inProgressRequirements: complianceRequirements.filter(r => r.status === 'In Progress').length,
  averageScore: complianceRequirements.reduce((sum, r) => sum + r.score, 0) / complianceRequirements.length,
  criticalIssues: complianceRequirements.filter(r => r.priority === 'Critical' && r.status !== 'Compliant').length,
  upcomingDeadlines: complianceRequirements.filter(r => {
    const dueDate = new Date(r.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays >= 0;
  }).length
};

export default function ComplianceTracking() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [activeTab, setActiveTab] = useState('requirements');
  const [selectedRequirement, setSelectedRequirement] = useState<any>(null);
  const [showRequirementForm, setShowRequirementForm] = useState(false);

  // Filter requirements
  const filteredRequirements = complianceRequirements.filter(requirement => {
    const matchesSearch = requirement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         requirement.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || requirement.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || requirement.status === selectedStatus;
    const matchesPriority = selectedPriority === 'All' || requirement.priority === selectedPriority;
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Non-Compliant': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-blue-100 text-blue-800';
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Privacy & Security': return <Shield className="w-4 h-4 text-blue-600" />;
      case 'Pharmaceutical': return <Package className="w-4 h-4 text-green-600" />;
      case 'Safety': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'Controlled Substances': return <Lock className="w-4 h-4 text-red-600" />;
      case 'Licensing': return <FileText className="w-4 h-4 text-purple-600" />;
      default: return <Clipboard className="w-4 h-4 text-gray-600" />;
    }
  };

  const getAuditIcon = (category: string) => {
    switch (category) {
      case 'Training': return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'Audit': return <Clipboard className="w-4 h-4 text-green-600" />;
      case 'Access': return <Key className="w-4 h-4 text-purple-600" />;
      case 'Disposal': return <Trash2 className="w-4 h-4 text-red-600" />;
      case 'Incident': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getAuditStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Reported': return 'bg-blue-100 text-blue-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
              Regulatory Compliance Center
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive compliance monitoring and audit management</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowRequirementForm(true)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Requirement
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

        {/* Compliance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Requirements',
              value: complianceMetrics.totalRequirements.toString(),
              change: '+2.5%',
              trend: 'up',
              icon: Clipboard,
              color: 'from-red-500 to-orange-500'
            },
            {
              title: 'Compliant',
              value: complianceMetrics.compliantRequirements.toString(),
              change: '+8.1%',
              trend: 'up',
              icon: CheckCircle,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Non-Compliant',
              value: complianceMetrics.nonCompliantRequirements.toString(),
              change: '-12.3%',
              trend: 'down',
              icon: XCircle,
              color: 'from-red-500 to-pink-500'
            },
            {
              title: 'Critical Issues',
              value: complianceMetrics.criticalIssues.toString(),
              change: '-5.7%',
              trend: 'down',
              icon: AlertTriangle,
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
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="requirements" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    <span>Compliance Requirements</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search requirements..."
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
                        <SelectItem value="Pharmaceutical">Pharmaceutical</SelectItem>
                        <SelectItem value="Safety">Safety</SelectItem>
                        <SelectItem value="Controlled Substances">Controlled Substances</SelectItem>
                        <SelectItem value="Licensing">Licensing</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Compliant">Compliant</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Non-Compliant">Non-Compliant</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
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
                  {filteredRequirements.map((requirement, index) => (
                    <motion.div
                      key={requirement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedRequirement(requirement)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          {getCategoryIcon(requirement.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{requirement.title}</h3>
                            <Badge className={getStatusColor(requirement.status)}>
                              {requirement.status}
                            </Badge>
                            <Badge className={getPriorityColor(requirement.priority)}>
                              {requirement.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">{requirement.category}</span>
                            <span className="text-sm text-gray-600">Due: {requirement.dueDate}</span>
                            <span className="text-sm text-gray-600">Score: {requirement.score}%</span>
                          </div>
                          <div className="mt-2">
                            <Progress value={requirement.score} className="h-2" />
                            <div className="flex justify-between text-xs text-gray-600 mt-1">
                              <span>{requirement.completed}/{requirement.total} completed</span>
                              <span>{requirement.score}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{requirement.score}%</p>
                          <p className="text-sm text-gray-600">Score</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{requirement.dueDate}</p>
                          <p className="text-sm text-gray-600">Due Date</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRequirement(requirement);
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

          <TabsContent value="audit" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clipboard className="w-5 h-5 text-red-600" />
                  <span>Audit Trail</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditTrail.map((audit, index) => (
                    <motion.div
                      key={audit.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        {getAuditIcon(audit.category)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{audit.action}</h3>
                            <Badge className={getAuditStatusColor(audit.status)}>
                              {audit.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">User: {audit.user}</span>
                            <span className="text-sm text-gray-600">Category: {audit.category}</span>
                            <span className="text-sm text-gray-600">{audit.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{audit.details}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Compliance Reports</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Monthly Compliance Report
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Shield className="w-4 h-4 mr-2" />
                      HIPAA Compliance Report
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Package className="w-4 h-4 mr-2" />
                      Drug Safety Report
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Incident Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <span>Upcoming Deadlines</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complianceRequirements
                      .filter(r => {
                        const dueDate = new Date(r.dueDate);
                        const today = new Date();
                        const diffTime = dueDate.getTime() - today.getTime();
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        return diffDays <= 30 && diffDays >= 0;
                      })
                      .map((requirement, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{requirement.title}</p>
                            <p className="text-sm text-gray-600">{requirement.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{requirement.dueDate}</p>
                            <Badge className={getPriorityColor(requirement.priority)}>
                              {requirement.priority}
                            </Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Compliance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Overall Compliance Score</span>
                      <span className="font-bold text-2xl">{complianceMetrics.averageScore.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Compliant Requirements</span>
                      <span className="font-bold text-green-600">{complianceMetrics.compliantRequirements}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Non-Compliant</span>
                      <span className="font-bold text-red-600">{complianceMetrics.nonCompliantRequirements}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Critical Issues</span>
                      <span className="font-bold text-orange-600">{complianceMetrics.criticalIssues}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Upcoming Deadlines</span>
                      <span className="font-bold text-yellow-600">{complianceMetrics.upcomingDeadlines}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Compliance Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Monthly Improvement</span>
                      <span className="font-bold text-green-600">+5.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Training Completion</span>
                      <span className="font-bold text-blue-600">94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Audit Pass Rate</span>
                      <span className="font-bold text-green-600">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Incident Response Time</span>
                      <span className="font-bold text-blue-600">2.3 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Requirement Detail Modal */}
        <Dialog open={!!selectedRequirement} onOpenChange={() => setSelectedRequirement(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-red-600" />
                <span>Compliance Requirement Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedRequirement && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                    {getCategoryIcon(selectedRequirement.category)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedRequirement.title}</h2>
                      <Badge className={getStatusColor(selectedRequirement.status)}>
                        {selectedRequirement.status}
                      </Badge>
                      <Badge className={getPriorityColor(selectedRequirement.priority)}>
                        {selectedRequirement.priority}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Category</Label>
                        <p className="font-semibold">{selectedRequirement.category}</p>
                      </div>
                      <div>
                        <Label>Due Date</Label>
                        <p className="font-semibold">{selectedRequirement.dueDate}</p>
                      </div>
                      <div>
                        <Label>Last Review</Label>
                        <p className="font-semibold">{selectedRequirement.lastReview}</p>
                      </div>
                      <div>
                        <Label>Next Review</Label>
                        <p className="font-semibold">{selectedRequirement.nextReview}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label>Description</Label>
                      <p className="font-semibold">{selectedRequirement.description}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Requirements Checklist</Label>
                    <div className="space-y-2 mt-2">
                      {selectedRequirement.requirements.map((req: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox
                            checked={index < selectedRequirement.completed}
                            readOnly
                          />
                          <span className="text-sm">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Progress</Label>
                    <Progress value={selectedRequirement.score} className="h-2" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{selectedRequirement.completed}/{selectedRequirement.total} completed</span>
                      <span>{selectedRequirement.score}%</span>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedRequirement(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Requirement
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Requirement Modal */}
        <Dialog open={showRequirementForm} onOpenChange={setShowRequirementForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-red-600" />
                <span>Add Compliance Requirement</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Requirement Title</Label>
                  <Input id="title" placeholder="Enter requirement title" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Privacy & Security">Privacy & Security</SelectItem>
                      <SelectItem value="Pharmaceutical">Pharmaceutical</SelectItem>
                      <SelectItem value="Safety">Safety</SelectItem>
                      <SelectItem value="Controlled Substances">Controlled Substances</SelectItem>
                      <SelectItem value="Licensing">Licensing</SelectItem>
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
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter requirement description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRequirementForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Requirement
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}