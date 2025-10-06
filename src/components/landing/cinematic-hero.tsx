"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, BriefcaseMedical, School, Play, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollHeader } from "./scroll-header";
import "@/styles/design-system.css";

interface CinematicHeroProps {
  onPatientClick: () => void;
  onPharmacistClick: () => void;
  onStudentClick: () => void;
  onDemoClick: () => void;
}

export function CinematicHero({ 
  onPatientClick, 
  onPharmacistClick, 
  onStudentClick, 
  onDemoClick 
}: CinematicHeroProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showOverlays, setShowOverlays] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simulate video loading
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
      setShowOverlays(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const loginCards = [
    {
      id: "patient",
      title: "I am a Patient",
      description: "Access your profile or get emergency help.",
      icon: User,
      color: "from-purple-500 to-pink-500",
      onClick: onPatientClick
    },
    {
      id: "pharmacist",
      title: "I am a Pharmacist", 
      description: "Access the full suite of clinical tools.",
      icon: BriefcaseMedical,
      color: "from-blue-500 to-cyan-500",
      onClick: onPharmacistClick
    },
    {
      id: "student",
      title: "I am a Student",
      description: "Login to access learning modules.",
      icon: School,
      color: "from-green-500 to-emerald-500",
      onClick: onStudentClick
    }
  ];

  return (
    <div id="hero" className="relative min-h-screen overflow-hidden">
      {/* Scroll Header */}
      <ScrollHeader
        onPatientClick={onPatientClick}
        onPharmacistClick={onPharmacistClick}
        onStudentClick={onStudentClick}
      />

      {/* Hero Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder gradient background - replace with actual video */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0A3BB8] to-slate-800">
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Animated background elements with Zuruu blue */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1F59FF]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#14B8A6]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#1F59FF]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      </div>


      {/* Main Content */}
      <div id="main-content" className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="text-white space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.h1 
              className="text-5xl lg:text-7xl font-display font-black leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              Zuruu Pharmaceutics
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl font-primary text-white/90 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58 }}
            >
              Advanced Pharmaceutical Intelligence Platform
            </motion.p>
            
            <motion.p 
              className="text-lg font-primary text-white/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Comprehensive pharmaceutical solutions for industry, hospitals, retail, and academia — one intelligent platform for every pharmaceutical setting.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.8 }}
            >
              <Button 
                size="lg" 
                className="bg-[#1F59FF] text-white hover:bg-[#0D47D9] text-lg px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Zuruu
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 font-semibold backdrop-blur-sm"
                onClick={onDemoClick}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch full demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Floating Glass Login Panel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 14, rotateX: 2 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Card className="glass-card-strong rounded-2xl p-8">
              <CardContent className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Get Started</h3>
                  <p className="text-white/80 font-primary">Choose your role to continue</p>
                </div>

                <div className="grid gap-4">
                  {loginCards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className="glass-card-subtle hover:glass-card transition-all duration-300 cursor-pointer group hover:scale-105"
                        onClick={card.onClick}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <motion.div
                              className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shadow-lg`}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.32, delay: 0.9 + index * 0.1 }}
                            >
                              <card.icon className="w-6 h-6 text-white" />
                            </motion.div>
                            
                            <div className="flex-1">
                              <h4 className="text-lg font-display font-semibold text-white group-hover:text-white/90">
                                {card.title}
                              </h4>
                              <p className="text-white/70 text-sm font-primary">
                                {card.description}
                              </p>
                            </div>
                            
                            <motion.div
                              className="text-white/60 group-hover:text-white/80"
                              whileHover={{ x: 4 }}
                            >
                              →
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Holographic Overlays */}
      <AnimatePresence>
        {showOverlays && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {/* Bar Chart Overlay */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-20 glass-card-subtle rounded-lg p-4"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="text-white text-xs font-semibold mb-2 font-primary">Analytics</div>
              <div className="flex space-x-1">
                {[40, 60, 80, 45, 70].map((height, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-t from-[#1F59FF] to-[#14B8A6] rounded-sm"
                    style={{ height: `${height}%`, width: '12px' }}
                  />
                ))}
              </div>
            </motion.div>

            {/* SKU Count Overlay */}
            <motion.div
              className="absolute top-1/3 right-1/4 w-28 h-16 glass-card-subtle rounded-lg p-3"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.88 }}
            >
              <div className="text-white text-xs font-semibold font-primary">SKU Count</div>
              <div className="text-white text-lg font-bold font-display">2,847</div>
            </motion.div>

            {/* Neural Pulse Overlay */}
            <motion.div
              className="absolute bottom-1/3 left-1/3 w-24 h-16 glass-card-subtle rounded-lg p-3"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.96 }}
            >
              <div className="text-white text-xs font-semibold font-primary">AI Pulse</div>
              <div className="flex space-x-1 mt-1">
                {[1, 2, 3, 2, 1].map((height, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-t from-[#1F59FF] to-[#14B8A6] rounded-sm animate-pulse"
                    style={{ height: `${height * 4}px`, width: '3px' }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-sm">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </div>
  );
}
