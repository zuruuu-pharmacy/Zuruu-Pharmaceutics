"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity,
  Apple,
  Moon,
  Heart,
  Plus,
  Target,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Settings,
  RefreshCw,
  LogIn,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Zap,
  Star,
  Award,
  Trophy,
  Bell,
  MessageSquare,
  Share2,
  Download,
  Edit,
  Trash2,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  Filter,
  Search,
  MoreHorizontal,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
  Heart as HeartIcon,
  Brain,
  Shield,
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  Wind as WindIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
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
import { 
  LineChart as RechartsLineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

// Types and interfaces
interface DailyStats {
  steps: number;
  sleepHours: number;
  calories: number;
  mood: string;
  lastUpdated: string;
}

interface Goal {
  id: string;
  name: string;
  category: 'exercise' | 'diet' | 'sleep' | 'mood';
  target: number;
  current: number;
  unit: string;
  isActive: boolean;
  createdAt: string;
}

interface MealEntry {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  calories: number;
  timestamp: string;
}

interface SleepData {
  date: string;
  hours: number;
  quality: 'poor' | 'fair' | 'good' | 'excellent';
  bedtime: string;
  wakeTime: string;
}

interface MoodEntry {
  id: string;
  mood: string;
  stressLevel: number;
  note: string;
  timestamp: string;
}

interface AIRecommendation {
  id: string;
  type: 'sleep' | 'exercise' | 'nutrition' | 'mood';
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  priority: 'low' | 'medium' | 'high';
}

// Mock data
const mockDailyStats: DailyStats = {
  steps: 6450,
  sleepHours: 7,
  calories: 1850,
  mood: 'relaxed',
  lastUpdated: '2h ago'
};

const mockGoals: Goal[] = [
  {
    id: '1',
    name: 'Daily Steps',
    category: 'exercise',
    target: 10000,
    current: 6450,
    unit: 'steps',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Sleep Duration',
    category: 'sleep',
    target: 8,
    current: 7,
    unit: 'hours',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    name: 'Calorie Intake',
    category: 'diet',
    target: 2200,
    current: 1850,
    unit: 'kcal',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '4',
    name: 'Stress Level',
    category: 'mood',
    target: 3,
    current: 2,
    unit: 'level',
    isActive: true,
    createdAt: '2024-01-01'
  }
];

const mockMeals: MealEntry[] = [
  { id: '1', type: 'breakfast', name: 'Oatmeal with berries', calories: 350, timestamp: '2024-01-15 08:00' },
  { id: '2', type: 'lunch', name: 'Grilled chicken salad', calories: 450, timestamp: '2024-01-15 12:30' },
  { id: '3', type: 'dinner', name: 'Salmon with vegetables', calories: 550, timestamp: '2024-01-15 19:00' },
  { id: '4', type: 'snack', name: 'Greek yogurt', calories: 150, timestamp: '2024-01-15 15:30' }
];

const mockSleepData: SleepData[] = [
  { date: '2024-01-09', hours: 6.5, quality: 'fair', bedtime: '23:30', wakeTime: '06:00' },
  { date: '2024-01-10', hours: 7.2, quality: 'good', bedtime: '23:00', wakeTime: '06:12' },
  { date: '2024-01-11', hours: 6.8, quality: 'good', bedtime: '23:15', wakeTime: '06:03' },
  { date: '2024-01-12', hours: 7.5, quality: 'excellent', bedtime: '22:45', wakeTime: '06:15' },
  { date: '2024-01-13', hours: 6.2, quality: 'fair', bedtime: '23:45', wakeTime: '06:05' },
  { date: '2024-01-14', hours: 7.0, quality: 'good', bedtime: '23:00', wakeTime: '06:00' },
  { date: '2024-01-15', hours: 7.0, quality: 'good', bedtime: '23:00', wakeTime: '06:00' }
];

const mockMoodEntries: MoodEntry[] = [
  { id: '1', mood: '😊', stressLevel: 2, note: 'Feeling calm and relaxed', timestamp: '2024-01-15 09:00' },
  { id: '2', mood: '😐', stressLevel: 4, note: 'Slightly stressed about work', timestamp: '2024-01-15 14:00' },
  { id: '3', mood: '😄', stressLevel: 1, note: 'Great day overall!', timestamp: '2024-01-15 18:00' }
];

const mockAIRecommendations: AIRecommendation[] = [
  {
    id: '1',
    type: 'sleep',
    title: 'Sleep Pattern Alert',
    description: 'You\'ve been short on sleep for 3 nights — try adjusting bedtime.',
    icon: <Moon className="w-5 h-5" />,
    action: 'Set Reminder',
    priority: 'medium'
  },
  {
    id: '2',
    type: 'nutrition',
    title: 'Nutrition Balance',
    description: 'Your calorie intake is balanced, great job!',
    icon: <Apple className="w-5 h-5" />,
    action: 'View Details',
    priority: 'low'
  },
  {
    id: '3',
    type: 'exercise',
    title: 'Activity Goal',
    description: 'Walking goal unmet 2 days — set a reminder?',
    icon: <Activity className="w-5 h-5" />,
    action: 'Set Reminder',
    priority: 'high'
  }
];

export default function LifestyleHealthGoalsTracker() {
  const [dailyStats, setDailyStats] = useState<DailyStats>(mockDailyStats);
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [meals, setMeals] = useState<MealEntry[]>(mockMeals);
  const [sleepData, setSleepData] = useState<SleepData[]>(mockSleepData);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(mockMoodEntries);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>(mockAIRecommendations);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showMealModal, setShowMealModal] = useState(false);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    category: 'exercise' as const,
    target: 0,
    unit: ''
  });
  const [newMeal, setNewMeal] = useState({
    type: 'breakfast' as const,
    name: '',
    calories: 0
  });
  const [newMood, setNewMood] = useState({
    mood: '😊',
    stressLevel: 3,
    note: ''
  });

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'excited': return '😄';
      case 'happy': return '😊';
      case 'neutral': return '😐';
      case 'sad': return '😔';
      case 'stressed': return '😰';
      case 'relaxed': return '😌';
      default: return '😊';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'exercise': return 'text-blue-600';
      case 'diet': return 'text-orange-600';
      case 'sleep': return 'text-purple-600';
      case 'mood': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'exercise': return <Activity className="w-5 h-5" />;
      case 'diet': return <Apple className="w-5 h-5" />;
      case 'sleep': return <Moon className="w-5 h-5" />;
      case 'mood': return <Heart className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const addGoal = () => {
    const goal: Goal = {
      id: Date.now().toString(),
      name: newGoal.name,
      category: newGoal.category,
      target: newGoal.target,
      current: 0,
      unit: newGoal.unit,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    setGoals(prev => [...prev, goal]);
    setNewGoal({ name: '', category: 'exercise', target: 0, unit: '' });
    setShowGoalModal(false);
  };

  const addMeal = () => {
    const meal: MealEntry = {
      id: Date.now().toString(),
      type: newMeal.type,
      name: newMeal.name,
      calories: newMeal.calories,
      timestamp: new Date().toISOString()
    };
    setMeals(prev => [...prev, meal]);
    setNewMeal({ type: 'breakfast', name: '', calories: 0 });
    setShowMealModal(false);
  };

  const addMoodEntry = () => {
    const moodEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: newMood.mood,
      stressLevel: newMood.stressLevel,
      note: newMood.note,
      timestamp: new Date().toISOString()
    };
    setMoodEntries(prev => [...prev, moodEntry]);
    setNewMood({ mood: '😊', stressLevel: 3, note: '' });
    setShowMoodModal(false);
  };

  const renderSummaryStrip = () => (
    <motion.div
      className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-6 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Steps */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
            </div>
          </div>
          <div>
            <p className="text-white/80 text-sm">Steps Taken</p>
            <p className="text-white font-bold text-lg">{dailyStats.steps.toLocaleString()} / 10,000</p>
            <p className="text-white/60 text-xs">Updated {dailyStats.lastUpdated}</p>
          </div>
        </div>

        {/* Sleep */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Moon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-white/80 text-sm">Sleep Duration</p>
            <p className="text-white font-bold text-lg">{dailyStats.sleepHours} hrs</p>
            <p className="text-white/60 text-xs">Updated {dailyStats.lastUpdated}</p>
          </div>
        </div>

        {/* Calories */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Apple className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-white/80 text-sm">Calories Intake</p>
            <p className="text-white font-bold text-lg">{dailyStats.calories} kcal</p>
            <p className="text-white/60 text-xs">Updated {dailyStats.lastUpdated}</p>
          </div>
        </div>

        {/* Mood */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-white/80 text-sm">Mood Check</p>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{getMoodEmoji(dailyStats.mood)}</span>
              <p className="text-white font-bold text-lg capitalize">{dailyStats.mood}</p>
            </div>
            <p className="text-white/60 text-xs">Updated {dailyStats.lastUpdated}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderPhysicalActivityCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <span>Physical Activity</span>
          </CardTitle>
          <p className="text-sm text-gray-600">Target: 10,000 steps/day</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Circular Progress */}
            <div className="flex justify-center">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeDasharray={`${getProgressPercentage(dailyStats.steps, 10000)}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">
                    {Math.round(getProgressPercentage(dailyStats.steps, 10000))}%
                  </span>
                </div>
              </div>
            </div>

            {/* Data Row */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Steps:</span>
                <span className="font-medium">{dailyStats.steps.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Calories Burned:</span>
                <span className="font-medium">280</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Active Minutes:</span>
                <span className="font-medium">42</span>
              </div>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync with Fitness Tracker
            </Button>
            <p className="text-xs text-gray-500 text-center">Last synced: 10:45 AM</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderNutritionCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Apple className="w-5 h-5 text-orange-600" />
            <span>Nutrition Goals</span>
          </CardTitle>
          <p className="text-sm text-gray-600">Track your daily calorie and nutrient balance</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Calorie Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Calories:</span>
                <span className="font-medium">{dailyStats.calories} / 2,200</span>
              </div>
              <Progress value={getProgressPercentage(dailyStats.calories, 2200)} className="h-2" />
            </div>

            {/* Nutrient Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Protein:</span>
                <span className="font-medium">75g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Carbs:</span>
                <span className="font-medium">180g</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fats:</span>
                <span className="font-medium">65g</span>
              </div>
            </div>

            <Button 
              className="w-full bg-orange-600 hover:bg-orange-700"
              onClick={() => setShowMealModal(true)}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Log Meal
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderSleepCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Moon className="w-5 h-5 text-purple-600" />
            <span>Sleep Tracker</span>
          </CardTitle>
          <p className="text-sm text-gray-600">Monitor sleep cycles and quality</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Sleep Chart */}
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={mockSleepData}>
                  <Line 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 3 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>

            {/* Stats */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Average:</span>
                <span className="font-medium">6.8 hrs/night</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Goal:</span>
                <span className="font-medium">8 hrs</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sleep Quality:</span>
                <span className="font-medium text-green-600">Good</span>
              </div>
            </div>

            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Sleep Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderMoodCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-green-600" />
            <span>Mood & Stress Levels</span>
          </CardTitle>
          <p className="text-sm text-gray-600">Emotional and mental well-being tracking</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Mood Selector */}
            <div className="flex justify-center space-x-2">
              {['😔', '😐', '🙂', '😄'].map((emoji, index) => (
                <button
                  key={index}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl hover:scale-110 transition-transform ${
                    newMood.mood === emoji ? 'bg-green-100 border-2 border-green-600' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setNewMood(prev => ({ ...prev, mood: emoji }))}
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Current Mood */}
            <div className="text-center">
              <p className="text-sm text-gray-600">Today: {getMoodEmoji(dailyStats.mood)} – Feeling {dailyStats.mood}</p>
            </div>

            {/* Stress Level */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Stress Level:</span>
                <span className="font-medium">2/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>

            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => setShowMoodModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Mood Entry
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderGoalSettingModal = () => (
    <Dialog open={showGoalModal} onOpenChange={setShowGoalModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Goal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Goal Name</label>
            <Input
              placeholder="e.g., Daily Steps, Sleep Hours"
              value={newGoal.name}
              onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Category</label>
            <Select value={newGoal.category} onValueChange={(value: any) => setNewGoal(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exercise">Exercise</SelectItem>
                <SelectItem value="diet">Diet</SelectItem>
                <SelectItem value="sleep">Sleep</SelectItem>
                <SelectItem value="mood">Mood</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Target Value</label>
            <Input
              type="number"
              placeholder="e.g., 10000"
              value={newGoal.target}
              onChange={(e) => setNewGoal(prev => ({ ...prev, target: parseInt(e.target.value) || 0 }))}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Unit</label>
            <Input
              placeholder="e.g., steps, hours, kcal"
              value={newGoal.unit}
              onChange={(e) => setNewGoal(prev => ({ ...prev, unit: e.target.value }))}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={addGoal} className="flex-1">
              Save Goal
            </Button>
            <Button variant="outline" onClick={() => setShowGoalModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderMealModal = () => (
    <Dialog open={showMealModal} onOpenChange={setShowMealModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Meal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Meal Type</label>
            <Select value={newMeal.type} onValueChange={(value: any) => setNewMeal(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Meal Name</label>
            <Input
              placeholder="e.g., Grilled chicken salad"
              value={newMeal.name}
              onChange={(e) => setNewMeal(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Calories</label>
            <Input
              type="number"
              placeholder="e.g., 450"
              value={newMeal.calories}
              onChange={(e) => setNewMeal(prev => ({ ...prev, calories: parseInt(e.target.value) || 0 }))}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={addMeal} className="flex-1">
              Log Meal
            </Button>
            <Button variant="outline" onClick={() => setShowMealModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderMoodModal = () => (
    <Dialog open={showMoodModal} onOpenChange={setShowMoodModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Mood Entry</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Mood</label>
            <div className="flex justify-center space-x-2">
              {['😔', '😐', '🙂', '😄'].map((emoji, index) => (
                <button
                  key={index}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition-transform ${
                    newMood.mood === emoji ? 'bg-green-100 border-2 border-green-600' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setNewMood(prev => ({ ...prev, mood: emoji }))}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Stress Level (1-10)</label>
            <Slider
              value={[newMood.stressLevel]}
              onValueChange={(value) => setNewMood(prev => ({ ...prev, stressLevel: value[0] }))}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Note (Optional)</label>
            <Textarea
              placeholder="How are you feeling today?"
              value={newMood.note}
              onChange={(e) => setNewMood(prev => ({ ...prev, note: e.target.value }))}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={addMoodEntry} className="flex-1">
              Add Entry
            </Button>
            <Button variant="outline" onClick={() => setShowMoodModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderAIRecommendations = () => (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <Card className="border-l-4 border-l-teal-600">
        <CardHeader>
          <Button
            variant="ghost"
            className="flex items-center justify-between w-full p-0 h-auto"
            onClick={() => setShowAIRecommendations(!showAIRecommendations)}
          >
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-teal-600" />
              <span>AI Health Insights</span>
            </CardTitle>
            {showAIRecommendations ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </CardHeader>
        
        <AnimatePresence>
          {showAIRecommendations && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {aiRecommendations.map((recommendation, index) => (
                    <motion.div
                      key={recommendation.id}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className={`p-2 rounded-full ${
                        recommendation.priority === 'high' ? 'bg-red-100' :
                        recommendation.priority === 'medium' ? 'bg-yellow-100' :
                        'bg-green-100'
                      }`}>
                        {recommendation.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{recommendation.title}</h4>
                        <p className="text-sm text-gray-600">{recommendation.description}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        {recommendation.action}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );

  const renderFloatingActionButton = () => (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.6 }}
    >
      <Button
        size="lg"
        className="w-14 h-14 rounded-full bg-teal-600 hover:bg-teal-700 shadow-lg"
        onClick={() => setShowGoalModal(true)}
      >
        <Plus className="w-6 h-6" />
      </Button>
    </motion.div>
  );

  if (isMobile) {
    return (
      <div className="space-y-6 pb-20">
        {renderSummaryStrip()}
        
        <div className="grid grid-cols-1 gap-6">
          {renderPhysicalActivityCard()}
          {renderNutritionCard()}
          {renderSleepCard()}
          {renderMoodCard()}
        </div>
        
        {renderAIRecommendations()}
        {renderGoalSettingModal()}
        {renderMealModal()}
        {renderMoodModal()}
        {renderFloatingActionButton()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderSummaryStrip()}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderPhysicalActivityCard()}
        {renderNutritionCard()}
        {renderSleepCard()}
        {renderMoodCard()}
      </div>
      
      {renderAIRecommendations()}
      {renderGoalSettingModal()}
      {renderMealModal()}
      {renderMoodModal()}
      {renderFloatingActionButton()}
    </div>
  );
}
