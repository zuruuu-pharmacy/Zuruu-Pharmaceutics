"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Bell, 
  CheckCircle, 
  X, 
  Clock, 
  Users,
  Mail,
  Phone,
  MessageSquare,
  Download,
  RefreshCw,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Send,
  Archive,
  Flag,
  Shield,
  AlertCircle,
  FileText,
  Calendar,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { industryDataService } from '@/services/industry-data-service';

interface RecallAlert {
  id: string;
  title: string;
  description: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'ACTIVE' | 'INVESTIGATING' | 'RESOLVED' | 'ARCHIVED';
  affectedBatches: string[];
  affectedSKUs: string[];
  affectedCustomers: number;
  createdDate: Date;
  dueDate: Date;
  assignedTo: string;
  priority: number;
  source: 'AUTOMATED' | 'MANUAL' | 'REGULATORY';
  category: 'QUALITY' | 'SAFETY' | 'COMPLIANCE' | 'SUPPLY_CHAIN';
  actions: RecallAction[];
  notifications: Notification[];
}

interface RecallAction {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  assignedTo: string;
  dueDate: Date;
  completedDate?: Date;
  priority: number;
}

interface Notification {
  id: string;
  type: 'EMAIL' | 'SMS' | 'PHONE' | 'IN_APP';
  recipient: string;
  status: 'SENT' | 'DELIVERED' | 'READ' | 'FAILED';
  sentDate: Date;
  content: string;
}

export function RecallManagerNotification() {
  const [recallAlerts, setRecallAlerts] = useState<RecallAlert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadRecallAlerts();
  }, []);

  const loadRecallAlerts = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const alerts: RecallAlert[] = [
      {
        id: 'recall-001',
        title: 'Contamination Alert - Batch BATCH-AA-2025-01A',
        description: 'Potential contamination detected in manufacturing process. Immediate action required.',
        severity: 'CRITICAL',
        status: 'ACTIVE',
        affectedBatches: ['BATCH-AA-2025-01A', 'BATCH-AA-2025-01B'],
        affectedSKUs: ['SKU-00001', 'SKU-00002'],
        affectedCustomers: 150,
        createdDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        assignedTo: 'John Smith',
        priority: 1,
        source: 'AUTOMATED',
        category: 'SAFETY',
        actions: [
          {
            id: 'action-001',
            title: 'Notify Affected Customers',
            description: 'Send immediate notification to all customers who received affected batches',
            status: 'IN_PROGRESS',
            assignedTo: 'Sarah Johnson',
            dueDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
            priority: 1
          },
          {
            id: 'action-002',
            title: 'Quarantine Affected Inventory',
            description: 'Isolate all affected inventory in warehouse',
            status: 'COMPLETED',
            assignedTo: 'Mike Wilson',
            dueDate: new Date(Date.now() - 1 * 60 * 60 * 1000),
            completedDate: new Date(Date.now() - 30 * 60 * 1000),
            priority: 1
          }
        ],
        notifications: [
          {
            id: 'notif-001',
            type: 'EMAIL',
            recipient: 'customers@pharmacy.com',
            status: 'SENT',
            sentDate: new Date(Date.now() - 1 * 60 * 60 * 1000),
            content: 'URGENT: Product Recall Notice - Please check your inventory'
          }
        ]
      },
      {
        id: 'recall-002',
        title: 'Packaging Defect - SKU-00015',
        description: 'Packaging integrity issue identified in recent shipments.',
        severity: 'HIGH',
        status: 'INVESTIGATING',
        affectedBatches: ['BATCH-BB-2025-02C'],
        affectedSKUs: ['SKU-00015'],
        affectedCustomers: 45,
        createdDate: new Date(Date.now() - 6 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
        assignedTo: 'Lisa Chen',
        priority: 2,
        source: 'MANUAL',
        category: 'QUALITY',
        actions: [
          {
            id: 'action-003',
            title: 'Investigate Root Cause',
            description: 'Analyze packaging process to identify cause of defect',
            status: 'IN_PROGRESS',
            assignedTo: 'David Lee',
            dueDate: new Date(Date.now() + 12 * 60 * 60 * 1000),
            priority: 2
          }
        ],
        notifications: []
      }
    ];
    
    setRecallAlerts(alerts);
    setIsLoading(false);
  };

  const filteredAlerts = recallAlerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-600 bg-red-100';
      case 'HIGH': return 'text-orange-600 bg-orange-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      case 'LOW': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-red-600 bg-red-100';
      case 'INVESTIGATING': return 'text-yellow-600 bg-yellow-100';
      case 'RESOLVED': return 'text-green-600 bg-green-100';
      case 'ARCHIVED': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActionStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'text-green-600 bg-green-100';
      case 'IN_PROGRESS': return 'text-blue-600 bg-blue-100';
      case 'PENDING': return 'text-yellow-600 bg-yellow-100';
      case 'CANCELLED': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getNotificationStatusColor = (status: string) => {
    switch (status) {
      case 'SENT': return 'text-blue-600 bg-blue-100';
      case 'DELIVERED': return 'text-green-600 bg-green-100';
      case 'READ': return 'text-green-600 bg-green-100';
      case 'FAILED': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const exportRecallData = () => {
    const csvContent = [
      'ID,Title,Severity,Status,Affected Batches,Affected SKUs,Affected Customers,Created Date,Due Date,Assigned To',
      ...filteredAlerts.map(alert => 
        `${alert.id},"${alert.title}",${alert.severity},${alert.status},"${alert.affectedBatches.join(';')}","${alert.affectedSKUs.join(';')}",${alert.affectedCustomers},${alert.createdDate.toISOString()},${alert.dueDate.toISOString()},${alert.assignedTo}`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recall_alerts.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const sendNotification = (alertId: string, type: string) => {
    // Simulate sending notification
    console.log(`Sending ${type} notification for alert ${alertId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Recall Manager & Notifications</h2>
          <p className="text-gray-600">Comprehensive recall management with automated notifications</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadRecallAlerts} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={exportRecallData} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowCreateForm(true)} size="sm">
            <AlertTriangle className="w-4 h-4 mr-2" />
            New Alert
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Alerts</p>
                  <p className="text-2xl font-bold text-red-600">
                    {recallAlerts.filter(alert => alert.status === 'ACTIVE').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
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
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Under Investigation</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {recallAlerts.filter(alert => alert.status === 'INVESTIGATING').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
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
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {recallAlerts.filter(alert => alert.status === 'RESOLVED').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
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
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Affected Customers</p>
                  <p className="text-2xl font-bold">
                    {recallAlerts.reduce((sum, alert) => sum + alert.affectedCustomers, 0)}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search recall alerts..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Severity</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INVESTIGATING">Investigating</option>
              <option value="RESOLVED">Resolved</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Recall Alerts List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-200 ${
                  selectedAlert === alert.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{alert.title}</h3>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{alert.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Affected Batches:</span>
                          <span className="ml-1 font-medium">{alert.affectedBatches.length}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Affected SKUs:</span>
                          <span className="ml-1 font-medium">{alert.affectedSKUs.length}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Customers:</span>
                          <span className="ml-1 font-medium">{alert.affectedCustomers}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Assigned To:</span>
                          <span className="ml-1 font-medium">{alert.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {selectedAlert === alert.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <Tabs defaultValue="actions" className="space-y-4">
                        <TabsList>
                          <TabsTrigger value="actions">Actions</TabsTrigger>
                          <TabsTrigger value="notifications">Notifications</TabsTrigger>
                          <TabsTrigger value="details">Details</TabsTrigger>
                        </TabsList>

                        <TabsContent value="actions">
                          <div className="space-y-3">
                            {alert.actions.map((action, actionIndex) => (
                              <motion.div
                                key={action.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: actionIndex * 0.1 }}
                                className="p-3 bg-gray-50 rounded-lg"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium">{action.title}</h4>
                                  <Badge className={getActionStatusColor(action.status)}>
                                    {action.status.replace('_', ' ')}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-500">Assigned to: {action.assignedTo}</span>
                                  <span className="text-gray-500">
                                    Due: {action.dueDate.toLocaleString()}
                                  </span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="notifications">
                          <div className="space-y-3">
                            {alert.notifications.map((notification, notifIndex) => (
                              <motion.div
                                key={notification.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: notifIndex * 0.1 }}
                                className="p-3 bg-gray-50 rounded-lg"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    {notification.type === 'EMAIL' && <Mail className="w-4 h-4" />}
                                    {notification.type === 'SMS' && <MessageSquare className="w-4 h-4" />}
                                    {notification.type === 'PHONE' && <Phone className="w-4 h-4" />}
                                    <span className="font-medium">{notification.type}</span>
                                  </div>
                                  <Badge className={getNotificationStatusColor(notification.status)}>
                                    {notification.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">{notification.content}</p>
                                <p className="text-xs text-gray-500">
                                  To: {notification.recipient} | Sent: {notification.sentDate.toLocaleString()}
                                </p>
                              </motion.div>
                            ))}
                            <div className="flex space-x-2">
                              <Button size="sm" onClick={() => sendNotification(alert.id, 'EMAIL')}>
                                <Mail className="w-4 h-4 mr-1" />
                                Send Email
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => sendNotification(alert.id, 'SMS')}>
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Send SMS
                              </Button>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="details">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Alert Information</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Created:</span>
                                  <span>{alert.createdDate.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Due Date:</span>
                                  <span>{alert.dueDate.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Source:</span>
                                  <span>{alert.source}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Category:</span>
                                  <span>{alert.category.replace('_', ' ')}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Affected Items</h4>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="text-gray-500">Batches:</span>
                                  <div className="mt-1">
                                    {alert.affectedBatches.map(batch => (
                                      <Badge key={batch} variant="outline" className="mr-1 mb-1">
                                        {batch}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-gray-500">SKUs:</span>
                                  <div className="mt-1">
                                    {alert.affectedSKUs.map(sku => (
                                      <Badge key={sku} variant="outline" className="mr-1 mb-1">
                                        {sku}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredAlerts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No recall alerts found</p>
        </motion.div>
      )}
    </div>
  );
}