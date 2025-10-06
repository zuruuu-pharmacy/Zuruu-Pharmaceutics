"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Package, 
  Truck, 
  CheckCircle,
  AlertTriangle,
  Clock,
  User,
  MapPin,
  Camera,
  Mic,
  Send,
  RefreshCw,
  Download,
  Settings,
  BarChart3,
  Activity,
  Zap,
  Target,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface MobileTask {
  id: string;
  title: string;
  type: 'picking' | 'inventory' | 'delivery' | 'inspection' | 'maintenance';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assignedTo: string;
  location: string;
  estimatedDuration: number; // in minutes
  actualDuration?: number;
  startTime?: Date;
  endTime?: Date;
  description: string;
  instructions: string[];
  requiredTools: string[];
  photos: string[];
  notes: string;
  qrCode?: string;
  barcode?: string;
}

interface MobileUser {
  id: string;
  name: string;
  role: 'picker' | 'driver' | 'inspector' | 'supervisor';
  currentLocation: string;
  status: 'available' | 'busy' | 'offline';
  tasksCompleted: number;
  efficiency: number;
  lastActive: Date;
}

export const MobileOpsAssistant: React.FC = () => {
  const [tasks, setTasks] = useState<MobileTask[]>([]);
  const [users, setUsers] = useState<MobileUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<MobileTask | null>(null);
  const [viewMode, setViewMode] = useState<'tasks' | 'users' | 'analytics'>('tasks');

  useEffect(() => {
    loadMobileData();
  }, []);

  const loadMobileData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockTasks: MobileTask[] = [
      {
        id: 'task-1',
        title: 'Pick Order #12345',
        type: 'picking',
        priority: 'high',
        status: 'in_progress',
        assignedTo: 'John Smith',
        location: 'Zone A - Aisle 3',
        estimatedDuration: 15,
        actualDuration: 12,
        startTime: new Date(Date.now() - 10 * 60 * 1000),
        description: 'Pick 12 items for customer order #12345',
        instructions: [
          'Navigate to Zone A, Aisle 3',
          'Scan each item barcode',
          'Verify quantity matches order',
          'Place items in designated cart'
        ],
        requiredTools: ['Scanner', 'Cart'],
        photos: [],
        notes: 'Customer requested expedited shipping',
        qrCode: 'QR-12345-ABC'
      },
      {
        id: 'task-2',
        title: 'Inventory Count - Cold Storage',
        type: 'inventory',
        priority: 'medium',
        status: 'pending',
        assignedTo: 'Sarah Johnson',
        location: 'Cold Storage Unit B',
        estimatedDuration: 30,
        description: 'Complete quarterly inventory count for cold storage',
        instructions: [
          'Enter cold storage unit B',
          'Count all items by SKU',
          'Record quantities in mobile app',
          'Take photos of any discrepancies'
        ],
        requiredTools: ['Scanner', 'Thermometer'],
        photos: [],
        notes: 'Focus on temperature-sensitive items'
      },
      {
        id: 'task-3',
        title: 'Delivery Route - Downtown',
        type: 'delivery',
        priority: 'urgent',
        status: 'completed',
        assignedTo: 'Mike Wilson',
        location: 'Downtown Route',
        estimatedDuration: 120,
        actualDuration: 105,
        startTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
        endTime: new Date(Date.now() - 1.25 * 60 * 60 * 1000),
        description: 'Deliver 8 packages to downtown locations',
        instructions: [
          'Load packages in delivery vehicle',
          'Follow optimized route',
          'Scan package at each delivery',
          'Get customer signature'
        ],
        requiredTools: ['Scanner', 'Delivery Vehicle'],
        photos: ['delivery-1.jpg', 'delivery-2.jpg'],
        notes: 'All deliveries completed successfully'
      },
      {
        id: 'task-4',
        title: 'Equipment Inspection',
        type: 'inspection',
        priority: 'low',
        status: 'in_progress',
        assignedTo: 'Lisa Brown',
        location: 'Warehouse Floor',
        estimatedDuration: 45,
        startTime: new Date(Date.now() - 20 * 60 * 1000),
        description: 'Weekly inspection of forklifts and equipment',
        instructions: [
          'Check forklift condition',
          'Test safety features',
          'Document any issues',
          'Update maintenance records'
        ],
        requiredTools: ['Checklist', 'Camera'],
        photos: ['forklift-1.jpg'],
        notes: 'Minor maintenance required on Forklift #3'
      }
    ];

    const mockUsers: MobileUser[] = [
      {
        id: 'user-1',
        name: 'John Smith',
        role: 'picker',
        currentLocation: 'Zone A - Aisle 3',
        status: 'busy',
        tasksCompleted: 15,
        efficiency: 92,
        lastActive: new Date(Date.now() - 2 * 60 * 1000)
      },
      {
        id: 'user-2',
        name: 'Sarah Johnson',
        role: 'inspector',
        currentLocation: 'Cold Storage',
        status: 'available',
        tasksCompleted: 8,
        efficiency: 88,
        lastActive: new Date(Date.now() - 5 * 60 * 1000)
      },
      {
        id: 'user-3',
        name: 'Mike Wilson',
        role: 'driver',
        currentLocation: 'Delivery Bay',
        status: 'available',
        tasksCompleted: 12,
        efficiency: 95,
        lastActive: new Date(Date.now() - 1 * 60 * 1000)
      },
      {
        id: 'user-4',
        name: 'Lisa Brown',
        role: 'supervisor',
        currentLocation: 'Office',
        status: 'busy',
        tasksCompleted: 6,
        efficiency: 90,
        lastActive: new Date(Date.now() - 30 * 1000)
      }
    ];
    
    setTasks(mockTasks);
    setUsers(mockUsers);
    setIsLoading(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'urgent': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-gray-600 bg-gray-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'picking': return Package;
      case 'inventory': return BarChart3;
      case 'delivery': return Truck;
      case 'inspection': return CheckCircle;
      case 'maintenance': return Settings;
      default: return Activity;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'picker': return 'text-blue-600 bg-blue-100';
      case 'driver': return 'text-green-600 bg-green-100';
      case 'inspector': return 'text-purple-600 bg-purple-100';
      case 'supervisor': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleTaskAction = (taskId: string, action: 'start' | 'complete' | 'cancel') => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        switch (action) {
          case 'start':
            return { 
              ...task, 
              status: 'in_progress' as any,
              startTime: new Date()
            };
          case 'complete':
            return { 
              ...task, 
              status: 'completed' as any,
              endTime: new Date(),
              actualDuration: task.estimatedDuration
            };
          case 'cancel':
            return { 
              ...task, 
              status: 'cancelled' as any,
              endTime: new Date()
            };
          default:
            return task;
        }
      }
      return task;
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading mobile operations data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mobile Ops Assistant</h2>
          <p className="text-gray-600">Real-time mobile workforce management and task coordination</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadMobileData} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* View Mode Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-2">
            {[
              { key: 'tasks', label: 'Tasks', icon: Package },
              { key: 'users', label: 'Workforce', icon: User },
              { key: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={viewMode === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode(key as any)}
              >
                <Icon className="w-4 h-4 mr-1" />
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {tasks.length}
            </div>
            <div className="text-sm text-gray-500">Total Tasks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {tasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {tasks.filter(t => t.status === 'in_progress').length}
            </div>
            <div className="text-sm text-gray-500">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {users.filter(u => u.status === 'available').length}
            </div>
            <div className="text-sm text-gray-500">Available Workers</div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks View */}
      {viewMode === 'tasks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, index) => {
            const TypeIcon = getTypeIcon(task.type);
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedTask(task)}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <TypeIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{task.title}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority.toUpperCase()}
                            </Badge>
                            <Badge className={getStatusColor(task.status)}>
                              {task.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {task.estimatedDuration}m
                        </div>
                        <div className="text-sm text-gray-500">Duration</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{task.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Assigned to:</span>
                        <span className="font-medium">{task.assignedTo}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Location:</span>
                        <span className="font-medium">{task.location}</span>
                      </div>
                      {task.actualDuration && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Actual Duration:</span>
                          <span className="font-medium">{task.actualDuration}m</span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      {task.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTaskAction(task.id, 'start');
                          }}
                          className="flex-1"
                        >
                          <Zap className="w-4 h-4 mr-1" />
                          Start
                        </Button>
                      )}
                      {task.status === 'in_progress' && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTaskAction(task.id, 'complete');
                          }}
                          className="flex-1"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Complete
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Users View */}
      {viewMode === 'users' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <Badge className={getRoleColor(user.role)}>
                        {user.role.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <Badge className={user.status === 'available' ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'}>
                        {user.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Location:</span>
                      <span className="font-medium">{user.currentLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tasks Completed:</span>
                      <span className="font-medium">{user.tasksCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Efficiency:</span>
                      <span className="font-medium">{user.efficiency}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Active:</span>
                      <span className="font-medium">
                        {Math.floor((Date.now() - user.lastActive.getTime()) / (1000 * 60))}m ago
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Analytics View */}
      {viewMode === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)}%
              </div>
              <div className="text-sm text-gray-500">
                {tasks.filter(t => t.status === 'completed').length} of {tasks.length} tasks completed
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Average Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Math.round(users.reduce((sum, u) => sum + u.efficiency, 0) / users.length)}%
              </div>
              <div className="text-sm text-gray-500">
                Across {users.length} active workers
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Task Details Modal */}
      {selectedTask && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedTask(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{selectedTask.title}</h3>
              <Button variant="outline" onClick={() => setSelectedTask(null)}>
                ×
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Priority</label>
                  <Badge className={getPriorityColor(selectedTask.priority)}>
                    {selectedTask.priority.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <Badge className={getStatusColor(selectedTask.status)}>
                    {selectedTask.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Instructions</label>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                  {selectedTask.instructions.map((instruction, idx) => (
                    <li key={idx}>{instruction}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedTask(null)}>
                  Close
                </Button>
                <Button>
                  <Send className="w-4 h-4 mr-2" />
                  Send to Mobile
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
