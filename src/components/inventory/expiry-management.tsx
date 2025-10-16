"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  RotateCcw,
  FileText,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Bell,
  Settings,
  RefreshCw,
  Plus,
  Minus,
  X,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Zap,
  Brain,
  Target,
  Activity,
  AlertCircle,
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
  Sun,
  Moon,
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
  RotateCcw as RotateCcwIcon,
  RotateCw,
  Maximize,
  Minimize,
  Maximize2,
  Minimize2,
  Square,
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
  Sun as SunIcon,
  Moon as MoonIcon,
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
  Truck,
  User,
  Users,
  UserCheck,
  UserX,
  Crown,
  Flag,
  Archive,
  Trash2 as Trash2Icon,
  Edit as EditIcon,
  Plus as PlusIcon,
  Minus as MinusIcon,
  X as XIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  ArrowRight as ArrowRightIcon,
  ArrowLeft as ArrowLeftIcon,
  Zap as ZapIcon2,
  Brain as BrainIcon,
  Target as TargetIcon,
  Activity as ActivityIcon,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon,
  HelpCircle as HelpCircleIcon,
  ExternalLink as ExternalLinkIcon,
  Copy as CopyIcon,
  Share as ShareIcon,
  Link as LinkIcon,
  QrCode as QrCodeIcon,
  Scan as ScanIcon,
  Camera as CameraIcon2,
  Mic as MicIcon2,
  MicOff as MicOffIcon,
  Volume2 as Volume2Icon,
  VolumeX as VolumeXIcon,
  Sun as SunIcon2,
  Moon as MoonIcon2,
  Palette as PaletteIcon,
  Type as TypeIcon,
  MousePointer as MousePointerIcon,
  Keyboard as KeyboardIcon,
  Monitor as MonitorIcon,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  Laptop as LaptopIcon,
  Desktop as DesktopIcon,
  Headphones as HeadphonesIcon,
  Speaker as SpeakerIcon,
  Mic as MicIcon3,
  Video as VideoIcon,
  VideoOff as VideoOffIcon,
  Camera as CameraIcon3,
  CameraOff as CameraOffIcon,
  MapPin as MapPinIcon,
  Navigation as NavigationIcon,
  Compass as CompassIcon,
  Globe as GlobeIcon,
  Wifi as WifiIcon,
  Bluetooth as BluetoothIcon,
  Battery as BatteryIcon,
  Plug as PlugIcon,
  Power as PowerIcon,
  RotateCcw as RotateCcwIcon2,
  RotateCw as RotateCwIcon,
  Maximize as MaximizeIcon,
  Minimize as MinimizeIcon,
  Maximize2 as Maximize2Icon,
  Minimize2 as Minimize2Icon,
  Square as SquareIcon,
  Circle as CircleIcon,
  Triangle as TriangleIcon,
  Hexagon as HexagonIcon,
  Pentagon as PentagonIcon,
  Octagon as OctagonIcon,
  Diamond as DiamondIcon,
  Heart as HeartIcon,
  Star as StarIcon,
  Zap as ZapIcon3,
  Flashlight as FlashlightIcon,
  Lightbulb as LightbulbIcon,
  Candle as CandleIcon,
  Flame as FlameIcon,
  Droplets as DropletsIcon,
  Wind as WindIcon,
  Cloud as CloudIcon,
  Sun as SunIcon3,
  Moon as MoonIcon3,
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

interface Batch {
  id: string;
  productName: string;
  batchNo: string;
  category: string;
  expiryDate: string;
  daysRemaining: number;
  quantity: number;
  supplier: string;
  purchaseDate: string;
  cost: number;
  status: 'active' | 'expired' | 'quarantined' | 'returned' | 'disposed';
  storageConditions: string;
  lastAuditDate: string;
  expiryRisk: 'low' | 'medium' | 'high' | 'critical';
}

interface ExpiryAlert {
  id: string;
  type: 'expiring' | 'expired' | 'return' | 'disposal';
  message: string;
  count: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
}

interface AIInsight {
  id: string;
  type: 'forecast' | 'suggestion' | 'supplier' | 'trend';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  category: string;
}

const mockBatches: Batch[] = [
  {
    id: '1',
    productName: 'Metformin 500mg',
    batchNo: 'MTF-BT12',
    category: 'Anti-Diabetic',
    expiryDate: '2024-12-11',
    daysRemaining: 26,
    quantity: 200,
    supplier: 'Abbott',
    purchaseDate: '2024-12-12',
    cost: 3750,
    status: 'active',
    storageConditions: 'Room temperature, dry place',
    lastAuditDate: '2024-11-15',
    expiryRisk: 'high'
  },
  {
    id: '2',
    productName: 'Cefixime 200mg',
    batchNo: 'CFX-BT05',
    category: 'Antibiotic',
    expiryDate: '2025-01-03',
    daysRemaining: 78,
    quantity: 350,
    supplier: 'Getz Pharma',
    purchaseDate: '2024-05-05',
    cost: 8750,
    status: 'active',
    storageConditions: 'Refrigerated',
    lastAuditDate: '2024-11-10',
    expiryRisk: 'medium'
  },
  {
    id: '3',
    productName: 'Amoxicillin 500mg',
    batchNo: 'AMX-BT23',
    category: 'Antibiotic',
    expiryDate: '2024-11-20',
    daysRemaining: -5,
    quantity: 150,
    supplier: 'PharmaCorp',
    purchaseDate: '2024-05-20',
    cost: 4500,
    status: 'expired',
    storageConditions: 'Room temperature',
    lastAuditDate: '2024-11-15',
    expiryRisk: 'critical'
  },
  {
    id: '4',
    productName: 'Atorvastatin 20mg',
    batchNo: 'ATV-BT08',
    category: 'Cardiovascular',
    expiryDate: '2025-02-15',
    daysRemaining: 120,
    quantity: 300,
    supplier: 'HealthPlus',
    purchaseDate: '2024-08-15',
    cost: 9000,
    status: 'active',
    storageConditions: 'Room temperature, dry place',
    lastAuditDate: '2024-11-12',
    expiryRisk: 'low'
  }
];

const mockAlerts: ExpiryAlert[] = [
  {
    id: '1',
    type: 'expiring',
    message: '12 products expiring this week',
    count: 12,
    severity: 'high',
    timestamp: '2024-11-15T10:30:00Z'
  },
  {
    id: '2',
    type: 'expired',
    message: '3 batches already expired',
    count: 3,
    severity: 'critical',
    timestamp: '2024-11-15T10:25:00Z'
  },
  {
    id: '3',
    type: 'return',
    message: '2 suppliers due for return',
    count: 2,
    severity: 'medium',
    timestamp: '2024-11-15T10:20:00Z'
  }
];

const mockAIInsights: AIInsight[] = [
  {
    id: '1',
    type: 'forecast',
    title: 'Sales Velocity Forecast',
    description: 'Based on sales trends, 24 units of Metformin 500mg will remain unsold by expiry date.',
    confidence: 87,
    actionable: true,
    category: 'Inventory Optimization'
  },
  {
    id: '2',
    type: 'suggestion',
    title: 'Discount Recommendation',
    description: 'Offer 10% discount starting 20 days before expiry to clear stock.',
    confidence: 92,
    actionable: true,
    category: 'Revenue Optimization'
  },
  {
    id: '3',
    type: 'supplier',
    title: 'Supplier Reliability Alert',
    description: 'Getz Pharma batches show 18% near-expiry returns. Recommend tighter reorder quantities.',
    confidence: 85,
    actionable: true,
    category: 'Supplier Management'
  }
];

const ExpiryManagement: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>(mockBatches);
  const [filteredBatches, setFilteredBatches] = useState<Batch[]>(mockBatches);
  const [alerts, setAlerts] = useState<ExpiryAlert[]>(mockAlerts);
  const [aiInsights, setAIInsights] = useState<AIInsight[]>(mockAIInsights);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExpiry, setFilterExpiry] = useState('all');
  const [filterSupplier, setFilterSupplier] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('daysRemaining');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showDisposalModal, setShowDisposalModal] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [viewMode, setViewMode] = useState<'timeline' | 'barchart' | 'list'>('list');

  // Filter and search batches
  useEffect(() => {
    let filtered = batches.filter(batch => {
      const matchesSearch = batch.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           batch.batchNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesExpiry = filterExpiry === 'all' || 
                           (filterExpiry === 'expired' && batch.daysRemaining < 0) ||
                           (filterExpiry === '30days' && batch.daysRemaining >= 0 && batch.daysRemaining <= 30) ||
                           (filterExpiry === '60days' && batch.daysRemaining > 30 && batch.daysRemaining <= 60) ||
                           (filterExpiry === '90days' && batch.daysRemaining > 60 && batch.daysRemaining <= 90);
      const matchesSupplier = filterSupplier === 'all' || batch.supplier === filterSupplier;
      const matchesCategory = filterCategory === 'all' || batch.category === filterCategory;
      return matchesSearch && matchesExpiry && matchesSupplier && matchesCategory;
    });

    // Sort batches
    filtered.sort((a, b) => {
      const aValue = a[sortBy as keyof Batch];
      const bValue = b[sortBy as keyof Batch];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

    setFilteredBatches(filtered);
  }, [batches, searchTerm, filterExpiry, filterSupplier, filterCategory, sortBy, sortDirection]);

  const getExpiryRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getDaysRemainingColor = (days: number) => {
    if (days < 0) return 'text-[var(--c-error-600)]';
    if (days <= 30) return 'text-[var(--c-warning-600)]';
    if (days <= 60) return 'text-[var(--c-warning-500)]';
    return 'text-[var(--c-accent-600)]';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'expired': return 'destructive';
      case 'quarantined': return 'warning';
      case 'returned': return 'info';
      case 'disposed': return 'default';
      default: return 'default';
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const quarantineBatch = (batchId: string) => {
    setBatches(prev => prev.map(batch => 
      batch.id === batchId ? { ...batch, status: 'quarantined' } : batch
    ));
  };

  const returnBatch = (batchId: string) => {
    setBatches(prev => prev.map(batch => 
      batch.id === batchId ? { ...batch, status: 'returned' } : batch
    ));
    setShowReturnModal(false);
  };

  const disposeBatch = (batchId: string) => {
    setBatches(prev => prev.map(batch => 
      batch.id === batchId ? { ...batch, status: 'disposed' } : batch
    ));
    setShowDisposalModal(false);
  };

  // Calculate summary statistics
  const totalBatches = batches.length;
  const expiring30Days = batches.filter(b => b.daysRemaining >= 0 && b.daysRemaining <= 30).length;
  const expiring60Days = batches.filter(b => b.daysRemaining > 30 && b.daysRemaining <= 60).length;
  const expired = batches.filter(b => b.daysRemaining < 0).length;
  const cleared = batches.filter(b => b.status === 'returned' || b.status === 'disposed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1">Expiry Management</h1>
          <p className="text-body mt-2">Automated tracking, detection, and reporting of near-expiry and expired medicines</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Batch
          </Button>
        </div>
      </div>

      {/* Top Section - Expiry Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { 
            title: 'Total Batches Tracked', 
            value: totalBatches, 
            subtext: 'All batches currently active',
            icon: Package,
            color: 'var(--c-primary-500)',
            bgColor: 'var(--c-primary-50)'
          },
          { 
            title: 'Expiring in 30 Days', 
            value: expiring30Days, 
            subtext: 'Require clearance or discounting',
            icon: Clock,
            color: 'var(--c-warning-500)',
            bgColor: 'var(--c-warning-50)'
          },
          { 
            title: 'Expiring in 60 Days', 
            value: expiring60Days, 
            subtext: 'Next to watch',
            icon: Timer,
            color: 'var(--c-info-500)',
            bgColor: 'var(--c-info-50)'
          },
          { 
            title: 'Already Expired', 
            value: expired, 
            subtext: 'Must be quarantined immediately',
            icon: AlertTriangle,
            color: 'var(--c-error-500)',
            bgColor: 'var(--c-error-50)'
          },
          { 
            title: 'Cleared / Returned', 
            value: cleared, 
            subtext: 'Sent back or disposed safely',
            icon: CheckCircle,
            color: 'var(--c-accent-500)',
            bgColor: 'var(--c-accent-50)'
          }
        ].map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--c-neutral-600)] uppercase tracking-wide">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold text-[var(--c-neutral-900)] mt-2">
                      {card.value}
                    </p>
                    <p className="text-sm text-[var(--c-neutral-600)] mt-1">
                      {card.subtext}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center`} style={{ backgroundColor: card.bgColor }}>
                    <card.icon className="w-6 h-6" style={{ color: card.color }} />
                  </div>
                </div>
                {/* Progress bar for expiring batches */}
                {card.title.includes('Expiring') && (
                  <div className="mt-4 w-full bg-[var(--c-neutral-200)] rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min((card.value / totalBatches) * 100, 100)}%`,
                        backgroundColor: card.color
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Middle Section - Expiry Timeline Visualization */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Expiry Timeline Visualization</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'timeline' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('timeline')}
                  >
                    Timeline
                  </Button>
                  <Button
                    variant={viewMode === 'barchart' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('barchart')}
                  >
                    Bar Chart
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    List View
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {viewMode === 'timeline' && (
                <div className="h-64 overflow-x-auto">
                  <div className="flex items-center space-x-2 min-w-max">
                    {batches.map((batch, index) => (
                      <motion.div
                        key={batch.id}
                        className="flex flex-col items-center space-y-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div
                          className={`w-4 h-4 rounded-full cursor-pointer hover:scale-125 transition-transform ${
                            batch.daysRemaining < 0 ? 'bg-[var(--c-error-500)]' :
                            batch.daysRemaining <= 30 ? 'bg-[var(--c-warning-500)]' :
                            batch.daysRemaining <= 60 ? 'bg-[var(--c-warning-400)]' :
                            'bg-[var(--c-accent-500)]'
                          }`}
                          title={`${batch.productName} | ${batch.batchNo} | Expiry: ${batch.expiryDate} | Qty: ${batch.quantity}`}
                        />
                        <span className="text-xs text-[var(--c-neutral-600)] w-16 text-center">
                          {batch.daysRemaining}d
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {viewMode === 'barchart' && (
                <div className="h-64 flex items-end space-x-2">
                  {batches.slice(0, 10).map((batch, index) => (
                    <motion.div
                      key={batch.id}
                      className="flex-1 flex flex-col items-center"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div
                        className={`w-full rounded-t transition-all duration-300 ${
                          batch.daysRemaining < 0 ? 'bg-[var(--c-error-500)]' :
                          batch.daysRemaining <= 30 ? 'bg-[var(--c-warning-500)]' :
                          batch.daysRemaining <= 60 ? 'bg-[var(--c-warning-400)]' :
                          'bg-[var(--c-accent-500)]'
                        }`}
                        style={{ height: `${Math.max((batch.daysRemaining / 120) * 200, 20)}px` }}
                      />
                      <span className="text-xs text-[var(--c-neutral-600)] mt-2 transform -rotate-45">
                        {batch.batchNo}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}

              {viewMode === 'list' && (
                <div className="space-y-4">
                  {/* Search and Filters */}
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--c-neutral-500)]" />
                        <Input
                          type="text"
                          placeholder="Search by product or batch..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <select
                        value={filterExpiry}
                        onChange={(e) => setFilterExpiry(e.target.value)}
                        className="px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--c-primary-500)] focus:border-transparent"
                      >
                        <option value="all">All Expiry</option>
                        <option value="expired">Expired</option>
                        <option value="30days">Next 30 Days</option>
                        <option value="60days">Next 60 Days</option>
                        <option value="90days">Next 90 Days</option>
                      </select>
                      <select
                        value={filterSupplier}
                        onChange={(e) => setFilterSupplier(e.target.value)}
                        className="px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--c-primary-500)] focus:border-transparent"
                      >
                        <option value="all">All Suppliers</option>
                        <option value="Abbott">Abbott</option>
                        <option value="Getz Pharma">Getz Pharma</option>
                        <option value="PharmaCorp">PharmaCorp</option>
                        <option value="HealthPlus">HealthPlus</option>
                      </select>
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        More Filters
                      </Button>
                    </div>
                  </div>

                  {/* Expiry Tracker Table */}
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>#</TableHead>
                          <TableHead>Product Name</TableHead>
                          <TableHead>Batch No.</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Expiry Date</TableHead>
                          <TableHead>Days Remaining</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Supplier</TableHead>
                          <TableHead>Purchase Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredBatches.map((batch, index) => (
                          <TableRow key={batch.id} interactive>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{batch.productName}</p>
                                <p className="text-sm text-[var(--c-neutral-600)]">Cost: ${batch.cost}</p>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-sm">{batch.batchNo}</TableCell>
                            <TableCell>
                              <Badge variant="outline" size="sm">{batch.category}</Badge>
                            </TableCell>
                            <TableCell>{batch.expiryDate}</TableCell>
                            <TableCell>
                              <span className={`font-medium ${getDaysRemainingColor(batch.daysRemaining)}`}>
                                {batch.daysRemaining < 0 ? 'Expired' : `${batch.daysRemaining} days`}
                              </span>
                            </TableCell>
                            <TableCell>{batch.quantity}</TableCell>
                            <TableCell>{batch.supplier}</TableCell>
                            <TableCell>{batch.purchaseDate}</TableCell>
                            <TableCell>
                              <Badge variant={getStatusColor(batch.status) as any}>
                                {batch.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-1"
                                  onClick={() => quarantineBatch(batch.id)}
                                  title="Quarantine Batch"
                                >
                                  <AlertTriangle className="w-4 h-4 text-[var(--c-warning-600)]" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-1"
                                  onClick={() => {
                                    setSelectedBatch(batch);
                                    setShowReturnModal(true);
                                  }}
                                  title="Return to Supplier"
                                >
                                  <RotateCcw className="w-4 h-4 text-[var(--c-info-600)]" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-1"
                                  onClick={() => {
                                    setSelectedBatch(batch);
                                    setShowDisposalModal(true);
                                  }}
                                  title="Dispose"
                                >
                                  <Trash2 className="w-4 h-4 text-[var(--c-error-600)]" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="p-1"
                                  title="View Purchase Record"
                                >
                                  <FileText className="w-4 h-4 text-[var(--c-neutral-600)]" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Section - Alerts & Quick Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-4">
            {/* Live Expiry Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Live Expiry Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      className="p-3 border border-[var(--c-neutral-200)] rounded-lg cursor-pointer hover:bg-[var(--c-neutral-50)] transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center space-x-2">
                        <Badge variant={getAlertColor(alert.severity) as any} size="sm">
                          {alert.severity}
                        </Badge>
                        <span className="text-sm font-medium">{alert.message}</span>
                      </div>
                      <p className="text-xs text-[var(--c-neutral-600)] mt-1">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="w-4 h-4 mr-2" />
                    Show Expiring &lt; 30 Days
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Show Expired
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Show Controlled Drugs
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingDown className="w-4 h-4 mr-2" />
                    Show Discounted Clearance
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="w-4 h-4 mr-2" />
                    Generate Expiry Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Auto-Reorder Suggestion
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Disposal Summary
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Section - AI Dashboard & Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>AI Expiry Insights</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowAIInsights(true)}>
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <motion.div
                  key={insight.id}
                  className="p-4 border border-[var(--c-neutral-200)] rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[var(--c-primary-100)] rounded-lg flex items-center justify-center">
                      <Brain className="w-4 h-4 text-[var(--c-primary-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-sm">{insight.title}</h4>
                        <Badge variant="info" size="sm">{insight.confidence}%</Badge>
                      </div>
                      <p className="text-sm text-[var(--c-neutral-700)] mb-2">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--c-neutral-600)]">{insight.category}</span>
                        {insight.actionable && (
                          <Button size="sm" variant="outline">
                            <Target className="w-3 h-3 mr-1" />
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expiry Risk by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5" />
              <span>Expiry Risk by Category</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-[var(--c-neutral-50)] rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-[var(--c-neutral-400)] mx-auto mb-2" />
                <p className="text-sm text-[var(--c-neutral-500)]">Expiry Risk Chart</p>
                <p className="text-xs text-[var(--c-neutral-400)]">Category-wise expiry analysis</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {[
                { category: 'Antibiotics', percentage: 30, color: 'var(--c-error-500)' },
                { category: 'Analgesics', percentage: 25, color: 'var(--c-warning-500)' },
                { category: 'Vitamins', percentage: 10, color: 'var(--c-info-500)' },
                { category: 'Cardiovascular', percentage: 15, color: 'var(--c-primary-500)' },
                { category: 'Others', percentage: 20, color: 'var(--c-neutral-500)' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-[var(--c-neutral-700)]">{item.category}</span>
                  </div>
                  <span className="text-sm font-medium">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {showReturnModal && selectedBatch && (
        <ReturnModal
          batch={selectedBatch}
          onClose={() => setShowReturnModal(false)}
          onConfirm={returnBatch}
        />
      )}

      {showDisposalModal && selectedBatch && (
        <DisposalModal
          batch={selectedBatch}
          onClose={() => setShowDisposalModal(false)}
          onConfirm={disposeBatch}
        />
      )}

      {showAIInsights && (
        <AIInsightsModal
          insights={aiInsights}
          onClose={() => setShowAIInsights(false)}
        />
      )}
    </div>
  );
};

// Return Modal Component
const ReturnModal: React.FC<{
  batch: Batch;
  onClose: () => void;
  onConfirm: (batchId: string) => void;
}> = ({ batch, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    quantity: batch.quantity,
    reason: 'near-expiry',
    expectedRefund: batch.cost,
    notes: ''
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[var(--c-surface)] rounded-xl shadow-xl max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="p-6 border-b border-[var(--c-neutral-200)]">
          <h2 className="text-h2">Return to Supplier</h2>
          <p className="text-body mt-2">Return batch {batch.batchNo} to {batch.supplier}</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={batch.productName}
                disabled
                className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg bg-[var(--c-neutral-50)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
                Batch No.
              </label>
              <input
                type="text"
                value={batch.batchNo}
                disabled
                className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg bg-[var(--c-neutral-50)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
                Supplier Name
              </label>
              <input
                type="text"
                value={batch.supplier}
                disabled
                className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg bg-[var(--c-neutral-50)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={batch.expiryDate}
                disabled
                className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg bg-[var(--c-neutral-50)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
                Quantity to Return
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--c-primary-500)] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
                Return Reason
              </label>
              <select
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--c-primary-500)] focus:border-transparent"
              >
                <option value="near-expiry">Near Expiry</option>
                <option value="wrong-supply">Wrong Supply</option>
                <option value="damaged">Damaged</option>
                <option value="recall">Product Recall</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
                Expected Refund
              </label>
              <input
                type="number"
                value={formData.expectedRefund}
                onChange={(e) => setFormData({...formData, expectedRefund: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--c-primary-500)] focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--c-primary-500)] focus:border-transparent"
              rows={3}
              placeholder="Additional notes about this return"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => onConfirm(batch.id)}>
              Confirm Return
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Disposal Modal Component
const DisposalModal: React.FC<{
  batch: Batch;
  onClose: () => void;
  onConfirm: (batchId: string) => void;
}> = ({ batch, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    quantity: batch.quantity,
    disposalMethod: 'incineration',
    witnessName: '',
    disposalDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[var(--c-surface)] rounded-xl shadow-xl max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="p-6 border-b border-[var(--c-error-200)] bg-[var(--c-error-50)]">
          <h2 className="text-h2 text-[var(--c-error-800)]">Disposal Record Form</h2>
          <p className="text-body mt-2 text-[var(--c-error-700)]">
            Record safe disposal of expired drugs - This action is irreversible
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={batch.productName}
                disabled
                className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg bg-[var(--c-neutral-50)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
                Batch No.
              </label>
              <input
                type="text"
                value={batch.batchNo}
                disabled
                className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg bg-[var(--c-neutral-50)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={batch.expiryDate}
                disabled
                className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg bg-[var(--c-neutral-50)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
                Quantity Disposed
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--c-primary-500)] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
                Disposal Method
              </label>
              <select
                value={formData.disposalMethod}
                onChange={(e) => setFormData({...formData, disposalMethod: e.target.value})}
                className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--c-primary-500)] focus:border-transparent"
              >
                <option value="incineration">Incineration</option>
                <option value="chemical-neutralization">Chemical Neutralization</option>
                <option value="waste-agency">Official Waste Agency</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
                Witness / Supervisor Name
              </label>
              <input
                type="text"
                value={formData.witnessName}
                onChange={(e) => setFormData({...formData, witnessName: e.target.value})}
                className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--c-primary-500)] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
                Disposal Date
              </label>
              <input
                type="date"
                value={formData.disposalDate}
                onChange={(e) => setFormData({...formData, disposalDate: e.target.value})}
                className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--c-primary-500)] focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--c-primary-500)] focus:border-transparent"
              rows={3}
              placeholder="Additional notes about disposal process"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
              Disposal Certificate
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--c-primary-500)] focus:border-transparent"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => onConfirm(batch.id)}>
              Confirm Disposal
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// AI Insights Modal Component
const AIInsightsModal: React.FC<{
  insights: AIInsight[];
  onClose: () => void;
}> = ({ insights, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[var(--c-surface)] rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="p-6 border-b border-[var(--c-neutral-200)]">
          <h2 className="text-h2">AI Expiry Insights & Analytics</h2>
          <p className="text-body mt-2">Predictive analytics based on sales velocity and expiry data</p>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
          {insights.map((insight) => (
            <Card key={insight.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[var(--c-primary-100)] rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-[var(--c-primary-600)]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-h3">{insight.title}</h3>
                      <Badge variant="info">{insight.confidence}% confidence</Badge>
                      <Badge variant="outline">{insight.category}</Badge>
                    </div>
                    <p className="text-body mb-4">{insight.description}</p>
                    {insight.actionable && (
                      <div className="flex space-x-3">
                        <Button>
                          <Target className="w-4 h-4 mr-2" />
                          Implement Recommendation
                        </Button>
                        <Button variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          Generate Report
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="p-6 border-t border-[var(--c-neutral-200)] flex justify-end">
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ExpiryManagement;
