"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  MapPin, 
  Calendar, 
  Shield,
  Edit,
  Save,
  LogOut,
  Settings,
  Award,
  BriefcaseMedical,
  GraduationCap,
  Star,
  CheckCircle,
  AlertCircle,
  Camera,
  Upload
} from "lucide-react";

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  organization: string;
  experience: string;
  bio?: string;
  location?: string;
  specialties?: string[];
  certifications?: string[];
  createdAt: string;
  isVerified: boolean;
  profileComplete: boolean;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const router = useRouter();
  const { toast } = useToast();
  const { user, updateUser, logout, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    
    if (user) {
      setFormData(user);
    }
  }, [user, isAuthenticated, isLoading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.firstName?.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName?.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }
    
    if (!formData.organization?.trim()) {
      newErrors.organization = "Organization is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const updatedUser = {
        ...user,
        ...formData,
        profileComplete: true,
        updatedAt: new Date().toISOString()
      };
      
      updateUser(updatedUser);
      setIsEditing(false);
      
      toast({
        title: "Profile Updated!",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'pharmacist':
        return <BriefcaseMedical className="w-5 h-5" />;
      case 'pharmacy_student':
        return <GraduationCap className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'pharmacist':
        return 'bg-blue-500';
      case 'pharmacy_student':
        return 'bg-green-500';
      case 'healthcare_professional':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your profile...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-14 h-14 rounded-full object-cover border-2 border-white/30"
                    />
                  ) : (
                    <User className="w-8 h-8 text-white" />
                  )}
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              </motion.div>
              
              <div>
                <motion.h1
                  className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {user.firstName} {user.lastName}
                </motion.h1>
                <motion.p
                  className="text-blue-200 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {user.role.replace('_', ' ')} • Verified Professional
                </motion.p>
              </div>
            </motion.div>
            
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isEditing
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/25'
                      : 'bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm'
                  }`}
                >
                  {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-red-100 border border-red-400/30 backdrop-blur-sm transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative p-8 text-center">
                {/* Profile Picture */}
                <motion.div
                  className="relative w-32 h-32 mx-auto mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white/10 backdrop-blur-sm">
                      {user?.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <User className="w-16 h-16 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Online Status */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white/20 shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  </div>
                </motion.div>

                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {isEditing ? (
                    <div className="space-y-3">
                      <Input
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        className="text-center font-bold bg-white/10 border-white/30 text-white placeholder-white/60"
                      />
                      <Input
                        name="lastName"
                        value={formData.lastName || ''}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        className="text-center font-bold bg-white/10 border-white/30 text-white placeholder-white/60"
                      />
                    </div>
                  ) : (
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      {user.firstName} {user.lastName}
                    </h2>
                  )}
                </motion.div>

                {/* Role Badge */}
                <motion.div
                  className="flex items-center justify-center gap-2 mt-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className={`px-4 py-2 rounded-full ${getRoleColor(user.role)} text-white flex items-center gap-2 shadow-lg`}>
                    {getRoleIcon(user.role)}
                    <span className="font-semibold">{user.role.replace('_', ' ')}</span>
                  </div>
                  {user.isVerified && (
                    <div className="px-3 py-2 rounded-full bg-green-500 text-white flex items-center gap-1 shadow-lg">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-semibold">Verified</span>
                    </div>
                  )}
                </motion.div>

                {/* Member Since */}
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <p className="text-blue-200 text-sm">
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </motion.div>
                
                {/* Additional Info */}
                {isEditing && (
                  <motion.div
                    className="mt-6 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <div>
                      <Label htmlFor="bio" className="block text-sm font-semibold text-white/80 mb-2">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio || ''}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself..."
                        rows={3}
                        className="w-full bg-white/10 border-white/30 text-white placeholder-white/60 rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="location" className="block text-sm font-semibold text-white/80 mb-2">
                        Location
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location || ''}
                        onChange={handleInputChange}
                        placeholder="City, Country"
                        className="w-full bg-white/10 border-white/30 text-white placeholder-white/60 rounded-lg"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Personal Information */}
            <motion.div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-8">
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Personal Information
                  </h3>
                </motion.div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <Label htmlFor="email" className="block text-sm font-semibold text-white/80 mb-3">
                        Email Address
                      </Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email || ''}
                          onChange={handleInputChange}
                          className={`w-full bg-white/10 border-white/30 text-white placeholder-white/60 rounded-lg ${errors.email ? 'border-red-400' : ''}`}
                        />
                      ) : (
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                          <Mail className="w-5 h-5 text-blue-300" />
                          <span className="text-white font-medium">{user.email}</span>
                        </div>
                      )}
                      {errors.email && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-400 text-sm mt-2"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                    >
                      <Label htmlFor="phone" className="block text-sm font-semibold text-white/80 mb-3">
                        Phone Number
                      </Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone || ''}
                          onChange={handleInputChange}
                          className={`w-full bg-white/10 border-white/30 text-white placeholder-white/60 rounded-lg ${errors.phone ? 'border-red-400' : ''}`}
                        />
                      ) : (
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                          <Phone className="w-5 h-5 text-green-300" />
                          <span className="text-white font-medium">{user.phone}</span>
                        </div>
                      )}
                      {errors.phone && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-red-400 text-sm mt-2"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <Label htmlFor="organization" className="block text-sm font-semibold text-white/80 mb-3">
                      Organization
                    </Label>
                    {isEditing ? (
                      <Input
                        id="organization"
                        name="organization"
                        value={formData.organization || ''}
                        onChange={handleInputChange}
                        className={`w-full bg-white/10 border-white/30 text-white placeholder-white/60 rounded-lg ${errors.organization ? 'border-red-400' : ''}`}
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                        <Building className="w-5 h-5 text-purple-300" />
                        <span className="text-white font-medium">{user.organization}</span>
                      </div>
                    )}
                    {errors.organization && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm mt-2"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.organization}
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Professional Information */}
            <motion.div
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-8">
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <BriefcaseMedical className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    Professional Information
                  </h3>
                </motion.div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.0 }}
                    >
                      <Label htmlFor="role" className="block text-sm font-semibold text-white/80 mb-3">
                        Role
                      </Label>
                      {isEditing ? (
                        <Select value={formData.role || ''} onValueChange={(value) => handleSelectChange('role', value)}>
                          <SelectTrigger className="w-full bg-white/10 border-white/30 text-white rounded-lg">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="pharmacist" className="text-white">Pharmacist</SelectItem>
                            <SelectItem value="pharmacy_technician" className="text-white">Pharmacy Technician</SelectItem>
                            <SelectItem value="pharmacy_student" className="text-white">Pharmacy Student</SelectItem>
                            <SelectItem value="healthcare_professional" className="text-white">Healthcare Professional</SelectItem>
                            <SelectItem value="researcher" className="text-white">Researcher</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                          {getRoleIcon(user.role)}
                          <span className="text-white font-medium">{user.role.replace('_', ' ')}</span>
                        </div>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.1 }}
                    >
                      <Label htmlFor="experience" className="block text-sm font-semibold text-white/80 mb-3">
                        Experience
                      </Label>
                      {isEditing ? (
                        <Select value={formData.experience || ''} onValueChange={(value) => handleSelectChange('experience', value)}>
                          <SelectTrigger className="w-full bg-white/10 border-white/30 text-white rounded-lg">
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="0-1" className="text-white">0-1 years</SelectItem>
                            <SelectItem value="2-5" className="text-white">2-5 years</SelectItem>
                            <SelectItem value="6-10" className="text-white">6-10 years</SelectItem>
                            <SelectItem value="11-15" className="text-white">11-15 years</SelectItem>
                            <SelectItem value="15+" className="text-white">15+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                          <Award className="w-5 h-5 text-yellow-300" />
                          <span className="text-white font-medium">{user.experience || 'Not specified'}</span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Save Button */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-bold text-lg rounded-xl shadow-2xl shadow-green-500/25 transition-all duration-300"
                  >
                    {isSaving ? (
                      <motion.div
                        className="flex items-center gap-3"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Saving Changes...</span>
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Save className="w-5 h-5" />
                        <span>Save Changes</span>
                      </div>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
