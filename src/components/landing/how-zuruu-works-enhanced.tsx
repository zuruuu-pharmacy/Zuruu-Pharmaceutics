"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  Brain, 
  Zap, 
  Shield, 
  Target, 
  ArrowRight, 
  Sparkles,
  CheckCircle,
  Database,
  Cpu,
  Eye,
  TrendingUp
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StepData {
  step: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  features: string[];
}

interface StepCardProps {
  stepData: StepData;
  isActive: boolean;
  onActivate: () => void;
  index: number;
}

function StepCard({ stepData, isActive, onActivate, index }: StepCardProps) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="relative group"
    >
      <Card 
        className={`cursor-pointer transition-all duration-700 ${
          isActive 
            ? (stepData.color === 'blue' ? 'shadow-2xl shadow-blue-500/25 border-2 border-blue-500/50 bg-gradient-to-br from-blue-50/50 to-white' :
               stepData.color === 'purple' ? 'shadow-2xl shadow-purple-500/25 border-2 border-purple-500/50 bg-gradient-to-br from-purple-50/50 to-white' :
               stepData.color === 'emerald' ? 'shadow-2xl shadow-emerald-500/25 border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-50/50 to-white' :
               stepData.color === 'orange' ? 'shadow-2xl shadow-orange-500/25 border-2 border-orange-500/50 bg-gradient-to-br from-orange-50/50 to-white' :
               'shadow-2xl border-2 bg-gradient-to-br to-white')
            : 'hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20'
        }`}
        onClick={onActivate}
      >
        <CardContent className="p-8 relative overflow-hidden">
          {/* Animated Background Pattern */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br opacity-0 ${
              stepData.gradient === 'from-blue-500 to-cyan-500' ? 'from-blue-500 to-cyan-500' :
              stepData.gradient === 'from-purple-500 to-pink-500' ? 'from-purple-500 to-pink-500' :
              stepData.gradient === 'from-emerald-500 to-teal-500' ? 'from-emerald-500 to-teal-500' :
              stepData.gradient === 'from-orange-500 to-red-500' ? 'from-orange-500 to-red-500' :
              'from-gray-500 to-gray-600'
            }`}
            animate={{ opacity: isActive ? 0.05 : 0 }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Floating Particles */}
          {isActive && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/20 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </>
          )}

          {/* Step Number with Animation */}
          <motion.div
            className={`absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl z-10 ${
              stepData.gradient === 'from-blue-500 to-cyan-500' ? 'from-blue-500 to-cyan-500' :
              stepData.gradient === 'from-purple-500 to-pink-500' ? 'from-purple-500 to-pink-500' :
              stepData.gradient === 'from-emerald-500 to-teal-500' ? 'from-emerald-500 to-teal-500' :
              stepData.gradient === 'from-orange-500 to-red-500' ? 'from-orange-500 to-red-500' :
              'from-gray-500 to-gray-600'
            }`}
            animate={isActive ? { 
              scale: [1, 1.2, 1], 
              rotate: [0, 360],
              boxShadow: [
                "0 10px 25px rgba(0,0,0,0.1)",
                "0 20px 40px rgba(0,0,0,0.2)",
                "0 10px 25px rgba(0,0,0,0.1)"
              ]
            } : { scale: 1, rotate: 0 }}
            transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
          >
            {stepData.step}
          </motion.div>

          {/* Icon with Complex Animation */}
          <motion.div
            className={`p-6 bg-gradient-to-br rounded-3xl w-fit mb-6 relative ${
              stepData.gradient === 'from-blue-500 to-cyan-500' ? 'from-blue-500 to-cyan-500' :
              stepData.gradient === 'from-purple-500 to-pink-500' ? 'from-purple-500 to-pink-500' :
              stepData.gradient === 'from-emerald-500 to-teal-500' ? 'from-emerald-500 to-teal-500' :
              stepData.gradient === 'from-orange-500 to-red-500' ? 'from-orange-500 to-red-500' :
              'from-gray-500 to-gray-600'
            }`}
            animate={isActive ? { 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
              boxShadow: [
                "0 0 0 rgba(0,0,0,0)",
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 0 rgba(0,0,0,0)"
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={isActive ? { rotate: 5 } : { rotate: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <stepData.icon className="w-10 h-10 text-white" />
            </motion.div>
            
            {/* Ripple Effect */}
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-3xl"
                animate={{ scale: 1.2, opacity: 0.3 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <motion.h3 
                className={`text-2xl font-bold mb-2 ${
                  isActive ? (
                    stepData.color === 'blue' ? 'text-blue-600' :
                    stepData.color === 'purple' ? 'text-purple-600' :
                    stepData.color === 'emerald' ? 'text-emerald-600' :
                    stepData.color === 'orange' ? 'text-orange-600' :
                    'text-foreground'
                  ) : 'text-foreground'
                }`}
                animate={isActive ? { x: 5 } : { x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {stepData.title}
              </motion.h3>
              
            </div>
            
            <motion.p 
              className="text-muted-foreground leading-relaxed"
              animate={isActive ? { opacity: 0.8 } : { opacity: 1 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {stepData.description}
            </motion.p>

            {/* Features List */}
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={isActive ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              {stepData.features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ProcessFlow() {
  const [activeStep, setActiveStep] = useState(1);

  const steps: StepData[] = [
    {
      step: 1,
      title: "Data Ingestion",
      description: "Seamlessly upload prescriptions, lab reports, patient records, and medical images through our intelligent interface. Our system automatically detects and categorizes different data types.",
      icon: Database,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      features: [
        "Multi-format file support",
        "Automatic data validation",
        "Real-time processing",
        "Secure encryption"
      ]
    },
    {
      step: 2,
      title: "AI Analysis",
      description: "Advanced machine learning algorithms analyze your data with pharmaceutical expertise. Our AI identifies patterns, potential drug interactions, dosage calculations, and clinical insights.",
      icon: Brain,
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      features: [
        "Pattern recognition",
        "Interaction detection",
        "Dosage optimization",
        "Risk assessment"
      ]
    },
    {
      step: 3,
      title: "Smart Processing",
      description: "Our system processes information with pharmaceutical intelligence, ensuring accuracy, compliance with medical standards, and integration with existing healthcare workflows.",
      icon: Cpu,
      color: "emerald",
      gradient: "from-emerald-500 to-teal-500",
      features: [
        "Compliance checking",
        "Quality assurance",
        "Workflow integration",
        "Standard validation"
      ]
    },
    {
      step: 4,
      title: "Intelligent Output",
      description: "Receive comprehensive reports, actionable recommendations, and personalized insights. Get detailed analytics, trend analysis, and predictive recommendations for better patient care.",
      icon: TrendingUp,
      color: "orange",
      gradient: "from-orange-500 to-red-500",
      features: [
        "Detailed reports",
        "Actionable insights",
        "Trend analysis",
        "Predictive recommendations"
      ]
    }
  ];


  return (
    <div className="space-y-16">
      {/* Enhanced Header */}
      <motion.div
        className="text-center space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        
        <motion.h2 
          className="text-6xl md:text-7xl font-serif font-bold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            How Zuruu Works
          </span>
        </motion.h2>
        
        <motion.p 
          className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Experience the power of AI-driven pharmaceutical intelligence through our 
          seamless 4-step process that transforms raw data into actionable insights 
          with unprecedented accuracy and speed.
        </motion.p>
      </motion.div>


      {/* Enhanced Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((stepData, index) => (
          <StepCard
            key={stepData.step}
            stepData={stepData}
            isActive={activeStep === stepData.step}
            onActivate={() => setActiveStep(stepData.step)}
            index={index}
          />
        ))}
      </div>

      {/* Enhanced Progress Indicator */}
      <motion.div 
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="flex items-center gap-4 bg-muted/50 rounded-full p-4">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-500 ${
                index + 1 <= activeStep 
                  ? 'bg-primary scale-125 shadow-lg shadow-primary/50' 
                  : 'bg-muted-foreground/30'
              }`}
              animate={index + 1 === activeStep ? { 
                scale: [1, 1.5, 1],
                boxShadow: [
                  "0 0 0 rgba(59, 130, 246, 0)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 0 rgba(59, 130, 246, 0)"
                ]
              } : {}}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
        
      </motion.div>
    </div>
  );
}

export function HowZuruuWorksEnhanced() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={sectionRef}
      className="py-32 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.1),transparent_50%)]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ProcessFlow />
      </div>
    </motion.section>
  );
}
