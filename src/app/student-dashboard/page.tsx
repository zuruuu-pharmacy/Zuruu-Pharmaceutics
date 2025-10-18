"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, 
  Users, 
  FileText, 
  Award, 
  Search, 
  Plus, 
  BarChart3, 
  Clock, 
  Target, 
  Heart,
  Activity,
  TrendingUp,
  Calendar,
  Bell,
  Settings,
  LogOut,
  User,
  Stethoscope,
  ClipboardList,
  TestTube,
  Calculator,
  Brain,
  GraduationCap,
  BookMarked,
  PlayCircle,
  CheckCircle,
  Star,
  Zap,
  Lightbulb,
  Trophy,
  Book,
  Video,
  FileCheck,
  PenTool,
  MessageSquare,
  Camera,
  BarChart,
  ClipboardCheck,
  Microscope,
  Briefcase,
  Library,
  Notebook,
  FileSearch,
  Play,
  TreePine,
  Calendar as CalendarIcon,
  Leaf,
  CreditCard,
  HelpCircle,
  FileBarChart,
  Gamepad2,
  Lightbulb as Bulb,
  Quote,
  CheckSquare,
  WifiOff,
  Volume2,
  Database,
  Network,
  FlaskConical,
  Shield,
  TrendingUp as Trending,
  Globe,
  Smartphone,
  FileImage,
  PieChart,
  GitBranch,
  Lock,
  Monitor,
  Download
} from 'lucide-react';

export default function StudentDashboard() {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState<string>('overview');
  const [isLoading, setIsLoading] = useState(false);

  const handleFeatureClick = (feature: string) => {
    setIsLoading(true);
    setActiveFeature(feature);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Courses Enrolled</p>
                    <p className="text-3xl font-bold text-blue-600">12</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">+2 this semester</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Assignments Due</p>
                    <p className="text-3xl font-bold text-orange-600">5</p>
                  </div>
                  <FileText className="w-8 h-8 text-orange-500" />
                </div>
                <p className="text-xs text-red-600 mt-2">3 due this week</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">GPA</p>
                    <p className="text-3xl font-bold text-green-600">3.8</p>
                  </div>
                  <Award className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">+0.2 this semester</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Study Hours</p>
                    <p className="text-3xl font-bold text-purple-600">42</p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">This week</p>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Completed: Pharmacology Quiz</p>
                    <p className="text-sm text-gray-600">Score: 95% - 2 hours ago</p>
                  </div>
                  <span className="text-xs text-gray-500">2h ago</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Started: Clinical Pharmacy Module</p>
                    <p className="text-sm text-gray-600">Progress: 25% complete</p>
                  </div>
                  <span className="text-xs text-gray-500">4h ago</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg">
                  <Bell className="w-5 h-5 text-orange-500" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Reminder: Lab Report Due</p>
                    <p className="text-sm text-gray-600">Due: Tomorrow at 11:59 PM</p>
                  </div>
                  <span className="text-xs text-gray-500">6h ago</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'courses':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 inline mr-2" />
                Enroll in Course
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Semester</h3>
                <div className="space-y-3">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Pharmacology I</p>
                        <p className="text-sm text-gray-600">Dr. Sarah Johnson</p>
                        <p className="text-xs text-gray-500">Credits: 3 | Grade: A-</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">75% Complete</p>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Clinical Pharmacy</p>
                        <p className="text-sm text-gray-600">Dr. Michael Chen</p>
                        <p className="text-xs text-gray-500">Credits: 4 | Grade: B+</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">60% Complete</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Assignments</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Drug Interaction Report</p>
                        <p className="text-sm text-gray-600">Pharmacology I</p>
                        <p className="text-xs text-gray-500">Due: Dec 15, 2024</p>
                      </div>
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Due Soon</span>
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Clinical Case Study</p>
                        <p className="text-sm text-gray-600">Clinical Pharmacy</p>
                        <p className="text-xs text-gray-500">Due: Dec 20, 2024</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">In Progress</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'study':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Study Materials</h2>
              <div className="flex space-x-3">
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <Search className="w-4 h-4 inline mr-2" />
                  Search Materials
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Material
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Materials</h3>
                <div className="space-y-3">
                  <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Book className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Pharmacology Textbook - Chapter 5</p>
                        <p className="text-sm text-gray-600">Cardiovascular Drugs</p>
                        <p className="text-xs text-gray-500">Last accessed: 2 hours ago</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">25 pages</p>
                        <p className="text-xs text-gray-500">Progress: 60%</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Video className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Lecture Video: Drug Interactions</p>
                        <p className="text-sm text-gray-600">Dr. Sarah Johnson</p>
                        <p className="text-xs text-gray-500">Duration: 45 minutes</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">Watched</p>
                        <p className="text-xs text-gray-500">100%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Tools</h3>
                <div className="space-y-3">
                  <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Brain className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-gray-900">Flashcards</span>
                    </div>
                  </button>
                  <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <PenTool className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-gray-900">Practice Tests</span>
                    </div>
                  </button>
                  <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <BookMarked className="w-5 h-5 text-purple-500" />
                      <span className="font-medium text-gray-900">Study Notes</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'grades':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Grades & Progress</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <BarChart3 className="w-4 h-4 inline mr-2" />
                View Detailed Report
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Grades</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">Pharmacology I</p>
                        <p className="text-sm text-gray-600">Dr. Sarah Johnson</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">A-</p>
                        <p className="text-xs text-gray-500">92%</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">Clinical Pharmacy</p>
                        <p className="text-sm text-gray-600">Dr. Michael Chen</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">B+</p>
                        <p className="text-xs text-gray-500">87%</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">Pharmaceutical Chemistry</p>
                        <p className="text-sm text-gray-600">Dr. Emily Davis</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">A</p>
                        <p className="text-xs text-gray-500">95%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">GPA Progress</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">3.8</div>
                    <p className="text-gray-600">Current GPA</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Semester 1</span>
                      <span>3.6</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Semester 2</span>
                      <span>3.7</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Current</span>
                      <span>3.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'resources':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Learning Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <BookOpen className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Digital Library</h3>
                <p className="text-gray-600 text-sm">Access thousands of pharmaceutical journals, textbooks, and research papers.</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Video className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Lectures</h3>
                <p className="text-gray-600 text-sm">Watch recorded lectures from top pharmaceutical professors and industry experts.</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Calculator className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Practice Problems</h3>
                <p className="text-gray-600 text-sm">Solve pharmaceutical calculations and case studies with instant feedback.</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Users className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Study Groups</h3>
                <p className="text-gray-600 text-sm">Join virtual study groups and collaborate with fellow pharmacy students.</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Trophy className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Achievements</h3>
                <p className="text-gray-600 text-sm">Track your learning milestones and earn badges for completed modules.</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Lightbulb className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Study Tips</h3>
                <p className="text-gray-600 text-sm">Get personalized study recommendations and exam preparation strategies.</p>
              </motion.div>
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Academic Calendar</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4 inline mr-2" />
                Add Event
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Midterm Exam - Pharmacology</p>
                        <p className="text-sm text-gray-600">Dec 18, 2024 at 10:00 AM</p>
                        <p className="text-xs text-gray-500">Room 201</p>
                      </div>
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Exam</span>
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Lab Session - Drug Analysis</p>
                        <p className="text-sm text-gray-600">Dec 20, 2024 at 2:00 PM</p>
                        <p className="text-xs text-gray-500">Lab 3</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Lab</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Dates</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Assignment Due: Drug Report</p>
                        <p className="text-sm text-gray-600">Dec 15, 2024</p>
                      </div>
                      <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Due Soon</span>
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Semester Break</p>
                        <p className="text-sm text-gray-600">Dec 23 - Jan 6, 2025</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Break</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // Student Features Content
      case 'smart-search':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Search className="w-8 h-8 text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Smart Search</h2>
                <p className="text-gray-600">AI-powered search for medical terms and concepts</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for drugs, diseases, mechanisms, or any medical term..."
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Recent Searches</h4>
                    <div className="space-y-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2">Metformin</span>
                      <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mr-2">Diabetes</span>
                      <span className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full mr-2">CYP3A4</span>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">AI Suggestions</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">• Drug interactions</p>
                      <p className="text-sm text-gray-600">• Mechanism of action</p>
                      <p className="text-sm text-gray-600">• Side effects</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ai-assistant':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Zap className="w-8 h-8 text-yellow-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">AI Assistant Helper</h2>
                <p className="text-gray-600">Intelligent AI tutor for pharmacy questions</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">AI Tutor Active</h3>
                    <p className="text-sm text-gray-600">Ask me anything about pharmacy!</p>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Quick Questions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                      <p className="font-medium text-gray-900">What is the mechanism of Metformin?</p>
                    </button>
                    <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                      <p className="font-medium text-gray-900">How do ACE inhibitors work?</p>
                    </button>
                    <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                      <p className="font-medium text-gray-900">Explain drug-drug interactions</p>
                    </button>
                    <button className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                      <p className="font-medium text-gray-900">What are the side effects of statins?</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'health-history':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Heart className="w-8 h-8 text-red-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">My Health History</h2>
                <p className="text-gray-600">Track personal health information</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Medications</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Metformin 500mg</p>
                        <p className="text-sm text-gray-600">Twice daily with meals</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Blood Pressure</span>
                    <span className="font-medium">120/80 mmHg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Blood Sugar</span>
                    <span className="font-medium">95 mg/dL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight</span>
                    <span className="font-medium">70 kg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'patient-cases':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <ClipboardCheck className="w-8 h-8 text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Patient Cases</h2>
                <p className="text-gray-600">Study real patient cases and scenarios</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Studies</h3>
                <div className="space-y-3">
                  <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">Diabetes Management</h4>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Beginner</span>
                    </div>
                    <p className="text-sm text-gray-600">Patient with Type 2 diabetes and hypertension</p>
                    <p className="text-xs text-gray-500 mt-1">Case ID: #DC-001</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">Drug Interactions</h4>
                      <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Intermediate</span>
                    </div>
                    <p className="text-sm text-gray-600">Multiple medications causing interactions</p>
                    <p className="text-xs text-gray-500 mt-1">Case ID: #DI-002</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Practice</h3>
                <div className="space-y-3">
                  <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-blue-50">
                    <div className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-gray-900">Start New Case</span>
                    </div>
                  </button>
                  <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-green-50">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-gray-900">Review Completed Cases</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ar-scanner':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Camera className="w-8 h-8 text-purple-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">AR Medicine Scanner</h2>
                <p className="text-gray-600">Use augmented reality to identify medicines</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="text-center">
                <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-16 h-16 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Camera Ready</h3>
                <p className="text-gray-600 mb-6">Point your camera at any medicine to identify it instantly</p>
                <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                  Start Scanning
                </button>
              </div>
            </div>
          </div>
        );

      case 'discussion-forum':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-8 h-8 text-green-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Student Discussion Forum</h2>
                <p className="text-gray-600">Connect with fellow pharmacy students</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Discussions</h3>
                <div className="space-y-3">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900">Pharmacology Exam Tips</h4>
                    <p className="text-sm text-gray-600 mt-1">Posted by Sarah M. • 2 hours ago</p>
                    <p className="text-sm text-gray-500 mt-2">Any tips for the upcoming pharmacology exam?</p>
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                      <span>💬 12 replies</span>
                      <span>👍 8 likes</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Start Discussion</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Discussion title..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <textarea
                    placeholder="What would you like to discuss?"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Post Discussion
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'virtual-lab':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <TestTube className="w-8 h-8 text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Virtual Lab Simulator</h2>
                <p className="text-gray-600">Practice lab techniques virtually</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <TestTube className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Drug Analysis</h3>
                <p className="text-sm text-gray-600 mb-4">Practice pharmaceutical analysis techniques</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Start Lab
                </button>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <FlaskConical className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Synthesis Lab</h3>
                <p className="text-sm text-gray-600 mb-4">Learn drug synthesis processes</p>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Start Lab
                </button>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Microscope className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Quality Control</h3>
                <p className="text-sm text-gray-600 mb-4">Practice quality assurance methods</p>
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Start Lab
                </button>
              </div>
            </div>
          </div>
        );

      case 'flashcards':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-8 h-8 text-indigo-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Flashcard Generator</h2>
                <p className="text-gray-600">Create custom flashcards for studying</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">My Flashcard Sets</h3>
                <div className="space-y-3">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">Pharmacology Terms</h4>
                        <p className="text-sm text-gray-600">45 cards</p>
                      </div>
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">Active</span>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">Drug Interactions</h4>
                        <p className="text-sm text-gray-600">32 cards</p>
                      </div>
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Draft</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Set</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Flashcard set name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    Create New Set
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'mcq-bank':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <HelpCircle className="w-8 h-8 text-orange-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">MCQ Bank</h2>
                <p className="text-gray-600">Practice with thousands of multiple-choice questions</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <HelpCircle className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Pharmacology</h3>
                <p className="text-sm text-gray-600 mb-4">1,250 questions</p>
                <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
                  Start Quiz
                </button>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <FlaskConical className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Chemistry</h3>
                <p className="text-sm text-gray-600 mb-4">980 questions</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Start Quiz
                </button>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Stethoscope className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Clinical</h3>
                <p className="text-sm text-gray-600 mb-4">750 questions</p>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Start Quiz
                </button>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Pharmacy Law</h3>
                <p className="text-sm text-gray-600 mb-4">420 questions</p>
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        );

      case 'study-planner':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <CalendarIcon className="w-8 h-8 text-teal-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">AI Study Planner</h2>
                <p className="text-gray-600">Get personalized study schedules</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Schedule</h3>
                  <div className="space-y-3">
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">Pharmacology Review</p>
                          <p className="text-sm text-gray-600">Today, 2:00 PM - 4:00 PM</p>
                        </div>
                        <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">Upcoming</span>
                      </div>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">Chemistry Practice</p>
                          <p className="text-sm text-gray-600">Tomorrow, 10:00 AM - 11:30 AM</p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Scheduled</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Focus Area:</strong> Drug interactions need more practice
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Progress:</strong> 78% of weekly goals completed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'offline-mode':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <WifiOff className="w-8 h-8 text-gray-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Offline Mode</h2>
                <p className="text-gray-600">Access materials without internet connection</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Downloaded Content</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Pharmacology Textbook</p>
                        <p className="text-sm text-gray-600">245 MB • Last updated: 2 days ago</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Available</span>
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Lecture Videos</p>
                        <p className="text-sm text-gray-600">1.2 GB • 15 videos</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Available</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Download for Offline</h3>
                <div className="space-y-3">
                  <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <Download className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-gray-900">Clinical Cases Collection</span>
                    </div>
                  </button>
                  <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <Download className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-gray-900">MCQ Practice Sets</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading feature...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      {/* Cinematic Hero Header */}
      <motion.header
        className="relative bg-gradient-to-br from-green-600 via-emerald-500 to-teal-500 text-white rounded-xl mx-4 mt-4 p-8 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12" />
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full -translate-x-8 -translate-y-8" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                className="text-4xl font-bold mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Student Dashboard
              </motion.h1>
              <motion.p
                className="text-xl text-green-100 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Pharmacy education and learning management
              </motion.p>
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5" />
                  <span className="text-sm">Pharmacy Student</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm">12 Courses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span className="text-sm">GPA: 3.8</span>
                </div>
              </motion.div>
            </div>
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <GraduationCap className="w-16 h-16 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Navigation Tabs */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Main Categories */}
          <div className="flex flex-wrap border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3, category: 'main' },
              { id: 'courses', label: 'Courses', icon: BookOpen, category: 'main' },
              { id: 'study', label: 'Study', icon: Brain, category: 'main' },
              { id: 'grades', label: 'Grades', icon: Award, category: 'main' },
              { id: 'resources', label: 'Resources', icon: Lightbulb, category: 'main' },
              { id: 'calendar', label: 'Calendar', icon: Calendar, category: 'main' }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => handleFeatureClick(tab.id)}
                className={`flex-1 min-w-0 px-4 py-4 text-center transition-all duration-200 ${
                  activeFeature === tab.id
                    ? 'bg-green-50 text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className="w-5 h-5 mx-auto mb-2" />
                <span className="text-sm font-medium block truncate">{tab.label}</span>
              </motion.button>
            ))}
          </div>
          
          {/* Student Features Grid */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">All Student Features (32+ Tools)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { id: 'smart-search', label: 'Smart Search', icon: Search, description: 'AI-powered search for medical terms' },
                { id: 'ai-assistant', label: 'AI Assistant', icon: Zap, description: 'Intelligent AI tutor for pharmacy questions' },
                { id: 'health-history', label: 'My Health History', icon: Heart, description: 'Track personal health information' },
                { id: 'patient-cases', label: 'Patient Cases', icon: ClipboardCheck, description: 'Study real patient cases and scenarios' },
                { id: 'ar-scanner', label: 'AR Medicine Scanner', icon: Camera, description: 'Use AR to identify medicines' },
                { id: 'discussion-forum', label: 'Discussion Forum', icon: MessageSquare, description: 'Connect with fellow students' },
                { id: 'polls-surveys', label: 'Polls & Surveys', icon: BarChart, description: 'Participate in polls and tests' },
                { id: 'case-simulator', label: 'Case Simulator', icon: ClipboardList, description: 'Practice solving patient cases' },
                { id: 'osce-preparation', label: 'OSCE Preparation', icon: Target, description: 'Prepare for practical exams' },
                { id: 'pathology', label: 'Pathology', icon: Microscope, description: 'Explore disease mechanisms' },
                { id: 'career-guidance', label: 'Career Guidance', icon: Briefcase, description: 'Discover career paths' },
                { id: 'analytics', label: 'Analytics Dashboard', icon: PieChart, description: 'Track learning progress' },
                { id: 'drug-interaction', label: 'Drug Interaction', icon: FlaskConical, description: 'Learn about drug interactions' },
                { id: 'drug-calculation', label: 'Drug Calculator', icon: Calculator, description: 'Practice calculations' },
                { id: 'unit-converter', label: 'Unit Converter', icon: Activity, description: 'Convert pharmacy units' },
                { id: 'lecture-notes', label: 'Lecture Notes', icon: BookOpen, description: 'Access study materials' },
                { id: 'notes-organizer', label: 'Notes Organizer', icon: Notebook, description: 'Organize study notes' },
                { id: 'ai-library', label: 'AI E-Library', icon: Library, description: 'Search digital library' },
                { id: 'moa-animations', label: 'MOA Animations', icon: Play, description: 'Watch drug mechanisms' },
                { id: 'drug-classification', label: 'Drug Classification', icon: TreePine, description: 'Explore classifications' },
                { id: 'study-planner', label: 'AI Study Planner', icon: CalendarIcon, description: 'Personalized study schedules' },
                { id: 'herbal-knowledge', label: 'Herbal Knowledge', icon: Leaf, description: 'Learn about herbal medicines' },
                { id: 'flashcards', label: 'Flashcards', icon: CreditCard, description: 'Create custom flashcards' },
                { id: 'mcq-bank', label: 'MCQ Bank', icon: HelpCircle, description: 'Practice multiple-choice questions' },
                { id: 'sop-repository', label: 'SOP Repository', icon: FileBarChart, description: 'Access procedures' },
                { id: 'virtual-lab', label: 'Virtual Lab', icon: TestTube, description: 'Practice lab techniques' },
                { id: 'pharma-games', label: 'Pharma Games', icon: Gamepad2, description: 'Learn through games' },
                { id: 'mnemonic-generator', label: 'Mnemonic Generator', icon: Bulb, description: 'Create memorable mnemonics' },
                { id: 'citation-tool', label: 'Citation Tool', icon: Quote, description: 'Generate proper citations' },
                { id: 'plagiarism-checker', label: 'Plagiarism Checker', icon: CheckSquare, description: 'Check written work' },
                { id: 'offline-mode', label: 'Offline Mode', icon: WifiOff, description: 'Access without internet' },
                { id: 'text-to-speech', label: 'Text-to-Speech', icon: Volume2, description: 'Convert text to speech' }
              ].map((feature) => (
                <motion.button
                  key={feature.id}
                  onClick={() => handleFeatureClick(feature.id)}
                  className="p-4 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <feature.icon className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                    <span className="font-medium text-gray-900 text-sm">{feature.label}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading {activeFeature}...</p>
          </div>
        ) : (
          renderFeatureContent()
        )}
      </motion.div>

      {/* Back to Home Button */}
      <motion.div
        className="fixed bottom-6 left-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <button
          onClick={handleBackToHome}
          className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center space-x-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </motion.div>
    </div>
  );
}
