"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Users, UserPlus, Search, Download, Edit, Trash2, Eye, Save,
  UserCheck, GraduationCap, Award, BookOpen, DollarSign, Clock
} from 'lucide-react';

interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  emergencyContact: string;
  emergencyPhone: string;
  enrollmentDate: string;
  status: 'Active' | 'Inactive' | 'Graduated' | 'Suspended';
  program: string;
  year: '1st' | '2nd' | '3rd' | '4th' | '5th';
  gpa: number;
  credits: number;
  courses: Course[];
  attendance: AttendanceRecord[];
  fees: FeeRecord[];
  grades: GradeRecord[];
}

interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  instructor: string;
  schedule: string;
  room: string;
  status: 'Enrolled' | 'Completed' | 'Dropped';
}

interface AttendanceRecord {
  id: string;
  courseId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  notes?: string;
}

interface FeeRecord {
  id: string;
  type: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  paymentDate?: string;
}

interface GradeRecord {
  id: string;
  courseId: string;
  assignment: string;
  grade: number;
  maxGrade: number;
  percentage: number;
  date: string;
}

function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'Male',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    emergencyContact: '',
    emergencyPhone: '',
    program: '',
    year: '1st'
  });

  // Initialize with comprehensive sample data
  useEffect(() => {
    const sampleStudents: Student[] = [
      {
        id: '1',
        studentId: 'STU001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@university.edu',
        phone: '+1-555-0123',
        dateOfBirth: '2000-05-15',
        gender: 'Male',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        emergencyContact: 'Jane Doe',
        emergencyPhone: '+1-555-0124',
        enrollmentDate: '2023-09-01',
        status: 'Active',
        program: 'Computer Science',
        year: '2nd',
        gpa: 3.7,
        credits: 45,
        courses: [
          {
            id: '1',
            code: 'CS101',
            name: 'Introduction to Programming',
            credits: 3,
            instructor: 'Dr. Smith',
            schedule: 'MWF 10:00-11:00',
            room: 'CS-101',
            status: 'Enrolled'
          },
          {
            id: '2',
            code: 'CS201',
            name: 'Data Structures',
            credits: 3,
            instructor: 'Dr. Johnson',
            schedule: 'TTH 2:00-3:30',
            room: 'CS-201',
            status: 'Enrolled'
          },
          {
            id: '3',
            code: 'MATH101',
            name: 'Calculus I',
            credits: 4,
            instructor: 'Prof. Brown',
            schedule: 'MWF 1:00-2:00',
            room: 'MATH-101',
            status: 'Completed'
          }
        ],
        attendance: [
          {
            id: '1',
            courseId: '1',
            date: '2024-01-15',
            status: 'Present',
            notes: ''
          },
          {
            id: '2',
            courseId: '1',
            date: '2024-01-17',
            status: 'Late',
            notes: 'Traffic delay'
          },
          {
            id: '3',
            courseId: '2',
            date: '2024-01-16',
            status: 'Present',
            notes: ''
          }
        ],
        fees: [
          {
            id: '1',
            type: 'Tuition',
            amount: 5000,
            dueDate: '2024-01-15',
            status: 'Paid',
            paymentDate: '2024-01-10'
          },
          {
            id: '2',
            type: 'Lab Fee',
            amount: 200,
            dueDate: '2024-02-01',
            status: 'Pending'
          },
          {
            id: '3',
            type: 'Library Fee',
            amount: 50,
            dueDate: '2024-01-20',
            status: 'Overdue'
          }
        ],
        grades: [
          {
            id: '1',
            courseId: '1',
            assignment: 'Midterm Exam',
            grade: 85,
            maxGrade: 100,
            percentage: 85,
            date: '2024-01-20'
          },
          {
            id: '2',
            courseId: '1',
            assignment: 'Programming Assignment 1',
            grade: 92,
            maxGrade: 100,
            percentage: 92,
            date: '2024-01-25'
          },
          {
            id: '3',
            courseId: '2',
            assignment: 'Data Structures Quiz',
            grade: 78,
            maxGrade: 100,
            percentage: 78,
            date: '2024-01-22'
          }
        ]
      },
      {
        id: '2',
        studentId: 'STU002',
        firstName: 'Sarah',
        lastName: 'Wilson',
        email: 'sarah.wilson@university.edu',
        phone: '+1-555-0125',
        dateOfBirth: '1999-08-22',
        gender: 'Female',
        address: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA',
        emergencyContact: 'Mike Wilson',
        emergencyPhone: '+1-555-0126',
        enrollmentDate: '2023-09-01',
        status: 'Active',
        program: 'Business Administration',
        year: '3rd',
        gpa: 3.9,
        credits: 75,
        courses: [
          {
            id: '4',
            code: 'BUS301',
            name: 'Strategic Management',
            credits: 3,
            instructor: 'Prof. Davis',
            schedule: 'MW 1:00-2:30',
            room: 'BUS-301',
            status: 'Enrolled'
          },
          {
            id: '5',
            code: 'BUS302',
            name: 'Financial Analysis',
            credits: 3,
            instructor: 'Dr. Lee',
            schedule: 'TTH 10:00-11:30',
            room: 'BUS-302',
            status: 'Enrolled'
          }
        ],
        attendance: [
          {
            id: '4',
            courseId: '4',
            date: '2024-01-15',
            status: 'Present',
            notes: ''
          }
        ],
        fees: [
          {
            id: '4',
            type: 'Tuition',
            amount: 5000,
            dueDate: '2024-01-15',
            status: 'Paid',
            paymentDate: '2024-01-12'
          }
        ],
        grades: [
          {
            id: '4',
            courseId: '4',
            assignment: 'Case Study Analysis',
            grade: 95,
            maxGrade: 100,
            percentage: 95,
            date: '2024-01-18'
          }
        ]
      },
      {
        id: '3',
        studentId: 'STU003',
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael.chen@university.edu',
        phone: '+1-555-0127',
        dateOfBirth: '2001-03-10',
        gender: 'Male',
        address: '789 Pine St',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA',
        emergencyContact: 'Lisa Chen',
        emergencyPhone: '+1-555-0128',
        enrollmentDate: '2023-09-01',
        status: 'Graduated',
        program: 'Engineering',
        year: '5th',
        gpa: 3.8,
        credits: 120,
        courses: [],
        attendance: [],
        fees: [],
        grades: []
      }
    ];
    
    setStudents(sampleStudents);
    setFilteredStudents(sampleStudents);
  }, []);

  // Filter students based on search and filters
  useEffect(() => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(student => student.status === statusFilter);
    }

    if (yearFilter !== 'All') {
      filtered = filtered.filter(student => student.year === yearFilter);
    }

    setFilteredStudents(filtered);
  }, [students, searchTerm, statusFilter, yearFilter]);

  const handleAddStudent = () => {
    const newStudent: Student = {
      id: Date.now().toString(),
      studentId: `STU${String(students.length + 1).padStart(3, '0')}`,
      ...formData,
      gender: formData.gender as 'Male' | 'Female' | 'Other',
      year: formData.year as '1st' | '2nd' | '3rd' | '4th' | '5th',
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      gpa: 0,
      credits: 0,
      courses: [],
      attendance: [],
      fees: [],
      grades: []
    };

    setStudents([...students, newStudent]);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEditStudent = () => {
    if (selectedStudent) {
      const updatedStudents = students.map(student =>
        student.id === selectedStudent.id
          ? { ...selectedStudent, ...formData, gender: formData.gender as 'Male' | 'Female' | 'Other', year: formData.year as '1st' | '2nd' | '3rd' | '4th' | '5th' }
          : student
      );
      setStudents(updatedStudents);
      setIsEditModalOpen(false);
      resetForm();
    }
  };

  const handleDeleteStudent = (studentId: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(student => student.id !== studentId));
    }
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: 'Male',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      emergencyContact: '',
      emergencyPhone: '',
      program: '',
      year: '1st'
    });
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const exportStudents = () => {
    const csvContent = [
      ['Student ID', 'Name', 'Email', 'Phone', 'Program', 'Year', 'Status', 'GPA', 'Credits'],
      ...filteredStudents.map(student => [
        student.studentId,
        `${student.firstName} ${student.lastName}`,
        student.email,
        student.phone,
        student.program,
        student.year,
        student.status,
        student.gpa.toString(),
        student.credits.toString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Graduated': return 'bg-blue-100 text-blue-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Student Management System</h2>
          <p className="text-gray-600">Comprehensive student information and academic management</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={exportStudents} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.filter(s => s.status === 'Active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Graduated</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.filter(s => s.status === 'Graduated').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average GPA</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.length > 0 
                    ? (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2)
                    : '0.00'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Students</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name, ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-48">
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Graduated">Graduated</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:w-48">
              <Label htmlFor="year-filter">Year</Label>
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Years</SelectItem>
                  <SelectItem value="1st">1st Year</SelectItem>
                  <SelectItem value="2nd">2nd Year</SelectItem>
                  <SelectItem value="3rd">3rd Year</SelectItem>
                  <SelectItem value="4th">4th Year</SelectItem>
                  <SelectItem value="5th">5th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Students ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Student ID</th>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Program</th>
                  <th className="text-left p-4">Year</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">GPA</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm">{student.studentId}</td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{student.firstName} {student.lastName}</div>
                        <div className="text-sm text-gray-500">{student.phone}</div>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{student.email}</td>
                    <td className="p-4 text-sm">{student.program}</td>
                    <td className="p-4 text-sm">{student.year}</td>
                    <td className="p-4">
                      <Badge className={getStatusColor(student.status)}>
                        {student.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm font-medium">{student.gpa.toFixed(2)}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewStudent(student)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedStudent(student);
                            setFormData({
                              firstName: student.firstName,
                              lastName: student.lastName,
                              email: student.email,
                              phone: student.phone,
                              dateOfBirth: student.dateOfBirth,
                              gender: student.gender,
                              address: student.address,
                              city: student.city,
                              state: student.state,
                              zipCode: student.zipCode,
                              country: student.country,
                              emergencyContact: student.emergencyContact,
                              emergencyPhone: student.emergencyPhone,
                              program: student.program,
                              year: student.year
                            });
                            setIsEditModalOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Student Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleFormChange('firstName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleFormChange('lastName', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleFormChange('dateOfBirth', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleFormChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleFormChange('address', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleFormChange('city', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleFormChange('state', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleFormChange('zipCode', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleFormChange('emergencyContact', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Emergency Phone</Label>
                <Input
                  id="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleFormChange('emergencyPhone', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="program">Program</Label>
                <Input
                  id="program"
                  value={formData.program}
                  onChange={(e) => handleFormChange('program', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Select value={formData.year} onValueChange={(value) => handleFormChange('year', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st Year</SelectItem>
                    <SelectItem value="2nd">2nd Year</SelectItem>
                    <SelectItem value="3rd">3rd Year</SelectItem>
                    <SelectItem value="4th">4th Year</SelectItem>
                    <SelectItem value="5th">5th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStudent}>
                <Save className="w-4 h-4 mr-2" />
                Add Student
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Student Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-firstName">First Name</Label>
                <Input
                  id="edit-firstName"
                  value={formData.firstName}
                  onChange={(e) => handleFormChange('firstName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="edit-lastName">Last Name</Label>
                <Input
                  id="edit-lastName"
                  value={formData.lastName}
                  onChange={(e) => handleFormChange('lastName', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditStudent}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Student Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="fees">Fees</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Student ID</Label>
                    <p className="font-mono text-sm">{selectedStudent.studentId}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusColor(selectedStudent.status)}>
                      {selectedStudent.status}
                    </Badge>
                  </div>
                  <div>
                    <Label>Name</Label>
                    <p>{selectedStudent.firstName} {selectedStudent.lastName}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p>{selectedStudent.email}</p>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <p>{selectedStudent.phone}</p>
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    <p>{selectedStudent.dateOfBirth}</p>
                  </div>
                  <div>
                    <Label>Address</Label>
                    <p>{selectedStudent.address}, {selectedStudent.city}, {selectedStudent.state} {selectedStudent.zipCode}</p>
                  </div>
                  <div>
                    <Label>Emergency Contact</Label>
                    <p>{selectedStudent.emergencyContact} - {selectedStudent.emergencyPhone}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="academic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Program</Label>
                    <p>{selectedStudent.program}</p>
                  </div>
                  <div>
                    <Label>Year</Label>
                    <p>{selectedStudent.year}</p>
                  </div>
                  <div>
                    <Label>GPA</Label>
                    <p className="text-2xl font-bold">{selectedStudent.gpa.toFixed(2)}</p>
                  </div>
                  <div>
                    <Label>Credits</Label>
                    <p className="text-2xl font-bold">{selectedStudent.credits}</p>
                  </div>
                </div>

                <div>
                  <Label>Courses</Label>
                  <div className="space-y-2 mt-2">
                    {selectedStudent.courses.map((course) => (
                      <Card key={course.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{course.name} ({course.code})</h4>
                              <p className="text-sm text-gray-600">
                                {course.instructor} • {course.schedule} • {course.room}
                              </p>
                              <p className="text-sm text-gray-500">{course.credits} credits</p>
                            </div>
                            <Badge className={getStatusColor(course.status)}>
                              {course.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Recent Grades</Label>
                  <div className="space-y-2 mt-2">
                    {selectedStudent.grades.map((grade) => (
                      <Card key={grade.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{grade.assignment}</h4>
                              <p className="text-sm text-gray-600">{grade.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold">{grade.grade}/{grade.maxGrade}</p>
                              <p className="text-sm text-gray-600">{grade.percentage}%</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="attendance" className="space-y-4">
                <div className="space-y-2">
                  {selectedStudent.attendance.map((record) => (
                    <Card key={record.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{record.date}</h4>
                            <p className="text-sm text-gray-600">Course: {record.courseId}</p>
                            {record.notes && <p className="text-sm text-gray-500">{record.notes}</p>}
                          </div>
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="fees" className="space-y-4">
                <div className="space-y-2">
                  {selectedStudent.fees.map((fee) => (
                    <Card key={fee.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{fee.type}</h4>
                            <p className="text-sm text-gray-600">Due: {fee.dueDate}</p>
                            {fee.paymentDate && <p className="text-sm text-gray-500">Paid: {fee.paymentDate}</p>}
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">${fee.amount}</p>
                            <Badge className={getStatusColor(fee.status)}>
                              {fee.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentManagement;
