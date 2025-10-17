"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Target, 
  DollarSign, 
  Package, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  Download, 
  Filter, 
  Calendar, 
  Settings, 
  Eye, 
  Share, 
  Zap, 
  Bot, 
  Users, 
  Truck, 
  Star, 
  Award, 
  Shield, 
  Database, 
  Cloud, 
  Wifi, 
  WifiOff,
  ArrowUp,
  ArrowDown,
  Minus,
  RotateCcw,
  FileText,
  MessageSquare,
  Mail,
  Phone,
  Bell,
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import { InventoryAnalytics, StockItem, DrugMaster } from '@/types/inventory';

interface StockAnalyticsProps {
  onExportReport: (type: string) => void;
  onViewDetails: (item: any) => void;
  onGenerateInsights: () => void;
}

export default function StockAnalytics({ 
  onExportReport, 
  onViewDetails, 
  onGenerateInsights 
}: StockAnalyticsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'7_days' | '30_days' | '90_days' | '1_year'>('30_days');
  const [selectedMetric, setSelectedMetric] = useState<'value' | 'quantity' | 'turnover' | 'profit'>('value');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [analytics, setAnalytics] = useState<InventoryAnalytics>({
    totalItems: 1247,
    totalValue: 1250000,
    expiringSoon: 23,
    lowStockItems: 15,
    overstockItems: 8,
    stockoutRisk: 5,
    averageTurnover: 4.2,
    wastagePercentage: 2.1,
    topSellingItems: [
      {
        drugMaster: {
          id: 'dm1',
          brandName: 'Metformin',
          genericName: 'Metformin HCl',
          dosageForm: 'tablet',
          strength: '500mg',
          packageSize: '100 tablets',
          therapeuticCategory: 'Antidiabetic',
          manufacturer: 'ABC Pharma',
          supplier: 'MedSupply Co',
          purchaseCost: 150,
          retailPrice: 200,
          margin: 33.3,
          storageConditions: {
            temperature: 'Room Temperature',
            humidity: 'Normal',
            lightSensitive: false,
            refrigerated: false
          },
          barcode: '1234567890123',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        quantitySold: 450,
        revenue: 90000
      },
      {
        drugMaster: {
          id: 'dm2',
          brandName: 'Amoxicillin',
          genericName: 'Amoxicillin',
          dosageForm: 'capsule',
          strength: '250mg',
          packageSize: '50 capsules',
          therapeuticCategory: 'Antibiotic',
          manufacturer: 'XYZ Pharma',
          supplier: 'HealthSupply',
          purchaseCost: 300,
          retailPrice: 400,
          margin: 33.3,
          storageConditions: {
            temperature: 'Room Temperature',
            humidity: 'Normal',
            lightSensitive: false,
            refrigerated: false
          },
          barcode: '2345678901234',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        quantitySold: 320,
        revenue: 128000
      }
    ],
    slowMovingItems: [
      {
        drugMaster: {
          id: 'dm3',
          brandName: 'Rare Drug X',
          genericName: 'Rare Drug X',
          dosageForm: 'tablet',
          strength: '100mg',
          packageSize: '30 tablets',
          therapeuticCategory: 'Specialty',
          manufacturer: 'Special Pharma',
          supplier: 'Special Supply',
          purchaseCost: 500,
          retailPrice: 650,
          margin: 30,
          storageConditions: {
            temperature: 'Room Temperature',
            humidity: 'Normal',
            lightSensitive: false,
            refrigerated: false
          },
          barcode: '3456789012345',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        daysInStock: 180,
        lastSold: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    ],
    categoryBreakdown: [
      { category: 'Antidiabetic', count: 45, value: 450000, percentage: 36 },
      { category: 'Antibiotic', count: 38, value: 380000, percentage: 30.4 },
      { category: 'Analgesic', count: 25, value: 200000, percentage: 16 },
      { category: 'Cardiovascular', count: 20, value: 150000, percentage: 12 },
      { category: 'Other', count: 15, value: 70000, percentage: 5.6 }
    ],
    supplierPerformance: [
      {
        supplier: {
          id: 's1',
          name: 'MedSupply Co',
          contactPerson: 'John Doe',
          email: 'john@medsupply.com',
          phone: '+92-300-1234567',
          address: '123 Medical Street',
          city: 'Karachi',
          country: 'Pakistan',
          leadTime: 7,
          minimumOrderQuantity: 1000,
          paymentTerms: 'Net 30',
          rating: 4.5,
          reliability: 95,
          lastOrderDate: new Date(),
          totalOrders: 45,
          onTimeDeliveryRate: 98,
          defectRate: 1.2,
          isActive: true
        },
        onTimeDelivery: 98,
        defectRate: 1.2,
        averageLeadTime: 7
      }
    ]
  });

  const [kpiMetrics] = useState([
    { 
      title: 'Stock Turnover Ratio', 
      value: '4.2x', 
      change: '+0.3', 
      trend: 'up', 
      color: 'green',
      description: 'How quickly inventory is sold and replaced'
    },
    { 
      title: 'Average Holding Time', 
      value: '87 days', 
      change: '-5 days', 
      trend: 'down', 
      color: 'green',
      description: 'Average time items stay in inventory'
    },
    { 
      title: 'Wastage Percentage', 
      value: '2.1%', 
      change: '-0.5%', 
      trend: 'down', 
      color: 'green',
      description: 'Percentage of inventory lost to expiry'
    },
    { 
      title: 'Supplier Reliability', 
      value: '94.2%', 
      change: '+2.1%', 
      trend: 'up', 
      color: 'blue',
      description: 'On-time delivery rate from suppliers'
    },
    { 
      title: 'Forecast Accuracy', 
      value: '87.5%', 
      change: '+3.2%', 
      trend: 'up', 
      color: 'purple',
      description: 'Accuracy of AI demand predictions'
    },
    { 
      title: 'Stockout Rate', 
      value: '1.8%', 
      change: '-0.7%', 
      trend: 'down', 
      color: 'green',
      description: 'Percentage of time items are out of stock'
    }
  ]);

  const handleGenerateInsights = async () => {
    setIsGeneratingInsights(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGeneratingInsights(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getMetricColor = (color: string) => {
    switch (color) {
      case 'green': return 'text-green-600 bg-green-100';
      case 'blue': return 'text-blue-600 bg-blue-100';
      case 'purple': return 'text-purple-600 bg-purple-100';
      case 'orange': return 'text-orange-600 bg-orange-100';
      case 'red': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <span>Stock Analytics</span>
          </h2>
          <p className="text-gray-600">Comprehensive insights and performance metrics for inventory management</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleGenerateInsights}
            disabled={isGeneratingInsights}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            <Bot className="w-4 h-4" />
            <span>{isGeneratingInsights ? 'Generating...' : 'AI Insights'}</span>
          </button>
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${getMetricColor(metric.color)}`}>
                {metric.color}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center space-x-1 mt-2">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-sm ${getTrendColor(metric.trend)}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-8 h-8 text-gray-400" />
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">{metric.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="7_days">Last 7 Days</option>
                  <option value="30_days">Last 30 Days</option>
                  <option value="90_days">Last 90 Days</option>
                  <option value="1_year">Last Year</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Metric Type</label>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="value">Value</option>
                  <option value="quantity">Quantity</option>
                  <option value="turnover">Turnover</option>
                  <option value="profit">Profit</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="Antidiabetic">Antidiabetic</option>
                  <option value="Antibiotic">Antibiotic</option>
                  <option value="Analgesic">Analgesic</option>
                  <option value="Cardiovascular">Cardiovascular</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Value Trend */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Stock Value Trend</h3>
            <div className="flex space-x-2">
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <Share className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Stock Value Chart</p>
              <p className="text-xs text-gray-400">Interactive chart showing value trends over time</p>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Category Distribution</h3>
            <div className="flex space-x-2">
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <Share className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Category Breakdown Chart</p>
              <p className="text-xs text-gray-400">Visual distribution of inventory by category</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling Items */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Top Selling Items</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                Export
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                View All
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Sold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analytics.topSellingItems.map((item, index) => (
                <motion.tr
                  key={item.drugMaster.id}
                  className="hover:bg-gray-50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        index === 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <Package className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.drugMaster.brandName}</div>
                        <div className="text-sm text-gray-500">{item.drugMaster.genericName}</div>
                        <div className="text-xs text-gray-400">{item.drugMaster.strength}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatNumber(item.quantitySold)} units
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(item.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {item.drugMaster.margin}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">+12%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onViewDetails(item)}
                        className="text-teal-600 hover:text-teal-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supplier Performance */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Supplier Performance</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {analytics.supplierPerformance.map((supplier, index) => (
              <motion.div
                key={supplier.supplier.id}
                className="border border-gray-200 rounded-lg p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{supplier.supplier.name}</h4>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">{supplier.supplier.rating}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">On-time Delivery</span>
                    <span className="font-medium">{supplier.onTimeDelivery}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Defect Rate</span>
                    <span className="font-medium">{supplier.defectRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg Lead Time</span>
                    <span className="font-medium">{supplier.averageLeadTime} days</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Total Orders: {supplier.supplier.totalOrders}</span>
                    <span>Reliability: {supplier.supplier.reliability}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
