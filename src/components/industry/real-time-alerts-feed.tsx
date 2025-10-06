"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Package,
  Truck,
  Settings,
  RefreshCw,
  Filter,
  Search,
  Eye,
  X,
  Zap,
  Shield,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Alert {
  id: string;
  type: 'inventory' | 'quality' | 'delivery' | 'system' | 'security';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: Date;
  status: 'new' | 'acknowledged' | 'resolved' | 'dismissed';
  source: string;
  affectedSKUs?: string[];
  actionRequired: boolean;
  priority: number;
}

export const RealTimeAlertsFeed: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'inventory' | 'quality' | 'delivery' | 'system' | 'security'>('all');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');

  useEffect(() => {
    loadAlerts();
    // Set up real-time updates
    const interval = setInterval(loadAlerts, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadAlerts = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockAlerts: Alert[] = [
      {
        id: 'alert-1',
        type: 'inventory',
        severity: 'high',
        title: 'Low Stock Alert',
        description: 'SKU-001 (Paracetamol 500mg) is running low with only 50 units remaining',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        status: 'new',
        source: 'Inventory System',
        affectedSKUs: ['SKU-001'],
        actionRequired: true,
        priority: 8
      },
      {
        id: 'alert-2',
        type: 'quality',
        severity: 'critical',
        title: 'Quality Control Failure',
        description: 'Batch BATCH-2024-001 failed quality inspection due to temperature breach',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        status: 'acknowledged',
        source: 'Quality Control',
        affectedSKUs: ['SKU-002'],
        actionRequired: true,
        priority: 10
      },
      {
        id: 'alert-3',
        type: 'delivery',
        severity: 'medium',
        title: 'Delivery Delay',
        description: 'Truck-001 is experiencing delays due to weather conditions',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        status: 'new',
        source: 'Logistics System',
        actionRequired: false,
        priority: 6
      },
      {
        id: 'alert-4',
        type: 'system',
        severity: 'low',
        title: 'System Maintenance',
        description: 'Scheduled maintenance will begin at 2:00 AM',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        status: 'acknowledged',
        source: 'IT System',
        actionRequired: false,
        priority: 3
      },
      {
        id: 'alert-5',
        type: 'security',
        severity: 'high',
        title: 'Unauthorized Access Attempt',
        description: 'Multiple failed login attempts detected from IP 192.168.1.100',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        status: 'resolved',
        source: 'Security System',
        actionRequired: false,
        priority: 7
      }
    ];
    
    setAlerts(mockAlerts);
    setIsLoading(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'inventory': return Package;
      case 'quality': return Shield;
      case 'delivery': return Truck;
      case 'system': return Settings;
      case 'security': return Activity;
      default: return Bell;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-blue-600 bg-blue-100';
      case 'acknowledged': return 'text-yellow-600 bg-yellow-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'dismissed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleAlertAction = (alertId: string, action: 'acknowledge' | 'resolve' | 'dismiss') => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { 
            ...alert, 
            status: action === 'acknowledge' ? 'acknowledged' : 
                   action === 'resolve' ? 'resolved' : 'dismissed'
          }
        : alert
    ));
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    return matchesSearch && matchesType && matchesSeverity;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading alerts...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Real-Time Alerts Feed</h2>
          <p className="text-gray-600">Live monitoring of system alerts and notifications</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadAlerts} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="inventory">Inventory</option>
              <option value="quality">Quality</option>
              <option value="delivery">Delivery</option>
              <option value="system">System</option>
              <option value="security">Security</option>
            </select>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Severity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredAlerts.map((alert, index) => {
            const IconComponent = getTypeIcon(alert.type);
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`hover:shadow-lg transition-all ${
                  alert.status === 'new' ? 'border-blue-200 bg-blue-50' :
                  alert.severity === 'critical' ? 'border-red-200 bg-red-50' :
                  alert.severity === 'high' ? 'border-orange-200 bg-orange-50' :
                  'border-gray-200'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 rounded-lg ${
                          alert.type === 'inventory' ? 'bg-blue-100' :
                          alert.type === 'quality' ? 'bg-green-100' :
                          alert.type === 'delivery' ? 'bg-purple-100' :
                          alert.type === 'system' ? 'bg-gray-100' :
                          'bg-red-100'
                        }`}>
                          <IconComponent className={`w-5 h-5 ${
                            alert.type === 'inventory' ? 'text-blue-600' :
                            alert.type === 'quality' ? 'text-green-600' :
                            alert.type === 'delivery' ? 'text-purple-600' :
                            alert.type === 'system' ? 'text-gray-600' :
                            'text-red-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity.toUpperCase()}
                            </Badge>
                            <Badge className={getStatusColor(alert.status)}>
                              {alert.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {alert.timestamp.toLocaleString()}
                            </span>
                            <span className="flex items-center">
                              <Zap className="w-3 h-3 mr-1" />
                              Priority: {alert.priority}/10
                            </span>
                            <span>{alert.source}</span>
                            {alert.affectedSKUs && (
                              <span>Affected SKUs: {alert.affectedSKUs.join(', ')}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {alert.status === 'new' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAlertAction(alert.id, 'acknowledge')}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Acknowledge
                          </Button>
                        )}
                        {alert.status === 'acknowledged' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAlertAction(alert.id, 'resolve')}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Resolve
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAlertAction(alert.id, 'dismiss')}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredAlerts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No alerts found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
