"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, BookOpen, Users, Calendar, Star, TrendingUp, BarChart3, Plus,
  Search, Filter, Edit, Trash2, Eye, Download, Upload, CheckCircle, XCircle,
  AlertTriangle, Target, Clock, Settings, Save, RefreshCw, Share2, Lock,
  Unlock, Copy, ExternalLink, Play, Pause, Square, Zap, Bell, MessageSquare,
  Heart, Globe, Building, Award, Microscope, FlaskConical, TestTube, Atom,
  Brain, Database, DollarSign, GraduationCap
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

interface Publication {
  id: string;
  title: string;
  abstract: string;
  authors: Author[];
  journal: string;
  journalImpact: number;
  publicationType: 'Journal Article' | 'Conference Paper' | 'Book Chapter' | 'Review' | 'Case Study' | 'Editorial';
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Accepted' | 'Published' | 'Rejected' | 'Withdrawn';
  keywords: string[];
  doi: string;
  publicationDate: Date;
  submissionDate: Date;
  acceptanceDate?: Date;
  volume: string;
  issue: string;
  pages: string;
  citations: number;
  downloads: number;
  views: number;
  altmetrics: Altmetrics;
  funding: Funding[];
  researchAreas: string[];
  language: string;
  openAccess: boolean;
  peerReviewed: boolean;
  impactFactor: number;
  quartile: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  hIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Author {
  id: string;
  name: string;
  email: string;
  affiliation: string;
  orcid: string;
  isCorresponding: boolean;
  order: number;
}

interface Altmetrics {
  twitter: number;
  facebook: number;
  linkedin: number;
  reddit: number;
  mendeley: number;
  citeulike: number;
  total: number;
}

interface Funding {
  id: string;
  agency: string;
  grantNumber: string;
  amount: number;
  currency: string;
}

const generateMockPublication = (id: number): Publication => {
  const types: Publication['publicationType'][] = ['Journal Article', 'Conference Paper', 'Book Chapter', 'Review', 'Case Study', 'Editorial'];
  const statuses: Publication['status'][] = ['Draft', 'Submitted', 'Under Review', 'Accepted', 'Published', 'Rejected', 'Withdrawn'];
  const journals = ['Nature', 'Science', 'Cell', 'NEJM', 'Lancet', 'JAMA', 'Pharmaceutical Research', 'Drug Discovery Today'];
  const researchAreas = ['Pharmacology', 'Pharmaceutical Sciences', 'Drug Discovery', 'Clinical Pharmacy', 'Pharmaceutical Chemistry', 'Biopharmaceutics'];
  
  const type = faker.helpers.arrayElement(types);
  const status = faker.helpers.arrayElement(statuses);
  const journal = faker.helpers.arrayElement(journals);
  const researchArea = faker.helpers.arrayElement(researchAreas);
  
  const authors: Author[] = Array.from({ length: faker.number.int({ min: 2, max: 8 }) }).map((_, i) => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    affiliation: faker.company.name(),
    orcid: faker.string.alphanumeric(16),
    isCorresponding: i === 0,
    order: i + 1
  }));
  
  const altmetrics: Altmetrics = {
    twitter: faker.number.int({ min: 0, max: 100 }),
    facebook: faker.number.int({ min: 0, max: 50 }),
    linkedin: faker.number.int({ min: 0, max: 30 }),
    reddit: faker.number.int({ min: 0, max: 20 }),
    mendeley: faker.number.int({ min: 0, max: 200 }),
    citeulike: faker.number.int({ min: 0, max: 50 }),
    total: 0
  };
  altmetrics.total = altmetrics.twitter + altmetrics.facebook + altmetrics.linkedin + altmetrics.reddit + altmetrics.mendeley + altmetrics.citeulike;
  
  const funding: Funding[] = Array.from({ length: faker.number.int({ min: 0, max: 3 }) }).map(() => ({
    id: faker.string.uuid(),
    agency: faker.helpers.arrayElement(['NSF', 'NIH', 'NSERC', 'CIHR', 'Wellcome Trust']),
    grantNumber: faker.string.alphanumeric(8).toUpperCase(),
    amount: faker.number.int({ min: 10000, max: 500000 }),
    currency: 'USD'
  }));
  
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(8),
    abstract: faker.lorem.paragraphs(3),
    authors,
    journal,
    journalImpact: faker.number.float({ min: 1, max: 50, fractionDigits: 0.1 }),
    publicationType: type,
    status,
    keywords: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => faker.lorem.word()),
    doi: `10.${faker.string.numeric(4)}/${faker.string.alphanumeric(8)}`,
    publicationDate: faker.date.past({ years: 2 }),
    submissionDate: faker.date.past({ years: 3 }),
    acceptanceDate: faker.datatype.boolean(0.8) ? faker.date.past({ years: 2 }) : undefined,
    volume: faker.number.int({ min: 1, max: 50 }).toString(),
    issue: faker.number.int({ min: 1, max: 12 }).toString(),
    pages: `${faker.number.int({ min: 1, max: 20 })}-${faker.number.int({ min: 21, max: 40 })}`,
    citations: faker.number.int({ min: 0, max: 500 }),
    downloads: faker.number.int({ min: 0, max: 10000 }),
    views: faker.number.int({ min: 0, max: 50000 }),
    altmetrics,
    funding,
    researchAreas: [researchArea],
    language: 'English',
    openAccess: faker.datatype.boolean(0.6),
    peerReviewed: faker.datatype.boolean(0.9),
    impactFactor: faker.number.float({ min: 1, max: 50, fractionDigits: 0.1 }),
    quartile: faker.helpers.arrayElement(['Q1', 'Q2', 'Q3', 'Q4']),
    hIndex: faker.number.int({ min: 1, max: 50 }),
    createdAt: faker.date.past({ years: 3 }),
    updatedAt: faker.date.recent({ days: 30 })
  };
};

export default function PublicationTracking() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterJournal, setFilterJournal] = useState<string>('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);

  useEffect(() => {
    const mockPublications = Array.from({ length: 30 }, (_, i) => generateMockPublication(i));
    setPublications(mockPublications);
  }, []);

  const filteredPublications = useMemo(() => {
    return publications.filter(pub => {
      const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pub.journal.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pub.authors.some(author => author.name.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = filterStatus === 'All' || pub.status === filterStatus;
      const matchesType = filterType === 'All' || pub.publicationType === filterType;
      const matchesJournal = filterJournal === 'All' || pub.journal === filterJournal;
      
      return matchesSearch && matchesStatus && matchesType && matchesJournal;
    });
  }, [publications, searchTerm, filterStatus, filterType, filterJournal]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Accepted': return 'bg-blue-100 text-blue-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Submitted': return 'bg-purple-100 text-purple-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Withdrawn': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Journal Article': return <FileText className="w-5 h-5" />;
      case 'Conference Paper': return <Users className="w-5 h-5" />;
      case 'Book Chapter': return <BookOpen className="w-5 h-5" />;
      case 'Review': return <BarChart3 className="w-5 h-5" />;
      case 'Case Study': return <Microscope className="w-5 h-5" />;
      case 'Editorial': return <Edit className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getQuartileColor = (quartile: string) => {
    switch (quartile) {
      case 'Q1': return 'bg-green-100 text-green-800';
      case 'Q2': return 'bg-blue-100 text-blue-800';
      case 'Q3': return 'bg-yellow-100 text-yellow-800';
      case 'Q4': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Publication Tracking</h1>
          <p className="text-gray-600 mt-2">Monitor research publications, citations, and impact metrics</p>
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
                Add Publication
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Publication</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input placeholder="Enter publication title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Journal</Label>
                    <Input placeholder="Enter journal name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Journal Article">Journal Article</SelectItem>
                        <SelectItem value="Conference Paper">Conference Paper</SelectItem>
                        <SelectItem value="Book Chapter">Book Chapter</SelectItem>
                        <SelectItem value="Review">Review</SelectItem>
                        <SelectItem value="Case Study">Case Study</SelectItem>
                        <SelectItem value="Editorial">Editorial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Abstract</Label>
                  <Textarea placeholder="Enter abstract" rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddModalOpen(false)}>
                  Add Publication
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
                <p className="text-sm font-medium text-gray-600">Total Publications</p>
                <p className="text-2xl font-bold text-gray-900">{publications.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {publications.filter(p => p.status === 'Published').length} published
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Citations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {publications.reduce((sum, pub) => sum + pub.citations, 0)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-blue-600">
                Avg: {Math.round(publications.reduce((sum, pub) => sum + pub.citations, 0) / publications.length)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">H-Index</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.max(...publications.map(p => p.hIndex))}
                </p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-purple-600">
                {publications.filter(p => p.quartile === 'Q1').length} Q1 journals
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Access</p>
                <p className="text-2xl font-bold text-gray-900">
                  {publications.filter(p => p.openAccess).length}
                </p>
              </div>
              <Globe className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-orange-600">
                {Math.round((publications.filter(p => p.openAccess).length / publications.length) * 100)}% of total
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
                  placeholder="Search publications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Submitted">Submitted</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Accepted">Accepted</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Withdrawn">Withdrawn</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="Journal Article">Journal Article</SelectItem>
                  <SelectItem value="Conference Paper">Conference Paper</SelectItem>
                  <SelectItem value="Book Chapter">Book Chapter</SelectItem>
                  <SelectItem value="Review">Review</SelectItem>
                  <SelectItem value="Case Study">Case Study</SelectItem>
                  <SelectItem value="Editorial">Editorial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Journal</Label>
              <Select value={filterJournal} onValueChange={setFilterJournal}>
                <SelectTrigger>
                  <SelectValue placeholder="All Journals" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Journals</SelectItem>
                  {Array.from(new Set(publications.map(p => p.journal))).map(journal => (
                    <SelectItem key={journal} value={journal}>{journal}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Publications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPublications.map((publication, index) => (
          <motion.div
            key={publication.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg line-clamp-2">{publication.title}</CardTitle>
                    <p className="text-sm text-gray-600">{publication.journal}</p>
                    <p className="text-sm text-gray-500">
                      {publication.authors.slice(0, 2).map(a => a.name).join(', ')}
                      {publication.authors.length > 2 && ` +${publication.authors.length - 2} more`}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getStatusColor(publication.status)}>
                      {publication.status}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {getTypeIcon(publication.publicationType)}
                      <span className="text-xs text-gray-500">{publication.publicationType}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge className={getQuartileColor(publication.quartile)}>
                    {publication.quartile}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    IF: {publication.impactFactor.toFixed(1)}
                  </span>
                  {publication.openAccess && (
                    <Badge variant="outline" className="text-green-600">
                      Open Access
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Citations:</span>
                    <span className="ml-1 font-medium">{publication.citations}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Downloads:</span>
                    <span className="ml-1 font-medium">{publication.downloads}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Views:</span>
                    <span className="ml-1 font-medium">{publication.views}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Altmetrics:</span>
                    <span className="ml-1 font-medium">{publication.altmetrics.total}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedPublication(publication);
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
                    {publication.publicationDate.toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Publication Details</DialogTitle>
          </DialogHeader>
          {selectedPublication && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg">{selectedPublication.title}</h3>
                  <p className="text-gray-600">{selectedPublication.journal}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedPublication.abstract}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <Badge variant="outline">{selectedPublication.publicationType}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge className={getStatusColor(selectedPublication.status)}>
                      {selectedPublication.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">DOI:</span>
                    <span className="font-medium">{selectedPublication.doi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Impact Factor:</span>
                    <span className="font-medium">{selectedPublication.impactFactor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Quartile:</span>
                    <Badge className={getQuartileColor(selectedPublication.quartile)}>
                      {selectedPublication.quartile}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Open Access:</span>
                    <span className="font-medium">{selectedPublication.openAccess ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="authors" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="authors">Authors</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="funding">Funding</TabsTrigger>
                  <TabsTrigger value="keywords">Keywords</TabsTrigger>
                </TabsList>
                
                <TabsContent value="authors" className="space-y-4">
                  <div className="space-y-3">
                    {selectedPublication.authors.map((author, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Users className="w-4 h-4 text-gray-500" />
                          <div>
                            <span className="font-medium">{author.name}</span>
                            <p className="text-sm text-gray-500">{author.affiliation}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {author.isCorresponding && (
                            <Badge variant="outline">Corresponding</Badge>
                          )}
                          <span className="text-sm text-gray-500">#{author.order}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="metrics" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Citation Metrics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Citations:</span>
                            <span className="font-medium">{selectedPublication.citations}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Downloads:</span>
                            <span className="font-medium">{selectedPublication.downloads}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Views:</span>
                            <span className="font-medium">{selectedPublication.views}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Altmetrics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Twitter:</span>
                            <span className="font-medium">{selectedPublication.altmetrics.twitter}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Mendeley:</span>
                            <span className="font-medium">{selectedPublication.altmetrics.mendeley}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Total:</span>
                            <span className="font-medium">{selectedPublication.altmetrics.total}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="funding" className="space-y-4">
                  <div className="space-y-3">
                    {selectedPublication.funding.map((fund, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{fund.agency}</span>
                          <span className="font-bold text-green-600">
                            {fund.currency} {fund.amount.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">Grant: {fund.grantNumber}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="keywords" className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedPublication.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline">{keyword}</Badge>
                    ))}
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
