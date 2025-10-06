"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, PieChart, LineChart, TrendingUp, TrendingDown, Activity,
  Target, Award, Users, Calendar, DollarSign, FileText, Microscope,
  FlaskConical, TestTube, Brain, Database, Globe, Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ResearchMetrics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalBudget: number;
  spentBudget: number;
  publications: number;
  citations: number;
  hIndex: number;
  collaborations: number;
  patents: number;
  grants: number;
  successRate: number;
}

interface ProjectTrend {
  month: string;
  projects: number;
  budget: number;
  publications: number;
}

interface CategoryDistribution {
  category: string;
  count: number;
  budget: number;
  color: string;
}

interface CollaborationNetwork {
  institution: string;
  projects: number;
  budget: number;
  publications: number;
  type: 'University' | 'Hospital' | 'Industry' | 'Government';
}

const ResearchAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState<ResearchMetrics>({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalBudget: 0,
    spentBudget: 0,
    publications: 0,
    citations: 0,
    hIndex: 0,
    collaborations: 0,
    patents: 0,
    grants: 0,
    successRate: 0
  });

  const [projectTrends, setProjectTrends] = useState<ProjectTrend[]>([]);
  const [categoryDistribution, setCategoryDistribution] = useState<CategoryDistribution[]>([]);
  const [collaborationNetwork, setCollaborationNetwork] = useState<CollaborationNetwork[]>([]);

  useEffect(() => {
    // Simulate loading analytics data
    const loadAnalyticsData = () => {
      setMetrics({
        totalProjects: 47,
        activeProjects: 23,
        completedProjects: 18,
        totalBudget: 2500000,
        spentBudget: 1800000,
        publications: 156,
        citations: 2340,
        hIndex: 28,
        collaborations: 12,
        patents: 8,
        grants: 15,
        successRate: 78.5
      });

      setProjectTrends([
        { month: 'Jan', projects: 3, budget: 150000, publications: 4 },
        { month: 'Feb', projects: 5, budget: 200000, publications: 6 },
        { month: 'Mar', projects: 4, budget: 180000, publications: 5 },
        { month: 'Apr', projects: 6, budget: 220000, publications: 8 },
        { month: 'May', projects: 7, budget: 250000, publications: 7 },
        { month: 'Jun', projects: 5, budget: 200000, publications: 9 },
        { month: 'Jul', projects: 8, budget: 300000, publications: 12 },
        { month: 'Aug', projects: 6, budget: 240000, publications: 10 },
        { month: 'Sep', projects: 9, budget: 320000, publications: 14 },
        { month: 'Oct', projects: 7, budget: 280000, publications: 11 },
        { month: 'Nov', projects: 8, budget: 300000, publications: 13 },
        { month: 'Dec', projects: 6, budget: 260000, publications: 8 }
      ]);

      setCategoryDistribution([
        { category: 'Clinical', count: 18, budget: 800000, color: '#3B82F6' },
        { category: 'Basic Science', count: 12, budget: 600000, color: '#10B981' },
        { category: 'Translational', count: 8, budget: 500000, color: '#F59E0B' },
        { category: 'Epidemiological', count: 6, budget: 400000, color: '#EF4444' },
        { category: 'Pharmacological', count: 3, budget: 200000, color: '#8B5CF6' }
      ]);

      setCollaborationNetwork([
        { institution: 'Harvard Medical School', projects: 8, budget: 400000, publications: 25, type: 'University' },
        { institution: 'Mayo Clinic', projects: 6, budget: 300000, publications: 18, type: 'Hospital' },
        { institution: 'Pfizer Inc.', projects: 4, budget: 200000, publications: 12, type: 'Industry' },
        { institution: 'NIH', projects: 12, budget: 600000, publications: 35, type: 'Government' },
        { institution: 'Johns Hopkins', projects: 5, budget: 250000, publications: 15, type: 'University' },
        { institution: 'Merck & Co.', projects: 3, budget: 150000, publications: 8, type: 'Industry' }
      ]);
    };

    loadAnalyticsData();
  }, []);

  const projectTrendData = {
    labels: projectTrends.map(trend => trend.month),
    datasets: [
      {
        label: 'Projects',
        data: projectTrends.map(trend => trend.projects),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Budget (K)',
        data: projectTrends.map(trend => trend.budget / 1000),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
        yAxisID: 'y1',
      },
      {
        label: 'Publications',
        data: projectTrends.map(trend => trend.publications),
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.3,
      }
    ]
  };

  const projectTrendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Research Activity Trends',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const categoryData = {
    labels: categoryDistribution.map(cat => cat.category),
    datasets: [
      {
        data: categoryDistribution.map(cat => cat.count),
        backgroundColor: categoryDistribution.map(cat => cat.color),
        borderWidth: 2,
        borderColor: '#ffffff',
      }
    ]
  };

  const categoryOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Projects by Category',
      },
    },
  };

  const budgetData = {
    labels: categoryDistribution.map(cat => cat.category),
    datasets: [
      {
        label: 'Budget Allocation',
        data: categoryDistribution.map(cat => cat.budget),
        backgroundColor: categoryDistribution.map(cat => cat.color),
        borderWidth: 2,
        borderColor: '#ffffff',
      }
    ]
  };

  const budgetOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Budget Distribution by Category',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((metrics.activeProjects / metrics.totalProjects) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.publications}</div>
            <p className="text-xs text-muted-foreground">
              H-index: {metrics.hIndex}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.successRate}%</div>
            <p className="text-xs text-muted-foreground">
              Project completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              ${metrics.totalBudget.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 mt-2">Allocated funding</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              ${metrics.spentBudget.toLocaleString()}
            </div>
            <div className="mt-2">
              <Progress value={(metrics.spentBudget / metrics.totalBudget) * 100} className="h-2" />
              <p className="text-sm text-gray-600 mt-1">
                {Math.round((metrics.spentBudget / metrics.totalBudget) * 100)}% utilized
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              ${(metrics.totalBudget - metrics.spentBudget).toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 mt-2">Available budget</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Research Activity Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <Line data={projectTrendData} options={projectTrendOptions} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Projects by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Doughnut data={categoryData} options={categoryOptions} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Bar data={budgetData} options={budgetOptions} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="collaborations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Collaboration Network</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {collaborationNetwork.map((collab, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        collab.type === 'University' ? 'bg-blue-500' :
                        collab.type === 'Hospital' ? 'bg-green-500' :
                        collab.type === 'Industry' ? 'bg-purple-500' : 'bg-orange-500'
                      }`}></div>
                      <div>
                        <h4 className="font-medium">{collab.institution}</h4>
                        <p className="text-sm text-gray-600">{collab.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{collab.projects}</div>
                        <div className="text-gray-600">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">${(collab.budget / 1000).toFixed(0)}K</div>
                        <div className="text-gray-600">Budget</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{collab.publications}</div>
                        <div className="text-gray-600">Publications</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Research Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citations</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.citations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Total citations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">H-Index</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.hIndex}</div>
            <p className="text-xs text-muted-foreground">
              Research impact
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patents</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.patents}</div>
            <p className="text-xs text-muted-foreground">
              Intellectual property
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grants</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.grants}</div>
            <p className="text-xs text-muted-foreground">
              Funding secured
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResearchAnalytics;
