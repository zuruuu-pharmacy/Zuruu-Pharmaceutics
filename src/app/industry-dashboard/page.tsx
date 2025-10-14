"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NextAuthGuard } from "@/components/auth/nextauth-guard";
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
  Award,
  Thermometer,
  Smartphone,
  QrCode,
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
  ExternalLink,
  School
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { ForecastChart } from '@/components/industry/forecast-chart';
import { BatchTimelineComponent } from '@/components/industry/batch-timeline';
import { RealTimeInventoryDashboard } from '@/components/industry/real-time-inventory-dashboard';
import { PredictiveDemandForecasting } from '@/components/industry/predictive-demand-forecasting';
import { AutoRestockRecommendations } from '@/components/industry/auto-restock-recommendations';
import { AutoRestockSimple } from '@/components/industry/auto-restock-simple';
import { BatchTraceVisualization } from '@/components/industry/batch-trace-visualization';
import { RecallManagerNotification } from '@/components/industry/recall-manager-notification';
import { SupplierScorecards } from '@/components/industry/supplier-scorecards';
import { AutomatedPurchaseOrders } from '@/components/industry/automated-purchase-orders';
import { ColdChainMonitoring } from '@/components/industry/cold-chain-monitoring';
import { RealTimeAlertsFeed } from '@/components/industry/real-time-alerts-feed';
import { ERPIntegrationsHub } from '@/components/industry/erp-integrations-hub';
import { SmartPickingOptimization } from '@/components/industry/smart-picking-optimization';
import { QualityControlDashboard } from '@/components/industry/quality-control-dashboard';
import { ComplianceAuditTrail } from '@/components/industry/compliance-audit-trail';
import { ScenarioSimulator } from '@/components/industry/scenario-simulator';
import { SKUPerformanceExplorer } from '@/components/industry/sku-performance-explorer';
import { WarehouseHeatmap } from '@/components/industry/warehouse-heatmap';
import { TrainingSimulationLab } from '@/components/industry/training-simulation-lab';
import { DocumentCertificateVault } from '@/components/industry/document-certificate-vault';
import { MobileOpsAssistant } from '@/components/industry/mobile-ops-assistant';
import { ReportsScheduledExports } from '@/components/industry/reports-scheduled-exports';
import { TestButtons } from '@/components/test-buttons';
import { industryDataService } from '@/services/industry-data-service';

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
  return (
    <NextAuthGuard>
      <IndustryDashboardContent />
    </NextAuthGuard>
  );
}

function IndustryDashboardContent() {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState<string>('overview');
  const [selectedSKU, setSelectedSKU] = useState<string | null>(null);
  const [forecastScenario, setForecastScenario] = useState<'7d' | '30d' | '90d'>('30d');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'OK' | 'Low Stock' | 'Recall'>('all');

  // Admin panel handler
  const handleAdminClick = () => {
    router.push('/industry-admin');
  };

  // Generate forecast data
  const generateForecastData = (scenario: '7d' | '30d' | '90d') => {
    const numDays = parseInt(scenario.replace('d', ''));
    const labels: string[] = [];
    const actual: number[] = [];
    const baseline: number[] = [];
    const optimistic: number[] = [];
    const pessimistic: number[] = [];

    // Generate historical data (last 30 days)
    for (let i = 29; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      labels.push(date.toISOString().split('T')[0]);
      const value = Math.floor(Math.random() * 50) + 100;
      actual.push(value);
      baseline.push(value);
      optimistic.push(value + Math.floor(Math.random() * 10));
      pessimistic.push(value - Math.floor(Math.random() * 10));
    }

    // Generate forecast data
    for (let i = 1; i <= numDays; i++) {
      const date = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
      labels.push(date.toISOString().split('T')[0]);
      actual.push(NaN);
      const baseValue = Math.floor(Math.random() * 50) + 100;
      baseline.push(baseValue);
      optimistic.push(baseValue + Math.floor(Math.random() * 15));
      pessimistic.push(baseValue - Math.floor(Math.random() * 15));
    }

    return { labels, actual, baseline, optimistic, pessimistic };
  };

  // Integration handlers
  const handleSAPConnect = () => {
    // Simulate SAP connection
    console.log('Connecting to SAP...');
    // In a real app, this would open a connection dialog or redirect to SAP OAuth
    alert('SAP Integration: Connection dialog would open here. This would connect to your SAP system for real-time data sync.');
  };

  const handleOracleConnect = () => {
    // Simulate Oracle connection
    console.log('Connecting to Oracle...');
    alert('Oracle ERP Integration: Connection dialog would open here. This would connect to your Oracle Cloud system.');
  };

  const handleDynamicsConnect = () => {
    // Simulate Microsoft Dynamics connection
    console.log('Connecting to Microsoft Dynamics...');
    alert('Microsoft Dynamics Integration: Connection dialog would open here. This would connect to your Dynamics 365 system.');
  };

  const handleCustomAPIConnect = () => {
    // Simulate Custom API connection
    console.log('Connecting to Custom API...');
    alert('Custom API Integration: API configuration dialog would open here. Enter your API endpoint and credentials.');
  };

  const handleDownloadSampleCSV = (integration: string) => {
    // Generate sample CSV data for different integrations
    let sampleData = '';
    let filename = '';
    
    switch (integration) {
      case 'sap':
        sampleData = generateSAPSampleCSV();
        filename = 'sap_integration_sample.csv';
        break;
      case 'oracle':
        sampleData = generateOracleSampleCSV();
        filename = 'oracle_integration_sample.csv';
        break;
      case 'dynamics':
        sampleData = generateDynamicsSampleCSV();
        filename = 'dynamics_integration_sample.csv';
        break;
      case 'custom':
        sampleData = generateCustomAPISampleCSV();
        filename = 'custom_api_sample.csv';
        break;
      default:
        sampleData = industryDataService.exportToCSV();
        filename = 'sample_data.csv';
    }
    
    const blob = new Blob([sampleData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Sample CSV generators for different integrations
  const generateSAPSampleCSV = () => {
    return [
      'Material_Number,Material_Description,Plant,Storage_Location,Unrestricted_Stock,Blocked_Stock,Quality_Stock',
      'MAT001,Paracetamol 500mg,1000,0001,1500,0,50',
      'MAT002,Ibuprofen 400mg,1000,0001,2300,100,75',
      'MAT003,Aspirin 100mg,1000,0002,800,0,25',
      'MAT004,Metformin 500mg,2000,0001,3200,200,100',
      'MAT005,Insulin Vial,2000,0002,150,0,10'
    ].join('\n');
  };

  const generateOracleSampleCSV = () => {
    return [
      'Item_Code,Item_Name,Organization,Subinventory,On_Hand,Reserved,Available',
      'ITEM001,Paracetamol 500mg,ORG001,MAIN,1500,0,1500',
      'ITEM002,Ibuprofen 400mg,ORG001,MAIN,2300,100,2200',
      'ITEM003,Aspirin 100mg,ORG001,COLD,800,0,800',
      'ITEM004,Metformin 500mg,ORG002,MAIN,3200,200,3000',
      'ITEM005,Insulin Vial,ORG002,COLD,150,0,150'
    ].join('\n');
  };

  const generateDynamicsSampleCSV = () => {
    return [
      'Item_Number,Item_Name,Location,Physical_Inventory,Reserved_Physical,Available_Physical',
      'P001,Paracetamol 500mg,WAREHOUSE1,1500,0,1500',
      'P002,Ibuprofen 400mg,WAREHOUSE1,2300,100,2200',
      'P003,Aspirin 100mg,WAREHOUSE2,800,0,800',
      'P004,Metformin 500mg,WAREHOUSE1,3200,200,3000',
      'P005,Insulin Vial,WAREHOUSE2,150,0,150'
    ].join('\n');
  };

  const generateCustomAPISampleCSV = () => {
    return [
      'sku_id,product_name,warehouse,quantity,status,last_updated,api_endpoint',
      'SKU-001,Paracetamol 500mg,WH-001,1500,active,2025-01-15T10:30:00Z,https://api.company.com/inventory',
      'SKU-002,Ibuprofen 400mg,WH-001,2300,active,2025-01-15T10:30:00Z,https://api.company.com/inventory',
      'SKU-003,Aspirin 100mg,WH-002,800,active,2025-01-15T10:30:00Z,https://api.company.com/inventory',
      'SKU-004,Metformin 500mg,WH-001,3200,active,2025-01-15T10:30:00Z,https://api.company.com/inventory',
      'SKU-005,Insulin Vial,WH-002,150,active,2025-01-15T10:30:00Z,https://api.company.com/inventory'
    ].join('\n');
  };

  // Get data from service (client-side only)
  const [kpis, setKpis] = useState({ predictedStockouts: 0, avgLeadTime: 0, batchTraceability: 0, totalInventoryValue: 0, criticalSKUs: 0, onTimeDelivery: 0 });
  const [allSkus, setAllSkus] = useState<any[]>([]);
  const [skus, setSkus] = useState<any[]>([]);
  const [forecastData, setForecastData] = useState<{
    labels: string[];
    actual: number[];
    baseline: number[];
    optimistic: number[];
    pessimistic: number[];
  }>({ labels: [], actual: [], baseline: [], optimistic: [], pessimistic: [] });

  // Load data on component mount
  useEffect(() => {
    try {
      const kpiData = industryDataService.getKPIData();
      const skuData = industryDataService.searchSKUs(searchTerm);
      const filteredSkus = filterStatus === 'all' ? skuData : skuData.filter(sku => {
        if (filterStatus === 'OK') return sku.flagStatus === 'OK';
        if (filterStatus === 'Low Stock') return sku.flagStatus === 'LOW_STOCK';
        if (filterStatus === 'Recall') return sku.flagStatus === 'RECALL';
        return true;
      });
      const forecast = generateForecastData(forecastScenario);
      
      setKpis(kpiData);
      setAllSkus(skuData);
      setSkus(filteredSkus);
      setForecastData(forecast);
    } catch (error) {
      console.error('Error loading industry data:', error);
    }
  }, [searchTerm, filterStatus, forecastScenario]);

  const features: FeatureCard[] = React.useMemo(() => [
    {
      id: 'overview',
      title: 'Dashboard Overview',
      description: 'Comprehensive overview of all industry operations',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'text-blue-600',
      status: 'active'
    },
    {
      id: 'real-time-inventory',
      title: 'Real-Time Inventory Dashboard',
      description: 'Live monitoring of stock levels, alerts, and movements',
      icon: <Package className="w-8 h-8" />,
      color: 'text-green-600',
      status: 'active',
      component: RealTimeInventoryDashboard
    },
    {
      id: 'predictive-forecasting',
      title: 'Predictive Demand Forecasting',
      description: 'AI-powered demand prediction with scenario planning',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'text-purple-600',
      status: 'active',
      component: PredictiveDemandForecasting
    },
    {
      id: 'auto-restock',
      title: 'Auto-Restock Recommendations',
      description: 'Intelligent restock recommendations with cost optimization',
      icon: <Zap className="w-8 h-8" />,
      color: 'text-orange-600',
      status: 'active',
      component: AutoRestockRecommendations
    },
    {
      id: 'batch-trace',
      title: 'Batch Trace & Visualization',
      description: 'Complete end-to-end batch tracking with real-time monitoring',
      icon: <Truck className="w-8 h-8" />,
      color: 'text-indigo-600',
      status: 'active',
      component: BatchTraceVisualization
    },
    {
      id: 'recall-manager',
      title: 'Recall Manager & Notification',
      description: 'Comprehensive recall management with automated notifications',
      icon: <AlertTriangle className="w-8 h-8" />,
      color: 'text-red-600',
      status: 'active',
      component: RecallManagerNotification
    },
    // Phase 2 Features
    {
      id: 'supplier-scorecards',
      title: 'Supplier Scorecards',
      description: 'Comprehensive supplier performance evaluation and risk assessment',
      icon: <Award className="w-8 h-8" />,
      color: 'text-purple-600',
      status: 'active',
      component: SupplierScorecards
    },
    {
      id: 'automated-purchase-orders',
      title: 'Automated Purchase Orders',
      description: 'AI-powered purchase order generation and management',
      icon: <FileText className="w-8 h-8" />,
      color: 'text-indigo-600',
      status: 'active',
      component: AutomatedPurchaseOrders
    },
    {
      id: 'cold-chain-monitoring',
      title: 'Cold-Chain Monitoring',
      description: 'Real-time temperature and humidity monitoring for sensitive products',
      icon: <Thermometer className="w-8 h-8" />,
      color: 'text-cyan-600',
      status: 'active',
      component: ColdChainMonitoring
    },
    {
      id: 'real-time-alerts',
      title: 'Real-Time Alerts Feed',
      description: 'Live monitoring of system alerts and notifications',
      icon: <Bell className="w-8 h-8" />,
      color: 'text-orange-600',
      status: 'active',
      component: RealTimeAlertsFeed
    },
    {
      id: 'erp-integrations',
      title: 'ERP Integrations Hub',
      description: 'Centralized management of all ERP system integrations',
      icon: <Settings className="w-8 h-8" />,
      color: 'text-indigo-600',
      status: 'active',
      component: ERPIntegrationsHub
    },
    {
      id: 'smart-picking',
      title: 'Smart Picking & Wave Optimization',
      description: 'AI-powered warehouse picking optimization and wave management',
      icon: <Target className="w-8 h-8" />,
      color: 'text-green-600',
      status: 'active',
      component: SmartPickingOptimization
    },
    {
      id: 'quality-control',
      title: 'Quality Control Dashboard',
      description: 'Comprehensive quality assurance and testing management',
      icon: <Shield className="w-8 h-8" />,
      color: 'text-blue-600',
      status: 'active',
      component: QualityControlDashboard
    },
    // Phase 3 Remaining Features
    {
      id: 'compliance-audit',
      title: 'Compliance & Audit Trail',
      description: 'Comprehensive audit logging and compliance monitoring',
      icon: <FileText className="w-8 h-8" />,
      color: 'text-purple-600',
      status: 'active',
      component: ComplianceAuditTrail
    },
    {
      id: 'scenario-simulator',
      title: 'Scenario Simulator',
      description: 'Test and analyze different business scenarios and their impact',
      icon: <Settings className="w-8 h-8" />,
      color: 'text-indigo-600',
      status: 'active',
      component: ScenarioSimulator
    },
    {
      id: 'sku-performance',
      title: 'SKU Performance Explorer',
      description: 'Comprehensive analysis of SKU performance and optimization opportunities',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'text-green-600',
      status: 'active',
      component: SKUPerformanceExplorer
    },
    // Phase 4 Features
    {
      id: 'warehouse-heatmap',
      title: 'Warehouse Heatmap',
      description: 'Real-time warehouse zone analysis and optimization',
      icon: <MapPin className="w-8 h-8" />,
      color: 'text-orange-600',
      status: 'active',
      component: WarehouseHeatmap
    },
    {
      id: 'training-simulation',
      title: 'Training & Simulation Lab',
      description: 'Interactive training modules and simulation environments',
      icon: <Users className="w-8 h-8" />,
      color: 'text-cyan-600',
      status: 'active',
      component: TrainingSimulationLab
    },
    {
      id: 'document-vault',
      title: 'Document & Certificate Vault',
      description: 'Secure storage and management of all regulatory documents and certificates',
      icon: <FileText className="w-8 h-8" />,
      color: 'text-teal-600',
      status: 'active',
      component: DocumentCertificateVault
    },
    {
      id: 'mobile-ops',
      title: 'Mobile Ops Assistant',
      description: 'Real-time mobile workforce management and task coordination',
      icon: <Smartphone className="w-8 h-8" />,
      color: 'text-pink-600',
      status: 'active',
      component: MobileOpsAssistant
    },
    {
      id: 'reports-exports',
      title: 'Reports & Scheduled Exports',
      description: 'Automated report generation and scheduled data exports',
      icon: <Download className="w-8 h-8" />,
      color: 'text-gray-600',
      status: 'active',
      component: ReportsScheduledExports
    }
  ], []);

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

      {/* KPI Overview Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
              <h3 className="text-3xl font-bold text-gray-900">{kpis.predictedStockouts}</h3>
              <p className="text-gray-600">Predicted Stockouts (7d)</p>
              <p className="text-xs text-gray-500 mt-1">SKUs at risk of stockout</p>
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
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{kpis.avgLeadTime}</h3>
              <p className="text-gray-600">Avg Lead Time</p>
              <p className="text-xs text-gray-500 mt-1">Days to restock</p>
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
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{kpis.batchTraceability}%</h3>
              <p className="text-gray-600">Batch Traceability</p>
              <p className="text-xs text-gray-500 mt-1">Coverage percentage</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Forecast Pane */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Demand Forecast</CardTitle>
              <p className="text-sm text-gray-600">Historical data and predictive analytics</p>
            </div>
            <div className="flex items-center space-x-2">
              <Tabs value={forecastScenario} onValueChange={(value: string) => setForecastScenario(value as '7d' | '30d' | '90d')}>
                <TabsList>
                  <TabsTrigger value="7d">7D</TabsTrigger>
                  <TabsTrigger value="30d">30D</TabsTrigger>
                  <TabsTrigger value="90d">90D</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ForecastChart data={forecastData} scenario={forecastScenario} />
          </div>
        </CardContent>
      </Card>

      {/* SKU & Batch Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>SKU Analytics</CardTitle>
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search SKUs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-1 border rounded-md text-sm"
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-3 py-1 border rounded-md text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="OK">OK</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Recall">Recall</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {skus.slice(0, 10).map((sku) => (
                <div
                  key={sku.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedSKU(sku.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{sku.id}</span>
                    <Badge 
                      className={
                        sku.flagStatus === 'OK' ? 'bg-green-100 text-green-600' :
                        sku.flagStatus === 'LOW_STOCK' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }
                    >
                      {sku.flagStatus === 'LOW_STOCK' ? 'Low Stock' : sku.flagStatus}
                    </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{sku.name}</p>
                    <p className="text-xs text-gray-500">
                      Stock: {sku.currentStock} | Lead: {sku.avgLeadTime}d | Trace: {sku.traceability}%
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
              ))}
                  </div>
                </CardContent>
              </Card>

        <Card>
          <CardHeader>
            <CardTitle>Batch Timeline</CardTitle>
            <p className="text-sm text-gray-600">Track batch movement and status</p>
          </CardHeader>
          <CardContent>
            {selectedSKU ? (
              <div className="h-96 overflow-y-auto">
                {(() => {
                  try {
                    return <BatchTimelineComponent 
                      batchMovement={industryDataService.generateBatchTimeline(selectedSKU)} 
                    />;
                  } catch (error) {
                    console.error('Error generating batch timeline:', error);
                    return <div className="p-4 text-red-500">Error loading batch timeline</div>;
                  }
                })()}
              </div>
            ) : (
              <div className="h-96 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Select a SKU to view batch timeline</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Auto-Restock Workflow */}
      <Card>
        <CardHeader>
          <CardTitle>Auto-Restock Workflow</CardTitle>
          <p className="text-sm text-gray-600">AI-powered restock recommendations and approval</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Step 1: Select SKUs</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {skus.slice(0, 5).map((sku) => (
                  <label key={sku.id} className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{sku.id} - {sku.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Step 2: Review Recommendations</h4>
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium">Recommended Quantity: 500 units</p>
                  <p className="text-xs text-gray-600">Based on demand forecast and lead time</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium">Estimated Cost: $12,500</p>
                  <p className="text-xs text-gray-600">Including shipping and handling</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Step 3: Approve & Queue</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Auto-approve future restocks</span>
                </label>
                <Button className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Queue Restock
                </Button>
                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview PO
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integrations & Export */}
      <Card>
        <CardHeader>
          <CardTitle>Integrations & Export</CardTitle>
          <p className="text-sm text-gray-600">Connect with ERP systems and export data</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { 
                name: 'SAP', 
                icon: <Building2 className="w-8 h-8" />, 
                color: 'bg-blue-100 text-blue-600',
                description: 'Enterprise Resource Planning',
                onConnect: () => handleSAPConnect(),
                onSample: () => handleDownloadSampleCSV('sap')
              },
              { 
                name: 'Oracle', 
                icon: <Database className="w-8 h-8" />, 
                color: 'bg-red-100 text-red-600',
                description: 'Cloud Enterprise Suite',
                onConnect: () => handleOracleConnect(),
                onSample: () => handleDownloadSampleCSV('oracle')
              },
              { 
                name: 'Microsoft Dynamics', 
                icon: <Settings className="w-8 h-8" />, 
                color: 'bg-green-100 text-green-600',
                description: 'Business Applications',
                onConnect: () => handleDynamicsConnect(),
                onSample: () => handleDownloadSampleCSV('dynamics')
              },
              { 
                name: 'Custom API', 
                icon: <Link className="w-8 h-8" />, 
                color: 'bg-purple-100 text-purple-600',
                description: 'RESTful API Integration',
                onConnect: () => handleCustomAPIConnect(),
                onSample: () => handleDownloadSampleCSV('custom')
              }
            ].map((integration, index) => (
        <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 border rounded-lg text-center hover:shadow-lg transition-all duration-200"
              >
                <div className={`w-12 h-12 ${integration.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  {integration.icon}
                </div>
                <h4 className="font-medium mb-1">{integration.name}</h4>
                <p className="text-xs text-gray-500 mb-3">{integration.description}</p>
                <div className="space-y-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={integration.onSample}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Sample CSV
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={integration.onConnect}
                  >
                    <Link className="w-3 h-3 mr-1" />
                    Connect
                  </Button>
                </div>
                    </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 20 New Features Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Industry Features</h2>
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
                onClick={() => feature.status === 'active' && setActiveFeature(feature.id)}
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

    // If feature has a component, render it
    if (feature.component) {
      const FeatureComponent = feature.component;
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
          <FeatureComponent />
        </div>
      );
    }

    // For coming soon features
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Cinematic Hero Header */}
      <motion.header 
        className="relative bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 text-white rounded-xl mx-4 mt-4 p-8 overflow-hidden"
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
            <Factory className="w-6 h-6 text-white/20" />
          </motion.div>
          <motion.div 
            className="absolute bottom-8 left-8"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <Building2 className="w-5 h-5 text-white/15" />
          </motion.div>
          <motion.div 
            className="absolute top-1/3 left-8"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Target className="w-4 h-4 text-white/25" />
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
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
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
                <Building2 className="w-8 h-8" />
              </motion.div>
              Industry Dashboard
            </h1>
            <motion.p 
              className="body-large text-white/90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Advanced pharmaceutical manufacturing intelligence for optimized production, quality control, and supply chain management.
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
                Live Production
              </Badge>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      {/* Test Buttons */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <TestButtons />
        <div className="mt-8">
          <AutoRestockSimple />
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        {renderFeatureContent()}
      </motion.div>
    </div>
  );
}