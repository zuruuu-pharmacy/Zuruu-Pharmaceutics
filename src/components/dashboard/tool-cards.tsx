"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ToolCard {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  color: string;
  badge?: string;
  category?: string;
}

interface ToolCardsProps {
  tools: ToolCard[];
  title: string;
  description: string;
}

export function ToolCards({ tools, title, description }: ToolCardsProps) {
  return (
    <div className="space-y-8">
      <motion.div 
        className="text-center space-y-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title && (
          <>
            <div className="relative">
              <motion.h2 
                className="text-5xl font-black bg-gradient-to-r from-primary via-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight leading-none"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
                style={{
                  textShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                }}
              >
                {title.split(' ').map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block mr-4">
                    {word.split('').map((letter, letterIndex) => (
                      <motion.span
                        key={letterIndex}
                        className="inline-block transform hover:scale-110 transition-transform duration-200"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ 
                          delay: (wordIndex * 0.1) + (letterIndex * 0.05),
                          duration: 0.4,
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.h2>
              <motion.div
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-2 bg-gradient-to-r from-primary via-blue-600 via-purple-600 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '150px' }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              />
              <motion.div
                className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-primary to-purple-600 rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <motion.div 
              className="flex items-center justify-center space-x-3"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <motion.div 
                className="w-3 h-3 bg-gradient-to-r from-primary to-blue-600 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div 
                className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </motion.div>
          </>
        )}
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.href}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.1,
              duration: 0.5,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              y: -5, 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <Link href={tool.href} passHref>
              <Card className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary/40 bg-gradient-to-br from-white to-gray-50/50 min-h-[180px] relative overflow-hidden shadow-sm hover:shadow-xl">
                {/* Professional Header with Category */}
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary/5 to-primary/10 h-1" />
                {tool.category && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="text-xs font-medium bg-white/90 backdrop-blur-sm border-primary/20 text-primary">
                      {tool.category}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4 pt-6">
                  <div className="flex items-start space-x-4">
                    <motion.div
                      className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 shadow-md"
                      whileHover={{ rotate: 12, scale: 1.08 }}
                    >
                      <tool.icon className={`h-9 w-9 ${tool.color} group-hover:scale-110 transition-transform duration-300`} />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      {/* Main Feature Title - Bold and Prominent */}
                      <motion.div
                        className="text-2xl font-black group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-2 drop-shadow-sm tracking-tight"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent group-hover:from-primary group-hover:via-blue-600 group-hover:to-purple-600 transition-all duration-500">
                          {tool.title}
                        </div>
                      </motion.div>
                      
                      {/* Short Name Subtitle with Stylish Effects */}
                      <motion.div 
                        className="text-sm font-bold text-primary/80 uppercase tracking-wider mb-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="inline-flex items-center space-x-1">
                          <span className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            {tool.label || tool.title}
                          </span>
                          <span className="w-1 h-1 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                        </span>
                      </motion.div>
                      
                      {tool.badge && (
                        <Badge variant="secondary" className="mb-2 text-xs font-semibold">
                          {tool.badge}
                        </Badge>
                      )}
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full bg-primary/15 hover:bg-primary/25 border border-primary/20">
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="text-primary font-bold"
                        >
                          →
                        </motion.span>
                      </Button>
                    </motion.div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <motion.div
                    className="text-sm leading-relaxed text-gray-600 group-hover:text-gray-800 transition-colors duration-300 line-clamp-3 mb-4 font-medium"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 bg-clip-text text-transparent group-hover:from-gray-800 group-hover:via-gray-900 group-hover:to-gray-800 transition-all duration-500">
                      {tool.description}
                    </div>
                  </motion.div>
                  
                  {/* Professional bottom accent with gradient */}
                  <motion.div
                    className="mt-4 h-2 bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
