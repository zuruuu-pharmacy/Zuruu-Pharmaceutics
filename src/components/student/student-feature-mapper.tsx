"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Library,
  TestTube,
  FlaskConical,
  Microscope,
  Shield,
  TrendingUp,
  Network,
  FileBarChart,
  Users,
  BookOpen,
  Database,
  GitBranch,
  Lock,
  Monitor,
  Smartphone,
  FileImage,
  PieChart
} from 'lucide-react';

interface AcademicComponent {
  name: string;
  path: string;
  icon: React.ComponentType<any>;
  description: string;
  studentFeatures: string[];
}

interface StudentFeatureMapperProps {
  onNavigateToComponent: (componentPath: string) => void;
}

export function StudentFeatureMapper({ onNavigateToComponent }: StudentFeatureMapperProps) {
  const academicComponents: AcademicComponent[] = [
    {
      name: "Digital Library System",
      path: "/components/academia/digital-library-system",
      icon: Library,
      description: "Comprehensive digital library with search and organization",
      studentFeatures: ["AI E-Library", "Lecture Notes Library", "Reference Citation Tool"]
    },
    {
      name: "Laboratory Management",
      path: "/components/academia/laboratory-management",
      icon: TestTube,
      description: "Virtual lab simulations and management tools",
      studentFeatures: ["Virtual Lab Simulator", "Drug Analysis", "Quality Control"]
    },
    {
      name: "Research Portal",
      path: "/components/academic/research-portal",
      icon: FlaskConical,
      description: "Research tools and collaboration platform",
      studentFeatures: ["Drug Interaction Simulator", "MOA Animation Library", "Herbal Knowledge Hub"]
    },
    {
      name: "Virtual Labs",
      path: "/components/academic/virtual-labs",
      icon: Microscope,
      description: "Advanced virtual laboratory simulations",
      studentFeatures: ["Virtual Lab Simulator", "Pathology", "Drug Classification Tree"]
    },
    {
      name: "Research Compliance",
      path: "/components/academic/research-compliance",
      icon: Shield,
      description: "Compliance and ethics management",
      studentFeatures: ["SOP Repository", "Plagiarism Checker", "Ethics Training"]
    },
    {
      name: "Academic Analytics Dashboard",
      path: "/components/academic/academic-analytics-dashboard",
      icon: TrendingUp,
      description: "Performance analytics and insights",
      studentFeatures: ["Analytics Dashboard", "Progress Tracking", "Performance Metrics"]
    },
    {
      name: "Research Collaboration",
      path: "/components/academic/research-collaboration",
      icon: Network,
      description: "Collaborative research tools",
      studentFeatures: ["Student Discussion Forum", "Study Groups", "Peer Learning"]
    },
    {
      name: "Assessment Evaluation",
      path: "/components/academic/assessment-evaluation",
      icon: FileBarChart,
      description: "Assessment and evaluation tools",
      studentFeatures: ["MCQ Bank", "OSCE Preparation", "Practice Tests"]
    },
    {
      name: "Alumni Network",
      path: "/components/academic/alumni-network",
      icon: Users,
      description: "Alumni networking and mentorship",
      studentFeatures: ["Career Guidance", "Mentorship", "Professional Network"]
    },
    {
      name: "Curriculum Management",
      path: "/components/academic/curriculum-management",
      icon: BookOpen,
      description: "Course and curriculum management",
      studentFeatures: ["Course Materials", "Study Planner", "Syllabus Access"]
    },
    {
      name: "Data Management",
      path: "/components/academic/data-management",
      icon: Database,
      description: "Data storage and management systems",
      studentFeatures: ["My Health History", "Personal Data", "Study Records"]
    },
    {
      name: "Grant Management",
      path: "/components/academic/grant-management",
      icon: GitBranch,
      description: "Grant and funding management",
      studentFeatures: ["Research Funding", "Project Management", "Resource Allocation"]
    },
    {
      name: "Ethics Compliance",
      path: "/components/academic/ethics-compliance",
      icon: Lock,
      description: "Ethics and compliance training",
      studentFeatures: ["Ethics Training", "Compliance Checker", "Professional Standards"]
    },
    {
      name: "Faculty Portal",
      path: "/components/academic/faculty-portal",
      icon: Monitor,
      description: "Faculty management and resources",
      studentFeatures: ["Faculty Resources", "Office Hours", "Academic Support"]
    },
    {
      name: "Mobile Learning",
      path: "/components/academic/mobile-learning",
      icon: Smartphone,
      description: "Mobile learning and accessibility",
      studentFeatures: ["Offline Mode", "Mobile Access", "Text-to-Speech"]
    },
    {
      name: "Publication Tracking",
      path: "/components/academic/publication-tracking",
      icon: FileImage,
      description: "Publication and research tracking",
      studentFeatures: ["Research Papers", "Citation Tracking", "Publication Metrics"]
    },
    {
      name: "Research Analytics",
      path: "/components/academic/research-analytics",
      icon: PieChart,
      description: "Research analytics and insights",
      studentFeatures: ["Research Analytics", "Data Visualization", "Trend Analysis"]
    }
  ];

  const getStudentFeaturesByCategory = () => {
    const categories = {
      "Learning Tools": [
        "Smart Search", "AI Assistant Helper", "Drug Calculation Tool", "Unit Converter",
        "Flashcard Generator", "MCQ Bank", "Mnemonic Generator", "Text-to-Speech"
      ],
      "Study Materials": [
        "Lecture Notes Library", "Notes Organizer", "AI E-Library", "MOA Animation Library",
        "Drug Classification Tree", "Herbal Knowledge Hub", "Offline Mode"
      ],
      "Practice & Assessment": [
        "Patient Cases", "Clinical Case Simulator", "OSCE Preparation", "Virtual Lab Simulator",
        "Drug Interaction Simulator", "Case Studies", "Practice Tests"
      ],
      "Communication & Collaboration": [
        "Student Discussion Forum", "Polls & Surveys", "Study Groups", "Peer Learning"
      ],
      "Personal Management": [
        "My Health History", "AI Study Planner", "Analytics Dashboard", "Progress Tracking"
      ],
      "Career & Professional": [
        "Career Guidance", "SOP Repository", "Citation Tool", "Plagiarism Checker"
      ],
      "Advanced Features": [
        "AR Medicine Scanner", "Pathology", "Research Tools", "Professional Development"
      ]
    };
    return categories;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Component Mapping</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connect existing academic components to student features for a comprehensive learning experience
        </p>
      </div>

      {/* Academic Components Grid */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-900">Available Academic Components</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {academicComponents.map((component, index) => (
            <motion.div
              key={component.name}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <component.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{component.name}</h4>
                  <p className="text-sm text-gray-600">{component.description}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-700">Connected Student Features:</h5>
                <div className="flex flex-wrap gap-1">
                  {component.studentFeatures.map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => onNavigateToComponent(component.path)}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Connect Component
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Student Features by Category */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-900">Student Features by Category</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(getStudentFeaturesByCategory()).map(([category, features]) => (
            <div key={category} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">{category}</h4>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Status */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Integration Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">32+</div>
            <div className="text-sm text-gray-600">Student Features</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">17</div>
            <div className="text-sm text-gray-600">Academic Components</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">100%</div>
            <div className="text-sm text-gray-600">Integration Coverage</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentFeatureMapper;
