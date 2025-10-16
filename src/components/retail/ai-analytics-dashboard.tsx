"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Pill,
  Calendar,
  Download,
  Filter,
  Eye,
  Target,
  Zap,
  BarChart3,
  PieChart,
  Activity,
  Thermometer,
  Heart,
  Scale,
  Droplets,
  ChevronRight,
  ChevronDown,
  Bell,
  MessageSquare,
  Settings,
  RefreshCw,
  Share2,
  FileText,
  Smartphone,
  Monitor
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ComposedChart,
  Area,
  AreaChart
} from 'recharts';

// Mock data for the dashboard
const mockAdherenceData = [
  { day: 'Mon', taken: 3, missed: 0, adherence: 100 },
  { day: 'Tue', taken: 3, missed: 0, adherence: 100 },
  { day: 'Wed', taken: 2, missed: 1, adherence: 67 },
  { day: 'Thu', taken: 3, missed: 0, adherence: 100 },
  { day: 'Fri', taken: 3, missed: 0, adherence: 100 },
  { day: 'Sat', taken: 2, missed: 1, adherence: 67 },
  { day: 'Sun', taken: 1, missed: 2, adherence: 33 }
];

const mockTrendData = [
  { week: 'Week 1', adherence: 85, bp: 150, glucose: 180 },
  { week: 'Week 2', adherence: 78, bp: 145, glucose: 175 },
  { week: 'Week 3', adherence: 92, bp: 140, glucose: 170 },
  { week: 'Week 4', adherence: 88, bp: 135, glucose: 165 },
  { week: 'Week 5', adherence: 95, bp: 130, glucose: 160 },
  { week: 'Week 6', adherence: 87, bp: 128, glucose: 155 }
];

const mockRefillData = [
  { name: 'App Auto-Refill', value: 65, color: '#009688' },
  { name: 'Manual Request', value: 25, color: '#00B8A9' },
  { name: 'In-Person', value: 10, color: '#4DB6AC' }
];

const mockScatterData = [
  { adherence: 85, bp: 150, glucose: 180, week: 'Week 1' },
  { adherence: 78, bp: 145, glucose: 175, week: 'Week 2' },
  { adherence: 92, bp: 140, glucose: 170, week: 'Week 3' },
  { adherence: 88, bp: 135, glucose: 165, week: 'Week 4' },
  { adherence: 95, bp: 130, glucose: 160, week: 'Week 5' },
  { adherence: 87, bp: 128, glucose: 155, week: 'Week 6' }
];

const mockHeatmapData = [
  { day: 'Mon', morning: 1, noon: 1, evening: 1, night: 0 },
  { day: 'Tue', morning: 1, noon: 1, evening: 1, night: 0 },
  { day: 'Wed', morning: 1, noon: 0, evening: 1, night: 0 },
  { day: 'Thu', morning: 1, noon: 1, evening: 1, night: 0 },
  { day: 'Fri', morning: 1, noon: 1, evening: 1, night: 0 },
  { day: 'Sat', morning: 0, noon: 1, evening: 1, night: 0 },
  { day: 'Sun', morning: 0, noon: 0, evening: 1, night: 0 }
];

const COLORS = {
  teal: '#009688',
  lightTeal: '#00B8A9',
  gray: '#F1F3F4',
  red: '#E53935',
  amber: '#FFB300',
  green: '#4CAF50'
};

interface AIInsight {
  id: string;
  type: 'warning' | 'success' | 'info';
  title: string;
  description: string;
  confidence: number;
  action?: string;
}

interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  confidence: number;
  reason: string;
  applied: boolean;
}

export default function AIAnalyticsDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['summary', 'charts']));
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Weekend Adherence Drop Detected',
      description: 'Adherence has dropped 15% during weekends. Possible cause: irregular routine.',
      confidence: 87
    },
    {
      id: '2',
      type: 'info',
      title: 'Refill Delay Prediction',
      description: 'System predicts refill delay in next 5 days — send reminder?',
      confidence: 92
    }
  ]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([
    {
      id: '1',
      title: 'Switch Evening Reminder Time',
      description: 'Change evening dose reminder to 8:30 PM — higher success likelihood.',
      confidence: 78,
      reason: 'Based on historical data showing better adherence at this time',
      applied: false
    },
    {
      id: '2',
      title: 'Enable Voice Reminders',
      description: 'Activate voice reminders for better elderly patient engagement.',
      confidence: 85,
      reason: 'Voice reminders show 23% higher adherence in similar demographics',
      applied: false
    }
  ]);

  const [kpis, setKpis] = useState({
    adherence: 87,
    missedDoses: 3,
    refillDelay: 1.2,
    riskScore: 'Moderate'
  });

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const applyRecommendation = (id: string) => {
    setRecommendations(prev => 
      prev.map(rec => 
        rec.id === id ? { ...rec, applied: true } : rec
      )
    );
  };

  const dismissRecommendation = (id: string) => {
    setRecommendations(prev => 
      prev.filter(rec => rec.id !== id)
    );
  };

  // Mobile detection and responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'info': return <Brain className="w-5 h-5 text-blue-600" />;
      default: return <Brain className="w-5 h-5 text-gray-600" />;
    }
  };

  const renderHeaderSummary = () => (
    <motion.div 
      className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-xl p-6 text-white mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Brain className="w-8 h-8" />
          <h1 className="text-2xl font-bold">AI Analytics Dashboard</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Pill className="w-6 h-6" />
            <TrendingUp className="w-4 h-4 text-green-300" />
          </div>
          <h3 className="text-2xl font-bold">{kpis.adherence}%</h3>
          <p className="text-sm text-white/80">Medication Adherence</p>
          <p className="text-xs text-green-300">+5% this week</p>
        </motion.div>

        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-6 h-6" />
            <TrendingDown className="w-4 h-4 text-red-300" />
          </div>
          <h3 className="text-2xl font-bold">{kpis.missedDoses}</h3>
          <p className="text-sm text-white/80">Missed Doses</p>
          <p className="text-xs text-red-300">Last 7 days</p>
        </motion.div>

        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-6 h-6" />
            <TrendingUp className="w-4 h-4 text-yellow-300" />
          </div>
          <h3 className="text-2xl font-bold">{kpis.refillDelay}</h3>
          <p className="text-sm text-white/80">Avg Refill Delay</p>
          <p className="text-xs text-yellow-300">Days</p>
        </motion.div>

        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Target className="w-6 h-6" />
            <Badge className={getRiskColor(kpis.riskScore)}>
              {kpis.riskScore}
            </Badge>
          </div>
          <h3 className="text-2xl font-bold">AI Risk</h3>
          <p className="text-sm text-white/80">Score</p>
          <p className="text-xs text-white/60">Real-time</p>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderInteractiveCharts = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-teal-600" />
              <span>Interactive Analytics</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <TabsList>
                  <TabsTrigger value="7d">7 Days</TabsTrigger>
                  <TabsTrigger value="30d">30 Days</TabsTrigger>
                  <TabsTrigger value="90d">90 Days</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Adherence Bar Chart */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Daily Medication Intake</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={mockAdherenceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="taken" fill={COLORS.teal} name="Taken" />
                  <Bar dataKey="missed" fill={COLORS.red} name="Missed" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Adherence Trend Line Chart */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Adherence Trend</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={mockTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="adherence" 
                    stroke={COLORS.teal} 
                    strokeWidth={3}
                    name="Adherence %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Refill Sources Pie Chart */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Refill Sources</h4>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <Pie
                    data={mockRefillData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {mockRefillData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>

            {/* Adherence vs Health Scatter Plot */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Adherence vs Health Metrics</h4>
              <ResponsiveContainer width="100%" height={250}>
                <ScatterChart data={mockScatterData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="adherence" name="Adherence %" />
                  <YAxis dataKey="bp" name="Blood Pressure" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter dataKey="bp" fill={COLORS.teal} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderAIPredictionPanel = () => (
    <motion.div
      id="ai-insights"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-teal-600" />
            <span>AI Behavioral Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight) => (
              <motion.div
                key={insight.id}
                className="border rounded-lg p-4 bg-gray-50"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start space-x-3">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{insight.description}</p>
                    {insight.action && (
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Bell className="w-4 h-4 mr-2" />
                          Send Alert
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Schedule Counseling
                        </Button>
                        <Button size="sm" variant="outline">
                          <Target className="w-4 h-4 mr-2" />
                          Generate Plan
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Risk Visualization */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Risk Assessment</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h5 className="font-semibold text-green-600">Low Risk</h5>
                <p className="text-sm text-gray-600">65%</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
                <h5 className="font-semibold text-yellow-600">Moderate Risk</h5>
                <p className="text-sm text-gray-600">30%</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h5 className="font-semibold text-red-600">High Risk</h5>
                <p className="text-sm text-gray-600">5%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderRefillIntelligence = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-6 h-6 text-teal-600" />
            <span>Refill Intelligence</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Timeline */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Refill Timeline</h4>
              <div className="space-y-3">
                {[
                  { date: '2024-01-15', status: 'completed', medication: 'Metformin', delay: 0 },
                  { date: '2024-01-22', status: 'late', medication: 'Insulin', delay: 2 },
                  { date: '2024-01-29', status: 'completed', medication: 'Metformin', delay: 0 },
                  { date: '2024-02-05', status: 'missed', medication: 'Insulin', delay: 5 }
                ].map((refill, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      refill.status === 'completed' ? 'bg-green-100' :
                      refill.status === 'late' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      {refill.status === 'completed' ? '💊' :
                       refill.status === 'late' ? '⚠️' : '❌'}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{refill.medication}</p>
                      <p className="text-sm text-gray-600">{refill.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        refill.delay === 0 ? 'text-green-600' :
                        refill.delay <= 2 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {refill.delay === 0 ? 'On time' : `${refill.delay} days late`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Insights */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Smart Refill Insights</h4>
              <div className="space-y-3">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">
                        Insulin Refill Pattern Alert
                      </p>
                      <p className="text-sm text-yellow-700">
                        User delayed insulin refill twice in last month — potential adherence risk.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">
                        Auto-Refill Recommendation
                      </p>
                      <p className="text-sm text-blue-700">
                        Auto-refill system recommended activation for consistent medications.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Zap className="w-4 h-4 mr-2" />
                Activate Auto-Refill
              </Button>
              <Button variant="outline">
                <Bell className="w-4 h-4 mr-2" />
                Notify Pharmacist
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderBehavioralHeatmap = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-6 h-6 text-teal-600" />
            <span>Behavioral Heatmap</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              7x24 adherence pattern showing medication intake by day and time
            </p>
            
            {/* Heatmap Grid */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">Day</th>
                    <th className="text-center p-2">Morning</th>
                    <th className="text-center p-2">Noon</th>
                    <th className="text-center p-2">Evening</th>
                    <th className="text-center p-2">Night</th>
                  </tr>
                </thead>
                <tbody>
                  {mockHeatmapData.map((day, index) => (
                    <tr key={index}>
                      <td className="p-2 font-medium">{day.day}</td>
                      <td className="p-2">
                        <div className={`w-8 h-8 rounded mx-auto flex items-center justify-center ${
                          day.morning === 1 ? 'bg-teal-600 text-white' : 'bg-gray-200'
                        }`}>
                          {day.morning === 1 ? '✓' : '✗'}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className={`w-8 h-8 rounded mx-auto flex items-center justify-center ${
                          day.noon === 1 ? 'bg-teal-600 text-white' : 'bg-gray-200'
                        }`}>
                          {day.noon === 1 ? '✓' : '✗'}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className={`w-8 h-8 rounded mx-auto flex items-center justify-center ${
                          day.evening === 1 ? 'bg-teal-600 text-white' : 'bg-gray-200'
                        }`}>
                          {day.evening === 1 ? '✓' : '✗'}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className={`w-8 h-8 rounded mx-auto flex items-center justify-center ${
                          day.night === 1 ? 'bg-teal-600 text-white' : 'bg-gray-200'
                        }`}>
                          {day.night === 1 ? '✓' : '✗'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-teal-600 rounded"></div>
                <span>Consistent dose</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <span>Missed dose</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderComparativeAnalytics = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-teal-600" />
            <span>Before vs After Treatment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Main Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                className="bg-red-50 border border-red-200 rounded-lg p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-red-800 mb-4">Before Treatment</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-red-700">Average Adherence</span>
                      <span className="text-2xl font-bold text-red-800">64%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-red-700">Blood Pressure</span>
                      <span className="text-2xl font-bold text-red-800">150/95</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-red-700">Glucose Level</span>
                      <span className="text-2xl font-bold text-red-800">180 mg/dL</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-red-700">Weight</span>
                      <span className="text-2xl font-bold text-red-800">185 lbs</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-green-50 border border-green-200 rounded-lg p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-green-800 mb-4">After Treatment</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Average Adherence</span>
                      <span className="text-2xl font-bold text-green-800">88%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Blood Pressure</span>
                      <span className="text-2xl font-bold text-green-800">128/84</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Glucose Level</span>
                      <span className="text-2xl font-bold text-green-800">155 mg/dL</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Weight</span>
                      <span className="text-2xl font-bold text-green-800">175 lbs</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Improvement Visualization */}
            <div className="relative">
              <div className="flex items-center justify-center mb-4">
                <div className="w-full h-1 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full"></div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Treatment Progress</p>
                <div className="flex justify-center space-x-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <TrendingDown className="w-6 h-6 text-red-600" />
                    </div>
                    <p className="text-xs text-red-600">Baseline</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Activity className="w-6 h-6 text-yellow-600" />
                    </div>
                    <p className="text-xs text-yellow-600">Progress</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-xs text-green-600">Current</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Metrics Chart */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Health Metrics Improvement</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[
                  { metric: 'Adherence', before: 64, after: 88, improvement: 24 },
                  { metric: 'BP Systolic', before: 150, after: 128, improvement: -22 },
                  { metric: 'BP Diastolic', before: 95, after: 84, improvement: -11 },
                  { metric: 'Glucose', before: 180, after: 155, improvement: -25 },
                  { metric: 'Weight', before: 185, after: 175, improvement: -10 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="before" fill="#ef4444" name="Before" />
                  <Bar dataKey="after" fill="#22c55e" name="After" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Key Insights */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-semibold text-blue-800 mb-2">Key Insights</h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 24% improvement in medication adherence</li>
                <li>• 22 mmHg reduction in systolic blood pressure</li>
                <li>• 25 mg/dL decrease in glucose levels</li>
                <li>• 10 lbs weight loss achieved</li>
                <li>• Overall health risk reduced by 35%</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderAIRecommendations = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-teal-600" />
            <span>AI Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <motion.div
                key={rec.id}
                className={`border rounded-lg p-4 ${
                  rec.applied ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                }`}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {rec.confidence}% confidence
                      </Badge>
                      {rec.applied && (
                        <Badge className="bg-green-100 text-green-800">
                          Applied
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{rec.description}</p>
                    <p className="text-sm text-gray-500">
                      <strong>Reason:</strong> {rec.reason}
                    </p>
                  </div>
                </div>
                
                {!rec.applied && (
                  <div className="flex space-x-2 mt-4">
                    <Button 
                      size="sm" 
                      onClick={() => applyRecommendation(rec.id)}
                      className="bg-teal-600 hover:bg-teal-700"
                    >
                      Apply
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => dismissRecommendation(rec.id)}
                    >
                      Dismiss
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderMobileFAB = () => (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5 }}
    >
      <Button
        size="lg"
        className="w-14 h-14 rounded-full bg-teal-600 hover:bg-teal-700 shadow-lg"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <Brain className="w-6 h-6" />
      </Button>
      
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            className="absolute bottom-16 right-0 space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Button
              size="sm"
              variant="outline"
              className="w-full bg-white shadow-md"
              onClick={() => {
                // Scroll to AI insights
                document.getElementById('ai-insights')?.scrollIntoView({ behavior: 'smooth' });
                setShowMobileMenu(false);
              }}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              AI Insights
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full bg-white shadow-md"
              onClick={() => {
                // Scroll to recommendations
                document.getElementById('ai-recommendations')?.scrollIntoView({ behavior: 'smooth' });
                setShowMobileMenu(false);
              }}
            >
              <Zap className="w-4 h-4 mr-2" />
              Recommendations
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full bg-white shadow-md"
              onClick={() => {
                // Export functionality
                setShowMobileMenu(false);
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="space-y-8 pb-20">
      {renderHeaderSummary()}
      
      <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
        {renderInteractiveCharts()}
        {renderAIPredictionPanel()}
      </div>

      <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
        {renderRefillIntelligence()}
        {renderBehavioralHeatmap()}
      </div>

      {renderComparativeAnalytics()}

      <div id="ai-recommendations">
        {renderAIRecommendations()}
      </div>

      {isMobile && renderMobileFAB()}
    </div>
  );
}
