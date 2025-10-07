"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Clock, Users, User, Plus, Edit, Trash2, Eye, Download, Upload,
  Settings, Bell, Target, Zap, Activity, BarChart3, TrendingUp, TrendingDown,
  ArrowUp, ArrowDown, CheckCircle, XCircle, AlertTriangle, Shield, Star,
  Heart, Award, MapPin, Phone, Mail, Search, Filter, RefreshCw, RotateCcw,
  Database, Network, Cpu, Brain, Activity as ActivityIcon, FileText, Printer,
  ArrowLeft, ArrowRight
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

// Staff and scheduling data simulation
const staffMembers = [
  {
    id: 'S001',
    name: 'Dr. Sarah Johnson',
    role: 'Pharmacist',
    department: 'Pharmacy',
    email: 'sarah.johnson@pharmacy.com',
    phone: '+1 (555) 123-4567',
    hireDate: '2022-01-15',
    status: 'Active',
    hourlyRate: 45.00,
    maxHours: 40,
    skills: ['Prescription Management', 'Drug Interactions', 'Patient Counseling'],
    certifications: ['PharmD', 'BCPS'],
    availability: {
      monday: { start: '08:00', end: '17:00' },
      tuesday: { start: '08:00', end: '17:00' },
      wednesday: { start: '08:00', end: '17:00' },
      thursday: { start: '08:00', end: '17:00' },
      friday: { start: '08:00', end: '17:00' },
      saturday: { start: '09:00', end: '15:00' },
      sunday: { start: '10:00', end: '14:00' }
    },
    currentHours: 38,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'S002',
    name: 'Mike Chen',
    role: 'Pharmacy Technician',
    department: 'Pharmacy',
    email: 'mike.chen@pharmacy.com',
    phone: '+1 (555) 234-5678',
    hireDate: '2022-03-20',
    status: 'Active',
    hourlyRate: 22.00,
    maxHours: 40,
    skills: ['Inventory Management', 'Customer Service', 'Prescription Processing'],
    certifications: ['CPhT'],
    availability: {
      monday: { start: '09:00', end: '18:00' },
      tuesday: { start: '09:00', end: '18:00' },
      wednesday: { start: '09:00', end: '18:00' },
      thursday: { start: '09:00', end: '18:00' },
      friday: { start: '09:00', end: '18:00' },
      saturday: { start: '10:00', end: '16:00' },
      sunday: { start: '11:00', end: '15:00' }
    },
    currentHours: 35,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'S003',
    name: 'Emily Rodriguez',
    role: 'Cashier',
    department: 'Retail',
    email: 'emily.rodriguez@pharmacy.com',
    phone: '+1 (555) 345-6789',
    hireDate: '2023-06-10',
    status: 'Active',
    hourlyRate: 18.00,
    maxHours: 30,
    skills: ['Customer Service', 'Point of Sale', 'Cash Handling'],
    certifications: [],
    availability: {
      monday: { start: '10:00', end: '19:00' },
      tuesday: { start: '10:00', end: '19:00' },
      wednesday: { start: '10:00', end: '19:00' },
      thursday: { start: '10:00', end: '19:00' },
      friday: { start: '10:00', end: '19:00' },
      saturday: { start: '11:00', end: '17:00' },
      sunday: { start: '12:00', end: '16:00' }
    },
    currentHours: 28,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'S004',
    name: 'David Kim',
    role: 'Inventory Specialist',
    department: 'Warehouse',
    email: 'david.kim@pharmacy.com',
    phone: '+1 (555) 456-7890',
    hireDate: '2023-08-05',
    status: 'Active',
    hourlyRate: 20.00,
    maxHours: 40,
    skills: ['Inventory Management', 'Stock Control', 'Warehouse Operations'],
    certifications: ['Warehouse Management'],
    availability: {
      monday: { start: '07:00', end: '16:00' },
      tuesday: { start: '07:00', end: '16:00' },
      wednesday: { start: '07:00', end: '16:00' },
      thursday: { start: '07:00', end: '16:00' },
      friday: { start: '07:00', end: '16:00' },
      saturday: { start: '08:00', end: '14:00' },
      sunday: { start: '09:00', end: '13:00' }
    },
    currentHours: 32,
    avatar: '/api/placeholder/40/40'
  }
];

const shifts = [
  {
    id: 'SH001',
    date: '2024-01-20',
    startTime: '08:00',
    endTime: '17:00',
    position: 'Pharmacist',
    staffId: 'S001',
    staffName: 'Dr. Sarah Johnson',
    status: 'Scheduled',
    notes: 'Regular shift'
  },
  {
    id: 'SH002',
    date: '2024-01-20',
    startTime: '09:00',
    endTime: '18:00',
    position: 'Pharmacy Technician',
    staffId: 'S002',
    staffName: 'Mike Chen',
    status: 'Scheduled',
    notes: 'Regular shift'
  },
  {
    id: 'SH003',
    date: '2024-01-20',
    startTime: '10:00',
    endTime: '19:00',
    position: 'Cashier',
    staffId: 'S003',
    staffName: 'Emily Rodriguez',
    status: 'Scheduled',
    notes: 'Regular shift'
  },
  {
    id: 'SH004',
    date: '2024-01-21',
    startTime: '08:00',
    endTime: '17:00',
    position: 'Pharmacist',
    staffId: 'S001',
    staffName: 'Dr. Sarah Johnson',
    status: 'Confirmed',
    notes: 'Regular shift'
  },
  {
    id: 'SH005',
    date: '2024-01-21',
    startTime: '09:00',
    endTime: '18:00',
    position: 'Pharmacy Technician',
    staffId: 'S002',
    staffName: 'Mike Chen',
    status: 'Pending',
    notes: 'Coverage needed'
  }
];

const timeOffRequests = [
  {
    id: 'TOR001',
    staffId: 'S001',
    staffName: 'Dr. Sarah Johnson',
    startDate: '2024-01-25',
    endDate: '2024-01-27',
    type: 'Vacation',
    status: 'Approved',
    reason: 'Family vacation',
    submittedDate: '2024-01-10'
  },
  {
    id: 'TOR002',
    staffId: 'S003',
    staffName: 'Emily Rodriguez',
    startDate: '2024-01-22',
    endDate: '2024-01-22',
    type: 'Sick Leave',
    status: 'Pending',
    reason: 'Medical appointment',
    submittedDate: '2024-01-15'
  }
];

export default function StaffScheduling() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('schedule');
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [showStaffForm, setShowStaffForm] = useState(false);
  const [showShiftForm, setShowShiftForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Filter staff
  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || staff.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || staff.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getShiftStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeOffStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Denied': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeOffTypeColor = (type: string) => {
    switch (type) {
      case 'Vacation': return 'bg-blue-100 text-blue-800';
      case 'Sick Leave': return 'bg-red-100 text-red-800';
      case 'Personal': return 'bg-purple-100 text-purple-800';
      case 'Emergency': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getWeekDates = (date: Date) => {
    const week = [];
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates(currentDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Staff Scheduling & Management
            </h1>
            <p className="text-gray-600 mt-2">Team coordination and shift optimization</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowStaffForm(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Staff
            </Button>
            <Button
              onClick={() => setShowShiftForm(true)}
              variant="outline"
              className="border-amber-200 text-amber-600 hover:bg-amber-50"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Shift
            </Button>
            <Button
              variant="outline"
              className="border-amber-200 text-amber-600 hover:bg-amber-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Staff Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Staff',
              value: staffMembers.length.toString(),
              change: '+2.5%',
              trend: 'up',
              icon: Users,
              color: 'from-amber-500 to-orange-500'
            },
            {
              title: 'Active Staff',
              value: staffMembers.filter(s => s.status === 'Active').length.toString(),
              change: '+5.1%',
              trend: 'up',
              icon: CheckCircle,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Scheduled Shifts',
              value: shifts.filter(s => s.status === 'Scheduled').length.toString(),
              change: '+12.3%',
              trend: 'up',
              icon: Calendar,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Pending Requests',
              value: timeOffRequests.filter(r => r.status === 'Pending').length.toString(),
              change: '-8.7%',
              trend: 'down',
              icon: Bell,
              color: 'from-yellow-500 to-orange-500'
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
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="timeoff">Time Off</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-amber-600" />
                    <span>Weekly Schedule</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000))}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous Week
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentDate(new Date())}
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000))}
                    >
                      Next Week
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-semibold">Staff</th>
                        {weekDates.map((date, index) => (
                          <th key={index} className="text-center p-4 font-semibold">
                            <div className="text-sm text-gray-600">
                              {date.toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                            <div className="text-lg font-bold">
                              {date.getDate()}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {staffMembers.map((staff, index) => (
                        <tr key={staff.id} className="border-b">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-amber-600" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{staff.name}</p>
                                <p className="text-sm text-gray-600">{staff.role}</p>
                              </div>
                            </div>
                          </td>
                          {weekDates.map((date, dayIndex) => {
                            const dayShifts = shifts.filter(shift => 
                              shift.staffId === staff.id && 
                              shift.date === date.toISOString().split('T')[0]
                            );
                            return (
                              <td key={dayIndex} className="p-4 text-center">
                                {dayShifts.map((shift, shiftIndex) => (
                                  <div key={shiftIndex} className="mb-2">
                                    <Badge className={getShiftStatusColor(shift.status)}>
                                      {shift.startTime} - {shift.endTime}
                                    </Badge>
                                    <p className="text-xs text-gray-600 mt-1">{shift.position}</p>
                                  </div>
                                ))}
                                {dayShifts.length === 0 && (
                                  <span className="text-gray-400 text-sm">Off</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-amber-600" />
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
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="Pharmacist">Pharmacist</SelectItem>
                        <SelectItem value="Pharmacy Technician">Pharmacy Technician</SelectItem>
                        <SelectItem value="Cashier">Cashier</SelectItem>
                        <SelectItem value="Inventory Specialist">Inventory Specialist</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="On Leave">On Leave</SelectItem>
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
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{staff.name}</h3>
                            <Badge className={getStatusColor(staff.status)}>
                              {staff.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">{staff.role}</span>
                            <span className="text-sm text-gray-600">{staff.department}</span>
                            <span className="text-sm text-gray-600">${staff.hourlyRate}/hr</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{staff.currentHours}h</p>
                          <p className="text-sm text-gray-600">This week</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{staff.skills.length}</p>
                          <p className="text-sm text-gray-600">Skills</p>
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

          <TabsContent value="timeoff" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-amber-600" />
                  <span>Time Off Requests</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeOffRequests.map((request, index) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{request.staffName}</h3>
                            <Badge className={getTimeOffStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                            <Badge className={getTimeOffTypeColor(request.type)}>
                              {request.type}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">
                              {formatDate(request.startDate)} - {formatDate(request.endDate)}
                            </span>
                            <span className="text-sm text-gray-600">Reason: {request.reason}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{request.submittedDate}</p>
                          <p className="text-sm text-gray-600">Submitted</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 border-green-200 hover:bg-green-50"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>Staff Utilization</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {staffMembers.map((staff, index) => (
                      <div key={staff.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900">{staff.name}</span>
                          <span className="text-sm text-gray-600">{staff.currentHours}/{staff.maxHours}h</span>
                        </div>
                        <Progress value={(staff.currentHours / staff.maxHours) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Hours per Week</span>
                      <span className="font-bold">36.2h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Overtime Hours</span>
                      <span className="font-bold text-orange-600">12.5h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Schedule Adherence</span>
                      <span className="font-bold text-green-600">94.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Time Off Requests</span>
                      <span className="font-bold">8</span>
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
                <User className="w-5 h-5 text-amber-600" />
                <span>Staff Profile</span>
              </DialogTitle>
            </DialogHeader>
            {selectedStaff && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedStaff.name}</h2>
                      <Badge className={getStatusColor(selectedStaff.status)}>
                        {selectedStaff.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Role</Label>
                        <p className="font-semibold">{selectedStaff.role}</p>
                      </div>
                      <div>
                        <Label>Department</Label>
                        <p className="font-semibold">{selectedStaff.department}</p>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <p className="font-semibold">{selectedStaff.email}</p>
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <p className="font-semibold">{selectedStaff.phone}</p>
                      </div>
                      <div>
                        <Label>Hourly Rate</Label>
                        <p className="font-semibold">${selectedStaff.hourlyRate}</p>
                      </div>
                      <div>
                        <Label>Current Hours</Label>
                        <p className="font-semibold">{selectedStaff.currentHours}/{selectedStaff.maxHours}h</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Skills & Certifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label>Skills</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedStaff.skills.map((skill: string, index: number) => (
                            <Badge key={index} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label>Certifications</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedStaff.certifications.map((cert: string, index: number) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Availability</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(selectedStaff.availability).map(([day, schedule]) => (
                          <div key={day} className="flex justify-between items-center">
                            <span className="font-medium capitalize">{day}</span>
                            <span className="text-sm text-gray-600">
                              {(schedule as any).start} - {(schedule as any).end}
                            </span>
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
                    Edit Profile
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Staff Modal */}
        <Dialog open={showStaffForm} onOpenChange={setShowStaffForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-amber-600" />
                <span>Add New Staff Member</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pharmacist">Pharmacist</SelectItem>
                      <SelectItem value="Pharmacy Technician">Pharmacy Technician</SelectItem>
                      <SelectItem value="Cashier">Cashier</SelectItem>
                      <SelectItem value="Inventory Specialist">Inventory Specialist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate</Label>
                  <Input id="hourlyRate" type="number" placeholder="Enter hourly rate" />
                </div>
                <div>
                  <Label htmlFor="maxHours">Max Hours per Week</Label>
                  <Input id="maxHours" type="number" placeholder="Enter max hours" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowStaffForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Staff Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Schedule Shift Modal */}
        <Dialog open={showShiftForm} onOpenChange={setShowShiftForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                <span>Schedule New Shift</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="staff">Staff Member</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select staff member" />
                    </SelectTrigger>
                    <SelectContent>
                      {staffMembers.map((staff) => (
                        <SelectItem key={staff.id} value={staff.id}>
                          {staff.name} - {staff.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input id="startTime" type="time" />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input id="endTime" type="time" />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" placeholder="Enter position" />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Enter shift notes" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowShiftForm(false)}>
                Cancel
              </Button>
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Shift
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}