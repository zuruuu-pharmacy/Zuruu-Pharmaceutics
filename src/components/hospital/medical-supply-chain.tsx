"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, Truck, Warehouse, ShoppingCart, TrendingUp, TrendingDown, ArrowUp, ArrowDown,
  Minus, Percent, Tag, MapPin, Globe, Wifi, Layers, Archive, Box, Megaphone, Building,
  Clipboard, BookOpen, Scale, Gavel, Lock, Key, CheckSquare, Square, Play, Pause, Send,
  Share2, Image, Video, FileText, Printer, BarChart3, PieChart, LineChart, Activity,
  Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings, Bell, RefreshCw,
  RotateCcw, QrCode, ScanLine, Barcode, Database, Network, Cpu, Brain, CheckCircle, XCircle,
  AlertTriangle, Clock, Calendar, User, Users, Star, Award, Phone, Mail, MessageSquare,
  Camera, Mic, Headphones, Volume2, VolumeX, Wifi as WifiIcon, Battery, Signal, Bluetooth,
  Hospital, UserCheck, UserPlus, UserMinus, UserX, UserEdit, UserSearch, UserSettings,
  Map, Navigation, Compass, Home, Building2, Ambulance, Siren, Zap, Flame, Skull, Cross,
  FirstAid, Heart, Shield, Stethoscope, Monitor, HardDrive, Wrench, Tool, Cog, Power,
  PowerOff, AlertCircle, DollarSign, Target, Pill, Syringe, Microscope, TestTube, Beaker,
  Flask, Droplet, Thermometer, Bandage, X, Plus as PlusIcon
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

// Medical supply chain data simulation
const supplyData = [
  {
    id: 'SUP001',
    itemName: 'Surgical Masks',
    category: 'PPE',
    supplier: 'MedSupply Corp',
    currentStock: 2500,
    minStock: 500,
    maxStock: 5000,
    unitCost: 0.25,
    totalValue: 625,
    status: 'In Stock',
    lastRestocked: '2024-01-10T00:00:00Z',
    nextDelivery: '2024-01-20T00:00:00Z',
    location: 'Warehouse A',
    expiryDate: '2025-12-31',
    batchNumber: 'MS2024001'
  },
  {
    id: 'SUP002',
    itemName: 'Surgical Gloves',
    category: 'PPE',
    supplier: 'SafeHands Inc',
    currentStock: 1200,
    minStock: 300,
    maxStock: 2000,
    unitCost: 0.15,
    totalValue: 180,
    status: 'Low Stock',
    lastRestocked: '2024-01-05T00:00:00Z',
    nextDelivery: '2024-01-15T00:00:00Z',
    location: 'Warehouse B',
    expiryDate: '2026-06-30',
    batchNumber: 'SG2024002'
  },
  {
    id: 'SUP003',
    itemName: 'IV Catheters',
    category: 'Medical Devices',
    supplier: 'MedTech Solutions',
    currentStock: 800,
    minStock: 200,
    maxStock: 1500,
    unitCost: 2.50,
    totalValue: 2000,
    status: 'In Stock',
    lastRestocked: '2024-01-12T00:00:00Z',
    nextDelivery: '2024-01-25T00:00:00Z',
    location: 'Warehouse A',
    expiryDate: '2027-03-15',
    batchNumber: 'IV2024003'
  }
];

const supplyMetrics = {
  totalItems: 1247,
  inStock: 1156,
  lowStock: 67,
  outOfStock: 24,
  totalValue: 125000,
  averageCost: 45.2,
  turnoverRate: 8.5,
  supplierCount: 23
};

const inventoryTrends = [
  { month: 'Jan', received: 1200, used: 1100, stock: 2500 },
  { month: 'Feb', received: 1350, used: 1200, stock: 2650 },
  { month: 'Mar', received: 1420, used: 1300, stock: 2770 },
  { month: 'Apr', received: 1380, used: 1250, stock: 2900 },
  { month: 'May', received: 1560, used: 1400, stock: 3060 },
  { month: 'Jun', received: 1680, used: 1500, stock: 3240 }
];

const categoryData = [
  { category: 'PPE', items: 45, percentage: 28.1, value: 35000 },
  { category: 'Medical Devices', items: 32, percentage: 20.0, value: 45000 },
  { category: 'Medications', items: 28, percentage: 17.5, value: 25000 },
  { category: 'Laboratory Supplies', items: 25, percentage: 15.6, value: 15000 },
  { category: 'Surgical Instruments', items: 20, percentage: 12.5, value: 35000 },
  { category: 'Other', items: 10, percentage: 6.3, value: 5000 }
];

const supplierData = [
  {
    id: 'SUPPLIER001',
    name: 'MedSupply Corp',
    contact: 'John Smith',
    email: 'john@medsupply.com',
    phone: '(555) 123-4567',
    rating: 4.8,
    deliveryTime: 3,
    reliability: 98.5,
    totalOrders: 156,
    totalValue: 45000,
    lastOrder: '2024-01-10T00:00:00Z',
    status: 'Active'
  },
  {
    id: 'SUPPLIER002',
    name: 'SafeHands Inc',
    contact: 'Sarah Johnson',
    email: 'sarah@safehands.com',
    phone: '(555) 234-5678',
    rating: 4.6,
    deliveryTime: 5,
    reliability: 96.2,
    totalOrders: 89,
    totalValue: 28000,
    lastOrder: '2024-01-08T00:00:00Z',
    status: 'Active'
  },
  {
    id: 'SUPPLIER003',
    name: 'MedTech Solutions',
    contact: 'Mike Wilson',
    email: 'mike@medtech.com',
    phone: '(555) 345-6789',
    rating: 4.9,
    deliveryTime: 2,
    reliability: 99.1,
    totalOrders: 234,
    totalValue: 52000,
    lastOrder: '2024-01-12T00:00:00Z',
    status: 'Active'
  }
];

export default function MedicalSupplyChain() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('inventory');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showItemForm, setShowItemForm] = useState(false);

  // Filter items
  const filteredItems = supplyData.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'Expired': return 'bg-gray-100 text-gray-800';
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Medical Supply Chain
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive medical supplies and procurement management</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowItemForm(true)}
              className="bg-rose-600 hover:bg-rose-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
            <Button
              variant="outline"
              className="border-rose-200 text-rose-600 hover:bg-rose-50"
            >
              <Truck className="w-4 h-4 mr-2" />
              Orders
            </Button>
            <Button
              variant="outline"
              className="border-rose-200 text-rose-600 hover:bg-rose-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Supply Chain Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Items',
              value: supplyMetrics.totalItems.toString(),
              change: '+12.5%',
              trend: 'up',
              icon: Package,
              color: 'from-rose-500 to-pink-500'
            },
            {
              title: 'In Stock',
              value: supplyMetrics.inStock.toString(),
              change: '+8.3%',
              trend: 'up',
              icon: CheckCircle,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Total Value',
              value: formatCurrency(supplyMetrics.totalValue),
              change: '+15.2%',
              trend: 'up',
              icon: DollarSign,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Turnover Rate',
              value: `${supplyMetrics.turnoverRate}x`,
              change: '+2.1%',
              trend: 'up',
              icon: TrendingUp,
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
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-rose-600" />
                    <span>Inventory Management</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search items..."
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
                        <SelectItem value="PPE">PPE</SelectItem>
                        <SelectItem value="Medical Devices">Medical Devices</SelectItem>
                        <SelectItem value="Medications">Medications</SelectItem>
                        <SelectItem value="Laboratory Supplies">Laboratory Supplies</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="In Stock">In Stock</SelectItem>
                        <SelectItem value="Low Stock">Low Stock</SelectItem>
                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                        <SelectItem value="Expired">Expired</SelectItem>
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
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-rose-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{item.itemName}</h3>
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {item.category}
                            </Badge>
                            <Badge variant="outline" className="text-purple-600 border-purple-200">
                              {item.supplier}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Stock: {item.currentStock} | Min: {item.minStock} | Max: {item.maxStock}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Location: {item.location}</span>
                            <span className="text-sm text-gray-600">Batch: {item.batchNumber}</span>
                            <span className="text-sm text-gray-600">Expiry: {new Date(item.expiryDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{item.currentStock}</p>
                          <p className="text-sm text-gray-600">Current Stock</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{formatCurrency(item.unitCost)}</p>
                          <p className="text-sm text-gray-600">Unit Cost</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{formatCurrency(item.totalValue)}</p>
                          <p className="text-sm text-gray-600">Total Value</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(item);
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

          <TabsContent value="suppliers" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-rose-600" />
                  <span>Supplier Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supplierData.map((supplier, index) => (
                    <motion.div
                      key={supplier.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                          <Truck className="w-6 h-6 text-rose-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                            <Badge className={supplier.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {supplier.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              Rating: {supplier.rating}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Contact: {supplier.contact} | {supplier.email}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Orders: {supplier.totalOrders}</span>
                            <span className="text-sm text-gray-600">Value: {formatCurrency(supplier.totalValue)}</span>
                            <span className="text-sm text-gray-600">Reliability: {supplier.reliability}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{supplier.rating}</p>
                          <p className="text-sm text-gray-600">Rating</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{supplier.deliveryTime} days</p>
                          <p className="text-sm text-gray-600">Delivery</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{supplier.reliability}%</p>
                          <p className="text-sm text-gray-600">Reliability</p>
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

          <TabsContent value="orders" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-rose-600" />
                  <span>Purchase Orders</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Found</h3>
                  <p className="text-gray-600 mb-4">Create your first purchase order to get started</p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-rose-600" />
                    <span>Inventory Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={inventoryTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="received" stroke="#f43f5e" strokeWidth={3} />
                      <Line type="monotone" dataKey="used" stroke="#3b82f6" strokeWidth={3} />
                      <Line type="monotone" dataKey="stock" stroke="#10b981" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-blue-600" />
                    <span>Category Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="items"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#f43f5e' : index === 1 ? '#3b82f6' : index === 2 ? '#f59e0b' : index === 3 ? '#ef4444' : index === 4 ? '#8b5cf6' : '#6b7280'} />
                        ))}
                      </Pie>
                      <Tooltip />
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
                    <Package className="w-5 h-5 text-green-600" />
                    <span>Inventory Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Items</span>
                      <span className="font-bold text-green-600">{supplyMetrics.totalItems}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">In Stock</span>
                      <span className="font-bold text-blue-600">{supplyMetrics.inStock}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Low Stock</span>
                      <span className="font-bold text-yellow-600">{supplyMetrics.lowStock}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Out of Stock</span>
                      <span className="font-bold text-red-600">{supplyMetrics.outOfStock}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <span>Financial Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Value</span>
                      <span className="font-bold text-green-600">{formatCurrency(supplyMetrics.totalValue)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Cost</span>
                      <span className="font-bold text-blue-600">{formatCurrency(supplyMetrics.averageCost)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Turnover Rate</span>
                      <span className="font-bold text-purple-600">{supplyMetrics.turnoverRate}x</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-purple-600" />
                    <span>Supplier Network</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Suppliers</span>
                      <span className="font-bold text-indigo-600">{supplyMetrics.supplierCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active Suppliers</span>
                      <span className="font-bold text-green-600">{supplyMetrics.supplierCount - 2}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pending Orders</span>
                      <span className="font-bold text-orange-600">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Item Detail Modal */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-rose-600" />
                <span>Item Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedItem && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center">
                    <Package className="w-10 h-10 text-rose-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedItem.itemName}</h2>
                      <Badge className={getStatusColor(selectedItem.status)}>
                        {selectedItem.status}
                      </Badge>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        {selectedItem.category}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">Supplier: {selectedItem.supplier} | Location: {selectedItem.location}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Current Stock</Label>
                        <p className="font-semibold">{selectedItem.currentStock}</p>
                      </div>
                      <div>
                        <Label>Unit Cost</Label>
                        <p className="font-semibold">{formatCurrency(selectedItem.unitCost)}</p>
                      </div>
                      <div>
                        <Label>Total Value</Label>
                        <p className="font-semibold">{formatCurrency(selectedItem.totalValue)}</p>
                      </div>
                      <div>
                        <Label>Expiry Date</Label>
                        <p className="font-semibold">{new Date(selectedItem.expiryDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedItem(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Item
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Item Modal */}
        <Dialog open={showItemForm} onOpenChange={setShowItemForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-rose-600" />
                <span>Add New Item</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input id="itemName" placeholder="Enter item name" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PPE">PPE</SelectItem>
                      <SelectItem value="Medical Devices">Medical Devices</SelectItem>
                      <SelectItem value="Medications">Medications</SelectItem>
                      <SelectItem value="Laboratory Supplies">Laboratory Supplies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input id="supplier" placeholder="Enter supplier" />
                </div>
                <div>
                  <Label htmlFor="unitCost">Unit Cost</Label>
                  <Input id="unitCost" placeholder="Enter unit cost" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowItemForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
