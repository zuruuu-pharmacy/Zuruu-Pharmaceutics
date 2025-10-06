"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Clipboard, CheckCircle, XCircle, AlertTriangle, Star, Target, TrendingUp,
  BarChart3, Clock, Users, Calendar, Plus, Search, Filter, Edit, Trash2,
  Eye, Download, Upload, Settings, Save, RefreshCw, Share2, Lock, Unlock,
  Copy, ExternalLink, Play, Pause, Stop, Zap, Bell, MessageSquare, Heart,
  Globe, Building, Award, Microscope, TestTube, FlaskConical, Atom, Brain,
  Database, DollarSign, GraduationCap, BookOpen, FileText, Shield, Gavel,
  Scale, Video, Camera, Headphones, Monitor, Smartphone, Tablet, UserCheck,
  UserPlus, Mail, Phone, MapPin, Briefcase, Trophy, PieChart, LineChart
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

interface Assessment {
  id: string;
  title: string;
  description: string;
  type: 'Quiz' | 'Exam' | 'Assignment' | 'Project' | 'Presentation' | 'Lab Report' | 'Peer Review' | 'Self Assessment';
  subject: string;
  course: string;
  instructor: string;
  status: 'Draft' | 'Published' | 'Active' | 'Completed' | 'Archived';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  duration: number; // in minutes
  totalPoints: number;
  passingScore: number;
  attempts: number;
  timeLimit: number;
  questions: Question[];
  rubric: RubricItem[];
  analytics: AssessmentAnalytics;
  settings: AssessmentSettings;
  createdAt: Date;
  updatedAt: Date;
}

interface Question {
  id: string;
  question: string;
  type: 'Multiple Choice' | 'True/False' | 'Short Answer' | 'Essay' | 'Fill in the Blank' | 'Matching' | 'Ordering' | 'File Upload';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  tags: string[];
  media?: MediaItem;
}

interface MediaItem {
  type: 'Image' | 'Video' | 'Audio' | 'Document';
  url: string;
  caption?: string;
}

interface RubricItem {
  id: string;
  criterion: string;
  description: string;
  points: number;
  levels: RubricLevel[];
}

interface RubricLevel {
  level: string;
  description: string;
  points: number;
}

interface AssessmentAnalytics {
  totalAttempts: number;
  averageScore: number;
  completionRate: number;
  timeSpent: number;
  questionAnalysis: QuestionAnalysis[];
  studentPerformance: StudentPerformance[];
  gradeDistribution: GradeDistribution;
  feedback: AssessmentFeedback[];
}

interface QuestionAnalysis {
  questionId: string;
  correctRate: number;
  averageTime: number;
  difficulty: number;
  discrimination: number;
  commonErrors: string[];
}

interface StudentPerformance {
  studentId: string;
  studentName: string;
  score: number;
  timeSpent: number;
  attempts: number;
  completed: boolean;
  submissionDate: Date;
}

interface GradeDistribution {
  a: number;
  b: number;
  c: number;
  d: number;
  f: number;
}

interface AssessmentFeedback {
  id: string;
  studentId: string;
  studentName: string;
  rating: number;
  comment: string;
  date: Date;
  helpful: boolean;
}

interface AssessmentSettings {
  shuffleQuestions: boolean;
  shuffleAnswers: boolean;
  showCorrectAnswers: boolean;
  showFeedback: boolean;
  allowReview: boolean;
  requirePassword: boolean;
  password?: string;
  ipRestriction: boolean;
  allowedIPs: string[];
  proctoring: boolean;
  webcamRequired: boolean;
  screenRecording: boolean;
  plagiarismCheck: boolean;
  autoSubmit: boolean;
  lateSubmission: boolean;
  latePenalty: number;
}

const generateMockAssessment = (id: number): Assessment => {
  const types: Assessment['type'][] = ['Quiz', 'Exam', 'Assignment', 'Project', 'Presentation', 'Lab Report', 'Peer Review', 'Self Assessment'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Literature', 'History', 'Economics'];
  const difficulties: Assessment['difficulty'][] = ['Easy', 'Medium', 'Hard', 'Expert'];
  const statuses: Assessment['status'][] = ['Draft', 'Published', 'Active', 'Completed', 'Archived'];
  
  const type = faker.helpers.arrayElement(types);
  const subject = faker.helpers.arrayElement(subjects);
  const difficulty = faker.helpers.arrayElement(difficulties);
  const status = faker.helpers.arrayElement(statuses);
  
  const questions: Question[] = Array.from({ length: faker.number.int({ min: 5, max: 30 }) }).map(() => ({
    id: faker.string.uuid(),
    question: faker.lorem.sentence(),
    type: faker.helpers.arrayElement(['Multiple Choice', 'True/False', 'Short Answer', 'Essay', 'Fill in the Blank', 'Matching', 'Ordering', 'File Upload']),
    options: faker.helpers.arrayElement(['Multiple Choice', 'True/False']).includes('Multiple Choice') ? 
      Array.from({ length: 4 }).map(() => faker.lorem.word()) : undefined,
    correctAnswer: faker.lorem.word(),
    explanation: faker.lorem.sentence(),
    points: faker.number.int({ min: 1, max: 20 }),
    difficulty: faker.helpers.arrayElement(['Easy', 'Medium', 'Hard']),
    category: faker.lorem.word(),
    tags: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => faker.lorem.word()),
    media: faker.datatype.boolean(0.3) ? {
      type: faker.helpers.arrayElement(['Image', 'Video', 'Audio', 'Document']),
      url: faker.internet.url(),
      caption: faker.lorem.sentence()
    } : undefined
  }));
  
  const rubric: RubricItem[] = Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => ({
    id: faker.string.uuid(),
    criterion: faker.lorem.words(2),
    description: faker.lorem.sentence(),
    points: faker.number.int({ min: 5, max: 25 }),
    levels: Array.from({ length: faker.number.int({ min: 3, max: 5 }) }).map((_, i) => ({
      level: ['Excellent', 'Good', 'Satisfactory', 'Needs Improvement', 'Poor'][i] || 'Fair',
      description: faker.lorem.sentence(),
      points: faker.number.int({ min: 1, max: 10 })
    }))
  }));
  
  const questionAnalysis: QuestionAnalysis[] = questions.map(q => ({
    questionId: q.id,
    correctRate: faker.number.float({ min: 0.2, max: 1.0, precision: 0.01 }),
    averageTime: faker.number.int({ min: 30, max: 300 }),
    difficulty: faker.number.float({ min: 0.1, max: 1.0, precision: 0.01 }),
    discrimination: faker.number.float({ min: 0.1, max: 1.0, precision: 0.01 }),
    commonErrors: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => faker.lorem.word())
  }));
  
  const studentPerformance: StudentPerformance[] = Array.from({ length: faker.number.int({ min: 10, max: 100 }) }).map(() => ({
    studentId: faker.string.uuid(),
    studentName: faker.person.fullName(),
    score: faker.number.int({ min: 0, max: 100 }),
    timeSpent: faker.number.int({ min: 300, max: 3600 }),
    attempts: faker.number.int({ min: 1, max: 3 }),
    completed: faker.datatype.boolean(0.9),
    submissionDate: faker.date.recent({ days: 30 })
  }));
  
  const feedback: AssessmentFeedback[] = Array.from({ length: faker.number.int({ min: 5, max: 20 }) }).map(() => ({
    id: faker.string.uuid(),
    studentId: faker.string.uuid(),
    studentName: faker.person.fullName(),
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.lorem.paragraph(),
    date: faker.date.recent({ days: 30 }),
    helpful: faker.datatype.boolean(0.8)
  }));
  
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(4),
    description: faker.lorem.paragraphs(2),
    type,
    subject,
    course: faker.lorem.words(2) + ' ' + faker.string.alphanumeric(3).toUpperCase(),
    instructor: faker.person.fullName(),
    status,
    difficulty,
    duration: faker.number.int({ min: 30, max: 180 }),
    totalPoints,
    passingScore: faker.number.int({ min: 60, max: 80 }),
    attempts: faker.number.int({ min: 1, max: 3 }),
    timeLimit: faker.number.int({ min: 30, max: 180 }),
    questions,
    rubric,
    analytics: {
      totalAttempts: faker.number.int({ min: 50, max: 500 }),
      averageScore: faker.number.float({ min: 60, max: 95, precision: 0.1 }),
      completionRate: faker.number.float({ min: 70, max: 100, precision: 0.1 }),
      timeSpent: faker.number.int({ min: 1000, max: 10000 }),
      questionAnalysis,
      studentPerformance,
      gradeDistribution: {
        a: faker.number.int({ min: 10, max: 30 }),
        b: faker.number.int({ min: 20, max: 40 }),
        c: faker.number.int({ min: 15, max: 35 }),
        d: faker.number.int({ min: 5, max: 20 }),
        f: faker.number.int({ min: 0, max: 15 })
      },
      feedback
    },
    settings: {
      shuffleQuestions: faker.datatype.boolean(0.7),
      shuffleAnswers: faker.datatype.boolean(0.6),
      showCorrectAnswers: faker.datatype.boolean(0.8),
      showFeedback: faker.datatype.boolean(0.9),
      allowReview: faker.datatype.boolean(0.8),
      requirePassword: faker.datatype.boolean(0.2),
      password: faker.datatype.boolean(0.2) ? faker.string.alphanumeric(8) : undefined,
      ipRestriction: faker.datatype.boolean(0.1),
      allowedIPs: faker.datatype.boolean(0.1) ? Array.from({ length: 3 }).map(() => faker.internet.ip()) : [],
      proctoring: faker.datatype.boolean(0.3),
      webcamRequired: faker.datatype.boolean(0.2),
      screenRecording: faker.datatype.boolean(0.1),
      plagiarismCheck: faker.datatype.boolean(0.4),
      autoSubmit: faker.datatype.boolean(0.6),
      lateSubmission: faker.datatype.boolean(0.7),
      latePenalty: faker.number.int({ min: 0, max: 25 })
    },
    createdAt: faker.date.past({ years: 2 }),
    updatedAt: faker.date.recent({ days: 30 })
  };
};

export default function AssessmentEvaluation() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterSubject, setFilterSubject] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);

  useEffect(() => {
    const mockAssessments = Array.from({ length: 30 }, (_, i) => generateMockAssessment(i));
    setAssessments(mockAssessments);
  }, []);

  const filteredAssessments = useMemo(() => {
    return assessments.filter(assessment => {
      const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assessment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assessment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assessment.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || assessment.type === filterType;
      const matchesSubject = filterSubject === 'All' || assessment.subject === filterSubject;
      const matchesStatus = filterStatus === 'All' || assessment.status === filterStatus;
      
      return matchesSearch && matchesType && matchesSubject && matchesStatus;
    });
  }, [assessments, searchTerm, filterType, filterSubject, filterStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Published': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Completed': return 'bg-purple-100 text-purple-800';
      case 'Archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Quiz': return <Clipboard className="w-5 h-5" />;
      case 'Exam': return <FileText className="w-5 h-5" />;
      case 'Assignment': return <BookOpen className="w-5 h-5" />;
      case 'Project': return <Briefcase className="w-5 h-5" />;
      case 'Presentation': return <Video className="w-5 h-5" />;
      case 'Lab Report': return <TestTube className="w-5 h-5" />;
      case 'Peer Review': return <Users className="w-5 h-5" />;
      case 'Self Assessment': return <UserCheck className="w-5 h-5" />;
      default: return <Clipboard className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assessment & Evaluation</h1>
          <p className="text-gray-600 mt-2">Digital assessment tools and performance analytics</p>
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
                New Assessment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Assessment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Assessment Title</Label>
                  <Input placeholder="Enter assessment title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Quiz">Quiz</SelectItem>
                        <SelectItem value="Exam">Exam</SelectItem>
                        <SelectItem value="Assignment">Assignment</SelectItem>
                        <SelectItem value="Project">Project</SelectItem>
                        <SelectItem value="Presentation">Presentation</SelectItem>
                        <SelectItem value="Lab Report">Lab Report</SelectItem>
                        <SelectItem value="Peer Review">Peer Review</SelectItem>
                        <SelectItem value="Self Assessment">Self Assessment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        <SelectItem value="Biology">Biology</SelectItem>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Literature">Literature</SelectItem>
                        <SelectItem value="History">History</SelectItem>
                        <SelectItem value="Economics">Economics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Enter assessment description" rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddModalOpen(false)}>
                  Create Assessment
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
                <p className="text-sm font-medium text-gray-600">Total Assessments</p>
                <p className="text-2xl font-bold text-gray-900">{assessments.length}</p>
              </div>
              <Clipboard className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {assessments.filter(a => a.status === 'Active').length} active
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Attempts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assessments.reduce((sum, a) => sum + a.analytics.totalAttempts, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-blue-600">
                {assessments.reduce((sum, a) => sum + a.analytics.studentPerformance.length, 0)} students
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
                  {assessments.length > 0 ? Math.round(assessments.reduce((sum, a) => sum + a.analytics.completionRate, 0) / assessments.length) : 0}%
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-purple-600">
                {assessments.length > 0 ? Math.round(assessments.reduce((sum, a) => sum + a.analytics.averageScore, 0) / assessments.length) : 0}% avg score
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Questions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assessments.reduce((sum, a) => sum + a.questions.length, 0)}
                </p>
              </div>
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-orange-600">
                {assessments.reduce((sum, a) => sum + a.totalPoints, 0)} total points
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
                  placeholder="Search assessments..."
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
                  <SelectItem value="Quiz">Quiz</SelectItem>
                  <SelectItem value="Exam">Exam</SelectItem>
                  <SelectItem value="Assignment">Assignment</SelectItem>
                  <SelectItem value="Project">Project</SelectItem>
                  <SelectItem value="Presentation">Presentation</SelectItem>
                  <SelectItem value="Lab Report">Lab Report</SelectItem>
                  <SelectItem value="Peer Review">Peer Review</SelectItem>
                  <SelectItem value="Self Assessment">Self Assessment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Subjects</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Literature">Literature</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Economics">Economics</SelectItem>
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
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssessments.map((assessment, index) => (
          <motion.div
            key={assessment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg line-clamp-2">{assessment.title}</CardTitle>
                    <p className="text-sm text-gray-600">{assessment.course}</p>
                    <p className="text-sm text-gray-500">{assessment.instructor}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getStatusColor(assessment.status)}>
                      {assessment.status}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {getTypeIcon(assessment.type)}
                      <span className="text-xs text-gray-500">{assessment.type}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge className={getDifficultyColor(assessment.difficulty)}>
                    {assessment.difficulty}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {assessment.duration} min
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Questions:</span>
                    <span className="ml-1 font-medium">{assessment.questions.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Points:</span>
                    <span className="ml-1 font-medium">{assessment.totalPoints}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Attempts:</span>
                    <span className="ml-1 font-medium">{assessment.analytics.totalAttempts}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Avg Score:</span>
                    <span className="ml-1 font-medium">{assessment.analytics.averageScore}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Completion Rate</span>
                    <span className="font-medium">{assessment.analytics.completionRate}%</span>
                  </div>
                  <Progress value={assessment.analytics.completionRate} className="h-2" />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedAssessment(assessment);
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
                    {assessment.createdAt.toLocaleDateString()}
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
            <DialogTitle>Assessment Details</DialogTitle>
          </DialogHeader>
          {selectedAssessment && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg">{selectedAssessment.title}</h3>
                  <p className="text-gray-600">{selectedAssessment.type} - {selectedAssessment.subject}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedAssessment.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Course:</span>
                    <span className="font-medium">{selectedAssessment.course}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Instructor:</span>
                    <span className="font-medium">{selectedAssessment.instructor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge className={getStatusColor(selectedAssessment.status)}>
                      {selectedAssessment.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Difficulty:</span>
                    <Badge className={getDifficultyColor(selectedAssessment.difficulty)}>
                      {selectedAssessment.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">{selectedAssessment.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Points:</span>
                    <span className="font-medium">{selectedAssessment.totalPoints}</span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="questions">Questions</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Assessment Statistics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Total Attempts:</span>
                            <span className="font-medium">{selectedAssessment.analytics.totalAttempts}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Average Score:</span>
                            <span className="font-medium">{selectedAssessment.analytics.averageScore}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Completion Rate:</span>
                            <span className="font-medium">{selectedAssessment.analytics.completionRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Time Spent:</span>
                            <span className="font-medium">{Math.round(selectedAssessment.analytics.timeSpent / 60)} minutes</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Grade Distribution</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">A:</span>
                            <span className="font-medium">{selectedAssessment.analytics.gradeDistribution.a}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">B:</span>
                            <span className="font-medium">{selectedAssessment.analytics.gradeDistribution.b}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">C:</span>
                            <span className="font-medium">{selectedAssessment.analytics.gradeDistribution.c}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">D:</span>
                            <span className="font-medium">{selectedAssessment.analytics.gradeDistribution.d}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">F:</span>
                            <span className="font-medium">{selectedAssessment.analytics.gradeDistribution.f}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="questions" className="space-y-4">
                  <div className="space-y-3">
                    {selectedAssessment.questions.map((question, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Question {index + 1}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{question.type}</Badge>
                            <Badge className={getDifficultyColor(question.difficulty)}>
                              {question.difficulty}
                            </Badge>
                            <span className="text-sm font-medium">{question.points} pts</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{question.question}</p>
                        {question.options && (
                          <div className="space-y-1 text-sm">
                            {question.options.map((option, optIndex) => (
                              <div key={optIndex} className="text-gray-500">
                                {String.fromCharCode(65 + optIndex)}. {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics" className="space-y-4">
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Question Analysis</h4>
                        <div className="space-y-2">
                          {selectedAssessment.analytics.questionAnalysis.slice(0, 5).map((analysis, index) => (
                            <div key={index} className="p-2 border rounded text-sm">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium">Question {index + 1}</span>
                                <span className="text-gray-500">Correct Rate: {Math.round(analysis.correctRate * 100)}%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-500">Avg Time: {analysis.averageTime}s</span>
                                <span className="text-gray-500">Difficulty: {Math.round(analysis.difficulty * 100)}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-4">
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Assessment Settings</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center justify-between">
                            <span>Shuffle Questions:</span>
                            <span className={selectedAssessment.settings.shuffleQuestions ? 'text-green-600' : 'text-gray-500'}>
                              {selectedAssessment.settings.shuffleQuestions ? 'Yes' : 'No'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Show Correct Answers:</span>
                            <span className={selectedAssessment.settings.showCorrectAnswers ? 'text-green-600' : 'text-gray-500'}>
                              {selectedAssessment.settings.showCorrectAnswers ? 'Yes' : 'No'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Proctoring:</span>
                            <span className={selectedAssessment.settings.proctoring ? 'text-green-600' : 'text-gray-500'}>
                              {selectedAssessment.settings.proctoring ? 'Yes' : 'No'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Plagiarism Check:</span>
                            <span className={selectedAssessment.settings.plagiarismCheck ? 'text-green-600' : 'text-gray-500'}>
                              {selectedAssessment.settings.plagiarismCheck ? 'Yes' : 'No'}
                            </span>
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
