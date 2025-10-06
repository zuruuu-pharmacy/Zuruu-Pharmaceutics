"use client";

import { Suspense, lazy, useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMode } from "@/contexts/mode-context";
import { usePatient } from "@/contexts/patient-context";
import { motion, AnimatePresence } from "framer-motion";
import { 
  quickActions 
} from "./dashboard-sections";
import { BarChart3, Clock, Stethoscope, Lightbulb, LayoutDashboard, Users, User, Stethoscope as StethoscopeIcon, Apple, BookText, Calculator, FlaskConical, ShieldAlert, ScanEye, TestTube, FileClock, ShieldEllipsis, Bot, Siren, Microscope, ShoppingCart, Search, MessageCircleQuestion, Camera, MessageSquare, ClipboardList, CaseSensitive, FileHeart, Compass, BarChart, Replace, BookOpen, FolderOpen, Library, Video, Network, CalendarDays, Leaf, HelpCircle, FileJson, Beaker, Puzzle, Combine, BookA, ScanSearch, WifiOff, Mic, Sparkles, Zap, Brain, Target, Heart, Shield, Star, GraduationCap } from "lucide-react";

// Navigation items for each role (exactly matching the sidebar)
const pharmacistTools = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, description: "Your central command center for all pharmacy operations and patient management.", category: "Overview" },
    { href: "/patients", label: "Patients", icon: Users, description: "Manage and track all your patients with comprehensive health records and medication history.", category: "Patient Management" },
    { href: "/patient-history", label: "Patient History Form", icon: User, description: "Create detailed patient profiles with medical history, allergies, and current medications.", category: "Patient Management" },
    { href: "/symptom-checker", label: "Symptom Checker", icon: StethoscopeIcon, description: "AI-powered tool to analyze patient symptoms and suggest potential conditions or next steps.", category: "Clinical Tools" },
    { href: "/diet-planner", label: "Simple Diet Planner", icon: Apple, description: "Create personalized nutrition plans for patients with dietary restrictions or health conditions.", category: "Clinical Tools" },
    { href: "/monograph", label: "Monograph Lookup", icon: BookText, description: "Access comprehensive drug information including indications, dosages, and contraindications.", category: "Drug Information" },
    { href: "/dose-calculator", label: "Dose Calculator", icon: Calculator, description: "Calculate accurate medication dosages based on patient weight, age, and condition.", category: "Calculations" },
    { href: "/interaction-checker", label: "Interaction Checker", icon: FlaskConical, description: "Check for potential drug-drug interactions and provide safety recommendations.", category: "Drug Information" },
    { href: "/allergy-checker", label: "Allergy Checker", icon: ShieldAlert, description: "Verify patient allergies and prevent adverse reactions to medications.", category: "Safety Tools" },
    { href: "/prescription-reader", label: "Prescription Reader", icon: ScanEye, description: "Digitize and analyze handwritten prescriptions with AI-powered text recognition.", category: "Clinical Tools" },
    { href: "/lab-analyzer", label: "Lab Analyzer", icon: TestTube, description: "Interpret laboratory results and provide clinical insights for patient care.", category: "Clinical Tools" },
    { href: "/adherence-tracker", label: "Adherence Tracker", icon: FileClock, description: "Monitor patient medication adherence and send automated reminders.", category: "Patient Management" },
    { href: "/career-guidance/admin-panel", label: "Admin Panel", icon: ShieldEllipsis, description: "Administrative tools for managing pharmacy operations and user access.", category: "Administration" },
];

const patientMenuItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, description: "Your personal health hub with quick access to all your health tools and information.", category: "Overview" },
    { href: "/patient-history", label: "My Health History", icon: User, description: "Keep track of your medical history, medications, and health records in one secure place.", category: "Health Records" },
    { href: "/nutrition-coach", label: "AI Nutrition Coach", icon: Bot, description: "Get personalized nutrition advice and meal plans tailored to your health goals and dietary needs.", category: "Wellness" },
    { href: "/symptom-checker", label: "Symptom Checker", icon: StethoscopeIcon, description: "Describe your symptoms and get AI-powered insights about potential causes and when to see a doctor.", category: "Health Assessment" },
    { href: "/emergency", label: "Emergency Help", icon: Siren, description: "Quick access to emergency contacts, first aid information, and urgent care resources.", category: "Emergency" },
    { href: "/prescription-reader", label: "Upload Prescription", icon: ScanEye, description: "Upload photos of your prescriptions to get detailed medication information and reminders.", category: "Medications" },
    { href: "/lab-analyzer", label: "Analyze Lab Report", icon: Microscope, description: "Upload your lab results to get easy-to-understand explanations of what they mean for your health.", category: "Health Assessment" },
    { href: "/order-refills", label: "Order Medicines", icon: ShoppingCart, description: "Conveniently order prescription refills and over-the-counter medications with delivery options.", category: "Medications" },
    { href: "/adherence-tracker", label: "Adherence Tracker", icon: FileClock, description: "Never miss a dose with smart medication reminders and tracking tools.", category: "Medications" },
];

const studentMenuItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, description: "Your learning command center with access to all study tools and resources.", category: "Overview" },
    { href: "/smart-search", label: "Smart Search", icon: Search, description: "Find any medical term, drug, or concept instantly with AI-powered search capabilities.", category: "Research Tools" },
    { href: "/ai-assistant", label: "AI Assistant Helper", icon: MessageCircleQuestion, description: "Get instant answers to your pharmacy questions with our intelligent AI tutor.", category: "AI Learning" },
    { href: "/patient-history", label: "My Health History", icon: User, description: "Track your personal health information and medical records for academic purposes.", category: "Personal Records" },
    { href: "/patients", label: "View Patient Cases", icon: Users, description: "Study real patient cases and scenarios to enhance your clinical understanding.", category: "Clinical Learning" },
    { href: "/scan-medicine-strip", label: "AR Medicine Scanner", icon: Camera, description: "Use augmented reality to identify medicines and learn about their properties.", category: "Interactive Learning" },
    { href: "/student-discussion-forum", label: "Student Discussion Forum", icon: MessageSquare, description: "Connect with fellow pharmacy students and discuss topics, share notes, and ask questions.", category: "Collaboration" },
    { href: "/student-polls", label: "Student Polls/Surveys", icon: ClipboardList, description: "Participate in polls and surveys to test your knowledge and see how you compare with peers.", category: "Assessment" },
    { href: "/clinical-case-simulator", label: "Clinical Case Simulator", icon: CaseSensitive, description: "Practice solving realistic patient cases with AI feedback to improve your clinical skills.", category: "Clinical Learning" },
    { href: "/osce-viva-prep", label: "OSCE and Viva Preparation", icon: FileHeart, description: "Prepare for practical exams with simulated OSCE stations and viva voce practice.", category: "Exam Prep" },
    { href: "/pathology", label: "Pathology", icon: TestTube, description: "Explore disease mechanisms, diagnostic tests, and treatment approaches in detail.", category: "Subject Learning" },
    { href: "/career-guidance", label: "Career Guidance", icon: Compass, description: "Discover career paths in pharmacy and get guidance for your professional development.", category: "Career Development" },
    { href: "/progress-tracker", label: "Analytics Dashboard", icon: BarChart, description: "Track your learning progress, study time, and performance across different subjects.", category: "Progress Tracking" },
    { href: "/interaction-checker", label: "Drug Interaction Simulator", icon: FlaskConical, description: "Learn about drug interactions through interactive simulations and case studies.", category: "Drug Knowledge" },
    { href: "/dose-calculator", label: "Drug Calculation Tool", icon: Calculator, description: "Practice pharmaceutical calculations with step-by-step solutions and explanations.", category: "Calculations" },
    { href: "/unit-converter", label: "Unit Converter", icon: Replace, description: "Convert between different units commonly used in pharmacy practice and calculations.", category: "Calculations" },
    { href: "/lecture-notes", label: "Lecture Notes Library", icon: BookOpen, description: "Access and organize lecture notes, presentations, and study materials from your classes.", category: "Study Materials" },
    { href: "/notes-organizer", label: "Notes Organizer", icon: FolderOpen, description: "Organize your personal study notes, highlights, and annotations in a structured way.", category: "Study Materials" },
    { href: "/e-library", label: "AI E-Library", icon: Library, description: "Search through an extensive digital library with AI-powered summaries and key insights.", category: "Research Tools" },
    { href: "/moa-animations", label: "MOA Animation Library", icon: Video, description: "Watch engaging animations explaining drug mechanisms of action and pharmacokinetics.", category: "Interactive Learning" },
    { href: "/drug-classification-tree", label: "Drug Classification Tree", icon: Network, description: "Explore drug classifications through an interactive visual tree structure.", category: "Drug Knowledge" },
    { href: "/study-planner", label: "AI Study Planner", icon: CalendarDays, description: "Get personalized study schedules and timetables optimized for your learning style.", category: "Study Planning" },
    { href: "/herbal-hub", label: "Herbal Knowledge Hub", icon: Leaf, description: "Learn about herbal medicines, their properties, and interactions with conventional drugs.", category: "Subject Learning" },
    { href: "/flashcard-generator", label: "Flashcard Generator", icon: FileHeart, description: "Create custom flashcards for any topic with AI-generated questions and answers.", category: "Study Tools" },
    { href: "/mcq-bank", label: "MCQ Bank", icon: HelpCircle, description: "Practice with thousands of multiple-choice questions covering all pharmacy subjects.", category: "Assessment" },
    { href: "/sop-repository", label: "SOP Repository", icon: FileJson, description: "Access standard operating procedures for laboratory work and clinical practice.", category: "Study Materials" },
    { href: "/virtual-lab-simulator", label: "Virtual Lab Simulator", icon: Beaker, description: "Practice lab techniques and experiments in a safe virtual environment.", category: "Interactive Learning" },
    { href: "/pharma-games", label: "Pharma Games & Puzzles", icon: Puzzle, description: "Learn pharmacy concepts through fun games, puzzles, and interactive challenges.", category: "Interactive Learning" },
    { href: "/mnemonic-generator", label: "Mnemonic Generator", icon: Combine, description: "Create memorable mnemonics to help remember complex medical terms and concepts.", category: "Study Tools" },
    { href: "/reference-generator", label: "Reference Citation Tool", icon: BookA, description: "Generate proper citations for academic papers and research projects.", category: "Academic Tools" },
    { href: "/plagiarism-checker", label: "Plagiarism Checker", icon: ScanSearch, description: "Check your written work for plagiarism and ensure academic integrity.", category: "Academic Tools" },
    { href: "/offline-mode", label: "Offline Mode", icon: WifiOff, description: "Access essential study materials and tools even without an internet connection.", category: "Accessibility" },
    { href: "/text-to-speech", label: "Text-to-Speech", icon: Mic, description: "Convert text to speech for auditory learning and accessibility features.", category: "Accessibility" },
];

// Lazy load heavy components
const ToolCards = lazy(() => import("@/components/dashboard/tool-cards").then(mod => ({ default: mod.ToolCards })));
const QuickActions = lazy(() => import("@/components/dashboard/quick-actions").then(mod => ({ default: mod.QuickActions })));
const LifestyleSuggestions = lazy(() => import("./lifestyle-suggestions").then(mod => ({ default: mod.LifestyleSuggestions })));

// Loading skeleton components
function ToolCardsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-6 w-6 rounded" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-16 mt-1" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4 mt-1" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function QuickActionsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="h-24">
          <CardContent className="flex items-center justify-center p-4">
            <Skeleton className="h-8 w-8 rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Pharmacist Dashboard
function PharmacistDashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="space-y-12">
      {/* Cinematic Hero Header */}
      <motion.header 
        className="relative bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 text-white rounded-xl p-8 overflow-hidden"
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
            className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/10 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
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
            <TestTube className="w-5 h-5 text-white/15" />
          </motion.div>
          <motion.div
            className="absolute top-1/3 left-8"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield className="w-4 h-4 text-white/25" />
          </motion.div>
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="heading-2 text-white flex items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Stethoscope className="w-8 h-8" />
              </motion.div>
          Pharmacist Dashboard
        </h1>
          </motion.div>
          
          <motion.p 
            className="body-large text-white/90 max-w-2xl mx-auto mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your central command center for all pharmacy operations and patient management.
          </motion.p>
          
          <motion.div
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 max-w-3xl mx-auto mt-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          >
            <div className="flex items-center justify-center space-x-4">
              <motion.div 
                className="w-4 h-4 bg-emerald-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <p className="text-white font-bold text-xl">
                Professional Pharmacy Tools Ready
              </p>
        <motion.div
                className="w-4 h-4 bg-cyan-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Pharmacist Tools with Cinematic Animations */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <motion.h2 
          className="text-2xl font-semibold mb-6 text-foreground/90 flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-6 h-6 text-emerald-500" />
          </motion.div>
          Professional Pharmacy Tools
        </motion.h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          <AnimatePresence>
            {pharmacistTools.filter(tool => tool.href !== "/dashboard").map((tool, index) => (
              <motion.div
                key={`pharmacist-${tool.href}-${index}`}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.2 + (index * 0.1),
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                onHoverStart={() => setActiveCard(tool.label)}
                onHoverEnd={() => setActiveCard(null)}
              >
                <Card className="hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col group border-2 hover:border-emerald-500/20 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-start gap-4">
                    <motion.div 
                      className={`p-3 bg-emerald-500/10 rounded-lg text-emerald-500 group-hover:bg-emerald-500/20 transition-all duration-300`}
                      animate={activeCard === tool.label ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <tool.icon className="w-8 h-8" />
                    </motion.div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1 group-hover:text-emerald-500 transition-colors duration-300">
                        {tool.label}
                      </CardTitle>
                      <CardDescription className="group-hover:text-foreground/80 transition-colors duration-300">
                        {tool.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex items-end justify-end mt-auto">
                    <motion.div
                      className="text-emerald-500 group-hover:bg-emerald-500/10 px-4 py-2 rounded-lg transition-all duration-300"
                      animate={activeCard === tool.label ? {
                        x: [0, 5, 0]
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-sm font-medium">Access Tool</span>
        </motion.div>
                  </CardContent>
                </Card>
      </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.section>
    </div>
  );
}

// Student Dashboard
function StudentDashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="space-y-12">
      {/* Cinematic Hero Header */}
      <motion.header 
        className="relative bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-500 text-white rounded-xl p-8 overflow-hidden"
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
            className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/10 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
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

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="heading-2 text-white flex items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <GraduationCap className="w-8 h-8" />
              </motion.div>
              Student Dashboard
            </h1>
          </motion.div>
          
          <motion.p 
            className="body-large text-white/90 max-w-2xl mx-auto mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your learning command center with access to all study tools and resources.
          </motion.p>
          
          <motion.div
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 max-w-3xl mx-auto mt-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          >
            <div className="flex items-center justify-center space-x-4">
              <motion.div 
                className="w-4 h-4 bg-orange-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <p className="text-white font-bold text-xl">
                Learning & Study Tools Ready
              </p>
              <motion.div 
                className="w-4 h-4 bg-yellow-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Student Tools with Cinematic Animations */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <motion.h2 
          className="text-2xl font-semibold mb-6 text-foreground/90 flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-6 h-6 text-orange-500" />
          </motion.div>
          Learning & Study Tools
        </motion.h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          <AnimatePresence>
            {studentMenuItems.filter(tool => tool.href !== "/dashboard").map((tool, index) => (
              <motion.div
                key={`student-${tool.href}-${index}`}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.2 + (index * 0.1),
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                onHoverStart={() => setActiveCard(tool.label)}
                onHoverEnd={() => setActiveCard(null)}
              >
                <Card className="hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col group border-2 hover:border-orange-500/20 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-start gap-4">
                    <motion.div 
                      className={`p-3 bg-orange-500/10 rounded-lg text-orange-500 group-hover:bg-orange-500/20 transition-all duration-300`}
                      animate={activeCard === tool.label ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <tool.icon className="w-8 h-8" />
                    </motion.div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1 group-hover:text-orange-500 transition-colors duration-300">
                        {tool.label}
                      </CardTitle>
                      <CardDescription className="group-hover:text-foreground/80 transition-colors duration-300">
                        {tool.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex items-end justify-end mt-auto">
                    <motion.div
                      className="text-orange-500 group-hover:bg-orange-500/10 px-4 py-2 rounded-lg transition-all duration-300"
                      animate={activeCard === tool.label ? {
                        x: [0, 5, 0]
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-sm font-medium">Access Tool</span>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.section>
    </div>
  );
}

// Patient Dashboard
function PatientDashboard() {
  const { getActivePatientRecord } = usePatient();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="space-y-12">
      {/* Cinematic Hero Header */}
      <motion.header 
        className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white rounded-xl p-8 overflow-hidden"
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
            className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/10 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
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
            <Heart className="w-6 h-6 text-white/20" />
          </motion.div>
          <motion.div
            className="absolute bottom-8 left-8"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <Shield className="w-5 h-5 text-white/15" />
          </motion.div>
          <motion.div
            className="absolute top-1/3 left-8"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Star className="w-4 h-4 text-white/25" />
          </motion.div>
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="heading-2 text-white flex items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-8 h-8" />
              </motion.div>
          Patient Dashboard
        </h1>
          </motion.div>
          
          <motion.p 
            className="body-large text-white/90 max-w-2xl mx-auto mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your personal health hub with quick access to all your health tools and information.
          </motion.p>
          
        {getActivePatientRecord() && (
          <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 max-w-3xl mx-auto mt-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          >
            <div className="flex items-center justify-center space-x-4">
                <motion.div 
                  className="w-4 h-4 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <p className="text-white font-bold text-xl">
                Welcome back, {getActivePatientRecord()?.history?.name || 'Patient'}! Your health information is ready.
              </p>
                <motion.div 
                  className="w-4 h-4 bg-emerald-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                />
            </div>
          </motion.div>
        )}
        </div>
      </motion.header>

      {/* Patient Tools with Cinematic Animations */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <motion.h2 
          className="text-2xl font-semibold mb-6 text-foreground/90 flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-6 h-6 text-purple-500" />
          </motion.div>
          Health & Wellness Tools
        </motion.h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          <AnimatePresence>
            {patientMenuItems.filter(tool => tool.href !== "/dashboard").map((tool, index) => (
              <motion.div
                key={`patient-${tool.href}-${index}`}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.2 + (index * 0.1),
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                onHoverStart={() => setActiveCard(tool.label)}
                onHoverEnd={() => setActiveCard(null)}
              >
                <Card className="hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col group border-2 hover:border-purple-500/20 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-start gap-4">
                    <motion.div 
                      className={`p-3 bg-purple-500/10 rounded-lg text-purple-500 group-hover:bg-purple-500/20 transition-all duration-300`}
                      animate={activeCard === tool.label ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <tool.icon className="w-8 h-8" />
                    </motion.div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1 group-hover:text-purple-500 transition-colors duration-300">
                        {tool.label}
                      </CardTitle>
                      <CardDescription className="group-hover:text-foreground/80 transition-colors duration-300">
                        {tool.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex items-end justify-end mt-auto">
                    <motion.div
                      className="text-purple-500 group-hover:bg-purple-500/10 px-4 py-2 rounded-lg transition-all duration-300"
                      animate={activeCard === tool.label ? {
                        x: [0, 5, 0]
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-sm font-medium">Access Tool</span>
        </motion.div>
                  </CardContent>
                </Card>
      </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.section>
    </div>
  );
}

// Main Role Dashboard Component
export function RoleDashboard() {
  const { mode } = useMode();

  if (mode === "pharmacist") {
    return <PharmacistDashboard />;
  } else if (mode === "student") {
    return <StudentDashboard />;
  } else if (mode === "patient") {
    return <PatientDashboard />;
  }

  // Default fallback
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold">Welcome to Pharmacy Education Platform</h1>
      <p className="text-lg text-muted-foreground">
        Please select your role to access the appropriate dashboard.
      </p>
    </div>
  );
}
