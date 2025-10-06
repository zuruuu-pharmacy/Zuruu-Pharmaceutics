"use client";

import { useActionState, useEffect, useState, useTransition, useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { 
  allergyChecker, 
  scanIngredient, 
  getEnvironmentalData, 
  generateEmergencyCard,
  testAllergyChecker,
  type AllergyCheckerOutput,
  type AllergyCheckerInput 
} from "@/ai/flows/allergy-checker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useMode } from "@/contexts/mode-context";
import { usePatient } from "@/contexts/patient-context";
import Link from "next/link";
import { 
  Loader2, 
  AlertTriangle, 
  ShieldCheck, 
  User, 
  Camera, 
  Mic, 
  MicOff, 
  MapPin, 
  Scan, 
  Phone, 
  Download, 
  Share2,
  Heart,
  Wind,
  Sun,
  Droplets,
  Eye,
  Brain,
  BookOpen,
  Video,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  Activity,
  Thermometer,
  Gauge
} from "lucide-react";

// Form schemas for different modules
const symptomFormSchema = z.object({
  description: z.string().min(10, "Please describe your symptoms in detail"),
  severity: z.enum(['mild', 'moderate', 'severe', 'emergency']),
  onsetTime: z.string().min(1, "When did symptoms start?"),
  duration: z.string().min(1, "How long have symptoms lasted?"),
  triggers: z.array(z.string()).optional(),
  bodyParts: z.array(z.string()).optional(),
});

const healthProfileSchema = z.object({
  chronicConditions: z.array(z.string()).optional(),
  pastAllergyTests: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),
  vaccinations: z.array(z.string()).optional(),
  familyAllergyHistory: z.array(z.string()).optional(),
  previousReactions: z.array(z.string()).optional(),
});

const ingredientScanSchema = z.object({
  barcode: z.string().optional(),
  productName: z.string().optional(),
});

type SymptomFormValues = z.infer<typeof symptomFormSchema>;
type HealthProfileFormValues = z.infer<typeof healthProfileSchema>;
type IngredientScanFormValues = z.infer<typeof ingredientScanSchema>;

export function AllergyClient() {
  const [isPending, startTransition] = useTransition();
  const [currentTab, setCurrentTab] = useState("symptoms");
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [environmentalData, setEnvironmentalData] = useState<any>(null);
  const [assessment, setAssessment] = useState<AllergyCheckerOutput | null>(null);
  const [emergencyCard, setEmergencyCard] = useState<any>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [voiceNote, setVoiceNote] = useState<string>("");
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mode } = useMode();
  const { getActivePatientRecord } = usePatient();
  const activePatientRecord = getActivePatientRecord();
  const { toast } = useToast();

  // Forms
  const symptomForm = useForm<SymptomFormValues>({
    resolver: zodResolver(symptomFormSchema),
    defaultValues: {
      description: "",
      severity: "mild",
      onsetTime: "",
      duration: "",
      triggers: [],
      bodyParts: [],
    },
  });

  const healthProfileForm = useForm<HealthProfileFormValues>({
    resolver: zodResolver(healthProfileSchema),
    defaultValues: {
      chronicConditions: [],
      pastAllergyTests: [],
      medications: [],
      vaccinations: [],
      familyAllergyHistory: [],
      previousReactions: [],
    },
  });

  const ingredientScanForm = useForm<IngredientScanFormValues>({
    resolver: zodResolver(ingredientScanSchema),
    defaultValues: {
      barcode: "",
      productName: "",
    },
  });
  
  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Location access denied:", error);
        }
      );
    }
  }, []);

  // Get environmental data when location is available
  useEffect(() => {
    if (location) {
      getEnvironmentalData(location).then(setEnvironmentalData).catch(console.error);
    }
  }, [location]);

  // Voice recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        // Convert to text (simplified - in real app, use speech-to-text API)
        setVoiceNote("Voice note recorded - transcription would go here");
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not access microphone" });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Photo upload
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPhotos(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Emergency mode toggle
  const toggleEmergencyMode = () => {
    setEmergencyMode(!emergencyMode);
    if (!emergencyMode) {
      toast({ title: "Emergency Mode Activated", description: "SOS features are now available" });
    }
  };

  // Main assessment function
  const runAssessment = async (input: AllergyCheckerInput) => {
    try {
      const result = await allergyChecker(input);
      
      // The AI function now has built-in validation and fallback
      // So we can trust that result will always have the required structure
      setAssessment(result);
      
      if (result.emergencyCard) {
        setEmergencyCard(result.emergencyCard);
      }
      
      toast({ title: "Assessment Complete", description: "Allergy risk analysis finished" });
    } catch (error) {
      console.error("Assessment error:", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to run assessment" });
    }
  };

  // Form submissions
  const onSymptomSubmit = symptomForm.handleSubmit((data) => {
    startTransition(() => {
      runAssessment({
        symptoms: {
          ...data,
          photos: photos || [],
          voiceNote: voiceNote || "",
          triggers: data.triggers || [],
          bodyParts: data.bodyParts || [],
        },
        demographics: activePatientRecord?.history?.demographics,
        emergencyMode,
      });
    });
  });

  const onHealthProfileSubmit = healthProfileForm.handleSubmit((data) => {
    startTransition(() => {
      runAssessment({
        healthProfile: {
          medications: data.medications || [],
          chronicConditions: data.chronicConditions || [],
          pastAllergyTests: data.pastAllergyTests || [],
          vaccinations: data.vaccinations || [],
          familyAllergyHistory: data.familyAllergyHistory || [],
          previousReactions: data.previousReactions || [],
        },
        demographics: activePatientRecord?.history?.demographics,
        emergencyMode,
      });
    });
  });

  const onIngredientScanSubmit = ingredientScanForm.handleSubmit(async (data) => {
    try {
      const scanResult = await scanIngredient(data.barcode || "", data.productName);
      startTransition(() => {
        runAssessment({
          ingredientScan: scanResult,
          demographics: activePatientRecord?.history?.demographics,
          emergencyMode,
        });
      });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to scan ingredient" });
    }
  });

  // Emergency actions
  const callEmergency = () => {
    window.open("tel:911", "_self");
  };

  const shareEmergencyCard = () => {
    if (emergencyCard) {
      const text = `Emergency Allergy Card\nPatient: ${emergencyCard.patientName}\nAllergies: ${emergencyCard.allergies.join(', ')}\nContact: ${emergencyCard.emergencyContact}`;
      navigator.share?.({ text }) || navigator.clipboard.writeText(text);
    }
  };

  // Test AI functionality
  const testAI = async () => {
    try {
      console.log('Starting AI allergy checker test...');
      const result = await testAllergyChecker();
      console.log('Test result:', result);
      
      if (result && result.riskAssessment) {
        setAssessment(result);
        toast({ title: "AI Test Passed", description: "Allergy checker is working correctly" });
      } else {
        toast({ variant: "destructive", title: "AI Test Failed", description: "Allergy checker returned invalid response" });
      }
    } catch (error) {
      console.error("Test error:", error);
      toast({ variant: "destructive", title: "Test Error", description: "Failed to test AI functionality" });
    }
  };

  if (!activePatientRecord) {
    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle>No Active Patient Case</CardTitle>
          <CardDescription>
            Please select a patient from the list or create a new one to use the allergy checker.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/patients" passHref>
            <Button><User className="mr-2"/>Go to Patient Records</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Emergency Mode Toggle */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button
            variant={emergencyMode ? "destructive" : "outline"}
            onClick={toggleEmergencyMode}
            className="flex items-center space-x-2"
          >
            <Zap className="h-4 w-4" />
            <span>{emergencyMode ? "Emergency Mode ON" : "Emergency Mode"}</span>
          </Button>
          {emergencyMode && (
            <Button variant="destructive" onClick={callEmergency} className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>SOS Call 911</span>
            </Button>
          )}
          <Button variant="outline" onClick={testAI} className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>Test AI</span>
          </Button>
        </div>
        {environmentalData && (
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4" />
            <span>Environmental data loaded</span>
          </div>
        )}
      </div>

      {/* Main Tabs */}
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          <TabsTrigger value="profile">Health Profile</TabsTrigger>
          <TabsTrigger value="scanner">Scanner</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        {/* Symptoms Tab */}
        <TabsContent value="symptoms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Smart Symptom Intake</span>
              </CardTitle>
              <CardDescription>
                Describe your symptoms using voice, text, or photos for comprehensive analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...symptomForm}>
                <form onSubmit={onSymptomSubmit} className="space-y-4">
                  <FormField
                    name="description"
                    control={symptomForm.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Symptom Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your symptoms in detail..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      name="severity"
                      control={symptomForm.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Severity Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select severity" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="mild">Mild</SelectItem>
                              <SelectItem value="moderate">Moderate</SelectItem>
                              <SelectItem value="severe">Severe</SelectItem>
                              <SelectItem value="emergency">Emergency</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="onsetTime"
                      control={symptomForm.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>When did symptoms start?</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 2 hours ago" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    name="duration"
                    control={symptomForm.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How long have symptoms lasted?</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 30 minutes" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Voice and Photo Input */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={isRecording ? stopRecording : startRecording}
                        className="flex items-center space-x-2"
                      >
                        {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        <span>{isRecording ? "Stop Recording" : "Record Voice Note"}</span>
                      </Button>
                      
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center space-x-2"
                      >
                        <Camera className="h-4 w-4" />
                        <span>Add Photos</span>
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </div>

                    {photos.length > 0 && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Uploaded Photos</label>
                        <div className="flex space-x-2">
                          {photos.map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt={`Symptom photo ${index + 1}`}
                              className="w-20 h-20 object-cover rounded border"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {voiceNote && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          <Mic className="h-4 w-4 inline mr-1" />
                          Voice note recorded
                        </p>
                      </div>
                    )}
                  </div>

                  <Button type="submit" disabled={isPending} className="w-full">
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Analyze Symptoms
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Health Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Health Profile</span>
              </CardTitle>
              <CardDescription>
                Complete your health profile for better allergy assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...healthProfileForm}>
                <form onSubmit={onHealthProfileSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      name="chronicConditions"
                      control={healthProfileForm.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chronic Conditions</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g., Asthma, Diabetes, Hypertension"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="medications"
                      control={healthProfileForm.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Medications</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g., Metformin, Albuterol, Lisinopril"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="previousReactions"
                      control={healthProfileForm.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Previous Allergic Reactions</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g., Penicillin rash, Shellfish swelling"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="familyAllergyHistory"
                      control={healthProfileForm.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Family Allergy History</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g., Mother: Peanut allergy, Father: Pollen allergy"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" disabled={isPending} className="w-full">
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Update Health Profile
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scanner Tab */}
        <TabsContent value="scanner" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Scan className="h-5 w-5" />
                <span>Ingredient & Label Scanner</span>
              </CardTitle>
              <CardDescription>
                Scan barcodes or enter product names to check for allergens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...ingredientScanForm}>
                <form onSubmit={onIngredientScanSubmit} className="space-y-4">
                  <FormField
                    name="barcode"
                    control={ingredientScanForm.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Barcode/QR Code</FormLabel>
                        <FormControl>
                          <div className="flex space-x-2">
                            <Input placeholder="Scan or enter barcode" {...field} />
                            <Button type="button" variant="outline">
                              <Scan className="h-4 w-4" />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="productName"
                    control={ingredientScanForm.control}
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Product Name (Alternative)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Brand Name Product" {...field} />
                        </FormControl>
                      <FormMessage />
                    </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isPending} className="w-full">
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Scan for Allergens
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-4">
          {assessment && assessment.riskAssessment ? (
            <div className="space-y-4">
              {/* Risk Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Gauge className="h-5 w-5" />
                    <span>Risk Assessment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Overall Risk Level</span>
                    <Badge 
                      variant={
                        assessment.riskAssessment?.overallRisk === 'emergency' ? 'destructive' :
                        assessment.riskAssessment?.overallRisk === 'high' ? 'destructive' :
                        assessment.riskAssessment?.overallRisk === 'medium' ? 'default' : 'secondary'
                      }
                    >
                      {assessment.riskAssessment?.overallRisk?.toUpperCase() || 'UNKNOWN'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Confidence Level</span>
                      <span>{assessment.riskAssessment?.confidence || 0}%</span>
                    </div>
                    <Progress value={assessment.riskAssessment?.confidence || 0} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Risk Factors</h4>
                    <div className="flex flex-wrap gap-2">
                      {(assessment.riskAssessment?.riskFactors || []).map((factor, index) => (
                        <Badge key={index} variant="outline">{factor}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Recommendations</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {(assessment.riskAssessment?.recommendations || []).map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
        </div>
                </CardContent>
              </Card>

              {/* Action Plan */}
            <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Action Plan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Immediate Actions</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {(assessment.actionPlan?.immediateActions || []).map((action, index) => (
                          <li key={index}>{action}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Prevention Steps</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {(assessment.actionPlan?.preventionSteps || []).map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Medication Guidance</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {(assessment.actionPlan?.medicationGuidance || []).map((guidance, index) => (
                          <li key={index}>{guidance}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-purple-600 dark:text-purple-400 mb-2">Diet Guidance</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {(assessment.actionPlan?.dietGuidance || []).map((guidance, index) => (
                          <li key={index}>{guidance}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Card */}
              {emergencyCard && (
                <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-red-700 dark:text-red-300">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Emergency Allergy Card</span>
                    </CardTitle>
                  </CardHeader>
              <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium">Patient Information</h4>
                        <p className="text-sm">{emergencyCard?.patientName || 'Unknown'}</p>
                        <p className="text-sm text-muted-foreground">Contact: {emergencyCard?.emergencyContact || 'Not provided'}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Known Allergies</h4>
                        <div className="flex flex-wrap gap-1">
                          {(emergencyCard?.allergies || []).map((allergy: string, index: number) => (
                            <Badge key={index} variant="destructive" className="text-xs">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Emergency Instructions</h4>
                      <p className="text-sm">{emergencyCard?.instructions || 'No specific instructions available'}</p>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={shareEmergencyCard} className="flex items-center space-x-2">
                        <Share2 className="h-4 w-4" />
                        <span>Share Card</span>
                      </Button>
                      <Button variant="outline" className="flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Download PDF</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Environmental Data */}
              {environmentalData && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Wind className="h-5 w-5" />
                      <span>Environmental Conditions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="space-y-1">
                        <Thermometer className="h-6 w-6 mx-auto text-orange-500" />
                        <p className="text-sm font-medium">Temperature</p>
                        <p className="text-lg">{environmentalData.weather?.temperature || 'N/A'}°F</p>
                      </div>
                      <div className="space-y-1">
                        <Droplets className="h-6 w-6 mx-auto text-blue-500" />
                        <p className="text-sm font-medium">Humidity</p>
                        <p className="text-lg">{environmentalData.weather?.humidity || 'N/A'}%</p>
                      </div>
                      <div className="space-y-1">
                        <Wind className="h-6 w-6 mx-auto text-green-500" />
                        <p className="text-sm font-medium">Pollen</p>
                        <p className="text-lg capitalize">{environmentalData.pollenCount?.level || 'N/A'}</p>
                      </div>
                      <div className="space-y-1">
                        <Activity className="h-6 w-6 mx-auto text-purple-500" />
                        <p className="text-sm font-medium">Air Quality</p>
                        <p className="text-lg capitalize">{environmentalData.airQuality?.level || 'N/A'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Educational Content */}
              {assessment.educationalContent && assessment.educationalContent.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Educational Content</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(assessment.educationalContent || []).map((content, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{content.title}</h4>
                            <Badge variant="outline">{content.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{content.content}</p>
                        </div>
                      ))}
                    </div>
              </CardContent>
            </Card>
          )}

              {/* Follow-up Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Follow-up Care</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      {assessment.followUpRequired ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-400" />
                      )}
                      <span>Follow-up Required: {assessment.followUpRequired ? 'Yes' : 'No'}</span>
                    </div>
                    
                    {assessment.followUpTimeframe && (
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <span>Timeframe: {assessment.followUpTimeframe}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      {assessment.teleConsultRecommended ? (
                        <Video className="h-5 w-5 text-purple-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                      <span>Tele-consultation: {assessment.teleConsultRecommended ? 'Recommended' : 'Not needed'}</span>
        </div>
      </div>
                </CardContent>
              </Card>
            </div>
          ) : assessment ? (
            <Card className="text-center py-12">
              <CardContent>
                <AlertCircle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Assessment Incomplete</h3>
                <p className="text-muted-foreground mb-4">
                  The assessment is still processing or incomplete. Please try again or contact support.
                </p>
                <Button onClick={() => setCurrentTab("symptoms")}>
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Assessment Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Complete the symptom intake, health profile, or scanner to get started
                </p>
                <Button onClick={() => setCurrentTab("symptoms")}>
                  Start Assessment
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      </div>
  );
}
