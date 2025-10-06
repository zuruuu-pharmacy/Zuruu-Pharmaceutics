"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Clock,
  Calendar,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Mail,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Report {
  id: string;
  name: string;
  type: 'inventory' | 'performance' | 'financial' | 'compliance' | 'custom';
  description: string;
  status: 'active' | 'paused' | 'error' | 'draft';
  schedule: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'custom';
    time: string;
    dayOfWeek?: string;
    dayOfMonth?: number;
  };
  lastRun?: Date;
  nextRun?: Date;
  format: 'pdf' | 'excel' | 'csv' | 'json';
  recipients: string[];
  fileSize?: number;
  createdAt: Date;
  createdBy: string;
  parameters: {
    dateRange: string;
    filters: string[];
    metrics: string[];
  };
}

interface ExportJob {
  id: string;
  reportId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startTime: Date;
  endTime?: Date;
  fileSize?: number;
  downloadUrl?: string;
  error?: string;
  progress: number;
}

export const ReportsScheduledExports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [exportJobs, setExportJobs] = useState<ExportJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    loadReportsData();
  }, []);

  const loadReportsData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockReports: Report[] = [
      {
        id: 'report-1',
        name: 'Daily Inventory Summary',
        type: 'inventory',
        description: 'Comprehensive daily inventory levels and movements',
        status: 'active',
        schedule: {
          frequency: 'daily',
          time: '06:00'
        },
        lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
        nextRun: new Date(Date.now() + 22 * 60 * 60 * 1000),
        format: 'pdf',
        recipients: ['inventory@company.com', 'manager@company.com'],
        fileSize: 2048,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        createdBy: 'John Smith',
        parameters: {
          dateRange: 'Last 24 hours',
          filters: ['Active SKUs only', 'Exclude discontinued'],
          metrics: ['Stock levels', 'Movements', 'Alerts']
        }
      },
      {
        id: 'report-2',
        name: 'Weekly Performance Dashboard',
        type: 'performance',
        description: 'Weekly KPIs and performance metrics across all operations',
        status: 'active',
        schedule: {
          frequency: 'weekly',
          time: '08:00',
          dayOfWeek: 'Monday'
        },
        lastRun: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        nextRun: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        format: 'excel',
        recipients: ['executives@company.com', 'operations@company.com'],
        fileSize: 5120,
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        createdBy: 'Sarah Johnson',
        parameters: {
          dateRange: 'Last 7 days',
          filters: ['All departments', 'Active projects only'],
          metrics: ['Efficiency', 'Throughput', 'Quality scores']
        }
      },
      {
        id: 'report-3',
        name: 'Monthly Financial Summary',
        type: 'financial',
        description: 'Monthly financial performance and cost analysis',
        status: 'paused',
        schedule: {
          frequency: 'monthly',
          time: '09:00',
          dayOfMonth: 1
        },
        lastRun: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        nextRun: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        format: 'pdf',
        recipients: ['finance@company.com', 'cfo@company.com'],
        fileSize: 8192,
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        createdBy: 'Mike Wilson',
        parameters: {
          dateRange: 'Last 30 days',
          filters: ['All cost centers', 'Include projections'],
          metrics: ['Revenue', 'Costs', 'Profit margins']
        }
      },
      {
        id: 'report-4',
        name: 'Compliance Audit Report',
        type: 'compliance',
        description: 'Regulatory compliance status and audit findings',
        status: 'error',
        schedule: {
          frequency: 'quarterly',
          time: '10:00'
        },
        lastRun: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        nextRun: new Date(Date.now() + 80 * 24 * 60 * 60 * 1000),
        format: 'pdf',
        recipients: ['compliance@company.com', 'legal@company.com'],
        fileSize: 0,
        createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
        createdBy: 'Lisa Brown',
        parameters: {
          dateRange: 'Last 90 days',
          filters: ['All regulations', 'Critical issues only'],
          metrics: ['Compliance rate', 'Violations', 'Remediation status']
        }
      }
    ];

    const mockExportJobs: ExportJob[] = [
      {
        id: 'job-1',
        reportId: 'report-1',
        status: 'completed',
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        endTime: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
        fileSize: 2048,
        downloadUrl: '/reports/daily-inventory-2024-01-15.pdf',
        progress: 100
      },
      {
        id: 'job-2',
        reportId: 'report-2',
        status: 'running',
        startTime: new Date(Date.now() - 5 * 60 * 1000),
        progress: 65
      },
      {
        id: 'job-3',
        reportId: 'report-4',
        status: 'failed',
        startTime: new Date(Date.now() - 10 * 60 * 1000),
        endTime: new Date(Date.now() - 8 * 60 * 1000),
        error: 'Data source connection timeout',
        progress: 0
      }
    ];
    
    setReports(mockReports);
    setExportJobs(mockExportJobs);
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'draft': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getJobStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-gray-600 bg-gray-100';
      case 'running': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'inventory': return BarChart3;
      case 'performance': return TrendingUp;
      case 'financial': return FileText;
      case 'compliance': return CheckCircle;
      case 'custom': return Settings;
      default: return FileText;
    }
  };

  const handleReportAction = (reportId: string, action: 'start' | 'pause' | 'resume' | 'stop') => {
    setReports(prev => prev.map(report => {
      if (report.id === reportId) {
        switch (action) {
          case 'start':
            return { ...report, status: 'active' as any };
          case 'pause':
            return { ...report, status: 'paused' as any };
          case 'resume':
            return { ...report, status: 'active' as any };
          case 'stop':
            return { ...report, status: 'draft' as any };
          default:
            return report;
        }
      }
      return report;
    }));
  };

  const runReportNow = (reportId: string) => {
    const newJob: ExportJob = {
      id: `job-${Date.now()}`,
      reportId,
      status: 'running',
      startTime: new Date(),
      progress: 0
    };
    
    setExportJobs(prev => [newJob, ...prev]);
    
    // Simulate job progress
    const interval = setInterval(() => {
      setExportJobs(prev => prev.map(job => {
        if (job.id === newJob.id && job.status === 'running') {
          const newProgress = Math.min(job.progress + 10, 100);
          if (newProgress === 100) {
            clearInterval(interval);
            return {
              ...job,
              status: 'completed' as any,
              endTime: new Date(),
              fileSize: Math.floor(Math.random() * 5000) + 1000,
              downloadUrl: `/reports/${reportId}-${Date.now()}.pdf`
            };
          }
          return { ...job, progress: newProgress };
        }
        return job;
      }));
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading reports...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Scheduled Exports</h2>
          <p className="text-gray-600">Automated report generation and scheduled data exports</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadReportsData} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Create Report
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {reports.length}
            </div>
            <div className="text-sm text-gray-500">Total Reports</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {reports.filter(r => r.status === 'active').length}
            </div>
            <div className="text-sm text-gray-500">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {exportJobs.filter(j => j.status === 'running').length}
            </div>
            <div className="text-sm text-gray-500">Running</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {exportJobs.filter(j => j.status === 'failed').length}
            </div>
            <div className="text-sm text-gray-500">Failed</div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, index) => {
          const TypeIcon = getTypeIcon(report.type);
          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <TypeIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{report.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getStatusColor(report.status)}>
                            {report.status.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            {report.format.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-blue-600">
                        {report.schedule.frequency.toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-500">Schedule</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{report.description}</p>
                  
                  {/* Schedule Info */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Next Run:</span>
                      <span className="font-medium">
                        {report.nextRun ? report.nextRun.toLocaleString() : 'Not scheduled'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Last Run:</span>
                      <span className="font-medium">
                        {report.lastRun ? report.lastRun.toLocaleString() : 'Never'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Recipients:</span>
                      <span className="font-medium">{report.recipients.length}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    {report.status === 'active' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReportAction(report.id, 'pause')}
                        className="flex-1"
                      >
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </Button>
                    )}
                    {report.status === 'paused' && (
                      <Button
                        size="sm"
                        onClick={() => handleReportAction(report.id, 'resume')}
                        className="flex-1"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Resume
                      </Button>
                    )}
                    <Button
                      size="sm"
                      onClick={() => runReportNow(report.id)}
                      className="flex-1"
                    >
                      <Zap className="w-4 h-4 mr-1" />
                      Run Now
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Export Jobs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Export Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exportJobs.map((job, index) => {
              const report = reports.find(r => r.id === job.reportId);
              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <FileText className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{report?.name || 'Unknown Report'}</h4>
                      <p className="text-sm text-gray-500">
                        Started: {job.startTime.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Badge className={getJobStatusColor(job.status)}>
                      {job.status.toUpperCase()}
                    </Badge>
                    
                    {job.status === 'running' && (
                      <div className="flex items-center space-x-2">
                        <Progress value={job.progress} className="w-20 h-2" />
                        <span className="text-sm text-gray-500">{job.progress}%</span>
                      </div>
                    )}
                    
                    {job.status === 'completed' && job.downloadUrl && (
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    )}
                    
                    {job.status === 'failed' && (
                      <div className="text-sm text-red-600">
                        {job.error}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
