"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bed, Target, Users, Clock, AlertTriangle, Shield, Stethoscope, 
  TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus, Percent, Tag,
  MapPin, ShoppingCart, Package, Globe, Wifi, Layers, Archive, Truck,
  Box, Megaphone, Building, Clipboard, BookOpen, Scale, Gavel, Lock,
  Key, CheckSquare, Square, Play, Pause, Send, Share2, Image, Video,
  FileText, Printer, BarChart3, PieChart, LineChart, Activity as ActivityIcon,
  Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings, Bell,
  Zap, RefreshCw, RotateCcw, QrCode, ScanLine, Barcode, Database,
  Network, Cpu, Brain, Activity as ActivityIcon2, TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon, ArrowUp as ArrowUpIcon, ArrowDown as ArrowDownIcon,
  Minus as MinusIcon, Percent as PercentIcon, Tag as TagIcon, MapPin as MapPinIcon,
  ShoppingCart as ShoppingCartIcon, Package as PackageIcon, Globe as GlobeIcon,
  Wifi as WifiIcon, Layers as LayersIcon, Archive as ArchiveIcon, Truck as TruckIcon,
  Box as BoxIcon, Megaphone as MegaphoneIcon, Building as BuildingIcon,
  Clipboard as ClipboardIcon, BookOpen as BookOpenIcon, Scale as ScaleIcon,
  Gavel as GavelIcon, Lock as LockIcon, Key as KeyIcon, CheckSquare as CheckSquareIcon,
  Square as SquareIcon, Play as PlayIcon, Pause as PauseIcon, Send as SendIcon,
  Share2 as Share2Icon, Image as ImageIcon, Video as VideoIcon, FileText as FileTextIcon,
  Printer as PrinterIcon, BarChart3 as BarChart3Icon, PieChart as PieChartIcon,
  LineChart as LineChartIcon, Activity as ActivityIcon3, CheckCircle, XCircle,
  AlertTriangle as AlertTriangleIcon, Clock as ClockIcon, Calendar, User, Users as UsersIcon,
  DollarSign, Star, Award, Phone, Mail, MessageSquare, Camera, Mic, Headphones,
  Volume2, VolumeX, Wifi as WifiIcon2, Battery, Signal, Bluetooth, Hospital,
  Pill, Syringe, Microscope, Thermometer, Bandage, X, Plus as PlusIcon,
  UserCheck, UserPlus, UserMinus, UserX, UserEdit, UserSearch, UserSettings,
  Map, Navigation, Compass, Home, Building2, Building as BuildingIcon2
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

// Bed management data simulation
const bedData = [
  {
    id: 'BED001',
    number: 'ICU-201',
    ward: 'Intensive Care Unit',
    floor: '2nd Floor',
    type: 'ICU',
    status: 'Occupied',
    patient: 'Sarah Johnson',
    admissionDate: '2024-01-15T08:30:00Z',
    expectedDischarge: '2024-01-20T10:00:00Z',
    priority: 'High',
    equipment: ['Ventilator', 'Monitor', 'IV Pump'],
    lastCleaned: '2024-01-15T06:00:00Z',
    maintenanceDue: '2024-01-25T00:00:00Z',
    location: { x: 120, y: 80 },
    capacity: 1,
    currentOccupancy: 1
  },
  {
    id: 'BED002',
    number: 'WARD-305',
    ward: 'General Ward',
    floor: '3rd Floor',
    type: 'Standard',
    status: 'Occupied',
    patient: 'Robert Williams',
    admissionDate: '2024-01-15T10:15:00Z',
    expectedDischarge: '2024-01-18T14:00:00Z',
    priority: 'Medium',
    equipment: ['Monitor', 'IV Pump'],
    lastCleaned: '2024-01-15T08:00:00Z',
    maintenanceDue: '2024-01-30T00:00:00Z',
    location: { x: 200, y: 150 },
    capacity: 1,
    currentOccupancy: 1
  },
  {
    id: 'BED003',
    number: 'PED-102',
    ward: 'Pediatrics',
    floor: '1st Floor',
    type: 'Pediatric',
    status: 'Available',
    patient: null,
    admissionDate: null,
    expectedDischarge: null,
    priority: 'Low',
    equipment: ['Monitor', 'IV Pump', 'Child Safety Rails'],
    lastCleaned: '2024-01-15T12:00:00Z',
    maintenanceDue: '2024-02-01T00:00:00Z',
    location: { x: 80, y: 200 },
    capacity: 1,
    currentOccupancy: 0
  },
  {
    id: 'BED004',
    number: 'EMERG-15',
    ward: 'Emergency Department',
    floor: 'Ground Floor',
    type: 'Emergency',
    status: 'Maintenance',
    patient: null,
    admissionDate: null,
    expectedDischarge: null,
    priority: 'High',
    equipment: ['Monitor', 'Defibrillator', 'Oxygen'],
    lastCleaned: '2024-01-14T18:00:00Z',
    maintenanceDue: '2024-01-16T00:00:00Z',
    location: { x: 300, y: 50 },
    capacity: 1,
    currentOccupancy: 0
  }
];

const wardData = [
  {
    name: 'Intensive Care Unit',
    totalBeds: 30,
    occupiedBeds: 28,
    availableBeds: 2,
    utilization: 93.3,
    floor: '2nd Floor',
    color: 'from-red-500 to-pink-500'
  },
  {
    name: 'General Ward',
    totalBeds: 50,
    occupiedBeds: 42,
    availableBeds: 8,
    utilization: 84.0,
    floor: '3rd Floor',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Pediatrics',
    totalBeds: 25,
    occupiedBeds: 18,
    availableBeds: 7,
    utilization: 72.0,
    floor: '1st Floor',
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Emergency Department',
    totalBeds: 20,
    occupiedBeds: 15,
    availableBeds: 5,
    utilization: 75.0,
    floor: 'Ground Floor',
    color: 'from-orange-500 to-red-500'
  }
];

const bedMetrics = {
  totalBeds: 125,
  occupiedBeds: 103,
  availableBeds: 22,
  maintenanceBeds: 5,
  averageOccupancy: 82.4,
  turnoverRate: 2.3,
  averageStay: 4.2,
  emergencyCapacity: 85.0
};

const occupancyData = [
  { hour: '00:00', occupancy: 78, admissions: 2, discharges: 1 },
  { hour: '06:00', occupancy: 82, admissions: 5, discharges: 3 },
  { hour: '12:00', occupancy: 85, admissions: 8, discharges: 4 },
  { hour: '18:00', occupancy: 88, admissions: 6, discharges: 2 },
  { hour: '24:00', occupancy: 84, admissions: 3, discharges: 5 }
];

export default function BedManagementSystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWard, setSelectedWard] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBed, setSelectedBed] = useState<any>(null);
  const [showBedForm, setShowBedForm] = useState(false);

  // Filter beds
  const filteredBeds = bedData.filter(bed => {
    const matchesSearch = bed.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bed.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (bed.patient && bed.patient.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesWard = selectedWard === 'All' || bed.ward === selectedWard;
    const matchesStatus = selectedStatus === 'All' || bed.status === selectedStatus;
    return matchesSearch && matchesWard && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Occupied': return 'bg-red-100 text-red-800';
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Cleaning': return 'bg-blue-100 text-blue-800';
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

  const getWardColor = (ward: string) => {
    const wardInfo = wardData.find(w => w.name === ward);
    return wardInfo ? wardInfo.color : 'from-gray-500 to-gray-600';
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
              Smart Bed Management
            </h1>
            <p className="text-gray-600 mt-2">Real-time bed availability and allocation optimization</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowBedForm(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Bed
            </Button>
            <Button
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
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

        {/* Bed Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Beds',
              value: bedMetrics.totalBeds.toString(),
              change: '+5.2%',
              trend: 'up',
              icon: Bed,
              color: 'from-purple-500 to-violet-500'
            },
            {
              title: 'Occupied Beds',
              value: bedMetrics.occupiedBeds.toString(),
              change: '+8.3%',
              trend: 'up',
              icon: Users,
              color: 'from-red-500 to-pink-500'
            },
            {
              title: 'Available Beds',
              value: bedMetrics.availableBeds.toString(),
              change: '-12.5%',
              trend: 'down',
              icon: Target,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Average Occupancy',
              value: `${bedMetrics.averageOccupancy}%`,
              change: '+2.1%',
              trend: 'up',
              icon: TrendingUp,
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
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="beds">Beds</TabsTrigger>
            <TabsTrigger value="wards">Wards</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-purple-600" />
                    <span>Bed Occupancy Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={occupancyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="occupancy" stroke="#8b5cf6" strokeWidth={3} />
                      <Line type="monotone" dataKey="admissions" stroke="#3b82f6" strokeWidth={3} />
                      <Line type="monotone" dataKey="discharges" stroke="#10b981" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Ward Utilization</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={wardData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="utilization" fill="#8b5cf6" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span>Bed Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Available Beds</span>
                      <span className="font-bold text-green-600">{bedMetrics.availableBeds}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Maintenance Beds</span>
                      <span className="font-bold text-yellow-600">{bedMetrics.maintenanceBeds}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Turnover Rate</span>
                      <span className="font-bold text-blue-600">{bedMetrics.turnoverRate}/day</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Stay</span>
                      <span className="font-bold text-purple-600">{bedMetrics.averageStay} days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                    <span>Emergency Capacity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Emergency Capacity</span>
                      <span className="font-bold text-red-600">{bedMetrics.emergencyCapacity}%</span>
                    </div>
                    <Progress value={bedMetrics.emergencyCapacity} className="w-full" />
                    <div className="text-sm text-gray-500">
                      {bedMetrics.emergencyCapacity >= 90 ? 'High Capacity' : 
                       bedMetrics.emergencyCapacity >= 70 ? 'Moderate Capacity' : 'Low Capacity'}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-purple-600" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Bed ICU-201 cleaned and ready</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">New patient assigned to WARD-305</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Maintenance scheduled for EMERG-15</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Bed allocation optimized</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="beds" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Bed className="w-5 h-5 text-purple-600" />
                    <span>Bed Management</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search beds..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedWard} onValueChange={setSelectedWard}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Ward" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Wards</SelectItem>
                        <SelectItem value="Intensive Care Unit">ICU</SelectItem>
                        <SelectItem value="General Ward">General Ward</SelectItem>
                        <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="Emergency Department">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Occupied">Occupied</SelectItem>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Cleaning">Cleaning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredBeds.map((bed, index) => (
                    <motion.div
                      key={bed.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedBed(bed)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Bed className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{bed.number}</h3>
                            <Badge className={getStatusColor(bed.status)}>
                              {bed.status}
                            </Badge>
                            <Badge className={getPriorityColor(bed.priority)}>
                              {bed.priority}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {bed.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{bed.ward} - {bed.floor}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Patient: {bed.patient || 'None'}</span>
                            <span className="text-sm text-gray-600">Last Cleaned: {formatTimeAgo(bed.lastCleaned)}</span>
                            <span className="text-sm text-gray-600">Maintenance: {formatTimeAgo(bed.maintenanceDue)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{bed.currentOccupancy}/{bed.capacity}</p>
                          <p className="text-sm text-gray-600">Occupancy</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{bed.equipment.length}</p>
                          <p className="text-sm text-gray-600">Equipment</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBed(bed);
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

          <TabsContent value="wards" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wardData.map((ward, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Building2 className="w-5 h-5 text-purple-600" />
                        <span>{ward.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Total Beds</span>
                          <span className="font-bold text-purple-600">{ward.totalBeds}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Occupied</span>
                          <span className="font-bold text-red-600">{ward.occupiedBeds}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Available</span>
                          <span className="font-bold text-green-600">{ward.availableBeds}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Utilization</span>
                          <span className="font-bold text-blue-600">{ward.utilization}%</span>
                        </div>
                        <Progress value={ward.utilization} className="w-full" />
                        <div className="text-sm text-gray-500">
                          {ward.floor}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-purple-600" />
                    <span>Bed Status Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={[
                          { name: 'Occupied', value: bedMetrics.occupiedBeds, color: '#ef4444' },
                          { name: 'Available', value: bedMetrics.availableBeds, color: '#10b981' },
                          { name: 'Maintenance', value: bedMetrics.maintenanceBeds, color: '#f59e0b' }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {[
                          { name: 'Occupied', value: bedMetrics.occupiedBeds, color: '#ef4444' },
                          { name: 'Available', value: bedMetrics.availableBeds, color: '#10b981' },
                          { name: 'Maintenance', value: bedMetrics.maintenanceBeds, color: '#f59e0b' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
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
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Ward Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {wardData.map((ward, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600">{ward.name}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={ward.utilization} className="w-20" />
                          <span className="font-bold text-blue-600">{ward.utilization}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Bed Detail Modal */}
        <Dialog open={!!selectedBed} onOpenChange={() => setSelectedBed(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Bed className="w-5 h-5 text-purple-600" />
                <span>Bed Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedBed && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                    <Bed className="w-10 h-10 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedBed.number}</h2>
                      <Badge className={getStatusColor(selectedBed.status)}>
                        {selectedBed.status}
                      </Badge>
                      <Badge className={getPriorityColor(selectedBed.priority)}>
                        {selectedBed.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">{selectedBed.ward} - {selectedBed.floor}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Type</Label>
                        <p className="font-semibold">{selectedBed.type}</p>
                      </div>
                      <div>
                        <Label>Patient</Label>
                        <p className="font-semibold">{selectedBed.patient || 'None'}</p>
                      </div>
                      <div>
                        <Label>Admission Date</Label>
                        <p className="font-semibold">{selectedBed.admissionDate ? new Date(selectedBed.admissionDate).toLocaleDateString() : 'N/A'}</p>
                      </div>
                      <div>
                        <Label>Expected Discharge</Label>
                        <p className="font-semibold">{selectedBed.expectedDischarge ? new Date(selectedBed.expectedDischarge).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Equipment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedBed.equipment.map((equipment: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm">{equipment}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Maintenance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Last Cleaned</span>
                          <span className="font-semibold">{formatTimeAgo(selectedBed.lastCleaned)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Maintenance Due</span>
                          <span className="font-semibold">{formatTimeAgo(selectedBed.maintenanceDue)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Capacity</span>
                          <span className="font-semibold">{selectedBed.currentOccupancy}/{selectedBed.capacity}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedBed(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Bed
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Bed Modal */}
        <Dialog open={showBedForm} onOpenChange={setShowBedForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-purple-600" />
                <span>Add New Bed</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedNumber">Bed Number</Label>
                  <Input id="bedNumber" placeholder="Enter bed number" />
                </div>
                <div>
                  <Label htmlFor="bedWard">Ward</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ward" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Intensive Care Unit">ICU</SelectItem>
                      <SelectItem value="General Ward">General Ward</SelectItem>
                      <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="Emergency Department">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bedType">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ICU">ICU</SelectItem>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Pediatric">Pediatric</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bedFloor">Floor</Label>
                  <Input id="bedFloor" placeholder="Enter floor" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowBedForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Bed
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
