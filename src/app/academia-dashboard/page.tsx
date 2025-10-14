"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  MessageSquare,
  BookOpen,
  GraduationCap,
  Lightbulb,
  TestTube,
  Beaker,
  Atom,
  Dna,
  Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { AcademicAnalyticsDashboard } from '@/components/academic/academic-analytics-dashboard';
import StudentManagement from '@/components/academia/student-management';
import ResearchPortal from '@/components/academic/research-portal';
import ResearchAnalytics from '@/components/academic/research-analytics';
import ResearchCollaboration from '@/components/academic/research-collaboration';
import CurriculumManagement from '@/components/academic/curriculum-management';
import GrantManagement from '@/components/academic/grant-management';
import LabManagement from '@/components/academic/lab-management';
import PublicationTracking from '@/components/academic/publication-tracking';
import EthicsCompliance from '@/components/academic/ethics-compliance';
import InnovationHub from '@/components/academic/innovation-hub';
import ResearchCompliance from '@/components/academic/research-compliance';
import DataManagement from '@/components/academic/data-management';
import VirtualLabs from '@/components/academic/virtual-labs';
import AlumniNetwork from '@/components/academic/alumni-network';
import MobileLearning from '@/components/academic/mobile-learning';
import FacultyPortal from '@/components/academic/faculty-portal';
import AssessmentEvaluation from '@/components/academic/assessment-evaluation';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  status: 'active' | 'coming_soon' | 'beta';
  component?: React.ComponentType;
}

export default function AcademiaDashboard() {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState<string>('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminCode, setAdminCode] = useState('');

  // Mock data for academia KPIs
  const [kpis, setKpis] = useState({
    activeStudents: 0,
    researchProjects: 0,
    publications: 0,
    facultyMembers: 0,
    labUtilization: 0,
    grantFunding: 0
  });

  const features: FeatureCard[] = React.useMemo(() => [
    {
      id: 'overview',
      title: 'Academia & R&D Overview',
      description: 'Comprehensive overview of all academic and research operations',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'text-blue-600',
      status: 'active'
    },
    {
      id: 'student-management',
      title: 'Student Management System',
      description: 'Complete student records, enrollment, and academic progress tracking',
      icon: <GraduationCap className="w-8 h-8" />,
      color: 'text-green-600',
      status: 'active'
    },
    {
      id: 'research-portal',
      title: 'Research Portal',
      description: 'Research project management and collaboration platform',
      icon: <Microscope className="w-8 h-8" />,
      color: 'text-purple-600',
      status: 'active'
    },
    {
      id: 'curriculum-management',
      title: 'Curriculum Management',
      description: 'Course design, scheduling, and content delivery system',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'text-indigo-600',
      status: 'active'
    },
    {
      id: 'lab-management',
      title: 'Laboratory Management',
      description: 'Lab scheduling, equipment tracking, and safety protocols',
      icon: <TestTube className="w-8 h-8" />,
      color: 'text-cyan-600',
      status: 'active'
    },
    {
      id: 'faculty-portal',
      title: 'Faculty Portal',
      description: 'Faculty resources, research tools, and collaboration features',
      icon: <Users className="w-8 h-8" />,
      color: 'text-orange-600',
      status: 'active'
    },
    {
      id: 'assessment-tools',
      title: 'Assessment & Evaluation',
      description: 'Digital assessment tools and performance analytics',
      icon: <Clipboard className="w-8 h-8" />,
      color: 'text-emerald-600',
      status: 'active'
    },
    {
      id: 'library-system',
      title: 'Digital Library System',
      description: 'E-resources, journals, and knowledge management',
      icon: <FileText className="w-8 h-8" />,
      color: 'text-teal-600',
      status: 'active'
    },
    {
      id: 'collaboration-tools',
      title: 'Collaboration Platform',
      description: 'Virtual classrooms, discussion forums, and group projects',
      icon: <MessageSquare className="w-8 h-8" />,
      color: 'text-yellow-600',
      status: 'active'
    },
    {
      id: 'research-analytics',
      title: 'Research Analytics',
      description: 'Publication tracking, citation analysis, and impact metrics',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'text-pink-600',
      status: 'active'
    },
    {
      id: 'grant-management',
      title: 'Grant Management',
      description: 'Funding applications, budget tracking, and compliance',
      icon: <DollarSign className="w-8 h-8" />,
      color: 'text-rose-600',
      status: 'active'
    },
    {
      id: 'conference-management',
      title: 'Conference Management',
      description: 'Event planning, abstract submission, and attendee management',
      icon: <Calendar className="w-8 h-8" />,
      color: 'text-violet-600',
      status: 'active'
    },
    {
      id: 'peer-review',
      title: 'Peer Review System',
      description: 'Manuscript review, feedback management, and publication workflow',
      icon: <Eye className="w-8 h-8" />,
      color: 'text-amber-600',
      status: 'active'
    },
    {
      id: 'innovation-hub',
      title: 'Innovation Hub',
      description: 'Ideation platform, patent tracking, and technology transfer',
      icon: <Lightbulb className="w-8 h-8" />,
      color: 'text-lime-600',
      status: 'active'
    },
    {
      id: 'compliance-tracking',
      title: 'Research Compliance',
      description: 'Ethics approval, regulatory compliance, and audit trails',
      icon: <Shield className="w-8 h-8" />,
      color: 'text-sky-600',
      status: 'active'
    },
    {
      id: 'data-management',
      title: 'Research Data Management',
      description: 'Data collection, storage, and sharing protocols',
      icon: <FileText className="w-8 h-8" />,
      color: 'text-fuchsia-600',
      status: 'active'
    },
    {
      id: 'virtual-labs',
      title: 'Virtual Laboratory',
      description: 'Simulated experiments and virtual reality learning',
      icon: <Beaker className="w-8 h-8" />,
      color: 'text-blue-500',
      status: 'active'
    },
    {
      id: 'alumni-network',
      title: 'Alumni Network',
      description: 'Alumni engagement, mentorship, and career development',
      icon: <Star className="w-8 h-8" />,
      color: 'text-green-500',
      status: 'active'
    },
    {
      id: 'mobile-learning',
      title: 'Mobile Learning Platform',
      description: 'Mobile access to courses, resources, and collaboration tools',
      icon: <Video className="w-8 h-8" />,
      color: 'text-purple-500',
      status: 'active'
    },
    {
      id: 'analytics-dashboard',
      title: 'Academic Analytics',
      description: 'Institutional performance metrics and predictive analytics',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'text-indigo-500',
      status: 'active'
    }
  ], []);

  // Load mock data
  useEffect(() => {
    setKpis({
      activeStudents: 2847,
      researchProjects: 156,
      publications: 89,
      facultyMembers: 127,
      labUtilization: 78.5,
      grantFunding: 2.3
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
    router.push('/academic-admin');
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Academia & R&D Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Advanced academic and research management with AI-powered insights, 
          collaborative tools, and innovative learning platforms.
        </p>
      </div>

      {/* Analytics Dashboard */}
      <AcademicAnalyticsDashboard />

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
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{kpis.activeStudents.toLocaleString()}</h3>
              <p className="text-gray-600">Active Students</p>
              <p className="text-xs text-gray-500 mt-1">Currently enrolled</p>
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
                <Microscope className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{kpis.researchProjects}</h3>
              <p className="text-gray-600">Research Projects</p>
              <p className="text-xs text-gray-500 mt-1">Active research initiatives</p>
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
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{kpis.publications}</h3>
              <p className="text-gray-600">Publications</p>
              <p className="text-xs text-gray-500 mt-1">This year's publications</p>
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
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{kpis.facultyMembers}</h3>
              <p className="text-gray-600">Faculty Members</p>
              <p className="text-xs text-gray-500 mt-1">Teaching and research staff</p>
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
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TestTube className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{kpis.labUtilization}%</h3>
              <p className="text-gray-600">Lab Utilization</p>
              <p className="text-xs text-gray-500 mt-1">Laboratory capacity usage</p>
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
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">${kpis.grantFunding}M</h3>
              <p className="text-gray-600">Grant Funding</p>
              <p className="text-xs text-gray-500 mt-1">Research funding secured</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 20 Academia Features Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Academia & R&D Features</h2>
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
    if (activeFeature === 'student-management') {
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
          <StudentManagement />
        </div>
      );
    }

    if (activeFeature === 'research-portal') {
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
          <ResearchPortal />
        </div>
      );
    }

    if (activeFeature === 'curriculum-management') {
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
          <CurriculumManagement />
        </div>
      );
    }

    if (activeFeature === 'grant-management') {
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
          <GrantManagement />
        </div>
      );
    }

    if (activeFeature === 'lab-management') {
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
          <LabManagement />
        </div>
      );
    }

    if (activeFeature === 'publication-tracking') {
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
          <PublicationTracking />
        </div>
      );
    }

    if (activeFeature === 'ethics-compliance') {
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
          <EthicsCompliance />
        </div>
      );
    }

    if (activeFeature === 'innovation-hub') {
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
          <InnovationHub />
        </div>
      );
    }

    if (activeFeature === 'compliance-tracking') {
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
          <ResearchCompliance />
        </div>
      );
    }

    if (activeFeature === 'data-management') {
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
          <DataManagement />
        </div>
      );
    }

    if (activeFeature === 'virtual-labs') {
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
          <VirtualLabs />
        </div>
      );
    }

    if (activeFeature === 'alumni-network') {
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
          <AlumniNetwork />
        </div>
      );
    }

    if (activeFeature === 'mobile-learning') {
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
          <MobileLearning />
        </div>
      );
    }

    if (activeFeature === 'faculty-portal') {
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
          <FacultyPortal />
        </div>
      );
    }

    if (activeFeature === 'assessment-tools') {
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
          <AssessmentEvaluation />
        </div>
      );
    }

    if (activeFeature === 'analytics-dashboard') {
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
          <AcademicAnalyticsDashboard />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-yellow-50">
      {/* Cinematic Hero Header */}
      <motion.header 
        className="relative bg-gradient-to-br from-amber-600 via-orange-500 to-yellow-500 text-white rounded-xl mx-4 mt-4 p-8 overflow-hidden"
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
            <BookOpen className="w-6 h-6 text-white/20" />
          </motion.div>
          <motion.div 
            className="absolute bottom-8 left-8"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <GraduationCap className="w-5 h-5 text-white/15" />
          </motion.div>
          <motion.div 
            className="absolute top-1/3 left-8"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Lightbulb className="w-4 h-4 text-white/25" />
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
                <BookOpen className="w-8 h-8" />
              </motion.div>
              Academia & R&D Dashboard
            </h1>
            <motion.p 
              className="body-large text-white/90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Advanced educational and research platform for pharmaceutical studies, clinical training, and academic excellence.
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
                Live Learning
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
  );
}