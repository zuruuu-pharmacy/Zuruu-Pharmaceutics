"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Package,
  Truck,
  Shield,
  Award,
  BarChart3,
  Download,
  RefreshCw,
  Filter,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';

interface SupplierScore {
  id: string;
  name: string;
  overallScore: number;
  qualityScore: number;
  deliveryScore: number;
  costScore: number;
  communicationScore: number;
  totalOrders: number;
  onTimeDelivery: number;
  qualityIssues: number;
  avgLeadTime: number;
  costSavings: number;
  lastOrderDate: Date;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  certifications: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export const SupplierScorecards: React.FC = () => {
  const [suppliers, setSuppliers] = useState<SupplierScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'excellent' | 'good' | 'fair' | 'poor'>('all');
  const [sortBy, setSortBy] = useState<'score' | 'name' | 'orders'>('score');

  useEffect(() => {
    loadSupplierData();
  }, []);

  const loadSupplierData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockSuppliers: SupplierScore[] = [
      {
        id: 'supplier-1',
        name: 'PharmaSupply Inc.',
        overallScore: 94,
        qualityScore: 96,
        deliveryScore: 92,
        costScore: 88,
        communicationScore: 98,
        totalOrders: 156,
        onTimeDelivery: 94.2,
        qualityIssues: 2,
        avgLeadTime: 5.2,
        costSavings: 12.5,
        lastOrderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'excellent',
        certifications: ['ISO 9001', 'FDA Approved', 'GMP Certified'],
        riskLevel: 'low'
      },
      {
        id: 'supplier-2',
        name: 'MediCorp Ltd.',
        overallScore: 87,
        qualityScore: 89,
        deliveryScore: 85,
        costScore: 92,
        communicationScore: 82,
        totalOrders: 89,
        onTimeDelivery: 87.3,
        qualityIssues: 5,
        avgLeadTime: 6.8,
        costSavings: 8.2,
        lastOrderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: 'good',
        certifications: ['ISO 9001', 'GMP Certified'],
        riskLevel: 'low'
      },
      {
        id: 'supplier-3',
        name: 'HealthTech Solutions',
        overallScore: 78,
        qualityScore: 82,
        deliveryScore: 75,
        costScore: 85,
        communicationScore: 70,
        totalOrders: 45,
        onTimeDelivery: 78.9,
        qualityIssues: 8,
        avgLeadTime: 8.5,
        costSavings: 5.1,
        lastOrderDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        status: 'fair',
        certifications: ['ISO 9001'],
        riskLevel: 'medium'
      },
      {
        id: 'supplier-4',
        name: 'BioPharm Co.',
        overallScore: 65,
        qualityScore: 70,
        deliveryScore: 60,
        costScore: 75,
        communicationScore: 55,
        totalOrders: 23,
        onTimeDelivery: 65.4,
        qualityIssues: 15,
        avgLeadTime: 12.3,
        costSavings: 2.8,
        lastOrderDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        status: 'poor',
        certifications: [],
        riskLevel: 'high'
      }
    ];
    
    setSuppliers(mockSuppliers);
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
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

  const filteredSuppliers = suppliers
    .filter(supplier => {
      const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || supplier.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'score': return b.overallScore - a.overallScore;
        case 'name': return a.name.localeCompare(b.name);
        case 'orders': return b.totalOrders - a.totalOrders;
        default: return 0;
      }
    });

  const exportSupplierData = () => {
    const csvContent = [
      'Supplier Name,Overall Score,Quality Score,Delivery Score,Cost Score,Communication Score,Total Orders,On-Time Delivery,Quality Issues,Avg Lead Time,Cost Savings,Status,Risk Level',
      ...filteredSuppliers.map(supplier => [
        supplier.name,
        supplier.overallScore,
        supplier.qualityScore,
        supplier.deliveryScore,
        supplier.costScore,
        supplier.communicationScore,
        supplier.totalOrders,
        `${supplier.onTimeDelivery}%`,
        supplier.qualityIssues,
        `${supplier.avgLeadTime} days`,
        `$${supplier.costSavings}K`,
        supplier.status,
        supplier.riskLevel
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'supplier_scorecards.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading supplier data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Supplier Scorecards</h2>
          <p className="text-gray-600">Comprehensive supplier performance evaluation and risk assessment</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadSupplierData} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={exportSupplierData} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Search suppliers..."
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
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="score">Sort by Score</option>
              <option value="name">Sort by Name</option>
              <option value="orders">Sort by Orders</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Supplier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier, index) => (
          <motion.div
            key={supplier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{supplier.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getStatusColor(supplier.status)}>
                        {supplier.status.toUpperCase()}
                      </Badge>
                      <Badge className={getRiskColor(supplier.riskLevel)}>
                        {supplier.riskLevel.toUpperCase()} RISK
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{supplier.overallScore}</div>
                    <div className="text-sm text-gray-500">Overall Score</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Score Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Quality</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={supplier.qualityScore} className="w-16 h-2" />
                      <span className="text-sm font-medium">{supplier.qualityScore}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Delivery</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={supplier.deliveryScore} className="w-16 h-2" />
                      <span className="text-sm font-medium">{supplier.deliveryScore}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Cost</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={supplier.costScore} className="w-16 h-2" />
                      <span className="text-sm font-medium">{supplier.costScore}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Communication</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={supplier.communicationScore} className="w-16 h-2" />
                      <span className="text-sm font-medium">{supplier.communicationScore}</span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{supplier.onTimeDelivery}%</div>
                    <div className="text-xs text-gray-500">On-Time Delivery</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">{supplier.totalOrders}</div>
                    <div className="text-xs text-gray-500">Total Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-orange-600">{supplier.avgLeadTime}d</div>
                    <div className="text-xs text-gray-500">Avg Lead Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-600">${supplier.costSavings}K</div>
                    <div className="text-xs text-gray-500">Cost Savings</div>
                  </div>
                </div>

                {/* Certifications */}
                {supplier.certifications.length > 0 && (
                  <div className="pt-2 border-t">
                    <div className="text-xs text-gray-500 mb-1">Certifications</div>
                    <div className="flex flex-wrap gap-1">
                      {supplier.certifications.map((cert, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <BarChart3 className="w-4 h-4 mr-1" />
                    Details
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Award className="w-4 h-4 mr-1" />
                    Rate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No suppliers found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
