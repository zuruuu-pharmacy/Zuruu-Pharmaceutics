"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Video, Smartphone, Tablet, Play, Pause, Stop, Download, Upload, Plus,
  Search, Filter, Edit, Trash2, Eye, CheckCircle, XCircle, AlertTriangle,
  Star, Target, TrendingUp, BarChart3, Clock, Users, Calendar, Settings,
  Save, RefreshCw, Share2, Lock, Unlock, Copy, ExternalLink, Zap, Bell,
  MessageSquare, Heart, Globe, Building, Award, Microscope, TestTube,
  FlaskConical, Atom, Brain, Database, DollarSign, GraduationCap, BookOpen,
  FileText, Shield, Gavel, Scale, Clipboard, Headphones, Monitor, Camera,
  Wifi, Signal, Battery, Volume2, VolumeX, Maximize, Minimize, RotateCcw
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

interface MobileCourse {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: 'Video Lecture' | 'Interactive Quiz' | 'Reading Material' | 'Assignment' | 'Discussion' | 'Live Session';
  subject: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in minutes
  status: 'Published' | 'Draft' | 'Archived' | 'Under Review';
  thumbnail: string;
  videoUrl?: string;
  audioUrl?: string;
  documentUrl?: string;
  quizData?: QuizData;
  assignmentData?: AssignmentData;
  discussionData?: DiscussionData;
  liveSessionData?: LiveSessionData;
  mobileOptimized: boolean;
  offlineAvailable: boolean;
  downloadSize: number;
  requirements: string[];
  learningObjectives: string[];
  tags: string[];
  analytics: CourseAnalytics;
  createdAt: Date;
  updatedAt: Date;
}

interface QuizData {
  questions: Question[];
  timeLimit: number;
  passingScore: number;
  attempts: number;
  shuffleQuestions: boolean;
  showCorrectAnswers: boolean;
}

interface Question {
  id: string;
  question: string;
  type: 'Multiple Choice' | 'True/False' | 'Short Answer' | 'Fill in the Blank';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

interface AssignmentData {
  instructions: string;
  submissionType: 'Text' | 'File Upload' | 'Video' | 'Audio' | 'Image';
  dueDate: Date;
  maxFileSize: number;
  allowedFormats: string[];
  rubric: RubricItem[];
}

interface RubricItem {
  criterion: string;
  points: number;
  description: string;
}

interface DiscussionData {
  topic: string;
  instructions: string;
  participationRequirements: string;
  moderationEnabled: boolean;
  anonymousPosting: boolean;
}

interface LiveSessionData {
  scheduledDate: Date;
  duration: number;
  maxParticipants: number;
  recordingEnabled: boolean;
  chatEnabled: boolean;
  qaEnabled: boolean;
  platform: 'Zoom' | 'Teams' | 'Google Meet' | 'Custom';
}

interface CourseAnalytics {
  views: number;
  completions: number;
  averageScore: number;
  timeSpent: number;
  deviceBreakdown: DeviceBreakdown;
  engagement: EngagementMetrics;
  feedback: CourseFeedback[];
}

interface DeviceBreakdown {
  mobile: number;
  tablet: number;
  desktop: number;
}

interface EngagementMetrics {
  averageSessionTime: number;
  bounceRate: number;
  returnRate: number;
  interactionRate: number;
}

interface CourseFeedback {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: Date;
  helpful: boolean;
}

const generateMockMobileCourse = (id: number): MobileCourse => {
  const categories: MobileCourse['category'][] = ['Video Lecture', 'Interactive Quiz', 'Reading Material', 'Assignment', 'Discussion', 'Live Session'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Literature', 'History', 'Economics'];
  const levels: MobileCourse['level'][] = ['Beginner', 'Intermediate', 'Advanced'];
  const statuses: MobileCourse['status'][] = ['Published', 'Draft', 'Archived', 'Under Review'];
  
  const category = faker.helpers.arrayElement(categories);
  const subject = faker.helpers.arrayElement(subjects);
  const level = faker.helpers.arrayElement(levels);
  const status = faker.helpers.arrayElement(statuses);
  
  const questions: Question[] = Array.from({ length: faker.number.int({ min: 5, max: 20 }) }).map(() => ({
    id: faker.string.uuid(),
    question: faker.lorem.sentence(),
    type: faker.helpers.arrayElement(['Multiple Choice', 'True/False', 'Short Answer', 'Fill in the Blank']),
    options: faker.helpers.arrayElement(['Multiple Choice', 'True/False']).includes('Multiple Choice') ? 
      Array.from({ length: 4 }).map(() => faker.lorem.word()) : undefined,
    correctAnswer: faker.lorem.word(),
    explanation: faker.lorem.sentence(),
    points: faker.number.int({ min: 1, max: 10 })
  }));
  
  const rubric: RubricItem[] = Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => ({
    criterion: faker.lorem.words(2),
    points: faker.number.int({ min: 5, max: 25 }),
    description: faker.lorem.sentence()
  }));
  
  const feedback: CourseFeedback[] = Array.from({ length: faker.number.int({ min: 3, max: 15 }) }).map(() => ({
    id: faker.string.uuid(),
    user: faker.person.fullName(),
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.lorem.paragraph(),
    date: faker.date.recent({ days: 30 }),
    helpful: faker.datatype.boolean(0.8)
  }));
  
  const learningObjectives = Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => faker.lorem.sentence());
  const requirements = Array.from({ length: faker.number.int({ min: 2, max: 6 }) }).map(() => faker.lorem.word());
  const tags = Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => faker.lorem.word());
  
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(4),
    description: faker.lorem.paragraphs(2),
    instructor: faker.person.fullName(),
    category,
    subject,
    level,
    duration: faker.number.int({ min: 15, max: 180 }),
    status,
    thumbnail: faker.image.url(),
    videoUrl: category === 'Video Lecture' ? faker.internet.url() : undefined,
    audioUrl: faker.datatype.boolean(0.3) ? faker.internet.url() : undefined,
    documentUrl: category === 'Reading Material' ? faker.internet.url() : undefined,
    quizData: category === 'Interactive Quiz' ? {
      questions,
      timeLimit: faker.number.int({ min: 10, max: 60 }),
      passingScore: faker.number.int({ min: 60, max: 90 }),
      attempts: faker.number.int({ min: 1, max: 3 }),
      shuffleQuestions: faker.datatype.boolean(0.7),
      showCorrectAnswers: faker.datatype.boolean(0.8)
    } : undefined,
    assignmentData: category === 'Assignment' ? {
      instructions: faker.lorem.paragraphs(2),
      submissionType: faker.helpers.arrayElement(['Text', 'File Upload', 'Video', 'Audio', 'Image']),
      dueDate: faker.date.future({ years: 1 }),
      maxFileSize: faker.number.int({ min: 5, max: 100 }),
      allowedFormats: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => faker.helpers.arrayElement(['PDF', 'DOC', 'DOCX', 'MP4', 'MP3', 'JPG', 'PNG'])),
      rubric
    } : undefined,
    discussionData: category === 'Discussion' ? {
      topic: faker.lorem.words(3),
      instructions: faker.lorem.paragraph(),
      participationRequirements: faker.lorem.sentence(),
      moderationEnabled: faker.datatype.boolean(0.6),
      anonymousPosting: faker.datatype.boolean(0.3)
    } : undefined,
    liveSessionData: category === 'Live Session' ? {
      scheduledDate: faker.date.future({ years: 1 }),
      duration: faker.number.int({ min: 30, max: 120 }),
      maxParticipants: faker.number.int({ min: 10, max: 100 }),
      recordingEnabled: faker.datatype.boolean(0.8),
      chatEnabled: faker.datatype.boolean(0.9),
      qaEnabled: faker.datatype.boolean(0.7),
      platform: faker.helpers.arrayElement(['Zoom', 'Teams', 'Google Meet', 'Custom'])
    } : undefined,
    mobileOptimized: faker.datatype.boolean(0.9),
    offlineAvailable: faker.datatype.boolean(0.7),
    downloadSize: faker.number.int({ min: 1000000, max: 1000000000 }),
    requirements,
    learningObjectives,
    tags,
    analytics: {
      views: faker.number.int({ min: 0, max: 1000 }),
      completions: faker.number.int({ min: 0, max: 100 }),
      averageScore: faker.number.float({ min: 60, max: 100, precision: 0.1 }),
      timeSpent: faker.number.int({ min: 0, max: 10000 }),
      deviceBreakdown: {
        mobile: faker.number.int({ min: 30, max: 80 }),
        tablet: faker.number.int({ min: 10, max: 30 }),
        desktop: faker.number.int({ min: 10, max: 40 })
      },
      engagement: {
        averageSessionTime: faker.number.int({ min: 5, max: 60 }),
        bounceRate: faker.number.float({ min: 10, max: 50, precision: 0.1 }),
        returnRate: faker.number.float({ min: 20, max: 80, precision: 0.1 }),
        interactionRate: faker.number.float({ min: 30, max: 90, precision: 0.1 })
      },
      feedback
    },
    createdAt: faker.date.past({ years: 2 }),
    updatedAt: faker.date.recent({ days: 30 })
  };
};

export default function MobileLearning() {
  const [courses, setCourses] = useState<MobileCourse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterSubject, setFilterSubject] = useState<string>('All');
  const [filterLevel, setFilterLevel] = useState<string>('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<MobileCourse | null>(null);

  useEffect(() => {
    const mockCourses = Array.from({ length: 30 }, (_, i) => generateMockMobileCourse(i));
    setCourses(mockCourses);
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || course.category === filterCategory;
      const matchesSubject = filterSubject === 'All' || course.subject === filterSubject;
      const matchesLevel = filterLevel === 'All' || course.level === filterLevel;
      
      return matchesSearch && matchesCategory && matchesSubject && matchesLevel;
    });
  }, [courses, searchTerm, filterCategory, filterSubject, filterLevel]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Archived': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Video Lecture': return <Video className="w-5 h-5" />;
      case 'Interactive Quiz': return <Clipboard className="w-5 h-5" />;
      case 'Reading Material': return <BookOpen className="w-5 h-5" />;
      case 'Assignment': return <FileText className="w-5 h-5" />;
      case 'Discussion': return <MessageSquare className="w-5 h-5" />;
      case 'Live Session': return <Users className="w-5 h-5" />;
      default: return <Smartphone className="w-5 h-5" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mobile Learning Platform</h1>
          <p className="text-gray-600 mt-2">Access courses, quizzes, and resources on any device</p>
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
                New Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Mobile Course</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Course Title</Label>
                  <Input placeholder="Enter course title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Video Lecture">Video Lecture</SelectItem>
                        <SelectItem value="Interactive Quiz">Interactive Quiz</SelectItem>
                        <SelectItem value="Reading Material">Reading Material</SelectItem>
                        <SelectItem value="Assignment">Assignment</SelectItem>
                        <SelectItem value="Discussion">Discussion</SelectItem>
                        <SelectItem value="Live Session">Live Session</SelectItem>
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
                  <Textarea placeholder="Enter course description" rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddModalOpen(false)}>
                  Create Course
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
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
              </div>
              <Smartphone className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {courses.filter(c => c.status === 'Published').length} published
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mobile Optimized</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.filter(c => c.mobileOptimized).length}
                </p>
              </div>
              <Tablet className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-blue-600">
                {Math.round((courses.filter(c => c.mobileOptimized).length / courses.length) * 100)}% of total
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Offline Available</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.filter(c => c.offlineAvailable).length}
                </p>
              </div>
              <Download className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-purple-600">
                {Math.round((courses.filter(c => c.offlineAvailable).length / courses.length) * 100)}% of total
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.reduce((sum, c) => sum + c.analytics.views, 0)}
                </p>
              </div>
              <Eye className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-orange-600">
                {courses.reduce((sum, c) => sum + c.analytics.completions, 0)} completions
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
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Video Lecture">Video Lecture</SelectItem>
                  <SelectItem value="Interactive Quiz">Interactive Quiz</SelectItem>
                  <SelectItem value="Reading Material">Reading Material</SelectItem>
                  <SelectItem value="Assignment">Assignment</SelectItem>
                  <SelectItem value="Discussion">Discussion</SelectItem>
                  <SelectItem value="Live Session">Live Session</SelectItem>
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
              <Label>Level</Label>
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                    <p className="text-sm text-gray-600">{course.instructor}</p>
                    <p className="text-sm text-gray-500">{course.subject}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getStatusColor(course.status)}>
                      {course.status}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {getCategoryIcon(course.category)}
                      <span className="text-xs text-gray-500">{course.category}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {course.duration} minutes
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Views:</span>
                    <span className="ml-1 font-medium">{course.analytics.views}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Completions:</span>
                    <span className="ml-1 font-medium">{course.analytics.completions}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Avg Score:</span>
                    <span className="ml-1 font-medium">{course.analytics.averageScore}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Size:</span>
                    <span className="ml-1 font-medium">{formatFileSize(course.downloadSize)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {course.mobileOptimized && (
                    <Badge variant="outline" className="text-xs">
                      <Smartphone className="w-3 h-3 mr-1" />
                      Mobile
                    </Badge>
                  )}
                  {course.offlineAvailable && (
                    <Badge variant="outline" className="text-xs">
                      <Download className="w-3 h-3 mr-1" />
                      Offline
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {course.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {course.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{course.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedCourse(course);
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
                    {course.createdAt.toLocaleDateString()}
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
            <DialogTitle>Course Details</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg">{selectedCourse.title}</h3>
                  <p className="text-gray-600">{selectedCourse.category} - {selectedCourse.subject}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedCourse.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Instructor:</span>
                    <span className="font-medium">{selectedCourse.instructor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Level:</span>
                    <Badge className={getLevelColor(selectedCourse.level)}>
                      {selectedCourse.level}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">{selectedCourse.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge className={getStatusColor(selectedCourse.status)}>
                      {selectedCourse.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Mobile Optimized:</span>
                    <span className="font-medium">{selectedCourse.mobileOptimized ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Offline Available:</span>
                    <span className="font-medium">{selectedCourse.offlineAvailable ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Learning Objectives</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {selectedCourse.learningObjectives.map((objective, index) => (
                            <li key={index}>{objective}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Requirements</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedCourse.requirements.map((req, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="content" className="space-y-4">
                  {selectedCourse.quizData && (
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Quiz Information</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Questions:</span>
                            <span className="ml-1 font-medium">{selectedCourse.quizData.questions.length}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Time Limit:</span>
                            <span className="ml-1 font-medium">{selectedCourse.quizData.timeLimit} minutes</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Passing Score:</span>
                            <span className="ml-1 font-medium">{selectedCourse.quizData.passingScore}%</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Attempts:</span>
                            <span className="ml-1 font-medium">{selectedCourse.quizData.attempts}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {selectedCourse.assignmentData && (
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Assignment Information</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Submission Type:</span>
                            <span className="ml-1 font-medium">{selectedCourse.assignmentData.submissionType}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Due Date:</span>
                            <span className="ml-1 font-medium">{selectedCourse.assignmentData.dueDate.toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Max File Size:</span>
                            <span className="ml-1 font-medium">{selectedCourse.assignmentData.maxFileSize} MB</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Allowed Formats:</span>
                            <span className="ml-1 font-medium">{selectedCourse.assignmentData.allowedFormats.join(', ')}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {selectedCourse.liveSessionData && (
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Live Session Information</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Scheduled Date:</span>
                            <span className="ml-1 font-medium">{selectedCourse.liveSessionData.scheduledDate.toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Duration:</span>
                            <span className="ml-1 font-medium">{selectedCourse.liveSessionData.duration} minutes</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Max Participants:</span>
                            <span className="ml-1 font-medium">{selectedCourse.liveSessionData.maxParticipants}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Platform:</span>
                            <span className="ml-1 font-medium">{selectedCourse.liveSessionData.platform}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="analytics" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Usage Statistics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Total Views:</span>
                            <span className="font-medium">{selectedCourse.analytics.views}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Completions:</span>
                            <span className="font-medium">{selectedCourse.analytics.completions}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Average Score:</span>
                            <span className="font-medium">{selectedCourse.analytics.averageScore}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Time Spent:</span>
                            <span className="font-medium">{selectedCourse.analytics.timeSpent} minutes</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Device Breakdown</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Mobile:</span>
                            <span className="font-medium">{selectedCourse.analytics.deviceBreakdown.mobile}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Tablet:</span>
                            <span className="font-medium">{selectedCourse.analytics.deviceBreakdown.tablet}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Desktop:</span>
                            <span className="font-medium">{selectedCourse.analytics.deviceBreakdown.desktop}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Engagement Metrics</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Avg Session Time:</span>
                          <span className="ml-1 font-medium">{selectedCourse.analytics.engagement.averageSessionTime} min</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Bounce Rate:</span>
                          <span className="ml-1 font-medium">{selectedCourse.analytics.engagement.bounceRate}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Return Rate:</span>
                          <span className="ml-1 font-medium">{selectedCourse.analytics.engagement.returnRate}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Interaction Rate:</span>
                          <span className="ml-1 font-medium">{selectedCourse.analytics.engagement.interactionRate}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="feedback" className="space-y-4">
                  <div className="space-y-3">
                    {selectedCourse.analytics.feedback.map((feedback, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
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
                        <p className="text-gray-600 text-sm">{feedback.comment}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                          <span>Helpful: {feedback.helpful ? 'Yes' : 'No'}</span>
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
