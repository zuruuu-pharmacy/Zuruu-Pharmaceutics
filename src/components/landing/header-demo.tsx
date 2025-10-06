"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function HeaderDemo() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.button
        onClick={() => setShowDemo(!showDemo)}
        className="px-4 py-2 bg-[#1F59FF] text-white rounded-lg font-medium shadow-lg hover:bg-[#0D47D9] transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showDemo ? 'Hide' : 'Show'} Header Demo
      </motion.button>

      {showDemo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl p-4 border"
        >
          <h3 className="font-bold text-[#1F2937] mb-2">Header Animation Demo</h3>
          <div className="space-y-2 text-sm text-[#6B7280]">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isScrolled ? 'bg-[#1F59FF]' : 'bg-gray-300'}`} />
              <span>Scroll State: {isScrolled ? 'Scrolled' : 'Top'}</span>
            </div>
            <div className="text-xs">
              • Fades in on load (0.5s)<br/>
              • Transitions to white background on scroll<br/>
              • Quick access buttons appear when scrolled<br/>
              • Smooth 200ms transitions
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
