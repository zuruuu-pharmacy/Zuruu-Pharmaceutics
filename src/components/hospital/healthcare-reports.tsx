"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, BarChart3, PieChart, LineChart, Download, Printer, Share2, Calendar,
  TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus, Percent, Tag, MapPin,
  ShoppingCart, Package, Globe, Wifi, Layers, Archive, Truck, Box, Megaphone,
  Building, Clipboard, BookOpen, Scale, Gavel, Lock, Key, CheckSquare, Square,
  Play, Pause, Send, Share2 as Share2Icon, Image, Video, Printer as PrinterIcon,
  BarChart3 as BarChart3Icon, PieChart as PieChartIcon, LineChart as LineChartIcon,
  Activity, Search, Filter, Plus, Edit, Trash2, Eye, Download as DownloadIcon, Upload,
  Settings, Bell, RefreshCw, RotateCcw, QrCode, ScanLine, Barcode, Database, Network,
  Cpu, Brain, CheckCircle, XCircle, AlertTriangle, Clock, Calendar as CalendarIcon,
  User, Users, Star, Award, Phone, Mail, MessageSquare, Camera, Mic, Headphones,
  Volume2, VolumeX, Wifi as WifiIcon, Battery, Signal, Bluetooth, Hospital,
  UserCheck, UserPlus, UserMinus, UserX, UserEdit, UserSearch, UserSettings, Map,
  Navigation, Compass, Home, Building2, Ambulance, Siren, Zap, Flame, Skull, Cross,
  FirstAid, Heart, Shield, Stethoscope, Monitor, HardDrive, Wrench, Tool, Cog,
  Power, PowerOff, AlertCircle, DollarSign, Target, Pill, Syringe, Microscope,
  TestTube, Beaker, Flask, Droplet, Thermometer, Bandage, X, Plus as PlusIcon,
  Truck, Warehouse, ShoppingCart as ShoppingCartIcon
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

// Healthcare reports data simulation
const reportMetrics = {
  totalReports: 156,
  generatedToday: 12,
  scheduledReports: 8,
  reportViews: 2340,
  averageGenerationTime: 2.3,
  reportAccuracy: 98.5,
  userSatisfaction: 94.2,
  automationRate: 87.3
};

const reportTemplates = [
  {
    id: 'TEMPLATE001',
    name: 'Patient Summary Report',
    category: 'Clinical',
    status: 'Active',
    frequency: 'Daily',
    lastGenerated: '2024-01-17T08:00:00Z',
    nextGeneration: '2024-01-18T08:00:00Z',
    recipients: 45,
    format: 'PDF',
    pages: 12,
    dataPoints: 156,
    automation: 95,
    accuracy: 98.2,
    description: 'Comprehensive patient summary with medical history and current status'
  },
  {
    id: 'TEMPLATE002',
    name: 'Financial Performance Report',
    category: 'Financial',
    status: 'Active',
    frequency: 'Weekly',
    lastGenerated: '2024-01-15T09:00:00Z',
    nextGeneration: '2024-01-22T09:00:00Z',
    recipients: 12,
    format: 'Excel',
    pages: 8,
    dataPoints: 89,
    automation: 88,
    accuracy: 96.8,
    description: 'Financial performance metrics and revenue analysis'
  },
  {
    id: 'TEMPLATE003',
    name: 'Quality Metrics Dashboard',
    category: 'Quality',
    status: 'Active',
    frequency: 'Monthly',
    lastGenerated: '2024-01-01T10:00:00Z',
    nextGeneration: '2024-02-01T10:00:00Z',
    recipients: 28,
    format: 'HTML',
    pages: 15,
    dataPoints: 234,
    automation: 92,
    accuracy: 97.5,
    description: 'Quality metrics and performance indicators dashboard'
  },
  {
    id: 'TEMPLATE004',
    name: 'Emergency Response Report',
    category: 'Emergency',
    status: 'Active',
    frequency: 'Real-time',
    lastGenerated: '2024-01-17T14:30:00Z',
    nextGeneration: 'Continuous',
    recipients: 8,
    format: 'PDF',
    pages: 6,
    dataPoints: 67,
    automation: 100,
    accuracy: 99.1,
    description: 'Real-time emergency response and resource allocation report'
  }
];

const reportData = [
  { month: 'Jan', reports: 45, views: 890, accuracy: 97.2, satisfaction: 92.5 },
  { month: 'Feb', reports: 52, views: 1020, accuracy: 97.8, satisfaction: 93.8 },
  { month: 'Mar', reports: 48, views: 980, accuracy: 98.1, satisfaction: 94.2 },
  { month: 'Apr', reports: 61, views: 1150, accuracy: 98.5, satisfaction: 95.1 },
  { month: 'May', reports: 55, views: 1080, accuracy: 98.8, satisfaction: 94.8 },
  { month: 'Jun', reports: 67, views: 1250, accuracy: 98.5, satisfaction: 95.3 }
];

const reportCategories = [
  { category: 'Clinical', count: 45, percentage: 28.8, accuracy: 98.2 },
  { category: 'Financial', count: 32, percentage: 20.5, accuracy: 96.8 },
  { category: 'Quality', count: 28, percentage: 17.9, accuracy: 97.5 },
  { category: 'Emergency', count: 24, percentage: 15.4, accuracy: 99.1 },
  { category: 'Administrative', count: 27, percentage: 17.3, accuracy: 97.8 }
];

const reportSchedules = [
  {
    id: 'SCHEDULE001',
    reportName: 'Daily Patient Summary',
    frequency: 'Daily',
    time: '08:00',
    status: 'Active',
    lastRun: '2024-01-17T08:00:00Z',
    nextRun: '2024-01-18T08:00:00Z',
    recipients: 'Clinical Staff',
    format: 'PDF',
    automation: 100,
    successRate: 98.5
  },
  {
    id: 'SCHEDULE002',
    reportName: 'Weekly Financial Report',
    frequency: 'Weekly',
    time: '09:00',
    status: 'Active',
    lastRun: '2024-01-15T09:00:00Z',
    nextRun: '2024-01-22T09:00:00Z',
    recipients: 'Management',
    format: 'Excel',
    automation: 95,
    successRate: 96.8
  },
  {
    id: 'SCHEDULE003',
    reportName: 'Monthly Quality Dashboard',
    frequency: 'Monthly',
    time: '10:00',
    status: 'Active',
    lastRun: '2024-01-01T10:00:00Z',
    nextRun: '2024-02-01T10:00:00Z',
    recipients: 'Quality Team',
    format: 'HTML',
    automation: 90,
    successRate: 97.5
  }
];

const reportAnalytics = [
  {
    id: 'ANALYTICS001',
    reportName: 'Patient Summary Report',
    views: 234,
    downloads: 45,
    shares: 12,
    rating: 4.8,
    lastViewed: '2024-01-17T14:30:00Z',
    user: 'Dr. Sarah Johnson',
    department: 'Cardiology'
  },
  {
    id: 'ANALYTICS002',
    reportName: 'Financial Performance Report',
    views: 156,
    downloads: 28,
    shares: 8,
    rating: 4.6,
    lastViewed: '2024-01-17T12:15:00Z',
    user: 'Finance Director',
    department: 'Finance'
  },
  {
    id: 'ANALYTICS003',
    reportName: 'Quality Metrics Dashboard',
    views: 189,
    downloads: 34,
    shares: 15,
    rating: 4.9,
    lastViewed: '2024-01-17T16:45:00Z',
    user: 'Quality Manager',
    department: 'Quality Assurance'
  }
];

export default function HealthcareReports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [showReportForm, setShowReportForm] = useState(false);

  // Filter reports
  const filteredReports = reportTemplates.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || report.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || report.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'Real-time': return 'bg-red-100 text-red-800';
      case 'Daily': return 'bg-orange-100 text-orange-800';
      case 'Weekly': return 'bg-yellow-100 text-yellow-800';
      case 'Monthly': return 'bg-blue-100 text-blue-800';
      case 'Quarterly': return 'bg-purple-100 text-purple-800';
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
              Healthcare Reports
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive analytics and medical reporting</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowReportForm(true)}
              className="bg-slate-600 hover:bg-slate-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Report
            </Button>
            <Button
              variant="outline"
              className="border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export All
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

        {/* Report Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Reports',
              value: reportMetrics.totalReports.toString(),
              change: '+8.5%',
              trend: 'up',
              icon: FileText,
              color: 'from-slate-500 to-gray-500'
            },
            {
              title: 'Report Views',
              value: reportMetrics.reportViews.toString(),
              change: '+12.3%',
              trend: 'up',
              icon: Eye,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Report Accuracy',
              value: `${reportMetrics.reportAccuracy}%`,
              change: '+1.2%',
              trend: 'up',
              icon: Target,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Automation Rate',
              value: `${reportMetrics.automationRate}%`,
              change: '+3.5%',
              trend: 'up',
              icon: Zap,
              color: 'from-purple-500 to-pink-500'
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
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="schedules">Schedules</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-slate-600" />
                    <span>Report Templates</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search templates..."
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
                        <SelectItem value="Clinical">Clinical</SelectItem>
                        <SelectItem value="Financial">Financial</SelectItem>
                        <SelectItem value="Quality">Quality</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredReports.map((report, index) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedReport(report)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                          <FileText className="w-6 h-6 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{report.name}</h3>
                            <Badge className={getStatusColor(report.status)}>
                              {report.status}
                            </Badge>
                            <Badge className={getFrequencyColor(report.frequency)}>
                              {report.frequency}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {report.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Recipients: {report.recipients}</span>
                            <span className="text-sm text-gray-600">Format: {report.format}</span>
                            <span className="text-sm text-gray-600">Pages: {report.pages}</span>
                            <span className="text-sm text-gray-600">Accuracy: {report.accuracy}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{report.recipients}</p>
                          <p className="text-sm text-gray-600">Recipients</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{report.accuracy}%</p>
                          <p className="text-sm text-gray-600">Accuracy</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{report.automation}%</p>
                          <p className="text-sm text-gray-600">Automation</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedReport(report);
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

          <TabsContent value="schedules" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-slate-600" />
                  <span>Report Schedules</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportSchedules.map((schedule, index) => (
                    <motion.div
                      key={schedule.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{schedule.reportName}</h3>
                            <Badge className={getStatusColor(schedule.status)}>
                              {schedule.status}
                            </Badge>
                            <Badge className={getFrequencyColor(schedule.frequency)}>
                              {schedule.frequency}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Recipients: {schedule.recipients} | Format: {schedule.format}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Time: {schedule.time}</span>
                            <span className="text-sm text-gray-600">Automation: {schedule.automation}%</span>
                            <span className="text-sm text-gray-600">Success Rate: {schedule.successRate}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{schedule.automation}%</p>
                          <p className="text-sm text-gray-600">Automation</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{schedule.successRate}%</p>
                          <p className="text-sm text-gray-600">Success Rate</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{schedule.status}</p>
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
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-slate-600" />
                  <span>Report Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportAnalytics.map((analytics, index) => (
                    <motion.div
                      key={analytics.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{analytics.reportName}</h3>
                            <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                              {analytics.rating} ⭐
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {analytics.department}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">User: {analytics.user} | Last Viewed: {formatTimeAgo(analytics.lastViewed)}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Views: {analytics.views}</span>
                            <span className="text-sm text-gray-600">Downloads: {analytics.downloads}</span>
                            <span className="text-sm text-gray-600">Shares: {analytics.shares}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{analytics.views}</p>
                          <p className="text-sm text-gray-600">Views</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{analytics.downloads}</p>
                          <p className="text-sm text-gray-600">Downloads</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{analytics.rating} ⭐</p>
                          <p className="text-sm text-gray-600">Rating</p>
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

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-slate-600" />
                    <span>Report Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={reportData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="reports" stroke="#475569" strokeWidth={3} />
                      <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={3} />
                      <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="satisfaction" stroke="#f59e0b" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-slate-600" />
                    <span>Report Categories</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={reportCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                      >
                        {reportCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#475569' : index === 1 ? '#3b82f6' : index === 2 ? '#10b981' : index === 3 ? '#f59e0b' : '#8b5cf6'} />
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
                    <FileText className="w-5 h-5 text-green-600" />
                    <span>Report Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Reports</span>
                      <span className="font-bold text-slate-600">{reportMetrics.totalReports}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Generated Today</span>
                      <span className="font-bold text-green-600">{reportMetrics.generatedToday}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Scheduled Reports</span>
                      <span className="font-bold text-blue-600">{reportMetrics.scheduledReports}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Report Views</span>
                      <span className="font-bold text-purple-600">{reportMetrics.reportViews}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Report Accuracy</span>
                      <span className="font-bold text-green-600">{reportMetrics.reportAccuracy}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">User Satisfaction</span>
                      <span className="font-bold text-blue-600">{reportMetrics.userSatisfaction}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Automation Rate</span>
                      <span className="font-bold text-purple-600">{reportMetrics.automationRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Avg Generation Time</span>
                      <span className="font-bold text-orange-600">{reportMetrics.averageGenerationTime}m</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <span>Automation Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Automated Reports</span>
                      <span className="font-bold text-green-600">87.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Manual Reports</span>
                      <span className="font-bold text-blue-600">12.7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-bold text-purple-600">98.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Error Rate</span>
                      <span className="font-bold text-red-600">1.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Report Detail Modal */}
        <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-slate-600" />
                <span>Report Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedReport && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                    <FileText className="w-10 h-10 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedReport.name}</h2>
                      <Badge className={getStatusColor(selectedReport.status)}>
                        {selectedReport.status}
                      </Badge>
                      <Badge className={getFrequencyColor(selectedReport.frequency)}>
                        {selectedReport.frequency}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">{selectedReport.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Recipients</Label>
                        <p className="font-semibold">{selectedReport.recipients}</p>
                      </div>
                      <div>
                        <Label>Format</Label>
                        <p className="font-semibold">{selectedReport.format}</p>
                      </div>
                      <div>
                        <Label>Pages</Label>
                        <p className="font-semibold">{selectedReport.pages}</p>
                      </div>
                      <div>
                        <Label>Data Points</Label>
                        <p className="font-semibold">{selectedReport.dataPoints}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Report Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Accuracy</span>
                          <span className="font-semibold">{selectedReport.accuracy}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Automation</span>
                          <span className="font-semibold">{selectedReport.automation}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Last Generated</span>
                          <span className="font-semibold">{formatTimeAgo(selectedReport.lastGenerated)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Next Generation</span>
                          <span className="font-semibold">{new Date(selectedReport.nextGeneration).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Report Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download Report
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Printer className="w-4 h-4 mr-2" />
                          Print Report
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Report
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedReport(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Update Report
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Report Modal */}
        <Dialog open={showReportForm} onOpenChange={setShowReportForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-slate-600" />
                <span>New Report</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Report Name</Label>
                  <Input id="name" placeholder="Enter report name" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Clinical">Clinical</SelectItem>
                      <SelectItem value="Financial">Financial</SelectItem>
                      <SelectItem value="Quality">Quality</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Real-time">Real-time</SelectItem>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="format">Format</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="Excel">Excel</SelectItem>
                      <SelectItem value="HTML">HTML</SelectItem>
                      <SelectItem value="CSV">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter report description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowReportForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
