"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Clock,
  FileText,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';

interface QualityCheck {
  id: string;
  batchId: string;
  skuId: string;
  skuName: string;
  testType: 'visual' | 'chemical' | 'microbiological' | 'physical';
  status: 'pending' | 'in_progress' | 'passed' | 'failed' | 'retest';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  dueDate: Date;
  completedDate?: Date;
  result?: string;
  notes?: string;
  standards: string[];
}

export const QualityControlDashboard: React.FC = () => {
  const [qualityChecks, setQualityChecks] = useState<QualityCheck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in_progress' | 'passed' | 'failed' | 'retest'>('all');

  useEffect(() => {
    loadQualityChecks();
  }, []);

  const loadQualityChecks = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockChecks: QualityCheck[] = [
      {
        id: 'qc-1',
        batchId: 'BATCH-2024-001',
        skuId: 'SKU-001',
        skuName: 'Paracetamol 500mg',
        testType: 'chemical',
        status: 'passed',
        priority: 'high',
        assignedTo: 'Dr. Sarah Johnson',
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        completedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        result: 'All parameters within acceptable limits',
        standards: ['USP', 'BP', 'EP']
      },
      {
        id: 'qc-2',
        batchId: 'BATCH-2024-002',
        skuId: 'SKU-002',
        skuName: 'Insulin Vial',
        testType: 'microbiological',
        status: 'failed',
        priority: 'critical',
        assignedTo: 'Dr. Mike Wilson',
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        completedDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
        result: 'Contamination detected - batch rejected',
        notes: 'High bacterial count detected in sterility test',
        standards: ['USP', 'FDA']
      },
      {
        id: 'qc-3',
        batchId: 'BATCH-2024-003',
        skuId: 'SKU-003',
        skuName: 'Vitamin D3',
        testType: 'visual',
        status: 'in_progress',
        priority: 'medium',
        assignedTo: 'Lisa Brown',
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        standards: ['USP', 'BP']
      },
      {
        id: 'qc-4',
        batchId: 'BATCH-2024-004',
        skuId: 'SKU-004',
        skuName: 'Antibiotic Capsule',
        testType: 'physical',
        status: 'pending',
        priority: 'high',
        assignedTo: 'John Smith',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        standards: ['USP', 'BP', 'EP']
      },
      {
        id: 'qc-5',
        batchId: 'BATCH-2024-005',
        skuId: 'SKU-005',
        skuName: 'Pain Relief Tablet',
        testType: 'chemical',
        status: 'retest',
        priority: 'medium',
        assignedTo: 'Dr. Sarah Johnson',
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        result: 'Initial test inconclusive - retest required',
        standards: ['USP', 'BP']
      }
    ];
    
    setQualityChecks(mockChecks);
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-gray-600 bg-gray-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'passed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'retest': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTestTypeIcon = (type: string) => {
    switch (type) {
      case 'visual': return Eye;
      case 'chemical': return Activity;
      case 'microbiological': return Shield;
      case 'physical': return FileText;
      default: return Shield;
    }
  };

  const handleStatusUpdate = (checkId: string, newStatus: string) => {
    setQualityChecks(prev => prev.map(check => 
      check.id === checkId 
        ? { 
            ...check, 
            status: newStatus as any,
            completedDate: newStatus === 'passed' || newStatus === 'failed' ? new Date() : check.completedDate
          }
        : check
    ));
  };

  const filteredChecks = qualityChecks.filter(check => {
    const matchesSearch = check.skuName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         check.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         check.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || check.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const exportQualityData = () => {
    const csvContent = [
      'Check ID,Batch ID,SKU ID,SKU Name,Test Type,Status,Priority,Assigned To,Due Date,Completed Date,Result,Standards',
      ...filteredChecks.map(check => [
        check.id,
        check.batchId,
        check.skuId,
        check.skuName,
        check.testType,
        check.status,
        check.priority,
        check.assignedTo,
        check.dueDate.toISOString().split('T')[0],
        check.completedDate ? check.completedDate.toISOString().split('T')[0] : '',
        check.result || '',
        check.standards.join(';')
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quality_control_checks.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading quality checks...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quality Control Dashboard</h2>
          <p className="text-gray-600">Comprehensive quality assurance and testing management</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadQualityChecks} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={exportQualityData} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {qualityChecks.filter(c => c.status === 'in_progress').length}
            </div>
            <div className="text-sm text-gray-500">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {qualityChecks.filter(c => c.status === 'passed').length}
            </div>
            <div className="text-sm text-gray-500">Passed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {qualityChecks.filter(c => c.status === 'failed').length}
            </div>
            <div className="text-sm text-gray-500">Failed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {qualityChecks.filter(c => c.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-500">Pending</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Search SKUs, batches, or assigned personnel..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
              <option value="retest">Retest</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Quality Checks Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch/SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredChecks.map((check, index) => {
                  const IconComponent = getTestTypeIcon(check.testType);
                  return (
                    <motion.tr
                      key={check.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{check.batchId}</div>
                          <div className="text-sm text-gray-500">{check.skuName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <IconComponent className="w-4 h-4 mr-2 text-blue-600" />
                          <span className="text-sm text-gray-900 capitalize">{check.testType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(check.status)}>
                          {check.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getPriorityColor(check.priority)}>
                          {check.priority.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{check.assignedTo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {check.dueDate.toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {check.status === 'pending' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusUpdate(check.id, 'in_progress')}
                            >
                              Start
                            </Button>
                          )}
                          {check.status === 'in_progress' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(check.id, 'passed')}
                                className="text-green-600"
                              >
                                Pass
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(check.id, 'failed')}
                                className="text-red-600"
                              >
                                Fail
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filteredChecks.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No quality checks found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
