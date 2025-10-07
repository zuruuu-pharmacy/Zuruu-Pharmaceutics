"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Beaker, Microscope, TestTube, FlaskConical, Atom, Brain, Database, Plus,
  Search, Filter, Edit, Trash2, Eye, Download, Upload, CheckCircle, XCircle,
  AlertTriangle, Star, Target, TrendingUp, BarChart3, Clock, Users, Calendar,
  Settings, Save, RefreshCw, Share2, Lock, Unlock, Copy, ExternalLink, Play,
  Pause, Square, Zap, Bell, MessageSquare, Heart, Globe, Building, Award,
  DollarSign, GraduationCap, BookOpen, FileText, Shield, Gavel, Scale,
  Clipboard, Video, Camera, Headphones, Monitor, Smartphone, Tablet
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

interface VirtualLab {
  id: string;
  title: string;
  description: string;
  type: 'Chemistry' | 'Biology' | 'Physics' | 'Pharmacy' | 'Medicine' | 'Engineering' | 'Computer Science';
  category: 'Simulation' | 'Virtual Reality' | 'Augmented Reality' | 'Interactive' | 'Tutorial' | 'Assessment';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  duration: number; // in minutes
  status: 'Active' | 'Draft' | 'Maintenance' | 'Archived' | 'Under Review';
  instructor: string;
  students: string[];
  equipment: Equipment[];
  experiments: Experiment[];
  assessments: Assessment[];
  resources: Resource[];
  analytics: LabAnalytics;
  createdAt: Date;
  updatedAt: Date;
}

interface Equipment {
  id: string;
  name: string;
  type: 'Microscope' | 'Spectrophotometer' | 'Centrifuge' | 'Balance' | 'pH Meter' | 'Thermometer' | 'Other';
  status: 'Available' | 'In Use' | 'Maintenance' | 'Broken';
  specifications: string;
  instructions: string;
  safetyNotes: string[];
}

interface Experiment {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  procedures: Procedure[];
  expectedResults: string;
  safetyRequirements: string[];
  timeRequired: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Available' | 'In Progress' | 'Completed' | 'Locked';
}

interface Procedure {
  step: number;
  title: string;
  description: string;
  duration: number;
  materials: string[];
  instructions: string;
  safetyNotes: string[];
}

interface Assessment {
  id: string;
  title: string;
  type: 'Quiz' | 'Practical' | 'Report' | 'Presentation' | 'Peer Review';
  questions: Question[];
  timeLimit: number;
  passingScore: number;
  attempts: number;
  status: 'Draft' | 'Published' | 'Archived';
}

interface Question {
  id: string;
  question: string;
  type: 'Multiple Choice' | 'True/False' | 'Short Answer' | 'Essay' | 'Practical';
  options?: string[];
  correctAnswer: string;
  points: number;
  explanation: string;
}

interface Resource {
  id: string;
  name: string;
  type: 'Video' | 'Document' | 'Image' | 'Audio' | 'Link' | 'Simulation';
  url: string;
  description: string;
  size: number;
  duration?: number;
  format: string;
}

interface LabAnalytics {
  totalSessions: number;
  activeUsers: number;
  completionRate: number;
  averageScore: number;
  timeSpent: number;
  popularExperiments: string[];
  userFeedback: Feedback[];
  performance: PerformanceMetrics;
}

interface Feedback {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: Date;
  helpful: boolean;
}

interface PerformanceMetrics {
  loadTime: number;
  uptime: number;
  errorRate: number;
  userSatisfaction: number;
  technicalIssues: number;
}

const generateMockVirtualLab = (id: number): VirtualLab => {
  const types: VirtualLab['type'][] = ['Chemistry', 'Biology', 'Physics', 'Pharmacy', 'Medicine', 'Engineering', 'Computer Science'];
  const categories: VirtualLab['category'][] = ['Simulation', 'Virtual Reality', 'Augmented Reality', 'Interactive', 'Tutorial', 'Assessment'];
  const difficulties: VirtualLab['difficulty'][] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const statuses: VirtualLab['status'][] = ['Active', 'Draft', 'Maintenance', 'Archived', 'Under Review'];
  
  const type = faker.helpers.arrayElement(types);
  const category = faker.helpers.arrayElement(categories);
  const difficulty = faker.helpers.arrayElement(difficulties);
  const status = faker.helpers.arrayElement(statuses);
  
  const students = Array.from({ length: faker.number.int({ min: 5, max: 50 }) }).map(() => faker.person.fullName());
  
  const equipment: Equipment[] = Array.from({ length: faker.number.int({ min: 3, max: 10 }) }).map(() => ({
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement(['Digital Microscope', 'UV-Vis Spectrophotometer', 'Centrifuge', 'Analytical Balance', 'pH Meter', 'Digital Thermometer', 'Magnetic Stirrer']),
    type: faker.helpers.arrayElement(['Microscope', 'Spectrophotometer', 'Centrifuge', 'Balance', 'pH Meter', 'Thermometer', 'Other']),
    status: faker.helpers.arrayElement(['Available', 'In Use', 'Maintenance', 'Broken']),
    specifications: faker.lorem.sentence(),
    instructions: faker.lorem.paragraph(),
    safetyNotes: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => faker.lorem.sentence())
  }));
  
  const experiments: Experiment[] = Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    objectives: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => faker.lorem.sentence()),
    procedures: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map((_, i) => ({
      step: i + 1,
      title: faker.lorem.words(2),
      description: faker.lorem.sentence(),
      duration: faker.number.int({ min: 5, max: 30 }),
      materials: Array.from({ length: faker.number.int({ min: 2, max: 6 }) }).map(() => faker.lorem.word()),
      instructions: faker.lorem.paragraph(),
      safetyNotes: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => faker.lorem.sentence())
    })),
    expectedResults: faker.lorem.paragraph(),
    safetyRequirements: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => faker.lorem.sentence()),
    timeRequired: faker.number.int({ min: 30, max: 180 }),
    difficulty: faker.helpers.arrayElement(['Easy', 'Medium', 'Hard']),
    status: faker.helpers.arrayElement(['Available', 'In Progress', 'Completed', 'Locked'])
  }));
  
  const assessments: Assessment[] = Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    type: faker.helpers.arrayElement(['Quiz', 'Practical', 'Report', 'Presentation', 'Peer Review']),
    questions: Array.from({ length: faker.number.int({ min: 5, max: 15 }) }).map(() => ({
      id: faker.string.uuid(),
      question: faker.lorem.sentence(),
      type: faker.helpers.arrayElement(['Multiple Choice', 'True/False', 'Short Answer', 'Essay', 'Practical']),
      options: faker.helpers.arrayElement(['Multiple Choice', 'True/False']).includes('Multiple Choice') ? 
        Array.from({ length: 4 }).map(() => faker.lorem.word()) : undefined,
      correctAnswer: faker.lorem.word(),
      points: faker.number.int({ min: 1, max: 10 }),
      explanation: faker.lorem.sentence()
    })),
    timeLimit: faker.number.int({ min: 15, max: 120 }),
    passingScore: faker.number.int({ min: 60, max: 90 }),
    attempts: faker.number.int({ min: 1, max: 3 }),
    status: faker.helpers.arrayElement(['Draft', 'Published', 'Archived'])
  }));
  
  const resources: Resource[] = Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => ({
    id: faker.string.uuid(),
    name: faker.lorem.words(2),
    type: faker.helpers.arrayElement(['Video', 'Document', 'Image', 'Audio', 'Link', 'Simulation']),
    url: faker.internet.url(),
    description: faker.lorem.sentence(),
    size: faker.number.int({ min: 100000, max: 100000000 }),
    duration: faker.datatype.boolean(0.7) ? faker.number.int({ min: 30, max: 300 }) : undefined,
    format: faker.helpers.arrayElement(['MP4', 'PDF', 'JPG', 'MP3', 'HTML', 'SWF'])
  }));
  
  const userFeedback: Feedback[] = Array.from({ length: faker.number.int({ min: 5, max: 20 }) }).map(() => ({
    id: faker.string.uuid(),
    user: faker.person.fullName(),
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.lorem.paragraph(),
    date: faker.date.recent({ days: 30 }),
    helpful: faker.datatype.boolean(0.8)
  }));
  
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(3) + ' Virtual Lab',
    description: faker.lorem.paragraphs(2),
    type,
    category,
    difficulty,
    duration: faker.number.int({ min: 30, max: 180 }),
    status,
    instructor: faker.person.fullName(),
    students,
    equipment,
    experiments,
    assessments,
    resources,
    analytics: {
      totalSessions: faker.number.int({ min: 50, max: 500 }),
      activeUsers: faker.number.int({ min: 10, max: 100 }),
      completionRate: faker.number.float({ min: 60, max: 95, fractionDigits: 0.1 }),
      averageScore: faker.number.float({ min: 70, max: 95, fractionDigits: 0.1 }),
      timeSpent: faker.number.int({ min: 1000, max: 10000 }),
      popularExperiments: experiments.slice(0, 3).map(e => e.title),
      userFeedback,
      performance: {
        loadTime: faker.number.float({ min: 0.5, max: 3.0, fractionDigits: 0.1 }),
        uptime: faker.number.float({ min: 95, max: 99.9, fractionDigits: 0.1 }),
        errorRate: faker.number.float({ min: 0.1, max: 5.0, fractionDigits: 0.1 }),
        userSatisfaction: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 0.1 }),
        technicalIssues: faker.number.int({ min: 0, max: 10 })
      }
    },
    createdAt: faker.date.past({ years: 2 }),
    updatedAt: faker.date.recent({ days: 30 })
  };
};

export default function VirtualLabs() {
  const [labs, setLabs] = useState<VirtualLab[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedLab, setSelectedLab] = useState<VirtualLab | null>(null);

  useEffect(() => {
    const mockLabs = Array.from({ length: 20 }, (_, i) => generateMockVirtualLab(i));
    setLabs(mockLabs);
  }, []);

  const filteredLabs = useMemo(() => {
    return labs.filter(lab => {
      const matchesSearch = lab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lab.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lab.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || lab.type === filterType;
      const matchesCategory = filterCategory === 'All' || lab.category === filterCategory;
      const matchesDifficulty = filterDifficulty === 'All' || lab.difficulty === filterDifficulty;
      
      return matchesSearch && matchesType && matchesCategory && matchesDifficulty;
    });
  }, [labs, searchTerm, filterType, filterCategory, filterDifficulty]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Archived': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Chemistry': return <FlaskConical className="w-5 h-5" />;
      case 'Biology': return <Microscope className="w-5 h-5" />;
      case 'Physics': return <Atom className="w-5 h-5" />;
      case 'Pharmacy': return <TestTube className="w-5 h-5" />;
      case 'Medicine': return <Heart className="w-5 h-5" />;
      case 'Engineering': return <Building className="w-5 h-5" />;
      case 'Computer Science': return <Database className="w-5 h-5" />;
      default: return <Beaker className="w-5 h-5" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Simulation': return <Monitor className="w-5 h-5" />;
      case 'Virtual Reality': return <Headphones className="w-5 h-5" />;
      case 'Augmented Reality': return <Camera className="w-5 h-5" />;
      case 'Interactive': return <Zap className="w-5 h-5" />;
      case 'Tutorial': return <BookOpen className="w-5 h-5" />;
      case 'Assessment': return <Clipboard className="w-5 h-5" />;
      default: return <Video className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Virtual Laboratory</h1>
          <p className="text-gray-600 mt-2">Simulated experiments, VR learning, and interactive lab experiences</p>
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
                New Virtual Lab
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Virtual Lab</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Lab Title</Label>
                  <Input placeholder="Enter lab title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        <SelectItem value="Biology">Biology</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                        <SelectItem value="Medicine">Medicine</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
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
                        <SelectItem value="Simulation">Simulation</SelectItem>
                        <SelectItem value="Virtual Reality">Virtual Reality</SelectItem>
                        <SelectItem value="Augmented Reality">Augmented Reality</SelectItem>
                        <SelectItem value="Interactive">Interactive</SelectItem>
                        <SelectItem value="Tutorial">Tutorial</SelectItem>
                        <SelectItem value="Assessment">Assessment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Enter lab description" rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddModalOpen(false)}>
                  Create Lab
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
                <p className="text-sm font-medium text-gray-600">Total Labs</p>
                <p className="text-2xl font-bold text-gray-900">{labs.length}</p>
              </div>
              <Beaker className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {labs.filter(l => l.status === 'Active').length} active
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {labs.reduce((sum, l) => sum + l.analytics.totalSessions, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-blue-600">
                {labs.reduce((sum, l) => sum + l.analytics.activeUsers, 0)} active users
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {labs.length > 0 ? Math.round(labs.reduce((sum, l) => sum + l.analytics.completionRate, 0) / labs.length) : 0}%
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-purple-600">
                {labs.length > 0 ? Math.round(labs.reduce((sum, l) => sum + l.analytics.averageScore, 0) / labs.length) : 0}% avg score
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Experiments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {labs.reduce((sum, l) => sum + l.experiments.length, 0)}
                </p>
              </div>
              <TestTube className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-orange-600">
                {labs.reduce((sum, l) => sum + l.assessments.length, 0)} assessments
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
                  placeholder="Search virtual labs..."
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
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                  <SelectItem value="Medicine">Medicine</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
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
                  <SelectItem value="Simulation">Simulation</SelectItem>
                  <SelectItem value="Virtual Reality">Virtual Reality</SelectItem>
                  <SelectItem value="Augmented Reality">Augmented Reality</SelectItem>
                  <SelectItem value="Interactive">Interactive</SelectItem>
                  <SelectItem value="Tutorial">Tutorial</SelectItem>
                  <SelectItem value="Assessment">Assessment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="All Difficulties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Difficulties</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Virtual Labs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLabs.map((lab, index) => (
          <motion.div
            key={lab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg line-clamp-2">{lab.title}</CardTitle>
                    <p className="text-sm text-gray-600">{lab.instructor}</p>
                    <p className="text-sm text-gray-500">{lab.duration} minutes</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getStatusColor(lab.status)}>
                      {lab.status}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {getTypeIcon(lab.type)}
                      <span className="text-xs text-gray-500">{lab.type}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge className={getDifficultyColor(lab.difficulty)}>
                    {lab.difficulty}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    {getCategoryIcon(lab.category)}
                    <span className="text-xs text-gray-500">{lab.category}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Students:</span>
                    <span className="ml-1 font-medium">{lab.students.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Experiments:</span>
                    <span className="ml-1 font-medium">{lab.experiments.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Equipment:</span>
                    <span className="ml-1 font-medium">{lab.equipment.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Resources:</span>
                    <span className="ml-1 font-medium">{lab.resources.length}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Completion Rate</span>
                    <span className="font-medium">{lab.analytics.completionRate}%</span>
                  </div>
                  <Progress value={lab.analytics.completionRate} className="h-2" />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedLab(lab);
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
                    {lab.createdAt.toLocaleDateString()}
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
            <DialogTitle>Virtual Lab Details</DialogTitle>
          </DialogHeader>
          {selectedLab && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg">{selectedLab.title}</h3>
                  <p className="text-gray-600">{selectedLab.type} - {selectedLab.category}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedLab.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Difficulty:</span>
                    <Badge className={getDifficultyColor(selectedLab.difficulty)}>
                      {selectedLab.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">{selectedLab.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge className={getStatusColor(selectedLab.status)}>
                      {selectedLab.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Instructor:</span>
                    <span className="font-medium">{selectedLab.instructor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Students:</span>
                    <span className="font-medium">{selectedLab.students.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Completion Rate:</span>
                    <span className="font-medium">{selectedLab.analytics.completionRate}%</span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="experiments">Experiments</TabsTrigger>
                  <TabsTrigger value="equipment">Equipment</TabsTrigger>
                  <TabsTrigger value="assessments">Assessments</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Students</h4>
                        <div className="space-y-1">
                          {selectedLab.students.slice(0, 5).map((student, index) => (
                            <div key={index} className="text-sm">{student}</div>
                          ))}
                          {selectedLab.students.length > 5 && (
                            <div className="text-sm text-gray-500">
                              ... and {selectedLab.students.length - 5} more
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Resources</h4>
                        <div className="space-y-1">
                          {selectedLab.resources.slice(0, 5).map((resource, index) => (
                            <div key={index} className="text-sm">
                              {resource.name} ({resource.type})
                            </div>
                          ))}
                          {selectedLab.resources.length > 5 && (
                            <div className="text-sm text-gray-500">
                              ... and {selectedLab.resources.length - 5} more
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="experiments" className="space-y-4">
                  <div className="space-y-3">
                    {selectedLab.experiments.map((experiment, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{experiment.title}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{experiment.difficulty}</Badge>
                            <Badge className={experiment.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {experiment.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{experiment.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Time: {experiment.timeRequired} min</span>
                          <span className="text-gray-500">Steps: {experiment.procedures.length}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="equipment" className="space-y-4">
                  <div className="space-y-3">
                    {selectedLab.equipment.map((item, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{item.name}</span>
                          <Badge className={item.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.specifications}</p>
                        <div className="text-sm text-gray-500">
                          Type: {item.type}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="assessments" className="space-y-4">
                  <div className="space-y-3">
                    {selectedLab.assessments.map((assessment, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{assessment.title}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{assessment.type}</Badge>
                            <Badge className={assessment.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {assessment.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Questions:</span>
                            <span className="ml-1 font-medium">{assessment.questions.length}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Time Limit:</span>
                            <span className="ml-1 font-medium">{assessment.timeLimit} min</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Passing Score:</span>
                            <span className="ml-1 font-medium">{assessment.passingScore}%</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Attempts:</span>
                            <span className="ml-1 font-medium">{assessment.attempts}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Performance Metrics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Load Time:</span>
                            <span className="font-medium">{selectedLab.analytics.performance.loadTime}s</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Uptime:</span>
                            <span className="font-medium">{selectedLab.analytics.performance.uptime}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Error Rate:</span>
                            <span className="font-medium">{selectedLab.analytics.performance.errorRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">User Satisfaction:</span>
                            <span className="font-medium">{selectedLab.analytics.performance.userSatisfaction}/5</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p4">
                        <h4 className="font-semibold mb-2">Usage Statistics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Total Sessions:</span>
                            <span className="font-medium">{selectedLab.analytics.totalSessions}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Active Users:</span>
                            <span className="font-medium">{selectedLab.analytics.activeUsers}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Completion Rate:</span>
                            <span className="font-medium">{selectedLab.analytics.completionRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Average Score:</span>
                            <span className="font-medium">{selectedLab.analytics.averageScore}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">User Feedback</h4>
                    <div className="space-y-2">
                      {selectedLab.analytics.userFeedback.slice(0, 5).map((feedback, index) => (
                        <div key={index} className="p-2 border rounded text-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{feedback.user}</span>
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">{feedback.date.toLocaleDateString()}</span>
                            </div>
                          </div>
                          <p className="text-gray-600">{feedback.comment}</p>
                        </div>
                      ))}
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
