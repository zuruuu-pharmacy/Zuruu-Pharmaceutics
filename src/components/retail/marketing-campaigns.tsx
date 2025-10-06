"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Megaphone, Target, Users, TrendingUp, TrendingDown, BarChart3, PieChart, LineChart, Activity,
  Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings, Bell, Zap, Shield, Star,
  Heart, Award, Database, Network, Cpu, Brain, RefreshCw, RotateCcw, Calendar, Clock, CheckCircle,
  XCircle, AlertTriangle, ArrowUp, ArrowDown, Minus, Percent, Tag, DollarSign, Mail, Phone,
  MapPin, ShoppingCart, Package, User, CheckSquare, Square, Play, Pause, Square as SquareIcon,
  Send, Share2, MessageSquare, Image, Video, FileText, Printer, Globe, Wifi, Smartphone
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

// Marketing campaign data simulation
const campaigns = [
  {
    id: 'CAMP001',
    name: 'Summer Health Promotion',
    type: 'Email Marketing',
    status: 'Active',
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    budget: 5000,
    spent: 3200,
    targetAudience: 'All Customers',
    reach: 12500,
    impressions: 45000,
    clicks: 1250,
    conversions: 89,
    conversionRate: 7.12,
    costPerClick: 2.56,
    returnOnInvestment: 245,
    description: 'Promoting summer health products and wellness services',
    channels: ['Email', 'Social Media', 'SMS'],
    creative: {
      subject: 'Summer Health Special - 20% Off All Vitamins',
      preview: 'Boost your summer wellness with our premium vitamin collection...',
      image: '/api/placeholder/300/200'
    },
    performance: {
      openRate: 24.5,
      clickRate: 7.8,
      conversionRate: 7.12,
      unsubscribeRate: 0.8
    }
  },
  {
    id: 'CAMP002',
    name: 'Prescription Reminder Campaign',
    type: 'SMS Marketing',
    status: 'Active',
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    budget: 2000,
    spent: 1450,
    targetAudience: 'Prescription Customers',
    reach: 8500,
    impressions: 8500,
    clicks: 680,
    conversions: 156,
    conversionRate: 22.94,
    costPerClick: 2.13,
    returnOnInvestment: 180,
    description: 'Automated prescription refill reminders via SMS',
    channels: ['SMS'],
    creative: {
      subject: 'Prescription Refill Reminder',
      preview: 'Your prescription is ready for refill. Click here to order...',
      image: '/api/placeholder/300/200'
    },
    performance: {
      openRate: 95.2,
      clickRate: 8.0,
      conversionRate: 22.94,
      unsubscribeRate: 0.2
    }
  },
  {
    id: 'CAMP003',
    name: 'Loyalty Program Launch',
    type: 'Social Media',
    status: 'Completed',
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    budget: 8000,
    spent: 7800,
    targetAudience: 'New Customers',
    reach: 25000,
    impressions: 125000,
    clicks: 3500,
    conversions: 420,
    conversionRate: 12.0,
    costPerClick: 2.23,
    returnOnInvestment: 320,
    description: 'Launch of new loyalty program with exclusive benefits',
    channels: ['Facebook', 'Instagram', 'Google Ads'],
    creative: {
      subject: 'Join Our Loyalty Program - Earn Points on Every Purchase',
      preview: 'Get exclusive rewards and discounts with our new loyalty program...',
      image: '/api/placeholder/300/200'
    },
    performance: {
      openRate: 18.7,
      clickRate: 2.8,
      conversionRate: 12.0,
      unsubscribeRate: 1.2
    }
  },
  {
    id: 'CAMP004',
    name: 'Seasonal Flu Prevention',
    type: 'Email Marketing',
    status: 'Scheduled',
    startDate: '2024-02-01',
    endDate: '2024-04-01',
    budget: 3000,
    spent: 0,
    targetAudience: 'Health-Conscious Customers',
    reach: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    conversionRate: 0,
    costPerClick: 0,
    returnOnInvestment: 0,
    description: 'Promoting flu prevention products and vaccination services',
    channels: ['Email', 'Website'],
    creative: {
      subject: 'Stay Protected This Flu Season',
      preview: 'Get your flu shot and stock up on prevention products...',
      image: '/api/placeholder/300/200'
    },
    performance: {
      openRate: 0,
      clickRate: 0,
      conversionRate: 0,
      unsubscribeRate: 0
    }
  }
];

const audienceSegments = [
  { name: 'All Customers', count: 15000, percentage: 100 },
  { name: 'Prescription Customers', count: 8500, percentage: 56.7 },
  { name: 'Loyalty Members', count: 6200, percentage: 41.3 },
  { name: 'New Customers', count: 2800, percentage: 18.7 },
  { name: 'Health-Conscious', count: 4500, percentage: 30.0 }
];

const campaignMetrics = {
  totalCampaigns: campaigns.length,
  activeCampaigns: campaigns.filter(c => c.status === 'Active').length,
  totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
  totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
  totalReach: campaigns.reduce((sum, c) => sum + c.reach, 0),
  totalConversions: campaigns.reduce((sum, c) => sum + c.conversions, 0),
  averageROI: campaigns.filter(c => c.returnOnInvestment > 0).reduce((sum, c) => sum + c.returnOnInvestment, 0) / campaigns.filter(c => c.returnOnInvestment > 0).length,
  totalImpressions: campaigns.reduce((sum, c) => sum + c.impressions, 0)
};

const performanceData = [
  { month: 'Jan', campaigns: 3, reach: 25000, conversions: 245, revenue: 12500 },
  { month: 'Feb', campaigns: 4, reach: 32000, conversions: 312, revenue: 15600 },
  { month: 'Mar', campaigns: 5, reach: 41000, conversions: 389, revenue: 19450 },
  { month: 'Apr', campaigns: 6, reach: 48000, conversions: 456, revenue: 22800 },
  { month: 'May', campaigns: 7, reach: 55000, conversions: 523, revenue: 26150 },
  { month: 'Jun', campaigns: 8, reach: 62000, conversions: 590, revenue: 29500 }
];

export default function MarketingCampaigns() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('campaigns');
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [showCampaignForm, setShowCampaignForm] = useState(false);

  // Filter campaigns
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || campaign.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || campaign.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'Paused': return 'bg-orange-100 text-orange-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Email Marketing': return <Mail className="w-4 h-4 text-blue-600" />;
      case 'SMS Marketing': return <MessageSquare className="w-4 h-4 text-green-600" />;
      case 'Social Media': return <Share2 className="w-4 h-4 text-purple-600" />;
      case 'Google Ads': return <Globe className="w-4 h-4 text-red-600" />;
      default: return <Megaphone className="w-4 h-4 text-gray-600" />;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'Email': return <Mail className="w-4 h-4 text-blue-600" />;
      case 'SMS': return <MessageSquare className="w-4 h-4 text-green-600" />;
      case 'Facebook': return <Share2 className="w-4 h-4 text-blue-600" />;
      case 'Instagram': return <Image className="w-4 h-4 text-pink-600" />;
      case 'Google Ads': return <Globe className="w-4 h-4 text-red-600" />;
      case 'Website': return <Globe className="w-4 h-4 text-gray-600" />;
      default: return <Megaphone className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Marketing Campaign Center
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive campaign management and audience targeting</p>
        </div>
          <div className="flex items-center space-x-4">
          <Button
              onClick={() => setShowCampaignForm(true)}
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
                <Plus className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            <Button
              variant="outline"
              className="border-pink-200 text-pink-600 hover:bg-pink-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
                </Button>
            <Button
              variant="outline"
              className="border-pink-200 text-pink-600 hover:bg-pink-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
                </Button>
        </div>
      </div>

        {/* Campaign Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Campaigns',
              value: campaignMetrics.totalCampaigns.toString(),
              change: '+15.3%',
              trend: 'up',
              icon: Megaphone,
              color: 'from-pink-500 to-rose-500'
            },
            {
              title: 'Active Campaigns',
              value: campaignMetrics.activeCampaigns.toString(),
              change: '+8.7%',
              trend: 'up',
              icon: Play,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Total Reach',
              value: campaignMetrics.totalReach.toLocaleString(),
              change: '+22.1%',
              trend: 'up',
              icon: Users,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Total Conversions',
              value: campaignMetrics.totalConversions.toString(),
              change: '+18.9%',
              trend: 'up',
              icon: Target,
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
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Megaphone className="w-5 h-5 text-pink-600" />
                    <span>Marketing Campaigns</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                />
              </div>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                        <SelectItem value="Email Marketing">Email Marketing</SelectItem>
                        <SelectItem value="SMS Marketing">SMS Marketing</SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                        <SelectItem value="Google Ads">Google Ads</SelectItem>
                </SelectContent>
              </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCampaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedCampaign(campaign)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                          {getTypeIcon(campaign.type)}
                  </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                      {campaign.type}
                    </Badge>
                  </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">{campaign.targetAudience}</span>
                            <span className="text-sm text-gray-600">{campaign.startDate} - {campaign.endDate}</span>
                            <span className="text-sm text-gray-600">ROI: {campaign.returnOnInvestment}%</span>
                </div>
                          <div className="flex items-center space-x-2 mt-2">
                            {campaign.channels.map((channel, channelIndex) => (
                              <div key={channelIndex} className="flex items-center space-x-1">
                                {getChannelIcon(channel)}
                                <span className="text-xs text-gray-600">{channel}</span>
                  </div>
                            ))}
                  </div>
                  </div>
                </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{campaign.reach.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Reach</p>
                  </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{campaign.conversions}</p>
                          <p className="text-sm text-gray-600">Conversions</p>
                </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{campaign.conversionRate}%</p>
                          <p className="text-sm text-gray-600">Rate</p>
                  </div>
                        <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                        setSelectedCampaign(campaign);
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

          <TabsContent value="audience" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span>Audience Segments</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {audienceSegments.map((segment, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{segment.name}</p>
                            <p className="text-sm text-gray-600">{segment.count.toLocaleString()} customers</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{segment.percentage}%</p>
                          <Progress value={segment.percentage} className="w-20 h-2" />
                        </div>
          </motion.div>
        ))}
      </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <span>Targeting Options</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label>Demographics</Label>
                <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="age-18-25" />
                          <Label htmlFor="age-18-25">Age 18-25</Label>
                  </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="age-26-35" />
                          <Label htmlFor="age-26-35">Age 26-35</Label>
                  </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="age-36-50" />
                          <Label htmlFor="age-36-50">Age 36-50</Label>
                  </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="age-50-plus" />
                          <Label htmlFor="age-50-plus">Age 50+</Label>
                  </div>
                </div>
              </div>
                    <div className="space-y-3">
                      <Label>Behavior</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="frequent-buyers" />
                          <Label htmlFor="frequent-buyers">Frequent Buyers</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="prescription-users" />
                          <Label htmlFor="prescription-users">Prescription Users</Label>
                          </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="loyalty-members" />
                          <Label htmlFor="loyalty-members">Loyalty Members</Label>
                          </div>
                          </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5 text-blue-600" />
                    <span>Campaign Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="reach" stroke="#3b82f6" strokeWidth={3} />
                      <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <span>Channel Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { channel: 'Email', performance: 85, color: 'bg-blue-500' },
                      { channel: 'SMS', performance: 92, color: 'bg-green-500' },
                      { channel: 'Social Media', performance: 78, color: 'bg-purple-500' },
                      { channel: 'Google Ads', performance: 88, color: 'bg-red-500' }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900">{item.channel}</span>
                          <span className="font-semibold">{item.performance}%</span>
                        </div>
                        <Progress value={item.performance} className="h-2" />
                      </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Key Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Open Rate</span>
                      <span className="font-bold text-green-600">24.5%</span>
                          </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Click Rate</span>
                      <span className="font-bold text-blue-600">7.8%</span>
                          </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Conversion</span>
                      <span className="font-bold text-purple-600">12.3%</span>
                          </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cost Per Click</span>
                      <span className="font-bold text-orange-600">$2.45</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span>Budget Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Budget</span>
                      <span className="font-bold">${campaignMetrics.totalBudget.toLocaleString()}</span>
                          </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Spent</span>
                      <span className="font-bold">${campaignMetrics.totalSpent.toLocaleString()}</span>
                          </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Remaining Budget</span>
                      <span className="font-bold text-green-600">${(campaignMetrics.totalBudget - campaignMetrics.totalSpent).toLocaleString()}</span>
                          </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Budget Utilization</span>
                      <span className="font-bold text-blue-600">{((campaignMetrics.totalSpent / campaignMetrics.totalBudget) * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    <span>ROI Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average ROI</span>
                      <span className="font-bold text-green-600">{campaignMetrics.averageROI.toFixed(1)}%</span>
                          </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Best Performing</span>
                      <span className="font-bold text-blue-600">Loyalty Program</span>
                          </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Revenue</span>
                      <span className="font-bold text-green-600">$45,200</span>
                          </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Profit Margin</span>
                      <span className="font-bold text-purple-600">68.5%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
        </Tabs>

        {/* Campaign Detail Modal */}
        <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Megaphone className="w-5 h-5 text-pink-600" />
                <span>Campaign Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedCampaign && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center">
                    {getTypeIcon(selectedCampaign.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedCampaign.name}</h2>
                      <Badge className={getStatusColor(selectedCampaign.status)}>
                        {selectedCampaign.status}
                      </Badge>
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        {selectedCampaign.type}
                      </Badge>
                    </div>
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Target Audience</Label>
                        <p className="font-semibold">{selectedCampaign.targetAudience}</p>
                      </div>
                      <div>
                        <Label>Duration</Label>
                        <p className="font-semibold">{selectedCampaign.startDate} - {selectedCampaign.endDate}</p>
                      </div>
                      <div>
                        <Label>Budget</Label>
                        <p className="font-semibold">${selectedCampaign.budget.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label>Spent</Label>
                        <p className="font-semibold">${selectedCampaign.spent.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label>Description</Label>
                      <p className="font-semibold">{selectedCampaign.description}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reach:</span>
                        <span className="font-semibold">{selectedCampaign.reach.toLocaleString()}</span>
                      </div>
                          <div className="flex justify-between">
                        <span className="text-gray-600">Impressions:</span>
                        <span className="font-semibold">{selectedCampaign.impressions.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                        <span className="text-gray-600">Clicks:</span>
                        <span className="font-semibold">{selectedCampaign.clicks.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                        <span className="text-gray-600">Conversions:</span>
                        <span className="font-semibold">{selectedCampaign.conversions}</span>
                          </div>
                          <div className="flex justify-between">
                        <span className="text-gray-600">Conversion Rate:</span>
                        <span className="font-semibold text-green-600">{selectedCampaign.conversionRate}%</span>
                          </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ROI:</span>
                        <span className="font-semibold text-green-600">{selectedCampaign.returnOnInvestment}%</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Creative Assets</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label>Subject Line</Label>
                        <p className="font-semibold">{selectedCampaign.creative.subject}</p>
                          </div>
                      <div>
                        <Label>Preview Text</Label>
                        <p className="font-semibold">{selectedCampaign.creative.preview}</p>
                          </div>
                      <div>
                        <Label>Channels</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedCampaign.channels.map((channel: string, index: number) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                              {channel}
                            </Badge>
                          ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedCampaign(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Campaign
                  </Button>
                </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

        {/* Create Campaign Modal */}
        <Dialog open={showCampaignForm} onOpenChange={setShowCampaignForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-pink-600" />
                <span>Create New Campaign</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input id="name" placeholder="Enter campaign name" />
                </div>
                <div>
                  <Label htmlFor="type">Campaign Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Email Marketing">Email Marketing</SelectItem>
                      <SelectItem value="SMS Marketing">SMS Marketing</SelectItem>
                      <SelectItem value="Social Media">Social Media</SelectItem>
                      <SelectItem value="Google Ads">Google Ads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="budget">Budget</Label>
                  <Input id="budget" type="number" placeholder="Enter budget" />
                </div>
                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Customers">All Customers</SelectItem>
                      <SelectItem value="Prescription Customers">Prescription Customers</SelectItem>
                      <SelectItem value="Loyalty Members">Loyalty Members</SelectItem>
                      <SelectItem value="New Customers">New Customers</SelectItem>
                      <SelectItem value="Health-Conscious">Health-Conscious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter campaign description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCampaignForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
