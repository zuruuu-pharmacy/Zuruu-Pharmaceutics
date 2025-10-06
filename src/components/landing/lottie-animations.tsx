"use client";

import { useEffect, useRef } from "react";

interface LottieAnimationProps {
  animationType: 'analyze' | 'prescribe' | 'deliver';
  className?: string;
}

export function LottieAnimation({ animationType, className = "" }: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // For now, we'll use CSS animations as placeholders
    // In a real implementation, you would load actual Lottie animations here
    const container = containerRef.current;
    if (!container) return;

    // Add animation classes based on type
    switch (animationType) {
      case 'analyze':
        container.classList.add('analyze-animation');
        break;
      case 'prescribe':
        container.classList.add('prescribe-animation');
        break;
      case 'deliver':
        container.classList.add('deliver-animation');
        break;
    }
  }, [animationType]);

  return (
    <div 
      ref={containerRef}
      className={`lottie-container ${className}`}
      style={{ width: '80px', height: '80px' }}
    >
      {/* Placeholder for Lottie animation */}
      <div className="w-full h-full flex items-center justify-center">
        {animationType === 'analyze' && (
          <div className="analyze-placeholder w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">📊</span>
          </div>
        )}
        {animationType === 'prescribe' && (
          <div className="prescribe-placeholder w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">✓</span>
          </div>
        )}
        {animationType === 'deliver' && (
          <div className="deliver-placeholder w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">🚚</span>
          </div>
        )}
      </div>

      <style jsx>{`
        .analyze-animation .analyze-placeholder {
          animation: countUpPulse 2s ease-in-out;
        }
        
        .prescribe-animation .prescribe-placeholder {
          animation: checkmarkReveal 1.5s ease-out;
        }
        
        .deliver-animation .deliver-placeholder {
          animation: slideIn 1.8s ease-out;
        }
        
        @keyframes countUpPulse {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: scale(1) rotate(360deg); opacity: 1; }
        }
        
        @keyframes checkmarkReveal {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          50% { transform: scale(1.3) rotate(0deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes slideIn {
          0% { transform: translateX(-100px) scale(0.5); opacity: 0; }
          50% { transform: translateX(0) scale(1.1); opacity: 1; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// Individual animation components for easier use
export function AnalyzeLottie({ className }: { className?: string }) {
  return <LottieAnimation animationType="analyze" className={className} />;
}

export function PrescribeLottie({ className }: { className?: string }) {
  return <LottieAnimation animationType="prescribe" className={className} />;
}

export function DeliverLottie({ className }: { className?: string }) {
  return <LottieAnimation animationType="deliver" className={className} />;
}
