"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Package,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Download,
  Filter,
  Search,
  Eye,
  Settings,
  Target,
  Activity,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';

interface SKUPerformance {
  id: string;
  skuId: string;
  name: string;
  category: string;
  currentStock: number;
  reorderPoint: number;
  avgDemand: number;
  demandVariance: number;
  turnoverRate: number;
  profitMargin: number;
  revenue: number;
  cost: number;
  performanceScore: number;
  trend: 'up' | 'down' | 'stable';
  riskLevel: 'low' | 'medium' | 'high';
  lastUpdated: Date;
  forecast: {
    next7Days: number;
    next30Days: number;
    next90Days: number;
  };
  metrics: {
    sellThroughRate: number;
    daysOfSupply: number;
    stockoutRisk: number;
    overstockRisk: number;
  };
}

export const SKUPerformanceExplorer: React.FC = () => {
  const [skus, setSkus] = useState<SKUPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'performance' | 'revenue' | 'turnover' | 'name'>('performance');
  const [selectedSKU, setSelectedSKU] = useState<SKUPerformance | null>(null);

  useEffect(() => {
    loadSKUData();
  }, []);

  const loadSKUData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockSKUs: SKUPerformance[] = [
      {
        id: 'sku-perf-1',
        skuId: 'SKU-001',
        name: 'Paracetamol 500mg',
        category: 'Analgesics',
        currentStock: 1250,
        reorderPoint: 200,
        avgDemand: 150,
        demandVariance: 0.15,
        turnoverRate: 12.5,
        profitMargin: 0.35,
        revenue: 125000,
        cost: 81250,
        performanceScore: 92,
        trend: 'up',
        riskLevel: 'low',
        lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000),
        forecast: {
          next7Days: 1050,
          next30Days: 4500,
          next90Days: 13500
        },
        metrics: {
          sellThroughRate: 0.85,
          daysOfSupply: 8.3,
          stockoutRisk: 0.05,
          overstockRisk: 0.02
        }
      },
      {
        id: 'sku-perf-2',
        skuId: 'SKU-002',
        name: 'Insulin Vial 10ml',
        category: 'Diabetes',
        currentStock: 45,
        reorderPoint: 50,
        avgDemand: 12,
        demandVariance: 0.25,
        turnoverRate: 8.2,
        profitMargin: 0.45,
        revenue: 89000,
        cost: 48950,
        performanceScore: 78,
        trend: 'down',
        riskLevel: 'high',
        lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000),
        forecast: {
          next7Days: 84,
          next30Days: 360,
          next90Days: 1080
        },
        metrics: {
          sellThroughRate: 0.65,
          daysOfSupply: 3.8,
          stockoutRisk: 0.35,
          overstockRisk: 0.15
        }
      },
      {
        id: 'sku-perf-3',
        skuId: 'SKU-003',
        name: 'Vitamin D3 1000IU',
        category: 'Vitamins',
        currentStock: 890,
        reorderPoint: 300,
        avgDemand: 45,
        demandVariance: 0.08,
        turnoverRate: 15.2,
        profitMargin: 0.28,
        revenue: 67000,
        cost: 48240,
        performanceScore: 88,
        trend: 'stable',
        riskLevel: 'low',
        lastUpdated: new Date(Date.now() - 3 * 60 * 60 * 1000),
        forecast: {
          next7Days: 315,
          next30Days: 1350,
          next90Days: 4050
        },
        metrics: {
          sellThroughRate: 0.92,
          daysOfSupply: 19.8,
          stockoutRisk: 0.02,
          overstockRisk: 0.08
        }
      },
      {
        id: 'sku-perf-4',
        skuId: 'SKU-004',
        name: 'Antibiotic Capsule 250mg',
        category: 'Antibiotics',
        currentStock: 320,
        reorderPoint: 150,
        avgDemand: 25,
        demandVariance: 0.30,
        turnoverRate: 6.8,
        profitMargin: 0.22,
        revenue: 45000,
        cost: 35100,
        performanceScore: 65,
        trend: 'down',
        riskLevel: 'medium',
        lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000),
        forecast: {
          next7Days: 175,
          next30Days: 750,
          next90Days: 2250
        },
        metrics: {
          sellThroughRate: 0.55,
          daysOfSupply: 12.8,
          stockoutRisk: 0.18,
          overstockRisk: 0.25
        }
      }
    ];
    
    setSkus(mockSKUs);
    setIsLoading(false);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      case 'stable': return Activity;
      default: return Activity;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    if (score >= 50) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const categories = Array.from(new Set(skus.map(sku => sku.category)));

  const filteredSKUs = skus
    .filter(sku => {
      const matchesSearch = sku.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           sku.skuId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           sku.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || sku.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'performance': return b.performanceScore - a.performanceScore;
        case 'revenue': return b.revenue - a.revenue;
        case 'turnover': return b.turnoverRate - a.turnoverRate;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  const exportSKUData = () => {
    const csvContent = [
      'SKU ID,Name,Category,Current Stock,Reorder Point,Avg Demand,Turnover Rate,Profit Margin,Revenue,Cost,Performance Score,Trend,Risk Level',
      ...filteredSKUs.map(sku => [
        sku.skuId,
        sku.name,
        sku.category,
        sku.currentStock,
        sku.reorderPoint,
        sku.avgDemand,
        sku.turnoverRate,
        sku.profitMargin,
        sku.revenue,
        sku.cost,
        sku.performanceScore,
        sku.trend,
        sku.riskLevel
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sku_performance.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading SKU performance data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">SKU Performance Explorer</h2>
          <p className="text-gray-600">Comprehensive analysis of SKU performance and optimization opportunities</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadSKUData} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={exportSKUData} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {skus.length}
            </div>
            <div className="text-sm text-gray-500">Total SKUs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {skus.filter(s => s.performanceScore >= 80).length}
            </div>
            <div className="text-sm text-gray-500">High Performers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {skus.filter(s => s.riskLevel === 'high').length}
            </div>
            <div className="text-sm text-gray-500">High Risk</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              ${skus.reduce((sum, s) => sum + s.revenue, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Total Revenue</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Search SKUs..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="performance">Sort by Performance</option>
              <option value="revenue">Sort by Revenue</option>
              <option value="turnover">Sort by Turnover</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* SKU Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSKUs.map((sku, index) => {
          const TrendIcon = getTrendIcon(sku.trend);
          return (
            <motion.div
              key={sku.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedSKU(sku)}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{sku.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline">{sku.category}</Badge>
                        <Badge className={getRiskColor(sku.riskLevel)}>
                          {sku.riskLevel.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{sku.performanceScore}</div>
                      <div className="text-sm text-gray-500">Score</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">
                        ${sku.revenue.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">
                        {sku.turnoverRate}x
                      </div>
                      <div className="text-xs text-gray-500">Turnover</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-purple-600">
                        {sku.profitMargin * 100}%
                      </div>
                      <div className="text-xs text-gray-500">Margin</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-orange-600">
                        {sku.currentStock}
                      </div>
                      <div className="text-xs text-gray-500">Stock</div>
                    </div>
                  </div>

                  {/* Trend and Risk Indicators */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <TrendIcon className={`w-4 h-4 ${getTrendColor(sku.trend)}`} />
                      <span className={`text-sm font-medium ${getTrendColor(sku.trend)}`}>
                        {sku.trend.toUpperCase()}
                      </span>
                    </div>
                    <Badge className={getPerformanceColor(sku.performanceScore)}>
                      {sku.performanceScore >= 90 ? 'EXCELLENT' :
                       sku.performanceScore >= 70 ? 'GOOD' :
                       sku.performanceScore >= 50 ? 'FAIR' : 'POOR'}
                    </Badge>
                  </div>

                  {/* Stock Level Indicator */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Stock Level</span>
                      <span className="text-sm font-medium">
                        {sku.currentStock}/{sku.reorderPoint + sku.currentStock}
                      </span>
                    </div>
                    <Progress 
                      value={(sku.currentStock / (sku.reorderPoint + sku.currentStock)) * 100} 
                      className="h-2" 
                    />
                  </div>

                  {/* Risk Indicators */}
                  <div className="flex justify-between text-xs">
                    <div className={`flex items-center space-x-1 ${
                      sku.metrics.stockoutRisk > 0.2 ? 'text-red-600' : 
                      sku.metrics.stockoutRisk > 0.1 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      <AlertTriangle className="w-3 h-3" />
                      <span>Stockout: {sku.metrics.stockoutRisk * 100}%</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${
                      sku.metrics.overstockRisk > 0.2 ? 'text-red-600' : 
                      sku.metrics.overstockRisk > 0.1 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      <Package className="w-3 h-3" />
                      <span>Overstock: {sku.metrics.overstockRisk * 100}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* SKU Details Modal */}
      {selectedSKU && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedSKU(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{selectedSKU.name}</h3>
              <Button variant="outline" onClick={() => setSelectedSKU(null)}>
                ×
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-500">SKU ID</label>
                <p className="text-lg font-mono">{selectedSKU.skuId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Category</label>
                <p className="text-lg">{selectedSKU.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Performance Score</label>
                <div className="flex items-center space-x-2">
                  <Progress value={selectedSKU.performanceScore} className="flex-1 h-2" />
                  <span className="font-semibold">{selectedSKU.performanceScore}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Risk Level</label>
                <Badge className={getRiskColor(selectedSKU.riskLevel)}>
                  {selectedSKU.riskLevel.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${selectedSKU.revenue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {selectedSKU.turnoverRate}x
                </div>
                <div className="text-sm text-gray-500">Turnover Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {selectedSKU.profitMargin * 100}%
                </div>
                <div className="text-sm text-gray-500">Profit Margin</div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSelectedSKU(null)}>
                Close
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export Details
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {filteredSKUs.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No SKUs found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
