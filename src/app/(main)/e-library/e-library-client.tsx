
"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Search, Library, FileText, Beaker, Lightbulb, GraduationCap, Link, BookOpen, Upload, Folder, KeyRound, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const teacherUploadSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  author: z.string().min(2, "Author name is required"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  accessCode: z.string().min(4, "Access code must be at least 4 characters"),
  bookFile: z.any().refine(file => file?.length === 1, "A PDF file is required."),
});

type TeacherUploadValues = z.infer<typeof teacherUploadSchema>;

const BOOK_CATEGORIES = [
  "Core Pharmacology",
  "Clinical Practice", 
  "Chemistry",
  "Pharmacotherapy",
  "Research Methods",
  "Pharmaceutics",
  "Regulatory Affairs",
  "Other"
];

// Mock books data for demonstration
const mockBooks = [
  {
    id: 1,
    title: "Introduction to Pharmacology",
    author: "Dr. Sarah Johnson",
    category: "Core Pharmacology",
    description: "A comprehensive guide covering the fundamental principles of pharmacology, drug interactions, and therapeutic applications.",
    fileSize: "2.4 MB",
    uploadDate: "2024-01-15",
    accessCode: "PHARM101"
  },
  {
    id: 2,
    title: "Clinical Drug Therapy",
    author: "Prof. Michael Chen",
    category: "Clinical Practice",
    description: "Essential clinical practices for drug administration, patient monitoring, and therapeutic outcomes in clinical settings.",
    fileSize: "3.1 MB",
    uploadDate: "2024-01-20",
    accessCode: "CLIN202"
  },
  {
    id: 3,
    title: "Pharmaceutical Chemistry Fundamentals",
    author: "Dr. Emily Rodriguez",
    category: "Chemistry",
    description: "Core concepts in pharmaceutical chemistry including drug synthesis, molecular structure, and chemical properties.",
    fileSize: "1.8 MB",
    uploadDate: "2024-01-25",
    accessCode: "CHEM303"
  },
  {
    id: 4,
    title: "Advanced Pharmacotherapy",
    author: "Dr. James Wilson",
    category: "Pharmacotherapy",
    description: "Advanced treatment protocols and therapeutic strategies for complex medical conditions and drug management.",
    fileSize: "4.2 MB",
    uploadDate: "2024-02-01",
    accessCode: "THER404"
  },
  {
    id: 5,
    title: "Research Methods in Pharmacy",
    author: "Prof. Lisa Anderson",
    category: "Research Methods",
    description: "Methodological approaches to pharmaceutical research, clinical trials, and evidence-based practice.",
    fileSize: "2.9 MB",
    uploadDate: "2024-02-05",
    accessCode: "RES505"
  },
  {
    id: 6,
    title: "Pharmaceutics and Drug Delivery",
    author: "Dr. Robert Kim",
    category: "Pharmaceutics",
    description: "Drug formulation, delivery systems, and pharmaceutical technology for optimal therapeutic outcomes.",
    fileSize: "3.7 MB",
    uploadDate: "2024-02-10",
    accessCode: "PHARM606"
  }
];

export function ELibraryClient() {
  const { toast } = useToast();
  const [isTeacherUploadPending, setTeacherUploadPending] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isAccessCodeModalOpen, setIsAccessCodeModalOpen] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [isAccessCodeValid, setIsAccessCodeValid] = useState(false);
  const [isStudentAccessModalOpen, setIsStudentAccessModalOpen] = useState(false);
  const [studentAccessCode, setStudentAccessCode] = useState("");
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const teacherForm = useForm<TeacherUploadValues>({
    resolver: zodResolver(teacherUploadSchema),
    defaultValues: {
      title: "",
      author: "",
      category: "",
      description: "",
      accessCode: "",
      bookFile: undefined,
    },
  });

  const handleAccessCodeSubmit = () => {
    if (accessCode === "239774") {
      setIsAccessCodeValid(true);
      setIsAccessCodeModalOpen(false);
      setIsTeacherModalOpen(true);
      toast({
        title: "Access granted!",
        description: "You can now upload books to the library.",
      });
    } else {
      toast({
        title: "Invalid access code",
        description: "Please enter the correct access code.",
        variant: "destructive",
      });
    }
  };

  const handleTeacherUpload = teacherForm.handleSubmit(async (data) => {
    setTeacherUploadPending(true);
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Book uploaded successfully!",
        description: `"${data.title}" has been added to the library.`,
      });
      
      teacherForm.reset();
      setIsTeacherModalOpen(false);
      setIsAccessCodeValid(false);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setTeacherUploadPending(false);
    }
  });

  const handleTeacherUploadClick = () => {
    if (isAccessCodeValid) {
      setIsTeacherModalOpen(true);
    } else {
      setIsAccessCodeModalOpen(true);
    }
  };

  const handleDownload = (book: any) => {
    setSelectedBook(book);
    setIsStudentAccessModalOpen(true);
  };

  const handleStudentAccessSubmit = () => {
    if (studentAccessCode === selectedBook?.accessCode) {
      toast({
        title: "Access granted!",
        description: `Downloading "${selectedBook.title}"...`,
      });
      // Simulate download
      setTimeout(() => {
        toast({
          title: "Download complete!",
          description: `"${selectedBook.title}" has been downloaded.`,
        });
      }, 1000);
      setIsStudentAccessModalOpen(false);
      setStudentAccessCode("");
      setSelectedBook(null);
    } else {
      toast({
        title: "Invalid access code",
        description: "Please enter the correct access code for this book.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Teacher Upload */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Library className="h-8 w-8 text-blue-600" />
            E Library
          </h1>
          <p className="text-muted-foreground mt-2">
            Search for information and access educational resources
          </p>
        </div>
        <Dialog open={isAccessCodeModalOpen} onOpenChange={setIsAccessCodeModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" />
                Teacher Access Required
              </DialogTitle>
              <DialogDescription>
                Please enter the access code to upload books to the library.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAccessCodeSubmit()}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAccessCodeModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAccessCodeSubmit}>
                Verify Access
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isTeacherModalOpen} onOpenChange={setIsTeacherModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" onClick={handleTeacherUploadClick}>
              <Upload className="h-4 w-4" />
              Teacher Upload
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Book to Library
              </DialogTitle>
              <DialogDescription>
                Add a new book to the library for students to access
              </DialogDescription>
            </DialogHeader>
            <Form {...teacherForm}>
              <form onSubmit={handleTeacherUpload} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={teacherForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Book Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter book title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={teacherForm.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter author name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={teacherForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {BOOK_CATEGORIES.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={teacherForm.control}
                    name="accessCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Access Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter access code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={teacherForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter book description" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={teacherForm.control}
                  name="bookFile"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel>PDF Book File</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => onChange(e.target.files)}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsTeacherModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isTeacherUploadPending}>
                    {isTeacherUploadPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Book
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Student Access Modal */}
        <Dialog open={isStudentAccessModalOpen} onOpenChange={setIsStudentAccessModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" />
                Book Access Required
              </DialogTitle>
              <DialogDescription>
                Please enter the access code to download "{selectedBook?.title}".
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold">{selectedBook?.title}</h4>
                <p className="text-sm text-muted-foreground">by {selectedBook?.author}</p>
                <p className="text-xs text-muted-foreground mt-1">Access Code: {selectedBook?.accessCode}</p>
              </div>
              <Input
                type="password"
                placeholder="Enter access code"
                value={studentAccessCode}
                onChange={(e) => setStudentAccessCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleStudentAccessSubmit()}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsStudentAccessModalOpen(false);
                setStudentAccessCode("");
                setSelectedBook(null);
              }}>
                Cancel
              </Button>
              <Button onClick={handleStudentAccessSubmit}>
                Download Book
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-muted/30 rounded-lg">
        <Library className="h-24 w-24 text-muted-foreground/50 mb-6" />
        <h2 className="text-3xl font-bold text-muted-foreground mb-4">Welcome to the E Library</h2>
        <p className="text-lg text-muted-foreground/80 mb-6 max-w-2xl">
          A comprehensive digital library for pharmaceutical and medical resources. 
          Teachers can upload books and students can access educational materials.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Upload className="h-5 w-5" />
            <span>Teacher Upload</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="h-5 w-5" />
            <span>Student Access</span>
          </div>
        </div>
      </div>

      {/* Student Book Preview Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            Available Books
          </h2>
          <Badge variant="outline" className="text-sm">
            {mockBooks.length} Books Available
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBooks.map((book, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                    <CardDescription className="text-sm">by {book.author}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-2">{book.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">{book.description}</p>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>PDF • {book.fileSize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleDownload(book)}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockBooks.length === 0 && (
          <Card className="flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">No Books Available</h3>
            <p className="text-muted-foreground/80">Teachers haven't uploaded any books yet.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
