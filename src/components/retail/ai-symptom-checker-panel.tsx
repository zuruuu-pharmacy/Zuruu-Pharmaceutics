"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain,
  Heart,
  Thermometer,
  Activity,
  Droplets,
  Scale,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Video,
  Pill,
  Download,
  Mic,
  MicOff,
  Plus,
  X,
  Info,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Target,
  Shield,
  Eye,
  Stethoscope,
  Calendar,
  MessageSquare,
  Share2,
  FileText,
  Bell,
  Settings,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Star,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
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
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { 
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Types and interfaces
interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
}

interface Vitals {
  temperature: number;
  heartRate: number;
  bloodPressure: { systolic: number; diastolic: number };
  oxygenLevel: number;
  weight: number;
  bloodSugar: number;
}

interface LifestyleFactors {
  sleepHours: number;
  isSmoker: boolean;
  alcoholUse: boolean;
  poorDiet: boolean;
  sedentaryLifestyle: boolean;
}

interface AIPrediction {
  condition: string;
  confidence: number;
  riskLevel: 'low' | 'moderate' | 'high';
  urgency: string;
  description: string;
  icon: React.ReactNode;
}

interface RecoveryTimeline {
  day: string;
  severity: 'normal' | 'mild' | 'moderate' | 'severe';
  color: string;
}

// Mock data
const mockPredictions: AIPrediction[] = [
  {
    condition: 'Migraine',
    confidence: 72,
    riskLevel: 'moderate',
    urgency: 'See doctor within 48 hours',
    description: 'Headache with light sensitivity and nausea',
    icon: <Brain className="w-6 h-6" />
  },
  {
    condition: 'Dehydration',
    confidence: 18,
    riskLevel: 'low',
    urgency: 'Increase fluid intake',
    description: 'Mild dehydration from insufficient water intake',
    icon: <Droplets className="w-6 h-6" />
  },
  {
    condition: 'Viral Infection',
    confidence: 10,
    riskLevel: 'moderate',
    urgency: 'Monitor symptoms',
    description: 'Possible viral infection with fatigue',
    icon: <Shield className="w-6 h-6" />
  }
];

const mockRecoveryTimeline: RecoveryTimeline[] = [
  { day: 'Today', severity: 'moderate', color: '#FFC107' },
  { day: '+2 days', severity: 'mild', color: '#4CAF50' },
  { day: '+5 days', severity: 'normal', color: '#9E9E9E' }
];

const mockSymptomHistory = [
  { date: '2024-01-01', severity: 3, condition: 'Headache' },
  { date: '2024-01-05', severity: 2, condition: 'Fatigue' },
  { date: '2024-01-10', severity: 4, condition: 'Migraine' },
  { date: '2024-01-15', severity: 2, condition: 'Headache' }
];

export default function AISymptomCheckerPanel() {
  const [symptoms, setSymptoms] = useState<string>('');
  const [vitals, setVitals] = useState<Vitals>({
    temperature: 0,
    heartRate: 0,
    bloodPressure: { systolic: 0, diastolic: 0 },
    oxygenLevel: 0,
    weight: 0,
    bloodSugar: 0
  });
  const [lifestyle, setLifestyle] = useState<LifestyleFactors>({
    sleepHours: 8,
    isSmoker: false,
    alcoholUse: false,
    poorDiet: false,
    sedentaryLifestyle: false
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [predictions, setPredictions] = useState<AIPrediction[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('input');
  const [isRecording, setIsRecording] = useState(false);
  const [suggestedSymptoms, setSuggestedSymptoms] = useState<string[]>([]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulate symptom suggestions based on input
  useEffect(() => {
    if (symptoms.length > 3) {
      const suggestions = ['nausea', 'dizziness', 'fatigue', 'light sensitivity'];
      setSuggestedSymptoms(suggestions.filter(s => 
        s.toLowerCase().includes(symptoms.toLowerCase()) || 
        symptoms.toLowerCase().includes(s.toLowerCase())
      ));
    } else {
      setSuggestedSymptoms([]);
    }
  }, [symptoms]);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    if (urgency.includes('48 hours')) return 'text-orange-600';
    if (urgency.includes('immediately')) return 'text-red-600';
    if (urgency.includes('monitor')) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleAnalyzeSymptoms = async () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    
    // Simulate AI analysis
    setTimeout(() => {
      setPredictions(mockPredictions);
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      if (isMobile) setActiveTab('results');
    }, 2000);
  };

  const addSuggestedSymptom = (symptom: string) => {
    setSymptoms(prev => prev + (prev ? ', ' : '') + symptom);
    setSuggestedSymptoms([]);
  };

  const renderHeader = () => (
    <motion.div 
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">AI Symptom Checker & Health Risk Predictor</h1>
        <p className="text-gray-600">Get AI-powered health insights and risk assessment</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Info className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-500">AI predictions are informational and not a substitute for medical advice</span>
      </div>
    </motion.div>
  );

  const renderInputPanel = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Symptom Input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Symptom Input Field */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Describe your symptoms</label>
            <div className="relative">
              <Textarea
                placeholder="Describe your symptoms… e.g., mild headache, fatigue, loss of appetite"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="min-h-24 pr-12"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => setIsRecording(!isRecording)}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>
            
            {/* Suggested Symptoms */}
            {suggestedSymptoms.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Possible related symptoms:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedSymptoms.map((symptom, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      onClick={() => addSuggestedSymptom(symptom)}
                      className="text-xs"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      {symptom}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Vitals Entry Section */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Vitals (Optional)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-600 flex items-center">
                  <Thermometer className="w-3 h-3 mr-1" />
                  Temperature (°F)
                </label>
                <Input
                  type="number"
                  placeholder="98.6"
                  value={vitals.temperature || ''}
                  onChange={(e) => setVitals(prev => ({ ...prev, temperature: parseFloat(e.target.value) || 0 }))}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs text-gray-600 flex items-center">
                  <Heart className="w-3 h-3 mr-1" />
                  Heart Rate (BPM)
                </label>
                <Input
                  type="number"
                  placeholder="72"
                  value={vitals.heartRate || ''}
                  onChange={(e) => setVitals(prev => ({ ...prev, heartRate: parseInt(e.target.value) || 0 }))}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs text-gray-600 flex items-center">
                  <Activity className="w-3 h-3 mr-1" />
                  BP (mmHg)
                </label>
                <div className="flex space-x-1">
                  <Input
                    type="number"
                    placeholder="120"
                    value={vitals.bloodPressure.systolic || ''}
                    onChange={(e) => setVitals(prev => ({ 
                      ...prev, 
                      bloodPressure: { ...prev.bloodPressure, systolic: parseInt(e.target.value) || 0 }
                    }))}
                  />
                  <Input
                    type="number"
                    placeholder="80"
                    value={vitals.bloodPressure.diastolic || ''}
                    onChange={(e) => setVitals(prev => ({ 
                      ...prev, 
                      bloodPressure: { ...prev.bloodPressure, diastolic: parseInt(e.target.value) || 0 }
                    }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs text-gray-600 flex items-center">
                  <Droplets className="w-3 h-3 mr-1" />
                  Oxygen (%)
                </label>
                <Input
                  type="number"
                  placeholder="98"
                  value={vitals.oxygenLevel || ''}
                  onChange={(e) => setVitals(prev => ({ ...prev, oxygenLevel: parseInt(e.target.value) || 0 }))}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs text-gray-600 flex items-center">
                  <Scale className="w-3 h-3 mr-1" />
                  Weight (lbs)
                </label>
                <Input
                  type="number"
                  placeholder="150"
                  value={vitals.weight || ''}
                  onChange={(e) => setVitals(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs text-gray-600 flex items-center">
                  <Zap className="w-3 h-3 mr-1" />
                  Blood Sugar (mg/dL)
                </label>
                <Input
                  type="number"
                  placeholder="100"
                  value={vitals.bloodSugar || ''}
                  onChange={(e) => setVitals(prev => ({ ...prev, bloodSugar: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>
          </div>

          {/* Lifestyle Checkboxes */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Lifestyle Factors</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sleep"
                  checked={lifestyle.sleepHours < 6}
                  onCheckedChange={(checked) => setLifestyle(prev => ({ ...prev, sleepHours: checked ? 5 : 8 }))}
                />
                <label htmlFor="sleep" className="text-sm text-gray-700">💤 Sleep &lt; 6 hrs</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="smoker"
                  checked={lifestyle.isSmoker}
                  onCheckedChange={(checked) => setLifestyle(prev => ({ ...prev, isSmoker: !!checked }))}
                />
                <label htmlFor="smoker" className="text-sm text-gray-700">🚬 Smoker</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="alcohol"
                  checked={lifestyle.alcoholUse}
                  onCheckedChange={(checked) => setLifestyle(prev => ({ ...prev, alcoholUse: !!checked }))}
                />
                <label htmlFor="alcohol" className="text-sm text-gray-700">🍺 Alcohol use</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="diet"
                  checked={lifestyle.poorDiet}
                  onCheckedChange={(checked) => setLifestyle(prev => ({ ...prev, poorDiet: !!checked }))}
                />
                <label htmlFor="diet" className="text-sm text-gray-700">🍔 Poor diet</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sedentary"
                  checked={lifestyle.sedentaryLifestyle}
                  onCheckedChange={(checked) => setLifestyle(prev => ({ ...prev, sedentaryLifestyle: !!checked }))}
                />
                <label htmlFor="sedentary" className="text-sm text-gray-700">🏃 Sedentary lifestyle</label>
              </div>
            </div>
          </div>

          {/* Analyze Button */}
          <Button
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3"
            onClick={handleAnalyzeSymptoms}
            disabled={!symptoms.trim() || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing Symptoms...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Analyze Symptoms
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderAIAnalysis = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Prediction Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {predictions.slice(0, 3).map((prediction, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
          >
            <Card className={`border-l-4 ${
              prediction.riskLevel === 'low' ? 'border-l-green-500' :
              prediction.riskLevel === 'moderate' ? 'border-l-yellow-500' :
              'border-l-red-500'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-full ${
                    prediction.riskLevel === 'low' ? 'bg-green-100' :
                    prediction.riskLevel === 'moderate' ? 'bg-yellow-100' :
                    'bg-red-100'
                  }`}>
                    {prediction.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{prediction.condition}</h3>
                    <p className="text-sm text-gray-600">{prediction.confidence}% match</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Confidence</span>
                    <span className="text-sm font-medium">{prediction.confidence}%</span>
                  </div>
                  <Progress value={prediction.confidence} className="h-2" />
                </div>
                
                <div className="mt-3">
                  <Badge className={getRiskColor(prediction.riskLevel)}>
                    {prediction.riskLevel.charAt(0).toUpperCase() + prediction.riskLevel.slice(1)} Risk
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Interactive Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Probability Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Condition Probability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={predictions.map(p => ({ name: p.condition, value: p.confidence }))}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {predictions.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={
                        entry.riskLevel === 'low' ? '#4CAF50' :
                        entry.riskLevel === 'moderate' ? '#FFC107' :
                        '#F44336'
                      } />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Trend Graph */}
        <Card>
          <CardHeader>
            <CardTitle>Symptom History Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockSymptomHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="severity" 
                    stroke="#009688" 
                    strokeWidth={3}
                    dot={{ fill: '#009688', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );

  const renderRecommendations = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      {/* AI Health Insights */}
      <Card className="border-l-4 border-l-teal-600">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-teal-600" />
            <span>AI Health Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <p className="text-gray-700 mb-2">
                Your symptoms and vitals pattern suggest a likely mild migraine episode. 
                Maintain hydration 💧, avoid bright light, and rest 💤. 
                Seek consultation if pain persists beyond 48 hours.
              </p>
              <p className="text-sm text-gray-500">
                AI Confidence: 72% | Based on recent pattern match from clinical database.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Severity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Recovery Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockRecoveryTimeline.map((timeline, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{timeline.day}</span>
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-20 h-3 rounded-full"
                    style={{ backgroundColor: timeline.color }}
                  ></div>
                  <span className="text-sm text-gray-600 capitalize">{timeline.severity}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Follow-up Options */}
      <Card>
        <CardHeader>
          <CardTitle>Follow-up Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              <Video className="w-4 h-4 mr-2" />
              Book Teleconsultation
            </Button>
            <Button variant="outline">
              <Pill className="w-4 h-4 mr-2" />
              Share with Pharmacist
            </Button>
            <Button variant="outline" className="text-blue-600 hover:text-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Download Report (PDF)
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (isMobile) {
    return (
      <div className="space-y-6">
        {renderHeader()}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="input">Input</TabsTrigger>
            <TabsTrigger value="results" disabled={!analysisComplete}>Results</TabsTrigger>
            <TabsTrigger value="advice" disabled={!analysisComplete}>Advice</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="space-y-4">
            {renderInputPanel()}
          </TabsContent>
          
          <TabsContent value="results" className="space-y-4">
            {analysisComplete && renderAIAnalysis()}
          </TabsContent>
          
          <TabsContent value="advice" className="space-y-4">
            {analysisComplete && renderRecommendations()}
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderHeader()}
      
      {/* Top Input Panel */}
      {renderInputPanel()}
      
      {/* Middle AI Analysis Section */}
      {isAnalyzing && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-4">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
              <Brain className="w-8 h-8 text-teal-600 animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Analyzing symptoms using AI health model</h3>
            <p className="text-gray-600">Extracting relevant medical insights...</p>
            <div className="w-64 mx-auto">
              <Progress value={75} className="h-2" />
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Analysis Results */}
      {analysisComplete && (
        <>
          {renderAIAnalysis()}
          {renderRecommendations()}
        </>
      )}
    </div>
  );
}
