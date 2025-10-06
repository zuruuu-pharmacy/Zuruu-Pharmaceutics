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
} from 'chart.js';
import { Bed, Users, Clock, AlertTriangle, CheckCircle, Target } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Bed {
  id: string;
  number: string;
  ward: string;
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Reserved';
  patientId?: string;
  patientName?: string;
  admissionTime?: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
}

export function BedManagement() {
  const [beds, setBeds] = useState<Bed[]>([]);
  const [selectedWard, setSelectedWard] = useState('All');

  // Mock data generation
  useEffect(() => {
    const wards = ['ICU', 'General', 'Emergency', 'Surgery', 'Cardiology'];
    const mockBeds: Bed[] = [];
    
    wards.forEach(ward => {
      const bedCount = ward === 'ICU' ? 20 : ward === 'Emergency' ? 15 : 30;
      for (let i = 1; i <= bedCount; i++) {
        const statuses: Bed['status'][] = ['Available', 'Occupied', 'Maintenance', 'Reserved'];
        const priorities: Bed['priority'][] = ['Low', 'Medium', 'High', 'Critical'];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        mockBeds.push({
          id: `${ward}-${i}`,
          number: `${ward}-${String(i).padStart(2, '0')}`,
          ward,
          status,
          patientId: status === 'Occupied' ? `P${Math.floor(Math.random() * 1000)}` : undefined,
          patientName: status === 'Occupied' ? `Patient ${Math.floor(Math.random() * 100)}` : undefined,
          admissionTime: status === 'Occupied' ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : undefined,
          priority: priorities[Math.floor(Math.random() * priorities.length)]
        });
      }
    });
    setBeds(mockBeds);
  }, []);

  const filteredBeds = selectedWard === 'All' ? beds : beds.filter(bed => bed.ward === selectedWard);
  const availableBeds = filteredBeds.filter(bed => bed.status === 'Available').length;
  const occupiedBeds = filteredBeds.filter(bed => bed.status === 'Occupied').length;
  const maintenanceBeds = filteredBeds.filter(bed => bed.status === 'Maintenance').length;
  const reservedBeds = filteredBeds.filter(bed => bed.status === 'Reserved').length;

  // Chart data
  const occupancyTrendData = {
    labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM'],
    datasets: [
      {
        label: 'ICU Occupancy',
        data: [85, 90, 88, 92, 95, 90, 85],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      },
      {
        label: 'General Ward',
        data: [70, 75, 78, 80, 85, 82, 75],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Emergency',
        data: [60, 65, 70, 75, 80, 85, 70],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      }
    ]
  };

  const wardDistributionData = {
    labels: ['Available', 'Occupied', 'Maintenance', 'Reserved'],
    datasets: [
      {
        data: [availableBeds, occupiedBeds, maintenanceBeds, reservedBeds],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderWidth: 2,
      }
    ]
  };

  const wardCapacityData = {
    labels: ['ICU', 'General', 'Emergency', 'Surgery', 'Cardiology'],
    datasets: [
      {
        label: 'Occupancy Rate (%)',
        data: [95, 78, 85, 92, 88],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Occupied': return 'bg-red-100 text-red-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Reserved': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Smart Bed Management</h2>
          <p className="text-gray-600">Real-time bed availability and allocation optimization</p>
        </div>
        <div className="flex space-x-2">
          <select 
            value={selectedWard} 
            onChange={(e) => setSelectedWard(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="All">All Wards</option>
            <option value="ICU">ICU</option>
            <option value="General">General</option>
            <option value="Emergency">Emergency</option>
            <option value="Surgery">Surgery</option>
            <option value="Cardiology">Cardiology</option>
          </select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Bed className="w-4 h-4 mr-2" />
            Add Bed
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Available Beds</p>
                  <p className="text-2xl font-bold">{availableBeds}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Occupied Beds</p>
                  <p className="text-2xl font-bold">{occupiedBeds}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Maintenance</p>
                  <p className="text-2xl font-bold">{maintenanceBeds}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Reserved</p>
                  <p className="text-2xl font-bold">{reservedBeds}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Trends (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Line data={occupancyTrendData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'top' as const },
                  },
                  scales: {
                    y: { beginAtZero: true, max: 100 }
                  }
                }} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Bed Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Doughnut data={wardDistributionData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'bottom' as const },
                  },
                }} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Ward Capacity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Ward Occupancy Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Bar data={wardCapacityData} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: { beginAtZero: true, max: 100 }
                }
              }} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bed Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Bed Status Grid - {selectedWard} Ward</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {filteredBeds.map((bed) => (
                <motion.div
                  key={bed.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: Math.random() * 0.5 }}
                  className={`relative p-2 rounded-lg border-2 cursor-pointer hover:shadow-md transition-all ${
                    bed.status === 'Available' ? 'bg-green-50 border-green-200' :
                    bed.status === 'Occupied' ? 'bg-red-50 border-red-200' :
                    bed.status === 'Maintenance' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-purple-50 border-purple-200'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-xs font-mono">{bed.number}</div>
                    <div className={`w-3 h-3 rounded-full mx-auto mt-1 ${getPriorityColor(bed.priority)}`}></div>
                    <Badge className={`text-xs mt-1 ${getStatusColor(bed.status)}`}>
                      {bed.status}
                    </Badge>
                    {bed.patientName && (
                      <div className="text-xs text-gray-600 mt-1 truncate">
                        {bed.patientName}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
