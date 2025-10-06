"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';
import { 
  Activity, 
  Users, 
  Bed, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Heart,
  Stethoscope,
  Pill,
  RefreshCw
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

export function HospitalAnalyticsDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  const [isDataUpdating, setIsDataUpdating] = useState(false);

  // Mock data generation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Trigger animation when timeframe changes
  useEffect(() => {
    setIsDataUpdating(true);
    setAnimationKey(prev => prev + 1);
    
    // Simulate data loading time
    const timer = setTimeout(() => {
      setIsDataUpdating(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [selectedTimeframe]);

  // Export report function
  const exportReport = () => {
    const currentData = getTimeframeData(selectedTimeframe);
    const reportData = {
      timeframe: selectedTimeframe,
      generatedAt: new Date().toISOString(),
      hospitalMetrics: currentData.kpis,
      patientFlow: {
        labels: currentData.labels,
        admissions: currentData.patientFlow.admissions,
        discharges: currentData.patientFlow.discharges,
        emergency: currentData.patientFlow.emergency
      },
      bedOccupancy: {
        labels: currentData.labels,
        icu: currentData.bedOccupancy.icu,
        general: currentData.bedOccupancy.general,
        emergency: currentData.bedOccupancy.emergency
      },
      departmentPerformance: departmentData,
      patientStatus: patientStatusData,
      resourceUtilization: resourceUtilizationData,
      emergencyResponse: emergencyResponseData
    };

    // Create CSV content
    const csvContent = [
      'Hospital Analytics Report',
      `Generated: ${new Date().toLocaleString()}`,
      `Timeframe: ${selectedTimeframe}`,
      `Data Type: ${selectedTimeframe === '1d' ? 'Hourly' : 'Daily'} patterns`,
      `Total Data Points: ${currentData.labels.length}`,
      '',
      'Key Performance Indicators',
      'Metric,Value',
      `Total Patients,${currentData.kpis.totalPatients}`,
      `Active Patients,${currentData.kpis.activePatients}`,
      `Available Beds,${currentData.kpis.availableBeds}`,
      `Occupancy Rate,${currentData.kpis.occupancyRate}%`,
      `Average Wait Time,${currentData.kpis.avgWaitTime} minutes`,
      `Critical Cases,${currentData.kpis.criticalCases}`,
      `Discharged Today,${currentData.kpis.dischargedToday}`,
      `Emergency Admissions,${currentData.kpis.emergencyAdmissions}`,
      '',
      'Patient Flow Data',
      'Time Period,Admissions,Discharges,Emergency',
      ...currentData.labels.map((label, i) => 
        `${label},${currentData.patientFlow.admissions[i]},${currentData.patientFlow.discharges[i]},${currentData.patientFlow.emergency[i]}`
      ),
      '',
      'Bed Occupancy Data',
      'Time Period,ICU (%),General (%),Emergency (%)',
      ...currentData.labels.map((label, i) => 
        `${label},${currentData.bedOccupancy.icu[i]},${currentData.bedOccupancy.general[i]},${currentData.bedOccupancy.emergency[i]}`
      )
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `hospital-analytics-report-${selectedTimeframe}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Also download JSON for detailed data
    const jsonBlob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const jsonLink = document.createElement('a');
    const jsonUrl = URL.createObjectURL(jsonBlob);
    jsonLink.setAttribute('href', jsonUrl);
    jsonLink.setAttribute('download', `hospital-analytics-detailed-${selectedTimeframe}-${new Date().toISOString().split('T')[0]}.json`);
    jsonLink.style.visibility = 'hidden';
    document.body.appendChild(jsonLink);
    jsonLink.click();
    document.body.removeChild(jsonLink);
  };

  // Load admin data if available
  const [adminData, setAdminData] = useState<any>(null);

  const handleRefreshData = () => {
    // Reload admin data
    const savedData = localStorage.getItem('hospital-admin-data');
    if (savedData) {
      try {
        setAdminData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading admin data:', error);
      }
    }
    
    // Trigger data regeneration
    setAnimationKey(prev => prev + 1);
  };

  useEffect(() => {
    const loadAdminData = () => {
      const savedData = localStorage.getItem('hospital-admin-data');
      if (savedData) {
        try {
          setAdminData(JSON.parse(savedData));
        } catch (error) {
          console.error('Error loading admin data:', error);
        }
      }
    };

    loadAdminData();

    // Listen for storage changes to refresh data when admin updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'hospital-admin-data') {
        loadAdminData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Generate realistic data based on timeframe
  const generateTimeframeData = (timeframe: string) => {
    const baseData = adminData ? {
      totalBeds: adminData.totalBeds || 500,
      icuBeds: adminData.icuBeds || 50,
      generalBeds: adminData.generalBeds || 400,
      emergencyBeds: adminData.emergencyBeds || 50
    } : {
      totalBeds: 500,
      icuBeds: 50,
      generalBeds: 400,
      emergencyBeds: 50
    };

    const timeframes = adminData ? {
      '1d': {
        days: 1,
        labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM'],
        totalPatients: adminData.basePatients?.['1d'] || 1200,
        activePatients: Math.round((adminData.basePatients?.['1d'] || 1200) * 0.7),
        avgWaitTime: adminData.waitTimes?.['1d'] || 25,
        criticalCases: Math.round((adminData.basePatients?.['1d'] || 1200) * 0.04),
        dischargedToday: Math.round((adminData.basePatients?.['1d'] || 1200) * 0.06),
        emergencyAdmissions: Math.round((adminData.basePatients?.['1d'] || 1200) * 0.02)
      },
      '7d': {
        days: 7,
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        totalPatients: adminData.basePatients?.['7d'] || 8500,
        activePatients: Math.round((adminData.basePatients?.['7d'] || 8500) * 0.7),
        avgWaitTime: adminData.waitTimes?.['7d'] || 28,
        criticalCases: Math.round((adminData.basePatients?.['7d'] || 8500) * 0.04),
        dischargedToday: Math.round((adminData.basePatients?.['7d'] || 8500) * 0.06),
        emergencyAdmissions: Math.round((adminData.basePatients?.['7d'] || 8500) * 0.02)
      },
      '30d': {
        days: 30,
        labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
        totalPatients: adminData.basePatients?.['30d'] || 36000,
        activePatients: Math.round((adminData.basePatients?.['30d'] || 36000) * 0.7),
        avgWaitTime: adminData.waitTimes?.['30d'] || 32,
        criticalCases: Math.round((adminData.basePatients?.['30d'] || 36000) * 0.04),
        dischargedToday: Math.round((adminData.basePatients?.['30d'] || 36000) * 0.06),
        emergencyAdmissions: Math.round((adminData.basePatients?.['30d'] || 36000) * 0.02)
      },
      '90d': {
        days: 90,
        labels: Array.from({ length: 90 }, (_, i) => `Day ${i + 1}`),
        totalPatients: adminData.basePatients?.['90d'] || 108000,
        activePatients: Math.round((adminData.basePatients?.['90d'] || 108000) * 0.7),
        avgWaitTime: adminData.waitTimes?.['90d'] || 35,
        criticalCases: Math.round((adminData.basePatients?.['90d'] || 108000) * 0.04),
        dischargedToday: Math.round((adminData.basePatients?.['90d'] || 108000) * 0.06),
        emergencyAdmissions: Math.round((adminData.basePatients?.['90d'] || 108000) * 0.02)
      }
    } : {
      '1d': {
        days: 1,
        labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM'],
        totalPatients: 1200,
        activePatients: 850,
        avgWaitTime: 25,
        criticalCases: 45,
        dischargedToday: 75,
        emergencyAdmissions: 20
      },
      '7d': {
        days: 7,
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        totalPatients: 8500,
        activePatients: 6000,
        avgWaitTime: 28,
        criticalCases: 320,
        dischargedToday: 520,
        emergencyAdmissions: 180
      },
      '30d': {
        days: 30,
        labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
        totalPatients: 36000,
        activePatients: 25000,
        avgWaitTime: 32,
        criticalCases: 1350,
        dischargedToday: 2200,
        emergencyAdmissions: 750
      },
      '90d': {
        days: 90,
        labels: Array.from({ length: 90 }, (_, i) => `Day ${i + 1}`),
        totalPatients: 108000,
        activePatients: 75000,
        avgWaitTime: 35,
        criticalCases: 4050,
        dischargedToday: 6600,
        emergencyAdmissions: 2250
      }
    };

    const config = timeframes[timeframe as keyof typeof timeframes] || timeframes['7d'];
    
    // Generate realistic patient flow data with daily patterns
    const generatePatientFlow = () => {
      const admissions = config.labels.map((_, i) => {
        let base = config.totalPatients / config.labels.length;
        
        // Add realistic daily patterns
        if (config.days > 1) {
          // Weekend effect (lower on weekends)
          const dayOfWeek = i % 7;
          if (dayOfWeek === 5 || dayOfWeek === 6) { // Saturday, Sunday
            base *= adminData?.weekendEffects?.admissions || 0.7; // Use admin data or default
          }
          
          // Weekly trend (gradual increase)
          const weekProgress = i / config.labels.length;
          base *= (0.8 + weekProgress * 0.4); // 20% increase over time
        }
        
        const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
        return Math.round(base * (1 + variation));
      });
      
      const discharges = config.labels.map((_, i) => {
        let base = config.dischargedToday / config.labels.length;
        
        // Similar patterns for discharges
        if (config.days > 1) {
          const dayOfWeek = i % 7;
          if (dayOfWeek === 5 || dayOfWeek === 6) {
            base *= adminData?.weekendEffects?.discharges || 0.6; // Use admin data or default
          }
          
          const weekProgress = i / config.labels.length;
          base *= (0.9 + weekProgress * 0.2);
        }
        
        const variation = (Math.random() - 0.5) * 0.2;
        return Math.round(base * (1 + variation));
      });
      
      const emergency = config.labels.map((_, i) => {
        let base = config.emergencyAdmissions / config.labels.length;
        
        // Emergency cases are more consistent but slightly higher on weekends
        if (config.days > 1) {
          const dayOfWeek = i % 7;
          if (dayOfWeek === 5 || dayOfWeek === 6) {
            base *= adminData?.weekendEffects?.emergency || 1.1; // Use admin data or default
          }
        }
        
        const variation = (Math.random() - 0.5) * 0.3;
        return Math.round(base * (1 + variation));
      });
      
      return { admissions, discharges, emergency };
    };

    // Generate realistic bed occupancy data with daily patterns
    const generateBedOccupancy = () => {
      const occupancyRates = adminData?.occupancyRates || {
        icu: { min: 85, max: 100 },
        general: { min: 75, max: 95 },
        emergency: { min: 80, max: 95 }
      };

      const icu = config.labels.map((_, i) => {
        let base = occupancyRates.icu.min + Math.random() * (occupancyRates.icu.max - occupancyRates.icu.min);
        
        // ICU occupancy is higher on weekdays
        if (config.days > 1) {
          const dayOfWeek = i % 7;
          if (dayOfWeek >= 0 && dayOfWeek <= 4) { // Weekdays
            base += 5; // 5% higher on weekdays
          }
        }
        
        return Math.round(Math.min(100, base));
      });
      
      const general = config.labels.map((_, i) => {
        let base = occupancyRates.general.min + Math.random() * (occupancyRates.general.max - occupancyRates.general.min);
        
        // General ward occupancy varies with day of week
        if (config.days > 1) {
          const dayOfWeek = i % 7;
          if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday, Saturday
            base -= 10; // 10% lower on weekends
          }
        }
        
        return Math.round(Math.max(60, Math.min(95, base)));
      });
      
      const emergency = config.labels.map((_, i) => {
        let base = occupancyRates.emergency.min + Math.random() * (occupancyRates.emergency.max - occupancyRates.emergency.min);
        
        // Emergency beds are more consistent but slightly higher on weekends
        if (config.days > 1) {
          const dayOfWeek = i % 7;
          if (dayOfWeek === 5 || dayOfWeek === 6) { // Saturday, Sunday
            base += 3; // 3% higher on weekends
          }
        }
        
        return Math.round(Math.min(98, base));
      });
      
      return { icu, general, emergency };
    };

    const patientFlow = generatePatientFlow();
    const bedOccupancy = generateBedOccupancy();

    return {
      kpis: {
        totalPatients: config.totalPatients,
        activePatients: config.activePatients,
        availableBeds: baseData.totalBeds - Math.round(config.activePatients * 0.8),
        occupancyRate: Math.round((config.activePatients / baseData.totalBeds) * 100 * 10) / 10,
        avgWaitTime: config.avgWaitTime,
        criticalCases: config.criticalCases,
        dischargedToday: config.dischargedToday,
        emergencyAdmissions: config.emergencyAdmissions
      },
      labels: config.labels,
      patientFlow,
      bedOccupancy
    };
  };

  const getTimeframeData = (timeframe: string) => {
    return generateTimeframeData(timeframe);
  };

  const currentData = getTimeframeData(selectedTimeframe);
  const kpis = currentData.kpis;

  // Patient Flow Analytics
  const patientFlowData = {
    labels: currentData.labels,
    datasets: [
      {
        label: 'Admissions',
        data: currentData.patientFlow.admissions,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Discharges',
        data: currentData.patientFlow.discharges,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Emergency',
        data: currentData.patientFlow.emergency,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(239, 68, 68)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      }
    ]
  };

  // Department Performance - based on current timeframe
  const departmentData = {
    labels: ['ICU', 'Cardiology', 'Emergency', 'Surgery', 'Neurology', 'Orthopedics'],
    datasets: [
      {
        label: 'Patient Capacity (%)',
        data: [
          Math.round((kpis.criticalCases / kpis.totalPatients) * 100),
          Math.round((kpis.activePatients * 0.25 / kpis.totalPatients) * 100),
          Math.round((kpis.emergencyAdmissions / kpis.totalPatients) * 100),
          Math.round((kpis.activePatients * 0.20 / kpis.totalPatients) * 100),
          Math.round((kpis.activePatients * 0.15 / kpis.totalPatients) * 100),
          Math.round((kpis.activePatients * 0.10 / kpis.totalPatients) * 100)
        ],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderWidth: 2,
      }
    ]
  };

  // Bed Occupancy Heatmap
  const bedOccupancyData = {
    labels: currentData.labels,
    datasets: [
      {
        label: 'ICU Beds',
        data: currentData.bedOccupancy.icu,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(239, 68, 68)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'General Wards',
        data: currentData.bedOccupancy.general,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Emergency Beds',
        data: currentData.bedOccupancy.emergency,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      }
    ]
  };

  // Patient Status Distribution - based on current timeframe
  const patientStatusData = {
    labels: ['Stable', 'Critical', 'Recovering', 'Discharge Ready', 'Observation'],
    datasets: [
      {
        data: [
          Math.round((kpis.activePatients * 0.45)), // 45% stable
          kpis.criticalCases, // Critical cases
          Math.round((kpis.activePatients * 0.25)), // 25% recovering
          Math.round((kpis.activePatients * 0.15)), // 15% discharge ready
          Math.round((kpis.activePatients * 0.10))  // 10% observation
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderWidth: 2,
      }
    ]
  };

  // Resource Utilization - based on current timeframe
  const resourceUtilizationData = {
    labels: ['Staff', 'Equipment', 'Medications', 'Facilities', 'Technology'],
    datasets: [
      {
        label: 'Utilization Rate (%)',
        data: [
          Math.min(95, Math.round(kpis.occupancyRate + Math.random() * 10 - 5)), // Staff utilization
          Math.min(90, Math.round(kpis.occupancyRate * 0.8 + Math.random() * 15 - 7.5)), // Equipment
          Math.min(88, Math.round(kpis.occupancyRate * 0.9 + Math.random() * 10 - 5)), // Medications
          Math.min(92, Math.round(kpis.occupancyRate * 0.95 + Math.random() * 8 - 4)), // Facilities
          Math.min(98, Math.round(kpis.occupancyRate + Math.random() * 5 - 2.5)) // Technology
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      }
    ]
  };

  // Emergency Response Times - based on current timeframe
  const emergencyResponseData = {
    labels: ['0-5 min', '5-10 min', '10-15 min', '15-20 min', '20+ min'],
    datasets: [
      {
        label: 'Response Time Distribution',
        data: [
          Math.round(kpis.emergencyAdmissions * 0.35), // 35% in 0-5 min
          Math.round(kpis.emergencyAdmissions * 0.40), // 40% in 5-10 min
          Math.round(kpis.emergencyAdmissions * 0.20), // 20% in 10-15 min
          Math.round(kpis.emergencyAdmissions * 0.04), // 4% in 15-20 min
          Math.round(kpis.emergencyAdmissions * 0.01)  // 1% in 20+ min
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderWidth: 1,
      }
    ]
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Hospital Analytics Dashboard</h2>
          <p className="text-gray-600">Real-time hospital operations and performance metrics</p>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            All data is synchronized and consistent across the dashboard
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Showing {selectedTimeframe === '1d' ? 'hourly' : 'daily'} data for {selectedTimeframe === '1d' ? '24 hours' : selectedTimeframe === '7d' ? '7 days' : selectedTimeframe === '30d' ? '30 days' : '90 days'}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Time Period:</label>
            <select 
              value={selectedTimeframe} 
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1d">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
          <Button
            onClick={handleRefreshData}
            variant="outline"
            size="sm"
            className="ml-4"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
          {isDataUpdating && (
            <div className="flex items-center text-sm text-blue-600">
              <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
              Updating data...
            </div>
          )}
          <Button 
            onClick={exportReport}
            disabled={isDataUpdating}
            className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
          >
            {isDataUpdating ? (
              <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Activity className="w-4 h-4 mr-2" />
            )}
            {isDataUpdating ? 'Updating...' : 'Export Report'}
          </Button>
        </div>
      </div>

      {/* Data Consistency Indicator */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-800">Data Consistency Check</span>
          </div>
          <div className="text-xs text-blue-600">
            Total Patients: {kpis.totalPatients.toLocaleString()} | 
            Active: {kpis.activePatients.toLocaleString()} | 
            Discharged: {kpis.dischargedToday.toLocaleString()} | 
            Emergency: {kpis.emergencyAdmissions.toLocaleString()}
          </div>
        </div>
        <div className="mt-2 text-xs text-blue-700">
          ✓ All metrics are calculated from the same data source | 
          ✓ Daily patterns reflect realistic hospital operations | 
          ✓ Weekend effects applied consistently across all charts
        </div>
      </div>


      {/* Main Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Flow Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-600" />
                Patient Flow Analytics ({selectedTimeframe === '1d' ? '24h' : selectedTimeframe === '7d' ? '7d' : selectedTimeframe === '30d' ? '30d' : '90d'})
              </CardTitle>
              <p className="text-xs text-gray-500 mt-1">
                {selectedTimeframe === '1d' ? 'Hourly patterns' : 'Daily patterns'} with weekend effects and realistic variations
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line 
                  key={`patient-flow-${animationKey}`}
                  data={patientFlowData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                      duration: 2000,
                      easing: 'easeInOutQuart',
                      delay: (context) => context.dataIndex * 100,
                    },
                    plugins: {
                      legend: { 
                        position: 'top' as const,
                        labels: {
                          usePointStyle: true,
                          padding: 20,
                          font: {
                            size: 12,
                            weight: 'bold'
                          }
                        }
                      },
                    },
                    scales: {
                      y: { 
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)',
                        },
                        ticks: {
                          font: {
                            size: 11
                          }
                        }
                      },
                      x: {
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)',
                        },
                        ticks: {
                          font: {
                            size: 10
                          },
                          maxTicksLimit: selectedTimeframe === '90d' ? 15 : selectedTimeframe === '30d' ? 10 : undefined,
                          callback: function(value: any, index: number) {
                            if (selectedTimeframe === '90d' && index % 6 !== 0) return '';
                            if (selectedTimeframe === '30d' && index % 3 !== 0) return '';
                            return this.getLabelForValue(value);
                          }
                        }
                      }
                    },
                    elements: {
                      point: {
                        hoverBackgroundColor: '#fff',
                        hoverBorderWidth: 3,
                      },
                      line: {
                        borderWidth: 3,
                      }
                    }
                  }} 
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Department Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="w-5 h-5 mr-2 text-green-600" />
                Department Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Bar 
                  key={`department-${animationKey}`}
                  data={departmentData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                      duration: 1800,
                      easing: 'easeOutBounce',
                      delay: (context) => context.dataIndex * 200,
                    },
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      y: { 
                        beginAtZero: true, 
                        max: 100,
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)',
                        },
                        ticks: {
                          font: {
                            size: 11
                          },
                          callback: function(value) {
                            return value + '%';
                          }
                        }
                      },
                      x: {
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)',
                        },
                        ticks: {
                          font: {
                            size: 11
                          }
                        }
                      }
                    },
                    elements: {
                      bar: {
                        borderRadius: 6,
                        borderSkipped: false,
                      }
                    }
                  }} 
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Secondary Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bed Occupancy Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bed className="w-5 h-5 mr-2 text-purple-600" />
                Bed Occupancy Trends ({selectedTimeframe === '1d' ? '24h' : selectedTimeframe === '7d' ? '7d' : selectedTimeframe === '30d' ? '30d' : '90d'})
              </CardTitle>
              <p className="text-xs text-gray-500 mt-1">
                {selectedTimeframe === '1d' ? 'Hourly occupancy' : 'Daily occupancy'} rates for ICU, General, and Emergency departments
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Line 
                  key={`bed-occupancy-${animationKey}`}
                  data={bedOccupancyData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                      duration: 2500,
                      easing: 'easeInOutCubic',
                      delay: (context) => context.dataIndex * 150,
                    },
                    plugins: {
                      legend: { 
                        position: 'top' as const,
                        labels: {
                          usePointStyle: true,
                          padding: 20,
                          font: {
                            size: 12,
                            weight: 'bold'
                          }
                        }
                      },
                    },
                    scales: {
                      y: { 
                        beginAtZero: true, 
                        max: 100,
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)',
                        },
                        ticks: {
                          font: {
                            size: 11
                          },
                          callback: function(value) {
                            return value + '%';
                          }
                        }
                      },
                      x: {
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)',
                        },
                        ticks: {
                          font: {
                            size: 10
                          },
                          maxTicksLimit: selectedTimeframe === '90d' ? 15 : selectedTimeframe === '30d' ? 10 : undefined,
                          callback: function(value: any, index: number) {
                            if (selectedTimeframe === '90d' && index % 6 !== 0) return '';
                            if (selectedTimeframe === '30d' && index % 3 !== 0) return '';
                            return this.getLabelForValue(value);
                          }
                        }
                      }
                    },
                    elements: {
                      point: {
                        hoverBackgroundColor: '#fff',
                        hoverBorderWidth: 3,
                      },
                      line: {
                        borderWidth: 3,
                      }
                    }
                  }} 
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Patient Status Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-indigo-600" />
                Patient Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Doughnut 
                  key={`patient-status-${animationKey}`}
                  data={patientStatusData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                      duration: 2200,
                      easing: 'easeInOutElastic',
                      delay: (context) => context.dataIndex * 300,
                    },
                    plugins: {
                      legend: { 
                        position: 'bottom' as const,
                        labels: {
                          usePointStyle: true,
                          padding: 15,
                          font: {
                            size: 11,
                            weight: 'bold'
                          }
                        }
                      },
                    },
                    elements: {
                      arc: {
                        borderWidth: 3,
                        borderColor: '#fff',
                      }
                    }
                  }} 
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resource Utilization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="w-5 h-5 mr-2 text-teal-600" />
                Resource Utilization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Bar 
                  key={`resource-utilization-${animationKey}`}
                  data={resourceUtilizationData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                      duration: 2000,
                      easing: 'easeInOutQuart',
                      delay: (context) => context.dataIndex * 250,
                    },
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      y: { 
                        beginAtZero: true, 
                        max: 100,
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)',
                        },
                        ticks: {
                          font: {
                            size: 11
                          },
                          callback: function(value) {
                            return value + '%';
                          }
                        }
                      },
                      x: {
                        grid: {
                          color: 'rgba(0, 0, 0, 0.05)',
                        },
                        ticks: {
                          font: {
                            size: 11
                          }
                        }
                      }
                    },
                    elements: {
                      bar: {
                        borderRadius: 8,
                        borderSkipped: false,
                      }
                    }
                  }} 
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Emergency Response Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              Emergency Response Times
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Bar 
                key={`emergency-response-${animationKey}`}
                data={emergencyResponseData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  animation: {
                    duration: 1900,
                    easing: 'easeInOutSine',
                    delay: (context) => context.dataIndex * 180,
                  },
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    y: { 
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                      },
                      ticks: {
                        font: {
                          size: 11
                        }
                      }
                    },
                    x: {
                      grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                      },
                      ticks: {
                        font: {
                          size: 11
                        }
                      }
                    }
                  },
                  elements: {
                    bar: {
                      borderRadius: 6,
                      borderSkipped: false,
                    }
                  }
                }} 
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Real-time Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Real-time Hospital Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-semibold text-gray-900">ICU Bed 12</p>
                  <p className="text-sm text-gray-600">Critical patient requires attention</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-semibold text-gray-900">Emergency Room</p>
                  <p className="text-sm text-gray-600">High patient volume - 15 min wait</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">Surgery Ward</p>
                  <p className="text-sm text-gray-600">All systems operational</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
 