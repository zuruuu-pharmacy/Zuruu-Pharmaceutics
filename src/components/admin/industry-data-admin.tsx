"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Package,
  Truck,
  Factory,
  TrendingUp,
  Settings,
  CheckCircle,
  Eye,
  Save,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

interface AdminData {
  inventory: {
    totalSKUs: number;
    inStock: number;
    lowStock: number;
    outOfStock: number;
    totalValue: number;
  };
  performance: {
    predictedStockouts: number;
    avgLeadTime: number;
    batchTraceability: number;
    onTimeDelivery: number;
  };
  suppliers: {
    total: number;
    active: number;
    critical: number;
    averageRating: number;
  };
  operations: {
    dailyOrders: number;
    monthlyOrders: number;
    fulfillmentRate: number;
    returnRate: number;
  };
  categories: {
    pharmaceuticals: number;
    medicalDevices: number;
    consumables: number;
    equipment: number;
    chemicals: number;
    packaging: number;
  };
}

export function IndustryDataAdmin() {
  const [showAccessModal, setShowAccessModal] = useState(true);
  const [accessCode, setAccessCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState<AdminData>({
    inventory: {
      totalSKUs: 2500,
      inStock: 1800,
      lowStock: 45,
      outOfStock: 12,
      totalValue: 1250000
    },
    performance: {
      predictedStockouts: 15,
      avgLeadTime: 7.5,
      batchTraceability: 95.2,
      onTimeDelivery: 94.8
    },
    suppliers: {
      total: 85,
      active: 78,
      critical: 7,
      averageRating: 4.3
    },
    operations: {
      dailyOrders: 150,
      monthlyOrders: 4500,
      fulfillmentRate: 96.5,
      returnRate: 2.1
    },
    categories: {
      pharmaceuticals: 40,
      medicalDevices: 25,
      consumables: 20,
      equipment: 10,
      chemicals: 3,
      packaging: 2
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load data from localStorage on mount
    const savedData = localStorage.getItem('industry-admin-data');
    if (savedData) {
      try {
        setAdminData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading industry admin data:', error);
      }
    }
  }, []);

  const handleDataChange = (field: string, value: any) => {
    setAdminData(prev => {
      const newData = { ...prev };
      const keys = field.split('.');
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      // Handle NaN values by providing fallbacks
      let processedValue = value;
      if (typeof value === 'number' && isNaN(value)) {
        processedValue = 0;
      } else if (typeof value === 'string' && value === '') {
        processedValue = 0;
      }
      
      current[keys[keys.length - 1]] = processedValue;
      return newData;
    });
  };

  // Safe getter for adminData properties with fallbacks
  const getAdminData = (path: string, defaultValue: any = 0) => {
    if (!adminData) return defaultValue;
    
    const keys = path.split('.');
    let current: any = adminData;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return defaultValue;
      }
    }
    
    return current !== undefined ? current : defaultValue;
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem('industry-admin-data', JSON.stringify(adminData));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('Industry data saved successfully!');
    } catch (error) {
      console.error('Error saving industry data:', error);
      alert('Error saving data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAccessCode = () => {
    if (accessCode === '239773') {
      setIsAuthenticated(true);
      setShowAccessModal(false);
    } else {
      alert('Invalid access code. Please try again.');
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data to default values?')) {
      setAdminData({
        inventory: {
          totalSKUs: 2500,
          inStock: 1800,
          lowStock: 45,
          outOfStock: 12,
          totalValue: 1250000
        },
        performance: {
          predictedStockouts: 15,
          avgLeadTime: 7.5,
          batchTraceability: 95.2,
          onTimeDelivery: 94.8
        },
        suppliers: {
          total: 85,
          active: 78,
          critical: 7,
          averageRating: 4.3
        },
        operations: {
          dailyOrders: 150,
          monthlyOrders: 4500,
          fulfillmentRate: 96.5,
          returnRate: 2.1
        },
        categories: {
          pharmaceuticals: 40,
          medicalDevices: 25,
          consumables: 20,
          equipment: 10,
          chemicals: 3,
          packaging: 2
        }
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Industry Admin Access</h1>
            <p className="text-gray-600 mb-6">Enter access code to continue</p>
            <div className="space-y-4">
              <input
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter access code"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleAccessCode()}
              />
              <button
                onClick={handleAccessCode}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              >
                Access Admin Panel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Industry Data Administration</h1>
          <p className="text-gray-600">Manage and edit industry dashboard data</p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={handleReset}
            variant="outline"
            disabled={isSaving}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Inventory Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2 text-blue-600" />
              Inventory Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="totalSKUs">Total SKUs</Label>
                <Input
                  id="totalSKUs"
                  type="number"
                  value={getAdminData('inventory.totalSKUs', 2500)}
                  onChange={(e) => handleDataChange('inventory.totalSKUs', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="inStock">In Stock</Label>
                <Input
                  id="inStock"
                  type="number"
                  value={getAdminData('inventory.inStock', 1800)}
                  onChange={(e) => handleDataChange('inventory.inStock', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="lowStock">Low Stock</Label>
                <Input
                  id="lowStock"
                  type="number"
                  value={getAdminData('inventory.lowStock', 45)}
                  onChange={(e) => handleDataChange('inventory.lowStock', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="outOfStock">Out of Stock</Label>
                <Input
                  id="outOfStock"
                  type="number"
                  value={getAdminData('inventory.outOfStock', 12)}
                  onChange={(e) => handleDataChange('inventory.outOfStock', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="totalValue">Total Value ($)</Label>
                <Input
                  id="totalValue"
                  type="number"
                  value={getAdminData('inventory.totalValue', 1250000)}
                  onChange={(e) => handleDataChange('inventory.totalValue', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="predictedStockouts">Predicted Stockouts</Label>
                <Input
                  id="predictedStockouts"
                  type="number"
                  value={getAdminData('performance.predictedStockouts', 15)}
                  onChange={(e) => handleDataChange('performance.predictedStockouts', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="avgLeadTime">Avg Lead Time (days)</Label>
                <Input
                  id="avgLeadTime"
                  type="number"
                  step="0.1"
                  value={getAdminData('performance.avgLeadTime', 7.5)}
                  onChange={(e) => handleDataChange('performance.avgLeadTime', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="batchTraceability">Batch Traceability (%)</Label>
                <Input
                  id="batchTraceability"
                  type="number"
                  step="0.1"
                  value={getAdminData('performance.batchTraceability', 95.2)}
                  onChange={(e) => handleDataChange('performance.batchTraceability', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="onTimeDelivery">On-Time Delivery (%)</Label>
                <Input
                  id="onTimeDelivery"
                  type="number"
                  step="0.1"
                  value={getAdminData('performance.onTimeDelivery', 94.8)}
                  onChange={(e) => handleDataChange('performance.onTimeDelivery', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Supplier Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Factory className="w-5 h-5 mr-2 text-purple-600" />
              Supplier Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="totalSuppliers">Total Suppliers</Label>
                <Input
                  id="totalSuppliers"
                  type="number"
                  value={getAdminData('suppliers.total', 85)}
                  onChange={(e) => handleDataChange('suppliers.total', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="activeSuppliers">Active Suppliers</Label>
                <Input
                  id="activeSuppliers"
                  type="number"
                  value={getAdminData('suppliers.active', 78)}
                  onChange={(e) => handleDataChange('suppliers.active', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="criticalSuppliers">Critical Suppliers</Label>
                <Input
                  id="criticalSuppliers"
                  type="number"
                  value={getAdminData('suppliers.critical', 7)}
                  onChange={(e) => handleDataChange('suppliers.critical', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="averageRating">Average Rating</Label>
                <Input
                  id="averageRating"
                  type="number"
                  step="0.1"
                  value={getAdminData('suppliers.averageRating', 4.3)}
                  onChange={(e) => handleDataChange('suppliers.averageRating', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Operations Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Truck className="w-5 h-5 mr-2 text-orange-600" />
              Operations Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="dailyOrders">Daily Orders</Label>
                <Input
                  id="dailyOrders"
                  type="number"
                  value={getAdminData('operations.dailyOrders', 150)}
                  onChange={(e) => handleDataChange('operations.dailyOrders', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="monthlyOrders">Monthly Orders</Label>
                <Input
                  id="monthlyOrders"
                  type="number"
                  value={getAdminData('operations.monthlyOrders', 4500)}
                  onChange={(e) => handleDataChange('operations.monthlyOrders', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="fulfillmentRate">Fulfillment Rate (%)</Label>
                <Input
                  id="fulfillmentRate"
                  type="number"
                  step="0.1"
                  value={getAdminData('operations.fulfillmentRate', 96.5)}
                  onChange={(e) => handleDataChange('operations.fulfillmentRate', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="returnRate">Return Rate (%)</Label>
                <Input
                  id="returnRate"
                  type="number"
                  step="0.1"
                  value={getAdminData('operations.returnRate', 2.1)}
                  onChange={(e) => handleDataChange('operations.returnRate', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Category Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2 text-indigo-600" />
              Category Distribution (%)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="pharmaceuticals">Pharmaceuticals</Label>
                <Input
                  id="pharmaceuticals"
                  type="number"
                  step="0.1"
                  value={getAdminData('categories.pharmaceuticals', 40)}
                  onChange={(e) => handleDataChange('categories.pharmaceuticals', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="medicalDevices">Medical Devices</Label>
                <Input
                  id="medicalDevices"
                  type="number"
                  step="0.1"
                  value={getAdminData('categories.medicalDevices', 25)}
                  onChange={(e) => handleDataChange('categories.medicalDevices', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="consumables">Consumables</Label>
                <Input
                  id="consumables"
                  type="number"
                  step="0.1"
                  value={getAdminData('categories.consumables', 20)}
                  onChange={(e) => handleDataChange('categories.consumables', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="equipment">Equipment</Label>
                <Input
                  id="equipment"
                  type="number"
                  step="0.1"
                  value={getAdminData('categories.equipment', 10)}
                  onChange={(e) => handleDataChange('categories.equipment', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="chemicals">Chemicals</Label>
                <Input
                  id="chemicals"
                  type="number"
                  step="0.1"
                  value={getAdminData('categories.chemicals', 3)}
                  onChange={(e) => handleDataChange('categories.chemicals', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="packaging">Packaging</Label>
                <Input
                  id="packaging"
                  type="number"
                  step="0.1"
                  value={getAdminData('categories.packaging', 2)}
                  onChange={(e) => handleDataChange('categories.packaging', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Data Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2 text-blue-600" />
              Data Preview
            </CardTitle>
            <p className="text-sm text-gray-600">
              This is how your data will appear in the industry dashboard
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800">Inventory Overview</h4>
                <p className="text-2xl font-bold text-blue-600">{getAdminData('inventory.totalSKUs', 2500)}</p>
                <p className="text-sm text-blue-600">Total SKUs</p>
                <div className="mt-2 text-xs text-gray-600">
                  In Stock: {getAdminData('inventory.inStock', 1800)} | Low: {getAdminData('inventory.lowStock', 45)}
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800">Performance</h4>
                <p className="text-2xl font-bold text-green-600">{getAdminData('performance.predictedStockouts', 15)}</p>
                <p className="text-sm text-green-600">Predicted Stockouts</p>
                <div className="mt-2 text-xs text-gray-600">
                  Lead Time: {getAdminData('performance.avgLeadTime', 7.5)}d | Traceability: {getAdminData('performance.batchTraceability', 95.2)}%
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800">Suppliers</h4>
                <p className="text-2xl font-bold text-purple-600">{getAdminData('suppliers.total', 85)}</p>
                <p className="text-sm text-purple-600">Total Suppliers</p>
                <div className="mt-2 text-xs text-gray-600">
                  Active: {getAdminData('suppliers.active', 78)} | Critical: {getAdminData('suppliers.critical', 7)}
                </div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800">Operations</h4>
                <p className="text-2xl font-bold text-orange-600">{getAdminData('operations.dailyOrders', 150)}</p>
                <p className="text-sm text-orange-600">Daily Orders</p>
                <div className="mt-2 text-xs text-gray-600">
                  Fulfillment: {getAdminData('operations.fulfillmentRate', 96.5)}% | Return: {getAdminData('operations.returnRate', 2.1)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
