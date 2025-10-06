"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart3, 
  CheckCircle, 
  Truck,
  ArrowRight,
  Brain,
  Zap,
  Target
} from "lucide-react";
import "@/styles/design-system.css";

const workflowSteps = [
  {
    id: "analyze",
    title: "Analyze",
    description: "Real-time analytics and predictive restock.",
    icon: BarChart3,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    stat: "99.7%",
    statLabel: "Accuracy Rate"
  },
  {
    id: "prescribe", 
    title: "Prescribe",
    description: "AI-assisted dose checking and clinical decision support.",
    icon: CheckCircle,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    stat: "50K+",
    statLabel: "Daily Checks"
  },
  {
    id: "deliver",
    title: "Deliver", 
    description: "Automated fulfillment and smart delivery tracking.",
    icon: Truck,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    stat: "2.5hrs",
    statLabel: "Avg Delivery"
  }
];

export function WorkflowSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [countUpValues, setCountUpValues] = useState({ analyze: 0, prescribe: 0, deliver: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Trigger count-up animations
          setTimeout(() => {
            setCountUpValues({ analyze: 99.7, prescribe: 50000, deliver: 2.5 });
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="workflow" ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#1F2937] mb-6">
            How Zuruu Works
          </h2>
          <p className="text-xl font-primary text-[#6B7280] max-w-3xl mx-auto">
            Our AI-powered workflow transforms pharmacy operations through intelligent analysis, precise prescribing, and efficient delivery.
          </p>
        </motion.div>

        {/* Workflow Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="group relative"
            >
              {/* Connection Arrow */}
              {index < workflowSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.2 }}
                    className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center"
                  >
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                  </motion.div>
                </div>
              )}

              <Card className={`${step.bgColor} ${step.borderColor} border-2 h-full hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2`}>
                <CardContent className="p-8 text-center">
                  {/* Step Number */}
                  <motion.div
                    className="w-12 h-12 bg-[#1F59FF] text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.2 }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ duration  : 0.6, delay: 0.8 + index * 0.2 }}
                  >
                    <step.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-display font-bold text-[#1F2937] mb-4">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#6B7280] mb-6 leading-relaxed font-primary">
                    {step.description}
                  </p>

                  {/* Animated Stats */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 1 + index * 0.2 }}
                  >
                    <div className="text-3xl font-display font-bold text-[#1F2937]">
                      {step.id === 'analyze' && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                        >
                          {countUpValues.analyze}%
                        </motion.span>
                      )}
                      {step.id === 'prescribe' && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                        >
                          {countUpValues.prescribe.toLocaleString()}+
                        </motion.span>
                      )}
                      {step.id === 'deliver' && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                        >
                          {countUpValues.deliver}hrs
                        </motion.span>
                      )}
                    </div>
                    <div className="text-sm text-[#9CA3AF] font-medium font-primary">
                      {step.statLabel}
                    </div>
                  </motion.div>

                  {/* Micro-animations */}
                  {step.id === 'analyze' && (
                    <motion.div
                      className="absolute top-4 right-4"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: 1.5 + index * 0.2
                      }}
                    >
                      <Brain className="w-6 h-6 text-[#1F59FF]" />
                    </motion.div>
                  )}

                  {step.id === 'prescribe' && (
                    <motion.div
                      className="absolute top-4 right-4"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        delay: 1.5 + index * 0.2
                      }}
                    >
                      <CheckCircle className="w-6 h-6 text-[#14B8A6]" />
                    </motion.div>
                  )}

                  {step.id === 'deliver' && (
                    <motion.div
                      className="absolute top-4 right-4"
                      animate={{ 
                        x: [0, 8, 0],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: 1.5 + index * 0.2
                      }}
                    >
                      <Truck className="w-6 h-6 text-[#1F59FF]" />
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <p className="text-lg font-primary text-[#6B7280] mb-6">
            Ready to transform your pharmacy operations?
          </p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: 1.8 }}
          >
            <motion.button
              className="px-8 py-4 bg-[#1F59FF] text-white rounded-xl font-semibold hover:bg-[#0D47D9] transition-colors duration-300 font-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
            </motion.button>
            <motion.button
              className="px-8 py-4 border-2 border-[#1F59FF] text-[#1F59FF] rounded-xl font-semibold hover:bg-[#1F59FF] hover:text-white transition-colors duration-300 font-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
