"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AIBrainPulseAnimation, 
  ShelfRestockAnimation, 
  IconDrawAnimation, 
  CTARippleAnimation,
  LottieOptimizationGuide 
} from "./lottie-micro-animations";
import { Play, Download, Info, Zap, Clock, HardDrive } from "lucide-react";

export function AnimationShowcase() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [showRipple, setShowRipple] = useState(false);

  const animations = [
    {
      id: 'ai-brain-pulse',
      name: 'AI Brain Pulse',
      description: 'Looped, subtle neural network animation',
      component: <AIBrainPulseAnimation />,
      specs: '350KB Lottie / 180KB MP4 / 45KB GIF'
    },
    {
      id: 'shelf-restock',
      name: 'Shelf Restock Sequence',
      description: 'Low stock → restock box → check mark',
      component: <ShelfRestockAnimation />,
      specs: '420KB Lottie / 220KB MP4 / 55KB GIF'
    },
    {
      id: 'icon-draw',
      name: 'Icon Draw Animation',
      description: '320ms stroke-draw for login icons',
      component: <IconDrawAnimation duration={320} />,
      specs: '280KB Lottie / 150KB MP4 / 35KB GIF'
    },
    {
      id: 'cta-ripple',
      name: 'CTA Ripple Effect',
      description: 'Button click ripple animation',
      component: showRipple ? <CTARippleAnimation /> : null,
      specs: '150KB Lottie / 80KB MP4 / 20KB GIF'
    }
  ];

  const triggerRipple = () => {
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-800 mb-4">
            Lottie Micro-Animations
          </h2>
          <p className="text-lg font-primary text-gray-600 max-w-2xl mx-auto">
            Lightweight, optimized animations for enhanced user experience. All animations under 500KB with multiple format support.
          </p>
        </motion.div>

        {/* Animation Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {animations.map((animation, index) => (
            <motion.div
              key={animation.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card 
                className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  activeDemo === animation.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActiveDemo(activeDemo === animation.id ? null : animation.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-lg">
                    {animation.component}
                  </div>
                  <CardTitle className="text-lg font-display font-bold text-gray-800">
                    {animation.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 font-primary">
                    {animation.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <HardDrive className="w-3 h-3" />
                      <span>{animation.specs}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Zap className="w-3 h-3" />
                      <span>60fps max</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Vector only</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Ripple Demo */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-display font-bold text-gray-800 mb-4">
            Try the CTA Ripple Effect
          </h3>
          <div className="relative inline-block">
            <Button
              onClick={triggerRipple}
              className="relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold"
            >
              Click for Ripple
              {showRipple && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className="w-4 h-4 bg-white/30 rounded-full"></div>
                </motion.div>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Optimization Guide */}
        <motion.div
          className="bg-gray-50 rounded-xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-display font-bold text-gray-800 mb-4">
              Optimization Guide
            </h3>
            <p className="text-gray-600 font-primary">
              Performance recommendations and file size guidelines
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* File Sizes */}
            <div>
              <h4 className="text-lg font-display font-bold text-gray-800 mb-4 flex items-center">
                <HardDrive className="w-5 h-5 mr-2 text-blue-500" />
                File Sizes
              </h4>
              <div className="space-y-3">
                {Object.entries(LottieOptimizationGuide.fileSizes).map(([key, size]) => (
                  <div key={key} className="text-sm">
                    <div className="font-medium text-gray-700 capitalize">
                      {key.replace('-', ' ')}
                    </div>
                    <div className="text-gray-500">{size}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Optimization Techniques */}
            <div>
              <h4 className="text-lg font-display font-bold text-gray-800 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-green-500" />
                Optimization
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {LottieOptimizationGuide.optimization.techniques.map((technique, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {technique}
                  </li>
                ))}
              </ul>
            </div>

            {/* Performance Tips */}
            <div>
              <h4 className="text-lg font-display font-bold text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-purple-500" />
                Performance
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {LottieOptimizationGuide.optimization.performance.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Download Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h4 className="text-lg font-display font-bold text-gray-800 mb-4">
                Download Assets
              </h4>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Lottie Files (.json)</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>MP4 Previews</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Info className="w-4 h-4" />
                  <span>GIF Fallbacks</span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
