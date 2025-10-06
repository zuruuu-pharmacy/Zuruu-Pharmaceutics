"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  Brain, 
  Zap, 
  Shield, 
  Target, 
  ArrowRight, 
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Clock,
  Database,
  Cpu,
  Eye,
  TrendingUp,
  ArrowDown,
  ArrowUp,
  RotateCw
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StepData {
  step: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  features: string[];
  duration: string;
  position: { x: number; y: number };
}

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  intensity?: number;
}

function FloatingElement({ children, delay = 0, duration = 3, intensity = 1 }: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [-10 * intensity, 10 * intensity, -10 * intensity],
        x: [-5 * intensity, 5 * intensity, -5 * intensity],
        rotate: [-2 * intensity, 2 * intensity, -2 * intensity],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

function StepCard3D({ stepData, isActive, onActivate, index }: { stepData: StepData; isActive: boolean; onActivate: () => void; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        transition: { duration: 0.8, delay: index * 0.3 }
      });
    }
  }, [isInView, controls, index]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: -15, rotateY: 15 }}
      animate={controls}
      whileHover={{ 
        scale: 1.05, 
        y: -15,
        rotateX: -5,
        rotateY: 5,
        transition: { duration: 0.4 }
      }}
      className="relative group perspective-1000"
      style={{ transformStyle: "preserve-3d" }}
    >
      <Card 
        className={`cursor-pointer transition-all duration-700 ${
          isActive 
            ? `shadow-2xl shadow-${stepData.color}-500/30 border-2 border-${stepData.color}-500/60 bg-gradient-to-br from-${stepData.color}-50/70 to-white` 
            : 'hover:shadow-xl hover:shadow-primary/15 hover:border-primary/30'
        }`}
        onClick={onActivate}
        style={{
          transform: isActive ? "translateZ(20px)" : "translateZ(0px)",
        }}
      >
        <CardContent className="p-8 relative overflow-hidden">
          {/* 3D Background Effects */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${stepData.gradient} opacity-0`}
            animate={{ opacity: isActive ? 0.08 : 0 }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Animated Grid Pattern */}
          {isActive && (
            <motion.div
              className="absolute inset-0 opacity-10"
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg className="w-full h-full">
                <defs>
                  <pattern id={`grid-${stepData.step}`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#grid-${stepData.step})`} />
              </svg>
            </motion.div>
          )}

          {/* Floating Particles with 3D Effect */}
          {isActive && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/30 rounded-full"
                  style={{
                    left: `${15 + i * 10}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    zIndex: 10,
                  }}
                  animate={{
                    y: [-30, 30, -30],
                    x: [-15, 15, -15],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{
                    duration: 3 + i * 0.2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </>
          )}

          {/* 3D Step Number */}
          <motion.div
            className={`absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br ${stepData.gradient} rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl z-20`}
            animate={isActive ? { 
              scale: [1, 1.3, 1], 
              rotateY: [0, 360, 0],
              rotateX: [0, 15, 0],
              boxShadow: [
                "0 10px 25px rgba(0,0,0,0.1)",
                "0 25px 50px rgba(0,0,0,0.3)",
                "0 10px 25px rgba(0,0,0,0.1)"
              ]
            } : { scale: 1, rotateY: 0, rotateX: 0 }}
            transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              animate={isActive ? { rotateY: [0, 180, 360] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              {stepData.step}
            </motion.div>
          </motion.div>

          {/* 3D Icon with Complex Animation */}
          <motion.div
            className={`p-8 bg-gradient-to-br ${stepData.gradient} rounded-3xl w-fit mb-8 relative`}
            animate={isActive ? { 
              scale: [1, 1.15, 1],
              rotateY: [0, 10, -10, 0],
              rotateX: [0, 5, -5, 0],
              boxShadow: [
                "0 0 0 rgba(0,0,0,0)",
                "0 0 30px rgba(59, 130, 246, 0.6)",
                "0 0 0 rgba(0,0,0,0)"
              ]
            } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              animate={isActive ? { 
                rotateY: [0, 15, -15, 0],
                rotateX: [0, 10, -10, 0]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <stepData.icon className="w-12 h-12 text-white" />
            </motion.div>
            
            {/* 3D Ripple Effects */}
            {isActive && (
              <>
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-3xl"
                  animate={{ 
                    scale: [1, 1.8, 2.5], 
                    opacity: [0.5, 0.2, 0],
                    rotateY: [0, 180, 360]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-3xl"
                  animate={{ 
                    scale: [1, 1.5, 2], 
                    opacity: [0.3, 0.1, 0],
                    rotateX: [0, 90, 180]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
              </>
            )}
          </motion.div>

          {/* Content with 3D Text Effects */}
          <div className="space-y-6">
            <div>
              <motion.h3 
                className={`text-3xl font-bold mb-3 ${isActive ? `text-${stepData.color}-600` : 'text-foreground'}`}
                animate={isActive ? { 
                  x: [0, 5, 0],
                  textShadow: [
                    "0 0 0 rgba(0,0,0,0)",
                    "0 5px 15px rgba(0,0,0,0.1)",
                    "0 0 0 rgba(0,0,0,0)"
                  ]
                } : {}}
                transition={{ duration: 0.8 }}
              >
                {stepData.title}
              </motion.h3>
              
              <motion.div 
                className="flex items-center gap-3 text-sm text-muted-foreground mb-6"
                animate={isActive ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FloatingElement intensity={0.5}>
                  <Clock className="w-5 h-5" />
                </FloatingElement>
                <span className="font-medium">{stepData.duration}</span>
              </motion.div>
            </div>
            
            <motion.p 
              className="text-muted-foreground leading-relaxed text-lg"
              animate={isActive ? { opacity: [0.8, 1, 0.8] } : { opacity: 1 }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              {stepData.description}
            </motion.p>

            {/* 3D Features List */}
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, height: 0, rotateX: -90 }}
              animate={isActive ? { 
                opacity: 1, 
                height: "auto", 
                rotateX: 0 
              } : { 
                opacity: 0, 
                height: 0, 
                rotateX: -90 
              }}
              transition={{ duration: 0.8 }}
            >
              {stepData.features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 text-sm"
                  initial={{ opacity: 0, x: -30, rotateY: -45 }}
                  animate={isActive ? { 
                    opacity: 1, 
                    x: 0, 
                    rotateY: 0 
                  } : { 
                    opacity: 0, 
                    x: -30, 
                    rotateY: -45 
                  }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                >
                  <motion.div
                    animate={isActive ? { 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    } : {}}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </motion.div>
                  <span className="font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* 3D Active Indicator */}
            {isActive && (
              <motion.div
                className="flex items-center gap-3 text-sm font-medium text-primary bg-gradient-to-r from-primary/10 to-purple-500/10 px-4 py-3 rounded-full border border-primary/20"
                initial={{ opacity: 0, scale: 0.8, rotateX: -45 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                <span>Processing in 3D...</span>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <RotateCw className="w-4 h-4" />
                </motion.div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ProcessFlow3D() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const steps: StepData[] = [
    {
      step: 1,
      title: "Data Ingestion",
      description: "Seamlessly upload prescriptions, lab reports, patient records, and medical images through our intelligent interface. Our system automatically detects and categorizes different data types with 99.9% accuracy.",
      icon: Database,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      features: [
        "Multi-format file support",
        "Automatic data validation",
        "Real-time processing",
        "Secure encryption"
      ],
      duration: "2-5 seconds",
      position: { x: 0, y: 0 }
    },
    {
      step: 2,
      title: "AI Analysis",
      description: "Advanced machine learning algorithms analyze your data with pharmaceutical expertise. Our AI identifies patterns, potential drug interactions, dosage calculations, and clinical insights with unprecedented precision.",
      icon: Brain,
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      features: [
        "Pattern recognition",
        "Interaction detection",
        "Dosage optimization",
        "Risk assessment"
      ],
      duration: "10-30 seconds",
      position: { x: 0, y: 0 }
    },
    {
      step: 3,
      title: "Smart Processing",
      description: "Our system processes information with pharmaceutical intelligence, ensuring accuracy, compliance with medical standards, and seamless integration with existing healthcare workflows and protocols.",
      icon: Cpu,
      color: "emerald",
      gradient: "from-emerald-500 to-teal-500",
      features: [
        "Compliance checking",
        "Quality assurance",
        "Workflow integration",
        "Standard validation"
      ],
      duration: "5-15 seconds",
      position: { x: 0, y: 0 }
    },
    {
      step: 4,
      title: "Intelligent Output",
      description: "Receive comprehensive reports, actionable recommendations, and personalized insights. Get detailed analytics, trend analysis, and predictive recommendations for better patient care and outcomes.",
      icon: TrendingUp,
      color: "orange",
      gradient: "from-orange-500 to-red-500",
      features: [
        "Detailed reports",
        "Actionable insights",
        "Trend analysis",
        "Predictive recommendations"
      ],
      duration: "Instant",
      position: { x: 0, y: 0 }
    }
  ];

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setActiveStep(prev => prev === steps.length ? 1 : prev + 1);
    }, 5000);
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
    <div className="space-y-20">
      {/* 3D Header */}
      <motion.div
        className="text-center space-y-10"
        initial={{ opacity: 0, y: 50, rotateX: -15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="inline-flex items-center gap-4 bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary px-8 py-4 rounded-full text-lg font-medium border border-primary/20 shadow-lg"
          animate={{ 
            scale: [1, 1.08, 1],
            rotateY: [0, 5, -5, 0],
            boxShadow: [
              "0 0 0 rgba(59, 130, 246, 0)",
              "0 0 30px rgba(59, 130, 246, 0.4)",
              "0 0 0 rgba(59, 130, 246, 0)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
          <span>How Zuruu Works</span>
        </motion.div>
        
        <motion.h2 
          className="text-6xl md:text-7xl font-bold"
          initial={{ opacity: 0, y: 30, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.span 
            className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent"
            animate={{ 
              textShadow: [
                "0 0 0 rgba(59, 130, 246, 0)",
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 0 rgba(59, 130, 246, 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Intelligent
          </motion.span>
          <br />
          <motion.span 
            className="text-foreground"
            animate={{ 
              textShadow: [
                "0 0 0 rgba(0,0,0,0)",
                "0 5px 15px rgba(0,0,0,0.1)",
                "0 0 0 rgba(0,0,0,0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            Processing Pipeline
          </motion.span>
        </motion.h2>
        
        <motion.p 
          className="text-2xl text-muted-foreground max-w-5xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30, rotateX: -5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          Experience the power of AI-driven pharmaceutical intelligence through our 
          seamless 4-step process that transforms raw data into actionable insights 
          with unprecedented accuracy, speed, and 3D visualization.
        </motion.p>
      </motion.div>

      {/* 3D Controls */}
      <motion.div 
        className="flex justify-center gap-6"
        initial={{ opacity: 0, y: 30, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Button
          variant={isPlaying ? "destructive" : "default"}
          onClick={isPlaying ? stopAutoPlay : startAutoPlay}
          className="gap-3 px-8 py-4 text-lg"
          size="lg"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          {isPlaying ? "Pause" : "Start"} 3D Demo
        </Button>
        <Button variant="outline" onClick={resetFlow} className="gap-3 px-8 py-4 text-lg" size="lg">
          <RotateCcw className="w-6 h-6" />
          Reset
        </Button>
      </motion.div>

      {/* 3D Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {steps.map((stepData, index) => (
          <StepCard3D
            key={stepData.step}
            stepData={stepData}
            isActive={activeStep === stepData.step}
            onActivate={() => setActiveStep(stepData.step)}
            index={index}
          />
        ))}
      </div>

      {/* 3D Progress Indicator */}
      <motion.div 
        className="flex flex-col items-center gap-8"
        initial={{ opacity: 0, rotateX: -15 }}
        animate={{ opacity: 1, rotateX: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex items-center gap-6 bg-muted/50 rounded-full p-6 shadow-lg">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-6 h-6 rounded-full transition-all duration-700 ${
                index + 1 <= activeStep 
                  ? 'bg-primary scale-150 shadow-2xl shadow-primary/50' 
                  : 'bg-muted-foreground/30'
              }`}
              animate={index + 1 === activeStep ? { 
                scale: [1, 1.8, 1.5],
                rotateY: [0, 180, 360],
                boxShadow: [
                  "0 0 0 rgba(59, 130, 246, 0)",
                  "0 0 25px rgba(59, 130, 246, 0.6)",
                  "0 0 0 rgba(59, 130, 246, 0)"
                ]
              } : {}}
              transition={{ duration: 0.8 }}
              style={{ transformStyle: "preserve-3d" }}
            />
          ))}
        </div>
        
        <motion.div
          className="flex items-center gap-3 text-primary"
          animate={{ 
            x: [0, 15, 0],
            rotateY: [0, 10, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="text-lg font-medium">Follow the 3D Process</span>
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <ArrowRight className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function HowZuruuWorks3D() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={sectionRef}
      className="py-40 px-4 bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/40 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
      {/* 3D Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.2),transparent_60%)]" />
      </div>
      
      {/* Floating 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-primary/20 rounded-full"
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [-50, 50, -50],
              x: [-30, 30, -30],
              rotateY: [0, 360],
              rotateX: [0, 180],
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative" style={{ transformStyle: "preserve-3d" }}>
        <ProcessFlow3D />
      </div>
    </motion.section>
  );
}

