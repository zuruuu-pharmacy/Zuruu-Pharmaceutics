"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign, TrendingUp, TrendingDown, Target, Zap, Shield, Star, Heart, Award,
  Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings, Bell,
  Database, Network, Cpu, Brain, RefreshCw, RotateCcw, Calendar, Clock, CheckCircle,
  XCircle, AlertTriangle, ArrowUp, ArrowDown, Minus, Percent, Tag, Mail, Phone,
  MapPin, ShoppingCart, Package, User, CheckSquare, Square, Play, Pause, Square as SquareIcon,
  Send, Share2, MessageSquare, Image, Video, FileText, Printer, Globe, Wifi, Smartphone,
  Layers, Archive, Truck, Box, Users, Megaphone, Building, Clipboard, BookOpen, Scale,
  Gavel, Lock, Key, CheckSquare as CheckSquareIcon, Square as SquareIcon2, BarChart3,
  PieChart, LineChart, Activity
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

// Dynamic pricing data simulation
const pricingProducts = [
  {
    id: 'PRD001',
    name: 'Aspirin 100mg',
    category: 'Prescription Drugs',
    currentPrice: 12.99,
    competitorPrice: 11.50,
    costPrice: 8.50,
    margin: 34.6,
    demand: 'High',
    stock: 450,
    priceHistory: [
      { date: '2024-01-01', price: 12.50 },
      { date: '2024-01-08', price: 12.75 },
      { date: '2024-01-15', price: 12.99 }
    ],
    competitorAnalysis: {
      competitor1: 11.50,
      competitor2: 13.25,
      competitor3: 12.00,
      average: 12.25
    },
    priceOptimization: {
      recommendedPrice: 12.75,
      potentialRevenue: 1250,
      confidence: 87
    }
  },
  {
    id: 'PRD002',
    name: 'Vitamin D3 1000IU',
    category: 'Vitamins & Supplements',
    currentPrice: 18.99,
    competitorPrice: 16.75,
    costPrice: 12.00,
    margin: 36.8,
    demand: 'Medium',
    stock: 320,
    priceHistory: [
      { date: '2024-01-01', price: 18.50 },
      { date: '2024-01-08', price: 18.75 },
      { date: '2024-01-15', price: 18.99 }
    ],
    competitorAnalysis: {
      competitor1: 16.75,
      competitor2: 19.50,
      competitor3: 17.25,
      average: 17.83
    },
    priceOptimization: {
      recommendedPrice: 18.25,
      potentialRevenue: 890,
      confidence: 92
    }
  },
  {
    id: 'PRD003',
    name: 'Blood Pressure Monitor',
    category: 'Medical Devices',
    currentPrice: 89.99,
    competitorPrice: 95.00,
    costPrice: 65.00,
    margin: 27.8,
    demand: 'Low',
    stock: 85,
    priceHistory: [
      { date: '2024-01-01', price: 89.50 },
      { date: '2024-01-08', price: 89.75 },
      { date: '2024-01-15', price: 89.99 }
    ],
    competitorAnalysis: {
      competitor1: 95.00,
      competitor2: 87.50,
      competitor3: 92.25,
      average: 91.58
    },
    priceOptimization: {
      recommendedPrice: 92.50,
      potentialRevenue: 2100,
      confidence: 78
    }
  }
];

const pricingRules = [
  {
    id: 'RULE001',
    name: 'High Demand Markup',
    description: 'Increase price by 5% for high demand products',
    condition: 'demand = "High"',
    action: 'price * 1.05',
    status: 'Active',
    priority: 'High'
  },
  {
    id: 'RULE002',
    name: 'Competitor Match',
    description: 'Match competitor price for competitive products',
    condition: 'competitorPrice < currentPrice',
    action: 'competitorPrice',
    status: 'Active',
    priority: 'Medium'
  },
  {
    id: 'RULE003',
    name: 'Low Stock Discount',
    description: 'Reduce price by 10% for low stock items',
    condition: 'stock < 100',
    action: 'price * 0.90',
    status: 'Active',
    priority: 'High'
  }
];

const pricingMetrics = {
  totalProducts: pricingProducts.length,
  averageMargin: 32.7,
  priceChanges: 15,
  revenueImpact: 12500,
  competitorAdvantage: 8.5,
  optimizationScore: 87,
  averagePrice: 40.32,
  priceVolatility: 12.3
};

const priceHistoryData = [
  { month: 'Jan', ourPrice: 40.50, competitorPrice: 42.25, marketPrice: 41.00 },
  { month: 'Feb', ourPrice: 40.75, competitorPrice: 41.80, marketPrice: 41.20 },
  { month: 'Mar', ourPrice: 41.00, competitorPrice: 42.10, marketPrice: 41.50 },
  { month: 'Apr', ourPrice: 40.25, competitorPrice: 41.50, marketPrice: 40.80 },
  { month: 'May', ourPrice: 40.50, competitorPrice: 41.75, marketPrice: 41.00 },
  { month: 'Jun', ourPrice: 40.75, competitorPrice: 42.00, marketPrice: 41.25 }
];

export default function DynamicPricing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDemand, setSelectedDemand] = useState('All');
  const [activeTab, setActiveTab] = useState('products');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showRuleForm, setShowRuleForm] = useState(false);

  // Filter products
  const filteredProducts = pricingProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesDemand = selectedDemand === 'All' || product.demand === selectedDemand;
    return matchesSearch && matchesCategory && matchesDemand;
  });

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMarginColor = (margin: number) => {
    if (margin >= 40) return 'text-green-600';
    if (margin >= 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriceTrend = (current: number, previous: number) => {
    if (current > previous) return { icon: ArrowUp, color: 'text-red-600' };
    if (current < previous) return { icon: ArrowDown, color: 'text-green-600' };
    return { icon: Minus, color: 'text-gray-600' };
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
              Dynamic Pricing Engine
            </h1>
            <p className="text-gray-600 mt-2">Intelligent pricing optimization and competitor analysis</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowRuleForm(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Rule
            </Button>
            <Button
              variant="outline"
              className="border-teal-200 text-teal-600 hover:bg-teal-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
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

        {/* Pricing Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Products',
              value: pricingMetrics.totalProducts.toString(),
              change: '+5.2%',
              trend: 'up',
              icon: Package,
              color: 'from-teal-500 to-cyan-500'
            },
            {
              title: 'Average Margin',
              value: `${pricingMetrics.averageMargin}%`,
              change: '+2.1%',
              trend: 'up',
              icon: Percent,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Price Changes',
              value: pricingMetrics.priceChanges.toString(),
              change: '+12.5%',
              trend: 'up',
              icon: TrendingUp,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Revenue Impact',
              value: `$${pricingMetrics.revenueImpact.toLocaleString()}`,
              change: '+18.9%',
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
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-teal-600" />
                    <span>Product Pricing</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search products..."
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
                        <SelectItem value="Prescription Drugs">Prescription Drugs</SelectItem>
                        <SelectItem value="Vitamins & Supplements">Vitamins & Supplements</SelectItem>
                        <SelectItem value="Medical Devices">Medical Devices</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedDemand} onValueChange={setSelectedDemand}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Demand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Demand</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-teal-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                            <Badge className={getDemandColor(product.demand)}>
                              {product.demand}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {product.category}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                            <span className="text-sm text-gray-600">Cost: ${product.costPrice}</span>
                            <span className="text-sm text-gray-600">Competitor: ${product.competitorPrice}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${product.currentPrice}</p>
                          <p className="text-sm text-gray-600">Current Price</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${getMarginColor(product.margin)}`}>
                            {product.margin}%
                          </p>
                          <p className="text-sm text-gray-600">Margin</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-teal-600">
                            ${product.priceOptimization.recommendedPrice}
                          </p>
                          <p className="text-sm text-gray-600">Recommended</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProduct(product);
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

          <TabsContent value="rules" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-teal-600" />
                  <span>Pricing Rules</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pricingRules.map((rule, index) => (
                    <motion.div
                      key={rule.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                          <Zap className="w-6 h-6 text-teal-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{rule.name}</h3>
                            <Badge className="bg-green-100 text-green-800">
                              {rule.status}
                            </Badge>
                            <Badge variant="outline" className="text-orange-600 border-orange-200">
                              {rule.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Condition: {rule.condition}</span>
                            <span className="text-sm text-gray-600">Action: {rule.action}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-blue-600" />
                    <span>Price Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={priceHistoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="ourPrice" stroke="#14b8a6" strokeWidth={3} />
                      <Line type="monotone" dataKey="competitorPrice" stroke="#3b82f6" strokeWidth={3} />
                      <Line type="monotone" dataKey="marketPrice" stroke="#8b5cf6" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <span>Competitor Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pricingProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                            <Package className="w-4 h-4 text-teal-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-600">Our: ${product.currentPrice} | Competitor: ${product.competitorPrice}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${product.currentPrice > product.competitorPrice ? 'text-red-600' : 'text-green-600'}`}>
                            {product.currentPrice > product.competitorPrice ? 'Higher' : 'Lower'}
                          </p>
                          <p className="text-sm text-gray-600">
                            ${Math.abs(product.currentPrice - product.competitorPrice).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <span>Optimization Score</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Overall Score</span>
                      <span className="font-bold text-green-600">{pricingMetrics.optimizationScore}/100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Price Volatility</span>
                      <span className="font-bold text-blue-600">{pricingMetrics.priceVolatility}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Competitor Advantage</span>
                      <span className="font-bold text-purple-600">{pricingMetrics.competitorAdvantage}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Price</span>
                      <span className="font-bold text-orange-600">${pricingMetrics.averagePrice}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span>Revenue Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Potential Revenue</span>
                      <span className="font-bold text-green-600">${pricingMetrics.revenueImpact.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Price Changes</span>
                      <span className="font-bold text-blue-600">{pricingMetrics.priceChanges}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Margin Improvement</span>
                      <span className="font-bold text-purple-600">+5.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Market Position</span>
                      <span className="font-bold text-green-600">Strong</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span>AI Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900">Price Optimization</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Consider increasing prices for high-demand products by 3-5% to maximize revenue.
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900">Competitive Advantage</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Maintain competitive pricing for medium-demand products to retain market share.
                      </p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-900">Inventory Management</h4>
                      <p className="text-sm text-orange-700 mt-1">
                        Reduce prices for low-demand products to clear inventory and improve cash flow.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Product Detail Modal */}
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-teal-600" />
                <span>Product Pricing Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedProduct && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                    <Package className="w-10 h-10 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                      <Badge className={getDemandColor(selectedProduct.demand)}>
                        {selectedProduct.demand}
                      </Badge>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        {selectedProduct.category}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Current Price</Label>
                        <p className="font-semibold">${selectedProduct.currentPrice}</p>
                      </div>
                      <div>
                        <Label>Competitor Price</Label>
                        <p className="font-semibold">${selectedProduct.competitorPrice}</p>
                      </div>
                      <div>
                        <Label>Cost Price</Label>
                        <p className="font-semibold">${selectedProduct.costPrice}</p>
                      </div>
                      <div>
                        <Label>Margin</Label>
                        <p className="font-semibold">{selectedProduct.margin}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Price Optimization</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Recommended Price:</span>
                        <span className="font-semibold text-green-600">${selectedProduct.priceOptimization.recommendedPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Potential Revenue:</span>
                        <span className="font-semibold">${selectedProduct.priceOptimization.potentialRevenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Confidence:</span>
                        <span className="font-semibold text-blue-600">{selectedProduct.priceOptimization.confidence}%</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Competitor Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Competitor 1:</span>
                        <span className="font-semibold">${selectedProduct.competitorAnalysis.competitor1}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Competitor 2:</span>
                        <span className="font-semibold">${selectedProduct.competitorAnalysis.competitor2}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Competitor 3:</span>
                        <span className="font-semibold">${selectedProduct.competitorAnalysis.competitor3}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average:</span>
                        <span className="font-semibold text-blue-600">${selectedProduct.competitorAnalysis.average}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedProduct(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Update Price
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Rule Modal */}
        <Dialog open={showRuleForm} onOpenChange={setShowRuleForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-teal-600" />
                <span>Add Pricing Rule</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Rule Name</Label>
                  <Input id="name" placeholder="Enter rule name" />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
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
                  <Label htmlFor="condition">Condition</Label>
                  <Input id="condition" placeholder="Enter condition" />
                </div>
                <div>
                  <Label htmlFor="action">Action</Label>
                  <Input id="action" placeholder="Enter action" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter rule description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRuleForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Rule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}