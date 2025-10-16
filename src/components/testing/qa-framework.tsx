"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Square, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  BarChart3, 
  Settings, 
  Download, 
  Upload, 
  RefreshCw, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Users, 
  Activity, 
  Zap, 
  Brain, 
  Target, 
  Shield, 
  Bug, 
  TestTube, 
  Flask, 
  Microscope, 
  Search as SearchIcon, 
  CheckSquare, 
  Square as SquareIcon, 
  Circle, 
  Triangle, 
  Hexagon, 
  Pentagon, 
  Octagon, 
  Diamond, 
  Heart, 
  Star, 
  Zap as ZapIcon, 
  Flashlight, 
  Lightbulb, 
  Candle, 
  Flame, 
  Droplets, 
  Wind, 
  Cloud, 
  Sun, 
  Moon, 
  Sunrise, 
  Sunset, 
  Thermometer, 
  Gauge, 
  Timer, 
  Stopwatch, 
  Clock as ClockIcon, 
  Calendar as CalendarIcon, 
  CalendarDays, 
  CalendarCheck, 
  CalendarX, 
  CalendarPlus, 
  CalendarMinus, 
  CalendarRange, 
  CalendarSearch, 
  CalendarHeart, 
  CalendarStar, 
  CalendarUser, 
  CalendarClock, 
  CalendarEvent, 
  Calendar as CalendarIcon2,
  Info,
  HelpCircle,
  ExternalLink,
  Copy,
  Share,
  Link,
  QrCode,
  Scan,
  Camera,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sun as SunIcon,
  Moon as MoonIcon,
  Palette,
  Type,
  MousePointer,
  Keyboard,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Headphones,
  Speaker,
  Mic as MicIcon,
  Video,
  VideoOff,
  Camera as CameraIcon,
  CameraOff,
  MapPin,
  Navigation,
  Compass,
  Globe,
  Wifi,
  Bluetooth,
  Battery,
  Plug,
  Power,
  RotateCcw,
  RotateCw,
  Maximize,
  Minimize,
  Maximize2,
  Minimize2,
  Square as SquareIcon2,
  Circle as CircleIcon,
  Triangle as TriangleIcon,
  Hexagon as HexagonIcon,
  Pentagon as PentagonIcon,
  Octagon as OctagonIcon,
  Diamond as DiamondIcon,
  Heart as HeartIcon,
  Star as StarIcon,
  Zap as ZapIcon2,
  Flashlight as FlashlightIcon,
  Lightbulb as LightbulbIcon,
  Candle as CandleIcon,
  Flame as FlameIcon,
  Droplets as DropletsIcon,
  Wind as WindIcon,
  Cloud as CloudIcon,
  Sun as SunIcon2,
  Moon as MoonIcon2,
  Sunrise as SunriseIcon,
  Sunset as SunsetIcon,
  Thermometer as ThermometerIcon,
  Gauge as GaugeIcon,
  Timer as TimerIcon,
  Stopwatch as StopwatchIcon,
  Clock as ClockIcon2,
  Calendar as CalendarIcon3,
  CalendarDays as CalendarDaysIcon,
  CalendarCheck as CalendarCheckIcon,
  CalendarX as CalendarXIcon,
  CalendarPlus as CalendarPlusIcon,
  CalendarMinus as CalendarMinusIcon,
  CalendarRange as CalendarRangeIcon,
  CalendarSearch as CalendarSearchIcon,
  CalendarHeart as CalendarHeartIcon,
  CalendarStar as CalendarStarIcon,
  CalendarUser as CalendarUserIcon,
  CalendarClock as CalendarClockIcon,
  CalendarEvent as CalendarEventIcon,
  Calendar as CalendarIcon4
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TestCase {
  id: string;
  name: string;
  description: string;
  category: 'unit' | 'integration' | 'e2e' | 'security' | 'performance' | 'accessibility';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'running' | 'passed' | 'failed' | 'skipped';
  duration: number;
  lastRun: string;
  coverage: number;
  tags: string[];
  steps: TestStep[];
  expectedResult: string;
  actualResult?: string;
  errorMessage?: string;
}

interface TestStep {
  id: string;
  description: string;
  action: string;
  expected: string;
  actual?: string;
  status: 'pending' | 'passed' | 'failed';
}

interface TestSuite {
  id: string;
  name: string;
  description: string;
  testCases: string[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration: number;
  lastRun: string;
  coverage: number;
}

interface TestReport {
  id: string;
  name: string;
  timestamp: string;
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  coverage: number;
  duration: number;
  status: 'success' | 'failure' | 'partial';
  details: TestCase[];
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  threshold: number;
  status: 'pass' | 'fail' | 'warning';
  trend: 'up' | 'down' | 'stable';
}

const mockTestCases: TestCase[] = [
  {
    id: 'TC-001',
    name: 'User Login Authentication',
    description: 'Verify user can login with valid credentials',
    category: 'e2e',
    priority: 'high',
    status: 'passed',
    duration: 2.5,
    lastRun: '2024-01-15T10:30:00Z',
    coverage: 95,
    tags: ['authentication', 'login', 'security'],
    steps: [
      { id: '1', description: 'Navigate to login page', action: 'GET /login', expected: 'Login form displayed', status: 'passed' },
      { id: '2', description: 'Enter valid credentials', action: 'POST /login', expected: 'Authentication successful', status: 'passed' },
      { id: '3', description: 'Verify dashboard access', action: 'GET /dashboard', expected: 'Dashboard loaded', status: 'passed' }
    ],
    expectedResult: 'User successfully logged in and redirected to dashboard'
  },
  {
    id: 'TC-002',
    name: 'Prescription Verification Workflow',
    description: 'Test complete prescription verification process',
    category: 'integration',
    priority: 'critical',
    status: 'failed',
    duration: 15.2,
    lastRun: '2024-01-15T10:25:00Z',
    coverage: 88,
    tags: ['prescription', 'workflow', 'verification'],
    steps: [
      { id: '1', description: 'Upload prescription', action: 'POST /prescriptions', expected: 'Prescription uploaded', status: 'passed' },
      { id: '2', description: 'Verify prescriber', action: 'GET /prescribers/verify', expected: 'Prescriber verified', status: 'failed' },
      { id: '3', description: 'Check interactions', action: 'POST /interactions/check', expected: 'No interactions found', status: 'pending' }
    ],
    expectedResult: 'Prescription verified and ready for dispensing',
    actualResult: 'Prescriber verification failed',
    errorMessage: 'Prescriber license not found in registry'
  },
  {
    id: 'TC-003',
    name: 'Inventory Stock Update',
    description: 'Test inventory stock level updates',
    category: 'unit',
    priority: 'medium',
    status: 'passed',
    duration: 0.8,
    lastRun: '2024-01-15T10:20:00Z',
    coverage: 92,
    tags: ['inventory', 'stock', 'update'],
    steps: [
      { id: '1', description: 'Update stock quantity', action: 'PUT /inventory/stock', expected: 'Stock updated', status: 'passed' },
      { id: '2', description: 'Verify stock level', action: 'GET /inventory/stock', expected: 'Correct stock level', status: 'passed' }
    ],
    expectedResult: 'Stock level updated successfully'
  }
];

const mockTestSuites: TestSuite[] = [
  {
    id: 'TS-001',
    name: 'Authentication Suite',
    description: 'Complete authentication and authorization tests',
    testCases: ['TC-001', 'TC-004', 'TC-005'],
    status: 'completed',
    duration: 45.2,
    lastRun: '2024-01-15T10:30:00Z',
    coverage: 94
  },
  {
    id: 'TS-002',
    name: 'Prescription Management Suite',
    description: 'Prescription workflow and management tests',
    testCases: ['TC-002', 'TC-006', 'TC-007'],
    status: 'failed',
    duration: 120.5,
    lastRun: '2024-01-15T10:25:00Z',
    coverage: 87
  },
  {
    id: 'TS-003',
    name: 'Inventory Management Suite',
    description: 'Inventory and stock management tests',
    testCases: ['TC-003', 'TC-008', 'TC-009'],
    status: 'running',
    duration: 0,
    lastRun: '2024-01-15T10:35:00Z',
    coverage: 0
  }
];

const mockTestReports: TestReport[] = [
  {
    id: 'TR-001',
    name: 'Daily Test Run - 2024-01-15',
    timestamp: '2024-01-15T10:30:00Z',
    totalTests: 45,
    passed: 42,
    failed: 2,
    skipped: 1,
    coverage: 89,
    duration: 180.5,
    status: 'partial',
    details: mockTestCases
  }
];

const mockPerformanceMetrics: PerformanceMetric[] = [
  { name: 'Page Load Time', value: 1.2, unit: 's', threshold: 2.0, status: 'pass', trend: 'down' },
  { name: 'API Response Time', value: 150, unit: 'ms', threshold: 200, status: 'pass', trend: 'stable' },
  { name: 'Memory Usage', value: 85, unit: '%', threshold: 90, status: 'pass', trend: 'up' },
  { name: 'CPU Usage', value: 45, unit: '%', threshold: 80, status: 'pass', trend: 'stable' },
  { name: 'Database Query Time', value: 25, unit: 'ms', threshold: 50, status: 'pass', trend: 'down' }
];

const QAFramework: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [testCases, setTestCases] = useState<TestCase[]>(mockTestCases);
  const [testSuites, setTestSuites] = useState<TestSuite[]>(mockTestSuites);
  const [testReports, setTestReports] = useState<TestReport[]>(mockTestReports);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>(mockPerformanceMetrics);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
  const [showTestCaseDetail, setShowTestCaseDetail] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'success';
      case 'failed': return 'destructive';
      case 'running': return 'warning';
      case 'pending': return 'info';
      case 'skipped': return 'default';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'unit': return <TestTube className="w-4 h-4" />;
      case 'integration': return <Flask className="w-4 h-4" />;
      case 'e2e': return <Play className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'performance': return <Zap className="w-4 h-4" />;
      case 'accessibility': return <Eye className="w-4 h-4" />;
      default: return <TestTube className="w-4 h-4" />;
    }
  };

  const runTestSuite = (suiteId: string) => {
    setIsRunning(true);
    // Simulate test execution
    setTimeout(() => {
      setTestSuites(prev => prev.map(suite => 
        suite.id === suiteId ? { ...suite, status: 'completed' } : suite
      ));
      setIsRunning(false);
    }, 3000);
  };

  const runAllTests = () => {
    setIsRunning(true);
    // Simulate running all tests
    setTimeout(() => {
      setIsRunning(false);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1">Testing & QA Framework</h1>
          <p className="text-body mt-2">Comprehensive testing suite with automated and manual testing capabilities</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" disabled={isRunning}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm" onClick={runAllTests} disabled={isRunning}>
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run All Tests
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Test Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Tests', value: '247', change: '+12', icon: TestTube, color: 'var(--c-primary-500)' },
          { title: 'Pass Rate', value: '94%', change: '+2%', icon: CheckCircle, color: 'var(--c-accent-500)' },
          { title: 'Coverage', value: '89%', change: '+5%', icon: Target, color: 'var(--c-info-500)' },
          { title: 'Performance Score', value: '92', change: '+3', icon: Zap, color: 'var(--c-warning-500)' }
        ].map((metric, index) => (
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
                    <p className="text-sm text-[var(--c-accent-600)] mt-1">{metric.change}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${metric.color}20` }}>
                    <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-[var(--c-neutral-200)]">
        <div className="flex space-x-8">
          {[
            { id: 'overview', label: 'Test Overview' },
            { id: 'testcases', label: 'Test Cases' },
            { id: 'suites', label: 'Test Suites' },
            { id: 'reports', label: 'Test Reports' },
            { id: 'performance', label: 'Performance' },
            { id: 'coverage', label: 'Coverage' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-[var(--c-primary-500)] text-[var(--c-primary-600)]'
                  : 'border-transparent text-[var(--c-neutral-600)] hover:text-[var(--c-neutral-900)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Test Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Recent Test Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {testCases.slice(0, 5).map((testCase) => (
                    <div key={testCase.id} className="flex items-center space-x-3 p-3 border border-[var(--c-neutral-200)] rounded-lg">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--c-primary-100)]">
                        {getCategoryIcon(testCase.category)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{testCase.name}</p>
                        <p className="text-xs text-[var(--c-neutral-600)]">
                          {testCase.category} • {testCase.duration}s • {new Date(testCase.lastRun).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getPriorityColor(testCase.priority) as any} size="sm">
                          {testCase.priority}
                        </Badge>
                        <Badge variant={getStatusColor(testCase.status) as any} size="sm">
                          {testCase.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Performance Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-[var(--c-neutral-200)] rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          metric.status === 'pass' ? 'bg-[var(--c-accent-100)]' : 
                          metric.status === 'fail' ? 'bg-[var(--c-error-100)]' : 'bg-[var(--c-warning-100)]'
                        }`}>
                          {metric.status === 'pass' ? <CheckCircle className="w-4 h-4 text-[var(--c-accent-600)]" /> :
                           metric.status === 'fail' ? <XCircle className="w-4 h-4 text-[var(--c-error-600)]" /> :
                           <AlertTriangle className="w-4 h-4 text-[var(--c-warning-600)]" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{metric.name}</p>
                          <p className="text-xs text-[var(--c-neutral-600)]">Threshold: {metric.threshold}{metric.unit}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{metric.value}{metric.unit}</p>
                        <Badge variant={metric.status === 'pass' ? 'success' : metric.status === 'fail' ? 'destructive' : 'warning'} size="sm">
                          {metric.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'testcases' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Test Cases</span>
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Search test cases..."
                    className="w-64"
                  />
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Test Case
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test Case ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Coverage</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testCases.map((testCase) => (
                    <TableRow key={testCase.id} interactive>
                      <TableCell className="font-mono text-sm">{testCase.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{testCase.name}</p>
                          <p className="text-sm text-[var(--c-neutral-600)]">{testCase.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(testCase.category)}
                          <span className="capitalize">{testCase.category}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(testCase.priority) as any}>
                          {testCase.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(testCase.status) as any}>
                          {testCase.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{testCase.duration}s</TableCell>
                      <TableCell>{testCase.coverage}%</TableCell>
                      <TableCell className="text-sm">
                        {new Date(testCase.lastRun).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm" className="p-1" onClick={() => {
                            setSelectedTestCase(testCase);
                            setShowTestCaseDetail(true);
                          }}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-1">
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-1">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === 'suites' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Test Suites</span>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Suite
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testSuites.map((suite) => (
                  <div key={suite.id} className="p-4 border border-[var(--c-neutral-200)] rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{suite.name}</h4>
                        <p className="text-sm text-[var(--c-neutral-600)]">{suite.description}</p>
                      </div>
                      <Badge variant={getStatusColor(suite.status) as any}>
                        {suite.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Test Cases:</span>
                        <span>{suite.testCases.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Duration:</span>
                        <span>{suite.duration}s</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Coverage:</span>
                        <span>{suite.coverage}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Run:</span>
                        <span>{new Date(suite.lastRun).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="flex-1" 
                        onClick={() => runTestSuite(suite.id)}
                        disabled={isRunning || suite.status === 'running'}
                      >
                        {suite.status === 'running' ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Running
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Run Suite
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'reports' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Test Reports</span>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Total Tests</TableHead>
                    <TableHead>Passed</TableHead>
                    <TableHead>Failed</TableHead>
                    <TableHead>Skipped</TableHead>
                    <TableHead>Coverage</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell className="text-sm">
                        {new Date(report.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>{report.totalTests}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-[var(--c-accent-600)]" />
                          <span>{report.passed}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <XCircle className="w-4 h-4 text-[var(--c-error-600)]" />
                          <span>{report.failed}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-[var(--c-neutral-600)]" />
                          <span>{report.skipped}</span>
                        </div>
                      </TableCell>
                      <TableCell>{report.coverage}%</TableCell>
                      <TableCell>{report.duration}s</TableCell>
                      <TableCell>
                        <Badge variant={report.status === 'success' ? 'success' : report.status === 'failure' ? 'destructive' : 'warning'}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm" className="p-1">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-1">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === 'performance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Performance Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="p-4 border border-[var(--c-neutral-200)] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{metric.name}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant={metric.status === 'pass' ? 'success' : metric.status === 'fail' ? 'destructive' : 'warning'}>
                            {metric.status}
                          </Badge>
                          <span className="text-sm text-[var(--c-neutral-600)]">
                            {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{metric.value}{metric.unit}</span>
                        <span className="text-sm text-[var(--c-neutral-600)]">
                          Threshold: {metric.threshold}{metric.unit}
                        </span>
                      </div>
                      <div className="mt-2 w-full bg-[var(--c-neutral-200)] rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            metric.status === 'pass' ? 'bg-[var(--c-accent-500)]' : 
                            metric.status === 'fail' ? 'bg-[var(--c-error-500)]' : 'bg-[var(--c-warning-500)]'
                          }`}
                          style={{ width: `${Math.min((metric.value / metric.threshold) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Performance Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-[var(--c-neutral-50)] rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-[var(--c-neutral-400)] mx-auto mb-2" />
                    <p className="text-sm text-[var(--c-neutral-500)]">Performance Trends Chart</p>
                    <p className="text-xs text-[var(--c-neutral-400)]">Historical performance data</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'coverage' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Code Coverage</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Overall Coverage', value: 89, color: 'var(--c-accent-500)' },
                  { name: 'Unit Tests', value: 95, color: 'var(--c-primary-500)' },
                  { name: 'Integration Tests', value: 87, color: 'var(--c-info-500)' },
                  { name: 'E2E Tests', value: 82, color: 'var(--c-warning-500)' }
                ].map((coverage, index) => (
                  <div key={index} className="p-4 border border-[var(--c-neutral-200)] rounded-lg text-center">
                    <h4 className="font-medium mb-2">{coverage.name}</h4>
                    <div className="relative w-24 h-24 mx-auto mb-2">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-[var(--c-neutral-200)]"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-[var(--c-accent-500)]"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray={`${coverage.value}, 100`}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold" style={{ color: coverage.color }}>
                          {coverage.value}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Test Case Detail Modal */}
      {showTestCaseDetail && selectedTestCase && (
        <TestCaseDetailModal
          testCase={selectedTestCase}
          onClose={() => setShowTestCaseDetail(false)}
        />
      )}
    </div>
  );
};

// Test Case Detail Modal Component
const TestCaseDetailModal: React.FC<{
  testCase: TestCase;
  onClose: () => void;
}> = ({ testCase, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[var(--c-surface)] rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="p-6 border-b border-[var(--c-neutral-200)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-h2">{testCase.name}</h2>
              <p className="text-body mt-2">{testCase.description}</p>
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-h3 mb-4">Test Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[var(--c-neutral-600)]">Test Case ID:</span>
                  <span className="font-medium">{testCase.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--c-neutral-600)]">Category:</span>
                  <span className="font-medium capitalize">{testCase.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--c-neutral-600)]">Priority:</span>
                  <Badge variant={testCase.priority === 'critical' ? 'destructive' : testCase.priority === 'high' ? 'warning' : 'info'}>
                    {testCase.priority}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--c-neutral-600)]">Status:</span>
                  <Badge variant={testCase.status === 'passed' ? 'success' : testCase.status === 'failed' ? 'destructive' : 'warning'}>
                    {testCase.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--c-neutral-600)]">Duration:</span>
                  <span className="font-medium">{testCase.duration}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--c-neutral-600)]">Coverage:</span>
                  <span className="font-medium">{testCase.coverage}%</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-h3 mb-4">Test Steps</h3>
              <div className="space-y-3">
                {testCase.steps.map((step) => (
                  <div key={step.id} className="p-3 border border-[var(--c-neutral-200)] rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium">Step {step.id}</span>
                      <Badge variant={step.status === 'passed' ? 'success' : step.status === 'failed' ? 'destructive' : 'info'} size="sm">
                        {step.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[var(--c-neutral-700)] mb-1">{step.description}</p>
                    <p className="text-xs text-[var(--c-neutral-600)]">Action: {step.action}</p>
                    <p className="text-xs text-[var(--c-neutral-600)]">Expected: {step.expected}</p>
                    {step.actual && (
                      <p className="text-xs text-[var(--c-neutral-600)]">Actual: {step.actual}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-h3 mb-4">Expected Result</h3>
            <p className="text-sm text-[var(--c-neutral-700)] p-3 bg-[var(--c-neutral-50)] rounded-lg">
              {testCase.expectedResult}
            </p>
            {testCase.actualResult && (
              <>
                <h3 className="text-h3 mb-4 mt-6">Actual Result</h3>
                <p className="text-sm text-[var(--c-neutral-700)] p-3 bg-[var(--c-neutral-50)] rounded-lg">
                  {testCase.actualResult}
                </p>
              </>
            )}
            {testCase.errorMessage && (
              <>
                <h3 className="text-h3 mb-4 mt-6">Error Message</h3>
                <p className="text-sm text-[var(--c-error-700)] p-3 bg-[var(--c-error-50)] rounded-lg">
                  {testCase.errorMessage}
                </p>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QAFramework;
