"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone, Heart, Activity, Calendar, Camera, Mic, Phone, Video, MessageSquare,
  TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus, Percent, Tag, MapPin,
  ShoppingCart, Package, Globe, Wifi, Layers, Archive, Truck, Box, Megaphone,
  Building, Clipboard, BookOpen, Scale, Gavel, Lock, Key, CheckSquare, Square,
  Play, Pause, Send, Share2, Image, Video as VideoIcon, Printer, BarChart3, PieChart,
  LineChart, Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings,
  Bell, RefreshCw, RotateCcw, QrCode, ScanLine, Barcode, Database, Network, Cpu,
  Brain, CheckCircle, XCircle, AlertTriangle, Clock, Calendar as CalendarIcon, User,
  Users, Star, Award, Phone as PhoneIcon, Mail, MessageSquare as MessageSquareIcon,
  Camera as CameraIcon, Mic as MicIcon, Headphones, Volume2, VolumeX, Wifi as WifiIcon,
  Battery, Signal, Bluetooth, Hospital, UserCheck, UserPlus, UserMinus, UserX,
  UserEdit, UserSearch, UserSettings, Map, Navigation, Compass, Home, Building2,
  Ambulance, Siren, Zap, Flame, Skull, Cross, FirstAid, Heart as HeartIcon, Shield,
  Stethoscope, Monitor, HardDrive, Wrench, Tool, Cog, Power, PowerOff, AlertCircle,
  DollarSign, Target, Pill, Syringe, Microscope, TestTube, Beaker, Flask, Droplet,
  Thermometer, Bandage, X, Plus as PlusIcon, Truck, Warehouse, ShoppingCart as ShoppingCartIcon
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

// Mobile healthcare app data simulation
const appMetrics = {
  totalUsers: 1247,
  activeUsers: 892,
  appDownloads: 3456,
  averageRating: 4.7,
  healthRecords: 5678,
  appointments: 1234,
  prescriptions: 890,
  teleconsultations: 456
};

const mobileFeatures = [
  {
    id: 'FEATURE001',
    name: 'Health Records',
    category: 'Medical Records',
    status: 'Active',
    users: 1247,
    usage: 89.2,
    rating: 4.8,
    lastUpdated: '2024-01-15T00:00:00Z',
    description: 'Digital health records and medical history management',
    features: ['Medical History', 'Lab Results', 'Prescriptions', 'Vaccinations'],
    downloads: 2345,
    reviews: 156
  },
  {
    id: 'FEATURE002',
    name: 'Appointment Booking',
    category: 'Scheduling',
    status: 'Active',
    users: 892,
    usage: 76.5,
    rating: 4.6,
    lastUpdated: '2024-01-12T00:00:00Z',
    description: 'Easy appointment scheduling and management',
    features: ['Doctor Search', 'Time Slots', 'Reminders', 'Rescheduling'],
    downloads: 1890,
    reviews: 98
  },
  {
    id: 'FEATURE003',
    name: 'Telemedicine',
    category: 'Virtual Care',
    status: 'Active',
    users: 456,
    usage: 65.3,
    rating: 4.9,
    lastUpdated: '2024-01-10T00:00:00Z',
    description: 'Virtual consultations and remote healthcare',
    features: ['Video Calls', 'Chat', 'File Sharing', 'Prescriptions'],
    downloads: 1234,
    reviews: 67
  },
  {
    id: 'FEATURE004',
    name: 'Health Monitoring',
    category: 'Wellness',
    status: 'Active',
    users: 678,
    usage: 82.1,
    rating: 4.5,
    lastUpdated: '2024-01-08T00:00:00Z',
    description: 'Personal health tracking and monitoring',
    features: ['Vital Signs', 'Medication Reminders', 'Health Goals', 'Progress Tracking'],
    downloads: 2100,
    reviews: 134
  }
];

const userEngagement = [
  { month: 'Jan', activeUsers: 450, sessions: 2340, duration: 45, features: 8 },
  { month: 'Feb', activeUsers: 520, sessions: 2890, duration: 52, features: 9 },
  { month: 'Mar', activeUsers: 580, sessions: 3120, duration: 48, features: 10 },
  { month: 'Apr', activeUsers: 620, sessions: 3450, duration: 55, features: 11 },
  { month: 'May', activeUsers: 680, sessions: 3780, duration: 58, features: 12 },
  { month: 'Jun', activeUsers: 750, sessions: 4120, duration: 62, features: 13 }
];

const appCategories = [
  { category: 'Medical Records', users: 1247, percentage: 35.2, rating: 4.8 },
  { category: 'Scheduling', users: 892, percentage: 25.1, rating: 4.6 },
  { category: 'Virtual Care', users: 456, percentage: 12.9, rating: 4.9 },
  { category: 'Wellness', users: 678, percentage: 19.1, rating: 4.5 },
  { category: 'Emergency', users: 234, percentage: 6.6, rating: 4.7 }
];

const userFeedback = [
  {
    id: 'FEEDBACK001',
    user: 'Sarah Johnson',
    rating: 5,
    comment: 'Excellent app! Easy to use and very helpful for managing my health records.',
    date: '2024-01-15T10:30:00Z',
    feature: 'Health Records',
    helpful: 12,
    category: 'Medical Records'
  },
  {
    id: 'FEEDBACK002',
    user: 'Michael Chen',
    rating: 4,
    comment: 'Great appointment booking system. Very convenient and user-friendly.',
    date: '2024-01-14T14:20:00Z',
    feature: 'Appointment Booking',
    helpful: 8,
    category: 'Scheduling'
  },
  {
    id: 'FEEDBACK003',
    user: 'Emily Rodriguez',
    rating: 5,
    comment: 'Telemedicine feature is amazing! Saved me a lot of time and money.',
    date: '2024-01-13T16:45:00Z',
    feature: 'Telemedicine',
    helpful: 15,
    category: 'Virtual Care'
  }
];

const appNotifications = [
  {
    id: 'NOTIF001',
    type: 'Appointment Reminder',
    title: 'Appointment Tomorrow',
    message: 'You have an appointment with Dr. Smith at 2:00 PM',
    status: 'Sent',
    sentDate: '2024-01-17T10:00:00Z',
    recipient: 'Sarah Johnson',
    category: 'Scheduling'
  },
  {
    id: 'NOTIF002',
    type: 'Medication Reminder',
    title: 'Take Your Medication',
    message: 'Time to take your blood pressure medication',
    status: 'Sent',
    sentDate: '2024-01-17T08:00:00Z',
    recipient: 'Michael Chen',
    category: 'Health Monitoring'
  },
  {
    id: 'NOTIF003',
    type: 'Lab Results',
    title: 'Lab Results Available',
    message: 'Your recent lab results are now available in the app',
    status: 'Sent',
    sentDate: '2024-01-16T15:30:00Z',
    recipient: 'Emily Rodriguez',
    category: 'Medical Records'
  }
];

export default function MobileHealthcareApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('features');
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [showFeatureForm, setShowFeatureForm] = useState(false);

  // Filter features
  const filteredFeatures = mobileFeatures.filter(feature => {
    const matchesSearch = feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feature.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || feature.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || feature.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'In Development': return 'bg-yellow-100 text-yellow-800';
      case 'Beta': return 'bg-blue-100 text-blue-800';
      case 'Maintenance': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    if (rating >= 3.0) return 'text-orange-600';
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Mobile Healthcare App
            </h1>
            <p className="text-gray-600 mt-2">Patient engagement and mobile health features</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowFeatureForm(true)}
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Feature
            </Button>
            <Button
              variant="outline"
              className="border-pink-200 text-pink-600 hover:bg-pink-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button
              variant="outline"
              className="border-pink-200 text-pink-600 hover:bg-pink-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* App Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Users',
              value: appMetrics.totalUsers.toString(),
              change: '+15.2%',
              trend: 'up',
              icon: Users,
              color: 'from-pink-500 to-rose-500'
            },
            {
              title: 'App Downloads',
              value: appMetrics.appDownloads.toString(),
              change: '+22.8%',
              trend: 'up',
              icon: Download,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Average Rating',
              value: appMetrics.averageRating.toString(),
              change: '+0.2',
              trend: 'up',
              icon: Star,
              color: 'from-yellow-500 to-amber-500'
            },
            {
              title: 'Health Records',
              value: appMetrics.healthRecords.toString(),
              change: '+18.5%',
              trend: 'up',
              icon: FileText,
              color: 'from-green-500 to-emerald-500'
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
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Smartphone className="w-5 h-5 text-pink-600" />
                    <span>Mobile Features</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search features..."
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
                        <SelectItem value="Medical Records">Medical Records</SelectItem>
                        <SelectItem value="Scheduling">Scheduling</SelectItem>
                        <SelectItem value="Virtual Care">Virtual Care</SelectItem>
                        <SelectItem value="Wellness">Wellness</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="In Development">In Development</SelectItem>
                        <SelectItem value="Beta">Beta</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedFeature(feature)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                          <Smartphone className="w-6 h-6 text-pink-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{feature.name}</h3>
                            <Badge className={getStatusColor(feature.status)}>
                              {feature.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {feature.category}
                            </Badge>
                            <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                              {feature.rating} ⭐
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Users: {feature.users}</span>
                            <span className="text-sm text-gray-600">Usage: {feature.usage}%</span>
                            <span className="text-sm text-gray-600">Downloads: {feature.downloads}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{feature.users}</p>
                          <p className="text-sm text-gray-600">Users</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{feature.usage}%</p>
                          <p className="text-sm text-gray-600">Usage</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${getRatingColor(feature.rating)}`}>{feature.rating} ⭐</p>
                          <p className="text-sm text-gray-600">Rating</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFeature(feature);
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

          <TabsContent value="users" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-pink-600" />
                  <span>User Engagement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={userEngagement}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="activeUsers" stroke="#ec4899" strokeWidth={3} />
                    <Line type="monotone" dataKey="sessions" stroke="#3b82f6" strokeWidth={3} />
                    <Line type="monotone" dataKey="duration" stroke="#10b981" strokeWidth={3} />
                    <Line type="monotone" dataKey="features" stroke="#f59e0b" strokeWidth={3} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-pink-600" />
                  <span>User Feedback</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userFeedback.map((feedback, index) => (
                    <motion.div
                      key={feedback.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-pink-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{feedback.user}</h3>
                            <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                              {feedback.rating} ⭐
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {feedback.feature}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{feedback.comment}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Date: {new Date(feedback.date).toLocaleDateString()}</span>
                            <span className="text-sm text-gray-600">Helpful: {feedback.helpful}</span>
                            <span className="text-sm text-gray-600">Category: {feedback.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{feedback.rating} ⭐</p>
                          <p className="text-sm text-gray-600">Rating</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{feedback.helpful}</p>
                          <p className="text-sm text-gray-600">Helpful</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{feedback.category}</p>
                          <p className="text-sm text-gray-600">Category</p>
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
                    <PieChart className="w-5 h-5 text-pink-600" />
                    <span>App Categories</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={appCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="users"
                      >
                        {appCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#ec4899' : index === 1 ? '#3b82f6' : index === 2 ? '#10b981' : index === 3 ? '#f59e0b' : '#8b5cf6'} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-pink-600" />
                    <span>Feature Usage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={mobileFeatures}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="users" fill="#ec4899" />
                      <Bar dataKey="usage" fill="#3b82f6" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <span>App Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Users</span>
                      <span className="font-bold text-pink-600">{appMetrics.totalUsers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active Users</span>
                      <span className="font-bold text-green-600">{appMetrics.activeUsers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">App Downloads</span>
                      <span className="font-bold text-blue-600">{appMetrics.appDownloads}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Rating</span>
                      <span className="font-bold text-yellow-600">{appMetrics.averageRating} ⭐</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    <span>Health Features</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Health Records</span>
                      <span className="font-bold text-green-600">{appMetrics.healthRecords}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Appointments</span>
                      <span className="font-bold text-blue-600">{appMetrics.appointments}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Prescriptions</span>
                      <span className="font-bold text-purple-600">{appMetrics.prescriptions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Teleconsultations</span>
                      <span className="font-bold text-orange-600">{appMetrics.teleconsultations}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <span>Notifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appNotifications.map((notification, index) => (
                      <div key={notification.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">{notification.title}</p>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                        </div>
                        <Badge className={getStatusColor(notification.status)}>
                          {notification.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Feature Detail Modal */}
        <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-pink-600" />
                <span>Feature Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedFeature && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center">
                    <Smartphone className="w-10 h-10 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedFeature.name}</h2>
                      <Badge className={getStatusColor(selectedFeature.status)}>
                        {selectedFeature.status}
                      </Badge>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        {selectedFeature.category}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">{selectedFeature.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Users</Label>
                        <p className="font-semibold">{selectedFeature.users}</p>
                      </div>
                      <div>
                        <Label>Usage</Label>
                        <p className="font-semibold">{selectedFeature.usage}%</p>
                      </div>
                      <div>
                        <Label>Rating</Label>
                        <p className="font-semibold">{selectedFeature.rating} ⭐</p>
                      </div>
                      <div>
                        <Label>Downloads</Label>
                        <p className="font-semibold">{selectedFeature.downloads}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Feature Capabilities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedFeature.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Users</span>
                          <span className="font-semibold">{selectedFeature.users}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Usage Rate</span>
                          <span className="font-semibold">{selectedFeature.usage}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Rating</span>
                          <span className="font-semibold">{selectedFeature.rating} ⭐</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Reviews</span>
                          <span className="font-semibold">{selectedFeature.reviews}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedFeature(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Update Feature
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Feature Modal */}
        <Dialog open={showFeatureForm} onOpenChange={setShowFeatureForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-pink-600" />
                <span>New Feature</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Feature Name</Label>
                  <Input id="name" placeholder="Enter feature name" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Medical Records">Medical Records</SelectItem>
                      <SelectItem value="Scheduling">Scheduling</SelectItem>
                      <SelectItem value="Virtual Care">Virtual Care</SelectItem>
                      <SelectItem value="Wellness">Wellness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="In Development">In Development</SelectItem>
                      <SelectItem value="Beta">Beta</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input id="rating" placeholder="Enter rating" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter feature description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowFeatureForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Feature
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
