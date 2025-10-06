"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  User, 
  Shield,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Heart,
  Star,
  Zap,
  Globe
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const googleUserData = {
        id: Date.now().toString(),
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@gmail.com",
        phone: "+1234567890",
        role: "pharmacist",
        organization: "Google Pharmacy",
        experience: "5-10 years",
        profilePicture: "https://lh3.googleusercontent.com/a/default-user",
        createdAt: new Date().toISOString(),
        isVerified: true,
        profileComplete: true
      };
      
      login(googleUserData);
      
      toast({
        title: "Google Signup Successful!",
        description: "Welcome to Zuruu Pharmaceutics.",
      });
      
      router.push('/profile');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google Signup Failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const userData = {
        id: Date.now().toString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: 'user',
        createdAt: new Date().toISOString(),
        isVerified: false,
        profileComplete: false
      };
      
      login(userData);
      
      toast({
        title: "Account Created Successfully!",
        description: "Welcome to Zuruu Pharmaceutics. Please complete your profile.",
      });
      
      router.push('/profile');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Google Identity Services Script */}
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Geometric Shapes */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-20"
              style={{
                background: `linear-gradient(45deg, ${
                  ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1'][i % 8]
                }, transparent)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${60 + Math.random() * 80}px`,
                height: `${60 + Math.random() * 80}px`,
                borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '20%' : '0%',
              }}
              animate={{
                x: [0, 150, -150, 0],
                y: [0, -150, 150, 0],
                rotate: [0, 360, -360, 0],
                scale: [1, 1.3, 0.7, 1],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 25 + i * 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
          
          {/* Gradient Mesh */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20" />
          
          {/* Animated Stars */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute text-white/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Star className="w-2 h-2" />
            </motion.div>
          ))}
        </div>

        {/* Mouse Follower */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md"
        >
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-8">
              {/* Logo Animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Heart className="w-10 h-10 text-white" />
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent mb-2">
                  Join Zuruu
                </CardTitle>
                <p className="text-white/70 text-sm">
                  Create your account and start your journey
                </p>
              </motion.div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Google Signup Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div id="g_id_button" className="w-full"></div>
                
                {/* Enhanced Fallback Google Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignup}
                  disabled={isLoading}
                  className="w-full h-16 border-4 border-purple-400/60 hover:border-purple-300/90 hover:bg-purple-500/20 font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm bg-purple-500/10"
                >
                  {isLoading ? (
                    <motion.div
                      className="flex items-center space-x-3"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-white">Connecting...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="flex items-center space-x-3"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FcGoogle className="w-6 h-6" />
                      <span className="text-white">Continue with Google</span>
                    </motion.div>
                  )}
                </Button>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="relative my-8"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-white/60 font-medium">or</span>
                </div>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Fields */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-semibold text-white/90">
                      First Name
                    </Label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 group-focus-within:text-purple-400 transition-colors" />
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className={`pl-10 h-12 bg-white/10 border-white/30 focus:border-purple-400 focus:bg-white/20 text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 ${
                          errors.firstName ? 'border-red-400 focus:border-red-400' : ''
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.firstName && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2 text-red-400 text-xs"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {errors.firstName}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-semibold text-white/90">
                      Last Name
                    </Label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 group-focus-within:text-purple-400 transition-colors" />
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className={`pl-10 h-12 bg-white/10 border-white/30 focus:border-purple-400 focus:bg-white/20 text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 ${
                          errors.lastName ? 'border-red-400 focus:border-red-400' : ''
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.lastName && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2 text-red-400 text-xs"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {errors.lastName}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-sm font-semibold text-white/90">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60 group-focus-within:text-purple-400 transition-colors" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={`pl-12 h-12 bg-white/10 border-white/30 focus:border-purple-400 focus:bg-white/20 text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 ${
                        errors.email ? 'border-red-400 focus:border-red-400' : ''
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-red-400 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-sm font-semibold text-white/90">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60 group-focus-within:text-purple-400 transition-colors" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a strong password"
                      className={`pl-12 pr-12 h-12 bg-white/10 border-white/30 focus:border-purple-400 focus:bg-white/20 text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 ${
                        errors.password ? 'border-red-400 focus:border-red-400' : ''
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-red-400 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.password}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Confirm Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 }}
                  className="space-y-2"
                >
                  <Label htmlFor="confirmPassword" className="text-sm font-semibold text-white/90">
                    Confirm Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60 group-focus-within:text-purple-400 transition-colors" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className={`pl-12 pr-12 h-12 bg-white/10 border-white/30 focus:border-purple-400 focus:bg-white/20 text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 ${
                        errors.confirmPassword ? 'border-red-400 focus:border-red-400' : ''
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <AnimatePresence>
                    {errors.confirmPassword && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-red-400 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.confirmPassword}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Terms and Conditions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  className="space-y-2"
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-purple-600 border-white/30 rounded focus:ring-purple-500 bg-white/10"
                      disabled={isLoading}
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-white/70">
                      I agree to the{" "}
                      <Link href="/terms" className="text-purple-300 hover:text-purple-200 font-semibold">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-purple-300 hover:text-purple-200 font-semibold">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  <AnimatePresence>
                    {errors.agreeToTerms && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-red-400 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.agreeToTerms}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-16 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-4 border-pink-400/50 hover:border-pink-300/70"
                  >
                    {isLoading ? (
                      <motion.div
                        className="flex items-center gap-3"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating Account...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="flex items-center gap-3"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span>Create Account</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Login Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="text-center"
              >
                <p className="text-white/70 text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-purple-300 hover:text-purple-200 font-semibold transition-colors"
                  >
                    Sign In
                  </Link>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Google OAuth Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const GOOGLE_CLIENT_ID = "${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'}";

              function handleCredentialResponse(response) {
                console.log("Got Google ID token");
                const idToken = response.credential;

                fetch("/api/auth/google", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ id_token: idToken })
                }).then(async r => {
                  const data = await r.json();
                  if (r.ok && data.ok) {
                    window.location.href = "/dashboard";
                  } else {
                    alert("Google login failed: " + (data.error || "unknown"));
                  }
                }).catch(err => {
                  console.error("Network error:", err);
                  alert("Network error during login.");
                });
              }

              window.addEventListener("DOMContentLoaded", () => {
                if (typeof google !== 'undefined' && google.accounts) {
                  google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: handleCredentialResponse,
                    auto_select: false
                  });

                  google.accounts.id.renderButton(
                    document.getElementById("g_id_button"),
                    { 
                      theme: "filled_blue", 
                      size: "large", 
                      shape: "rectangular", 
                      width: "100%",
                      text: "continue_with"
                    }
                  );
                }
              });
            `
          }}
        />
      </div>
    </>
  );
}