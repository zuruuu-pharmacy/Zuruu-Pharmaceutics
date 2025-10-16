"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Pill,
  X,
  Clock,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Download,
  RefreshCw,
  Filter,
  Bell,
  MessageSquare,
  Target,
  Award,
  Trophy,
  Star,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Eye,
  Settings,
  Share2,
  Zap,
  Brain,
  Heart,
  Shield,
  ArrowUp,
  ArrowDown,
  Minus,
  Plus,
  ChevronRight,
  ChevronDown,
  Info,
  HelpCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  LineChart as RechartsLineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// Types and interfaces
interface AdherenceData {
  date: string;
  dosesTaken: number;
  dosesMissed: number;
  adherenceRate: number;
  medication: string;
}

interface RefillData {
  date: string;
  medication: string;
  status: 'on-time' | 'delayed' | 'missed';
  delayDays: number;
}

interface AdherenceMetrics {
  overallAdherence: number;
  missedDoses: number;
  refillDelay: number;
  upcomingRefills: number;
}

interface AIInsight {
  id: string;
  type: 'improvement' | 'warning' | 'advice';
  title: string;
  description: string;
  icon: React.ReactNode;
  confidence: number;
}

interface TrendComparison {
  medication1: string;
  medication2: string;
  data1: AdherenceData[];
  data2: AdherenceData[];
}

// Mock data
const mockAdherenceData: AdherenceData[] = [
  { date: '2024-01-01', dosesTaken: 3, dosesMissed: 1, adherenceRate: 75, medication: 'Metformin' },
  { date: '2024-01-02', dosesTaken: 4, dosesMissed: 0, adherenceRate: 100, medication: 'Metformin' },
  { date: '2024-01-03', dosesTaken: 3, dosesMissed: 1, adherenceRate: 75, medication: 'Metformin' },
  { date: '2024-01-04', dosesTaken: 4, dosesMissed: 0, adherenceRate: 100, medication: 'Metformin' },
  { date: '2024-01-05', dosesTaken: 2, dosesMissed: 2, adherenceRate: 50, medication: 'Metformin' },
  { date: '2024-01-06', dosesTaken: 3, dosesMissed: 1, adherenceRate: 75, medication: 'Metformin' },
  { date: '2024-01-07', dosesTaken: 4, dosesMissed: 0, adherenceRate: 100, medication: 'Metformin' },
  { date: '2024-01-08', dosesTaken: 3, dosesMissed: 1, adherenceRate: 75, medication: 'Metformin' },
  { date: '2024-01-09', dosesTaken: 4, dosesMissed: 0, adherenceRate: 100, medication: 'Metformin' },
  { date: '2024-01-10', dosesTaken: 3, dosesMissed: 1, adherenceRate: 75, medication: 'Metformin' },
  { date: '2024-01-11', dosesTaken: 4, dosesMissed: 0, adherenceRate: 100, medication: 'Metformin' },
  { date: '2024-01-12', dosesTaken: 2, dosesMissed: 2, adherenceRate: 50, medication: 'Metformin' },
  { date: '2024-01-13', dosesTaken: 3, dosesMissed: 1, adherenceRate: 75, medication: 'Metformin' },
  { date: '2024-01-14', dosesTaken: 4, dosesMissed: 0, adherenceRate: 100, medication: 'Metformin' },
  { date: '2024-01-15', dosesTaken: 3, dosesMissed: 1, adherenceRate: 75, medication: 'Metformin' }
];

const mockRefillData: RefillData[] = [
  { date: '2024-01-01', medication: 'Metformin', status: 'on-time', delayDays: 0 },
  { date: '2024-01-15', medication: 'Atorvastatin', status: 'delayed', delayDays: 2 },
  { date: '2024-01-30', medication: 'Lisinopril', status: 'on-time', delayDays: 0 },
  { date: '2024-02-14', medication: 'Metformin', status: 'delayed', delayDays: 1 },
  { date: '2024-02-28', medication: 'Atorvastatin', status: 'missed', delayDays: 5 }
];

const mockMetrics: AdherenceMetrics = {
  overallAdherence: 88,
  missedDoses: 5,
  refillDelay: 1.8,
  upcomingRefills: 2
};

const mockAIInsights: AIInsight[] = [
  {
    id: '1',
    type: 'improvement',
    title: 'Refill Punctuality Improved',
    description: 'Your refill punctuality has improved by 12% compared to last month.',
    icon: <TrendingUp className="w-5 h-5 text-green-600" />,
    confidence: 87
  },
  {
    id: '2',
    type: 'warning',
    title: 'Weekend Adherence Drop',
    description: 'Metformin doses were missed most often on weekends — consider setting extra reminders.',
    icon: <AlertTriangle className="w-5 h-5 text-orange-600" />,
    confidence: 92
  },
  {
    id: '3',
    type: 'advice',
    title: 'Cholesterol Medication Alert',
    description: 'Your cholesterol medication adherence dropped below 80%. Consult your pharmacist.',
    icon: <Lightbulb className="w-5 h-5 text-blue-600" />,
    confidence: 78
  }
];

const mockBadges = [
  { id: '1', name: 'Consistent Week', icon: '🟩', earned: true },
  { id: '2', name: 'Perfect Month', icon: '🏆', earned: false },
  { id: '3', name: 'Refill Hero', icon: '💊', earned: true }
];

export default function MedicationAdherenceAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [showTrendComparison, setShowTrendComparison] = useState(false);
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return '#4CAF50';
      case 'delayed': return '#FB8C00';
      case 'missed': return '#F44336';
      default: return '#E0E0E0';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'improvement': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'advice': return <Lightbulb className="w-5 h-5 text-blue-600" />;
      default: return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const renderHeader = () => (
    <motion.div 
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Medication Adherence & Refill Analytics</h1>
        <p className="text-gray-600">Track your medication consistency and refill patterns</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 days</SelectItem>
            <SelectItem value="30d">30 days</SelectItem>
            <SelectItem value="3m">3 months</SelectItem>
            <SelectItem value="6m">6 months</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
        
        <Button variant="outline" size="sm" onClick={() => setIsLoading(true)}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
    </motion.div>
  );

  const renderSummaryCards = () => (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Adherence Rate Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-green-400 to-green-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Overall Adherence</p>
                <p className="text-3xl font-bold">{mockMetrics.overallAdherence}%</p>
                <p className="text-green-100 text-xs mt-1">Last 30 days</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Pill className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Missed Doses Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Missed Doses</p>
                <p className="text-3xl font-bold text-red-700">{mockMetrics.missedDoses}</p>
                <p className="text-red-500 text-xs mt-1">Last month</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <X className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Refill Timeliness Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Avg Refill Delay</p>
                <p className="text-3xl font-bold text-orange-700">{mockMetrics.refillDelay} days</p>
                <p className="text-orange-500 text-xs mt-1">Late on average</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upcoming Refills Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Refill Due Soon</p>
                <p className="text-3xl font-bold text-blue-700">{mockMetrics.upcomingRefills}</p>
                <p className="text-blue-500 text-xs mt-1">Medications</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );

  const renderChartsSection = () => (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      {/* Adherence Timeline Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Adherence Timeline</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch
                checked={viewMode === 'weekly'}
                onCheckedChange={(checked) => setViewMode(checked ? 'weekly' : 'daily')}
              />
              <span className="text-sm text-gray-600">
                {viewMode === 'weekly' ? 'Weekly' : 'Daily'} View
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={mockAdherenceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="adherenceRate" 
                  stroke="#009688" 
                  strokeWidth={3}
                  dot={{ fill: '#009688', strokeWidth: 2, r: 4 }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Daily medication adherence over the last 30 days
          </p>
        </CardContent>
      </Card>

      {/* Refill Behavior Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Refill Compliance Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 font-semibold text-gray-600">{day}</div>
              ))}
              {Array.from({ length: 31 }, (_, i) => {
                const date = i + 1;
                const refillData = mockRefillData.find(refill => 
                  new Date(refill.date).getDate() === date
                );
                return (
                  <motion.div
                    key={date}
                    className={`p-2 rounded cursor-pointer hover:scale-105 transition-transform ${
                      refillData 
                        ? `text-white font-semibold` 
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: refillData ? getStatusColor(refillData.status) : 'transparent'
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {date}
                  </motion.div>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>On-time</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span>Delayed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Missed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderAIInsights = () => (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <Card className="border-l-4 border-l-teal-600">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-teal-600" />
            <span>Smart Insights & Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAIInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              >
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                  <p className="text-gray-600 text-sm">{insight.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Bell className="w-4 h-4 mr-2" />
              Set Extra Reminders
            </Button>
            <Button variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Notify Pharmacist
            </Button>
            <Button variant="outline" className="text-green-600 hover:text-green-700">
              <Pill className="w-4 h-4 mr-2" />
              Refill Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderTrendComparison = () => (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Trend Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select medication 1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metformin">Metformin</SelectItem>
                  <SelectItem value="atorvastatin">Atorvastatin</SelectItem>
                  <SelectItem value="lisinopril">Lisinopril</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select medication 2" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metformin">Metformin</SelectItem>
                  <SelectItem value="atorvastatin">Atorvastatin</SelectItem>
                  <SelectItem value="lisinopril">Lisinopril</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={mockAdherenceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="adherenceRate" 
                    stroke="#009688" 
                    strokeWidth={3}
                    name="Medication 1"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="adherenceRate" 
                    stroke="#FB8C00" 
                    strokeWidth={3}
                    name="Medication 2"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderMotivationalTracker = () => (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span>Motivational Tracker</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-8">
            {mockBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              >
                <div className={`text-4xl mb-2 ${badge.earned ? '' : 'grayscale opacity-50'}`}>
                  {badge.icon}
                </div>
                <p className="text-sm font-medium text-gray-900">{badge.name}</p>
                <Badge 
                  className={badge.earned ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}
                >
                  {badge.earned ? 'Earned' : 'Locked'}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderSmartPrediction = () => (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5 }}
    >
      <Card className="w-80 shadow-lg border-teal-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Zap className="w-4 h-4 text-teal-600" />
            <span>Smart Prediction</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-sm text-orange-800">
              <strong>Metformin refill prediction:</strong> Based on current behavior, 
              refill will be delayed by 3 days next cycle.
            </p>
          </div>
          <Button size="sm" className="w-full mt-3 bg-teal-600 hover:bg-teal-700">
            <Bell className="w-3 h-3 mr-2" />
            Set Reminder
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (isMobile) {
    return (
      <div className="space-y-6 pb-20">
        {renderHeader()}
        {renderSummaryCards()}
        {renderChartsSection()}
        {renderAIInsights()}
        {renderMotivationalTracker()}
        {renderSmartPrediction()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderHeader()}
      {renderSummaryCards()}
      {renderChartsSection()}
      {renderAIInsights()}
      {renderTrendComparison()}
      {renderMotivationalTracker()}
      {renderSmartPrediction()}
    </div>
  );
}
