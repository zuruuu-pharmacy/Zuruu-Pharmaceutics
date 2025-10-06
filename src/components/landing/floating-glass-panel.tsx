"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, BriefcaseMedical, School, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MobileLoginSheet } from "./mobile-login-sheet";
import { CTAButtonWithRipple } from "./cta-button-with-ripple";
import "@/styles/design-system.css";

interface FloatingGlassPanelProps {
  onPatientClick: () => void;
  onPharmacistClick: () => void;
  onStudentClick: () => void;
}

export function FloatingGlassPanel({ 
  onPatientClick, 
  onPharmacistClick, 
  onStudentClick 
}: FloatingGlassPanelProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600); // Delay for panel entrance

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const loginCards = [
    {
      id: "patient",
      title: "I am a Patient",
      description: "Access your profile or get emergency help.",
      icon: "/assets/icons/login-patient.svg",
      color: "from-purple-500 to-pink-500",
      onClick: onPatientClick,
      ariaLabel: "Login as a patient to access your profile or get emergency help"
    },
    {
      id: "pharmacist",
      title: "I am a Pharmacist", 
      description: "Access the full suite of clinical tools.",
      icon: "/assets/icons/login-pharmacist.svg",
      color: "from-blue-500 to-cyan-500",
      onClick: onPharmacistClick,
      ariaLabel: "Login as a pharmacist to access the full suite of clinical tools"
    },
    {
      id: "student",
      title: "I am a Student",
      description: "Login to access learning modules.",
      icon: "/assets/icons/login-student.svg",
      color: "from-green-500 to-emerald-500",
      onClick: onStudentClick,
      ariaLabel: "Login as a student to access learning modules"
    }
  ];

  // Mobile version - show button to open sheet
  if (isMobile) {
    return (
      <>
        <motion.div
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <CTAButtonWithRipple
            onClick={() => setIsMobileSheetOpen(true)}
            className="bg-white/90 backdrop-blur-md text-gray-800 px-6 py-3 rounded-full shadow-lg border border-white/20 font-semibold hover:bg-white hover:shadow-xl transition-all duration-300"
          >
            Choose Your Role
          </CTAButtonWithRipple>
        </motion.div>

        <MobileLoginSheet
          isOpen={isMobileSheetOpen}
          onClose={() => setIsMobileSheetOpen(false)}
          onPatientClick={onPatientClick}
          onPharmacistClick={onPharmacistClick}
          onStudentClick={onStudentClick}
        />
      </>
    );
  }

  // Desktop version - floating glass panel
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* Animated Background with Glassmorphism */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)",
            "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.15) 100%)",
            "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Animated Border Glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(45deg, transparent, rgba(31, 89, 255, 0.3), transparent)",
          padding: "1px"
        }}
        animate={{
          background: [
            "linear-gradient(45deg, transparent, rgba(31, 89, 255, 0.3), transparent)",
            "linear-gradient(45deg, transparent, rgba(20, 184, 166, 0.3), transparent)",
            "linear-gradient(45deg, transparent, rgba(31, 89, 255, 0.3), transparent)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-display font-bold text-white mb-1">Get Started</h3>
          <p className="text-white/80 text-sm font-primary">Choose your role</p>
        </motion.div>

        {/* Login Cards - Compact Version */}
        <div className="space-y-3">
          {loginCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <motion.div
                className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                onClick={card.onClick}
                role="button"
                tabIndex={0}
                aria-label={card.ariaLabel}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.onClick();
                  }
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                <div className="relative p-4 flex items-center space-x-3">
                  {/* Animated Icon */}
                  <motion.div
                    className={`w-10 h-10 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center shadow-lg flex-shrink-0`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      boxShadow: "0 5px 20px rgba(0,0,0,0.3)"
                    }}
                  >
                    <img 
                      src={card.icon} 
                      alt={`${card.title} icon`}
                      className="w-5 h-5" 
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </motion.div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-display font-bold text-white group-hover:text-white/90">
                      {card.title}
                    </h4>
                    <p className="text-white/70 text-xs font-primary leading-tight">
                      {card.description}
                    </p>
                  </div>
                  
                  {/* Animated Arrow */}
                  <motion.div
                    className="text-white/60 group-hover:text-white/90 flex-shrink-0"
                    whileHover={{ x: 3, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Accessibility note - Compact */}
        <motion.div
          className="mt-3 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 1 }}
        >
          <p className="text-xs text-white/50 font-primary">
            Use Tab to navigate, Enter or Space to select
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
