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
  Syringe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { PatientManagement } from '@/components/hospital/patient-management';
import { BedManagement } from '@/components/hospital/bed-management';
import { HospitalAnalyticsDashboard } from '@/components/hospital/hospital-analytics-dashboard';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  status: 'active' | 'coming_soon' | 'beta';
  component?: React.ComponentType;
}

export default function HospitalDashboard() {
  return (
    <NextAuthGuard>
      <HospitalDashboardContent />
    </NextAuthGuard>
  );
}

function HospitalDashboardContent() {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState<string>('overview');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for hospital KPIs
  const [kpis, setKpis] = useState({
    patientCapacity: 0,
    bedOccupancy: 0,
    avgWaitTime: 0,
    emergencyCases: 0,
    staffOnDuty: 0,
    equipmentUptime: 0
  });

  const features: FeatureCard[] = React.useMemo(() => [
    {
      id: 'overview',
      title: 'Hospital Overview',
      description: 'Comprehensive overview of all hospital operations',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'text-blue-600',
      status: 'active'
    },
    {
      id: 'patient-management',
      title: 'Patient Management System',
      description: 'Complete patient records, admissions, and discharge management',
      icon: <Users className="w-8 h-8" />,
      color: 'text-green-600',
      status: 'active'
    },
    {
      id: 'bed-management',
      title: 'Smart Bed Management',
      description: 'Real-time bed availability and allocation optimization',
      icon: <Target className="w-8 h-8" />,
      color: 'text-purple-600',
      status: 'active'
    },
    {
      id: 'emergency-response',
      title: 'Emergency Response System',
      description: 'Rapid emergency triage and resource allocation',
      icon: <AlertTriangle className="w-8 h-8" />,
      color: 'text-red-600',
      status: 'active'
    },
    {
      id: 'pharmacy-integration',
      title: 'Hospital Pharmacy Integration',
      description: 'Seamless medication management and dispensing',
      icon: <Pill className="w-8 h-8" />,
      color: 'text-indigo-600',
      status: 'active'
    },
    {
      id: 'lab-management',
      title: 'Laboratory Management',
      description: 'Test ordering, results tracking, and quality control',
      icon: <Microscope className="w-8 h-8" />,
      color: 'text-cyan-600',
      status: 'active'
    },
    {
      id: 'staff-scheduling',
      title: 'Staff Scheduling & Management',
      description: 'Optimized staff allocation and shift management',
      icon: <Calendar className="w-8 h-8" />,
      color: 'text-orange-600',
      status: 'active'
    },
    {
      id: 'equipment-monitoring',
      title: 'Medical Equipment Monitoring',
      description: 'Real-time equipment status and maintenance tracking',
      icon: <Stethoscope className="w-8 h-8" />,
      color: 'text-teal-600',
      status: 'active'
    },
    {
      id: 'infection-control',
      title: 'Infection Control & Prevention',
      description: 'Comprehensive infection monitoring and prevention protocols',
      icon: <Shield className="w-8 h-8" />,
      color: 'text-yellow-600',
      status: 'active'
    },
    {
      id: 'quality-assurance',
      title: 'Quality Assurance Dashboard',
      description: 'Patient safety metrics and quality improvement tracking',
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'text-emerald-600',
      status: 'active'
    },
    {
      id: 'financial-management',
      title: 'Financial Management',
      description: 'Revenue cycle management and cost optimization',
      icon: <DollarSign className="w-8 h-8" />,
      color: 'text-gray-600',
      status: 'active'
    },
    {
      id: 'telemedicine',
      title: 'Telemedicine Platform',
      description: 'Remote consultation and virtual care management',
      icon: <Video className="w-8 h-8" />,
      color: 'text-pink-600',
      status: 'active'
    },
    {
      id: 'supply-chain',
      title: 'Medical Supply Chain',
      description: 'Inventory management and supply optimization',
      icon: <Package className="w-8 h-8" />,
      color: 'text-violet-600',
      status: 'active'
    },
    {
      id: 'compliance',
      title: 'Regulatory Compliance',
      description: 'Healthcare regulations and accreditation management',
      icon: <FileText className="w-8 h-8" />,
      color: 'text-amber-600',
      status: 'active'
    },
    {
      id: 'analytics',
      title: 'Healthcare Analytics',
      description: 'Advanced analytics and predictive insights',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'text-rose-600',
      status: 'active'
    },
    {
      id: 'patient-safety',
      title: 'Patient Safety Monitoring',
      description: 'Real-time patient safety alerts and incident tracking',
      icon: <Heart className="w-8 h-8" />,
      color: 'text-red-500',
      status: 'active'
    },
    {
      id: 'workflow-optimization',
      title: 'Workflow Optimization',
      description: 'AI-powered workflow analysis and optimization',
      icon: <Zap className="w-8 h-8" />,
      color: 'text-blue-500',
      status: 'active'
    },
    {
      id: 'research-integration',
      title: 'Clinical Research Integration',
      description: 'Research protocol management and data collection',
      icon: <Clipboard className="w-8 h-8" />,
      color: 'text-green-500',
      status: 'active'
    },
    {
      id: 'mobile-app',
      title: 'Mobile Healthcare App',
      description: 'Mobile access for staff and patient management',
      icon: <Video className="w-8 h-8" />,
      color: 'text-purple-500',
      status: 'active'
    },
    {
      id: 'reports',
      title: 'Healthcare Reports',
      description: 'Comprehensive reporting and analytics dashboard',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'text-indigo-500',
      status: 'active'
    }
  ], []);

  // Load mock data
  useEffect(() => {
    setKpis({
      patientCapacity: 450,
      bedOccupancy: 87.5,
      avgWaitTime: 23,
      emergencyCases: 12,
      staffOnDuty: 156,
      equipmentUptime: 94.2
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
    router.push('/admin');
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Hospital Management Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive healthcare management with AI-powered insights, 
          real-time monitoring, and optimized patient care workflows.
        </p>
      </div>

      {/* Analytics Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <HospitalAnalyticsDashboard />
      </motion.div>

      {/* KPI Overview Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{kpis.patientCapacity}</h3>
              <p className="text-gray-600">Patient Capacity</p>
              <p className="text-xs text-gray-500 mt-1">Total beds available</p>
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
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{kpis.bedOccupancy}%</h3>
              <p className="text-gray-600">Bed Occupancy</p>
              <p className="text-xs text-gray-500 mt-1">Current utilization</p>
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
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{kpis.avgWaitTime}m</h3>
              <p className="text-gray-600">Avg Wait Time</p>
              <p className="text-xs text-gray-500 mt-1">Emergency department</p>
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
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{kpis.emergencyCases}</h3>
              <p className="text-gray-600">Emergency Cases</p>
              <p className="text-xs text-gray-500 mt-1">Active emergency patients</p>
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
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{kpis.staffOnDuty}</h3>
              <p className="text-gray-600">Staff On Duty</p>
              <p className="text-xs text-gray-500 mt-1">Currently working</p>
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
                <Stethoscope className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{kpis.equipmentUptime}%</h3>
              <p className="text-gray-600">Equipment Uptime</p>
              <p className="text-xs text-gray-500 mt-1">Medical equipment status</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Hospital Management Features Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Hospital Management Features</h2>
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
    if (activeFeature === 'patient-management') {
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
          <PatientManagement />
        </div>
      );
    }

    if (activeFeature === 'bed-management') {
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
          <BedManagement />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      {/* Cinematic Hero Header */}
      <motion.header 
        className="relative bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-600 text-white rounded-xl mx-4 mt-4 p-8 overflow-hidden"
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
            <Stethoscope className="w-6 h-6 text-white/20" />
          </motion.div>
          <motion.div 
            className="absolute bottom-8 left-8"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <Heart className="w-5 h-5 text-white/15" />
          </motion.div>
          <motion.div 
            className="absolute top-1/3 left-8"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield className="w-4 h-4 text-white/25" />
          </motion.div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
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
              <Button
                onClick={handleAdminClick}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin Panel
              </Button>
              <Badge className="bg-green-400/20 text-green-100 border-green-400/30">
                <motion.div 
                  className="w-2 h-2 bg-green-400 rounded-full mr-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                Live Operations
              </Badge>
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
                <Stethoscope className="w-8 h-8" />
              </motion.div>
              Hospital Dashboard
            </h1>
            <motion.p 
              className="body-large text-white/90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Comprehensive healthcare management system for patient care, medical operations, and hospital administration.
            </motion.p>
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
  );
}