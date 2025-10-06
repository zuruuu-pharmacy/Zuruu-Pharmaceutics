"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Sparkles, 
  Zap, 
  Eye, 
  Layers,
  Play,
  Code,
  Palette,
  Box
} from "lucide-react";
import { HowZuruuWorks } from "./how-zuruu-works";
import { HowZuruuWorksEnhanced } from "./how-zuruu-works-enhanced";
import { HowZuruuWorks3D } from "./how-zuruu-works-3d";

const versions = [
  {
    id: "basic",
    title: "Classic Version",
    description: "Clean, professional design with smooth animations and interactive elements",
    features: [
      "Smooth hover effects",
      "Interactive step cards",
      "Auto-play functionality",
      "Progress indicators",
      "Responsive design"
    ],
    component: HowZuruuWorks,
    icon: Eye,
    color: "blue",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "enhanced",
    title: "Enhanced Version",
    description: "Advanced animations with floating particles, complex transitions, and rich visual effects",
    features: [
      "Floating particle effects",
      "Complex animation sequences",
      "Enhanced visual feedback",
      "Rich feature lists",
      "Advanced progress tracking"
    ],
    component: HowZuruuWorksEnhanced,
    icon: Sparkles,
    color: "purple",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: "3d",
    title: "3D Version",
    description: "Immersive 3D experience with perspective transforms, depth effects, and cinematic animations",
    features: [
      "3D perspective transforms",
      "Depth-based animations",
      "Cinematic effects",
      "Advanced particle systems",
      "Immersive user experience"
    ],
    component: HowZuruuWorks3D,
    icon: Layers,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-500"
  }
];

export function HowZuruuWorksShowcase() {
  const [activeVersion, setActiveVersion] = useState("enhanced");

  const ActiveComponent = versions.find(v => v.id === activeVersion)?.component || HowZuruuWorksEnhanced;

  return (
    <div className="space-y-16">
      {/* Version Selector */}
      <motion.div
        className="text-center space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-full text-lg font-medium"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-5 h-5" />
          <span>Choose Your Experience</span>
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-bold">
          <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            How Zuruu Works
          </span>
          <br />
          <span className="text-foreground">Showcase</span>
        </h2>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Experience three different versions of our "How Zuruu Works" section, 
          each with unique animations, aesthetics, and user experiences.
        </p>
      </motion.div>

      {/* Version Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {versions.map((version) => {
          const Icon = version.icon;
          const isActive = activeVersion === version.id;
          
          return (
            <motion.div
              key={version.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-500 ${
                  isActive 
                    ? `shadow-2xl shadow-${version.color}-500/25 border-2 border-${version.color}-500/50` 
                    : 'hover:shadow-lg hover:shadow-primary/10'
                }`}
                onClick={() => setActiveVersion(version.id)}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`p-3 bg-gradient-to-br ${version.gradient} rounded-xl`}
                      animate={isActive ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-xl">{version.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{version.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {version.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {isActive && (
                    <motion.div
                      className="mt-4 flex items-center gap-2 text-primary text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className="w-4 h-4" />
                      </motion.div>
                      <span>Currently Active</span>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Active Component */}
      <motion.div
        key={activeVersion}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <ActiveComponent />
      </motion.div>

      {/* Implementation Guide */}
      <motion.div
        className="bg-muted/50 rounded-2xl p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold">Implementation Guide</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each version is fully functional and can be easily integrated into your application. 
            Choose the one that best fits your design requirements and user experience goals.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="gap-2">
              <Code className="w-4 h-4" />
              View Code
            </Button>
            <Button variant="outline" className="gap-2">
              <Palette className="w-4 h-4" />
              Customize
            </Button>
            <Button variant="outline" className="gap-2">
              <Box className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

