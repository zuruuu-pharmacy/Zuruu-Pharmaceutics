"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NextAuthGuard } from "@/components/auth/nextauth-guard";
import { 
  ArrowLeft, 
  BarChart3, 
  Users,
  Clock,
  DollarSign,
  CheckCircle,
  Bell,
  FileText,
  RefreshCw,
  Eye,
  Calendar,
  Target,
  TrendingUp,
  Package,
  Truck,
  Smartphone,
  AlertTriangle,
  Shield,
  Zap,
  Settings,
  Pill,
  Microscope,
  Clipboard,
  UserCheck,
  Video,
  Heart,
  Stethoscope,
  Syringe,
  ShoppingCart,
  CreditCard,
  Receipt,
  Star,
  Tag,
  Percent,
  TrendingDown,
  Package2,
  Store,
  ShoppingBag,
  Gift,
  Crown,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import InventoryManagement from '@/components/retail/inventory-management';
import { RetailAnalyticsDashboard } from '@/components/retail/retail-analytics-dashboard';
import CustomerManagement from '@/components/retail/customer-management';
import SalesAnalytics from '@/components/retail/sales-analytics';
import ProductManagement from '@/components/retail/product-management';
import OrderManagement from '@/components/retail/order-management';
import MarketingCampaigns from '@/components/retail/marketing-campaigns';
import LoyaltyProgram from '@/components/retail/loyalty-program';
import SupplierManagement from '@/components/retail/supplier-management';
import PricingStrategy from '@/components/retail/pricing-strategy';
import RetailOverviewDashboard from '@/components/retail/retail-overview-dashboard';
import POSSystem from '@/components/retail/pos-system';
import PrescriptionManagement from '@/components/retail/prescription-management';
import StaffScheduling from '@/components/retail/staff-scheduling';
import FinancialAnalytics from '@/components/retail/financial-analytics';
import ComplianceTracking from '@/components/retail/compliance-tracking';
import AnalyticsReporting from '@/components/retail/analytics-reporting';
import DynamicPricing from '@/components/retail/dynamic-pricing';
import CustomerService from '@/components/retail/customer-service';
import ProductCatalog from '@/components/retail/product-catalog';
import WorkflowAutomation from '@/components/retail/workflow-automation';
import QualityAssurance from '@/components/retail/quality-assurance';
import MultiLocationManagement from '@/components/retail/multi-location-management';
import ThirdPartyIntegrations from '@/components/retail/third-party-integrations';
import MobilePharmacyApp from '@/components/retail/mobile-pharmacy-app';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  status: 'active' | 'coming_soon' | 'beta';
  component?: React.ComponentType;
}

export default function RetailDashboard() {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState<string>('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminCode, setAdminCode] = useState('');

  // Mock data for retail KPIs
  const [kpis, setKpis] = useState({
    dailySales: 0,
    inventoryValue: 0,
    customerSatisfaction: 0,
    prescriptionCount: 0,
    staffEfficiency: 0,
    profitMargin: 0
  });

  const features: FeatureCard[] = React.useMemo(() => [
    {
      id: 'overview',
      title: 'Retail Pharmacy Overview',
      description: 'Comprehensive overview of all retail pharmacy operations',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'text-blue-600',
      status: 'active',
      component: RetailOverviewDashboard
    },
    {
      id: 'pos-system',
      title: 'Point of Sale System',
      description: 'Advanced POS with prescription management and payment processing',
      icon: <CreditCard className="w-8 h-8" />,
      color: 'text-green-600',
      status: 'active',
      component: POSSystem
    },
    {
      id: 'inventory-management',
      title: 'Smart Inventory Management',
      description: 'Real-time stock tracking and automated reordering',
      icon: <Package className="w-8 h-8" />,
      color: 'text-purple-600',
      status: 'active',
      component: InventoryManagement
    },
    {
      id: 'customer-management',
      title: 'Customer Relationship Management',
      description: 'Customer profiles, loyalty programs, and personalized service',
      icon: <Users className="w-8 h-8" />,
      color: 'text-indigo-600',
      status: 'active',
      component: CustomerManagement
    },
    {
      id: 'prescription-management',
      title: 'Prescription Management',
      description: 'Digital prescription processing and medication counseling',
      icon: <Pill className="w-8 h-8" />,
      color: 'text-cyan-600',
      status: 'active',
      component: PrescriptionManagement
    },
    {
      id: 'staff-scheduling',
      title: 'Staff Scheduling & Management',
      description: 'Optimized staff allocation and shift management',
      icon: <Calendar className="w-8 h-8" />,
      color: 'text-orange-600',
      status: 'active',
      component: StaffScheduling
    },
    {
      id: 'financial-analytics',
      title: 'Financial Analytics',
      description: 'Revenue tracking, profit analysis, and financial reporting',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'text-emerald-600',
      status: 'active',
      component: FinancialAnalytics
    },
    {
      id: 'supplier-management',
      title: 'Supplier Management',
      description: 'Vendor relationships, purchase orders, and contract management',
      icon: <Truck className="w-8 h-8" />,
      color: 'text-teal-600',
      status: 'active',
      component: SupplierManagement
    },
    {
      id: 'compliance-tracking',
      title: 'Regulatory Compliance',
      description: 'Pharmacy regulations, licensing, and audit management',
      icon: <Shield className="w-8 h-8" />,
      color: 'text-yellow-600',
      status: 'active',
      component: ComplianceTracking
    },
    {
      id: 'marketing-tools',
      title: 'Marketing & Promotions',
      description: 'Campaign management, loyalty programs, and customer engagement',
      icon: <Target className="w-8 h-8" />,
      color: 'text-pink-600',
      status: 'active',
      component: MarketingCampaigns
    },
    {
      id: 'reporting-dashboard',
      title: 'Analytics & Reporting',
      description: 'Comprehensive reporting and business intelligence',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'text-rose-600',
      status: 'active',
      component: AnalyticsReporting
    },
    {
      id: 'mobile-app',
      title: 'Mobile Pharmacy App',
      description: 'Mobile access for staff and customer self-service',
      icon: <Video className="w-8 h-8" />,
      color: 'text-violet-600',
      status: 'active'
    },
    {
      id: 'loyalty-program',
      title: 'Loyalty Program Management',
      description: 'Customer rewards, points tracking, and retention strategies',
      icon: <Gift className="w-8 h-8" />,
      color: 'text-amber-600',
      status: 'active',
      component: LoyaltyProgram
    },
    {
      id: 'price-optimization',
      title: 'Dynamic Pricing',
      description: 'AI-powered pricing optimization and competitive analysis',
      icon: <Tag className="w-8 h-8" />,
      color: 'text-lime-600',
      status: 'active',
      component: DynamicPricing
    },
    {
      id: 'customer-service',
      title: 'Customer Service Center',
      description: 'Multi-channel customer support and issue resolution',
      icon: <MessageSquare className="w-8 h-8" />,
      color: 'text-sky-600',
      status: 'active',
      component: CustomerService
    },
    {
      id: 'product-catalog',
      title: 'Product Catalog Management',
      description: 'Comprehensive product database and categorization',
      icon: <Package2 className="w-8 h-8" />,
      color: 'text-fuchsia-600',
      status: 'active',
      component: ProductCatalog
    },
    {
      id: 'workflow-automation',
      title: 'Workflow Automation',
      description: 'Automated processes and task management',
      icon: <Zap className="w-8 h-8" />,
      color: 'text-blue-500',
      status: 'active',
      component: WorkflowAutomation
    },
    {
      id: 'quality-control',
      title: 'Quality Assurance',
      description: 'Product quality monitoring and compliance tracking',
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'text-green-500',
      status: 'active',
      component: QualityAssurance
    },
    {
      id: 'multi-location',
      title: 'Multi-Location Management',
      description: 'Centralized management for multiple pharmacy locations',
      icon: <Store className="w-8 h-8" />,
      color: 'text-purple-500',
      status: 'active',
      component: MultiLocationManagement
    },
    {
      id: 'integration-hub',
      title: 'Third-Party Integrations',
      description: 'Connect with insurance, suppliers, and healthcare systems',
      icon: <Settings className="w-8 h-8" />,
      color: 'text-indigo-500',
      status: 'active',
      component: ThirdPartyIntegrations
    },
    {
      id: 'mobile-app',
      title: 'Mobile Pharmacy App',
      description: 'Mobile access for staff and customer self-service',
      icon: <Smartphone className="w-8 h-8" />,
      color: 'text-pink-500',
      status: 'active',
      component: MobilePharmacyApp
    }
  ], []);

  // Load mock data
  useEffect(() => {
    setKpis({
      dailySales: 12500,
      inventoryValue: 85000,
      customerSatisfaction: 4.8,
      prescriptionCount: 156,
      staffEfficiency: 92.5,
      profitMargin: 18.3
    });
  }, []);

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
      case 'active': return 'Active';
      case 'beta': return 'Beta';
      case 'coming_soon': return 'Coming Soon';
      default: return 'Unknown';
    }
  };

  const handleFeatureSwitch = (featureId: string) => {
    if (featureId === activeFeature) return;
    
    setIsLoading(true);
    setActiveFeature(featureId);
    
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleAdminClick = () => {
    router.push('/retail-admin');
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Retail Pharmacy Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Advanced retail pharmacy management with AI-powered insights, 
          customer engagement tools, and optimized operations.
        </p>
      </div>

      {/* Analytics Dashboard */}
      <RetailAnalyticsDashboard />

      {/* KPI Overview Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">${kpis.dailySales.toLocaleString()}</h3>
              <p className="text-gray-600">Daily Sales</p>
              <p className="text-xs text-gray-500 mt-1">Today's revenue</p>
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
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">${kpis.inventoryValue.toLocaleString()}</h3>
              <p className="text-gray-600">Inventory Value</p>
              <p className="text-xs text-gray-500 mt-1">Current stock value</p>
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
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{kpis.customerSatisfaction}/5</h3>
              <p className="text-gray-600">Customer Satisfaction</p>
              <p className="text-xs text-gray-500 mt-1">Average rating</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Pill className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{kpis.prescriptionCount}</h3>
              <p className="text-gray-600">Prescriptions Today</p>
              <p className="text-xs text-gray-500 mt-1">Processed prescriptions</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{kpis.staffEfficiency}%</h3>
              <p className="text-gray-600">Staff Efficiency</p>
              <p className="text-xs text-gray-500 mt-1">Performance score</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{kpis.profitMargin}%</h3>
              <p className="text-gray-600">Profit Margin</p>
              <p className="text-xs text-gray-500 mt-1">Current margin</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 20 Retail Features Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Retail Pharmacy Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.filter(f => f.id !== 'overview').map((feature, index) => (
            <motion.div
              key={`feature-${feature.id}-${index}`}
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

  const renderFeatureContent = () => {
    if (activeFeature === 'overview') {
      return renderOverview();
    }

    const feature = features.find(f => f.id === activeFeature);
    if (!feature) return null;

    // Render functional components for specific features
    if (activeFeature === 'inventory-management') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setActiveFeature('overview')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Button>
          </div>
          <InventoryManagement />
        </div>
      );
    }

    if (activeFeature === 'customer-management') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setActiveFeature('overview')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Button>
          </div>
          <CustomerManagement />
        </div>
      );
    }

    if (activeFeature === 'financial-analytics') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setActiveFeature('overview')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Button>
          </div>
          <SalesAnalytics />
        </div>
      );
    }

    if (activeFeature === 'product-catalog') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setActiveFeature('overview')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Button>
          </div>
          <ProductManagement />
        </div>
      );
    }

    if (activeFeature === 'pos-system') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setActiveFeature('overview')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Button>
          </div>
          <OrderManagement />
        </div>
      );
    }

    if (activeFeature === 'marketing-tools') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setActiveFeature('overview')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Button>
          </div>
          <MarketingCampaigns />
        </div>
      );
    }

    if (activeFeature === 'loyalty-program') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setActiveFeature('overview')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Button>
          </div>
          <LoyaltyProgram />
        </div>
      );
    }

    if (activeFeature === 'customer-service') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setActiveFeature('overview')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Button>
          </div>
          <CustomerService />
        </div>
      );
    }

    if (activeFeature === 'supplier-management') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setActiveFeature('overview')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Button>
          </div>
          <SupplierManagement />
        </div>
      );
    }

    if (activeFeature === 'price-optimization') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setActiveFeature('overview')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Button>
          </div>
          <PricingStrategy />
        </div>
      );
    }

    if (activeFeature === 'workflow-automation') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setActiveFeature('overview')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Button>
          </div>
          <WorkflowAutomation />
        </div>
      );
    }

    if (activeFeature === 'quality-control') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setActiveFeature('overview')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Button>
          </div>
          <QualityAssurance />
        </div>
      );
    }

    if (activeFeature === 'multi-location') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setActiveFeature('overview')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Button>
          </div>
          <MultiLocationManagement />
        </div>
      );
    }

    if (activeFeature === 'integration-hub') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setActiveFeature('overview')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Button>
          </div>
          <ThirdPartyIntegrations />
        </div>
      );
    }

    if (activeFeature === 'mobile-app') {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setActiveFeature('overview')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Button>
          </div>
          <MobilePharmacyApp />
        </div>
      );
    }

    // For other features, show placeholder
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => setActiveFeature('overview')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Overview</span>
          </Button>
          <div className={`p-3 rounded-lg ${feature.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
            <div className={feature.color}>
              {feature.icon}
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{feature.title}</h1>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title} - Coming Soon
              </h3>
              <p className="text-gray-600 mb-6">
                This feature is currently under development and will be available soon.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button>
                  <Bell className="w-4 h-4 mr-2" />
                  Notify Me
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading feature...</span>
      </div>
    );
  }

  return (
    <NextAuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-pink-50">
      {/* Cinematic Hero Header */}
      <motion.header 
        className="relative bg-gradient-to-br from-rose-600 via-pink-500 to-red-500 text-white rounded-xl mx-4 mt-4 p-8 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/8 rounded-full"
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-8 right-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <ShoppingCart className="w-6 h-6 text-white/20" />
          </motion.div>
          <motion.div 
            className="absolute bottom-8 left-8"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <Store className="w-5 h-5 text-white/15" />
          </motion.div>
          <motion.div 
            className="absolute top-1/3 left-8"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Star className="w-4 h-4 text-white/25" />
          </motion.div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleAdminClick}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin Panel
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push('/')}
                className="flex items-center space-x-2 text-white/90 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" aria-label="Refresh Data" className="text-white/90 hover:text-white hover:bg-white/10">
                <RefreshCw className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="heading-2 text-white flex items-center justify-center gap-3 mb-4">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ShoppingCart className="w-8 h-8" />
              </motion.div>
              Retail Dashboard
            </h1>
            <motion.p 
              className="body-large text-white/90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Complete pharmacy retail management system for inventory, sales, customer service, and business operations.
            </motion.p>
            <motion.div 
              className="mt-6 flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Badge className="bg-green-400/20 text-green-100 border-green-400/30">
                <motion.div 
                  className="w-2 h-2 bg-green-400 rounded-full mr-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                Live Sales
              </Badge>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {renderFeatureContent()}
      </motion.div>
    </div>
    </NextAuthGuard>
  );
}