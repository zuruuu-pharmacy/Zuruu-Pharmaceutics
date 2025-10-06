"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, BriefcaseMedical, School, ArrowRight, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import "@/styles/design-system.css";

interface MobileLoginSheetProps {
  onPatientClick: () => void;
  onPharmacistClick: () => void;
  onStudentClick: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileLoginSheet({ 
  onPatientClick, 
  onPharmacistClick, 
  onStudentClick,
  isOpen,
  onClose
}: MobileLoginSheetProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const loginCards = [
    {
      id: "patient",
      title: "I am a Patient",
      description: "Access your profile or get emergency help.",
      icon: User,
      color: "from-purple-500 to-pink-500",
      onClick: onPatientClick,
      ariaLabel: "Login as a patient to access your profile or get emergency help"
    },
    {
      id: "pharmacist",
      title: "I am a Pharmacist", 
      description: "Access the full suite of clinical tools.",
      icon: BriefcaseMedical,
      color: "from-blue-500 to-cyan-500",
      onClick: onPharmacistClick,
      ariaLabel: "Login as a pharmacist to access the full suite of clinical tools"
    },
    {
      id: "student",
      title: "I am a Student",
      description: "Login to access learning modules.",
      icon: School,
      color: "from-green-500 to-emerald-500",
      onClick: onStudentClick,
      ariaLabel: "Login as a student to access learning modules"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-white/20 rounded-t-2xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-display font-bold text-gray-800">Get Started</h3>
                  <p className="text-gray-600 text-sm font-primary">Choose your role to continue</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Login Cards */}
            <div className="px-6 pb-6 space-y-3">
              {loginCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card 
                    className="login-card group bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300"
                    onClick={() => {
                      card.onClick();
                      onClose();
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={card.ariaLabel}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        card.onClick();
                        onClose();
                      }
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        {/* Icon */}
                        <motion.div
                          className={`w-10 h-10 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center shadow-md`}
                          initial={{ scale: 0 }}
                          animate={isVisible ? { scale: 1 } : { scale: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                        >
                          <card.icon className="w-5 h-5 text-white" />
                        </motion.div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-display font-bold text-gray-800 group-hover:text-gray-900 mb-1">
                            {card.title}
                          </h4>
                          <p className="text-gray-600 text-sm font-primary leading-relaxed">
                            {card.description}
                          </p>
                        </div>
                        
                        {/* Arrow indicator */}
                        <motion.div
                          className="text-gray-400 group-hover:text-gray-600 flex-shrink-0"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Accessibility note */}
            <div className="px-6 pb-4 text-center">
              <p className="text-xs text-gray-500 font-primary">
                Use Tab to navigate, Enter or Space to select
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
