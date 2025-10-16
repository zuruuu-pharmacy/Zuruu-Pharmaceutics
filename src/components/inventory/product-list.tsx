"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Package, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Download,
  Upload,
  RefreshCw,
  MoreHorizontal,
  Calendar,
  MapPin,
  DollarSign,
  BarChart3,
  FileText,
  Image as ImageIcon,
  QrCode,
  Barcode
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Product {
  id: string;
  sku: string;
  name: string;
  strength: string;
  packSize: string;
  totalUnits: number;
  batches: number;
  expiryNearest: string;
  retailPrice: number;
  costPrice: number;
  supplier: string;
  status: 'inStock' | 'low' | 'critical' | 'outOfStock';
  category: string;
  atcCode: string;
  barcode: string;
  image?: string;
}

interface Batch {
  id: string;
  lotNo: string;
  manufDate: string;
  expiryDate: string;
  units: number;
  warehouseLocation: string;
  qcStatus: 'pending' | 'approved' | 'quarantined' | 'rejected';
  costPerUnit: number;
}

const mockProducts: Product[] = [
  {
    id: '1',
    sku: 'SKU-001',
    name: 'Metformin',
    strength: '500mg',
    packSize: '30 tablets',
    totalUnits: 150,
    batches: 3,
    expiryNearest: '2024-12-15',
    retailPrice: 25.50,
    costPrice: 18.75,
    supplier: 'MedSupply Co.',
    status: 'inStock',
    category: 'Antidiabetic',
    atcCode: 'A10BA02',
    barcode: '1234567890123'
  },
  {
    id: '2',
    sku: 'SKU-002',
    name: 'Amoxicillin',
    strength: '500mg',
    packSize: '21 capsules',
    totalUnits: 18,
    batches: 1,
    expiryNearest: '2024-11-30',
    retailPrice: 45.00,
    costPrice: 32.50,
    supplier: 'PharmaCorp',
    status: 'critical',
    category: 'Antibiotic',
    atcCode: 'J01CA04',
    barcode: '1234567890124'
  },
  {
    id: '3',
    sku: 'SKU-003',
    name: 'Atorvastatin',
    strength: '20mg',
    packSize: '30 tablets',
    totalUnits: 89,
    batches: 2,
    expiryNearest: '2025-06-20',
    retailPrice: 35.75,
    costPrice: 26.25,
    supplier: 'HealthPlus',
    status: 'low',
    category: 'Cardiovascular',
    atcCode: 'C10AA05',
    barcode: '1234567890125'
  }
];

const mockBatches: Batch[] = [
  {
    id: '1',
    lotNo: 'L-2024-001',
    manufDate: '2024-01-15',
    expiryDate: '2024-12-15',
    units: 50,
    warehouseLocation: 'A-1-2',
    qcStatus: 'approved',
    costPerUnit: 18.75
  },
  {
    id: '2',
    lotNo: 'L-2024-002',
    manufDate: '2024-02-01',
    expiryDate: '2025-01-01',
    units: 50,
    warehouseLocation: 'A-1-3',
    qcStatus: 'approved',
    costPerUnit: 18.75
  },
  {
    id: '3',
    lotNo: 'L-2024-003',
    manufDate: '2024-03-01',
    expiryDate: '2025-02-01',
    units: 50,
    warehouseLocation: 'A-1-4',
    qcStatus: 'approved',
    costPerUnit: 18.75
  }
];

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showAddBatch, setShowAddBatch] = useState(false);
  const [showStockAdjust, setShowStockAdjust] = useState(false);

  // Filter and search products
  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.atcCode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort products
    if (sortField) {
      filtered.sort((a, b) => {
        const aValue = a[sortField as keyof Product];
        const bValue = b[sortField as keyof Product];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, filterCategory, filterStatus, sortField, sortDirection]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'inStock': return 'success';
      case 'low': return 'warning';
      case 'critical': return 'destructive';
      case 'outOfStock': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'inStock': return <CheckCircle className="w-4 h-4" />;
      case 'low': return <Clock className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'outOfStock': return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  const calculateMargin = (retail: number, cost: number) => {
    return ((retail - cost) / retail * 100).toFixed(1);
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1">Products / Inventory</h1>
          <p className="text-body mt-2">Manage your pharmaceutical inventory and product catalog</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Expiry Management
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--c-neutral-500)]" />
                <Input
                  type="text"
                  placeholder="Search by product name, SKU, or ATC code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--c-primary-500)] focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="Antidiabetic">Antidiabetic</option>
                <option value="Antibiotic">Antibiotic</option>
                <option value="Cardiovascular">Cardiovascular</option>
                <option value="Analgesic">Analgesic</option>
                <option value="Antihypertensive">Antihypertensive</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--c-primary-500)] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="inStock">In Stock</option>
                <option value="low">Low Stock</option>
                <option value="critical">Critical</option>
                <option value="outOfStock">Out of Stock</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Product Inventory ({filteredProducts.length} products)</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead sortable sortDirection={sortField === 'sku' ? sortDirection : null} onSort={() => handleSort('sku')}>
                    Product ID
                  </TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead sortable sortDirection={sortField === 'name' ? sortDirection : null} onSort={() => handleSort('name')}>
                    Name
                  </TableHead>
                  <TableHead>Strength</TableHead>
                  <TableHead>Pack Size</TableHead>
                  <TableHead sortable sortDirection={sortField === 'totalUnits' ? sortDirection : null} onSort={() => handleSort('totalUnits')}>
                    Total Units
                  </TableHead>
                  <TableHead>Batches</TableHead>
                  <TableHead>Expiry Nearest</TableHead>
                  <TableHead>Price (Retail/Cost)</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead sortable sortDirection={sortField === 'status' ? sortDirection : null} onSort={() => handleSort('status')}>
                    Status
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} interactive>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm">{product.sku}</span>
                        <Button variant="ghost" size="sm" className="p-1">
                          <QrCode className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-12 h-12 bg-[var(--c-neutral-100)] rounded-lg flex items-center justify-center">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <Package className="w-6 h-6 text-[var(--c-neutral-500)]" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-[var(--c-neutral-900)]">{product.name}</p>
                        <p className="text-sm text-[var(--c-neutral-600)]">{product.atcCode}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{product.strength}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{product.packSize}</span>
                    </TableCell>
                    <TableCell>
                      <div className="text-right">
                        <span className="font-medium">{product.totalUnits}</span>
                        <p className="text-xs text-[var(--c-neutral-600)]">units</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{product.batches}</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <span className="text-sm">{product.expiryNearest}</span>
                        <p className={`text-xs ${
                          getDaysUntilExpiry(product.expiryNearest) < 30 
                            ? 'text-[var(--c-error-600)]' 
                            : getDaysUntilExpiry(product.expiryNearest) < 90 
                            ? 'text-[var(--c-warning-600)]' 
                            : 'text-[var(--c-neutral-600)]'
                        }`}>
                          {getDaysUntilExpiry(product.expiryNearest)} days
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-right">
                        <p className="text-sm font-medium">${product.retailPrice}</p>
                        <p className="text-xs text-[var(--c-neutral-600)]">
                          ${product.costPrice} ({calculateMargin(product.retailPrice, product.costPrice)}% margin)
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{product.supplier}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(product.status) as any} className="flex items-center space-x-1 w-fit">
                        {getStatusIcon(product.status)}
                        <span className="capitalize">{product.status.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" className="p-1" onClick={() => {
                          setSelectedProduct(product);
                          setShowProductDetail(true);
                        }}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Product Detail Modal */}
      {showProductDetail && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          batches={mockBatches}
          onClose={() => setShowProductDetail(false)}
          onAddBatch={() => setShowAddBatch(true)}
          onStockAdjust={() => setShowStockAdjust(true)}
        />
      )}

      {/* Add Batch Modal */}
      {showAddBatch && (
        <AddBatchModal
          product={selectedProduct}
          onClose={() => setShowAddBatch(false)}
          onSave={(batch) => {
            // Handle batch save
            setShowAddBatch(false);
          }}
        />
      )}

      {/* Stock Adjust Modal */}
      {showStockAdjust && (
        <StockAdjustModal
          product={selectedProduct}
          onClose={() => setShowStockAdjust(false)}
          onSave={(adjustment) => {
            // Handle stock adjustment
            setShowStockAdjust(false);
          }}
        />
      )}
    </div>
  );
};

// Product Detail Modal Component
const ProductDetailModal: React.FC<{
  product: Product;
  batches: Batch[];
  onClose: () => void;
  onAddBatch: () => void;
  onStockAdjust: () => void;
}> = ({ product, batches, onClose, onAddBatch, onStockAdjust }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[var(--c-surface)] rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        {/* Header */}
        <div className="p-6 border-b border-[var(--c-neutral-200)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[var(--c-primary-100)] rounded-lg flex items-center justify-center">
                <Package className="w-8 h-8 text-[var(--c-primary-600)]" />
              </div>
              <div>
                <h2 className="text-h2">{product.name}</h2>
                <p className="text-body">{product.sku} • {product.atcCode}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[var(--c-neutral-200)]">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'batches', label: 'Batches' },
              { id: 'pricing', label: 'Price & Margin' },
              { id: 'sales', label: 'Sales History' },
              { id: 'alternatives', label: 'Alternatives' },
              { id: 'documents', label: 'Documents' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-[var(--c-primary-500)] text-[var(--c-primary-600)]'
                    : 'border-transparent text-[var(--c-neutral-600)] hover:text-[var(--c-neutral-900)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-h3 mb-4">Product Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[var(--c-neutral-600)]">Strength:</span>
                      <span className="font-medium">{product.strength}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--c-neutral-600)]">Pack Size:</span>
                      <span className="font-medium">{product.packSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--c-neutral-600)]">Category:</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--c-neutral-600)]">ATC Code:</span>
                      <span className="font-medium">{product.atcCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--c-neutral-600)]">Barcode:</span>
                      <span className="font-medium font-mono">{product.barcode}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-h3 mb-4">Current Stock</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[var(--c-neutral-600)]">Total Units:</span>
                      <span className="font-medium">{product.totalUnits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--c-neutral-600)]">Active Batches:</span>
                      <span className="font-medium">{product.batches}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--c-neutral-600)]">Status:</span>
                      <Badge variant="success">In Stock</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--c-neutral-600)]">Supplier:</span>
                      <span className="font-medium">{product.supplier}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button onClick={onAddBatch}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Batch
                </Button>
                <Button variant="outline" onClick={onStockAdjust}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Adjust Stock
                </Button>
                <Button variant="outline">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Flag Recall
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'batches' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-h3">Batch Information</h3>
                <Button onClick={onAddBatch}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Batch
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lot Number</TableHead>
                    <TableHead>Manufacture Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Units</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>QC Status</TableHead>
                    <TableHead>Cost/Unit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batches.map((batch) => (
                    <TableRow key={batch.id}>
                      <TableCell className="font-mono">{batch.lotNo}</TableCell>
                      <TableCell>{batch.manufDate}</TableCell>
                      <TableCell>{batch.expiryDate}</TableCell>
                      <TableCell>{batch.units}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-[var(--c-neutral-500)]" />
                          <span>{batch.warehouseLocation}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={batch.qcStatus === 'approved' ? 'success' : 'warning'}>
                          {batch.qcStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>${batch.costPerUnit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <h3 className="text-h3">Pricing & Margin Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-5 h-5 text-[var(--c-accent-600)]" />
                      <span className="font-medium">Retail Price</span>
                    </div>
                    <p className="text-2xl font-bold">${product.retailPrice}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingDown className="w-5 h-5 text-[var(--c-primary-600)]" />
                      <span className="font-medium">Cost Price</span>
                    </div>
                    <p className="text-2xl font-bold">${product.costPrice}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-[var(--c-accent-600)]" />
                      <span className="font-medium">Margin</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {((product.retailPrice - product.costPrice) / product.retailPrice * 100).toFixed(1)}%
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Add Batch Modal Component
const AddBatchModal: React.FC<{
  product: Product | null;
  onClose: () => void;
  onSave: (batch: any) => void;
}> = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    lotNo: '',
    manufDate: '',
    expiryDate: '',
    units: '',
    warehouseLocation: '',
    costPerUnit: '',
    qcStatus: 'pending'
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[var(--c-surface)] rounded-xl shadow-xl max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="p-6 border-b border-[var(--c-neutral-200)]">
          <h2 className="text-h2">Add New Batch</h2>
          <p className="text-body mt-2">Add a new batch for {product?.name}</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Lot Number"
              value={formData.lotNo}
              onChange={(e) => setFormData({...formData, lotNo: e.target.value})}
              placeholder="L-2024-001"
            />
            <Input
              label="Manufacture Date"
              type="date"
              value={formData.manufDate}
              onChange={(e) => setFormData({...formData, manufDate: e.target.value})}
            />
            <Input
              label="Expiry Date"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
            />
            <Input
              label="Units"
              type="number"
              value={formData.units}
              onChange={(e) => setFormData({...formData, units: e.target.value})}
              placeholder="100"
            />
            <Input
              label="Warehouse Location"
              value={formData.warehouseLocation}
              onChange={(e) => setFormData({...formData, warehouseLocation: e.target.value})}
              placeholder="A-1-2"
            />
            <Input
              label="Cost per Unit"
              type="number"
              step="0.01"
              value={formData.costPerUnit}
              onChange={(e) => setFormData({...formData, costPerUnit: e.target.value})}
              placeholder="18.75"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => onSave(formData)}>
              Add Batch
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Stock Adjust Modal Component
const StockAdjustModal: React.FC<{
  product: Product | null;
  onClose: () => void;
  onSave: (adjustment: any) => void;
}> = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    reason: '',
    quantity: '',
    reference: '',
    notes: ''
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-[var(--c-surface)] rounded-xl shadow-xl max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="p-6 border-b border-[var(--c-neutral-200)]">
          <h2 className="text-h2">Adjust Stock</h2>
          <p className="text-body mt-2">Adjust stock for {product?.name}</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
                Reason
              </label>
              <select
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--c-primary-500)] focus:border-transparent"
              >
                <option value="">Select reason</option>
                <option value="damaged">Damaged</option>
                <option value="expired">Expired</option>
                <option value="returned">Returned</option>
                <option value="theft">Theft</option>
                <option value="adjustment">Manual Adjustment</option>
              </select>
            </div>
            <Input
              label="Quantity Change"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              placeholder="-10 (negative to reduce)"
            />
            <Input
              label="Reference"
              value={formData.reference}
              onChange={(e) => setFormData({...formData, reference: e.target.value})}
              placeholder="Order ID or reference"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--c-neutral-700)] mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full px-3 py-2 border border-[var(--c-neutral-300)] rounded-lg focus:ring-2 focus:ring-[var(--c-primary-500)] focus:border-transparent"
              rows={3}
              placeholder="Additional notes about this adjustment"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => onSave(formData)}>
              Adjust Stock
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductList;
