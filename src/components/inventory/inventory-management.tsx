"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  BarChart3, 
  Clock, 
  Bot, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Edit, 
  Trash2, 
  Share, 
  FileText, 
  Zap, 
  Target, 
  TrendingUp, 
  Activity, 
  DollarSign, 
  Users, 
  Truck, 
  Database, 
  Cloud, 
  Wifi, 
  WifiOff,
  ArrowUp,
  ArrowDown,
  Minus,
  RotateCcw,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Star,
  Award,
  Shield,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  Home,
  ShoppingCart,
  CreditCard,
  Receipt,
  Archive,
  AlertCircle,
  Info,
  HelpCircle
} from 'lucide-react';

import InventoryDashboard from './inventory-dashboard';
import AIDemandForecast from './ai-demand-forecast';
import ExpiryManagement from './expiry-management';
import StockAnalytics from './stock-analytics';

import { StockItem, DemandForecast, InventoryAnalytics } from '@/types/inventory';

interface InventoryManagementProps {
  onNavigateToDashboard: () => void;
}

export default function InventoryManagement({ onNavigateToDashboard }: InventoryManagementProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'forecast' | 'expiry' | 'analytics'>('dashboard');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: '1', type: 'alert', message: '5 items expiring in 30 days', time: '2 min ago', unread: true },
    { id: '2', type: 'info', message: 'Stock level low for Amoxicillin', time: '15 min ago', unread: true },
    { id: '3', type: 'success', message: 'Purchase order #PO-001 confirmed', time: '1 hour ago', unread: false }
  ]);

  const [quickStats] = useState({
    totalItems: 1247,
    totalValue: 1250000,
    lowStock: 15,
    expiringSoon: 23,
    alerts: 8,
    aiInsights: 5
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const handleAddStock = () => {
    console.log('Add stock clicked');
    // Implement add stock functionality
  };

  const handleEditStock = (item: StockItem) => {
    console.log('Edit stock clicked:', item);
    // Implement edit stock functionality
  };

  const handleViewDetails = (item: StockItem) => {
    console.log('View details clicked:', item);
    // Implement view details functionality
  };

  const handleGenerateReport = () => {
    console.log('Generate report clicked');
    // Implement report generation
  };

  const handleViewForecast = (forecast: DemandForecast) => {
    console.log('View forecast clicked:', forecast);
    // Implement view forecast functionality
  };

  const handleExportForecast = (forecast: DemandForecast) => {
    console.log('Export forecast clicked:', forecast);
    // Implement export forecast functionality
  };

  const handleNotifySupplier = (item: StockItem) => {
    console.log('Notify supplier clicked:', item);
    // Implement supplier notification
  };

  const handleExportReport = (type: string) => {
    console.log('Export report clicked:', type);
    // Implement export report functionality
  };

  const handleGenerateInsights = () => {
    console.log('Generate insights clicked');
    // Implement AI insights generation
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'info': return <Info className="w-4 h-4 text-blue-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'alert': return 'bg-red-50 border-red-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      case 'success': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <InventoryDashboard
            onAddStock={handleAddStock}
            onEditStock={handleEditStock}
            onViewDetails={handleViewDetails}
            onGenerateReport={handleGenerateReport}
          />
        );
      case 'forecast':
        return (
          <AIDemandForecast
            onGenerateForecast={() => {}}
            onViewDetails={handleViewForecast}
            onExportForecast={handleExportForecast}
          />
        );
      case 'expiry':
        return (
          <ExpiryManagement
            onViewItem={handleViewDetails}
            onEditItem={handleEditStock}
            onGenerateReport={handleGenerateReport}
            onNotifySupplier={handleNotifySupplier}
          />
        );
      case 'analytics':
        return (
          <StockAnalytics
            onExportReport={handleExportReport}
            onViewDetails={handleViewDetails}
            onGenerateInsights={handleGenerateInsights}
          />
        );
      default:
        return (
          <InventoryDashboard
            onAddStock={handleAddStock}
            onEditStock={handleEditStock}
            onViewDetails={handleViewDetails}
            onGenerateReport={handleGenerateReport}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onNavigateToDashboard}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
                <p className="text-sm text-gray-600">Real-time stock tracking and AI-powered insights</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Quick Stats */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{quickStats.totalItems.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Total Items</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">PKR {quickStats.totalValue.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Total Value</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-red-600">{quickStats.lowStock}</div>
                  <div className="text-xs text-gray-500">Low Stock</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-orange-600">{quickStats.expiringSoon}</div>
                  <div className="text-xs text-gray-500">Expiring Soon</div>
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
                  <Bell className="w-5 h-5" />
                  {notifications.filter(n => n.unread).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.filter(n => n.unread).length}
                    </span>
                  )}
                </button>
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3, description: 'Overview and quick actions' },
              { id: 'forecast', label: 'AI Forecast', icon: Bot, description: 'Demand prediction and insights' },
              { id: 'expiry', label: 'Expiry Management', icon: Clock, description: 'Track and manage expiring items' },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp, description: 'Performance metrics and reports' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors group ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">{tab.label}</div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-600">
                    {tab.description}
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {renderContent()}
      </div>

      {/* Mobile Notifications Panel */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl"
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${getNotificationColor(notification.type)} ${
                      notification.unread ? 'ring-2 ring-teal-200' : ''
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="flex items-start space-x-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleAddStock}
            className="w-14 h-14 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-colors flex items-center justify-center group"
          >
            <Plus className="w-6 h-6" />
          </button>
          
          <div className="bg-white rounded-full shadow-lg p-2">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
