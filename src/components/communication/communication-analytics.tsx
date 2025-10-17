"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MessageSquare, 
  Video, 
  Phone, 
  Clock, 
  Star, 
  Bot, 
  Zap, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Calendar, 
  Download, 
  Filter, 
  Search, 
  Eye, 
  Share, 
  Settings, 
  RefreshCw,
  Heart,
  Shield,
  Target,
  Award,
  PieChart,
  LineChart,
  BarChart,
  AreaChart
} from 'lucide-react';

interface CommunicationMetrics {
  totalConsultations: number;
  activeConsultations: number;
  averageDuration: number;
  satisfactionScore: number;
  aiAssistanceUsed: number;
  emergencyAlerts: number;
  responseTime: number;
  resolutionRate: number;
  patientRetention: number;
  peakHours: string[];
  mostCommonTopics: Array<{ topic: string; count: number; percentage: number }>;
  consultationTypes: Array<{ type: string; count: number; percentage: number }>;
  satisfactionTrends: Array<{ date: string; score: number }>;
  aiInsights: Array<{ insight: string; confidence: number; impact: string }>;
  performanceMetrics: {
    efficiency: number;
    accuracy: number;
    patientSatisfaction: number;
    aiUtilization: number;
  };
}

interface CommunicationAnalyticsProps {
  timeRange: 'today' | 'week' | 'month' | 'quarter' | 'year';
  onTimeRangeChange: (range: string) => void;
}

export default function CommunicationAnalytics({ 
  timeRange, 
  onTimeRangeChange 
}: CommunicationAnalyticsProps) {
  const [metrics, setMetrics] = useState<CommunicationMetrics>({
    totalConsultations: 156,
    activeConsultations: 8,
    averageDuration: 18.5,
    satisfactionScore: 4.7,
    aiAssistanceUsed: 89,
    emergencyAlerts: 3,
    responseTime: 2.3,
    resolutionRate: 94.2,
    patientRetention: 87.5,
    peakHours: ['9-10 AM', '2-3 PM', '4-5 PM'],
    mostCommonTopics: [
      { topic: 'Medication Side Effects', count: 45, percentage: 28.8 },
      { topic: 'Dosage Questions', count: 32, percentage: 20.5 },
      { topic: 'Refill Requests', count: 28, percentage: 17.9 },
      { topic: 'Drug Interactions', count: 24, percentage: 15.4 },
      { topic: 'Chronic Disease Management', count: 27, percentage: 17.3 }
    ],
    consultationTypes: [
      { type: 'Video', count: 78, percentage: 50.0 },
      { type: 'Voice', count: 45, percentage: 28.8 },
      { type: 'Chat', count: 33, percentage: 21.2 }
    ],
    satisfactionTrends: [
      { date: '2024-01-01', score: 4.5 },
      { date: '2024-01-02', score: 4.6 },
      { date: '2024-01-03', score: 4.7 },
      { date: '2024-01-04', score: 4.8 },
      { date: '2024-01-05', score: 4.7 },
      { date: '2024-01-06', score: 4.9 },
      { date: '2024-01-07', score: 4.8 }
    ],
    aiInsights: [
      { insight: 'AI suggestions improved response time by 35%', confidence: 94, impact: 'high' },
      { insight: 'Patient satisfaction increased 15% with AI assistance', confidence: 89, impact: 'high' },
      { insight: 'Most common consultation time is 2-3 PM', confidence: 92, impact: 'medium' },
      { insight: 'Video consultations have 20% higher satisfaction', confidence: 87, impact: 'medium' }
    ],
    performanceMetrics: {
      efficiency: 92.5,
      accuracy: 96.8,
      patientSatisfaction: 94.2,
      aiUtilization: 78.3
    }
  });

  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [showAIDetails, setShowAIDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderKeyMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { 
          title: 'Total Consultations', 
          value: metrics.totalConsultations, 
          change: '+12%', 
          color: 'blue', 
          icon: MessageSquare,
          trend: 'up'
        },
        { 
          title: 'Active Now', 
          value: metrics.activeConsultations, 
          change: '+3', 
          color: 'green', 
          icon: Activity,
          trend: 'up'
        },
        { 
          title: 'Avg Duration', 
          value: `${metrics.averageDuration} min`, 
          change: '-2 min', 
          color: 'purple', 
          icon: Clock,
          trend: 'down'
        },
        { 
          title: 'Satisfaction Score', 
          value: `${metrics.satisfactionScore}/5`, 
          change: '+0.2', 
          color: 'yellow', 
          icon: Star,
          trend: 'up'
        }
      ].map((metric, index) => (
        <motion.div
          key={metric.title}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{metric.title}</p>
              <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
              <div className="flex items-center space-x-1 mt-2">
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-xs ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
            <metric.icon className={`w-8 h-8 text-${metric.color}-500`} />
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderPerformanceMetrics = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(metrics.performanceMetrics).map(([key, value], index) => (
          <motion.div
            key={key}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - value / 100)}`}
                  className="text-teal-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{value}%</span>
              </div>
            </div>
            <h4 className="text-sm font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </h4>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderConsultationTypes = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Consultation Types Distribution</h3>
      <div className="space-y-4">
        {metrics.consultationTypes.map((type, index) => (
          <motion.div
            key={type.type}
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${
                type.type === 'Video' ? 'bg-blue-500' :
                type.type === 'Voice' ? 'bg-green-500' : 'bg-purple-500'
              }`}></div>
              <span className="font-medium text-gray-900">{type.type}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    type.type === 'Video' ? 'bg-blue-500' :
                    type.type === 'Voice' ? 'bg-green-500' : 'bg-purple-500'
                  }`}
                  style={{ width: `${type.percentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-600 w-12 text-right">
                {type.percentage}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderCommonTopics = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Most Common Consultation Topics</h3>
      <div className="space-y-4">
        {metrics.mostCommonTopics.map((topic, index) => (
          <motion.div
            key={topic.topic}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-teal-600">{index + 1}</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{topic.topic}</h4>
                <p className="text-sm text-gray-600">{topic.count} consultations</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-teal-600">{topic.percentage}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSatisfactionTrends = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Satisfaction Trends</h3>
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Satisfaction Trends Chart</p>
        </div>
      </div>
    </div>
  );

  const renderAIInsights = () => (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Bot className="w-6 h-6 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">AI Insights & Recommendations</h3>
        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">94% Confidence</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.aiInsights.map((insight, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 rounded-lg border border-purple-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-gray-800 flex-1">{insight.insight}</p>
              <div className="flex items-center space-x-2 ml-4">
                <span className={`px-2 py-1 text-xs rounded-full ${getImpactColor(insight.impact)}`}>
                  {insight.impact} impact
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                {insight.confidence}% confidence
              </span>
              <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderPeakHours = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Peak Consultation Hours</h3>
      <div className="grid grid-cols-3 gap-4">
        {metrics.peakHours.map((hour, index) => (
          <motion.div
            key={hour}
            className="text-center p-4 bg-teal-50 rounded-lg border border-teal-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Clock className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900">{hour}</h4>
            <p className="text-sm text-gray-600">Peak Activity</p>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Communication Analytics</h2>
          <p className="text-gray-600">Comprehensive insights into patient communication patterns</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => onTimeRangeChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      {renderKeyMetrics()}

      {/* Performance Metrics */}
      {renderPerformanceMetrics()}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderConsultationTypes()}
        {renderSatisfactionTrends()}
      </div>

      {/* Topics and Peak Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderCommonTopics()}
        {renderPeakHours()}
      </div>

      {/* AI Insights */}
      {renderAIInsights()}

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">{metrics.responseTime}s</div>
            <p className="text-sm text-gray-600">Average response time</p>
            <div className="mt-4 flex items-center justify-center space-x-1">
              <TrendingDown className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">-15% from last week</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resolution Rate</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{metrics.resolutionRate}%</div>
            <p className="text-sm text-gray-600">First-call resolution</p>
            <div className="mt-4 flex items-center justify-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">+3% from last week</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Retention</h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{metrics.patientRetention}%</div>
            <p className="text-sm text-gray-600">Returning patients</p>
            <div className="mt-4 flex items-center justify-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">+5% from last month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
