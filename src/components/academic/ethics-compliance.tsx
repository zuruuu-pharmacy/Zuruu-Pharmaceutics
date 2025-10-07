"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, CheckCircle, XCircle, AlertTriangle, FileText, Users, Calendar,
  Clock, Star, Target, TrendingUp, BarChart3, Plus, Search, Filter, Edit,
  Trash2, Eye, Download, Upload, Settings, Save, RefreshCw, Share2, Lock,
  Unlock, Copy, ExternalLink, Play, Pause, Square, Zap, Bell, MessageSquare,
  Heart, Globe, Building, Award, Microscope, FlaskConical, TestTube, Atom,
  Brain, Database, DollarSign, GraduationCap, BookOpen, Gavel, Scale
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

interface EthicsCase {
  id: string;
  title: string;
  description: string;
  type: 'Research Ethics' | 'Data Privacy' | 'Conflict of Interest' | 'Publication Ethics' | 'Animal Welfare' | 'Human Subjects';
  status: 'Open' | 'Under Review' | 'Approved' | 'Rejected' | 'Closed' | 'Appeal';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  severity: 'Minor' | 'Moderate' | 'Major' | 'Severe';
  submittedBy: string;
  submittedDate: Date;
  assignedTo: string;
  dueDate: Date;
  resolutionDate?: Date;
  committee: string;
  documents: Document[];
  reviews: Review[];
  actions: Action[];
  compliance: Compliance[];
  createdAt: Date;
  updatedAt: Date;
}

interface Document {
  id: string;
  name: string;
  type: 'Application' | 'Protocol' | 'Consent Form' | 'Report' | 'Certificate' | 'Other';
  url: string;
  uploadedDate: Date;
  size: number;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
}

interface Review {
  id: string;
  reviewer: string;
  role: 'Chair' | 'Member' | 'External' | 'Observer';
  score: number;
  comments: string;
  date: Date;
  status: 'Pending' | 'Completed';
}

interface Action {
  id: string;
  description: string;
  assignedTo: string;
  dueDate: Date;
  completedDate?: Date;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  priority: 'Low' | 'Medium' | 'High';
}

interface Compliance {
  id: string;
  regulation: string;
  requirement: string;
  status: 'Compliant' | 'Non-Compliant' | 'Under Review' | 'Not Applicable';
  evidence: string;
  lastChecked: Date;
  nextCheck: Date;
}

const generateMockEthicsCase = (id: number): EthicsCase => {
  const types: EthicsCase['type'][] = ['Research Ethics', 'Data Privacy', 'Conflict of Interest', 'Publication Ethics', 'Animal Welfare', 'Human Subjects'];
  const statuses: EthicsCase['status'][] = ['Open', 'Under Review', 'Approved', 'Rejected', 'Closed', 'Appeal'];
  const priorities: EthicsCase['priority'][] = ['Low', 'Medium', 'High', 'Critical'];
  const severities: EthicsCase['severity'][] = ['Minor', 'Moderate', 'Major', 'Severe'];
  const committees = ['IRB', 'IACUC', 'Data Protection', 'Research Ethics', 'Conflict of Interest'];
  
  const type = faker.helpers.arrayElement(types);
  const status = faker.helpers.arrayElement(statuses);
  const priority = faker.helpers.arrayElement(priorities);
  const severity = faker.helpers.arrayElement(severities);
  const committee = faker.helpers.arrayElement(committees);
  
  const documents: Document[] = Array.from({ length: faker.number.int({ min: 2, max: 8 }) }).map(() => ({
    id: faker.string.uuid(),
    name: faker.lorem.words(2) + '.pdf',
    type: faker.helpers.arrayElement(['Application', 'Protocol', 'Consent Form', 'Report', 'Certificate', 'Other']),
    url: faker.internet.url(),
    uploadedDate: faker.date.past({ years: 1 }),
    size: faker.number.int({ min: 100000, max: 10000000 }),
    status: faker.helpers.arrayElement(['Draft', 'Submitted', 'Approved', 'Rejected'])
  }));
  
  const reviews: Review[] = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => ({
    id: faker.string.uuid(),
    reviewer: faker.person.fullName(),
    role: faker.helpers.arrayElement(['Chair', 'Member', 'External', 'Observer']),
    score: faker.number.int({ min: 1, max: 10 }),
    comments: faker.lorem.paragraph(),
    date: faker.date.recent({ days: 30 }),
    status: faker.helpers.arrayElement(['Pending', 'Completed'])
  }));
  
  const actions: Action[] = Array.from({ length: faker.number.int({ min: 1, max: 6 }) }).map(() => ({
    id: faker.string.uuid(),
    description: faker.lorem.sentence(),
    assignedTo: faker.person.fullName(),
    dueDate: faker.date.future({ years: 1 }),
    completedDate: faker.datatype.boolean(0.7) ? faker.date.past({ years: 1 }) : undefined,
    status: faker.helpers.arrayElement(['Pending', 'In Progress', 'Completed', 'Overdue']),
    priority: faker.helpers.arrayElement(['Low', 'Medium', 'High'])
  }));
  
  const compliance: Compliance[] = Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => ({
    id: faker.string.uuid(),
    regulation: faker.helpers.arrayElement(['GDPR', 'HIPAA', 'FERPA', 'IRB Guidelines', 'IACUC Standards', 'COI Policy']),
    requirement: faker.lorem.sentence(),
    status: faker.helpers.arrayElement(['Compliant', 'Non-Compliant', 'Under Review', 'Not Applicable']),
    evidence: faker.lorem.sentence(),
    lastChecked: faker.date.past({ years: 1 }),
    nextCheck: faker.date.future({ years: 1 })
  }));
  
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(4),
    description: faker.lorem.paragraphs(2),
    type,
    status,
    priority,
    severity,
    submittedBy: faker.person.fullName(),
    submittedDate: faker.date.past({ years: 1 }),
    assignedTo: faker.person.fullName(),
    dueDate: faker.date.future({ years: 1 }),
    resolutionDate: faker.datatype.boolean(0.6) ? faker.date.past({ years: 1 }) : undefined,
    committee,
    documents,
    reviews,
    actions,
    compliance,
    createdAt: faker.date.past({ years: 2 }),
    updatedAt: faker.date.recent({ days: 30 })
  };
};

export default function EthicsCompliance() {
  const [cases, setCases] = useState<EthicsCase[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<EthicsCase | null>(null);

  useEffect(() => {
    const mockCases = Array.from({ length: 20 }, (_, i) => generateMockEthicsCase(i));
    setCases(mockCases);
  }, []);

  const filteredCases = useMemo(() => {
    return cases.filter(case_ => {
      const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           case_.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           case_.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || case_.status === filterStatus;
      const matchesType = filterType === 'All' || case_.type === filterType;
      const matchesPriority = filterPriority === 'All' || case_.priority === filterPriority;
      
      return matchesSearch && matchesStatus && matchesType && matchesPriority;
    });
  }, [cases, searchTerm, filterStatus, filterType, filterPriority]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Open': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'Appeal': return 'bg-orange-100 text-orange-800';
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Severe': return 'bg-red-100 text-red-800';
      case 'Major': return 'bg-orange-100 text-orange-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Minor': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Research Ethics': return <Microscope className="w-5 h-5" />;
      case 'Data Privacy': return <Lock className="w-5 h-5" />;
      case 'Conflict of Interest': return <AlertTriangle className="w-5 h-5" />;
      case 'Publication Ethics': return <FileText className="w-5 h-5" />;
      case 'Animal Welfare': return <Heart className="w-5 h-5" />;
      case 'Human Subjects': return <Users className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ethics & Compliance</h1>
          <p className="text-gray-600 mt-2">Manage research ethics, compliance monitoring, and regulatory adherence</p>
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
                New Ethics Case
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Ethics Case</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Case Title</Label>
                  <Input placeholder="Enter case title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Research Ethics">Research Ethics</SelectItem>
                        <SelectItem value="Data Privacy">Data Privacy</SelectItem>
                        <SelectItem value="Conflict of Interest">Conflict of Interest</SelectItem>
                        <SelectItem value="Publication Ethics">Publication Ethics</SelectItem>
                        <SelectItem value="Animal Welfare">Animal Welfare</SelectItem>
                        <SelectItem value="Human Subjects">Human Subjects</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Enter case description" rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddModalOpen(false)}>
                  Create Case
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
                <p className="text-sm font-medium text-gray-600">Total Cases</p>
                <p className="text-2xl font-bold text-gray-900">{cases.length}</p>
              </div>
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {cases.filter(c => c.status === 'Approved').length} approved
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-gray-900">
                  {cases.filter(c => c.status === 'Under Review').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-yellow-600">
                {cases.filter(c => c.status === 'Open').length} open
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliance Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {cases.length > 0 ? Math.round((cases.filter(c => c.status === 'Approved').length / cases.length) * 100) : 0}%
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {cases.filter(c => c.priority === 'Critical').length} critical cases
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue Actions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {cases.reduce((sum, c) => sum + c.actions.filter(a => a.status === 'Overdue').length, 0)}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-red-600">
                Requires attention
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
                  placeholder="Search cases..."
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
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                  <SelectItem value="Appeal">Appeal</SelectItem>
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
                  <SelectItem value="Research Ethics">Research Ethics</SelectItem>
                  <SelectItem value="Data Privacy">Data Privacy</SelectItem>
                  <SelectItem value="Conflict of Interest">Conflict of Interest</SelectItem>
                  <SelectItem value="Publication Ethics">Publication Ethics</SelectItem>
                  <SelectItem value="Animal Welfare">Animal Welfare</SelectItem>
                  <SelectItem value="Human Subjects">Human Subjects</SelectItem>
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
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((case_, index) => (
          <motion.div
            key={case_.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg line-clamp-2">{case_.title}</CardTitle>
                    <p className="text-sm text-gray-600">{case_.committee}</p>
                    <p className="text-sm text-gray-500">Submitted by: {case_.submittedBy}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getStatusColor(case_.status)}>
                      {case_.status}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {getTypeIcon(case_.type)}
                      <span className="text-xs text-gray-500">{case_.type}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(case_.priority)}>
                    {case_.priority}
                  </Badge>
                  <Badge className={getSeverityColor(case_.severity)}>
                    {case_.severity}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Assigned to:</span>
                    <span className="ml-1 font-medium">{case_.assignedTo}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Due:</span>
                    <span className="ml-1 font-medium">{case_.dueDate.toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Documents:</span>
                    <span className="ml-1 font-medium">{case_.documents.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Actions:</span>
                    <span className="ml-1 font-medium">{case_.actions.length}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">
                      {case_.actions.length > 0 ? Math.round((case_.actions.filter(a => a.status === 'Completed').length / case_.actions.length) * 100) : 0}%
                    </span>
                  </div>
                  <Progress 
                    value={case_.actions.length > 0 ? (case_.actions.filter(a => a.status === 'Completed').length / case_.actions.length) * 100 : 0} 
                    className="h-2" 
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedCase(case_);
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
                    {case_.submittedDate.toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ethics Case Details</DialogTitle>
          </DialogHeader>
          {selectedCase && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg">{selectedCase.title}</h3>
                  <p className="text-gray-600">{selectedCase.committee}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedCase.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <Badge variant="outline">{selectedCase.type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge className={getStatusColor(selectedCase.status)}>
                      {selectedCase.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Priority:</span>
                    <Badge className={getPriorityColor(selectedCase.priority)}>
                      {selectedCase.priority}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Severity:</span>
                    <Badge className={getSeverityColor(selectedCase.severity)}>
                      {selectedCase.severity}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Submitted by:</span>
                    <span className="font-medium">{selectedCase.submittedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Assigned to:</span>
                    <span className="font-medium">{selectedCase.assignedTo}</span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="space-y-3">
                    {selectedCase.reviews.map((review, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{review.reviewer}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{review.role}</Badge>
                            <Badge className={review.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {review.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{review.comments}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Score: {review.score}/10</span>
                          <span className="text-gray-500">{review.date.toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-4">
                  <div className="space-y-3">
                    {selectedCase.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <div>
                            <span className="font-medium">{doc.name}</span>
                            <p className="text-sm text-gray-500">{doc.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{doc.status}</Badge>
                          <span className="text-sm text-gray-500">
                            {(doc.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="actions" className="space-y-4">
                  <div className="space-y-3">
                    {selectedCase.actions.map((action, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{action.description}</span>
                          <Badge className={action.status === 'Completed' ? 'bg-green-100 text-green-800' : action.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                            {action.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Assigned to: {action.assignedTo}</span>
                          <span className="text-gray-500">Due: {action.dueDate.toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="compliance" className="space-y-4">
                  <div className="space-y-3">
                    {selectedCase.compliance.map((comp, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{comp.regulation}</span>
                          <Badge className={comp.status === 'Compliant' ? 'bg-green-100 text-green-800' : comp.status === 'Non-Compliant' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                            {comp.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{comp.requirement}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Evidence: {comp.evidence}</span>
                          <span className="text-gray-500">Next check: {comp.nextCheck.toLocaleDateString()}</span>
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
    </div>
  );
}
