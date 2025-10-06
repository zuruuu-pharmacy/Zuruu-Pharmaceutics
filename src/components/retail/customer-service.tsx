"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Headphones, MessageSquare, Phone, Mail, Clock, User, Star, Heart, Award,
  Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings, Bell,
  Database, Network, Cpu, Brain, RefreshCw, RotateCcw, Calendar, CheckCircle,
  XCircle, AlertTriangle, ArrowUp, ArrowDown, Minus, Percent, Tag, MapPin,
  ShoppingCart, Package, CheckSquare, Square, Play, Pause, Square as SquareIcon,
  Send, Share2, Image, Video, FileText, Printer, Globe, Wifi, Smartphone,
  Layers, Archive, Truck, Box, Users, Megaphone, Building, Clipboard, BookOpen,
  Scale, Gavel, Lock, Key, CheckSquare as CheckSquareIcon, Square as SquareIcon2,
  BarChart3, PieChart, LineChart, Activity, Zap, Shield, Target, TrendingUp,
  TrendingDown, DollarSign, Activity as ActivityIcon, AlertTriangle as AlertIcon,
  CheckCircle as CheckIcon, XCircle as XIcon, Clock as ClockIcon, User as UserIcon,
  Star as StarIcon, Heart as HeartIcon, Award as AwardIcon, Search as SearchIcon,
  Filter as FilterIcon, Plus as PlusIcon, Edit as EditIcon, Trash2 as TrashIcon,
  Eye as EyeIcon, Download as DownloadIcon, Upload as UploadIcon, Settings as SettingsIcon,
  Bell as BellIcon, Database as DatabaseIcon, Network as NetworkIcon, Cpu as CpuIcon,
  Brain as BrainIcon, RefreshCw as RefreshIcon, RotateCcw as RotateIcon, Calendar as CalendarIcon,
  CheckCircle as CheckCircleIcon, XCircle as XCircleIcon, AlertTriangle as AlertTriangleIcon,
  ArrowUp as ArrowUpIcon, ArrowDown as ArrowDownIcon, Minus as MinusIcon, Percent as PercentIcon,
  Tag as TagIcon, MapPin as MapPinIcon, ShoppingCart as ShoppingCartIcon, Package as PackageIcon,
  CheckSquare as CheckSquareIcon2, Square as SquareIcon3, Play as PlayIcon, Pause as PauseIcon,
  Square as SquareIcon4, Send as SendIcon, Share2 as Share2Icon, Image as ImageIcon,
  Video as VideoIcon, FileText as FileTextIcon, Printer as PrinterIcon, Globe as GlobeIcon,
  Wifi as WifiIcon, Smartphone as SmartphoneIcon, Layers as LayersIcon, Archive as ArchiveIcon,
  Truck as TruckIcon, Box as BoxIcon, Users as UsersIcon, Megaphone as MegaphoneIcon,
  Building as BuildingIcon, Clipboard as ClipboardIcon, BookOpen as BookOpenIcon,
  Scale as ScaleIcon, Gavel as GavelIcon, Lock as LockIcon, Key as KeyIcon,
  CheckSquare as CheckSquareIcon3, Square as SquareIcon5, BarChart3 as BarChart3Icon,
  PieChart as PieChartIcon, LineChart as LineChartIcon, Activity as ActivityIcon2
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
import { LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Customer service data simulation
const supportTickets = [
  {
    id: 'TKT001',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.johnson@email.com',
    subject: 'Prescription Refill Issue',
    priority: 'High',
    status: 'Open',
    category: 'Prescription',
    assignedTo: 'Dr. Smith',
    createdAt: '2024-01-15T10:30:00Z',
    lastUpdated: '2024-01-15T14:45:00Z',
    description: 'Customer unable to refill prescription online. Error message appears when trying to process payment.',
    messages: [
      {
        id: 1,
        sender: 'Sarah Johnson',
        message: 'I\'m trying to refill my prescription but getting an error message. Can you help?',
        timestamp: '2024-01-15T10:30:00Z',
        type: 'customer'
      },
      {
        id: 2,
        sender: 'Dr. Smith',
        message: 'I\'m looking into this issue. Can you tell me what error message you\'re seeing?',
        timestamp: '2024-01-15T11:15:00Z',
        type: 'agent'
      }
    ],
    resolution: null,
    satisfaction: null
  },
  {
    id: 'TKT002',
    customerName: 'Michael Chen',
    customerEmail: 'michael.chen@email.com',
    subject: 'Delivery Delay',
    priority: 'Medium',
    status: 'In Progress',
    category: 'Delivery',
    assignedTo: 'Lisa Wang',
    createdAt: '2024-01-14T16:20:00Z',
    lastUpdated: '2024-01-15T09:30:00Z',
    description: 'Customer\'s medication delivery is delayed. Expected delivery was yesterday.',
    messages: [
      {
        id: 1,
        sender: 'Michael Chen',
        message: 'My medication was supposed to arrive yesterday but it\'s still not here. What\'s the status?',
        timestamp: '2024-01-14T16:20:00Z',
        type: 'customer'
      },
      {
        id: 2,
        sender: 'Lisa Wang',
        message: 'I\'m checking with our delivery team. I\'ll get back to you within 30 minutes.',
        timestamp: '2024-01-14T16:45:00Z',
        type: 'agent'
      }
    ],
    resolution: null,
    satisfaction: null
  },
  {
    id: 'TKT003',
    customerName: 'Emily Rodriguez',
    customerEmail: 'emily.rodriguez@email.com',
    subject: 'Insurance Coverage',
    priority: 'Low',
    status: 'Resolved',
    category: 'Insurance',
    assignedTo: 'John Davis',
    createdAt: '2024-01-13T09:15:00Z',
    lastUpdated: '2024-01-14T15:20:00Z',
    description: 'Customer asking about insurance coverage for specific medication.',
    messages: [
      {
        id: 1,
        sender: 'Emily Rodriguez',
        message: 'Does my insurance cover this medication? I\'m not sure about the coverage.',
        timestamp: '2024-01-13T09:15:00Z',
        type: 'customer'
      },
      {
        id: 2,
        sender: 'John Davis',
        message: 'I\'ll check your insurance coverage for that medication. Give me a moment.',
        timestamp: '2024-01-13T09:30:00Z',
        type: 'agent'
      },
      {
        id: 3,
        sender: 'John Davis',
        message: 'Your insurance covers 80% of the cost. You\'ll only pay $15 out of pocket.',
        timestamp: '2024-01-13T09:45:00Z',
        type: 'agent'
      }
    ],
    resolution: 'Insurance coverage confirmed. Customer satisfied with the information provided.',
    satisfaction: 5
  }
];

const serviceMetrics = {
  totalTickets: 156,
  openTickets: 23,
  resolvedTickets: 133,
  averageResponseTime: 2.5,
  customerSatisfaction: 4.7,
  firstCallResolution: 78,
  escalationRate: 12,
  averageResolutionTime: 4.2
};

const agentPerformance = [
  {
    name: 'Dr. Smith',
    ticketsResolved: 45,
    averageRating: 4.8,
    responseTime: 1.2,
    customerSatisfaction: 4.9,
    specialization: 'Prescription Issues'
  },
  {
    name: 'Lisa Wang',
    ticketsResolved: 38,
    averageRating: 4.6,
    responseTime: 2.1,
    customerSatisfaction: 4.7,
    specialization: 'Delivery & Logistics'
  },
  {
    name: 'John Davis',
    ticketsResolved: 42,
    averageRating: 4.7,
    responseTime: 1.8,
    customerSatisfaction: 4.8,
    specialization: 'Insurance & Billing'
  }
];

const satisfactionData = [
  { month: 'Jan', satisfaction: 4.5, responseTime: 3.2, resolutionTime: 5.1 },
  { month: 'Feb', satisfaction: 4.6, responseTime: 2.8, resolutionTime: 4.8 },
  { month: 'Mar', satisfaction: 4.7, responseTime: 2.5, resolutionTime: 4.5 },
  { month: 'Apr', satisfaction: 4.8, responseTime: 2.2, resolutionTime: 4.2 },
  { month: 'May', satisfaction: 4.7, responseTime: 2.1, resolutionTime: 4.0 },
  { month: 'Jun', satisfaction: 4.9, responseTime: 1.9, resolutionTime: 3.8 }
];

export default function CustomerService() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('tickets');
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  // Filter tickets
  const filteredTickets = supportTickets.filter(ticket => {
    const matchesSearch = ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || ticket.status === selectedStatus;
    const matchesPriority = selectedPriority === 'All' || ticket.priority === selectedPriority;
    const matchesCategory = selectedCategory === 'All' || ticket.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-orange-100 text-orange-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSatisfactionColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Customer Service Center
            </h1>
            <p className="text-gray-600 mt-2">Support ticket management and customer communication</p>
        </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowNewTicket(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
          <Button
            variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <Download className="w-4 h-4 mr-2" />
              Export
          </Button>
            <Button
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
                </Button>
        </div>
      </div>

        {/* Service Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Tickets',
              value: serviceMetrics.totalTickets.toString(),
              change: '+12.5%',
              trend: 'up',
              icon: MessageSquare,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Open Tickets',
              value: serviceMetrics.openTickets.toString(),
              change: '-8.3%',
              trend: 'down',
              icon: Clock,
              color: 'from-orange-500 to-red-500'
            },
            {
              title: 'Avg Response Time',
              value: `${serviceMetrics.averageResponseTime}h`,
              change: '-15.2%',
              trend: 'down',
              icon: Zap,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Customer Satisfaction',
              value: serviceMetrics.customerSatisfaction.toString(),
              change: '+5.1%',
              trend: 'up',
              icon: Star,
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
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <span>Support Tickets</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                />
              </div>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
                    <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Priority</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                        <SelectItem value="Prescription">Prescription</SelectItem>
                        <SelectItem value="Delivery">Delivery</SelectItem>
                        <SelectItem value="Insurance">Insurance</SelectItem>
                  <SelectItem value="Billing">Billing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                            <Badge className={getPriorityColor(ticket.priority)}>
                              {ticket.priority}
                            </Badge>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                      {ticket.category}
                    </Badge>
                  </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">Customer: {ticket.customerName}</span>
                            <span className="text-sm text-gray-600">Assigned: {ticket.assignedTo}</span>
                            <span className="text-sm text-gray-600">Created: {formatTimeAgo(ticket.createdAt)}</span>
                  </div>
                  </div>
                </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{ticket.messages.length}</p>
                          <p className="text-sm text-gray-600">Messages</p>
                  </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatTimeAgo(ticket.lastUpdated)}</p>
                          <p className="text-sm text-gray-600">Last Update</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                        setSelectedTicket(ticket);
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

          <TabsContent value="agents" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Agent Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentPerformance.map((agent, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {agent.specialization}
                    </Badge>
                  </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">Tickets Resolved: {agent.ticketsResolved}</span>
                            <span className="text-sm text-gray-600">Avg Rating: {agent.averageRating}/5</span>
                            <span className="text-sm text-gray-600">Response Time: {agent.responseTime}h</span>
                  </div>
                </div>
              </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className={`font-semibold ${getSatisfactionColor(agent.customerSatisfaction)}`}>
                            {agent.customerSatisfaction}/5
                          </p>
                          <p className="text-sm text-gray-600">Satisfaction</p>
                          </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{agent.responseTime}h</p>
                          <p className="text-sm text-gray-600">Response Time</p>
                  </div>
                          <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
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
                
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-blue-600" />
                    <span>Service Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={satisfactionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="satisfaction" stroke="#3b82f6" strokeWidth={3} />
                      <Line type="monotone" dataKey="responseTime" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="resolutionTime" stroke="#f59e0b" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                      </CardContent>
                    </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">First Call Resolution</span>
                      <span className="font-bold text-green-600">{serviceMetrics.firstCallResolution}%</span>
                            </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Escalation Rate</span>
                      <span className="font-bold text-orange-600">{serviceMetrics.escalationRate}%</span>
                          </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Resolution Time</span>
                      <span className="font-bold text-blue-600">{serviceMetrics.averageResolutionTime}h</span>
                          </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Customer Satisfaction</span>
                      <span className="font-bold text-purple-600">{serviceMetrics.customerSatisfaction}/5</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
          <TabsContent value="settings" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  <span>Service Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="autoAssign">Auto-Assign Tickets</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled">Enabled</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="sla">SLA Response Time (hours)</Label>
                      <Input id="sla" type="number" placeholder="24" />
                    </div>
                    <div>
                      <Label htmlFor="escalation">Escalation Time (hours)</Label>
                      <Input id="escalation" type="number" placeholder="48" />
                    </div>
                    <div>
                      <Label htmlFor="notifications">Email Notifications</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled">Enabled</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button>
                      <Settings className="w-4 h-4 mr-2" />
                      Save Settings
                    </Button>
                    <Button variant="outline">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                          </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Ticket Detail Modal */}
        <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>Ticket Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedTicket && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-10 h-10 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedTicket.subject}</h2>
                      <Badge className={getPriorityColor(selectedTicket.priority)}>
                        {selectedTicket.priority}
                      </Badge>
                      <Badge className={getStatusColor(selectedTicket.status)}>
                        {selectedTicket.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Customer</Label>
                        <p className="font-semibold">{selectedTicket.customerName}</p>
                      </div>
                      <div>
                        <Label>Assigned To</Label>
                        <p className="font-semibold">{selectedTicket.assignedTo}</p>
                      </div>
                      <div>
                        <Label>Category</Label>
                        <p className="font-semibold">{selectedTicket.category}</p>
                      </div>
                      <div>
                        <Label>Created</Label>
                        <p className="font-semibold">{formatTimeAgo(selectedTicket.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedTicket.description}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Conversation</h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {selectedTicket.messages.map((message: any, index: number) => (
                      <div key={index} className={`flex ${message.type === 'customer' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs p-3 rounded-lg ${
                          message.type === 'customer' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.message}</p>
                          <p className="text-xs opacity-70 mt-1">{formatTimeAgo(message.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedTicket(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Update Status
                  </Button>
                </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

        {/* New Ticket Modal */}
        <Dialog open={showNewTicket} onOpenChange={setShowNewTicket}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-blue-600" />
                <span>Create New Ticket</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input id="customerName" placeholder="Enter customer name" />
                </div>
                <div>
                  <Label htmlFor="customerEmail">Customer Email</Label>
                  <Input id="customerEmail" type="email" placeholder="Enter customer email" />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Enter ticket subject" />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Prescription">Prescription</SelectItem>
                      <SelectItem value="Delivery">Delivery</SelectItem>
                      <SelectItem value="Insurance">Insurance</SelectItem>
                      <SelectItem value="Billing">Billing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="assignedTo">Assign To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select agent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                      <SelectItem value="Lisa Wang">Lisa Wang</SelectItem>
                      <SelectItem value="John Davis">John Davis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter ticket description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewTicket(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Ticket
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
