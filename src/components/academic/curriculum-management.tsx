"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, GraduationCap, Calendar, Clock, Users, Award, FileText, Plus,
  Edit, Trash2, Eye, Download, Upload, Search, Filter, CheckCircle, XCircle,
  AlertTriangle, Star, Target, TrendingUp, BarChart3, PieChart, LineChart,
  Settings, Save, RefreshCw, Share2, Lock, Unlock, Copy, ExternalLink,
  Play, Pause, Stop, Zap, Bell, MessageSquare, Heart, Globe, Building
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
import { useRouter } from 'next/navigation';

interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  credits: number;
  level: 'Undergraduate' | 'Graduate' | 'Doctoral' | 'Certificate';
  department: string;
  prerequisites: string[];
  learningOutcomes: string[];
  assessmentMethods: string[];
  instructor: string;
  semester: string;
  year: number;
  status: 'Active' | 'Inactive' | 'Draft' | 'Archived';
  enrollmentCount: number;
  maxEnrollment: number;
  schedule: Schedule[];
  resources: Resource[];
  assignments: Assignment[];
  exams: Exam[];
  createdAt: Date;
  updatedAt: Date;
}

interface Schedule {
  day: string;
  time: string;
  room: string;
  type: 'Lecture' | 'Lab' | 'Tutorial' | 'Seminar';
  duration: number;
}

interface Resource {
  id: string;
  title: string;
  type: 'Textbook' | 'Article' | 'Video' | 'Document' | 'Link' | 'Software';
  url?: string;
  description: string;
  required: boolean;
  week: number;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  type: 'Homework' | 'Project' | 'Lab Report' | 'Presentation' | 'Research Paper';
  dueDate: Date;
  points: number;
  weight: number;
  instructions: string;
  rubric?: string;
  submissions: number;
  graded: number;
}

interface Exam {
  id: string;
  title: string;
  type: 'Midterm' | 'Final' | 'Quiz' | 'Practical';
  date: Date;
  duration: number;
  totalMarks: number;
  weight: number;
  location: string;
  instructions: string;
  questions: number;
}

interface Program {
  id: string;
  name: string;
  degree: string;
  duration: number;
  credits: number;
  description: string;
  requirements: string[];
  courses: string[];
  status: 'Active' | 'Inactive' | 'Draft';
  createdAt: Date;
}

const generateMockCourse = (id: number): Course => {
  const levels: Course['level'][] = ['Undergraduate', 'Graduate', 'Doctoral', 'Certificate'];
  const departments = ['Pharmacy', 'Chemistry', 'Biology', 'Medicine', 'Nursing', 'Public Health'];
  const statuses: Course['status'][] = ['Active', 'Inactive', 'Draft', 'Archived'];
  const semesters = ['Fall 2024', 'Spring 2024', 'Summer 2024', 'Fall 2023'];
  
  const level = faker.helpers.arrayElement(levels);
  const department = faker.helpers.arrayElement(departments);
  const status = faker.helpers.arrayElement(statuses);
  const semester = faker.helpers.arrayElement(semesters);
  
  const courseTitles = [
    'Pharmacology I', 'Medicinal Chemistry', 'Pharmaceutics', 'Pharmacognosy',
    'Clinical Pharmacy', 'Pharmacy Practice', 'Biopharmaceutics', 'Pharmacokinetics',
    'Drug Discovery', 'Pharmaceutical Analysis', 'Pharmacy Law', 'Health Economics'
  ];
  
  const title = faker.helpers.arrayElement(courseTitles);
  const code = `${department.substring(0, 3).toUpperCase()}-${faker.string.numeric(3)}`;
  
  const schedule: Schedule[] = Array.from({ length: faker.number.int({ min: 2, max: 4 }) }).map(() => ({
    day: faker.helpers.arrayElement(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
    time: faker.helpers.arrayElement(['09:00-10:30', '10:30-12:00', '13:00-14:30', '14:30-16:00']),
    room: faker.location.buildingNumber(),
    type: faker.helpers.arrayElement(['Lecture', 'Lab', 'Tutorial', 'Seminar']),
    duration: faker.number.int({ min: 60, max: 180 })
  }));
  
  const resources: Resource[] = Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    type: faker.helpers.arrayElement(['Textbook', 'Article', 'Video', 'Document', 'Link', 'Software']),
    url: faker.internet.url(),
    description: faker.lorem.sentence(),
    required: faker.datatype.boolean(0.6),
    week: faker.number.int({ min: 1, max: 16 })
  }));
  
  const assignments: Assignment[] = Array.from({ length: faker.number.int({ min: 3, max: 6 }) }).map(() => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(4),
    description: faker.lorem.paragraph(),
    type: faker.helpers.arrayElement(['Homework', 'Project', 'Lab Report', 'Presentation', 'Research Paper']),
    dueDate: faker.date.future({ years: 1 }),
    points: faker.number.int({ min: 50, max: 200 }),
    weight: faker.number.int({ min: 5, max: 25 }),
    instructions: faker.lorem.paragraphs(2),
    rubric: faker.lorem.paragraph(),
    submissions: faker.number.int({ min: 0, max: 50 }),
    graded: faker.number.int({ min: 0, max: 50 })
  }));
  
  const exams: Exam[] = Array.from({ length: faker.number.int({ min: 2, max: 4 }) }).map(() => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    type: faker.helpers.arrayElement(['Midterm', 'Final', 'Quiz', 'Practical']),
    date: faker.date.future({ years: 1 }),
    duration: faker.number.int({ min: 60, max: 180 }),
    totalMarks: faker.number.int({ min: 50, max: 200 }),
    weight: faker.number.int({ min: 10, max: 40 }),
    location: faker.location.buildingNumber(),
    instructions: faker.lorem.paragraph(),
    questions: faker.number.int({ min: 10, max: 50 })
  }));
  
  return {
    id: faker.string.uuid(),
    code,
    title,
    description: faker.lorem.paragraphs(2),
    credits: faker.number.int({ min: 1, max: 6 }),
    level,
    department,
    prerequisites: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }).map(() => faker.lorem.words(2)),
    learningOutcomes: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => faker.lorem.sentence()),
    assessmentMethods: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => faker.helpers.arrayElement(['Exam', 'Assignment', 'Project', 'Presentation', 'Lab Work'])),
    instructor: faker.person.fullName(),
    semester,
    year: faker.number.int({ min: 2023, max: 2025 }),
    status,
    enrollmentCount: faker.number.int({ min: 0, max: 100 }),
    maxEnrollment: faker.number.int({ min: 30, max: 150 }),
    schedule,
    resources,
    assignments,
    exams,
    createdAt: faker.date.past({ years: 2 }),
    updatedAt: faker.date.recent({ days: 30 })
  };
};

const generateMockProgram = (id: number): Program => {
  const degrees = ['Bachelor of Pharmacy', 'Master of Pharmacy', 'Doctor of Pharmacy', 'Certificate in Pharmacy'];
  const names = ['Pharmacy Practice', 'Clinical Pharmacy', 'Pharmaceutical Sciences', 'Drug Discovery', 'Pharmacy Management'];
  
  return {
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement(names),
    degree: faker.helpers.arrayElement(degrees),
    duration: faker.number.int({ min: 2, max: 6 }),
    credits: faker.number.int({ min: 60, max: 180 }),
    description: faker.lorem.paragraphs(2),
    requirements: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => faker.lorem.sentence()),
    courses: Array.from({ length: faker.number.int({ min: 10, max: 30 }) }).map(() => faker.string.uuid()),
    status: faker.helpers.arrayElement(['Active', 'Inactive', 'Draft']),
    createdAt: faker.date.past({ years: 3 })
  };
};

export default function CurriculumManagement() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterDepartment, setFilterDepartment] = useState<string>('All');
  const [activeTab, setActiveTab] = useState('courses');
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [isAddProgramModalOpen, setIsAddProgramModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Course | Program | null>(null);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({});
  const [newProgram, setNewProgram] = useState<Partial<Program>>({});

  useEffect(() => {
    // Generate mock data
    const mockCourses = Array.from({ length: 50 }, (_, i) => generateMockCourse(i));
    const mockPrograms = Array.from({ length: 10 }, (_, i) => generateMockProgram(i));
    
    setCourses(mockCourses);
    setPrograms(mockPrograms);
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = filterLevel === 'All' || course.level === filterLevel;
      const matchesStatus = filterStatus === 'All' || course.status === filterStatus;
      const matchesDepartment = filterDepartment === 'All' || course.department === filterDepartment;
      
      return matchesSearch && matchesLevel && matchesStatus && matchesDepartment;
    });
  }, [courses, searchTerm, filterLevel, filterStatus, filterDepartment]);

  const handleAddCourse = () => {
    if (newCourse.title && newCourse.code && newCourse.credits) {
      const course: Course = {
        id: faker.string.uuid(),
        code: newCourse.code,
        title: newCourse.title,
        description: newCourse.description || '',
        credits: newCourse.credits || 3,
        level: newCourse.level || 'Undergraduate',
        department: newCourse.department || 'Pharmacy',
        prerequisites: newCourse.prerequisites || [],
        learningOutcomes: newCourse.learningOutcomes || [],
        assessmentMethods: newCourse.assessmentMethods || [],
        instructor: newCourse.instructor || '',
        semester: newCourse.semester || 'Fall 2024',
        year: newCourse.year || 2024,
        status: 'Draft',
        enrollmentCount: 0,
        maxEnrollment: newCourse.maxEnrollment || 50,
        schedule: [],
        resources: [],
        assignments: [],
        exams: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setCourses(prev => [course, ...prev]);
      setNewCourse({});
      setIsAddCourseModalOpen(false);
    }
  };

  const handleAddProgram = () => {
    if (newProgram.name && newProgram.degree && newProgram.credits) {
      const program: Program = {
        id: faker.string.uuid(),
        name: newProgram.name,
        degree: newProgram.degree,
        duration: newProgram.duration || 4,
        credits: newProgram.credits,
        description: newProgram.description || '',
        requirements: newProgram.requirements || [],
        courses: [],
        status: 'Draft',
        createdAt: new Date()
      };
      
      setPrograms(prev => [program, ...prev]);
      setNewProgram({});
      setIsAddProgramModalOpen(false);
    }
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(course => course.id !== courseId));
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteProgram = (programId: string) => {
    setPrograms(prev => prev.filter(program => program.id !== programId));
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
  };

  const exportToCSV = (data: Course[] | Program[], type: 'courses' | 'programs') => {
    const headers = type === 'courses' 
      ? ['Code', 'Title', 'Credits', 'Level', 'Department', 'Instructor', 'Status', 'Enrollment']
      : ['Name', 'Degree', 'Duration', 'Credits', 'Status', 'Created'];
    
    const csvContent = [
      headers.join(','),
      ...data.map(item => {
        if (type === 'courses') {
          const course = item as Course;
          return [
            course.code,
            `"${course.title}"`,
            course.credits,
            course.level,
            course.department,
            course.instructor,
            course.status,
            course.enrollmentCount
          ].join(',');
        } else {
          const program = item as Program;
          return [
            `"${program.name}"`,
            program.degree,
            program.duration,
            program.credits,
            program.status,
            program.createdAt.toLocaleDateString()
          ].join(',');
        }
      })
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Undergraduate': return 'bg-blue-100 text-blue-800';
      case 'Graduate': return 'bg-purple-100 text-purple-800';
      case 'Doctoral': return 'bg-indigo-100 text-indigo-800';
      case 'Certificate': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Curriculum Management</h1>
          <p className="text-gray-600 mt-2">Design, manage, and track academic programs and courses</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => router.push('/curriculum-admin')}
            variant="outline"
            size="sm"
          >
            <Settings className="w-4 h-4 mr-2" />
            Admin Panel
          </Button>
          <Button
            onClick={() => exportToCSV(filteredCourses, 'courses')}
            variant="outline"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Courses
          </Button>
          <Button
            onClick={() => exportToCSV(programs, 'programs')}
            variant="outline"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Programs
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="courses" className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Courses ({courses.length})</span>
          </TabsTrigger>
          <TabsTrigger value="programs" className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4" />
            <span>Programs ({programs.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6">
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
                  <Label>Level</Label>
                  <Select value={filterLevel} onValueChange={setFilterLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Levels</SelectItem>
                      <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="Graduate">Graduate</SelectItem>
                      <SelectItem value="Doctoral">Doctoral</SelectItem>
                      <SelectItem value="Certificate">Certificate</SelectItem>
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
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Departments</SelectItem>
                      <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="Medicine">Medicine</SelectItem>
                      <SelectItem value="Nursing">Nursing</SelectItem>
                      <SelectItem value="Public Health">Public Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Course Button */}
          <div className="flex justify-end">
            <Dialog open={isAddCourseModalOpen} onOpenChange={setIsAddCourseModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Course
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Course</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Course Code</Label>
                    <Input
                      value={newCourse.code || ''}
                      onChange={(e) => setNewCourse(prev => ({ ...prev, code: e.target.value }))}
                      placeholder="e.g., PHAR-101"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Course Title</Label>
                    <Input
                      value={newCourse.title || ''}
                      onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Introduction to Pharmacy"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Credits</Label>
                    <Input
                      type="number"
                      value={newCourse.credits || ''}
                      onChange={(e) => setNewCourse(prev => ({ ...prev, credits: parseInt(e.target.value) }))}
                      placeholder="3"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Level</Label>
                    <Select value={newCourse.level || ''} onValueChange={(value) => setNewCourse(prev => ({ ...prev, level: value as Course['level'] }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="Graduate">Graduate</SelectItem>
                        <SelectItem value="Doctoral">Doctoral</SelectItem>
                        <SelectItem value="Certificate">Certificate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Select value={newCourse.department || ''} onValueChange={(value) => setNewCourse(prev => ({ ...prev, department: value }))}>
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
                  <div className="space-y-2">
                    <Label>Instructor</Label>
                    <Input
                      value={newCourse.instructor || ''}
                      onChange={(e) => setNewCourse(prev => ({ ...prev, instructor: e.target.value }))}
                      placeholder="Instructor name"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={newCourse.description || ''}
                      onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Course description..."
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddCourseModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCourse}>
                    Add Course
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

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
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <p className="text-sm text-gray-600">{course.code}</p>
                        <p className="text-sm text-gray-500">{course.instructor}</p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Badge className={getStatusColor(course.status)}>
                          {course.status}
                        </Badge>
                        <Badge className={getLevelColor(course.level)}>
                          {course.level}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Credits:</span>
                        <span className="ml-1 font-medium">{course.credits}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Department:</span>
                        <span className="ml-1 font-medium">{course.department}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Enrollment:</span>
                        <span className="ml-1 font-medium">{course.enrollmentCount}/{course.maxEnrollment}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Semester:</span>
                        <span className="ml-1 font-medium">{course.semester}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Enrollment Progress</span>
                        <span className="font-medium">{Math.round((course.enrollmentCount / course.maxEnrollment) * 100)}%</span>
                      </div>
                      <Progress value={(course.enrollmentCount / course.maxEnrollment) * 100} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedItem(course);
                            setIsViewModalOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedItem(course);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedItem(course);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-xs text-gray-500">
                        {course.updatedAt.toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Programs Tab */}
        <TabsContent value="programs" className="space-y-6">
          {/* Add Program Button */}
          <div className="flex justify-end">
            <Dialog open={isAddProgramModalOpen} onOpenChange={setIsAddProgramModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Program
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Program</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Program Name</Label>
                    <Input
                      value={newProgram.name || ''}
                      onChange={(e) => setNewProgram(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Clinical Pharmacy"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input
                      value={newProgram.degree || ''}
                      onChange={(e) => setNewProgram(prev => ({ ...prev, degree: e.target.value }))}
                      placeholder="e.g., Master of Pharmacy"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration (years)</Label>
                    <Input
                      type="number"
                      value={newProgram.duration || ''}
                      onChange={(e) => setNewProgram(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                      placeholder="4"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Credits</Label>
                    <Input
                      type="number"
                      value={newProgram.credits || ''}
                      onChange={(e) => setNewProgram(prev => ({ ...prev, credits: parseInt(e.target.value) }))}
                      placeholder="120"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={newProgram.description || ''}
                      onChange={(e) => setNewProgram(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Program description..."
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddProgramModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddProgram}>
                    Add Program
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{program.name}</CardTitle>
                        <p className="text-sm text-gray-600">{program.degree}</p>
                      </div>
                      <Badge className={getStatusColor(program.status)}>
                        {program.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-3">{program.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <span className="ml-1 font-medium">{program.duration} years</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Credits:</span>
                        <span className="ml-1 font-medium">{program.credits}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Courses:</span>
                        <span className="ml-1 font-medium">{program.courses.length}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Created:</span>
                        <span className="ml-1 font-medium">{program.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedItem(program);
                            setIsViewModalOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedItem(program);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedItem(program);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedItem && 'code' in selectedItem ? 'Course Details' : selectedItem ? 'Program Details' : 'Details'}
            </DialogTitle>
          </DialogHeader>
          {selectedItem && 'code' in selectedItem ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg">{selectedItem?.title || 'N/A'}</h3>
                  <p className="text-gray-600">{selectedItem?.code || 'N/A'}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedItem?.description || 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Credits:</span>
                    <span className="font-medium">{selectedItem?.credits || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Level:</span>
                    <Badge className={getLevelColor(selectedItem?.level || '')}>
                      {selectedItem?.level || 'N/A'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Department:</span>
                    <span className="font-medium">{selectedItem?.department || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Instructor:</span>
                    <span className="font-medium">{selectedItem?.instructor || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge className={getStatusColor(selectedItem?.status || '')}>
                      {selectedItem?.status || 'N/A'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Learning Outcomes</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {selectedItem.learningOutcomes.map((outcome, index) => (
                        <li key={index}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Assessment Methods</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.assessmentMethods.map((method, index) => (
                        <Badge key={index} variant="outline">{method}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Prerequisites</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.prerequisites.length > 0 ? (
                        selectedItem.prerequisites.map((prereq, index) => (
                          <Badge key={index} variant="secondary">{prereq}</Badge>
                        ))
                      ) : (
                        <span className="text-gray-500 text-sm">No prerequisites</span>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="schedule" className="space-y-4">
                  <div className="space-y-3">
                    {selectedItem.schedule.map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <span className="font-medium">{session.day}</span>
                          <span className="text-gray-500 ml-2">{session.time}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500">{session.room}</span>
                          <Badge variant="outline" className="ml-2">{session.type}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="resources" className="space-y-4">
                  <div className="space-y-3">
                    {selectedItem.resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <span className="font-medium">{resource.title}</span>
                          <span className="text-gray-500 ml-2">({resource.type})</span>
                          {resource.required && (
                            <Badge className="ml-2 bg-red-100 text-red-800">Required</Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          Week {resource.week}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="assignments" className="space-y-4">
                  <div className="space-y-3">
                    {selectedItem.assignments.map((assignment, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{assignment.title}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{assignment.type}</Badge>
                            <span className="text-sm text-gray-500">{assignment.points} pts</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{assignment.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Due: {assignment.dueDate.toLocaleDateString()}</span>
                          <span className="text-gray-500">Weight: {assignment.weight}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : selectedItem ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg">{selectedItem?.name || 'N/A'}</h3>
                  <p className="text-gray-600">{selectedItem?.degree || 'N/A'}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedItem?.description || 'N/A'}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">{selectedItem?.duration || 'N/A'} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Credits:</span>
                    <span className="font-medium">{selectedItem?.credits || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Courses:</span>
                    <span className="font-medium">{selectedItem?.courses?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge className={getStatusColor(selectedItem?.status || '')}>
                      {selectedItem?.status || 'N/A'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Requirements</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {selectedItem?.requirements?.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  )) || <li>No requirements available</li>}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No item selected</p>
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
            Are you sure you want to delete this {selectedItem && 'code' in selectedItem ? 'course' : 'program'}? 
            This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                if (selectedItem && 'code' in selectedItem) {
                  handleDeleteCourse(selectedItem.id);
                } else if (selectedItem) {
                  handleDeleteProgram(selectedItem.id);
                }
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
