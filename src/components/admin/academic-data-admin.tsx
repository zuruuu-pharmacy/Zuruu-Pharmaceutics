"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Settings,
  CheckCircle,
  Eye,
  Save,
  RefreshCw,
  GraduationCap
} from 'lucide-react';

interface AdminData {
  students: {
    '1d': number;
    '7d': number;
    '30d': number;
    '90d': number;
  };
  courses: {
    total: number;
    active: number;
    completed: number;
    enrollment: number;
    averageRating: number;
  };
  performance: {
    averageGrade: number;
    passRate: number;
    completionRate: number;
    satisfaction: number;
  };
  engagement: {
    dailyActiveUsers: number;
    averageSessionTime: number;
    courseCompletions: number;
    assignmentSubmissions: number;
  };
  subjects: {
    medicine: number;
    pharmacy: number;
    nursing: number;
    dentistry: number;
    publicHealth: number;
    biomedical: number;
    research: number;
    clinical: number;
  };
}

export function AcademicDataAdmin() {
  const [showAccessModal, setShowAccessModal] = useState(true);
  const [accessCode, setAccessCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState<AdminData>({
    students: {
      '1d': 15,
      '7d': 45,
      '30d': 180,
      '90d': 520
    },
    courses: {
      total: 85,
      active: 78,
      completed: 7,
      enrollment: 1250,
      averageRating: 4.6
    },
    performance: {
      averageGrade: 87.5,
      passRate: 94.2,
      completionRate: 88.7,
      satisfaction: 4.6
    },
    engagement: {
      dailyActiveUsers: 850,
      averageSessionTime: 45.2,
      courseCompletions: 320,
      assignmentSubmissions: 1250
    },
    subjects: {
      medicine: 30,
      pharmacy: 25,
      nursing: 20,
      dentistry: 12,
      publicHealth: 8,
      biomedical: 6,
      research: 4,
      clinical: 3
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load data from localStorage on mount
    const savedData = localStorage.getItem('academic-admin-data');
    if (savedData) {
      try {
        setAdminData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading academic admin data:', error);
      }
    }
  }, []);

  const handleDataChange = (field: string, value: any) => {
    setAdminData(prev => {
      const newData = { ...prev };
      const keys = field.split('.');
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      // Handle NaN values by providing fallbacks
      let processedValue = value;
      if (typeof value === 'number' && isNaN(value)) {
        processedValue = 0;
      } else if (typeof value === 'string' && value === '') {
        processedValue = 0;
      }
      
      current[keys[keys.length - 1]] = processedValue;
      return newData;
    });
  };

  // Safe getter for adminData properties with fallbacks
  const getAdminData = (path: string, defaultValue: any = 0) => {
    if (!adminData) return defaultValue;
    
    const keys = path.split('.');
    let current: any = adminData;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return defaultValue;
      }
    }
    
    return current !== undefined ? current : defaultValue;
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem('academic-admin-data', JSON.stringify(adminData));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('Academic data saved successfully!');
    } catch (error) {
      console.error('Error saving academic data:', error);
      alert('Error saving data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAccessCode = () => {
    if (accessCode === '239773') {
      setIsAuthenticated(true);
      setShowAccessModal(false);
    } else {
      alert('Invalid access code. Please try again.');
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data to default values?')) {
      setAdminData({
        students: {
          '1d': 15,
          '7d': 45,
          '30d': 180,
          '90d': 520
        },
        courses: {
          total: 85,
          active: 78,
          completed: 7,
          enrollment: 1250,
          averageRating: 4.6
        },
        performance: {
          averageGrade: 87.5,
          passRate: 94.2,
          completionRate: 88.7,
          satisfaction: 4.6
        },
        engagement: {
          dailyActiveUsers: 850,
          averageSessionTime: 45.2,
          courseCompletions: 320,
          assignmentSubmissions: 1250
        },
        subjects: {
          medicine: 30,
          pharmacy: 25,
          nursing: 20,
          dentistry: 12,
          publicHealth: 8,
          biomedical: 6,
          research: 4,
          clinical: 3
        }
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Academic Admin Access</h1>
            <p className="text-gray-600 mb-6">Enter access code to continue</p>
            <div className="space-y-4">
              <input
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter access code"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleAccessCode()}
              />
              <button
                onClick={handleAccessCode}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              >
                Access Admin Panel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academic Data Administration</h1>
          <p className="text-gray-600">Manage and edit academic dashboard data</p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={handleReset}
            variant="outline"
            disabled={isSaving}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Student Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Student Enrollment Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="students1d">1 Day New Enrollments</Label>
                <Input
                  id="students1d"
                  type="number"
                  value={getAdminData('students.1d', 15)}
                  onChange={(e) => handleDataChange('students.1d', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="students7d">7 Days New Enrollments</Label>
                <Input
                  id="students7d"
                  type="number"
                  value={getAdminData('students.7d', 45)}
                  onChange={(e) => handleDataChange('students.7d', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="students30d">30 Days New Enrollments</Label>
                <Input
                  id="students30d"
                  type="number"
                  value={getAdminData('students.30d', 180)}
                  onChange={(e) => handleDataChange('students.30d', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="students90d">90 Days New Enrollments</Label>
                <Input
                  id="students90d"
                  type="number"
                  value={getAdminData('students.90d', 520)}
                  onChange={(e) => handleDataChange('students.90d', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Course Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-green-600" />
              Course Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="totalCourses">Total Courses</Label>
                <Input
                  id="totalCourses"
                  type="number"
                  value={getAdminData('courses.total', 85)}
                  onChange={(e) => handleDataChange('courses.total', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="activeCourses">Active Courses</Label>
                <Input
                  id="activeCourses"
                  type="number"
                  value={getAdminData('courses.active', 78)}
                  onChange={(e) => handleDataChange('courses.active', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="completedCourses">Completed Courses</Label>
                <Input
                  id="completedCourses"
                  type="number"
                  value={getAdminData('courses.completed', 7)}
                  onChange={(e) => handleDataChange('courses.completed', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="enrollment">Total Enrollment</Label>
                <Input
                  id="enrollment"
                  type="number"
                  value={getAdminData('courses.enrollment', 1250)}
                  onChange={(e) => handleDataChange('courses.enrollment', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="averageRating">Average Rating</Label>
                <Input
                  id="averageRating"
                  type="number"
                  step="0.1"
                  value={getAdminData('courses.averageRating', 4.6)}
                  onChange={(e) => handleDataChange('courses.averageRating', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-purple-600" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="averageGrade">Average Grade (%)</Label>
                <Input
                  id="averageGrade"
                  type="number"
                  step="0.1"
                  value={getAdminData('performance.averageGrade', 87.5)}
                  onChange={(e) => handleDataChange('performance.averageGrade', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="passRate">Pass Rate (%)</Label>
                <Input
                  id="passRate"
                  type="number"
                  step="0.1"
                  value={getAdminData('performance.passRate', 94.2)}
                  onChange={(e) => handleDataChange('performance.passRate', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="completionRate">Completion Rate (%)</Label>
                <Input
                  id="completionRate"
                  type="number"
                  step="0.1"
                  value={getAdminData('performance.completionRate', 88.7)}
                  onChange={(e) => handleDataChange('performance.completionRate', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="satisfaction">Satisfaction Rating</Label>
                <Input
                  id="satisfaction"
                  type="number"
                  step="0.1"
                  value={getAdminData('performance.satisfaction', 4.6)}
                  onChange={(e) => handleDataChange('performance.satisfaction', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Engagement Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
              Engagement Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="dailyActiveUsers">Daily Active Users</Label>
                <Input
                  id="dailyActiveUsers"
                  type="number"
                  value={getAdminData('engagement.dailyActiveUsers', 850)}
                  onChange={(e) => handleDataChange('engagement.dailyActiveUsers', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="averageSessionTime">Avg Session Time (min)</Label>
                <Input
                  id="averageSessionTime"
                  type="number"
                  step="0.1"
                  value={getAdminData('engagement.averageSessionTime', 45.2)}
                  onChange={(e) => handleDataChange('engagement.averageSessionTime', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="courseCompletions">Course Completions</Label>
                <Input
                  id="courseCompletions"
                  type="number"
                  value={getAdminData('engagement.courseCompletions', 320)}
                  onChange={(e) => handleDataChange('engagement.courseCompletions', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="assignmentSubmissions">Assignment Submissions</Label>
                <Input
                  id="assignmentSubmissions"
                  type="number"
                  value={getAdminData('engagement.assignmentSubmissions', 1250)}
                  onChange={(e) => handleDataChange('engagement.assignmentSubmissions', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Subject Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-indigo-600" />
              Subject Distribution (%)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="medicine">Medicine</Label>
                <Input
                  id="medicine"
                  type="number"
                  step="0.1"
                  value={getAdminData('subjects.medicine', 30)}
                  onChange={(e) => handleDataChange('subjects.medicine', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="pharmacy">Pharmacy</Label>
                <Input
                  id="pharmacy"
                  type="number"
                  step="0.1"
                  value={getAdminData('subjects.pharmacy', 25)}
                  onChange={(e) => handleDataChange('subjects.pharmacy', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="nursing">Nursing</Label>
                <Input
                  id="nursing"
                  type="number"
                  step="0.1"
                  value={getAdminData('subjects.nursing', 20)}
                  onChange={(e) => handleDataChange('subjects.nursing', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="dentistry">Dentistry</Label>
                <Input
                  id="dentistry"
                  type="number"
                  step="0.1"
                  value={getAdminData('subjects.dentistry', 12)}
                  onChange={(e) => handleDataChange('subjects.dentistry', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="publicHealth">Public Health</Label>
                <Input
                  id="publicHealth"
                  type="number"
                  step="0.1"
                  value={getAdminData('subjects.publicHealth', 8)}
                  onChange={(e) => handleDataChange('subjects.publicHealth', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="biomedical">Biomedical</Label>
                <Input
                  id="biomedical"
                  type="number"
                  step="0.1"
                  value={getAdminData('subjects.biomedical', 6)}
                  onChange={(e) => handleDataChange('subjects.biomedical', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="research">Research</Label>
                <Input
                  id="research"
                  type="number"
                  step="0.1"
                  value={getAdminData('subjects.research', 4)}
                  onChange={(e) => handleDataChange('subjects.research', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="clinical">Clinical</Label>
                <Input
                  id="clinical"
                  type="number"
                  step="0.1"
                  value={getAdminData('subjects.clinical', 3)}
                  onChange={(e) => handleDataChange('subjects.clinical', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Data Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2 text-blue-600" />
              Data Preview
            </CardTitle>
            <p className="text-sm text-gray-600">
              This is how your data will appear in the academic dashboard
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800">Student Overview</h4>
                <p className="text-2xl font-bold text-blue-600">{getAdminData('courses.enrollment', 1250)}</p>
                <p className="text-sm text-blue-600">Total Students</p>
                <div className="mt-2 text-xs text-gray-600">
                  7D: {getAdminData('students.7d', 45)} new | 30D: {getAdminData('students.30d', 180)} new
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800">Course Status</h4>
                <p className="text-2xl font-bold text-green-600">{getAdminData('courses.active', 78)}</p>
                <p className="text-sm text-green-600">Active Courses</p>
                <div className="mt-2 text-xs text-gray-600">
                  Total: {getAdminData('courses.total', 85)} | Completed: {getAdminData('courses.completed', 7)}
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800">Performance</h4>
                <p className="text-2xl font-bold text-purple-600">{getAdminData('performance.averageGrade', 87.5)}%</p>
                <p className="text-sm text-purple-600">Average Grade</p>
                <div className="mt-2 text-xs text-gray-600">
                  Pass Rate: {getAdminData('performance.passRate', 94.2)}% | Completion: {getAdminData('performance.completionRate', 88.7)}%
                </div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800">Engagement</h4>
                <p className="text-2xl font-bold text-orange-600">{getAdminData('engagement.dailyActiveUsers', 850)}</p>
                <p className="text-sm text-orange-600">Daily Active Users</p>
                <div className="mt-2 text-xs text-gray-600">
                  Session: {getAdminData('engagement.averageSessionTime', 45.2)}min | Completions: {getAdminData('engagement.courseCompletions', 320)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
