"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone, Download, Upload, Settings, Bell, Target, Zap, Shield, Database,
  Network, Cpu, Brain, Activity, TrendingUp, TrendingDown, ArrowUp, ArrowDown,
  Minus, Percent, Tag, MapPin, ShoppingCart, Package, Globe, Wifi, Layers,
  Archive, Truck, Box, Megaphone, Building, Clipboard, BookOpen, Scale, Gavel,
  Lock, Key, CheckSquare, Square, Play, Pause, Send, Share2, Image, Video,
  FileText, Printer, BarChart3, PieChart, LineChart, Activity as ActivityIcon,
  Search, Filter, Plus, Edit, Trash2, Eye, Download as DownloadIcon, Upload as UploadIcon,
  Settings as SettingsIcon, Bell as BellIcon, DollarSign, Star, Heart, Award,
  RefreshCw, RotateCcw, QrCode, ScanLine, Barcode, Database as DatabaseIcon,
  Network as NetworkIcon, Cpu as CpuIcon, Brain as BrainIcon, Activity as ActivityIcon2,
  TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon, ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon, Minus as MinusIcon, Percent as PercentIcon, Tag as TagIcon,
  MapPin as MapPinIcon, ShoppingCart as ShoppingCartIcon, Package as PackageIcon,
  Globe as GlobeIcon, Wifi as WifiIcon, Layers as LayersIcon, Archive as ArchiveIcon,
  Truck as TruckIcon, Box as BoxIcon, Megaphone as MegaphoneIcon, Building as BuildingIcon,
  Clipboard as ClipboardIcon, BookOpen as BookOpenIcon, Scale as ScaleIcon,
  Gavel as GavelIcon, Lock as LockIcon, Key as KeyIcon, CheckSquare as CheckSquareIcon,
  Square as SquareIcon, Play as PlayIcon, Pause as PauseIcon, Send as SendIcon,
  Share2 as Share2Icon, Image as ImageIcon, Video as VideoIcon, FileText as FileTextIcon,
  Printer as PrinterIcon, BarChart3 as BarChart3Icon, PieChart as PieChartIcon,
  LineChart as LineChartIcon, Activity as ActivityIcon3, Clock, Calendar, User, Users,
  CheckCircle, XCircle, AlertTriangle, Phone, Mail, MessageSquare, Camera, Mic,
  Headphones, Volume2, VolumeX, Wifi as WifiIcon2, Battery, Signal, Bluetooth
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

// Mobile pharmacy app data simulation
const appFeatures = [
  {
    id: 'FEAT001',
    name: 'Prescription Refill',
    description: 'Easy prescription refill with barcode scanning',
    category: 'Prescription',
    status: 'Active',
    priority: 'High',
    downloads: 1250,
    usage: 89.2,
    rating: 4.7,
    lastUpdated: '2024-01-15T14:30:00Z',
    features: [
      'Barcode scanning',
      'Auto-refill scheduling',
      'Prescription history',
      'Insurance verification'
    ],
    screenshots: ['refill1.jpg', 'refill2.jpg', 'refill3.jpg']
  },
  {
    id: 'FEAT002',
    name: 'Medication Reminder',
    description: 'Smart medication reminders and tracking',
    category: 'Health',
    status: 'Active',
    priority: 'High',
    downloads: 980,
    usage: 92.5,
    rating: 4.8,
    lastUpdated: '2024-01-15T10:15:00Z',
    features: [
      'Custom reminders',
      'Dose tracking',
      'Side effect logging',
      'Doctor notifications'
    ],
    screenshots: ['reminder1.jpg', 'reminder2.jpg', 'reminder3.jpg']
  },
  {
    id: 'FEAT003',
    name: 'Pharmacy Locator',
    description: 'Find nearby pharmacies and check availability',
    category: 'Location',
    status: 'Active',
    priority: 'Medium',
    downloads: 756,
    usage: 78.3,
    rating: 4.5,
    lastUpdated: '2024-01-15T16:45:00Z',
    features: [
      'GPS navigation',
      'Real-time availability',
      'Wait time estimates',
      'Drive-through options'
    ],
    screenshots: ['locator1.jpg', 'locator2.jpg', 'locator3.jpg']
  }
];

const appMetrics = {
  totalDownloads: 15420,
  activeUsers: 12850,
  averageRating: 4.6,
  totalFeatures: 15,
  appVersion: '2.3.1',
  lastUpdate: '2024-01-15T18:20:00Z',
  crashRate: 0.8,
  userRetention: 78.5
};

const userFeedback = [
  {
    id: 'FB001',
    user: 'Sarah Johnson',
    rating: 5,
    comment: 'Love the prescription refill feature! So convenient.',
    date: '2024-01-15T10:30:00Z',
    feature: 'Prescription Refill'
  },
  {
    id: 'FB002',
    user: 'Michael Chen',
    rating: 4,
    comment: 'Medication reminders are very helpful. Could use more customization.',
    date: '2024-01-14T16:20:00Z',
    feature: 'Medication Reminder'
  },
  {
    id: 'FB003',
    user: 'Emily Rodriguez',
    rating: 5,
    comment: 'Pharmacy locator saved me so much time!',
    date: '2024-01-14T14:15:00Z',
    feature: 'Pharmacy Locator'
  }
];

const appPerformance = [
  { month: 'Jan', downloads: 1200, activeUsers: 980, rating: 4.5 },
  { month: 'Feb', downloads: 1350, activeUsers: 1120, rating: 4.6 },
  { month: 'Mar', downloads: 1500, activeUsers: 1250, rating: 4.7 },
  { month: 'Apr', downloads: 1420, activeUsers: 1180, rating: 4.6 },
  { month: 'May', downloads: 1680, activeUsers: 1350, rating: 4.7 },
  { month: 'Jun', downloads: 1890, activeUsers: 1480, rating: 4.8 }
];

export default function MobilePharmacyApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('features');
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [showFeatureForm, setShowFeatureForm] = useState(false);

  // Filter features
  const filteredFeatures = appFeatures.filter(feature => {
    const matchesSearch = feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || feature.status === selectedStatus;
    const matchesCategory = selectedCategory === 'All' || feature.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Beta': return 'bg-yellow-100 text-yellow-800';
      case 'Deprecated': return 'bg-red-100 text-red-800';
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

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
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
              Mobile Pharmacy App
            </h1>
            <p className="text-gray-600 mt-2">Mobile app features and user experience design</p>
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
              Download
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

        {/* App Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Downloads',
              value: appMetrics.totalDownloads.toLocaleString(),
              change: '+18.5%',
              trend: 'up',
              icon: Download,
              color: 'from-pink-500 to-rose-500'
            },
            {
              title: 'Active Users',
              value: appMetrics.activeUsers.toLocaleString(),
              change: '+15.2%',
              trend: 'up',
              icon: Users,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Average Rating',
              value: appMetrics.averageRating.toString(),
              change: '+0.3',
              trend: 'up',
              icon: Star,
              color: 'from-yellow-500 to-orange-500'
            },
            {
              title: 'App Version',
              value: appMetrics.appVersion,
              change: '+0.1',
              trend: 'up',
              icon: Smartphone,
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
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Smartphone className="w-5 h-5 text-pink-600" />
                    <span>App Features</span>
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
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Beta">Beta</SelectItem>
                        <SelectItem value="Deprecated">Deprecated</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Categories</SelectItem>
                        <SelectItem value="Prescription">Prescription</SelectItem>
                        <SelectItem value="Health">Health</SelectItem>
                        <SelectItem value="Location">Location</SelectItem>
                        <SelectItem value="Payment">Payment</SelectItem>
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
                            <Badge className={getPriorityColor(feature.priority)}>
                              {feature.priority}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {feature.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Downloads: {feature.downloads}</span>
                            <span className="text-sm text-gray-600">Usage: {feature.usage}%</span>
                            <span className="text-sm text-gray-600">Last Updated: {formatTimeAgo(feature.lastUpdated)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className={`font-semibold ${getRatingColor(feature.rating)}`}>
                            {feature.rating}/5
                          </p>
                          <p className="text-sm text-gray-600">Rating</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{feature.downloads}</p>
                          <p className="text-sm text-gray-600">Downloads</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{feature.usage}%</p>
                          <p className="text-sm text-gray-600">Usage</p>
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
                      className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-pink-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{feedback.user}</h4>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <Badge variant="outline" className="text-blue-600 border-blue-200">
                            {feedback.feature}
                          </Badge>
                        </div>
                        <p className="text-gray-700 mb-2">{feedback.comment}</p>
                        <p className="text-sm text-gray-500">{formatTimeAgo(feedback.date)}</p>
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
                    <LineChart className="w-5 h-5 text-pink-600" />
                    <span>App Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={appPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="downloads" stroke="#ec4899" strokeWidth={3} />
                      <Line type="monotone" dataKey="activeUsers" stroke="#3b82f6" strokeWidth={3} />
                      <Line type="monotone" dataKey="rating" stroke="#f59e0b" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>App Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Features</span>
                      <span className="font-bold text-pink-600">{appMetrics.totalFeatures}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">User Retention</span>
                      <span className="font-bold text-green-600">{appMetrics.userRetention}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Crash Rate</span>
                      <span className="font-bold text-red-600">{appMetrics.crashRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Last Update</span>
                      <span className="font-bold text-blue-600">{formatTimeAgo(appMetrics.lastUpdate)}</span>
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
                  <Settings className="w-5 h-5 text-pink-600" />
                  <span>App Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="appVersion">App Version</Label>
                      <Input id="appVersion" value={appMetrics.appVersion} readOnly />
                    </div>
                    <div>
                      <Label htmlFor="autoUpdate">Auto Update</Label>
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
                      <Label htmlFor="notifications">Push Notifications</Label>
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
                      <Label htmlFor="analytics">Analytics Tracking</Label>
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
                      <Badge className={getPriorityColor(selectedFeature.priority)}>
                        {selectedFeature.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">{selectedFeature.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Downloads</Label>
                        <p className="font-semibold">{selectedFeature.downloads}</p>
                      </div>
                      <div>
                        <Label>Usage</Label>
                        <p className="font-semibold">{selectedFeature.usage}%</p>
                      </div>
                      <div>
                        <Label>Rating</Label>
                        <p className="font-semibold">{selectedFeature.rating}/5</p>
                      </div>
                      <div>
                        <Label>Category</Label>
                        <p className="font-semibold">{selectedFeature.category}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Feature List</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedFeature.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Screenshots</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedFeature.screenshots.map((screenshot: string, index: number) => (
                          <div key={index} className="w-full h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Image className="w-6 h-6 text-gray-400" />
                          </div>
                        ))}
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
                    Edit Feature
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
                <span>Add New Feature</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="featureName">Feature Name</Label>
                  <Input id="featureName" placeholder="Enter feature name" />
                </div>
                <div>
                  <Label htmlFor="featureCategory">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Prescription">Prescription</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Location">Location</SelectItem>
                      <SelectItem value="Payment">Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="featurePriority">Priority</Label>
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
                <div>
                  <Label htmlFor="featureStatus">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Beta">Beta</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="featureDescription">Description</Label>
                <Textarea id="featureDescription" placeholder="Enter feature description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowFeatureForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Feature
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}