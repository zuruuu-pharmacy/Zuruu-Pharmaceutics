"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Calendar,
  Clock, Target, Star, Award, PieChart, LineChart, BarChart, Activity, Zap,
  Plus, Search, Filter, Edit, Trash2, Eye, Download, Upload, Settings, Save,
  RefreshCw, Share2, Lock, Unlock, Copy, ExternalLink, Play, Pause, Square,
  Bell, MessageSquare, Heart, Globe, Building, Microscope, TestTube,
  FlaskConical, Atom, Brain, Database, GraduationCap, BookOpen,
  FileText, Shield, Gavel, Scale, Clipboard, Video, Camera, Headphones, Monitor,
  Smartphone, Tablet, UserCheck, UserPlus, Mail, Phone, MapPin, Briefcase,
  Trophy, AlertTriangle, CheckCircle, XCircle, ArrowUp, ArrowDown, Minus,
  RotateCcw, RotateCw, Package, ShoppingBag, CreditCard, Receipt
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { faker } from '@faker-js/faker';

interface SalesData {
  id: string;
  date: Date;
  period: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Yearly';
  revenue: number;
  orders: number;
  customers: number;
  averageOrderValue: number;
  conversionRate: number;
  refunds: number;
  returns: number;
  discounts: number;
  taxes: number;
  shipping: number;
  netRevenue: number;
  grossMargin: number;
  channel: 'Online' | 'Store' | 'Mobile' | 'Phone' | 'Email';
  category: string;
  region: string;
  metrics: SalesMetrics;
  trends: TrendData[];
  topProducts: ProductPerformance[];
  topCustomers: CustomerPerformance[];
}

interface SalesMetrics {
  revenueGrowth: number;
  orderGrowth: number;
  customerGrowth: number;
  aovGrowth: number;
  conversionGrowth: number;
  marginGrowth: number;
  seasonality: number;
  volatility: number;
  predictability: number;
}

interface TrendData {
  date: Date;
  value: number;
  type: 'Revenue' | 'Orders' | 'Customers' | 'AOV' | 'Conversion';
}

interface ProductPerformance {
  id: string;
  name: string;
  category: string;
  revenue: number;
  units: number;
  margin: number;
  growth: number;
  rank: number;
}

interface CustomerPerformance {
  id: string;
  name: string;
  type: string;
  revenue: number;
  orders: number;
  aov: number;
  growth: number;
  rank: number;
}

const generateMockSalesData = (id: number): SalesData => {
  const periods: SalesData['period'][] = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
  const channels: SalesData['channel'][] = ['Online', 'Store', 'Mobile', 'Phone', 'Email'];
  const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Beauty', 'Automotive'];
  const regions = ['North', 'South', 'East', 'West', 'Central'];
  
  const period = faker.helpers.arrayElement(periods);
  const channel = faker.helpers.arrayElement(channels);
  const category = faker.helpers.arrayElement(categories);
  const region = faker.helpers.arrayElement(regions);
  
  const revenue = faker.number.float({ min: 1000, max: 100000, fractionDigits: 0.01 });
  const orders = faker.number.int({ min: 10, max: 1000 });
  const customers = faker.number.int({ min: 5, max: 800 });
  const averageOrderValue = revenue / orders;
  const conversionRate = faker.number.float({ min: 1, max: 15, fractionDigits: 0.1 });
  const refunds = faker.number.float({ min: 0, max: revenue * 0.1, fractionDigits: 0.01 });
  const returns = faker.number.float({ min: 0, max: revenue * 0.05, fractionDigits: 0.01 });
  const discounts = faker.number.float({ min: 0, max: revenue * 0.2, fractionDigits: 0.01 });
  const taxes = faker.number.float({ min: 0, max: revenue * 0.1, fractionDigits: 0.01 });
  const shipping = faker.number.float({ min: 0, max: revenue * 0.05, fractionDigits: 0.01 });
  const netRevenue = revenue - refunds - returns;
  const grossMargin = faker.number.float({ min: 20, max: 80, fractionDigits: 0.1 });
  
  const trends: TrendData[] = Array.from({ length: 30 }).map((_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
    value: faker.number.float({ min: 1000, max: 10000, fractionDigits: 0.01 }),
    type: faker.helpers.arrayElement(['Revenue', 'Orders', 'Customers', 'AOV', 'Conversion'])
  }));
  
  const topProducts: ProductPerformance[] = Array.from({ length: 10 }).map((_, i) => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    category: faker.helpers.arrayElement(categories),
    revenue: faker.number.float({ min: 1000, max: 10000, fractionDigits: 0.01 }),
    units: faker.number.int({ min: 10, max: 500 }),
    margin: faker.number.float({ min: 10, max: 60, fractionDigits: 0.1 }),
    growth: faker.number.float({ min: -20, max: 50, fractionDigits: 0.1 }),
    rank: i + 1
  }));
  
  const topCustomers: CustomerPerformance[] = Array.from({ length: 10 }).map((_, i) => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    type: faker.helpers.arrayElement(['Individual', 'Business', 'VIP', 'Premium']),
    revenue: faker.number.float({ min: 500, max: 5000, fractionDigits: 0.01 }),
    orders: faker.number.int({ min: 1, max: 50 }),
    aov: faker.number.float({ min: 50, max: 500, fractionDigits: 0.01 }),
    growth: faker.number.float({ min: -30, max: 100, fractionDigits: 0.1 }),
    rank: i + 1
  }));
  
  return {
    id: faker.string.uuid(),
    date: faker.date.recent({ days: 365 }),
    period,
    revenue,
    orders,
    customers,
    averageOrderValue,
    conversionRate,
    refunds,
    returns,
    discounts,
    taxes,
    shipping,
    netRevenue,
    grossMargin,
    channel,
    category,
    region,
    metrics: {
      revenueGrowth: faker.number.float({ min: -20, max: 50, fractionDigits: 0.1 }),
      orderGrowth: faker.number.float({ min: -15, max: 40, fractionDigits: 0.1 }),
      customerGrowth: faker.number.float({ min: -10, max: 30, fractionDigits: 0.1 }),
      aovGrowth: faker.number.float({ min: -5, max: 25, fractionDigits: 0.1 }),
      conversionGrowth: faker.number.float({ min: -10, max: 20, fractionDigits: 0.1 }),
      marginGrowth: faker.number.float({ min: -5, max: 15, fractionDigits: 0.1 }),
      seasonality: faker.number.float({ min: 0, max: 1, fractionDigits: 0.01 }),
      volatility: faker.number.float({ min: 0, max: 1, fractionDigits: 0.01 }),
      predictability: faker.number.float({ min: 0, max: 1, fractionDigits: 0.01 })
    },
    trends,
    topProducts,
    topCustomers
  };
};

export default function SalesAnalytics() {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState<string>('All');
  const [filterChannel, setFilterChannel] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<SalesData | null>(null);

  useEffect(() => {
    const mockSalesData = Array.from({ length: 30 }, (_, i) => generateMockSalesData(i));
    setSalesData(mockSalesData);
  }, []);

  const filteredSalesData = useMemo(() => {
    return salesData.filter(data => {
      const matchesSearch = data.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           data.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           data.channel.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPeriod = filterPeriod === 'All' || data.period === filterPeriod;
      const matchesChannel = filterChannel === 'All' || data.channel === filterChannel;
      const matchesCategory = filterCategory === 'All' || data.category === filterCategory;
      
      return matchesSearch && matchesPeriod && matchesChannel && matchesCategory;
    });
  }, [salesData, searchTerm, filterPeriod, filterChannel, filterCategory]);

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (growth < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'Online': return 'bg-blue-100 text-blue-800';
      case 'Store': return 'bg-green-100 text-green-800';
      case 'Mobile': return 'bg-purple-100 text-purple-800';
      case 'Phone': return 'bg-orange-100 text-orange-800';
      case 'Email': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPeriodColor = (period: string) => {
    switch (period) {
      case 'Daily': return 'bg-green-100 text-green-800';
      case 'Weekly': return 'bg-blue-100 text-blue-800';
      case 'Monthly': return 'bg-purple-100 text-purple-800';
      case 'Quarterly': return 'bg-orange-100 text-orange-800';
      case 'Yearly': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Analytics</h1>
          <p className="text-gray-600 mt-2">Comprehensive sales performance metrics and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => {/* Export functionality */}}
            variant="outline"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Report
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Sales Report</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Report Name</Label>
                    <Input placeholder="Enter report name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Quarterly">Quarterly</SelectItem>
                        <SelectItem value="Yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Channel</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="Store">Store</SelectItem>
                        <SelectItem value="Mobile">Mobile</SelectItem>
                        <SelectItem value="Phone">Phone</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Clothing">Clothing</SelectItem>
                        <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Books">Books</SelectItem>
                        <SelectItem value="Beauty">Beauty</SelectItem>
                        <SelectItem value="Automotive">Automotive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddModalOpen(false)}>
                  Create Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${salesData.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {salesData.length > 0 ? (salesData.reduce((sum, d) => sum + d.metrics.revenueGrowth, 0) / salesData.length).toFixed(1) : 0}% growth
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {salesData.reduce((sum, d) => sum + d.orders, 0).toLocaleString()}
                </p>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-blue-600">
                {salesData.length > 0 ? (salesData.reduce((sum, d) => sum + d.metrics.orderGrowth, 0) / salesData.length).toFixed(1) : 0}% growth
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {salesData.reduce((sum, d) => sum + d.customers, 0).toLocaleString()}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-purple-600">
                {salesData.length > 0 ? (salesData.reduce((sum, d) => sum + d.metrics.customerGrowth, 0) / salesData.length).toFixed(1) : 0}% growth
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${salesData.length > 0 ? (salesData.reduce((sum, d) => sum + d.averageOrderValue, 0) / salesData.length).toFixed(0) : 0}
                </p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-orange-600">
                {salesData.length > 0 ? (salesData.reduce((sum, d) => sum + d.metrics.aovGrowth, 0) / salesData.length).toFixed(1) : 0}% growth
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search sales data..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Period</Label>
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="All Periods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Periods</SelectItem>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Channel</Label>
              <Select value={filterChannel} onValueChange={setFilterChannel}>
                <SelectTrigger>
                  <SelectValue placeholder="All Channels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Channels</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Store">Store</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                  <SelectItem value="Phone">Phone</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Books">Books</SelectItem>
                  <SelectItem value="Beauty">Beauty</SelectItem>
                  <SelectItem value="Automotive">Automotive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sales Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSalesData.map((data, index) => (
          <motion.div
            key={data.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg">{data.category}</CardTitle>
                    <p className="text-sm text-gray-600">{data.region} Region</p>
                    <p className="text-sm text-gray-500">{data.date.toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getPeriodColor(data.period)}>
                      {data.period}
                    </Badge>
                    <Badge className={getChannelColor(data.channel)}>
                      {data.channel}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Revenue:</span>
                    <span className="ml-1 font-medium">${data.revenue.toFixed(0)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Orders:</span>
                    <span className="ml-1 font-medium">{data.orders}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Customers:</span>
                    <span className="ml-1 font-medium">{data.customers}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">AOV:</span>
                    <span className="ml-1 font-medium">${data.averageOrderValue.toFixed(0)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Conversion Rate</span>
                    <span className="font-medium">{data.conversionRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={data.conversionRate} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    {getGrowthIcon(data.metrics.revenueGrowth)}
                    <span className={getGrowthColor(data.metrics.revenueGrowth)}>
                      {data.metrics.revenueGrowth > 0 ? '+' : ''}{data.metrics.revenueGrowth.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getGrowthIcon(data.metrics.orderGrowth)}
                    <span className={getGrowthColor(data.metrics.orderGrowth)}>
                      {data.metrics.orderGrowth > 0 ? '+' : ''}{data.metrics.orderGrowth.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedData(data);
                        setIsViewModalOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">
                    {data.date.toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Sales Data Details</DialogTitle>
          </DialogHeader>
          {selectedData && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg">{selectedData.category} - {selectedData.region}</h3>
                  <p className="text-gray-600">{selectedData.period} Report</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedData.date.toLocaleDateString()}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Channel:</span>
                    <Badge className={getChannelColor(selectedData.channel)}>
                      {selectedData.channel}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Period:</span>
                    <Badge className={getPeriodColor(selectedData.period)}>
                      {selectedData.period}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Revenue:</span>
                    <span className="font-medium">${selectedData.revenue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Orders:</span>
                    <span className="font-medium">{selectedData.orders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Customers:</span>
                    <span className="font-medium">{selectedData.customers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">AOV:</span>
                    <span className="font-medium">${selectedData.averageOrderValue.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="products">Top Products</TabsTrigger>
                  <TabsTrigger value="customers">Top Customers</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Financial Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Gross Revenue:</span>
                            <span className="font-medium">${selectedData.revenue.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Refunds:</span>
                            <span className="font-medium">-${selectedData.refunds.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Returns:</span>
                            <span className="font-medium">-${selectedData.returns.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Discounts:</span>
                            <span className="font-medium">-${selectedData.discounts.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Net Revenue:</span>
                            <span className="font-medium">${selectedData.netRevenue.toFixed(2)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Performance Metrics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Conversion Rate:</span>
                            <span className="font-medium">{selectedData.conversionRate.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Gross Margin:</span>
                            <span className="font-medium">{selectedData.grossMargin.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Taxes:</span>
                            <span className="font-medium">${selectedData.taxes.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Shipping:</span>
                            <span className="font-medium">${selectedData.shipping.toFixed(2)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="metrics" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Growth Metrics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Revenue Growth:</span>
                            <div className="flex items-center space-x-1">
                              {getGrowthIcon(selectedData.metrics.revenueGrowth)}
                              <span className={getGrowthColor(selectedData.metrics.revenueGrowth)}>
                                {selectedData.metrics.revenueGrowth > 0 ? '+' : ''}{selectedData.metrics.revenueGrowth.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Order Growth:</span>
                            <div className="flex items-center space-x-1">
                              {getGrowthIcon(selectedData.metrics.orderGrowth)}
                              <span className={getGrowthColor(selectedData.metrics.orderGrowth)}>
                                {selectedData.metrics.orderGrowth > 0 ? '+' : ''}{selectedData.metrics.orderGrowth.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Customer Growth:</span>
                            <div className="flex items-center space-x-1">
                              {getGrowthIcon(selectedData.metrics.customerGrowth)}
                              <span className={getGrowthColor(selectedData.metrics.customerGrowth)}>
                                {selectedData.metrics.customerGrowth > 0 ? '+' : ''}{selectedData.metrics.customerGrowth.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">AOV Growth:</span>
                            <div className="flex items-center space-x-1">
                              {getGrowthIcon(selectedData.metrics.aovGrowth)}
                              <span className={getGrowthColor(selectedData.metrics.aovGrowth)}>
                                {selectedData.metrics.aovGrowth > 0 ? '+' : ''}{selectedData.metrics.aovGrowth.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Analytics Metrics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Seasonality:</span>
                            <span className="font-medium">{(selectedData.metrics.seasonality * 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Volatility:</span>
                            <span className="font-medium">{(selectedData.metrics.volatility * 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Predictability:</span>
                            <span className="font-medium">{(selectedData.metrics.predictability * 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Margin Growth:</span>
                            <div className="flex items-center space-x-1">
                              {getGrowthIcon(selectedData.metrics.marginGrowth)}
                              <span className={getGrowthColor(selectedData.metrics.marginGrowth)}>
                                {selectedData.metrics.marginGrowth > 0 ? '+' : ''}{selectedData.metrics.marginGrowth.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="products" className="space-y-4">
                  <div className="space-y-3">
                    {selectedData.topProducts.map((product, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">#{product.rank} {product.name}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{product.category}</Badge>
                            <span className="text-sm font-medium">${product.revenue.toFixed(0)}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Units:</span>
                            <span className="ml-1 font-medium">{product.units}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Margin:</span>
                            <span className="ml-1 font-medium">{product.margin.toFixed(1)}%</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Growth:</span>
                            <div className="flex items-center space-x-1">
                              {getGrowthIcon(product.growth)}
                              <span className={getGrowthColor(product.growth)}>
                                {product.growth > 0 ? '+' : ''}{product.growth.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="customers" className="space-y-4">
                  <div className="space-y-3">
                    {selectedData.topCustomers.map((customer, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">#{customer.rank} {customer.name}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{customer.type}</Badge>
                            <span className="text-sm font-medium">${customer.revenue.toFixed(0)}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Orders:</span>
                            <span className="ml-1 font-medium">{customer.orders}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">AOV:</span>
                            <span className="ml-1 font-medium">${customer.aov.toFixed(0)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Growth:</span>
                            <div className="flex items-center space-x-1">
                              {getGrowthIcon(customer.growth)}
                              <span className={getGrowthColor(customer.growth)}>
                                {customer.growth > 0 ? '+' : ''}{customer.growth.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
