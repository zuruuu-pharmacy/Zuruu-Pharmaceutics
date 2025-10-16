"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  User, 
  Settings, 
  LogOut,
  Menu,
  X,
  Mic,
  MicOff,
  ChevronDown,
  Home,
  Package,
  FileText,
  RefreshCw,
  Users,
  Truck,
  TrendingUp,
  BarChart3,
  AlertTriangle,
  Shield,
  Building2,
  HelpCircle,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface GlobalNavigationProps {
  children: React.ReactNode;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: Home, shortcut: 'Alt+1' },
  { id: 'inventory', label: 'Products / Inventory', icon: Package, shortcut: 'Alt+2' },
  { id: 'prescriptions', label: 'Prescriptions', icon: FileText, shortcut: 'Alt+3' },
  { id: 'refills', label: 'Refill Queue', icon: RefreshCw, shortcut: 'Alt+4' },
  { id: 'patients', label: 'Patients', icon: Users, shortcut: 'Alt+5' },
  { id: 'suppliers', label: 'Suppliers', icon: Truck, shortcut: 'Alt+6' },
  { id: 'sales', label: 'Sales / Revenue', icon: TrendingUp, shortcut: 'Alt+7' },
  { id: 'analytics', label: 'Analytics / Reports', icon: BarChart3, shortcut: 'Alt+8' },
  { id: 'adr', label: 'ADR (Adverse Reaction)', icon: AlertTriangle, shortcut: 'Alt+9' },
  { id: 'controlled', label: 'Controlled Substances', icon: Shield, shortcut: 'Alt+0' },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const mockNotifications = [
  { id: 1, type: 'critical', title: '5 prescriptions awaiting verification', time: '2m ago', unread: true },
  { id: 2, type: 'high', title: '3 batches expiring in 7 days', time: '15m ago', unread: true },
  { id: 3, type: 'info', title: 'New supplier catalog available', time: '1h ago', unread: false },
  { id: 4, type: 'high', title: 'Low stock alert: Amoxicillin', time: '2h ago', unread: false }
];

const mockSearchSuggestions = [
  { type: 'patient', name: 'John Doe', id: 'P-000123', subtitle: 'ID: P-000123' },
  { type: 'drug', name: 'Metformin 500mg', id: 'SKU-001', subtitle: 'Antidiabetic' },
  { type: 'prescription', name: 'RX-0456', id: 'RX-0456', subtitle: 'John Doe • Metformin' },
  { type: 'supplier', name: 'MedSupply Co.', id: 'SUP-001', subtitle: 'Pharmaceutical Supplier' }
];

export function GlobalNavigation({ children, activeSection = 'overview', onSectionChange }: GlobalNavigationProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key >= '1' && e.key <= '9') {
        const index = parseInt(e.key) - 1;
        if (index < navigationItems.length) {
          onSectionChange?.(navigationItems[index].id);
        }
      }
      if (e.altKey && e.key === '0') {
        onSectionChange?.(navigationItems[9].id); // Controlled Substances
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSectionChange]);

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Simulate voice input
    setTimeout(() => setIsListening(false), 3000);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'critical': return '🔴';
      case 'high': return '🟠';
      case 'info': return '🔵';
      default: return '⚪';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'high': return 'warning';
      case 'info': return 'info';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--c-surface)]">
      {/* Top Navigation Bar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-[var(--c-surface)] border-b border-[var(--c-neutral-200)] shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between h-16 px-4">
          {/* Left: Logo and Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-[var(--c-neutral-100)] rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5 text-[var(--c-neutral-700)]" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[var(--c-primary)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="text-xl font-bold text-[var(--c-neutral-900)]">Zuruu Pharmaceutics</span>
            </div>
          </div>

          {/* Middle: Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--c-neutral-500)]" />
              <Input
                type="text"
                placeholder="Search patient, drug, prescription, supplier, order..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => setShowSearchSuggestions(searchQuery.length > 0)}
                onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                className="pl-10 pr-12"
              />
              <button
                onClick={toggleVoiceInput}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-[var(--c-neutral-100)] rounded transition-colors"
                aria-label="Voice search"
              >
                {isListening ? (
                  <MicOff className="w-4 h-4 text-[var(--c-error-500)]" />
                ) : (
                  <Mic className="w-4 h-4 text-[var(--c-neutral-500)]" />
                )}
              </button>
            </div>

            {/* Search Suggestions Dropdown */}
            <AnimatePresence>
              {showSearchSuggestions && (
                <motion.div
                  className="absolute top-full left-0 right-0 mt-1 bg-[var(--c-surface)] border border-[var(--c-neutral-200)] rounded-lg shadow-lg z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {mockSearchSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-3 hover:bg-[var(--c-neutral-50)] cursor-pointer border-b border-[var(--c-neutral-100)] last:border-b-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[var(--c-primary-100)] rounded-full flex items-center justify-center">
                          <span className="text-[var(--c-primary-600)] text-xs font-semibold">
                            {suggestion.type.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-[var(--c-neutral-900)]">{suggestion.name}</p>
                          <p className="text-sm text-[var(--c-neutral-600)]">{suggestion.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-[var(--c-neutral-100)] rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-[var(--c-neutral-700)]" />
              ) : (
                <Sun className="w-5 h-5 text-[var(--c-neutral-700)]" />
              )}
            </button>

            {/* Branch Selector */}
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 hover:bg-[var(--c-neutral-100)] rounded-lg transition-colors">
                <Building2 className="w-4 h-4 text-[var(--c-neutral-700)]" />
                <span className="text-sm text-[var(--c-neutral-700)]">Main Branch</span>
                <ChevronDown className="w-4 h-4 text-[var(--c-neutral-500)]" />
              </button>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-[var(--c-neutral-100)] rounded-lg transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-[var(--c-neutral-700)]" />
                {mockNotifications.filter(n => n.unread).length > 0 && (
                  <Badge
                    variant="destructive"
                    size="sm"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {mockNotifications.filter(n => n.unread).length}
                  </Badge>
                )}
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    className="absolute right-0 top-full mt-2 w-80 bg-[var(--c-surface)] border border-[var(--c-neutral-200)] rounded-lg shadow-lg z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-4 border-b border-[var(--c-neutral-200)]">
                      <h3 className="font-semibold text-[var(--c-neutral-900)]">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {mockNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-[var(--c-neutral-100)] hover:bg-[var(--c-neutral-50)] ${
                            notification.unread ? 'bg-[var(--c-primary-50)]' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-[var(--c-neutral-900)]">
                                {notification.title}
                              </p>
                              <p className="text-xs text-[var(--c-neutral-600)] mt-1">
                                {notification.time}
                              </p>
                            </div>
                            <Badge variant={getNotificationColor(notification.type) as any} size="sm">
                              {notification.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Messages */}
            <button className="p-2 hover:bg-[var(--c-neutral-100)] rounded-lg transition-colors">
              <MessageSquare className="w-5 h-5 text-[var(--c-neutral-700)]" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 hover:bg-[var(--c-neutral-100)] rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-[var(--c-primary)] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-4 h-4 text-[var(--c-neutral-500)]" />
              </button>

              {/* User Dropdown */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    className="absolute right-0 top-full mt-2 w-48 bg-[var(--c-surface)] border border-[var(--c-neutral-200)] rounded-lg shadow-lg z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-2">
                      <div className="px-3 py-2 border-b border-[var(--c-neutral-200)]">
                        <p className="text-sm font-medium text-[var(--c-neutral-900)]">Dr. Sarah Smith</p>
                        <p className="text-xs text-[var(--c-neutral-600)]">Pharmacist</p>
                      </div>
                      <button className="w-full text-left px-3 py-2 text-sm text-[var(--c-neutral-700)] hover:bg-[var(--c-neutral-100)] rounded">
                        Profile
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-[var(--c-neutral-700)] hover:bg-[var(--c-neutral-100)] rounded">
                        Settings
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-[var(--c-neutral-700)] hover:bg-[var(--c-neutral-100)] rounded">
                        Help Center
                      </button>
                      <hr className="my-2" />
                      <button className="w-full text-left px-3 py-2 text-sm text-[var(--c-error-600)] hover:bg-[var(--c-error-50)] rounded flex items-center space-x-2">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex pt-16">
        {/* Left Sidebar */}
        <motion.aside
          className={`fixed left-0 top-16 bottom-0 z-40 bg-[var(--c-surface)] border-r border-[var(--c-neutral-200)] transition-all duration-300 ${
            sidebarCollapsed ? 'w-[var(--sidebar-collapsed-width)]' : 'w-[var(--sidebar-expanded-width)]'
          }`}
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4">
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => onSectionChange?.(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-[var(--c-primary-50)] text-[var(--c-primary-700)] border border-[var(--c-primary-200)]'
                      : 'text-[var(--c-neutral-700)] hover:bg-[var(--c-neutral-100)] hover:text-[var(--c-neutral-900)]'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  title={sidebarCollapsed ? `${item.label} (${item.shortcut})` : item.shortcut}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="font-medium">{item.label}</span>
                      {item.shortcut && (
                        <span className="ml-auto text-xs text-[var(--c-neutral-500)]">
                          {item.shortcut}
                        </span>
                      )}
                    </>
                  )}
                </motion.button>
              ))}
            </nav>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? 'ml-[var(--sidebar-collapsed-width)]' : 'ml-[var(--sidebar-expanded-width)]'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
