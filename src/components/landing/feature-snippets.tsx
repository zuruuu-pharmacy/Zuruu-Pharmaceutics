"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  CheckCircle,
  Truck,
  Brain,
  Zap,
  Target,
  TrendingUp,
  Clock,
  Shield,
  ArrowRight,
  Sparkles,
  Star,
  Award,
  Users,
  Activity
} from "lucide-react";
import { AIBrainPulseAnimation, ShelfRestockAnimation, IconDrawAnimation } from "./lottie-micro-animations";
import "@/styles/design-system.css";

const workflowSteps = [
  {
    id: "analyze",
    title: "Intelligent Analysis",
    description: "Advanced AI algorithms analyze patient data, drug interactions, and clinical patterns with unprecedented accuracy and speed.",
    icon: BarChart3,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    borderColor: "border-blue-200",
    hoverColor: "hover:border-blue-400",
    stat: 99.7,
    statLabel: "Accuracy Rate",
    animationType: "countUp",
    features: [
      "Real-time pattern recognition",
      "Predictive analytics",
      "Risk assessment algorithms",
      "Clinical decision support"
    ],
    gradient: "from-blue-500 via-cyan-500 to-blue-600"
  },
  {
    id: "prescribe",
    title: "Smart Prescribing",
    description: "AI-assisted dose optimization and clinical decision support ensuring safer, more effective medication management.",
    icon: CheckCircle,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200",
    hoverColor: "hover:border-emerald-400",
    stat: 50000,
    statLabel: "Daily Checks",
    animationType: "checkmark",
    features: [
      "Automated dose calculations",
      "Drug interaction screening",
      "Allergy checking",
      "Compliance monitoring"
    ],
    gradient: "from-emerald-500 via-teal-500 to-emerald-600"
  },
  {
    id: "deliver",
    title: "Seamless Delivery",
    description: "Automated fulfillment systems with intelligent tracking and optimization for superior patient care outcomes.",
    icon: Truck,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    hoverColor: "hover:border-purple-400",
    stat: 2.5,
    statLabel: "Avg Delivery",
    animationType: "slide",
    features: [
      "Automated inventory management",
      "Smart delivery routing",
      "Real-time tracking",
      "Quality assurance"
    ],
    gradient: "from-purple-500 via-pink-500 to-purple-600"
  }
];

const stats = [
  { icon: Users, value: "10,000+", label: "Healthcare Professionals", color: "text-blue-600" },
  { icon: Award, value: "99.8%", label: "Accuracy Rate", color: "text-emerald-600" },
  { icon: TrendingUp, value: "40%", label: "Efficiency Increase", color: "text-purple-600" },
  { icon: Shield, value: "HIPAA", label: "Compliant", color: "text-orange-600" }
];

export function FeatureSnippets() {
  const [isVisible, setIsVisible] = useState(false);
  const [countUpValues, setCountUpValues] = useState({ analyze: 0, prescribe: 0, deliver: 0 });
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showSlide, setShowSlide] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
      
      // Start count-up animation for Analyze step
      animateCountUp('analyze', 99.7, 2000);
      animateCountUp('prescribe', 50000, 2500);
      animateCountUp('deliver', 2.5, 2000);
      
      // Start checkmark animation for Prescribe step
      setTimeout(() => {
        setShowCheckmark(true);
      }, 1000);
      
      // Start slide animation for Deliver step
      setTimeout(() => {
        setShowSlide(true);
      }, 1500);
    }
  }, [isInView]);

  const animateCountUp = (key: 'analyze' | 'prescribe' | 'deliver', target: number, duration: number) => {
    let start = 0;
    const increment = target / (duration / 50);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setCountUpValues(prev => ({ ...prev, [key]: Math.floor(start) }));
    }, 50);
  };

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
        {Array.from({ length: 15 }).map((_, i) => (
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Features
          </motion.div>

          <motion.h2
            className="text-5xl lg:text-6xl font-serif font-bold leading-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent">
              Revolutionary Pharmacy
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 bg-clip-text text-transparent">
              Intelligence Platform
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Experience the future of pharmaceutical operations with our cutting-edge AI technology. 
            Transform your workflow with intelligent automation, predictive analytics, and seamless integration.
          </motion.p>
        </motion.div>

        {/* 3-Step Workflow */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2 + index * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="group relative"
              onMouseEnter={() => setHoveredCard(step.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Connection Arrow */}
              {index < workflowSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 z-10">
                  <motion.div
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                  >
                    <ArrowRight className="w-6 h-6 text-gray-600" />
                  </motion.div>
                </div>
              )}

              <Card 
                className={`${step.bgColor} ${step.borderColor} ${step.hoverColor} border-2 h-full transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-4 relative overflow-hidden`}
              >
                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  animate={hoveredCard === step.id ? { opacity: 0.05 } : { opacity: 0 }}
                />

                {/* Floating Elements */}
                {hoveredCard === step.id && (
                  <>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute rounded-full w-2 h-2 ${
                          step.color === 'from-blue-500 to-cyan-500' ? 'bg-blue-400' :
                          step.color === 'from-emerald-500 to-teal-500' ? 'bg-emerald-400' :
                          'bg-purple-400'
                        }/50`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 1.5],
                          x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
                          y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
                        }}
                        transition={{
                          duration: Math.random() * 3 + 2,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: i * 0.2,
                        }}
                        style={{
                          left: `${20 + i * 12}%`,
                          top: `${30 + (i % 2) * 40}%`,
                        }}
                      />
                    ))}
                  </>
                )}

                <CardContent className="p-8 relative">
                  {/* Step Number */}
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${step.gradient} text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-8 shadow-xl`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Icon with Complex Animation */}
                  <motion.div
                    className={`w-24 h-24 bg-gradient-to-br ${step.gradient} rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl relative overflow-hidden`}
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    animate={hoveredCard === step.id ? {
                      boxShadow: [
                        "0 10px 25px rgba(0,0,0,0.1)",
                        "0 20px 40px rgba(0,0,0,0.2)",
                        "0 10px 25px rgba(0,0,0,0.1)"
                      ]
                    } : {}}
                  >
                    {/* Ripple Effect */}
                    {hoveredCard === step.id && (
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-3xl"
                        animate={{ scale: 1.2, opacity: 0.3 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}

                    <motion.div
                      animate={hoveredCard === step.id ? { rotate: 5 } : { rotate: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <step.icon className="w-12 h-12 text-white" />
                    </motion.div>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-3xl font-serif font-bold text-center mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  >
                    <span className={`bg-gradient-to-r ${
                      step.color === 'from-blue-500 to-cyan-500' ? 'from-blue-600 to-cyan-600' :
                      step.color === 'from-emerald-500 to-teal-500' ? 'from-emerald-600 to-teal-600' :
                      'from-purple-600 to-pink-600'
                    } bg-clip-text text-transparent`}>
                      {step.title}
                    </span>
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="text-gray-600 text-center mb-8 leading-relaxed text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                  >
                    {step.description}
                  </motion.p>

                  {/* Features List */}
                  <motion.div
                    className="space-y-3 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                  >
                    {step.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, delay: 1.4 + featureIndex * 0.1 }}
                      >
                        <motion.div
                          className="w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center"
                          whileHover={{ scale: 1.2 }}
                        >
                          <CheckCircle className="w-3 h-3 text-white" />
                        </motion.div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Animated Stats */}
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, delay: 1.6 + index * 0.2 }}
                  >
                    <div className="text-4xl font-bold text-gray-800 mb-2">
                      {step.animationType === "countUp" && (
                        <motion.span
                          className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.3, delay: 2 }}
                        >
                          {countUpValues.analyze}%
                        </motion.span>
                      )}
                      {step.animationType === "checkmark" && (
                        <motion.span
                          className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.3, delay: 2.2 }}
                        >
                          {countUpValues.prescribe.toLocaleString()}+
                        </motion.span>
                      )}
                      {step.animationType === "slide" && (
                        <motion.span
                          className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.3, delay: 2.4 }}
                        >
                          {countUpValues.deliver}hrs
                        </motion.span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 font-semibold">
                      {step.statLabel}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </motion.div>
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
          >
            Ready to transform your pharmacy operations with cutting-edge AI technology?
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, delay: 2.6 }}
          >
            <motion.button
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 inline" />
            </motion.button>
            <motion.button
              className="px-12 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Demo
              <Activity className="ml-2 w-5 h-5 inline" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}