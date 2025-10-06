// Industry Data Service - Real data processing and calculations

export interface SKUData {
  id: string;
  name: string;
  currentStock: number;
  predictedStockoutDays: number;
  avgLeadTime: number;
  traceability: number;
  latestBatch: string;
  origin: string;
  latestLocation: string;
  flagStatus: 'OK' | 'LOW_STOCK' | 'RECALL';
  forecast7d: number;
  forecast30d: number;
  forecast90d: number;
  category: string;
  supplier: string;
  costPerUnit: number;
  lastUpdated: Date;
}

export interface KPIData {
  predictedStockouts: number;
  avgLeadTime: number;
  batchTraceability: number;
  totalInventoryValue: number;
  criticalSKUs: number;
  onTimeDelivery: number;
}

export interface RestockRecommendation {
  skuId: string;
  skuName: string;
  currentStock: number;
  recommendedQuantity: number;
  reason: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  estimatedCost: number;
  supplier: string;
  leadTime: number;
}

export interface BatchTimeline {
  id: string;
  skuId: string;
  batchId: string;
  stages: BatchStage[];
  totalDuration: number;
  status: 'IN_TRANSIT' | 'DELIVERED' | 'DELAYED' | 'RECALLED';
}

export interface BatchStage {
  name: string;
  location: string;
  timestamp: Date;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'DELAYED';
  duration: number;
  notes?: string;
}

class IndustryDataService {
  private skuData: SKUData[] = [];
  private kpiData: KPIData | null = null;
  private restockQueue: string[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Generate realistic SKU data
    this.skuData = this.generateSKUData();
    this.kpiData = this.calculateKPIs();
  }

  private generateSKUData(): SKUData[] {
    const categories = [
      'Analgesics', 'Antibiotics', 'Cardiovascular', 'Diabetes', 'Respiratory',
      'Gastrointestinal', 'Neurological', 'Dermatological', 'Hormonal', 'Vitamins'
    ];

    const suppliers = [
      'PharmaSupply Inc.', 'MediCorp Ltd.', 'HealthTech Solutions', 'BioPharm Co.',
      'Global Medical', 'Precision Pharma', 'Advanced Therapeutics', 'Quality Meds'
    ];

    const origins = ['Factory A', 'Factory B', 'Factory C', 'Factory D'];
    const locations = ['Warehouse X', 'Warehouse Y', 'Warehouse Z', 'Retail Store'];

    const data: SKUData[] = [];
    
    for (let i = 1; i <= 100; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const supplier = suppliers[Math.floor(Math.random() * suppliers.length)];
      const origin = origins[Math.floor(Math.random() * origins.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      
      const currentStock = Math.floor(Math.random() * 500) + 50;
      const avgLeadTime = Math.random() * 10 + 3;
      const traceability = Math.random() * 10 + 90;
      const predictedStockoutDays = Math.floor(Math.random() * 20) + 1;
      
      const flagStatus = this.determineFlagStatus(currentStock, predictedStockoutDays);
      
      data.push({
        id: `SKU-${String(i).padStart(6, '0')}`,
        name: this.generateDrugName(category),
        currentStock,
        predictedStockoutDays,
        avgLeadTime: Number(avgLeadTime.toFixed(1)),
        traceability: Math.round(traceability),
        latestBatch: `BATCH-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
        origin,
        latestLocation: location,
        flagStatus,
        forecast7d: Math.floor(currentStock * 0.8 + Math.random() * 100),
        forecast30d: Math.floor(currentStock * 2.5 + Math.random() * 300),
        forecast90d: Math.floor(currentStock * 7.5 + Math.random() * 900),
        category,
        supplier,
        costPerUnit: Math.random() * 50 + 5,
        lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
      });
    }

    return data;
  }

  private generateDrugName(category: string): string {
    const drugNames = {
      'Analgesics': ['Paracetamol', 'Ibuprofen', 'Aspirin', 'Naproxen', 'Diclofenac'],
      'Antibiotics': ['Amoxicillin', 'Ciprofloxacin', 'Azithromycin', 'Cephalexin', 'Doxycycline'],
      'Cardiovascular': ['Metoprolol', 'Lisinopril', 'Atorvastatin', 'Amlodipine', 'Losartan'],
      'Diabetes': ['Metformin', 'Insulin', 'Glipizide', 'Pioglitazone', 'Sitagliptin'],
      'Respiratory': ['Albuterol', 'Fluticasone', 'Montelukast', 'Prednisone', 'Theophylline'],
      'Gastrointestinal': ['Omeprazole', 'Ranitidine', 'Famotidine', 'Lansoprazole', 'Pantoprazole'],
      'Neurological': ['Gabapentin', 'Pregabalin', 'Carbamazepine', 'Phenytoin', 'Valproic Acid'],
      'Dermatological': ['Hydrocortisone', 'Clotrimazole', 'Miconazole', 'Ketoconazole', 'Terbinafine'],
      'Hormonal': ['Levothyroxine', 'Prednisolone', 'Dexamethasone', 'Hydrocortisone', 'Fludrocortisone'],
      'Vitamins': ['Vitamin D', 'Vitamin B12', 'Folic Acid', 'Vitamin C', 'Multivitamin']
    };

    const names = drugNames[category as keyof typeof drugNames] || ['Generic Drug'];
    const baseName = names[Math.floor(Math.random() * names.length)];
    const strength = Math.floor(Math.random() * 1000) + 50;
    const unit = Math.random() > 0.5 ? 'mg' : 'mcg';
    
    return `${baseName} ${strength}${unit}`;
  }

  private determineFlagStatus(currentStock: number, stockoutDays: number): 'OK' | 'LOW_STOCK' | 'RECALL' {
    if (stockoutDays <= 3) return 'LOW_STOCK';
    if (Math.random() < 0.02) return 'RECALL'; // 2% chance of recall
    return 'OK';
  }

  private calculateKPIs(): KPIData {
    const lowStockSKUs = this.skuData.filter(sku => sku.flagStatus === 'LOW_STOCK').length;
    const recallSKUs = this.skuData.filter(sku => sku.flagStatus === 'RECALL').length;
    const totalInventoryValue = this.skuData.reduce((sum, sku) => sum + (sku.currentStock * sku.costPerUnit), 0);
    const avgLeadTime = this.skuData.reduce((sum, sku) => sum + sku.avgLeadTime, 0) / this.skuData.length;
    const avgTraceability = this.skuData.reduce((sum, sku) => sum + sku.traceability, 0) / this.skuData.length;

    return {
      predictedStockouts: lowStockSKUs + recallSKUs,
      avgLeadTime: Number(avgLeadTime.toFixed(1)),
      batchTraceability: Math.round(avgTraceability),
      totalInventoryValue: Math.round(totalInventoryValue),
      criticalSKUs: recallSKUs,
      onTimeDelivery: Math.random() * 20 + 80 // 80-100%
    };
  }

  // Public methods
  public getSKUData(): SKUData[] {
    return this.skuData;
  }

  public getKPIData(): KPIData {
    return this.kpiData!;
  }

  public searchSKUs(query: string): SKUData[] {
    if (!query.trim()) return this.skuData;
    
    const lowercaseQuery = query.toLowerCase();
    return this.skuData.filter(sku => 
      sku.id.toLowerCase().includes(lowercaseQuery) ||
      sku.name.toLowerCase().includes(lowercaseQuery) ||
      sku.category.toLowerCase().includes(lowercaseQuery) ||
      sku.supplier.toLowerCase().includes(lowercaseQuery)
    );
  }

  public filterSKUsByStatus(status: string): SKUData[] {
    if (status === 'ALL') return this.skuData;
    return this.skuData.filter(sku => sku.flagStatus === status);
  }

  public getRestockRecommendations(selectedSKUs: string[]): RestockRecommendation[] {
    return selectedSKUs.map(skuId => {
      const sku = this.skuData.find(s => s.id === skuId);
      if (!sku) return null;

      const recommendedQuantity = Math.max(0, sku.forecast7d - sku.currentStock);
      const priority = sku.predictedStockoutDays <= 3 ? 'HIGH' : 
                     sku.predictedStockoutDays <= 7 ? 'MEDIUM' : 'LOW';
      
      const reason = priority === 'HIGH' ? 'Critical stock level - immediate restock required' :
                    priority === 'MEDIUM' ? 'Low stock level - restock recommended' :
                    'Preventive restock based on demand forecast';

      return {
        skuId: sku.id,
        skuName: sku.name,
        currentStock: sku.currentStock,
        recommendedQuantity,
        reason,
        priority,
        estimatedCost: recommendedQuantity * sku.costPerUnit,
        supplier: sku.supplier,
        leadTime: sku.avgLeadTime
      };
    }).filter(Boolean) as RestockRecommendation[];
  }

  public generateBatchTimeline(skuId: string): BatchTimeline {
    const sku = this.skuData.find(s => s.id === skuId);
    if (!sku) throw new Error('SKU not found');

    const timelineId = `timeline-${skuId}-${Date.now()}`;

    const stages: BatchStage[] = [
      {
        name: 'Manufacturing',
        location: sku.origin,
        timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        status: 'COMPLETED',
        duration: 3,
        notes: 'Quality control passed'
      },
      {
        name: 'Packaging',
        location: sku.origin,
        timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
        status: 'COMPLETED',
        duration: 1,
        notes: 'Batch packaged and labeled'
      },
      {
        name: 'Port Transit',
        location: 'Port of Entry',
        timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        status: 'COMPLETED',
        duration: 2,
        notes: 'Customs clearance completed'
      },
      {
        name: 'Warehouse Storage',
        location: sku.latestLocation,
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: 'COMPLETED',
        duration: 1,
        notes: 'Temperature controlled storage'
      },
      {
        name: 'Retail Distribution',
        location: 'Retail Store',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: 'IN_PROGRESS',
        duration: 0.5,
        notes: 'Ready for sale'
      }
    ];

    return {
      id: timelineId,
      skuId: sku.id,
      batchId: sku.latestBatch,
      stages,
      totalDuration: 7.5,
      status: 'IN_TRANSIT'
    };
  }

  public queueRestock(skuIds: string[]): void {
    this.restockQueue.push(...skuIds);
  }

  public getRestockQueue(): string[] {
    return this.restockQueue;
  }

  public clearRestockQueue(): void {
    this.restockQueue = [];
  }

  public exportToCSV(): string {
    const headers = [
      'sku_id', 'sku_name', 'current_stock', 'predicted_stockout_days', 'avg_lead_time',
      'traceability_coverage', 'last_batch', 'origin', 'latest_location', 'flag_status',
      'forecast_7d', 'forecast_30d', 'forecast_90d', 'category', 'supplier', 'cost_per_unit'
    ];

    const csvContent = [
      headers.join(','),
      ...this.skuData.map(sku => [
        sku.id,
        `"${sku.name}"`,
        sku.currentStock,
        sku.predictedStockoutDays,
        sku.avgLeadTime,
        `${sku.traceability}%`,
        sku.latestBatch,
        sku.origin,
        sku.latestLocation,
        sku.flagStatus,
        sku.forecast7d,
        sku.forecast30d,
        sku.forecast90d,
        sku.category,
        sku.supplier,
        sku.costPerUnit
      ].join(','))
    ].join('\n');

    return csvContent;
  }

  public updateKPIs(): void {
    this.kpiData = this.calculateKPIs();
  }

  public refreshData(): void {
    this.initializeData();
  }
}

// Export singleton instance
export const industryDataService = new IndustryDataService();
