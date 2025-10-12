"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import "@/styles/design-system.css";

interface ScrollHeaderProps {
  onPatientClick: () => void;
  onPharmacistClick: () => void;
  onStudentClick: () => void;
}

export function ScrollHeader({ onPatientClick, onPharmacistClick, onStudentClick }: ScrollHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1F59FF] focus:text-white focus:rounded-lg focus:font-medium focus:transition-all focus:duration-200"
      >
        Skip to main content
      </a>

      {/* Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
            : 'bg-transparent'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            
            {/* Left Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`heading-3 transition-colors duration-200 ${
                isScrolled ? 'text-[#1F59FF]' : 'text-white'
              }`}>
                Zuruu
              </div>
              <div className={`body-small transition-colors duration-200 ${
                isScrolled ? 'text-[#6B7280]' : 'text-white/80'
              }`}>
                Pharmaceutics
              </div>
            </motion.div>

            {/* Center Navigation - Hidden on mobile */}
            <nav className="hidden md:flex items-center space-x-8">
              <motion.button
                onClick={() => scrollToSection('hero')}
                className={`relative body-medium px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1F59FF] focus:ring-offset-2 ${
                  isScrolled ? 'text-[#6B7280] hover:text-[#1F59FF]' : 'text-white/90 hover:text-white'
                }`}
                whileHover={{ 
                  y: -2, 
                  scale: 1.05,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Hover background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#1F59FF]/10 to-[#14B8A6]/10 rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { duration: 0.3 }
                  }}
                />
                
                {/* Subtle pulse effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#1F59FF]/5 to-[#14B8A6]/5 rounded-lg"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1F59FF] to-[#14B8A6]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ 
                    scaleX: 1,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                />
                
                <span className="relative z-10">Home</span>
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('pillars')}
                className={`relative body-medium px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1F59FF] focus:ring-offset-2 ${
                  isScrolled ? 'text-[#6B7280] hover:text-[#1F59FF]' : 'text-white/90 hover:text-white'
                }`}
                whileHover={{ 
                  y: -2, 
                  scale: 1.05,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Hover background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#1F59FF]/10 to-[#14B8A6]/10 rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { duration: 0.3 }
                  }}
                />
                
                {/* Subtle pulse effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#1F59FF]/5 to-[#14B8A6]/5 rounded-lg"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                
                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1F59FF] to-[#14B8A6]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ 
                    scaleX: 1,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                />
                
                <span className="relative z-10">Features</span>
              </motion.button>
              
              <motion.a
                href="/support"
                className={`relative body-medium px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1F59FF] focus:ring-offset-2 ${
                  isScrolled ? 'text-[#6B7280] hover:text-[#1F59FF]' : 'text-white/90 hover:text-white'
                }`}
                whileHover={{ 
                  y: -2, 
                  scale: 1.05,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {/* Hover background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#1F59FF]/10 to-[#14B8A6]/10 rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { duration: 0.3 }
                  }}
                />
                
                {/* Subtle pulse effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#1F59FF]/5 to-[#14B8A6]/5 rounded-lg"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                
                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1F59FF] to-[#14B8A6]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ 
                    scaleX: 1,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                />
                
                <span className="relative z-10">Support</span>
              </motion.a>
            </nav>

            {/* Right Profile Circle */}
            <div className="flex items-center space-x-4">
              {/* Quick Access Buttons - Only show when scrolled */}
              <AnimatePresence>
                {isScrolled && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="hidden lg:flex items-center space-x-2"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onPatientClick}
                      className="text-[#1F59FF] border-[#1F59FF] hover:bg-[#1F59FF] hover:text-white transition-colors duration-200"
                    >
                      Patient
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onPharmacistClick}
                      className="text-[#1F59FF] border-[#1F59FF] hover:bg-[#1F59FF] hover:text-white transition-colors duration-200"
                    >
                      Pharmacist
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onStudentClick}
                      className="text-[#1F59FF] border-[#1F59FF] hover:bg-[#1F59FF] hover:text-white transition-colors duration-200"
                    >
                      Student
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = '/auth/login'}
                  className={`${isScrolled 
                    ? 'text-gray-700 border-gray-300 hover:text-blue-600 hover:border-blue-500 hover:bg-blue-50' 
                    : 'text-white/90 border-white/30 hover:text-white hover:border-white hover:bg-white/10'
                  } transition-all duration-300 transform hover:scale-105 backdrop-blur-sm font-semibold px-6 py-2`}
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => window.location.href = '/auth/signup'}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-semibold px-6 py-2"
                >
                  Sign Up
                </Button>
              </div>

            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}
