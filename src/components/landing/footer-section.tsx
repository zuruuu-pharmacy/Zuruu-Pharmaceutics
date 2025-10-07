"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { DashboardAccessModal } from "@/components/landing/dashboard-access-modal";
import { FooterDashboardModal } from "@/components/landing/footer-dashboard-modal";
import { useAuth } from "@/contexts/auth-context";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowRight,
  Heart,
  Shield,
  Award,
  Users,
  CreditCard,
  Globe,
  Star,
  Send,
  ExternalLink
} from "lucide-react";

const footerLinks = {
  categories: {
    title: "CATEGORIES",
    links: [
      { name: "Retail Pharmacy", href: "/retail-dashboard", internal: true },
      { name: "Hospital Systems", href: "/hospital-dashboard", internal: true },
      { name: "Academia & R&D", href: "/academia-dashboard", internal: true },
      { name: "Industry Solutions", href: "/industry-dashboard", internal: true }
    ]
  },
  information: {
    title: "INFORMATION",
    links: [
      { name: "Features", href: "#features", internal: true },
      { name: "Pricing", href: "#pricing", internal: true },
      { name: "Contact Us", href: "#contact", internal: true }
    ]
  },
  account: {
    title: "MY ACCOUNT",
    links: [
      { name: "Login", href: "/auth/login", internal: true },
      { name: "Sign Up", href: "/auth/signup", internal: true },
      { name: "Dashboard", href: "/dashboard", internal: true },
      { name: "Profile", href: "/profile", internal: true },
      { name: "Support", href: "/support", internal: true }
    ]
  },
  contact: {
    title: "CONTACT US",
    details: [
      { icon: MapPin, text: "Zuruu Pharmaceutics, XYZ (Coming Soon)", href: "#" },
      { icon: Phone, text: "Call Us Now: 03287989758", href: "tel:03287989758" },
      { icon: Mail, text: "Email: junaidbutt123909@gmail.com", href: "mailto:junaidbutt123909@gmail.com" }
    ]
  }
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/zuruupharmaceutics" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/zuruupharmaceutics" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/zuruupharmaceutics" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/zuruupharmaceutics" }
];

const paymentMethods = [
  { name: "Visa", icon: CreditCard },
  { name: "MasterCard", icon: CreditCard },
  { name: "American Express", icon: CreditCard },
  { name: "PayPal", icon: CreditCard }
];

const navigationLinks: any[] = [];

export function FooterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState<'industry' | 'retail' | 'academia' | 'hospital'>('industry');
  const [footerDashboardModalOpen, setFooterDashboardModalOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLinkClick = (href: string, internal: boolean) => {
    if (internal) {
      if (href.startsWith('/')) {
        // Check if it's a dashboard link that requires access code
        if (href.includes('-dashboard')) {
          const dashboardType = href.split('/')[1].split('-')[0] as 'industry' | 'retail' | 'academia' | 'hospital';
          setSelectedDashboard(dashboardType);
          setAccessModalOpen(true);
        } else if (href === '/dashboard') {
          // Show footer dashboard modal for main dashboard link
          setFooterDashboardModalOpen(true);
        } else {
          router.push(href);
        }
      } else if (href.startsWith('#')) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        variant: "destructive",
        title: "Email Required",
        description: "Please enter your email address.",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Successfully Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  const handleContactClick = (href: string) => {
    if (href.startsWith('tel:')) {
      window.location.href = href;
    } else if (href.startsWith('mailto:')) {
      window.location.href = href;
    } else {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  const handleDashboardSelect = (dashboardType: string, mode: string) => {
    // This will trigger the same login flow as the hero section
    // The mode will be set and user will be redirected to appropriate dashboard
    if (mode === 'patient' || mode === 'pharmacist') {
      router.push('/dashboard');
    } else if (mode === 'hospital') {
      router.push('/hospital-dashboard');
    }
  };

  return (
    <footer ref={ref} className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(147,51,234,0.1),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Main Footer Content - Layout 1: Multi-column */}
        <motion.div
          className="py-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  <span className="text-blue-400">ZURUU</span>
                </h3>
                <p className="text-gray-400 text-sm">pharmaceutical platform</p>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex gap-3 mb-6">
                {socialLinks.map((social, index) => (
                  <motion.button
                    key={social.name}
                    onClick={() => window.open(social.href, '_blank', 'noopener,noreferrer')}
                    className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    title={`Follow us on ${social.name}`}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                {footerLinks.categories.title}
              </h4>
              <ul className="space-y-3">
                {footerLinks.categories.links.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <button
                      onClick={() => handleLinkClick(link.href, link.internal)}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm text-left"
                    >
                      {link.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Information */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                {footerLinks.information.title}
              </h4>
              <ul className="space-y-3">
                {footerLinks.information.links.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <button
                      onClick={() => handleLinkClick(link.href, link.internal)}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm text-left"
                    >
                      {link.name}
                    </button>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <button
                    onClick={() => handleLinkClick("/blog", true)}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm text-left"
                  >
                    Blog
                  </button>
                </motion.li>
              </ul>
            </motion.div>

            {/* My Account */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                {footerLinks.account.title}
              </h4>
              <ul className="space-y-3">
                {isAuthenticated ? (
                  // Show user profile and logout when authenticated
                  <>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                      className="flex items-center gap-3 mb-4"
                    >
                      {user?.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt={user.firstName || 'User'}
                          className="w-8 h-8 rounded-full border-2 border-blue-400"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                          {(user?.firstName?.[0] || 'U')}
                        </div>
                      )}
                      <div>
                        <div className="text-white text-sm font-medium">
                          {user?.firstName} {user?.lastName}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {user?.email}
                        </div>
                      </div>
                    </motion.li>
                    
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                    >
                      <button
                        onClick={() => router.push('/profile')}
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm text-left flex items-center gap-2"
                      >
                        <Users className="w-4 h-4" />
                        My Profile
                      </button>
                    </motion.li>
                    
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.9 }}
                    >
                      <button
                        onClick={() => router.push('/dashboard')}
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm text-left flex items-center gap-2"
                      >
                        <Globe className="w-4 h-4" />
                        Dashboard
                      </button>
                    </motion.li>
                    
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 1.0 }}
                    >
                      <button
                        onClick={() => router.push('/support')}
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm text-left flex items-center gap-2"
                      >
                        <Heart className="w-4 h-4" />
                        Support
                      </button>
                    </motion.li>
                    
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 1.1 }}
                    >
                      <button
                        onClick={() => {
                          logout();
                          toast({
                            title: "Logged out successfully",
                            description: "You have been logged out of your account.",
                          });
                        }}
                        className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm text-left flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.li>
                  </>
                ) : (
                  // Show login/signup when not authenticated
                  footerLinks.account.links.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    >
                      <button
                        onClick={() => handleLinkClick(link.href, link.internal)}
                        className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm text-left"
                      >
                        {link.name}
                      </button>
                    </motion.li>
                  ))
                )}
              </ul>
            </motion.div>

            {/* Contact Us */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                {footerLinks.contact.title}
              </h4>
              <div className="space-y-3">
                {footerLinks.contact.details.map((detail, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleContactClick(detail.href)}
                    className="flex items-start gap-2 text-gray-300 text-sm hover:text-blue-400 transition-colors duration-300 text-left w-full"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  >
                    <detail.icon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>{detail.text}</span>
                    <ExternalLink className="w-3 h-3 ml-1 mt-0.5 flex-shrink-0" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-800"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        />

        {/* Bottom Section - Layout 2: Horizontal with Navigation */}
        <motion.div
          className="py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Left: Brand */}
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold text-white">
                <span className="text-blue-400">ZURUU</span>
              </h3>
              <p className="text-gray-400 text-sm">pharmaceutical platform</p>
            </div>

            {/* Center: Navigation */}
            <motion.div
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              {navigationLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href, link.internal)}
                  className={`text-sm transition-colors duration-300 ${
                    index === 0 ? 'text-blue-400 font-semibold' : 'text-gray-300 hover:text-blue-400'
                  }`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 1.8 + index * 0.1 }}
                >
                  {link.name}
                </motion.button>
              ))}
            </motion.div>

            {/* Right: Newsletter & Payment Methods */}
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              {/* Newsletter Subscription */}
              <motion.form
                onSubmit={handleNewsletterSubmit}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 2.2 }}
              >
                <Input
                  type="email"
                  placeholder="Subscribe to newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-48 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-400"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Send className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </motion.form>

              {/* Payment Methods */}
              <div className="flex items-center gap-3">
                {paymentMethods.map((payment, index) => (
                  <motion.div
                    key={payment.name}
                    className="w-8 h-8 bg-white rounded flex items-center justify-center"
                    whileHover={{ scale: 1.1, y: -2 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.4, delay: 2.4 + index * 0.1 }}
                    title={payment.name}
                  >
                    <payment.icon className="w-4 h-4 text-gray-600" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Final Bottom Bar */}
        <motion.div
          className="border-t border-gray-800 py-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 2.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              className="flex items-center gap-3 text-gray-400 text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 2.6 }}
            >
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>for healthcare professionals</span>
            </motion.div>
            
            <motion.div
              className="text-gray-400 text-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 2.8 }}
            >
              © 2025 Zuruu Pharmaceutics. All rights reserved.
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Dashboard Access Modal */}
      <DashboardAccessModal
        isOpen={accessModalOpen}
        onClose={() => setAccessModalOpen(false)}
        dashboardType={selectedDashboard}
        onSuccess={(dashboardType) => {
          router.push(`/${dashboardType}-dashboard`);
        }}
      />

      {/* Footer Dashboard Modal */}
      <FooterDashboardModal
        isOpen={footerDashboardModalOpen}
        onClose={() => setFooterDashboardModalOpen(false)}
        onDashboardSelect={handleDashboardSelect}
      />
    </footer>
  );
}