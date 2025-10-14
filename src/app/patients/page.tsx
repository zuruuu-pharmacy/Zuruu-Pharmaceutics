"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function PatientDashboard() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Simple Header */}
      <motion.header
        className="relative bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-500 text-white rounded-xl mx-4 mt-4 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center">
          <motion.h1
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Patient Dashboard
          </motion.h1>
          <motion.p
            className="text-xl text-blue-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Welcome to your healthcare management portal
          </motion.p>
        </div>
      </motion.header>

      {/* Main Content Area */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Build Your Features
            </h2>
            <p className="text-gray-600 mb-8">
              This is a clean slate. You can now start building your patient dashboard features from scratch.
            </p>
            
            {/* Placeholder for future features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Feature 1</h3>
                <p className="text-gray-500">Add your first feature here</p>
              </div>
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Feature 2</h3>
                <p className="text-gray-500">Add your second feature here</p>
              </div>
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Feature 3</h3>
                <p className="text-gray-500">Add your third feature here</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Back to Home Button */}
      <motion.div
        className="fixed bottom-6 left-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <button
          onClick={handleBackToHome}
          className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center space-x-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </motion.div>
    </div>
  );
}