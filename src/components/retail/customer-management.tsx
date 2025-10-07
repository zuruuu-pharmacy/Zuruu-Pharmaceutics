"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, User, Phone, Mail, MapPin, Calendar, Star, Heart, Award, Target,
  MessageSquare, Bell, Settings, Search, Filter, Plus, Edit, Trash2, Eye,
  Download, Upload, RefreshCw, RotateCcw, TrendingUp, TrendingDown, ArrowUp,
  ArrowDown, Clock, CheckCircle, XCircle, AlertTriangle, Shield, Zap,
  ShoppingCart, CreditCard, Package, Activity, BarChart3, PieChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Customer data simulation
const customers = [
  {
    id: 'C001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    dateJoined: '2023-01-15',
    lastVisit: '2024-01-10',
    totalSpent: 2450.75,
    loyaltyPoints: 1250,
    status: 'Active',
    tier: 'Gold',
    preferences: ['Pain Relief', 'Vitamins', 'Medical Devices'],
    prescriptions: 12,
    orders: 45,
    satisfaction: 4.8,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'C002',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Ave, City, State 12345',
    dateJoined: '2023-03-22',
    lastVisit: '2024-01-08',
    totalSpent: 1890.50,
    loyaltyPoints: 945,
    status: 'Active',
    tier: 'Silver',
    preferences: ['Vitamins', 'Beauty & Personal Care'],
    prescriptions: 8,
    orders: 32,
    satisfaction: 4.6,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'C003',
    name: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    phone: '+1 (555) 345-6789',
    address: '789 Pine St, City, State 12345',
    dateJoined: '2023-06-10',
    lastVisit: '2024-01-05',
    totalSpent: 3200.25,
    loyaltyPoints: 1600,
    status: 'VIP',
    tier: 'Platinum',
    preferences: ['Medical Devices', 'Prescription Drugs'],
    prescriptions: 18,
    orders: 67,
    satisfaction: 4.9,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'C004',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    phone: '+1 (555) 456-7890',
    address: '321 Elm St, City, State 12345',
    dateJoined: '2023-08-05',
    lastVisit: '2023-12-20',
    totalSpent: 890.75,
    loyaltyPoints: 445,
    status: 'Inactive',
    tier: 'Bronze',
    preferences: ['Cold & Flu', 'Topical'],
    prescriptions: 5,
    orders: 18,
    satisfaction: 4.2,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'C005',
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '+1 (555) 567-8901',
    address: '654 Maple Dr, City, State 12345',
    dateJoined: '2023-11-12',
    lastVisit: '2024-01-12',
    totalSpent: 1560.00,
    loyaltyPoints: 780,
    status: 'Active',
    tier: 'Silver',
    preferences: ['Supplements', 'Health & Wellness'],
    prescriptions: 9,
    orders: 28,
    satisfaction: 4.7,
    avatar: '/api/placeholder/40/40'
  }
];

const customerSegments = [
  { name: 'VIP Customers', count: 1, color: 'bg-purple-100 text-purple-800', value: 15 },
  { name: 'Active Customers', count: 3, color: 'bg-green-100 text-green-800', value: 45 },
  { name: 'Inactive Customers', count: 1, color: 'bg-gray-100 text-gray-800', value: 20 },
  { name: 'New Customers', count: 0, color: 'bg-blue-100 text-blue-800', value: 20 }
];

const recentInteractions = [
  { customer: 'John Doe', type: 'Purchase', description: 'Bought Aspirin 100mg', time: '2 hours ago', value: '$12.99' },
  { customer: 'Jane Smith', type: 'Prescription', description: 'New prescription from Dr. Smith', time: '4 hours ago', value: '$45.50' },
  { customer: 'Mike Johnson', type: 'Inquiry', description: 'Asked about blood pressure monitors', time: '6 hours ago', value: 'N/A' },
  { customer: 'David Brown', type: 'Purchase', description: 'Bought multivitamins', time: '1 day ago', value: '$19.99' },
  { customer: 'Sarah Wilson', type: 'Complaint', description: 'Product quality issue', time: '3 days ago', value: 'N/A' }
];

export default function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [activeTab, setActiveTab] = useState('customers');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           customer.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    const matchesTier = selectedTier === 'all' || customer.tier === selectedTier;
    return matchesSearch && matchesStatus && matchesTier;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'VIP': return 'bg-purple-100 text-purple-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'bg-gray-100 text-gray-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      case 'Bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'Purchase': return <ShoppingCart className="w-4 h-4 text-green-600" />;
      case 'Prescription': return <Package className="w-4 h-4 text-blue-600" />;
      case 'Inquiry': return <MessageSquare className="w-4 h-4 text-yellow-600" />;
      case 'Complaint': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Customer Relationship Management
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive customer profiles and relationship insights</p>
        </div>
          <div className="flex items-center space-x-4">
          <Button
              onClick={() => setShowCustomerForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
                <Plus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            <Button
              variant="outline"
              className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
                </Button>
            <Button
              variant="outline"
              className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
                </Button>
        </div>
      </div>

        {/* Customer Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Customers',
              value: customers.length.toString(),
              change: '+12.5%',
              trend: 'up',
              icon: Users,
              color: 'from-indigo-500 to-blue-500'
            },
            {
              title: 'Active Customers',
              value: customers.filter(c => c.status === 'Active').length.toString(),
              change: '+8.2%',
              trend: 'up',
              icon: CheckCircle,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'VIP Customers',
              value: customers.filter(c => c.status === 'VIP').length.toString(),
              change: '+15.3%',
              trend: 'up',
              icon: Star,
              color: 'from-purple-500 to-violet-500'
            },
            {
              title: 'Total Revenue',
              value: `$${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}`,
              change: '+18.9%',
              trend: 'up',
              icon: TrendingUp,
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Customer List */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <span>Customer Database</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                />
              </div>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
                    <Select value={selectedTier} onValueChange={setSelectedTier}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Tier" />
                </SelectTrigger>
                <SelectContent>
                        <SelectItem value="all">All Tiers</SelectItem>
                        <SelectItem value="Platinum">Platinum</SelectItem>
                        <SelectItem value="Gold">Gold</SelectItem>
                        <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Bronze">Bronze</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
        {filteredCustomers.map((customer, index) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={customer.avatar} />
                          <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                            <Badge className={getTierColor(customer.tier)}>
                              {customer.tier}
                    </Badge>
                  </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">{customer.email}</span>
                            <span className="text-sm text-gray-600">{customer.phone}</span>
                            <span className="text-sm text-gray-600">Joined: {customer.dateJoined}</span>
                  </div>
                  </div>
                </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${customer.totalSpent.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{customer.loyaltyPoints} points</p>
                  </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{customer.orders} orders</p>
                          <p className="text-sm text-gray-600">{customer.prescriptions} prescriptions</p>
                </div>
                <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(customer.satisfaction)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                  </div>
                          <span className="text-sm text-gray-600">{customer.satisfaction}</span>
                </div>
                        <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                        setSelectedCustomer(customer);
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Segments */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  <span>Customer Segments</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerSegments.map((segment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${segment.color.split(' ')[0]}`} />
                        <span className="font-medium text-gray-900">{segment.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{segment.count}</p>
                        <p className="text-sm text-gray-600">{segment.value}%</p>
                  </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Interactions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  <span>Recent Interactions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentInteractions.slice(0, 5).map((interaction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      {getInteractionIcon(interaction.type)}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{interaction.customer}</p>
                        <p className="text-sm text-gray-600">{interaction.description}</p>
                        <p className="text-xs text-gray-500">{interaction.time}</p>
                      </div>
                      {interaction.value !== 'N/A' && (
                        <span className="text-sm font-semibold text-green-600">{interaction.value}</span>
                      )}
          </motion.div>
        ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-orange-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Send Notification
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Award className="w-4 h-4 mr-2" />
                  Award Points
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </CardContent>
            </Card>
          </div>
      </div>

        {/* Customer Detail Modal */}
        <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
          <DialogContent className="max-w-4xl">
          <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-indigo-600" />
                <span>Customer Profile</span>
              </DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={selectedCustomer.avatar} />
                    <AvatarFallback className="text-lg">
                      {selectedCustomer.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedCustomer.name}</h2>
                    <Badge className={getStatusColor(selectedCustomer.status)}>
                      {selectedCustomer.status}
                    </Badge>
                      <Badge className={getTierColor(selectedCustomer.tier)}>
                        {selectedCustomer.tier}
                    </Badge>
                  </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Email</Label>
                        <p className="font-semibold">{selectedCustomer.email}</p>
                  </div>
                      <div>
                        <Label>Phone</Label>
                        <p className="font-semibold">{selectedCustomer.phone}</p>
                  </div>
                      <div>
                        <Label>Address</Label>
                        <p className="font-semibold">{selectedCustomer.address}</p>
                  </div>
                      <div>
                        <Label>Member Since</Label>
                        <p className="font-semibold">{selectedCustomer.dateJoined}</p>
                    </div>
                  </div>
                </div>
              </div>
              
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Financial Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                          <div className="flex justify-between">
                        <span className="text-gray-600">Total Spent:</span>
                        <span className="font-semibold">${selectedCustomer.totalSpent.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                        <span className="text-gray-600">Loyalty Points:</span>
                        <span className="font-semibold">{selectedCustomer.loyaltyPoints}</span>
                          </div>
                          <div className="flex justify-between">
                        <span className="text-gray-600">Orders:</span>
                        <span className="font-semibold">{selectedCustomer.orders}</span>
                          </div>
                          <div className="flex justify-between">
                        <span className="text-gray-600">Prescriptions:</span>
                        <span className="font-semibold">{selectedCustomer.prescriptions}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Preferences</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedCustomer.preferences.map((pref: string, index: number) => (
                          <Badge key={index} variant="outline" className="mr-2">
                            {pref}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                
                    <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Satisfaction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-6 h-6 ${
                                i < Math.floor(selectedCustomer.satisfaction)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                              ))}
                            </div>
                        <p className="text-2xl font-bold text-gray-900">{selectedCustomer.satisfaction}/5</p>
                        <p className="text-sm text-gray-600">Customer Rating</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

        {/* Add Customer Modal */}
        <Dialog open={showCustomerForm} onOpenChange={setShowCustomerForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-indigo-600" />
                <span>Add New Customer</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
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
              <div>
                <Label htmlFor="preferences">Preferences</Label>
                <Input id="preferences" placeholder="Enter preferences (comma separated)" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCustomerForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
