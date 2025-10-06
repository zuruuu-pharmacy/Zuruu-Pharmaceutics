"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Database,
  Link,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Plus,
  Zap,
  Shield,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ERPIntegration {
  id: string;
  name: string;
  type: 'sap' | 'oracle' | 'dynamics' | 'custom';
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  lastSync: Date;
  syncFrequency: number; // in minutes
  dataPoints: number;
  successRate: number;
  apiEndpoint: string;
  version: string;
  health: 'excellent' | 'good' | 'warning' | 'critical';
  features: string[];
}

export const ERPIntegrationsHub: React.FC = () => {
  const [integrations, setIntegrations] = useState<ERPIntegration[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockIntegrations: ERPIntegration[] = [
      {
        id: 'sap-1',
        name: 'SAP ERP',
        type: 'sap',
        status: 'connected',
        lastSync: new Date(Date.now() - 5 * 60 * 1000),
        syncFrequency: 15,
        dataPoints: 1250,
        successRate: 98.5,
        apiEndpoint: 'https://api.sap.com/v1',
        version: '4.0',
        health: 'excellent',
        features: ['Inventory', 'Orders', 'Financials', 'HR']
      },
      {
        id: 'oracle-1',
        name: 'Oracle Cloud ERP',
        type: 'oracle',
        status: 'syncing',
        lastSync: new Date(Date.now() - 2 * 60 * 1000),
        syncFrequency: 30,
        dataPoints: 890,
        successRate: 95.2,
        apiEndpoint: 'https://api.oracle.com/v2',
        version: '21.1',
        health: 'good',
        features: ['Supply Chain', 'Manufacturing', 'Analytics']
      },
      {
        id: 'dynamics-1',
        name: 'Microsoft Dynamics 365',
        type: 'dynamics',
        status: 'error',
        lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
        syncFrequency: 60,
        dataPoints: 450,
        successRate: 87.3,
        apiEndpoint: 'https://api.dynamics.com/v1',
        version: '10.0',
        health: 'warning',
        features: ['Sales', 'Marketing', 'Customer Service']
      },
      {
        id: 'custom-1',
        name: 'Custom API Integration',
        type: 'custom',
        status: 'connected',
        lastSync: new Date(Date.now() - 10 * 60 * 1000),
        syncFrequency: 45,
        dataPoints: 320,
        successRate: 99.1,
        apiEndpoint: 'https://api.company.com/v3',
        version: '2.1',
        health: 'excellent',
        features: ['Custom Workflows', 'Legacy Systems']
      }
    ];
    
    setIntegrations(mockIntegrations);
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100';
      case 'syncing': return 'text-blue-600 bg-blue-100';
      case 'disconnected': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sap': return Database;
      case 'oracle': return Database;
      case 'dynamics': return Settings;
      case 'custom': return Link;
      default: return Database;
    }
  };

  const handleSync = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, status: 'syncing' as any }
        : integration
    ));
    
    // Simulate sync
    setTimeout(() => {
      setIntegrations(prev => prev.map(integration => 
        integration.id === integrationId 
          ? { 
              ...integration, 
              status: 'connected' as any,
              lastSync: new Date(),
              successRate: Math.min(100, integration.successRate + 0.1)
            }
          : integration
      ));
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading integrations...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">ERP Integrations Hub</h2>
          <p className="text-gray-600">Centralized management of all ERP system integrations</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadIntegrations} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration, index) => {
          const IconComponent = getTypeIcon(integration.type);
          return (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        integration.type === 'sap' ? 'bg-blue-100' :
                        integration.type === 'oracle' ? 'bg-red-100' :
                        integration.type === 'dynamics' ? 'bg-green-100' :
                        'bg-purple-100'
                      }`}>
                        <IconComponent className={`w-6 h-6 ${
                          integration.type === 'sap' ? 'text-blue-600' :
                          integration.type === 'oracle' ? 'text-red-600' :
                          integration.type === 'dynamics' ? 'text-green-600' :
                          'text-purple-600'
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <p className="text-sm text-gray-500">v{integration.version}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getStatusColor(integration.status)}>
                        {integration.status.toUpperCase()}
                      </Badge>
                      <Badge className={getHealthColor(integration.health)}>
                        {integration.health.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{integration.dataPoints}</div>
                      <div className="text-xs text-gray-500">Data Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{integration.successRate}%</div>
                      <div className="text-xs text-gray-500">Success Rate</div>
                    </div>
                  </div>

                  {/* Sync Status */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Last Sync</span>
                      <span className="text-sm text-gray-900">
                        {integration.lastSync.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Sync Frequency</span>
                      <span className="text-sm text-gray-900">{integration.syncFrequency}min</span>
                    </div>
                    <Progress value={integration.successRate} className="h-2" />
                  </div>

                  {/* Features */}
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Features</div>
                    <div className="flex flex-wrap gap-1">
                      {integration.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSync(integration.id)}
                      disabled={integration.status === 'syncing'}
                      className="flex-1"
                    >
                      {integration.status === 'syncing' ? (
                        <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                      ) : (
                        <Zap className="w-4 h-4 mr-1" />
                      )}
                      Sync
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {integrations.filter(i => i.status === 'connected').length}
            </div>
            <div className="text-sm text-gray-500">Connected</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {integrations.reduce((sum, i) => sum + i.dataPoints, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Total Data Points</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {(integrations.reduce((sum, i) => sum + i.successRate, 0) / integrations.length).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">Avg Success Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {integrations.filter(i => i.health === 'excellent' || i.health === 'good').length}
            </div>
            <div className="text-sm text-gray-500">Healthy Systems</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
