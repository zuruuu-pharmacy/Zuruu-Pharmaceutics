"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard,
  Receipt,
  Shield,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Download,
  FileText,
  Send,
  Plus,
  Minus,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  RefreshCw,
  Settings,
  HelpCircle,
  Info,
  AlertTriangle,
  Check,
  X,
  MoreHorizontal,
  ExternalLink,
  Copy,
  Share2,
  Bell,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  Wind as WindIcon,
  Camera,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Signal,
  SignalHigh,
  SignalLow,
  SignalZero,
  PieChart,
  BarChart3,
  LineChart,
  Activity,
  Target,
  Award,
  Trophy,
  Star,
  Zap,
  Brain,
  Heart,
  Stethoscope,
  Pill,
  Apple,
  Dumbbell,
  BookOpen,
  MessageSquare,
  Video,
  MapPin,
  User,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  Clock as ClockIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { 
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Types and interfaces
interface FinancialSummary {
  totalDue: number;
  paidAmount: number;
  pendingClaims: number;
  insuranceCoverage: string;
  coveragePercentage: number;
  nextPaymentDue: string;
}

interface BillingRecord {
  id: string;
  date: string;
  serviceDescription: string;
  providerName: string;
  amount: number;
  paymentStatus: 'paid' | 'due' | 'rejected' | 'in-process';
  claimStatus: 'approved' | 'pending' | 'denied';
  category: 'consultation' | 'pharmacy' | 'lab' | 'hospital' | 'other';
  breakdown?: {
    doctorFees: number;
    medicineCosts: number;
    labCharges: number;
    otherCharges: number;
  };
}

interface InsurancePolicy {
  provider: string;
  planType: string;
  coverageRemaining: number;
  totalCoverage: number;
  renewalDate: string;
  claimHistory: ClaimRecord[];
}

interface ClaimRecord {
  id: string;
  date: string;
  amount: number;
  status: 'submitted' | 'under-review' | 'approved' | 'paid' | 'denied';
  description: string;
  timestamp: string;
}

interface AIRecommendation {
  id: string;
  type: 'spending' | 'insurance' | 'payment';
  title: string;
  description: string;
  action: string;
  priority: 'low' | 'medium' | 'high';
}

// Mock data
const mockFinancialSummary: FinancialSummary = {
  totalDue: 25600,
  paidAmount: 145200,
  pendingClaims: 2,
  insuranceCoverage: 'Active (70%)',
  coveragePercentage: 70,
  nextPaymentDue: 'Oct 22, 2025'
};

const mockBillingRecords: BillingRecord[] = [
  {
    id: '1',
    date: '2024-01-15',
    serviceDescription: 'Cardiology Consultation',
    providerName: 'Zuruu Medical Center',
    amount: 2500,
    paymentStatus: 'paid',
    claimStatus: 'approved',
    category: 'consultation',
    breakdown: {
      doctorFees: 2000,
      medicineCosts: 0,
      labCharges: 500,
      otherCharges: 0
    }
  },
  {
    id: '2',
    date: '2024-01-14',
    serviceDescription: 'Blood Test & Lab Work',
    providerName: 'Zuruu Diagnostic Center',
    amount: 1200,
    paymentStatus: 'due',
    claimStatus: 'pending',
    category: 'lab',
    breakdown: {
      doctorFees: 0,
      medicineCosts: 0,
      labCharges: 1200,
      otherCharges: 0
    }
  },
  {
    id: '3',
    date: '2024-01-13',
    serviceDescription: 'Prescription Medications',
    providerName: 'Zuruu Pharmacy',
    amount: 850,
    paymentStatus: 'paid',
    claimStatus: 'approved',
    category: 'pharmacy',
    breakdown: {
      doctorFees: 0,
      medicineCosts: 850,
      labCharges: 0,
      otherCharges: 0
    }
  },
  {
    id: '4',
    date: '2024-01-12',
    serviceDescription: 'Emergency Room Visit',
    providerName: 'City General Hospital',
    amount: 8500,
    paymentStatus: 'in-process',
    claimStatus: 'pending',
    category: 'hospital',
    breakdown: {
      doctorFees: 3000,
      medicineCosts: 500,
      labCharges: 2000,
      otherCharges: 3000
    }
  }
];

const mockInsurancePolicy: InsurancePolicy = {
  provider: 'Allied Health Insurance',
  planType: 'Premium+',
  coverageRemaining: 320000,
  totalCoverage: 500000,
  renewalDate: 'Dec 31, 2025',
  claimHistory: [
    {
      id: '1',
      date: '2024-01-15',
      amount: 2500,
      status: 'paid',
      description: 'Cardiology Consultation',
      timestamp: '2024-01-15 10:30'
    },
    {
      id: '2',
      date: '2024-01-14',
      amount: 1200,
      status: 'under-review',
      description: 'Blood Test & Lab Work',
      timestamp: '2024-01-14 14:20'
    },
    {
      id: '3',
      date: '2024-01-13',
      amount: 850,
      status: 'approved',
      description: 'Prescription Medications',
      timestamp: '2024-01-13 16:45'
    }
  ]
};

const mockAIRecommendations: AIRecommendation[] = [
  {
    id: '1',
    type: 'spending',
    title: 'Lab Test Spending Alert',
    description: 'You spent 25% more on lab tests this month — consider bundled plans.',
    action: 'View Bundled Plans',
    priority: 'medium'
  },
  {
    id: '2',
    type: 'insurance',
    title: 'Insurance Coverage Insight',
    description: 'Your insurance covers 80% of your cardiology visits. Next check-up may be nearly free.',
    action: 'Schedule Check-up',
    priority: 'low'
  },
  {
    id: '3',
    type: 'payment',
    title: 'Overdue Payment Alert',
    description: '3 unpaid bills exceed 30 days — payment reminder set for tomorrow.',
    action: 'Pay Now',
    priority: 'high'
  }
];

const mockExpenseData = [
  { category: 'Consultations', amount: 15000, percentage: 35 },
  { category: 'Pharmacy', amount: 8500, percentage: 20 },
  { category: 'Lab Tests', amount: 12000, percentage: 28 },
  { category: 'Hospital Stay', amount: 8000, percentage: 17 }
];

const mockMonthlyTrend = [
  { month: 'Jan', amount: 12000 },
  { month: 'Feb', amount: 15000 },
  { month: 'Mar', amount: 18000 },
  { month: 'Apr', amount: 14000 },
  { month: 'May', amount: 16000 },
  { month: 'Jun', amount: 20000 }
];

export default function BillingInsurancePaymentManagement() {
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary>(mockFinancialSummary);
  const [billingRecords, setBillingRecords] = useState<BillingRecord[]>(mockBillingRecords);
  const [insurancePolicy, setInsurancePolicy] = useState<InsurancePolicy>(mockInsurancePolicy);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>(mockAIRecommendations);
  const [selectedRecord, setSelectedRecord] = useState<BillingRecord | null>(null);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [showClaimTimeline, setShowClaimTimeline] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isMobile, setIsMobile] = useState(false);
  const [autoPayEnabled, setAutoPayEnabled] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'due': return 'bg-red-100 text-red-800 border-red-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'in-process': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getClaimStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'denied': return 'bg-red-100 text-red-800 border-red-200';
      case 'under-review': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'consultation': return <Stethoscope className="w-4 h-4" />;
      case 'pharmacy': return <Pill className="w-4 h-4" />;
      case 'lab': return <Activity className="w-4 h-4" />;
      case 'hospital': return <MapPin className="w-4 h-4" />;
      default: return <Receipt className="w-4 h-4" />;
    }
  };

  const filteredRecords = billingRecords.filter(record => {
    const matchesSearch = record.serviceDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.providerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.paymentStatus === filterStatus;
    const matchesCategory = filterCategory === 'all' || record.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const renderFinancialSummaryBar = () => (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Total Due */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Due</p>
                <p className="text-2xl font-bold text-red-600">₹{financialSummary.totalDue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Paid Amount */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Paid Amount</p>
                <p className="text-2xl font-bold text-green-600">₹{financialSummary.paidAmount.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Pending Claims */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Claims</p>
                <p className="text-2xl font-bold text-orange-600">{financialSummary.pendingClaims}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Insurance Coverage */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Insurance Coverage</p>
                <p className="text-lg font-bold text-blue-600">{financialSummary.insuranceCoverage}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Next Payment Due */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Card className="border-l-4 border-l-gray-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Next Payment Due</p>
                <p className="text-lg font-bold text-gray-600">{financialSummary.nextPaymentDue}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <Calendar className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );

  const renderBillingTable = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by service or provider..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Payment Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="due">Due</SelectItem>
            <SelectItem value="in-process">In Process</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="consultation">Consultation</SelectItem>
            <SelectItem value="pharmacy">Pharmacy</SelectItem>
            <SelectItem value="lab">Lab</SelectItem>
            <SelectItem value="hospital">Hospital</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Service</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Provider</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Payment</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Claim</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRecords.map((record, index) => (
                  <motion.tr
                    key={record.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => {
                      setSelectedRecord(record);
                      setShowDetailDrawer(true);
                    }}
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">{record.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(record.category)}
                        <span>{record.serviceDescription}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{record.providerName}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">₹{record.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <Badge className={getPaymentStatusColor(record.paymentStatus)}>
                        {record.paymentStatus.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={getClaimStatusColor(record.claimStatus)}>
                        {record.claimStatus.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Send className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderAnalyticsSection = () => (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      {/* Expense Analytics */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Expense Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Donut Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={mockExpenseData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                      label={({ category, percentage }) => `${category} ${percentage}%`}
                    >
                      {mockExpenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={
                          index === 0 ? '#009688' :
                          index === 1 ? '#43A047' :
                          index === 2 ? '#FB8C00' :
                          '#E53935'
                        } />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Bar Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockMonthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#009688" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Shortcuts */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="bg-red-600 hover:bg-red-700">
                <CreditCard className="w-4 h-4 mr-2" />
                Pay All Due Bills
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Generate Insurance Report
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Yearly Summary
              </Button>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={autoPayEnabled}
                  onCheckedChange={setAutoPayEnabled}
                />
                <span className="text-sm">Set Auto-Pay</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insurance Tracker */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Insurance Tracker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Provider:</span>
                <span className="font-medium">{insurancePolicy.provider}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium">{insurancePolicy.planType}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Coverage Remaining:</span>
                  <span className="font-medium">₹{insurancePolicy.coverageRemaining.toLocaleString()}</span>
                </div>
                <Progress 
                  value={(insurancePolicy.coverageRemaining / insurancePolicy.totalCoverage) * 100} 
                  className="h-2" 
                />
                <p className="text-xs text-gray-500">of ₹{insurancePolicy.totalCoverage.toLocaleString()}</p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Renewal Date:</span>
                <span className="font-medium">{insurancePolicy.renewalDate}</span>
              </div>
            </div>
            
            <Button 
              className="w-full"
              onClick={() => setShowClaimTimeline(true)}
            >
              <Clock className="w-4 h-4 mr-2" />
              View Claim History
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );

  const renderAIRecommendations = () => (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <Card className="border-l-4 border-l-teal-600">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-teal-600" />
            <span>AI Financial Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiRecommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation.id}
                className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              >
                <div className={`p-2 rounded-full ${
                  recommendation.priority === 'high' ? 'bg-red-100' :
                  recommendation.priority === 'medium' ? 'bg-yellow-100' :
                  'bg-green-100'
                }`}>
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{recommendation.title}</h4>
                  <p className="text-sm text-gray-600">{recommendation.description}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    {recommendation.action}
                  </Button>
                  <Button size="sm" variant="ghost">
                    Dismiss
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderDetailDrawer = () => (
    <Drawer open={showDetailDrawer} onOpenChange={setShowDetailDrawer}>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle>Bill Details</DrawerTitle>
        </DrawerHeader>
        {selectedRecord && (
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{selectedRecord.serviceDescription}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Provider:</span>
                  <p className="font-medium">{selectedRecord.providerName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Date:</span>
                  <p className="font-medium">{selectedRecord.date}</p>
                </div>
                <div>
                  <span className="text-gray-600">Total Amount:</span>
                  <p className="font-medium text-lg">₹{selectedRecord.amount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <Badge className={getPaymentStatusColor(selectedRecord.paymentStatus)}>
                    {selectedRecord.paymentStatus}
                  </Badge>
                </div>
              </div>
            </div>
            
            {selectedRecord.breakdown && (
              <div className="space-y-3">
                <h4 className="font-semibold">Bill Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Doctor Fees:</span>
                    <span>₹{selectedRecord.breakdown.doctorFees.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Medicine Costs:</span>
                    <span>₹{selectedRecord.breakdown.medicineCosts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lab Charges:</span>
                    <span>₹{selectedRecord.breakdown.labCharges.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Other Charges:</span>
                    <span>₹{selectedRecord.breakdown.otherCharges.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex space-x-3">
              <Button className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="flex-1">
                <Send className="w-4 h-4 mr-2" />
                Submit Claim
              </Button>
              <Button variant="outline" className="flex-1">
                <CreditCard className="w-4 h-4 mr-2" />
                Pay Now
              </Button>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );

  const renderClaimTimelineModal = () => (
    <Dialog open={showClaimTimeline} onOpenChange={setShowClaimTimeline}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Claim History Timeline</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {insurancePolicy.claimHistory.map((claim, index) => (
            <div key={claim.id} className="flex items-start space-x-4">
              <div className={`w-3 h-3 rounded-full mt-2 ${
                claim.status === 'paid' ? 'bg-green-500' :
                claim.status === 'approved' ? 'bg-green-500' :
                claim.status === 'under-review' ? 'bg-yellow-500' :
                'bg-gray-500'
              }`}></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{claim.description}</h4>
                  <span className="text-sm text-gray-600">{claim.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600">Amount: ₹{claim.amount.toLocaleString()}</p>
                <Badge className={getClaimStatusColor(claim.status)}>
                  {claim.status.replace('-', ' ')}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download Summary
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (isMobile) {
    return (
      <div className="space-y-6 pb-20">
        {renderFinancialSummaryBar()}
        {renderBillingTable()}
        {renderAnalyticsSection()}
        {renderAIRecommendations()}
        {renderDetailDrawer()}
        {renderClaimTimelineModal()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderFinancialSummaryBar()}
      {renderBillingTable()}
      {renderAnalyticsSection()}
      {renderAIRecommendations()}
      {renderDetailDrawer()}
      {renderClaimTimelineModal()}
    </div>
  );
}
