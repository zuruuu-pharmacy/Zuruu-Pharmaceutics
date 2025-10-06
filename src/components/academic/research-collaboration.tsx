"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, MessageSquare, Video, FileText, Calendar, Bell, Share2,
  Plus, Search, Filter, Globe, Building, Award, TrendingUp, Star,
  CheckCircle, Clock, AlertTriangle, Edit, Trash2, Eye, Send
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { faker } from '@faker-js/faker';

interface Collaborator {
  id: string;
  name: string;
  email: string;
  institution: string;
  role: 'Principal Investigator' | 'Co-Investigator' | 'Research Assistant' | 'Consultant' | 'Student';
  expertise: string[];
  avatar: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joinedDate: Date;
  projects: number;
  publications: number;
  hIndex: number;
}

interface Collaboration {
  id: string;
  title: string;
  description: string;
  type: 'Research Project' | 'Publication' | 'Grant Application' | 'Conference' | 'Workshop';
  status: 'Planning' | 'Active' | 'Completed' | 'Cancelled';
  startDate: Date;
  endDate: Date;
  participants: string[];
  institution: string;
  budget: number;
  deliverables: string[];
  progress: number;
  lastActivity: Date;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'image' | 'link';
  attachments?: string[];
}

interface Discussion {
  id: string;
  title: string;
  participants: string[];
  messages: Message[];
  lastMessage: Date;
  unreadCount: number;
}

const ResearchCollaboration: React.FC = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollaboration, setSelectedCollaboration] = useState<Collaboration | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('collaborators');

  useEffect(() => {
    // Generate mock data
    const mockCollaborators: Collaborator[] = Array.from({ length: 20 }).map((_, i) => ({
      id: `collab-${i}`,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      institution: faker.helpers.arrayElement([
        'Harvard Medical School', 'Johns Hopkins University', 'Mayo Clinic',
        'Stanford University', 'MIT', 'Oxford University', 'Cambridge University',
        'NIH', 'WHO', 'Pfizer Inc.', 'Merck & Co.', 'Johnson & Johnson'
      ]),
      role: faker.helpers.arrayElement(['Principal Investigator', 'Co-Investigator', 'Research Assistant', 'Consultant', 'Student']),
      expertise: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => 
        faker.helpers.arrayElement(['Clinical Research', 'Biostatistics', 'Pharmacology', 'Epidemiology', 'Data Science', 'Machine Learning'])
      ),
      avatar: faker.image.avatar(),
      status: faker.helpers.arrayElement(['Active', 'Inactive', 'Pending']),
      joinedDate: faker.date.past(),
      projects: faker.number.int({ min: 1, max: 20 }),
      publications: faker.number.int({ min: 5, max: 100 }),
      hIndex: faker.number.int({ min: 5, max: 50 })
    }));

    const mockCollaborations: Collaboration[] = Array.from({ length: 15 }).map((_, i) => ({
      id: `collab-${i}`,
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      type: faker.helpers.arrayElement(['Research Project', 'Publication', 'Grant Application', 'Conference', 'Workshop']),
      status: faker.helpers.arrayElement(['Planning', 'Active', 'Completed', 'Cancelled']),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      participants: Array.from({ length: faker.number.int({ min: 2, max: 8 }) }).map(() => faker.person.fullName()),
      institution: faker.helpers.arrayElement(['Harvard Medical School', 'Johns Hopkins University', 'Mayo Clinic', 'Stanford University']),
      budget: faker.number.int({ min: 10000, max: 500000 }),
      deliverables: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => faker.lorem.sentence()),
      progress: faker.number.int({ min: 0, max: 100 }),
      lastActivity: faker.date.recent()
    }));

    const mockDiscussions: Discussion[] = Array.from({ length: 10 }).map((_, i) => ({
      id: `disc-${i}`,
      title: faker.lorem.sentence(),
      participants: Array.from({ length: faker.number.int({ min: 2, max: 6 }) }).map(() => faker.person.fullName()),
      messages: Array.from({ length: faker.number.int({ min: 5, max: 20 }) }).map(() => ({
        id: faker.string.uuid(),
        sender: faker.person.fullName(),
        content: faker.lorem.sentence(),
        timestamp: faker.date.recent(),
        type: faker.helpers.arrayElement(['text', 'file', 'image', 'link']),
        attachments: faker.datatype.boolean() ? [faker.system.fileName()] : undefined
      })),
      lastMessage: faker.date.recent(),
      unreadCount: faker.number.int({ min: 0, max: 5 })
    }));

    setCollaborators(mockCollaborators);
    setCollaborations(mockCollaborations);
    setDiscussions(mockDiscussions);
  }, []);

  const filteredCollaborators = collaborators.filter(collab =>
    collab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collab.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collab.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Inactive': return 'text-gray-600 bg-gray-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Principal Investigator': return <Award className="w-4 h-4" />;
      case 'Co-Investigator': return <Users className="w-4 h-4" />;
      case 'Research Assistant': return <FileText className="w-4 h-4" />;
      case 'Consultant': return <Globe className="w-4 h-4" />;
      case 'Student': return <Star className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Research Collaboration</h2>
          <p className="text-gray-600">Connect with researchers and manage collaborations</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Collaboration
          </Button>
          <Button variant="outline" onClick={() => setIsMessageModalOpen(true)}>
            <MessageSquare className="w-4 h-4 mr-2" />
            Messages
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="collaborators">Collaborators</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>

        <TabsContent value="collaborators" className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search collaborators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Principal Investigator">Principal Investigator</SelectItem>
                <SelectItem value="Co-Investigator">Co-Investigator</SelectItem>
                <SelectItem value="Research Assistant">Research Assistant</SelectItem>
                <SelectItem value="Consultant">Consultant</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollaborators.map((collaborator, index) => (
              <motion.div
                key={collaborator.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={collaborator.avatar} />
                        <AvatarFallback>{collaborator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{collaborator.name}</h3>
                          <Badge className={getStatusColor(collaborator.status)}>
                            {collaborator.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{collaborator.institution}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          {getRoleIcon(collaborator.role)}
                          <span className="text-sm text-gray-600">{collaborator.role}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {collaborator.expertise.slice(0, 3).map((exp, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {exp}
                            </Badge>
                          ))}
                          {collaborator.expertise.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{collaborator.expertise.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                          <span>{collaborator.projects} projects</span>
                          <span>{collaborator.publications} publications</span>
                          <span>H-index: {collaborator.hIndex}</span>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="w-4 h-4 mr-1" />
                            Invite
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="space-y-4">
            {collaborations.map((collaboration, index) => (
              <motion.div
                key={collaboration.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{collaboration.title}</h3>
                          <Badge variant="outline">{collaboration.type}</Badge>
                          <Badge className={getStatusColor(collaboration.status)}>
                            {collaboration.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{collaboration.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{collaboration.institution}</span>
                          <span>${collaboration.budget.toLocaleString()}</span>
                          <span>{collaboration.participants.length} participants</span>
                          <span>Progress: {collaboration.progress}%</span>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{collaboration.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${collaboration.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="discussions" className="space-y-6">
          <div className="space-y-4">
            {discussions.map((discussion, index) => (
              <motion.div
                key={discussion.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{discussion.title}</h3>
                          {discussion.unreadCount > 0 && (
                            <Badge className="bg-red-100 text-red-800">
                              {discussion.unreadCount} new
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {discussion.participants.join(', ')}
                        </p>
                        <p className="text-sm text-gray-500">
                          Last message: {discussion.lastMessage.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">
                          {discussion.messages.length} messages
                        </span>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Collaboration Network</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Network Visualization</h3>
                <p className="text-gray-600 mb-4">
                  Interactive network graph showing research collaborations and connections
                </p>
                <Button>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Network
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Collaboration Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Collaboration</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Collaboration Title</Label>
              <Input id="title" placeholder="Enter collaboration title" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter description" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Research Project">Research Project</SelectItem>
                    <SelectItem value="Publication">Publication</SelectItem>
                    <SelectItem value="Grant Application">Grant Application</SelectItem>
                    <SelectItem value="Conference">Conference</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="budget">Budget ($)</Label>
                <Input id="budget" type="number" placeholder="Enter budget" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCreateModalOpen(false)}>
              Create Collaboration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResearchCollaboration;
