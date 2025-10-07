"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign, Calendar, Clock, Users, Award, FileText, Plus, Search, Filter,
  Edit, Trash2, Eye, Download, Upload, CheckCircle, XCircle, AlertTriangle,
  Star, Target, TrendingUp, BarChart3, PieChart, LineChart, Activity, Zap,
  Bell, MessageSquare, Heart, Globe, Building, Settings, Save, RefreshCw,
  Share2, Lock, Unlock, Copy, ExternalLink, Play, Pause, Square, BookOpen,
  GraduationCap, Microscope, FlaskConical, TestTube, Atom, Brain, Database
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

interface Grant {
  id: string;
  title: string;
  description: string;
  fundingAgency: string;
  grantType: 'Research' | 'Equipment' | 'Travel' | 'Conference' | 'Fellowship' | 'Scholarship';
  amount: number;
  currency: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Completed' | 'Suspended';
  priority: 'High' | 'Medium' | 'Low';
  submissionDate: Date;
  deadline: Date;
  startDate: Date;
  endDate: Date;
  principalInvestigator: string;
  coInvestigators: string[];
  department: string;
  keywords: string[];
  objectives: string[];
  deliverables: string[];
  budgetBreakdown: BudgetItem[];
  progress: number;
  milestones: Milestone[];
  documents: Document[];
  reviews: Review[];
  notifications: Notification[];
  createdAt: Date;
  updatedAt: Date;
}

interface BudgetItem {
  id: string;
  category: string;
  description: string;
  amount: number;
  percentage: number;
  status: 'Approved' | 'Pending' | 'Rejected';
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  deliverables: string[];
  progress: number;
}

interface Document {
  id: string;
  name: string;
  type: 'Proposal' | 'Budget' | 'Progress Report' | 'Final Report' | 'Other';
  url: string;
  uploadedDate: Date;
  size: number;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
}

interface Review {
  id: string;
  reviewer: string;
  score: number;
  comments: string;
  date: Date;
  status: 'Pending' | 'Completed';
}

interface Notification {
  id: string;
  type: 'Deadline' | 'Review' | 'Approval' | 'Rejection' | 'Reminder';
  message: string;
  date: Date;
  read: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

const generateMockGrant = (id: number): Grant => {
  const agencies = ['NSF', 'NIH', 'NSERC', 'CIHR', 'Wellcome Trust', 'Gates Foundation', 'Ford Foundation'];
  const types: Grant['grantType'][] = ['Research', 'Equipment', 'Travel', 'Conference', 'Fellowship', 'Scholarship'];
  const statuses: Grant['status'][] = ['Draft', 'Submitted', 'Under Review', 'Approved', 'Rejected', 'Completed', 'Suspended'];
  const priorities: Grant['priority'][] = ['High', 'Medium', 'Low'];
  const departments = ['Pharmacy', 'Chemistry', 'Biology', 'Medicine', 'Nursing', 'Public Health'];
  
  const agency = faker.helpers.arrayElement(agencies);
  const type = faker.helpers.arrayElement(types);
  const status = faker.helpers.arrayElement(statuses);
  const priority = faker.helpers.arrayElement(priorities);
  const department = faker.helpers.arrayElement(departments);
  
  const amount = faker.number.int({ min: 10000, max: 1000000 });
  const currency = faker.helpers.arrayElement(['USD', 'CAD', 'EUR', 'GBP']);
  
  const budgetBreakdown: BudgetItem[] = [
    { id: faker.string.uuid(), category: 'Personnel', description: 'Research staff salaries', amount: amount * 0.4, percentage: 40, status: 'Approved' },
    { id: faker.string.uuid(), category: 'Equipment', description: 'Laboratory equipment', amount: amount * 0.3, percentage: 30, status: 'Approved' },
    { id: faker.string.uuid(), category: 'Materials', description: 'Research materials and supplies', amount: amount * 0.15, percentage: 15, status: 'Pending' },
    { id: faker.string.uuid(), category: 'Travel', description: 'Conference and research travel', amount: amount * 0.1, percentage: 10, status: 'Approved' },
    { id: faker.string.uuid(), category: 'Other', description: 'Miscellaneous expenses', amount: amount * 0.05, percentage: 5, status: 'Pending' }
  ];
  
  const milestones: Milestone[] = Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map((_, i) => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    dueDate: faker.date.future({ years: 2 }),
    status: faker.helpers.arrayElement(['Pending', 'In Progress', 'Completed', 'Overdue']),
    deliverables: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map(() => faker.lorem.words(2)),
    progress: faker.number.int({ min: 0, max: 100 })
  }));
  
  const documents: Document[] = Array.from({ length: faker.number.int({ min: 2, max: 6 }) }).map(() => ({
    id: faker.string.uuid(),
    name: faker.lorem.words(2) + '.pdf',
    type: faker.helpers.arrayElement(['Proposal', 'Budget', 'Progress Report', 'Final Report', 'Other']),
    url: faker.internet.url(),
    uploadedDate: faker.date.past({ years: 1 }),
    size: faker.number.int({ min: 100000, max: 10000000 }),
    status: faker.helpers.arrayElement(['Draft', 'Submitted', 'Approved', 'Rejected'])
  }));
  
  const reviews: Review[] = Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map(() => ({
    id: faker.string.uuid(),
    reviewer: faker.person.fullName(),
    score: faker.number.int({ min: 1, max: 10 }),
    comments: faker.lorem.paragraph(),
    date: faker.date.recent({ days: 30 }),
    status: faker.helpers.arrayElement(['Pending', 'Completed'])
  }));
  
  const notifications: Notification[] = Array.from({ length: faker.number.int({ min: 2, max: 8 }) }).map(() => ({
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(['Deadline', 'Review', 'Approval', 'Rejection', 'Reminder']),
    message: faker.lorem.sentence(),
    date: faker.date.recent({ days: 30 }),
    read: faker.datatype.boolean(0.3),
    priority: faker.helpers.arrayElement(['High', 'Medium', 'Low'])
  }));
  
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(4),
    description: faker.lorem.paragraphs(2),
    fundingAgency: agency,
    grantType: type,
    amount,
    currency,
    status,
    priority,
    submissionDate: faker.date.past({ years: 1 }),
    deadline: faker.date.future({ years: 1 }),
    startDate: faker.date.future({ years: 1 }),
    endDate: faker.date.future({ years: 3 }),
    principalInvestigator: faker.person.fullName(),
    coInvestigators: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => faker.person.fullName()),
    department,
    keywords: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => faker.lorem.word()),
    objectives: Array.from({ length: faker.number.int({ min: 3, max: 6 }) }).map(() => faker.lorem.sentence()),
    deliverables: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => faker.lorem.words(3)),
    budgetBreakdown,
    progress: faker.number.int({ min: 0, max: 100 }),
    milestones,
    documents,
    reviews,
    notifications,
    createdAt: faker.date.past({ years: 2 }),
    updatedAt: faker.date.recent({ days: 30 })
  };
};

export default function GrantManagement() {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedGrant, setSelectedGrant] = useState<Grant | null>(null);
  const [newGrant, setNewGrant] = useState<Partial<Grant>>({});

  useEffect(() => {
    // Generate mock data
    const mockGrants = Array.from({ length: 25 }, (_, i) => generateMockGrant(i));
    setGrants(mockGrants);
  }, []);

  const filteredGrants = useMemo(() => {
    return grants.filter(grant => {
      const matchesSearch = grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           grant.fundingAgency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           grant.principalInvestigator.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || grant.status === filterStatus;
      const matchesType = filterType === 'All' || grant.grantType === filterType;
      const matchesPriority = filterPriority === 'All' || grant.priority === filterPriority;
      
      return matchesSearch && matchesStatus && matchesType && matchesPriority;
    });
  }, [grants, searchTerm, filterStatus, filterType, filterPriority]);

  const handleAddGrant = () => {
    if (newGrant.title && newGrant.fundingAgency && newGrant.amount) {
      const grant: Grant = {
        id: faker.string.uuid(),
        title: newGrant.title,
        description: newGrant.description || '',
        fundingAgency: newGrant.fundingAgency,
        grantType: newGrant.grantType || 'Research',
        amount: newGrant.amount,
        currency: newGrant.currency || 'USD',
        status: 'Draft',
        priority: newGrant.priority || 'Medium',
        submissionDate: new Date(),
        deadline: newGrant.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        startDate: newGrant.startDate || new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        endDate: newGrant.endDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        principalInvestigator: newGrant.principalInvestigator || '',
        coInvestigators: newGrant.coInvestigators || [],
        department: newGrant.department || 'Pharmacy',
        keywords: newGrant.keywords || [],
        objectives: newGrant.objectives || [],
        deliverables: newGrant.deliverables || [],
        budgetBreakdown: [],
        progress: 0,
        milestones: [],
        documents: [],
        reviews: [],
        notifications: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setGrants(prev => [grant, ...prev]);
      setNewGrant({});
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteGrant = (grantId: string) => {
    setGrants(prev => prev.filter(grant => grant.id !== grantId));
    setIsDeleteModalOpen(false);
    setSelectedGrant(null);
  };

  const exportToCSV = () => {
    const headers = ['Title', 'Agency', 'Type', 'Amount', 'Status', 'Priority', 'PI', 'Department', 'Progress'];
    const csvContent = [
      headers.join(','),
      ...filteredGrants.map(grant => [
        `"${grant.title}"`,
        grant.fundingAgency,
        grant.grantType,
        grant.amount,
        grant.status,
        grant.priority,
        grant.principalInvestigator,
        grant.department,
        `${grant.progress}%`
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grants-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Submitted': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-purple-100 text-purple-800';
      case 'Suspended': return 'bg-orange-100 text-orange-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Research': return <Microscope className="w-5 h-5" />;
      case 'Equipment': return <TestTube className="w-5 h-5" />;
      case 'Travel': return <Globe className="w-5 h-5" />;
      case 'Conference': return <Users className="w-5 h-5" />;
      case 'Fellowship': return <Award className="w-5 h-5" />;
      case 'Scholarship': return <GraduationCap className="w-5 h-5" />;
      default: return <DollarSign className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Grant Management</h1>
          <p className="text-gray-600 mt-2">Manage research grants, funding applications, and budget tracking</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={exportToCSV}
            variant="outline"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Grant
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Grant</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Grant Title</Label>
                  <Input
                    value={newGrant.title || ''}
                    onChange={(e) => setNewGrant(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter grant title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Funding Agency</Label>
                  <Input
                    value={newGrant.fundingAgency || ''}
                    onChange={(e) => setNewGrant(prev => ({ ...prev, fundingAgency: e.target.value }))}
                    placeholder="e.g., NSF, NIH"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Grant Type</Label>
                  <Select value={newGrant.grantType || ''} onValueChange={(value) => setNewGrant(prev => ({ ...prev, grantType: value as Grant['grantType'] }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Research">Research</SelectItem>
                      <SelectItem value="Equipment">Equipment</SelectItem>
                      <SelectItem value="Travel">Travel</SelectItem>
                      <SelectItem value="Conference">Conference</SelectItem>
                      <SelectItem value="Fellowship">Fellowship</SelectItem>
                      <SelectItem value="Scholarship">Scholarship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    value={newGrant.amount || ''}
                    onChange={(e) => setNewGrant(prev => ({ ...prev, amount: parseInt(e.target.value) }))}
                    placeholder="Enter amount"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Principal Investigator</Label>
                  <Input
                    value={newGrant.principalInvestigator || ''}
                    onChange={(e) => setNewGrant(prev => ({ ...prev, principalInvestigator: e.target.value }))}
                    placeholder="PI name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select value={newGrant.department || ''} onValueChange={(value) => setNewGrant(prev => ({ ...prev, department: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="Medicine">Medicine</SelectItem>
                      <SelectItem value="Nursing">Nursing</SelectItem>
                      <SelectItem value="Public Health">Public Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={newGrant.description || ''}
                    onChange={(e) => setNewGrant(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Grant description..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddGrant}>
                  Add Grant
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
                <p className="text-sm font-medium text-gray-600">Total Grants</p>
                <p className="text-2xl font-bold text-gray-900">{grants.length}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                ${grants.reduce((sum, grant) => sum + grant.amount, 0).toLocaleString()} total value
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Grants</p>
                <p className="text-2xl font-bold text-gray-900">
                  {grants.filter(g => g.status === 'Approved' || g.status === 'Under Review').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-blue-600">
                {grants.filter(g => g.status === 'Under Review').length} under review
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {grants.length > 0 ? Math.round((grants.filter(g => g.status === 'Approved').length / grants.length) * 100) : 0}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-purple-600">
                {grants.filter(g => g.status === 'Approved').length} approved
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Deadlines</p>
                <p className="text-2xl font-bold text-gray-900">
                  {grants.filter(g => new Date(g.deadline) > new Date() && new Date(g.deadline) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-orange-600">
                Next 30 days
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
                  placeholder="Search grants..."
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
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Submitted">Submitted</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
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
                  <SelectItem value="Research">Research</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Conference">Conference</SelectItem>
                  <SelectItem value="Fellowship">Fellowship</SelectItem>
                  <SelectItem value="Scholarship">Scholarship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGrants.map((grant, index) => (
              <motion.div
                key={grant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg line-clamp-2">{grant.title}</CardTitle>
                        <p className="text-sm text-gray-600">{grant.fundingAgency}</p>
                        <p className="text-sm text-gray-500">{grant.principalInvestigator}</p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Badge className={getStatusColor(grant.status)}>
                          {grant.status}
                        </Badge>
                        <Badge className={getPriorityColor(grant.priority)}>
                          {grant.priority}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(grant.grantType)}
                      <span className="text-sm font-medium">{grant.grantType}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm font-bold text-green-600">
                        {grant.currency} {grant.amount.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">{grant.progress}%</span>
                      </div>
                      <Progress value={grant.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Deadline:</span>
                        <span className="ml-1 font-medium">{grant.deadline.toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Department:</span>
                        <span className="ml-1 font-medium">{grant.department}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedGrant(grant);
                            setIsViewModalOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedGrant(grant);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedGrant(grant);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-xs text-gray-500">
                        {grant.updatedAt.toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Grant Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredGrants.map((grant, index) => (
                  <div key={grant.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      {getTypeIcon(grant.grantType)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{grant.title}</h3>
                      <p className="text-sm text-gray-600">{grant.fundingAgency}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span>Deadline: {grant.deadline.toLocaleDateString()}</span>
                        <span>Progress: {grant.progress}%</span>
                        <Badge className={getStatusColor(grant.status)}>
                          {grant.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        {grant.currency} {grant.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Budget Tab */}
        <TabsContent value="budget" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredGrants.map((grant, index) => (
                  <div key={grant.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{grant.title}</h3>
                      <span className="font-bold text-green-600">
                        {grant.currency} {grant.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {grant.budgetBreakdown.map((item, itemIndex) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{item.category}</span>
                            <Badge variant="outline">{item.percentage}%</Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{grant.currency} {item.amount.toLocaleString()}</span>
                            <Badge className={item.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredGrants.map((grant, index) => (
                  <div key={grant.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{grant.title}</h3>
                      <span className="text-sm text-gray-500">{grant.documents.length} documents</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {grant.documents.map((doc, docIndex) => (
                        <div key={doc.id} className="flex items-center space-x-2 p-2 border rounded">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span className="text-sm flex-1">{doc.name}</span>
                          <Badge variant="outline">{doc.type}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Grant Details</DialogTitle>
          </DialogHeader>
          {selectedGrant && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg">{selectedGrant.title}</h3>
                  <p className="text-gray-600">{selectedGrant.fundingAgency}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedGrant.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount:</span>
                    <span className="font-medium text-green-600">
                      {selectedGrant.currency} {selectedGrant.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <Badge variant="outline">{selectedGrant.grantType}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge className={getStatusColor(selectedGrant.status)}>
                      {selectedGrant.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Priority:</span>
                    <Badge className={getPriorityColor(selectedGrant.priority)}>
                      {selectedGrant.priority}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Principal Investigator:</span>
                    <span className="font-medium">{selectedGrant.principalInvestigator}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Department:</span>
                    <span className="font-medium">{selectedGrant.department}</span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="milestones">Milestones</TabsTrigger>
                  <TabsTrigger value="budget">Budget</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Objectives</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {selectedGrant.objectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Deliverables</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {selectedGrant.deliverables.map((deliverable, index) => (
                        <li key={index}>{deliverable}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedGrant.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline">{keyword}</Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="milestones" className="space-y-4">
                  <div className="space-y-3">
                    {selectedGrant.milestones.map((milestone, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{milestone.title}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{milestone.status}</Badge>
                            <span className="text-sm text-gray-500">{milestone.progress}%</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Due: {milestone.dueDate.toLocaleDateString()}</span>
                            <span className="text-gray-500">{milestone.deliverables.length} deliverables</span>
                          </div>
                          <Progress value={milestone.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="budget" className="space-y-4">
                  <div className="space-y-3">
                    {selectedGrant.budgetBreakdown.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{item.category}</span>
                          <Badge variant="outline">{item.percentage}%</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            {selectedGrant.currency} {item.amount.toLocaleString()}
                          </span>
                          <Badge className={item.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-4">
                  <div className="space-y-3">
                    {selectedGrant.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{doc.name}</span>
                          <Badge variant="outline">{doc.type}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">
                            {(doc.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                          <Badge className={doc.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {doc.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            Are you sure you want to delete this grant? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => selectedGrant && handleDeleteGrant(selectedGrant.id)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
