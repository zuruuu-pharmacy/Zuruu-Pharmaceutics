"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus,
  Search,
  Filter,
  Download,
  Share2,
  RefreshCw,
  MessageSquare,
  Clock,
  AlertTriangle,
  CheckCircle,
  X,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Building,
  Pill,
  FileText,
  QrCode,
  Bell,
  Settings,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Zap,
  Brain,
  Shield,
  Heart,
  Activity,
  Stethoscope,
  Microscope,
  Camera,
  Upload,
  Send,
  Copy,
  ExternalLink,
  Star,
  ThumbsUp,
  ThumbsDown,
  Info,
  HelpCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';

// Types and interfaces
interface Prescription {
  id: string;
  doctorName: string;
  doctorSpecialization: string;
  hospital: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'refill-needed';
  medications: Medication[];
  digitalSignature?: string;
  qrCode?: string;
  notes?: string;
}

interface Medication {
  id: string;
  name: string;
  strength: string;
  frequency: string;
  duration: string;
  startDate: string;
  notes: string;
  status: 'active' | 'refill-due' | 'completed';
  dosage: string;
  instructions: string;
  sideEffects?: string[];
  interactions?: string[];
}

interface MedicationAlert {
  time: string;
  medication: string;
  status: 'taken' | 'missed' | 'upcoming';
  dosage: string;
}

interface RefillRequest {
  medicationIds: string[];
  pharmacy: string;
  deliveryOption: 'pickup' | 'delivery';
  expectedTime: string;
  notes?: string;
}

// Mock data
const mockPrescriptions: Prescription[] = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Ahmed',
    doctorSpecialization: 'Endocrinologist',
    hospital: 'MedCenter Hospital',
    issueDate: '2024-01-15',
    expiryDate: '2024-04-15',
    status: 'active',
    medications: [
      {
        id: '1',
        name: 'Metformin',
        strength: '500mg',
        frequency: 'Twice daily',
        duration: '30 days',
        startDate: '2024-01-15',
        notes: 'After meals',
        status: 'active',
        dosage: '1 tablet',
        instructions: 'Take with food to reduce stomach upset',
        sideEffects: ['Nausea', 'Diarrhea'],
        interactions: ['Alcohol may increase risk of lactic acidosis']
      },
      {
        id: '2',
        name: 'Atorvastatin',
        strength: '10mg',
        frequency: 'Once daily',
        duration: '30 days',
        startDate: '2024-01-15',
        notes: 'Night time',
        status: 'active',
        dosage: '1 tablet',
        instructions: 'Take at bedtime for best results',
        sideEffects: ['Muscle pain', 'Liver problems'],
        interactions: ['Grapefruit juice may increase side effects']
      }
    ],
    digitalSignature: 'Dr. Sarah Ahmed - MD',
    qrCode: 'QR_CODE_DATA_HERE'
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    doctorSpecialization: 'Cardiologist',
    hospital: 'Heart Care Center',
    issueDate: '2024-01-10',
    expiryDate: '2024-02-10',
    status: 'refill-needed',
    medications: [
      {
        id: '3',
        name: 'Lisinopril',
        strength: '5mg',
        frequency: 'Once daily',
        duration: '30 days',
        startDate: '2024-01-10',
        notes: 'Morning',
        status: 'refill-due',
        dosage: '1 tablet',
        instructions: 'Take at the same time each day',
        sideEffects: ['Dry cough', 'Dizziness'],
        interactions: ['Potassium supplements may increase risk of hyperkalemia']
      }
    ],
    digitalSignature: 'Dr. Michael Chen - MD'
  },
  {
    id: '3',
    doctorName: 'Dr. Emily Rodriguez',
    doctorSpecialization: 'Dermatologist',
    hospital: 'Skin Health Clinic',
    issueDate: '2023-12-01',
    expiryDate: '2024-01-01',
    status: 'expired',
    medications: [
      {
        id: '4',
        name: 'Hydrocortisone Cream',
        strength: '1%',
        frequency: 'Twice daily',
        duration: '14 days',
        startDate: '2023-12-01',
        notes: 'Apply to affected area',
        status: 'completed',
        dosage: 'Thin layer',
        instructions: 'Apply a thin layer to affected area twice daily',
        sideEffects: ['Skin irritation', 'Thinning of skin'],
        interactions: ['None known']
      }
    ],
    digitalSignature: 'Dr. Emily Rodriguez - MD'
  }
];

const mockMedicationAlerts: MedicationAlert[] = [
  { time: '08:00', medication: 'Metformin', status: 'taken', dosage: '500mg' },
  { time: '20:00', medication: 'Metformin', status: 'missed', dosage: '500mg' },
  { time: '22:00', medication: 'Atorvastatin', status: 'upcoming', dosage: '10mg' }
];

export default function PrescriptionManagementPanel() {
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(mockPrescriptions[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired' | 'refill-needed'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'doctor' | 'medication-count'>('date');
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [showSafetyCheck, setShowSafetyCheck] = useState(false);
  const [showAddPrescription, setShowAddPrescription] = useState(false);
  const [refillRequest, setRefillRequest] = useState<RefillRequest>({
    medicationIds: [],
    pharmacy: '',
    deliveryOption: 'pickup',
    expectedTime: '',
    notes: ''
  });
  const [smartRemindersEnabled, setSmartRemindersEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('prescriptions');

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter and sort prescriptions
  const filteredPrescriptions = mockPrescriptions
    .filter(prescription => {
      const matchesSearch = prescription.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           prescription.medications.some(med => med.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           prescription.issueDate.includes(searchQuery);
      const matchesFilter = filterStatus === 'all' || prescription.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime();
        case 'doctor':
          return a.doctorName.localeCompare(b.doctorName);
        case 'medication-count':
          return b.medications.length - a.medications.length;
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      case 'refill-needed': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMedicationStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600';
      case 'refill-due': return 'text-yellow-600';
      case 'completed': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getAlertStatusIcon = (status: string) => {
    switch (status) {
      case 'taken': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'missed': return <X className="w-4 h-4 text-red-600" />;
      case 'upcoming': return <Clock className="w-4 h-4 text-blue-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const renderHeader = () => (
    <motion.div 
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">My Prescriptions</h1>
        <p className="text-gray-600">Manage your medications and refill requests</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Button 
          className="bg-teal-600 hover:bg-teal-700 text-white"
          onClick={() => setShowAddPrescription(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Prescription
        </Button>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="refill-needed">Refill Needed</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="doctor">Doctor Name</SelectItem>
            <SelectItem value="medication-count">Medicine Count</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );

  const renderPrescriptionsList = () => (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search by doctor, medicine, or date..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Prescriptions List */}
      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-300">
        {filteredPrescriptions.map((prescription, index) => (
          <motion.div
            key={prescription.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:border-teal-300 hover:-translate-y-1 ${
                selectedPrescription?.id === prescription.id ? 'border-2 border-teal-600 shadow-md' : 'border-gray-200'
              }`}
              onClick={() => setSelectedPrescription(prescription)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
                    <Pill className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{prescription.doctorName}</h3>
                    <p className="text-sm text-gray-600">{prescription.doctorSpecialization}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Issued: {new Date(prescription.issueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Expires: {new Date(prescription.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={getStatusColor(prescription.status)}>
                      {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1).replace('-', ' ')}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Pill className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{prescription.medications.length} meds</span>
                    </div>
                    {prescription.status === 'refill-needed' && (
                      <div className="flex items-center space-x-1">
                        <Bell className="w-3 h-3 text-yellow-600" />
                        <span className="text-xs text-yellow-600">Refill due</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderPrescriptionDetails = () => {
    if (!selectedPrescription) return null;

    return (
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* Prescription Summary Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">{selectedPrescription.doctorName}</CardTitle>
                  <p className="text-gray-600 flex items-center">
                    <Stethoscope className="w-4 h-4 mr-1" />
                    {selectedPrescription.doctorSpecialization}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Building className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedPrescription.hospital}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Badge className={getStatusColor(selectedPrescription.status)}>
                  {selectedPrescription.status.charAt(0).toUpperCase() + selectedPrescription.status.slice(1).replace('-', ' ')}
                </Badge>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Renew
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Issued: {new Date(selectedPrescription.issueDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Expires: {new Date(selectedPrescription.expiryDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            {selectedPrescription.digitalSignature && (
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">
                  <strong>Digital Signature:</strong> {selectedPrescription.digitalSignature}
                </p>
              </div>
            )}
            
            {selectedPrescription.qrCode && (
              <div className="border-t pt-4">
                <div className="flex items-center space-x-2">
                  <QrCode className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">QR Code available for verification</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Medication Table */}
        <Card>
          <CardHeader>
            <CardTitle>Medications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-teal-50">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Medicine Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Strength</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Frequency</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Duration</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Start Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Notes</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPrescription.medications.map((medication, index) => (
                    <motion.tr
                      key={medication.id}
                      className={`border-b hover:bg-teal-50 transition-colors ${
                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <td className="py-3 px-4 font-medium text-gray-900">{medication.name}</td>
                      <td className="py-3 px-4 text-gray-600">{medication.strength}</td>
                      <td className="py-3 px-4 text-gray-600">{medication.frequency}</td>
                      <td className="py-3 px-4 text-gray-600">{medication.duration}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(medication.startDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{medication.notes}</td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold ${getMedicationStatusColor(medication.status)}`}>
                          {medication.status.charAt(0).toUpperCase() + medication.status.slice(1).replace('-', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          {medication.status === 'refill-due' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setShowRefillModal(true)}
                              className="text-yellow-600 hover:text-yellow-700"
                            >
                              <RefreshCw className="w-3 h-3" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <MessageSquare className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Smart Medication Alerts */}
        {smartRemindersEnabled && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-teal-600" />
                  <span>Smart Medication Alerts</span>
                </CardTitle>
                <Switch
                  checked={smartRemindersEnabled}
                  onCheckedChange={setSmartRemindersEnabled}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockMedicationAlerts.map((alert, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-medium text-gray-900">{alert.time}</div>
                      <div className="text-sm text-gray-600">{alert.medication} ({alert.dosage})</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getAlertStatusIcon(alert.status)}
                      <span className="text-sm text-gray-600 capitalize">{alert.status}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Safety Checker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-teal-600" />
              <span>AI Safety Checker</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Check for drug interactions and safety</p>
                <p className="text-xs text-green-600">✓ No dangerous drug interactions detected</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSafetyCheck(true)}
                className="border-teal-300 text-teal-600 hover:bg-teal-50"
              >
                <Brain className="w-4 h-4 mr-2" />
                Run Check
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Features */}
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1">
            <FileText className="w-4 h-4 mr-2" />
            Compare Prescriptions
          </Button>
          <Button variant="outline" className="flex-1">
            <Edit className="w-4 h-4 mr-2" />
            Add Note
          </Button>
        </div>
      </motion.div>
    );
  };

  const renderRefillModal = () => (
    <Dialog open={showRefillModal} onOpenChange={setShowRefillModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Request Refill</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Select medications for refill:
            </label>
            <div className="space-y-2">
              {selectedPrescription?.medications.map((medication) => (
                <div key={medication.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={medication.id}
                    checked={refillRequest.medicationIds.includes(medication.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setRefillRequest(prev => ({
                          ...prev,
                          medicationIds: [...prev.medicationIds, medication.id]
                        }));
                      } else {
                        setRefillRequest(prev => ({
                          ...prev,
                          medicationIds: prev.medicationIds.filter(id => id !== medication.id)
                        }));
                      }
                    }}
                  />
                  <label htmlFor={medication.id} className="text-sm text-gray-700">
                    {medication.name} ({medication.strength})
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Select value={refillRequest.pharmacy} onValueChange={(value) => 
            setRefillRequest(prev => ({ ...prev, pharmacy: value }))
          }>
            <SelectTrigger>
              <SelectValue placeholder="Choose preferred pharmacy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="zuruu-pharmacy">Zuruu Pharmacy</SelectItem>
              <SelectItem value="medcenter-pharmacy">MedCenter Pharmacy</SelectItem>
              <SelectItem value="health-plus">Health Plus Pharmacy</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={refillRequest.deliveryOption} onValueChange={(value: 'pickup' | 'delivery') => 
            setRefillRequest(prev => ({ ...prev, deliveryOption: value }))
          }>
            <SelectTrigger>
              <SelectValue placeholder="Delivery option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pickup">Pickup</SelectItem>
              <SelectItem value="delivery">Delivery</SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            placeholder="Expected ready time"
            value={refillRequest.expectedTime}
            onChange={(e) => setRefillRequest(prev => ({ ...prev, expectedTime: e.target.value }))}
          />
          
          <Textarea
            placeholder="Additional notes (optional)"
            value={refillRequest.notes}
            onChange={(e) => setRefillRequest(prev => ({ ...prev, notes: e.target.value }))}
          />
          
          <div className="flex space-x-3">
            <Button 
              className="flex-1 bg-teal-600 hover:bg-teal-700"
              onClick={() => {
                // Handle refill request
                setShowRefillModal(false);
                // Show confirmation
              }}
            >
              Confirm Refill
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowRefillModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderSafetyCheckModal = () => (
    <Dialog open={showSafetyCheck} onOpenChange={setShowSafetyCheck}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-teal-600" />
            <span>AI Safety Analysis</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-green-800">Safety Check Complete</h4>
            </div>
            <p className="text-sm text-green-700">
              No dangerous drug interactions detected between your current medications.
            </p>
          </div>
          
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900">Medication Analysis:</h5>
            {selectedPrescription?.medications.map((medication) => (
              <div key={medication.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h6 className="font-medium text-gray-900">{medication.name}</h6>
                  <Badge className="bg-green-100 text-green-800">Safe</Badge>
                </div>
                {medication.sideEffects && (
                  <div className="text-sm text-gray-600">
                    <strong>Common side effects:</strong> {medication.sideEffects.join(', ')}
                  </div>
                )}
                {medication.interactions && (
                  <div className="text-sm text-gray-600 mt-1">
                    <strong>Interactions:</strong> {medication.interactions.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <Button 
            className="w-full bg-teal-600 hover:bg-teal-700"
            onClick={() => setShowSafetyCheck(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderAddPrescriptionModal = () => (
    <Dialog open={showAddPrescription} onOpenChange={setShowAddPrescription}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Prescription</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center py-8">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Prescription</h3>
            <p className="text-gray-600 mb-4">Upload a photo or scan of your prescription</p>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Camera className="w-4 h-4 mr-2" />
              Take Photo
            </Button>
            <Button variant="outline" className="ml-2">
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            Or manually enter prescription details
          </div>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setShowAddPrescription(false)}
          >
            Enter Manually
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (isMobile) {
    return (
      <div className="space-y-6">
        {renderHeader()}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="prescriptions">My Prescriptions</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="prescriptions" className="space-y-4">
            {renderPrescriptionsList()}
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            {selectedPrescription ? (
              renderPrescriptionDetails()
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Pill className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Prescription</h3>
                  <p className="text-gray-600">Choose a prescription to view details</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
        
        {renderRefillModal()}
        {renderSafetyCheckModal()}
        {renderAddPrescriptionModal()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderHeader()}
      
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Left Panel - Prescription List (35%) */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              {renderPrescriptionsList()}
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Prescription Details (65%) */}
        <div className="lg:col-span-7">
          {selectedPrescription ? (
            renderPrescriptionDetails()
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Pill className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Prescription</h3>
                <p className="text-gray-600">Choose a prescription from the list to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {renderRefillModal()}
      {renderSafetyCheckModal()}
      {renderAddPrescriptionModal()}
    </div>
  );
}
