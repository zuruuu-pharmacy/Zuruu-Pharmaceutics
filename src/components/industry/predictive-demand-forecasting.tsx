"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Calendar, 
  Download, 
  Settings,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ForecastChart } from './forecast-chart';

interface ForecastData {
  period: string;
  actual: number;
  predicted: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  seasonality: number;
  anomalies: boolean;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  probability: number;
  impact: 'high' | 'medium' | 'low';
  color: string;
}

export function PredictiveDemandForecasting() {
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [selectedScenario, setSelectedScenario] = useState('baseline');
  const [timeRange, setTimeRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSKU, setSelectedSKU] = useState('SKU-00001');

  const scenarios: Scenario[] = [
    { id: 'baseline', name: 'Baseline', description: 'Normal market conditions', probability: 60, impact: 'medium', color: 'blue' },
    { id: 'optimistic', name: 'Optimistic', description: 'High growth scenario', probability: 20, impact: 'high', color: 'green' },
    { id: 'pessimistic', name: 'Pessimistic', description: 'Economic downturn', probability: 20, impact: 'high', color: 'red' },
    { id: 'seasonal', name: 'Seasonal Peak', description: 'Holiday season boost', probability: 15, impact: 'medium', color: 'purple' }
  ];

  useEffect(() => {
    loadForecastData();
  }, [selectedScenario, timeRange, selectedSKU]);

  const loadForecastData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const days = parseInt(timeRange.replace('d', ''));
    const data: ForecastData[] = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      const baseDemand = 100 + Math.random() * 50;
      const seasonalFactor = 1 + 0.3 * Math.sin((i / 30) * Math.PI * 2);
      const trendFactor = selectedScenario === 'optimistic' ? 1.2 : 
                         selectedScenario === 'pessimistic' ? 0.8 : 1.0;
      
      const actual = i < 7 ? baseDemand * seasonalFactor : null;
      const predicted = baseDemand * seasonalFactor * trendFactor;
      
      data.push({
        period: date.toISOString().split('T')[0],
        actual: actual || 0,
        predicted: Math.round(predicted),
        confidence: Math.random() * 20 + 70,
        trend: Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable',
        seasonality: Math.round(seasonalFactor * 100) / 100,
        anomalies: Math.random() < 0.1
      });
    }
    
    setForecastData(data);
    setIsLoading(false);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const exportForecast = () => {
    const csvContent = [
      'Date,Actual,Predicted,Confidence,Trend,Seasonality,Anomalies',
      ...forecastData.map(item => 
        `${item.period},${item.actual},${item.predicted},${item.confidence},${item.trend},${item.seasonality},${item.anomalies}`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forecast_${selectedScenario}_${timeRange}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const chartData = {
    labels: forecastData.map(item => item.period),
    actual: forecastData.map(item => item.actual),
    baseline: forecastData.map(item => item.predicted),
    optimistic: forecastData.map(item => item.predicted * 1.1),
    pessimistic: forecastData.map(item => item.predicted * 0.9)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Predictive Demand Forecasting</h2>
          <p className="text-gray-600">AI-powered demand prediction with scenario planning</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadForecastData} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={exportForecast} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Time Range</label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="ml-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">7 Days</option>
                <option value="30d">30 Days</option>
                <option value="90d">90 Days</option>
                <option value="180d">180 Days</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">SKU</label>
              <select
                value={selectedSKU}
                onChange={(e) => setSelectedSKU(e.target.value)}
                className="ml-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="SKU-00001">SKU-00001</option>
                <option value="SKU-00002">SKU-00002</option>
                <option value="SKU-00003">SKU-00003</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scenario Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {scenarios.map((scenario, index) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-200 ${
                selectedScenario === scenario.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedScenario(scenario.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{scenario.name}</h3>
                  <Badge className={getImpactColor(scenario.impact)}>
                    {scenario.impact}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Probability</span>
                  <span className="font-medium">{scenario.probability}%</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Demand Forecast - {scenarios.find(s => s.id === selectedScenario)?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
                <p className="text-gray-600">Loading forecast data...</p>
              </div>
            </div>
          ) : (
            <ForecastChart data={chartData} scenario={timeRange as '7d' | '30d' | '90d'} />
          )}
        </CardContent>
      </Card>

      {/* Forecast Details */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Predicted Demand</p>
                    <p className="text-2xl font-bold">
                      {Math.round(forecastData.reduce((sum, item) => sum + item.predicted, 0) / forecastData.length)}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Confidence</p>
                    <p className="text-2xl font-bold">
                      {Math.round(forecastData.reduce((sum, item) => sum + item.confidence, 0) / forecastData.length)}%
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Anomalies Detected</p>
                    <p className="text-2xl font-bold text-red-600">
                      {forecastData.filter(item => item.anomalies).length}
                    </p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Trend Analysis</h3>
              <div className="space-y-3">
                {forecastData.slice(0, 10).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium">{item.period}</span>
                      {getTrendIcon(item.trend)}
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">Predicted: {item.predicted}</span>
                      <span className="text-sm text-gray-600">Confidence: {item.confidence}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomalies">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Anomaly Detection</h3>
              <div className="space-y-3">
                {forecastData.filter(item => item.anomalies).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      <span className="font-medium">{item.period}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Unusual demand pattern detected
                    </div>
                  </motion.div>
                ))}
                {forecastData.filter(item => item.anomalies).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                    <p>No anomalies detected in the forecast period</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">AI Insights</h3>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <h4 className="font-medium text-blue-900 mb-2">Demand Pattern</h4>
                  <p className="text-sm text-blue-700">
                    The forecast shows a {forecastData[0]?.trend} trend with seasonal variations. 
                    Peak demand is expected in the next 2 weeks.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <h4 className="font-medium text-green-900 mb-2">Recommendation</h4>
                  <p className="text-sm text-green-700">
                    Consider increasing inventory by 15% to meet predicted demand. 
                    Monitor closely for any supply chain disruptions.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <h4 className="font-medium text-yellow-900 mb-2">Risk Assessment</h4>
                  <p className="text-sm text-yellow-700">
                    Medium risk of stockout in the next 30 days. 
                    Confidence level is {Math.round(forecastData.reduce((sum, item) => sum + item.confidence, 0) / forecastData.length)}%.
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}