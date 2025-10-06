"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  Users,
  Zap,
  Target,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface PickingWave {
  id: string;
  name: string;
  status: 'pending' | 'active' | 'completed' | 'paused';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  totalItems: number;
  pickedItems: number;
  estimatedTime: number; // in minutes
  actualTime?: number;
  picker: string;
  zone: string;
  efficiency: number; // percentage
  startTime?: Date;
  endTime?: Date;
}

export const SmartPickingOptimization: React.FC = () => {
  const [waves, setWaves] = useState<PickingWave[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    loadPickingWaves();
  }, []);

  const loadPickingWaves = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockWaves: PickingWave[] = [
      {
        id: 'wave-1',
        name: 'Morning Rush - Zone A',
        status: 'active',
        priority: 'high',
        totalItems: 45,
        pickedItems: 23,
        estimatedTime: 30,
        actualTime: 18,
        picker: 'John Smith',
        zone: 'Zone A',
        efficiency: 87.5,
        startTime: new Date(Date.now() - 18 * 60 * 1000)
      },
      {
        id: 'wave-2',
        name: 'Bulk Orders - Zone B',
        status: 'pending',
        priority: 'medium',
        totalItems: 78,
        pickedItems: 0,
        estimatedTime: 45,
        picker: 'Sarah Johnson',
        zone: 'Zone B',
        efficiency: 0
      },
      {
        id: 'wave-3',
        name: 'Express Orders - Zone C',
        status: 'completed',
        priority: 'urgent',
        totalItems: 12,
        pickedItems: 12,
        estimatedTime: 15,
        actualTime: 12,
        picker: 'Mike Wilson',
        zone: 'Zone C',
        efficiency: 95.2,
        startTime: new Date(Date.now() - 45 * 60 * 1000),
        endTime: new Date(Date.now() - 33 * 60 * 1000)
      },
      {
        id: 'wave-4',
        name: 'Cold Storage - Zone D',
        status: 'paused',
        priority: 'low',
        totalItems: 32,
        pickedItems: 8,
        estimatedTime: 25,
        picker: 'Lisa Brown',
        zone: 'Zone D',
        efficiency: 65.0,
        startTime: new Date(Date.now() - 30 * 60 * 1000)
      }
    ];
    
    setWaves(mockWaves);
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-gray-600 bg-gray-100';
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'urgent': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleWaveAction = (waveId: string, action: 'start' | 'pause' | 'resume' | 'complete') => {
    setWaves(prev => prev.map(wave => {
      if (wave.id === waveId) {
        switch (action) {
          case 'start':
            return { ...wave, status: 'active' as any, startTime: new Date() };
          case 'pause':
            return { ...wave, status: 'paused' as any };
          case 'resume':
            return { ...wave, status: 'active' as any };
          case 'complete':
            return { 
              ...wave, 
              status: 'completed' as any, 
              endTime: new Date(),
              pickedItems: wave.totalItems,
              efficiency: 100
            };
          default:
            return wave;
        }
      }
      return wave;
    }));
  };

  const simulatePicking = () => {
    setIsSimulating(true);
    const interval = setInterval(() => {
      setWaves(prev => prev.map(wave => {
        if (wave.status === 'active' && wave.pickedItems < wave.totalItems) {
          const newPickedItems = Math.min(wave.pickedItems + 1, wave.totalItems);
          const progress = (newPickedItems / wave.totalItems) * 100;
          const efficiency = Math.min(100, wave.efficiency + Math.random() * 2);
          
          return {
            ...wave,
            pickedItems: newPickedItems,
            efficiency: Number(efficiency.toFixed(1)),
            status: newPickedItems === wave.totalItems ? 'completed' as any : wave.status
          };
        }
        return wave;
      }));
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setIsSimulating(false);
    }, 10000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading picking waves...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Smart Picking & Wave Optimization</h2>
          <p className="text-gray-600">AI-powered warehouse picking optimization and wave management</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadPickingWaves} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            onClick={simulatePicking} 
            disabled={isSimulating}
            variant="outline" 
            size="sm"
          >
            {isSimulating ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {isSimulating ? 'Simulating...' : 'Simulate'}
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {waves.filter(w => w.status === 'active').length}
            </div>
            <div className="text-sm text-gray-500">Active Waves</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {waves.reduce((sum, w) => sum + w.pickedItems, 0)}
            </div>
            <div className="text-sm text-gray-500">Items Picked</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {(waves.reduce((sum, w) => sum + w.efficiency, 0) / waves.length).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">Avg Efficiency</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {waves.filter(w => w.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-500">Completed Today</div>
          </CardContent>
        </Card>
      </div>

      {/* Picking Waves */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {waves.map((wave, index) => (
          <motion.div
            key={wave.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{wave.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getStatusColor(wave.status)}>
                        {wave.status.toUpperCase()}
                      </Badge>
                      <Badge className={getPriorityColor(wave.priority)}>
                        {wave.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{wave.efficiency}%</div>
                    <div className="text-sm text-gray-500">Efficiency</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">
                      {wave.pickedItems}/{wave.totalItems} items
                    </span>
                  </div>
                  <Progress value={(wave.pickedItems / wave.totalItems) * 100} className="h-2" />
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Picker:</span>
                    <div className="font-medium">{wave.picker}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Zone:</span>
                    <div className="font-medium">{wave.zone}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Est. Time:</span>
                    <div className="font-medium">{wave.estimatedTime}min</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Actual:</span>
                    <div className="font-medium">
                      {wave.actualTime ? `${wave.actualTime}min` : 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  {wave.status === 'pending' && (
                    <Button
                      size="sm"
                      onClick={() => handleWaveAction(wave.id, 'start')}
                      className="flex-1"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  )}
                  {wave.status === 'active' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleWaveAction(wave.id, 'pause')}
                        className="flex-1"
                      >
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleWaveAction(wave.id, 'complete')}
                        className="flex-1"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Complete
                      </Button>
                    </>
                  )}
                  {wave.status === 'paused' && (
                    <Button
                      size="sm"
                      onClick={() => handleWaveAction(wave.id, 'resume')}
                      className="flex-1"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Resume
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
