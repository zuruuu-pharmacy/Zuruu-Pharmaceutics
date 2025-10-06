"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign, TrendingUp, TrendingDown, BarChart3, PieChart, LineChart, Activity,
  Target, Zap, Shield, Star, Heart, Award, Search, Filter, Plus, Edit, Trash2,
  Eye, Download, Upload, Settings, Bell, RefreshCw, RotateCcw, Calendar, Clock,
  CheckCircle, XCircle, AlertTriangle, ArrowUp, ArrowDown, Minus, Percent, Tag,
  CreditCard, Banknote, Receipt, Calculator, FileText, Printer, Mail, Phone,
  MapPin, Users, Package, ShoppingCart, Database, Network, Cpu, Brain
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
import { LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Financial data simulation
const revenueData = [
  { month: 'Jan', revenue: 45000, profit: 12000, expenses: 33000 },
  { month: 'Feb', revenue: 52000, profit: 15000, expenses: 37000 },
  { month: 'Mar', revenue: 48000, profit: 13000, expenses: 35000 },
  { month: 'Apr', revenue: 61000, profit: 18000, expenses: 43000 },
  { month: 'May', revenue: 55000, profit: 16000, expenses: 39000 },
  { month: 'Jun', revenue: 67000, profit: 20000, expenses: 47000 },
  { month: 'Jul', revenue: 59000, profit: 17000, expenses: 42000 },
  { month: 'Aug', revenue: 63000, profit: 19000, expenses: 44000 },
  { month: 'Sep', revenue: 58000, profit: 16500, expenses: 41500 },
  { month: 'Oct', revenue: 65000, profit: 19500, expenses: 45500 },
  { month: 'Nov', revenue: 62000, profit: 18500, expenses: 43500 },
  { month: 'Dec', revenue: 71000, profit: 22000, expenses: 49000 }
];

const expenseCategories = [
  { name: 'Inventory', value: 45, color: '#8884d8', amount: 125000 },
  { name: 'Staff Salaries', value: 25, color: '#82ca9d', amount: 75000 },
  { name: 'Rent & Utilities', value: 15, color: '#ffc658', amount: 45000 },
  { name: 'Marketing', value: 10, color: '#ff7300', amount: 30000 },
  { name: 'Other', value: 5, color: '#00ff00', amount: 15000 }
];

const topProducts = [
  { name: 'Aspirin 100mg', revenue: 12500, profit: 3750, margin: 30 },
  { name: 'Vitamin D3', revenue: 9800, profit: 2940, margin: 30 },
  { name: 'Blood Pressure Monitor', revenue: 15000, profit: 4500, margin: 30 },
  { name: 'Multivitamin', revenue: 8500, profit: 2550, margin: 30 },
  { name: 'Pain Relief Gel', revenue: 6200, profit: 1860, margin: 30 }
];

const financialMetrics = {
  totalRevenue: 720000,
  totalProfit: 210000,
  totalExpenses: 510000,
  profitMargin: 29.2,
  revenueGrowth: 12.5,
  profitGrowth: 15.8,
  expenseGrowth: 8.3,
  cashFlow: 45000,
  accountsReceivable: 25000,
  accountsPayable: 18000,
  inventoryValue: 125000
};

const recentTransactions = [
  { id: 'TXN001', type: 'Revenue', description: 'Prescription Sales', amount: 2500, date: '2024-01-15', status: 'Completed' },
  { id: 'TXN002', type: 'Expense', description: 'Inventory Purchase', amount: -1200, date: '2024-01-14', status: 'Completed' },
  { id: 'TXN003', type: 'Revenue', description: 'OTC Sales', amount: 850, date: '2024-01-14', status: 'Completed' },
  { id: 'TXN004', type: 'Expense', description: 'Staff Salaries', amount: -5000, date: '2024-01-13', status: 'Completed' },
  { id: 'TXN005', type: 'Revenue', description: 'Insurance Claims', amount: 3200, date: '2024-01-13', status: 'Pending' }
];

export default function FinancialAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('12M');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [activeTab, setActiveTab] = useState('overview');
  const [showReport, setShowReport] = useState(false);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'Revenue': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'Expense': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'Revenue': return 'text-green-600';
      case 'Expense': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Financial Analytics Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive financial insights and forecasting</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1M">1 Month</SelectItem>
                <SelectItem value="3M">3 Months</SelectItem>
                <SelectItem value="6M">6 Months</SelectItem>
                <SelectItem value="12M">12 Months</SelectItem>
                <SelectItem value="YTD">Year to Date</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => setShowReport(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button
              variant="outline"
              className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Revenue',
              value: `$${financialMetrics.totalRevenue.toLocaleString()}`,
              change: `+${financialMetrics.revenueGrowth}%`,
              trend: 'up',
              icon: DollarSign,
              color: 'from-emerald-500 to-teal-500'
            },
            {
              title: 'Net Profit',
              value: `$${financialMetrics.totalProfit.toLocaleString()}`,
              change: `+${financialMetrics.profitGrowth}%`,
              trend: 'up',
              icon: TrendingUp,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Profit Margin',
              value: `${financialMetrics.profitMargin}%`,
              change: '+2.3%',
              trend: 'up',
              icon: Percent,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Cash Flow',
              value: `$${financialMetrics.cashFlow.toLocaleString()}`,
              change: '+8.7%',
              trend: 'up',
              icon: Activity,
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
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-emerald-600" />
                    <span>Revenue & Profit Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="profit" stroke="#059669" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Expense Categories */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <RechartsPieChart className="w-5 h-5 text-purple-600" />
                    <span>Expense Categories</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={expenseCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {expenseCategories.map((entry, index) => (
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
            <Card className="shadow-lg border-0">
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
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-emerald-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">Revenue: ${product.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${product.profit.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Profit</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-emerald-600">{product.margin}%</p>
                          <p className="text-sm text-gray-600">Margin</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Revenue Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Prescription Sales</span>
                      <span className="font-bold">$450,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">OTC Products</span>
                      <span className="font-bold">$180,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Medical Devices</span>
                      <span className="font-bold">$90,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Insurance Claims</span>
                      <span className="font-bold">$120,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Current Month</span>
                      <span className="font-bold text-emerald-600">$71,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Month</span>
                      <span className="font-bold">$65,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average Monthly</span>
                      <span className="font-bold">$60,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Growth Rate</span>
                      <span className="font-bold text-green-600">+12.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Revenue Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Next Month</span>
                      <span className="font-bold text-blue-600">$75,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Next Quarter</span>
                      <span className="font-bold text-blue-600">$225,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Next Year</span>
                      <span className="font-bold text-blue-600">$900,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Confidence</span>
                      <span className="font-bold text-green-600">85%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenseCategories.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900">{category.name}</span>
                          <span className="font-semibold">${category.amount.toLocaleString()}</span>
                        </div>
                        <Progress value={category.value} className="h-2" />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{category.value}% of total</span>
                          <span>${category.amount.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Expense Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Expenses</span>
                      <span className="font-bold">$510,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Monthly Average</span>
                      <span className="font-bold">$42,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Growth Rate</span>
                      <span className="font-bold text-red-600">+8.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Cost per Customer</span>
                      <span className="font-bold">$85</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-emerald-600" />
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
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-sm text-gray-600">ID: {transaction.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                            ${Math.abs(transaction.amount).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">{transaction.date}</p>
                        </div>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Financial Report Modal */}
        <Dialog open={showReport} onOpenChange={setShowReport}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <span>Financial Report</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Revenue Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Revenue:</span>
                      <span className="font-semibold">${financialMetrics.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Net Profit:</span>
                      <span className="font-semibold">${financialMetrics.totalProfit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Profit Margin:</span>
                      <span className="font-semibold">{financialMetrics.profitMargin}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Growth Rate:</span>
                      <span className="font-semibold text-green-600">+{financialMetrics.revenueGrowth}%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Expense Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Expenses:</span>
                      <span className="font-semibold">${financialMetrics.totalExpenses.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Inventory:</span>
                      <span className="font-semibold">${financialMetrics.inventoryValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Growth Rate:</span>
                      <span className="font-semibold text-red-600">+{financialMetrics.expenseGrowth}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cost Ratio:</span>
                      <span className="font-semibold">70.8%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.print()}
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Report
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Report
                </Button>
                <Button
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowReport(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}