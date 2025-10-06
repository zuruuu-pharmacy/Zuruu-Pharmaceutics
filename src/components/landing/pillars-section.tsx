"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Hospital, 
  Store, 
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Shield,
  Users,
  BookOpen
} from "lucide-react";
import "@/styles/design-system.css";

const pillars = [
  {
    id: "industry",
    title: "Industry",
    description: "Predictive supply-chain, batch-level analytics and automated restocking.",
    icon: Building2,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    stats: "99.7% uptime"
  },
  {
    id: "hospital",
    title: "Hospital", 
    description: "Clinical decision support, dose checking, on-demand inventory.",
    icon: Hospital,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    stats: "50+ hospitals"
  },
  {
    id: "retail",
    title: "Retail",
    description: "Shelf-level insights, OTC recommendations and loyalty integrations.",
    icon: Store,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    stats: "10K+ stores"
  },
  {
    id: "academia",
    title: "Academia & R&D",
    description: "Learning modules, simulation labs and assessment tools.",
    icon: GraduationCap,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    stats: "25K+ students"
  }
];

export function PillarsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
    <section id="pillars" ref={sectionRef} className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#1F2937] mb-6">
            What is Zuruu Pharmaceutics?
          </h2>
          <p className="text-xl font-primary text-[#6B7280] max-w-3xl mx-auto">
            A comprehensive AI-powered platform serving every aspect of pharmacy operations across multiple sectors.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Card className={`${pillar.bgColor} ${pillar.borderColor} border-2 h-full hover:shadow-xl transition-all duration-300`}>
                <CardHeader className="text-center pb-4">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${pillar.color} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <pillar.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <CardTitle className="text-xl font-display font-bold text-[#1F2937] mb-2">
                    {pillar.title}
                  </CardTitle>
                  
                  <p className="text-[#6B7280] text-sm leading-relaxed font-primary">
                    {pillar.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Stats */}
                    <div className="text-center">
                      <div className="text-2xl font-display font-bold text-[#1F2937]">
                        {pillar.stats}
                      </div>
                      <div className="text-xs text-[#9CA3AF] uppercase tracking-wide font-primary">
                        Trusted by
                      </div>
                    </div>

                    {/* CTA */}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:bg-[#1F59FF] group-hover:text-white group-hover:border-[#1F59FF] transition-colors duration-300 font-primary"
                    >
                      Learn how
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-[#6B7280]">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-[#14B8A6]" />
              <span className="text-sm font-medium font-primary">HIPAA-aligned</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-[#1F59FF]" />
              <span className="text-sm font-medium font-primary">Enterprise-grade security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-[#1F59FF]" />
              <span className="text-sm font-medium font-primary">Trusted by hospitals and pharmacies</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
