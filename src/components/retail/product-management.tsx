"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Package, ShoppingCart, TrendingUp, AlertTriangle, CheckCircle, XCircle,
  Plus, Search, Filter, Edit, Trash2, Eye, Download, Upload, Settings, Save,
  RefreshCw, Share2, Lock, Unlock, Copy, ExternalLink, Play, Pause, Stop, Zap,
  Bell, MessageSquare, Heart, Globe, Building, Award, Microscope, TestTube,
  FlaskConical, Atom, Brain, Database, DollarSign, GraduationCap, BookOpen,
  FileText, Shield, Gavel, Scale, Clipboard, Video, Camera, Headphones, Monitor,
  Smartphone, Tablet, UserCheck, UserPlus, Mail, Phone, MapPin, Briefcase,
  Trophy, PieChart, LineChart, BarChart3, Star, Target, Clock, Users, Calendar,
  BarChart, TrendingDown, ArrowUp, ArrowDown, Minus, RotateCcw, RotateCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { faker } from '@faker-js/faker';

interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  cost: number;
  margin: number;
  status: 'Active' | 'Inactive' | 'Discontinued' | 'Draft';
  inventory: number;
  minStock: number;
  maxStock: number;
  reorderPoint: number;
  supplier: string;
  images: string[];
  tags: string[];
  specifications: Record<string, string>;
  variants: ProductVariant[];
  analytics: ProductAnalytics;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  cost: number;
  inventory: number;
  attributes: Record<string, string>;
}

interface ProductAnalytics {
  views: number;
  sales: number;
  revenue: number;
  conversionRate: number;
  averageRating: number;
  reviewCount: number;
  returnRate: number;
  popularity: number;
  trend: 'Increasing' | 'Decreasing' | 'Stable';
  seasonality: number;
}

const generateMockProduct = (id: number): Product => {
  const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Beauty', 'Automotive'];
  const brands = ['Nike', 'Apple', 'Samsung', 'Sony', 'Adidas', 'Microsoft', 'Google', 'Amazon'];
  const statuses: Product['status'][] = ['Active', 'Inactive', 'Discontinued', 'Draft'];
  
  const category = faker.helpers.arrayElement(categories);
  const brand = faker.helpers.arrayElement(brands);
  const status = faker.helpers.arrayElement(statuses);
  
  const cost = faker.number.float({ min: 10, max: 500, precision: 0.01 });
  const price = cost * faker.number.float({ min: 1.2, max: 3.0, precision: 0.01 });
  const margin = ((price - cost) / price) * 100;
  
  const images = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => faker.image.url());
  const tags = Array.from({ length: faker.number.int({ min: 2, max: 6 }) }).map(() => faker.lorem.word());
  
  const variants: ProductVariant[] = Array.from({ length: faker.number.int({ min: 0, max: 5 }) }).map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    sku: faker.string.alphanumeric(8).toUpperCase(),
    price: faker.number.float({ min: cost, max: price * 1.5, precision: 0.01 }),
    cost: faker.number.float({ min: cost * 0.8, max: cost * 1.2, precision: 0.01 }),
    inventory: faker.number.int({ min: 0, max: 1000 }),
    attributes: {
      'Color': faker.helpers.arrayElement(['Red', 'Blue', 'Green', 'Black', 'White']),
      'Size': faker.helpers.arrayElement(['S', 'M', 'L', 'XL', 'XXL']),
      'Material': faker.helpers.arrayElement(['Cotton', 'Polyester', 'Leather', 'Metal', 'Plastic'])
    }
  }));
  
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    sku: faker.string.alphanumeric(8).toUpperCase(),
    description: faker.commerce.productDescription(),
    category,
    brand,
    price,
    cost,
    margin,
    status,
    inventory: faker.number.int({ min: 0, max: 1000 }),
    minStock: faker.number.int({ min: 10, max: 50 }),
    maxStock: faker.number.int({ min: 100, max: 2000 }),
    reorderPoint: faker.number.int({ min: 20, max: 100 }),
    supplier: faker.company.name(),
    images,
    tags,
    specifications: {
      'Weight': `${faker.number.float({ min: 0.1, max: 50, precision: 0.1 })} kg`,
      'Dimensions': `${faker.number.float({ min: 1, max: 100, precision: 0.1 })} x ${faker.number.float({ min: 1, max: 100, precision: 0.1 })} x ${faker.number.float({ min: 1, max: 100, precision: 0.1 })} cm`,
      'Color': faker.helpers.arrayElement(['Red', 'Blue', 'Green', 'Black', 'White']),
      'Material': faker.helpers.arrayElement(['Cotton', 'Polyester', 'Leather', 'Metal', 'Plastic'])
    },
    variants,
    analytics: {
      views: faker.number.int({ min: 0, max: 10000 }),
      sales: faker.number.int({ min: 0, max: 1000 }),
      revenue: faker.number.float({ min: 0, max: 50000, precision: 0.01 }),
      conversionRate: faker.number.float({ min: 0, max: 10, precision: 0.1 }),
      averageRating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
      reviewCount: faker.number.int({ min: 0, max: 500 }),
      returnRate: faker.number.float({ min: 0, max: 0.2, precision: 0.01 }),
      popularity: faker.number.float({ min: 0, max: 100, precision: 0.1 }),
      trend: faker.helpers.arrayElement(['Increasing', 'Decreasing', 'Stable']),
      seasonality: faker.number.float({ min: 0, max: 1, precision: 0.01 })
    },
    createdAt: faker.date.past({ years: 2 }),
    updatedAt: faker.date.recent({ days: 30 })
  };
};

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterBrand, setFilterBrand] = useState<string>('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const mockProducts = Array.from({ length: 40 }, (_, i) => generateMockProduct(i));
    setProducts(mockProducts);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
      const matchesStatus = filterStatus === 'All' || product.status === filterStatus;
      const matchesBrand = filterBrand === 'All' || product.brand === filterBrand;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesBrand;
    });
  }, [products, searchTerm, filterCategory, filterStatus, filterBrand]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Discontinued': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'Increasing': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'Decreasing': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'Stable': return <Minus className="w-4 h-4 text-gray-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-2">Manage product catalog, variants, and performance analytics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => {/* Export functionality */}}
            variant="outline"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Product Name</Label>
                    <Input placeholder="Enter product name" />
                  </div>
                  <div className="space-y-2">
                    <Label>SKU</Label>
                    <Input placeholder="Enter SKU" />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Clothing">Clothing</SelectItem>
                        <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Books">Books</SelectItem>
                        <SelectItem value="Beauty">Beauty</SelectItem>
                        <SelectItem value="Automotive">Automotive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Brand</Label>
                    <Input placeholder="Enter brand" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Enter product description" rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddModalOpen(false)}>
                  Add Product
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {products.filter(p => p.status === 'Active').length} active
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${products.reduce((sum, p) => sum + p.analytics.revenue, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-blue-600">
                {products.reduce((sum, p) => sum + p.analytics.sales, 0)} total sales
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.length > 0 ? (products.reduce((sum, p) => sum + p.analytics.averageRating, 0) / products.length).toFixed(1) : 0}/5
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-yellow-600">
                {products.reduce((sum, p) => sum + p.analytics.reviewCount, 0)} reviews
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => p.inventory <= p.reorderPoint).length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-red-600">
                {products.filter(p => p.inventory === 0).length} out of stock
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Books">Books</SelectItem>
                  <SelectItem value="Beauty">Beauty</SelectItem>
                  <SelectItem value="Automotive">Automotive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Discontinued">Discontinued</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Brand</Label>
              <Select value={filterBrand} onValueChange={setFilterBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Brands</SelectItem>
                  <SelectItem value="Nike">Nike</SelectItem>
                  <SelectItem value="Apple">Apple</SelectItem>
                  <SelectItem value="Samsung">Samsung</SelectItem>
                  <SelectItem value="Sony">Sony</SelectItem>
                  <SelectItem value="Adidas">Adidas</SelectItem>
                  <SelectItem value="Microsoft">Microsoft</SelectItem>
                  <SelectItem value="Google">Google</SelectItem>
                  <SelectItem value="Amazon">Amazon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                    <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(product.analytics.trend)}
                      <span className="text-xs text-gray-500">{product.analytics.trend}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Price:</span>
                    <span className="ml-1 font-medium">${product.price.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Cost:</span>
                    <span className="ml-1 font-medium">${product.cost.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Margin:</span>
                    <span className="ml-1 font-medium">{product.margin.toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Stock:</span>
                    <span className="ml-1 font-medium">{product.inventory}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Sales</span>
                    <span className="font-medium">{product.analytics.sales}</span>
                  </div>
                  <Progress value={(product.analytics.sales / 1000) * 100} className="h-2" />
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.analytics.averageRating.toFixed(1)}</span>
                    <span className="text-xs text-gray-500">({product.analytics.reviewCount})</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {product.analytics.popularity.toFixed(0)}% popular
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1">
                  {product.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {product.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{product.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsViewModalOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">
                    {product.updatedAt.toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg">{selectedProduct.name}</h3>
                  <p className="text-gray-600">{selectedProduct.brand} - {selectedProduct.category}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedProduct.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">SKU:</span>
                    <span className="font-medium">{selectedProduct.sku}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge className={getStatusColor(selectedProduct.status)}>
                      {selectedProduct.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Price:</span>
                    <span className="font-medium">${selectedProduct.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Cost:</span>
                    <span className="font-medium">${selectedProduct.cost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Margin:</span>
                    <span className="font-medium">{selectedProduct.margin.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Inventory:</span>
                    <span className="font-medium">{selectedProduct.inventory}</span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="variants">Variants</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Inventory Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Current Stock:</span>
                            <span className="font-medium">{selectedProduct.inventory}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Min Stock:</span>
                            <span className="font-medium">{selectedProduct.minStock}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Max Stock:</span>
                            <span className="font-medium">{selectedProduct.maxStock}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Reorder Point:</span>
                            <span className="font-medium">{selectedProduct.reorderPoint}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Supplier Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Supplier:</span>
                            <span className="font-medium">{selectedProduct.supplier}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Created:</span>
                            <span className="font-medium">{selectedProduct.createdAt.toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Updated:</span>
                            <span className="font-medium">{selectedProduct.updatedAt.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="variants" className="space-y-4">
                  <div className="space-y-3">
                    {selectedProduct.variants.map((variant, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{variant.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">${variant.price.toFixed(2)}</span>
                            <Badge variant="outline">{variant.inventory} in stock</Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">SKU:</span>
                            <span className="ml-1 font-medium">{variant.sku}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Cost:</span>
                            <span className="ml-1 font-medium">${variant.cost.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-sm text-gray-500">Attributes:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Object.entries(variant.attributes).map(([key, value], attrIndex) => (
                              <Badge key={attrIndex} variant="outline" className="text-xs">
                                {key}: {value}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Performance Metrics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Views:</span>
                            <span className="font-medium">{selectedProduct.analytics.views}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Sales:</span>
                            <span className="font-medium">{selectedProduct.analytics.sales}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Revenue:</span>
                            <span className="font-medium">${selectedProduct.analytics.revenue.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Conversion Rate:</span>
                            <span className="font-medium">{selectedProduct.analytics.conversionRate.toFixed(1)}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Customer Feedback</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Average Rating:</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span className="font-medium">{selectedProduct.analytics.averageRating.toFixed(1)}/5</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Review Count:</span>
                            <span className="font-medium">{selectedProduct.analytics.reviewCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Return Rate:</span>
                            <span className="font-medium">{(selectedProduct.analytics.returnRate * 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Popularity:</span>
                            <span className="font-medium">{selectedProduct.analytics.popularity.toFixed(1)}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="specifications" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Product Specifications</h4>
                        <div className="space-y-2 text-sm">
                          {Object.entries(selectedProduct.specifications).map(([key, value], index) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-gray-500">{key}:</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedProduct.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
