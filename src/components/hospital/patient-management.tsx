"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { Users, UserPlus, Activity, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

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

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  admissionDate: string;
  department: string;
  status: 'Active' | 'Discharged' | 'Critical';
  room: string;
  diagnosis: string;
}

export function PatientManagement() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data generation
  useEffect(() => {
    const mockPatients: Patient[] = Array.from({ length: 50 }, (_, i) => ({
      id: `P${String(i + 1).padStart(3, '0')}`,
      name: `Patient ${i + 1}`,
      age: Math.floor(Math.random() * 60) + 20,
      gender: Math.random() > 0.5 ? 'Male' : 'Female',
      admissionDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      department: ['Cardiology', 'Neurology', 'Orthopedics', 'Emergency', 'ICU'][Math.floor(Math.random() * 5)],
      status: ['Active', 'Discharged', 'Critical'][Math.floor(Math.random() * 3)] as 'Active' | 'Discharged' | 'Critical',
      room: `Room ${Math.floor(Math.random() * 100) + 1}`,
      diagnosis: ['Hypertension', 'Diabetes', 'Pneumonia', 'Fracture', 'Stroke'][Math.floor(Math.random() * 5)]
    }));
    setPatients(mockPatients);
  }, []);

  // Chart data
  const admissionTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Admissions',
        data: [120, 150, 180, 160, 200, 220],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Discharges',
        data: [100, 140, 170, 150, 190, 210],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      }
    ]
  };

  const departmentDistributionData = {
    labels: ['Cardiology', 'Neurology', 'Orthopedics', 'Emergency', 'ICU'],
    datasets: [
      {
        data: [25, 20, 30, 15, 10],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderWidth: 2,
      }
    ]
  };

  const occupancyData = {
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

  const activePatients = patients.filter(p => p.status === 'Active').length;
  const criticalPatients = patients.filter(p => p.status === 'Critical').length;
  const dischargedToday = patients.filter(p => p.status === 'Discharged').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Patient Management System</h2>
          <p className="text-gray-600">Comprehensive patient records and admission management</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
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
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold">{patients.length}</p>
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
                <Activity className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Active Patients</p>
                  <p className="text-2xl font-bold">{activePatients}</p>
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
                <AlertCircle className="w-8 h-8 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Critical Cases</p>
                  <p className="text-2xl font-bold">{criticalPatients}</p>
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
                <CheckCircle className="w-8 h-8 text-emerald-600" />
                <div>
                  <p className="text-sm text-gray-600">Discharged Today</p>
                  <p className="text-2xl font-bold">{dischargedToday}</p>
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
              <CardTitle>Admission Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Line data={admissionTrendData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'top' as const },
                  },
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
              <CardTitle>Department Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Doughnut data={departmentDistributionData} options={{
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

      {/* Occupancy Chart */}
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
              <Bar data={occupancyData} options={{
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

      {/* Patient List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">ID</th>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Age</th>
                    <th className="text-left p-2">Department</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Room</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.slice(0, 10).map((patient) => (
                    <tr key={patient.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-mono">{patient.id}</td>
                      <td className="p-2">{patient.name}</td>
                      <td className="p-2">{patient.age}</td>
                      <td className="p-2">{patient.department}</td>
                      <td className="p-2">
                        <Badge 
                          className={
                            patient.status === 'Active' ? 'bg-green-100 text-green-800' :
                            patient.status === 'Critical' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }
                        >
                          {patient.status}
                        </Badge>
                      </td>
                      <td className="p-2">{patient.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
