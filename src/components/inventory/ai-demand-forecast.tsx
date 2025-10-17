"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  LineChart, 
  PieChart, 
  Activity, 
  Zap, 
  Brain, 
  Target, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  Download, 
  Settings, 
  Eye, 
  Filter, 
  Search,
  ArrowUp,
  ArrowDown,
  Minus,
  Clock,
  DollarSign,
  Package,
  Users,
  Thermometer,
  Droplets,
  Sun,
  CloudRain,
  Wind
} from 'lucide-react';

import { DemandForecast, DrugMaster, StockItem } from '@/types/inventory';

interface AIDemandForecastProps {
  onGenerateForecast: (drugMasterId: string, period: string) => void;
  onViewDetails: (forecast: DemandForecast) => void;
  onExportForecast: (forecast: DemandForecast) => void;
}

export default function AIDemandForecast({ 
  onGenerateForecast, 
  onViewDetails, 
  onExportForecast 
}: AIDemandForecastProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'7_days' | '30_days' | '90_days'>('30_days');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [forecasts, setForecasts] = useState<DemandForecast[]>([
    {
      id: '1',
      drugMasterId: 'dm1',
      drugMaster: {
        id: 'dm1',
        brandName: 'Metformin',
        genericName: 'Metformin HCl',
        dosageForm: 'tablet',
        strength: '500mg',
        packageSize: '100 tablets',
        therapeuticCategory: 'Antidiabetic',
        manufacturer: 'ABC Pharma',
        supplier: 'MedSupply Co',
        purchaseCost: 150,
        retailPrice: 200,
        margin: 33.3,
        storageConditions: {
          temperature: 'Room Temperature',
          humidity: 'Normal',
          lightSensitive: false,
          refrigerated: false
        },
        barcode: '1234567890123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      forecastPeriod: '30_days',
      predictedDemand: 150,
      confidence: 87,
      factors: {
        historicalSales: 120,
        seasonalTrend: 10,
        prescriptionTrend: 15,
        diseaseOutbreak: 5
      },
      generatedAt: new Date(),
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      drugMasterId: 'dm2',
      drugMaster: {
        id: 'dm2',
        brandName: 'Amoxicillin',
        genericName: 'Amoxicillin',
        dosageForm: 'capsule',
        strength: '250mg',
        packageSize: '50 capsules',
        therapeuticCategory: 'Antibiotic',
        manufacturer: 'XYZ Pharma',
        supplier: 'HealthSupply',
        purchaseCost: 300,
        retailPrice: 400,
        margin: 33.3,
        storageConditions: {
          temperature: 'Room Temperature',
          humidity: 'Normal',
          lightSensitive: false,
          refrigerated: false
        },
        barcode: '2345678901234',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      forecastPeriod: '30_days',
      predictedDemand: 85,
      confidence: 92,
      factors: {
        historicalSales: 80,
        seasonalTrend: 5,
        prescriptionTrend: 8,
        diseaseOutbreak: 12
      },
      generatedAt: new Date(),
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  ]);

  const [weatherData] = useState({
    temperature: 28,
    humidity: 65,
    condition: 'sunny',
    pressure: 1013,
    windSpeed: 12
  });

  const [diseaseTrends] = useState([
    { disease: 'Diabetes', trend: 'increasing', percentage: 15 },
    { disease: 'Hypertension', trend: 'stable', percentage: 2 },
    { disease: 'Respiratory Infections', trend: 'increasing', percentage: 25 },
    { disease: 'Gastrointestinal', trend: 'decreasing', percentage: -8 }
  ]);

  const handleGenerateForecast = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 90) return <CheckCircle className="w-4 h-4" />;
    if (confidence >= 70) return <AlertTriangle className="w-4 h-4" />;
    return <AlertTriangle className="w-4 h-4" />;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <ArrowUp className="w-4 h-4 text-red-500" />;
      case 'decreasing': return <ArrowDown className="w-4 h-4 text-green-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'cloudy': return <CloudRain className="w-5 h-5 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-5 h-5 text-blue-500" />;
      default: return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Bot className="w-8 h-8 text-teal-600" />
            <span>AI Demand Forecasting</span>
          </h2>
          <p className="text-gray-600">Machine learning-powered demand prediction and stock optimization</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={handleGenerateForecast}
            disabled={isGenerating}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            <Brain className="w-4 h-4" />
            <span>{isGenerating ? 'Generating...' : 'Generate Forecast'}</span>
          </button>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weather Impact */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Thermometer className="w-5 h-5 text-blue-500" />
            <span>Weather Impact</span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Temperature</span>
              <span className="font-medium">{weatherData.temperature}°C</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Humidity</span>
              <span className="font-medium">{weatherData.humidity}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Condition</span>
              <div className="flex items-center space-x-1">
                {getWeatherIcon(weatherData.condition)}
                <span className="font-medium capitalize">{weatherData.condition}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Impact:</strong> High temperature may increase demand for electrolyte solutions and heat-related medications.
              </p>
            </div>
          </div>
        </div>

        {/* Disease Trends */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Activity className="w-5 h-5 text-red-500" />
            <span>Disease Trends</span>
          </h3>
          <div className="space-y-3">
            {diseaseTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{trend.disease}</span>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(trend.trend)}
                  <span className={`text-sm font-medium ${
                    trend.percentage > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {trend.percentage > 0 ? '+' : ''}{trend.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Model Status */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-500" />
            <span>AI Model Status</span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Model Version</span>
              <span className="font-medium">v2.1.3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Accuracy</span>
              <span className="font-medium text-green-600">94.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Training</span>
              <span className="font-medium">2 days ago</span>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Status:</strong> Model is performing optimally with high accuracy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Forecast Controls</h3>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Forecast Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="7_days">7 Days</option>
              <option value="30_days">30 Days</option>
              <option value="90_days">90 Days</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Antidiabetic">Antidiabetic</option>
              <option value="Antibiotic">Antibiotic</option>
              <option value="Analgesic">Analgesic</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search drugs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleGenerateForecast}
              disabled={isGenerating}
              className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              <span>Generate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Forecast Results */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Demand Forecasts</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Predicted Demand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Factors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {forecasts.map((forecast, index) => (
                <motion.tr
                  key={forecast.id}
                  className="hover:bg-gray-50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                        <Package className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{forecast.drugMaster.brandName}</div>
                        <div className="text-sm text-gray-500">{forecast.drugMaster.genericName}</div>
                        <div className="text-xs text-gray-400">{forecast.drugMaster.strength}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <span>120 units</span>
                      <span className="text-xs text-gray-500">(estimated)</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-900">{forecast.predictedDemand} units</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 ${getConfidenceColor(forecast.confidence)}`}>
                      {getConfidenceIcon(forecast.confidence)}
                      <span>{forecast.confidence}%</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>Historical: {forecast.factors.historicalSales}</div>
                      <div>Seasonal: +{forecast.factors.seasonalTrend}%</div>
                      <div>Prescription: +{forecast.factors.prescriptionTrend}%</div>
                      <div>Disease: +{forecast.factors.diseaseOutbreak}%</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      {forecast.predictedDemand > 120 ? (
                        <span className="text-red-600 font-medium">Reorder Required</span>
                      ) : (
                        <span className="text-green-600 font-medium">Stock Sufficient</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onViewDetails(forecast)}
                        className="text-teal-600 hover:text-teal-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onExportForecast(forecast)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Model Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model Sensitivity</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="75"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weather Impact Weight</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="25"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Historical Data Period</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="6_months">6 Months</option>
                    <option value="1_year">1 Year</option>
                    <option value="2_years">2 Years</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Save Settings
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
