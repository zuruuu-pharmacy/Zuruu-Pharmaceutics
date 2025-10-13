"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PillarsCarousel } from "./pillars-carousel";
import { useRouter } from "next/navigation";
import {
  Building2,
  Hospital,
  Store,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Shield,
  Users,
  BookOpen,
  Zap,
  Target,
  BarChart3
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
    hoverColor: "hover:border-blue-400",
    stat: "98%",
    statLabel: "Efficiency",
    ctaText: "Learn how"
  },
  {
    id: "hospital",
    title: "Hospital",
    description: "Clinical decision support, dose checking, on-demand inventory.",
    icon: Hospital,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    hoverColor: "hover:border-green-400",
    stat: "30%",
    statLabel: "Cost Savings",
    ctaText: "Learn how"
  },
  {
    id: "retail",
    title: "Retail",
    description: "Shelf-level insights, OTC recommendations and loyalty integrations.",
    icon: Store,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    hoverColor: "hover:border-purple-400",
    stat: "25%",
    statLabel: "Revenue Growth",
    ctaText: "Learn how"
  },
  {
    id: "academia",
    title: "Academia & R&D",
    description: "Learning modules, simulation labs and assessment tools.",
    icon: GraduationCap,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    hoverColor: "hover:border-orange-400",
    stat: "95%",
    statLabel: "Student Success",
    ctaText: "Learn how"
  }
];

export function PillarsSectionEnhanced() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect for background
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const handleCTAClick = (pillarId: string) => {
    switch (pillarId) {
      case 'industry':
        router.push('/industry-dashboard');
        break;
      case 'hospital':
        router.push('/hospital-dashboard');
        break;
      case 'retail':
        router.push('/retail-dashboard');
        break;
      case 'academia':
        router.push('/academia-dashboard');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="pillars" 
      ref={sectionRef} 
      className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ y }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-800 mb-6">
            What is Zuruu Pharmaceutics?
          </h2>
          <p className="text-xl font-primary text-gray-600 max-w-3xl mx-auto">
            A comprehensive AI-powered platform serving every aspect of pharmacy operations across multiple sectors.
          </p>
        </motion.div>

        {/* Desktop Horizontal Carousel */}
        <div className="hidden lg:block">
          <PillarsCarousel>
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                className="flex-shrink-0 w-80"
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.12 }}
                onHoverStart={() => setHoveredCard(pillar.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card 
                  className={`${pillar.bgColor} ${pillar.borderColor} ${pillar.hoverColor} border-2 h-full group hover:shadow-xl transition-all duration-300 cursor-pointer`}
                >
                  <CardHeader className="text-center pb-4">
                    {/* Icon with animation */}
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-br ${pillar.color} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <pillar.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <CardTitle className="text-xl font-display font-bold text-gray-800 mb-2">
                      {pillar.title}
                    </CardTitle>

                    <p className="text-gray-600 text-sm leading-relaxed font-primary">
                      {pillar.description}
                    </p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Hover State - Stats */}
                    <motion.div
                      className="text-center mb-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={hoveredCard === pillar.id ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-3xl font-display font-bold text-gray-800 mb-1">
                        {pillar.stat}
                      </div>
                      <div className="text-sm text-gray-500 font-primary">
                        {pillar.statLabel}
                      </div>
                    </motion.div>

                    {/* CTA Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-gray-800 group-hover:text-white group-hover:border-gray-800 transition-colors duration-300 font-primary"
                      onClick={() => handleCTAClick(pillar.id)}
                    >
                      {pillar.ctaText}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </PillarsCarousel>
        </div>

        {/* Mobile Vertical Stack */}
        <div className="lg:hidden grid gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.12 }}
              onHoverStart={() => setHoveredCard(pillar.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card 
                className={`${pillar.bgColor} ${pillar.borderColor} ${pillar.hoverColor} border-2 group hover:shadow-xl transition-all duration-300 cursor-pointer`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${pillar.color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <pillar.icon className="w-6 h-6 text-white" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-display font-bold text-gray-800 mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed font-primary mb-3">
                        {pillar.description}
                      </p>

                      {/* Hover State - Stats */}
                      <motion.div
                        className="mb-3"
                        initial={{ opacity: 0, height: 0 }}
                        animate={hoveredCard === pillar.id ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="text-2xl font-display font-bold text-gray-800">
                            {pillar.stat}
                          </div>
                          <div className="text-sm text-gray-500 font-primary">
                            {pillar.statLabel}
                          </div>
                        </div>
                      </motion.div>

                      {/* CTA Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="group-hover:bg-gray-800 group-hover:text-white group-hover:border-gray-800 transition-colors duration-300 font-primary"
                        onClick={() => handleCTAClick(pillar.id)}
                      >
                        {pillar.ctaText}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
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
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium font-primary">HIPAA-aligned</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium font-primary">Enterprise-grade security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium font-primary">Trusted by hospitals and pharmacies</span>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
