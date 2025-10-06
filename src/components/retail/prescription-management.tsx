"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pill, Stethoscope, User, Calendar, Clock, CheckCircle, XCircle, AlertTriangle,
  Search, Filter, Plus, Edit, Trash2, Eye, Download, Upload, Settings, Bell,
  Shield, Zap, Activity, BarChart3, TrendingUp, TrendingDown, ArrowUp, ArrowDown,
  FileText, Printer, Mail, Phone, MapPin, Award, Target, Star, Heart, Award as AwardIcon,
  Database, Network, Cpu, Brain, Activity as ActivityIcon, RefreshCw, RotateCcw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// Prescription data simulation
const prescriptions = [
  {
    id: 'RX001',
    patientName: 'John Doe',
    patientId: 'P001',
    doctorName: 'Dr. Sarah Johnson',
    doctorId: 'D001',
    medication: 'Aspirin 100mg',
    dosage: '1 tablet daily',
    quantity: 30,
    refills: 2,
    datePrescribed: '2024-01-15',
    dateFilled: '2024-01-15',
    expiryDate: '2024-04-15',
    status: 'Filled',
    priority: 'Normal',
    interactions: [],
    allergies: ['Penicillin'],
    notes: 'Take with food to reduce stomach irritation',
    insurance: 'Blue Cross Blue Shield',
    copay: 15.00,
    totalCost: 45.00
  },
  {
    id: 'RX002',
    patientName: 'Jane Smith',
    patientId: 'P002',
    doctorName: 'Dr. Michael Brown',
    doctorId: 'D002',
    medication: 'Lisinopril 10mg',
    dosage: '1 tablet daily',
    quantity: 90,
    refills: 5,
    datePrescribed: '2024-01-14',
    dateFilled: '2024-01-14',
    expiryDate: '2024-07-14',
    status: 'Filled',
    priority: 'High',
    interactions: ['Potassium supplements'],
    allergies: [],
    notes: 'Monitor blood pressure regularly',
    insurance: 'Aetna',
    copay: 25.00,
    totalCost: 75.00
  },
  {
    id: 'RX003',
    patientName: 'Mike Johnson',
    patientId: 'P003',
    doctorName: 'Dr. Emily Davis',
    doctorId: 'D003',
    medication: 'Metformin 500mg',
    dosage: '2 tablets twice daily',
    quantity: 120,
    refills: 3,
    datePrescribed: '2024-01-13',
    dateFilled: null,
    expiryDate: '2024-07-13',
    status: 'Pending',
    priority: 'Normal',
    interactions: [],
    allergies: [],
    notes: 'Take with meals to reduce gastrointestinal side effects',
    insurance: 'Cigna',
    copay: 20.00,
    totalCost: 60.00
  },
  {
    id: 'RX004',
    patientName: 'Sarah Wilson',
    patientId: 'P004',
    doctorName: 'Dr. Robert Taylor',
    doctorId: 'D004',
    medication: 'Atorvastatin 20mg',
    dosage: '1 tablet at bedtime',
    quantity: 30,
    refills: 1,
    datePrescribed: '2024-01-12',
    dateFilled: '2024-01-12',
    expiryDate: '2024-04-12',
    status: 'Filled',
    priority: 'Normal',
    interactions: ['Grapefruit juice'],
    allergies: ['Sulfa drugs'],
    notes: 'Avoid grapefruit and grapefruit juice',
    insurance: 'UnitedHealth',
    copay: 30.00,
    totalCost: 90.00
  },
  {
    id: 'RX005',
    patientName: 'David Brown',
    patientId: 'P005',
    doctorName: 'Dr. Lisa Anderson',
    doctorId: 'D005',
    medication: 'Omeprazole 20mg',
    dosage: '1 capsule daily',
    quantity: 30,
    refills: 0,
    datePrescribed: '2024-01-11',
    dateFilled: null,
    expiryDate: '2024-04-11',
    status: 'Ready for Pickup',
    priority: 'Low',
    interactions: [],
    allergies: [],
    notes: 'Take 30 minutes before meals',
    insurance: 'Humana',
    copay: 10.00,
    totalCost: 30.00
  }
];

const drugInteractions = [
  {
    drug1: 'Aspirin',
    drug2: 'Warfarin',
    severity: 'High',
    description: 'Increased risk of bleeding',
    recommendation: 'Monitor INR closely, consider alternative therapy'
  },
  {
    drug1: 'Lisinopril',
    drug2: 'Potassium supplements',
    severity: 'Medium',
    description: 'Risk of hyperkalemia',
    recommendation: 'Monitor potassium levels, adjust dosage if needed'
  },
  {
    drug1: 'Atorvastatin',
    drug2: 'Grapefruit juice',
    severity: 'Medium',
    description: 'Increased statin levels',
    recommendation: 'Avoid grapefruit products'
  }
];

const prescriptionStats = {
  total: prescriptions.length,
  filled: prescriptions.filter(p => p.status === 'Filled').length,
  pending: prescriptions.filter(p => p.status === 'Pending').length,
  ready: prescriptions.filter(p => p.status === 'Ready for Pickup').length,
  highPriority: prescriptions.filter(p => p.priority === 'High').length
};

export default function PrescriptionManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [activeTab, setActiveTab] = useState('prescriptions');
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  const [showNewPrescription, setShowNewPrescription] = useState(false);
  const [showInteractions, setShowInteractions] = useState(false);

  // Filter prescriptions
  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || prescription.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || prescription.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Filled': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Ready for Pickup': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Normal': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const checkInteractions = (medication: string) => {
    return drugInteractions.filter(interaction => 
      interaction.drug1.toLowerCase().includes(medication.toLowerCase()) ||
      interaction.drug2.toLowerCase().includes(medication.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Prescription Management System
            </h1>
            <p className="text-gray-600 mt-2">Medical workflow and prescription tracking</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowNewPrescription(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Prescription
            </Button>
            <Button
              onClick={() => setShowInteractions(true)}
              variant="outline"
              className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
            >
              <Shield className="w-4 h-4 mr-2" />
              Check Interactions
            </Button>
            <Button
              variant="outline"
              className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Prescription Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              title: 'Total Prescriptions',
              value: prescriptionStats.total.toString(),
              change: '+5.2%',
              trend: 'up',
              icon: Pill,
              color: 'from-emerald-500 to-teal-500'
            },
            {
              title: 'Filled',
              value: prescriptionStats.filled.toString(),
              change: '+8.1%',
              trend: 'up',
              icon: CheckCircle,
              color: 'from-green-500 to-emerald-500'
            },
            {
              title: 'Pending',
              value: prescriptionStats.pending.toString(),
              change: '-2.3%',
              trend: 'down',
              icon: Clock,
              color: 'from-yellow-500 to-orange-500'
            },
            {
              title: 'Ready for Pickup',
              value: prescriptionStats.ready.toString(),
              change: '+12.5%',
              trend: 'up',
              icon: Bell,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'High Priority',
              value: prescriptionStats.highPriority.toString(),
              change: '+3.7%',
              trend: 'up',
              icon: AlertTriangle,
              color: 'from-red-500 to-pink-500'
            }
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-5`} />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                      <div className="flex items-center mt-2">
                        {metric.trend === 'up' ? (
                          <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full bg-gradient-to-br ${metric.color} text-white`}>
                      <metric.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Prescription List */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Pill className="w-5 h-5 text-emerald-600" />
                    <span>Prescription Database</span>
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search prescriptions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Filled">Filled</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Ready for Pickup">Ready</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priority</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Normal">Normal</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredPrescriptions.map((prescription, index) => (
                    <motion.div
                      key={prescription.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => setSelectedPrescription(prescription)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Pill className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{prescription.medication}</h3>
                            <Badge className={getStatusColor(prescription.status)}>
                              {prescription.status}
                            </Badge>
                            <Badge className={getPriorityColor(prescription.priority)}>
                              {prescription.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-600">Patient: {prescription.patientName}</span>
                            <span className="text-sm text-gray-600">Doctor: {prescription.doctorName}</span>
                            <span className="text-sm text-gray-600">RX: {prescription.id}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{prescription.quantity} units</p>
                          <p className="text-sm text-gray-600">{prescription.refills} refills</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${prescription.totalCost}</p>
                          <p className="text-sm text-gray-600">Copay: ${prescription.copay}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{prescription.datePrescribed}</p>
                          <p className="text-sm text-gray-600">Expires: {prescription.expiryDate}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPrescription(prescription);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Drug Interactions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  <span>Drug Interactions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {drugInteractions.slice(0, 3).map((interaction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-3 bg-red-50 rounded-lg border border-red-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          {interaction.drug1} + {interaction.drug2}
                        </span>
                        <Badge className={`${getSeverityColor(interaction.severity)} border-current`}>
                          {interaction.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{interaction.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-orange-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  New Prescription
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Check Interactions
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Printer className="w-4 h-4 mr-2" />
                  Print Labels
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </CardContent>
            </Card>

            {/* Prescription Stats */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span>Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Fill Rate</span>
                    <span className="font-bold text-green-600">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Fill Time</span>
                    <span className="font-bold">12.5 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Interaction Alerts</span>
                    <span className="font-bold text-red-600">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Patient Satisfaction</span>
                    <span className="font-bold text-blue-600">4.8/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Prescription Detail Modal */}
        <Dialog open={!!selectedPrescription} onOpenChange={() => setSelectedPrescription(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Pill className="w-5 h-5 text-emerald-600" />
                <span>Prescription Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedPrescription && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Prescription ID</Label>
                      <p className="font-semibold text-lg">{selectedPrescription.id}</p>
                    </div>
                    <div>
                      <Label>Medication</Label>
                      <p className="font-semibold text-lg">{selectedPrescription.medication}</p>
                    </div>
                    <div>
                      <Label>Dosage</Label>
                      <p className="font-semibold">{selectedPrescription.dosage}</p>
                    </div>
                    <div>
                      <Label>Quantity</Label>
                      <p className="font-semibold">{selectedPrescription.quantity} units</p>
                    </div>
                    <div>
                      <Label>Refills</Label>
                      <p className="font-semibold">{selectedPrescription.refills} remaining</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>Patient</Label>
                      <p className="font-semibold">{selectedPrescription.patientName}</p>
                    </div>
                    <div>
                      <Label>Doctor</Label>
                      <p className="font-semibold">{selectedPrescription.doctorName}</p>
                    </div>
                    <div>
                      <Label>Date Prescribed</Label>
                      <p className="font-semibold">{selectedPrescription.datePrescribed}</p>
                    </div>
                    <div>
                      <Label>Expiry Date</Label>
                      <p className="font-semibold">{selectedPrescription.expiryDate}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(selectedPrescription.status)}>
                        {selectedPrescription.status}
                      </Badge>
                      <Badge className={getPriorityColor(selectedPrescription.priority)}>
                        {selectedPrescription.priority}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Insurance & Cost</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Insurance:</span>
                        <span className="font-semibold">{selectedPrescription.insurance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Copay:</span>
                        <span className="font-semibold">${selectedPrescription.copay}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Cost:</span>
                        <span className="font-semibold">${selectedPrescription.totalCost}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Medical Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label>Allergies</Label>
                        <p className="font-semibold">
                          {selectedPrescription.allergies.length > 0 
                            ? selectedPrescription.allergies.join(', ')
                            : 'None reported'
                          }
                        </p>
                      </div>
                      <div>
                        <Label>Interactions</Label>
                        <p className="font-semibold">
                          {selectedPrescription.interactions.length > 0 
                            ? selectedPrescription.interactions.join(', ')
                            : 'None detected'
                          }
                        </p>
                      </div>
                      <div>
                        <Label>Notes</Label>
                        <p className="font-semibold">{selectedPrescription.notes}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedPrescription(null)}>
                    Close
                  </Button>
                  <Button>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Prescription
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* New Prescription Modal */}
        <Dialog open={showNewPrescription} onOpenChange={setShowNewPrescription}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                <span>New Prescription</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patient">Patient Name</Label>
                  <Input id="patient" placeholder="Enter patient name" />
                </div>
                <div>
                  <Label htmlFor="doctor">Doctor Name</Label>
                  <Input id="doctor" placeholder="Enter doctor name" />
                </div>
                <div>
                  <Label htmlFor="medication">Medication</Label>
                  <Input id="medication" placeholder="Enter medication name" />
                </div>
                <div>
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input id="dosage" placeholder="Enter dosage" />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="Enter quantity" />
                </div>
                <div>
                  <Label htmlFor="refills">Refills</Label>
                  <Input id="refills" type="number" placeholder="Enter refills" />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Enter prescription notes" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewPrescription(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Prescription
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Drug Interactions Modal */}
        <Dialog open={showInteractions} onOpenChange={setShowInteractions}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-red-600" />
                <span>Drug Interaction Checker</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="drug1">First Drug</Label>
                  <Input id="drug1" placeholder="Enter drug name" />
                </div>
                <div>
                  <Label htmlFor="drug2">Second Drug</Label>
                  <Input id="drug2" placeholder="Enter drug name" />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Known Interactions</h3>
                {drugInteractions.map((interaction, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">
                        {interaction.drug1} + {interaction.drug2}
                      </span>
                      <Badge className={`${getSeverityColor(interaction.severity)} border-current`}>
                        {interaction.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{interaction.description}</p>
                    <p className="text-sm text-blue-600">{interaction.recommendation}</p>
                  </Card>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowInteractions(false)}>
                Close
              </Button>
              <Button>
                <Shield className="w-4 h-4 mr-2" />
                Check Interactions
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}