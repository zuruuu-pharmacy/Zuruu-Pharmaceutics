"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Activity,
  DollarSign,
  Users,
  Package,
  FileText,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Brain,
  Zap,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Eye,
  Settings,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  Minus,
  Plus,
  Search,
  Info,
  Lightbulb,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  BarChart,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface AnalyticsMetric {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
  trend: number[];
}

interface SalesData {
  month: string;
  revenue: number;
  prescriptions: number;
  patients: number;
  margin: number;
}

interface TopDrug {
  name: string;
  category: string;
  sales: number;
  prescriptions: number;
  growth: number;
  margin: number;
}

interface ForecastData {
  period: string;
  predicted: number;
  actual?: number;
  confidence: number;
  factors: string[];
}

interface AIInsight {
  id: string;
  type: 'opportunity' | 'warning' | 'trend' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  actionable: boolean;
  category: string;
}

const mockSalesData: SalesData[] = [
  { month: 'Jan', revenue: 45000, prescriptions: 1200, patients: 800, margin: 0.25 },
  { month: 'Feb', revenue: 48000, prescriptions: 1300, patients: 850, margin: 0.26 },
  { month: 'Mar', revenue: 52000, prescriptions: 1400, patients: 900, margin: 0.27 },
  { month: 'Apr', revenue: 49000, prescriptions: 1350, patients: 875, margin: 0.25 },
  { month: 'May', revenue: 55000, prescriptions: 1500, patients: 950, margin: 0.28 },
  { month: 'Jun', revenue: 58000, prescriptions: 1600, patients: 1000, margin: 0.29 }
];

const mockTopDrugs: TopDrug[] = [
  { name: 'Metformin 500mg', category: 'Antidiabetic', sales: 12500, prescriptions: 450, growth: 12.5, margin: 0.28 },
  { name: 'Lisinopril 10mg', category: 'Antihypertensive', sales: 9800, prescriptions: 380, growth: 8.2, margin: 0.25 },
  { name: 'Atorvastatin 20mg', category: 'Cardiovascular', sales: 11200, prescriptions: 420, growth: 15.3, margin: 0.30 },
  { name: 'Amoxicillin 500mg', category: 'Antibiotic', sales: 8500, prescriptions: 320, growth: -2.1, margin: 0.22 },
  { name: 'Omeprazole 20mg', category: 'GI', sales: 9200, prescriptions: 350, growth: 6.8, margin: 0.26 }
];

const mockForecastData: ForecastData[] = [
  { period: 'Jul 2024', predicted: 62000, confidence: 85, factors: ['Seasonal demand', 'New patients'] },
  { period: 'Aug 2024', predicted: 65000, confidence: 82, factors: ['Back to school', 'Flu season prep'] },
  { period: 'Sep 2024', predicted: 68000, confidence: 78, factors: ['Flu season', 'Vaccination drive'] },
  { period: 'Oct 2024', predicted: 70000, confidence: 75, factors: ['Peak flu season', 'Holiday prep'] }
];

const mockAIInsights: AIInsight[] = [
  {
    id: '1',
    type: 'opportunity',
    title: 'High-margin drug opportunity',
    description: 'Atorvastatin shows 30% margin with 15% growth. Consider increasing stock levels.',
    impact: 'high',
    confidence: 92,
    actionable: true,
    category: 'Revenue Optimization'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Antibiotic sales declining',
    description: 'Amoxicillin sales down 2.1% this month. Check for generic competition.',
    impact: 'medium',
    confidence: 88,
    actionable: true,
    category: 'Sales Alert'
  },
  {
    id: '3',
    type: 'trend',
    title: 'Diabetes medication trend',
    description: 'Metformin prescriptions up 12.5%. Diabetes management focus area growing.',
    impact: 'high',
    confidence: 95,
    actionable: false,
    category: 'Market Trend'
  },
  {
    id: '4',
    type: 'recommendation',
    title: 'Inventory optimization',
    description: 'Consider reducing Amoxicillin stock by 15% and increasing Metformin by 20%.',
    impact: 'medium',
    confidence: 85,
    actionable: true,
    category: 'Inventory Management'
  }
];

const AnalyticsDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [expandedInsights, setExpandedInsights] = useState<string[]>([]);
  const [showForecast, setShowForecast] = useState(false);

  const metrics: AnalyticsMetric[] = [
    {
      title: 'Total Revenue',
      value: '$58,000',
      change: '+12.5% from last month',
      changeType: 'positive',
      icon: DollarSign,
      color: 'var(--c-accent-500)',
      trend: [45000, 48000, 52000, 49000, 55000, 58000]
    },
    {
      title: 'Prescriptions Dispensed',
      value: '1,600',
      change: '+6.7% from last month',
      changeType: 'positive',
      icon: FileText,
      color: 'var(--c-primary-500)',
      trend: [1200, 1300, 1400, 1350, 1500, 1600]
    },
    {
      title: 'Active Patients',
      value: '1,000',
      change: '+5.3% from last month',
      changeType: 'positive',
      icon: Users,
      color: 'var(--c-info-500)',
      trend: [800, 850, 900, 875, 950, 1000]
    },
    {
      title: 'Average Margin',
      value: '29%',
      change: '+1.2% from last month',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'var(--c-warning-500)',
      trend: [25, 26, 27, 25, 28, 29]
    }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Lightbulb className="w-5 h-5" />;
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'trend': return <TrendingUp className="w-5 h-5" />;
      case 'recommendation': return <Target className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'text-[var(--c-accent-600)] bg-[var(--c-accent-100)]';
      case 'warning': return 'text-[var(--c-warning-600)] bg-[var(--c-warning-100)]';
      case 'trend': return 'text-[var(--c-info-600)] bg-[var(--c-info-100)]';
      case 'recommendation': return 'text-[var(--c-primary-600)] bg-[var(--c-primary-100)]';
      default: return 'text-[var(--c-neutral-600)] bg-[var(--c-neutral-100)]';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const toggleInsight = (id: string) => {
    setExpandedInsights(prev => 
      prev.includes(id) 
        ? prev.filter(insightId => insightId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1">Analytics & Reports</h1>
          <p className="text-body mt-2">Comprehensive analytics, forecasting, and AI-powered insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--c-primary-500)] focus:border-transparent"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--c-neutral-600)] uppercase tracking-wide">
                      {metric.title}
                    </p>
                    <p className="text-3xl font-bold text-[var(--c-neutral-900)] mt-2">
                      {metric.value}
                    </p>
                    <div className={`flex items-center space-x-1 mt-2 ${
                      metric.changeType === 'positive' ? 'text-[var(--c-accent-600)]' : 
                      metric.changeType === 'negative' ? 'text-[var(--c-error-600)]' : 
                      'text-[var(--c-neutral-600)]'
                    }`}>
                      {metric.changeType === 'positive' && <ArrowUp className="w-3 h-3" />}
                      {metric.changeType === 'negative' && <ArrowDown className="w-3 h-3" />}
                      {metric.changeType === 'neutral' && <Minus className="w-3 h-3" />}
                      <span className="text-sm font-medium">{metric.change}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${metric.color}20` }}>
                    <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
                  </div>
                </div>
                {/* Mini Sparkline */}
                <div className="mt-4 h-8 flex items-end space-x-1">
                  {metric.trend.map((value, trendIndex) => (
                    <div
                      key={trendIndex}
                      className="flex-1 rounded-sm"
                      style={{ 
                        height: `${(value / Math.max(...metric.trend)) * 100}%`,
                        backgroundColor: metric.color
                      }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-[var(--c-primary-600)]" />
              <span>AI-Powered Insights</span>
              <Badge variant="info">94% Confidence</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAIInsights.map((insight) => (
                <motion.div
                  key={insight.id}
                  className="border border-[var(--c-neutral-200)] rounded-lg p-4 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getInsightColor(insight.type)}`}>
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-[var(--c-neutral-900)]">{insight.title}</h4>
                        <Badge variant={getImpactColor(insight.impact) as any} size="sm">
                          {insight.impact} impact
                        </Badge>
                        <Badge variant="outline" size="sm">
                          {insight.confidence}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm text-[var(--c-neutral-700)] mb-3">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-xs text-[var(--c-neutral-600)]">
                            Category: {insight.category}
                          </span>
                          {insight.actionable && (
                            <Badge variant="success" size="sm">Actionable</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {insight.actionable && (
                            <Button size="sm" variant="outline">
                              <Target className="w-4 h-4 mr-1" />
                              Take Action
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleInsight(insight.id)}
                          >
                            {expandedInsights.includes(insight.id) ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      {expandedInsights.includes(insight.id) && (
                        <motion.div
                          className="mt-4 p-3 bg-[var(--c-neutral-50)] rounded-lg"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <h5 className="font-medium mb-2">Detailed Analysis</h5>
                          <p className="text-sm text-[var(--c-neutral-700)]">
                            This insight is based on historical data analysis, market trends, and predictive modeling. 
                            The confidence score reflects the reliability of the underlying data and model accuracy.
                          </p>
                          {insight.actionable && (
                            <div className="mt-3">
                              <Button size="sm">
                                <Zap className="w-4 h-4 mr-1" />
                                Implement Recommendation
                              </Button>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LineChart className="w-5 h-5" />
                <span>Revenue Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-[var(--c-neutral-50)] rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <LineChartIcon className="w-12 h-12 text-[var(--c-neutral-400)] mx-auto mb-2" />
                  <p className="text-sm text-[var(--c-neutral-500)]">Revenue Trend Chart</p>
                  <p className="text-xs text-[var(--c-neutral-400)]">Monthly revenue over time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Selling Drugs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Top Selling Drugs</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTopDrugs.slice(0, 5).map((drug, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-[var(--c-neutral-200)] rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[var(--c-primary-100)] rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-[var(--c-primary-600)]">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{drug.name}</p>
                        <p className="text-xs text-[var(--c-neutral-600)]">{drug.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">${drug.sales.toLocaleString()}</p>
                      <div className="flex items-center space-x-1">
                        {drug.growth > 0 ? (
                          <ArrowUp className="w-3 h-3 text-[var(--c-accent-600)]" />
                        ) : (
                          <ArrowDown className="w-3 h-3 text-[var(--c-error-600)]" />
                        )}
                        <span className={`text-xs ${drug.growth > 0 ? 'text-[var(--c-accent-600)]' : 'text-[var(--c-error-600)]'}`}>
                          {Math.abs(drug.growth)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Forecasting Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>AI Forecasting & Predictions</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowForecast(!showForecast)}>
                {showForecast ? 'Hide' : 'Show'} Forecast
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showForecast ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mockForecastData.map((forecast, index) => (
                    <div key={index} className="p-4 border border-[var(--c-neutral-200)] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{forecast.period}</h4>
                        <Badge variant="info" size="sm">{forecast.confidence}%</Badge>
                      </div>
                      <p className="text-2xl font-bold text-[var(--c-primary-600)]">
                        ${forecast.predicted.toLocaleString()}
                      </p>
                      <div className="mt-2">
                        <p className="text-xs text-[var(--c-neutral-600)] mb-1">Key Factors:</p>
                        <div className="flex flex-wrap gap-1">
                          {forecast.factors.map((factor, factorIndex) => (
                            <Badge key={factorIndex} variant="outline" size="sm">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-[var(--c-primary-50)] rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="w-5 h-5 text-[var(--c-primary-600)]" />
                    <h4 className="font-medium text-[var(--c-primary-900)]">AI Model Summary</h4>
                  </div>
                  <p className="text-sm text-[var(--c-primary-800)]">
                    Predictions based on historical sales data, seasonal patterns, market trends, and external factors. 
                    Model accuracy: 87% over the last 6 months.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Brain className="w-16 h-16 text-[var(--c-neutral-400)] mx-auto mb-4" />
                <h3 className="text-h3 mb-2">AI Forecasting Available</h3>
                <p className="text-[var(--c-neutral-600)] mb-4">
                  Get AI-powered predictions for revenue, inventory, and market trends
                </p>
                <Button onClick={() => setShowForecast(true)}>
                  <Brain className="w-4 h-4 mr-2" />
                  View Forecasts
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Detailed Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Sales Performance', description: 'Monthly sales analysis and trends', icon: TrendingUp },
                { title: 'Inventory Analysis', description: 'Stock levels and turnover rates', icon: Package },
                { title: 'Patient Demographics', description: 'Patient age, gender, and condition analysis', icon: Users },
                { title: 'Prescription Patterns', description: 'Medication usage and prescribing trends', icon: FileText },
                { title: 'Financial Summary', description: 'Revenue, costs, and profitability analysis', icon: DollarSign },
                { title: 'Market Insights', description: 'Competitive analysis and market positioning', icon: BarChart3 }
              ].map((report, index) => (
                <motion.div
                  key={index}
                  className="p-4 border border-[var(--c-neutral-200)] rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-[var(--c-primary-100)] rounded-lg flex items-center justify-center">
                      <report.icon className="w-5 h-5 text-[var(--c-primary-600)]" />
                    </div>
                    <h4 className="font-medium">{report.title}</h4>
                  </div>
                  <p className="text-sm text-[var(--c-neutral-600)] mb-3">{report.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    View Report
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;
