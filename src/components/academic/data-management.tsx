"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Database, FileText, Cloud, Lock, Upload, Download, Search, Filter,
  Edit, Trash2, Eye, Plus, Settings, Save, RefreshCw, Share2, Unlock,
  Copy, ExternalLink, Play, Pause, Square, Zap, Bell, MessageSquare,
  Heart, Globe, Building, Award, Microscope, FlaskConical, TestTube, Atom,
  Brain, GraduationCap, BookOpen, Users, Calendar, Shield, Gavel, Scale,
  Clipboard, CheckCircle, XCircle, AlertTriangle, Star, Target, TrendingUp,
  BarChart3, Clock, DollarSign, PieChart, LineChart, Folder, HardDrive
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

interface Dataset {
  id: string;
  title: string;
  description: string;
  type: 'Research Data' | 'Clinical Data' | 'Survey Data' | 'Experimental Data' | 'Observational Data' | 'Simulation Data';
  format: 'CSV' | 'JSON' | 'XML' | 'Excel' | 'Database' | 'Image' | 'Video' | 'Audio' | 'Text' | 'Other';
  size: number;
  status: 'Active' | 'Archived' | 'Processing' | 'Error' | 'Pending Review';
  privacy: 'Public' | 'Internal' | 'Confidential' | 'Restricted';
  owner: string;
  contributors: string[];
  tags: string[];
  version: string;
  lastModified: Date;
  createdDate: Date;
  accessLevel: 'Read' | 'Write' | 'Admin';
  retentionPolicy: RetentionPolicy;
  backupStatus: BackupStatus;
  metadata: Metadata;
  quality: QualityMetrics;
  usage: UsageStats;
}

interface RetentionPolicy {
  id: string;
  duration: number; // in years
  autoDelete: boolean;
  archiveAfter: number; // in years
  compliance: string[];
  lastReview: Date;
  nextReview: Date;
}

interface BackupStatus {
  lastBackup: Date;
  nextBackup: Date;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly';
  location: string;
  status: 'Success' | 'Failed' | 'In Progress' | 'Scheduled';
  size: number;
}

interface Metadata {
  id: string;
  schema: string;
  fields: Field[];
  validation: ValidationRule[];
  documentation: string;
  standards: string[];
}

interface Field {
  name: string;
  type: string;
  description: string;
  required: boolean;
  constraints: string[];
}

interface ValidationRule {
  field: string;
  rule: string;
  message: string;
  severity: 'Error' | 'Warning' | 'Info';
}

interface QualityMetrics {
  completeness: number;
  accuracy: number;
  consistency: number;
  validity: number;
  timeliness: number;
  overall: number;
  lastChecked: Date;
  issues: QualityIssue[];
}

interface QualityIssue {
  id: string;
  type: 'Missing Data' | 'Invalid Format' | 'Outlier' | 'Duplicate' | 'Inconsistent';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  affectedRecords: number;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Ignored';
}

interface UsageStats {
  views: number;
  downloads: number;
  shares: number;
  lastAccessed: Date;
  topUsers: string[];
  accessPatterns: AccessPattern[];
}

interface AccessPattern {
  date: Date;
  views: number;
  downloads: number;
  uniqueUsers: number;
}

const generateMockDataset = (id: number): Dataset => {
  const types: Dataset['type'][] = ['Research Data', 'Clinical Data', 'Survey Data', 'Experimental Data', 'Observational Data', 'Simulation Data'];
  const formats: Dataset['format'][] = ['CSV', 'JSON', 'XML', 'Excel', 'Database', 'Image', 'Video', 'Audio', 'Text', 'Other'];
  const statuses: Dataset['status'][] = ['Active', 'Archived', 'Processing', 'Error', 'Pending Review'];
  const privacyLevels: Dataset['privacy'][] = ['Public', 'Internal', 'Confidential', 'Restricted'];
  
  const type = faker.helpers.arrayElement(types);
  const format = faker.helpers.arrayElement(formats);
  const status = faker.helpers.arrayElement(statuses);
  const privacy = faker.helpers.arrayElement(privacyLevels);
  
  const contributors = Array.from({ length: faker.number.int({ min: 1, max: 6 }) }).map(() => faker.person.fullName());
  const tags = Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => faker.lorem.word());
  
  const fields: Field[] = Array.from({ length: faker.number.int({ min: 5, max: 20 }) }).map(() => ({
    name: faker.lorem.word(),
    type: faker.helpers.arrayElement(['String', 'Integer', 'Float', 'Boolean', 'Date', 'DateTime']),
    description: faker.lorem.sentence(),
    required: faker.datatype.boolean(0.7),
    constraints: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }).map(() => faker.lorem.word())
  }));
  
  const validationRules: ValidationRule[] = Array.from({ length: faker.number.int({ min: 2, max: 8 }) }).map(() => ({
    field: faker.helpers.arrayElement(fields).name,
    rule: faker.lorem.sentence(),
    message: faker.lorem.sentence(),
    severity: faker.helpers.arrayElement(['Error', 'Warning', 'Info'])
  }));
  
  const qualityIssues: QualityIssue[] = Array.from({ length: faker.number.int({ min: 0, max: 5 }) }).map(() => ({
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(['Missing Data', 'Invalid Format', 'Outlier', 'Duplicate', 'Inconsistent']),
    severity: faker.helpers.arrayElement(['Low', 'Medium', 'High', 'Critical']),
    description: faker.lorem.sentence(),
    affectedRecords: faker.number.int({ min: 1, max: 1000 }),
    status: faker.helpers.arrayElement(['Open', 'In Progress', 'Resolved', 'Ignored'])
  }));
  
  const accessPatterns: AccessPattern[] = Array.from({ length: 30 }).map((_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
    views: faker.number.int({ min: 0, max: 50 }),
    downloads: faker.number.int({ min: 0, max: 10 }),
    uniqueUsers: faker.number.int({ min: 0, max: 20 })
  }));
  
  const size = faker.number.int({ min: 1024, max: 1073741824 }); // 1KB to 1GB
  
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(4),
    description: faker.lorem.paragraphs(2),
    type,
    format,
    size,
    status,
    privacy,
    owner: faker.person.fullName(),
    contributors,
    tags,
    version: `v${faker.number.int({ min: 1, max: 10 })}.${faker.number.int({ min: 0, max: 9 })}`,
    lastModified: faker.date.recent({ days: 30 }),
    createdDate: faker.date.past({ years: 2 }),
    accessLevel: faker.helpers.arrayElement(['Read', 'Write', 'Admin']),
    retentionPolicy: {
      id: faker.string.uuid(),
      duration: faker.number.int({ min: 1, max: 10 }),
      autoDelete: faker.datatype.boolean(0.3),
      archiveAfter: faker.number.int({ min: 1, max: 5 }),
      compliance: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map(() => faker.helpers.arrayElement(['GDPR', 'HIPAA', 'FERPA', 'SOX'])),
      lastReview: faker.date.past({ years: 1 }),
      nextReview: faker.date.future({ years: 1 })
    },
    backupStatus: {
      lastBackup: faker.date.recent(),
      nextBackup: faker.date.future(),
      frequency: faker.helpers.arrayElement(['Daily', 'Weekly', 'Monthly', 'Quarterly']),
      location: faker.helpers.arrayElement(['AWS S3', 'Google Cloud', 'Azure Blob', 'Local Server']),
      status: faker.helpers.arrayElement(['Success', 'Failed', 'In Progress', 'Scheduled']),
      size: Math.floor(size * 0.8)
    },
    metadata: {
      id: faker.string.uuid(),
      schema: faker.helpers.arrayElement(['JSON Schema', 'XML Schema', 'Relational', 'NoSQL', 'Custom']),
      fields,
      validation: validationRules,
      documentation: faker.lorem.paragraphs(3),
      standards: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => faker.helpers.arrayElement(['ISO 27001', 'NIST', 'Dublin Core', 'DataCite']))
    },
    quality: {
      completeness: faker.number.float({ min: 70, max: 100, fractionDigits: 0.1 }),
      accuracy: faker.number.float({ min: 80, max: 100, fractionDigits: 0.1 }),
      consistency: faker.number.float({ min: 75, max: 100, fractionDigits: 0.1 }),
      validity: faker.number.float({ min: 85, max: 100, fractionDigits: 0.1 }),
      timeliness: faker.number.float({ min: 60, max: 100, fractionDigits: 0.1 }),
      overall: 0,
      lastChecked: faker.date.recent({ days: 7 }),
      issues: qualityIssues
    },
    usage: {
      views: faker.number.int({ min: 0, max: 1000 }),
      downloads: faker.number.int({ min: 0, max: 100 }),
      shares: faker.number.int({ min: 0, max: 50 }),
      lastAccessed: faker.date.recent({ days: 7 }),
      topUsers: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => faker.person.fullName()),
      accessPatterns
    }
  };
};

export default function DataManagement() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterPrivacy, setFilterPrivacy] = useState<string>('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  useEffect(() => {
    const mockDatasets = Array.from({ length: 25 }, (_, i) => generateMockDataset(i));
    // Calculate overall quality score
    mockDatasets.forEach(dataset => {
      dataset.quality.overall = Math.round(
        (dataset.quality.completeness + dataset.quality.accuracy + 
         dataset.quality.consistency + dataset.quality.validity + 
         dataset.quality.timeliness) / 5
      );
    });
    setDatasets(mockDatasets);
  }, []);

  const filteredDatasets = useMemo(() => {
    return datasets.filter(dataset => {
      const matchesSearch = dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dataset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dataset.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dataset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = filterStatus === 'All' || dataset.status === filterStatus;
      const matchesType = filterType === 'All' || dataset.type === filterType;
      const matchesPrivacy = filterPrivacy === 'All' || dataset.privacy === filterPrivacy;
      
      return matchesSearch && matchesStatus && matchesType && matchesPrivacy;
    });
  }, [datasets, searchTerm, filterStatus, filterType, filterPrivacy]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Error': return 'bg-red-100 text-red-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrivacyColor = (privacy: string) => {
    switch (privacy) {
      case 'Public': return 'bg-green-100 text-green-800';
      case 'Internal': return 'bg-blue-100 text-blue-800';
      case 'Confidential': return 'bg-yellow-100 text-yellow-800';
      case 'Restricted': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'CSV': return <FileText className="w-5 h-5" />;
      case 'JSON': return <Database className="w-5 h-5" />;
      case 'Excel': return <FileText className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Image': return <FileText className="w-5 h-5" />;
      case 'Video': return <FileText className="w-5 h-5" />;
      case 'Audio': return <FileText className="w-5 h-5" />;
      case 'Text': return <FileText className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Research Data Management</h1>
          <p className="text-gray-600 mt-2">Manage research data, metadata, quality, and compliance</p>
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
                New Dataset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Dataset</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Dataset Title</Label>
                  <Input placeholder="Enter dataset title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Research Data">Research Data</SelectItem>
                        <SelectItem value="Clinical Data">Clinical Data</SelectItem>
                        <SelectItem value="Survey Data">Survey Data</SelectItem>
                        <SelectItem value="Experimental Data">Experimental Data</SelectItem>
                        <SelectItem value="Observational Data">Observational Data</SelectItem>
                        <SelectItem value="Simulation Data">Simulation Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Format</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CSV">CSV</SelectItem>
                        <SelectItem value="JSON">JSON</SelectItem>
                        <SelectItem value="XML">XML</SelectItem>
                        <SelectItem value="Excel">Excel</SelectItem>
                        <SelectItem value="Database">Database</SelectItem>
                        <SelectItem value="Image">Image</SelectItem>
                        <SelectItem value="Video">Video</SelectItem>
                        <SelectItem value="Audio">Audio</SelectItem>
                        <SelectItem value="Text">Text</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Enter dataset description" rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddModalOpen(false)}>
                  Create Dataset
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
                <p className="text-sm font-medium text-gray-600">Total Datasets</p>
                <p className="text-2xl font-bold text-gray-900">{datasets.length}</p>
              </div>
              <Database className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {datasets.filter(d => d.status === 'Active').length} active
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Size</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatFileSize(datasets.reduce((sum, d) => sum + d.size, 0))}
                </p>
              </div>
              <HardDrive className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-blue-600">
                {datasets.filter(d => d.privacy === 'Public').length} public
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Quality Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {datasets.length > 0 ? Math.round(datasets.reduce((sum, d) => sum + d.quality.overall, 0) / datasets.length) : 0}%
                </p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-purple-600">
                {datasets.reduce((sum, d) => sum + d.quality.issues.length, 0)} quality issues
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                <p className="text-2xl font-bold text-gray-900">
                  {datasets.reduce((sum, d) => sum + d.usage.downloads, 0)}
                </p>
              </div>
              <Download className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-orange-600">
                {datasets.reduce((sum, d) => sum + d.usage.views, 0)} total views
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
                  placeholder="Search datasets..."
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
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Error">Error</SelectItem>
                  <SelectItem value="Pending Review">Pending Review</SelectItem>
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
                  <SelectItem value="Research Data">Research Data</SelectItem>
                  <SelectItem value="Clinical Data">Clinical Data</SelectItem>
                  <SelectItem value="Survey Data">Survey Data</SelectItem>
                  <SelectItem value="Experimental Data">Experimental Data</SelectItem>
                  <SelectItem value="Observational Data">Observational Data</SelectItem>
                  <SelectItem value="Simulation Data">Simulation Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Privacy</Label>
              <Select value={filterPrivacy} onValueChange={setFilterPrivacy}>
                <SelectTrigger>
                  <SelectValue placeholder="All Privacy Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Privacy Levels</SelectItem>
                  <SelectItem value="Public">Public</SelectItem>
                  <SelectItem value="Internal">Internal</SelectItem>
                  <SelectItem value="Confidential">Confidential</SelectItem>
                  <SelectItem value="Restricted">Restricted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Datasets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDatasets.map((dataset, index) => (
          <motion.div
            key={dataset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg line-clamp-2">{dataset.title}</CardTitle>
                    <p className="text-sm text-gray-600">{dataset.type}</p>
                    <p className="text-sm text-gray-500">Owner: {dataset.owner}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getStatusColor(dataset.status)}>
                      {dataset.status}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {getFormatIcon(dataset.format)}
                      <span className="text-xs text-gray-500">{dataset.format}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge className={getPrivacyColor(dataset.privacy)}>
                    {dataset.privacy}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {formatFileSize(dataset.size)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Version:</span>
                    <span className="ml-1 font-medium">{dataset.version}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Contributors:</span>
                    <span className="ml-1 font-medium">{dataset.contributors.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Quality:</span>
                    <span className="ml-1 font-medium">{dataset.quality.overall}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Downloads:</span>
                    <span className="ml-1 font-medium">{dataset.usage.downloads}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Quality Score</span>
                    <span className="font-medium">{dataset.quality.overall}%</span>
                  </div>
                  <Progress value={dataset.quality.overall} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-1">
                  {dataset.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {dataset.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{dataset.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedDataset(dataset);
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
                    {dataset.lastModified.toLocaleDateString()}
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
            <DialogTitle>Dataset Details</DialogTitle>
          </DialogHeader>
          {selectedDataset && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg">{selectedDataset.title}</h3>
                  <p className="text-gray-600">{selectedDataset.type}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedDataset.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Format:</span>
                    <Badge variant="outline">{selectedDataset.format}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge className={getStatusColor(selectedDataset.status)}>
                      {selectedDataset.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Privacy:</span>
                    <Badge className={getPrivacyColor(selectedDataset.privacy)}>
                      {selectedDataset.privacy}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Size:</span>
                    <span className="font-medium">{formatFileSize(selectedDataset.size)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Version:</span>
                    <span className="font-medium">{selectedDataset.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Owner:</span>
                    <span className="font-medium">{selectedDataset.owner}</span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="metadata">Metadata</TabsTrigger>
                  <TabsTrigger value="quality">Quality</TabsTrigger>
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                  <TabsTrigger value="backup">Backup</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Contributors</h4>
                        <div className="space-y-1">
                          {selectedDataset.contributors.map((contributor, index) => (
                            <div key={index} className="text-sm">{contributor}</div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedDataset.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Retention Policy</h4>
                    <div className="p-3 border rounded-lg">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <span className="ml-1 font-medium">{selectedDataset.retentionPolicy.duration} years</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Auto Delete:</span>
                          <span className="ml-1 font-medium">{selectedDataset.retentionPolicy.autoDelete ? 'Yes' : 'No'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Archive After:</span>
                          <span className="ml-1 font-medium">{selectedDataset.retentionPolicy.archiveAfter} years</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Next Review:</span>
                          <span className="ml-1 font-medium">{selectedDataset.retentionPolicy.nextReview.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="metadata" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Schema Information</h4>
                      <div className="p-3 border rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Schema Type:</span>
                            <span className="ml-1 font-medium">{selectedDataset.metadata.schema}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Fields:</span>
                            <span className="ml-1 font-medium">{selectedDataset.metadata.fields.length}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Validation Rules:</span>
                            <span className="ml-1 font-medium">{selectedDataset.metadata.validation.length}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Standards:</span>
                            <span className="ml-1 font-medium">{selectedDataset.metadata.standards.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Fields</h4>
                      <div className="space-y-2">
                        {selectedDataset.metadata.fields.slice(0, 10).map((field, index) => (
                          <div key={index} className="p-2 border rounded text-sm">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{field.name}</span>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{field.type}</Badge>
                                {field.required && <Badge className="bg-red-100 text-red-800">Required</Badge>}
                              </div>
                            </div>
                            <p className="text-gray-600 text-xs mt-1">{field.description}</p>
                          </div>
                        ))}
                        {selectedDataset.metadata.fields.length > 10 && (
                          <div className="text-sm text-gray-500 text-center">
                            ... and {selectedDataset.metadata.fields.length - 10} more fields
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="quality" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Quality Metrics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Completeness:</span>
                            <span className="font-medium">{selectedDataset.quality.completeness}%</span>
                          </div>
                          <Progress value={selectedDataset.quality.completeness} className="h-2" />
                          <div className="flex justify-between">
                            <span className="text-sm">Accuracy:</span>
                            <span className="font-medium">{selectedDataset.quality.accuracy}%</span>
                          </div>
                          <Progress value={selectedDataset.quality.accuracy} className="h-2" />
                          <div className="flex justify-between">
                            <span className="text-sm">Consistency:</span>
                            <span className="font-medium">{selectedDataset.quality.consistency}%</span>
                          </div>
                          <Progress value={selectedDataset.quality.consistency} className="h-2" />
                          <div className="flex justify-between">
                            <span className="text-sm">Validity:</span>
                            <span className="font-medium">{selectedDataset.quality.validity}%</span>
                          </div>
                          <Progress value={selectedDataset.quality.validity} className="h-2" />
                          <div className="flex justify-between">
                            <span className="text-sm">Timeliness:</span>
                            <span className="font-medium">{selectedDataset.quality.timeliness}%</span>
                          </div>
                          <Progress value={selectedDataset.quality.timeliness} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Quality Issues</h4>
                        <div className="space-y-2">
                          {selectedDataset.quality.issues.map((issue, index) => (
                            <div key={index} className="p-2 border rounded text-sm">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium">{issue.type}</span>
                                <Badge className={issue.severity === 'Critical' ? 'bg-red-100 text-red-800' : issue.severity === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'}>
                                  {issue.severity}
                                </Badge>
                              </div>
                              <p className="text-gray-600 text-xs">{issue.description}</p>
                              <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                                <span>Records: {issue.affectedRecords}</span>
                                <span>Status: {issue.status}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="usage" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Total Views</h4>
                        <p className="text-2xl font-bold text-blue-600">{selectedDataset.usage.views}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Downloads</h4>
                        <p className="text-2xl font-bold text-green-600">{selectedDataset.usage.downloads}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Shares</h4>
                        <p className="text-2xl font-bold text-purple-600">{selectedDataset.usage.shares}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Top Users</h4>
                    <div className="space-y-1">
                      {selectedDataset.usage.topUsers.map((user, index) => (
                        <div key={index} className="text-sm">{user}</div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="backup" className="space-y-4">
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Backup Status</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Last Backup:</span>
                            <span className="ml-1 font-medium">{selectedDataset.backupStatus.lastBackup.toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Next Backup:</span>
                            <span className="ml-1 font-medium">{selectedDataset.backupStatus.nextBackup.toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Frequency:</span>
                            <span className="ml-1 font-medium">{selectedDataset.backupStatus.frequency}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Location:</span>
                            <span className="ml-1 font-medium">{selectedDataset.backupStatus.location}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Status:</span>
                            <Badge className={selectedDataset.backupStatus.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {selectedDataset.backupStatus.status}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-gray-500">Backup Size:</span>
                            <span className="ml-1 font-medium">{formatFileSize(selectedDataset.backupStatus.size)}</span>
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
