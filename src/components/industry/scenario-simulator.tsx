"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Download,
  Save,
  Upload,
  Zap,
  Target,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Scenario {
  id: string;
  name: string;
  description: string;
  type: 'demand_surge' | 'supply_shortage' | 'price_volatility' | 'quality_issue' | 'logistics_delay';
  status: 'draft' | 'running' | 'completed' | 'paused';
  duration: number; // in days
  currentDay: number;
  parameters: {
    demandMultiplier: number;
    supplyReduction: number;
    priceVolatility: number;
    qualityImpact: number;
    logisticsDelay: number;
  };
  results: {
    totalRevenue: number;
    totalCost: number;
    profit: number;
    stockouts: number;
    overstock: number;
    customerSatisfaction: number;
  };
  createdAt: Date;
  completedAt?: Date;
}

export const ScenarioSimulator: React.FC = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockScenarios: Scenario[] = [
      {
        id: 'scenario-1',
        name: 'COVID-19 Demand Surge',
        description: 'Simulate increased demand for essential medications during pandemic',
        type: 'demand_surge',
        status: 'completed',
        duration: 30,
        currentDay: 30,
        parameters: {
          demandMultiplier: 2.5,
          supplyReduction: 0.1,
          priceVolatility: 0.15,
          qualityImpact: 0.05,
          logisticsDelay: 0.2
        },
        results: {
          totalRevenue: 2500000,
          totalCost: 1800000,
          profit: 700000,
          stockouts: 15,
          overstock: 5,
          customerSatisfaction: 85
        },
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'scenario-2',
        name: 'Supply Chain Disruption',
        description: 'Test resilience during major supplier disruption',
        type: 'supply_shortage',
        status: 'running',
        duration: 14,
        currentDay: 8,
        parameters: {
          demandMultiplier: 1.0,
          supplyReduction: 0.6,
          priceVolatility: 0.25,
          qualityImpact: 0.1,
          logisticsDelay: 0.4
        },
        results: {
          totalRevenue: 1200000,
          totalCost: 1100000,
          profit: 100000,
          stockouts: 45,
          overstock: 2,
          customerSatisfaction: 65
        },
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'scenario-3',
        name: 'Price Volatility Test',
        description: 'Analyze impact of raw material price fluctuations',
        type: 'price_volatility',
        status: 'draft',
        duration: 21,
        currentDay: 0,
        parameters: {
          demandMultiplier: 1.1,
          supplyReduction: 0.05,
          priceVolatility: 0.4,
          qualityImpact: 0.02,
          logisticsDelay: 0.1
        },
        results: {
          totalRevenue: 0,
          totalCost: 0,
          profit: 0,
          stockouts: 0,
          overstock: 0,
          customerSatisfaction: 0
        },
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ];
    
    setScenarios(mockScenarios);
    setIsLoading(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'demand_surge': return 'text-green-600 bg-green-100';
      case 'supply_shortage': return 'text-red-600 bg-red-100';
      case 'price_volatility': return 'text-yellow-600 bg-yellow-100';
      case 'quality_issue': return 'text-orange-600 bg-orange-100';
      case 'logistics_delay': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'running': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleScenarioAction = (scenarioId: string, action: 'start' | 'pause' | 'resume' | 'stop' | 'reset') => {
    setScenarios(prev => prev.map(scenario => {
      if (scenario.id === scenarioId) {
        switch (action) {
          case 'start':
            return { ...scenario, status: 'running' as any };
          case 'pause':
            return { ...scenario, status: 'paused' as any };
          case 'resume':
            return { ...scenario, status: 'running' as any };
          case 'stop':
            return { 
              ...scenario, 
              status: 'completed' as any,
              completedAt: new Date(),
              currentDay: scenario.duration
            };
          case 'reset':
            return { 
              ...scenario, 
              status: 'draft' as any,
              currentDay: 0,
              completedAt: undefined
            };
          default:
            return scenario;
        }
      }
      return scenario;
    }));
  };

  const simulateScenario = (scenarioId: string) => {
    setIsSimulating(true);
    const interval = setInterval(() => {
      setScenarios(prev => prev.map(scenario => {
        if (scenario.id === scenarioId && scenario.status === 'running' && scenario.currentDay < scenario.duration) {
          const newDay = scenario.currentDay + 1;
          const progress = newDay / scenario.duration;
          
          // Simulate results based on parameters
          const baseRevenue = 100000;
          const baseCost = 80000;
          const revenue = baseRevenue * scenario.parameters.demandMultiplier * (1 + Math.random() * 0.1);
          const cost = baseCost * (1 + scenario.parameters.priceVolatility * Math.random());
          const profit = revenue - cost;
          
          return {
            ...scenario,
            currentDay: newDay,
            results: {
              totalRevenue: Math.round(scenario.results.totalRevenue + revenue),
              totalCost: Math.round(scenario.results.totalCost + cost),
              profit: Math.round(scenario.results.profit + profit),
              stockouts: scenario.results.stockouts + (Math.random() > 0.7 ? 1 : 0),
              overstock: scenario.results.overstock + (Math.random() > 0.9 ? 1 : 0),
              customerSatisfaction: Math.max(0, Math.min(100, scenario.results.customerSatisfaction + (Math.random() - 0.5) * 10))
            },
            status: newDay >= scenario.duration ? 'completed' as any : scenario.status
          };
        }
        return scenario;
      }));
    }, 2000);

    setTimeout(() => {
      clearInterval(interval);
      setIsSimulating(false);
    }, 10000);
  };

  const createNewScenario = () => {
    const newScenario: Scenario = {
      id: `scenario-${Date.now()}`,
      name: 'New Scenario',
      description: 'Custom scenario configuration',
      type: 'demand_surge',
      status: 'draft',
      duration: 7,
      currentDay: 0,
      parameters: {
        demandMultiplier: 1.0,
        supplyReduction: 0.0,
        priceVolatility: 0.0,
        qualityImpact: 0.0,
        logisticsDelay: 0.0
      },
      results: {
        totalRevenue: 0,
        totalCost: 0,
        profit: 0,
        stockouts: 0,
        overstock: 0,
        customerSatisfaction: 0
      },
      createdAt: new Date()
    };
    
    setScenarios(prev => [newScenario, ...prev]);
    setSelectedScenario(newScenario);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading scenarios...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Scenario Simulator</h2>
          <p className="text-gray-600">Test and analyze different business scenarios and their impact</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadScenarios} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={createNewScenario} size="sm">
            <Settings className="w-4 h-4 mr-2" />
            New Scenario
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {scenarios.filter(s => s.status === 'running').length}
            </div>
            <div className="text-sm text-gray-500">Running</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {scenarios.filter(s => s.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {scenarios.filter(s => s.status === 'draft').length}
            </div>
            <div className="text-sm text-gray-500">Draft</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {scenarios.length}
            </div>
            <div className="text-sm text-gray-500">Total Scenarios</div>
          </CardContent>
        </Card>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.map((scenario, index) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedScenario(scenario)}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{scenario.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getTypeColor(scenario.type)}>
                        {scenario.type.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(scenario.status)}>
                        {scenario.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {scenario.status === 'completed' ? '100%' : 
                       scenario.status === 'running' ? `${Math.round((scenario.currentDay / scenario.duration) * 100)}%` : '0%'}
                    </div>
                    <div className="text-sm text-gray-500">Progress</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{scenario.description}</p>
                
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium">
                      {scenario.currentDay}/{scenario.duration} days
                    </span>
                  </div>
                  <Progress value={(scenario.currentDay / scenario.duration) * 100} className="h-2" />
                </div>

                {/* Results Summary */}
                {scenario.status !== 'draft' && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-green-600">
                        ${scenario.results.profit.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">Profit</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">
                        {scenario.results.customerSatisfaction}%
                      </div>
                      <div className="text-xs text-gray-500">Satisfaction</div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  {scenario.status === 'draft' && (
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScenarioAction(scenario.id, 'start');
                        simulateScenario(scenario.id);
                      }}
                      className="flex-1"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  )}
                  {scenario.status === 'running' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleScenarioAction(scenario.id, 'pause');
                        }}
                        className="flex-1"
                      >
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </Button>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleScenarioAction(scenario.id, 'stop');
                        }}
                        className="flex-1"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Stop
                      </Button>
                    </>
                  )}
                  {scenario.status === 'paused' && (
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScenarioAction(scenario.id, 'resume');
                        simulateScenario(scenario.id);
                      }}
                      className="flex-1"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Resume
                    </Button>
                  )}
                  {scenario.status === 'completed' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScenarioAction(scenario.id, 'reset');
                      }}
                      className="flex-1"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Reset
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Scenario Details Modal */}
      {selectedScenario && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedScenario(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{selectedScenario.name}</h3>
              <Button variant="outline" onClick={() => setSelectedScenario(null)}>
                ×
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Type</label>
                <p className="text-lg">{selectedScenario.type.replace('_', ' ').toUpperCase()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <Badge className={getStatusColor(selectedScenario.status)}>
                  {selectedScenario.status.toUpperCase()}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Duration</label>
                <p className="text-lg">{selectedScenario.duration} days</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Current Day</label>
                <p className="text-lg">{selectedScenario.currentDay}</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Parameters</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Demand Multiplier: {selectedScenario.parameters.demandMultiplier}x</div>
                <div>Supply Reduction: {selectedScenario.parameters.supplyReduction * 100}%</div>
                <div>Price Volatility: {selectedScenario.parameters.priceVolatility * 100}%</div>
                <div>Quality Impact: {selectedScenario.parameters.qualityImpact * 100}%</div>
              </div>
            </div>

            {selectedScenario.status !== 'draft' && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Results</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-green-600">
                      ${selectedScenario.results.profit.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Profit</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">
                      {selectedScenario.results.customerSatisfaction}%
                    </div>
                    <div className="text-xs text-gray-500">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-red-600">
                      {selectedScenario.results.stockouts}
                    </div>
                    <div className="text-xs text-gray-500">Stockouts</div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSelectedScenario(null)}>
                Close
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export Results
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
