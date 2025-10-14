"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePatient, UserProfile } from "@/contexts/patient-context";
import { useMode } from "@/contexts/mode-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  BriefcaseMedical, 
  UserPlus, 
  LogIn, 
  ShieldEllipsis, 
  School, 
  Siren, 
  FileText, 
  Briefcase, 
  ExternalLink, 
  Play, 
  ArrowRight, 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  Phone, 
  BookOpen, 
  GraduationCap 
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { CinematicHeroVideo } from "@/components/landing/cinematic-hero-video";
import { PillarsSectionEnhanced } from "@/components/landing/pillars-section-enhanced";
import { HowZuruuWorksEnhanced } from "@/components/landing/how-zuruu-works-enhanced";
import { FooterSection } from "@/components/landing/footer-section";
import { DemoModal } from "@/components/landing/demo-modal";
import { DashboardAccessModal } from "@/components/landing/dashboard-access-modal";
import { EnhancedLoginModal } from "@/components/landing/enhanced-login-modal";

// Removed access code requirement - direct login/signup only


export default function RoleSelectionPage() {
  const [pharmacistModalOpen, setPharmacistModalOpen] = useState(false);
  const [patientOptionsModalOpen, setPatientOptionsModalOpen] = useState(false);
  const [patientLoginModalOpen, setPatientLoginModalOpen] = useState(false);
  const [studentLoginModalOpen, setStudentLoginModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState<'patient' | 'pharmacist' | 'student'>('patient');
  const [enhancedLoginOpen, setEnhancedLoginOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'patient' | 'pharmacist' | 'student'>('patient');
  
  const [pharmacistCode, setPharmacistCode] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");


  const { setMode } = useMode();
  const { patientState, setActiveUser, addOrUpdateUser, clearActiveUser } = usePatient();
  const router = useRouter();
  const { toast } = useToast();

  const handlePharmacistLogin = () => {
    setMode('pharmacist');
    router.push('/retail-dashboard');
  };

  const handlePatientLogin = () => {
    setMode('patient');
    router.push('/patients');
  };
  
  const handleNewPatient = () => {
    setMode('patient');
    router.push('/patients');
  }

  const handleStudentLogin = () => {
    setMode('student');
    router.push('/academia-dashboard');
  };

  const handleEmergency = () => {
    setMode('patient'); // Emergency defaults to patient view
    clearActiveUser();
    router.push('/emergency');
  };

  const handleEnhancedLoginSuccess = (role: string, action?: string) => {
    if (role === 'patient') {
      setMode('patient');
      router.push('/patients'); // Go to patient dashboard
    } else if (role === 'pharmacist') {
      setMode('pharmacist');
      router.push('/retail-dashboard'); // Go to pharmacist dashboard
    } else if (role === 'student') {
      setMode('student');
      router.push('/academia-dashboard'); // Go to student dashboard
    }
    setEnhancedLoginOpen(false);
  };

  const openPatientLogin = () => {
    setMode('patient');
    router.push('/patients');
  }
  
  const openStudentLogin = () => {
    setMode('student');
    router.push('/academia-dashboard');
  }

  const handleDemoClick = () => {
    setDemoModalOpen(true);
  };

  return (
    <div className="relative">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      
      {/* Cinematic Hero Video Section */}
      <CinematicHeroVideo
        onPatientClick={() => setPatientOptionsModalOpen(true)}
        onPharmacistClick={() => setPharmacistModalOpen(true)}
        onStudentClick={openStudentLogin}
        onDemoClick={handleDemoClick}
      />
      
      {/* Features Section */}
      <section id="features">
        <PillarsSectionEnhanced />
      </section>
      
      {/* How Zuruu Works Section */}
      <HowZuruuWorksEnhanced />
      
      {/* Footer Section */}
      <FooterSection />
      
      {/* Demo Modal */}
      <DemoModal 
        isOpen={demoModalOpen} 
        onClose={() => setDemoModalOpen(false)} 
      />

      {/* Dashboard Access Modal */}
      <DashboardAccessModal
        isOpen={accessModalOpen}
        onClose={() => setAccessModalOpen(false)}
        dashboardType={selectedDashboard}
        onSuccess={(dashboardType) => {
          if (dashboardType === 'patient') {
            setMode('patient');
            clearActiveUser();
          } else if (dashboardType === 'pharmacist') {
            setMode('pharmacist');
            clearActiveUser();
          } else if (dashboardType === 'student') {
            setMode('student');
            clearActiveUser();
          }
        }}
      />
      
      {/* Enhanced Pharmacist Modal */}
      <Dialog open={pharmacistModalOpen} onOpenChange={setPharmacistModalOpen}>
        <DialogContent className="max-w-md p-0 border-0 bg-transparent shadow-none">
          <DialogTitle className="sr-only">Pharmacist Portal - Access Required</DialogTitle>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 rounded-3xl opacity-95" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.1),transparent_50%)] rounded-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(20,184,166,0.1),transparent_50%)] rounded-3xl" />
            
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <div className="relative p-8">
              {/* Header */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Role Icon */}
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 border-2 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <BriefcaseMedical className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="text-3xl font-serif font-bold text-white mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                    Pharmacist Portal
                  </span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  className="text-gray-300 text-sm leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Professional pharmacy management and patient care tools
                </motion.p>
              </motion.div>

              {/* Access Code Input */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {/* Security Badge */}
                <motion.div
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-emerald-400/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 text-sm font-semibold">Secure Access Required</span>
                  <Sparkles className="w-4 h-4 text-teal-400" />
                </motion.div>

                {/* Access Code Input */}
                <motion.div className="space-y-3">
                  <Label htmlFor="pharmacist-code" className="text-gray-300 font-semibold">
                    Access Code
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="pharmacist-code"
                      type="password"
                      value={pharmacistCode}
                      onChange={(e) => setPharmacistCode(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handlePharmacistLogin()}
                      placeholder="Enter access code"
                      className="pl-10 pr-4 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-emerald-400/20"
                    />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <motion.button
                    onClick={handlePharmacistLogin}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Shield className="w-5 h-5" />
                    Verify Access
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
      
      {/* Enhanced Patient Options Modal */}
      <Dialog open={patientOptionsModalOpen} onOpenChange={setPatientOptionsModalOpen}>
        <DialogContent className="max-w-lg p-0 border-0 bg-transparent shadow-none">
          <DialogTitle className="sr-only">Patient Portal - How can we help you today?</DialogTitle>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900 rounded-3xl opacity-95" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)] rounded-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.1),transparent_50%)] rounded-3xl" />
            
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <div className="relative p-8">
              {/* Header */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Role Icon */}
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 border-2 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <User className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="text-3xl font-serif font-bold text-white mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    Patient Portal
                  </span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  className="text-gray-300 text-sm leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Access your personal health records and medication management
                </motion.p>
              </motion.div>

              {/* Options */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {/* Patient Login Option */}
                <motion.button
                  onClick={openPatientLogin}
                  className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-left group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center"
                      whileHover={{ rotate: 5 }}
                    >
                      <LogIn className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Patient Login</h3>
                      <p className="text-gray-300 text-sm">Access your existing patient profile</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-white transition-colors" />
                  </div>
                </motion.button>

                {/* New Patient Registration Option */}
                <motion.button
                  onClick={handleNewPatient}
                  className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-left group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.1 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center"
                      whileHover={{ rotate: 5 }}
                    >
                      <UserPlus className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">New Patient Registration</h3>
                      <p className="text-gray-300 text-sm">Create a new patient history form</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-white transition-colors" />
                  </div>
                </motion.button>

                {/* Emergency Help Option */}
                <motion.button
                  onClick={handleEmergency}
                  className="w-full p-4 bg-red-500/20 backdrop-blur-sm rounded-xl border border-red-400/30 hover:bg-red-500/30 transition-all duration-300 text-left group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center"
                      whileHover={{ rotate: 5 }}
                    >
                      <Siren className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Emergency Help</h3>
                      <p className="text-red-300 text-sm">Immediately get assistance</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-red-400 ml-auto group-hover:text-white transition-colors" />
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Enhanced Patient Login Modal */}
      <Dialog open={patientLoginModalOpen} onOpenChange={setPatientLoginModalOpen}>
        <DialogContent className="max-w-md p-0 border-0 bg-transparent shadow-none">
          <DialogTitle className="sr-only">Patient Login - Find Your Profile</DialogTitle>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900 rounded-3xl opacity-95" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)] rounded-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.1),transparent_50%)] rounded-3xl" />
            
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <div className="relative p-8">
              {/* Header */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Role Icon */}
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 border-2 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <User className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="text-3xl font-serif font-bold text-white mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    Patient Login
                  </span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  className="text-gray-300 text-sm leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Please enter your details to find your profile
                </motion.p>
              </motion.div>

              {/* Form */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {/* Full Name Input */}
                <motion.div className="space-y-3">
                  <Label htmlFor="patient-name" className="text-gray-300 font-semibold">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="patient-name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Enter your full name"
                      className="pl-10 pr-4 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                    />
                  </div>
                </motion.div>

                {/* Phone Number Input */}
                <motion.div className="space-y-3">
                  <Label htmlFor="patient-phone" className="text-gray-300 font-semibold">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="patient-phone"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="pl-10 pr-4 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                    />
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <motion.button
                    onClick={handlePatientLogin}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogIn className="w-5 h-5" />
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

       {/* Enhanced Student Login Modal */}
       <Dialog open={studentLoginModalOpen} onOpenChange={setStudentLoginModalOpen}>
        <DialogContent className="max-w-md p-0 border-0 bg-transparent shadow-none">
          <DialogTitle className="sr-only">Student Portal - Educational Access</DialogTitle>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-purple-800 to-violet-900 rounded-3xl opacity-95" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.1),transparent_50%)] rounded-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.1),transparent_50%)] rounded-3xl" />
            
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-violet-400/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <div className="relative p-8">
              {/* Header */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Role Icon */}
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200 border-2 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <School className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="text-3xl font-serif font-bold text-white mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                    Student Portal
                  </span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  className="text-gray-300 text-sm leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Educational resources and pharmaceutical learning tools
                </motion.p>
              </motion.div>

              {/* Form */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {/* Full Name Input */}
                <motion.div className="space-y-3">
                  <Label htmlFor="student-name" className="text-gray-300 font-semibold">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="student-name"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Enter your full name"
                      className="pl-10 pr-4 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-violet-400 focus:ring-violet-400/20"
                    />
                  </div>
                </motion.div>

                {/* Student ID Input */}
                <motion.div className="space-y-3">
                  <Label htmlFor="student-id" className="text-gray-300 font-semibold">
                    Student ID / Email
                  </Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="student-id"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g., user@university.edu"
                      className="pl-10 pr-4 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-violet-400 focus:ring-violet-400/20"
                    />
                  </div>
                </motion.div>

                {/* Year of Study Select */}
                <motion.div className="space-y-3">
                  <Label htmlFor="year-of-study" className="text-gray-300 font-semibold">
                    Year of Study
                  </Label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                    <Select value={yearOfStudy} onValueChange={setYearOfStudy}>
                      <SelectTrigger id="year-of-study" className="pl-10 bg-gray-800/50 border-gray-600 text-white focus:border-violet-400 focus:ring-violet-400/20">
                        <SelectValue placeholder="Select your year..." />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="1st Year" className="text-white hover:bg-gray-700">1st Year</SelectItem>
                        <SelectItem value="2nd Year" className="text-white hover:bg-gray-700">2nd Year</SelectItem>
                        <SelectItem value="3rd Year" className="text-white hover:bg-gray-700">3rd Year</SelectItem>
                        <SelectItem value="4th Year" className="text-white hover:bg-gray-700">4th Year</SelectItem>
                        <SelectItem value="5th Year" className="text-white hover:bg-gray-700">5th Year</SelectItem>
                        <SelectItem value="Graduate" className="text-white hover:bg-gray-700">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <motion.button
                    onClick={handleStudentLogin}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <School className="w-5 h-5" />
                    Access Portal
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Enhanced Login Modal */}
      <EnhancedLoginModal
        isOpen={enhancedLoginOpen}
        onClose={() => setEnhancedLoginOpen(false)}
        role={selectedRole}
        onSuccess={handleEnhancedLoginSuccess}
      />
    </div>
  );
}