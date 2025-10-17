"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  AlertTriangle, 
  Calendar, 
  Package, 
  Trash2, 
  RotateCcw, 
  DollarSign, 
  TrendingDown, 
  Eye, 
  Edit, 
  Download, 
  Filter, 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  Settings, 
  FileText, 
  Share, 
  Target, 
  Zap, 
  Bot, 
  Users, 
  Truck, 
  Mail, 
  Phone, 
  MessageSquare,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

import { ExpiryAlert, StockItem, DrugMaster } from '@/types/inventory';

interface ExpiryManagementProps {
  onViewItem: (item: StockItem) => void;
  onEditItem: (item: StockItem) => void;
  onGenerateReport: () => void;
  onNotifySupplier: (item: StockItem) => void;
}

export default function ExpiryManagement({ 
  onViewItem, 
  onEditItem, 
  onGenerateReport, 
  onNotifySupplier 
}: ExpiryManagementProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'30_days' | '60_days' | '90_days' | 'all'>('30_days');
  const [selectedAction, setSelectedAction] = useState<'all' | 'discount' | 'return' | 'transfer' | 'dispose'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'expiry' | 'value' | 'quantity' | 'drug'>('expiry');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const [expiryAlerts, setExpiryAlerts] = useState<ExpiryAlert[]>([
    {
      id: '1',
      stockItemId: '1',
      stockItem: {
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
        expiryDate: new Date('2024-12-15'),
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
      alertType: 'expiring_30_days',
      daysToExpiry: 15,
      severity: 'high',
      isRead: false,
      createdAt: new Date(),
      suggestedAction: 'discount'
    },
    {
      id: '2',
      stockItemId: '2',
      stockItem: {
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
        expiryDate: new Date('2024-11-20'),
        quantity: 80,
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
      },
      alertType: 'expiring_60_days',
      daysToExpiry: 45,
      severity: 'medium',
      isRead: false,
      createdAt: new Date(),
      suggestedAction: 'return_to_supplier'
    }
  ]);

  const [expiryStats] = useState({
    totalExpiring: 23,
    criticalExpiring: 5,
    totalValue: 125000,
    potentialLoss: 25000,
    actionRequired: 15,
    supplierReturns: 8
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <AlertCircle className="w-4 h-4" />;
      case 'low': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'discount': return 'text-green-600 bg-green-100';
      case 'return_to_supplier': return 'text-blue-600 bg-blue-100';
      case 'transfer': return 'text-purple-600 bg-purple-100';
      case 'dispose': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'discount': return <DollarSign className="w-4 h-4" />;
      case 'return_to_supplier': return <Truck className="w-4 h-4" />;
      case 'transfer': return <ArrowRight className="w-4 h-4" />;
      case 'dispose': return <Trash2 className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR'
    }).format(amount);
  };

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGeneratingReport(false);
    onGenerateReport();
  };

  const handleMarkAsRead = (alertId: string) => {
    setExpiryAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
  };

  const handleBulkAction = (action: string) => {
    // Implement bulk actions
    console.log('Bulk action:', action);
  };

  const filteredAlerts = expiryAlerts.filter(alert => {
    const matchesPeriod = selectedPeriod === 'all' || 
      (selectedPeriod === '30_days' && alert.daysToExpiry <= 30) ||
      (selectedPeriod === '60_days' && alert.daysToExpiry <= 60) ||
      (selectedPeriod === '90_days' && alert.daysToExpiry <= 90);
    
    const matchesAction = selectedAction === 'all' || alert.suggestedAction === selectedAction;
    const matchesSearch = searchTerm === '' || 
      alert.stockItem.drugMaster.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.stockItem.drugMaster.genericName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesPeriod && matchesAction && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Clock className="w-8 h-8 text-orange-600" />
            <span>Expiry Management</span>
          </h2>
          <p className="text-gray-600">Track and manage expiring medications to minimize waste</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleGenerateReport}
            disabled={isGeneratingReport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            <FileText className="w-4 h-4" />
            <span>{isGeneratingReport ? 'Generating...' : 'Generate Report'}</span>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Total Expiring', 
            value: expiryStats.totalExpiring.toString(), 
            change: '+3 this week', 
            color: 'orange', 
            icon: Clock,
            trend: 'up'
          },
          { 
            title: 'Critical (≤30 days)', 
            value: expiryStats.criticalExpiring.toString(), 
            change: '-2 this week', 
            color: 'red', 
            icon: AlertTriangle,
            trend: 'down'
          },
          { 
            title: 'Total Value at Risk', 
            value: formatCurrency(expiryStats.totalValue), 
            change: '+5.2%', 
            color: 'yellow', 
            icon: DollarSign,
            trend: 'up'
          },
          { 
            title: 'Potential Loss', 
            value: formatCurrency(expiryStats.potentialLoss), 
            change: '-12%', 
            color: 'red', 
            icon: TrendingDown,
            trend: 'down'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center space-x-1 mt-2">
                  <span className={`text-xs ${
                    stat.trend === 'up' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filter & Controls</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleBulkAction('mark_read')}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Mark All Read
            </button>
            <button
              onClick={() => handleBulkAction('export')}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
            >
              Export
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="30_days">≤ 30 Days</option>
              <option value="60_days">≤ 60 Days</option>
              <option value="90_days">≤ 90 Days</option>
              <option value="all">All Expiring</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Suggested Action</label>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Actions</option>
              <option value="discount">Discount</option>
              <option value="return_to_supplier">Return to Supplier</option>
              <option value="transfer">Transfer</option>
              <option value="dispose">Dispose</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search drugs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="expiry">Expiry Date</option>
              <option value="value">Value</option>
              <option value="quantity">Quantity</option>
              <option value="drug">Drug Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Expiry Alerts Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Expiry Alerts ({filteredAlerts.length})</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Left</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suggested Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAlerts.map((alert, index) => (
                <motion.tr
                  key={alert.id}
                  className={`hover:bg-gray-50 ${!alert.isRead ? 'bg-yellow-50' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                        <Package className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{alert.stockItem.drugMaster.brandName}</div>
                        <div className="text-sm text-gray-500">{alert.stockItem.drugMaster.genericName}</div>
                        <div className="text-xs text-gray-400">{alert.stockItem.drugMaster.strength}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.stockItem.batchNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(alert.stockItem.expiryDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      alert.daysToExpiry <= 30 ? 'text-red-600 bg-red-100' :
                      alert.daysToExpiry <= 60 ? 'text-orange-600 bg-orange-100' :
                      'text-yellow-600 bg-yellow-100'
                    }`}>
                      {alert.daysToExpiry} days
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {alert.stockItem.quantity} units
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(alert.stockItem.quantity * alert.stockItem.sellingPrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 ${getSeverityColor(alert.severity)}`}>
                      {getSeverityIcon(alert.severity)}
                      <span className="capitalize">{alert.severity}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 ${getActionColor(alert.suggestedAction)}`}>
                      {getActionIcon(alert.suggestedAction)}
                      <span className="capitalize">{alert.suggestedAction.replace('_', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onViewItem(alert.stockItem)}
                        className="text-teal-600 hover:text-teal-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEditItem(alert.stockItem)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onNotifySupplier(alert.stockItem)}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      {!alert.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(alert.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors text-center">
            <DollarSign className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Create Discount Campaign</p>
            <p className="text-xs text-gray-500">Offer discounts on expiring items</p>
          </button>
          
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center">
            <Truck className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Return to Suppliers</p>
            <p className="text-xs text-gray-500">Initiate return process</p>
          </button>
          
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center">
            <ArrowRight className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Transfer Stock</p>
            <p className="text-xs text-gray-500">Move to different location</p>
          </button>
        </div>
      </div>
    </div>
  );
}