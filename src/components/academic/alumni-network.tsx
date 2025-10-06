"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Star, Users, GraduationCap, Briefcase, MapPin, Calendar, MessageSquare,
  Phone, Mail, Linkedin, Globe, Award, TrendingUp, BarChart3, Plus,
  Search, Filter, Edit, Trash2, Eye, Download, Upload, CheckCircle, XCircle,
  AlertTriangle, Target, Clock, Settings, Save, RefreshCw, Share2, Lock,
  Unlock, Copy, ExternalLink, Play, Pause, Stop, Zap, Bell, Heart,
  Building, Microscope, TestTube, FlaskConical, Atom, Brain, Database,
  DollarSign, BookOpen, FileText, Shield, Gavel, Scale, Clipboard, Video,
  Camera, Headphones, Monitor, Smartphone, Tablet, UserCheck, UserPlus
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

interface Alumni {
  id: string;
  name: string;
  email: string;
  phone: string;
  graduationYear: number;
  degree: string;
  major: string;
  currentPosition: string;
  currentCompany: string;
  industry: string;
  location: string;
  bio: string;
  profilePicture: string;
  socialLinks: SocialLinks;
  achievements: Achievement[];
  experience: Experience[];
  education: Education[];
  skills: string[];
  interests: string[];
  availability: Availability;
  mentorship: MentorshipInfo;
  networking: NetworkingInfo;
  donations: Donation[];
  events: EventParticipation[];
  createdAt: Date;
  updatedAt: Date;
}

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  year: number;
  category: 'Academic' | 'Professional' | 'Personal' | 'Award' | 'Publication';
  verified: boolean;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  current: boolean;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate: Date;
  gpa?: number;
}

interface Availability {
  status: 'Available' | 'Busy' | 'Away' | 'Unavailable';
  message: string;
  timezone: string;
  preferredContact: 'Email' | 'Phone' | 'LinkedIn' | 'Any';
}

interface MentorshipInfo {
  offering: boolean;
  seeking: boolean;
  areas: string[];
  experience: string;
  availability: string;
  mentees: string[];
  mentors: string[];
}

interface NetworkingInfo {
  interests: string[];
  lookingFor: string[];
  events: string[];
  groups: string[];
  connections: number;
}

interface Donation {
  id: string;
  amount: number;
  currency: string;
  purpose: string;
  date: Date;
  recurring: boolean;
  anonymous: boolean;
}

interface EventParticipation {
  id: string;
  eventName: string;
  eventType: 'Conference' | 'Workshop' | 'Reunion' | 'Webinar' | 'Networking';
  date: Date;
  role: 'Attendee' | 'Speaker' | 'Organizer' | 'Volunteer';
  status: 'Registered' | 'Attended' | 'Cancelled';
}

const generateMockAlumni = (id: number): Alumni => {
  const degrees = ['Bachelor of Science', 'Master of Science', 'Doctor of Philosophy', 'Master of Business Administration', 'Bachelor of Arts'];
  const majors = ['Computer Science', 'Biology', 'Chemistry', 'Physics', 'Mathematics', 'Engineering', 'Business', 'Medicine', 'Pharmacy'];
  const industries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Government', 'Non-profit', 'Consulting', 'Manufacturing', 'Research'];
  const positions = ['Software Engineer', 'Data Scientist', 'Research Scientist', 'Product Manager', 'Consultant', 'Professor', 'Director', 'CEO', 'CTO'];
  
  const degree = faker.helpers.arrayElement(degrees);
  const major = faker.helpers.arrayElement(majors);
  const industry = faker.helpers.arrayElement(industries);
  const position = faker.helpers.arrayElement(positions);
  
  const achievements: Achievement[] = Array.from({ length: faker.number.int({ min: 2, max: 8 }) }).map(() => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    year: faker.number.int({ min: 2010, max: 2024 }),
    category: faker.helpers.arrayElement(['Academic', 'Professional', 'Personal', 'Award', 'Publication']),
    verified: faker.datatype.boolean(0.8)
  }));
  
  const experience: Experience[] = Array.from({ length: faker.number.int({ min: 2, max: 6 }) }).map(() => ({
    id: faker.string.uuid(),
    company: faker.company.name(),
    position: faker.person.jobTitle(),
    startDate: faker.date.past({ years: 10 }),
    endDate: faker.datatype.boolean(0.7) ? faker.date.past({ years: 1 }) : undefined,
    description: faker.lorem.paragraph(),
    current: faker.datatype.boolean(0.3)
  }));
  
  const education: Education[] = Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
    id: faker.string.uuid(),
    institution: faker.company.name() + ' University',
    degree: faker.helpers.arrayElement(['Bachelor', 'Master', 'PhD', 'MBA']),
    field: faker.helpers.arrayElement(['Computer Science', 'Biology', 'Chemistry', 'Physics', 'Business']),
    startDate: faker.date.past({ years: 15 }),
    endDate: faker.date.past({ years: 5 }),
    gpa: faker.number.float({ min: 2.5, max: 4.0, precision: 0.1 })
  }));
  
  const skills = Array.from({ length: faker.number.int({ min: 5, max: 15 }) }).map(() => faker.lorem.word());
  const interests = Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => faker.lorem.word());
  
  const donations: Donation[] = Array.from({ length: faker.number.int({ min: 0, max: 5 }) }).map(() => ({
    id: faker.string.uuid(),
    amount: faker.number.int({ min: 50, max: 10000 }),
    currency: 'USD',
    purpose: faker.helpers.arrayElement(['Scholarship Fund', 'Research', 'Infrastructure', 'General', 'Emergency Fund']),
    date: faker.date.past({ years: 2 }),
    recurring: faker.datatype.boolean(0.3),
    anonymous: faker.datatype.boolean(0.2)
  }));
  
  const events: EventParticipation[] = Array.from({ length: faker.number.int({ min: 2, max: 8 }) }).map(() => ({
    id: faker.string.uuid(),
    eventName: faker.lorem.words(3),
    eventType: faker.helpers.arrayElement(['Conference', 'Workshop', 'Reunion', 'Webinar', 'Networking']),
    date: faker.date.past({ years: 2 }),
    role: faker.helpers.arrayElement(['Attendee', 'Speaker', 'Organizer', 'Volunteer']),
    status: faker.helpers.arrayElement(['Registered', 'Attended', 'Cancelled'])
  }));
  
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    graduationYear: faker.number.int({ min: 1990, max: 2023 }),
    degree,
    major,
    currentPosition: position,
    currentCompany: faker.company.name(),
    industry,
    location: faker.location.city() + ', ' + faker.location.country(),
    bio: faker.lorem.paragraphs(2),
    profilePicture: faker.image.avatar(),
    socialLinks: {
      linkedin: faker.internet.url(),
      twitter: faker.datatype.boolean(0.7) ? faker.internet.url() : undefined,
      facebook: faker.datatype.boolean(0.5) ? faker.internet.url() : undefined,
      instagram: faker.datatype.boolean(0.4) ? faker.internet.url() : undefined,
      website: faker.datatype.boolean(0.6) ? faker.internet.url() : undefined
    },
    achievements,
    experience,
    education,
    skills,
    interests,
    availability: {
      status: faker.helpers.arrayElement(['Available', 'Busy', 'Away', 'Unavailable']),
      message: faker.lorem.sentence(),
      timezone: faker.location.timeZone(),
      preferredContact: faker.helpers.arrayElement(['Email', 'Phone', 'LinkedIn', 'Any'])
    },
    mentorship: {
      offering: faker.datatype.boolean(0.6),
      seeking: faker.datatype.boolean(0.4),
      areas: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map(() => faker.lorem.word()),
      experience: faker.lorem.sentence(),
      availability: faker.lorem.sentence(),
      mentees: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }).map(() => faker.person.fullName()),
      mentors: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }).map(() => faker.person.fullName())
    },
    networking: {
      interests: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(() => faker.lorem.word()),
      lookingFor: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => faker.lorem.word()),
      events: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map(() => faker.lorem.words(2)),
      groups: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => faker.lorem.words(2)),
      connections: faker.number.int({ min: 50, max: 1000 })
    },
    donations,
    events,
    createdAt: faker.date.past({ years: 5 }),
    updatedAt: faker.date.recent({ days: 30 })
  };
};

export default function AlumniNetwork() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState<string>('All');
  const [filterGraduationYear, setFilterGraduationYear] = useState<string>('All');
  const [filterLocation, setFilterLocation] = useState<string>('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);

  useEffect(() => {
    const mockAlumni = Array.from({ length: 50 }, (_, i) => generateMockAlumni(i));
    setAlumni(mockAlumni);
  }, []);

  const filteredAlumni = useMemo(() => {
    return alumni.filter(alumnus => {
      const matchesSearch = alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           alumnus.currentCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           alumnus.currentPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           alumnus.major.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = filterIndustry === 'All' || alumnus.industry === filterIndustry;
      const matchesGraduationYear = filterGraduationYear === 'All' || alumnus.graduationYear.toString() === filterGraduationYear;
      const matchesLocation = filterLocation === 'All' || alumnus.location.toLowerCase().includes(filterLocation.toLowerCase());
      
      return matchesSearch && matchesIndustry && matchesGraduationYear && matchesLocation;
    });
  }, [alumni, searchTerm, filterIndustry, filterGraduationYear, filterLocation]);

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Busy': return 'bg-yellow-100 text-yellow-800';
      case 'Away': return 'bg-orange-100 text-orange-800';
      case 'Unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAchievementIcon = (category: string) => {
    switch (category) {
      case 'Academic': return <GraduationCap className="w-4 h-4" />;
      case 'Professional': return <Briefcase className="w-4 h-4" />;
      case 'Personal': return <Heart className="w-4 h-4" />;
      case 'Award': return <Award className="w-4 h-4" />;
      case 'Publication': return <FileText className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alumni Network</h1>
          <p className="text-gray-600 mt-2">Connect with graduates, mentors, and industry professionals</p>
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
                Add Alumni
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Alumni</DialogTitle>
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
                    <Label>Graduation Year</Label>
                    <Input type="number" placeholder="Enter graduation year" />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bachelor of Science">Bachelor of Science</SelectItem>
                        <SelectItem value="Master of Science">Master of Science</SelectItem>
                        <SelectItem value="Doctor of Philosophy">Doctor of Philosophy</SelectItem>
                        <SelectItem value="Master of Business Administration">Master of Business Administration</SelectItem>
                        <SelectItem value="Bachelor of Arts">Bachelor of Arts</SelectItem>
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
                  Add Alumni
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
                <p className="text-sm font-medium text-gray-600">Total Alumni</p>
                <p className="text-2xl font-bold text-gray-900">{alumni.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600">
                {alumni.filter(a => a.availability.status === 'Available').length} available
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mentors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {alumni.filter(a => a.mentorship.offering).length}
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-blue-600">
                {alumni.filter(a => a.mentorship.seeking).length} seeking mentorship
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Donations</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${alumni.reduce((sum, a) => sum + a.donations.reduce((dSum, d) => dSum + d.amount, 0), 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-purple-600">
                {alumni.filter(a => a.donations.length > 0).length} donors
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Event Participants</p>
                <p className="text-2xl font-bold text-gray-900">
                  {alumni.reduce((sum, a) => sum + a.events.length, 0)}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-2">
              <span className="text-sm text-orange-600">
                {alumni.filter(a => a.events.length > 0).length} active participants
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
                  placeholder="Search alumni..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Industry</Label>
              <Select value={filterIndustry} onValueChange={setFilterIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Industries</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Government">Government</SelectItem>
                  <SelectItem value="Non-profit">Non-profit</SelectItem>
                  <SelectItem value="Consulting">Consulting</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Research">Research</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Graduation Year</Label>
              <Select value={filterGraduationYear} onValueChange={setFilterGraduationYear}>
                <SelectTrigger>
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Years</SelectItem>
                  {Array.from({ length: 10 }, (_, i) => 2024 - i).map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="Enter location"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map((alumnus, index) => (
          <motion.div
            key={alumnus.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg">{alumnus.name}</CardTitle>
                    <p className="text-sm text-gray-600">{alumnus.currentPosition}</p>
                    <p className="text-sm text-gray-500">{alumnus.currentCompany}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge className={getAvailabilityColor(alumnus.availability.status)}>
                      {alumnus.availability.status}
                    </Badge>
                    <div className="text-xs text-gray-500">
                      Class of {alumnus.graduationYear}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{alumnus.location}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Industry:</span>
                    <span className="ml-1 font-medium">{alumnus.industry}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Degree:</span>
                    <span className="ml-1 font-medium">{alumnus.degree}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Connections:</span>
                    <span className="ml-1 font-medium">{alumnus.networking.connections}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Achievements:</span>
                    <span className="ml-1 font-medium">{alumnus.achievements.length}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {alumnus.skills.slice(0, 3).map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {alumnus.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{alumnus.skills.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedAlumni(alumnus);
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
                    {alumnus.updatedAt.toLocaleDateString()}
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
            <DialogTitle>Alumni Profile</DialogTitle>
          </DialogHeader>
          {selectedAlumni && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg">{selectedAlumni.name}</h3>
                  <p className="text-gray-600">{selectedAlumni.currentPosition} at {selectedAlumni.currentCompany}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedAlumni.bio}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Graduation Year:</span>
                    <span className="font-medium">{selectedAlumni.graduationYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Degree:</span>
                    <span className="font-medium">{selectedAlumni.degree} in {selectedAlumni.major}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Industry:</span>
                    <span className="font-medium">{selectedAlumni.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location:</span>
                    <span className="font-medium">{selectedAlumni.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Availability:</span>
                    <Badge className={getAvailabilityColor(selectedAlumni.availability.status)}>
                      {selectedAlumni.availability.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Connections:</span>
                    <span className="font-medium">{selectedAlumni.networking.connections}</span>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
                  <TabsTrigger value="networking">Networking</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Contact Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span>{selectedAlumni.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>{selectedAlumni.phone}</span>
                          </div>
                          {selectedAlumni.socialLinks.linkedin && (
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
                        <h4 className="font-semibold mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedAlumni.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="experience" className="space-y-4">
                  <div className="space-y-3">
                    {selectedAlumni.experience.map((exp, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{exp.position}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">{exp.company}</span>
                            {exp.current && (
                              <Badge className="bg-green-100 text-green-800">Current</Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{exp.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">
                            {exp.startDate.toLocaleDateString()} - {exp.endDate ? exp.endDate.toLocaleDateString() : 'Present'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="achievements" className="space-y-4">
                  <div className="space-y-3">
                    {selectedAlumni.achievements.map((achievement, index) => (
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
                
                <TabsContent value="mentorship" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Mentorship Status</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Offering Mentorship:</span>
                            <Badge className={selectedAlumni.mentorship.offering ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {selectedAlumni.mentorship.offering ? 'Yes' : 'No'}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Seeking Mentorship:</span>
                            <Badge className={selectedAlumni.mentorship.seeking ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                              {selectedAlumni.mentorship.seeking ? 'Yes' : 'No'}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Mentorship Areas</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedAlumni.mentorship.areas.map((area, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="networking" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Interests</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedAlumni.networking.interests.map((interest, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Looking For</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedAlumni.networking.lookingFor.map((item, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {item}
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
