"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Filter, Plus, Download, Upload, Share2, BookOpen, FileText, Users, Calendar,
  Award, TrendingUp, BarChart3, PieChart, LineChart, Activity, Target, Clock, CheckCircle,
  AlertTriangle, Edit, Trash2, Eye, Star, Heart, MessageSquare, Bell, Settings, Zap,
  Microscope, FlaskConical, TestTube, Atom, Brain, Database, Globe, Lock, Unlock,
  RefreshCw, Save, Send, Archive, Tag, Link, Copy, ExternalLink, Play, Pause, Stop,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { faker } from '@faker-js/faker';
import ResearchAnalytics from '@/components/academic/research-analytics';
import ResearchCollaboration from '@/components/academic/research-collaboration';

interface ResearchProject {
  id: string;
  title: string;
  description: string;
  status: 'Planning' | 'Active' | 'On Hold' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  category: 'Clinical' | 'Basic Science' | 'Translational' | 'Epidemiological' | 'Pharmacological';
  startDate: Date;
  endDate: Date;
  budget: number;
  spent: number;
  principalInvestigator: string;
  coInvestigators: string[];
  collaborators: string[];
  fundingSource: string;
  grantNumber: string;
  ethicsApproval: boolean;
  irbNumber: string;
  keywords: string[];
  methodology: string;
  objectives: string[];
  deliverables: string[];
  milestones: Milestone[];
  publications: Publication[];
  dataCollection: DataCollection[];
  analysis: Analysis[];
  risks: Risk[];
  notes: string;
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  completionDate?: Date;
  assignedTo: string;
  dependencies: string[];
}

interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Accepted' | 'Published';
  impactFactor: number;
  citations: number;
}

interface DataCollection {
  id: string;
  type: 'Survey' | 'Interview' | 'Observation' | 'Experiment' | 'Secondary Data';
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'Planned' | 'In Progress' | 'Completed';
  participants: number;
  dataPoints: number;
  quality: 'Poor' | 'Fair' | 'Good' | 'Excellent';
}

interface Analysis {
  id: string;
  type: 'Statistical' | 'Qualitative' | 'Mixed Methods' | 'Meta-Analysis';
  description: string;
  status: 'Planned' | 'In Progress' | 'Completed';
  software: string;
  results: string;
  insights: string[];
}

interface Risk {
  id: string;
  description: string;
  probability: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  mitigation: string;
  status: 'Open' | 'Mitigated' | 'Closed';
}

interface Attachment {
  id: string;
  name: string;
  type: 'Document' | 'Image' | 'Video' | 'Audio' | 'Dataset' | 'Code';
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
}

const generateMockResearchProject = (id: number): ResearchProject => {
  const categories: ResearchProject['category'][] = ['Clinical', 'Basic Science', 'Translational', 'Epidemiological', 'Pharmacological'];
  const statuses: ResearchProject['status'][] = ['Planning', 'Active', 'On Hold', 'Completed', 'Cancelled'];
  const priorities: ResearchProject['priority'][] = ['Low', 'Medium', 'High', 'Critical'];
  
  const startDate = faker.date.past({ years: 2 });
  const endDate = faker.date.future({ years: 3 });
  
  const milestones: Milestone[] = Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map((_, i) => ({
    id: `milestone-${id}-${i}`,
    title: faker.helpers.arrayElement([
      'Literature Review', 'Protocol Development', 'Ethics Approval', 'Data Collection',
      'Data Analysis', 'Manuscript Writing', 'Peer Review', 'Publication'
    ]),
    description: faker.lorem.sentence(),
    dueDate: faker.date.between({ from: startDate, to: endDate }),
    status: faker.helpers.arrayElement(['Pending', 'In Progress', 'Completed', 'Overdue']),
    completionDate: faker.datatype.boolean() ? faker.date.recent() : undefined,
    assignedTo: faker.person.fullName(),
    dependencies: []
  }));

  const publications: Publication[] = Array.from({ length: faker.number.int({ min: 0, max: 5 }) }).map(() => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    authors: Array.from({ length: faker.number.int({ min: 2, max: 8 }) }).map(() => faker.person.fullName()),
    journal: faker.helpers.arrayElement([
      'Nature', 'Science', 'The Lancet', 'NEJM', 'JAMA', 'BMJ', 'Pharmacology Research',
      'Clinical Pharmacology', 'Drug Discovery Today', 'Molecular Pharmacology'
    ]),
    year: faker.number.int({ min: 2020, max: 2024 }),
    doi: faker.internet.url(),
    status: faker.helpers.arrayElement(['Draft', 'Submitted', 'Under Review', 'Accepted', 'Published']),
    impactFactor: faker.number.float({ min: 1, max: 50, precision: 0.1 }),
    citations: faker.number.int({ min: 0, max: 500 })
  }));

  const dataCollection: DataCollection[] = Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map(() => ({
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(['Survey', 'Interview', 'Observation', 'Experiment', 'Secondary Data']),
    description: faker.lorem.sentence(),
    startDate: faker.date.recent(),
    endDate: faker.date.future(),
    status: faker.helpers.arrayElement(['Planned', 'In Progress', 'Completed']),
    participants: faker.number.int({ min: 10, max: 1000 }),
    dataPoints: faker.number.int({ min: 100, max: 10000 }),
    quality: faker.helpers.arrayElement(['Poor', 'Fair', 'Good', 'Excellent'])
  }));

  const analysis: Analysis[] = Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(['Statistical', 'Qualitative', 'Mixed Methods', 'Meta-Analysis']),
    description: faker.lorem.sentence(),
    status: faker.helpers.arrayElement(['Planned', 'In Progress', 'Completed']),
    software: faker.helpers.arrayElement(['SPSS', 'R', 'Python', 'SAS', 'STATA', 'NVivo', 'ATLAS.ti']),
    results: faker.lorem.paragraph(),
    insights: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => faker.lorem.sentence())
  }));

  const risks: Risk[] = Array.from({ length: faker.number.int({ min: 0, max: 4 }) }).map(() => ({
    id: faker.string.uuid(),
    description: faker.lorem.sentence(),
    probability: faker.helpers.arrayElement(['Low', 'Medium', 'High']),
    impact: faker.helpers.arrayElement(['Low', 'Medium', 'High']),
    mitigation: faker.lorem.sentence(),
    status: faker.helpers.arrayElement(['Open', 'Mitigated', 'Closed'])
  }));

  const attachments: Attachment[] = Array.from({ length: faker.number.int({ min: 2, max: 8 }) }).map(() => ({
    id: faker.string.uuid(),
    name: faker.system.fileName(),
    type: faker.helpers.arrayElement(['Document', 'Image', 'Video', 'Audio', 'Dataset', 'Code']),
    size: faker.number.int({ min: 1024, max: 10485760 }),
    url: faker.internet.url(),
    uploadedBy: faker.person.fullName(),
    uploadedAt: faker.date.recent()
  }));

  return {
    id: `RES-${1000 + id}`,
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(2),
    status: faker.helpers.arrayElement(statuses),
    priority: faker.helpers.arrayElement(priorities),
    category: faker.helpers.arrayElement(categories),
    startDate,
    endDate,
    budget: faker.number.int({ min: 10000, max: 1000000 }),
    spent: faker.number.int({ min: 0, max: 500000 }),
    principalInvestigator: faker.person.fullName(),
    coInvestigators: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => faker.person.fullName()),
    collaborators: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }).map(() => faker.person.fullName()),
    fundingSource: faker.helpers.arrayElement([
      'NIH', 'NSF', 'WHO', 'Gates Foundation', 'Wellcome Trust', 'European Commission',
      'Pharmaceutical Company', 'University Grant', 'Private Foundation'
    ]),
    grantNumber: faker.string.alphanumeric(10).toUpperCase(),
    ethicsApproval: faker.datatype.boolean(),
    irbNumber: faker.string.alphanumeric(8).toUpperCase(),
    keywords: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => faker.lorem.word()),
    methodology: faker.lorem.paragraph(),
    objectives: Array.from({ length: faker.number.int({ min: 2, max: 6 }) }).map(() => faker.lorem.sentence()),
    deliverables: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => faker.lorem.sentence()),
    milestones,
    publications,
    dataCollection,
    analysis,
    risks,
    notes: faker.lorem.paragraphs(3),
    attachments,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
};

const ResearchPortal: React.FC = () => {
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ResearchProject | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [portalTab, setPortalTab] = useState('projects');

  useEffect(() => {
    // Generate initial mock data
    const initialProjects = Array.from({ length: 15 }).map((_, i) => generateMockResearchProject(i));
    setProjects(initialProjects);
  }, []);

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        project.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        project.principalInvestigator.toLowerCase().includes(lowerCaseSearchTerm) ||
        project.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseSearchTerm))
      );
    }

    if (filterStatus !== 'All') {
      filtered = filtered.filter(project => project.status === filterStatus);
    }

    if (filterCategory !== 'All') {
      filtered = filtered.filter(project => project.category === filterCategory);
    }

    if (filterPriority !== 'All') {
      filtered = filtered.filter(project => project.priority === filterPriority);
    }

    return filtered;
  }, [projects, searchTerm, filterStatus, filterCategory, filterPriority]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning': return 'text-blue-600 bg-blue-100';
      case 'Active': return 'text-green-600 bg-green-100';
      case 'On Hold': return 'text-yellow-600 bg-yellow-100';
      case 'Completed': return 'text-purple-600 bg-purple-100';
      case 'Cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Clinical': return <TestTube className="w-4 h-4" />;
      case 'Basic Science': return <Microscope className="w-4 h-4" />;
      case 'Translational': return <FlaskConical className="w-4 h-4" />;
      case 'Epidemiological': return <BarChart3 className="w-4 h-4" />;
      case 'Pharmacological': return <Atom className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'Active').length;
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  const totalPublications = projects.reduce((sum, p) => sum + p.publications.length, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Microscope className="w-8 h-8 mr-3 text-blue-600" />
              Research Portal
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive research project management and collaboration platform</p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Research Project
          </Button>
        </div>

        {/* Main Portal Tabs */}
        <Tabs value={portalTab} onValueChange={setPortalTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="projects">Research Projects</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="grants">Grants & Funding</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProjects}</div>
              <p className="text-xs text-muted-foreground">Research initiatives</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeProjects}</div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Allocated funding</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Publications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPublications}</div>
              <p className="text-xs text-muted-foreground">Research outputs</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search research projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Clinical">Clinical</SelectItem>
                    <SelectItem value="Basic Science">Basic Science</SelectItem>
                    <SelectItem value="Translational">Translational</SelectItem>
                    <SelectItem value="Epidemiological">Epidemiological</SelectItem>
                    <SelectItem value="Pharmacological">Pharmacological</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Priority" />
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

        {/* Research Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(project.category)}
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedProject(project);
                          setIsViewModalOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedProject(project);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                  <p className="text-sm text-gray-600 line-clamp-3">{project.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status</span>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Priority</span>
                      <Badge className={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Principal Investigator</span>
                      <span className="text-sm text-gray-600">{project.principalInvestigator}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Budget</span>
                      <span className="text-sm font-semibold">${project.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progress</span>
                      <div className="flex items-center space-x-2">
                        <Progress 
                          value={(project.spent / project.budget) * 100} 
                          className="w-20 h-2"
                        />
                        <span className="text-xs text-gray-600">
                          {Math.round((project.spent / project.budget) * 100)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Start: {project.startDate.toLocaleDateString()}</span>
                      <span>End: {project.endDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Publications</span>
                      <span className="font-semibold">{project.publications.length}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.keywords.slice(0, 3).map((keyword, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                      {project.keywords.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.keywords.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No research projects found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or create a new project.</p>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Project
              </Button>
            </CardContent>
          </Card>
        )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <ResearchAnalytics />
          </TabsContent>

          <TabsContent value="collaboration" className="space-y-6">
            <ResearchCollaboration />
          </TabsContent>

          <TabsContent value="publications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publications Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Publications Hub</h3>
                  <p className="text-gray-600 mb-4">
                    Manage research publications, track citations, and monitor impact metrics
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Publication
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grants" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Grants & Funding Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Funding Portal</h3>
                  <p className="text-gray-600 mb-4">
                    Track grant applications, manage funding sources, and monitor budget allocation
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Apply for Grant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Create Project Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Research Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" placeholder="Enter project title" />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Clinical">Clinical</SelectItem>
                    <SelectItem value="Basic Science">Basic Science</SelectItem>
                    <SelectItem value="Translational">Translational</SelectItem>
                    <SelectItem value="Epidemiological">Epidemiological</SelectItem>
                    <SelectItem value="Pharmacological">Pharmacological</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter project description" rows={4} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
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
              <div>
                <Label htmlFor="budget">Budget ($)</Label>
                <Input id="budget" type="number" placeholder="Enter budget" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="pi">Principal Investigator</Label>
              <Input id="pi" placeholder="Enter principal investigator name" />
            </div>
            <div>
              <Label htmlFor="fundingSource">Funding Source</Label>
              <Input id="fundingSource" placeholder="Enter funding source" />
            </div>
            <div>
              <Label htmlFor="methodology">Methodology</Label>
              <Textarea id="methodology" placeholder="Enter research methodology" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCreateModalOpen(false)}>
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Project Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedProject?.title}</span>
              <div className="flex space-x-2">
                <Badge className={getStatusColor(selectedProject?.status || '')}>
                  {selectedProject?.status}
                </Badge>
                <Badge className={getPriorityColor(selectedProject?.priority || '')}>
                  {selectedProject?.priority}
                </Badge>
              </div>
            </DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="publications">Publications</TabsTrigger>
                <TabsTrigger value="data">Data Collection</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="risks">Risks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Description</Label>
                        <p className="text-sm text-gray-600 mt-1">{selectedProject.description}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Principal Investigator</Label>
                        <p className="text-sm text-gray-600 mt-1">{selectedProject.principalInvestigator}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Co-Investigators</Label>
                        <p className="text-sm text-gray-600 mt-1">{selectedProject.coInvestigators.join(', ')}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Funding Source</Label>
                        <p className="text-sm text-gray-600 mt-1">{selectedProject.fundingSource}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Grant Number</Label>
                        <p className="text-sm text-gray-600 mt-1">{selectedProject.grantNumber}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Budget & Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Total Budget</span>
                        <span className="text-sm font-semibold">${selectedProject.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Spent</span>
                        <span className="text-sm font-semibold">${selectedProject.spent.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Remaining</span>
                        <span className="text-sm font-semibold">${(selectedProject.budget - selectedProject.spent).toLocaleString()}</span>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Progress</Label>
                        <Progress value={(selectedProject.spent / selectedProject.budget) * 100} className="mt-2" />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Start Date</span>
                        <span className="text-sm text-gray-600">{selectedProject.startDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">End Date</span>
                        <span className="text-sm text-gray-600">{selectedProject.endDate.toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Objectives & Deliverables</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium">Objectives</Label>
                        <ul className="mt-2 space-y-1">
                          {selectedProject.objectives.map((objective, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {objective}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Deliverables</Label>
                        <ul className="mt-2 space-y-1">
                          {selectedProject.deliverables.map((deliverable, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="milestones" className="space-y-4">
                <div className="space-y-4">
                  {selectedProject.milestones.map((milestone, index) => (
                    <Card key={milestone.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              milestone.status === 'Completed' ? 'bg-green-500' :
                              milestone.status === 'In Progress' ? 'bg-blue-500' :
                              milestone.status === 'Overdue' ? 'bg-red-500' : 'bg-gray-300'
                            }`}></div>
                            <div>
                              <h4 className="font-medium">{milestone.title}</h4>
                              <p className="text-sm text-gray-600">{milestone.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={
                              milestone.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              milestone.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                              milestone.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                            }>
                              {milestone.status}
                            </Badge>
                            <p className="text-sm text-gray-600 mt-1">
                              Due: {milestone.dueDate.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="publications" className="space-y-4">
                <div className="space-y-4">
                  {selectedProject.publications.map((publication, index) => (
                    <Card key={publication.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{publication.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {publication.authors.join(', ')} - {publication.journal} ({publication.year})
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm text-gray-600">
                                Impact Factor: {publication.impactFactor}
                              </span>
                              <span className="text-sm text-gray-600">
                                Citations: {publication.citations}
                              </span>
                              <span className="text-sm text-gray-600">
                                DOI: {publication.doi}
                              </span>
                            </div>
                          </div>
                          <Badge className={
                            publication.status === 'Published' ? 'bg-green-100 text-green-800' :
                            publication.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                            publication.status === 'Accepted' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }>
                            {publication.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="data" className="space-y-4">
                <div className="space-y-4">
                  {selectedProject.dataCollection.map((data, index) => (
                    <Card key={data.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{data.type}</h4>
                            <p className="text-sm text-gray-600 mt-1">{data.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm text-gray-600">
                                Participants: {data.participants}
                              </span>
                              <span className="text-sm text-gray-600">
                                Data Points: {data.dataPoints}
                              </span>
                              <span className="text-sm text-gray-600">
                                Quality: {data.quality}
                              </span>
                            </div>
                          </div>
                          <Badge className={
                            data.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            data.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }>
                            {data.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="analysis" className="space-y-4">
                <div className="space-y-4">
                  {selectedProject.analysis.map((analysis, index) => (
                    <Card key={analysis.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{analysis.type}</h4>
                            <p className="text-sm text-gray-600 mt-1">{analysis.description}</p>
                            <div className="mt-2">
                              <p className="text-sm font-medium">Software: {analysis.software}</p>
                              <p className="text-sm text-gray-600 mt-1">{analysis.results}</p>
                            </div>
                          </div>
                          <Badge className={
                            analysis.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            analysis.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }>
                            {analysis.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="risks" className="space-y-4">
                <div className="space-y-4">
                  {selectedProject.risks.map((risk, index) => (
                    <Card key={risk.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{risk.description}</h4>
                            <p className="text-sm text-gray-600 mt-1">{risk.mitigation}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm text-gray-600">
                                Probability: {risk.probability}
                              </span>
                              <span className="text-sm text-gray-600">
                                Impact: {risk.impact}
                              </span>
                            </div>
                          </div>
                          <Badge className={
                            risk.status === 'Closed' ? 'bg-green-100 text-green-800' :
                            risk.status === 'Mitigated' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }>
                            {risk.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResearchPortal;
