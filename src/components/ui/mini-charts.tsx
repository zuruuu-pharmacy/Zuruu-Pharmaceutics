"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Activity, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface MiniChartProps {
  title: string;
  data: ChartData[];
  icon: React.ComponentType<any>;
  trend?: number;
  total?: number;
}

function SimpleBarChart({ data }: { data: ChartData[] }) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="flex items-end space-x-1 h-16">
      {data.map((item, index) => (
        <motion.div
          key={item.label}
          className="flex-1 bg-gradient-to-t from-primary/20 to-primary/40 rounded-t-sm"
          style={{ height: `${(item.value / maxValue) * 100}%` }}
          initial={{ height: 0 }}
          animate={{ height: `${(item.value / maxValue) * 100}%` }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        />
      ))}
    </div>
  );
}

function SimpleLineChart({ data }: { data: ChartData[] }) {
  const maxValue = Math.max(...data.map(d => d.value));
  const points = data.map((item, index) => ({
    x: (index / (data.length - 1)) * 100,
    y: 100 - (item.value / maxValue) * 100,
  }));

  const pathData = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  return (
    <div className="h-16 w-full">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.path
          d={pathData}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        {points.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="2"
            fill="currentColor"
            className="text-primary"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          />
        ))}
      </svg>
    </div>
  );
}

export function MiniChart({ title, data, icon: Icon, trend, total }: MiniChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {total && (
              <div className="text-2xl font-bold">{total.toLocaleString()}</div>
            )}
            <SimpleLineChart data={data} />
            {trend !== undefined && (
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>{trend > 0 ? '+' : ''}{trend}% from last month</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function QuickInsights() {
  const insights = [
    {
      title: "Active Patients",
      data: [
        { label: "Mon", value: 12, color: "blue" },
        { label: "Tue", value: 19, color: "blue" },
        { label: "Wed", value: 15, color: "blue" },
        { label: "Thu", value: 22, color: "blue" },
        { label: "Fri", value: 18, color: "blue" },
        { label: "Sat", value: 8, color: "blue" },
        { label: "Sun", value: 5, color: "blue" },
      ],
      icon: Users,
      trend: 12,
      total: 89,
    },
    {
      title: "Prescriptions Processed",
      data: [
        { label: "Week 1", value: 45, color: "green" },
        { label: "Week 2", value: 52, color: "green" },
        { label: "Week 3", value: 48, color: "green" },
        { label: "Week 4", value: 61, color: "green" },
      ],
      icon: Activity,
      trend: 8,
      total: 206,
    },
    {
      title: "System Health",
      data: [
        { label: "Uptime", value: 99.9, color: "emerald" },
        { label: "Performance", value: 98.5, color: "emerald" },
        { label: "Security", value: 100, color: "emerald" },
      ],
      icon: CheckCircle,
      trend: 0.1,
      total: 99.5,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {insights.map((insight, index) => (
        <MiniChart
          key={insight.title}
          title={insight.title}
          data={insight.data}
          icon={insight.icon}
          trend={insight.trend}
          total={insight.total}
        />
      ))}
    </div>
  );
}

