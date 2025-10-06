"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Users, Package, DollarSign, ShoppingCart, 
  Activity, AlertTriangle, CheckCircle, Clock, Star, Target, Zap,
  BarChart3, PieChart, LineChart, Eye, RefreshCw, Settings, Bell,
  ArrowUp, ArrowDown, Minus, Plus, Calendar, MapPin, Phone, Mail,
  CreditCard, Shield, Award, Heart, Brain, Cpu, Database, Network
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Real-time data simulation
const generateRealTimeData = () => ({
  sales: Math.floor(Math.random() * 10000) + 5000,
  customers: Math.floor(Math.random() * 1000) + 500,
  orders: Math.floor(Math.random() * 500) + 200,
  revenue: Math.floor(Math.random() * 50000) + 25000,
  profit: Math.floor(Math.random() * 10000) + 5000,
  inventory: Math.floor(Math.random() * 1000) + 500,
  prescriptions: Math.floor(Math.random() * 100) + 50,
  staff: Math.floor(Math.random() * 20) + 10
});

const salesData = [
  { name: 'Jan', sales: 4000, profit: 2400, customers: 240 },
  { name: 'Feb', sales: 3000, profit: 1398, customers: 221 },
  { name: 'Mar', sales: 2000, profit: 9800, customers: 229 },
  { name: 'Apr', sales: 2780, profit: 3908, customers: 200 },
  { name: 'May', sales: 1890, profit: 4800, customers: 218 },
  { name: 'Jun', sales: 2390, profit: 3800, customers: 250 },
  { name: 'Jul', sales: 3490, profit: 4300, customers: 210 },
];

const categoryData = [
  { name: 'Prescriptions', value: 45, color: '#8884d8' },
  { name: 'OTC Drugs', value: 25, color: '#82ca9d' },
  { name: 'Health Products', value: 20, color: '#ffc658' },
  { name: 'Beauty & Personal', value: 10, color: '#ff7300' },
];

const topProducts = [
  { name: 'Aspirin 100mg', sales: 1250, growth: 12.5 },
  { name: 'Vitamin D3', sales: 980, growth: 8.2 },
  { name: 'Blood Pressure Monitor', sales: 750, growth: 15.3 },
  { name: 'Multivitamin', sales: 650, growth: 5.7 },
  { name: 'Pain Relief Gel', sales: 520, growth: 18.9 },
];

const recentTransactions = [
  { id: 'TXN001', customer: 'John Doe', amount: 45.99, time: '2 min ago', status: 'completed' },
  { id: 'TXN002', customer: 'Jane Smith', amount: 89.50, time: '5 min ago', status: 'processing' },
  { id: 'TXN003', customer: 'Mike Johnson', amount: 23.75, time: '8 min ago', status: 'completed' },
  { id: 'TXN004', customer: 'Sarah Wilson', amount: 156.00, time: '12 min ago', status: 'completed' },
  { id: 'TXN005', customer: 'David Brown', amount: 67.25, time: '15 min ago', status: 'pending' },
];

const alerts = [
  { type: 'warning', message: 'Low stock alert: Aspirin 100mg (15 units remaining)', time: '5 min ago' },
  { type: 'info', message: 'New prescription received from Dr. Smith', time: '10 min ago' },
  { type: 'success', message: 'Monthly target achieved: 125% of goal', time: '1 hour ago' },
  { type: 'warning', message: 'Payment processing delay for transaction TXN002', time: '2 hours ago' },
];

export default function RetailOverviewDashboard() {
  const [realTimeData, setRealTimeData] = useState(generateRealTimeData());
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(generateRealTimeData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setRealTimeData(generateRealTimeData());
      setIsRefreshing(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <Bell className="w-4 h-4 text-blue-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Retail Pharmacy Command Center
            </h1>
            <p className="text-gray-600 mt-2">Real-time insights and comprehensive analytics</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Button>
          </div>
        </div>

        {/* Real-time KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Today\'s Sales',
              value: `$${realTimeData.sales.toLocaleString()}`,
              change: '+12.5%',
              trend: 'up',
              icon: DollarSign,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Active Customers',
              value: realTimeData.customers.toLocaleString(),
              change: '+8.2%',
              trend: 'up',
              icon: Users,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Orders Today',
              value: realTimeData.orders.toLocaleString(),
              change: '+15.3%',
              trend: 'up',
              icon: ShoppingCart,
              color: 'from-purple-500 to-violet-500'
            },
            {
              title: 'Revenue',
              value: `$${realTimeData.revenue.toLocaleString()}`,
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

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Chart */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Sales Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} />
                      <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <RechartsPieChart className="w-5 h-5 text-purple-600" />
                    <span>Product Categories</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Products */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span>Top Performing Products</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">Sales: {product.sales.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          +{product.growth}%
                        </Badge>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Customer Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">New Customers</span>
                      <span className="font-bold">+{Math.floor(Math.random() * 50) + 20}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Returning Customers</span>
                      <span className="font-bold">+{Math.floor(Math.random() * 30) + 15}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Customer Satisfaction</span>
                      <span className="font-bold text-green-600">4.8/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Inventory Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Products</span>
                      <span className="font-bold">{realTimeData.inventory}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Low Stock Items</span>
                      <span className="font-bold text-yellow-600">{Math.floor(Math.random() * 10) + 5}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Out of Stock</span>
                      <span className="font-bold text-red-600">{Math.floor(Math.random() * 5) + 1}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Order Fulfillment</span>
                      <span className="font-bold text-green-600">98.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average Order Value</span>
                      <span className="font-bold">${Math.floor(Math.random() * 50) + 75}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Staff Efficiency</span>
                      <span className="font-bold text-blue-600">92.3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <span>Recent Transactions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.customer}</p>
                          <p className="text-sm text-gray-600">ID: {transaction.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-bold text-lg">${transaction.amount}</span>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                        <span className="text-sm text-gray-500">{transaction.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-orange-600" />
                  <span>System Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}