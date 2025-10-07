"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pill, Syringe, Microscope, Thermometer, Bandage, X, Plus as PlusIcon,
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
  UserCheck, UserPlus, UserMinus, UserX, UserSearch,
  Map, Navigation, Compass, Home, Building2, Building as BuildingIcon2,
  Ambulance, Siren, Zap as ZapIcon, Flame, Skull, Cross, Heart,
  Shield, Stethoscope, AlertTriangle, Activity, Clock, Users, Target
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

// Pharmacy integration data simulation
const medications = [
  {
    id: 'MED001',
    name: 'Aspirin',
    genericName: 'Acetylsalicylic Acid',
    dosage: '81mg',
    form: 'Tablet',
    quantity: 500,
    unit: 'tablets',
    category: 'Cardiovascular',
    status: 'Available',
    priority: 'High',
    expiryDate: '2025-06-15',
    supplier: 'MedSupply Inc.',
    cost: 0.15,
    lastRestocked: '2024-01-10T10:30:00Z',
    nextRestock: '2024-01-25T00:00:00Z',
    interactions: ['Warfarin', 'Ibuprofen'],
    sideEffects: ['Stomach irritation', 'Bleeding risk'],
    indications: ['Heart attack prevention', 'Stroke prevention'],
    contraindications: ['Active bleeding', 'Peptic ulcer']
  },
  {
    id: 'MED002',
    name: 'Morphine',
    genericName: 'Morphine Sulfate',
    dosage: '10mg',
    form: 'Injection',
    quantity: 50,
    unit: 'vials',
    category: 'Analgesic',
    status: 'Low Stock',
    priority: 'Critical',
    expiryDate: '2024-08-20',
    supplier: 'PharmaCorp',
    cost: 2.50,
    lastRestocked: '2024-01-05T14:15:00Z',
    nextRestock: '2024-01-20T00:00:00Z',
    interactions: ['Alcohol', 'Benzodiazepines'],
    sideEffects: ['Respiratory depression', 'Nausea', 'Constipation'],
    indications: ['Severe pain', 'Post-surgical pain'],
    contraindications: ['Respiratory depression', 'Head injury']
  },
  {
    id: 'MED003',
    name: 'Insulin',
    genericName: 'Human Insulin',
    dosage: '100 units/mL',
    form: 'Vial',
    quantity: 25,
    unit: 'vials',
    category: 'Endocrine',
    status: 'Available',
    priority: 'High',
    expiryDate: '2024-12-31',
    supplier: 'DiabetesCare',
    cost: 15.75,
    lastRestocked: '2024-01-12T09:45:00Z',
    nextRestock: '2024-01-27T00:00:00Z',
    interactions: ['Beta-blockers', 'Thiazide diuretics'],
    sideEffects: ['Hypoglycemia', 'Weight gain'],
    indications: ['Diabetes management', 'Hyperglycemia'],
    contraindications: ['Hypoglycemia', 'Allergy to insulin']
  }
];

const pharmacyMetrics = {
  totalMedications: 1247,
  lowStockItems: 23,
  expiredItems: 5,
  totalValue: 125000,
  averageCost: 100.25,
  restockRate: 85.2,
  dispensingAccuracy: 99.8,
  patientSatisfaction: 4.7
};

const dispensingData = [
  { month: 'Jan', prescriptions: 1200, accuracy: 99.5, cost: 15000 },
  { month: 'Feb', prescriptions: 1350, accuracy: 99.8, cost: 16500 },
  { month: 'Mar', prescriptions: 1420, accuracy: 99.7, cost: 17200 },
  { month: 'Apr', prescriptions: 1380, accuracy: 99.9, cost: 16800 },
  { month: 'May', prescriptions: 1560, accuracy: 99.8, cost: 18500 },
  { month: 'Jun', prescriptions: 1680, accuracy: 99.9, cost: 19800 }
];

const categoryData = [
  { name: 'Cardiovascular', count: 245, value: 45000, color: '#ef4444' },
  { name: 'Analgesic', count: 180, value: 32000, color: '#f59e0b' },
  { name: 'Antibiotic', count: 165, value: 28000, color: '#3b82f6' },
  { name: 'Endocrine', count: 120, value: 20000, color: '#10b981' }
];

export default function PharmacyIntegrationSystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('medications');
  const [selectedMedication, setSelectedMedication] = useState<any>(null);
  const [showMedicationForm, setShowMedicationForm] = useState(false);

  // Filter medications
  const filteredMedications = medications.filter(medication => {
    const matchesSearch = medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medication.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medication.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || medication.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || medication.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'Expired': return 'bg-gray-100 text-gray-800';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Hospital Pharmacy Integration
            </h1>
            <p className="text-gray-600 mt-2">Seamless medication management and dispensing workflows</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowMedicationForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Medication
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

        {/* Pharmacy Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Medications',
              value: pharmacyMetrics.totalMedications.toString(),
              change: '+8.3%',
              trend: 'up',
              icon: Pill,
              color: 'from-indigo-500 to-purple-500'
            },
            {
              title: 'Low Stock Items',
              value: pharmacyMetrics.lowStockItems.toString(),
              change: '+12.5%',
              trend: 'up',
              icon: AlertTriangle,
              color: 'from-orange-500 to-red-500'
            },
            {
              title: 'Total Value',
              value: `$${pharmacyMetrics.totalValue.toLocaleString()}`,
              change: '+15.2%',
              trend: 'up',
              icon: DollarSign,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Dispensing Accuracy',
              value: `${pharmacyMetrics.dispensingAccuracy}%`,
              change: '+0.2%',
              trend: 'up',
              icon: Target,
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
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="dispensing">Dispensing</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="medications" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Pill className="w-5 h-5 text-indigo-600" />
                    <span>Medication Management</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search medications..."
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
                        <SelectItem value="Cardiovascular">Cardiovascular</SelectItem>
                        <SelectItem value="Analgesic">Analgesic</SelectItem>
                        <SelectItem value="Antibiotic">Antibiotic</SelectItem>
                        <SelectItem value="Endocrine">Endocrine</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Low Stock">Low Stock</SelectItem>
                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                        <SelectItem value="Expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMedications.map((medication, index) => (
                    <motion.div
                      key={medication.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedMedication(medication)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Pill className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{medication.name}</h3>
                            <Badge className={getStatusColor(medication.status)}>
                              {medication.status}
                            </Badge>
                            <Badge className={getPriorityColor(medication.priority)}>
                              {medication.priority}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {medication.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{medication.genericName} - {medication.dosage}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Quantity: {medication.quantity} {medication.unit}</span>
                            <span className="text-sm text-gray-600">Expiry: {medication.expiryDate}</span>
                            <span className="text-sm text-gray-600">Supplier: {medication.supplier}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{medication.quantity}</p>
                          <p className="text-sm text-gray-600">Stock</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">${medication.cost}</p>
                          <p className="text-sm text-gray-600">Cost</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{medication.form}</p>
                          <p className="text-sm text-gray-600">Form</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMedication(medication);
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

          <TabsContent value="dispensing" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Syringe className="w-5 h-5 text-indigo-600" />
                  <span>Dispensing Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={dispensingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="prescriptions" stroke="#6366f1" strokeWidth={3} />
                    <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={3} />
                    <Line type="monotone" dataKey="cost" stroke="#f59e0b" strokeWidth={3} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-indigo-600" />
                  <span>Inventory Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{pharmacyMetrics.totalMedications - pharmacyMetrics.lowStockItems}</h3>
                      <p className="text-gray-600">Available Items</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-8 h-8 text-yellow-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{pharmacyMetrics.lowStockItems}</h3>
                      <p className="text-gray-600">Low Stock Items</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <X className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{pharmacyMetrics.expiredItems}</h3>
                      <p className="text-gray-600">Expired Items</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-indigo-600" />
                    <span>Category Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                      >
                        {categoryData.map((entry, index) => (
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
                    <span>Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Restock Rate</span>
                      <span className="font-bold text-green-600">{pharmacyMetrics.restockRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Patient Satisfaction</span>
                      <span className="font-bold text-blue-600">{pharmacyMetrics.patientSatisfaction}/5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Cost</span>
                      <span className="font-bold text-purple-600">${pharmacyMetrics.averageCost}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Value</span>
                      <span className="font-bold text-indigo-600">${pharmacyMetrics.totalValue.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Medication Detail Modal */}
        <Dialog open={!!selectedMedication} onOpenChange={() => setSelectedMedication(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Pill className="w-5 h-5 text-indigo-600" />
                <span>Medication Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedMedication && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Pill className="w-10 h-10 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedMedication.name}</h2>
                      <Badge className={getStatusColor(selectedMedication.status)}>
                        {selectedMedication.status}
                      </Badge>
                      <Badge className={getPriorityColor(selectedMedication.priority)}>
                        {selectedMedication.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">{selectedMedication.genericName} - {selectedMedication.dosage}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Form</Label>
                        <p className="font-semibold">{selectedMedication.form}</p>
                      </div>
                      <div>
                        <Label>Category</Label>
                        <p className="font-semibold">{selectedMedication.category}</p>
                      </div>
                      <div>
                        <Label>Quantity</Label>
                        <p className="font-semibold">{selectedMedication.quantity} {selectedMedication.unit}</p>
                      </div>
                      <div>
                        <Label>Cost</Label>
                        <p className="font-semibold">${selectedMedication.cost}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Indications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedMedication.indications.map((indication: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm">{indication}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Side Effects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedMedication.sideEffects.map((effect: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-orange-600" />
                            <span className="text-sm">{effect}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedMedication(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Medication
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Medication Modal */}
        <Dialog open={showMedicationForm} onOpenChange={setShowMedicationForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-indigo-600" />
                <span>Add New Medication</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="medicationName">Medication Name</Label>
                  <Input id="medicationName" placeholder="Enter medication name" />
                </div>
                <div>
                  <Label htmlFor="genericName">Generic Name</Label>
                  <Input id="genericName" placeholder="Enter generic name" />
                </div>
                <div>
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input id="dosage" placeholder="Enter dosage" />
                </div>
                <div>
                  <Label htmlFor="form">Form</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select form" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tablet">Tablet</SelectItem>
                      <SelectItem value="Capsule">Capsule</SelectItem>
                      <SelectItem value="Injection">Injection</SelectItem>
                      <SelectItem value="Vial">Vial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowMedicationForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Medication
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
