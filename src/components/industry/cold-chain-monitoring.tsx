"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Thermometer, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin,
  Package,
  Truck,
  Settings,
  RefreshCw,
  Download,
  Eye,
  Bell,
  Shield,
  Activity,
  TrendingUp,
  TrendingDown,
  Filter,
  Search,
  Calendar,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';

interface ColdChainAlert {
  id: string;
  skuId: string;
  skuName: string;
  batchId: string;
  location: string;
  temperature: number;
  humidity: number;
  minTemp: number;
  maxTemp: number;
  minHumidity: number;
  maxHumidity: number;
  status: 'normal' | 'warning' | 'critical' | 'breach';
  alertType: 'temperature' | 'humidity' | 'both';
  timestamp: Date;
  duration: number; // in minutes
  severity: 'low' | 'medium' | 'high' | 'critical';
  actionRequired: boolean;
  notes?: string;
}

interface ColdChainLocation {
  id: string;
  name: string;
  type: 'warehouse' | 'truck' | 'storage' | 'retail';
  temperature: number;
  humidity: number;
  status: 'normal' | 'warning' | 'critical';
  lastUpdate: Date;
  skuCount: number;
  alerts: number;
}

export const ColdChainMonitoring: React.FC = () => {
  const [alerts, setAlerts] = useState<ColdChainAlert[]>([]);
  const [locations, setLocations] = useState<ColdChainLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'normal' | 'warning' | 'critical' | 'breach'>('all');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  useEffect(() => {
    loadColdChainData();
    // Set up real-time updates
    const interval = setInterval(loadColdChainData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadColdChainData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockAlerts: ColdChainAlert[] = [
      {
        id: 'alert-1',
        skuId: 'SKU-001',
        skuName: 'Insulin Vial',
        batchId: 'BATCH-INS-2024-001',
        location: 'Warehouse A - Cold Storage',
        temperature: 8.5,
        humidity: 45,
        minTemp: 2,
        maxTemp: 8,
        minHumidity: 30,
        maxHumidity: 60,
        status: 'warning',
        alertType: 'temperature',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        duration: 15,
        severity: 'medium',
        actionRequired: true,
        notes: 'Temperature slightly above recommended range'
      },
      {
        id: 'alert-2',
        skuId: 'SKU-002',
        skuName: 'Vaccine Vial',
        batchId: 'BATCH-VAC-2024-002',
        location: 'Truck-001 - In Transit',
        temperature: 12.3,
        humidity: 25,
        minTemp: 2,
        maxTemp: 8,
        minHumidity: 30,
        maxHumidity: 60,
        status: 'critical',
        alertType: 'both',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        duration: 5,
        severity: 'critical',
        actionRequired: true,
        notes: 'CRITICAL: Temperature and humidity breach detected'
      },
      {
        id: 'alert-3',
        skuId: 'SKU-003',
        skuName: 'Antibiotic Injection',
        batchId: 'BATCH-ANT-2024-003',
        location: 'Retail Store - Refrigerator',
        temperature: 4.2,
        humidity: 55,
        minTemp: 2,
        maxTemp: 8,
        minHumidity: 30,
        maxHumidity: 60,
        status: 'normal',
        alertType: 'temperature',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        duration: 0,
        severity: 'low',
        actionRequired: false
      }
    ];

    const mockLocations: ColdChainLocation[] = [
      {
        id: 'loc-1',
        name: 'Warehouse A - Cold Storage',
        type: 'warehouse',
        temperature: 4.1,
        humidity: 45,
        status: 'normal',
        lastUpdate: new Date(Date.now() - 1 * 60 * 1000),
        skuCount: 1250,
        alerts: 0
      },
      {
        id: 'loc-2',
        name: 'Truck-001 - In Transit',
        type: 'truck',
        temperature: 12.3,
        humidity: 25,
        status: 'critical',
        lastUpdate: new Date(Date.now() - 30 * 1000),
        skuCount: 45,
        alerts: 1
      },
      {
        id: 'loc-3',
        name: 'Retail Store - Refrigerator',
        type: 'retail',
        temperature: 4.2,
        humidity: 55,
        status: 'normal',
        lastUpdate: new Date(Date.now() - 2 * 60 * 1000),
        skuCount: 85,
        alerts: 0
      },
      {
        id: 'loc-4',
        name: 'Storage Unit B',
        type: 'storage',
        temperature: 6.8,
        humidity: 50,
        status: 'warning',
        lastUpdate: new Date(Date.now() - 5 * 60 * 1000),
        skuCount: 320,
        alerts: 0
      }
    ];
    
    setAlerts(mockAlerts);
    setLocations(mockLocations);
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-orange-600 bg-orange-100';
      case 'breach': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
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

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'warehouse': return Package;
      case 'truck': return Truck;
      case 'storage': return Shield;
      case 'retail': return Activity;
      default: return MapPin;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.skuName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || alert.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const exportColdChainData = () => {
    const csvContent = [
      'Alert ID,SKU ID,SKU Name,Batch ID,Location,Temperature,Humidity,Status,Alert Type,Severity,Duration,Action Required,Timestamp',
      ...filteredAlerts.map(alert => [
        alert.id,
        alert.skuId,
        alert.skuName,
        alert.batchId,
        alert.location,
        alert.temperature,
        alert.humidity,
        alert.status,
        alert.alertType,
        alert.severity,
        alert.duration,
        alert.actionRequired ? 'Yes' : 'No',
        alert.timestamp.toISOString()
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cold_chain_alerts.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading cold chain data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cold-Chain Monitoring</h2>
          <p className="text-gray-600">Real-time temperature and humidity monitoring for sensitive products</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadColdChainData} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={exportColdChainData} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Location Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {locations.map((location, index) => {
          const IconComponent = getLocationIcon(location.type);
          return (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`cursor-pointer transition-all hover:shadow-lg ${
                location.status === 'critical' ? 'border-red-200 bg-red-50' :
                location.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                'border-green-200 bg-green-50'
              }`}
              onClick={() => setSelectedLocation(location.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                    <Badge className={getStatusColor(location.status)}>
                      {location.status.toUpperCase()}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{location.name}</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Temperature</span>
                      <span className="font-medium">{location.temperature}°C</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Humidity</span>
                      <span className="font-medium">{location.humidity}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">SKUs</span>
                      <span className="font-medium">{location.skuCount}</span>
                    </div>
                    {location.alerts > 0 && (
                      <div className="flex justify-between text-xs text-red-600">
                        <span>Active Alerts</span>
                        <span className="font-medium">{location.alerts}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Search SKUs, batches, or locations..."
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
              <option value="normal">Normal</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
              <option value="breach">Breach</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Humidity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAlerts.map((alert, index) => (
                  <motion.tr
                    key={alert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{alert.skuName}</div>
                        <div className="text-sm text-gray-500">{alert.batchId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-900">{alert.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Thermometer className="w-4 h-4 mr-2 text-red-500" />
                        <span className={`text-sm font-medium ${
                          alert.temperature > alert.maxTemp || alert.temperature < alert.minTemp 
                            ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {alert.temperature}°C
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Activity className="w-4 h-4 mr-2 text-blue-500" />
                        <span className={`text-sm font-medium ${
                          alert.humidity > alert.maxHumidity || alert.humidity < alert.minHumidity 
                            ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {alert.humidity}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status.toUpperCase()}
                        </Badge>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {alert.duration > 0 ? `${alert.duration}m` : 'Just started'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className={alert.actionRequired ? 'text-red-600 border-red-300' : ''}
                        >
                          <Bell className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filteredAlerts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No cold chain alerts</h3>
            <p className="text-gray-500">All monitored products are within acceptable temperature and humidity ranges.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
