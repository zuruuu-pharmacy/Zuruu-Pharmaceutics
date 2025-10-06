"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  FileText,
  Clock,
  User,
  Download,
  RefreshCw,
  Eye,
  Filter,
  Search,
  Calendar,
  Activity,
  Lock,
  Unlock,
  Edit,
  Trash2,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface AuditLog {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  resource: string;
  resourceType: 'SKU' | 'Batch' | 'Order' | 'User' | 'System';
  status: 'success' | 'failed' | 'warning';
  ipAddress: string;
  userAgent: string;
  details: string;
  compliance: {
    gdpr: boolean;
    hipaa: boolean;
    fda: boolean;
    sox: boolean;
  };
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export const ComplianceAuditTrail: React.FC = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'success' | 'failed' | 'warning'>('all');
  const [filterResourceType, setFilterResourceType] = useState<'all' | 'SKU' | 'Batch' | 'Order' | 'User' | 'System'>('all');

  useEffect(() => {
    loadAuditLogs();
  }, []);

  const loadAuditLogs = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockLogs: AuditLog[] = [
      {
        id: 'audit-1',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        user: 'john.smith@company.com',
        action: 'CREATE',
        resource: 'SKU-001',
        resourceType: 'SKU',
        status: 'success',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        details: 'Created new SKU: Paracetamol 500mg',
        compliance: { gdpr: true, hipaa: true, fda: true, sox: true },
        riskLevel: 'low'
      },
      {
        id: 'audit-2',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        user: 'sarah.johnson@company.com',
        action: 'UPDATE',
        resource: 'BATCH-2024-001',
        resourceType: 'Batch',
        status: 'success',
        ipAddress: '192.168.1.101',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        details: 'Updated batch status to IN_TRANSIT',
        compliance: { gdpr: true, hipaa: true, fda: true, sox: true },
        riskLevel: 'low'
      },
      {
        id: 'audit-3',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        user: 'mike.wilson@company.com',
        action: 'DELETE',
        resource: 'ORDER-2024-001',
        resourceType: 'Order',
        status: 'failed',
        ipAddress: '192.168.1.102',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        details: 'Failed to delete order - insufficient permissions',
        compliance: { gdpr: true, hipaa: false, fda: true, sox: true },
        riskLevel: 'medium'
      },
      {
        id: 'audit-4',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        user: 'lisa.brown@company.com',
        action: 'LOGIN',
        resource: 'User Account',
        resourceType: 'User',
        status: 'success',
        ipAddress: '192.168.1.103',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
        details: 'Successful login from mobile device',
        compliance: { gdpr: true, hipaa: true, fda: false, sox: true },
        riskLevel: 'low'
      },
      {
        id: 'audit-5',
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        user: 'system@company.com',
        action: 'BACKUP',
        resource: 'Database',
        resourceType: 'System',
        status: 'success',
        ipAddress: '127.0.0.1',
        userAgent: 'System Process',
        details: 'Automated database backup completed successfully',
        compliance: { gdpr: true, hipaa: true, fda: true, sox: true },
        riskLevel: 'low'
      },
      {
        id: 'audit-6',
        timestamp: new Date(Date.now() - 90 * 60 * 1000),
        user: 'admin@company.com',
        action: 'CONFIG_CHANGE',
        resource: 'System Configuration',
        resourceType: 'System',
        status: 'warning',
        ipAddress: '192.168.1.104',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        details: 'Modified security settings - requires approval',
        compliance: { gdpr: true, hipaa: true, fda: true, sox: false },
        riskLevel: 'high'
      }
    ];
    
    setAuditLogs(mockLogs);
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'CREATE': return Edit;
      case 'UPDATE': return Edit;
      case 'DELETE': return Trash2;
      case 'LOGIN': return Unlock;
      case 'LOGOUT': return Lock;
      case 'BACKUP': return Shield;
      case 'CONFIG_CHANGE': return Settings;
      default: return Activity;
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    const matchesResourceType = filterResourceType === 'all' || log.resourceType === filterResourceType;
    return matchesSearch && matchesStatus && matchesResourceType;
  });

  const exportAuditData = () => {
    const csvContent = [
      'Timestamp,User,Action,Resource,Resource Type,Status,IP Address,Details,GDPR,HIPAA,FDA,SOX,Risk Level',
      ...filteredLogs.map(log => [
        log.timestamp.toISOString(),
        log.user,
        log.action,
        log.resource,
        log.resourceType,
        log.status,
        log.ipAddress,
        log.details,
        log.compliance.gdpr ? 'Yes' : 'No',
        log.compliance.hipaa ? 'Yes' : 'No',
        log.compliance.fda ? 'Yes' : 'No',
        log.compliance.sox ? 'Yes' : 'No',
        log.riskLevel
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit_trail.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading audit logs...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Compliance & Audit Trail</h2>
          <p className="text-gray-600">Comprehensive audit logging and compliance monitoring</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadAuditLogs} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={exportAuditData} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {auditLogs.filter(l => l.status === 'success').length}
            </div>
            <div className="text-sm text-gray-500">Successful Actions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {auditLogs.filter(l => l.status === 'failed').length}
            </div>
            <div className="text-sm text-gray-500">Failed Actions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {auditLogs.filter(l => l.status === 'warning').length}
            </div>
            <div className="text-sm text-gray-500">Warnings</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {auditLogs.filter(l => l.riskLevel === 'high' || l.riskLevel === 'critical').length}
            </div>
            <div className="text-sm text-gray-500">High Risk Events</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Search users, actions, or resources..."
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
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="warning">Warning</option>
            </select>
            <select
              value={filterResourceType}
              onChange={(e) => setFilterResourceType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Resources</option>
              <option value="SKU">SKU</option>
              <option value="Batch">Batch</option>
              <option value="Order">Order</option>
              <option value="User">User</option>
              <option value="System">System</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log, index) => {
                  const ActionIcon = getActionIcon(log.action);
                  return (
                    <motion.tr
                      key={log.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {log.timestamp.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm text-gray-900">{log.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <ActionIcon className="w-4 h-4 mr-2 text-blue-600" />
                          <span className="text-sm font-medium text-gray-900">{log.action}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{log.resource}</div>
                          <div className="text-sm text-gray-500">{log.resourceType}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(log.status)}>
                          {log.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-1">
                          {log.compliance.gdpr && <Badge variant="outline" className="text-xs">GDPR</Badge>}
                          {log.compliance.hipaa && <Badge variant="outline" className="text-xs">HIPAA</Badge>}
                          {log.compliance.fda && <Badge variant="outline" className="text-xs">FDA</Badge>}
                          {log.compliance.sox && <Badge variant="outline" className="text-xs">SOX</Badge>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getRiskColor(log.riskLevel)}>
                          {log.riskLevel.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="w-4 h-4" />
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

      {filteredLogs.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No audit logs found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
