"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';
import {
  Activity,
  Users,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  RefreshCw
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

interface RetailAnalyticsDashboardProps {
  onRefresh?: () => void;
}

export function RetailAnalyticsDashboard({ onRefresh }: RetailAnalyticsDashboardProps) {
  const [timeframe, setTimeframe] = useState<'1d' | '7d' | '30d' | '90d'>('7d');
  const [isLoading, setIsLoading] = useState(false);

  // Load data from localStorage (updated by admin panel)
  const [analyticsData, setAnalyticsData] = useState({
    sales: {
      '1d': { total: 15000, growth: 12.5, transactions: 320 },
      '7d': { total: 95000, growth: 8.3, transactions: 2100 },
      '30d': { total: 420000, growth: 15.2, transactions: 8900 },
      '90d': { total: 1250000, growth: 22.1, transactions: 26500 }
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
    }
  });

  // Load data from admin panel on component mount and when storage changes
  useEffect(() => {
    const loadAdminData = () => {
      const savedData = localStorage.getItem('retail-admin-data');
      if (savedData) {
        try {
          const adminData = JSON.parse(savedData);
          setAnalyticsData({
            sales: {
              '1d': { total: adminData.sales?.['1d'] || 15000, growth: 12.5, transactions: 320 },
              '7d': { total: adminData.sales?.['7d'] || 95000, growth: 8.3, transactions: 2100 },
              '30d': { total: adminData.sales?.['30d'] || 420000, growth: 15.2, transactions: 8900 },
              '90d': { total: adminData.sales?.['90d'] || 1250000, growth: 22.1, transactions: 26500 }
            },
            inventory: {
              totalProducts: adminData.inventory?.totalProducts || 2500,
              inStock: adminData.inventory?.inStock || 1800,
              lowStock: adminData.inventory?.lowStock || 45,
              outOfStock: adminData.inventory?.outOfStock || 12,
              totalValue: adminData.inventory?.totalValue || 1250000
            },
            customers: {
              total: adminData.customers?.total || 8500,
              new: adminData.customers?.new || 320,
              returning: adminData.customers?.returning || 7800,
              averageOrderValue: adminData.customers?.averageOrderValue || 85.50
            },
            performance: {
              conversionRate: adminData.performance?.conversionRate || 3.2,
              averageSessionDuration: adminData.performance?.averageSessionDuration || 4.5,
              bounceRate: adminData.performance?.bounceRate || 42.1,
              cartAbandonment: adminData.performance?.cartAbandonment || 68.5
            }
          });
        } catch (error) {
          console.error('Error loading retail admin data:', error);
        }
      }
    };

    loadAdminData();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'retail-admin-data') {
        loadAdminData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const generateTimeframeData = (timeframe: string) => {
    const days = timeframe === '1d' ? 1 : timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
    const labels = [];
    const salesData = [];
    const inventoryData = [];
    const customerData = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
      // Generate realistic data with some randomness
      const baseSales = timeframe === '1d' ? 15000 : timeframe === '7d' ? 13500 : timeframe === '30d' ? 14000 : 13800;
      const baseInventory = timeframe === '1d' ? 1800 : timeframe === '7d' ? 1820 : timeframe === '30d' ? 1850 : 1900;
      const baseCustomers = timeframe === '1d' ? 320 : timeframe === '7d' ? 45 : timeframe === '30d' ? 15 : 5;

      salesData.push(baseSales + Math.random() * 2000 - 1000);
      inventoryData.push(baseInventory + Math.random() * 100 - 50);
      customerData.push(baseCustomers + Math.random() * 20 - 10);
    }

    return { labels, salesData, inventoryData, customerData };
  };

  const generateSalesTrend = (timeframe: string) => {
    const days = timeframe === '1d' ? 1 : timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
    const labels = [];
    const actual = [];
    const forecast = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
      const baseValue = timeframe === '1d' ? 15000 : timeframe === '7d' ? 13500 : timeframe === '30d' ? 14000 : 13800;
      const actualValue = baseValue + Math.random() * 2000 - 1000;
      const forecastValue = actualValue * (1 + Math.random() * 0.1 - 0.05);
      
      actual.push(actualValue);
      forecast.push(forecastValue);
    }

    return { labels, actual, forecast };
  };

  const generateCategoryData = () => {
    return {
      labels: ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Health', 'Beauty', 'Toys'],
      datasets: [{
        data: [25, 20, 15, 12, 10, 8, 6, 4],
        backgroundColor: [
          '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
          '#06B6D4', '#F97316', '#84CC16'
        ],
        borderWidth: 0
      }]
    };
  };

  const generateTopProducts = () => {
    return [
      { name: 'Wireless Headphones', sales: 1250, revenue: 18750 },
      { name: 'Smart Watch', sales: 890, revenue: 26700 },
      { name: 'Laptop Stand', sales: 2100, revenue: 10500 },
      { name: 'Bluetooth Speaker', sales: 1560, revenue: 15600 },
      { name: 'Phone Case', sales: 3200, revenue: 9600 }
    ];
  };

  const { labels, salesData, inventoryData, customerData } = generateTimeframeData(timeframe);
  const { labels: trendLabels, actual, forecast } = generateSalesTrend(timeframe);
  const categoryData = generateCategoryData();
  const topProducts = generateTopProducts();

  const salesChartData = {
    labels,
    datasets: [
      {
        label: 'Sales ($)',
        data: salesData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const inventoryChartData = {
    labels,
    datasets: [
      {
        label: 'Inventory Count',
        data: inventoryData,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const customerChartData = {
    labels,
    datasets: [
      {
        label: 'New Customers',
        data: customerData,
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const trendChartData = {
    labels: trendLabels,
    datasets: [
      {
        label: 'Actual Sales',
        data: actual,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: false,
        tension: 0.4
      },
      {
        label: 'Forecast',
        data: forecast,
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        fill: false,
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (label.includes('Sales') || label.includes('revenue')) {
                label += '$' + context.parsed.y.toLocaleString();
              } else {
                label += context.parsed.y.toLocaleString();
              }
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onRefresh?.();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Retail Analytics Dashboard</h2>
          <p className="text-gray-600">Comprehensive insights into your retail operations</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {(['1d', '7d', '30d', '90d'] as const).map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTimeframe(period)}
              >
                {period === '1d' ? '1 Day' : period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : '90 Days'}
              </Button>
            ))}
          </div>
          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sales</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${analyticsData.sales[timeframe].total.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +{analyticsData.sales[timeframe].growth}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.inventory.totalProducts.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {analyticsData.inventory.inStock} in stock
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.customers.total.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {analyticsData.customers.new} new this period
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.performance.conversionRate}%
                  </p>
                  <p className="text-sm text-gray-500">
                    {analyticsData.sales[timeframe].transactions} transactions
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-600" />
                Sales Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line data={salesChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2 text-green-600" />
                Inventory Levels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Bar data={inventoryChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                Customer Acquisition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line data={customerChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                Sales Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line data={trendChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2 text-indigo-600" />
                Sales by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Doughnut 
                  data={categoryData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom' as const,
                      }
                    }
                  }} 
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Top Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} units sold</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${product.revenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
