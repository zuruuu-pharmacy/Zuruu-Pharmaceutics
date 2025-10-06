"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, Users, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Chief Pharmacist",
    company: "Metro Health Pharmacy",
    content: "Zuruu has revolutionized our prescription management. The AI-powered drug interaction checking has prevented 3 potential adverse reactions this month alone. Our efficiency has increased by 40%.",
    rating: 5,
    avatar: "SC"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Pharmacy Director",
    company: "University Medical Center",
    content: "The automated inventory management is a game-changer. We've reduced waste by 25% and never run out of critical medications. The predictive analytics are incredibly accurate.",
    rating: 5,
    avatar: "MR"
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    role: "Clinical Pharmacist",
    company: "Regional Hospital",
    content: "The patient adherence tracking has helped us identify at-risk patients early. Our readmission rates have dropped by 30%. The interface is intuitive and saves us hours daily.",
    rating: 5,
    avatar: "EW"
  },
  {
    id: 4,
    name: "James Thompson",
    role: "Pharmacy Manager",
    company: "Community Health",
    content: "Implementation was seamless. The staff training was minimal because the system is so user-friendly. Our prescription accuracy is now at 99.8%.",
    rating: 5,
    avatar: "JT"
  },
  {
    id: 5,
    name: "Dr. Lisa Park",
    role: "Head of Pharmacy",
    company: "Children's Hospital",
    content: "The pediatric dosing calculations are incredibly precise. We've eliminated manual errors and our pediatric patients are safer than ever. The compliance features are outstanding.",
    rating: 5,
    avatar: "LP"
  },
  {
    id: 6,
    name: "Robert Kim",
    role: "Pharmacy Owner",
    company: "Family Care Pharmacy",
    content: "ROI was visible within the first month. Our prescription volume increased by 35% while reducing errors to near zero. The customer satisfaction scores are the highest they've ever been.",
    rating: 5,
    avatar: "RK"
  }
];

const stats = [
  { icon: Users, value: "10,000+", label: "Healthcare Professionals", color: "text-blue-600" },
  { icon: Award, value: "99.8%", label: "Accuracy Rate", color: "text-emerald-600" },
  { icon: TrendingUp, value: "40%", label: "Efficiency Increase", color: "text-purple-600" }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(147,51,234,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.1),transparent_50%)]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            Customer Success Stories
          </motion.div>

          <motion.h2
            className="text-5xl lg:text-6xl font-serif font-bold leading-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent">
              Trusted by Healthcare
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 bg-clip-text text-transparent">
              Professionals Worldwide
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Join thousands of healthcare professionals who have transformed their pharmacy operations 
            with Zuruu Pharmaceutics. Discover how our AI-powered solutions are revolutionizing patient care.
          </motion.p>
        </motion.div>

        {/* Main Testimonial */}
        <motion.div
          className="max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card 
            className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl relative overflow-hidden"
            onMouseEnter={() => setHoveredCard('main')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0"
              animate={hoveredCard === 'main' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Floating Elements */}
            {hoveredCard === 'main' && (
              <>
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full w-2 h-2 bg-blue-400/50"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 1.5],
                      x: [0, Math.random() * 200 - 100, Math.random() * 200 - 100],
                      y: [0, Math.random() * 200 - 100, Math.random() * 200 - 100],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: i * 0.2,
                    }}
                    style={{
                      left: `${20 + i * 10}%`,
                      top: `${30 + (i % 2) * 40}%`,
                    }}
                  />
                ))}
              </>
            )}

            <CardContent className="p-12 relative">
              {/* Quote Icon */}
              <motion.div
                className="flex justify-center mb-8"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  animate={hoveredCard === 'main' ? {
                    boxShadow: [
                      "0 10px 25px rgba(59, 130, 246, 0.3)",
                      "0 20px 40px rgba(147, 51, 234, 0.4)",
                      "0 10px 25px rgba(59, 130, 246, 0.3)"
                    ]
                  } : {}}
                >
                  <Quote className="w-10 h-10 text-white" />
                </motion.div>
              </motion.div>

              {/* Testimonial Content */}
              <motion.blockquote
                className="text-3xl lg:text-4xl font-serif font-medium text-gray-800 text-center leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                key={currentTestimonial.id}
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  "{currentTestimonial.content}"
                </span>
              </motion.blockquote>

              {/* Rating */}
              <motion.div
                className="flex justify-center mb-8"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.4, delay: 1.6 + i * 0.1 }}
                  >
                    <Star className="w-8 h-8 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Author Info */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 1.8 }}
              >
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-6 shadow-xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {currentTestimonial.avatar}
                  </motion.div>
                  <div className="text-left">
                    <h4 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-lg text-gray-600 mb-1">{currentTestimonial.role}</p>
                    <p className="text-blue-600 font-semibold text-lg">{currentTestimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex justify-center items-center gap-6 mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.button
            onClick={prevTestimonial}
            className="w-14 h-14 rounded-full border border-gray-300 bg-white hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex gap-3 mx-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          <motion.button
            onClick={nextTestimonial}
            className="w-14 h-14 rounded-full border border-gray-300 bg-white hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 2.4 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <stat.icon className={`w-10 h-10 ${stat.color}`} />
              </motion.div>
              <div className={`text-4xl font-serif font-bold ${stat.color} mb-3`}>
                {stat.value}
              </div>
              <div className="text-gray-600 font-semibold text-lg">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}