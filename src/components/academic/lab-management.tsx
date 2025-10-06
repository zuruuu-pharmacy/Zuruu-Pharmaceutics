"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FlaskConical, TestTube, Microscope, Beaker, Atom, Brain, Database, Plus,
  Search, Filter, Edit, Trash2, Eye, Download, Upload, CheckCircle, XCircle,
  AlertTriangle, Star, Target, TrendingUp, BarChart3, Clock, Users, Calendar,
  Settings, Save, RefreshCw, Share2, Lock, Unlock, Copy, ExternalLink, Play,
  Pause, Stop, Zap, Bell, MessageSquare, Heart, Globe, Building, Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { faker } from '@faker-js/faker';

interface Lab {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  currentOccupancy: number;
  type: 'Research' | 'Teaching' | 'Clinical' | 'Analytical' | 'Synthesis' | 'Microbiology';
  status: 'Active' | 'Maintenance' | 'Closed' | 'Renovation';
  equipment: Equipment[];
  safetyProtocols: SafetyProtocol[];
  bookings: Booking[];
  maintenance: Maintenance[];
  incidents: Incident[];
  supervisor: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Equipment {
  id: string;
  name: string;
  type: string;
  model: string;
  serialNumber: string;
  status: 'Operational' | 'Maintenance' | 'Out of Order' | 'Calibration';
  lastMaintenance: Date;
  nextMaintenance: Date;
  location: string;
  specifications: string;
}

interface SafetyProtocol {
  id: string;
  name: string;
  description: string;
  category: 'Chemical' | 'Biological' | 'Physical' | 'Radiation';
  level: 'Low' | 'Medium' | 'High' | 'Critical';
  lastReview: Date;
  nextReview: Date;
  compliance: number;
}

interface Booking {
  id: string;
  user: string;
  purpose: string;
  startTime: Date;
  endTime: Date;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
  equipment: string[];
  notes: string;
}

interface Maintenance {
  id: string;
  equipment: string;
  type: 'Routine' | 'Repair' | 'Calibration' | 'Upgrade';
  description: string;
  scheduledDate: Date;
  completedDate?: Date;
  technician: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Overdue';
  cost: number;
}

interface Incident {
  id: string;
  type: 'Safety' | 'Equipment' | 'Chemical' | 'Biological' | 'Other';
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  reportedBy: string;
  reportedDate: Date;
  resolvedDate?: Date;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  actions: string[];
}

const generateMockLab = (id: number): Lab => {
  const types: Lab['type'][] = ['Research', 'Teaching', 'Clinical', 'Analytical', 'Synthesis', 'Microbiology'];
  const statuses: Lab['status'][] = ['Active', 'Maintenance', 'Closed', 'Renovation'];
  const departments = ['Pharmacy', 'Chemistry', 'Biology', 'Medicine', 'Nursing', 'Public Health'];
  
  const type = faker.helpers.arrayElement(types);
  const status = faker.helpers.arrayElement(statuses);
  const department = faker.helpers.arrayElement(departments);
  
  const equipment: Equipment[] = Array.from({ length: faker.number.int({ min: 5, max: 15 }) }).map(() => ({
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement(['Microscope', 'Centrifuge', 'Spectrophotometer', 'PCR Machine', 'Incubator', 'Autoclave', 'Balance', 'pH Meter']),
    type: faker.helpers.arrayElement(['Analytical', 'Preparation', 'Measurement', 'Safety']),
    model: faker.helpers.arrayElement(['Model A', 'Model B', 'Model C', 'Model D']),
    serialNumber: faker.string.alphanumeric(8).toUpperCase(),
    status: faker.helpers.arrayElement(['Operational', 'Maintenance', 'Out of Order', 'Calibration']),
    lastMaintenance: faker.date.past({ years: 1 }),
    nextMaintenance: faker.date.future({ years: 1 }),
    location: faker.location.buildingNumber(),
    specifications: faker.lorem.sentence()
  }));
  
  const safetyProtocols: SafetyProtocol[] = Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => ({
    id: faker.string.uuid(),
    name: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    category: faker.helpers.arrayElement(['Chemical', 'Biological', 'Physical', 'Radiation']),
    level: faker.helpers.arrayElement(['Low', 'Medium', 'High', 'Critical']),
    lastReview: faker.date.past({ years: 1 }),
    nextReview: faker.date.future({ years: 1 }),
    compliance: faker.number.int({ min: 70, max: 100 })
  }));
  
  const bookings: Booking[] = Array.from({ length: faker.number.int({ min: 5, max: 20 }) }).map(() => ({
    id: faker.string.uuid(),
    user: faker.person.fullName(),
    purpose: faker.lorem.words(3),
    startTime: faker.date.future({ years: 1 }),
    endTime: faker.date.future({ years: 1 }),
    status: faker.helpers.arrayElement(['Confirmed', 'Pending', 'Cancelled', 'Completed']),
    equipment: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => faker.helpers.arrayElement(equipment).name),
    notes: faker.lorem.sentence()
  }));
  
  const maintenance: Maintenance[] = Array.from({ length: faker.number.int({ min: 2, max: 8 }) }).map(() => ({
    id: faker.string.uuid(),
    equipment: faker.helpers.arrayElement(equipment).name,
    type: faker.helpers.arrayElement(['Routine', 'Repair', 'Calibration', 'Upgrade']),
    description: faker.lorem.sentence(),
    scheduledDate: faker.date.future({ years: 1 }),
    completedDate: faker.datatype.boolean(0.7) ? faker.date.past({ years: 1 }) : undefined,
    technician: faker.person.fullName(),
    status: faker.helpers.arrayElement(['Scheduled', 'In Progress', 'Completed', 'Overdue']),
    cost: faker.number.int({ min: 100, max: 5000 })
  }));
  
  const incidents: Incident[] = Array.from({ length: faker.number.int({ min: 0, max: 5 }) }).map(() => ({
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(['Safety', 'Equipment', 'Chemical', 'Biological', 'Other']),
    description: faker.lorem.sentence(),
    severity: faker.helpers.arrayElement(['Low', 'Medium', 'High', 'Critical']),
    reportedBy: faker.person.fullName(),
    reportedDate: faker.date.past({ years: 1 }),
    resolvedDate: faker.datatype.boolean(0.8) ? faker.date.past({ years: 1 }) : undefined,
    status: faker.helpers.arrayElement(['Open', 'In Progress', 'Resolved', 'Closed']),
    actions: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => faker.lorem.sentence())
  }));
  
  return {
    id: faker.string.uuid(),
    name: faker.lorem.words(2) + ' Laboratory',
    description: faker.lorem.paragraph(),
    location: faker.location.buildingNumber(),
    capacity: faker.number.int({ min: 10, max: 50 }),
    currentOccupancy: faker.number.int({ min: 0, max: 50 }),
    type,
    status,
    equipment,
    safetyProtocols,
    bookings,
    maintenance,
    incidents,
    supervisor: faker.person.fullName(),
    department,
    createdAt: faker.date.past({ years: 2 }),
    updatedAt: faker.date.recent({ days: 30 })
  };
};

export default function LabManagement() {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);

  useEffect(() => {
    const mockLabs = Array.from({ length: 15 }, (_, i) => generateMockLab(i));
    setLabs(mockLabs);
  }, []);

  const filteredLabs = useMemo(() => {
    return labs.filter(lab => {
      const matchesSearch = lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lab.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lab.supervisor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || lab.status === filterStatus;
      const matchesType = filterType === 'All' || lab.type === filterType;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [labs, searchTerm, filterStatus, filterType]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Closed': return 'bg-red-100 text-red-800';
      case 'Renovation': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Research': return <Microscope className="w-5 h-5" />;
      case 'Teaching': return <BookOpen className="w-5 h-5" />;
      case 'Clinical': return <Heart className="w-5 h-5" />;
      case 'Analytical': return <BarChart3 className="w-5 h-5" />;
      case 'Synthesis': return <FlaskConical className="w-5 h-5" />;
      case 'Microbiology': return <TestTube className="w-5 h-5" />;
      default: return <Beaker className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laboratory Management</h1>
          <p className="text-gray-600 mt-2">Manage laboratory resources, equipment, and safety protocols</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => {/* Export functionality */}}
            variant="outline"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Lab
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Laboratory</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Lab Name</Label>
                    <Input placeholder="Enter lab name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input placeholder="Enter location" />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Research">Research</SelectItem>
                        <SelectItem value="Teaching">Teaching</SelectItem>
                        <SelectItem value="Clinical">Clinical</SelectItem>
                        <SelectItem value="Analytical">Analytical</SelectItem>
                        <SelectItem value="Synthesis">Synthesis</SelectItem>
                        <SelectItem value="Microbiology">Microbiology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Capacity</Label>
                    <Input type="number" placeholder="Enter capacity" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Enter description" rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddModalOpen(false)}>
                  Add Lab
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Labs</p>
                <p className="text-2xl font-bold text-gray-900">{labs.length}</p>
              </div>
              <FlaskConical className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {labs.filter(l => l.status === 'Active').length} active
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Equipment</p>
                <p className="text-2xl font-bold text-gray-900">
                  {labs.reduce((sum, lab) => sum + lab.equipment.length, 0)}
                </p>
              </div>
              <TestTube className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-blue-600">
                {labs.reduce((sum, lab) => sum + lab.equipment.filter(e => e.status === 'Operational').length, 0)} operational
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Safety Protocols</p>
                <p className="text-2xl font-bold text-gray-900">
                  {labs.reduce((sum, lab) => sum + lab.safetyProtocols.length, 0)}
                </p>
              </div>
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-purple-600">
                Avg compliance: {Math.round(labs.reduce((sum, lab) => sum + lab.safetyProtocols.reduce((s, p) => s + p.compliance, 0) / lab.safetyProtocols.length, 0) / labs.length)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {labs.reduce((sum, lab) => sum + lab.bookings.filter(b => b.status === 'Confirmed').length, 0)}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-orange-600">
                {labs.reduce((sum, lab) => sum + lab.bookings.filter(b => b.status === 'Pending').length, 0)} pending
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search labs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                  <SelectItem value="Renovation">Renovation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="Research">Research</SelectItem>
                  <SelectItem value="Teaching">Teaching</SelectItem>
                  <SelectItem value="Clinical">Clinical</SelectItem>
                  <SelectItem value="Analytical">Analytical</SelectItem>
                  <SelectItem value="Synthesis">Synthesis</SelectItem>
                  <SelectItem value="Microbiology">Microbiology</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Labs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLabs.map((lab, index) => (
          <motion.div
            key={lab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{lab.name}</CardTitle>
                    <p className="text-sm text-gray-600">{lab.location}</p>
                    <p className="text-sm text-gray-500">{lab.supervisor}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getStatusColor(lab.status)}>
                      {lab.status}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {getTypeIcon(lab.type)}
                      <span className="text-xs text-gray-500">{lab.type}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Occupancy:</span>
                    <span className="font-medium">{lab.currentOccupancy}/{lab.capacity}</span>
                  </div>
                  <Progress value={(lab.currentOccupancy / lab.capacity) * 100} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Equipment:</span>
                    <span className="ml-1 font-medium">{lab.equipment.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Bookings:</span>
                    <span className="ml-1 font-medium">{lab.bookings.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Protocols:</span>
                    <span className="ml-1 font-medium">{lab.safetyProtocols.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Department:</span>
                    <span className="ml-1 font-medium">{lab.department}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedLab(lab);
                        setIsViewModalOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">
                    {lab.updatedAt.toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Laboratory Details</DialogTitle>
          </DialogHeader>
          {selectedLab && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg">{selectedLab.name}</h3>
                  <p className="text-gray-600">{selectedLab.location}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedLab.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <Badge variant="outline">{selectedLab.type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge className={getStatusColor(selectedLab.status)}>
                      {selectedLab.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Capacity:</span>
                    <span className="font-medium">{selectedLab.currentOccupancy}/{selectedLab.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Supervisor:</span>
                    <span className="font-medium">{selectedLab.supervisor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Department:</span>
                    <span className="font-medium">{selectedLab.department}</span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="equipment" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="equipment">Equipment</TabsTrigger>
                  <TabsTrigger value="safety">Safety</TabsTrigger>
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="equipment" className="space-y-4">
                  <div className="space-y-3">
                    {selectedLab.equipment.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <TestTube className="w-4 h-4 text-gray-500" />
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <p className="text-sm text-gray-500">{item.model} - {item.serialNumber}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{item.status}</Badge>
                          <span className="text-sm text-gray-500">{item.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="safety" className="space-y-4">
                  <div className="space-y-3">
                    {selectedLab.safetyProtocols.map((protocol, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{protocol.name}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{protocol.category}</Badge>
                            <Badge className={protocol.level === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                              {protocol.level}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{protocol.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Compliance: {protocol.compliance}%</span>
                          <span className="text-gray-500">Next Review: {protocol.nextReview.toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="bookings" className="space-y-4">
                  <div className="space-y-3">
                    {selectedLab.bookings.map((booking, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{booking.user}</span>
                          <Badge variant="outline">{booking.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{booking.purpose}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">
                            {booking.startTime.toLocaleDateString()} - {booking.endTime.toLocaleDateString()}
                          </span>
                          <span className="text-gray-500">{booking.equipment.length} equipment</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="maintenance" className="space-y-4">
                  <div className="space-y-3">
                    {selectedLab.maintenance.map((item, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{item.equipment}</span>
                          <Badge variant="outline">{item.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Scheduled: {item.scheduledDate.toLocaleDateString()}</span>
                          <span className="text-gray-500">Cost: ${item.cost}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
