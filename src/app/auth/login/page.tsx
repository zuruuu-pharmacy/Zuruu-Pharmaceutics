"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
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
  Zap,
  Heart,
  Star,
  Globe
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
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
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoogleLogin = async () => {
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
        title: "Google Login Successful!",
        description: "Welcome back to Zuruu Pharmaceutics.",
      });
      
      router.push('/profile');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google Login Failed",
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userData = {
        id: Date.now().toString(),
        firstName: formData.email.split('@')[0],
        lastName: '',
        email: formData.email,
        role: 'user',
        createdAt: new Date().toISOString(),
        isVerified: true,
        profileComplete: false
      };
      
      login(userData);
      
      toast({
        title: "Login Successful!",
        description: "Welcome back to Zuruu Pharmaceutics.",
      });
      
      router.push('/profile');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Google Identity Services Script */}
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Orbs */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full opacity-20"
              style={{
                background: `linear-gradient(45deg, ${
                  ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][i % 6]
                }, transparent)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 100, -100, 0],
                y: [0, -100, 100, 0],
                scale: [1, 1.2, 0.8, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
          
          {/* Gradient Mesh */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
          
          {/* Animated Particles */}
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Mouse Follower */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl pointer-events-none"
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
                className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
                  Welcome Back
                </CardTitle>
                <p className="text-white/70 text-sm">
                  Sign in to your Zuruu Pharmaceutics account
                </p>
              </motion.div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Google Login Button */}
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
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full h-16 border-4 border-blue-400/60 hover:border-blue-300/90 hover:bg-blue-500/20 font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm bg-blue-500/10"
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

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-sm font-semibold text-white/90">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60 group-focus-within:text-blue-400 transition-colors" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className={`pl-12 h-14 bg-white/10 border-white/30 focus:border-blue-400 focus:bg-white/20 text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 ${
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
                  transition={{ delay: 1.2 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-sm font-semibold text-white/90">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60 group-focus-within:text-blue-400 transition-colors" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className={`pl-12 pr-12 h-14 bg-white/10 border-white/30 focus:border-blue-400 focus:bg-white/20 text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 ${
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

                {/* Forgot Password */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="flex justify-end"
                >
                  <button
                    type="button"
                    className="text-sm text-blue-300 hover:text-blue-200 transition-colors"
                    disabled={isLoading}
                  >
                    Forgot password?
                  </button>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-16 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-4 border-cyan-400/50 hover:border-cyan-300/70"
                  >
                    {isLoading ? (
                      <motion.div
                        className="flex items-center gap-3"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Signing In...</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="flex items-center gap-3"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Sign Up Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="text-center"
              >
                <p className="text-white/70 text-sm">
                  Don't have an account?{" "}
                  <Link
                    href="/auth/signup"
                    className="text-blue-300 hover:text-blue-200 font-semibold transition-colors"
                  >
                    Sign up here
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