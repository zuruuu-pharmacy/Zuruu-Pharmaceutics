"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';
import {
  Activity,
  Users,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Award,
  GraduationCap,
  RefreshCw
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

interface AcademicAnalyticsDashboardProps {
  onRefresh?: () => void;
}

export function AcademicAnalyticsDashboard({ onRefresh }: AcademicAnalyticsDashboardProps) {
  const [timeframe, setTimeframe] = useState<'1d' | '7d' | '30d' | '90d'>('7d');
  const [isLoading, setIsLoading] = useState(false);

  // Load data from localStorage (updated by admin panel)
  const [analyticsData, setAnalyticsData] = useState({
    students: {
      '1d': { total: 1250, new: 15, active: 1200, graduated: 35 },
      '7d': { total: 1250, new: 45, active: 1200, graduated: 5 },
      '30d': { total: 1250, new: 180, active: 1200, graduated: 20 },
      '90d': { total: 1250, new: 520, active: 1200, graduated: 50 }
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
    }
  });

  // Load data from admin panel on component mount and when storage changes
  useEffect(() => {
    const loadAdminData = () => {
      const savedData = localStorage.getItem('academic-admin-data');
      if (savedData) {
        try {
          const adminData = JSON.parse(savedData);
          setAnalyticsData({
            students: {
              '1d': { total: 1250, new: adminData.students?.['1d'] || 15, active: 1200, graduated: 35 },
              '7d': { total: 1250, new: adminData.students?.['7d'] || 45, active: 1200, graduated: 5 },
              '30d': { total: 1250, new: adminData.students?.['30d'] || 180, active: 1200, graduated: 20 },
              '90d': { total: 1250, new: adminData.students?.['90d'] || 520, active: 1200, graduated: 50 }
            },
            courses: {
              total: adminData.courses?.total || 85,
              active: adminData.courses?.active || 78,
              completed: adminData.courses?.completed || 7,
              enrollment: adminData.courses?.enrollment || 1250,
              averageRating: adminData.courses?.averageRating || 4.6
            },
            performance: {
              averageGrade: adminData.performance?.averageGrade || 87.5,
              passRate: adminData.performance?.passRate || 94.2,
              completionRate: adminData.performance?.completionRate || 88.7,
              satisfaction: adminData.performance?.satisfaction || 4.6
            },
            engagement: {
              dailyActiveUsers: adminData.engagement?.dailyActiveUsers || 850,
              averageSessionTime: adminData.engagement?.averageSessionTime || 45.2,
              courseCompletions: adminData.engagement?.courseCompletions || 320,
              assignmentSubmissions: adminData.engagement?.assignmentSubmissions || 1250
            }
          });
        } catch (error) {
          console.error('Error loading academic admin data:', error);
        }
      }
    };

    loadAdminData();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'academic-admin-data') {
        loadAdminData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const generateTimeframeData = (timeframe: string) => {
    const days = timeframe === '1d' ? 1 : timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
    const labels = [];
    const enrollmentData = [];
    const completionData = [];
    const gradeData = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
      // Generate realistic data with some randomness
      const baseEnrollment = timeframe === '1d' ? 15 : timeframe === '7d' ? 45 : timeframe === '30d' ? 180 : 520;
      const baseCompletion = timeframe === '1d' ? 8 : timeframe === '7d' ? 25 : timeframe === '30d' ? 100 : 300;
      const baseGrade = 85 + Math.random() * 10;

      enrollmentData.push(baseEnrollment + Math.random() * 10 - 5);
      completionData.push(baseCompletion + Math.random() * 5 - 2);
      gradeData.push(baseGrade);
    }

    return { labels, enrollmentData, completionData, gradeData };
  };

  const generateCoursePerformance = (timeframe: string) => {
    const days = timeframe === '1d' ? 1 : timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
    const labels = [];
    const actual = [];
    const target = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
      const baseValue = timeframe === '1d' ? 85 : timeframe === '7d' ? 87 : timeframe === '30d' ? 88 : 89;
      const actualValue = baseValue + Math.random() * 5 - 2;
      const targetValue = 90;
      
      actual.push(actualValue);
      target.push(targetValue);
    }

    return { labels, actual, target };
  };

  const generateSubjectData = () => {
    return {
      labels: ['Medicine', 'Pharmacy', 'Nursing', 'Dentistry', 'Public Health', 'Biomedical', 'Research', 'Clinical'],
      datasets: [{
        data: [30, 25, 20, 12, 8, 6, 4, 3],
        backgroundColor: [
          '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
          '#06B6D4', '#F97316', '#84CC16'
        ],
        borderWidth: 0
      }]
    };
  };

  const generateTopCourses = () => {
    return [
      { name: 'Advanced Pharmacology', students: 250, rating: 4.8, completion: 92 },
      { name: 'Clinical Medicine', students: 180, rating: 4.7, completion: 88 },
      { name: 'Pharmaceutical Chemistry', students: 165, rating: 4.6, completion: 85 },
      { name: 'Medical Ethics', students: 140, rating: 4.9, completion: 95 },
      { name: 'Research Methods', students: 120, rating: 4.5, completion: 82 }
    ];
  };

  const { labels, enrollmentData, completionData, gradeData } = generateTimeframeData(timeframe);
  const { labels: perfLabels, actual, target } = generateCoursePerformance(timeframe);
  const subjectData = generateSubjectData();
  const topCourses = generateTopCourses();

  const enrollmentChartData = {
    labels,
    datasets: [
      {
        label: 'New Enrollments',
        data: enrollmentData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const completionChartData = {
    labels,
    datasets: [
      {
        label: 'Course Completions',
        data: completionData,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const gradeChartData = {
    labels,
    datasets: [
      {
        label: 'Average Grade (%)',
        data: gradeData,
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const performanceChartData = {
    labels: perfLabels,
    datasets: [
      {
        label: 'Actual Performance',
        data: actual,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: false,
        tension: 0.4
      },
      {
        label: 'Target Performance',
        data: target,
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        fill: false,
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (label.includes('Grade') || label.includes('Performance')) {
                label += context.parsed.y.toFixed(1) + '%';
              } else {
                label += context.parsed.y.toLocaleString();
              }
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            if (typeof value === 'number' && value > 50) {
              return value + '%';
            }
            return value.toLocaleString();
          }
        }
      }
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onRefresh?.();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Academic Analytics Dashboard</h2>
          <p className="text-gray-600">Comprehensive insights into your academic programs</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {(['1d', '7d', '30d', '90d'] as const).map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTimeframe(period)}
              >
                {period === '1d' ? '1 Day' : period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : '90 Days'}
              </Button>
            ))}
          </div>
          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.students[timeframe].total.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +{analyticsData.students[timeframe].new} new
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Courses</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.courses.active}
                  </p>
                  <p className="text-sm text-gray-500">
                    {analyticsData.courses.total} total courses
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Grade</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.performance.averageGrade}%
                  </p>
                  <p className="text-sm text-gray-500">
                    {analyticsData.performance.passRate}% pass rate
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {analyticsData.performance.completionRate}%
                  </p>
                  <p className="text-sm text-gray-500">
                    {analyticsData.engagement.courseCompletions} completed
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-600" />
                Student Enrollment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line data={enrollmentChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                Course Completions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Bar data={completionChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-purple-600" />
                Grade Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line data={gradeChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                Performance vs Target
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line data={performanceChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-indigo-600" />
                Students by Subject
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Doughnut 
                  data={subjectData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom' as const,
                      }
                    }
                  }} 
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Top Performing Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCourses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{course.name}</p>
                      <p className="text-sm text-gray-500">{course.students} students enrolled</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{course.rating}/5.0</p>
                      <p className="text-sm text-gray-500">{course.completion}% completion</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
