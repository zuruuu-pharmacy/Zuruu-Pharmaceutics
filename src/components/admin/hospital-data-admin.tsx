"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  Unlock, 
  Save, 
  RefreshCw, 
  Eye, 
  EyeOff,
  Settings,
  Database,
  Shield,
  CheckCircle,
  AlertTriangle,
  Users,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface AdminData {
  totalBeds: number;
  icuBeds: number;
  generalBeds: number;
  emergencyBeds: number;
  basePatients: {
    '1d': number;
    '7d': number;
    '30d': number;
    '90d': number;
  };
  occupancyRates: {
    icu: { min: number; max: number };
    general: { min: number; max: number };
    emergency: { min: number; max: number };
  };
  waitTimes: {
    '1d': number;
    '7d': number;
    '30d': number;
    '90d': number;
  };
  weekendEffects: {
    admissions: number;
    discharges: number;
    emergency: number;
  };
  // Additional editable data
  staffData: {
    totalStaff: number;
    doctors: number;
    nurses: number;
    technicians: number;
    supportStaff: number;
  };
  equipmentData: {
    totalEquipment: number;
    mriMachines: number;
    ctScanners: number;
    xrayMachines: number;
    ventilators: number;
    defibrillators: number;
  };
  qualityMetrics: {
    patientSatisfaction: number;
    readmissionRate: number;
    infectionRate: number;
    mortalityRate: number;
  };
  financialData: {
    dailyRevenue: number;
    monthlyRevenue: number;
    operatingCosts: number;
    profitMargin: number;
  };
}

export function HospitalDataAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();

  const [adminData, setAdminData] = useState<AdminData>({
    totalBeds: 500,
    icuBeds: 50,
    generalBeds: 400,
    emergencyBeds: 50,
    basePatients: {
      '1d': 1200,
      '7d': 8500,
      '30d': 36000,
      '90d': 108000
    },
    occupancyRates: {
      icu: { min: 85, max: 100 },
      general: { min: 75, max: 95 },
      emergency: { min: 80, max: 95 }
    },
    waitTimes: {
      '1d': 25,
      '7d': 28,
      '30d': 32,
      '90d': 35
    },
    weekendEffects: {
      admissions: 0.7,
      discharges: 0.6,
      emergency: 1.1
    },
    staffData: {
      totalStaff: 450,
      doctors: 120,
      nurses: 200,
      technicians: 80,
      supportStaff: 50
    },
    equipmentData: {
      totalEquipment: 150,
      mriMachines: 3,
      ctScanners: 5,
      xrayMachines: 8,
      ventilators: 25,
      defibrillators: 15
    },
    qualityMetrics: {
      patientSatisfaction: 4.2,
      readmissionRate: 8.5,
      infectionRate: 2.1,
      mortalityRate: 1.8
    },
    financialData: {
      dailyRevenue: 125000,
      monthlyRevenue: 3750000,
      operatingCosts: 2800000,
      profitMargin: 25.3
    }
  });

  const handleAccessCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === '239773') {
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome to Hospital Data Administration",
        variant: "default",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid access code",
        variant: "destructive",
      });
    }
  };

  const handleDataChange = (field: string, value: any) => {
    setAdminData(prev => {
      const newData = { ...prev };
      const keys = field.split('.');
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      // Handle NaN values by providing fallbacks
      let processedValue = value;
      if (typeof value === 'number' && isNaN(value)) {
        processedValue = 0;
      } else if (typeof value === 'string' && value === '') {
        processedValue = 0;
      }
      
      current[keys[keys.length - 1]] = processedValue;
      return newData;
    });
  };

  // Safe getter for adminData properties with fallbacks
  const getAdminData = (path: string, defaultValue: any = 0) => {
    if (!adminData) return defaultValue;
    
    const keys = path.split('.');
    let current: any = adminData;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return defaultValue;
      }
    }
    
    return current !== undefined ? current : defaultValue;
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Save to localStorage for demo purposes
    localStorage.setItem('hospital-admin-data', JSON.stringify(adminData));
    
    setLastSaved(new Date());
    setIsSaving(false);
    
    toast({
      title: "Data Saved",
      description: "Hospital data has been updated successfully",
      variant: "default",
    });
  };

  const handleReset = () => {
    setAdminData({
      totalBeds: 500,
      icuBeds: 50,
      generalBeds: 400,
      emergencyBeds: 50,
      basePatients: {
        '1d': 1200,
        '7d': 8500,
        '30d': 36000,
        '90d': 108000
      },
      occupancyRates: {
        icu: { min: 85, max: 100 },
        general: { min: 75, max: 95 },
        emergency: { min: 80, max: 95 }
      },
      waitTimes: {
        '1d': 25,
        '7d': 28,
        '30d': 32,
        '90d': 35
      },
      weekendEffects: {
        admissions: 0.7,
        discharges: 0.6,
        emergency: 1.1
      },
      staffData: {
        totalStaff: 1200,
        doctors: 200,
        nurses: 600,
        technicians: 300,
        supportStaff: 100
      },
      equipmentData: {
        totalEquipment: 500,
        mriMachines: 2,
        ctScanners: 4,
        xrayMachines: 8,
        ventilators: 50,
        defibrillators: 12
      },
      qualityMetrics: {
        patientSatisfaction: 4.2,
        readmissionRate: 8.5,
        mortalityRate: 2.1,
        infectionRate: 3.2
      },
      financialData: {
        dailyRevenue: 150000,
        monthlyRevenue: 4500000,
        operatingCosts: 40000000,
        profitMargin: 20
      }
    });
    
    toast({
      title: "Data Reset",
      description: "All data has been reset to default values",
      variant: "default",
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAccessCode('');
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin panel",
      variant: "default",
    });
  };

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('hospital-admin-data');
    if (savedData) {
      try {
        setAdminData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">Admin Access</CardTitle>
              <p className="text-white/70">Enter access code to continue</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAccessCodeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accessCode" className="text-white">Access Code</Label>
                  <div className="relative">
                    <Input
                      id="accessCode"
                      type={showPassword ? "text" : "password"}
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder-white/50"
                      placeholder="Enter access code"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  disabled={!accessCode}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Access Admin Panel
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hospital Data Administration</h1>
              <p className="text-gray-600">Manage hospital analytics data and configurations</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {lastSaved && (
              <div className="text-sm text-gray-500">
                Last saved: {lastSaved.toLocaleTimeString()}
              </div>
            )}
            <Button onClick={handleLogout} variant="outline">
              <Lock className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4"
        >
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-800">Admin Access Active</h3>
              <p className="text-sm text-green-600">
                You have full authority to edit hospital data. Changes will affect all dashboard displays.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Data Configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hospital Capacity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-blue-600" />
                  Hospital Capacity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="totalBeds">Total Beds</Label>
                    <Input
                      id="totalBeds"
                      type="number"
                      value={adminData.totalBeds}
                      onChange={(e) => handleDataChange('totalBeds', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="icuBeds">ICU Beds</Label>
                    <Input
                      id="icuBeds"
                      type="number"
                      value={adminData.icuBeds}
                      onChange={(e) => handleDataChange('icuBeds', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="generalBeds">General Beds</Label>
                    <Input
                      id="generalBeds"
                      type="number"
                      value={adminData.generalBeds}
                      onChange={(e) => handleDataChange('generalBeds', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyBeds">Emergency Beds</Label>
                    <Input
                      id="emergencyBeds"
                      type="number"
                      value={adminData.emergencyBeds}
                      onChange={(e) => handleDataChange('emergencyBeds', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Patient Base Numbers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2 text-green-600" />
                  Patient Base Numbers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patients1d">1 Day</Label>
                    <Input
                      id="patients1d"
                      type="number"
                      value={adminData.basePatients['1d']}
                      onChange={(e) => handleDataChange('basePatients.1d', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="patients7d">7 Days</Label>
                    <Input
                      id="patients7d"
                      type="number"
                      value={adminData.basePatients['7d']}
                      onChange={(e) => handleDataChange('basePatients.7d', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="patients30d">30 Days</Label>
                    <Input
                      id="patients30d"
                      type="number"
                      value={adminData.basePatients['30d']}
                      onChange={(e) => handleDataChange('basePatients.30d', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="patients90d">90 Days</Label>
                    <Input
                      id="patients90d"
                      type="number"
                      value={adminData.basePatients['90d']}
                      onChange={(e) => handleDataChange('basePatients.90d', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Occupancy Rates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                  Occupancy Rate Ranges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label>ICU Occupancy (%)</Label>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={adminData.occupancyRates.icu.min}
                        onChange={(e) => handleDataChange('occupancyRates.icu.min', parseInt(e.target.value))}
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={adminData.occupancyRates.icu.max}
                        onChange={(e) => handleDataChange('occupancyRates.icu.max', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>General Ward Occupancy (%)</Label>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={adminData.occupancyRates.general.min}
                        onChange={(e) => handleDataChange('occupancyRates.general.min', parseInt(e.target.value))}
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={adminData.occupancyRates.general.max}
                        onChange={(e) => handleDataChange('occupancyRates.general.max', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Emergency Occupancy (%)</Label>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={adminData.occupancyRates.emergency.min}
                        onChange={(e) => handleDataChange('occupancyRates.emergency.min', parseInt(e.target.value))}
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={adminData.occupancyRates.emergency.max}
                        onChange={(e) => handleDataChange('occupancyRates.emergency.max', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Wait Times & Effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RefreshCw className="w-5 h-5 mr-2 text-purple-600" />
                  Wait Times & Weekend Effects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="wait1d">1 Day Wait (min)</Label>
                    <Input
                      id="wait1d"
                      type="number"
                      value={adminData.waitTimes['1d']}
                      onChange={(e) => handleDataChange('waitTimes.1d', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="wait7d">7 Days Wait (min)</Label>
                    <Input
                      id="wait7d"
                      type="number"
                      value={adminData.waitTimes['7d']}
                      onChange={(e) => handleDataChange('waitTimes.7d', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="wait30d">30 Days Wait (min)</Label>
                    <Input
                      id="wait30d"
                      type="number"
                      value={adminData.waitTimes['30d']}
                      onChange={(e) => handleDataChange('waitTimes.30d', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="wait90d">90 Days Wait (min)</Label>
                    <Input
                      id="wait90d"
                      type="number"
                      value={adminData.waitTimes['90d']}
                      onChange={(e) => handleDataChange('waitTimes.90d', parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Weekend Effects (Multipliers)</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="weekendAdmissions">Admissions</Label>
                      <Input
                        id="weekendAdmissions"
                        type="number"
                        step="0.1"
                        value={adminData.weekendEffects.admissions}
                        onChange={(e) => handleDataChange('weekendEffects.admissions', parseFloat(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="weekendDischarges">Discharges</Label>
                      <Input
                        id="weekendDischarges"
                        type="number"
                        step="0.1"
                        value={adminData.weekendEffects.discharges}
                        onChange={(e) => handleDataChange('weekendEffects.discharges', parseFloat(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="weekendEmergency">Emergency</Label>
                      <Input
                        id="weekendEmergency"
                        type="number"
                        step="0.1"
                        value={adminData.weekendEffects.emergency}
                        onChange={(e) => handleDataChange('weekendEffects.emergency', parseFloat(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Data Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Staff Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-600" />
                  Staff Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="totalStaff">Total Staff</Label>
                    <Input
                      id="totalStaff"
                      type="number"
                      value={getAdminData('staffData.totalStaff', 450)}
                      onChange={(e) => handleDataChange('staffData.totalStaff', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="doctors">Doctors</Label>
                    <Input
                      id="doctors"
                      type="number"
                      value={getAdminData('staffData.doctors', 120)}
                      onChange={(e) => handleDataChange('staffData.doctors', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nurses">Nurses</Label>
                    <Input
                      id="nurses"
                      type="number"
                      value={getAdminData('staffData.nurses', 200)}
                      onChange={(e) => handleDataChange('staffData.nurses', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="technicians">Technicians</Label>
                    <Input
                      id="technicians"
                      type="number"
                      value={getAdminData('staffData.technicians', 80)}
                      onChange={(e) => handleDataChange('staffData.technicians', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="supportStaff">Support Staff</Label>
                    <Input
                      id="supportStaff"
                      type="number"
                      value={getAdminData('staffData.supportStaff', 50)}
                      onChange={(e) => handleDataChange('staffData.supportStaff', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Equipment Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-indigo-600" />
                  Equipment Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="totalEquipment">Total Equipment</Label>
                    <Input
                      id="totalEquipment"
                      type="number"
                      value={getAdminData('equipmentData.totalEquipment', 150)}
                      onChange={(e) => handleDataChange('equipmentData.totalEquipment', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mriMachines">MRI Machines</Label>
                    <Input
                      id="mriMachines"
                      type="number"
                      value={getAdminData('equipmentData.mriMachines', 3)}
                      onChange={(e) => handleDataChange('equipmentData.mriMachines', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ctScanners">CT Scanners</Label>
                    <Input
                      id="ctScanners"
                      type="number"
                      value={getAdminData('equipmentData.ctScanners', 5)}
                      onChange={(e) => handleDataChange('equipmentData.ctScanners', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="xrayMachines">X-Ray Machines</Label>
                    <Input
                      id="xrayMachines"
                      type="number"
                      value={getAdminData('equipmentData.xrayMachines', 8)}
                      onChange={(e) => handleDataChange('equipmentData.xrayMachines', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ventilators">Ventilators</Label>
                    <Input
                      id="ventilators"
                      type="number"
                      value={getAdminData('equipmentData.ventilators', 25)}
                      onChange={(e) => handleDataChange('equipmentData.ventilators', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="defibrillators">Defibrillators</Label>
                    <Input
                      id="defibrillators"
                      type="number"
                      value={getAdminData('equipmentData.defibrillators', 15)}
                      onChange={(e) => handleDataChange('equipmentData.defibrillators', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quality Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Quality Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patientSatisfaction">Patient Satisfaction (1-5)</Label>
                    <Input
                      id="patientSatisfaction"
                      type="number"
                      step="0.1"
                      value={getAdminData('qualityMetrics.patientSatisfaction', 4.2)}
                      onChange={(e) => handleDataChange('qualityMetrics.patientSatisfaction', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="readmissionRate">Readmission Rate (%)</Label>
                    <Input
                      id="readmissionRate"
                      type="number"
                      step="0.1"
                      value={getAdminData('qualityMetrics.readmissionRate', 8.5)}
                      onChange={(e) => handleDataChange('qualityMetrics.readmissionRate', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="infectionRate">Infection Rate (%)</Label>
                    <Input
                      id="infectionRate"
                      type="number"
                      step="0.1"
                      value={getAdminData('qualityMetrics.infectionRate', 2.1)}
                      onChange={(e) => handleDataChange('qualityMetrics.infectionRate', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mortalityRate">Mortality Rate (%)</Label>
                    <Input
                      id="mortalityRate"
                      type="number"
                      step="0.1"
                      value={getAdminData('qualityMetrics.mortalityRate', 1.8)}
                      onChange={(e) => handleDataChange('qualityMetrics.mortalityRate', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Financial Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-yellow-600" />
                  Financial Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dailyRevenue">Daily Revenue ($)</Label>
                    <Input
                      id="dailyRevenue"
                      type="number"
                      value={getAdminData('financialData.dailyRevenue', 125000)}
                      onChange={(e) => handleDataChange('financialData.dailyRevenue', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="monthlyRevenue">Monthly Revenue ($)</Label>
                    <Input
                      id="monthlyRevenue"
                      type="number"
                      value={getAdminData('financialData.monthlyRevenue', 3750000)}
                      onChange={(e) => handleDataChange('financialData.monthlyRevenue', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="operatingCosts">Operating Costs ($)</Label>
                    <Input
                      id="operatingCosts"
                      type="number"
                      value={getAdminData('financialData.operatingCosts', 2800000)}
                      onChange={(e) => handleDataChange('financialData.operatingCosts', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="profitMargin">Profit Margin (%)</Label>
                    <Input
                      id="profitMargin"
                      type="number"
                      step="0.1"
                      value={getAdminData('financialData.profitMargin', 25.3)}
                      onChange={(e) => handleDataChange('financialData.profitMargin', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Data Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2 text-blue-600" />
                Data Preview
              </CardTitle>
              <p className="text-sm text-gray-600">
                This is how your data will appear in the hospital dashboard
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800">Hospital Capacity</h4>
                      <p className="text-2xl font-bold text-blue-600">{getAdminData('totalBeds', 500)}</p>
                      <p className="text-sm text-blue-600">Total Beds</p>
                      <div className="mt-2 text-xs text-gray-600">
                        ICU: {getAdminData('icuBeds', 50)} | General: {getAdminData('generalBeds', 400)} | Emergency: {getAdminData('emergencyBeds', 50)}
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800">Staff</h4>
                      <p className="text-2xl font-bold text-green-600">{getAdminData('staffData.totalStaff', 450)}</p>
                      <p className="text-sm text-green-600">Total Staff</p>
                      <div className="mt-2 text-xs text-gray-600">
                        Doctors: {getAdminData('staffData.doctors', 120)} | Nurses: {getAdminData('staffData.nurses', 200)}
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800">Equipment</h4>
                      <p className="text-2xl font-bold text-purple-600">{getAdminData('equipmentData.totalEquipment', 150)}</p>
                      <p className="text-sm text-purple-600">Total Equipment</p>
                      <div className="mt-2 text-xs text-gray-600">
                        MRI: {getAdminData('equipmentData.mriMachines', 3)} | CT: {getAdminData('equipmentData.ctScanners', 5)}
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-800">Quality</h4>
                      <p className="text-2xl font-bold text-yellow-600">{getAdminData('qualityMetrics.patientSatisfaction', 4.2)}/5</p>
                      <p className="text-sm text-yellow-600">Patient Satisfaction</p>
                      <div className="mt-2 text-xs text-gray-600">
                        Readmission: {getAdminData('qualityMetrics.readmissionRate', 8.5)}% | Infection: {getAdminData('qualityMetrics.infectionRate', 2.1)}%
                      </div>
                    </div>
              </div>
              
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Financial Overview</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Daily Revenue:</span>
                          <span className="font-semibold">${(getAdminData('financialData.dailyRevenue', 125000) || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Monthly Revenue:</span>
                          <span className="font-semibold">${(getAdminData('financialData.monthlyRevenue', 3750000) || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Profit Margin:</span>
                          <span className="font-semibold">{getAdminData('financialData.profitMargin', 25.3)}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800">Patient Data (1 Day)</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Base Patients:</span>
                          <span className="font-semibold">{(getAdminData('basePatients.1d', 1200) || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Wait Time:</span>
                          <span className="font-semibold">{getAdminData('waitTimes.1d', 25)} min</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">ICU Occupancy:</span>
                          <span className="font-semibold">{getAdminData('occupancyRates.icu.min', 85)}-{getAdminData('occupancyRates.icu.max', 100)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center space-x-4"
        >
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="px-8 py-3"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
        </motion.div>

        {/* Data Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-5 h-5 mr-2 text-indigo-600" />
                Data Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
                {JSON.stringify(adminData, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
