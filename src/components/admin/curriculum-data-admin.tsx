"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Settings, Save, RefreshCw, Download, Upload, Eye, Edit, Trash2,
  Plus, Search, Filter, BookOpen, GraduationCap, Users, Calendar,
  Clock, Award, Target, TrendingUp, BarChart3, CheckCircle, XCircle,
  AlertTriangle, Star, Zap, Bell, MessageSquare, Heart, Globe, Building
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
  createdAt: Date;
  updatedAt: Date;
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

interface AdminStats {
  totalCourses: number;
  activeCourses: number;
  totalPrograms: number;
  activePrograms: number;
  totalEnrollments: number;
  averageCredits: number;
  topDepartment: string;
  recentUpdates: number;
}

export default function CurriculumDataAdmin() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalCourses: 0,
    activeCourses: 0,
    totalPrograms: 0,
    activePrograms: 0,
    totalEnrollments: 0,
    averageCredits: 0,
    topDepartment: '',
    recentUpdates: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'courses' | 'programs'>('courses');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Course | Program | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    // Load data from localStorage or generate mock data
    const savedCourses = localStorage.getItem('curriculum-courses');
    const savedPrograms = localStorage.getItem('curriculum-programs');
    
    if (savedCourses && savedPrograms) {
      setCourses(JSON.parse(savedCourses));
      setPrograms(JSON.parse(savedPrograms));
    } else {
      // Generate mock data
      const mockCourses = Array.from({ length: 25 }, (_, i) => generateMockCourse(i));
      const mockPrograms = Array.from({ length: 8 }, (_, i) => generateMockProgram(i));
      
      setCourses(mockCourses);
      setPrograms(mockPrograms);
      
      // Save to localStorage
      localStorage.setItem('curriculum-courses', JSON.stringify(mockCourses));
      localStorage.setItem('curriculum-programs', JSON.stringify(mockPrograms));
    }
  }, []);

  useEffect(() => {
    // Calculate stats
    const totalCourses = courses.length;
    const activeCourses = courses.filter(c => c.status === 'Active').length;
    const totalPrograms = programs.length;
    const activePrograms = programs.filter(p => p.status === 'Active').length;
    const totalEnrollments = courses.reduce((sum, c) => sum + c.enrollmentCount, 0);
    const averageCredits = courses.length > 0 ? courses.reduce((sum, c) => sum + c.credits, 0) / courses.length : 0;
    
    // Find top department
    const departmentCounts = courses.reduce((acc, c) => {
      acc[c.department] = (acc[c.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const topDepartment = Object.entries(departmentCounts).reduce((a, b) => departmentCounts[a[0]] > departmentCounts[b[0]] ? a : b, ['', 0])[0];
    
    const recentUpdates = courses.filter(c => {
      const daysSinceUpdate = (Date.now() - new Date(c.updatedAt).getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceUpdate <= 7;
    }).length;

    setStats({
      totalCourses,
      activeCourses,
      totalPrograms,
      activePrograms,
      totalEnrollments,
      averageCredits: Number(averageCredits.toFixed(1)),
      topDepartment,
      recentUpdates
    });
  }, [courses, programs]);

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

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('curriculum-courses', JSON.stringify(courses));
    localStorage.setItem('curriculum-programs', JSON.stringify(programs));
    
    // Show success message
    alert('Data saved successfully!');
    setIsEditing(false);
  };

  const handleReset = () => {
    // Reset to original data
    const savedCourses = localStorage.getItem('curriculum-courses');
    const savedPrograms = localStorage.getItem('curriculum-programs');
    
    if (savedCourses && savedPrograms) {
      setCourses(JSON.parse(savedCourses));
      setPrograms(JSON.parse(savedPrograms));
    }
    
    setIsEditing(false);
    setEditingItem(null);
  };

  const handleEditItem = (item: Course | Program) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleUpdateItem = (updatedItem: Course | Program) => {
    if ('code' in updatedItem) {
      // It's a course
      setCourses(prev => prev.map(c => c.id === updatedItem.id ? updatedItem as Course : c));
    } else {
      // It's a program
      setPrograms(prev => prev.map(p => p.id === updatedItem.id ? updatedItem as Program : p));
    }
    setEditingItem(null);
  };

  const handleDeleteItem = (itemId: string, type: 'course' | 'program') => {
    if (type === 'course') {
      setCourses(prev => prev.filter(c => c.id !== itemId));
    } else {
      setPrograms(prev => prev.filter(p => p.id !== itemId));
    }
  };

  const exportData = () => {
    const data = {
      courses,
      programs,
      stats,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `curriculum-data-${new Date().toISOString().split('T')[0]}.json`;
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

  const filteredItems = filterType === 'courses' 
    ? courses.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : programs.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.degree.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Curriculum Data Admin</h1>
          <p className="text-gray-600 mt-2">Manage and edit curriculum data in real-time</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={exportData}
            variant="outline"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700"
            size="sm"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {stats.activeCourses} active
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Programs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPrograms}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {stats.activePrograms} active
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalEnrollments}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-600">
                Avg: {stats.averageCredits} credits
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Department</p>
                <p className="text-lg font-bold text-gray-900">{stats.topDepartment}</p>
              </div>
              <Building className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-blue-600">
                {stats.recentUpdates} recent updates
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={filterType} onValueChange={(value: 'courses' | 'programs') => setFilterType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="courses">Courses</SelectItem>
                  <SelectItem value="programs">Programs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Actions</Label>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setShowPreview(!showPreview)}
                  variant="outline"
                  size="sm"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? 'Hide' : 'Show'} Preview
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {filterType === 'courses' ? <BookOpen className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
            <span>{filterType === 'courses' ? 'Courses' : 'Programs'} ({filteredItems.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-lg">
                        {'code' in item ? item.title : item.name}
                      </h3>
                      {'code' in item && (
                        <span className="text-sm text-gray-500">{item.code}</span>
                      )}
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                      {'level' in item && (
                        <Badge className={getLevelColor(item.level)}>
                          {item.level}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {'code' in item ? item.description : item.degree}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      {'code' in item ? (
                        <>
                          <span>Credits: {item.credits}</span>
                          <span>Department: {item.department}</span>
                          <span>Instructor: {item.instructor}</span>
                          <span>Enrollment: {item.enrollmentCount}/{item.maxEnrollment}</span>
                        </>
                      ) : (
                        <>
                          <span>Duration: {item.duration} years</span>
                          <span>Credits: {item.credits}</span>
                          <span>Courses: {item.courses.length}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditItem(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteItem(item.id, filterType === 'courses' ? 'course' : 'program')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {editingItem && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Edit {filterType === 'courses' ? 'Course' : 'Program'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {filterType === 'courses' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Course Code</Label>
                    <Input
                      value={'code' in editingItem ? editingItem.code || '' : ''}
                      onChange={(e) => setEditingItem(prev => prev && 'code' in prev ? { ...prev, code: e.target.value } : prev)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Course Title</Label>
                    <Input
                      value={'title' in editingItem ? editingItem.title || '' : ''}
                      onChange={(e) => setEditingItem(prev => prev && 'title' in prev ? { ...prev, title: e.target.value } : prev)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Credits</Label>
                    <Input
                      type="number"
                      value={editingItem.credits || ''}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, credits: parseInt(e.target.value) } : null)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Input
                      value={'department' in editingItem ? editingItem.department || '' : ''}
                      onChange={(e) => setEditingItem(prev => prev && 'department' in prev ? { ...prev, department: e.target.value } : prev)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Instructor</Label>
                    <Input
                      value={'instructor' in editingItem ? editingItem.instructor || '' : ''}
                      onChange={(e) => setEditingItem(prev => prev && 'instructor' in prev ? { ...prev, instructor: e.target.value } : prev)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={editingItem.status || ''}
                      onValueChange={(value) => setEditingItem(prev => prev ? { ...prev, status: value as any } : null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={editingItem.description || ''}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, description: e.target.value } : null)}
                      rows={3}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Program Name</Label>
                    <Input
                      value={'name' in editingItem ? editingItem.name || '' : ''}
                      onChange={(e) => setEditingItem(prev => prev && 'name' in prev ? { ...prev, name: e.target.value } : prev)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input
                      value={'degree' in editingItem ? editingItem.degree || '' : ''}
                      onChange={(e) => setEditingItem(prev => prev && 'degree' in prev ? { ...prev, degree: e.target.value } : prev)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration (years)</Label>
                    <Input
                      type="number"
                      value={'duration' in editingItem ? editingItem.duration || '' : ''}
                      onChange={(e) => setEditingItem(prev => prev && 'duration' in prev ? { ...prev, duration: parseInt(e.target.value) } : prev)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Credits</Label>
                    <Input
                      type="number"
                      value={editingItem.credits || ''}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, credits: parseInt(e.target.value) } : null)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={editingItem.status || ''}
                      onValueChange={(value) => setEditingItem(prev => prev ? { ...prev, status: value as any } : null)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Description</Label>
                    <Textarea
                      value={editingItem.description || ''}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, description: e.target.value } : null)}
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleUpdateItem(editingItem)}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
