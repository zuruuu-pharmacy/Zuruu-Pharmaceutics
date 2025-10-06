"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift, Star, Heart, Award, Trophy, Crown, Gem, Sparkles, Target, Zap, Shield,
  Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings, Bell,
  Database, Network, Cpu, Brain, RefreshCw, RotateCcw, Calendar, Clock, CheckCircle,
  XCircle, AlertTriangle, ArrowUp, ArrowDown, Minus, Percent, Tag, DollarSign, Mail, Phone,
  MapPin, ShoppingCart, Package, User, CheckSquare, Square, Play, Pause, Square as SquareIcon,
  Send, Share2, MessageSquare, Image, Video, FileText, Printer, Globe, Wifi, Smartphone,
  Layers, Archive, Truck, Box, Users, Megaphone, Building, Clipboard, BookOpen, Scale,
  Gavel, Lock, Key, CheckSquare as CheckSquareIcon, Square as SquareIcon2, TrendingUp,
  TrendingDown, Activity, BarChart3, PieChart, LineChart
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

// Loyalty program data simulation
const loyaltyTiers = [
  {
    id: 'BRONZE',
    name: 'Bronze',
    color: '#CD7F32',
    minPoints: 0,
    maxPoints: 999,
    benefits: ['5% discount', 'Birthday reward', 'Email notifications'],
    icon: '🥉',
    memberCount: 4500,
    averageSpend: 85
  },
  {
    id: 'SILVER',
    name: 'Silver',
    color: '#C0C0C0',
    minPoints: 1000,
    maxPoints: 2499,
    benefits: ['10% discount', 'Free shipping', 'Priority support', 'Birthday reward'],
    icon: '🥈',
    memberCount: 2800,
    averageSpend: 150
  },
  {
    id: 'GOLD',
    name: 'Gold',
    color: '#FFD700',
    minPoints: 2500,
    maxPoints: 4999,
    benefits: ['15% discount', 'Free shipping', 'Priority support', 'Exclusive products', 'Birthday reward'],
    icon: '🥇',
    memberCount: 1200,
    averageSpend: 280
  },
  {
    id: 'PLATINUM',
    name: 'Platinum',
    color: '#E5E4E2',
    minPoints: 5000,
    maxPoints: 9999,
    benefits: ['20% discount', 'Free shipping', 'Priority support', 'Exclusive products', 'Personal shopper', 'Birthday reward'],
    icon: '💎',
    memberCount: 450,
    averageSpend: 450
  },
  {
    id: 'DIAMOND',
    name: 'Diamond',
    color: '#B9F2FF',
    minPoints: 10000,
    maxPoints: 99999,
    benefits: ['25% discount', 'Free shipping', 'Priority support', 'Exclusive products', 'Personal shopper', 'VIP events', 'Birthday reward'],
    icon: '💠',
    memberCount: 150,
    averageSpend: 750
  }
];

const loyaltyMembers = [
  {
    id: 'LM001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    tier: 'Gold',
    points: 3200,
    totalSpent: 2850,
    joinDate: '2022-03-15',
    lastVisit: '2024-01-15',
    totalVisits: 45,
    averageOrderValue: 95,
    favoriteCategories: ['Vitamins', 'Prescription Drugs'],
    status: 'Active',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'LM002',
    name: 'Mike Chen',
    email: 'mike.chen@email.com',
    phone: '+1 (555) 234-5678',
    tier: 'Platinum',
    points: 6800,
    totalSpent: 4200,
    joinDate: '2021-08-22',
    lastVisit: '2024-01-14',
    totalVisits: 78,
    averageOrderValue: 120,
    favoriteCategories: ['Medical Devices', 'Prescription Drugs'],
    status: 'Active',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'LM003',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '+1 (555) 345-6789',
    tier: 'Silver',
    points: 1800,
    totalSpent: 1650,
    joinDate: '2023-01-10',
    lastVisit: '2024-01-12',
    totalVisits: 28,
    averageOrderValue: 75,
    favoriteCategories: ['OTC Medications', 'Health & Wellness'],
    status: 'Active',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'LM004',
    name: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1 (555) 456-7890',
    tier: 'Diamond',
    points: 12500,
    totalSpent: 8500,
    joinDate: '2020-05-18',
    lastVisit: '2024-01-13',
    totalVisits: 125,
    averageOrderValue: 180,
    favoriteCategories: ['Prescription Drugs', 'Medical Devices', 'Vitamins'],
    status: 'Active',
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 'LM005',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@email.com',
    phone: '+1 (555) 567-8901',
    tier: 'Bronze',
    points: 450,
    totalSpent: 320,
    joinDate: '2023-11-05',
    lastVisit: '2024-01-10',
    totalVisits: 8,
    averageOrderValue: 45,
    favoriteCategories: ['OTC Medications'],
    status: 'Active',
    avatar: '/api/placeholder/40/40'
  }
];

const rewardsCatalog = [
  {
    id: 'RWD001',
    name: 'Free Shipping',
    description: 'Complimentary shipping on your next order',
    pointsRequired: 500,
    category: 'Shipping',
    value: 9.99,
    availability: 'Unlimited',
    image: '/api/placeholder/100/100'
  },
  {
    id: 'RWD002',
    name: '10% Discount',
    description: '10% off your next purchase',
    pointsRequired: 1000,
    category: 'Discount',
    value: 15.00,
    availability: 'Unlimited',
    image: '/api/placeholder/100/100'
  },
  {
    id: 'RWD003',
    name: 'Free Vitamin Sample',
    description: 'Complimentary vitamin sample pack',
    pointsRequired: 750,
    category: 'Product',
    value: 12.99,
    availability: 50,
    image: '/api/placeholder/100/100'
  },
  {
    id: 'RWD004',
    name: 'Health Consultation',
    description: 'Free 30-minute health consultation with pharmacist',
    pointsRequired: 2000,
    category: 'Service',
    value: 50.00,
    availability: 20,
    image: '/api/placeholder/100/100'
  },
  {
    id: 'RWD005',
    name: 'Premium Gift Set',
    description: 'Exclusive health and wellness gift set',
    pointsRequired: 5000,
    category: 'Product',
    value: 75.00,
    availability: 10,
    image: '/api/placeholder/100/100'
  }
];

const loyaltyMetrics = {
  totalMembers: loyaltyMembers.length,
  activeMembers: loyaltyMembers.filter(m => m.status === 'Active').length,
  totalPointsIssued: 125000,
  totalPointsRedeemed: 45000,
  averagePointsPerMember: 2500,
  redemptionRate: 36.0,
  memberRetentionRate: 87.5,
  averageSpendPerMember: 285,
  tierDistribution: {
    Bronze: 45,
    Silver: 28,
    Gold: 12,
    Platinum: 4.5,
    Diamond: 1.5
  }
};

const pointsHistory = [
  { month: 'Jan', earned: 12500, redeemed: 4500, net: 8000 },
  { month: 'Feb', earned: 13800, redeemed: 5200, net: 8600 },
  { month: 'Mar', earned: 15200, redeemed: 4800, net: 10400 },
  { month: 'Apr', earned: 16800, redeemed: 6200, net: 10600 },
  { month: 'May', earned: 14500, redeemed: 5800, net: 8700 },
  { month: 'Jun', earned: 17200, redeemed: 6500, net: 10700 }
];

export default function LoyaltyProgram() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('members');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showRewardForm, setShowRewardForm] = useState(false);

  // Filter members
  const filteredMembers = loyaltyMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = selectedTier === 'All' || member.tier === selectedTier;
    const matchesStatus = selectedStatus === 'All' || member.status === selectedStatus;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const getTierColor = (tier: string) => {
    const tierData = loyaltyTiers.find(t => t.name === tier);
    return tierData ? tierData.color : '#6B7280';
  };

  const getTierIcon = (tier: string) => {
    const tierData = loyaltyTiers.find(t => t.name === tier);
    return tierData ? tierData.icon : '⭐';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Suspended': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Shipping': return <Truck className="w-4 h-4 text-blue-600" />;
      case 'Discount': return <Percent className="w-4 h-4 text-green-600" />;
      case 'Product': return <Package className="w-4 h-4 text-purple-600" />;
      case 'Service': return <Heart className="w-4 h-4 text-red-600" />;
      default: return <Gift className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Loyalty & Rewards Program
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive customer loyalty management and rewards system</p>
        </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowRewardForm(true)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Reward
            </Button>
          <Button
            variant="outline"
              className="border-yellow-200 text-yellow-600 hover:bg-yellow-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
            <Button
              variant="outline"
              className="border-yellow-200 text-yellow-600 hover:bg-yellow-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
                </Button>
        </div>
      </div>

        {/* Loyalty Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Members',
              value: loyaltyMetrics.totalMembers.toLocaleString(),
              change: '+12.5%',
              trend: 'up',
              icon: Users,
              color: 'from-yellow-500 to-orange-500'
            },
            {
              title: 'Active Members',
              value: loyaltyMetrics.activeMembers.toLocaleString(),
              change: '+8.7%',
              trend: 'up',
              icon: Heart,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Points Issued',
              value: loyaltyMetrics.totalPointsIssued.toLocaleString(),
              change: '+15.3%',
              trend: 'up',
              icon: Star,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Redemption Rate',
              value: `${loyaltyMetrics.redemptionRate}%`,
              change: '+2.1%',
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
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="tiers">Tiers</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-yellow-600" />
                    <span>Loyalty Members</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                />
              </div>
                    <Select value={selectedTier} onValueChange={setSelectedTier}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Tiers</SelectItem>
                  <SelectItem value="Bronze">Bronze</SelectItem>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Platinum">Platinum</SelectItem>
                  <SelectItem value="Diamond">Diamond</SelectItem>
                </SelectContent>
              </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedMember(member)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-yellow-600" />
                  </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{member.name}</h3>
                            <Badge 
                              className="text-white"
                              style={{ backgroundColor: getTierColor(member.tier) }}
                            >
                              {getTierIcon(member.tier)} {member.tier}
                    </Badge>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status}
                    </Badge>
                  </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">{member.email}</span>
                            <span className="text-sm text-gray-600">{member.phone}</span>
                            <span className="text-sm text-gray-600">Joined: {member.joinDate}</span>
                </div>
                          <div className="flex items-center space-x-2 mt-2">
                            {member.favoriteCategories.map((category, catIndex) => (
                              <Badge key={catIndex} variant="outline" className="text-xs">
                                {category}
                              </Badge>
                            ))}
                  </div>
                  </div>
                </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{member.points.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Points</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${member.totalSpent.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Total Spent</p>
                  </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{member.totalVisits}</p>
                          <p className="text-sm text-gray-600">Visits</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                        setSelectedMember(member);
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

          <TabsContent value="tiers" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {loyaltyTiers.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <span className="text-2xl">{tier.icon}</span>
                          <span style={{ color: tier.color }}>{tier.name}</span>
                        </CardTitle>
                        <Badge 
                          className="text-white"
                          style={{ backgroundColor: tier.color }}
                        >
                          {tier.memberCount} members
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Points Range:</span>
                          <span className="font-semibold">{tier.minPoints.toLocaleString()} - {tier.maxPoints.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Average Spend:</span>
                          <span className="font-semibold">${tier.averageSpend}</span>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Benefits:</Label>
                          <div className="mt-2 space-y-1">
                            {tier.benefits.map((benefit, benefitIndex) => (
                              <div key={benefitIndex} className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-gray-700">{benefit}</span>
                              </div>
                            ))}
                          </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="w-5 h-5 text-yellow-600" />
                  <span>Rewards Catalog</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rewardsCatalog.map((reward, index) => (
                    <motion.div
                      key={reward.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center">
                          {getCategoryIcon(reward.category)}
                </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{reward.name}</h3>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              {reward.category}
                    </Badge>
                  </div>
                          <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="font-semibold text-gray-900">{reward.pointsRequired.toLocaleString()}</span>
                              <span className="text-sm text-gray-600">points</span>
                  </div>
                            <div className="text-right">
                              <p className="font-semibold text-green-600">${reward.value}</p>
                              <p className="text-xs text-gray-600">Value</p>
                  </div>
                  </div>
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Availability</span>
                              <span>{reward.availability === 'Unlimited' ? 'Unlimited' : `${reward.availability} left`}</span>
                  </div>
                            {reward.availability !== 'Unlimited' && (
                              <Progress 
                                value={(reward.availability / 100) * 100} 
                                className="h-2" 
                              />
                            )}
                  </div>
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
                    <span>Points Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={pointsHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="earned" stroke="#3b82f6" strokeWidth={3} />
                      <Line type="monotone" dataKey="redeemed" stroke="#10b981" strokeWidth={3} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <RechartsPieChart className="w-5 h-5 text-purple-600" />
                    <span>Tier Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={Object.entries(loyaltyMetrics.tierDistribution).map(([name, value]) => ({ name, value }))}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name} ${value}%`}
                      >
                        {Object.entries(loyaltyMetrics.tierDistribution).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={loyaltyTiers[index]?.color || '#8884d8'} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              </div>
              
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
                      <span className="text-gray-600">Member Retention</span>
                      <span className="font-bold text-green-600">{loyaltyMetrics.memberRetentionRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Redemption Rate</span>
                      <span className="font-bold text-blue-600">{loyaltyMetrics.redemptionRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Avg Spend/Member</span>
                      <span className="font-bold text-purple-600">${loyaltyMetrics.averageSpendPerMember}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Points per Member</span>
                      <span className="font-bold text-orange-600">{loyaltyMetrics.averagePointsPerMember.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span>Program Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Program Score</span>
                      <span className="font-bold text-green-600">92/100</span>
                          </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Engagement Rate</span>
                      <span className="font-bold text-blue-600">78%</span>
                          </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Satisfaction Score</span>
                      <span className="font-bold text-purple-600">4.7/5</span>
                          </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Growth Rate</span>
                      <span className="font-bold text-green-600">+15.3%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    <span>Top Performers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {loyaltyMembers
                      .sort((a, b) => b.points - a.points)
                      .slice(0, 3)
                      .map((member, index) => (
                        <div key={member.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-yellow-600">#{index + 1}</span>
                            <span className="text-sm font-medium">{member.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">{member.points.toLocaleString()}</p>
                            <p className="text-xs text-gray-600">points</p>
                          </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
        </Tabs>

        {/* Member Detail Modal */}
        <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-yellow-600" />
                <span>Member Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedMember && (
              <div className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedMember.name}</h2>
                      <Badge 
                        className="text-white"
                        style={{ backgroundColor: getTierColor(selectedMember.tier) }}
                      >
                        {getTierIcon(selectedMember.tier)} {selectedMember.tier}
                      </Badge>
                      <Badge className={getStatusColor(selectedMember.status)}>
                        {selectedMember.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Email</Label>
                        <p className="font-semibold">{selectedMember.email}</p>
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <p className="font-semibold">{selectedMember.phone}</p>
                      </div>
                      <div>
                        <Label>Join Date</Label>
                        <p className="font-semibold">{selectedMember.joinDate}</p>
                      </div>
                      <div>
                        <Label>Last Visit</Label>
                        <p className="font-semibold">{selectedMember.lastVisit}</p>
                          </div>
                        </div>
                        </div>
                      </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Loyalty Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                          <div className="flex justify-between">
                        <span className="text-gray-600">Current Points:</span>
                        <span className="font-semibold text-yellow-600">{selectedMember.points.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                        <span className="text-gray-600">Total Spent:</span>
                        <span className="font-semibold">${selectedMember.totalSpent.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                        <span className="text-gray-600">Total Visits:</span>
                        <span className="font-semibold">{selectedMember.totalVisits}</span>
                          </div>
                          <div className="flex justify-between">
                        <span className="text-gray-600">Avg Order Value:</span>
                        <span className="font-semibold">${selectedMember.averageOrderValue}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label>Favorite Categories</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedMember.favoriteCategories.map((category, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                              {category}
                            </Badge>
                          ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedMember(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Member
                  </Button>
                </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

        {/* Add Reward Modal */}
        <Dialog open={showRewardForm} onOpenChange={setShowRewardForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-yellow-600" />
                <span>Add New Reward</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Reward Name</Label>
                  <Input id="name" placeholder="Enter reward name" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Shipping">Shipping</SelectItem>
                      <SelectItem value="Discount">Discount</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="points">Points Required</Label>
                  <Input id="points" type="number" placeholder="Enter points required" />
                </div>
                <div>
                  <Label htmlFor="value">Value</Label>
                  <Input id="value" type="number" placeholder="Enter value" />
                </div>
                <div>
                  <Label htmlFor="availability">Availability</Label>
                  <Input id="availability" placeholder="Enter availability" />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input id="image" placeholder="Enter image URL" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter reward description" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRewardForm(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Reward
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
