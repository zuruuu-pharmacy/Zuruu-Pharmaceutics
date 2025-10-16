"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  RefreshCw, 
  Package, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  ArrowRight,
  Calendar,
  Activity,
  DollarSign,
  ShoppingCart,
  Shield,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
  sparkline?: number[];
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, changeType, icon: Icon, color, sparkline }) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-[var(--c-accent-600)]';
      case 'negative': return 'text-[var(--c-error-600)]';
      default: return 'text-[var(--c-neutral-600)]';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive': return <TrendingUp className="w-3 h-3" />;
      case 'negative': return <TrendingDown className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--c-neutral-600)] uppercase tracking-wide">
                {title}
              </p>
              <p className="text-3xl font-bold text-[var(--c-neutral-900)] mt-2">
                {value}
              </p>
              <div className={`flex items-center space-x-1 mt-2 ${getChangeColor()}`}>
                {getChangeIcon()}
                <span className="text-sm font-medium">{change}</span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${color}20` }}>
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
          </div>
          {sparkline && (
            <div className="mt-4 h-8 flex items-end space-x-1">
              {sparkline.map((value, index) => (
                <div
                  key={index}
                  className="flex-1 bg-[var(--c-primary-200)] rounded-sm"
                  style={{ height: `${(value / Math.max(...sparkline)) * 100}%` }}
                />
              ))}
            </div>
          )}
          <Button variant="ghost" size="sm" className="mt-4 p-0 h-auto text-[var(--c-primary-600)] hover:text-[var(--c-primary-700)]">
            View details <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AlertChip: React.FC<{ title: string; count: number; severity: 'critical' | 'high' | 'info' }> = ({ title, count, severity }) => {
  const getSeverityColor = () => {
    switch (severity) {
      case 'critical': return 'bg-[var(--c-error-100)] text-[var(--c-error-700)] border-[var(--c-error-200)]';
      case 'high': return 'bg-[var(--c-warning-100)] text-[var(--c-warning-700)] border-[var(--c-warning-200)]';
      case 'info': return 'bg-[var(--c-info-100)] text-[var(--c-info-700)] border-[var(--c-info-200)]';
      default: return 'bg-[var(--c-neutral-100)] text-[var(--c-neutral-700)] border-[var(--c-neutral-200)]';
    }
  };

  return (
    <motion.div
      className={`inline-flex items-center px-3 py-2 rounded-lg border cursor-pointer hover:shadow-md transition-all ${getSeverityColor()}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="font-medium">{count}</span>
      <span className="ml-1 text-sm">{title}</span>
    </motion.div>
  );
};

const DataTable: React.FC<{ title: string; data: any[]; columns: any[] }> = ({ title, data, columns }) => {
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  sortable={column.sortable}
                  sortDirection={sortField === column.key ? sortDirection : null}
                  onSort={column.sortable ? () => handleSort(column.key) : undefined}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} interactive>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export function OverviewDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const kpiData = [
    {
      title: 'Total Patients',
      value: '1,247',
      change: '+8% from last month',
      changeType: 'positive' as const,
      icon: Users,
      color: 'var(--c-info-500)',
      sparkline: [65, 70, 68, 75, 80, 85, 88]
    },
    {
      title: 'Prescriptions Today',
      value: '89',
      change: '+12% from yesterday',
      changeType: 'positive' as const,
      icon: FileText,
      color: 'var(--c-primary-500)',
      sparkline: [45, 50, 48, 55, 60, 65, 70]
    },
    {
      title: 'Refills Due',
      value: '23',
      change: '-3% from last week',
      changeType: 'negative' as const,
      icon: RefreshCw,
      color: 'var(--c-warning-500)',
      sparkline: [30, 28, 25, 22, 20, 18, 15]
    },
    {
      title: 'Inventory Health',
      value: 'Good',
      change: '5 items low stock',
      changeType: 'neutral' as const,
      icon: Package,
      color: 'var(--c-accent-500)',
      sparkline: [85, 88, 90, 87, 92, 89, 91]
    }
  ];

  const alertData = [
    { title: 'prescriptions awaiting verification', count: 5, severity: 'critical' as const },
    { title: 'batches expiring in 7 days', count: 3, severity: 'high' as const },
    { title: 'ADR reports this week', count: 2, severity: 'info' as const },
    { title: 'controlled substance activities', count: 1, severity: 'info' as const }
  ];

  const upcomingRefillsData = [
    { patient: 'John Doe', medication: 'Metformin 500mg', dueDate: '2024-01-20', daysLeft: 2, status: 'urgent' },
    { patient: 'Sarah Wilson', medication: 'Lisinopril 10mg', dueDate: '2024-01-22', daysLeft: 4, status: 'upcoming' },
    { patient: 'Michael Brown', medication: 'Atorvastatin 20mg', dueDate: '2024-01-25', daysLeft: 7, status: 'upcoming' },
    { patient: 'Emily Davis', medication: 'Omeprazole 20mg', dueDate: '2024-01-28', daysLeft: 10, status: 'upcoming' }
  ];

  const lowStockData = [
    { medication: 'Amoxicillin 500mg', currentStock: 18, reorderPoint: 50, status: 'critical' },
    { medication: 'Ibuprofen 400mg', currentStock: 35, reorderPoint: 100, status: 'low' },
    { medication: 'Paracetamol 500mg', currentStock: 12, reorderPoint: 75, status: 'critical' },
    { medication: 'Aspirin 100mg', currentStock: 45, reorderPoint: 80, status: 'low' }
  ];

  const recentPrescriptionsData = [
    { id: 'RX-0456', patient: 'John Doe', medication: 'Metformin 500mg', prescriber: 'Dr. Smith', date: '2024-01-15', status: 'dispensed' },
    { id: 'RX-0457', patient: 'Sarah Wilson', medication: 'Lisinopril 10mg', prescriber: 'Dr. Johnson', date: '2024-01-15', status: 'verified' },
    { id: 'RX-0458', patient: 'Michael Brown', medication: 'Atorvastatin 20mg', prescriber: 'Dr. Davis', date: '2024-01-14', status: 'dispensed' },
    { id: 'RX-0459', patient: 'Emily Davis', medication: 'Omeprazole 20mg', prescriber: 'Dr. Wilson', date: '2024-01-14', status: 'pending' }
  ];

  const upcomingRefillsColumns = [
    { key: 'patient', label: 'Patient', sortable: true },
    { key: 'medication', label: 'Medication', sortable: true },
    { key: 'dueDate', label: 'Due Date', sortable: true },
    { key: 'daysLeft', label: 'Days Left', sortable: true },
    { key: 'status', label: 'Status', sortable: false, render: (value: string) => (
      <Badge variant={value === 'urgent' ? 'destructive' : 'warning'}>
        {value}
      </Badge>
    ) }
  ];

  const lowStockColumns = [
    { key: 'medication', label: 'Medication', sortable: true },
    { key: 'currentStock', label: 'Current Stock', sortable: true },
    { key: 'reorderPoint', label: 'Reorder Point', sortable: true },
    { key: 'status', label: 'Status', sortable: false, render: (value: string) => (
      <Badge variant={value === 'critical' ? 'destructive' : 'warning'}>
        {value}
      </Badge>
    ) }
  ];

  const recentPrescriptionsColumns = [
    { key: 'id', label: 'Prescription ID', sortable: true },
    { key: 'patient', label: 'Patient', sortable: true },
    { key: 'medication', label: 'Medication', sortable: true },
    { key: 'prescriber', label: 'Prescriber', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'status', label: 'Status', sortable: false, render: (value: string) => (
      <Badge variant={value === 'dispensed' ? 'success' : value === 'verified' ? 'info' : 'warning'}>
        {value}
      </Badge>
    ) }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1">Dashboard Overview</h1>
          <p className="text-body mt-2">
            Welcome back! Here's what's happening at your pharmacy today.
          </p>
        </div>
        <div className="text-right">
          <p className="text-small text-[var(--c-neutral-600)]">Current Time</p>
          <p className="text-lg font-semibold text-[var(--c-neutral-900)]">
            {currentTime.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Alerts Carousel */}
      <motion.div
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {alertData.map((alert, index) => (
          <AlertChip key={index} {...alert} />
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Interactions & Prescriptions Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Patient Interactions & Prescriptions Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-[var(--c-neutral-50)] rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Activity className="w-12 h-12 text-[var(--c-neutral-400)] mx-auto mb-2" />
                  <p className="text-sm text-[var(--c-neutral-500)]">Line Chart Placeholder</p>
                  <p className="text-xs text-[var(--c-neutral-400)]">Patient interactions over time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top-selling Categories */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Top-selling Categories</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-[var(--c-neutral-50)] rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-[var(--c-neutral-400)] mx-auto mb-2" />
                  <p className="text-sm text-[var(--c-neutral-500)]">Bar Chart Placeholder</p>
                  <p className="text-xs text-[var(--c-neutral-400)]">Top drug categories by sales</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Mid-row Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Low Stock Items', count: 4, icon: Package, color: 'var(--c-warning-500)' },
          { title: 'Expiry Soon', count: 3, icon: Calendar, color: 'var(--c-error-500)' },
          { title: 'Pending Verifications', count: 5, icon: CheckCircle, color: 'var(--c-info-500)' },
          { title: 'ADR Reports', count: 2, icon: AlertTriangle, color: 'var(--c-accent-500)' }
        ].map((tile, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[var(--c-neutral-600)]">{tile.title}</p>
                    <p className="text-2xl font-bold text-[var(--c-neutral-900)] mt-1">{tile.count}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${tile.color}20` }}>
                    <tile.icon className="w-5 h-5" style={{ color: tile.color }} />
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="mt-3 p-0 h-auto text-[var(--c-primary-600)]">
                  View <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <DataTable
            title="Upcoming Refills"
            data={upcomingRefillsData}
            columns={upcomingRefillsColumns}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <DataTable
            title="Low Stock Medicines"
            data={lowStockData}
            columns={lowStockColumns}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <DataTable
          title="Recent Prescriptions"
          data={recentPrescriptionsData}
          columns={recentPrescriptionsColumns}
        />
      </motion.div>
    </div>
  );
}
