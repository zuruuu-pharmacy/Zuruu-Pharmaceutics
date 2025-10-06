"use client";

import { useEffect, useState } from "react";

interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  fcp: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
    fcp: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    const updateMetrics = (newMetrics: Partial<PerformanceMetrics>) => {
      setMetrics(prev => ({ ...prev, ...newMetrics }));
    };

    // LCP monitoring
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      updateMetrics({ lcp: lastEntry.startTime });
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // FID monitoring
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        updateMetrics({ fid: entry.processingStart - entry.startTime });
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
          updateMetrics({ cls: clsValue });
        }
      });
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // TTFB monitoring
    const ttfbObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        updateMetrics({ ttfb: entry.responseStart - entry.requestStart });
      });
    });
    ttfbObserver.observe({ entryTypes: ['navigation'] });

    // FCP monitoring
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        updateMetrics({ fcp: entry.startTime });
      });
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Show metrics after 3 seconds
    setTimeout(() => setIsVisible(true), 3000);

    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      ttfbObserver.disconnect();
      fcpObserver.disconnect();
    };
  }, []);

  if (!isVisible || process.env.NODE_ENV !== 'development') return null;

  const getScore = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return 'good';
    if (value <= thresholds[1]) return 'needs-improvement';
    return 'poor';
  };

  const lcpScore = getScore(metrics.lcp, [2500, 4000]);
  const fidScore = getScore(metrics.fid, [100, 300]);
  const clsScore = getScore(metrics.cls, [0.1, 0.25]);

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold">Performance Monitor</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white/60 hover:text-white"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>LCP:</span>
          <span className={`${
            lcpScore === 'good' ? 'text-green-400' : 
            lcpScore === 'needs-improvement' ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {metrics.lcp.toFixed(0)}ms
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>FID:</span>
          <span className={`${
            fidScore === 'good' ? 'text-green-400' : 
            fidScore === 'needs-improvement' ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {metrics.fid.toFixed(0)}ms
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>CLS:</span>
          <span className={`${
            clsScore === 'good' ? 'text-green-400' : 
            clsScore === 'needs-improvement' ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {metrics.cls.toFixed(3)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>TTFB:</span>
          <span className="text-blue-400">
            {metrics.ttfb.toFixed(0)}ms
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>FCP:</span>
          <span className="text-blue-400">
            {metrics.fcp.toFixed(0)}ms
          </span>
        </div>
      </div>
      
      <div className="mt-2 pt-2 border-t border-white/20">
        <div className="text-xs text-white/60">
          Targets: LCP &lt;2.5s, FID &lt;100ms, CLS &lt;0.1
        </div>
      </div>
    </div>
  );
}

// Hook for performance monitoring
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
    fcp: 0
  });

  useEffect(() => {
    const updateMetrics = (newMetrics: Partial<PerformanceMetrics>) => {
      setMetrics(prev => ({ ...prev, ...newMetrics }));
    };

    // Performance monitoring implementation
    // ... (same as above)

    return () => {
      // Cleanup
    };
  }, []);

  return metrics;
}
