"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Shield, 
  Download, 
  Upload,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Clock,
  RefreshCw,
  Plus,
  Folder,
  File,
  Lock,
  Unlock,
  Calendar,
  User
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Document {
  id: string;
  name: string;
  type: 'certificate' | 'license' | 'compliance' | 'training' | 'audit' | 'policy';
  category: 'regulatory' | 'quality' | 'safety' | 'training' | 'operational';
  status: 'active' | 'expired' | 'expiring_soon' | 'pending_renewal';
  issueDate: Date;
  expiryDate: Date;
  issuer: string;
  fileSize: number; // in KB
  fileType: string;
  uploadedBy: string;
  uploadedAt: Date;
  lastModified: Date;
  version: string;
  isEncrypted: boolean;
  tags: string[];
  description: string;
}

export const DocumentCertificateVault: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockDocuments: Document[] = [
      {
        id: 'doc-1',
        name: 'FDA Manufacturing License',
        type: 'license',
        category: 'regulatory',
        status: 'active',
        issueDate: new Date('2023-01-15'),
        expiryDate: new Date('2025-01-15'),
        issuer: 'FDA',
        fileSize: 2048,
        fileType: 'PDF',
        uploadedBy: 'John Smith',
        uploadedAt: new Date('2023-01-20'),
        lastModified: new Date('2023-01-20'),
        version: '1.0',
        isEncrypted: true,
        tags: ['FDA', 'Manufacturing', 'License'],
        description: 'Official FDA manufacturing license for pharmaceutical production'
      },
      {
        id: 'doc-2',
        name: 'ISO 9001:2015 Certificate',
        type: 'certificate',
        category: 'quality',
        status: 'expiring_soon',
        issueDate: new Date('2022-06-01'),
        expiryDate: new Date('2024-12-31'),
        issuer: 'ISO',
        fileSize: 1536,
        fileType: 'PDF',
        uploadedBy: 'Sarah Johnson',
        uploadedAt: new Date('2022-06-05'),
        lastModified: new Date('2022-06-05'),
        version: '1.0',
        isEncrypted: false,
        tags: ['ISO', 'Quality', 'Certification'],
        description: 'ISO 9001:2015 quality management system certification'
      },
      {
        id: 'doc-3',
        name: 'Safety Training Certificate - John Doe',
        type: 'certificate',
        category: 'training',
        status: 'active',
        issueDate: new Date('2024-01-10'),
        expiryDate: new Date('2025-01-10'),
        issuer: 'Internal Training',
        fileSize: 512,
        fileType: 'PDF',
        uploadedBy: 'Mike Wilson',
        uploadedAt: new Date('2024-01-12'),
        lastModified: new Date('2024-01-12'),
        version: '1.0',
        isEncrypted: false,
        tags: ['Training', 'Safety', 'Employee'],
        description: 'Workplace safety training completion certificate'
      },
      {
        id: 'doc-4',
        name: 'Audit Report Q4 2023',
        type: 'audit',
        category: 'regulatory',
        status: 'active',
        issueDate: new Date('2023-12-15'),
        expiryDate: new Date('2025-12-15'),
        issuer: 'External Auditor',
        fileSize: 4096,
        fileType: 'PDF',
        uploadedBy: 'Lisa Brown',
        uploadedAt: new Date('2023-12-20'),
        lastModified: new Date('2023-12-20'),
        version: '1.0',
        isEncrypted: true,
        tags: ['Audit', 'Q4', 'Compliance'],
        description: 'Quarterly compliance audit report'
      },
      {
        id: 'doc-5',
        name: 'GMP Compliance Certificate',
        type: 'certificate',
        category: 'regulatory',
        status: 'expired',
        issueDate: new Date('2022-03-01'),
        expiryDate: new Date('2024-03-01'),
        issuer: 'Health Authority',
        fileSize: 1024,
        fileType: 'PDF',
        uploadedBy: 'Admin',
        uploadedAt: new Date('2022-03-05'),
        lastModified: new Date('2022-03-05'),
        version: '1.0',
        isEncrypted: false,
        tags: ['GMP', 'Compliance', 'Expired'],
        description: 'Good Manufacturing Practice compliance certificate (EXPIRED)'
      }
    ];
    
    setDocuments(mockDocuments);
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'expired': return 'text-red-600 bg-red-100';
      case 'expiring_soon': return 'text-yellow-600 bg-yellow-100';
      case 'pending_renewal': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'certificate': return Shield;
      case 'license': return FileText;
      case 'compliance': return CheckCircle;
      case 'training': return User;
      case 'audit': return File;
      case 'policy': return Folder;
      default: return File;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'regulatory': return 'text-blue-600 bg-blue-100';
      case 'quality': return 'text-green-600 bg-green-100';
      case 'safety': return 'text-red-600 bg-red-100';
      case 'training': return 'text-purple-600 bg-purple-100';
      case 'operational': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const isExpiringSoon = (expiryDate: Date) => {
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const isExpired = (expiryDate: Date) => {
    return expiryDate.getTime() < Date.now();
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || doc.type === filterType;
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const exportDocuments = () => {
    const csvContent = [
      'Name,Type,Category,Status,Issue Date,Expiry Date,Issuer,File Size,Version,Uploaded By,Uploaded At',
      ...filteredDocuments.map(doc => [
        doc.name,
        doc.type,
        doc.category,
        doc.status,
        doc.issueDate.toISOString().split('T')[0],
        doc.expiryDate.toISOString().split('T')[0],
        doc.issuer,
        `${doc.fileSize} KB`,
        doc.version,
        doc.uploadedBy,
        doc.uploadedAt.toISOString().split('T')[0]
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documents_vault.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading documents...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Document & Certificate Vault</h2>
          <p className="text-gray-600">Secure storage and management of all regulatory documents and certificates</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadDocuments} disabled={isLoading} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={exportDocuments} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {documents.length}
            </div>
            <div className="text-sm text-gray-500">Total Documents</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {documents.filter(d => d.status === 'active').length}
            </div>
            <div className="text-sm text-gray-500">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {documents.filter(d => d.status === 'expiring_soon').length}
            </div>
            <div className="text-sm text-gray-500">Expiring Soon</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {documents.filter(d => d.status === 'expired').length}
            </div>
            <div className="text-sm text-gray-500">Expired</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="certificate">Certificate</option>
              <option value="license">License</option>
              <option value="compliance">Compliance</option>
              <option value="training">Training</option>
              <option value="audit">Audit</option>
              <option value="policy">Policy</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expiring_soon">Expiring Soon</option>
              <option value="expired">Expired</option>
              <option value="pending_renewal">Pending Renewal</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc, index) => {
          const TypeIcon = getTypeIcon(doc.type);
          const isExpiring = isExpiringSoon(doc.expiryDate);
          const isExp = isExpired(doc.expiryDate);
          
          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`hover:shadow-lg transition-shadow cursor-pointer ${
                isExp ? 'border-red-200 bg-red-50' :
                isExpiring ? 'border-yellow-200 bg-yellow-50' :
                'border-gray-200'
              }`}
              onClick={() => setSelectedDocument(doc)}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <TypeIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{doc.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getStatusColor(doc.status)}>
                            {doc.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge className={getCategoryColor(doc.category)}>
                            {doc.category.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {doc.isEncrypted && <Lock className="w-4 h-4 text-gray-400" />}
                      {isExpiring && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                      {isExp && <AlertTriangle className="w-4 h-4 text-red-500" />}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{doc.description}</p>
                  
                  {/* Document Details */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Issuer:</span>
                      <span className="font-medium">{doc.issuer}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Issue Date:</span>
                      <span className="font-medium">{doc.issueDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Expiry Date:</span>
                      <span className={`font-medium ${
                        isExp ? 'text-red-600' :
                        isExpiring ? 'text-yellow-600' :
                        'text-gray-900'
                      }`}>
                        {doc.expiryDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">File Size:</span>
                      <span className="font-medium">{doc.fileSize} KB</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Tags</div>
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Document Details Modal */}
      {selectedDocument && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedDocument(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{selectedDocument.name}</h3>
              <Button variant="outline" onClick={() => setSelectedDocument(null)}>
                ×
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Type</label>
                <p className="text-lg">{selectedDocument.type.toUpperCase()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Category</label>
                <Badge className={getCategoryColor(selectedDocument.category)}>
                  {selectedDocument.category.toUpperCase()}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <Badge className={getStatusColor(selectedDocument.status)}>
                  {selectedDocument.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Version</label>
                <p className="text-lg">{selectedDocument.version}</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-500">Description</label>
              <p className="text-gray-900 mt-1">{selectedDocument.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Issue Date</label>
                <p className="text-lg">{selectedDocument.issueDate.toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Expiry Date</label>
                <p className={`text-lg ${
                  isExpired(selectedDocument.expiryDate) ? 'text-red-600' :
                  isExpiringSoon(selectedDocument.expiryDate) ? 'text-yellow-600' :
                  'text-gray-900'
                }`}>
                  {selectedDocument.expiryDate.toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Issuer</label>
                <p className="text-lg">{selectedDocument.issuer}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">File Size</label>
                <p className="text-lg">{selectedDocument.fileSize} KB</p>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSelectedDocument(null)}>
                Close
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
