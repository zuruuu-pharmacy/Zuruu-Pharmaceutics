"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, AlertCircle, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressItem {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: "completed" | "in-progress" | "pending" | "error";
  icon: React.ComponentType<any>;
}

interface ProgressIndicatorProps {
  item: ProgressItem;
}

function ProgressIcon({ status }: { status: ProgressItem["status"] }) {
  const iconProps = { className: "h-4 w-4" };
  
  switch (status) {
    case "completed":
      return <CheckCircle {...iconProps} className="h-4 w-4 text-green-500" />;
    case "in-progress":
      return <Clock {...iconProps} className="h-4 w-4 text-blue-500" />;
    case "error":
      return <AlertCircle {...iconProps} className="h-4 w-4 text-red-500" />;
    default:
      return <Target {...iconProps} className="h-4 w-4 text-gray-500" />;
  }
}

export function ProgressIndicator({ item }: ProgressIndicatorProps) {
  const { title, description, progress, status, icon: Icon } = item;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="hover:shadow-md transition-all duration-300">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
          <div className="ml-auto">
            <ProgressIcon status={status} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2"
            />
            <motion.div
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {status === "completed" && "✅ Task completed successfully"}
              {status === "in-progress" && "🔄 Currently in progress"}
              {status === "pending" && "⏳ Waiting to start"}
              {status === "error" && "❌ Requires attention"}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ProgressOverview() {
  const progressItems: ProgressItem[] = [
    {
      id: "setup",
      title: "System Setup",
      description: "Initial configuration and user onboarding",
      progress: 100,
      status: "completed",
      icon: CheckCircle,
    },
    {
      id: "patients",
      title: "Patient Management",
      description: "Setting up patient records and data",
      progress: 85,
      status: "in-progress",
      icon: Target,
    },
    {
      id: "training",
      title: "Staff Training",
      description: "Training team on new system features",
      progress: 60,
      status: "in-progress",
      icon: Clock,
    },
    {
      id: "integration",
      title: "System Integration",
      description: "Connecting with external systems",
      progress: 30,
      status: "pending",
      icon: Target,
    },
    {
      id: "security",
      title: "Security Audit",
      description: "Comprehensive security review",
      progress: 0,
      status: "pending",
      icon: AlertCircle,
    },
  ];

  const completedCount = progressItems.filter(item => item.status === "completed").length;
  const totalCount = progressItems.length;
  const overallProgress = (completedCount / totalCount) * 100;

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              System Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">
                  {completedCount}/{totalCount} completed
                </span>
              </div>
              <Progress value={overallProgress} className="h-3" />
              <div className="text-center text-sm text-muted-foreground">
                {Math.round(overallProgress)}% Complete
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-3">
        {progressItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProgressIndicator item={item} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

