"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart, Package, Truck, CheckCircle, XCircle, Clock, AlertTriangle,
  Plus, Search, Filter, Edit, Trash2, Eye, Download, Upload, Settings, Save,
  RefreshCw, Share2, Lock, Unlock, Copy, ExternalLink, Play, Pause, Zap,
  Bell, MessageSquare, Heart, Globe, Building, Award, Microscope, TestTube,
  FlaskConical, Atom, Brain, Database, DollarSign, GraduationCap, BookOpen,
  FileText, Shield, Gavel, Scale, Clipboard, Video, Camera, Headphones, Monitor,
  Smartphone, Tablet, UserCheck, UserPlus, Mail, Phone, MapPin, Briefcase,
  Trophy, PieChart, LineChart, BarChart3, Star, Target, Calendar, Users,
  BarChart, TrendingDown, ArrowUp, ArrowDown, Minus, RotateCcw, RotateCw,
  CreditCard, Receipt, TruckIcon, MapPin as MapPinIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { faker } from '@faker-js/faker';

interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  shippingMethod: string;
  trackingNumber?: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery: Date;
  actualDelivery?: Date;
  analytics: OrderAnalytics;
}

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  variant?: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

interface OrderAnalytics {
  processingTime: number;
  shippingTime: number;
  totalTime: number;
  customerSatisfaction: number;
  repeatCustomer: boolean;
  channel: 'Online' | 'Store' | 'Mobile' | 'Phone';
  source: string;
  campaign?: string;
}

const generateMockOrder = (id: number): Order => {
  const statuses: Order['status'][] = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'];
  const priorities: Order['priority'][] = ['Low', 'Medium', 'High', 'Urgent'];
  const paymentMethods = ['Credit Card', 'Debit Card', 'PayPal', 'Apple Pay', 'Google Pay', 'Bank Transfer', 'Cash'];
  const shippingMethods = ['Standard', 'Express', 'Overnight', 'Same Day', 'Pickup'];
  const channels: OrderAnalytics['channel'][] = ['Online', 'Store', 'Mobile', 'Phone'];
  
  const status = faker.helpers.arrayElement(statuses);
  const priority = faker.helpers.arrayElement(priorities);
  const paymentMethod = faker.helpers.arrayElement(paymentMethods);
  const shippingMethod = faker.helpers.arrayElement(shippingMethods);
  const channel = faker.helpers.arrayElement(channels);
  
  const subtotal = faker.number.float({ min: 50, max: 2000, fractionDigits: 2 });
  const tax = subtotal * 0.08;
  const shipping = faker.number.float({ min: 0, max: 50, fractionDigits: 2 });
  const discount = faker.number.float({ min: 0, max: subtotal * 0.2, fractionDigits: 2 });
  const total = subtotal + tax + shipping - discount;
  
  const items: OrderItem[] = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => ({
    id: faker.string.uuid(),
    productId: faker.string.uuid(),
    productName: faker.commerce.productName(),
    sku: faker.string.alphanumeric(8).toUpperCase(),
    quantity: faker.number.int({ min: 1, max: 10 }),
    unitPrice: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }),
    totalPrice: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }),
    variant: faker.helpers.arrayElement(['Red', 'Blue', 'Green', 'Large', 'Medium', 'Small'])
  }));
  
  const processingTime = faker.number.int({ min: 1, max: 48 });
  const shippingTime = faker.number.int({ min: 1, max: 7 });
  
  return {
    id: faker.string.uuid(),
    orderNumber: faker.string.alphanumeric(8).toUpperCase(),
    customerId: faker.string.uuid(),
    customerName: faker.person.fullName(),
    customerEmail: faker.internet.email(),
    status,
    priority,
    total,
    subtotal,
    tax,
    shipping,
    discount,
    items,
    shippingAddress: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
      phone: faker.phone.number()
    },
    billingAddress: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
      phone: faker.phone.number()
    },
    paymentMethod,
    paymentStatus: faker.helpers.arrayElement(['Pending', 'Paid', 'Failed', 'Refunded']),
    shippingMethod,
    trackingNumber: status === 'Shipped' || status === 'Delivered' ? faker.string.alphanumeric(12).toUpperCase() : undefined,
    notes: faker.lorem.sentence(),
    createdAt: faker.date.past({ years: 1 }),
    updatedAt: faker.date.recent({ days: 30 }),
    estimatedDelivery: faker.date.future({ years: 0.02 }),
    actualDelivery: status === 'Delivered' ? faker.date.recent({ days: 30 }) : undefined,
    analytics: {
      processingTime,
      shippingTime,
      totalTime: processingTime + shippingTime,
      customerSatisfaction: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      repeatCustomer: faker.datatype.boolean(0.3),
      channel,
      source: faker.helpers.arrayElement(['Google', 'Facebook', 'Email', 'Direct', 'Referral']),
      campaign: faker.helpers.arrayElement(['Summer Sale', 'Black Friday', 'Holiday Special', 'New Customer'])
    }
  };
};

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [filterChannel, setFilterChannel] = useState<string>('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const mockOrders = Array.from({ length: 50 }, (_, i) => generateMockOrder(i));
    setOrders(mockOrders);
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
      const matchesPriority = filterPriority === 'All' || order.priority === filterPriority;
      const matchesChannel = filterChannel === 'All' || order.analytics.channel === filterChannel;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesChannel;
    });
  }, [orders, searchTerm, filterStatus, filterPriority, filterChannel]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-purple-100 text-purple-800';
      case 'Shipped': return 'bg-indigo-100 text-indigo-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Returned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Refunded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-2">Track and manage customer orders from placement to delivery</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => {/* Export functionality */}}
            variant="outline"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Customer Name</Label>
                    <Input placeholder="Enter customer name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Customer Email</Label>
                    <Input placeholder="Enter customer email" />
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="Debit Card">Debit Card</SelectItem>
                        <SelectItem value="PayPal">PayPal</SelectItem>
                        <SelectItem value="Apple Pay">Apple Pay</SelectItem>
                        <SelectItem value="Google Pay">Google Pay</SelectItem>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="Cash">Cash</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddModalOpen(false)}>
                  Create Order
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {orders.filter(o => o.status === 'Delivered').length} delivered
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-blue-600">
                {orders.filter(o => o.status === 'Pending').length} pending
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${orders.length > 0 ? (orders.reduce((sum, o) => sum + o.total, 0) / orders.length).toFixed(0) : 0}
                </p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-purple-600">
                {orders.filter(o => o.priority === 'Urgent').length} urgent
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processing Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {orders.length > 0 ? Math.round(orders.reduce((sum, o) => sum + o.analytics.processingTime, 0) / orders.length) : 0}h
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-orange-600">
                {orders.filter(o => o.status === 'Shipped').length} shipped
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                  <SelectItem value="Returned">Returned</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="All Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Priority</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Channel</Label>
              <Select value={filterChannel} onValueChange={setFilterChannel}>
                <SelectTrigger>
                  <SelectValue placeholder="All Channels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Channels</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Store">Store</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                  <SelectItem value="Phone">Phone</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg">#{order.orderNumber}</CardTitle>
                    <p className="text-sm text-gray-600">{order.customerName}</p>
                    <p className="text-sm text-gray-500">{order.customerEmail}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <Badge className={getPriorityColor(order.priority)}>
                      {order.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Total:</span>
                    <span className="ml-1 font-medium">${order.total.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Items:</span>
                    <span className="ml-1 font-medium">{order.items.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Payment:</span>
                    <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                      {order.paymentStatus}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-gray-500">Channel:</span>
                    <span className="ml-1 font-medium">{order.analytics.channel}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">
                      {order.status === 'Pending' ? '0%' :
                       order.status === 'Confirmed' ? '25%' :
                       order.status === 'Processing' ? '50%' :
                       order.status === 'Shipped' ? '75%' :
                       order.status === 'Delivered' ? '100%' : '0%'}
                    </span>
                  </div>
                  <Progress 
                    value={order.status === 'Pending' ? 0 :
                           order.status === 'Confirmed' ? 25 :
                           order.status === 'Processing' ? 50 :
                           order.status === 'Shipped' ? 75 :
                           order.status === 'Delivered' ? 100 : 0} 
                    className="h-2" 
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {order.analytics.processingTime}h processing
                    </span>
                  </div>
                  {order.trackingNumber && (
                    <Badge variant="outline" className="text-xs">
                      {order.trackingNumber}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsViewModalOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Truck className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.createdAt.toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg">Order #{selectedOrder.orderNumber}</h3>
                  <p className="text-gray-600">{selectedOrder.customerName}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedOrder.customerEmail}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge className={getStatusColor(selectedOrder.status)}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Priority:</span>
                    <Badge className={getPriorityColor(selectedOrder.priority)}>
                      {selectedOrder.priority}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total:</span>
                    <span className="font-medium">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment:</span>
                    <Badge className={getPaymentStatusColor(selectedOrder.paymentStatus)}>
                      {selectedOrder.paymentStatus}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Channel:</span>
                    <span className="font-medium">{selectedOrder.analytics.channel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Created:</span>
                    <span className="font-medium">{selectedOrder.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="items">Items</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Order Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Subtotal:</span>
                            <span className="font-medium">${selectedOrder.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Tax:</span>
                            <span className="font-medium">${selectedOrder.tax.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Shipping:</span>
                            <span className="font-medium">${selectedOrder.shipping.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Discount:</span>
                            <span className="font-medium">-${selectedOrder.discount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>${selectedOrder.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Payment Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Method:</span>
                            <span className="font-medium">{selectedOrder.paymentMethod}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Status:</span>
                            <Badge className={getPaymentStatusColor(selectedOrder.paymentStatus)}>
                              {selectedOrder.paymentStatus}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Shipping Method:</span>
                            <span className="font-medium">{selectedOrder.shippingMethod}</span>
                          </div>
                          {selectedOrder.trackingNumber && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">Tracking:</span>
                              <span className="font-medium">{selectedOrder.trackingNumber}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="items" className="space-y-4">
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{item.productName}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">${item.totalPrice.toFixed(2)}</span>
                            <Badge variant="outline">Qty: {item.quantity}</Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">SKU:</span>
                            <span className="ml-1 font-medium">{item.sku}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Unit Price:</span>
                            <span className="ml-1 font-medium">${item.unitPrice.toFixed(2)}</span>
                          </div>
                          {item.variant && (
                            <div>
                              <span className="text-gray-500">Variant:</span>
                              <span className="ml-1 font-medium">{item.variant}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="shipping" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Shipping Address</h4>
                        <div className="space-y-1 text-sm">
                          <div>{selectedOrder.shippingAddress.street}</div>
                          <div>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}</div>
                          <div>{selectedOrder.shippingAddress.country}</div>
                          {selectedOrder.shippingAddress.phone && (
                            <div>{selectedOrder.shippingAddress.phone}</div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Billing Address</h4>
                        <div className="space-y-1 text-sm">
                          <div>{selectedOrder.billingAddress.street}</div>
                          <div>{selectedOrder.billingAddress.city}, {selectedOrder.billingAddress.state} {selectedOrder.billingAddress.zipCode}</div>
                          <div>{selectedOrder.billingAddress.country}</div>
                          {selectedOrder.billingAddress.phone && (
                            <div>{selectedOrder.billingAddress.phone}</div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Performance Metrics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Processing Time:</span>
                            <span className="font-medium">{selectedOrder.analytics.processingTime}h</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Shipping Time:</span>
                            <span className="font-medium">{selectedOrder.analytics.shippingTime}h</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Total Time:</span>
                            <span className="font-medium">{selectedOrder.analytics.totalTime}h</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Satisfaction:</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span className="font-medium">{selectedOrder.analytics.customerSatisfaction.toFixed(1)}/5</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Order Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Channel:</span>
                            <span className="font-medium">{selectedOrder.analytics.channel}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Source:</span>
                            <span className="font-medium">{selectedOrder.analytics.source}</span>
                          </div>
                          {selectedOrder.analytics.campaign && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">Campaign:</span>
                              <span className="font-medium">{selectedOrder.analytics.campaign}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-gray-500">Repeat Customer:</span>
                            <span className="font-medium">{selectedOrder.analytics.repeatCustomer ? 'Yes' : 'No'}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
