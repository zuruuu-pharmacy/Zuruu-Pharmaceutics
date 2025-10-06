"use client";

import { 
  BookText, Calculator, FlaskConical, ShieldAlert, ScanEye, User, Users, TestTube, 
  ShieldEllipsis, UserPlus, FileClock, Stethoscope, Siren, ShoppingCart, Microscope, 
  Apple, Bot, BookOpen, Library, Leaf, GraduationCap, FileHeart, HelpCircle, 
  CaseSensitive, FileJson, Beaker, Video, Network, Puzzle, Combine, CalendarDays, 
  FolderOpen, Replace, BookA, MessageSquare, ClipboardList, MessageCircleQuestion, 
  Compass, Search, BarChart, Camera, ScanSearch, WifiOff, Mic, LucideIcon 
} from "lucide-react";

export interface ToolCard {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  color: string;
  badge?: string;
}

export const pharmacistTools: ToolCard[] = [
  {
    icon: Users,
    title: "Patients",
    description: "Manage patient records and select an active patient.",
    href: "/patients",
    color: "text-cyan-500",
  },
  {
    icon: User,
    title: "Patient History Form",
    description: "Add or edit detailed patient history.",
    href: "/patient-history",
    color: "text-blue-400",
  },
  {
    icon: Stethoscope,
    title: "Symptom Checker",
    description: "Guide patients through a symptom triage.",
    href: "/symptom-checker",
    color: "text-rose-500",
  },
  {
    icon: Apple,
    title: "Simple Diet Planner",
    description: "Generate a diet plan based on patient profile.",
    href: "/diet-planner",
    color: "text-lime-500",
  },
  {
    icon: BookText,
    title: "Drug Monograph Lookup",
    description: "Access comprehensive drug information.",
    href: "/monograph",
    color: "text-blue-500",
  },
  {
    icon: ShieldAlert,
    title: "Allergy Checker",
    description: "Check for drug allergies and interactions.",
    href: "/allergy-checker",
    color: "text-red-500",
  },
  {
    icon: Calculator,
    title: "Dose Calculator",
    description: "Calculate accurate medication dosages.",
    href: "/dose-calculator",
    color: "text-green-500",
  },
  {
    icon: ScanEye,
    title: "Prescription Reader",
    description: "AI-powered prescription interpretation.",
    href: "/prescription-reader",
    color: "text-purple-500",
  },
  {
    icon: FlaskConical,
    title: "Lab Report Analyzer",
    description: "Analyze and interpret lab results.",
    href: "/lab-report-analyzer",
    color: "text-orange-500",
  },
  {
    icon: FileClock,
    title: "Adherence Reporter",
    description: "Track patient medication adherence.",
    href: "/adherence-reporter",
    color: "text-indigo-500",
  },
  {
    icon: ShoppingCart,
    title: "Refill Manager",
    description: "Manage prescription refills and renewals.",
    href: "/refill-manager",
    color: "text-teal-500",
  },
  {
    icon: Leaf,
    title: "Herbal Knowledge Hub",
    description: "Comprehensive herbal medicine database.",
    href: "/herbal-knowledge-hub",
    color: "text-emerald-500",
  },
];

export const studentTools: ToolCard[] = [
  {
    icon: GraduationCap,
    title: "Lecture Notes Analyzer",
    description: "AI-powered analysis of lecture notes.",
    href: "/lecture-notes",
    color: "text-blue-600",
  },
  {
    icon: BookOpen,
    title: "Notes Organizer",
    description: "Organize and manage study notes.",
    href: "/notes-organizer",
    color: "text-green-600",
  },
  {
    icon: TestTube,
    title: "Clinical Case Simulator",
    description: "Practice with realistic clinical scenarios.",
    href: "/clinical-case-simulator",
    color: "text-purple-600",
  },
  {
    icon: Puzzle,
    title: "OSCE Station Generator",
    description: "Generate practice OSCE stations.",
    href: "/osce-station-generator",
    color: "text-orange-600",
  },
  {
    icon: FileJson,
    title: "SOP Generator",
    description: "Generate standard operating procedures.",
    href: "/sop-generator",
    color: "text-indigo-600",
  },
  {
    icon: MessageSquare,
    title: "Student Discussion Forum",
    description: "Collaborate with fellow students.",
    href: "/student-discussion-forum",
    color: "text-cyan-600",
  },
  {
    icon: ClipboardList,
    title: "Study Planner",
    description: "Create personalized study schedules.",
    href: "/study-planner",
    color: "text-pink-600",
  },
  {
    icon: CaseSensitive,
    title: "Plagiarism Checker",
    description: "Check academic work for plagiarism.",
    href: "/plagiarism-checker",
    color: "text-red-600",
  },
  {
    icon: BookA,
    title: "Reference Generator",
    description: "Generate proper academic citations.",
    href: "/reference-generator",
    color: "text-yellow-600",
  },
  {
    icon: Video,
    title: "Text to Speech",
    description: "Convert text to speech for accessibility.",
    href: "/text-to-speech",
    color: "text-violet-600",
  },
];

export const gameTools: ToolCard[] = [
  {
    icon: Combine,
    title: "Anagram Generator",
    description: "Create anagram puzzles for learning.",
    href: "/anagram-generator",
    color: "text-blue-500",
  },
  {
    icon: Network,
    title: "Crossword Generator",
    description: "Generate crossword puzzles for study.",
    href: "/crossword-generator",
    color: "text-green-500",
  },
  {
    icon: Search,
    title: "Word Search Generator",
    description: "Create word search puzzles.",
    href: "/word-search-generator",
    color: "text-purple-500",
  },
  {
    icon: Puzzle,
    title: "Matching Game Generator",
    description: "Generate matching games for learning.",
    href: "/matching-game-generator",
    color: "text-orange-500",
  },
  {
    icon: TestTube,
    title: "Rapid Fire Quiz Generator",
    description: "Create quick quiz challenges.",
    href: "/rapid-fire-quiz-generator",
    color: "text-red-500",
  },
  {
    icon: BookOpen,
    title: "Flashcard Generator",
    description: "Generate study flashcards.",
    href: "/flashcard-generator",
    color: "text-indigo-500",
  },
  {
    icon: BarChart,
    title: "MCQ Bank",
    description: "Access comprehensive question bank.",
    href: "/mcq-bank",
    color: "text-teal-500",
  },
  {
    icon: Compass,
    title: "Drug Classification Tree",
    description: "Interactive drug classification learning.",
    href: "/drug-classification-tree",
    color: "text-cyan-500",
  },
  {
    icon: Microscope,
    title: "Virtual Lab Simulator",
    description: "Simulate laboratory experiments.",
    href: "/virtual-lab-simulator",
    color: "text-lime-500",
  },
];

export const calculatorTools: ToolCard[] = [
  {
    icon: Calculator,
    title: "BSA Dose Calculator",
    description: "Calculate doses based on body surface area.",
    href: "/bsa-dose-calculator",
    color: "text-blue-500",
  },
  {
    icon: TestTube,
    title: "IV Rate Calculator",
    description: "Calculate intravenous infusion rates.",
    href: "/iv-rate-calculator",
    color: "text-green-500",
  },
  {
    icon: FlaskConical,
    title: "Compounding Calculator",
    description: "Calculate compounding formulations.",
    href: "/compounding-calculator",
    color: "text-purple-500",
  },
];

export const quickActions: ToolCard[] = [
  {
    icon: UserPlus,
    title: "Add Patient",
    description: "Quickly add a new patient",
    href: "/patients",
    color: "text-blue-500",
  },
  {
    icon: FileClock,
    title: "Check Adherence",
    description: "Review patient adherence",
    href: "/adherence-reporter",
    color: "text-green-500",
  },
  {
    icon: Calculator,
    title: "Calculate Dose",
    description: "Quick dose calculation",
    href: "/dose-calculator",
    color: "text-purple-500",
  },
  {
    icon: BookText,
    title: "Lookup Drug",
    description: "Find drug information",
    href: "/monograph",
    color: "text-orange-500",
  },
  {
    icon: ShieldAlert,
    title: "Check Allergies",
    description: "Verify drug allergies",
    href: "/allergy-checker",
    color: "text-red-500",
  },
  {
    icon: ScanEye,
    title: "Read Prescription",
    description: "Interpret prescription",
    href: "/prescription-reader",
    color: "text-cyan-500",
  },
];
