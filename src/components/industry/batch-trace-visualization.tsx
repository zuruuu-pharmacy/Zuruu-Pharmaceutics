"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Truck, 
  Factory, 
  Package, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Eye,
  Download,
  RefreshCw,
  Search,
  Filter,
  Play,
  Pause,
  RotateCcw,
  Globe,
  Building2,
  Warehouse
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { industryDataService } from '@/services/industry-data-service';

interface BatchTraceData {
  id: string;
  skuId: string;
  batchId: string;
  status: 'IN_TRANSIT' | 'DELIVERED' | 'DELAYED' | 'RECALLED';
  currentLocation: string;
  progress: number;
  stages: BatchStage[];
  totalDuration: number;
  estimatedDelivery: Date;
  temperature?: number;
  humidity?: number;
  lastUpdate: Date;
}

interface BatchStage {
  name: string;
  location: string;
  timestamp: Date;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'DELAYED';
  duration: number;
  notes?: string;
  coordinates?: { lat: number; lng: number };
}

export function BatchTraceVisualization() {
  const [batchTraces, setBatchTraces] = useState<BatchTraceData[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadBatchTraces();
  }, []);

  const loadBatchTraces = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const skuData = industryDataService.getSKUData();
    const traces: BatchTraceData[] = skuData.slice(0, 10).map(sku => {
      const batchTimeline = industryDataService.generateBatchTimeline(sku.id);
      return {
        id: `trace-${sku.id}`,
        skuId: sku.id,
        batchId: batchTimeline.batchId,
        status: batchTimeline.status,
        currentLocation: batchTimeline.stages[batchTimeline.stages.length - 1]?.location || 'Unknown',
        progress: Math.random() * 100,
        stages: batchTimeline.stages,
        totalDuration: batchTimeline.totalDuration,
        estimatedDelivery: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000),
        temperature: Math.random() * 10 + 15, // 15-25°C
        humidity: Math.random() * 20 + 40, // 40-60%
        lastUpdate: new Date()
      };
    });
    
    setBatchTraces(traces);
    setIsLoading(false);
  };

  const filteredTraces = batchTraces.filter(trace => {
    const matchesSearch = trace.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trace.skuId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || trace.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'IN_TRANSIT': return 'text-blue-600 bg-blue-100';
      case 'DELIVERED': return 'text-green-600 bg-green-100';
      case 'DELAYED': return 'text-yellow-600 bg-yellow-100';
      case 'RECALLED': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStageStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'text-green-600 bg-green-100';
      case 'IN_PROGRESS': return 'text-blue-600 bg-blue-100';
      case 'PENDING': return 'text-gray-600 bg-gray-100';
      case 'DELAYED': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStageIcon = (stageName: string) => {
    switch (stageName.toLowerCase()) {
      case 'manufacturing': return <Factory className="w-5 h-5" />;
      case 'packaging': return <Package className="w-5 h-5" />;
      case 'port transit': return <Truck className="w-5 h-5" />;
      case 'warehouse storage': return <Warehouse className="w-5 h-5" />;
      case 'retail distribution': return <Building2 className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  const exportTraceData = () => {
    const csvContent = [
      'Batch ID,SKU ID,Status,Current Location,Progress,Last Update,Temperature,Humidity',
      ...filteredTraces.map(trace => 
        `${trace.batchId},${trace.skuId},${trace.status},${trace.currentLocation},${trace.progress.toFixed(1)}%,${trace.lastUpdate.toISOString()},${trace.temperature?.toFixed(1) || 'N/A'},${trace.humidity?.toFixed(1) || 'N/A'}`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'batch_trace_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePlayTimeline = () => {
    setIsPlaying(!isPlaying);
    // Simulate timeline animation
    if (!isPlaying) {
      console.log('Starting timeline animation...');
    } else {
      console.log('Pausing timeline animation...');
    }
  };

  const handleResetTimeline = () => {
    setIsPlaying(false);
    console.log('Resetting timeline...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Batch Trace & Visualization</h2>
          <p className="text-gray-600">Complete end-to-end batch tracking with real-time monitoring</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadBatchTraces} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={exportTraceData} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={handlePlayTimeline} variant="outline" size="sm">
            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isPlaying ? 'Pause' : 'Play'} Timeline
          </Button>
          <Button onClick={handleResetTimeline} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
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
                  <p className="text-sm text-gray-600">Active Batches</p>
                  <p className="text-2xl font-bold">{batchTraces.length}</p>
                </div>
                <Package className="w-8 h-8 text-blue-500" />
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
                  <p className="text-sm text-gray-600">In Transit</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {batchTraces.filter(trace => trace.status === 'IN_TRANSIT').length}
                  </p>
                </div>
                <Truck className="w-8 h-8 text-blue-500" />
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
                  <p className="text-sm text-gray-600">Delivered</p>
                  <p className="text-2xl font-bold text-green-600">
                    {batchTraces.filter(trace => trace.status === 'DELIVERED').length}
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
                  <p className="text-sm text-gray-600">Delayed</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {batchTraces.filter(trace => trace.status === 'DELAYED').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
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
                placeholder="Search batches..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="IN_TRANSIT">In Transit</option>
              <option value="DELIVERED">Delivered</option>
              <option value="DELAYED">Delayed</option>
              <option value="RECALLED">Recalled</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Batch Traces List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Active Batches</h3>
          <div className="space-y-3">
            <AnimatePresence>
              {filteredTraces.map((trace, index) => (
                <motion.div
                  key={trace.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedBatch === trace.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedBatch(selectedBatch === trace.id ? null : trace.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold">{trace.batchId}</h4>
                          <p className="text-sm text-gray-600">{trace.skuId}</p>
                        </div>
                        <Badge className={getStatusColor(trace.status)}>
                          {trace.status.replace('_', ' ')}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Current Location</span>
                          <span className="font-medium">{trace.currentLocation}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium">{trace.progress.toFixed(1)}%</span>
                        </div>
                        
                        <Progress value={trace.progress} className="h-2" />
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Last Update</span>
                          <span className="text-gray-500">
                            {trace.lastUpdate.toLocaleTimeString()}
                          </span>
                        </div>

                        {trace.temperature && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Temperature</span>
                            <span className="font-medium">{trace.temperature.toFixed(1)}°C</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Batch Timeline */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Batch Timeline</h3>
          {selectedBatch ? (
            <Card>
              <CardContent className="p-4">
                {(() => {
                  const trace = batchTraces.find(t => t.id === selectedBatch);
                  if (!trace) return null;
                  
                  return (
                    <div className="space-y-4">
                      <div className="text-center">
                        <h4 className="font-semibold text-lg">{trace.batchId}</h4>
                        <p className="text-sm text-gray-600">{trace.skuId}</p>
                      </div>

                      <div className="relative">
                        {trace.stages.map((stage, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-4 mb-6 last:mb-0"
                          >
                            <div className="flex flex-col items-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                stage.status === 'COMPLETED' ? 'bg-green-500 text-white' :
                                stage.status === 'IN_PROGRESS' ? 'bg-blue-500 text-white' :
                                stage.status === 'DELAYED' ? 'bg-yellow-500 text-white' :
                                'bg-gray-300 text-gray-600'
                              }`}>
                                {getStageIcon(stage.name)}
                              </div>
                              {index < trace.stages.length - 1 && (
                                <div className="w-px h-8 bg-gray-300 mt-2" />
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h5 className="font-medium">{stage.name}</h5>
                                <Badge className={getStageStatusColor(stage.status)}>
                                  {stage.status.replace('_', ' ')}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{stage.location}</p>
                              <p className="text-xs text-gray-500">
                                {stage.timestamp.toLocaleString()}
                              </p>
                              {stage.notes && (
                                <p className="text-xs text-gray-500 mt-1">{stage.notes}</p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Total Duration:</span>
                            <span className="ml-1 font-medium">{trace.totalDuration} days</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Est. Delivery:</span>
                            <span className="ml-1 font-medium">
                              {trace.estimatedDelivery.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a batch to view its timeline</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Map Visualization Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Global Batch Tracking Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Interactive map visualization coming soon</p>
              <p className="text-sm text-gray-400">Track batches across global supply chain</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}