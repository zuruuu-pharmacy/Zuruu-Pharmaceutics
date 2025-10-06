"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Package, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  DollarSign,
  Truck,
  Settings,
  RefreshCw,
  Download,
  Eye,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { industryDataService } from '@/services/industry-data-service';

interface RestockRecommendation {
  id: string;
  skuId: string;
  skuName: string;
  currentStock: number;
  recommendedQuantity: number;
  reason: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  estimatedCost: number;
  costPerUnit: number;
  supplier: string;
  leadTime: number;
  confidence: number;
  category: string;
  lastOrderDate?: Date;
  status: 'pending' | 'approved' | 'rejected' | 'ordered';
}

interface RestockWorkflow {
  step: number;
  totalSteps: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export function AutoRestockRecommendations() {
  const [recommendations, setRecommendations] = useState<RestockRecommendation[]>([]);
  const [selectedRecommendations, setSelectedRecommendations] = useState<string[]>([]);
  const [workflowStep, setWorkflowStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [autoApprove, setAutoApprove] = useState(false);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const workflowSteps: RestockWorkflow[] = [
    { step: 1, totalSteps: 4, title: 'AI Analysis', description: 'Analyzing demand patterns and stock levels', isCompleted: true },
    { step: 2, totalSteps: 4, title: 'Recommendations', description: 'Generating restock recommendations', isCompleted: true },
    { step: 3, totalSteps: 4, title: 'Review & Approve', description: 'Review recommendations and approve orders', isCompleted: false },
    { step: 4, totalSteps: 4, title: 'Order Processing', description: 'Processing approved orders with suppliers', isCompleted: false }
  ];

  useEffect(() => {
    console.log('AutoRestockRecommendations component mounted');
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    console.log('Loading recommendations...');
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const skuData = industryDataService.getSKUData();
    console.log('SKU Data loaded:', skuData.length, 'items');
    const restockData = industryDataService.getRestockRecommendations(
      skuData.filter(sku => sku.flagStatus === 'LOW_STOCK').map(sku => sku.id)
    );
    console.log('Restock data loaded:', restockData.length, 'recommendations');
    
    const recommendationsData: RestockRecommendation[] = restockData.map(rec => {
      const sku = skuData.find(s => s.id === rec.skuId);
      const costPerUnit = sku?.costPerUnit || Math.random() * 50 + 5;
      return {
        id: `rec-${rec.skuId}`,
        skuId: rec.skuId,
        skuName: rec.skuName,
        currentStock: rec.currentStock,
        recommendedQuantity: rec.recommendedQuantity,
        reason: rec.reason,
        priority: rec.priority,
        estimatedCost: rec.estimatedCost,
        costPerUnit: costPerUnit,
        supplier: rec.supplier,
        leadTime: rec.leadTime,
        confidence: Math.random() * 20 + 75,
        category: sku?.category || 'Unknown',
        status: 'pending'
      };
    });
    
    setRecommendations(recommendationsData);
    setIsProcessing(false);
  };

  const handleSelectRecommendation = (id: string, selected: boolean) => {
    console.log('Select recommendation:', id, 'selected:', selected);
    if (selected) {
      setSelectedRecommendations(prev => [...prev, id]);
    } else {
      setSelectedRecommendations(prev => prev.filter(recId => recId !== id));
    }
    console.log('Selected recommendations after change:', selectedRecommendations);
  };

  const handleApproveRecommendations = async () => {
    console.log('Queue Restock clicked, selectedRecommendations:', selectedRecommendations);
    if (selectedRecommendations.length === 0) {
      alert('Please select items to restock');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate approval process with realistic steps
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate PO generation
      const poNumber = `PO-${Date.now().toString().slice(-6)}`;
      const selectedItems = recommendations.filter(rec => selectedRecommendations.includes(rec.id));
      const totalCost = selectedItems.reduce((sum, item) => sum + item.estimatedCost, 0);
      const totalQuantity = selectedItems.reduce((sum, item) => sum + item.recommendedQuantity, 0);
      
      console.log(`Generated Purchase Order: ${poNumber}`);
      console.log(`Selected Items:`, selectedItems);
      
      // Update recommendations
      setRecommendations(prev => prev.map(rec => 
        selectedRecommendations.includes(rec.id) 
          ? { ...rec, status: 'approved' as const }
          : rec
      ));
      
      setSelectedRecommendations([]);
      setWorkflowStep(4);
      setIsProcessing(false);
      
      // Show detailed success notification
      const successMessage = `✅ RESTOCK ORDER QUEUED SUCCESSFULLY!

📋 Purchase Order Details:
PO Number: ${poNumber}
Date: ${new Date().toLocaleString()}
Status: APPROVED & QUEUED

📦 Order Summary:
• Items: ${selectedItems.length}
• Total Quantity: ${totalQuantity.toLocaleString()} units
• Total Cost: $${totalCost.toLocaleString()}
• Supplier: ${selectedItems[0]?.supplier || 'Multiple'}

🚚 Next Steps:
1. Order sent to supplier for processing
2. Expected delivery: ${selectedItems[0]?.leadTime || 7} days
3. You'll receive updates via email
4. Track progress in the dashboard

The restock order has been successfully queued and will be processed by the supplier.`;
      
      alert(successMessage);
      
    } catch (error) {
      console.error('Error processing restock order:', error);
      setIsProcessing(false);
      alert('❌ Error processing restock order. Please try again.');
    }
  };

  const handleRejectRecommendations = () => {
    setRecommendations(prev => prev.map(rec => 
      selectedRecommendations.includes(rec.id) 
        ? { ...rec, status: 'rejected' as const }
        : rec
    ));
    setSelectedRecommendations([]);
  };

  const handlePreviewPO = () => {
    console.log('Preview PO clicked, selectedRecommendations:', selectedRecommendations);
    if (selectedRecommendations.length === 0) {
      alert('⚠️ Please select items to preview Purchase Order');
      return;
    }

    const poNumber = `PO-${Date.now().toString().slice(-6)}`;
    const selectedItems = recommendations.filter(rec => selectedRecommendations.includes(rec.id));
    const totalCost = selectedItems.reduce((sum, item) => sum + item.estimatedCost, 0);
    const totalQuantity = selectedItems.reduce((sum, item) => sum + item.recommendedQuantity, 0);
    const suppliers = [...new Set(selectedItems.map(item => item.supplier))];
    const avgLeadTime = Math.round(selectedItems.reduce((sum, item) => sum + item.leadTime, 0) / selectedItems.length);

    const poPreview = `
📋 PURCHASE ORDER PREVIEW
═══════════════════════════════════════════════════════════════

📄 ORDER DETAILS:
PO Number: ${poNumber}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
Status: DRAFT - Ready for Approval
Generated By: AI Restock System

🏢 SUPPLIER INFORMATION:
${suppliers.map(supplier => `• ${supplier}`).join('\n')}
${suppliers.length > 1 ? `\nNote: Order will be split across ${suppliers.length} suppliers` : ''}

📦 ITEMS TO ORDER:
${selectedItems.map((item, index) => `
${index + 1}. ${item.skuName}
   SKU ID: ${item.skuId}
   Category: ${item.category}
   Current Stock: ${item.currentStock} units
   Recommended Qty: ${item.recommendedQuantity} units
   Unit Cost: $${item.costPerUnit.toFixed(2)}
   Line Total: $${item.estimatedCost.toLocaleString()}
   Priority: ${item.priority}
   Lead Time: ${item.leadTime} days
   Confidence: ${item.confidence.toFixed(1)}%
   Reason: ${item.reason}
`).join('')}

💰 FINANCIAL SUMMARY:
Total Items: ${selectedItems.length}
Total Quantity: ${totalQuantity.toLocaleString()} units
Subtotal: $${(totalCost * 0.95).toLocaleString()}
Shipping & Handling: $${(totalCost * 0.05).toLocaleString()}
TOTAL COST: $${totalCost.toLocaleString()}

⏰ DELIVERY ESTIMATE:
Average Lead Time: ${avgLeadTime} days
Expected Delivery: ${new Date(Date.now() + avgLeadTime * 24 * 60 * 60 * 1000).toLocaleDateString()}

✅ NEXT STEPS:
1. Review all items and quantities
2. Click "Queue Restock" to approve
3. Order will be sent to suppliers
4. Track progress in dashboard
5. Receive delivery notifications

💡 TIP: You can modify quantities or remove items before approving.
    `;

    alert(poPreview);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'text-red-600 bg-red-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      case 'LOW': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'ordered': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const totalCost = recommendations
    .filter(rec => selectedRecommendations.includes(rec.id))
    .reduce((sum, rec) => sum + rec.estimatedCost, 0);

  const totalQuantity = recommendations
    .filter(rec => selectedRecommendations.includes(rec.id))
    .reduce((sum, rec) => sum + rec.recommendedQuantity, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Auto-Restock AI</h2>
          <p className="text-gray-600">Intelligent restock recommendations with cost optimization</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadRecommendations} disabled={isProcessing} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isProcessing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Workflow Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Restock Workflow</h3>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setWorkflowStep(Math.max(1, workflowStep - 1))}
                disabled={workflowStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                size="sm"
                onClick={() => setWorkflowStep(Math.min(4, workflowStep + 1))}
                disabled={workflowStep === 4}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
          <div className="flex space-x-4">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex-1 ${workflowStep >= step.step ? 'opacity-100' : 'opacity-50'}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    workflowStep > step.step ? 'bg-green-500 text-white' :
                    workflowStep === step.step ? 'bg-blue-500 text-white' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {workflowStep > step.step ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-bold">{step.step}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{step.title}</p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className="h-px bg-gray-200 mt-4 ml-4" />
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Recommendations</p>
                  <p className="text-2xl font-bold">{recommendations.length}</p>
                </div>
                <Package className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-red-600">
                    {recommendations.filter(rec => rec.priority === 'HIGH').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Selected Items</p>
                  <p className="text-2xl font-bold">{selectedRecommendations.length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Cost</p>
                  <p className="text-2xl font-bold">${totalCost.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recommendations List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Restock Recommendations</CardTitle>
              {selectedRecommendations.length > 0 && (
                <p className="text-sm text-green-600 font-medium mt-1">
                  ✓ {selectedRecommendations.length} item{selectedRecommendations.length !== 1 ? 's' : ''} selected
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => {
                    console.log('Preview PO button clicked');
                    handlePreviewPO();
                  }}
                  disabled={selectedRecommendations.length === 0}
                  variant="outline"
                  size="sm"
                  className="transition-all duration-200 hover:bg-blue-50 hover:border-blue-300"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview PO
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => {
                    console.log('Queue Restock button clicked');
                    handleApproveRecommendations();
                  }}
                  disabled={selectedRecommendations.length === 0 || isProcessing}
                  size="sm"
                  className="transition-all duration-200 bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  Queue Restock ({selectedRecommendations.length})
                </Button>
              </motion.div>
              <Button
                onClick={handleRejectRecommendations}
                disabled={selectedRecommendations.length === 0}
                variant="outline"
                size="sm"
              >
                <X className="w-4 h-4 mr-2" />
                Reject Selected
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <AnimatePresence>
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 border rounded-lg transition-all duration-200 ${
                    selectedRecommendations.includes(rec.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <input
                        type="checkbox"
                        checked={selectedRecommendations.includes(rec.id)}
                        onChange={(e) => handleSelectRecommendation(rec.id, e.target.checked)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{rec.skuName}</h3>
                          <Badge className={getPriorityColor(rec.priority)}>
                            {rec.priority}
                          </Badge>
                          <Badge className={getStatusColor(rec.status)}>
                            {rec.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{rec.reason}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Current Stock:</span>
                            <span className="ml-1 font-medium">{rec.currentStock}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Recommended:</span>
                            <span className="ml-1 font-medium">{rec.recommendedQuantity}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Lead Time:</span>
                            <span className="ml-1 font-medium">{rec.leadTime} days</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Cost:</span>
                            <span className="ml-1 font-medium">${rec.estimatedCost.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-500">Confidence</span>
                            <span className="font-medium">{rec.confidence}%</span>
                          </div>
                          <Progress value={rec.confidence} className="h-2" />
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowDetails(showDetails === rec.id ? null : rec.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {showDetails === rec.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Supplier Information</h4>
                          <p className="text-sm text-gray-600">Supplier: {rec.supplier}</p>
                          <p className="text-sm text-gray-600">Category: {rec.category}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">AI Analysis</h4>
                          <p className="text-sm text-gray-600">Confidence: {rec.confidence}%</p>
                          <p className="text-sm text-gray-600">Priority: {rec.priority}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Order Summary */}
      {selectedRecommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold">{selectedRecommendations.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Quantity</p>
                  <p className="text-2xl font-bold">{totalQuantity.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Cost</p>
                  <p className="text-2xl font-bold">${totalCost.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button onClick={handleApproveRecommendations} disabled={isProcessing}>
                  {isProcessing ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  Process Order
                </Button>
                <Button variant="outline" onClick={() => setSelectedRecommendations([])}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear Selection
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}