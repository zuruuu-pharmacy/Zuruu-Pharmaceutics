"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  Heart, 
  Share2, 
  BookOpen, 
  Tag, 
  ArrowRight,
  TrendingUp,
  Star,
  MessageCircle,
  ThumbsUp,
  Bookmark,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const blogCategories = [
  { id: "all", name: "All Posts", count: 24 },
  { id: "pharmacy", name: "Pharmacy", count: 8 },
  { id: "technology", name: "Technology", count: 6 },
  { id: "healthcare", name: "Healthcare", count: 5 },
  { id: "ai", name: "AI & Machine Learning", count: 3 },
  { id: "industry", name: "Industry News", count: 2 }
];

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Pharmacy: Transforming Patient Care",
    excerpt: "Explore how artificial intelligence is revolutionizing pharmacy operations, from automated dispensing to personalized medication management.",
    content: "Artificial intelligence is transforming the pharmacy industry at an unprecedented pace. From automated dispensing systems to AI-powered drug interaction checks, technology is enhancing patient safety and improving operational efficiency. This comprehensive guide explores the latest AI innovations in pharmacy, including machine learning algorithms for medication optimization, predictive analytics for inventory management, and intelligent systems for clinical decision support. Learn how leading pharmacies are implementing AI solutions to reduce errors, improve patient outcomes, and streamline operations.",
    author: "Dr. Sarah Johnson",
    authorRole: "Chief Medical Officer",
    authorAvatar: "/api/placeholder/40/40",
    publishDate: "2025-01-15",
    readTime: "8 min read",
    category: "ai",
    tags: ["AI", "Pharmacy", "Technology", "Innovation"],
    image: "/api/placeholder/600/300",
    views: 2847,
    likes: 156,
    comments: 23,
    featured: true,
    trending: true
  },
  {
    id: 2,
    title: "Digital Transformation in Healthcare: A Complete Guide",
    excerpt: "Discover the key strategies and technologies driving digital transformation in healthcare organizations worldwide.",
    content: "Digital transformation in healthcare is no longer optional—it's essential for survival and growth. This comprehensive guide covers everything from electronic health records (EHR) implementation to telemedicine platforms, AI-powered diagnostics, and patient engagement tools. Learn about the challenges healthcare organizations face during digital transformation, including data security concerns, staff training requirements, and integration complexities. Discover best practices from successful digital transformation initiatives and how to measure ROI in healthcare technology investments.",
    author: "Michael Chen",
    authorRole: "Healthcare Technology Consultant",
    authorAvatar: "/api/placeholder/40/40",
    publishDate: "2025-01-12",
    readTime: "12 min read",
    category: "technology",
    tags: ["Digital Health", "Transformation", "Technology", "Healthcare"],
    image: "/api/placeholder/600/300",
    views: 1923,
    likes: 89,
    comments: 18,
    featured: true,
    trending: false
  },
  {
    id: 3,
    title: "Pharmacy Automation: Benefits and Implementation Strategies",
    excerpt: "Learn how pharmacy automation systems can improve efficiency, reduce errors, and enhance patient safety in your practice.",
    content: "Pharmacy automation has evolved from simple pill counting machines to sophisticated robotic systems that can handle complex medication preparation and dispensing tasks. This article explores the various types of pharmacy automation systems available today, including automated dispensing cabinets (ADCs), robotic prescription filling systems, and automated medication management platforms. Learn about the benefits of automation, including improved accuracy, reduced labor costs, and enhanced patient safety. Discover implementation strategies, cost considerations, and how to choose the right automation solution for your pharmacy.",
    author: "Dr. Emily Rodriguez",
    authorRole: "Pharmacy Operations Director",
    authorAvatar: "/api/placeholder/40/40",
    publishDate: "2025-01-10",
    readTime: "10 min read",
    category: "pharmacy",
    tags: ["Automation", "Pharmacy", "Efficiency", "Safety"],
    image: "/api/placeholder/600/300",
    views: 1456,
    likes: 67,
    comments: 12,
    featured: false,
    trending: true
  },
  {
    id: 4,
    title: "Telepharmacy: Expanding Access to Pharmaceutical Care",
    excerpt: "Explore how telepharmacy services are bringing pharmaceutical care to underserved communities and rural areas.",
    content: "Telepharmacy is revolutionizing access to pharmaceutical care, especially in rural and underserved communities. This comprehensive overview covers the benefits of telepharmacy services, including improved medication adherence, enhanced patient counseling, and expanded access to specialized pharmaceutical care. Learn about the technology requirements for telepharmacy implementation, regulatory considerations, and best practices for delivering remote pharmaceutical services. Discover case studies from successful telepharmacy programs and how they're improving patient outcomes in remote areas.",
    author: "Dr. James Wilson",
    authorRole: "Telepharmacy Specialist",
    authorAvatar: "/api/placeholder/40/40",
    publishDate: "2025-01-08",
    readTime: "7 min read",
    category: "healthcare",
    tags: ["Telepharmacy", "Remote Care", "Access", "Innovation"],
    image: "/api/placeholder/600/300",
    views: 1123,
    likes: 45,
    comments: 8,
    featured: false,
    trending: false
  },
  {
    id: 5,
    title: "Machine Learning in Drug Discovery: Accelerating Innovation",
    excerpt: "Discover how machine learning algorithms are accelerating drug discovery processes and reducing development timelines.",
    content: "Machine learning is transforming drug discovery by analyzing vast amounts of biological and chemical data to identify promising drug candidates faster than ever before. This article explores the applications of ML in drug discovery, including target identification, compound screening, and toxicity prediction. Learn about the latest ML algorithms used in pharmaceutical research, from deep learning neural networks to reinforcement learning systems. Discover how pharmaceutical companies are leveraging ML to reduce drug development costs, accelerate clinical trials, and bring life-saving medications to market faster.",
    author: "Dr. Lisa Park",
    authorRole: "AI Research Scientist",
    authorAvatar: "/api/placeholder/40/40",
    publishDate: "2025-01-05",
    readTime: "9 min read",
    category: "ai",
    tags: ["Machine Learning", "Drug Discovery", "AI", "Innovation"],
    image: "/api/placeholder/600/300",
    views: 987,
    likes: 34,
    comments: 6,
    featured: false,
    trending: false
  },
  {
    id: 6,
    title: "Pharmaceutical Supply Chain: Challenges and Solutions",
    excerpt: "Understand the complexities of pharmaceutical supply chains and learn about innovative solutions for better management.",
    content: "The pharmaceutical supply chain is one of the most complex and critical supply chains in the world, involving multiple stakeholders, strict regulatory requirements, and temperature-sensitive products. This comprehensive analysis covers the key challenges facing pharmaceutical supply chains, including counterfeit drugs, supply disruptions, and regulatory compliance. Learn about innovative solutions such as blockchain technology for supply chain transparency, IoT sensors for temperature monitoring, and AI-powered demand forecasting. Discover best practices for supply chain optimization and risk management in the pharmaceutical industry.",
    author: "Robert Kim",
    authorRole: "Supply Chain Expert",
    authorAvatar: "/api/placeholder/40/40",
    publishDate: "2025-01-03",
    readTime: "11 min read",
    category: "industry",
    tags: ["Supply Chain", "Pharmaceuticals", "Logistics", "Innovation"],
    image: "/api/placeholder/600/300",
    views: 756,
    likes: 28,
    comments: 4,
    featured: false,
    trending: false
  }
];

const featuredPosts = blogPosts.filter(post => post.featured);
const trendingPosts = blogPosts.filter(post => post.trending);

export default function BlogPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-serif font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Zuruu Blog
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Insights, innovations, and industry trends in pharmaceutical technology and healthcare.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24</div>
                <div className="text-blue-200">Articles Published</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">15K+</div>
                <div className="text-blue-200">Monthly Readers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">98%</div>
                <div className="text-blue-200">Reader Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search articles, topics, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {blogCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "primary" : "outline"}
                    onClick={() => handleCategoryChange(category.id)}
                    className="flex items-center gap-2"
                  >
                    {category.name}
                    <Badge variant="secondary" className="ml-1">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Articles</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Handpicked articles covering the latest trends and innovations in pharmaceutical technology
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <BookOpen className="w-16 h-16 text-white/80" />
                        </div>
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-yellow-500 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{post.category}</Badge>
                          {post.trending && (
                            <Badge className="bg-green-500 text-white">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {post.title}
                        </CardTitle>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{post.author}</p>
                              <p className="text-xs text-gray-500">{post.authorRole}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">{post.publishDate}</p>
                            <p className="text-xs text-gray-400">{post.readTime}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {post.views.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {post.likes}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {post.comments}
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-300">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Trending Posts */}
      {trendingPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Trending Now</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  The most popular articles our readers are engaging with this week
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {trendingPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <div className="w-full h-32 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-white/80" />
                        </div>
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-green-500 text-white">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">{post.category}</Badge>
                        </div>
                        <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <User className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm text-gray-600">{post.author}</span>
                          </div>
                          <div className="text-xs text-gray-500">{post.readTime}</div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {post.views.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {post.likes}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            Read
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">All Articles</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse our complete collection of articles and insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
              {paginatedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <div className="w-full h-40 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-white/80" />
                      </div>
                      {post.featured && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-yellow-500 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                      {post.trending && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-500 text-white">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">{post.category}</Badge>
                        <div className="flex gap-1">
                          {post.tags.slice(0, 2).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{post.author}</p>
                            <p className="text-xs text-gray-500">{post.authorRole}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{post.publishDate}</p>
                          <p className="text-xs text-gray-400">{post.readTime}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.views.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {post.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {post.comments}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-300">
                          Read More
                          <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "primary" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="w-10 h-10"
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Get the latest insights, industry trends, and exclusive content delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder-white/70 focus:border-white/40"
              />
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

