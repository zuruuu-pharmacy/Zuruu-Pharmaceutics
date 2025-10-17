"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Map, 
  Package, 
  Truck, 
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Download,
  Settings,
  Eye,
  Filter,
  Search,
  Zap,
  Target,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';

interface WarehouseZone {
  id: string;
  name: string;
  type: 'storage' | 'picking' | 'shipping' | 'receiving' | 'cold_storage';
  x: number;
  y: number;
  width: number;
  height: number;
  capacity: number;
  currentUtilization: number;
  temperature: number;
  humidity: number;
  activityLevel: 'low' | 'medium' | 'high' | 'critical';
  efficiency: number;
  lastUpdated: Date;
  skuCount: number;
  pickerCount: number;
  throughput: number;
  bottlenecks: string[];
}

export const WarehouseHeatmap: React.FC = () => {
  const [zones, setZones] = useState<WarehouseZone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedZone, setSelectedZone] = useState<WarehouseZone | null>(null);
  const [viewMode, setViewMode] = useState<'utilization' | 'activity' | 'efficiency' | 'temperature'>('utilization');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadWarehouseData();
  }, []);

  const loadWarehouseData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockZones: WarehouseZone[] = [
      {
        id: 'zone-1',
        name: 'A1 - Fast Moving',
        type: 'picking',
        x: 10,
        y: 10,
        width: 80,
        height: 60,
        capacity: 1000,
        currentUtilization: 85,
        temperature: 22,
        humidity: 45,
        activityLevel: 'high',
        efficiency: 92,
        lastUpdated: new Date(Date.now() - 5 * 60 * 1000),
        skuCount: 125,
        pickerCount: 8,
        throughput: 450,
        bottlenecks: []
      },
      {
        id: 'zone-2',
        name: 'A2 - Medium Moving',
        type: 'storage',
        x: 100,
        y: 10,
        width: 80,
        height: 60,
        capacity: 800,
        currentUtilization: 65,
        temperature: 21,
        humidity: 48,
        activityLevel: 'medium',
        efficiency: 78,
        lastUpdated: new Date(Date.now() - 8 * 60 * 1000),
        skuCount: 89,
        pickerCount: 4,
        throughput: 280,
        bottlenecks: ['Limited aisle space']
      },
      {
        id: 'zone-3',
        name: 'B1 - Slow Moving',
        type: 'storage',
        x: 10,
        y: 80,
        width: 80,
        height: 60,
        capacity: 600,
        currentUtilization: 45,
        temperature: 20,
        humidity: 50,
        activityLevel: 'low',
        efficiency: 65,
        lastUpdated: new Date(Date.now() - 15 * 60 * 1000),
        skuCount: 45,
        pickerCount: 2,
        throughput: 120,
        bottlenecks: ['Poor lighting', 'Narrow aisles']
      },
      {
        id: 'zone-4',
        name: 'Cold Storage',
        type: 'cold_storage',
        x: 100,
        y: 80,
        width: 80,
        height: 60,
        capacity: 300,
        currentUtilization: 90,
        temperature: 4,
        humidity: 35,
        activityLevel: 'medium',
        efficiency: 88,
        lastUpdated: new Date(Date.now() - 3 * 60 * 1000),
        skuCount: 25,
        pickerCount: 3,
        throughput: 180,
        bottlenecks: ['Temperature fluctuations']
      },
      {
        id: 'zone-5',
        name: 'Shipping Dock',
        type: 'shipping',
        x: 190,
        y: 10,
        width: 60,
        height: 80,
        capacity: 200,
        currentUtilization: 75,
        temperature: 23,
        humidity: 42,
        activityLevel: 'high',
        efficiency: 95,
        lastUpdated: new Date(Date.now() - 2 * 60 * 1000),
        skuCount: 0,
        pickerCount: 6,
        throughput: 320,
        bottlenecks: []
      },
      {
        id: 'zone-6',
        name: 'Receiving Bay',
        type: 'receiving',
        x: 190,
        y: 100,
        width: 60,
        height: 40,
        capacity: 150,
        currentUtilization: 60,
        temperature: 22,
        humidity: 46,
        activityLevel: 'medium',
        efficiency: 82,
        lastUpdated: new Date(Date.now() - 10 * 60 * 1000),
        skuCount: 0,
        pickerCount: 4,
        throughput: 150,
        bottlenecks: ['Insufficient dock space']
      }
    ];
    
    setZones(mockZones);
    setIsLoading(false);
  };

  const getActivityColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-gray-200 text-gray-700';
      case 'medium': return 'bg-yellow-200 text-yellow-700';
      case 'high': return 'bg-orange-200 text-orange-700';
      case 'critical': return 'bg-red-200 text-red-700';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'storage': return Package;
      case 'picking': return Target;
      case 'shipping': return Truck;
      case 'receiving': return Package;
      case 'cold_storage': return Activity;
      default: return Package;
    }
  };

  const getHeatmapColor = (zone: WarehouseZone) => {
    let value = 0;
    switch (viewMode) {
      case 'utilization':
        value = zone.currentUtilization;
        break;
      case 'activity':
        value = zone.activityLevel === 'low' ? 25 : zone.activityLevel === 'medium' ? 50 : zone.activityLevel === 'high' ? 75 : 100;
        break;
      case 'efficiency':
        value = zone.efficiency;
        break;
      case 'temperature':
        value = Math.min(100, Math.max(0, (zone.temperature - 15) / 15 * 100));
        break;
    }

    if (value >= 80) return 'bg-red-500';
    if (value >= 60) return 'bg-orange-500';
    if (value >= 40) return 'bg-yellow-500';
    if (value >= 20) return 'bg-green-500';
    return 'bg-blue-500';
  };

  const getHeatmapOpacity = (zone: WarehouseZone) => {
    let value = 0;
    switch (viewMode) {
      case 'utilization':
        value = zone.currentUtilization;
        break;
      case 'activity':
        value = zone.activityLevel === 'low' ? 25 : zone.activityLevel === 'medium' ? 50 : zone.activityLevel === 'high' ? 75 : 100;
        break;
      case 'efficiency':
        value = zone.efficiency;
        break;
      case 'temperature':
        value = Math.min(100, Math.max(0, (zone.temperature - 15) / 15 * 100));
        break;
    }
    return Math.max(0.3, value / 100);
  };

  const filteredZones = zones.filter(zone => 
    zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    zone.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading warehouse data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Warehouse Heatmap</h2>
          <p className="text-gray-600">Real-time warehouse zone analysis and optimization</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadWarehouseData} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* View Mode Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Search zones..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex space-x-2">
              {[
                { key: 'utilization', label: 'Utilization', icon: BarChart3 },
                { key: 'activity', label: 'Activity', icon: Activity },
                { key: 'efficiency', label: 'Efficiency', icon: Target },
                { key: 'temperature', label: 'Temperature', icon: Activity }
              ].map(({ key, label, icon: Icon }) => (
                <Button
                  key={key}
                  variant={viewMode === key ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode(key as any)}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warehouse Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Warehouse Layout - {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gray-100 rounded-lg p-4" style={{ height: '500px' }}>
            {filteredZones.map((zone, index) => {
              const TypeIcon = getTypeIcon(zone.type);
              return (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`absolute rounded-lg border-2 border-white cursor-pointer hover:shadow-lg transition-all ${
                    getHeatmapColor(zone)
                  }`}
                  style={{
                    left: `${zone.x}px`,
                    top: `${zone.y}px`,
                    width: `${zone.width}px`,
                    height: `${zone.height}px`,
                    opacity: getHeatmapOpacity(zone)
                  }}
                  onClick={() => setSelectedZone(zone)}
                >
                  <div className="p-2 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <TypeIcon className="w-4 h-4 text-white" />
                      <Badge className={`text-xs ${getActivityColor(zone.activityLevel)}`}>
                        {zone.activityLevel.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-white text-xs font-medium">
                      {zone.name}
                    </div>
                    <div className="text-white text-xs">
                      {viewMode === 'utilization' && `${zone.currentUtilization}%`}
                      {viewMode === 'activity' && `${zone.throughput}/hr`}
                      {viewMode === 'efficiency' && `${zone.efficiency}%`}
                      {viewMode === 'temperature' && `${zone.temperature}°C`}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Zone Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredZones.map((zone, index) => {
          const TypeIcon = getTypeIcon(zone.type);
          return (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedZone(zone)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <TypeIcon className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold">{zone.name}</span>
                    </div>
                    <Badge className={getActivityColor(zone.activityLevel)}>
                      {zone.activityLevel.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Utilization</span>
                      <span className="font-medium">{zone.currentUtilization}%</span>
                    </div>
                    <Progress value={zone.currentUtilization} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">Efficiency:</span>
                        <span className="font-medium ml-1">{zone.efficiency}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Throughput:</span>
                        <span className="font-medium ml-1">{zone.throughput}/hr</span>
                      </div>
                      <div>
                        <span className="text-gray-500">SKUs:</span>
                        <span className="font-medium ml-1">{zone.skuCount}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Pickers:</span>
                        <span className="font-medium ml-1">{zone.pickerCount}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Zone Details Modal */}
      {selectedZone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedZone(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{selectedZone.name}</h3>
              <Button variant="outline" onClick={() => setSelectedZone(null)}>
                ×
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Type</label>
                <p className="text-lg">{selectedZone.type.replace('_', ' ').toUpperCase()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Activity Level</label>
                <Badge className={getActivityColor(selectedZone.activityLevel)}>
                  {selectedZone.activityLevel.toUpperCase()}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Utilization</label>
                <div className="flex items-center space-x-2">
                  <Progress value={selectedZone.currentUtilization} className="flex-1 h-2" />
                  <span className="font-semibold">{selectedZone.currentUtilization}%</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Efficiency</label>
                <div className="flex items-center space-x-2">
                  <Progress value={selectedZone.efficiency} className="flex-1 h-2" />
                  <span className="font-semibold">{selectedZone.efficiency}%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {selectedZone.throughput}
                </div>
                <div className="text-sm text-gray-500">Throughput/hr</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {selectedZone.skuCount}
                </div>
                <div className="text-sm text-gray-500">SKUs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {selectedZone.pickerCount}
                </div>
                <div className="text-sm text-gray-500">Pickers</div>
              </div>
            </div>

            {selectedZone.bottlenecks.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-red-600">Bottlenecks</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {selectedZone.bottlenecks.map((bottleneck, idx) => (
                    <li key={idx}>{bottleneck}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSelectedZone(null)}>
                Close
              </Button>
              <Button>
                <Settings className="w-4 h-4 mr-2" />
                Optimize Zone
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
