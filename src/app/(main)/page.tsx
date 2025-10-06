"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BookText, Calculator, FlaskConical, ShieldAlert, ArrowRight, ScanEye, User, Users, TestTube, Sparkles, Zap, Brain, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ParticleBackground } from "@/components/ui/particle-background";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { QuickInsights } from "@/components/ui/mini-charts";
import { ProgressOverview } from "@/components/ui/progress-indicators";
import { AuthGuard } from "@/components/auth/auth-guard";

const tools = [
  {
    icon: Users,
    title: "Patients",
    description: "Manage patient records and select an active patient.",
    href: "/patients",
    color: "text-cyan-500",
  },
  {
    icon: User,
    title: "Patient History Form",
    description: "Add or edit detailed patient history.",
    href: "/patient-history",
    color: "text-blue-400",
  },
  {
    icon: BookText,
    title: "Drug Monograph Lookup",
    description: "Access comprehensive drug information.",
    href: "/monograph",
    color: "text-blue-500",
  },
  {
    icon: Calculator,
    title: "AI Dose Calculator",
    description: "Calculate patient-specific dosages.",
    href: "/dose-calculator",
    color: "text-green-500",
  },
  {
    icon: FlaskConical,
    title: "AI Interaction Engine",
    description: "Check for multi-drug interactions.",
    href: "/interaction-checker",
    color: "text-purple-500",
  },
  {
    icon: ShieldAlert,
    title: "Allergy Checker",
    description: "Identify potential allergies & cross-reactivity.",
    href: "/allergy-checker",
    color: "text-red-500",
  },
  {
    icon: ScanEye,
    title: "Prescription Reader",
    description: "Analyze a prescription image.",
    href: "/prescription-reader",
    color: "text-orange-500",
  },
  {
    icon: TestTube,
    title: "Lab Report Analyzer",
    description: "Interpret and analyze lab report data.",
    href: "/lab-analyzer",
    color: "text-indigo-500",
  },
];

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}

function DashboardContent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
      <div className="flex flex-col gap-8">
        {/* Theme Toggle */}
        <motion.div 
          className="flex justify-end"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ThemeToggle />
        </motion.div>

        {/* Cinematic Hero Header */}
        <motion.header 
          className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground rounded-xl p-8 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Particle Background */}
          <ParticleBackground particleCount={30} />
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/10 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </div>
          
          {/* Floating Icons */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-8 right-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="w-6 h-6 text-white/20" />
            </motion.div>
            <motion.div
              className="absolute bottom-8 left-8"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <Target className="w-5 h-5 text-white/15" />
            </motion.div>
            <motion.div
              className="absolute top-1/3 left-8"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-4 h-4 text-white/25" />
            </motion.div>
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="heading-2 text-primary-foreground flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Zap className="w-8 h-8" />
                </motion.div>
                Welcome to Zuruu Pharmaceutics
              </h1>
            </motion.div>
            
            <motion.p 
              className="body-large text-primary-foreground/90 max-w-2xl mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your comprehensive pharmaceutical intelligence platform for enhanced clinical care. 
              Start by managing your patients or explore the advanced tools directly.
            </motion.p>
            
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/patients" passHref>
                <Button variant="secondary" size="lg" className="group">
                  <Users className="mr-2" /> 
                  Go to Patients
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.header>

        {/* Quick Insights Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.h2 
            className="text-2xl font-semibold mb-6 text-foreground/90 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Target className="w-6 h-6 text-primary" />
            </motion.div>
            Quick Insights
          </motion.h2>
          <QuickInsights />
        </motion.section>

        {/* Progress Overview Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <motion.h2 
            className="text-2xl font-semibold mb-6 text-foreground/90 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
            System Progress
          </motion.h2>
          <ProgressOverview />
        </motion.section>
        
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.h2 
            className="text-2xl font-semibold mb-6 text-foreground/90 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
            Clinical Tools
          </motion.h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <AnimatePresence>
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1.2 + (index * 0.1),
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  onHoverStart={() => setActiveCard(tool.title)}
                  onHoverEnd={() => setActiveCard(null)}
                >
                  <Card className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col group border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-start gap-4">
                      <motion.div 
                        className={`p-3 bg-primary/10 rounded-lg ${tool.color} group-hover:bg-primary/20 transition-all duration-300`}
                        animate={activeCard === tool.title ? {
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <tool.icon className="w-8 h-8" />
                      </motion.div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1 group-hover:text-primary transition-colors duration-300">
                          {tool.title}
                        </CardTitle>
                        <CardDescription className="group-hover:text-foreground/80 transition-colors duration-300">
                          {tool.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-end justify-end mt-auto">
                      <Link href={tool.href} passHref>
                        <Button 
                          variant="ghost" 
                          className="text-primary group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300"
                        >
                          Use Tool 
                          <motion.div
                            animate={activeCard === tool.title ? {
                              x: [0, 5, 0]
                            } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </motion.div>
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.section>
      </div>
  );
}
