"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Stethoscope, Monitor, Cpu, HardDrive, Wifi, Battery, Signal, Bluetooth, Activity, Zap,
  TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus, Percent, Tag,
  MapPin, ShoppingCart, Package, Globe, Layers, Archive, Truck,
  Box, Megaphone, Building, Clipboard, BookOpen, Scale, Gavel, Lock,
  Key, CheckSquare, Square, Play, Pause, Send, Share2, Image, Video,
  FileText, Printer, BarChart3, PieChart, LineChart, Activity as ActivityIcon,
  Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings, Bell,
  Target, RefreshCw, RotateCcw, QrCode, ScanLine, Barcode, Database,
  Network, Cpu as CpuIcon, Brain, Activity as ActivityIcon2, TrendingUp as TrendingUpIcon,
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
  Volume2, VolumeX, Wifi as WifiIcon2, Battery as BatteryIcon, Signal as SignalIcon, Bluetooth as BluetoothIcon, Hospital,
  UserCheck, UserPlus, UserMinus, UserX, UserEdit, UserSearch, UserSettings,
  Map, Navigation, Compass, Home, Building2, Building as BuildingIcon2,
  Ambulance, Siren, Zap as ZapIcon, Flame, Skull, Cross, FirstAid, Heart,
  Shield, AlertTriangle, Activity as ActivityIcon4, Clock as ClockIcon2, Users as UsersIcon2, Target, Pill, Syringe,
  Microscope, TestTube, Beaker, Flask, Droplet, Thermometer, Bandage, X, Plus as PlusIcon,
  Wrench, Tool, Cog, Settings as SettingsIcon, Power, PowerOff, AlertCircle
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

// Equipment monitoring data simulation
const equipmentData = [
  {
    id: 'EQ001',
    name: 'MRI Scanner',
    model: 'Siemens Magnetom Skyra 3T',
    type: 'Imaging',
    status: 'Operational',
    location: 'Radiology Department',
    department: 'Radiology',
    uptime: 98.5,
    lastMaintenance: '2024-01-10T00:00:00Z',
    nextMaintenance: '2024-02-10T00:00:00Z',
    utilization: 85.2,
    temperature: 22.5,
    powerConsumption: 45.2,
    alerts: 0,
    criticalAlerts: 0,
    lastCalibration: '2024-01-05T00:00:00Z',
    nextCalibration: '2024-02-05T00:00:00Z',
    warrantyExpiry: '2025-06-15',
    cost: 2500000,
    maintenanceCost: 125000,
    technician: 'John Smith',
    specifications: {
      fieldStrength: '3 Tesla',
      boreDiameter: '70cm',
      weight: '4500kg',
      dimensions: '2.5m x 2.0m x 1.8m'
    }
  },
  {
    id: 'EQ002',
    name: 'Ventilator',
    model: 'Hamilton C3',
    type: 'Life Support',
    status: 'Operational',
    location: 'ICU Ward 1',
    department: 'ICU',
    uptime: 96.8,
    lastMaintenance: '2024-01-08T00:00:00Z',
    nextMaintenance: '2024-01-22T00:00:00Z',
    utilization: 92.3,
    temperature: 24.1,
    powerConsumption: 2.8,
    alerts: 1,
    criticalAlerts: 0,
    lastCalibration: '2024-01-12T00:00:00Z',
    nextCalibration: '2024-01-26T00:00:00Z',
    warrantyExpiry: '2024-12-31',
    cost: 45000,
    maintenanceCost: 8500,
    technician: 'Sarah Johnson',
    specifications: {
      pressureRange: '0-120 cmH2O',
      flowRange: '0-300 L/min',
      weight: '18kg',
      dimensions: '40cm x 30cm x 25cm'
    }
  },
  {
    id: 'EQ003',
    name: 'Defibrillator',
    model: 'Philips HeartStart XL',
    type: 'Emergency',
    status: 'Maintenance',
    location: 'Emergency Department',
    department: 'Emergency',
    uptime: 89.2,
    lastMaintenance: '2024-01-15T00:00:00Z',
    nextMaintenance: '2024-01-20T00:00:00Z',
    utilization: 78.5,
    temperature: 23.8,
    powerConsumption: 0.5,
    alerts: 3,
    criticalAlerts: 1,
    lastCalibration: '2024-01-14T00:00:00Z',
    nextCalibration: '2024-01-28T00:00:00Z',
    warrantyExpiry: '2024-08-15',
    cost: 15000,
    maintenanceCost: 3200,
    technician: 'Mike Wilson',
    specifications: {
      energyRange: '1-360 Joules',
      weight: '3.2kg',
      dimensions: '25cm x 20cm x 8cm',
      batteryLife: '8 hours'
    }
  }
];

const equipmentMetrics = {
  totalEquipment: 156,
  operationalEquipment: 142,
  maintenanceEquipment: 12,
  criticalAlerts: 3,
  averageUptime: 94.8,
  totalValue: 12500000,
  maintenanceCost: 450000,
  energyConsumption: 1250
};

const performanceData = [
  { month: 'Jan', uptime: 94.5, utilization: 82.3, maintenance: 8 },
  { month: 'Feb', uptime: 95.2, utilization: 85.1, maintenance: 6 },
  { month: 'Mar', uptime: 96.8, utilization: 87.2, maintenance: 5 },
  { month: 'Apr', uptime: 94.1, utilization: 83.5, maintenance: 9 },
  { month: 'May', uptime: 97.2, utilization: 89.3, maintenance: 4 },
  { month: 'Jun', uptime: 95.8, utilization: 86.7, maintenance: 7 }
];

const departmentEquipment = [
  { department: 'Radiology', equipment: 24, operational: 22, maintenance: 2, uptime: 96.5 },
  { department: 'ICU', equipment: 18, operational: 16, maintenance: 2, uptime: 94.2 },
  { department: 'Emergency', equipment: 15, operational: 13, maintenance: 2, uptime: 92.8 },
  { department: 'Surgery', equipment: 28, operational: 26, maintenance: 2, uptime: 97.1 }
];

const alertData = [
  {
    id: 'ALT001',
    equipment: 'MRI Scanner',
    type: 'Warning',
    message: 'Temperature slightly elevated',
    timestamp: '2024-01-15T14:30:00Z',
    severity: 'Medium',
    status: 'Active',
    assignedTo: 'John Smith'
  },
  {
    id: 'ALT002',
    equipment: 'Ventilator',
    type: 'Info',
    message: 'Routine maintenance due',
    timestamp: '2024-01-15T10:15:00Z',
    severity: 'Low',
    status: 'Active',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: 'ALT003',
    equipment: 'Defibrillator',
    type: 'Critical',
    message: 'Battery replacement required',
    timestamp: '2024-01-15T16:45:00Z',
    severity: 'High',
    status: 'Active',
    assignedTo: 'Mike Wilson'
  }
];

export default function EquipmentMonitoringSystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('equipment');
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
  const [showEquipmentForm, setShowEquipmentForm] = useState(false);

  // Filter equipment
  const filteredEquipment = equipmentData.filter(equipment => {
    const matchesSearch = equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipment.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipment.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || equipment.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || equipment.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operational': return 'bg-green-100 text-green-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Offline': return 'bg-red-100 text-red-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'Warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Medical Equipment Monitoring
            </h1>
            <p className="text-gray-600 mt-2">Real-time equipment status and maintenance tracking</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowEquipmentForm(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Equipment
            </Button>
            <Button
              variant="outline"
              className="border-teal-200 text-teal-600 hover:bg-teal-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button
              variant="outline"
              className="border-teal-200 text-teal-600 hover:bg-teal-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Equipment Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Equipment',
              value: equipmentMetrics.totalEquipment.toString(),
              change: '+3.2%',
              trend: 'up',
              icon: Stethoscope,
              color: 'from-teal-500 to-cyan-500'
            },
            {
              title: 'Operational',
              value: equipmentMetrics.operationalEquipment.toString(),
              change: '+5.8%',
              trend: 'up',
              icon: CheckCircle,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Critical Alerts',
              value: equipmentMetrics.criticalAlerts.toString(),
              change: '-12.5%',
              trend: 'down',
              icon: AlertTriangle,
              color: 'from-red-500 to-pink-500'
            },
            {
              title: 'Avg Uptime',
              value: `${equipmentMetrics.averageUptime}%`,
              change: '+1.2%',
              trend: 'up',
              icon: Activity,
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
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="equipment" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Stethoscope className="w-5 h-5 text-teal-600" />
                    <span>Equipment Status</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search equipment..."
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
                        <SelectItem value="Imaging">Imaging</SelectItem>
                        <SelectItem value="Life Support">Life Support</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                        <SelectItem value="Monitoring">Monitoring</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Operational">Operational</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Offline">Offline</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredEquipment.map((equipment, index) => (
                    <motion.div
                      key={equipment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedEquipment(equipment)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                          <Stethoscope className="w-6 h-6 text-teal-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{equipment.name}</h3>
                            <Badge className={getStatusColor(equipment.status)}>
                              {equipment.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {equipment.type}
                            </Badge>
                            {equipment.alerts > 0 && (
                              <Badge className="bg-red-100 text-red-800">
                                {equipment.alerts} Alert{equipment.alerts > 1 ? 's' : ''}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{equipment.model}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Location: {equipment.location}</span>
                            <span className="text-sm text-gray-600">Technician: {equipment.technician}</span>
                            <span className="text-sm text-gray-600">Uptime: {equipment.uptime}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{equipment.utilization}%</p>
                          <p className="text-sm text-gray-600">Utilization</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{equipment.temperature}°C</p>
                          <p className="text-sm text-gray-600">Temperature</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{equipment.powerConsumption}kW</p>
                          <p className="text-sm text-gray-600">Power</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEquipment(equipment);
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

          <TabsContent value="alerts" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-teal-600" />
                  <span>Equipment Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alertData.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`p-4 rounded-lg border-2 ${getAlertTypeColor(alert.type)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{alert.equipment}</h4>
                            <Badge className={getAlertTypeColor(alert.type)}>
                              {alert.type}
                            </Badge>
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                            <Badge className="bg-green-100 text-green-800">
                              {alert.status}
                            </Badge>
                          </div>
                          <p className="text-gray-700 mb-2">{alert.message}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Assigned: {alert.assignedTo}</span>
                            <span>Time: {formatTimeAgo(alert.timestamp)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="w-4 h-4" />
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

          <TabsContent value="maintenance" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wrench className="w-5 h-5 text-teal-600" />
                  <span>Maintenance Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {equipmentData.map((equipment, index) => (
                    <motion.div
                      key={equipment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                          <Wrench className="w-6 h-6 text-teal-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{equipment.name}</h3>
                            <Badge className={getStatusColor(equipment.status)}>
                              {equipment.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Last: {formatTimeAgo(equipment.lastMaintenance)}</span>
                            <span className="text-sm text-gray-600">Next: {formatTimeAgo(equipment.nextMaintenance)}</span>
                            <span className="text-sm text-gray-600">Technician: {equipment.technician}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${equipment.maintenanceCost.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Cost</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{equipment.alerts}</p>
                          <p className="text-sm text-gray-600">Alerts</p>
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
                    <LineChart className="w-5 h-5 text-teal-600" />
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
                      <Line type="monotone" dataKey="uptime" stroke="#14b8a6" strokeWidth={3} />
                      <Line type="monotone" dataKey="utilization" stroke="#3b82f6" strokeWidth={3} />
                      <Line type="monotone" dataKey="maintenance" stroke="#f59e0b" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Department Equipment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={departmentEquipment}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="operational" fill="#14b8a6" />
                      <Bar dataKey="maintenance" fill="#f59e0b" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span>Financial Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Value</span>
                      <span className="font-bold text-green-600">${equipmentMetrics.totalValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Maintenance Cost</span>
                      <span className="font-bold text-blue-600">${equipmentMetrics.maintenanceCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Energy Consumption</span>
                      <span className="font-bold text-purple-600">{equipmentMetrics.energyConsumption} kWh</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Uptime</span>
                      <span className="font-bold text-green-600">{equipmentMetrics.averageUptime}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Operational Equipment</span>
                      <span className="font-bold text-blue-600">{equipmentMetrics.operationalEquipment}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Maintenance Equipment</span>
                      <span className="font-bold text-orange-600">{equipmentMetrics.maintenanceEquipment}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span>Alert Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Critical Alerts</span>
                      <span className="font-bold text-red-600">{equipmentMetrics.criticalAlerts}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Equipment</span>
                      <span className="font-bold text-gray-600">{equipmentMetrics.totalEquipment}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Alert Rate</span>
                      <span className="font-bold text-blue-600">{((equipmentMetrics.criticalAlerts / equipmentMetrics.totalEquipment) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Equipment Detail Modal */}
        <Dialog open={!!selectedEquipment} onOpenChange={() => setSelectedEquipment(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Stethoscope className="w-5 h-5 text-teal-600" />
                <span>Equipment Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedEquipment && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-10 h-10 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedEquipment.name}</h2>
                      <Badge className={getStatusColor(selectedEquipment.status)}>
                        {selectedEquipment.status}
                      </Badge>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        {selectedEquipment.type}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">{selectedEquipment.model}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Location</Label>
                        <p className="font-semibold">{selectedEquipment.location}</p>
                      </div>
                      <div>
                        <Label>Department</Label>
                        <p className="font-semibold">{selectedEquipment.department}</p>
                      </div>
                      <div>
                        <Label>Technician</Label>
                        <p className="font-semibold">{selectedEquipment.technician}</p>
                      </div>
                      <div>
                        <Label>Uptime</Label>
                        <p className="font-semibold">{selectedEquipment.uptime}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Specifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(selectedEquipment.specifications).map(([key, value]: [string, any]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="font-semibold">{value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Maintenance Info</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Last Maintenance</span>
                          <span className="font-semibold">{formatTimeAgo(selectedEquipment.lastMaintenance)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Next Maintenance</span>
                          <span className="font-semibold">{formatTimeAgo(selectedEquipment.nextMaintenance)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Warranty Expiry</span>
                          <span className="font-semibold">{selectedEquipment.warrantyExpiry}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Maintenance Cost</span>
                          <span className="font-semibold">${selectedEquipment.maintenanceCost.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedEquipment(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Equipment
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Equipment Modal */}
        <Dialog open={showEquipmentForm} onOpenChange={setShowEquipmentForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-teal-600" />
                <span>Add New Equipment</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="equipmentName">Equipment Name</Label>
                  <Input id="equipmentName" placeholder="Enter equipment name" />
                </div>
                <div>
                  <Label htmlFor="equipmentModel">Model</Label>
                  <Input id="equipmentModel" placeholder="Enter model" />
                </div>
                <div>
                  <Label htmlFor="equipmentType">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Imaging">Imaging</SelectItem>
                      <SelectItem value="Life Support">Life Support</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="Monitoring">Monitoring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="equipmentLocation">Location</Label>
                  <Input id="equipmentLocation" placeholder="Enter location" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEquipmentForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Equipment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
