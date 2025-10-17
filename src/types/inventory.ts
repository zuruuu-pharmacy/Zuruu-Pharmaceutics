export interface DrugMaster {
  id: string;
  brandName: string;
  genericName: string;
  dosageForm: 'tablet' | 'capsule' | 'syrup' | 'injection' | 'cream' | 'drops' | 'inhaler' | 'patch' | 'other';
  strength: string;
  packageSize: string;
  therapeuticCategory: string;
  manufacturer: string;
  supplier: string;
  purchaseCost: number;
  retailPrice: number;
  margin: number;
  storageConditions: {
    temperature: string;
    humidity: string;
    lightSensitive: boolean;
    refrigerated: boolean;
  };
  barcode?: string;
  qrCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StockItem {
  id: string;
  drugMasterId: string;
  drugMaster: DrugMaster;
  batchNumber: string;
  expiryDate: Date;
  quantity: number;
  minimumLevel: number;
  maximumLevel: number;
  currentLevel: 'normal' | 'low' | 'critical' | 'overstock';
  location: string;
  shelf: string;
  status: 'active' | 'expired' | 'recalled' | 'quarantined';
  lastUpdated: Date;
  lastAudit: Date;
  costPrice: number;
  sellingPrice: number;
  supplier: string;
  purchaseDate: Date;
  invoiceNumber?: string;
}

export interface StockTransaction {
  id: string;
  stockItemId: string;
  type: 'purchase' | 'sale' | 'return' | 'adjustment' | 'wastage' | 'transfer';
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  reason?: string;
  reference?: string; // invoice number, prescription ID, etc.
  performedBy: string;
  performedAt: Date;
  notes?: string;
  cost?: number;
  sellingPrice?: number;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  leadTime: number; // days
  minimumOrderQuantity: number;
  paymentTerms: string;
  rating: number;
  reliability: number;
  lastOrderDate?: Date;
  totalOrders: number;
  onTimeDeliveryRate: number;
  defectRate: number;
  isActive: boolean;
}

export interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplier: Supplier;
  orderNumber: string;
  orderDate: Date;
  expectedDeliveryDate: Date;
  status: 'draft' | 'sent' | 'confirmed' | 'partial' | 'completed' | 'cancelled';
  items: PurchaseOrderItem[];
  totalAmount: number;
  notes?: string;
  createdBy: string;
  approvedBy?: string;
  approvedAt?: Date;
  receivedAt?: Date;
}

export interface PurchaseOrderItem {
  id: string;
  drugMasterId: string;
  drugMaster: DrugMaster;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  receivedQuantity?: number;
  notes?: string;
}

export interface ExpiryAlert {
  id: string;
  stockItemId: string;
  stockItem: StockItem;
  alertType: 'expiring_30_days' | 'expiring_60_days' | 'expiring_90_days' | 'expired';
  daysToExpiry: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  isRead: boolean;
  createdAt: Date;
  suggestedAction: 'discount' | 'return_to_supplier' | 'transfer' | 'dispose';
}

export interface LowStockAlert {
  id: string;
  stockItemId: string;
  stockItem: StockItem;
  currentQuantity: number;
  minimumLevel: number;
  suggestedReorderQuantity: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  isRead: boolean;
  createdAt: Date;
  supplier?: string;
  estimatedCost?: number;
}

export interface DemandForecast {
  id: string;
  drugMasterId: string;
  drugMaster: DrugMaster;
  forecastPeriod: '7_days' | '30_days' | '90_days';
  predictedDemand: number;
  confidence: number; // 0-100
  factors: {
    historicalSales: number;
    seasonalTrend: number;
    prescriptionTrend: number;
    diseaseOutbreak: number;
  };
  generatedAt: Date;
  validUntil: Date;
}

export interface InventoryAnalytics {
  totalItems: number;
  totalValue: number;
  expiringSoon: number;
  lowStockItems: number;
  overstockItems: number;
  stockoutRisk: number;
  averageTurnover: number;
  wastagePercentage: number;
  topSellingItems: Array<{
    drugMaster: DrugMaster;
    quantitySold: number;
    revenue: number;
  }>;
  slowMovingItems: Array<{
    drugMaster: DrugMaster;
    daysInStock: number;
    lastSold?: Date;
  }>;
  categoryBreakdown: Array<{
    category: string;
    count: number;
    value: number;
    percentage: number;
  }>;
  supplierPerformance: Array<{
    supplier: Supplier;
    onTimeDelivery: number;
    defectRate: number;
    averageLeadTime: number;
  }>;
}

export interface StockAudit {
  id: string;
  auditDate: Date;
  auditor: string;
  items: StockAuditItem[];
  discrepancies: number;
  totalValue: number;
  status: 'in_progress' | 'completed' | 'reviewed';
  notes?: string;
}

export interface StockAuditItem {
  id: string;
  stockItemId: string;
  stockItem: StockItem;
  expectedQuantity: number;
  actualQuantity: number;
  variance: number;
  varianceValue: number;
  notes?: string;
}

export interface InventorySettings {
  lowStockThreshold: number; // percentage
  expiryAlertDays: number[];
  autoReorderEnabled: boolean;
  autoReorderThreshold: number;
  barcodeScanningEnabled: boolean;
  qrCodeScanningEnabled: boolean;
  temperatureMonitoringEnabled: boolean;
  humidityMonitoringEnabled: boolean;
  defaultSupplier: string;
  currency: string;
  timezone: string;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  retentionPeriod: number; // days
}
