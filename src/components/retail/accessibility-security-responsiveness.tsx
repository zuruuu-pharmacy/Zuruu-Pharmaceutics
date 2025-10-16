"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Monitor,
  Smartphone,
  Tablet,
  Shield,
  Lock,
  Unlock,
  Key,
  User,
  Clock,
  Wifi,
  WifiOff,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Plus,
  Minus,
  RotateCcw,
  Bell,
  BellOff,
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
  Maximize,
  Minimize,
  Laptop,
  Desktop,
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
  User as UserIcon,
  Phone,
  Mail,
  Calendar,
  Clock as ClockIcon,
  CreditCard,
  Receipt,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar as CalendarIcon,
  FileText,
  Search,
  Filter,
  MoreHorizontal,
  ExternalLink,
  Copy,
  Share2,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
  X,
  Check
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

// Types and interfaces
interface AccessibilitySettings {
  highContrastMode: boolean;
  textSize: number; // 1.0 to 2.0
  reducedMotion: boolean;
  screenReaderHints: boolean;
  keyboardNavigation: boolean;
  focusVisible: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  biometricLogin: boolean;
  sessionTimeout: number; // minutes
  autoLogout: boolean;
  encryptionStatus: 'active' | 'inactive';
  lastLogin: string;
  devicesLoggedIn: DeviceInfo[];
  auditTrail: AuditEntry[];
}

interface DeviceInfo {
  id: string;
  name: string;
  type: 'desktop' | 'tablet' | 'mobile';
  lastActive: string;
  location: string;
  isCurrent: boolean;
}

interface AuditEntry {
  id: string;
  action: string;
  timestamp: string;
  ipHash: string;
  device: string;
  status: 'success' | 'failed' | 'warning';
}

interface ResponsiveSettings {
  breakpoint: 'desktop' | 'tablet' | 'mobile';
  touchOptimization: boolean;
  swipeGestures: boolean;
  lazyLoading: boolean;
  offlineMode: boolean;
  pwaSupport: boolean;
}

// Mock data
const mockAccessibilitySettings: AccessibilitySettings = {
  highContrastMode: false,
  textSize: 1.0,
  reducedMotion: false,
  screenReaderHints: true,
  keyboardNavigation: true,
  focusVisible: true
};

const mockSecuritySettings: SecuritySettings = {
  twoFactorAuth: true,
  biometricLogin: false,
  sessionTimeout: 10,
  autoLogout: true,
  encryptionStatus: 'active',
  lastLogin: '2024-01-15 14:30:25',
  devicesLoggedIn: [
    {
      id: '1',
      name: 'MacBook Pro',
      type: 'desktop',
      lastActive: '2024-01-15 14:30',
      location: 'New York, NY',
      isCurrent: true
    },
    {
      id: '2',
      name: 'iPhone 15',
      type: 'mobile',
      lastActive: '2024-01-15 12:15',
      location: 'New York, NY',
      isCurrent: false
    }
  ],
  auditTrail: [
    {
      id: '1',
      action: 'Login',
      timestamp: '2024-01-15 14:30:25',
      ipHash: 'a1b2c3d4',
      device: 'MacBook Pro',
      status: 'success'
    },
    {
      id: '2',
      action: 'View Prescriptions',
      timestamp: '2024-01-15 14:32:10',
      ipHash: 'a1b2c3d4',
      device: 'MacBook Pro',
      status: 'success'
    },
    {
      id: '3',
      action: 'Export Data',
      timestamp: '2024-01-15 14:35:45',
      ipHash: 'a1b2c3d4',
      device: 'MacBook Pro',
      status: 'success'
    }
  ]
};

const mockResponsiveSettings: ResponsiveSettings = {
  breakpoint: 'desktop',
  touchOptimization: true,
  swipeGestures: true,
  lazyLoading: true,
  offlineMode: true,
  pwaSupport: true
};

export default function AccessibilitySecurityResponsiveness() {
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>(mockAccessibilitySettings);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(mockSecuritySettings);
  const [responsiveSettings, setResponsiveSettings] = useState<ResponsiveSettings>(mockResponsiveSettings);
  const [isMobile, setIsMobile] = useState(false);
  const [showSecurityDetails, setShowSecurityDetails] = useState(false);
  const [showAuditTrail, setShowAuditTrail] = useState(false);
  const [sessionCountdown, setSessionCountdown] = useState(600); // 10 minutes in seconds
  const [isOffline, setIsOffline] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Session countdown
  useEffect(() => {
    if (securitySettings.autoLogout) {
      const timer = setInterval(() => {
        setSessionCountdown(prev => {
          if (prev <= 0) {
            // Auto logout
            alert('Session expired. Please log in again.');
            return 600;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [securitySettings.autoLogout]);

  // Offline detection
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const updateAccessibilitySetting = (key: keyof AccessibilitySettings, value: any) => {
    setAccessibilitySettings(prev => ({ ...prev, [key]: value }));
    
    // Apply settings to document
    if (key === 'highContrastMode') {
      document.documentElement.classList.toggle('high-contrast', value);
    }
    if (key === 'textSize') {
      document.documentElement.style.fontSize = `${16 * value}px`;
    }
    if (key === 'reducedMotion') {
      document.documentElement.classList.toggle('reduced-motion', value);
    }
  };

  const updateSecuritySetting = (key: keyof SecuritySettings, value: any) => {
    setSecuritySettings(prev => ({ ...prev, [key]: value }));
  };

  const updateResponsiveSetting = (key: keyof ResponsiveSettings, value: any) => {
    setResponsiveSettings(prev => ({ ...prev, [key]: value }));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'failed': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'desktop': return <Desktop className="w-4 h-4" />;
      case 'tablet': return <Tablet className="w-4 h-4" />;
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const renderAccessibilitySettings = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Accessibility Settings</h2>
        <p className="text-gray-600">Customize your experience for better usability and comfort</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* High Contrast Mode */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-100 rounded-full">
                  <Eye className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">High Contrast Mode</h3>
                  <p className="text-sm text-gray-600">Improve visibility with enhanced contrast</p>
                </div>
              </div>
              <Switch
                checked={accessibilitySettings.highContrastMode}
                onCheckedChange={(checked) => updateAccessibilitySetting('highContrastMode', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Text Size Adjustment */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-100 rounded-full">
                  <FileText className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Text Size</h3>
                  <p className="text-sm text-gray-600">Adjust text size for better readability</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateAccessibilitySetting('textSize', Math.max(0.8, accessibilitySettings.textSize - 0.1))}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="text-sm font-medium w-12 text-center">
                  {Math.round(accessibilitySettings.textSize * 100)}%
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateAccessibilitySetting('textSize', Math.min(2.0, accessibilitySettings.textSize + 0.1))}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reduced Motion */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-100 rounded-full">
                  <Activity className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Reduced Motion</h3>
                  <p className="text-sm text-gray-600">Minimize animations and transitions</p>
                </div>
              </div>
              <Switch
                checked={accessibilitySettings.reducedMotion}
                onCheckedChange={(checked) => updateAccessibilitySetting('reducedMotion', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Screen Reader Hints */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-100 rounded-full">
                  <Volume2 className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Screen Reader Hints</h3>
                  <p className="text-sm text-gray-600">Enable additional audio descriptions</p>
                </div>
              </div>
              <Switch
                checked={accessibilitySettings.screenReaderHints}
                onCheckedChange={(checked) => updateAccessibilitySetting('screenReaderHints', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Keyboard Navigation */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-100 rounded-full">
                  <Keyboard className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Keyboard Navigation</h3>
                  <p className="text-sm text-gray-600">Full keyboard accessibility support</p>
                </div>
              </div>
              <Switch
                checked={accessibilitySettings.keyboardNavigation}
                onCheckedChange={(checked) => updateAccessibilitySetting('keyboardNavigation', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Focus Visible */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-100 rounded-full">
                  <Target className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Focus Indicators</h3>
                  <p className="text-sm text-gray-600">Show visible focus rings</p>
                </div>
              </div>
              <Switch
                checked={accessibilitySettings.focusVisible}
                onCheckedChange={(checked) => updateAccessibilitySetting('focusVisible', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accessibility Preview */}
      <Card className="border-teal-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-teal-600" />
            <span>Accessibility Preview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Sample Text</h4>
              <p className="text-gray-700">
                This is how text will appear with your current accessibility settings. 
                The contrast ratio meets WCAG 2.1 AA standards for readability.
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Contrast Ratio: 4.5:1 ✓</span>
              <span>Font Size: {Math.round(accessibilitySettings.textSize * 16)}px</span>
              <span>Motion: {accessibilitySettings.reducedMotion ? 'Reduced' : 'Normal'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderSecuritySettings = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Security & Privacy</h2>
        <p className="text-gray-600">Manage your account security and data protection</p>
      </div>

      {/* Security Status */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span>Security Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm font-medium">Encryption</p>
              <p className="text-xs text-gray-600">AES-256 Active</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Key className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium">2FA</p>
              <p className="text-xs text-gray-600">{securitySettings.twoFactorAuth ? 'Enabled' : 'Disabled'}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium">Session</p>
              <p className="text-xs text-gray-600">{formatTime(sessionCountdown)} remaining</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Two-Factor Authentication */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Key className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600">Add extra security to your account</p>
                </div>
              </div>
              <Switch
                checked={securitySettings.twoFactorAuth}
                onCheckedChange={(checked) => updateSecuritySetting('twoFactorAuth', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Biometric Login */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Biometric Login</h3>
                  <p className="text-sm text-gray-600">Use fingerprint or face recognition</p>
                </div>
              </div>
              <Switch
                checked={securitySettings.biometricLogin}
                onCheckedChange={(checked) => updateSecuritySetting('biometricLogin', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Auto Logout */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Auto Logout</h3>
                  <p className="text-sm text-gray-600">Automatically log out after inactivity</p>
                </div>
              </div>
              <Switch
                checked={securitySettings.autoLogout}
                onCheckedChange={(checked) => updateSecuritySetting('autoLogout', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Session Timeout */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-100 rounded-full">
                  <Timer className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Session Timeout</h3>
                  <p className="text-sm text-gray-600">Minutes of inactivity before logout</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Slider
                  value={[securitySettings.sessionTimeout]}
                  onValueChange={(value) => updateSecuritySetting('sessionTimeout', value[0])}
                  max={60}
                  min={5}
                  step={5}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-12 text-center">
                  {securitySettings.sessionTimeout}m
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Devices & Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logged In Devices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Logged In Devices</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSecurityDetails(!showSecurityDetails)}
              >
                {showSecurityDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {securitySettings.devicesLoggedIn.map((device) => (
                <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getDeviceIcon(device.type)}
                    <div>
                      <p className="font-medium text-sm">{device.name}</p>
                      <p className="text-xs text-gray-600">{device.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">{device.lastActive}</p>
                    {device.isCurrent && (
                      <Badge className="bg-green-100 text-green-800">Current</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Audit Trail */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Activity</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAuditTrail(!showAuditTrail)}
              >
                {showAuditTrail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {securitySettings.auditTrail.slice(0, 3).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      entry.status === 'success' ? 'bg-green-500' :
                      entry.status === 'failed' ? 'bg-red-500' :
                      'bg-yellow-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-sm">{entry.action}</p>
                      <p className="text-xs text-gray-600">{entry.device}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">{entry.timestamp}</p>
                    <p className="text-xs text-gray-500">{entry.ipHash}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );

  const renderResponsiveSettings = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Device & Performance</h2>
        <p className="text-gray-600">Optimize your experience across all devices</p>
      </div>

      {/* Current Device Info */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {getDeviceIcon(isMobile ? 'mobile' : 'desktop')}
            <span>Current Device</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                {getDeviceIcon(isMobile ? 'mobile' : 'desktop')}
              </div>
              <p className="text-sm font-medium">Device Type</p>
              <p className="text-xs text-gray-600">{isMobile ? 'Mobile' : 'Desktop'}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                {isOffline ? <WifiOff className="w-6 h-6 text-red-600" /> : <Wifi className="w-6 h-6 text-green-600" />}
              </div>
              <p className="text-sm font-medium">Connection</p>
              <p className="text-xs text-gray-600">{isOffline ? 'Offline' : 'Online'}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Battery className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium">Performance</p>
              <p className="text-xs text-gray-600">Optimized</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Responsive Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Touch Optimization */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-teal-100 rounded-full">
                  <Smartphone className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Touch Optimization</h3>
                  <p className="text-sm text-gray-600">Optimize for touch interactions</p>
                </div>
              </div>
              <Switch
                checked={responsiveSettings.touchOptimization}
                onCheckedChange={(checked) => updateResponsiveSetting('touchOptimization', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Swipe Gestures */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <ArrowLeft className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Swipe Gestures</h3>
                  <p className="text-sm text-gray-600">Enable swipe navigation</p>
                </div>
              </div>
              <Switch
                checked={responsiveSettings.swipeGestures}
                onCheckedChange={(checked) => updateResponsiveSetting('swipeGestures', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Lazy Loading */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <Download className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Lazy Loading</h3>
                  <p className="text-sm text-gray-600">Load content progressively</p>
                </div>
              </div>
              <Switch
                checked={responsiveSettings.lazyLoading}
                onCheckedChange={(checked) => updateResponsiveSetting('lazyLoading', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Offline Mode */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-full">
                  <WifiOff className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Offline Mode</h3>
                  <p className="text-sm text-gray-600">Access cached data offline</p>
                </div>
              </div>
              <Switch
                checked={responsiveSettings.offlineMode}
                onCheckedChange={(checked) => updateResponsiveSetting('offlineMode', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* PWA Support */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Monitor className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">PWA Support</h3>
                  <p className="text-sm text-gray-600">Progressive Web App features</p>
                </div>
              </div>
              <Switch
                checked={responsiveSettings.pwaSupport}
                onCheckedChange={(checked) => updateResponsiveSetting('pwaSupport', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Export */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Download className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Data Export</h3>
                  <p className="text-sm text-gray-600">Download your data</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <FileText className="w-3 h-3 mr-1" />
                  PDF
                </Button>
                <Button size="sm" variant="outline">
                  <FileText className="w-3 h-3 mr-1" />
                  CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Offline Mode Banner */}
      {isOffline && (
        <motion.div
          className="bg-orange-50 border border-orange-200 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-3">
            <WifiOff className="w-5 h-5 text-orange-600" />
            <div>
              <h4 className="font-semibold text-orange-800">Offline Mode</h4>
              <p className="text-sm text-orange-700">You're viewing cached data. Some features may be limited.</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  if (isMobile) {
    return (
      <div className="space-y-6 pb-20">
        <Tabs defaultValue="accessibility" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="responsive">Device</TabsTrigger>
          </TabsList>
          
          <TabsContent value="accessibility" className="space-y-4">
            {renderAccessibilitySettings()}
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            {renderSecuritySettings()}
          </TabsContent>
          
          <TabsContent value="responsive" className="space-y-4">
            {renderResponsiveSettings()}
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="accessibility" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="responsive">Device & Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="accessibility" className="space-y-6">
          {renderAccessibilitySettings()}
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          {renderSecuritySettings()}
        </TabsContent>
        
        <TabsContent value="responsive" className="space-y-6">
          {renderResponsiveSettings()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
