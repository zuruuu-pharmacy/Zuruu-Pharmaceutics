"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Truck, Factory, Package, AlertTriangle, XCircle, Clock } from 'lucide-react';

interface BatchStage {
  name: string;
  location: string;
  timestamp: Date;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'DELAYED';
  duration: number;
  notes?: string;
}

interface BatchTimeline {
  id: string;
  skuId: string;
  batchId: string;
  stages: BatchStage[];
  totalDuration: number;
  status: 'IN_TRANSIT' | 'DELIVERED' | 'DELAYED' | 'RECALLED';
}

interface BatchTimelineProps {
  batchMovement: BatchTimeline;
}

const iconMap = {
  'Manufacturing': Factory,
  'Quality Control': CheckCircle,
  'Packaging': Package,
  'In Transit': Truck,
  'Warehouse Storage': Package,
  'Customs Check': Package,
  'Delivery to Retail': Truck,
  'DELAYED': AlertTriangle,
  'COMPLETED': CheckCircle,
  'IN_PROGRESS': Truck,
  'PENDING': Clock,
};

export const BatchTimelineComponent: React.FC<BatchTimelineProps> = ({ batchMovement }) => {
  const totalStages = batchMovement.stages.length;

  return (
    <div className="relative flex flex-col items-start py-6 px-4">
      {batchMovement.stages.map((stage, index) => {
        const IconComponent = iconMap[stage.name as keyof typeof iconMap] || iconMap[stage.status as keyof typeof iconMap] || Package;
        const isFlagged = stage.status === 'DELAYED';
        const isCurrent = stage.status === 'IN_PROGRESS';

        return (
          <div key={index} className="flex items-center w-full mb-8 last:mb-0">
            {/* Line and Dot */}
            <div className="flex flex-col items-center mr-4">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 ${
                  isFlagged ? 'bg-red-500' : (stage.status === 'COMPLETED' ? 'bg-green-500' : 'bg-blue-500')
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.3, duration: 0.5, type: 'spring', stiffness: 200 }}
              >
                <IconComponent className="w-5 h-5 text-white" />
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-500 opacity-75"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
              </motion.div>
              {index < totalStages - 1 && (
                <motion.div
                  className="w-1 bg-gray-300 flex-grow"
                  initial={{ height: 0 }}
                  animate={{ height: '4rem' }}
                  transition={{ delay: index * 0.3 + 0.5, duration: 0.5 }}
                />
              )}
            </div>

            {/* Content */}
            <motion.div
              className={`flex-1 p-4 rounded-lg shadow-md ${isFlagged ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'} border`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 + 0.2, duration: 0.5 }}
            >
              <h4 className={`font-semibold text-lg ${isFlagged ? 'text-red-700' : 'text-gray-800'}`}>
                {stage.name} {isFlagged && '(Flagged)'}
              </h4>
              <p className="text-sm text-gray-600">{stage.location}</p>
              <p className="text-xs text-gray-500 mt-1">
                {stage.timestamp.toLocaleString()}
              </p>
              {isFlagged && (
                <p className="text-xs text-red-600 mt-2 font-medium">
                  Action Required: This batch has been flagged due to a critical issue.
                </p>
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};