"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { startFreeTrial, sendAccessCodeEmail } from "@/lib/trial-utils";
import { generateTimeSlots, bookDemo } from "@/lib/scheduling-utils";
import { generateAndDownloadPDF, downloadTextFile } from "@/lib/pdf-utils";
import { 
  Check, 
  X, 
  Zap, 
  Shield, 
  Crown, 
  Sparkles, 
  ArrowRight, 
  CheckCircle,
  CreditCard,
  Lock,
  Users,
  Building,
  Globe,
  Heart,
  TrendingUp,
  Award,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  Database,
  BarChart3,
  Settings,
  Smartphone,
  Laptop,
  Server,
  Cloud,
  Key,
  FileText,
  Target,
  Rocket,
  Download,
  Calendar
} from "lucide-react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small pharmacies and individual practitioners",
    monthlyPrice: 99,
    yearlyPrice: 990,
    period: "month",
    popular: false,
    icon: Sparkles,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    borderColor: "border-blue-200",
    features: [
      { name: "Up to 1,000 prescriptions/month", included: true, icon: FileText },
      { name: "Basic AI drug interaction checking", included: true, icon: Shield },
      { name: "Patient adherence tracking", included: true, icon: Heart },
      { name: "Email support", included: true, icon: Mail },
      { name: "Basic reporting", included: true, icon: BarChart3 },
      { name: "Mobile app access", included: true, icon: Smartphone },
      { name: "API access", included: false, icon: Key },
      { name: "Advanced analytics", included: false, icon: TrendingUp },
      { name: "Priority support", included: false, icon: Phone }
    ],
    cta: "Start Free Trial",
    ctaVariant: "outline" as const,
    gradient: "from-blue-500 via-cyan-500 to-blue-600",
    savings: "Save 17% with annual billing"
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for growing pharmacies and healthcare facilities",
    monthlyPrice: 299,
    yearlyPrice: 2990,
    period: "month",
    popular: true,
    icon: Zap,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    features: [
      { name: "Up to 10,000 prescriptions/month", included: true, icon: FileText },
      { name: "Advanced AI drug interaction checking", included: true, icon: Shield },
      { name: "Comprehensive patient tracking", included: true, icon: Heart },
      { name: "Priority email & phone support", included: true, icon: Phone },
      { name: "Advanced analytics & reporting", included: true, icon: BarChart3 },
      { name: "Full mobile & web access", included: true, icon: Smartphone },
      { name: "API access & integrations", included: true, icon: Key },
      { name: "Custom dashboards", included: true, icon: Settings },
      { name: "Team collaboration tools", included: true, icon: Users }
    ],
    cta: "Start Free Trial",
    ctaVariant: "default" as const,
    gradient: "from-purple-500 via-pink-500 to-purple-600",
    savings: "Save 17% with annual billing"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large healthcare systems and pharmaceutical companies",
    monthlyPrice: 999,
    yearlyPrice: 9990,
    period: "month",
    popular: false,
    icon: Crown,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200",
    features: [
      { name: "Unlimited prescriptions", included: true, icon: FileText },
      { name: "AI-powered clinical decision support", included: true, icon: Shield },
      { name: "Advanced patient analytics", included: true, icon: Heart },
      { name: "24/7 dedicated support", included: true, icon: Phone },
      { name: "Custom reporting & BI", included: true, icon: BarChart3 },
      { name: "Multi-platform access", included: true, icon: Smartphone },
      { name: "Full API & webhook access", included: true, icon: Key },
      { name: "Custom integrations", included: true, icon: Settings },
      { name: "White-label solutions", included: true, icon: Building },
      { name: "Dedicated account manager", included: true, icon: Users },
      { name: "SLA guarantees", included: true, icon: Clock },
      { name: "Custom training & onboarding", included: true, icon: Award }
    ],
    cta: "Contact Sales",
    ctaVariant: "default" as const,
    gradient: "from-emerald-500 via-teal-500 to-emerald-600",
    savings: "Save 17% with annual billing"
  }
];

const addOns = [
  {
    id: "api-access",
    name: "Advanced API Access",
    description: "Full API access with webhooks and real-time data",
    price: 50,
    period: "month",
    icon: Key,
    features: ["REST API", "Webhooks", "Real-time sync", "Custom endpoints"]
  },
  {
    id: "white-label",
    name: "White-Label Solution",
    description: "Custom branding and white-label options",
    price: 200,
    period: "month",
    icon: Building,
    features: ["Custom branding", "White-label app", "Custom domain", "Brand guidelines"]
  },
  {
    id: "dedicated-support",
    name: "Dedicated Support",
    description: "24/7 dedicated support with SLA guarantees",
    price: 150,
    period: "month",
    icon: Phone,
    features: ["24/7 support", "SLA guarantees", "Dedicated team", "Priority response"]
  }
];


export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [trialEmail, setTrialEmail] = useState("");
  const [trialLoading, setTrialLoading] = useState(false);
  const [trialSuccess, setTrialSuccess] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [demoForm, setDemoForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    message: ""
  });
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    const plan = plans.find(p => p.id === planId);
    if (plan?.cta === "Start Free Trial") {
      setShowTrialModal(true);
    } else {
      setShowPaymentModal(true);
    }
  };

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const calculateTotal = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) return 0;
    
    const planPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    const addOnPrice = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return total + (addOn ? addOn.price * (isYearly ? 12 : 1) : 0);
    }, 0);
    
    return planPrice + addOnPrice;
  };

  const handlePayment = async () => {
    setIsLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowPaymentModal(false);
    // Here you would integrate with actual payment processor
    alert("Payment processed successfully! Welcome to Zuruu Pharmaceutics!");
  };

  // Free trial functions
  const handleStartTrial = async () => {
    if (!trialEmail) return;
    
    setTrialLoading(true);
    const plan = plans.find(p => p.id === selectedPlan);
    const result = await startFreeTrial(trialEmail, plan?.id || 'starter');
    
    if (result.success) {
      setTrialSuccess(true);
      setAccessCode(result.accessCode || '');
    } else {
      alert(result.error || 'Failed to start trial');
    }
    
    setTrialLoading(false);
  };

  // Demo booking functions
  const handleBookDemo = async () => {
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }
    
    const [date, time] = selectedSlot.split('_');
    const result = await bookDemo({
      ...demoForm,
      preferredDate: date,
      preferredTime: time,
      timezone: 'UTC'
    });
    
    if (result.success) {
      alert('Demo booked successfully! You will receive a confirmation email shortly.');
      setShowDemoModal(false);
      setShowScheduleModal(false);
    } else {
      alert(result.error || 'Failed to book demo');
    }
  };

  // PDF download functions
  const handleDownloadPDF = async (type: 'pricing' | 'features' | 'demo' | 'whitepaper') => {
    const success = await generateAndDownloadPDF(type);
    if (!success) {
      // Fallback to text file
      downloadTextFile(type);
    }
  };

  // Load available time slots
  useEffect(() => {
    if (showScheduleModal) {
      const slots = generateTimeSlots();
      setAvailableSlots(slots);
    }
  }, [showScheduleModal]);

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
          >
            Choose Your Plan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Flexible pricing plans designed to scale with your pharmacy needs. 
            Start with a free trial and upgrade anytime.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <Label htmlFor="billing-toggle" className="text-lg font-semibold">
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500"
            />
            <Label htmlFor="billing-toggle" className="text-lg font-semibold">
              Yearly
            </Label>
            {isYearly && (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Save 17%
              </Badge>
            )}
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + index * 0.2 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-sm font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.popular 
                  ? 'border-2 border-purple-300 shadow-xl' 
                  : 'border border-gray-200 hover:border-gray-300'
              }`}>
                <CardHeader className="text-center pb-4">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} mx-auto mb-4 flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <plan.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </CardTitle>
                  <p className="text-gray-600 text-sm mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-600 ml-2">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                    {isYearly && (
                      <div className="text-sm text-green-600 font-semibold mt-1">
                        {plan.savings}
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 1 + index * 0.2 + featureIndex * 0.1 }}
                        className={`flex items-center gap-3 ${
                          feature.included ? 'text-gray-700' : 'text-gray-400'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          feature.included 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {feature.included ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <X className="w-3 h-3" />
                          )}
                        </div>
                        <feature.icon className="w-4 h-4" />
                        <span className="text-sm">{feature.name}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="pt-4"
                  >
                    <Button
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`w-full h-12 font-semibold ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                          : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white'
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Download & Get Started Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Download Pricing PDF */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <Button
                onClick={() => handleDownloadPDF('pricing')}
                variant="outline"
                className="w-full h-16 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 group-hover:shadow-lg transition-all"
              >
                <div className="flex flex-col items-center gap-2">
                  <Download className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-700">Download Pricing</span>
                </div>
              </Button>
            </motion.div>

            {/* Download Features PDF */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <Button
                onClick={() => handleDownloadPDF('features')}
                variant="outline"
                className="w-full h-16 border-2 border-green-200 hover:border-green-400 hover:bg-green-50 group-hover:shadow-lg transition-all"
              >
                <div className="flex flex-col items-center gap-2">
                  <Download className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-700">Download Features</span>
                </div>
              </Button>
            </motion.div>

            {/* Book Demo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <Button
                onClick={() => setShowDemoModal(true)}
                variant="outline"
                className="w-full h-16 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 group-hover:shadow-lg transition-all"
              >
                <div className="flex flex-col items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-700">Book Demo</span>
                </div>
              </Button>
            </motion.div>

            {/* Get Started Free */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <Button
                onClick={() => {
                  setSelectedPlan('starter');
                  setShowTrialModal(true);
                }}
                className="w-full h-16 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white group-hover:shadow-lg transition-all"
              >
                <div className="flex flex-col items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-semibold">Get Started Free</span>
                </div>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Add-ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Add-ons & Extensions
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {addOns.map((addOn, index) => (
              <motion.div
                key={addOn.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.6 + index * 0.2 }}
                className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                  selectedAddOns.includes(addOn.id)
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleAddOnToggle(addOn.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <addOn.icon className="w-8 h-8 text-blue-600" />
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAddOns.includes(addOn.id)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAddOns.includes(addOn.id) && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {addOn.name}
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  {addOn.description}
                </p>
                <div className="text-2xl font-bold text-gray-900 mb-4">
                  ${addOn.price}/{addOn.period}
                </div>
                <div className="space-y-2">
                  {addOn.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Complete Your Purchase
                </h3>
                <p className="text-gray-600">
                  Secure payment processing with 256-bit SSL encryption
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Selected Plan:</span>
                  <span className="text-lg font-bold">
                    {plans.find(p => p.id === selectedPlan)?.name}
                  </span>
                </div>
                
                {selectedAddOns.length > 0 && (
                  <div className="space-y-2">
                    <span className="font-semibold text-gray-700">Add-ons:</span>
                    {selectedAddOns.map(addOnId => {
                      const addOn = addOns.find(a => a.id === addOnId);
                      return addOn ? (
                        <div key={addOnId} className="flex justify-between text-sm">
                          <span>{addOn.name}</span>
                          <span>${addOn.price}/{addOn.period}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
                
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${calculateTotal()}/{isYearly ? 'year' : 'month'}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Pay Securely
                    </div>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Free Trial Modal */}
        {showTrialModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowTrialModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {!trialSuccess ? (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Start Your Free Trial
                    </h3>
                    <p className="text-gray-600">
                      Get 14 days of full access to all features
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={trialEmail}
                        onChange={(e) => setTrialEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                        <Check className="w-5 h-5" />
                        What's Included:
                      </div>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Full access to all features</li>
                        <li>• No credit card required</li>
                        <li>• Access code sent to your email</li>
                        <li>• 14-day trial period</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleStartTrial}
                      disabled={!trialEmail || trialLoading}
                      className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
                    >
                      {trialLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Starting Trial...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Start Free Trial
                        </div>
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => setShowTrialModal(false)}
                      className="w-full"
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Trial Started Successfully!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Your access code has been sent to {trialEmail}
                  </p>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-6">
                    <p className="text-sm text-green-800">
                      <strong>Access Code:</strong> {accessCode}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Use this code to access your trial account
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setShowTrialModal(false);
                      setTrialSuccess(false);
                      setTrialEmail("");
                      setAccessCode("");
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                  >
                    Continue
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Demo Booking Modal */}
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDemoModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Book a Demo
                </h3>
                <p className="text-gray-600">
                  Schedule a personalized demo with our team
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={demoForm.name}
                      onChange={(e) => setDemoForm({...demoForm, name: e.target.value})}
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={demoForm.email}
                      onChange={(e) => setDemoForm({...demoForm, email: e.target.value})}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={demoForm.phone}
                      onChange={(e) => setDemoForm({...demoForm, phone: e.target.value})}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={demoForm.company}
                      onChange={(e) => setDemoForm({...demoForm, company: e.target.value})}
                      placeholder="Your company"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={demoForm.role}
                    onChange={(e) => setDemoForm({...demoForm, role: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your role</option>
                    <option value="pharmacist">Pharmacist</option>
                    <option value="pharmacy-owner">Pharmacy Owner</option>
                    <option value="healthcare-admin">Healthcare Administrator</option>
                    <option value="it-director">IT Director</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    value={demoForm.message}
                    onChange={(e) => setDemoForm({...demoForm, message: e.target.value})}
                    placeholder="Tell us about your specific needs..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setShowDemoModal(false);
                    setShowScheduleModal(true);
                  }}
                  disabled={!demoForm.name || !demoForm.email}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Select Time Slot
                  </div>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setShowDemoModal(false)}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Schedule Modal */}
        {showScheduleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowScheduleModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Select Time Slot
                </h3>
                <p className="text-gray-600">
                  Choose a convenient time for your demo
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6 max-h-96 overflow-y-auto">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.id)}
                    disabled={!slot.available}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      selectedSlot === slot.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : slot.available
                        ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700'
                        : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <div className="font-semibold">{slot.date}</div>
                    <div>{slot.time}</div>
                    {!slot.available && (
                      <div className="text-xs text-red-500">Unavailable</div>
                    )}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleBookDemo}
                  disabled={!selectedSlot}
                  className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Confirm Demo Booking
                  </div>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowScheduleModal(false);
                    setShowDemoModal(true);
                  }}
                  className="w-full"
                >
                  Back to Form
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}