"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Eye, RefreshCw } from 'lucide-react';

export const AutoRestockSimple = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const mockRecommendations = [
    { id: '1', name: 'Paracetamol 500mg', sku: 'SKU-001', quantity: 100, cost: 500 },
    { id: '2', name: 'Ibuprofen 400mg', sku: 'SKU-002', quantity: 150, cost: 750 },
    { id: '3', name: 'Aspirin 100mg', sku: 'SKU-003', quantity: 200, cost: 1000 },
  ];

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handlePreviewPO = () => {
    console.log('Preview PO clicked');
    if (selectedItems.length === 0) {
      alert('Please select items first');
      return;
    }
    
    const selectedData = mockRecommendations.filter(item => selectedItems.includes(item.id));
    const totalCost = selectedData.reduce((sum, item) => sum + item.cost, 0);
    
    alert(`Preview PO:\n\nItems: ${selectedData.length}\nTotal Cost: $${totalCost}\n\nSelected Items:\n${selectedData.map(item => `- ${item.name} (${item.sku})`).join('\n')}`);
  };

  const handleQueueRestock = async () => {
    console.log('Queue Restock clicked');
    if (selectedItems.length === 0) {
      alert('Please select items first');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const selectedData = mockRecommendations.filter(item => selectedItems.includes(item.id));
    const totalCost = selectedData.reduce((sum, item) => sum + item.cost, 0);
    
    alert(`✅ Restock Order Queued!\n\nPO Number: PO-${Date.now().toString().slice(-6)}\nItems: ${selectedData.length}\nTotal Cost: $${totalCost}\n\nOrder has been sent to suppliers.`);
    
    setSelectedItems([]);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Simple Auto-Restock Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecommendations.map(item => (
              <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                  className="h-4 w-4"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">SKU: {item.sku} | Qty: {item.quantity} | Cost: ${item.cost}</p>
                </div>
              </div>
            ))}
            
            <div className="flex space-x-4 pt-4">
              <Button
                onClick={handlePreviewPO}
                disabled={selectedItems.length === 0}
                variant="outline"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview PO
              </Button>
              
              <Button
                onClick={handleQueueRestock}
                disabled={selectedItems.length === 0 || isProcessing}
                className="bg-green-600 hover:bg-green-700"
              >
                {isProcessing ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4 mr-2" />
                )}
                Queue Restock ({selectedItems.length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
