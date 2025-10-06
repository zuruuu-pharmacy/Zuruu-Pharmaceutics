"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Lightbulb, Rocket, Target, TrendingUp, BarChart3, Plus, Search, Filter,
  Edit, Trash2, Eye, Download, Upload, CheckCircle, XCircle, AlertTriangle,
  Star, Clock, Settings, Save, RefreshCw, Share2, Lock, Unlock, Copy,
  ExternalLink, Play, Pause, Stop, Zap, Bell, MessageSquare, Heart, Globe,
  Building, Award, Microscope, FlaskConical, TestTube, Atom, Brain, Database,
  DollarSign, GraduationCap, BookOpen, Users, Calendar, FileText, Shield,
  Gavel, Scale, DollarSign as DollarSignIcon, Briefcase, PieChart, LineChart
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

interface Innovation {
  id: string;
  title: string;
  description: string;
  type: 'Patent' | 'Startup' | 'Technology Transfer' | 'Research Innovation' | 'Product Development' | 'Process Improvement';
  status: 'Idea' | 'Prototype' | 'Development' | 'Testing' | 'Commercialization' | 'Launched' | 'Discontinued';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  category: 'Healthcare' | 'Technology' | 'Pharmaceutical' | 'Biotech' | 'Digital Health' | 'Medical Devices';
  inventor: string;
  team: string[];
  funding: Funding[];
  milestones: Milestone[];
  intellectualProperty: IP[];
  marketAnalysis: MarketAnalysis;
  businessPlan: BusinessPlan;
  stakeholders: Stakeholder[];
  createdAt: Date;
  updatedAt: Date;
}

interface Funding {
  id: string;
  source: string;
  amount: number;
  currency: string;
  type: 'Grant' | 'Investment' | 'Loan' | 'Crowdfunding' | 'Government';
  status: 'Applied' | 'Approved' | 'Received' | 'Rejected';
  date: Date;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completedDate?: Date;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  deliverables: string[];
}

interface IP {
  id: string;
  type: 'Patent' | 'Trademark' | 'Copyright' | 'Trade Secret' | 'Design';
  title: string;
  status: 'Filed' | 'Pending' | 'Approved' | 'Rejected' | 'Expired';
  applicationNumber: string;
  filingDate: Date;
  expiryDate?: Date;
  jurisdiction: string;
}

interface MarketAnalysis {
  id: string;
  marketSize: number;
  targetMarket: string;
  competitors: string[];
  marketShare: number;
  growthRate: number;
  barriers: string[];
  opportunities: string[];
}

interface BusinessPlan {
  id: string;
  executiveSummary: string;
  marketStrategy: string;
  financialProjections: FinancialProjection[];
  riskAnalysis: Risk[];
  exitStrategy: string;
}

interface FinancialProjection {
  year: number;
  revenue: number;
  expenses: number;
  profit: number;
  investment: number;
}

interface Risk {
  id: string;
  description: string;
  probability: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  mitigation: string;
}

interface Stakeholder {
  id: string;
  name: string;
  role: 'Investor' | 'Partner' | 'Customer' | 'Advisor' | 'Regulator';
  contact: string;
  influence: 'Low' | 'Medium' | 'High';
  interest: 'Low' | 'Medium' | 'High';
}

const generateMockInnovation = (id: number): Innovation => {
  const types: Innovation['type'][] = ['Patent', 'Startup', 'Technology Transfer', 'Research Innovation', 'Product Development', 'Process Improvement'];
  const statuses: Innovation['status'][] = ['Idea', 'Prototype', 'Development', 'Testing', 'Commercialization', 'Launched', 'Discontinued'];
  const priorities: Innovation['priority'][] = ['Low', 'Medium', 'High', 'Critical'];
  const categories: Innovation['category'][] = ['Healthcare', 'Technology', 'Pharmaceutical', 'Biotech', 'Digital Health', 'Medical Devices'];
  
  const type = faker.helpers.arrayElement(types);
  const status = faker.helpers.arrayElement(statuses);
  const priority = faker.helpers.arrayElement(priorities);
  const category = faker.helpers.arrayElement(categories);
  
  const team = Array.from({ length: faker.number.int({ min: 2, max: 8 }) }).map(() => faker.person.fullName());
  
  const funding: Funding[] = Array.from({ length: faker.number.int({ min: 0, max: 4 }) }).map(() => ({
    id: faker.string.uuid(),
    source: faker.helpers.arrayElement(['NSF', 'NIH', 'Venture Capital', 'Angel Investor', 'Government Grant', 'Crowdfunding']),
    amount: faker.number.int({ min: 10000, max: 2000000 }),
    currency: 'USD',
    type: faker.helpers.arrayElement(['Grant', 'Investment', 'Loan', 'Crowdfunding', 'Government']),
    status: faker.helpers.arrayElement(['Applied', 'Approved', 'Received', 'Rejected']),
    date: faker.date.past({ years: 1 })
  }));
  
  const milestones: Milestone[] = Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    dueDate: faker.date.future({ years: 2 }),
    completedDate: faker.datatype.boolean(0.6) ? faker.date.past({ years: 1 }) : undefined,
    status: faker.helpers.arrayElement(['Pending', 'In Progress', 'Completed', 'Overdue']),
    deliverables: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map(() => faker.lorem.words(2))
  }));
  
  const intellectualProperty: IP[] = Array.from({ length: faker.number.int({ min: 0, max: 3 }) }).map(() => ({
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(['Patent', 'Trademark', 'Copyright', 'Trade Secret', 'Design']),
    title: faker.lorem.words(3),
    status: faker.helpers.arrayElement(['Filed', 'Pending', 'Approved', 'Rejected', 'Expired']),
    applicationNumber: faker.string.alphanumeric(10).toUpperCase(),
    filingDate: faker.date.past({ years: 2 }),
    expiryDate: faker.date.future({ years: 20 }),
    jurisdiction: faker.helpers.arrayElement(['US', 'EU', 'Global', 'Canada', 'UK'])
  }));
  
  const marketAnalysis: MarketAnalysis = {
    id: faker.string.uuid(),
    marketSize: faker.number.int({ min: 1000000, max: 10000000000 }),
    targetMarket: faker.lorem.words(3),
    competitors: Array.from({ length: faker.number.int({ min: 2, max: 6 }) }).map(() => faker.company.name()),
    marketShare: faker.number.float({ min: 0.1, max: 25, precision: 0.1 }),
    growthRate: faker.number.float({ min: 5, max: 50, precision: 0.1 }),
    barriers: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => faker.lorem.sentence()),
    opportunities: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => faker.lorem.sentence())
  };
  
  const businessPlan: BusinessPlan = {
    id: faker.string.uuid(),
    executiveSummary: faker.lorem.paragraphs(2),
    marketStrategy: faker.lorem.paragraph(),
    financialProjections: Array.from({ length: 5 }).map((_, i) => ({
      year: new Date().getFullYear() + i,
      revenue: faker.number.int({ min: 100000, max: 10000000 }),
      expenses: faker.number.int({ min: 50000, max: 5000000 }),
      profit: 0,
      investment: faker.number.int({ min: 100000, max: 2000000 })
    })),
    riskAnalysis: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => ({
      id: faker.string.uuid(),
      description: faker.lorem.sentence(),
      probability: faker.helpers.arrayElement(['Low', 'Medium', 'High']),
      impact: faker.helpers.arrayElement(['Low', 'Medium', 'High']),
      mitigation: faker.lorem.sentence()
    })),
    exitStrategy: faker.lorem.paragraph()
  };
  
  const stakeholders: Stakeholder[] = Array.from({ length: faker.number.int({ min: 3, max: 10 }) }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    role: faker.helpers.arrayElement(['Investor', 'Partner', 'Customer', 'Advisor', 'Regulator']),
    contact: faker.internet.email(),
    influence: faker.helpers.arrayElement(['Low', 'Medium', 'High']),
    interest: faker.helpers.arrayElement(['Low', 'Medium', 'High'])
  }));
  
  // Calculate profit for financial projections
  businessPlan.financialProjections.forEach(proj => {
    proj.profit = proj.revenue - proj.expenses;
  });
  
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(4),
    description: faker.lorem.paragraphs(2),
    type,
    status,
    priority,
    category,
    inventor: faker.person.fullName(),
    team,
    funding,
    milestones,
    intellectualProperty,
    marketAnalysis,
    businessPlan,
    stakeholders,
    createdAt: faker.date.past({ years: 2 }),
    updatedAt: faker.date.recent({ days: 30 })
  };
};

export default function InnovationHub() {
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedInnovation, setSelectedInnovation] = useState<Innovation | null>(null);

  useEffect(() => {
    const mockInnovations = Array.from({ length: 25 }, (_, i) => generateMockInnovation(i));
    setInnovations(mockInnovations);
  }, []);

  const filteredInnovations = useMemo(() => {
    return innovations.filter(innovation => {
      const matchesSearch = innovation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           innovation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           innovation.inventor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || innovation.status === filterStatus;
      const matchesType = filterType === 'All' || innovation.type === filterType;
      const matchesCategory = filterCategory === 'All' || innovation.category === filterCategory;
      
      return matchesSearch && matchesStatus && matchesType && matchesCategory;
    });
  }, [innovations, searchTerm, filterStatus, filterType, filterCategory]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Launched': return 'bg-green-100 text-green-800';
      case 'Commercialization': return 'bg-blue-100 text-blue-800';
      case 'Testing': return 'bg-yellow-100 text-yellow-800';
      case 'Development': return 'bg-purple-100 text-purple-800';
      case 'Prototype': return 'bg-orange-100 text-orange-800';
      case 'Idea': return 'bg-gray-100 text-gray-800';
      case 'Discontinued': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Patent': return <FileText className="w-5 h-5" />;
      case 'Startup': return <Rocket className="w-5 h-5" />;
      case 'Technology Transfer': return <Share2 className="w-5 h-5" />;
      case 'Research Innovation': return <Microscope className="w-5 h-5" />;
      case 'Product Development': return <TestTube className="w-5 h-5" />;
      case 'Process Improvement': return <Zap className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Innovation Hub</h1>
          <p className="text-gray-600 mt-2">Manage patents, startups, technology transfer, and innovation projects</p>
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
                New Innovation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Innovation</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Innovation Title</Label>
                  <Input placeholder="Enter innovation title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Patent">Patent</SelectItem>
                        <SelectItem value="Startup">Startup</SelectItem>
                        <SelectItem value="Technology Transfer">Technology Transfer</SelectItem>
                        <SelectItem value="Research Innovation">Research Innovation</SelectItem>
                        <SelectItem value="Product Development">Product Development</SelectItem>
                        <SelectItem value="Process Improvement">Process Improvement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Pharmaceutical">Pharmaceutical</SelectItem>
                        <SelectItem value="Biotech">Biotech</SelectItem>
                        <SelectItem value="Digital Health">Digital Health</SelectItem>
                        <SelectItem value="Medical Devices">Medical Devices</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Enter innovation description" rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddModalOpen(false)}>
                  Create Innovation
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
                <p className="text-sm font-medium text-gray-600">Total Innovations</p>
                <p className="text-2xl font-bold text-gray-900">{innovations.length}</p>
              </div>
              <Lightbulb className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {innovations.filter(i => i.status === 'Launched').length} launched
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Funding</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${innovations.reduce((sum, i) => sum + i.funding.reduce((fSum, f) => fSum + f.amount, 0), 0).toLocaleString()}
                </p>
              </div>
              <DollarSignIcon className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-blue-600">
                {innovations.reduce((sum, i) => sum + i.funding.length, 0)} funding sources
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Patents Filed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {innovations.reduce((sum, i) => sum + i.intellectualProperty.filter(ip => ip.type === 'Patent').length, 0)}
                </p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-purple-600">
                {innovations.reduce((sum, i) => sum + i.intellectualProperty.filter(ip => ip.status === 'Approved').length, 0)} approved
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">
                  {innovations.filter(i => ['Development', 'Testing', 'Commercialization'].includes(i.status)).length}
                </p>
              </div>
              <Rocket className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-blue-600">
                {innovations.filter(i => i.status === 'Idea').length} in ideation
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search innovations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Idea">Idea</SelectItem>
                  <SelectItem value="Prototype">Prototype</SelectItem>
                  <SelectItem value="Development">Development</SelectItem>
                  <SelectItem value="Testing">Testing</SelectItem>
                  <SelectItem value="Commercialization">Commercialization</SelectItem>
                  <SelectItem value="Launched">Launched</SelectItem>
                  <SelectItem value="Discontinued">Discontinued</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="Patent">Patent</SelectItem>
                  <SelectItem value="Startup">Startup</SelectItem>
                  <SelectItem value="Technology Transfer">Technology Transfer</SelectItem>
                  <SelectItem value="Research Innovation">Research Innovation</SelectItem>
                  <SelectItem value="Product Development">Product Development</SelectItem>
                  <SelectItem value="Process Improvement">Process Improvement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Pharmaceutical">Pharmaceutical</SelectItem>
                  <SelectItem value="Biotech">Biotech</SelectItem>
                  <SelectItem value="Digital Health">Digital Health</SelectItem>
                  <SelectItem value="Medical Devices">Medical Devices</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Innovations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInnovations.map((innovation, index) => (
          <motion.div
            key={innovation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg line-clamp-2">{innovation.title}</CardTitle>
                    <p className="text-sm text-gray-600">{innovation.category}</p>
                    <p className="text-sm text-gray-500">Inventor: {innovation.inventor}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getStatusColor(innovation.status)}>
                      {innovation.status}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {getTypeIcon(innovation.type)}
                      <span className="text-xs text-gray-500">{innovation.type}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(innovation.priority)}>
                    {innovation.priority}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Team: {innovation.team.length} members
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Funding:</span>
                    <span className="ml-1 font-medium">
                      ${innovation.funding.reduce((sum, f) => sum + f.amount, 0).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">IP Assets:</span>
                    <span className="ml-1 font-medium">{innovation.intellectualProperty.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Milestones:</span>
                    <span className="ml-1 font-medium">{innovation.milestones.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Stakeholders:</span>
                    <span className="ml-1 font-medium">{innovation.stakeholders.length}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">
                      {innovation.milestones.length > 0 ? Math.round((innovation.milestones.filter(m => m.status === 'Completed').length / innovation.milestones.length) * 100) : 0}%
                    </span>
                  </div>
                  <Progress 
                    value={innovation.milestones.length > 0 ? (innovation.milestones.filter(m => m.status === 'Completed').length / innovation.milestones.length) * 100 : 0} 
                    className="h-2" 
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedInnovation(innovation);
                        setIsViewModalOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">
                    {innovation.createdAt.toLocaleDateString()}
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
            <DialogTitle>Innovation Details</DialogTitle>
          </DialogHeader>
          {selectedInnovation && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg">{selectedInnovation.title}</h3>
                  <p className="text-gray-600">{selectedInnovation.category}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedInnovation.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <Badge variant="outline">{selectedInnovation.type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge className={getStatusColor(selectedInnovation.status)}>
                      {selectedInnovation.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Priority:</span>
                    <Badge className={getPriorityColor(selectedInnovation.priority)}>
                      {selectedInnovation.priority}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Inventor:</span>
                    <span className="font-medium">{selectedInnovation.inventor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Team Size:</span>
                    <span className="font-medium">{selectedInnovation.team.length} members</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Funding:</span>
                    <span className="font-medium text-green-600">
                      ${selectedInnovation.funding.reduce((sum, f) => sum + f.amount, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="funding">Funding</TabsTrigger>
                  <TabsTrigger value="milestones">Milestones</TabsTrigger>
                  <TabsTrigger value="ip">Intellectual Property</TabsTrigger>
                  <TabsTrigger value="market">Market Analysis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Team Members</h4>
                        <div className="space-y-1">
                          {selectedInnovation.team.map((member, index) => (
                            <div key={index} className="text-sm">{member}</div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Stakeholders</h4>
                        <div className="space-y-1">
                          {selectedInnovation.stakeholders.slice(0, 5).map((stakeholder, index) => (
                            <div key={index} className="text-sm">
                              {stakeholder.name} ({stakeholder.role})
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="funding" className="space-y-4">
                  <div className="space-y-3">
                    {selectedInnovation.funding.map((fund, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{fund.source}</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-green-600">
                              {fund.currency} {fund.amount.toLocaleString()}
                            </span>
                            <Badge variant="outline">{fund.type}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Status: {fund.status}</span>
                          <span className="text-gray-500">{fund.date.toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="milestones" className="space-y-4">
                  <div className="space-y-3">
                    {selectedInnovation.milestones.map((milestone, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{milestone.title}</span>
                          <Badge className={milestone.status === 'Completed' ? 'bg-green-100 text-green-800' : milestone.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                            {milestone.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Due: {milestone.dueDate.toLocaleDateString()}</span>
                          <span className="text-gray-500">{milestone.deliverables.length} deliverables</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="ip" className="space-y-4">
                  <div className="space-y-3">
                    {selectedInnovation.intellectualProperty.map((ip, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{ip.title}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{ip.type}</Badge>
                            <Badge className={ip.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {ip.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">App #: {ip.applicationNumber}</span>
                          <span className="text-gray-500">Jurisdiction: {ip.jurisdiction}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="market" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Market Size</h4>
                        <p className="text-2xl font-bold text-green-600">
                          ${selectedInnovation.marketAnalysis.marketSize.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Growth Rate: {selectedInnovation.marketAnalysis.growthRate}%
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Market Share</h4>
                        <p className="text-2xl font-bold text-blue-600">
                          {selectedInnovation.marketAnalysis.marketShare}%
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Target: {selectedInnovation.marketAnalysis.targetMarket}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold mb-2">Competitors</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedInnovation.marketAnalysis.competitors.map((competitor, index) => (
                          <Badge key={index} variant="outline">{competitor}</Badge>
                        ))}
                      </div>
                    </div>
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
