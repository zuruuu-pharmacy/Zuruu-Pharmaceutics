"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { EnhancedLoginModal } from "@/components/landing/enhanced-login-modal";
import { 
  User, 
  Stethoscope, 
  BriefcaseMedical, 
  ArrowRight,
  Shield,
  Sparkles,
  Heart,
  Building2,
  UserCheck
} from "lucide-react";

const dashboardOptions = [
  {
    id: "patient",
    title: "Patient Dashboard",
    description: "Access your personal health records and medication management",
    icon: User,
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
    href: "/dashboard",
    mode: "patient"
  },
  {
    id: "hospital",
    title: "Hospital Dashboard",
    description: "Comprehensive healthcare management and patient care tools",
    icon: Stethoscope,
    color: "from-red-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-red-50 to-pink-50",
    borderColor: "border-red-200",
    href: "/hospital-dashboard",
    mode: "hospital"
  },
  {
    id: "pharmacist",
    title: "Pharmacist Dashboard",
    description: "Professional pharmacy management and patient care tools",
    icon: BriefcaseMedical,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200",
    href: "/dashboard",
    mode: "pharmacist"
  }
];

interface FooterDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDashboardSelect: (dashboardType: string, mode: string) => void;
}

export function FooterDashboardModal({ isOpen, onClose, onDashboardSelect }: FooterDashboardModalProps) {
  const [selectedDashboard, setSelectedDashboard] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'patient' | 'pharmacist' | 'student'>('patient');
  const router = useRouter();

  const handleDashboardSelect = (dashboard: typeof dashboardOptions[0]) => {
    setSelectedDashboard(dashboard.id);
    
    // Map hospital to patient for the login modal (since hospital uses patient login flow)
    const roleForLogin = dashboard.mode === 'hospital' ? 'patient' : dashboard.mode as 'patient' | 'pharmacist' | 'student';
    setSelectedRole(roleForLogin);
    setShowLoginModal(true);
  };

  const handleLoginSuccess = (role: string, action?: string) => {
    // Close both modals
    setShowLoginModal(false);
    onClose();
    
    // Handle the dashboard selection based on the original selection
    if (selectedDashboard === 'hospital') {
      onDashboardSelect('hospital', 'hospital');
    } else {
      onDashboardSelect(role, role);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl p-0 border-0 bg-transparent shadow-none">
          <DialogTitle className="sr-only">
            Dashboard Access - Choose Your Role
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
              {Array.from({ length: 20 }).map((_, i) => (
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
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Main Icon */}
                <motion.div
                  className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 border-2 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  animate={{
                    boxShadow: [
                      "0 10px 25px rgba(59, 130, 246, 0.3)",
                      "0 20px 40px rgba(147, 51, 234, 0.4)",
                      "0 10px 25px rgba(59, 130, 246, 0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Building2 className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="text-4xl font-serif font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                    Choose Your Dashboard
                  </span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Select the dashboard that best matches your role and access the tools you need
                </motion.p>
              </motion.div>

              {/* Dashboard Options */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {dashboardOptions.map((dashboard, index) => (
                  <motion.button
                    key={dashboard.id}
                    onClick={() => handleDashboardSelect(dashboard)}
                    className="group relative p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-left"
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${dashboard.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                    
                    {/* Floating Elements */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-1 h-1 bg-gradient-to-r ${dashboard.color} rounded-full opacity-0 group-hover:opacity-60`}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [0, -10, 0],
                            opacity: [0, 0.6, 0],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2 + Math.random(),
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}
                    </div>

                    <div className="relative z-10">
                      {/* Icon */}
                      <motion.div
                        className={`w-16 h-16 ${dashboard.bgColor} ${dashboard.borderColor} border-2 rounded-2xl mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                        whileHover={{ rotate: 5, scale: 1.05 }}
                      >
                        <dashboard.icon className={`w-8 h-8 bg-gradient-to-r ${dashboard.color} bg-clip-text text-transparent`} />
                      </motion.div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                        {dashboard.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-300 text-sm leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                        {dashboard.description}
                      </p>

                      {/* Action Button */}
                      <motion.div
                        className="flex items-center justify-between"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-blue-400 font-semibold text-sm group-hover:text-blue-300 transition-colors duration-300">
                          Access Dashboard
                        </span>
                        <ArrowRight className="w-5 h-5 text-blue-400 group-hover:text-blue-300 group-hover:translate-x-1 transition-all duration-300" />
                      </motion.div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>

              {/* Bottom Info */}
              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-blue-400/30">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-300 text-sm font-semibold">Secure Access Required</span>
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Enhanced Login Modal */}
      <EnhancedLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        role={selectedRole}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}
