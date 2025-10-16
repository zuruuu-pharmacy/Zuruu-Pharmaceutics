"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen,
  Search,
  Filter,
  SortAsc,
  Bookmark,
  BookmarkCheck,
  Share2,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  MessageSquare,
  Brain,
  Award,
  Target,
  TrendingUp,
  Eye,
  Clock,
  User,
  Heart,
  Pill,
  Apple,
  Dumbbell,
  Stethoscope,
  Lightbulb,
  Info,
  AlertCircle,
  CheckCircle,
  Star,
  ThumbsUp,
  ExternalLink,
  Copy,
  Send,
  Mic,
  MicOff,
  Settings,
  HelpCircle,
  Menu,
  Grid,
  List
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Types and interfaces
interface EducationArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  source: string;
  thumbnail: string;
  category: 'medications' | 'diseases' | 'nutrition' | 'lifestyle';
  tags: string[];
  readTime: number;
  views: number;
  isBookmarked: boolean;
  isRecommended: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated: string;
  highlights?: string[];
  videoUrl?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: string;
}

interface UserProgress {
  articlesRead: number;
  weeklyGoal: number;
  badges: string[];
  streak: number;
  totalReadTime: number;
}

// Mock data
const mockArticles: EducationArticle[] = [
  {
    id: '1',
    title: 'Understanding Metformin: Your Diabetes Management Guide',
    summary: 'Learn about how Metformin works, its benefits, side effects, and best practices for taking this medication effectively.',
    content: 'Metformin is one of the most commonly prescribed medications for type 2 diabetes...',
    author: 'Dr. Sarah Johnson',
    source: 'Zuruu Medical Center',
    thumbnail: '/api/placeholder/300/200',
    category: 'medications',
    tags: ['Diabetes', 'Metformin', 'Blood Sugar'],
    readTime: 5,
    views: 1250,
    isBookmarked: false,
    isRecommended: true,
    difficulty: 'beginner',
    lastUpdated: '2024-01-15',
    highlights: ['Take with meals to reduce stomach upset', 'Monitor blood sugar regularly'],
    videoUrl: 'https://example.com/metformin-video'
  },
  {
    id: '2',
    title: 'Hypertension Management: Lifestyle Changes That Work',
    summary: 'Discover effective lifestyle modifications to help control high blood pressure naturally alongside your medication.',
    content: 'High blood pressure affects millions of people worldwide...',
    author: 'Dr. Michael Chen',
    source: 'Heart Health Institute',
    thumbnail: '/api/placeholder/300/200',
    category: 'lifestyle',
    tags: ['Hypertension', 'Exercise', 'Diet'],
    readTime: 8,
    views: 890,
    isBookmarked: true,
    isRecommended: false,
    difficulty: 'intermediate',
    lastUpdated: '2024-01-12',
    highlights: ['30 minutes of daily exercise', 'Reduce sodium intake to <2g/day']
  },
  {
    id: '3',
    title: 'Diabetes-Friendly Nutrition: What to Eat and Avoid',
    summary: 'A comprehensive guide to managing diabetes through proper nutrition, including meal planning and food choices.',
    content: 'Proper nutrition is crucial for diabetes management...',
    author: 'Dr. Emily Rodriguez',
    source: 'Nutrition Wellness Center',
    thumbnail: '/api/placeholder/300/200',
    category: 'nutrition',
    tags: ['Diabetes', 'Nutrition', 'Meal Planning'],
    readTime: 12,
    views: 2100,
    isBookmarked: false,
    isRecommended: true,
    difficulty: 'beginner',
    lastUpdated: '2024-01-10',
    highlights: ['Focus on complex carbohydrates', 'Include lean proteins in every meal']
  },
  {
    id: '4',
    title: 'Understanding Cholesterol: The Good and the Bad',
    summary: 'Learn about different types of cholesterol, their impact on heart health, and how to manage cholesterol levels.',
    content: 'Cholesterol is a waxy substance found in your blood...',
    author: 'Dr. James Wilson',
    source: 'Cardiovascular Health Center',
    thumbnail: '/api/placeholder/300/200',
    category: 'diseases',
    tags: ['Cholesterol', 'Heart Health', 'Cardiovascular'],
    readTime: 7,
    views: 1560,
    isBookmarked: true,
    isRecommended: false,
    difficulty: 'intermediate',
    lastUpdated: '2024-01-08',
    highlights: ['HDL is good cholesterol', 'LDL should be kept low']
  },
  {
    id: '5',
    title: 'Exercise for Heart Health: A Beginner\'s Guide',
    summary: 'Start your journey to better heart health with these safe and effective exercises designed for beginners.',
    content: 'Regular exercise is one of the best things you can do for your heart...',
    author: 'Dr. Lisa Park',
    source: 'Fitness & Wellness Center',
    thumbnail: '/api/placeholder/300/200',
    category: 'lifestyle',
    tags: ['Exercise', 'Heart Health', 'Fitness'],
    readTime: 6,
    views: 980,
    isBookmarked: false,
    isRecommended: true,
    difficulty: 'beginner',
    lastUpdated: '2024-01-05',
    highlights: ['Start with 10 minutes daily', 'Listen to your body']
  },
  {
    id: '6',
    title: 'Medication Adherence: Tips for Success',
    summary: 'Learn practical strategies to help you remember to take your medications on time, every time.',
    content: 'Taking medications as prescribed is crucial for treatment success...',
    author: 'Dr. Robert Kim',
    source: 'Pharmacy Care Center',
    thumbnail: '/api/placeholder/300/200',
    category: 'medications',
    tags: ['Medication Adherence', 'Tips', 'Health Management'],
    readTime: 4,
    views: 750,
    isBookmarked: false,
    isRecommended: false,
    difficulty: 'beginner',
    lastUpdated: '2024-01-03',
    highlights: ['Use pill organizers', 'Set phone reminders']
  }
];

const mockUserProgress: UserProgress = {
  articlesRead: 3,
  weeklyGoal: 5,
  badges: ['First Reader', 'Health Explorer'],
  streak: 7,
  totalReadTime: 25
};

const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'ai',
    message: 'Hello! I\'m your AI health tutor. I can help you understand your medications, conditions, and lifestyle management. What would you like to know?',
    timestamp: '2024-01-15 10:00'
  }
];

export default function PatientEducationHub() {
  const [articles, setArticles] = useState<EducationArticle[]>(mockArticles);
  const [filteredArticles, setFilteredArticles] = useState<EducationArticle[]>(mockArticles);
  const [selectedArticle, setSelectedArticle] = useState<EducationArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [showModal, setShowModal] = useState(false);
  const [showAITutor, setShowAITutor] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(true);
  const [userProgress, setUserProgress] = useState<UserProgress>(mockUserProgress);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter and sort articles
  useEffect(() => {
    let filtered = articles;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Sort articles
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      case 'views':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'recommended':
        filtered.sort((a, b) => (b.isRecommended ? 1 : 0) - (a.isRecommended ? 1 : 0));
        break;
      default:
        break;
    }

    setFilteredArticles(filtered);
  }, [articles, searchQuery, selectedCategory, sortBy]);

  // Carousel auto-scroll
  useEffect(() => {
    if (isCarouselPlaying) {
      const interval = setInterval(() => {
        setCarouselIndex(prev => (prev + 1) % 3);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isCarouselPlaying]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medications': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'diseases': return 'bg-red-100 text-red-800 border-red-200';
      case 'lifestyle': return 'bg-green-100 text-green-800 border-green-200';
      case 'nutrition': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'medications': return <Pill className="w-4 h-4" />;
      case 'diseases': return <Stethoscope className="w-4 h-4" />;
      case 'lifestyle': return <Dumbbell className="w-4 h-4" />;
      case 'nutrition': return <Apple className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const toggleBookmark = (articleId: string) => {
    setArticles(prev => prev.map(article =>
      article.id === articleId ? { ...article, isBookmarked: !article.isBookmarked } : article
    ));
  };

  const openArticle = (article: EducationArticle) => {
    setSelectedArticle(article);
    setShowModal(true);
    // Increment view count
    setArticles(prev => prev.map(a =>
      a.id === article.id ? { ...a, views: a.views + 1 } : a
    ));
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        message: newMessage,
        timestamp: new Date().toISOString()
      };
      
      setChatMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          message: 'I understand your question about ' + newMessage + '. Let me provide you with some helpful information...',
          timestamp: new Date().toISOString()
        };
        setChatMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };

  const renderHeader = () => (
    <motion.div 
      className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Education & Health Resources</h1>
        <p className="text-gray-600">Learn about your medications, conditions, and lifestyle management</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search topics (e.g., diabetes diet, hypertension exercises…)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full sm:w-80"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="By Topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            <SelectItem value="medications">Medications</SelectItem>
            <SelectItem value="diseases">Diseases</SelectItem>
            <SelectItem value="nutrition">Nutrition</SelectItem>
            <SelectItem value="lifestyle">Lifestyle</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended for You</SelectItem>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="views">Most Viewed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );

  const renderArticleCard = (article: EducationArticle, index: number) => (
    <motion.div
      key={article.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card 
        className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-teal-300"
        onClick={() => openArticle(article)}
      >
        <div className="relative">
          <div className="aspect-video bg-gray-200 rounded-t-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                {getCategoryIcon(article.category)}
              </div>
              <p className="text-sm text-gray-600">Medical Illustration</p>
            </div>
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(article.id);
            }}
          >
            {article.isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-teal-600" />
            ) : (
              <Bookmark className="w-4 h-4 text-gray-400" />
            )}
          </Button>
          
          {article.isRecommended && (
            <Badge className="absolute top-2 left-2 bg-teal-600 text-white">
              Recommended
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
              {article.title}
            </h3>
            
            <p className="text-sm text-gray-600 line-clamp-3">
              {article.summary}
            </p>
            
            <div className="flex items-center justify-between">
              <Badge className={getCategoryColor(article.category)}>
                {getCategoryIcon(article.category)}
                <span className="ml-1 capitalize">{article.category}</span>
              </Badge>
              
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{article.readTime} min read</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {article.tags.slice(0, 2).map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {article.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{article.tags.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderArticleModal = () => (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                {selectedArticle?.title}
              </DialogTitle>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>By {selectedArticle?.author}</span>
                <span>•</span>
                <span>{selectedArticle?.source}</span>
                <span>•</span>
                <span>{selectedArticle?.readTime} min read</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowModal(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[60vh] space-y-6">
          {/* Article Content */}
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {selectedArticle?.content}
            </p>
          </div>
          
          {/* Highlights */}
          {selectedArticle?.highlights && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Lightbulb className="w-4 h-4 mr-2" />
                Key Takeaways
              </h4>
              <ul className="space-y-1">
                {selectedArticle.highlights.map((highlight, index) => (
                  <li key={index} className="text-sm text-blue-800 flex items-start">
                    <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-blue-600" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Video */}
          {selectedArticle?.videoUrl && (
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <Play className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Video content available</p>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => selectedArticle && toggleBookmark(selectedArticle.id)}
            >
              {selectedArticle?.isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 mr-2" />
              ) : (
                <Bookmark className="w-4 h-4 mr-2" />
              )}
              {selectedArticle?.isBookmarked ? 'Saved' : 'Save to Library'}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
          <Button onClick={() => setShowModal(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderRecommendationCarousel = () => {
    const recommendedArticles = articles.filter(article => article.isRecommended);
    
    return (
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCarouselPlaying(!isCarouselPlaying)}
            >
              {isCarouselPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCarouselIndex(prev => (prev - 1 + 3) % 3)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCarouselIndex(prev => (prev + 1) % 3)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          <motion.div
            className="flex space-x-4"
            animate={{ x: -carouselIndex * 320 }}
            transition={{ duration: 0.5 }}
          >
            {recommendedArticles.map((article) => (
              <Card key={article.id} className="w-80 flex-shrink-0 cursor-pointer">
                <div className="aspect-square bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      {getCategoryIcon(article.category)}
                    </div>
                    <p className="text-xs text-gray-600">Thumbnail</p>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h4 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">
                    {article.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <Badge className={getCategoryColor(article.category)}>
                      {getCategoryIcon(article.category)}
                    </Badge>
                    <span className="text-xs text-gray-500">{article.readTime} min</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </motion.div>
    );
  };

  const renderAITutor = () => (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.0 }}
    >
      <Button
        size="lg"
        className="w-14 h-14 rounded-full bg-teal-600 hover:bg-teal-700 shadow-lg"
        onClick={() => setShowAITutor(!showAITutor)}
      >
        <Brain className="w-6 h-6" />
      </Button>
      
      <AnimatePresence>
        {showAITutor && (
          <motion.div
            className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">AI Health Tutor</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAITutor(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-600">Ask about medications, conditions, or lifestyle</p>
            </div>
            
            <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask about this topic..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button size="sm" onClick={sendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const renderProgressTracker = () => (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Your Learning Progress</h3>
            <div className="flex items-center space-x-2">
              {userProgress.badges.map((badge, index) => (
                <Badge key={index} className="bg-yellow-100 text-yellow-800">
                  <Award className="w-3 h-3 mr-1" />
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Weekly Goal Progress</span>
              <span className="text-sm font-medium">
                {userProgress.articlesRead} of {userProgress.weeklyGoal} articles
              </span>
            </div>
            <Progress 
              value={(userProgress.articlesRead / userProgress.weeklyGoal) * 100} 
              className="h-2" 
            />
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Reading Streak: {userProgress.streak} days</span>
              <span>Total Read Time: {userProgress.totalReadTime} minutes</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (isMobile) {
    return (
      <div className="space-y-6 pb-20">
        {renderHeader()}
        
        <div className="grid grid-cols-1 gap-6">
          {filteredArticles.map((article, index) => renderArticleCard(article, index))}
        </div>
        
        {renderProgressTracker()}
        {renderRecommendationCarousel()}
        {renderAITutor()}
        {renderArticleModal()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderHeader()}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article, index) => renderArticleCard(article, index))}
      </div>
      
      {renderProgressTracker()}
      {renderRecommendationCarousel()}
      {renderAITutor()}
      {renderArticleModal()}
    </div>
  );
}
