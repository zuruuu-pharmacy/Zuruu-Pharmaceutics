"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle,
  Clock,
  Users,
  Award,
  BookOpen,
  Target,
  RefreshCw,
  Download,
  Eye,
  Settings,
  BarChart3,
  Activity,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  type: 'warehouse_ops' | 'quality_control' | 'safety' | 'compliance' | 'software';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  status: 'not_started' | 'in_progress' | 'completed' | 'paused';
  progress: number; // percentage
  score?: number;
  completedAt?: Date;
  prerequisites: string[];
  skills: string[];
  simulation: {
    enabled: boolean;
    scenario: string;
    objectives: string[];
  };
}

interface SimulationSession {
  id: string;
  moduleId: string;
  userId: string;
  status: 'running' | 'paused' | 'completed' | 'failed';
  startTime: Date;
  endTime?: Date;
  score: number;
  actions: {
    timestamp: Date;
    action: string;
    result: 'success' | 'failure' | 'warning';
    points: number;
  }[];
}

export const TrainingSimulationLab: React.FC = () => {
  const [modules, setModules] = useState<TrainingModule[]>([]);
  const [sessions, setSessions] = useState<SimulationSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);
  const [activeSession, setActiveSession] = useState<SimulationSession | null>(null);

  useEffect(() => {
    loadTrainingData();
  }, []);

  const loadTrainingData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockModules: TrainingModule[] = [
      {
        id: 'module-1',
        title: 'Warehouse Picking Optimization',
        description: 'Learn efficient picking strategies and route optimization',
        type: 'warehouse_ops',
        difficulty: 'intermediate',
        duration: 45,
        status: 'completed',
        progress: 100,
        score: 92,
        completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        prerequisites: [],
        skills: ['Route Planning', 'Time Management', 'Inventory Awareness'],
        simulation: {
          enabled: true,
          scenario: 'High-volume picking during peak hours',
          objectives: ['Complete 50 picks in under 30 minutes', 'Maintain 95% accuracy', 'Follow safety protocols']
        }
      },
      {
        id: 'module-2',
        title: 'Quality Control Procedures',
        description: 'Master pharmaceutical quality control standards and testing',
        type: 'quality_control',
        difficulty: 'advanced',
        duration: 60,
        status: 'in_progress',
        progress: 65,
        prerequisites: ['module-1'],
        skills: ['Testing Protocols', 'Documentation', 'Compliance'],
        simulation: {
          enabled: true,
          scenario: 'Batch quality inspection with contamination detected',
          objectives: ['Identify contamination source', 'Document findings', 'Implement corrective actions']
        }
      },
      {
        id: 'module-3',
        title: 'Safety & Emergency Response',
        description: 'Emergency procedures and safety protocols for warehouse operations',
        type: 'safety',
        difficulty: 'beginner',
        duration: 30,
        status: 'not_started',
        progress: 0,
        prerequisites: [],
        skills: ['Emergency Response', 'Safety Protocols', 'First Aid'],
        simulation: {
          enabled: true,
          scenario: 'Chemical spill emergency response',
          objectives: ['Evacuate safely', 'Contain spill', 'Notify authorities']
        }
      },
      {
        id: 'module-4',
        title: 'ERP System Navigation',
        description: 'Master the enterprise resource planning system interface',
        type: 'software',
        difficulty: 'intermediate',
        duration: 40,
        status: 'completed',
        progress: 100,
        score: 88,
        completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        prerequisites: [],
        skills: ['System Navigation', 'Data Entry', 'Reporting'],
        simulation: {
          enabled: false,
          scenario: '',
          objectives: []
        }
      }
    ];

    const mockSessions: SimulationSession[] = [
      {
        id: 'session-1',
        moduleId: 'module-2',
        userId: 'user-123',
        status: 'running',
        startTime: new Date(Date.now() - 15 * 60 * 1000),
        score: 0,
        actions: [
          {
            timestamp: new Date(Date.now() - 15 * 60 * 1000),
            action: 'Started quality inspection',
            result: 'success',
            points: 10
          },
          {
            timestamp: new Date(Date.now() - 10 * 60 * 1000),
            action: 'Identified contamination source',
            result: 'success',
            points: 25
          },
          {
            timestamp: new Date(Date.now() - 5 * 60 * 1000),
            action: 'Documented findings',
            result: 'success',
            points: 15
          }
        ]
      }
    ];
    
    setModules(mockModules);
    setSessions(mockSessions);
    setIsLoading(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_started': return 'text-gray-600 bg-gray-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warehouse_ops': return Target;
      case 'quality_control': return CheckCircle;
      case 'safety': return Activity;
      case 'compliance': return BookOpen;
      case 'software': return Settings;
      default: return BookOpen;
    }
  };

  const handleModuleAction = (moduleId: string, action: 'start' | 'pause' | 'resume' | 'complete') => {
    setModules(prev => prev.map(module => {
      if (module.id === moduleId) {
        switch (action) {
          case 'start':
            return { ...module, status: 'in_progress' as any, progress: 0 };
          case 'pause':
            return { ...module, status: 'paused' as any };
          case 'resume':
            return { ...module, status: 'in_progress' as any };
          case 'complete':
            return { 
              ...module, 
              status: 'completed' as any,
              progress: 100,
              completedAt: new Date(),
              score: Math.floor(Math.random() * 20) + 80
            };
          default:
            return module;
        }
      }
      return module;
    }));
  };

  const startSimulation = (module: TrainingModule) => {
    if (!module.simulation.enabled) return;

    const newSession: SimulationSession = {
      id: `session-${Date.now()}`,
      moduleId: module.id,
      userId: 'current-user',
      status: 'running',
      startTime: new Date(),
      score: 0,
      actions: []
    };

    setSessions(prev => [newSession, ...prev]);
    setActiveSession(newSession);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading training modules...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Training & Simulation Lab</h2>
          <p className="text-gray-600">Interactive training modules and simulation environments</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadTrainingData} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Progress
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {modules.length}
            </div>
            <div className="text-sm text-gray-500">Total Modules</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {modules.filter(m => m.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {modules.filter(m => m.status === 'in_progress').length}
            </div>
            <div className="text-sm text-gray-500">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {sessions.filter(s => s.status === 'running').length}
            </div>
            <div className="text-sm text-gray-500">Active Simulations</div>
          </CardContent>
        </Card>
      </div>

      {/* Training Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => {
          const TypeIcon = getTypeIcon(module.type);
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <TypeIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getDifficultyColor(module.difficulty)}>
                            {module.difficulty.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(module.status)}>
                            {module.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{module.progress}%</div>
                      <div className="text-sm text-gray-500">Progress</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{module.description}</p>
                  
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>

                  {/* Module Details */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>{module.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="w-3 h-3 text-gray-400" />
                      <span>{module.skills.length} skills</span>
                    </div>
                    {module.score && (
                      <div className="flex items-center space-x-1 col-span-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>Score: {module.score}/100</span>
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Skills</div>
                    <div className="flex flex-wrap gap-1">
                      {module.skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    {module.status === 'not_started' && (
                      <Button
                        size="sm"
                        onClick={() => handleModuleAction(module.id, 'start')}
                        className="flex-1"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Start
                      </Button>
                    )}
                    {module.status === 'in_progress' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleModuleAction(module.id, 'pause')}
                          className="flex-1"
                        >
                          <Pause className="w-4 h-4 mr-1" />
                          Pause
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleModuleAction(module.id, 'complete')}
                          className="flex-1"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Complete
                        </Button>
                      </>
                    )}
                    {module.status === 'paused' && (
                      <Button
                        size="sm"
                        onClick={() => handleModuleAction(module.id, 'resume')}
                        className="flex-1"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Resume
                      </Button>
                    )}
                    {module.status === 'completed' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleModuleAction(module.id, 'start')}
                        className="flex-1"
                      >
                        <RotateCcw className="w-4 h-4 mr-1" />
                        Retake
                      </Button>
                    )}
                    {module.simulation.enabled && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startSimulation(module)}
                      >
                        <Zap className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Active Simulations */}
      {sessions.filter(s => s.status === 'running').length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Simulations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions.filter(s => s.status === 'running').map((session, index) => {
                const module = modules.find(m => m.id === session.moduleId);
                return (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg bg-blue-50"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="font-semibold">{module?.title}</h4>
                        <p className="text-sm text-gray-600">Simulation in progress</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{session.score}</div>
                        <div className="text-sm text-gray-500">Points</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Started: {session.startTime.toLocaleString()}
                    </div>
                    <div className="mt-2">
                      <div className="text-sm font-medium mb-1">Recent Actions</div>
                      <div className="space-y-1">
                        {session.actions.slice(-3).map((action, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <span>{action.action}</span>
                            <div className="flex items-center space-x-1">
                              <span className={`px-2 py-1 rounded ${
                                action.result === 'success' ? 'bg-green-100 text-green-700' :
                                action.result === 'failure' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {action.result}
                              </span>
                              <span className="font-medium">+{action.points}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
