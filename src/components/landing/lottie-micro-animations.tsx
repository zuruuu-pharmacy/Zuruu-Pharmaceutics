"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

interface LottieAnimationProps {
  animationType: 'ai-brain-pulse' | 'shelf-restock' | 'icon-draw' | 'cta-ripple';
  className?: string;
  duration?: number;
  loop?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function LottieMicroAnimation({ 
  animationType, 
  className = "", 
  duration = 1000,
  loop = true,
  size = 'md'
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  useEffect(() => {
    // Simulate Lottie loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const renderAnimation = () => {
    switch (animationType) {
      case 'ai-brain-pulse':
        return <AIBrainPulse size={size} loop={loop} />;
      case 'shelf-restock':
        return <ShelfRestockSequence size={size} />;
      case 'icon-draw':
        return <IconDrawAnimationInternal size={size} duration={duration} />;
      case 'cta-ripple':
        return <CTARipple size={size} />;
      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`lottie-container ${sizeClasses[size]} ${className}`}
    >
      {isLoaded && renderAnimation()}
    </div>
  );
}

// AI Brain Pulse Animation
function AIBrainPulse({ size, loop }: { size: string; loop: boolean }) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Load Lottie animation data
    fetch('/assets/lottie/brain-pulse.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading Lottie animation:', error));
  }, []);

  if (!animationData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

// Shelf Restock Sequence Animation
function ShelfRestockSequence({ size }: { size: string }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % 3);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        className="relative w-12 h-8 bg-gray-200 rounded"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.5 }}
      >
        {/* Low Stock State */}
        {currentStep === 0 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-2 h-6 bg-red-500 rounded-sm"></div>
            <div className="w-2 h-4 bg-red-500 rounded-sm ml-1"></div>
            <div className="w-2 h-2 bg-red-500 rounded-sm ml-1"></div>
          </motion.div>
        )}

        {/* Restock Box */}
        {currentStep === 1 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <motion.div
              className="w-8 h-6 bg-blue-500 rounded flex items-center justify-center"
              animate={{
                y: [-10, 0, -10]
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut"
              }}
            >
              <span className="text-white text-xs">📦</span>
            </motion.div>
          </motion.div>
        )}

        {/* Check Mark */}
        {currentStep === 2 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <motion.div
              className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
              animate={{
                scale: [0, 1.2, 1]
              }}
              transition={{
                duration: 0.6,
                ease: [0.68, -0.55, 0.265, 1.55]
              }}
            >
              <span className="text-white text-sm">✓</span>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

// Icon Draw Animation
function IconDrawAnimationInternal({ size, duration }: { size: string; duration: number }) {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: duration / 1000,
            ease: "easeInOut"
          }}
        />
        <motion.circle
          cx="12"
          cy="7"
          r="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: duration / 1000,
            ease: "easeInOut",
            delay: 0.2
          }}
        />
      </motion.svg>
    </motion.div>
  );
}

// CTA Ripple Animation
function CTARipple({ size }: { size: string }) {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 3, opacity: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut"
      }}
    >
      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
    </motion.div>
  );
}

// Specific Animation Components
export function AIBrainPulseAnimation({ className }: { className?: string }) {
  return (
    <LottieMicroAnimation 
      animationType="ai-brain-pulse" 
      className={className}
      loop={true}
      size="md"
    />
  );
}

export function ShelfRestockAnimation({ className }: { className?: string }) {
  return (
    <LottieMicroAnimation 
      animationType="shelf-restock" 
      className={className}
      loop={true}
      size="md"
    />
  );
}

export function IconDrawAnimation({ 
  className, 
  duration = 320 
}: { 
  className?: string; 
  duration?: number;
}) {
  return (
    <LottieMicroAnimation 
      animationType="icon-draw" 
      className={className}
      duration={duration}
      loop={false}
      size="sm"
    />
  );
}

export function CTARippleAnimation({ className }: { className?: string }) {
  return (
    <LottieMicroAnimation 
      animationType="cta-ripple" 
      className={className}
      loop={false}
      size="sm"
    />
  );
}

// File Size Recommendations and Optimization Guide
export const LottieOptimizationGuide = {
  fileSizes: {
    'ai-brain-pulse': '~350KB (Lottie) / ~180KB (MP4) / ~45KB (GIF)',
    'shelf-restock': '~420KB (Lottie) / ~220KB (MP4) / ~55KB (GIF)',
    'icon-draw': '~280KB (Lottie) / ~150KB (MP4) / ~35KB (GIF)',
    'cta-ripple': '~150KB (Lottie) / ~80KB (MP4) / ~20KB (GIF)'
  },
  optimization: {
    techniques: [
      'Use simple shapes and paths',
      'Minimize keyframes (max 60fps)',
      'Reduce color palette',
      'Optimize bezier curves',
      'Use solid colors instead of gradients where possible',
      'Compress with LottieFiles optimizer'
    ],
    performance: [
      'Preload critical animations',
      'Use CSS transforms for positioning',
      'Implement intersection observer for lazy loading',
      'Cache animations in memory',
      'Use requestAnimationFrame for smooth playback'
    ],
    fallbacks: [
      'CSS animations for critical interactions',
      'GIF fallbacks for older browsers',
      'Static SVG for no-JS scenarios',
      'Progressive enhancement approach'
    ]
  }
};
