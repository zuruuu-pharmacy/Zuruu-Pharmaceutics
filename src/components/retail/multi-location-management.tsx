"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Building, Users, Clock, Calendar, User, Target, Zap, Shield, Database,
  Network, Cpu, Brain, Activity, TrendingUp, TrendingDown, ArrowUp, ArrowDown,
  Minus, Percent, Tag, ShoppingCart, Package, Smartphone, Globe, Wifi, Layers,
  Archive, Truck, Box, Megaphone, Clipboard, BookOpen, Scale, Gavel, Lock, Key,
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

// Multi-location management data simulation
const locations = [
  {
    id: 'LOC001',
    name: 'Downtown Pharmacy',
    address: '123 Main Street, Downtown',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '(555) 123-4567',
    email: 'downtown@pharmacy.com',
    manager: 'Sarah Johnson',
    staff: 12,
    status: 'Active',
    type: 'Retail',
    hours: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM',
    services: ['Prescription', 'OTC', 'Consultation', 'Delivery'],
    inventory: {
      totalItems: 2450,
      lowStock: 23,
      outOfStock: 5,
      value: 125000
    },
    performance: {
      revenue: 45000,
      customers: 1250,
      prescriptions: 890,
      satisfaction: 4.7
    },
    lastUpdated: '2024-01-15T14:30:00Z'
  },
  {
    id: 'LOC002',
    name: 'Mall Pharmacy',
    address: '456 Mall Drive, Shopping Center',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90210',
    phone: '(555) 234-5678',
    email: 'mall@pharmacy.com',
    manager: 'Michael Chen',
    staff: 8,
    status: 'Active',
    type: 'Retail',
    hours: 'Mon-Sun: 10AM-9PM',
    services: ['Prescription', 'OTC', 'Consultation'],
    inventory: {
      totalItems: 1890,
      lowStock: 15,
      outOfStock: 3,
      value: 98000
    },
    performance: {
      revenue: 32000,
      customers: 890,
      prescriptions: 650,
      satisfaction: 4.5
    },
    lastUpdated: '2024-01-15T16:45:00Z'
  },
  {
    id: 'LOC003',
    name: 'Hospital Pharmacy',
    address: '789 Medical Center Blvd',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    phone: '(555) 345-6789',
    email: 'hospital@pharmacy.com',
    manager: 'Dr. Emily Rodriguez',
    staff: 15,
    status: 'Active',
    type: 'Hospital',
    hours: '24/7',
    services: ['Prescription', 'IV Therapy', 'Emergency', 'Consultation'],
    inventory: {
      totalItems: 3200,
      lowStock: 8,
      outOfStock: 2,
      value: 180000
    },
    performance: {
      revenue: 75000,
      customers: 2100,
      prescriptions: 1450,
      satisfaction: 4.8
    },
    lastUpdated: '2024-01-15T18:20:00Z'
  }
];

const locationMetrics = {
  totalLocations: 12,
  activeLocations: 11,
  inactiveLocations: 1,
  totalStaff: 156,
  totalRevenue: 485000,
  totalCustomers: 12450,
  totalPrescriptions: 8940,
  averageSatisfaction: 4.6
};

const performanceData = [
  { month: 'Jan', revenue: 45000, customers: 1200, prescriptions: 850 },
  { month: 'Feb', revenue: 48000, customers: 1350, prescriptions: 920 },
  { month: 'Mar', revenue: 52000, customers: 1480, prescriptions: 1050 },
  { month: 'Apr', revenue: 49000, customers: 1420, prescriptions: 980 },
  { month: 'May', revenue: 55000, customers: 1580, prescriptions: 1120 },
  { month: 'Jun', revenue: 58000, customers: 1650, prescriptions: 1180 }
];

export default function MultiLocationManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [activeTab, setActiveTab] = useState('locations');
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [showLocationForm, setShowLocationForm] = useState(false);

  // Filter locations
  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || location.status === selectedStatus;
    const matchesType = selectedType === 'All' || location.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Retail': return 'bg-blue-100 text-blue-800';
      case 'Hospital': return 'bg-red-100 text-red-800';
      case 'Clinic': return 'bg-green-100 text-green-800';
      case 'Warehouse': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (value: number, threshold: number) => {
    if (value >= threshold) return 'text-green-600';
    if (value >= threshold * 0.8) return 'text-yellow-600';
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Multi-Location Management
            </h1>
            <p className="text-gray-600 mt-2">Centralized control and branch management</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowLocationForm(true)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Location
            </Button>
            <Button
              variant="outline"
              className="border-cyan-200 text-cyan-600 hover:bg-cyan-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              className="border-cyan-200 text-cyan-600 hover:bg-cyan-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Location Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Locations',
              value: locationMetrics.totalLocations.toString(),
              change: '+8.3%',
              trend: 'up',
              icon: Building,
              color: 'from-cyan-500 to-blue-500'
            },
            {
              title: 'Active Locations',
              value: locationMetrics.activeLocations.toString(),
              change: '+5.1%',
              trend: 'up',
              icon: CheckSquare,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Total Staff',
              value: locationMetrics.totalStaff.toString(),
              change: '+12.5%',
              trend: 'up',
              icon: Users,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Total Revenue',
              value: `$${locationMetrics.totalRevenue.toLocaleString()}`,
              change: '+18.7%',
              trend: 'up',
              icon: DollarSign,
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
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="locations" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="w-5 h-5 text-cyan-600" />
                    <span>Location Management</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search locations..."
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
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Types</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                        <SelectItem value="Hospital">Hospital</SelectItem>
                        <SelectItem value="Clinic">Clinic</SelectItem>
                        <SelectItem value="Warehouse">Warehouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredLocations.map((location, index) => (
                    <motion.div
                      key={location.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                          <Building className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{location.name}</h3>
                            <Badge className={getStatusColor(location.status)}>
                              {location.status}
                            </Badge>
                            <Badge className={getTypeColor(location.type)}>
                              {location.type}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">{location.address}</span>
                            <span className="text-sm text-gray-600">Manager: {location.manager}</span>
                            <span className="text-sm text-gray-600">Staff: {location.staff}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${location.performance.revenue.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Revenue</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{location.performance.customers}</p>
                          <p className="text-sm text-gray-600">Customers</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{location.performance.satisfaction}/5</p>
                          <p className="text-sm text-gray-600">Satisfaction</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLocation(location);
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

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-cyan-600" />
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
                      <Line type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={3} />
                      <Line type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={3} />
                      <Line type="monotone" dataKey="prescriptions" stroke="#10b981" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Location Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {locations.map((location, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                            <Building className="w-4 h-4 text-cyan-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{location.name}</p>
                            <p className="text-sm text-gray-600">{location.city}, {location.state}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-cyan-600">${location.performance.revenue.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <span>Location Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Locations</span>
                      <span className="font-bold text-cyan-600">{locationMetrics.totalLocations}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active Locations</span>
                      <span className="font-bold text-green-600">{locationMetrics.activeLocations}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Staff</span>
                      <span className="font-bold text-blue-600">{locationMetrics.totalStaff}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Revenue</span>
                      <span className="font-bold text-purple-600">${locationMetrics.totalRevenue.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span>Growth Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Customers</span>
                      <span className="font-bold text-cyan-600">{locationMetrics.totalCustomers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Prescriptions</span>
                      <span className="font-bold text-green-600">{locationMetrics.totalPrescriptions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Satisfaction</span>
                      <span className="font-bold text-blue-600">{locationMetrics.averageSatisfaction}/5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Growth Rate</span>
                      <span className="font-bold text-purple-600">+15.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span>AI Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900">Location Optimization</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Consider expanding the Downtown location based on high customer demand.
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900">Staff Allocation</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Mall location may benefit from additional staff during peak hours.
                      </p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-900">Inventory Management</h4>
                      <p className="text-sm text-orange-700 mt-1">
                        Hospital location shows excellent inventory turnover rates.
                      </p>
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
                  <Settings className="w-5 h-5 text-cyan-600" />
                  <span>Location Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="centralizedControl">Centralized Control</Label>
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
                      <Label htmlFor="autoSync">Auto Sync</Label>
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
                      <Label htmlFor="notifications">Location Notifications</Label>
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
                      <Label htmlFor="backup">Data Backup</Label>
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

        {/* Location Detail Modal */}
        <Dialog open={!!selectedLocation} onOpenChange={() => setSelectedLocation(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-cyan-600" />
                <span>Location Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedLocation && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Building className="w-10 h-10 text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedLocation.name}</h2>
                      <Badge className={getStatusColor(selectedLocation.status)}>
                        {selectedLocation.status}
                      </Badge>
                      <Badge className={getTypeColor(selectedLocation.type)}>
                        {selectedLocation.type}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Address</Label>
                        <p className="font-semibold">{selectedLocation.address}</p>
                      </div>
                      <div>
                        <Label>Manager</Label>
                        <p className="font-semibold">{selectedLocation.manager}</p>
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <p className="font-semibold">{selectedLocation.phone}</p>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <p className="font-semibold">{selectedLocation.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Revenue:</span>
                        <span className="font-semibold">${selectedLocation.performance.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customers:</span>
                        <span className="font-semibold">{selectedLocation.performance.customers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Prescriptions:</span>
                        <span className="font-semibold">{selectedLocation.performance.prescriptions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Satisfaction:</span>
                        <span className="font-semibold text-green-600">{selectedLocation.performance.satisfaction}/5</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Inventory Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Items:</span>
                        <span className="font-semibold">{selectedLocation.inventory.totalItems}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Low Stock:</span>
                        <span className="font-semibold text-yellow-600">{selectedLocation.inventory.lowStock}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Out of Stock:</span>
                        <span className="font-semibold text-red-600">{selectedLocation.inventory.outOfStock}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Inventory Value:</span>
                        <span className="font-semibold">${selectedLocation.inventory.value.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedLocation(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Location
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Location Modal */}
        <Dialog open={showLocationForm} onOpenChange={setShowLocationForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-cyan-600" />
                <span>Add New Location</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="locationName">Location Name</Label>
                  <Input id="locationName" placeholder="Enter location name" />
                </div>
                <div>
                  <Label htmlFor="locationType">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Hospital">Hospital</SelectItem>
                      <SelectItem value="Clinic">Clinic</SelectItem>
                      <SelectItem value="Warehouse">Warehouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="locationAddress">Address</Label>
                  <Input id="locationAddress" placeholder="Enter address" />
                </div>
                <div>
                  <Label htmlFor="locationCity">City</Label>
                  <Input id="locationCity" placeholder="Enter city" />
                </div>
                <div>
                  <Label htmlFor="locationState">State</Label>
                  <Input id="locationState" placeholder="Enter state" />
                </div>
                <div>
                  <Label htmlFor="locationZip">Zip Code</Label>
                  <Input id="locationZip" placeholder="Enter zip code" />
                </div>
                <div>
                  <Label htmlFor="locationPhone">Phone</Label>
                  <Input id="locationPhone" placeholder="Enter phone number" />
                </div>
                <div>
                  <Label htmlFor="locationEmail">Email</Label>
                  <Input id="locationEmail" type="email" placeholder="Enter email" />
                </div>
                <div>
                  <Label htmlFor="locationManager">Manager</Label>
                  <Input id="locationManager" placeholder="Enter manager name" />
                </div>
                <div>
                  <Label htmlFor="locationStaff">Staff Count</Label>
                  <Input id="locationStaff" type="number" placeholder="Enter staff count" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowLocationForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Location
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}