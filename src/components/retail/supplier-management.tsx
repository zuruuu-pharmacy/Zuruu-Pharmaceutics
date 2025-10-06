"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck, Package, Building, Phone, Mail, MapPin, Calendar, Clock, CheckCircle, XCircle, AlertTriangle,
  Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings, Bell, Target, Zap, Activity,
  BarChart3, TrendingUp, TrendingDown, ArrowUp, ArrowDown, Star, Heart, Award, Shield, Database,
  Network, Cpu, Brain, RefreshCw, RotateCcw, FileText, Printer, DollarSign, Percent, Tag
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

// Supplier data simulation
const suppliers = [
  {
    id: 'SUP001',
    name: 'MedSupply Co.',
    category: 'Pharmaceuticals',
    contact: 'John Smith',
    email: 'john@medsupply.com',
    phone: '+1 (555) 123-4567',
    address: '123 Medical Ave, City, State 12345',
    status: 'Active',
    rating: 4.8,
    totalOrders: 156,
    totalValue: 125000,
    lastOrder: '2024-01-15',
    contractExpiry: '2024-12-31',
    paymentTerms: 'Net 30',
    deliveryTime: '2-3 days',
    certifications: ['FDA Approved', 'ISO 9001'],
    specialties: ['Prescription Drugs', 'OTC Medications'],
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'SUP002',
    name: 'HealthPlus Ltd.',
    category: 'Vitamins & Supplements',
    contact: 'Sarah Johnson',
    email: 'sarah@healthplus.com',
    phone: '+1 (555) 234-5678',
    address: '456 Wellness St, City, State 12345',
    status: 'Active',
    rating: 4.6,
    totalOrders: 89,
    totalValue: 67000,
    lastOrder: '2024-01-14',
    contractExpiry: '2024-10-15',
    paymentTerms: 'Net 15',
    deliveryTime: '1-2 days',
    certifications: ['GMP Certified', 'Organic Certified'],
    specialties: ['Vitamins', 'Supplements', 'Health Products'],
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'SUP003',
    name: 'MedTech Solutions',
    category: 'Medical Devices',
    contact: 'Mike Chen',
    email: 'mike@medtech.com',
    phone: '+1 (555) 345-6789',
    address: '789 Device Blvd, City, State 12345',
    status: 'Active',
    rating: 4.9,
    totalOrders: 45,
    totalValue: 89000,
    lastOrder: '2024-01-13',
    contractExpiry: '2025-03-20',
    paymentTerms: 'Net 45',
    deliveryTime: '3-5 days',
    certifications: ['FDA Approved', 'CE Marked'],
    specialties: ['Diagnostic Equipment', 'Monitoring Devices'],
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'SUP004',
    name: 'NutriLife Inc.',
    category: 'Nutrition',
    contact: 'Emily Davis',
    email: 'emily@nutrilife.com',
    phone: '+1 (555) 456-7890',
    address: '321 Nutrition Way, City, State 12345',
    status: 'Pending',
    rating: 4.4,
    totalOrders: 23,
    totalValue: 34000,
    lastOrder: '2024-01-12',
    contractExpiry: '2024-08-30',
    paymentTerms: 'Net 30',
    deliveryTime: '2-4 days',
    certifications: ['Organic Certified', 'Non-GMO'],
    specialties: ['Organic Products', 'Natural Supplements'],
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'SUP005',
    name: 'TopicalCare Ltd.',
    category: 'Topical Products',
    contact: 'David Brown',
    email: 'david@topicalcare.com',
    phone: '+1 (555) 567-8901',
    address: '654 Skin Care Ave, City, State 12345',
    status: 'Active',
    rating: 4.7,
    totalOrders: 67,
    totalValue: 45000,
    lastOrder: '2024-01-11',
    contractExpiry: '2024-11-15',
    paymentTerms: 'Net 20',
    deliveryTime: '1-3 days',
    certifications: ['Dermatologist Tested', 'Hypoallergenic'],
    specialties: ['Topical Medications', 'Skin Care Products'],
    avatar: '/api/placeholder/40/40'
  }
];

const purchaseOrders = [
  {
    id: 'PO001',
    supplierId: 'SUP001',
    supplierName: 'MedSupply Co.',
    date: '2024-01-15',
    status: 'Delivered',
    totalAmount: 2500.00,
    items: 15,
    expectedDelivery: '2024-01-18',
    actualDelivery: '2024-01-17'
  },
  {
    id: 'PO002',
    supplierId: 'SUP002',
    supplierName: 'HealthPlus Ltd.',
    date: '2024-01-14',
    status: 'In Transit',
    totalAmount: 1800.00,
    items: 8,
    expectedDelivery: '2024-01-16',
    actualDelivery: null
  },
  {
    id: 'PO003',
    supplierId: 'SUP003',
    supplierName: 'MedTech Solutions',
    date: '2024-01-13',
    status: 'Processing',
    totalAmount: 3200.00,
    items: 3,
    expectedDelivery: '2024-01-18',
    actualDelivery: null
  }
];

const supplierAnalytics = {
  totalSuppliers: suppliers.length,
  activeSuppliers: suppliers.filter(s => s.status === 'Active').length,
  totalOrders: purchaseOrders.length,
  totalValue: suppliers.reduce((sum, s) => sum + s.totalValue, 0),
  averageRating: suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length,
  onTimeDelivery: 94.2,
  contractRenewals: 3
};

export default function SupplierManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('suppliers');
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [showSupplierForm, setShowSupplierForm] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  // Filter suppliers
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || supplier.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || supplier.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Suspended': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Supplier & Vendor Management
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive supplier relationships and procurement</p>
        </div>
          <div className="flex items-center space-x-4">
          <Button
              onClick={() => setShowSupplierForm(true)}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
                <Plus className="w-4 h-4 mr-2" />
                Add Supplier
              </Button>
            <Button
              onClick={() => setShowOrderForm(true)}
              variant="outline"
              className="border-violet-200 text-violet-600 hover:bg-violet-50"
            >
              <Truck className="w-4 h-4 mr-2" />
              New Order
                </Button>
            <Button
              variant="outline"
              className="border-violet-200 text-violet-600 hover:bg-violet-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
                </Button>
        </div>
      </div>

        {/* Supplier Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Suppliers',
              value: supplierAnalytics.totalSuppliers.toString(),
              change: '+8.2%',
              trend: 'up',
              icon: Building,
              color: 'from-violet-500 to-purple-500'
            },
            {
              title: 'Active Suppliers',
              value: supplierAnalytics.activeSuppliers.toString(),
              change: '+12.5%',
              trend: 'up',
              icon: CheckCircle,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Total Orders',
              value: supplierAnalytics.totalOrders.toString(),
              change: '+15.3%',
              trend: 'up',
              icon: Package,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Total Value',
              value: `$${supplierAnalytics.totalValue.toLocaleString()}`,
              change: '+18.9%',
              trend: 'up',
              icon: DollarSign,
              color: 'from-orange-500 to-red-500'
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
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="suppliers" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="w-5 h-5 text-violet-600" />
                    <span>Supplier Directory</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search suppliers..."
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
                        <SelectItem value="Pharmaceuticals">Pharmaceuticals</SelectItem>
                        <SelectItem value="Vitamins & Supplements">Vitamins & Supplements</SelectItem>
                  <SelectItem value="Medical Devices">Medical Devices</SelectItem>
                        <SelectItem value="Nutrition">Nutrition</SelectItem>
                        <SelectItem value="Topical Products">Topical Products</SelectItem>
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
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredSuppliers.map((supplier, index) => (
          <motion.div
            key={supplier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedSupplier(supplier)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                          <Building className="w-6 h-6 text-violet-600" />
                  </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                    <Badge className={getStatusColor(supplier.status)}>
                      {supplier.status}
                    </Badge>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(supplier.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="ml-1 text-sm text-gray-600">{supplier.rating}</span>
                  </div>
                </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">{supplier.category}</span>
                            <span className="text-sm text-gray-600">{supplier.contact}</span>
                            <span className="text-sm text-gray-600">{supplier.email}</span>
                  </div>
                  </div>
                </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{supplier.totalOrders} orders</p>
                          <p className="text-sm text-gray-600">${supplier.totalValue.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{supplier.deliveryTime}</p>
                          <p className="text-sm text-gray-600">Delivery</p>
                  </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{supplier.contractExpiry}</p>
                          <p className="text-sm text-gray-600">Contract</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                        setSelectedSupplier(supplier);
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

          <TabsContent value="orders" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-violet-600" />
                  <span>Purchase Orders</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                          <Truck className="w-6 h-6 text-violet-600" />
                </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{order.id}</h3>
                            <Badge className={getOrderStatusColor(order.status)}>
                              {order.status}
                    </Badge>
                  </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">{order.supplierName}</span>
                            <span className="text-sm text-gray-600">{order.date}</span>
                            <span className="text-sm text-gray-600">{order.items} items</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${order.totalAmount.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Total Amount</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{order.expectedDelivery}</p>
                          <p className="text-sm text-gray-600">Expected</p>
                        </div>
                        {order.actualDelivery && (
                          <div className="text-right">
                            <p className="font-semibold text-green-600">{order.actualDelivery}</p>
                            <p className="text-sm text-gray-600">Delivered</p>
                          </div>
                        )}
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

          <TabsContent value="contracts" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-violet-600" />
                  <span>Contract Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suppliers.map((supplier, index) => (
                    <motion.div
                      key={supplier.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                          <FileText className="w-6 h-6 text-violet-600" />
                  </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                            <Badge className={getStatusColor(supplier.status)}>
                              {supplier.status}
                            </Badge>
                  </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">Expires: {supplier.contractExpiry}</span>
                            <span className="text-sm text-gray-600">Terms: {supplier.paymentTerms}</span>
                            <span className="text-sm text-gray-600">{supplier.certifications.length} certifications</span>
                  </div>
                </div>
              </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{supplier.totalOrders}</p>
                          <p className="text-sm text-gray-600">Orders</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${supplier.totalValue.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Value</p>
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

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Supplier Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Rating</span>
                      <span className="font-bold text-2xl">{supplierAnalytics.averageRating.toFixed(1)}/5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">On-Time Delivery</span>
                      <span className="font-bold text-green-600">{supplierAnalytics.onTimeDelivery}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Contract Renewals</span>
                      <span className="font-bold text-blue-600">{supplierAnalytics.contractRenewals}</span>
                          </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Suppliers</span>
                      <span className="font-bold">{supplierAnalytics.totalSuppliers}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Top Suppliers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {suppliers
                      .sort((a, b) => b.rating - a.rating)
                      .slice(0, 3)
                      .map((supplier, index) => (
                        <div key={supplier.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-violet-600">#{index + 1}</span>
                          </div>
                            <div>
                              <p className="font-medium text-gray-900">{supplier.name}</p>
                              <p className="text-sm text-gray-600">{supplier.category}</p>
                          </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{supplier.rating}/5</p>
                            <p className="text-sm text-gray-600">{supplier.totalOrders} orders</p>
                          </div>
                        </div>
                      ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
        </Tabs>

        {/* Supplier Detail Modal */}
        <Dialog open={!!selectedSupplier} onOpenChange={() => setSelectedSupplier(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-violet-600" />
                <span>Supplier Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedSupplier && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center">
                    <Building className="w-10 h-10 text-violet-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedSupplier.name}</h2>
                      <Badge className={getStatusColor(selectedSupplier.status)}>
                        {selectedSupplier.status}
                      </Badge>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(selectedSupplier.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-lg font-semibold">{selectedSupplier.rating}</span>
                          </div>
                        </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Category</Label>
                        <p className="font-semibold">{selectedSupplier.category}</p>
                      </div>
                      <div>
                        <Label>Contact Person</Label>
                        <p className="font-semibold">{selectedSupplier.contact}</p>
                      </div>
                          <div>
                        <Label>Email</Label>
                        <p className="font-semibold">{selectedSupplier.email}</p>
                          </div>
                          <div>
                        <Label>Phone</Label>
                        <p className="font-semibold">{selectedSupplier.phone}</p>
                          </div>
                          <div>
                        <Label>Address</Label>
                        <p className="font-semibold">{selectedSupplier.address}</p>
                          </div>
                          <div>
                        <Label>Payment Terms</Label>
                        <p className="font-semibold">{selectedSupplier.paymentTerms}</p>
                          </div>
                        </div>
                      </div>
                  </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                          <div className="flex justify-between">
                        <span className="text-gray-600">Total Orders:</span>
                        <span className="font-semibold">{selectedSupplier.totalOrders}</span>
                          </div>
                          <div className="flex justify-between">
                        <span className="text-gray-600">Total Value:</span>
                        <span className="font-semibold">${selectedSupplier.totalValue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Time:</span>
                        <span className="font-semibold">{selectedSupplier.deliveryTime}</span>
                          </div>
                          <div className="flex justify-between">
                        <span className="text-gray-600">Last Order:</span>
                        <span className="font-semibold">{selectedSupplier.lastOrder}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Certifications & Specialties</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label>Certifications</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedSupplier.certifications.map((cert: string, index: number) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                              {cert}
                            </Badge>
                          ))}
                          </div>
                          </div>
                      <div>
                        <Label>Specialties</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedSupplier.specialties.map((specialty: string, index: number) => (
                            <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                              {specialty}
                            </Badge>
                          ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedSupplier(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Supplier
                            </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Supplier Modal */}
        <Dialog open={showSupplierForm} onOpenChange={setShowSupplierForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-violet-600" />
                <span>Add New Supplier</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Company Name</Label>
                  <Input id="name" placeholder="Enter company name" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pharmaceuticals">Pharmaceuticals</SelectItem>
                      <SelectItem value="Vitamins & Supplements">Vitamins & Supplements</SelectItem>
                      <SelectItem value="Medical Devices">Medical Devices</SelectItem>
                      <SelectItem value="Nutrition">Nutrition</SelectItem>
                      <SelectItem value="Topical Products">Topical Products</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contact">Contact Person</Label>
                  <Input id="contact" placeholder="Enter contact person" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter address" />
                </div>
                          </div>
                        </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSupplierForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Supplier
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* New Order Modal */}
        <Dialog open={showOrderForm} onOpenChange={setShowOrderForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-violet-600" />
                <span>Create Purchase Order</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="supplier">Supplier</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                          <div>
                  <Label htmlFor="date">Order Date</Label>
                  <Input id="date" type="date" />
                          </div>
                            <div>
                  <Label htmlFor="expectedDelivery">Expected Delivery</Label>
                  <Input id="expectedDelivery" type="date" />
                            </div>
                <div>
                  <Label htmlFor="totalAmount">Total Amount</Label>
                  <Input id="totalAmount" type="number" placeholder="Enter total amount" />
                        </div>
                      </div>
              <div>
                <Label htmlFor="notes">Order Notes</Label>
                <Textarea id="notes" placeholder="Enter order notes" />
                  </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowOrderForm(false)}>
                Cancel
              </Button>
              <Button>
                <Truck className="w-4 h-4 mr-2" />
                Create Order
              </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
      </motion.div>
    </div>
  );
}