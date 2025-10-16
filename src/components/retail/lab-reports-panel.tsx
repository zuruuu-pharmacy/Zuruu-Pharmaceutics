"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload,
  Filter,
  Search,
  Download,
  Share2,
  FileText,
  Heart,
  TestTube,
  Activity,
  Eye,
  Calendar,
  User,
  Building,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Stethoscope,
  Microscope,
  Zap,
  Brain,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  MoreVertical
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
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Types and interfaces
interface LabReport {
  id: string;
  testName: string;
  testType: 'chemistry' | 'hematology' | 'cardiology' | 'endocrinology' | 'microbiology';
  date: string;
  status: 'normal' | 'abnormal' | 'pending';
  doctor: string;
  lab: string;
  results: LabResult[];
  pdfUrl?: string;
  notes?: string;
}

interface LabResult {
  parameter: string;
  result: string;
  normalRange: string;
  status: 'normal' | 'high' | 'low' | 'critical';
  unit: string;
  value: number;
}

interface TrendData {
  date: string;
  value: number;
  parameter: string;
}

// Mock data
const mockLabReports: LabReport[] = [
  {
    id: '1',
    testName: 'Lipid Profile Test',
    testType: 'chemistry',
    date: '2024-01-15',
    status: 'normal',
    doctor: 'Dr. Sarah Johnson',
    lab: 'MedLab Central',
    results: [
      { parameter: 'Total Cholesterol', result: '185', normalRange: '< 200', status: 'normal', unit: 'mg/dL', value: 185 },
      { parameter: 'HDL Cholesterol', result: '55', normalRange: '> 40', status: 'normal', unit: 'mg/dL', value: 55 },
      { parameter: 'LDL Cholesterol', result: '110', normalRange: '< 100', status: 'high', unit: 'mg/dL', value: 110 },
      { parameter: 'Triglycerides', result: '95', normalRange: '< 150', status: 'normal', unit: 'mg/dL', value: 95 }
    ]
  },
  {
    id: '2',
    testName: 'Complete Blood Count',
    testType: 'hematology',
    date: '2024-01-10',
    status: 'normal',
    doctor: 'Dr. Michael Chen',
    lab: 'Health Diagnostics',
    results: [
      { parameter: 'Hemoglobin', result: '14.2', normalRange: '12-16', status: 'normal', unit: 'g/dL', value: 14.2 },
      { parameter: 'White Blood Cells', result: '7.5', normalRange: '4.5-11.0', status: 'normal', unit: 'K/μL', value: 7.5 },
      { parameter: 'Platelets', result: '285', normalRange: '150-450', status: 'normal', unit: 'K/μL', value: 285 },
      { parameter: 'Red Blood Cells', result: '4.8', normalRange: '4.0-5.5', status: 'normal', unit: 'M/μL', value: 4.8 }
    ]
  },
  {
    id: '3',
    testName: 'HbA1c Test',
    testType: 'endocrinology',
    date: '2024-01-05',
    status: 'abnormal',
    doctor: 'Dr. Emily Rodriguez',
    lab: 'Diabetes Care Center',
    results: [
      { parameter: 'HbA1c', result: '7.8', normalRange: '< 7.0', status: 'high', unit: '%', value: 7.8 },
      { parameter: 'Fasting Glucose', result: '145', normalRange: '70-100', status: 'high', unit: 'mg/dL', value: 145 }
    ]
  },
  {
    id: '4',
    testName: 'ECG Test',
    testType: 'cardiology',
    date: '2024-01-20',
    status: 'pending',
    doctor: 'Dr. James Wilson',
    lab: 'Cardio Diagnostics',
    results: [
      { parameter: 'Heart Rate', result: '72', normalRange: '60-100', status: 'normal', unit: 'bpm', value: 72 },
      { parameter: 'PR Interval', result: '0.16', normalRange: '0.12-0.20', status: 'normal', unit: 's', value: 0.16 }
    ]
  }
];

const mockTrendData: TrendData[] = [
  { date: '2023-10-15', value: 8.2, parameter: 'HbA1c' },
  { date: '2023-12-15', value: 8.0, parameter: 'HbA1c' },
  { date: '2024-01-05', value: 7.8, parameter: 'HbA1c' }
];

export default function LabReportsPanel() {
  const [selectedReport, setSelectedReport] = useState<LabReport | null>(mockLabReports[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [testTypeFilter, setTestTypeFilter] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
  const [showMobileViewer, setShowMobileViewer] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter reports based on search and filters
  const filteredReports = mockLabReports.filter(report => {
    const matchesSearch = report.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.date.includes(searchQuery);
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === 'recent' && new Date(report.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ||
                       (dateFilter === 'older' && new Date(report.date) <= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    const matchesType = testTypeFilter === 'all' || report.testType === testTypeFilter;
    
    return matchesSearch && matchesDate && matchesType;
  });

  const getTestIcon = (testType: string) => {
    switch (testType) {
      case 'chemistry': return <TestTube className="w-5 h-5" />;
      case 'hematology': return <Activity className="w-5 h-5" />;
      case 'cardiology': return <Heart className="w-5 h-5" />;
      case 'endocrinology': return <Stethoscope className="w-5 h-5" />;
      case 'microbiology': return <Microscope className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
      case 'abnormal': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getResultStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600';
      case 'high': return 'text-red-600';
      case 'low': return 'text-orange-600';
      case 'critical': return 'text-red-800 font-bold';
      default: return 'text-gray-600';
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
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Lab Reports & Diagnostics</h1>
        <p className="text-gray-600">View and analyze your diagnostic test results</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Button className="bg-teal-600 hover:bg-teal-700 text-white">
          <Upload className="w-4 h-4 mr-2" />
          Upload Report
        </Button>
        
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter by Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dates</SelectItem>
            <SelectItem value="recent">Last 30 Days</SelectItem>
            <SelectItem value="older">Older</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={testTypeFilter} onValueChange={setTestTypeFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Sort by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="chemistry">Chemistry</SelectItem>
            <SelectItem value="hematology">Hematology</SelectItem>
            <SelectItem value="cardiology">Cardiology</SelectItem>
            <SelectItem value="endocrinology">Endocrinology</SelectItem>
            <SelectItem value="microbiology">Microbiology</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );

  const renderReportsList = () => (
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
          placeholder="Search by test name or date..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Reports List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:border-teal-300 ${
                selectedReport?.id === report.id ? 'border-2 border-teal-600 shadow-md' : 'border-gray-200'
              }`}
              onClick={() => {
                setSelectedReport(report);
                if (isMobile) setShowMobileViewer(true);
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
                    {getTestIcon(report.testType)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{report.testName}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">{new Date(report.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <User className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-600">{report.doctor}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={getStatusColor(report.status)}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </Badge>
                    {compareMode && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (selectedForCompare.includes(report.id)) {
                            setSelectedForCompare(prev => prev.filter(id => id !== report.id));
                          } else if (selectedForCompare.length < 2) {
                            setSelectedForCompare(prev => [...prev, report.id]);
                          }
                        }}
                        className={`w-8 h-8 p-0 ${
                          selectedForCompare.includes(report.id) 
                            ? 'bg-teal-600 text-white border-teal-600' 
                            : ''
                        }`}
                      >
                        {selectedForCompare.includes(report.id) ? '✓' : '+'}
                      </Button>
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

  const renderReportViewer = () => {
    if (!selectedReport) return null;

    return (
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* Report Header */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                  {selectedReport.testName}
                </CardTitle>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Date: {new Date(selectedReport.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Doctor: {selectedReport.doctor}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>Lab: {selectedReport.lab}</span>
                  </div>
                </div>
              </div>
              <Badge className={getStatusColor(selectedReport.status)}>
                {selectedReport.status.charAt(0).toUpperCase() + selectedReport.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="trend">Trend Chart</TabsTrigger>
            <TabsTrigger value="pdf">PDF Report</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Parameter</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Result</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Normal Range</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedReport.results.map((result, index) => (
                        <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                          <td className="py-3 px-4 font-medium text-gray-900">{result.parameter}</td>
                          <td className="py-3 px-4">
                            <span className="font-semibold">{result.result}</span>
                            <span className="text-gray-500 ml-1">{result.unit}</span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{result.normalRange}</td>
                          <td className="py-3 px-4">
                            <span className={`font-semibold ${getResultStatusColor(result.status)}`}>
                              {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trend" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#009688" 
                        strokeWidth={3}
                        dot={{ fill: '#009688', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pdf" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>PDF Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF Report Available</h3>
                  <p className="text-gray-600 mb-4">Download the complete lab report in PDF format</p>
                  <div className="flex justify-center space-x-3">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share with Pharmacist
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    );
  };

  const renderAIInsights = () => (
    <motion.div
      className="bg-teal-50 border border-teal-200 rounded-lg p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="flex items-start space-x-3">
        <Brain className="w-5 h-5 text-teal-600 mt-0.5" />
        <div>
          <h4 className="font-semibold text-teal-800 mb-1">AI Summary Insight</h4>
          <p className="text-sm text-teal-700">
            Your HbA1c levels have improved by 12% since last test. Trend is positive and shows good medication adherence.
          </p>
        </div>
      </div>
    </motion.div>
  );

  const renderExportOptions = () => (
    <motion.div
      className="flex flex-wrap gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
    >
      <Button variant="outline" className="shadow-sm">
        <Download className="w-4 h-4 mr-2" />
        Download All Reports (PDF)
      </Button>
      <Button variant="outline" className="shadow-sm">
        <Share2 className="w-4 h-4 mr-2" />
        Send to Doctor
      </Button>
      <Button variant="outline" className="shadow-sm">
        <Plus className="w-4 h-4 mr-2" />
        Add Note
      </Button>
    </motion.div>
  );

  if (isMobile) {
    return (
      <div className="space-y-6">
        {renderHeader()}
        
        {!showMobileViewer ? (
          <div>
            {renderReportsList()}
            {renderAIInsights()}
            {renderExportOptions()}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                onClick={() => setShowMobileViewer(false)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Reports</span>
              </Button>
            </div>
            {renderReportViewer()}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {renderHeader()}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Reports List */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Lab Reports</CardTitle>
            </CardHeader>
            <CardContent>
              {renderReportsList()}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Report Viewer */}
        <div>
          {selectedReport ? (
            <div>
              {renderReportViewer()}
              {renderAIInsights()}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Report</h3>
                <p className="text-gray-600">Choose a lab report from the list to view detailed results</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {renderExportOptions()}
    </div>
  );
}
