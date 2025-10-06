"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Search, 
  Filter,
  Star,
  ThumbsUp,
  ThumbsDown,
  Send,
  Download,
  FileText,
  Video,
  BookOpen,
  HelpCircle,
  Users,
  Shield,
  Zap,
  ArrowRight,
  ExternalLink,
  Calendar,
  MapPin,
  Globe,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  Copy,
  Share2,
  Heart,
  MessageSquare,
  Bell,
  Settings,
  User,
  Building,
  Smartphone,
  Laptop,
  Monitor,
  Code
} from "lucide-react";

// Support categories
const supportCategories = [
  {
    id: "general",
    title: "General Support",
    description: "General questions and assistance",
    icon: HelpCircle,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    borderColor: "border-blue-200"
  },
  {
    id: "technical",
    title: "Technical Support",
    description: "Technical issues and troubleshooting",
    icon: Zap,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    borderColor: "border-purple-200"
  },
  {
    id: "billing",
    title: "Billing & Account",
    description: "Billing, payments, and account management",
    icon: Shield,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200"
  },
  {
    id: "training",
    title: "Training & Onboarding",
    description: "Training resources and onboarding assistance",
    icon: BookOpen,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    borderColor: "border-orange-200"
  }
];

// FAQ items
const faqItems = [
  {
    id: 1,
    question: "How do I get started with Zuruu Pharmaceutics?",
    answer: "Getting started is easy! Simply sign up for an account, complete your profile setup, and choose your dashboard type (Patient, Pharmacist, or Student). Our onboarding process will guide you through each step.",
    category: "general",
    helpful: 24,
    tags: ["getting-started", "onboarding", "setup"]
  },
  {
    id: 2,
    question: "What are the system requirements?",
    answer: "Zuruu Pharmaceutics works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your preferred browser for the best experience.",
    category: "technical",
    helpful: 18,
    tags: ["system-requirements", "browser", "compatibility"]
  },
  {
    id: 3,
    question: "How secure is my data?",
    answer: "We use enterprise-grade security including HIPAA compliance, end-to-end encryption, and regular security audits. Your data is protected with the highest industry standards.",
    category: "technical",
    helpful: 32,
    tags: ["security", "privacy", "compliance", "encryption"]
  },
  {
    id: 4,
    question: "Can I integrate with my existing pharmacy system?",
    answer: "Yes! We offer seamless integration with most major pharmacy management systems. Contact our technical team to discuss your specific integration needs.",
    category: "technical",
    helpful: 15,
    tags: ["integration", "pharmacy-systems", "api"]
  },
  {
    id: 5,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers. Enterprise customers can also arrange custom billing terms.",
    category: "billing",
    helpful: 12,
    tags: ["payment", "billing", "credit-cards"]
  },
  {
    id: 6,
    question: "Do you offer training for my team?",
    answer: "Absolutely! We provide comprehensive training including live sessions, video tutorials, documentation, and ongoing support to ensure your team gets the most out of Zuruu Pharmaceutics.",
    category: "training",
    helpful: 28,
    tags: ["training", "team", "onboarding", "tutorials"]
  }
];

// Contact methods
const contactMethods = [
  {
    id: "email",
    title: "Email Support",
    description: "Get help via email within 24 hours",
    icon: Mail,
    contact: "support@zuruupharmaceutics.com",
    availability: "24/7",
    responseTime: "Within 24 hours",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "phone",
    title: "Phone Support",
    description: "Speak directly with our support team",
    icon: Phone,
    contact: "+1 (555) 123-4567",
    availability: "Mon-Fri 9AM-6PM EST",
    responseTime: "Immediate",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "chat",
    title: "Live Chat",
    description: "Get instant help with our live chat",
    icon: MessageCircle,
    contact: "Available now",
    availability: "Mon-Fri 9AM-6PM EST",
    responseTime: "Immediate",
    color: "from-purple-500 to-pink-500"
  }
];

// Resources
const resources = [
  {
    id: "documentation",
    title: "Documentation",
    description: "Comprehensive guides and API documentation",
    icon: FileText,
    type: "pdf",
    size: "2.4 MB",
    downloads: 1247,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "video-tutorials",
    title: "Video Tutorials",
    description: "Step-by-step video guides",
    icon: Video,
    type: "video",
    size: "45 min",
    downloads: 892,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "api-guide",
    title: "API Guide",
    description: "Complete API reference and examples",
    icon: Code,
    type: "pdf",
    size: "1.8 MB",
    downloads: 634,
    color: "from-green-500 to-emerald-500"
  }
];

// Ticket priorities
const ticketPriorities = [
  { value: "low", label: "Low", color: "bg-gray-500" },
  { value: "medium", label: "Medium", color: "bg-yellow-500" },
  { value: "high", label: "High", color: "bg-orange-500" },
  { value: "urgent", label: "Urgent", color: "bg-red-500" }
];

// Ticket statuses
const ticketStatuses = [
  { value: "open", label: "Open", color: "bg-blue-500" },
  { value: "in-progress", label: "In Progress", color: "bg-yellow-500" },
  { value: "resolved", label: "Resolved", color: "bg-green-500" },
  { value: "closed", label: "Closed", color: "bg-gray-500" }
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContactMethod, setSelectedContactMethod] = useState<string | null>(null);
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    description: "",
    priority: "medium",
    category: "general",
    attachments: [] as File[]
  });
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    preferredContact: "email"
  });
  const [tickets, setTickets] = useState([
    {
      id: "TKT-001",
      subject: "Login issues with Google OAuth",
      status: "open",
      priority: "high",
      category: "technical",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
      responses: 2
    },
    {
      id: "TKT-002",
      subject: "Billing question about annual plan",
      status: "resolved",
      priority: "medium",
      category: "billing",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-12",
      responses: 1
    }
  ]);
  const [helpfulVotes, setHelpfulVotes] = useState<{[key: number]: boolean}>({});
  const [downloadedResources, setDownloadedResources] = useState<{[key: string]: boolean}>({});
  
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  // Filter FAQ items based on search and category
  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle FAQ expansion
  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  // Handle helpful vote
  const handleHelpfulVote = (faqId: number) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [faqId]: !prev[faqId]
    }));
    
    toast({
      title: helpfulVotes[faqId] ? "Vote removed" : "Thank you for your feedback!",
      description: helpfulVotes[faqId] ? "Your vote has been removed." : "Your feedback helps us improve our support content.",
    });
  };

  // Handle ticket form submission
  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingTicket(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newTicket = {
        id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
        subject: ticketForm.subject,
        status: "open",
        priority: ticketForm.priority,
        category: ticketForm.category,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        responses: 0
      };
      
      setTickets(prev => [newTicket, ...prev]);
      setShowTicketForm(false);
      setTicketForm({
        subject: "",
        description: "",
        priority: "medium",
        category: "general",
        attachments: []
      });
      
      toast({
        title: "Ticket Created Successfully!",
        description: `Your support ticket ${newTicket.id} has been created. We'll get back to you soon.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to Create Ticket",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmittingTicket(false);
    }
  };

  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowContactModal(false);
      setContactForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        preferredContact: "email"
      });
      
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to Send Message",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  // Handle resource download
  const handleResourceDownload = (resourceId: string) => {
    setDownloadedResources(prev => ({
      ...prev,
      [resourceId]: true
    }));
    
    // Simulate download
    const link = document.createElement('a');
    link.href = `#download-${resourceId}`;
    link.download = `${resourceId}.pdf`;
    link.click();
    
    toast({
      title: "Download Started",
      description: "Your resource is being downloaded.",
    });
  };

  // Handle contact method selection
  const handleContactMethod = (methodId: string) => {
    setSelectedContactMethod(methodId);
    setShowContactModal(true);
  };

  // Copy contact information
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: `${label} has been copied to your clipboard.`,
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const statusConfig = ticketStatuses.find(s => s.value === status);
    return statusConfig?.color || "bg-gray-500";
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    const priorityConfig = ticketPriorities.find(p => p.value === priority);
    return priorityConfig?.color || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative z-10 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-800/20 backdrop-blur-md border-b border-white/10 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              How can we help you?
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Get instant answers, submit tickets, or connect with our support team. 
              We're here to help you succeed with Zuruu Pharmaceutics.
            </motion.p>
            
            {/* Enhanced Search Bar */}
            <motion.div 
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/60 w-6 h-6" />
                  <Input
                    type="text"
                    placeholder="Search for help articles, FAQs, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-16 pr-6 py-6 text-lg bg-white/10 border-white/20 text-white placeholder-white/60 rounded-2xl backdrop-blur-md focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                  />
                  <motion.div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    animate={{ rotate: searchQuery ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Search className="w-5 h-5 text-white/60" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Actions */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
              <Card className="relative cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 group-hover:shadow-2xl" onClick={() => setShowTicketForm(true)}>
                <CardContent className="p-8 text-center">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <MessageCircle className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="font-bold text-xl mb-3 text-white">Submit Ticket</h3>
                  <p className="text-blue-200 text-sm">Get personalized help</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
              <Card className="relative cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 group-hover:shadow-2xl" onClick={() => handleContactMethod('chat')}>
                <CardContent className="p-8 text-center">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <MessageSquare className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="font-bold text-xl mb-3 text-white">Live Chat</h3>
                  <p className="text-green-200 text-sm">Instant support</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
              <Card className="relative cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 group-hover:shadow-2xl" onClick={() => handleContactMethod('phone')}>
                <CardContent className="p-8 text-center">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Phone className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="font-bold text-xl mb-3 text-white">Call Us</h3>
                  <p className="text-purple-200 text-sm">Speak with an expert</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
              <Card className="relative cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 group-hover:shadow-2xl" onClick={() => handleContactMethod('email')}>
                <CardContent className="p-8 text-center">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Mail className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="font-bold text-xl mb-3 text-white">Email Us</h3>
                  <p className="text-orange-200 text-sm">24/7 support</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </motion.div>

        {/* Support Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Support Categories
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
                  <Card className="relative cursor-pointer bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md border border-cyan-400/30 hover:border-cyan-300/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-cyan-500/25">
                    <CardContent className="p-8 text-center">
                      <motion.div 
                        className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/25"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <category.icon className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="font-bold text-xl mb-3 text-white">{category.title}</h3>
                      <p className="text-cyan-200 text-sm">{category.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-white/60" />
                <span className="text-white/80 font-medium">Filter by category</span>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="relative w-64 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 rounded-xl">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border border-white/20">
                    <SelectItem value="all" className="text-white hover:bg-white/10">All Categories</SelectItem>
                    <SelectItem value="general" className="text-white hover:bg-white/10">General</SelectItem>
                    <SelectItem value="technical" className="text-white hover:bg-white/10">Technical</SelectItem>
                    <SelectItem value="billing" className="text-white hover:bg-white/10">Billing</SelectItem>
                    <SelectItem value="training" className="text-white hover:bg-white/10">Training</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
                  <Card className="relative bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 group-hover:shadow-2xl">
                    <CardContent className="p-8">
                      <div 
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleFAQ(faq.id)}
                      >
                        <h3 className="font-bold text-xl text-white pr-4">{faq.question}</h3>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleHelpfulVote(faq.id);
                              }}
                              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                                helpfulVotes[faq.id] 
                                  ? 'bg-green-500/20 text-green-200 border border-green-500/30' 
                                  : 'bg-white/10 text-white/80 border border-white/20 hover:bg-green-500/20 hover:text-green-200 hover:border-green-500/30'
                              }`}
                            >
                              <ThumbsUp className="w-4 h-4" />
                              {faq.helpful + (helpfulVotes[faq.id] ? 1 : 0)}
                            </button>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedFAQ === faq.id ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                          >
                            {expandedFAQ === faq.id ? (
                              <ChevronUp className="w-6 h-6 text-white" />
                            ) : (
                              <ChevronDown className="w-6 h-6 text-white" />
                            )}
                          </motion.div>
                        </div>
                      </div>
                      
                      {expandedFAQ === faq.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 pt-6 border-t border-white/20"
                        >
                          <p className="text-blue-200 mb-6 text-lg leading-relaxed">{faq.answer}</p>
                          <div className="flex items-center gap-3">
                            {faq.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs bg-white/10 text-white border border-white/20">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resources Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Resources & Documentation
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${resource.color.replace('from-', 'from-').replace('to-', 'to-')}/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300`} />
                  <Card className="relative bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 group-hover:shadow-2xl">
                    <CardContent className="p-8">
                      <motion.div 
                        className={`w-16 h-16 bg-gradient-to-r ${resource.color} rounded-full flex items-center justify-center mb-6 shadow-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <resource.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="font-bold text-xl mb-3 text-white">{resource.title}</h3>
                      <p className="text-blue-200 text-sm mb-6 leading-relaxed">{resource.description}</p>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-sm text-white/60">{resource.size}</span>
                        <span className="text-sm text-white/60">{resource.downloads} downloads</span>
                      </div>
                      <Button
                        onClick={() => handleResourceDownload(resource.id)}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        {downloadedResources[resource.id] ? 'Downloaded' : 'Download'}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* My Tickets Section */}
        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">My Support Tickets</h2>
              <Button onClick={() => setShowTicketForm(true)} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Ticket
              </Button>
            </div>
            
            <div className="space-y-4">
              {tickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="font-semibold text-lg">{ticket.subject}</h3>
                            <Badge className={`${getStatusColor(ticket.status)} text-white`}>
                              {ticketStatuses.find(s => s.value === ticket.status)?.label}
                            </Badge>
                            <Badge className={`${getPriorityColor(ticket.priority)} text-white`}>
                              {ticketPriorities.find(p => p.value === ticket.priority)?.label}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-600">
                            <span>ID: {ticket.id}</span>
                            <span>Created: {ticket.createdAt}</span>
                            <span>Updated: {ticket.updatedAt}</span>
                            <span>Responses: {ticket.responses}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Ticket Form Modal */}
      {showTicketForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowTicketForm(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Create Support Ticket</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTicketForm(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <form onSubmit={handleTicketSubmit} className="space-y-6">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Brief description of your issue"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Please provide detailed information about your issue"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={ticketForm.priority} onValueChange={(value) => setTicketForm(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ticketPriorities.map(priority => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={ticketForm.category} onValueChange={(value) => setTicketForm(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {supportCategories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowTicketForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmittingTicket}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  {isSubmittingTicket ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Create Ticket
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowContactModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Contact Support</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowContactModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    id="company"
                    value={contactForm.company}
                    onChange={(e) => setContactForm(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="What can we help you with?"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Please describe your question or issue in detail"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                <Select value={contactForm.preferredContact} onValueChange={(value) => setContactForm(prev => ({ ...prev, preferredContact: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="chat">Live Chat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowContactModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmittingContact}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                >
                  {isSubmittingContact ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}