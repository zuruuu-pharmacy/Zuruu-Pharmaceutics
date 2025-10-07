"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign, TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus, Percent, Tag,
  MapPin, ShoppingCart, Package, Globe, Wifi, Layers, Archive, Truck, Box,
  Megaphone, Building, Clipboard, BookOpen, Scale, Gavel, Lock, Key, CheckSquare,
  Square, Play, Pause, Send, Share2, Image, Video, FileText, Printer, BarChart3,
  PieChart, LineChart, Activity as ActivityIcon, Search, Filter, Plus, Edit,
  Trash2, Eye, Download, Upload, Settings, Bell, RefreshCw, RotateCcw, QrCode,
  ScanLine, Barcode, Database, Network, Cpu, Brain, Activity as ActivityIcon2,
  TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon, ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon, Minus as MinusIcon, Percent as PercentIcon, Tag as TagIcon,
  MapPin as MapPinIcon, ShoppingCart as ShoppingCartIcon, Package as PackageIcon,
  Globe as GlobeIcon, Wifi as WifiIcon, Layers as LayersIcon, Archive as ArchiveIcon,
  Truck as TruckIcon, Box as BoxIcon, Megaphone as MegaphoneIcon, Building as BuildingIcon,
  Clipboard as ClipboardIcon, BookOpen as BookOpenIcon, Scale as ScaleIcon, Gavel as GavelIcon,
  Lock as LockIcon, Key as KeyIcon, CheckSquare as CheckSquareIcon, Square as SquareIcon,
  Play as PlayIcon, Pause as PauseIcon, Send as SendIcon, Share2 as Share2Icon,
  Image as ImageIcon, Video as VideoIcon, FileText as FileTextIcon, Printer as PrinterIcon,
  BarChart3 as BarChart3Icon, PieChart as PieChartIcon, LineChart as LineChartIcon,
  Activity as ActivityIcon3, AlertTriangle as AlertTriangleIcon, Clock as ClockIcon,
  Calendar, User, Users as UsersIcon, Star, Award, Phone, Mail, MessageSquare, Camera,
  Mic, Headphones, Volume2, VolumeX, Wifi as WifiIcon2, Battery, Signal, Bluetooth,
  Hospital, UserCheck, UserPlus, UserMinus, UserX, UserSearch,
  Map, Navigation, Compass, Home, Building2, Building as BuildingIcon2, Ambulance,
  Siren, Zap, Flame, Skull, Cross, Heart, Shield, AlertTriangle, Activity as ActivityIcon4,
  Clock as ClockIcon2, Users as UsersIcon2, Target, Pill, Syringe, Microscope, TestTube,
  Beaker, FlaskConical, Droplet, Thermometer, Bandage, X, Plus as PlusIcon, Wrench, Cog,
  Settings as SettingsIcon, Power, PowerOff, AlertCircle, Stethoscope, Monitor, Cpu as CpuIcon,
  HardDrive, Wifi as WifiIcon3, Battery as BatteryIcon, Signal as SignalIcon,
  Bluetooth as BluetoothIcon, Star as StarIcon, Heart as HeartIcon, Zap as ZapIcon,
  CheckCircle, XCircle, Target as TargetIcon, Award as AwardIcon, Shield as ShieldIcon,
  AlertTriangle as AlertTriangleIcon2, Activity as ActivityIcon5, Clock as ClockIcon3,
  Users as UsersIcon3, Target as TargetIcon2, Pill as PillIcon, Syringe as SyringeIcon
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

// Financial management data simulation
const financialMetrics = {
  totalRevenue: 12500000,
  totalExpenses: 9800000,
  netIncome: 2700000,
  operatingMargin: 21.6,
  revenueGrowth: 8.5,
  expenseGrowth: 5.2,
  cashFlow: 3200000,
  accountsReceivable: 2100000,
  accountsPayable: 1800000,
  inventoryValue: 450000,
  debtToEquity: 0.35,
  currentRatio: 2.1,
  returnOnAssets: 12.8,
  returnOnEquity: 18.5
};

const revenueData = [
  { month: 'Jan', revenue: 1050000, expenses: 820000, profit: 230000 },
  { month: 'Feb', revenue: 1120000, expenses: 850000, profit: 270000 },
  { month: 'Mar', revenue: 1180000, expenses: 880000, profit: 300000 },
  { month: 'Apr', revenue: 1250000, expenses: 920000, profit: 330000 },
  { month: 'May', revenue: 1320000, expenses: 950000, profit: 370000 },
  { month: 'Jun', revenue: 1280000, expenses: 980000, profit: 300000 }
];

const departmentRevenue = [
  { department: 'Emergency', revenue: 3200000, percentage: 25.6, growth: 12.5 },
  { department: 'Surgery', revenue: 2800000, percentage: 22.4, growth: 8.3 },
  { department: 'ICU', revenue: 2100000, percentage: 16.8, growth: 15.2 },
  { department: 'Cardiology', revenue: 1800000, percentage: 14.4, growth: 6.8 },
  { department: 'Pediatrics', revenue: 1200000, percentage: 9.6, growth: 4.2 },
  { department: 'Other', revenue: 1400000, percentage: 11.2, growth: 9.1 }
];

const expenseCategories = [
  { category: 'Staff Salaries', amount: 4200000, percentage: 42.9, budget: 4500000 },
  { category: 'Medical Supplies', amount: 1800000, percentage: 18.4, budget: 2000000 },
  { category: 'Equipment', amount: 1200000, percentage: 12.2, budget: 1500000 },
  { category: 'Facilities', amount: 900000, percentage: 9.2, budget: 1000000 },
  { category: 'Utilities', amount: 450000, percentage: 4.6, budget: 500000 },
  { category: 'Other', amount: 1250000, percentage: 12.7, budget: 1000000 }
];

const budgetData = [
  {
    id: 'BUD001',
    department: 'Emergency',
    budget: 3500000,
    spent: 3200000,
    remaining: 300000,
    utilization: 91.4,
    status: 'On Track',
    period: 'Q1 2024',
    responsible: 'Dr. Sarah Thompson'
  },
  {
    id: 'BUD002',
    department: 'Surgery',
    budget: 3000000,
    spent: 2800000,
    remaining: 200000,
    utilization: 93.3,
    status: 'On Track',
    period: 'Q1 2024',
    responsible: 'Dr. Michael Chen'
  },
  {
    id: 'BUD003',
    department: 'ICU',
    budget: 2500000,
    spent: 2100000,
    remaining: 400000,
    utilization: 84.0,
    status: 'Under Budget',
    period: 'Q1 2024',
    responsible: 'Dr. Emily Rodriguez'
  }
];

const paymentData = [
  {
    id: 'PAY001',
    patientName: 'Sarah Johnson',
    patientId: 'PAT001',
    amount: 2500,
    status: 'Paid',
    paymentMethod: 'Insurance',
    date: '2024-01-15T10:30:00Z',
    department: 'Emergency',
    insurance: 'Blue Cross Blue Shield',
    copay: 150,
    deductible: 500
  },
  {
    id: 'PAY002',
    patientName: 'Robert Williams',
    patientId: 'PAT002',
    amount: 1800,
    status: 'Pending',
    paymentMethod: 'Insurance',
    date: '2024-01-14T14:15:00Z',
    department: 'Surgery',
    insurance: 'Aetna',
    copay: 200,
    deductible: 300
  },
  {
    id: 'PAY003',
    patientName: 'Maria Garcia',
    patientId: 'PAT003',
    amount: 3200,
    status: 'Overdue',
    paymentMethod: 'Self Pay',
    date: '2024-01-10T16:45:00Z',
    department: 'ICU',
    insurance: 'None',
    copay: 0,
    deductible: 0
  }
];

const insuranceData = [
  { insurance: 'Blue Cross Blue Shield', patients: 45, revenue: 3200000, percentage: 25.6 },
  { insurance: 'Aetna', patients: 32, revenue: 2100000, percentage: 16.8 },
  { insurance: 'Cigna', patients: 28, revenue: 1800000, percentage: 14.4 },
  { insurance: 'Medicare', patients: 35, revenue: 1500000, percentage: 12.0 },
  { insurance: 'Medicaid', patients: 25, revenue: 1200000, percentage: 9.6 },
  { insurance: 'Other', patients: 30, revenue: 2700000, percentage: 21.6 }
];

export default function FinancialManagementSystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Filter payments
  const filteredPayments = paymentData.filter(payment => {
    const matchesSearch = payment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || payment.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBudgetStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'bg-green-100 text-green-800';
      case 'Under Budget': return 'bg-blue-100 text-blue-800';
      case 'Over Budget': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Financial Management
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive healthcare finance and revenue cycle management</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowPaymentForm(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Payment
            </Button>
            <Button
              variant="outline"
              className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button
              variant="outline"
              className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Financial Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Revenue',
              value: formatCurrency(financialMetrics.totalRevenue),
              change: `+${financialMetrics.revenueGrowth}%`,
              trend: 'up',
              icon: DollarSign,
              color: 'from-emerald-500 to-green-500'
            },
            {
              title: 'Net Income',
              value: formatCurrency(financialMetrics.netIncome),
              change: `+${financialMetrics.revenueGrowth - financialMetrics.expenseGrowth}%`,
              trend: 'up',
              icon: TrendingUp,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Operating Margin',
              value: `${financialMetrics.operatingMargin}%`,
              change: '+2.1%',
              trend: 'up',
              icon: Target,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Cash Flow',
              value: formatCurrency(financialMetrics.cashFlow),
              change: '+12.5%',
              trend: 'up',
              icon: ActivityIcon,
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
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="budgets">Budgets</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-emerald-600" />
                    <span>Revenue Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} />
                      <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-blue-600" />
                    <span>Department Revenue</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={departmentRevenue}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="revenue"
                      >
                        {departmentRevenue.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : index === 1 ? '#3b82f6' : index === 2 ? '#f59e0b' : index === 3 ? '#ef4444' : index === 4 ? '#8b5cf6' : '#6b7280'} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
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
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span>Financial Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Current Ratio</span>
                      <span className="font-bold text-green-600">{financialMetrics.currentRatio}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Debt to Equity</span>
                      <span className="font-bold text-blue-600">{financialMetrics.debtToEquity}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">ROA</span>
                      <span className="font-bold text-purple-600">{financialMetrics.returnOnAssets}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">ROE</span>
                      <span className="font-bold text-orange-600">{financialMetrics.returnOnEquity}%</span>
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
                      <span className="text-gray-600">Revenue Growth</span>
                      <span className="font-bold text-green-600">+{financialMetrics.revenueGrowth}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Expense Growth</span>
                      <span className="font-bold text-red-600">+{financialMetrics.expenseGrowth}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Net Growth</span>
                      <span className="font-bold text-blue-600">+{financialMetrics.revenueGrowth - financialMetrics.expenseGrowth}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ActivityIcon className="w-5 h-5 text-purple-600" />
                    <span>Cash Flow</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cash Flow</span>
                      <span className="font-bold text-green-600">{formatCurrency(financialMetrics.cashFlow)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">A/R</span>
                      <span className="font-bold text-blue-600">{formatCurrency(financialMetrics.accountsReceivable)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">A/P</span>
                      <span className="font-bold text-orange-600">{formatCurrency(financialMetrics.accountsPayable)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Inventory</span>
                      <span className="font-bold text-purple-600">{formatCurrency(financialMetrics.inventoryValue)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                    <span>Payment Management</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search payments..."
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
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Overdue">Overdue</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredPayments.map((payment, index) => (
                    <motion.div
                      key={payment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedPayment(payment)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{payment.patientName}</h3>
                            <Badge className={getStatusColor(payment.status)}>
                              {payment.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {payment.paymentMethod}
                            </Badge>
                            <Badge variant="outline" className="text-purple-600 border-purple-200">
                              {payment.department}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Patient ID: {payment.patientId} | Insurance: {payment.insurance}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Date: {formatTimeAgo(payment.date)}</span>
                            <span className="text-sm text-gray-600">Copay: {formatCurrency(payment.copay)}</span>
                            <span className="text-sm text-gray-600">Deductible: {formatCurrency(payment.deductible)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatCurrency(payment.amount)}</p>
                          <p className="text-sm text-gray-600">Amount</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{payment.paymentMethod}</p>
                          <p className="text-sm text-gray-600">Method</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{payment.department}</p>
                          <p className="text-sm text-gray-600">Department</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPayment(payment);
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

          <TabsContent value="budgets" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <span>Budget Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetData.map((budget, index) => (
                    <motion.div
                      key={budget.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Target className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{budget.department}</h3>
                            <Badge className={getBudgetStatusColor(budget.status)}>
                              {budget.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {budget.period}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Responsible: {budget.responsible}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Budget: {formatCurrency(budget.budget)}</span>
                            <span className="text-sm text-gray-600">Spent: {formatCurrency(budget.spent)}</span>
                            <span className="text-sm text-gray-600">Remaining: {formatCurrency(budget.remaining)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{budget.utilization}%</p>
                          <p className="text-sm text-gray-600">Utilization</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{formatCurrency(budget.remaining)}</p>
                          <p className="text-sm text-gray-600">Remaining</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{budget.status}</p>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-emerald-600" />
                    <span>Expense Categories</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={expenseCategories}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                      <Bar dataKey="amount" fill="#10b981" />
                      <Bar dataKey="budget" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-blue-600" />
                    <span>Insurance Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={insuranceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="revenue"
                      >
                        {insuranceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : index === 1 ? '#3b82f6' : index === 2 ? '#f59e0b' : index === 3 ? '#ef4444' : index === 4 ? '#8b5cf6' : '#6b7280'} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Payment Detail Modal */}
        <Dialog open={!!selectedPayment} onOpenChange={() => setSelectedPayment(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <span>Payment Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedPayment && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-10 h-10 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedPayment.patientName}</h2>
                      <Badge className={getStatusColor(selectedPayment.status)}>
                        {selectedPayment.status}
                      </Badge>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        {selectedPayment.paymentMethod}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">Patient ID: {selectedPayment.patientId} | Department: {selectedPayment.department}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Amount</Label>
                        <p className="font-semibold">{formatCurrency(selectedPayment.amount)}</p>
                      </div>
                      <div>
                        <Label>Insurance</Label>
                        <p className="font-semibold">{selectedPayment.insurance}</p>
                      </div>
                      <div>
                        <Label>Copay</Label>
                        <p className="font-semibold">{formatCurrency(selectedPayment.copay)}</p>
                      </div>
                      <div>
                        <Label>Deductible</Label>
                        <p className="font-semibold">{formatCurrency(selectedPayment.deductible)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedPayment(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Update Payment
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Payment Modal */}
        <Dialog open={showPaymentForm} onOpenChange={setShowPaymentForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                <span>New Payment</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input id="patientName" placeholder="Enter patient name" />
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" placeholder="Enter amount" />
                </div>
                <div>
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Insurance">Insurance</SelectItem>
                      <SelectItem value="Self Pay">Self Pay</SelectItem>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="Surgery">Surgery</SelectItem>
                      <SelectItem value="ICU">ICU</SelectItem>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPaymentForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
