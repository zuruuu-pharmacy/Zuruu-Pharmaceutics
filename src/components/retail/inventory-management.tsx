"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, Warehouse, AlertTriangle, CheckCircle, Search, Filter, Plus, Edit, Trash2,
  Eye, Download, Upload, Settings, Bell, Target, Zap, Shield, RefreshCw, RotateCcw,
  Barcode, QrCode, ScanLine, Truck, Box, Layers, Archive, Database, Activity,
  TrendingUp, TrendingDown, Minus, ArrowUp, ArrowDown, Calendar, Clock,
  MapPin, Tag, DollarSign, Percent, Star, Heart, Award, Users, ShoppingCart
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

// Inventory data simulation
const inventoryItems = [
  {
    id: 'INV001',
    name: 'Aspirin 100mg',
    category: 'Pain Relief',
    sku: 'ASP-100-001',
    barcode: '1234567890123',
    currentStock: 150,
    minStock: 50,
    maxStock: 500,
    unitPrice: 12.99,
    supplier: 'MedSupply Co.',
    location: 'A-1-15',
    expiryDate: '2025-12-31',
    lastUpdated: '2024-01-15',
    status: 'In Stock',
    movement: 'High'
  },
  {
    id: 'INV002',
    name: 'Vitamin D3 1000IU',
    category: 'Vitamins',
    sku: 'VD3-1000-001',
    barcode: '1234567890124',
    currentStock: 89,
    minStock: 30,
    maxStock: 200,
    unitPrice: 24.99,
    supplier: 'HealthPlus Ltd.',
    location: 'B-2-08',
    expiryDate: '2025-06-30',
    lastUpdated: '2024-01-14',
    status: 'In Stock',
    movement: 'Medium'
  },
  {
    id: 'INV003',
    name: 'Blood Pressure Monitor',
    category: 'Medical Devices',
    sku: 'BPM-DIG-001',
    barcode: '1234567890125',
    currentStock: 23,
    minStock: 10,
    maxStock: 50,
    unitPrice: 89.99,
    supplier: 'MedTech Solutions',
    location: 'C-3-12',
    expiryDate: '2026-03-15',
    lastUpdated: '2024-01-13',
    status: 'Low Stock',
    movement: 'Low'
  },
  {
    id: 'INV004',
    name: 'Multivitamin Complex',
    category: 'Vitamins',
    sku: 'MVC-ADULT-001',
    barcode: '1234567890126',
    currentStock: 67,
    minStock: 25,
    maxStock: 150,
    unitPrice: 19.99,
    supplier: 'NutriLife Inc.',
    location: 'B-2-15',
    expiryDate: '2025-09-20',
    lastUpdated: '2024-01-12',
    status: 'In Stock',
    movement: 'High'
  },
  {
    id: 'INV005',
    name: 'Pain Relief Gel',
    category: 'Topical',
    sku: 'PRG-TOP-001',
    barcode: '1234567890127',
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unitPrice: 15.99,
    supplier: 'TopicalCare Ltd.',
    location: 'A-1-22',
    expiryDate: '2025-11-10',
    lastUpdated: '2024-01-11',
    status: 'In Stock',
    movement: 'Medium'
  },
  {
    id: 'INV006',
    name: 'Cold & Flu Tablets',
    category: 'Cold & Flu',
    sku: 'CFT-24-001',
    barcode: '1234567890128',
    currentStock: 8,
    minStock: 15,
    maxStock: 80,
    unitPrice: 8.99,
    supplier: 'ColdRelief Co.',
    location: 'A-1-05',
    expiryDate: '2024-12-31',
    lastUpdated: '2024-01-10',
    status: 'Critical',
    movement: 'High'
  }
];

const stockMovements = [
  { id: 'MOV001', item: 'Aspirin 100mg', type: 'Inbound', quantity: 100, date: '2024-01-15', reason: 'Restock' },
  { id: 'MOV002', item: 'Vitamin D3 1000IU', type: 'Outbound', quantity: -25, date: '2024-01-14', reason: 'Sale' },
  { id: 'MOV003', item: 'Blood Pressure Monitor', type: 'Outbound', quantity: -2, date: '2024-01-13', reason: 'Sale' },
  { id: 'MOV004', item: 'Multivitamin Complex', type: 'Inbound', quantity: 50, date: '2024-01-12', reason: 'Restock' },
  { id: 'MOV005', item: 'Pain Relief Gel', type: 'Outbound', quantity: -5, date: '2024-01-11', reason: 'Sale' },
];

const lowStockAlerts = [
  { item: 'Cold & Flu Tablets', current: 8, minimum: 15, urgency: 'Critical' },
  { item: 'Blood Pressure Monitor', current: 23, minimum: 10, urgency: 'Warning' },
  { item: 'Pain Relief Gel', current: 45, minimum: 20, urgency: 'Low' },
];

export default function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState('');

  // Filter inventory items
  const filteredItems = inventoryItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.barcode.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Out of Stock': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMovementColor = (movement: string) => {
    switch (movement) {
      case 'High': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'text-red-600';
      case 'Warning': return 'text-yellow-600';
      case 'Low': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const scanBarcode = (barcode: string) => {
    const item = inventoryItems.find(i => i.barcode === barcode);
    if (item) {
      setSelectedItem(item);
      setScanResult(`Found: ${item.name}`);
    } else {
      setScanResult('Product not found in inventory');
    }
  };

  const simulateBarcodeScan = () => {
    setShowScanner(true);
    setTimeout(() => {
      const randomBarcode = inventoryItems[Math.floor(Math.random() * inventoryItems.length)].barcode;
      scanBarcode(randomBarcode);
      setShowScanner(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-4xl font-bold text-white">
              Warehouse Inventory Management
            </h1>
            <p className="text-gray-300 mt-2">Advanced stock control and warehouse operations</p>
        </div>
          <div className="flex items-center space-x-4">
          <Button
              onClick={simulateBarcodeScan}
            variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
              <Barcode className="w-4 h-4 mr-2" />
              Scan Barcode
          </Button>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
                <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
              </Button>
        </div>
      </div>

        {/* Warehouse Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Products',
              value: inventoryItems.length.toString(),
              change: '+5.2%',
              trend: 'up',
              icon: Package,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Low Stock Items',
              value: lowStockAlerts.length.toString(),
              change: '-2.1%',
              trend: 'down',
              icon: AlertTriangle,
              color: 'from-yellow-500 to-orange-500'
            },
            {
              title: 'Critical Items',
              value: inventoryItems.filter(i => i.status === 'Critical').length.toString(),
              change: '+1.0%',
              trend: 'up',
              icon: Shield,
              color: 'from-red-500 to-pink-500'
            },
            {
              title: 'Total Value',
              value: `$${inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.unitPrice), 0).toLocaleString()}`,
              change: '+8.7%',
              trend: 'up',
              icon: DollarSign,
              color: 'from-green-500 to-emerald-500'
            }
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-10`} />
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Inventory List */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Warehouse className="w-5 h-5 text-blue-600" />
                    <span>Inventory Items</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                        placeholder="Search products, SKU, or barcode..."
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
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Pain Relief">Pain Relief</SelectItem>
                        <SelectItem value="Vitamins">Vitamins</SelectItem>
                        <SelectItem value="Medical Devices">Medical Devices</SelectItem>
                        <SelectItem value="Cold & Flu">Cold & Flu</SelectItem>
                        <SelectItem value="Topical">Topical</SelectItem>
                </SelectContent>
              </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-blue-600" />
                  </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">SKU: {item.sku}</span>
                            <span className="text-sm text-gray-600">Location: {item.location}</span>
                            <span className="text-sm text-gray-600">Supplier: {item.supplier}</span>
                  </div>
                </div>
                  </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{item.currentStock} units</p>
                          <p className="text-sm text-gray-600">Min: {item.minStock}</p>
                  </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${item.unitPrice}</p>
                          <p className={`text-sm ${getMovementColor(item.movement)}`}>
                            {item.movement} Movement
                          </p>
                  </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedItem(item)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
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
                </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stock Alerts */}
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span>Stock Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lowStockAlerts.map((alert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-3 bg-red-50 rounded-lg border border-red-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{alert.item}</p>
                          <p className="text-sm text-gray-600">
                            Current: {alert.current} | Min: {alert.minimum}
                          </p>
                        </div>
                        <Badge className={`${getUrgencyColor(alert.urgency)} border-current`}>
                          {alert.urgency}
                    </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Movements */}
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  <span>Recent Movements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stockMovements.slice(0, 5).map((movement, index) => (
                    <motion.div
                      key={movement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{movement.item}</p>
                        <p className="text-sm text-gray-600">{movement.reason}</p>
                  </div>
                      <div className="text-right">
                        <p className={`font-semibold ${movement.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                        </p>
                        <p className="text-xs text-gray-500">{movement.date}</p>
                  </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Product
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Truck className="w-4 h-4 mr-2" />
                  Receive Stock
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync Inventory
                </Button>
              </CardContent>
            </Card>
          </div>
      </div>

        {/* Product Detail Modal */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-2xl">
          <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-blue-600" />
                <span>Product Details</span>
              </DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label>Product Name</Label>
                    <p className="font-semibold">{selectedItem.name}</p>
                  </div>
                  <div>
                    <Label>SKU</Label>
                    <p className="font-semibold">{selectedItem.sku}</p>
                  </div>
                  <div>
                    <Label>Barcode</Label>
                    <p className="font-semibold">{selectedItem.barcode}</p>
                  </div>
                  <div>
                    <Label>Category</Label>
                    <p className="font-semibold">{selectedItem.category}</p>
                  </div>
                  <div>
                    <Label>Current Stock</Label>
                    <p className="font-semibold text-2xl">{selectedItem.currentStock} units</p>
                  </div>
                  <div>
                    <Label>Unit Price</Label>
                    <p className="font-semibold text-2xl">${selectedItem.unitPrice}</p>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <p className="font-semibold">{selectedItem.location}</p>
                  </div>
                  <div>
                    <Label>Supplier</Label>
                    <p className="font-semibold">{selectedItem.supplier}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Stock Level</Label>
                    <div className="mt-2">
                      <Progress 
                        value={(selectedItem.currentStock / selectedItem.maxStock) * 100} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>Min: {selectedItem.minStock}</span>
                        <span>Max: {selectedItem.maxStock}</span>
                          </div>
                        </div>
                  </div>
                
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Expiry Date</Label>
                      <p className="font-semibold">{selectedItem.expiryDate}</p>
                          </div>
                    <div>
                      <Label>Last Updated</Label>
                      <p className="font-semibold">{selectedItem.lastUpdated}</p>
                        </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedItem(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Product
                  </Button>
                </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

        {/* Barcode Scanner Modal */}
        <Dialog open={showScanner} onOpenChange={setShowScanner}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Barcode className="w-5 h-5 text-blue-600" />
                <span>Barcode Scanner</span>
              </DialogTitle>
            </DialogHeader>
            <div className="text-center space-y-4">
              <div className="w-32 h-32 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <ScanLine className="w-16 h-16 text-blue-600 animate-pulse" />
              </div>
              <p className="text-gray-600">Scanning for barcode...</p>
              {scanResult && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-green-800 font-medium">{scanResult}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}