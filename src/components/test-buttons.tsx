"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

export const TestButtons = () => {
  const handlePreviewPO = () => {
    console.log('Preview PO clicked - TEST');
    alert('Preview PO Test - This should work!');
  };

  const handleQueueRestock = () => {
    console.log('Queue Restock clicked - TEST');
    alert('Queue Restock Test - This should work!');
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Test Buttons</h2>
      <div className="flex space-x-4">
        <Button onClick={handlePreviewPO} variant="outline">
          Test Preview PO
        </Button>
        <Button onClick={handleQueueRestock} className="bg-green-600 hover:bg-green-700">
          Test Queue Restock
        </Button>
      </div>
    </div>
  );
};
