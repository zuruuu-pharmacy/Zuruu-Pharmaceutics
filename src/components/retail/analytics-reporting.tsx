"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3, PieChart, LineChart, TrendingUp, TrendingDown, Activity, Target, Zap, Shield,
  Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings, Bell, Star, Heart,
  Award, Database, Network, Cpu, Brain, RefreshCw, RotateCcw, Calendar, Clock, CheckCircle,
  XCircle, AlertTriangle, ArrowUp, ArrowDown, Minus, Percent, Tag, DollarSign, Mail, Phone,
  MapPin, ShoppingCart, Package, User, CheckSquare, Square, Play, Pause, Square as SquareIcon,
  Send, Share2, MessageSquare, Image, Video, FileText, Printer, Globe, Wifi, Smartphone,
  Layers, Archive, Truck, Box, Users, Megaphone, Building, Clipboard, BookOpen, Scale,
  Gavel, Lock, Key, CheckSquare as CheckSquareIcon, Square as SquareIcon2
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
import { LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ComposedChart } from 'recharts';

// Analytics data simulation
const salesData = [
  { month: 'Jan', sales: 45000, profit: 12000, customers: 1250, orders: 890 },
  { month: 'Feb', sales: 52000, profit: 15000, customers: 1420, orders: 1020 },
  { month: 'Mar', sales: 48000, profit: 13000, customers: 1380, orders: 950 },
  { month: 'Apr', sales: 61000, profit: 18000, customers: 1680, orders: 1200 },
  { month: 'May', sales: 55000, profit: 16000, customers: 1520, orders: 1100 },
  { month: 'Jun', sales: 67000, profit: 20000, customers: 1850, orders: 1350 },
  { month: 'Jul', sales: 59000, profit: 17000, customers: 1620, orders: 1180 },
  { month: 'Aug', sales: 63000, profit: 19000, customers: 1720, orders: 1250 },
  { month: 'Sep', sales: 58000, profit: 16500, customers: 1580, orders: 1150 },
  { month: 'Oct', sales: 65000, profit: 19500, customers: 1780, orders: 1300 },
  { month: 'Nov', sales: 62000, profit: 18500, customers: 1700, orders: 1220 },
  { month: 'Dec', sales: 71000, profit: 22000, customers: 1950, orders: 1450 }
];

const productPerformance = [
  { name: 'Prescription Drugs', sales: 125000, profit: 37500, margin: 30, growth: 12.5 },
  { name: 'OTC Medications', sales: 98000, profit: 29400, margin: 30, growth: 8.7 },
  { name: 'Vitamins & Supplements', sales: 85000, profit: 25500, margin: 30, growth: 15.3 },
  { name: 'Medical Devices', sales: 75000, profit: 22500, margin: 30, growth: 6.8 },
  { name: 'Health & Wellness', sales: 62000, profit: 18600, margin: 30, growth: 18.2 }
];

const customerSegments = [
  { name: 'New Customers', count: 2800, percentage: 18.7, revenue: 45000, color: '#8884d8' },
  { name: 'Regular Customers', count: 8500, percentage: 56.7, revenue: 125000, color: '#82ca9d' },
  { name: 'Loyalty Members', count: 6200, percentage: 41.3, revenue: 98000, color: '#ffc658' },
  { name: 'VIP Customers', count: 1500, percentage: 10.0, revenue: 75000, color: '#ff7300' }
];

const reportTemplates = [
  {
    id: 'RPT001',
    name: 'Monthly Sales Report',
    type: 'Sales',
    description: 'Comprehensive monthly sales performance analysis',
    lastGenerated: '2024-01-15',
    frequency: 'Monthly',
    metrics: ['Sales', 'Profit', 'Customers', 'Orders'],
    status: 'Active'
  },
  {
    id: 'RPT002',
    name: 'Inventory Analysis',
    type: 'Inventory',
    description: 'Stock levels, turnover rates, and inventory optimization',
    lastGenerated: '2024-01-14',
    frequency: 'Weekly',
    metrics: ['Stock Levels', 'Turnover', 'Reorder Points'],
    status: 'Active'
  },
  {
    id: 'RPT003',
    name: 'Customer Insights',
    type: 'Customer',
    description: 'Customer behavior, segmentation, and lifetime value',
    lastGenerated: '2024-01-13',
    frequency: 'Monthly',
    metrics: ['Segmentation', 'Lifetime Value', 'Retention'],
    status: 'Active'
  },
  {
    id: 'RPT004',
    name: 'Financial Summary',
    type: 'Financial',
    description: 'Revenue, expenses, profit margins, and financial health',
    lastGenerated: '2024-01-12',
    frequency: 'Monthly',
    metrics: ['Revenue', 'Expenses', 'Profit', 'ROI'],
    status: 'Active'
  }
];

const kpiMetrics = {
  totalRevenue: 720000,
  totalProfit: 210000,
  totalCustomers: 15000,
  totalOrders: 13500,
  averageOrderValue: 53.33,
  customerRetentionRate: 87.5,
  inventoryTurnover: 4.2,
  profitMargin: 29.2,
  revenueGrowth: 12.5,
  customerGrowth: 8.7
};

export default function AnalyticsReporting() {
  const [selectedPeriod, setSelectedPeriod] = useState('12M');
  const [selectedReport, setSelectedReport] = useState('sales');
  const [activeTab, setActiveTab] = useState('overview');
  const [showReportBuilder, setShowReportBuilder] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'Sales': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'Inventory': return <Package className="w-4 h-4 text-blue-600" />;
      case 'Customer': return <Users className="w-4 h-4 text-purple-600" />;
      case 'Financial': return <DollarSign className="w-4 h-4 text-orange-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Analytics & Business Intelligence
            </h1>
            <p className="text-gray-600 mt-2">Advanced data visualization and comprehensive reporting</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1M">1 Month</SelectItem>
                <SelectItem value="3M">3 Months</SelectItem>
                <SelectItem value="6M">6 Months</SelectItem>
                <SelectItem value="12M">12 Months</SelectItem>
                <SelectItem value="YTD">Year to Date</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => setShowReportBuilder(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Report
            </Button>
            <Button
              variant="outline"
              className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
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

        {/* KPI Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              title: 'Total Revenue',
              value: `$${kpiMetrics.totalRevenue.toLocaleString()}`,
              change: `+${kpiMetrics.revenueGrowth}%`,
              trend: 'up',
              icon: DollarSign,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Total Profit',
              value: `$${kpiMetrics.totalProfit.toLocaleString()}`,
              change: '+15.8%',
              trend: 'up',
              icon: TrendingUp,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Total Customers',
              value: kpiMetrics.totalCustomers.toLocaleString(),
              change: `+${kpiMetrics.customerGrowth}%`,
              trend: 'up',
              icon: Users,
              color: 'from-purple-500 to-violet-500'
            },
            {
              title: 'Total Orders',
              value: kpiMetrics.totalOrders.toLocaleString(),
              change: '+12.3%',
              trend: 'up',
              icon: ShoppingCart,
              color: 'from-orange-500 to-red-500'
            },
            {
              title: 'Avg Order Value',
              value: `$${kpiMetrics.averageOrderValue}`,
              change: '+5.7%',
              trend: 'up',
              icon: Target,
              color: 'from-pink-500 to-rose-500'
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
                      <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
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
                      <metric.icon className="w-5 h-5" />
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
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Performance Chart */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-indigo-600" />
                    <span>Sales Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} />
                      <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Customer Segments */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <RechartsPieChart className="w-5 h-5 text-purple-600" />
                    <span>Customer Segments</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={customerSegments}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                      >
                        {customerSegments.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Product Performance */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <span>Product Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productPerformance.map((product, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-indigo-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">Growth: +{product.growth}%</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${product.sales.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Sales</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">${product.profit.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Profit</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{product.margin}%</p>
                          <p className="text-sm text-gray-600">Margin</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <span>Report Templates</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportTemplates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          {getReportIcon(template.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{template.name}</h3>
                            <Badge className={getStatusColor(template.status)}>
                              {template.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {template.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Last Generated: {template.lastGenerated}</span>
                            <span className="text-sm text-gray-600">Frequency: {template.frequency}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTemplate(template);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
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
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Revenue Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="sales" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span>Customer Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="customers" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span>Key Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Customer Retention</span>
                      <span className="font-bold text-green-600">{kpiMetrics.customerRetentionRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Inventory Turnover</span>
                      <span className="font-bold text-blue-600">{kpiMetrics.inventoryTurnover}x</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Profit Margin</span>
                      <span className="font-bold text-purple-600">{kpiMetrics.profitMargin}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Revenue Growth</span>
                      <span className="font-bold text-green-600">+{kpiMetrics.revenueGrowth}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-orange-600" />
                    <span>Performance Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Sales Growth</span>
                      <span className="font-bold text-green-600">+12.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Customer Growth</span>
                      <span className="font-bold text-blue-600">+8.7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Order Growth</span>
                      <span className="font-bold text-purple-600">+15.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Profit Growth</span>
                      <span className="font-bold text-green-600">+18.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-red-600" />
                    <span>Business Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Overall Score</span>
                      <span className="font-bold text-green-600">87/100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Efficiency</span>
                      <span className="font-bold text-blue-600">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Satisfaction</span>
                      <span className="font-bold text-purple-600">94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Growth Rate</span>
                      <span className="font-bold text-green-600">A+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span>AI Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900">Revenue Optimization</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Consider increasing prices for high-demand products by 5-8% to maximize revenue without affecting demand.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900">Customer Retention</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Implement loyalty program for customers with 3+ purchases to increase retention by 15%.
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-900">Inventory Management</h4>
                      <p className="text-sm text-orange-700 mt-1">
                        Reduce stock levels for slow-moving items and increase for high-turnover products.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Growth Opportunities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Expand Product Line</p>
                        <p className="text-sm text-gray-600">Potential revenue increase: $25,000</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">High Impact</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Digital Marketing</p>
                        <p className="text-sm text-gray-600">Potential customer increase: 1,200</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">Medium Impact</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Loyalty Program</p>
                        <p className="text-sm text-gray-600">Potential retention increase: 20%</p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">High Impact</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Report Template Detail Modal */}
        <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <span>Report Template Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedTemplate && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                    {getReportIcon(selectedTemplate.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedTemplate.name}</h2>
                      <Badge className={getStatusColor(selectedTemplate.status)}>
                        {selectedTemplate.status}
                      </Badge>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        {selectedTemplate.type}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Description</Label>
                        <p className="font-semibold">{selectedTemplate.description}</p>
                      </div>
                      <div>
                        <Label>Frequency</Label>
                        <p className="font-semibold">{selectedTemplate.frequency}</p>
                      </div>
                      <div>
                        <Label>Last Generated</Label>
                        <p className="font-semibold">{selectedTemplate.lastGenerated}</p>
                      </div>
                      <div>
                        <Label>Metrics Included</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedTemplate.metrics.map((metric: string, index: number) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                              {metric}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.print()}
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print Report
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Report
                  </Button>
                  <Button
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Template
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Report Builder Modal */}
        <Dialog open={showReportBuilder} onOpenChange={setShowReportBuilder}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-indigo-600" />
                <span>Create Custom Report</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reportName">Report Name</Label>
                  <Input id="reportName" placeholder="Enter report name" />
                </div>
                <div>
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Inventory">Inventory</SelectItem>
                      <SelectItem value="Customer">Customer</SelectItem>
                      <SelectItem value="Financial">Financial</SelectItem>
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
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
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
                      <SelectItem value="CSV">CSV</SelectItem>
                      <SelectItem value="HTML">HTML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter report description" />
              </div>
              <div>
                <Label>Select Metrics</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sales" />
                    <Label htmlFor="sales">Sales</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="profit" />
                    <Label htmlFor="profit">Profit</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="customers" />
                    <Label htmlFor="customers">Customers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="orders" />
                    <Label htmlFor="orders">Orders</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowReportBuilder(false)}>
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