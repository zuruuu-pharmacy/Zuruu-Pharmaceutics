"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  ArrowLeft, 
  Package, 
  BarChart3, 
  Truck, 
  AlertTriangle,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  CheckCircle,
  Settings,
  Bell,
  FileText,
  MapPin,
  Activity,
  Database,
  Link,
  Download,
  RefreshCw,
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Calendar,
  Globe,
  Camera,
  Mail,
  Phone,
  MessageSquare,
  QrCode,
  Thermometer,
  Factory,
  Store,
  Warehouse,
  AlertCircle,
  Check,
  X,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Minus,
  ChevronRight,
  ChevronDown,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { ToastProvider } from '@/components/ui/toast';

// Import all the new feature components
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load heavy components
const RealTimeInventoryDashboard = dynamic(() => import('@/components/industry/real-time-inventory-dashboard').then(mod => ({ default: mod.RealTimeInventoryDashboard })), {
  loading: () => <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
});

const PredictiveDemandForecasting = dynamic(() => import('@/components/industry/predictive-demand-forecasting').then(mod => ({ default: mod.PredictiveDemandForecasting })), {
  loading: () => <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div></div>
});

const AutoRestockRecommendations = dynamic(() => import('@/components/industry/auto-restock-recommendations').then(mod => ({ default: mod.AutoRestockRecommendations })), {
  loading: () => <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div></div>
});

const BatchTraceVisualization = dynamic(() => import('@/components/industry/batch-trace-visualization').then(mod => ({ default: mod.BatchTraceVisualization })), {
  loading: () => <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
});

const RecallManagerNotification = dynamic(() => import('@/components/industry/recall-manager-notification').then(mod => ({ default: mod.RecallManagerNotification })), {
  loading: () => <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div></div>
});

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  status: 'active' | 'coming_soon' | 'beta';
  component?: React.ComponentType;
}

export default function IndustryDashboard() {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState<string>('overview');
  const [isLoading, setIsLoading] = useState(false);

  const handleFeatureSwitch = (featureId: string) => {
    if (featureId === 'overview') {
      setActiveFeature(featureId);
      return;
    }
    
    setIsLoading(true);
    setActiveFeature(featureId);
    
    // Simulate loading time for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const features: FeatureCard[] = [
    {
      id: 'overview',
      title: 'Dashboard Overview',
      description: 'Comprehensive overview of all industry operations',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'text-blue-600',
      status: 'active'
    },
    {
      id: 'inventory',
      title: 'Real-Time Inventory',
      description: 'Live monitoring of stock levels, alerts, and movements',
      icon: <Package className="w-8 h-8" />,
      color: 'text-green-600',
      status: 'active',
      component: RealTimeInventoryDashboard
    },
    {
      id: 'forecasting',
      title: 'Predictive Forecasting',
      description: 'AI-powered demand prediction with scenario planning',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'text-purple-600',
      status: 'active',
      component: PredictiveDemandForecasting
    },
    {
      id: 'restock',
      title: 'Auto-Restock AI',
      description: 'Intelligent restock recommendations with cost optimization',
      icon: <Zap className="w-8 h-8" />,
      color: 'text-orange-600',
      status: 'active',
      component: AutoRestockRecommendations
    },
    {
      id: 'trace',
      title: 'Batch Trace & Visualization',
      description: 'Complete end-to-end batch tracking with real-time monitoring',
      icon: <Truck className="w-8 h-8" />,
      color: 'text-indigo-600',
      status: 'active',
      component: BatchTraceVisualization
    },
    {
      id: 'recall',
      title: 'Recall Manager',
      description: 'Comprehensive recall management with automated notifications',
      icon: <AlertTriangle className="w-8 h-8" />,
      color: 'text-red-600',
      status: 'active',
      component: RecallManagerNotification
    },
    {
      id: 'suppliers',
      title: 'Supplier Scorecards',
      description: 'Performance tracking and supplier relationship management',
      icon: <Users className="w-8 h-8" />,
      color: 'text-cyan-600',
      status: 'coming_soon'
    },
    {
      id: 'purchase-orders',
      title: 'Automated Purchase Orders',
      description: 'AI-generated purchase orders with approval workflows',
      icon: <FileText className="w-8 h-8" />,
      color: 'text-teal-600',
      status: 'coming_soon'
    },
    {
      id: 'cold-chain',
      title: 'Cold Chain Monitoring',
      description: 'Temperature-sensitive product monitoring and alerts',
      icon: <Thermometer className="w-8 h-8" />,
      color: 'text-blue-600',
      status: 'coming_soon'
    },
    {
      id: 'alerts',
      title: 'Real-Time Alerts',
      description: 'Priority-based notification system with smart filtering',
      icon: <Bell className="w-8 h-8" />,
      color: 'text-yellow-600',
      status: 'coming_soon'
    },
    {
      id: 'integrations',
      title: 'ERP Integrations',
      description: 'Seamless integration with existing enterprise systems',
      icon: <Link className="w-8 h-8" />,
      color: 'text-gray-600',
      status: 'coming_soon'
    },
    {
      id: 'picking',
      title: 'Smart Picking & Optimization',
      description: 'AI-optimized warehouse picking routes and wave planning',
      icon: <Target className="w-8 h-8" />,
      color: 'text-pink-600',
      status: 'coming_soon'
    },
    {
      id: 'quality',
      title: 'Quality Control Dashboard',
      description: 'Comprehensive quality management and inspection workflows',
      icon: <Shield className="w-8 h-8" />,
      color: 'text-emerald-600',
      status: 'coming_soon'
    },
    {
      id: 'compliance',
      title: 'Compliance & Audit Trail',
      description: 'Regulatory compliance tracking and audit documentation',
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'text-violet-600',
      status: 'coming_soon'
    },
    {
      id: 'scenarios',
      title: 'Scenario Simulator',
      description: 'What-if analysis and impact modeling for business decisions',
      icon: <Activity className="w-8 h-8" />,
      color: 'text-amber-600',
      status: 'coming_soon'
    },
    {
      id: 'sku-performance',
      title: 'SKU Performance Explorer',
      description: 'Detailed analytics and trend analysis for product performance',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'text-rose-600',
      status: 'coming_soon'
    },
    {
      id: 'warehouse-heatmap',
      title: 'Warehouse Heatmap',
      description: 'Activity visualization and optimization insights',
      icon: <MapPin className="w-8 h-8" />,
      color: 'text-lime-600',
      status: 'coming_soon'
    },
    {
      id: 'training',
      title: 'Training & Simulation Lab',
      description: 'Interactive learning modules and progress tracking',
      icon: <Globe className="w-8 h-8" />,
      color: 'text-sky-600',
      status: 'coming_soon'
    },
    {
      id: 'documents',
      title: 'Document & Certificate Vault',
      description: 'Secure storage and version control for all documents',
      icon: <Database className="w-8 h-8" />,
      color: 'text-stone-600',
      status: 'coming_soon'
    },
    {
      id: 'mobile-ops',
      title: 'Mobile Ops Assistant',
      description: 'Offline-capable mobile app with barcode scanning',
      icon: <Phone className="w-8 h-8" />,
      color: 'text-fuchsia-600',
      status: 'coming_soon'
    },
    {
      id: 'reports',
      title: 'Reports & Scheduled Exports',
      description: 'Automated report generation and distribution',
      icon: <Download className="w-8 h-8" />,
      color: 'text-slate-600',
      status: 'coming_soon'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'beta': return 'text-yellow-600 bg-yellow-100';
      case 'coming_soon': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'ACTIVE';
      case 'beta': return 'BETA';
      case 'coming_soon': return 'COMING SOON';
      default: return 'UNKNOWN';
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Industry Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive pharmaceutical supply chain management with AI-powered insights, 
          real-time monitoring, and automated workflows.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">1,247</h3>
              <p className="text-gray-600">Active SKUs</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">98.5%</h3>
              <p className="text-gray-600">Traceability Coverage</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">$2.4M</h3>
              <p className="text-gray-600">Cost Savings</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">3</h3>
              <p className="text-gray-600">Active Alerts</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  feature.status === 'active' ? 'hover:ring-2 hover:ring-blue-500' : 'opacity-75'
                }`}
                onClick={() => feature.status === 'active' && handleFeatureSwitch(feature.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${feature.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                      <div className={feature.color}>
                        {feature.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        <Badge className={getStatusColor(feature.status)}>
                          {getStatusText(feature.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                      {feature.status === 'active' && (
                        <Button size="sm" variant="outline" className="w-full">
                          Open Feature
                        </Button>
                      )}
                      {feature.status === 'coming_soon' && (
                        <div className="text-center py-2">
                          <span className="text-sm text-gray-500">Coming Soon</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderActiveFeature = () => {
    const feature = features.find(f => f.id === activeFeature);
    if (!feature || !feature.component) return null;

    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading {feature.title}...</p>
          </div>
        </div>
      );
    }

    const FeatureComponent = feature.component;
    return (
      <Suspense fallback={
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading {feature.title}...</p>
          </div>
        </div>
      }>
        <FeatureComponent />
      </Suspense>
    );
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => router.push('/')}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Button>
                <div className="h-6 w-px bg-gray-300" />
                <div className="flex items-center space-x-2">
                  <Building2 className="w-6 h-6 text-blue-600" />
                  <h1 className="text-xl font-semibold text-gray-900">Industry Dashboard</h1>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeFeature === 'overview' ? renderOverview() : renderActiveFeature()}
        </div>
        
        {/* Quick Loading Indicator */}
        {isLoading && (
          <div className="fixed top-4 right-4 z-50">
            <div className="bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600">Loading feature...</span>
            </div>
          </div>
        )}
      </div>
    </ToastProvider>
  );
}