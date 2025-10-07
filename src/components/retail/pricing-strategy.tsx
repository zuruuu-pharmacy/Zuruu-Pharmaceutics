"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Tag, DollarSign, TrendingUp, TrendingDown, Target, Calculator, BarChart3, PieChart,
  Plus, Search, Filter, Edit, Trash2, Eye, Download, Upload, Settings, Save,
  RefreshCw, Share2, Lock, Unlock, Copy, ExternalLink, Play, Pause, Square, Zap,
  Bell, MessageSquare, Heart, Globe, Building, Award, Microscope, TestTube,
  FlaskConical, Atom, Brain, Database, GraduationCap, BookOpen,
  FileText, Shield, Gavel, Scale, Clipboard, Video, Camera, Headphones, Monitor,
  Smartphone, Tablet, UserCheck, UserPlus, Mail, Phone, MapPin, Briefcase,
  Trophy, LineChart, Star, AlertTriangle, CheckCircle, XCircle,
  ArrowUp, ArrowDown, Minus, RotateCcw, RotateCw, ShoppingCart, CreditCard,
  Users, Calendar, BarChart, Package, Clock, Percent
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { faker } from '@faker-js/faker';

interface PricingRule {
  id: string;
  name: string;
  description: string;
  type: 'Markup' | 'Discount' | 'Dynamic' | 'Competitive' | 'Promotional' | 'Bulk';
  status: 'Active' | 'Inactive' | 'Draft' | 'Scheduled';
  priority: number;
  conditions: PricingCondition[];
  actions: PricingAction[];
  effectiveDate: Date;
  expiryDate?: Date;
  performance: PricingPerformance;
  createdAt: Date;
  updatedAt: Date;
}

interface PricingCondition {
  id: string;
  field: 'Category' | 'Brand' | 'Quantity' | 'Customer Type' | 'Season' | 'Inventory Level' | 'Competitor Price';
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'in_range';
  value: string | number;
  value2?: string | number;
}

interface PricingAction {
  id: string;
  type: 'Set Price' | 'Adjust Percentage' | 'Set Markup' | 'Apply Discount' | 'Match Competitor';
  value: number;
  valueType: 'Fixed' | 'Percentage';
  minPrice?: number;
  maxPrice?: number;
}

interface PricingPerformance {
  revenueImpact: number;
  marginImpact: number;
  volumeImpact: number;
  conversionRate: number;
  totalRevenue: number;
  totalMargin: number;
  totalVolume: number;
  lastUpdated: Date;
}

interface ProductPricing {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  category: string;
  brand: string;
  cost: number;
  basePrice: number;
  currentPrice: number;
  competitorPrice: number;
  margin: number;
  markup: number;
  priceHistory: PriceHistory[];
  rules: string[];
  status: 'Active' | 'Inactive' | 'Pending Review';
  lastUpdated: Date;
}

interface PriceHistory {
  date: Date;
  price: number;
  reason: string;
  changedBy: string;
}

const generateMockPricingRule = (id: number): PricingRule => {
  const types: PricingRule['type'][] = ['Markup', 'Discount', 'Dynamic', 'Competitive', 'Promotional', 'Bulk'];
  const statuses: PricingRule['status'][] = ['Active', 'Inactive', 'Draft', 'Scheduled'];
  
  const type = faker.helpers.arrayElement(types);
  const status = faker.helpers.arrayElement(statuses);
  
  const conditions: PricingCondition[] = Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
    id: faker.string.uuid(),
    field: faker.helpers.arrayElement(['Category', 'Brand', 'Quantity', 'Customer Type', 'Season', 'Inventory Level', 'Competitor Price']),
    operator: faker.helpers.arrayElement(['equals', 'not_equals', 'greater_than', 'less_than', 'contains', 'in_range']),
    value: faker.helpers.arrayElement(['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Beauty', 'Automotive']),
    value2: faker.datatype.boolean(0.3) ? faker.number.int({ min: 100, max: 1000 }) : undefined
  }));
  
  const actions: PricingAction[] = Array.from({ length: faker.number.int({ min: 1, max: 2 }) }).map(() => ({
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(['Set Price', 'Adjust Percentage', 'Set Markup', 'Apply Discount', 'Match Competitor']),
    value: faker.number.float({ min: 1, max: 50, fractionDigits: 0.1 }),
    valueType: faker.helpers.arrayElement(['Fixed', 'Percentage']),
    minPrice: faker.datatype.boolean(0.5) ? faker.number.float({ min: 10, max: 100, fractionDigits: 0.01 }) : undefined,
    maxPrice: faker.datatype.boolean(0.5) ? faker.number.float({ min: 100, max: 1000, fractionDigits: 0.01 }) : undefined
  }));
  
  return {
    id: faker.string.uuid(),
    name: faker.company.catchPhrase(),
    description: faker.lorem.paragraph(),
    type,
    status,
    priority: faker.number.int({ min: 1, max: 10 }),
    conditions,
    actions,
    effectiveDate: faker.date.past({ years: 1 }),
    expiryDate: faker.datatype.boolean(0.7) ? faker.date.future({ years: 1 }) : undefined,
    performance: {
      revenueImpact: faker.number.float({ min: -20, max: 50, fractionDigits: 0.1 }),
      marginImpact: faker.number.float({ min: -10, max: 30, fractionDigits: 0.1 }),
      volumeImpact: faker.number.float({ min: -15, max: 40, fractionDigits: 0.1 }),
      conversionRate: faker.number.float({ min: 0, max: 100, fractionDigits: 0.1 }),
      totalRevenue: faker.number.float({ min: 1000, max: 50000, fractionDigits: 0.01 }),
      totalMargin: faker.number.float({ min: 100, max: 10000, fractionDigits: 0.01 }),
      totalVolume: faker.number.int({ min: 10, max: 1000 }),
      lastUpdated: faker.date.recent({ days: 7 })
    },
    createdAt: faker.date.past({ years: 1 }),
    updatedAt: faker.date.recent({ days: 7 })
  };
};

const generateMockProductPricing = (id: number): ProductPricing => {
  const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Beauty', 'Automotive'];
  const brands = ['Nike', 'Apple', 'Samsung', 'Sony', 'Adidas', 'Microsoft', 'Google', 'Amazon'];
  const statuses: ProductPricing['status'][] = ['Active', 'Inactive', 'Pending Review'];
  
  const category = faker.helpers.arrayElement(categories);
  const brand = faker.helpers.arrayElement(brands);
  const status = faker.helpers.arrayElement(statuses);
  
  const cost = faker.number.float({ min: 10, max: 500, fractionDigits: 0.01 });
  const basePrice = cost * faker.number.float({ min: 1.2, max: 2.0, fractionDigits: 0.01 });
  const currentPrice = basePrice * faker.number.float({ min: 0.8, max: 1.2, fractionDigits: 0.01 });
  const competitorPrice = currentPrice * faker.number.float({ min: 0.9, max: 1.1, fractionDigits: 0.01 });
  const margin = ((currentPrice - cost) / currentPrice) * 100;
  const markup = ((currentPrice - cost) / cost) * 100;
  
  const priceHistory: PriceHistory[] = Array.from({ length: faker.number.int({ min: 3, max: 10 }) }).map(() => ({
    date: faker.date.past({ years: 1 }),
    price: faker.number.float({ min: cost * 1.1, max: cost * 2.5, fractionDigits: 0.01 }),
    reason: faker.helpers.arrayElement(['Cost Change', 'Competitor Analysis', 'Promotion', 'Seasonal Adjustment', 'Inventory Management']),
    changedBy: faker.person.fullName()
  }));
  
  return {
    id: faker.string.uuid(),
    productId: faker.string.uuid(),
    productName: faker.commerce.productName(),
    sku: faker.string.alphanumeric(8).toUpperCase(),
    category,
    brand,
    cost,
    basePrice,
    currentPrice,
    competitorPrice,
    margin,
    markup,
    priceHistory,
    rules: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => faker.string.uuid()),
    status,
    lastUpdated: faker.date.recent({ days: 7 })
  };
};

export default function PricingStrategy() {
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([]);
  const [productPricing, setProductPricing] = useState<ProductPricing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<PricingRule | null>(null);

  useEffect(() => {
    const mockRules = Array.from({ length: 15 }, (_, i) => generateMockPricingRule(i));
    const mockProducts = Array.from({ length: 30 }, (_, i) => generateMockProductPricing(i));
    setPricingRules(mockRules);
    setProductPricing(mockProducts);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Pending Review': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Markup': return 'bg-blue-100 text-blue-800';
      case 'Discount': return 'bg-green-100 text-green-800';
      case 'Dynamic': return 'bg-purple-100 text-purple-800';
      case 'Competitive': return 'bg-orange-100 text-orange-800';
      case 'Promotional': return 'bg-pink-100 text-pink-800';
      case 'Bulk': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: number) => {
    if (impact > 0) return 'text-green-600';
    if (impact < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getImpactIcon = (impact: number) => {
    if (impact > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (impact < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pricing Strategy</h1>
          <p className="text-gray-600 mt-2">Manage dynamic pricing rules, competitive analysis, and pricing optimization</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => {/* Export functionality */}}
            variant="outline"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Rule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Pricing Rule</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Rule Name</Label>
                    <Input placeholder="Enter rule name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Rule Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Markup">Markup</SelectItem>
                        <SelectItem value="Discount">Discount</SelectItem>
                        <SelectItem value="Dynamic">Dynamic</SelectItem>
                        <SelectItem value="Competitive">Competitive</SelectItem>
                        <SelectItem value="Promotional">Promotional</SelectItem>
                        <SelectItem value="Bulk">Bulk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Input placeholder="Enter priority (1-10)" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Enter rule description" rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddModalOpen(false)}>
                  Create Rule
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Rules</p>
                <p className="text-2xl font-bold text-gray-900">{pricingRules.length}</p>
              </div>
              <Tag className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {pricingRules.filter(r => r.status === 'Active').length} active
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Revenue Impact</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pricingRules.length > 0 ? (pricingRules.reduce((sum, r) => sum + r.performance.revenueImpact, 0) / pricingRules.length).toFixed(1) : 0}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {pricingRules.reduce((sum, r) => sum + r.performance.totalRevenue, 0).toLocaleString()} total revenue
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Margin Impact</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pricingRules.length > 0 ? (pricingRules.reduce((sum, r) => sum + r.performance.marginImpact, 0) / pricingRules.length).toFixed(1) : 0}%
                </p>
              </div>
              <Percent className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-purple-600">
                {pricingRules.reduce((sum, r) => sum + r.performance.totalMargin, 0).toLocaleString()} total margin
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Products Priced</p>
                <p className="text-2xl font-bold text-gray-900">{productPricing.length}</p>
              </div>
              <Package className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-orange-600">
                {productPricing.filter(p => p.status === 'Active').length} active pricing
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search rules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="Markup">Markup</SelectItem>
                  <SelectItem value="Discount">Discount</SelectItem>
                  <SelectItem value="Dynamic">Dynamic</SelectItem>
                  <SelectItem value="Competitive">Competitive</SelectItem>
                  <SelectItem value="Promotional">Promotional</SelectItem>
                  <SelectItem value="Bulk">Bulk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricingRules.map((rule, index) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg line-clamp-2">{rule.name}</CardTitle>
                    <p className="text-sm text-gray-600">{rule.description}</p>
                    <p className="text-sm text-gray-500">Priority: {rule.priority}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getStatusColor(rule.status)}>
                      {rule.status}
                    </Badge>
                    <Badge className={getTypeColor(rule.type)}>
                      {rule.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Conditions:</span>
                    <span className="ml-1 font-medium">{rule.conditions.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Actions:</span>
                    <span className="ml-1 font-medium">{rule.actions.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Effective:</span>
                    <span className="ml-1 font-medium">{rule.effectiveDate.toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Expiry:</span>
                    <span className="ml-1 font-medium">{rule.expiryDate ? rule.expiryDate.toLocaleDateString() : 'N/A'}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Revenue Impact</span>
                    <div className="flex items-center space-x-1">
                      {getImpactIcon(rule.performance.revenueImpact)}
                      <span className={getImpactColor(rule.performance.revenueImpact)}>
                        {rule.performance.revenueImpact > 0 ? '+' : ''}{rule.performance.revenueImpact.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <Progress value={Math.abs(rule.performance.revenueImpact) + 50} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    {getImpactIcon(rule.performance.marginImpact)}
                    <span className={getImpactColor(rule.performance.marginImpact)}>
                      {rule.performance.marginImpact > 0 ? '+' : ''}{rule.performance.marginImpact.toFixed(1)}% margin
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getImpactIcon(rule.performance.volumeImpact)}
                    <span className={getImpactColor(rule.performance.volumeImpact)}>
                      {rule.performance.volumeImpact > 0 ? '+' : ''}{rule.performance.volumeImpact.toFixed(1)}% volume
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedRule(rule);
                        setIsViewModalOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calculator className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">
                    {rule.updatedAt.toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pricing Rule Details</DialogTitle>
          </DialogHeader>
          {selectedRule && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg">{selectedRule.name}</h3>
                  <p className="text-gray-600">{selectedRule.type} Rule</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedRule.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge className={getStatusColor(selectedRule.status)}>
                      {selectedRule.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <Badge className={getTypeColor(selectedRule.type)}>
                      {selectedRule.type}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Priority:</span>
                    <span className="font-medium">{selectedRule.priority}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Effective Date:</span>
                    <span className="font-medium">{selectedRule.effectiveDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Expiry Date:</span>
                    <span className="font-medium">{selectedRule.expiryDate ? selectedRule.expiryDate.toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Created:</span>
                    <span className="font-medium">{selectedRule.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="conditions">Conditions</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Rule Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Name:</span>
                            <span className="font-medium">{selectedRule.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Type:</span>
                            <Badge className={getTypeColor(selectedRule.type)}>
                              {selectedRule.type}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Status:</span>
                            <Badge className={getStatusColor(selectedRule.status)}>
                              {selectedRule.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Priority:</span>
                            <span className="font-medium">{selectedRule.priority}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Description</h4>
                        <p className="text-sm text-gray-700">{selectedRule.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="conditions" className="space-y-4">
                  <div className="space-y-3">
                    {selectedRule.conditions.map((condition, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{condition.field}</span>
                          <Badge variant="outline">{condition.operator}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Value:</span>
                            <span className="ml-1 font-medium">{condition.value}</span>
                          </div>
                          {condition.value2 && (
                            <div>
                              <span className="text-gray-500">Value 2:</span>
                              <span className="ml-1 font-medium">{condition.value2}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="actions" className="space-y-4">
                  <div className="space-y-3">
                    {selectedRule.actions.map((action, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{action.type}</span>
                          <Badge variant="outline">{action.valueType}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Value:</span>
                            <span className="ml-1 font-medium">{action.value}{action.valueType === 'Percentage' ? '%' : ''}</span>
                          </div>
                          {action.minPrice && (
                            <div>
                              <span className="text-gray-500">Min Price:</span>
                              <span className="ml-1 font-medium">${action.minPrice}</span>
                            </div>
                          )}
                          {action.maxPrice && (
                            <div>
                              <span className="text-gray-500">Max Price:</span>
                              <span className="ml-1 font-medium">${action.maxPrice}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="performance" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Impact Metrics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Revenue Impact:</span>
                            <div className="flex items-center space-x-1">
                              {getImpactIcon(selectedRule.performance.revenueImpact)}
                              <span className={getImpactColor(selectedRule.performance.revenueImpact)}>
                                {selectedRule.performance.revenueImpact > 0 ? '+' : ''}{selectedRule.performance.revenueImpact.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Margin Impact:</span>
                            <div className="flex items-center space-x-1">
                              {getImpactIcon(selectedRule.performance.marginImpact)}
                              <span className={getImpactColor(selectedRule.performance.marginImpact)}>
                                {selectedRule.performance.marginImpact > 0 ? '+' : ''}{selectedRule.performance.marginImpact.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Volume Impact:</span>
                            <div className="flex items-center space-x-1">
                              {getImpactIcon(selectedRule.performance.volumeImpact)}
                              <span className={getImpactColor(selectedRule.performance.volumeImpact)}>
                                {selectedRule.performance.volumeImpact > 0 ? '+' : ''}{selectedRule.performance.volumeImpact.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Conversion Rate:</span>
                            <span className="font-medium">{selectedRule.performance.conversionRate.toFixed(1)}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Financial Impact</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Total Revenue:</span>
                            <span className="font-medium">${selectedRule.performance.totalRevenue.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Total Margin:</span>
                            <span className="font-medium">${selectedRule.performance.totalMargin.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Total Volume:</span>
                            <span className="font-medium">{selectedRule.performance.totalVolume}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Last Updated:</span>
                            <span className="font-medium">{selectedRule.performance.lastUpdated.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
