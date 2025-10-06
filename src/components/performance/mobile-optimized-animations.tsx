"use client";

import { motion, MotionProps } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface MobileOptimizedAnimationsProps {
  children: React.ReactNode;
  className?: string;
  animationProps?: MotionProps;
  reduceMotionOnMobile?: boolean;
}

export function MobileOptimizedAnimations({
  children,
  className = "",
  animationProps = {},
  reduceMotionOnMobile = true
}: MobileOptimizedAnimationsProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check reduced motion preference
    const checkReducedMotion = () => {
      setPrefersReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener('resize', checkMobile);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkReducedMotion);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);

  // Optimize animations for mobile
  const optimizedProps = {
    ...animationProps,
    transition: {
      duration: isMobile ? 0.3 : (animationProps.transition as any)?.duration || 0.6,
      ease: isMobile ? "easeOut" : (animationProps.transition as any)?.ease || "easeInOut",
      ...(animationProps.transition as any)
    },
    // Reduce complex animations on mobile
    animate: isMobile && reduceMotionOnMobile 
      ? { opacity: 1, y: 0 } 
      : animationProps.animate,
    // Disable animations if user prefers reduced motion
    ...(prefersReducedMotion && {
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.01 }
    })
  };

  return (
    <motion.div
      className={className}
      {...optimizedProps}
    >
      {children}
    </motion.div>
  );
}

// Hook for performance monitoring
export function usePerformanceMonitoring() {
  const [metrics, setMetrics] = useState({
    lcp: 0,
    fid: 0,
    cls: 0
  });

  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // LCP monitoring
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // FID monitoring
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // CLS monitoring
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            setMetrics(prev => ({ ...prev, cls: clsValue }));
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);

  return metrics;
}

// Image lazy loading component
export function LazyImage({
  src,
  alt,
  className = "",
  placeholder = "/assets/placeholder.jpg",
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  [key: string]: any;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <img src={placeholder} alt="" className="w-8 h-8 opacity-50" />
        </div>
      )}
    </div>
  );
}
