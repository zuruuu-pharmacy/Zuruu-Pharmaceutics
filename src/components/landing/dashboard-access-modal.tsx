"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  XCircle, 
  Sparkles,
  ArrowRight,
  Building2,
  Store,
  GraduationCap,
  Hospital,
  User,
  BriefcaseMedical,
  School
} from "lucide-react";

const ACCESS_CODE = "239773";

const dashboardInfo = {
  industry: {
    title: "Industry Dashboard",
    description: "Advanced pharmaceutical manufacturing and supply chain management",
    icon: Building2,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    borderColor: "border-orange-200"
  },
  retail: {
    title: "Retail Pharmacy Dashboard", 
    description: "Comprehensive retail pharmacy management and operations",
    icon: Store,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    borderColor: "border-blue-200"
  },
  academia: {
    title: "Academia & R&D Dashboard",
    description: "Research, development, and educational pharmaceutical tools",
    icon: GraduationCap,
    color: "from-purple-500 to-pink-500", 
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    borderColor: "border-purple-200"
  },
  hospital: {
    title: "Hospital Systems Dashboard",
    description: "Hospital pharmacy management and clinical decision support",
    icon: Hospital,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50", 
    borderColor: "border-green-200"
  },
  patient: {
    title: "Patient Dashboard",
    description: "Personal health management and medication tracking",
    icon: User,
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    borderColor: "border-blue-200"
  },
  pharmacist: {
    title: "Pharmacist Dashboard",
    description: "Professional pharmacy management and patient care tools",
    icon: BriefcaseMedical,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200"
  },
  student: {
    title: "Student Dashboard",
    description: "Educational resources and pharmaceutical learning tools",
    icon: School,
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
    borderColor: "border-violet-200"
  }
};

interface DashboardAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardType: 'industry' | 'retail' | 'academia' | 'hospital' | 'patient' | 'pharmacist' | 'student';
  onSuccess?: (dashboardType: string) => void;
}

export function DashboardAccessModal({ isOpen, onClose, dashboardType, onSuccess }: DashboardAccessModalProps) {
  const [accessCode, setAccessCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [shake, setShake] = useState(false);
  
  const router = useRouter();
  const { toast } = useToast();
  
  const dashboard = dashboardInfo[dashboardType];

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setAccessCode("");
      setIsSuccess(false);
      setAttempts(0);
      setShake(false);
    }
  }, [isOpen]);

  const handleVerification = async () => {
    if (!accessCode.trim()) {
      toast({
        variant: "destructive",
        title: "Access Code Required",
        description: "Please enter the access code to continue.",
      });
      return;
    }

    setIsVerifying(true);
    
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (accessCode === ACCESS_CODE) {
      setIsSuccess(true);
      toast({
        title: "Access Granted!",
        description: `Welcome to ${dashboard.title}. Redirecting...`,
      });
      
      // Redirect after success animation
      setTimeout(() => {
        if (onSuccess) {
          onSuccess(dashboardType);
        }
        if (dashboardType === 'patient' || dashboardType === 'pharmacist' || dashboardType === 'student') {
          router.push('/dashboard');
        } else {
          router.push(`/${dashboardType}-dashboard`);
        }
        onClose();
      }, 2000);
    } else {
      setAttempts(prev => prev + 1);
      setShake(true);
      setIsVerifying(false);
      
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: attempts >= 2 ? "Multiple failed attempts. Please contact support." : "Invalid access code. Please try again.",
      });
      
      // Reset shake animation
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isVerifying && !isSuccess) {
      handleVerification();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 border-0 bg-transparent shadow-none">
        <DialogTitle className="sr-only">
          {dashboard.title} - Access Verification Required
        </DialogTitle>
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl opacity-95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)] rounded-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(147,51,234,0.1),transparent_50%)] rounded-3xl" />
          
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
              {/* Dashboard Icon */}
              <motion.div
                className={`w-20 h-20 ${dashboard.bgColor} ${dashboard.borderColor} border-2 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl`}
                whileHover={{ scale: 1.05, rotate: 5 }}
                animate={isSuccess ? { 
                  boxShadow: [
                    "0 10px 25px rgba(59, 130, 246, 0.3)",
                    "0 20px 40px rgba(147, 51, 234, 0.4)",
                    "0 10px 25px rgba(59, 130, 246, 0.3)"
                  ]
                } : {}}
              >
                <dashboard.icon className={`w-10 h-10 bg-gradient-to-r ${dashboard.color} bg-clip-text text-transparent`} />
              </motion.div>

              {/* Title */}
              <motion.h2
                className="text-3xl font-serif font-bold text-white mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className={`bg-gradient-to-r ${dashboard.color} bg-clip-text text-transparent`}>
                  {dashboard.title}
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                className="text-gray-300 text-sm leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {dashboard.description}
              </motion.p>
            </motion.div>

            {/* Access Code Section */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {/* Security Badge */}
              <motion.div
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-400/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-sm font-semibold">Secure Access Required</span>
                <Sparkles className="w-4 h-4 text-purple-400" />
              </motion.div>

              {/* Access Code Input */}
              <motion.div
                className="space-y-3"
                animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <Label htmlFor="access-code" className="text-gray-300 font-semibold">
                  Access Code
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="access-code"
                    type={showPassword ? "text" : "password"}
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter access code"
                    className={`pl-10 pr-12 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20 ${
                      isSuccess ? 'border-green-400 bg-green-900/20' : ''
                    }`}
                    disabled={isVerifying || isSuccess}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <Button
                  onClick={handleVerification}
                  disabled={isVerifying || isSuccess}
                  className={`w-full h-12 text-lg font-semibold transition-all duration-300 ${
                    isSuccess 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                  }`}
                >
                  {isVerifying ? (
                    <motion.div
                      className="flex items-center gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                      Verifying Access...
                    </motion.div>
                  ) : isSuccess ? (
                    <motion.div
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle className="w-5 h-5" />
                      Access Granted!
                    </motion.div>
                  ) : (
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ x: 5 }}
                    >
                      <Shield className="w-5 h-5" />
                      Verify Access
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  )}
                </Button>
              </motion.div>

              {/* Attempt Counter */}
              {attempts > 0 && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-red-400 text-sm">
                    {attempts === 1 && "1 failed attempt"}
                    {attempts === 2 && "2 failed attempts"}
                    {attempts >= 3 && "Multiple failed attempts"}
                  </p>
                </motion.div>
              )}

              {/* Success Animation */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-3xl flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="text-center"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ duration: 0.6, repeat: 1 }}
                      >
                        <CheckCircle className="w-8 h-8 text-white" />
                      </motion.div>
                      <motion.h3
                        className="text-2xl font-bold text-white mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        Welcome!
                      </motion.h3>
                      <motion.p
                        className="text-green-300"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        Redirecting to dashboard...
                      </motion.p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
