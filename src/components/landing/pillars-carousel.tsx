"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PillarsCarouselProps {
  children: React.ReactNode;
}

export function PillarsCarousel({ children }: PillarsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const scrollAmount = 320; // Width of one card + gap
    const currentScroll = scrollRef.current.scrollLeft;
    const newScroll = direction === 'left' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;
    
    scrollRef.current.scrollTo({
      left: newScroll,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: canScrollLeft ? 1 : 0, x: canScrollLeft ? 0 : -20 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className="bg-white/90 backdrop-blur-sm border-white/20 shadow-lg hover:bg-white hover:shadow-xl disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Right Arrow */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: canScrollRight ? 1 : 0, x: canScrollRight ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className="bg-white/90 backdrop-blur-sm border-white/20 shadow-lg hover:bg-white hover:shadow-xl disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex space-x-8 overflow-x-auto scrollbar-hide pb-4 px-12"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>

      {/* Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
