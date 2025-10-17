"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Video, 
  Phone, 
  MessageSquare, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Bot, 
  Zap, 
  Bell, 
  Settings, 
  Filter, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Shield, 
  Activity, 
  TrendingUp,
  BarChart3,
  Users,
  FileText,
  Download,
  Share,
  Eye,
  MoreVertical
} from 'lucide-react';

interface ConsultationSlot {
  id: string;
  startTime: Date;
  endTime: Date;
  type: 'video' | 'voice' | 'chat';
  status: 'available' | 'booked' | 'blocked';
  patientId?: string;
  patientName?: string;
  reason?: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  duration: number; // in minutes
  aiSuggested?: boolean;
  notes?: string;
}

interface ConsultationSchedulerProps {
  onBookSlot: (slot: ConsultationSlot) => void;
  onEditSlot: (slot: ConsultationSlot) => void;
  onDeleteSlot: (slotId: string) => void;
}

export default function ConsultationScheduler({ 
  onBookSlot, 
  onEditSlot, 
  onDeleteSlot 
}: ConsultationSchedulerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'video' | 'voice' | 'chat'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'booked' | 'blocked'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [slots, setSlots] = useState<ConsultationSlot[]>([
    {
      id: '1',
      startTime: new Date(2024, 0, 15, 9, 0),
      endTime: new Date(2024, 0, 15, 9, 30),
      type: 'video',
      status: 'booked',
      patientId: 'p1',
      patientName: 'John Doe',
      reason: 'Medication side effects consultation',
      urgency: 'high',
      duration: 30,
      aiSuggested: true,
      notes: 'Patient reported nausea and dizziness'
    },
    {
      id: '2',
      startTime: new Date(2024, 0, 15, 10, 0),
      endTime: new Date(2024, 0, 15, 10, 15),
      type: 'voice',
      status: 'booked',
      patientId: 'p2',
      patientName: 'Sarah Wilson',
      reason: 'Refill request and dosage clarification',
      urgency: 'medium',
      duration: 15,
      aiSuggested: false
    },
    {
      id: '3',
      startTime: new Date(2024, 0, 15, 11, 0),
      endTime: new Date(2024, 0, 15, 11, 30),
      type: 'video',
      status: 'available',
      urgency: 'low',
      duration: 30,
      aiSuggested: true
    },
    {
      id: '4',
      startTime: new Date(2024, 0, 15, 14, 0),
      endTime: new Date(2024, 0, 15, 14, 45),
      type: 'chat',
      status: 'booked',
      patientId: 'p3',
      patientName: 'Michael Brown',
      reason: 'Chronic disease management discussion',
      urgency: 'medium',
      duration: 45,
      aiSuggested: true
    },
    {
      id: '5',
      startTime: new Date(2024, 0, 15, 15, 30),
      endTime: new Date(2024, 0, 15, 16, 0),
      type: 'video',
      status: 'available',
      urgency: 'low',
      duration: 30,
      aiSuggested: false
    }
  ]);

  const [aiSuggestions, setAiSuggestions] = useState([
    'Schedule follow-up for John Doe in 1 week',
    'Block 2-3 PM for lunch break',
    'Add buffer time between video consultations',
    'Consider extending Sarah\'s slot to 20 minutes',
    'Schedule emergency slot for urgent cases'
  ]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getSlotsForDate = (date: Date) => {
    return slots.filter(slot => 
      slot.startTime.toDateString() === date.toDateString()
    );
  };

  const getSlotsForWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return slots.filter(slot => 
      slot.startTime >= startOfWeek && slot.startTime <= endOfWeek
    );
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'voice': return <Phone className="w-4 h-4" />;
      case 'chat': return <MessageSquare className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-blue-600 bg-blue-100';
      case 'voice': return 'text-green-600 bg-green-100';
      case 'chat': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'booked': return 'text-blue-600 bg-blue-100';
      case 'available': return 'text-green-600 bg-green-100';
      case 'blocked': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setSelectedDate(newDate);
  };

  const renderDayView = () => {
    const daySlots = getSlotsForDate(selectedDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">{formatDate(selectedDate)}</h3>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-25 gap-0">
            {/* Time column */}
            <div className="bg-gray-50 p-2 text-sm font-medium text-gray-600 border-r border-gray-200">
              Time
            </div>
            
            {/* Hour columns */}
            {hours.map(hour => (
              <div key={hour} className="bg-gray-50 p-2 text-sm font-medium text-gray-600 border-r border-gray-200 text-center">
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
            ))}
          </div>
          
          {/* Slots */}
          <div className="grid grid-cols-25 gap-0">
            <div className="bg-gray-50 p-2 text-sm font-medium text-gray-600 border-r border-gray-200">
              Slots
            </div>
            
            {hours.map(hour => (
              <div key={hour} className="h-16 border-r border-gray-200 p-1">
                {daySlots
                  .filter(slot => slot.startTime.getHours() === hour)
                  .map(slot => (
                    <motion.div
                      key={slot.id}
                      className={`p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                        slot.status === 'booked' 
                          ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                          : slot.status === 'available'
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-gray-100 text-gray-800 border border-gray-200'
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => onBookSlot(slot)}
                    >
                      <div className="flex items-center space-x-1 mb-1">
                        {getTypeIcon(slot.type)}
                        <span className="font-medium">{formatTime(slot.startTime)}</span>
                      </div>
                      {slot.patientName && (
                        <div className="truncate">{slot.patientName}</div>
                      )}
                      {slot.reason && (
                        <div className="truncate text-gray-600">{slot.reason}</div>
                      )}
                    </motion.div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekSlots = getSlotsForWeek(selectedDate);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
    
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Week of {startOfWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          </h3>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-8 gap-0">
            <div className="bg-gray-50 p-3 text-sm font-medium text-gray-600 border-r border-gray-200">
              Time
            </div>
            {days.map((day, index) => {
              const date = new Date(startOfWeek);
              date.setDate(startOfWeek.getDate() + index);
              return (
                <div key={day} className="bg-gray-50 p-3 text-sm font-medium text-gray-600 border-r border-gray-200 text-center">
                  <div>{day}</div>
                  <div className="text-xs text-gray-500">{date.getDate()}</div>
                </div>
              );
            })}
          </div>
          
          <div className="grid grid-cols-8 gap-0">
            <div className="bg-gray-50 p-2 text-sm font-medium text-gray-600 border-r border-gray-200">
              Slots
            </div>
            {days.map((day, index) => {
              const date = new Date(startOfWeek);
              date.setDate(startOfWeek.getDate() + index);
              const daySlots = weekSlots.filter(slot => 
                slot.startTime.toDateString() === date.toDateString()
              );
              
              return (
                <div key={day} className="h-32 border-r border-gray-200 p-1">
                  {daySlots.map(slot => (
                    <motion.div
                      key={slot.id}
                      className={`p-1 rounded text-xs cursor-pointer transition-colors mb-1 ${
                        slot.status === 'booked' 
                          ? 'bg-blue-100 text-blue-800' 
                          : slot.status === 'available'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => onBookSlot(slot)}
                    >
                      <div className="flex items-center space-x-1">
                        {getTypeIcon(slot.type)}
                        <span>{formatTime(slot.startTime)}</span>
                      </div>
                      {slot.patientName && (
                        <div className="truncate">{slot.patientName}</div>
                      )}
                    </motion.div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(selectedDate);
    const monthName = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">{monthName}</h3>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-7 gap-0">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="bg-gray-50 p-3 text-sm font-medium text-gray-600 border-r border-gray-200 text-center">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-0">
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="h-24 border-r border-gray-200"></div>;
              }
              
              const daySlots = getSlotsForDate(day);
              const isToday = day.toDateString() === new Date().toDateString();
              const isSelected = day.toDateString() === selectedDate.toDateString();
              
              return (
                <div
                  key={day.toISOString()}
                  className={`h-24 border-r border-gray-200 p-2 cursor-pointer transition-colors ${
                    isToday ? 'bg-teal-50' : isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isToday ? 'text-teal-600' : isSelected ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {day.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {daySlots.slice(0, 3).map(slot => (
                      <div
                        key={slot.id}
                        className={`p-1 rounded text-xs ${
                          slot.status === 'booked' 
                            ? 'bg-blue-100 text-blue-800' 
                            : slot.status === 'available'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <div className="flex items-center space-x-1">
                          {getTypeIcon(slot.type)}
                          <span>{formatTime(slot.startTime)}</span>
                        </div>
                      </div>
                    ))}
                    {daySlots.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{daySlots.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderListView = () => {
    const filteredSlots = slots.filter(slot => {
      const matchesType = filterType === 'all' || slot.type === filterType;
      const matchesStatus = filterStatus === 'all' || slot.status === filterStatus;
      const matchesSearch = !searchTerm || 
        slot.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slot.reason?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesType && matchesStatus && matchesSearch;
    });

    return (
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">All Consultations</h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search consultations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="video">Video</option>
                <option value="voice">Voice</option>
                <option value="chat">Chat</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="booked">Booked</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-3">
            {filteredSlots.map((slot, index) => (
              <motion.div
                key={slot.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(slot.type)}
                      <span className="font-medium">{formatTime(slot.startTime)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {slot.patientName || 'Available Slot'}
                      </h4>
                      <p className="text-sm text-gray-600">{slot.reason || 'Open consultation slot'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getUrgencyColor(slot.urgency)}`}>
                      {slot.urgency}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(slot.status)}`}>
                      {slot.status}
                    </span>
                    {slot.aiSuggested && (
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                        AI Suggested
                      </span>
                    )}
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onEditSlot(slot)}
                        className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteSlot(slot.id)}
                        className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Consultation Scheduler</h2>
          <p className="text-gray-600">Manage your consultation schedule and availability</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAISuggestions(!showAISuggestions)}
            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            title="AI Suggestions"
          >
            <Bot className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowAddSlot(true)}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Slot</span>
          </button>
        </div>
      </div>

      {/* View Controls */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateDate('prev')}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigateDate('next')}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              {['day', 'week', 'month'].map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    viewMode === mode
                      ? 'bg-teal-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode('list')}
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              List View
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Suggestions Panel */}
      <AnimatePresence>
        {showAISuggestions && (
          <motion.div
            className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <Bot className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">AI Scheduling Suggestions</h3>
              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">94% Confidence</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="text-left p-3 bg-white border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <span className="text-sm text-purple-800">{suggestion}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        {viewMode === 'day' && renderDayView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'month' && renderMonthView()}
        {viewMode === 'list' && renderListView()}
      </div>
    </div>
  );
}
