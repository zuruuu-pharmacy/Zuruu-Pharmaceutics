"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Users, GraduationCap, BookOpen, Microscope, FileText, Calendar, MessageSquare,
  Plus, Search, Filter, Edit, Trash2, Eye, Download, Upload, CheckCircle, XCircle,
  AlertTriangle, Star, Target, TrendingUp, BarChart3, Clock, Settings, Save,
  RefreshCw, Share2, Lock, Unlock, Copy, ExternalLink, Play, Pause, Square, Zap,
  Bell, Heart, Globe, Building, Award, TestTube, FlaskConical, Atom, Brain,
  Database, DollarSign, Clipboard, Video, Camera, Headphones, Monitor, Smartphone,
  Tablet, UserCheck, UserPlus, Mail, Phone, MapPin, Briefcase, Trophy, Linkedin
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

interface Faculty {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  specialization: string;
  bio: string;
  profilePicture: string;
  education: Education[];
  experience: Experience[];
  research: Research[];
  publications: Publication[];
  courses: Course[];
  achievements: Achievement[];
  availability: Availability;
  socialLinks: SocialLinks;
  skills: string[];
  interests: string[];
  officeHours: OfficeHours[];
  mentoring: MentoringInfo;
  analytics: FacultyAnalytics;
  createdAt: Date;
  updatedAt: Date;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  year: number;
  gpa?: number;
}

interface Experience {
  id: string;
  organization: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  current: boolean;
}

interface Research {
  id: string;
  title: string;
  description: string;
  status: 'Active' | 'Completed' | 'On Hold' | 'Planning';
  funding: FundingInfo;
  collaborators: string[];
  startDate: Date;
  endDate?: Date;
  publications: string[];
}

interface FundingInfo {
  source: string;
  amount: number;
  currency: string;
  grantNumber: string;
  startDate: Date;
  endDate: Date;
}

interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi: string;
  citations: number;
  impactFactor: number;
  type: 'Journal Article' | 'Conference Paper' | 'Book Chapter' | 'Patent' | 'Other';
}

interface Course {
  id: string;
  title: string;
  code: string;
  credits: number;
  semester: string;
  year: number;
  students: number;
  status: 'Active' | 'Completed' | 'Planned';
  description: string;
  syllabus: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  year: number;
  category: 'Teaching' | 'Research' | 'Service' | 'Award' | 'Recognition';
  verified: boolean;
}

interface Availability {
  status: 'Available' | 'Busy' | 'Away' | 'Unavailable';
  message: string;
  timezone: string;
  preferredContact: 'Email' | 'Phone' | 'Office' | 'Any';
}

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  researchgate?: string;
  orcid?: string;
  website?: string;
}

interface OfficeHours {
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  type: 'In-Person' | 'Virtual' | 'Both';
}

interface MentoringInfo {
  currentMentees: string[];
  pastMentees: string[];
  areas: string[];
  availability: string;
  experience: string;
}

interface FacultyAnalytics {
  teaching: TeachingMetrics;
  research: ResearchMetrics;
  service: ServiceMetrics;
  overall: OverallMetrics;
}

interface TeachingMetrics {
  coursesTaught: number;
  studentsTaught: number;
  averageRating: number;
  evaluations: number;
  innovations: number;
}

interface ResearchMetrics {
  publications: number;
  citations: number;
  hIndex: number;
  grants: number;
  funding: number;
  collaborations: number;
}

interface ServiceMetrics {
  committees: number;
  reviews: number;
  presentations: number;
  workshops: number;
  communityService: number;
}

interface OverallMetrics {
  performanceScore: number;
  productivityIndex: number;
  impactScore: number;
  collaborationScore: number;
}

const generateMockFaculty = (id: number): Faculty => {
  const departments = ['Computer Science', 'Biology', 'Chemistry', 'Physics', 'Mathematics', 'Engineering', 'Medicine', 'Pharmacy'];
  const positions = ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer', 'Research Scientist', 'Adjunct Professor'];
  const specializations = ['Machine Learning', 'Organic Chemistry', 'Quantum Physics', 'Data Science', 'Biotechnology', 'Materials Science'];
  
  const department = faker.helpers.arrayElement(departments);
  const position = faker.helpers.arrayElement(positions);
  const specialization = faker.helpers.arrayElement(specializations);
  
  const education: Education[] = Array.from({ length: faker.number.int({ min: 2, max: 4 }) }).map(() => ({
    id: faker.string.uuid(),
    institution: faker.company.name() + ' University',
    degree: faker.helpers.arrayElement(['PhD', 'Master', 'Bachelor']),
    field: faker.helpers.arrayElement(['Computer Science', 'Biology', 'Chemistry', 'Physics', 'Mathematics']),
    year: faker.number.int({ min: 1990, max: 2020 }),
    gpa: faker.number.float({ min: 3.0, max: 4.0, fractionDigits: 0.1 })
  }));
  
  const experience: Experience[] = Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => ({
    id: faker.string.uuid(),
    organization: faker.company.name(),
    position: faker.person.jobTitle(),
    startDate: faker.date.past({ years: 15 }),
    endDate: faker.datatype.boolean(0.7) ? faker.date.past({ years: 2 }) : undefined,
    description: faker.lorem.paragraph(),
    current: faker.datatype.boolean(0.3)
  }));
  
  const research: Research[] = Array.from({ length: faker.number.int({ min: 2, max: 6 }) }).map(() => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(4),
    description: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(['Active', 'Completed', 'On Hold', 'Planning']),
    funding: {
      source: faker.company.name(),
      amount: faker.number.int({ min: 10000, max: 500000 }),
      currency: 'USD',
      grantNumber: faker.string.alphanumeric(10),
      startDate: faker.date.past({ years: 3 }),
      endDate: faker.date.future({ years: 2 })
    },
    collaborators: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => faker.person.fullName()),
    startDate: faker.date.past({ years: 3 }),
    endDate: faker.datatype.boolean(0.6) ? faker.date.future({ years: 2 }) : undefined,
    publications: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }).map(() => faker.lorem.words(3))
  }));
  
  const publications: Publication[] = Array.from({ length: faker.number.int({ min: 5, max: 20 }) }).map(() => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(6),
    authors: Array.from({ length: faker.number.int({ min: 1, max: 6 }) }).map(() => faker.person.fullName()),
    journal: faker.company.name() + ' Journal',
    year: faker.number.int({ min: 2010, max: 2024 }),
    doi: faker.internet.url(),
    citations: faker.number.int({ min: 0, max: 500 }),
    impactFactor: faker.number.float({ min: 1.0, max: 10.0, fractionDigits: 0.1 }),
    type: faker.helpers.arrayElement(['Journal Article', 'Conference Paper', 'Book Chapter', 'Patent', 'Other'])
  }));
  
  const courses: Course[] = Array.from({ length: faker.number.int({ min: 2, max: 8 }) }).map(() => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    code: faker.string.alphanumeric(6).toUpperCase(),
    credits: faker.number.int({ min: 1, max: 4 }),
    semester: faker.helpers.arrayElement(['Fall', 'Spring', 'Summer']),
    year: faker.number.int({ min: 2020, max: 2024 }),
    students: faker.number.int({ min: 10, max: 100 }),
    status: faker.helpers.arrayElement(['Active', 'Completed', 'Planned']),
    description: faker.lorem.paragraph(),
    syllabus: faker.internet.url()
  }));
  
  const achievements: Achievement[] = Array.from({ length: faker.number.int({ min: 3, max: 10 }) }).map(() => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    year: faker.number.int({ min: 2010, max: 2024 }),
    category: faker.helpers.arrayElement(['Teaching', 'Research', 'Service', 'Award', 'Recognition']),
    verified: faker.datatype.boolean(0.9)
  }));
  
  const officeHours: OfficeHours[] = Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => ({
    day: faker.helpers.arrayElement(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']),
    startTime: faker.helpers.arrayElement(['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM']),
    endTime: faker.helpers.arrayElement(['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']),
    location: faker.helpers.arrayElement(['Office 101', 'Office 205', 'Lab 301', 'Virtual', 'Conference Room A']),
    type: faker.helpers.arrayElement(['In-Person', 'Virtual', 'Both'])
  }));
  
  const skills = Array.from({ length: faker.number.int({ min: 5, max: 15 }) }).map(() => faker.lorem.word());
  const interests = Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => faker.lorem.word());
  
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    department,
    position,
    specialization,
    bio: faker.lorem.paragraphs(3),
    profilePicture: faker.image.avatar(),
    education,
    experience,
    research,
    publications,
    courses,
    achievements,
    availability: {
      status: faker.helpers.arrayElement(['Available', 'Busy', 'Away', 'Unavailable']),
      message: faker.lorem.sentence(),
      timezone: faker.location.timeZone(),
      preferredContact: faker.helpers.arrayElement(['Email', 'Phone', 'Office', 'Any'])
    },
    socialLinks: {
      linkedin: faker.internet.url(),
      twitter: faker.datatype.boolean(0.6) ? faker.internet.url() : undefined,
      researchgate: faker.internet.url(),
      orcid: faker.internet.url(),
      website: faker.datatype.boolean(0.7) ? faker.internet.url() : undefined
    },
    skills,
    interests,
    officeHours,
    mentoring: {
      currentMentees: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }).map(() => faker.person.fullName()),
      pastMentees: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }).map(() => faker.person.fullName()),
      areas: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => faker.lorem.word()),
      availability: faker.lorem.sentence(),
      experience: faker.lorem.sentence()
    },
    analytics: {
      teaching: {
        coursesTaught: faker.number.int({ min: 5, max: 50 }),
        studentsTaught: faker.number.int({ min: 100, max: 2000 }),
        averageRating: faker.number.float({ min: 3.0, max: 5.0, fractionDigits: 0.1 }),
        evaluations: faker.number.int({ min: 10, max: 100 }),
        innovations: faker.number.int({ min: 0, max: 20 })
      },
      research: {
        publications: publications.length,
        citations: publications.reduce((sum, p) => sum + p.citations, 0),
        hIndex: faker.number.int({ min: 5, max: 50 }),
        grants: faker.number.int({ min: 1, max: 10 }),
        funding: research.reduce((sum, r) => sum + r.funding.amount, 0),
        collaborations: faker.number.int({ min: 5, max: 50 })
      },
      service: {
        committees: faker.number.int({ min: 1, max: 10 }),
        reviews: faker.number.int({ min: 5, max: 100 }),
        presentations: faker.number.int({ min: 10, max: 100 }),
        workshops: faker.number.int({ min: 0, max: 20 }),
        communityService: faker.number.int({ min: 0, max: 50 })
      },
      overall: {
        performanceScore: faker.number.float({ min: 70, max: 100, fractionDigits: 0.1 }),
        productivityIndex: faker.number.float({ min: 60, max: 100, fractionDigits: 0.1 }),
        impactScore: faker.number.float({ min: 50, max: 100, fractionDigits: 0.1 }),
        collaborationScore: faker.number.float({ min: 60, max: 100, fractionDigits: 0.1 })
      }
    },
    createdAt: faker.date.past({ years: 10 }),
    updatedAt: faker.date.recent({ days: 30 })
  };
};

export default function FacultyPortal() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('All');
  const [filterPosition, setFilterPosition] = useState<string>('All');
  const [filterSpecialization, setFilterSpecialization] = useState<string>('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

  useEffect(() => {
    const mockFaculty = Array.from({ length: 25 }, (_, i) => generateMockFaculty(i));
    setFaculty(mockFaculty);
  }, []);

  const filteredFaculty = useMemo(() => {
    return faculty.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = filterDepartment === 'All' || member.department === filterDepartment;
      const matchesPosition = filterPosition === 'All' || member.position === filterPosition;
      const matchesSpecialization = filterSpecialization === 'All' || member.specialization === filterSpecialization;
      
      return matchesSearch && matchesDepartment && matchesPosition && matchesSpecialization;
    });
  }, [faculty, searchTerm, filterDepartment, filterPosition, filterSpecialization]);

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Busy': return 'bg-yellow-100 text-yellow-800';
      case 'Away': return 'bg-orange-100 text-orange-800';
      case 'Unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'Professor': return 'bg-purple-100 text-purple-800';
      case 'Associate Professor': return 'bg-blue-100 text-blue-800';
      case 'Assistant Professor': return 'bg-green-100 text-green-800';
      case 'Lecturer': return 'bg-yellow-100 text-yellow-800';
      case 'Research Scientist': return 'bg-orange-100 text-orange-800';
      case 'Adjunct Professor': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAchievementIcon = (category: string) => {
    switch (category) {
      case 'Teaching': return <GraduationCap className="w-4 h-4" />;
      case 'Research': return <Microscope className="w-4 h-4" />;
      case 'Service': return <Users className="w-4 h-4" />;
      case 'Award': return <Award className="w-4 h-4" />;
      case 'Recognition': return <Trophy className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Faculty Portal</h1>
          <p className="text-gray-600 mt-2">Faculty resources, research tools, and collaboration features</p>
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
                Add Faculty
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Faculty Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input placeholder="Enter email address" />
                  </div>
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Biology">Biology</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Medicine">Medicine</SelectItem>
                        <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Professor">Professor</SelectItem>
                        <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                        <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                        <SelectItem value="Lecturer">Lecturer</SelectItem>
                        <SelectItem value="Research Scientist">Research Scientist</SelectItem>
                        <SelectItem value="Adjunct Professor">Adjunct Professor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea placeholder="Enter bio" rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddModalOpen(false)}>
                  Add Faculty
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
                <p className="text-sm font-medium text-gray-600">Total Faculty</p>
                <p className="text-2xl font-bold text-gray-900">{faculty.length}</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {faculty.filter(f => f.availability.status === 'Available').length} available
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Research</p>
                <p className="text-2xl font-bold text-gray-900">
                  {faculty.reduce((sum, f) => sum + f.research.filter(r => r.status === 'Active').length, 0)}
                </p>
              </div>
              <Microscope className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-blue-600">
                {faculty.reduce((sum, f) => sum + f.publications.length, 0)} publications
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">
                  {faculty.reduce((sum, f) => sum + f.courses.length, 0)}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-purple-600">
                {faculty.reduce((sum, f) => sum + f.courses.filter(c => c.status === 'Active').length, 0)} active
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {faculty.length > 0 ? Math.round(faculty.reduce((sum, f) => sum + f.analytics.overall.performanceScore, 0) / faculty.length) : 0}%
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-blue-600">
                {faculty.reduce((sum, f) => sum + f.analytics.research.citations, 0)} total citations
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
                  placeholder="Search faculty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Departments</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Medicine">Medicine</SelectItem>
                  <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Position</Label>
              <Select value={filterPosition} onValueChange={setFilterPosition}>
                <SelectTrigger>
                  <SelectValue placeholder="All Positions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Positions</SelectItem>
                  <SelectItem value="Professor">Professor</SelectItem>
                  <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                  <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                  <SelectItem value="Lecturer">Lecturer</SelectItem>
                  <SelectItem value="Research Scientist">Research Scientist</SelectItem>
                  <SelectItem value="Adjunct Professor">Adjunct Professor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Specialization</Label>
              <Input
                placeholder="Enter specialization"
                value={filterSpecialization}
                onChange={(e) => setFilterSpecialization(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-gray-600">{member.position}</p>
                    <p className="text-sm text-gray-500">{member.department}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getAvailabilityColor(member.availability.status)}>
                      {member.availability.status}
                    </Badge>
                    <Badge className={getPositionColor(member.position)}>
                      {member.position}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{member.specialization}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Research:</span>
                    <span className="ml-1 font-medium">{member.research.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Publications:</span>
                    <span className="ml-1 font-medium">{member.publications.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Courses:</span>
                    <span className="ml-1 font-medium">{member.courses.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">H-Index:</span>
                    <span className="ml-1 font-medium">{member.analytics.research.hIndex}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Performance Score</span>
                    <span className="font-medium">{member.analytics.overall.performanceScore}%</span>
                  </div>
                  <Progress value={member.analytics.overall.performanceScore} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-1">
                  {member.skills.slice(0, 3).map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {member.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{member.skills.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedFaculty(member);
                        setIsViewModalOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <UserPlus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500">
                    {member.updatedAt.toLocaleDateString()}
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
            <DialogTitle>Faculty Profile</DialogTitle>
          </DialogHeader>
          {selectedFaculty && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg">{selectedFaculty.name}</h3>
                  <p className="text-gray-600">{selectedFaculty.position} - {selectedFaculty.department}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedFaculty.specialization}</p>
                  <p className="text-sm text-gray-600 mt-2">{selectedFaculty.bio}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span className="font-medium">{selectedFaculty.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone:</span>
                    <span className="font-medium">{selectedFaculty.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Availability:</span>
                    <Badge className={getAvailabilityColor(selectedFaculty.availability.status)}>
                      {selectedFaculty.availability.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Performance Score:</span>
                    <span className="font-medium">{selectedFaculty.analytics.overall.performanceScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">H-Index:</span>
                    <span className="font-medium">{selectedFaculty.analytics.research.hIndex}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Citations:</span>
                    <span className="font-medium">{selectedFaculty.analytics.research.citations}</span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="research">Research</TabsTrigger>
                  <TabsTrigger value="teaching">Teaching</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Contact Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span>{selectedFaculty.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>{selectedFaculty.phone}</span>
                          </div>
                          {selectedFaculty.socialLinks.linkedin && (
                            <div className="flex items-center space-x-2">
                              <Linkedin className="w-4 h-4 text-gray-500" />
                              <span>LinkedIn Profile</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Office Hours</h4>
                        <div className="space-y-1 text-sm">
                          {selectedFaculty.officeHours.map((hours, index) => (
                            <div key={index} className="flex justify-between">
                              <span>{hours.day}</span>
                              <span>{hours.startTime} - {hours.endTime}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="research" className="space-y-4">
                  <div className="space-y-3">
                    {selectedFaculty.research.map((project, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{project.title}</span>
                          <Badge className={project.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Funding:</span>
                            <span className="ml-1 font-medium">${project.funding.amount.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Collaborators:</span>
                            <span className="ml-1 font-medium">{project.collaborators.length}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="teaching" className="space-y-4">
                  <div className="space-y-3">
                    {selectedFaculty.courses.map((course, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{course.title} ({course.code})</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{course.semester} {course.year}</Badge>
                            <Badge className={course.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {course.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Credits:</span>
                            <span className="ml-1 font-medium">{course.credits}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Students:</span>
                            <span className="ml-1 font-medium">{course.students}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="achievements" className="space-y-4">
                  <div className="space-y-3">
                    {selectedFaculty.achievements.map((achievement, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{achievement.title}</span>
                          <div className="flex items-center space-x-2">
                            {getAchievementIcon(achievement.category)}
                            <Badge variant="outline">{achievement.category}</Badge>
                            {achievement.verified && (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Year: {achievement.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Teaching Metrics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Courses Taught:</span>
                            <span className="font-medium">{selectedFaculty.analytics.teaching.coursesTaught}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Students Taught:</span>
                            <span className="font-medium">{selectedFaculty.analytics.teaching.studentsTaught}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Average Rating:</span>
                            <span className="font-medium">{selectedFaculty.analytics.teaching.averageRating}/5</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Research Metrics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Publications:</span>
                            <span className="font-medium">{selectedFaculty.analytics.research.publications}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Citations:</span>
                            <span className="font-medium">{selectedFaculty.analytics.research.citations}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">H-Index:</span>
                            <span className="font-medium">{selectedFaculty.analytics.research.hIndex}</span>
                          </div>
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
