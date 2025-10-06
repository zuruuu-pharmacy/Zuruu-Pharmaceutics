"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Calendar, Clock, UserCheck, UserPlus, UserMinus, UserX, UserSearch,
  TrendingUp, TrendingDown, ArrowUp, ArrowDown, Minus, Percent, Tag,
  MapPin, ShoppingCart, Package, Globe, Wifi, Layers, Archive, Truck,
  Box, Megaphone, Building, Clipboard, BookOpen, Scale, Gavel, Lock,
  Key, CheckSquare, Square, Play, Pause, Send, Share2, Image, Video,
  FileText, Printer, BarChart3, PieChart, LineChart, Activity as ActivityIcon,
  Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings, Bell,
  Target, Zap, RefreshCw, RotateCcw, QrCode, ScanLine, Barcode, Database,
  Network, Cpu, Brain, Activity as ActivityIcon2, TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon, ArrowUp as ArrowUpIcon, ArrowDown as ArrowDownIcon,
  Minus as MinusIcon, Percent as PercentIcon, Tag as TagIcon, MapPin as MapPinIcon,
  ShoppingCart as ShoppingCartIcon, Package as PackageIcon, Globe as GlobeIcon,
  Wifi as WifiIcon, Layers as LayersIcon, Archive as ArchiveIcon, Truck as TruckIcon,
  Box as BoxIcon, Megaphone as MegaphoneIcon, Building as BuildingIcon,
  Clipboard as ClipboardIcon, BookOpen as BookOpenIcon, Scale as ScaleIcon,
  Gavel as GavelIcon, Lock as LockIcon, Key as KeyIcon, CheckSquare as CheckSquareIcon,
  Square as SquareIcon, Play as PlayIcon, Pause as PauseIcon, Send as SendIcon,
  Share2 as Share2Icon, Image as ImageIcon, Video as VideoIcon, FileText as FileTextIcon,
  Printer as PrinterIcon, BarChart3 as BarChart3Icon, PieChart as PieChartIcon,
  LineChart as LineChartIcon, Activity as ActivityIcon3, CheckCircle, XCircle,
  AlertTriangle as AlertTriangleIcon, Clock as ClockIcon, Calendar as CalendarIcon, User, Users as UsersIcon,
  DollarSign, Star, Award, Phone, Mail, MessageSquare, Camera, Mic, Headphones,
  Volume2, VolumeX, Wifi as WifiIcon2, Battery, Signal, Bluetooth, Hospital,
  UserCheck as UserCheckIcon, UserPlus as UserPlusIcon, UserMinus as UserMinusIcon, UserX as UserXIcon, UserSearch as UserSearchIcon,
  Map, Navigation, Compass, Home, Building2, Building as BuildingIcon2,
  Ambulance, Siren, Zap as ZapIcon, Flame, Skull, Cross, Heart,
  Shield, Stethoscope, AlertTriangle, Activity, Clock as ClockIcon2, Users as UsersIcon2, Target, Pill, Syringe,
  Microscope, TestTube, Beaker, Droplet, Thermometer, Bandage, X, Plus as PlusIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Staff scheduling data simulation
const staffMembers = [
  {
    id: 'STAFF001',
    name: 'Dr. Sarah Thompson',
    role: 'Emergency Physician',
    department: 'Emergency Medicine',
    status: 'On Duty',
    shift: 'Day Shift',
    startTime: '07:00',
    endTime: '19:00',
    experience: '8 years',
    certifications: ['ACLS', 'PALS', 'ATLS'],
    patientLoad: 12,
    efficiency: 94.5,
    lastBreak: '2024-01-15T12:00:00Z',
    nextBreak: '2024-01-15T16:00:00Z',
    phone: '(555) 123-4567',
    email: 'sarah.thompson@hospital.com',
    location: 'Emergency Department',
    skills: ['Trauma Care', 'Critical Care', 'Emergency Procedures']
  },
  {
    id: 'STAFF002',
    name: 'Nurse Jennifer Lee',
    role: 'Registered Nurse',
    department: 'Intensive Care Unit',
    status: 'On Duty',
    shift: 'Night Shift',
    startTime: '19:00',
    endTime: '07:00',
    experience: '5 years',
    certifications: ['CCRN', 'BLS', 'ACLS'],
    patientLoad: 4,
    efficiency: 96.2,
    lastBreak: '2024-01-15T02:00:00Z',
    nextBreak: '2024-01-15T06:00:00Z',
    phone: '(555) 234-5678',
    email: 'jennifer.lee@hospital.com',
    location: 'ICU Ward 2',
    skills: ['Critical Care', 'Ventilator Management', 'Medication Administration']
  },
  {
    id: 'STAFF003',
    name: 'Dr. Michael Chen',
    role: 'Cardiologist',
    department: 'Cardiology',
    status: 'Off Duty',
    shift: 'Day Shift',
    startTime: '08:00',
    endTime: '17:00',
    experience: '12 years',
    certifications: ['FACC', 'Echocardiography', 'Interventional Cardiology'],
    patientLoad: 8,
    efficiency: 98.1,
    lastBreak: '2024-01-14T15:00:00Z',
    nextBreak: '2024-01-16T12:00:00Z',
    phone: '(555) 345-6789',
    email: 'michael.chen@hospital.com',
    location: 'Cardiology Department',
    skills: ['Cardiac Procedures', 'Echocardiography', 'Patient Consultation']
  }
];

const scheduleData = [
  { day: 'Mon', dayShift: 45, nightShift: 32, totalStaff: 77 },
  { day: 'Tue', dayShift: 48, nightShift: 35, totalStaff: 83 },
  { day: 'Wed', dayShift: 42, nightShift: 30, totalStaff: 72 },
  { day: 'Thu', dayShift: 50, nightShift: 38, totalStaff: 88 },
  { day: 'Fri', dayShift: 46, nightShift: 33, totalStaff: 79 },
  { day: 'Sat', dayShift: 35, nightShift: 25, totalStaff: 60 },
  { day: 'Sun', dayShift: 32, nightShift: 22, totalStaff: 54 }
];

const staffMetrics = {
  totalStaff: 156,
  onDutyStaff: 89,
  offDutyStaff: 67,
  averageEfficiency: 94.8,
  shiftCoverage: 92.5,
  overtimeHours: 45,
  sickLeave: 8,
  vacationDays: 23
};

const departmentData = [
  {
    name: 'Emergency Medicine',
    totalStaff: 24,
    onDuty: 18,
    efficiency: 96.2,
    patientLoad: 45,
    color: 'from-red-500 to-pink-500'
  },
  {
    name: 'Intensive Care Unit',
    totalStaff: 32,
    onDuty: 28,
    efficiency: 94.8,
    patientLoad: 28,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Cardiology',
    totalStaff: 18,
    onDuty: 12,
    efficiency: 97.5,
    patientLoad: 22,
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Pediatrics',
    totalStaff: 22,
    onDuty: 16,
    efficiency: 93.2,
    patientLoad: 18,
    color: 'from-yellow-500 to-orange-500'
  }
];

const shiftData = [
  { shift: 'Day Shift', staff: 45, efficiency: 95.2, patientLoad: 120 },
  { shift: 'Night Shift', staff: 32, efficiency: 94.1, patientLoad: 85 },
  { shift: 'Evening Shift', staff: 38, efficiency: 96.8, patientLoad: 95 }
];

export default function StaffSchedulingSystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('staff');
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [showStaffForm, setShowStaffForm] = useState(false);

  // Filter staff
  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || staff.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'All' || staff.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Duty': return 'bg-green-100 text-green-800';
      case 'Off Duty': return 'bg-gray-100 text-gray-800';
      case 'On Break': return 'bg-yellow-100 text-yellow-800';
      case 'Sick Leave': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case 'Day Shift': return 'bg-blue-100 text-blue-800';
      case 'Night Shift': return 'bg-purple-100 text-purple-800';
      case 'Evening Shift': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Staff Scheduling & Management
            </h1>
            <p className="text-gray-600 mt-2">Optimized staff allocation and shift management</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowStaffForm(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Staff
            </Button>
            <Button
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
            <Button
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Staff Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Staff',
              value: staffMetrics.totalStaff.toString(),
              change: '+5.2%',
              trend: 'up',
              icon: Users,
              color: 'from-orange-500 to-amber-500'
            },
            {
              title: 'On Duty',
              value: staffMetrics.onDutyStaff.toString(),
              change: '+8.3%',
              trend: 'up',
              icon: UserCheck,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Avg Efficiency',
              value: `${staffMetrics.averageEfficiency}%`,
              change: '+2.1%',
              trend: 'up',
              icon: Target,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Shift Coverage',
              value: `${staffMetrics.shiftCoverage}%`,
              change: '+1.5%',
              trend: 'up',
              icon: Clock,
              color: 'from-purple-500 to-violet-500'
            }
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-5`} />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                      <div className="flex items-center mt-2">
                        {metric.trend === 'up' ? (
                          <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full bg-gradient-to-br ${metric.color} text-white`}>
                      <metric.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="staff" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-orange-600" />
                    <span>Staff Directory</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search staff..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Departments</SelectItem>
                        <SelectItem value="Emergency Medicine">Emergency</SelectItem>
                        <SelectItem value="Intensive Care Unit">ICU</SelectItem>
                        <SelectItem value="Cardiology">Cardiology</SelectItem>
                        <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="On Duty">On Duty</SelectItem>
                        <SelectItem value="Off Duty">Off Duty</SelectItem>
                        <SelectItem value="On Break">On Break</SelectItem>
                        <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStaff.map((staff, index) => (
                    <motion.div
                      key={staff.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedStaff(staff)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{staff.name}</h3>
                            <Badge className={getStatusColor(staff.status)}>
                              {staff.status}
                            </Badge>
                            <Badge className={getShiftColor(staff.shift)}>
                              {staff.shift}
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {staff.department}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{staff.role} | Experience: {staff.experience}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Shift: {staff.startTime} - {staff.endTime}</span>
                            <span className="text-sm text-gray-600">Location: {staff.location}</span>
                            <span className="text-sm text-gray-600">Patient Load: {staff.patientLoad}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{staff.efficiency}%</p>
                          <p className="text-sm text-gray-600">Efficiency</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{staff.patientLoad}</p>
                          <p className="text-sm text-gray-600">Patients</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{staff.certifications.length}</p>
                          <p className="text-sm text-gray-600">Certifications</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStaff(staff);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <span>Weekly Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={scheduleData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="dayShift" fill="#f97316" />
                    <Bar dataKey="nightShift" fill="#8b5cf6" />
                    <Bar dataKey="totalStaff" fill="#10b981" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departmentData.map((dept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Building className="w-5 h-5 text-orange-600" />
                        <span>{dept.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Total Staff</span>
                          <span className="font-bold text-orange-600">{dept.totalStaff}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">On Duty</span>
                          <span className="font-bold text-green-600">{dept.onDuty}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Efficiency</span>
                          <span className="font-bold text-blue-600">{dept.efficiency}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Patient Load</span>
                          <span className="font-bold text-purple-600">{dept.patientLoad}</span>
                        </div>
                        <Progress value={dept.efficiency} className="w-full" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-orange-600" />
                    <span>Shift Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={shiftData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="staff"
                      >
                        {shiftData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#f97316' : index === 1 ? '#8b5cf6' : '#10b981'} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Staff Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Overtime Hours</span>
                      <span className="font-bold text-orange-600">{staffMetrics.overtimeHours}h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Sick Leave</span>
                      <span className="font-bold text-red-600">{staffMetrics.sickLeave} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Vacation Days</span>
                      <span className="font-bold text-blue-600">{staffMetrics.vacationDays} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Shift Coverage</span>
                      <span className="font-bold text-green-600">{staffMetrics.shiftCoverage}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Staff Detail Modal */}
        <Dialog open={!!selectedStaff} onOpenChange={() => setSelectedStaff(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-orange-600" />
                <span>Staff Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedStaff && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedStaff.name}</h2>
                      <Badge className={getStatusColor(selectedStaff.status)}>
                        {selectedStaff.status}
                      </Badge>
                      <Badge className={getShiftColor(selectedStaff.shift)}>
                        {selectedStaff.shift}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-4">{selectedStaff.role} | {selectedStaff.department}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Experience</Label>
                        <p className="font-semibold">{selectedStaff.experience}</p>
                      </div>
                      <div>
                        <Label>Shift</Label>
                        <p className="font-semibold">{selectedStaff.startTime} - {selectedStaff.endTime}</p>
                      </div>
                      <div>
                        <Label>Location</Label>
                        <p className="font-semibold">{selectedStaff.location}</p>
                      </div>
                      <div>
                        <Label>Patient Load</Label>
                        <p className="font-semibold">{selectedStaff.patientLoad}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Certifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedStaff.certifications.map((cert: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedStaff.skills.map((skill: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedStaff(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Staff
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Staff Modal */}
        <Dialog open={showStaffForm} onOpenChange={setShowStaffForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-orange-600" />
                <span>Add New Staff</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="staffName">Staff Name</Label>
                  <Input id="staffName" placeholder="Enter staff name" />
                </div>
                <div>
                  <Label htmlFor="staffRole">Role</Label>
                  <Input id="staffRole" placeholder="Enter role" />
                </div>
                <div>
                  <Label htmlFor="staffDepartment">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Emergency Medicine">Emergency Medicine</SelectItem>
                      <SelectItem value="Intensive Care Unit">ICU</SelectItem>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="staffShift">Shift</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shift" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Day Shift">Day Shift</SelectItem>
                      <SelectItem value="Night Shift">Night Shift</SelectItem>
                      <SelectItem value="Evening Shift">Evening Shift</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowStaffForm(false)}>
                Cancel
              </Button>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Staff
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
