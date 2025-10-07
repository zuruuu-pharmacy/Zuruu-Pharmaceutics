"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, CheckCircle, XCircle, AlertTriangle, FileText, Users, Calendar,
  Clock, Star, Target, TrendingUp, BarChart3, Plus, Search, Filter, Edit,
  Trash2, Eye, Download, Upload, Settings, Save, RefreshCw, Share2, Lock,
  Unlock, Copy, ExternalLink, Play, Pause, Square, Zap, Bell, MessageSquare,
  Heart, Globe, Building, Award, Microscope, FlaskConical, TestTube, Atom,
  Brain, Database, DollarSign, GraduationCap, BookOpen, Gavel, Scale, Clipboard
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

interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  type: 'IRB Approval' | 'IACUC Protocol' | 'Data Protection' | 'Safety Protocol' | 'Export Control' | 'Conflict of Interest';
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Expired' | 'Renewal Required';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  category: 'Regulatory' | 'Safety' | 'Ethics' | 'Data' | 'Financial' | 'Administrative';
  responsible: string;
  dueDate: Date;
  approvalDate?: Date;
  expiryDate?: Date;
  documents: Document[];
  requirements: Requirement[];
  audits: Audit[];
  violations: Violation[];
  createdAt: Date;
  updatedAt: Date;
}

interface Document {
  id: string;
  name: string;
  type: 'Application' | 'Protocol' | 'Certificate' | 'Report' | 'Policy' | 'Other';
  url: string;
  uploadedDate: Date;
  size: number;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  version: string;
}

interface Requirement {
  id: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Overdue';
  dueDate: Date;
  completedDate?: Date;
  evidence: string;
}

interface Audit {
  id: string;
  auditor: string;
  date: Date;
  findings: string[];
  recommendations: string[];
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Follow-up Required';
  score: number;
}

interface Violation {
  id: string;
  description: string;
  severity: 'Minor' | 'Moderate' | 'Major' | 'Critical';
  reportedDate: Date;
  resolvedDate?: Date;
  status: 'Open' | 'Under Investigation' | 'Resolved' | 'Closed';
  correctiveActions: string[];
}

const generateMockComplianceItem = (id: number): ComplianceItem => {
  const types: ComplianceItem['type'][] = ['IRB Approval', 'IACUC Protocol', 'Data Protection', 'Safety Protocol', 'Export Control', 'Conflict of Interest'];
  const statuses: ComplianceItem['status'][] = ['Pending', 'Under Review', 'Approved', 'Rejected', 'Expired', 'Renewal Required'];
  const priorities: ComplianceItem['priority'][] = ['Low', 'Medium', 'High', 'Critical'];
  const categories: ComplianceItem['category'][] = ['Regulatory', 'Safety', 'Ethics', 'Data', 'Financial', 'Administrative'];
  
  const type = faker.helpers.arrayElement(types);
  const status = faker.helpers.arrayElement(statuses);
  const priority = faker.helpers.arrayElement(priorities);
  const category = faker.helpers.arrayElement(categories);
  
  const documents: Document[] = Array.from({ length: faker.number.int({ min: 2, max: 8 }) }).map(() => ({
    id: faker.string.uuid(),
    name: faker.lorem.words(2) + '.pdf',
    type: faker.helpers.arrayElement(['Application', 'Protocol', 'Certificate', 'Report', 'Policy', 'Other']),
    url: faker.internet.url(),
    uploadedDate: faker.date.past({ years: 1 }),
    size: faker.number.int({ min: 100000, max: 10000000 }),
    status: faker.helpers.arrayElement(['Draft', 'Submitted', 'Approved', 'Rejected']),
    version: `v${faker.number.int({ min: 1, max: 5 })}.${faker.number.int({ min: 0, max: 9 })}`
  }));
  
  const requirements: Requirement[] = Array.from({ length: faker.number.int({ min: 3, max: 10 }) }).map(() => ({
    id: faker.string.uuid(),
    description: faker.lorem.sentence(),
    status: faker.helpers.arrayElement(['Not Started', 'In Progress', 'Completed', 'Overdue']),
    dueDate: faker.date.future({ years: 1 }),
    completedDate: faker.datatype.boolean(0.7) ? faker.date.past({ years: 1 }) : undefined,
    evidence: faker.lorem.sentence()
  }));
  
  const audits: Audit[] = Array.from({ length: faker.number.int({ min: 0, max: 3 }) }).map(() => ({
    id: faker.string.uuid(),
    auditor: faker.person.fullName(),
    date: faker.date.past({ years: 1 }),
    findings: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => faker.lorem.sentence()),
    recommendations: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map(() => faker.lorem.sentence()),
    status: faker.helpers.arrayElement(['Scheduled', 'In Progress', 'Completed', 'Follow-up Required']),
    score: faker.number.int({ min: 60, max: 100 })
  }));
  
  const violations: Violation[] = Array.from({ length: faker.number.int({ min: 0, max: 3 }) }).map(() => ({
    id: faker.string.uuid(),
    description: faker.lorem.sentence(),
    severity: faker.helpers.arrayElement(['Minor', 'Moderate', 'Major', 'Critical']),
    reportedDate: faker.date.past({ years: 1 }),
    resolvedDate: faker.datatype.boolean(0.8) ? faker.date.past({ years: 1 }) : undefined,
    status: faker.helpers.arrayElement(['Open', 'Under Investigation', 'Resolved', 'Closed']),
    correctiveActions: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => faker.lorem.sentence())
  }));
  
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(4),
    description: faker.lorem.paragraphs(2),
    type,
    status,
    priority,
    category,
    responsible: faker.person.fullName(),
    dueDate: faker.date.future({ years: 1 }),
    approvalDate: faker.datatype.boolean(0.6) ? faker.date.past({ years: 1 }) : undefined,
    expiryDate: faker.date.future({ years: 2 }),
    documents,
    requirements,
    audits,
    violations,
    createdAt: faker.date.past({ years: 2 }),
    updatedAt: faker.date.recent({ days: 30 })
  };
};

export default function ResearchCompliance() {
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ComplianceItem | null>(null);

  useEffect(() => {
    const mockItems = Array.from({ length: 20 }, (_, i) => generateMockComplianceItem(i));
    setComplianceItems(mockItems);
  }, []);

  const filteredItems = useMemo(() => {
    return complianceItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.responsible.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
      const matchesType = filterType === 'All' || item.type === filterType;
      const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
      
      return matchesSearch && matchesStatus && matchesType && matchesCategory;
    });
  }, [complianceItems, searchTerm, filterStatus, filterType, filterCategory]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Expired': return 'bg-gray-100 text-gray-800';
      case 'Renewal Required': return 'bg-orange-100 text-orange-800';
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
      case 'IRB Approval': return <Users className="w-5 h-5" />;
      case 'IACUC Protocol': return <Heart className="w-5 h-5" />;
      case 'Data Protection': return <Lock className="w-5 h-5" />;
      case 'Safety Protocol': return <Shield className="w-5 h-5" />;
      case 'Export Control': return <Globe className="w-5 h-5" />;
      case 'Conflict of Interest': return <AlertTriangle className="w-5 h-5" />;
      default: return <Clipboard className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Research Compliance</h1>
          <p className="text-gray-600 mt-2">Manage regulatory compliance, ethics approvals, and audit trails</p>
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
                New Compliance Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Compliance Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Item Title</Label>
                  <Input placeholder="Enter compliance item title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IRB Approval">IRB Approval</SelectItem>
                        <SelectItem value="IACUC Protocol">IACUC Protocol</SelectItem>
                        <SelectItem value="Data Protection">Data Protection</SelectItem>
                        <SelectItem value="Safety Protocol">Safety Protocol</SelectItem>
                        <SelectItem value="Export Control">Export Control</SelectItem>
                        <SelectItem value="Conflict of Interest">Conflict of Interest</SelectItem>
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
                        <SelectItem value="Regulatory">Regulatory</SelectItem>
                        <SelectItem value="Safety">Safety</SelectItem>
                        <SelectItem value="Ethics">Ethics</SelectItem>
                        <SelectItem value="Data">Data</SelectItem>
                        <SelectItem value="Financial">Financial</SelectItem>
                        <SelectItem value="Administrative">Administrative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Enter description" rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddModalOpen(false)}>
                  Create Item
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
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{complianceItems.length}</p>
              </div>
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {complianceItems.filter(i => i.status === 'Approved').length} approved
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
                  {complianceItems.filter(i => i.status === 'Under Review').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-yellow-600">
                {complianceItems.filter(i => i.status === 'Pending').length} pending
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
                  {complianceItems.length > 0 ? Math.round((complianceItems.filter(i => i.status === 'Approved').length / complianceItems.length) * 100) : 0}%
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {complianceItems.filter(i => i.priority === 'Critical').length} critical items
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Violations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {complianceItems.reduce((sum, i) => sum + i.violations.length, 0)}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-red-600">
                {complianceItems.reduce((sum, i) => sum + i.violations.filter(v => v.status === 'Open').length, 0)} open
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
                  placeholder="Search compliance items..."
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
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                  <SelectItem value="Renewal Required">Renewal Required</SelectItem>
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
                  <SelectItem value="IRB Approval">IRB Approval</SelectItem>
                  <SelectItem value="IACUC Protocol">IACUC Protocol</SelectItem>
                  <SelectItem value="Data Protection">Data Protection</SelectItem>
                  <SelectItem value="Safety Protocol">Safety Protocol</SelectItem>
                  <SelectItem value="Export Control">Export Control</SelectItem>
                  <SelectItem value="Conflict of Interest">Conflict of Interest</SelectItem>
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
                  <SelectItem value="Regulatory">Regulatory</SelectItem>
                  <SelectItem value="Safety">Safety</SelectItem>
                  <SelectItem value="Ethics">Ethics</SelectItem>
                  <SelectItem value="Data">Data</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Administrative">Administrative</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    <p className="text-sm text-gray-500">Responsible: {item.responsible}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {getTypeIcon(item.type)}
                      <span className="text-xs text-gray-500">{item.type}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Due: {item.dueDate.toLocaleDateString()}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Documents:</span>
                    <span className="ml-1 font-medium">{item.documents.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Requirements:</span>
                    <span className="ml-1 font-medium">{item.requirements.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Audits:</span>
                    <span className="ml-1 font-medium">{item.audits.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Violations:</span>
                    <span className="ml-1 font-medium">{item.violations.length}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">
                      {item.requirements.length > 0 ? Math.round((item.requirements.filter(r => r.status === 'Completed').length / item.requirements.length) * 100) : 0}%
                    </span>
                  </div>
                  <Progress 
                    value={item.requirements.length > 0 ? (item.requirements.filter(r => r.status === 'Completed').length / item.requirements.length) * 100 : 0} 
                    className="h-2" 
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedItem(item);
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
                    {item.createdAt.toLocaleDateString()}
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
            <DialogTitle>Compliance Item Details</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg">{selectedItem.title}</h3>
                  <p className="text-gray-600">{selectedItem.category}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedItem.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <Badge variant="outline">{selectedItem.type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge className={getStatusColor(selectedItem.status)}>
                      {selectedItem.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Priority:</span>
                    <Badge className={getPriorityColor(selectedItem.priority)}>
                      {selectedItem.priority}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Responsible:</span>
                    <span className="font-medium">{selectedItem.responsible}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Due Date:</span>
                    <span className="font-medium">{selectedItem.dueDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Expiry Date:</span>
                    <span className="font-medium">{selectedItem.expiryDate?.toLocaleDateString() || 'N/A'}</span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="audits">Audits</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="space-y-3">
                    {selectedItem.violations.map((violation, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{violation.description}</span>
                          <div className="flex items-center space-x-2">
                            <Badge className={violation.severity === 'Critical' ? 'bg-red-100 text-red-800' : violation.severity === 'Major' ? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'}>
                              {violation.severity}
                            </Badge>
                            <Badge variant="outline">{violation.status}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Reported: {violation.reportedDate.toLocaleDateString()}</span>
                          <span className="text-gray-500">Actions: {violation.correctiveActions.length}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-4">
                  <div className="space-y-3">
                    {selectedItem.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <div>
                            <span className="font-medium">{doc.name}</span>
                            <p className="text-sm text-gray-500">{doc.type} - {doc.version}</p>
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
                
                <TabsContent value="requirements" className="space-y-4">
                  <div className="space-y-3">
                    {selectedItem.requirements.map((req, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{req.description}</span>
                          <Badge className={req.status === 'Completed' ? 'bg-green-100 text-green-800' : req.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                            {req.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Due: {req.dueDate.toLocaleDateString()}</span>
                          <span className="text-gray-500">Evidence: {req.evidence}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="audits" className="space-y-4">
                  <div className="space-y-3">
                    {selectedItem.audits.map((audit, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Audit by {audit.auditor}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">Score: {audit.score}/100</Badge>
                            <Badge className={audit.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {audit.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <h4 className="font-semibold text-sm">Findings:</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {audit.findings.map((finding, i) => (
                                <li key={i}>{finding}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">Recommendations:</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {audit.recommendations.map((rec, i) => (
                                <li key={i}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-2">
                          <span className="text-gray-500">Date: {audit.date.toLocaleDateString()}</span>
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
