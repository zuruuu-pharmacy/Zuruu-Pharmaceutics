"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  Key, 
  User, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Download, 
  Upload, 
  FileText, 
  Database, 
  Server, 
  Globe, 
  Smartphone, 
  Monitor, 
  Wifi, 
  WifiOff, 
  Activity, 
  BarChart3, 
  Calendar, 
  Bell, 
  Mail, 
  Phone, 
  MessageSquare, 
  Users, 
  UserCheck, 
  UserX, 
  Crown, 
  Star, 
  Flag, 
  Archive, 
  Trash2, 
  Edit, 
  Plus, 
  Minus, 
  Search, 
  Filter, 
  RefreshCw, 
  Zap, 
  Brain, 
  Target, 
  TrendingUp, 
  TrendingDown, 
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
  Smartphone as SmartphoneIcon, 
  Tablet, 
  Laptop, 
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
  Globe as GlobeIcon, 
  Wifi as WifiIcon, 
  Bluetooth, 
  BluetoothOff, 
  Battery,
  Plug, 
  PlugZap, 
  Power, 
  PowerOff, 
  RotateCcw, 
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
  Star as StarIcon, 
  Zap as ZapIcon, 
  Flashlight, 
  FlashlightOff, 
  Lightbulb, 
  LightbulbOff, 
  Flame, 
  Droplets, 
  Wind, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudDrizzle, 
  CloudHail, 
  CloudFog, 
  CloudSun, 
  CloudMoon, 
  Sun as SunIcon, 
  Moon as MoonIcon, 
  Sunrise, 
  Sunset, 
  Thermometer, 
  ThermometerSun, 
  ThermometerSnowflake, 
  Gauge, 
  Timer, 
  TimerOff, 
  TimerReset, 
  Clock as ClockIcon, 
  Calendar as CalendarIcon, 
  CalendarDays, 
  CalendarCheck, 
  CalendarX, 
  CalendarPlus, 
  CalendarMinus, 
  CalendarRange, 
  CalendarSearch,
  Calendar as CalendarIcon2,
  CreditCard
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface SecurityEvent {
  id: string;
  timestamp: string;
  type: 'login' | 'logout' | 'failed_login' | 'permission_change' | 'data_access' | 'system_change';
  user: string;
  ipAddress: string;
  location: string;
  device: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  status: 'success' | 'failed' | 'blocked';
}

interface ComplianceCheck {
  id: string;
  name: string;
  category: 'HIPAA' | 'GDPR' | 'SOX' | 'PCI' | 'ISO27001';
  status: 'compliant' | 'non_compliant' | 'warning' | 'pending';
  lastChecked: string;
  nextCheck: string;
  description: string;
  requirements: string[];
}

interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  users: number;
  lastModified: string;
  status: 'active' | 'inactive';
}

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  ipAddress: string;
  userAgent: string;
  result: 'success' | 'failed';
  details: string;
}

const mockSecurityEvents: SecurityEvent[] = [
  {
    id: '1',
    timestamp: '2024-01-15T10:30:00Z',
    type: 'login',
    user: 'Dr. Sarah Smith',
    ipAddress: '192.168.1.100',
    location: 'New York, NY',
    device: 'Chrome on Windows',
    severity: 'low',
    description: 'Successful login from office network',
    status: 'success'
  },
  {
    id: '2',
    timestamp: '2024-01-15T09:15:00Z',
    type: 'failed_login',
    user: 'Unknown',
    ipAddress: '203.0.113.45',
    location: 'Unknown',
    device: 'Unknown',
    severity: 'high',
    description: 'Multiple failed login attempts detected',
    status: 'blocked'
  },
  {
    id: '3',
    timestamp: '2024-01-15T08:45:00Z',
    type: 'data_access',
    user: 'Dr. John Wilson',
    ipAddress: '192.168.1.105',
    location: 'New York, NY',
    device: 'Safari on macOS',
    severity: 'medium',
    description: 'Accessed patient records for P-000123',
    status: 'success'
  }
];

const mockComplianceChecks: ComplianceCheck[] = [
  {
    id: '1',
    name: 'HIPAA Data Encryption',
    category: 'HIPAA',
    status: 'compliant',
    lastChecked: '2024-01-15T00:00:00Z',
    nextCheck: '2024-02-15T00:00:00Z',
    description: 'All patient data encrypted at rest and in transit',
    requirements: ['AES-256 encryption', 'TLS 1.3 for transit', 'Key rotation every 90 days']
  },
  {
    id: '2',
    name: 'GDPR Data Processing',
    category: 'GDPR',
    status: 'warning',
    lastChecked: '2024-01-10T00:00:00Z',
    nextCheck: '2024-02-10T00:00:00Z',
    description: 'Data processing consent management needs review',
    requirements: ['Explicit consent', 'Right to erasure', 'Data portability']
  },
  {
    id: '3',
    name: 'Access Control Audit',
    category: 'SOX',
    status: 'compliant',
    lastChecked: '2024-01-12T00:00:00Z',
    nextCheck: '2024-04-12T00:00:00Z',
    description: 'User access controls properly implemented',
    requirements: ['Role-based access', 'Regular access reviews', 'Privilege escalation controls']
  }
];

const mockUserRoles: UserRole[] = [
  {
    id: '1',
    name: 'Pharmacist',
    description: 'Full access to prescription management and patient data',
    permissions: ['view_patients', 'manage_prescriptions', 'dispense_medications', 'view_inventory'],
    users: 5,
    lastModified: '2024-01-10T00:00:00Z',
    status: 'active'
  },
  {
    id: '2',
    name: 'Pharmacy Technician',
    description: 'Limited access to inventory and basic patient information',
    permissions: ['view_inventory', 'update_stock', 'view_patient_basic'],
    users: 3,
    lastModified: '2024-01-08T00:00:00Z',
    status: 'active'
  },
  {
    id: '3',
    name: 'Administrator',
    description: 'Full system access including user management and settings',
    permissions: ['*'],
    users: 2,
    lastModified: '2024-01-05T00:00:00Z',
    status: 'active'
  }
];

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2024-01-15T10:30:00Z',
    user: 'Dr. Sarah Smith',
    action: 'DISPENSE_MEDICATION',
    resource: 'RX-0456',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    result: 'success',
    details: 'Dispensed Metformin 500mg to patient P-000123'
  },
  {
    id: '2',
    timestamp: '2024-01-15T10:25:00Z',
    user: 'Dr. Sarah Smith',
    action: 'VIEW_PATIENT_RECORD',
    resource: 'P-000123',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    result: 'success',
    details: 'Viewed patient John Doe medical history'
  },
  {
    id: '3',
    timestamp: '2024-01-15T10:20:00Z',
    user: 'Dr. Sarah Smith',
    action: 'VERIFY_PRESCRIPTION',
    resource: 'RX-0456',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    result: 'success',
    details: 'Verified prescription from Dr. John Wilson'
  }
];

const SecurityCompliance: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>(mockSecurityEvents);
  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>(mockComplianceChecks);
  const [userRoles, setUserRoles] = useState<UserRole[]>(mockUserRoles);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [showAddRole, setShowAddRole] = useState(false);
  const [showSecuritySettings, setShowSecuritySettings] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'success';
      case 'non_compliant': return 'destructive';
      case 'warning': return 'warning';
      case 'pending': return 'info';
      default: return 'default';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'login': return <User className="w-4 h-4" />;
      case 'logout': return <UserX className="w-4 h-4" />;
      case 'failed_login': return <AlertTriangle className="w-4 h-4" />;
      case 'permission_change': return <Settings className="w-4 h-4" />;
      case 'data_access': return <Database className="w-4 h-4" />;
      case 'system_change': return <Server className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getComplianceIcon = (category: string) => {
    switch (category) {
      case 'HIPAA': return <Shield className="w-5 h-5" />;
      case 'GDPR': return <Globe className="w-5 h-5" />;
      case 'SOX': return <FileText className="w-5 h-5" />;
      case 'PCI': return <CreditCard className="w-5 h-5" />;
      case 'ISO27001': return <CheckCircle className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1">Security & Compliance</h1>
          <p className="text-body mt-2">Comprehensive security monitoring, compliance management, and audit trails</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm" onClick={() => setShowSecuritySettings(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Security Settings
          </Button>
        </div>
      </div>

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Security Score', value: '94%', change: '+2%', icon: Shield, color: 'var(--c-accent-500)' },
          { title: 'Compliance Status', value: '87%', change: '+5%', icon: CheckCircle, color: 'var(--c-primary-500)' },
          { title: 'Active Threats', value: '2', change: '-1', icon: AlertTriangle, color: 'var(--c-warning-500)' },
          { title: 'Audit Events', value: '1,247', change: '+23', icon: Activity, color: 'var(--c-info-500)' }
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
            { id: 'overview', label: 'Security Overview' },
            { id: 'events', label: 'Security Events' },
            { id: 'compliance', label: 'Compliance' },
            { id: 'users', label: 'User Management' },
            { id: 'audit', label: 'Audit Logs' },
            { id: 'settings', label: 'Security Settings' }
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
            {/* Recent Security Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Recent Security Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {securityEvents.slice(0, 5).map((event) => (
                    <div key={event.id} className="flex items-center space-x-3 p-3 border border-[var(--c-neutral-200)] rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        event.severity === 'critical' || event.severity === 'high' 
                          ? 'bg-[var(--c-error-100)]' 
                          : 'bg-[var(--c-neutral-100)]'
                      }`}>
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{event.description}</p>
                        <p className="text-xs text-[var(--c-neutral-600)]">
                          {event.user} • {new Date(event.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <Badge variant={getSeverityColor(event.severity) as any} size="sm">
                        {event.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compliance Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Compliance Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {complianceChecks.map((check) => (
                    <div key={check.id} className="flex items-center space-x-3 p-3 border border-[var(--c-neutral-200)] rounded-lg">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--c-primary-100)]">
                        {getComplianceIcon(check.category)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{check.name}</p>
                        <p className="text-xs text-[var(--c-neutral-600)]">
                          {check.category} • Last checked: {new Date(check.lastChecked).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(check.status) as any} size="sm">
                        {check.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'events' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Security Events</span>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="text-sm">
                        {new Date(event.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getEventTypeIcon(event.type)}
                          <span className="capitalize">{event.type.replace('_', ' ')}</span>
                        </div>
                      </TableCell>
                      <TableCell>{event.user}</TableCell>
                      <TableCell className="font-mono text-sm">{event.ipAddress}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>
                        <Badge variant={getSeverityColor(event.severity) as any}>
                          {event.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={event.status === 'success' ? 'success' : event.status === 'blocked' ? 'destructive' : 'warning'}>
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{event.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Compliance Monitoring</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceChecks.map((check) => (
                    <div key={check.id} className="p-4 border border-[var(--c-neutral-200)] rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--c-primary-100)]">
                            {getComplianceIcon(check.category)}
                          </div>
                          <div>
                            <h4 className="font-medium">{check.name}</h4>
                            <p className="text-sm text-[var(--c-neutral-600)]">{check.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant={getStatusColor(check.status) as any}>
                            {check.status.replace('_', ' ')}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-[var(--c-neutral-700)] mb-3">{check.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-[var(--c-neutral-600)]">
                          Last checked: {new Date(check.lastChecked).toLocaleDateString()} • 
                          Next check: {new Date(check.nextCheck).toLocaleDateString()}
                        </div>
                        <div className="flex space-x-2">
                          {check.requirements.map((req, index) => (
                            <Badge key={index} variant="outline" size="sm">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'users' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>User Roles & Permissions</span>
                <Button size="sm" onClick={() => setShowAddRole(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Role
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Crown className="w-4 h-4 text-[var(--c-warning-600)]" />
                          <span className="font-medium">{role.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">{role.description}</TableCell>
                      <TableCell>
                        <Badge variant="info">{role.users} users</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.slice(0, 3).map((permission, index) => (
                            <Badge key={index} variant="outline" size="sm">
                              {permission}
                            </Badge>
                          ))}
                          {role.permissions.length > 3 && (
                            <Badge variant="outline" size="sm">
                              +{role.permissions.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(role.lastModified).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={role.status === 'active' ? 'success' : 'warning'}>
                          {role.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm" className="p-1">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-1">
                            <Eye className="w-4 h-4" />
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

        {activeTab === 'audit' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Audit Logs</span>
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Search audit logs..."
                    className="w-64"
                  />
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm">
                        {new Date(log.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>
                        <Badge variant="outline" size="sm">
                          {log.action.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{log.resource}</TableCell>
                      <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                      <TableCell>
                        <Badge variant={log.result === 'success' ? 'success' : 'destructive'}>
                          {log.result}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Authentication Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Authentication</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Multi-Factor Authentication</p>
                    <p className="text-sm text-[var(--c-neutral-600)]">Require MFA for all users</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Password Policy</p>
                    <p className="text-sm text-[var(--c-neutral-600)]">Minimum 8 characters, mixed case</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Session Timeout</p>
                    <p className="text-sm text-[var(--c-neutral-600)]">Auto-logout after 30 minutes</p>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>
              </CardContent>
            </Card>

            {/* Data Protection Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Data Protection</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Encryption</p>
                    <p className="text-sm text-[var(--c-neutral-600)]">AES-256 encryption enabled</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Backup Encryption</p>
                    <p className="text-sm text-[var(--c-neutral-600)]">All backups encrypted</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Retention</p>
                    <p className="text-sm text-[var(--c-neutral-600)]">7 years for medical records</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityCompliance;
