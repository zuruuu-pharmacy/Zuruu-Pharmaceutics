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
  Play,
  Pause,
  RotateCcw
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StepProps {
  step: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  isActive: boolean;
  onActivate: () => void;
}

function StepCard({ step, title, description, icon: Icon, color, gradient, isActive, onActivate }: StepProps) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: step * 0.2 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="relative"
    >
      <Card 
        className={`cursor-pointer transition-all duration-500 ${
          isActive 
            ? `shadow-2xl shadow-${color}-500/25 border-2 border-${color}-500/50` 
            : 'hover:shadow-lg hover:shadow-primary/10'
        }`}
        onClick={onActivate}
      >
        <CardContent className="p-8">
          {/* Animated Background */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 rounded-lg`}
            animate={{ opacity: isActive ? 0.1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Step Number */}
          <motion.div
            className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}
            animate={isActive ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.6 }}
          >
            {step}
          </motion.div>

          {/* Icon */}
          <motion.div
            className={`p-4 bg-gradient-to-br ${gradient} rounded-2xl w-fit mb-6`}
            animate={isActive ? { 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          {/* Content */}
          <div className="space-y-4">
            <motion.h3 
              className={`text-2xl font-bold ${isActive ? `text-${color}-600` : 'text-foreground'}`}
              animate={isActive ? { x: [0, 5, 0] } : { x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h3>
            
            <motion.p 
              className="text-muted-foreground leading-relaxed"
              animate={isActive ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {description}
            </motion.p>

            {/* Active Indicator */}
            {isActive && (
              <motion.div
                className="flex items-center gap-2 text-sm font-medium text-primary"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                <span>Currently Active</span>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ProcessFlow() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const steps = [
    {
      step: 1,
      title: "Data Input",
      description: "Upload prescriptions, lab reports, or patient data through our intuitive interface. Our AI instantly processes and structures your information.",
      icon: Brain,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      step: 2,
      title: "AI Analysis",
      description: "Advanced machine learning algorithms analyze your data, identifying patterns, potential interactions, and providing intelligent insights.",
      icon: Zap,
      color: "purple",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      step: 3,
      title: "Smart Processing",
      description: "Our system processes information with pharmaceutical expertise, ensuring accuracy and compliance with medical standards.",
      icon: Shield,
      color: "emerald",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      step: 4,
      title: "Actionable Results",
      description: "Get comprehensive reports, recommendations, and actionable insights tailored to your specific pharmaceutical needs.",
      icon: Target,
      color: "orange",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setActiveStep(prev => prev === steps.length ? 1 : prev + 1);
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(false);
  };

  const resetFlow = () => {
    stopAutoPlay();
    setActiveStep(1);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4" />
          <span>How Zuruu Works</span>
        </motion.div>
        
        <motion.h2 
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Intelligent Pharmaceutical
          <br />
          <span className="text-foreground">Processing Pipeline</span>
        </motion.h2>
        
        <motion.p 
          className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Experience the power of AI-driven pharmaceutical intelligence through our 
          seamless 4-step process that transforms raw data into actionable insights.
        </motion.p>
      </motion.div>

      {/* Controls */}
      <motion.div 
        className="flex justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Button
          variant={isPlaying ? "destructive" : "default"}
          onClick={isPlaying ? stopAutoPlay : startAutoPlay}
          className="gap-2"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? "Pause" : "Play"} Demo
        </Button>
        <Button variant="outline" onClick={resetFlow} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </motion.div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((stepData) => (
          <StepCard
            key={stepData.step}
            {...stepData}
            isActive={activeStep === stepData.step}
            onActivate={() => setActiveStep(stepData.step)}
          />
        ))}
      </div>

      {/* Progress Indicator */}
      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="flex items-center gap-4 bg-muted/50 rounded-full p-4">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index + 1 <= activeStep 
                  ? 'bg-primary scale-125' 
                  : 'bg-muted-foreground/30'
              }`}
              animate={index + 1 === activeStep ? { scale: [1, 1.5, 1] } : {}}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Flow Arrow */}
      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div
          className="flex items-center gap-2 text-primary"
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm font-medium">Follow the Process</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export function HowZuruuWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={sectionRef}
      className="py-24 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <ProcessFlow />
      </div>
    </motion.section>
  );
}
