"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, BriefcaseMedical, School, Play, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollHeader } from "./scroll-header";
import { FloatingGlassPanel } from "./floating-glass-panel";
import "@/styles/design-system.css";

interface CinematicHeroVideoProps {
  onPatientClick: () => void;
  onPharmacistClick: () => void;
  onStudentClick: () => void;
  onDemoClick: () => void;
}

export function CinematicHeroVideo({ 
  onPatientClick, 
  onPharmacistClick, 
  onStudentClick, 
  onDemoClick 
}: CinematicHeroVideoProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showOverlays, setShowOverlays] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoLazyLoaded, setIsVideoLazyLoaded] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Lazy load video after intersection
          setTimeout(() => {
            setIsVideoLazyLoaded(true);
          }, 100);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Video loading and autoplay handling
  useEffect(() => {
    if (isVideoLazyLoaded && videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadedData = () => {
        setIsVideoLoaded(true);
        setShowOverlays(true);
      };

      const handlePlay = () => {
        setIsVideoPlaying(true);
        setAutoplayBlocked(false);
      };

      const handlePlayError = () => {
        setAutoplayBlocked(true);
        setIsVideoPlaying(false);
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('play', handlePlay);
      video.addEventListener('error', handlePlayError);

      // Try to play video
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setAutoplayBlocked(true);
        });
      }

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('error', handlePlayError);
      };
    }
  }, [isVideoLazyLoaded]);


  return (
    <div id="hero" ref={heroRef} className="relative min-h-[78vh] overflow-hidden">
      {/* Scroll Header */}
      <ScrollHeader
        onPatientClick={onPatientClick}
        onPharmacistClick={onPharmacistClick}
        onStudentClick={onStudentClick}
      />

      {/* Hero Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Poster Image - Fades out when video loads */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0A3BB8] to-slate-800"
          animate={{ opacity: isVideoLoaded ? 0 : 1 }}
          transition={{ duration: 0.9 }}
        >
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Animated background elements with Zuruu blue */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1F59FF]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#14B8A6]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#1F59FF]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </motion.div>

        {/* Video Element - Fades in when loaded */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: isVideoLoaded ? 1 : 0 }}
          transition={{ duration: 0.9 }}
        >
          {/* Performance Optimized Video Element */}
          {isVideoLazyLoaded && (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/assets/hero/poster.jpg"
              aria-label="Zuruu Pharmaceutics platform demonstration video"
              style={{ 
                willChange: 'transform',
                transform: 'translateZ(0)' // Hardware acceleration
              }}
            >
              <source src="/assets/hero/hero.webm" type="video/webm" />
              <source src="/assets/hero/hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          
          {/* Fallback gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0A3BB8] to-slate-800">
            <div className="absolute inset-0 bg-black/30" />
            
            {/* Autoplay Blocked Fallback */}
            {autoplayBlocked && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center text-white">
                  <motion.div
                    className="w-20 h-20 bg-[#1F59FF]/20 rounded-full flex items-center justify-center mb-4 mx-auto cursor-pointer hover:bg-[#1F59FF]/30 transition-colors"
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.play();
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-8 h-8 text-[#1F59FF]" />
                  </motion.div>
                  <p className="text-lg font-display font-semibold mb-2">Watch Demo</p>
                  <p className="text-sm text-white/70 font-primary">Click to play video</p>
                </div>
              </motion.div>
            )}
            
            {/* Simulated video content with camera movement */}
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 0.5, 0]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {/* Animated background elements for video simulation */}
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1F59FF]/15 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#14B8A6]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#1F59FF]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div id="main-content" className="relative z-10 flex items-center justify-center min-h-[78vh] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-4 lg:gap-8 items-center w-full">
          
          {/* Left Content */}
          <motion.div 
            className="text-white space-y-8 lg:pr-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Headline - Slide up with exact timing */}
            <motion.h1 
              className="heading-1 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4, 
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              Zuruu Pharmaceutics
            </motion.h1>
            
            <motion.h2 
              className="heading-3 text-white/95 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.6, 
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              Advanced Pharmaceutical Intelligence Platform
            </motion.h2>
            
            {/* Subheadline - Exact delay timing */}
            <motion.p 
              className="body-large text-white/90 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Comprehensive pharmaceutical solutions for industry, hospitals, retail, and academia — one intelligent platform for every pharmaceutical setting.
            </motion.p>

            {/* CTAs - Pop-in with exact stagger timing */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.8 }}
              >
                <Button 
                  size="lg" 
                  className="bg-[#1F59FF] text-white hover:bg-[#0D47D9] text-lg px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus-visible"
                  onClick={() => document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' })}
                  aria-label="Explore Zuruu features and scroll to pillars section"
                >
                  Explore Zuruu
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.86 }} // 0.06s stagger
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="relative border-2 border-white/80 text-white hover:bg-white/20 text-lg px-8 py-6 font-semibold backdrop-blur-md focus-visible overflow-hidden group"
                    onClick={onDemoClick}
                    aria-label="Watch full demo video of Zuruu Pharmaceutics platform"
                  >
                    {/* Animated background glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#1F59FF]/20 via-[#14B8A6]/20 to-[#1F59FF]/20"
                      animate={{
                        background: [
                          "linear-gradient(90deg, rgba(31, 89, 255, 0.2) 0%, rgba(20, 184, 166, 0.2) 50%, rgba(31, 89, 255, 0.2) 100%)",
                          "linear-gradient(90deg, rgba(20, 184, 166, 0.2) 0%, rgba(31, 89, 255, 0.2) 50%, rgba(20, 184, 166, 0.2) 100%)",
                          "linear-gradient(90deg, rgba(31, 89, 255, 0.2) 0%, rgba(20, 184, 166, 0.2) 50%, rgba(31, 89, 255, 0.2) 100%)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    {/* Hover shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, 0]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Play className="w-5 h-5 mr-2" aria-hidden="true" />
                      </motion.div>
                      <span className="font-display font-bold">Watch full demo</span>
                    </div>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Floating Glass Login Panel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 14, rotateX: 2 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <FloatingGlassPanel
              onPatientClick={onPatientClick}
              onPharmacistClick={onPharmacistClick}
              onStudentClick={onStudentClick}
            />
          </motion.div>
        </div>
      </div>

      {/* Holographic Overlays - Exact timing and stagger */}
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
              transition={{ duration: 0.6, delay: 0.88 }} // 0.08s stagger
            >
              <div className="text-white text-xs font-semibold font-primary">SKU Count</div>
              <div className="text-white text-lg font-bold font-display">2,847</div>
            </motion.div>

            {/* Neural Pulse Overlay */}
            <motion.div
              className="absolute bottom-1/3 left-1/3 w-24 h-16 glass-card-subtle rounded-lg p-3"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.96 }} // 0.08s stagger
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
          <span className="text-sm font-primary">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </div>
  );
}
