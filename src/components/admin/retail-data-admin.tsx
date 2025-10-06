"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Package,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Settings,
  CheckCircle,
  Eye,
  Save,
  RefreshCw
} from 'lucide-react';

interface AdminData {
  sales: {
    '1d': number;
    '7d': number;
    '30d': number;
    '90d': number;
  };
  inventory: {
    totalProducts: number;
    inStock: number;
    lowStock: number;
    outOfStock: number;
    totalValue: number;
  };
  customers: {
    total: number;
    new: number;
    returning: number;
    averageOrderValue: number;
  };
  performance: {
    conversionRate: number;
    averageSessionDuration: number;
    bounceRate: number;
    cartAbandonment: number;
  };
  categories: {
    electronics: number;
    clothing: number;
    homeGarden: number;
    sports: number;
    books: number;
    health: number;
    beauty: number;
    toys: number;
  };
}

export function RetailDataAdmin() {
  const [showAccessModal, setShowAccessModal] = useState(true);
  const [accessCode, setAccessCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState<AdminData>({
    sales: {
      '1d': 15000,
      '7d': 95000,
      '30d': 420000,
      '90d': 1250000
    },
    inventory: {
      totalProducts: 2500,
      inStock: 1800,
      lowStock: 45,
      outOfStock: 12,
      totalValue: 1250000
    },
    customers: {
      total: 8500,
      new: 320,
      returning: 7800,
      averageOrderValue: 85.50
    },
    performance: {
      conversionRate: 3.2,
      averageSessionDuration: 4.5,
      bounceRate: 42.1,
      cartAbandonment: 68.5
    },
    categories: {
      electronics: 25,
      clothing: 20,
      homeGarden: 15,
      sports: 12,
      books: 10,
      health: 8,
      beauty: 6,
      toys: 4
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load data from localStorage on mount
    const savedData = localStorage.getItem('retail-admin-data');
    if (savedData) {
      try {
        setAdminData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading retail admin data:', error);
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
      localStorage.setItem('retail-admin-data', JSON.stringify(adminData));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('Retail data saved successfully!');
    } catch (error) {
      console.error('Error saving retail data:', error);
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
        sales: {
          '1d': 15000,
          '7d': 95000,
          '30d': 420000,
          '90d': 1250000
        },
        inventory: {
          totalProducts: 2500,
          inStock: 1800,
          lowStock: 45,
          outOfStock: 12,
          totalValue: 1250000
        },
        customers: {
          total: 8500,
          new: 320,
          returning: 7800,
          averageOrderValue: 85.50
        },
        performance: {
          conversionRate: 3.2,
          averageSessionDuration: 4.5,
          bounceRate: 42.1,
          cartAbandonment: 68.5
        },
        categories: {
          electronics: 25,
          clothing: 20,
          homeGarden: 15,
          sports: 12,
          books: 10,
          health: 8,
          beauty: 6,
          toys: 4
        }
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Retail Admin Access</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Retail Data Administration</h1>
          <p className="text-gray-600">Manage and edit retail dashboard data</p>
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

      {/* Sales Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-600" />
              Sales Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="sales1d">1 Day Sales ($)</Label>
                <Input
                  id="sales1d"
                  type="number"
                  value={getAdminData('sales.1d', 15000)}
                  onChange={(e) => handleDataChange('sales.1d', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="sales7d">7 Days Sales ($)</Label>
                <Input
                  id="sales7d"
                  type="number"
                  value={getAdminData('sales.7d', 95000)}
                  onChange={(e) => handleDataChange('sales.7d', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="sales30d">30 Days Sales ($)</Label>
                <Input
                  id="sales30d"
                  type="number"
                  value={getAdminData('sales.30d', 420000)}
                  onChange={(e) => handleDataChange('sales.30d', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="sales90d">90 Days Sales ($)</Label>
                <Input
                  id="sales90d"
                  type="number"
                  value={getAdminData('sales.90d', 1250000)}
                  onChange={(e) => handleDataChange('sales.90d', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Inventory Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
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
                <Label htmlFor="totalProducts">Total Products</Label>
                <Input
                  id="totalProducts"
                  type="number"
                  value={getAdminData('inventory.totalProducts', 2500)}
                  onChange={(e) => handleDataChange('inventory.totalProducts', parseInt(e.target.value) || 0)}
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

      {/* Customer Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-600" />
              Customer Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="totalCustomers">Total Customers</Label>
                <Input
                  id="totalCustomers"
                  type="number"
                  value={getAdminData('customers.total', 8500)}
                  onChange={(e) => handleDataChange('customers.total', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="newCustomers">New Customers</Label>
                <Input
                  id="newCustomers"
                  type="number"
                  value={getAdminData('customers.new', 320)}
                  onChange={(e) => handleDataChange('customers.new', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="returningCustomers">Returning Customers</Label>
                <Input
                  id="returningCustomers"
                  type="number"
                  value={getAdminData('customers.returning', 7800)}
                  onChange={(e) => handleDataChange('customers.returning', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="averageOrderValue">Avg Order Value ($)</Label>
                <Input
                  id="averageOrderValue"
                  type="number"
                  step="0.01"
                  value={getAdminData('customers.averageOrderValue', 85.50)}
                  onChange={(e) => handleDataChange('customers.averageOrderValue', parseFloat(e.target.value) || 0)}
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
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="conversionRate">Conversion Rate (%)</Label>
                <Input
                  id="conversionRate"
                  type="number"
                  step="0.1"
                  value={getAdminData('performance.conversionRate', 3.2)}
                  onChange={(e) => handleDataChange('performance.conversionRate', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="sessionDuration">Avg Session Duration (min)</Label>
                <Input
                  id="sessionDuration"
                  type="number"
                  step="0.1"
                  value={getAdminData('performance.averageSessionDuration', 4.5)}
                  onChange={(e) => handleDataChange('performance.averageSessionDuration', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="bounceRate">Bounce Rate (%)</Label>
                <Input
                  id="bounceRate"
                  type="number"
                  step="0.1"
                  value={getAdminData('performance.bounceRate', 42.1)}
                  onChange={(e) => handleDataChange('performance.bounceRate', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="cartAbandonment">Cart Abandonment (%)</Label>
                <Input
                  id="cartAbandonment"
                  type="number"
                  step="0.1"
                  value={getAdminData('performance.cartAbandonment', 68.5)}
                  onChange={(e) => handleDataChange('performance.cartAbandonment', parseFloat(e.target.value) || 0)}
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
              <ShoppingCart className="w-5 h-5 mr-2 text-indigo-600" />
              Category Distribution (%)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="electronics">Electronics</Label>
                <Input
                  id="electronics"
                  type="number"
                  step="0.1"
                  value={getAdminData('categories.electronics', 25)}
                  onChange={(e) => handleDataChange('categories.electronics', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="clothing">Clothing</Label>
                <Input
                  id="clothing"
                  type="number"
                  step="0.1"
                  value={getAdminData('categories.clothing', 20)}
                  onChange={(e) => handleDataChange('categories.clothing', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="homeGarden">Home & Garden</Label>
                <Input
                  id="homeGarden"
                  type="number"
                  step="0.1"
                  value={getAdminData('categories.homeGarden', 15)}
                  onChange={(e) => handleDataChange('categories.homeGarden', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="sports">Sports</Label>
                <Input
                  id="sports"
                  type="number"
                  step="0.1"
                  value={getAdminData('categories.sports', 12)}
                  onChange={(e) => handleDataChange('categories.sports', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="books">Books</Label>
                <Input
                  id="books"
                  type="number"
                  step="0.1"
                  value={getAdminData('categories.books', 10)}
                  onChange={(e) => handleDataChange('categories.books', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="health">Health</Label>
                <Input
                  id="health"
                  type="number"
                  step="0.1"
                  value={getAdminData('categories.health', 8)}
                  onChange={(e) => handleDataChange('categories.health', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="beauty">Beauty</Label>
                <Input
                  id="beauty"
                  type="number"
                  step="0.1"
                  value={getAdminData('categories.beauty', 6)}
                  onChange={(e) => handleDataChange('categories.beauty', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="toys">Toys</Label>
                <Input
                  id="toys"
                  type="number"
                  step="0.1"
                  value={getAdminData('categories.toys', 4)}
                  onChange={(e) => handleDataChange('categories.toys', parseFloat(e.target.value) || 0)}
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
              This is how your data will appear in the retail dashboard
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800">Sales Overview</h4>
                <p className="text-2xl font-bold text-blue-600">${(getAdminData('sales.7d', 95000) || 0).toLocaleString()}</p>
                <p className="text-sm text-blue-600">7 Days Sales</p>
                <div className="mt-2 text-xs text-gray-600">
                  1D: ${(getAdminData('sales.1d', 15000) || 0).toLocaleString()} | 30D: ${(getAdminData('sales.30d', 420000) || 0).toLocaleString()}
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800">Inventory Status</h4>
                <p className="text-2xl font-bold text-green-600">{getAdminData('inventory.totalProducts', 2500)}</p>
                <p className="text-sm text-green-600">Total Products</p>
                <div className="mt-2 text-xs text-gray-600">
                  In Stock: {getAdminData('inventory.inStock', 1800)} | Low: {getAdminData('inventory.lowStock', 45)}
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800">Customer Base</h4>
                <p className="text-2xl font-bold text-purple-600">{getAdminData('customers.total', 8500)}</p>
                <p className="text-sm text-purple-600">Total Customers</p>
                <div className="mt-2 text-xs text-gray-600">
                  New: {getAdminData('customers.new', 320)} | Avg Order: ${getAdminData('customers.averageOrderValue', 85.50)}
                </div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800">Performance</h4>
                <p className="text-2xl font-bold text-orange-600">{getAdminData('performance.conversionRate', 3.2)}%</p>
                <p className="text-sm text-orange-600">Conversion Rate</p>
                <div className="mt-2 text-xs text-gray-600">
                  Session: {getAdminData('performance.averageSessionDuration', 4.5)}min | Bounce: {getAdminData('performance.bounceRate', 42.1)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
