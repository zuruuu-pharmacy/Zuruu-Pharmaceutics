"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings,
  Bell, Target, Zap, Shield, RefreshCw, RotateCcw, Barcode, QrCode, ScanLine,
  Truck, Box, Layers, Archive, Database, Activity, TrendingUp, TrendingDown,
  Minus, ArrowUp, ArrowDown, Calendar, Clock, MapPin, Tag, DollarSign, Percent,
  Star, Heart, Award, Users, ShoppingCart, Smartphone, Globe, Wifi, Smartphone as SmartphoneIcon,
  Layers as LayersIcon, Archive as ArchiveIcon, Truck as TruckIcon, Box as BoxIcon,
  Users as UsersIcon, Megaphone, Building, Clipboard, BookOpen, Scale, Gavel,
  Lock, Key, CheckSquare, Square, Play, Pause, Send, Share2, Image, Video,
  FileText, Printer, BarChart3, PieChart, LineChart, Activity as ActivityIcon
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

// Product catalog data simulation
const products = [
  {
    id: 'PRD001',
    name: 'Aspirin 100mg Tablets',
    category: 'Prescription Drugs',
    subcategory: 'Pain Relief',
    sku: 'ASP-100-30',
    price: 12.99,
    cost: 8.50,
    margin: 34.6,
    stock: 450,
    minStock: 50,
    maxStock: 500,
    supplier: 'MedSupply Co.',
    description: 'Low-dose aspirin for cardiovascular protection',
    ingredients: ['Acetylsalicylic Acid', 'Microcrystalline Cellulose'],
    dosage: '100mg',
    form: 'Tablet',
    prescription: true,
    controlled: false,
    expiryDate: '2025-12-31',
    batchNumber: 'ASP2024001',
    barcode: '1234567890123',
    images: ['aspirin1.jpg', 'aspirin2.jpg'],
    tags: ['pain relief', 'cardiovascular', 'prescription'],
    status: 'Active',
    rating: 4.5,
    reviews: 128
  },
  {
    id: 'PRD002',
    name: 'Vitamin D3 1000IU Capsules',
    category: 'Vitamins & Supplements',
    subcategory: 'Vitamins',
    sku: 'VD3-1000-60',
    price: 18.99,
    cost: 12.00,
    margin: 36.8,
    stock: 320,
    minStock: 30,
    maxStock: 400,
    supplier: 'NutriHealth Ltd.',
    description: 'High-potency vitamin D3 for bone and immune health',
    ingredients: ['Cholecalciferol', 'Medium Chain Triglycerides'],
    dosage: '1000IU',
    form: 'Capsule',
    prescription: false,
    controlled: false,
    expiryDate: '2026-06-30',
    batchNumber: 'VD32024002',
    barcode: '2345678901234',
    images: ['vitamind1.jpg', 'vitamind2.jpg'],
    tags: ['vitamin d', 'bone health', 'immune support'],
    status: 'Active',
    rating: 4.7,
    reviews: 89
  },
  {
    id: 'PRD003',
    name: 'Blood Pressure Monitor',
    category: 'Medical Devices',
    subcategory: 'Monitoring Devices',
    sku: 'BPM-DIGITAL-01',
    price: 89.99,
    cost: 65.00,
    margin: 27.8,
    stock: 85,
    minStock: 10,
    maxStock: 100,
    supplier: 'MedTech Solutions',
    description: 'Digital blood pressure monitor with large display',
    ingredients: [],
    dosage: 'N/A',
    form: 'Device',
    prescription: false,
    controlled: false,
    expiryDate: '2027-12-31',
    batchNumber: 'BPM2024003',
    barcode: '3456789012345',
    images: ['bpm1.jpg', 'bpm2.jpg'],
    tags: ['blood pressure', 'monitoring', 'digital'],
    status: 'Active',
    rating: 4.3,
    reviews: 156
  }
];

const categories = [
  { name: 'Prescription Drugs', count: 245, subcategories: ['Pain Relief', 'Antibiotics', 'Cardiovascular'] },
  { name: 'Vitamins & Supplements', count: 189, subcategories: ['Vitamins', 'Minerals', 'Herbal'] },
  { name: 'Medical Devices', count: 67, subcategories: ['Monitoring Devices', 'Diagnostic Tools', 'Therapeutic'] },
  { name: 'Personal Care', count: 134, subcategories: ['Skincare', 'Hair Care', 'Oral Care'] }
];

const catalogMetrics = {
  totalProducts: 635,
  activeProducts: 598,
  outOfStock: 12,
  lowStock: 25,
  totalCategories: 4,
  averageRating: 4.4,
  totalReviews: 2847,
  revenue: 125000
};

const salesData = [
  { month: 'Jan', sales: 12000, products: 245 },
  { month: 'Feb', sales: 15000, products: 289 },
  { month: 'Mar', sales: 18000, products: 312 },
  { month: 'Apr', sales: 16000, products: 298 },
  { month: 'May', sales: 22000, products: 356 },
  { month: 'Jun', sales: 25000, products: 389 }
];

export default function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('products');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showProductForm, setShowProductForm] = useState(false);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Discontinued': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockColor = (stock: number, minStock: number) => {
    if (stock <= 0) return 'text-red-600';
    if (stock <= minStock) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getMarginColor = (margin: number) => {
    if (margin >= 40) return 'text-green-600';
    if (margin >= 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Product Catalog
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive product management and inventory integration</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowProductForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
            <Button
              variant="outline"
              className="border-green-200 text-green-600 hover:bg-green-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              className="border-green-200 text-green-600 hover:bg-green-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Catalog Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Products',
              value: catalogMetrics.totalProducts.toString(),
              change: '+8.2%',
              trend: 'up',
              icon: Package,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Active Products',
              value: catalogMetrics.activeProducts.toString(),
              change: '+5.1%',
              trend: 'up',
              icon: CheckSquare,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Low Stock',
              value: catalogMetrics.lowStock.toString(),
              change: '-12.3%',
              trend: 'down',
              icon: AlertTriangle,
              color: 'from-orange-500 to-red-500'
            },
            {
              title: 'Revenue',
              value: `$${catalogMetrics.revenue.toLocaleString()}`,
              change: '+15.7%',
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
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-green-600" />
                    <span>Product Inventory</span>
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
                        <SelectItem value="Personal Care">Personal Care</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Discontinued">Discontinued</SelectItem>
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
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                            <Badge className={getStatusColor(product.status)}>
                              {product.status}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {product.category}
                            </Badge>
                            {product.prescription && (
                              <Badge variant="outline" className="text-red-600 border-red-200">
                                Rx
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">SKU: {product.sku}</span>
                            <span className="text-sm text-gray-600">Supplier: {product.supplier}</span>
                            <span className="text-sm text-gray-600">Expiry: {product.expiryDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${product.price}</p>
                          <p className="text-sm text-gray-600">Price</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${getStockColor(product.stock, product.minStock)}`}>
                            {product.stock}
                          </p>
                          <p className="text-sm text-gray-600">Stock</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${getMarginColor(product.margin)}`}>
                            {product.margin}%
                          </p>
                          <p className="text-sm text-gray-600">Margin</p>
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

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.count} products</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {category.subcategories.slice(0, 2).map((sub, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {sub}
                              </Badge>
                            ))}
                            {category.subcategories.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{category.subcategories.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-green-600" />
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
                      <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="products" stroke="#3b82f6" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Category Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Package className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{category.name}</p>
                            <p className="text-sm text-gray-600">{category.count} products</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">${(category.count * 200).toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-green-600" />
                  <span>Catalog Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="autoReorder">Auto Reorder</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled">Enabled</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                      <Input id="lowStockThreshold" type="number" placeholder="10" />
                    </div>
                    <div>
                      <Label htmlFor="priceUpdate">Price Update Frequency</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="notifications">Stock Notifications</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled">Enabled</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button>
                      <Save className="w-4 h-4 mr-2" />
                      Save Settings
                    </Button>
                    <Button variant="outline">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Product Detail Modal */}
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-green-600" />
                <span>Product Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedProduct && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <Package className="w-10 h-10 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                      <Badge className={getStatusColor(selectedProduct.status)}>
                        {selectedProduct.status}
                      </Badge>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        {selectedProduct.category}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>SKU</Label>
                        <p className="font-semibold">{selectedProduct.sku}</p>
                      </div>
                      <div>
                        <Label>Price</Label>
                        <p className="font-semibold">${selectedProduct.price}</p>
                      </div>
                      <div>
                        <Label>Stock</Label>
                        <p className="font-semibold">{selectedProduct.stock}</p>
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
                      <CardTitle className="text-lg">Product Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Description:</span>
                        <span className="font-semibold">{selectedProduct.description}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dosage:</span>
                        <span className="font-semibold">{selectedProduct.dosage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Form:</span>
                        <span className="font-semibold">{selectedProduct.form}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expiry Date:</span>
                        <span className="font-semibold">{selectedProduct.expiryDate}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Inventory Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Supplier:</span>
                        <span className="font-semibold">{selectedProduct.supplier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Batch Number:</span>
                        <span className="font-semibold">{selectedProduct.batchNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Barcode:</span>
                        <span className="font-semibold">{selectedProduct.barcode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <span className="font-semibold text-yellow-600">{selectedProduct.rating}/5</span>
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
                    Edit Product
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Product Modal */}
        <Dialog open={showProductForm} onOpenChange={setShowProductForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-green-600" />
                <span>Add New Product</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productName">Product Name</Label>
                  <Input id="productName" placeholder="Enter product name" />
                </div>
                <div>
                  <Label htmlFor="productSku">SKU</Label>
                  <Input id="productSku" placeholder="Enter SKU" />
                </div>
                <div>
                  <Label htmlFor="productCategory">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Prescription Drugs">Prescription Drugs</SelectItem>
                      <SelectItem value="Vitamins & Supplements">Vitamins & Supplements</SelectItem>
                      <SelectItem value="Medical Devices">Medical Devices</SelectItem>
                      <SelectItem value="Personal Care">Personal Care</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="productPrice">Price</Label>
                  <Input id="productPrice" type="number" placeholder="Enter price" />
                </div>
                <div>
                  <Label htmlFor="productStock">Stock</Label>
                  <Input id="productStock" type="number" placeholder="Enter stock" />
                </div>
                <div>
                  <Label htmlFor="productSupplier">Supplier</Label>
                  <Input id="productSupplier" placeholder="Enter supplier" />
                </div>
              </div>
              <div>
                <Label htmlFor="productDescription">Description</Label>
                <Textarea id="productDescription" placeholder="Enter product description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowProductForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}