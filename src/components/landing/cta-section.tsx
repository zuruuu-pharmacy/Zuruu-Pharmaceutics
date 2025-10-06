"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Play, Download, Calendar, Sparkles, Zap, Shield, Target, Star, Award, Users } from "lucide-react";

const ctaActions = [
  {
    id: "trial",
    title: "Start Free Trial",
    description: "Experience the full power of Zuruu Pharmaceutics with a 14-day free trial",
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    borderColor: "border-blue-200",
    buttonText: "Get Started Free",
    buttonVariant: "default" as const,
    href: "#"
  },
  {
    id: "demo",
    title: "Schedule Demo",
    description: "See Zuruu in action with a personalized demonstration",
    icon: Play,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    buttonText: "Book Demo",
    buttonVariant: "outline" as const,
    href: "#"
  },
  {
    id: "download",
    title: "Download Brochure",
    description: "Get detailed information about our features and capabilities",
    icon: Download,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200",
    buttonText: "Download PDF",
    buttonVariant: "outline" as const,
    href: "#"
  }
];

const benefits = [
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Enterprise-grade security"
  },
  {
    icon: Target,
    title: "99.8% Accuracy",
    description: "AI-powered precision"
  },
  {
    icon: Sparkles,
    title: "Easy Setup",
    description: "Get started in minutes"
  }
];

const stats = [
  { icon: Users, value: "10,000+", label: "Healthcare Professionals" },
  { icon: Award, value: "99.9%", label: "Uptime Guarantee" },
  { icon: Star, value: "4.9/5", label: "Customer Rating" }
];

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Main CTA */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            Ready to Transform Your Pharmacy?
          </motion.div>

          <motion.h2
            className="text-5xl lg:text-7xl font-serif font-bold leading-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Let's Collaborate & Build
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              the Future of Pharmacy with AI
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Together, we can create innovative solutions that revolutionize healthcare and make a meaningful impact on patients' lives worldwide.
          </motion.p>

          {/* Primary CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="px-16 py-5 text-xl font-semibold bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-105 rounded-2xl shadow-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
              <ArrowRight className="ml-3 w-6 h-6 inline" />
            </motion.button>
            <motion.button
              className="px-16 py-5 text-xl font-semibold border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 rounded-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Demo
              <Calendar className="ml-3 w-6 h-6 inline" />
            </motion.button>
          </motion.div>

          {/* Benefits */}
          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 text-blue-100"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <benefit.icon className="w-6 h-6 text-yellow-400" />
                <span className="font-semibold text-lg">{benefit.title}</span>
                <span className="text-blue-200">•</span>
                <span className="text-lg">{benefit.description}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Action Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          {ctaActions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Card className={`${action.bgColor} ${action.borderColor} border-2 h-full hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>
                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Floating Elements */}
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  whileHover={{
                    opacity: 1,
                  }}
                  initial={{ opacity: 0 }}
                >
                  {Array.from({ length: 4 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute rounded-full w-2 h-2 ${
                        action.color === 'from-blue-500 to-cyan-500' ? 'bg-blue-400' :
                        action.color === 'from-purple-500 to-pink-500' ? 'bg-purple-400' :
                        'bg-emerald-400'
                      }/50`}
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
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 40}%`,
                      }}
                    />
                  ))}
                </motion.div>

                <CardContent className="p-8 text-center relative">
                  {/* Icon */}
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${action.color} rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl`}
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <action.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    {action.description}
                  </p>

                  {/* Button */}
                  <motion.button
                    className={`w-full py-4 text-lg font-semibold rounded-lg flex items-center justify-center gap-2 ${
                      action.buttonVariant === 'default'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                        : 'border-2 border-blue-500 text-blue-600 hover:bg-blue-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {action.buttonText}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 2.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mx-auto mb-6 flex items-center justify-center group-hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <stat.icon className="w-10 h-10 text-yellow-400" />
              </motion.div>
              <div className="text-4xl font-serif font-bold text-white mb-3">
                {stat.value}
              </div>
              <div className="text-blue-200 font-semibold text-lg">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 2.4 }}
        >
          <motion.p
            className="text-blue-200 mb-8 text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 2.6 }}
          >
            Trusted by 10,000+ healthcare professionals worldwide
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 opacity-60"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 2.8 }}
          >
            <div className="text-white font-semibold text-lg">HIPAA Compliant</div>
            <div className="text-white font-semibold text-lg">SOC 2 Certified</div>
            <div className="text-white font-semibold text-lg">99.9% Uptime</div>
            <div className="text-white font-semibold text-lg">24/7 Support</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}