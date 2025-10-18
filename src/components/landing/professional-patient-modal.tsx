"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { 
  User, 
  Phone, 
  ArrowRight, 
  CheckCircle, 
  Heart,
  Pill,
  Calendar,
  FileText,
  Shield,
  X
} from "lucide-react";

interface PatientData {
  name: string;
  phone: string;
  diseases: string[];
  medications: string[];
  allergies: string[];
  lastVisit: string;
  nextAppointment?: string;
}

interface ProfessionalPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (patientData: PatientData) => void;
}

export function ProfessionalPatientModal({ isOpen, onClose, onSuccess }: ProfessionalPatientModalProps) {
  const [step, setStep] = useState<'login' | 'registration' | 'dashboard'>('login');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  // Mock patient database (in real app, this would be API calls)
  const mockPatients: Record<string, PatientData> = {
    'john_doe_1234567890': {
      name: 'John Doe',
      phone: '1234567890',
      diseases: ['Diabetes Type 2', 'Hypertension'],
      medications: ['Metformin 500mg', 'Lisinopril 10mg'],
      allergies: ['Penicillin'],
      lastVisit: '2025-01-15',
      nextAppointment: '2025-02-15'
    },
    'sarah_smith_0987654321': {
      name: 'Sarah Smith',
      phone: '0987654321',
      diseases: ['Asthma', 'Seasonal Allergies'],
      medications: ['Albuterol Inhaler', 'Loratadine 10mg'],
      allergies: ['Dust Mites'],
      lastVisit: '2025-01-10',
      nextAppointment: '2025-02-10'
    }
  };

  const handleLogin = async () => {
    if (!name.trim() || !phone.trim()) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter both name and phone number.",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const patientKey = `${name.toLowerCase().replace(/\s+/g, '_')}_${phone}`;
    const existingPatient = mockPatients[patientKey];
    
    if (existingPatient) {
      setPatientData(existingPatient);
      setStep('dashboard');
      toast({
        title: "Welcome Back!",
        description: `Hello ${name}, your profile has been loaded successfully.`,
      });
    } else {
      // New patient registration
      const newPatientData: PatientData = {
        name,
        phone,
        diseases: ['General Health Checkup'],
        medications: [],
        allergies: [],
        lastVisit: new Date().toISOString().split('T')[0]
      };
      
      setPatientData(newPatientData);
      setStep('dashboard');
      toast({
        title: "Profile Created!",
        description: `Welcome ${name}! Your personalized dashboard has been created.`,
      });
    }
    
    setIsLoading(false);
  };

  const handleDashboardAccess = () => {
    if (patientData) {
      onSuccess(patientData);
      onClose();
    }
  };

  const resetModal = () => {
    setStep('login');
    setName('');
    setPhone('');
    setPatientData(null);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 border-0 bg-transparent shadow-none">
        <DialogTitle className="sr-only">Professional Patient Portal</DialogTitle>
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Professional Background */}
          <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl border border-gray-100" />
          
          <div className="relative p-6">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {step === 'login' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Portal</h2>
                  <p className="text-gray-600 text-sm">Enter your details to access your personalized health dashboard</p>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isLoading ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    New patients will automatically get a personalized dashboard created
                  </p>
                </div>
              </motion.div>
            )}

            {step === 'dashboard' && patientData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Welcome Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {patientData.name}!</h2>
                  <p className="text-gray-600 text-sm">Your personalized health dashboard is ready</p>
                </div>

                {/* Dashboard Preview */}
                <div className="space-y-4 mb-6">
                  <Card className="border border-gray-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        Health Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Conditions:</span>
                          <span className="text-gray-600">{patientData.diseases.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Medications:</span>
                          <span className="text-gray-600">{patientData.medications.length} active</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Last Visit:</span>
                          <span className="text-gray-600">{patientData.lastVisit}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-500" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                          <Pill className="w-4 h-4 text-blue-600" />
                          <span>Medications</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                          <Calendar className="w-4 h-4 text-green-600" />
                          <span>Appointments</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                          <FileText className="w-4 h-4 text-purple-600" />
                          <span>Reports</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                          <Heart className="w-4 h-4 text-orange-600" />
                          <span>Health Track</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button
                  onClick={handleDashboardAccess}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Access My Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
