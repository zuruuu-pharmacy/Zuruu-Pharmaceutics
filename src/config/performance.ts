// Performance optimization configuration
export const PERFORMANCE_CONFIG = {
  // Video optimization
  video: {
    preload: 'metadata' as const,
    posterQuality: 75,
    maxFileSize: 4 * 1024 * 1024, // 4MB
    formats: ['webm', 'mp4'],
    fallbackImage: '/assets/hero/poster.jpg'
  },

  // Image optimization
  images: {
    lazyLoadThreshold: 0.1,
    rootMargin: '50px',
    placeholder: '/assets/placeholder.jpg',
    quality: 75,
    formats: ['webp', 'avif', 'jpg', 'png']
  },

  // Animation optimization
  animations: {
    mobileDuration: 0.3,
    desktopDuration: 0.6,
    reducedMotionDuration: 0.01,
    useHardwareAcceleration: true
  },

  // Lottie optimization
  lottie: {
    maxFileSize: 500 * 1024, // 500KB
    preload: false,
    fallbackToCSS: true
  },

  // CDN configuration
  cdn: {
    baseUrl: process.env.NEXT_PUBLIC_CDN_URL || '',
    cacheHeaders: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Expires': new Date(Date.now() + 31536000 * 1000).toUTCString()
    }
  },

  // Lighthouse targets
  lighthouse: {
    lcp: 2.5, // seconds
    fid: 100, // milliseconds
    cls: 0.1, // score
    performance: 90, // score
    accessibility: 95 // score
  }
};

// Performance monitoring utilities
export const performanceUtils = {
  // Check if device is mobile
  isMobile: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  },

  // Check if user prefers reduced motion
  prefersReducedMotion: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Get optimized animation duration
  getAnimationDuration: (baseDuration: number): number => {
    if (performanceUtils.prefersReducedMotion()) return 0.01;
    if (performanceUtils.isMobile()) return baseDuration * 0.5;
    return baseDuration;
  },

  // Check if connection is slow
  isSlowConnection: (): boolean => {
    if (typeof navigator === 'undefined') return false;
    const connection = (navigator as any).connection;
    return connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  },

  // Get optimized image quality
  getImageQuality: (): number => {
    if (performanceUtils.isSlowConnection()) return 50;
    if (performanceUtils.isMobile()) return 75;
    return 90;
  }
};

// Resource hints for preloading
export const resourceHints = {
  // Preload critical resources
  preload: [
    '/assets/hero/poster.jpg',
    '/assets/icons/login-patient.svg',
    '/assets/icons/login-pharmacist.svg',
    '/assets/icons/login-student.svg'
  ],

  // Prefetch non-critical resources
  prefetch: [
    '/assets/hero/hero.webm',
    '/assets/hero/hero.mp4',
    '/assets/lottie/brain-pulse.json'
  ],

  // DNS prefetch for external resources
  dnsPrefetch: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ]
};

// Bundle splitting configuration
export const bundleSplitting = {
  // Critical chunks that should be loaded immediately
  critical: [
    'main',
    'pages/_app',
    'pages/index'
  ],

  // Non-critical chunks that can be loaded later
  nonCritical: [
    'components/landing/demo-modal',
    'components/landing/lottie-micro-animations',
    'components/performance/mobile-optimized-animations'
  ],

  // Vendor chunks
  vendors: [
    'react',
    'react-dom',
    'framer-motion',
    'lottie-react'
  ]
};
