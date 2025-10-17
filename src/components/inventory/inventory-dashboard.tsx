"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  RefreshCw, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Activity, 
  Zap, 
  Bot, 
  Bell, 
  Settings, 
  QrCode, 
  Barcode, 
  Calendar, 
  DollarSign, 
  Users, 
  Truck, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  RotateCcw,
  FileText,
  Share,
  Star,
  Target,
  Shield,
  Database,
  Cloud,
  Wifi,
  WifiOff
} from 'lucide-react';

import { 
  DrugMaster, 
  StockItem, 
  InventoryAnalytics, 
  ExpiryAlert, 
  LowStockAlert, 
  DemandForecast 
} from '@/types/inventory';

interface InventoryDashboardProps {
  onAddStock: () => void;
  onEditStock: (item: StockItem) => void;
  onViewDetails: (item: StockItem) => void;
  onGenerateReport: () => void;
}

export default function InventoryDashboard({ 
  onAddStock, 
  onEditStock, 
  onViewDetails, 
  onGenerateReport 
}: InventoryDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'stock' | 'alerts' | 'forecast' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'quantity' | 'expiry' | 'value'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [analytics, setAnalytics] = useState<InventoryAnalytics>({
    totalItems: 1247,
    totalValue: 125000,
    expiringSoon: 23,
    lowStockItems: 15,
    overstockItems: 8,
    stockoutRisk: 5,
    averageTurnover: 4.2,
    wastagePercentage: 2.1,
    topSellingItems: [],
    slowMovingItems: [],
    categoryBreakdown: [],
    supplierPerformance: []
  });

  const [stockItems] = useState<StockItem[]>([
    {
      id: '1',
      drugMasterId: 'dm1',
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
      batchNumber: 'M12345',
      expiryDate: new Date('2025-12-01'),
      quantity: 120,
      minimumLevel: 50,
      maximumLevel: 200,
      currentLevel: 'normal',
      location: 'A-1',
      shelf: 'Shelf 1',
      status: 'active',
      lastUpdated: new Date(),
      lastAudit: new Date(),
      costPrice: 150,
      sellingPrice: 200,
      supplier: 'MedSupply Co',
      purchaseDate: new Date('2024-01-15'),
      invoiceNumber: 'INV-001'
    },
    {
      id: '2',
      drugMasterId: 'dm2',
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
      batchNumber: 'A67890',
      expiryDate: new Date('2025-11-20'),
      quantity: 30,
      minimumLevel: 100,
      maximumLevel: 300,
      currentLevel: 'low',
      location: 'B-2',
      shelf: 'Shelf 2',
      status: 'active',
      lastUpdated: new Date(),
      lastAudit: new Date(),
      costPrice: 300,
      sellingPrice: 400,
      supplier: 'HealthSupply',
      purchaseDate: new Date('2024-01-10'),
      invoiceNumber: 'INV-002'
    }
  ]);

  const [expiryAlerts] = useState<ExpiryAlert[]>([
    {
      id: '1',
      stockItemId: '1',
      stockItem: stockItems[0],
      alertType: 'expiring_30_days',
      daysToExpiry: 15,
      severity: 'high',
      isRead: false,
      createdAt: new Date(),
      suggestedAction: 'discount'
    }
  ]);

  const [lowStockAlerts] = useState<LowStockAlert[]>([
    {
      id: '1',
      stockItemId: '2',
      stockItem: stockItems[1],
      currentQuantity: 30,
      minimumLevel: 100,
      suggestedReorderQuantity: 200,
      urgency: 'critical',
      isRead: false,
      createdAt: new Date(),
      supplier: 'HealthSupply',
      estimatedCost: 60000
    }
  ]);

  const [demandForecasts] = useState<DemandForecast[]>([
    {
      id: '1',
      drugMasterId: 'dm1',
      drugMaster: stockItems[0].drugMaster,
      forecastPeriod: '30_days',
      predictedDemand: 150,
      confidence: 87,
      factors: {
        historicalSales: 120,
        seasonalTrend: 10,
        prescriptionTrend: 15,
        diseaseOutbreak: 5
      },
      generatedAt: new Date(),
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  ]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-100';
      case 'low': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      case 'overstock': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-4 h-4" />;
      case 'low': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <XCircle className="w-4 h-4" />;
      case 'overstock': return <ArrowUp className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getExpiryColor = (daysToExpiry: number) => {
    if (daysToExpiry < 0) return 'text-red-600 bg-red-100';
    if (daysToExpiry <= 30) return 'text-red-600 bg-red-100';
    if (daysToExpiry <= 60) return 'text-yellow-600 bg-yellow-100';
    if (daysToExpiry <= 90) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Total Items', 
            value: analytics.totalItems.toLocaleString(), 
            change: '+5.2%', 
            color: 'blue', 
            icon: Package,
            trend: 'up'
          },
          { 
            title: 'Total Value', 
            value: formatCurrency(analytics.totalValue), 
            change: '+8.1%', 
            color: 'green', 
            icon: DollarSign,
            trend: 'up'
          },
          { 
            title: 'Expiring Soon', 
            value: analytics.expiringSoon.toString(), 
            change: '-12%', 
            color: 'orange', 
            icon: Clock,
            trend: 'down'
          },
          { 
            title: 'Low Stock', 
            value: analytics.lowStockItems.toString(), 
            change: '+3', 
            color: 'red', 
            icon: AlertTriangle,
            trend: 'up'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center space-x-1 mt-2">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-xs ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <metric.icon className={`w-8 h-8 text-${metric.color}-500`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Value Trend</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Stock Value Chart</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Category Breakdown Chart</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          {[...expiryAlerts, ...lowStockAlerts].slice(0, 5).map((alert, index) => (
            <motion.div
              key={alert.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  'daysToExpiry' in alert ? 'bg-orange-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900">
                    {'daysToExpiry' in alert 
                      ? `${alert.stockItem.drugMaster.brandName} expiring in ${alert.daysToExpiry} days`
                      : `${alert.stockItem.drugMaster.brandName} low stock (${alert.currentQuantity} remaining)`
                    }
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatDate(alert.createdAt)}
                  </p>
                </div>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <Eye className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStockTable = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Stock Inventory</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search drugs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Antidiabetic">Antidiabetic</option>
              <option value="Antibiotic">Antibiotic</option>
              <option value="Analgesic">Analgesic</option>
            </select>
            <button
              onClick={onAddStock}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Stock</span>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stockItems.map((item, index) => (
              <motion.tr
                key={item.id}
                className="hover:bg-gray-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                      <Package className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.drugMaster.brandName}</div>
                      <div className="text-sm text-gray-500">{item.drugMaster.genericName}</div>
                      <div className="text-xs text-gray-400">{item.drugMaster.strength}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.batchNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getExpiryColor(
                    Math.ceil((item.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                  )}`}>
                    {formatDate(item.expiryDate)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center space-x-2">
                    <span>{item.quantity}</span>
                    <span className="text-xs text-gray-500">/ {item.maximumLevel}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 ${getStatusColor(item.currentLevel)}`}>
                    {getStatusIcon(item.currentLevel)}
                    <span className="capitalize">{item.currentLevel}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(item.quantity * item.sellingPrice)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onViewDetails(item)}
                      className="text-teal-600 hover:text-teal-900"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEditStock(item)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'stock':
        return renderStockTable();
      case 'alerts':
        return <div>Alerts Tab</div>;
      case 'forecast':
        return <div>Forecast Tab</div>;
      case 'analytics':
        return <div>Analytics Tab</div>;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory & Stock Management</h1>
          <p className="text-gray-600">Real-time inventory tracking with AI-powered insights</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={onGenerateReport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'stock', label: 'Stock Inventory', icon: Package },
              { id: 'alerts', label: 'Alerts', icon: Bell },
              { id: 'forecast', label: 'AI Forecast', icon: Bot },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
