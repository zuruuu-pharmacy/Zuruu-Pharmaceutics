
"use client";

import { useActionState, useEffect, useMemo, useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { generateDietPlan, type DietPlannerOutput } from "@/ai/flows/diet-planner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertTriangle, Apple, Soup, ClipboardCheck, User, Sparkles, Utensils, ShoppingCart, Leaf, Ban, ArrowLeft } from "lucide-react";
import { useMode } from "@/contexts/mode-context";
// Removed patient context dependency - now works independently
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

// Completely flexible form - no validation at all
const formSchema = z.object({});
type FormValues = any;


function ResultCard({ title, content, icon: Icon }: { title: string, content: string | string[], icon: React.ElementType }) {
    if (!content || (Array.isArray(content) && content.length === 0)) return null;
    return (
        <Card className="bg-background/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon className="h-5 w-5 text-primary" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                 {Array.isArray(content) ? (
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {content.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                 ) : (
                    <p className="text-muted-foreground whitespace-pre-wrap">{content}</p>
                 )}
            </CardContent>
        </Card>
    );
}

export function DietPlannerClient() {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState<DietPlannerOutput | { error: string } | null, FormData>(
    async (previousState, formData) => {
      try {
        console.log("Form action called with formData:", formData);
        // Extract form data with completely flexible parsing - NO VALIDATION
        const formDataObj = Object.fromEntries(formData);
        console.log("Extracted form data object:", formDataObj);
        
        // Create input object with smart defaults - accepts ANY input
        const flexibleInput = {
          name: String(formDataObj.name || formDataObj.name || "Patient"),
          age: isNaN(Number(formDataObj.age)) ? 30 : Number(formDataObj.age),
          sex: String(formDataObj.sex || formDataObj.sex || "Not specified"),
          height: isNaN(Number(formDataObj.height)) ? 170 : Number(formDataObj.height),
          weight: isNaN(Number(formDataObj.weight)) ? 70 : Number(formDataObj.weight),
          activityLevel: String(formDataObj.activityLevel || formDataObj.activityLevel || "moderate"),
          primaryGoals: String(formDataObj.primaryGoals || formDataObj.goal || formDataObj.primaryGoals || "General wellness"),
          medicalConditions: String(formDataObj.medicalConditions || formDataObj.conditions || formDataObj.medicalConditions || "No medical conditions"),
          currentMedications: String(formDataObj.currentMedications || formDataObj.currentMedications || "None"),
          recentLabs: String(formDataObj.recentLabs || formDataObj.recentLabs || "Not available"),
          foodPreferences: String(formDataObj.foodPreferences || formDataObj.preferences || formDataObj.foodPreferences || "No specific preferences"),
          budget: String(formDataObj.budget || formDataObj.budget || "medium"),
          cookingSkill: String(formDataObj.cookingSkill || formDataObj.cookingSkill || "intermediate"),
          equipment: String(formDataObj.equipment || formDataObj.equipment || "Basic equipment"),
          mealsPerDay: isNaN(Number(formDataObj.mealsPerDay)) ? 3 : Number(formDataObj.mealsPerDay),
          planDuration: String(formDataObj.planDuration || formDataObj.planDuration || "7 days"),
        };

        console.log("Processing diet plan request with input:", flexibleInput);
        const result = await generateDietPlan(flexibleInput);
        console.log("Diet plan generation result:", result);
        return result;
      } catch (e) {
        console.error("Diet plan generation error:", e);
        return { error: "Failed to generate diet plan. Please try again." };
      }
    },
    null
  );

  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'form' | 'result'>('form');

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      age: 30,
      sex: "",
      height: 170,
      weight: 70,
      activityLevel: "",
      primaryGoals: "General Wellness",
      medicalConditions: "No medical conditions",
      currentMedications: "",
      recentLabs: "",
      foodPreferences: "No specific preferences",
      budget: "",
      cookingSkill: "",
      equipment: "",
      mealsPerDay: 3,
      planDuration: "7 days",
    },
  });

  // Removed patient profile dependency - form works independently

  useEffect(() => {
    console.log("Diet planner state changed:", state);
    if (state) {
        if ('error' in state && state.error) {
            toast({ variant: "destructive", title: "Error", description: state.error });
        } else if ('quickSummary' in state) {
            console.log("Setting current step to result");
            setCurrentStep('result');
        }
    }
  }, [state, toast]);

  const handleFormSubmit = form.handleSubmit((data) => {
    console.log("Form submitted with data:", data);
    startTransition(() => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value) formData.append(key, String(value));
        });
        console.log("Calling formAction with FormData");
        formAction(formData);
    })
  });

  // Removed patient profile requirement - now works independently

  // Show loading state while processing
  if (isPending) {
    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Generating Your Diet Plan...</CardTitle>
          <CardDescription>
            Please wait while our AI creates your personalized diet plan. This may take a few moments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (currentStep === 'result' && state && 'quickSummary' in state) {
     // Add safe defaults for all arrays to prevent map errors
     const safeState = {
       ...state,
       mealDetails: state.mealDetails || [],
       groceryList: {
         ...state.groceryList,
         produce: state.groceryList?.produce || [],
         proteins: state.groceryList?.proteins || [],
         grains: state.groceryList?.grains || []
       },
       medicationInteractions: state.medicationInteractions || [],
       monitoringChecklist: {
         ...state.monitoringChecklist,
         whatToLog: state.monitoringChecklist?.whatToLog || [],
         redFlags: state.monitoringChecklist?.redFlags || []
       },
       eatingOutTips: state.eatingOutTips || [],
       quickSnacks: state.quickSnacks || [],
       variationIdeas: state.variationIdeas || []
     };

     return (
        <div className="space-y-6">
            <Button onClick={() => setCurrentStep('form')} variant="outline">
                <ArrowLeft className="mr-2"/> Back to Form
            </Button>
            
            {/* A. One-Line Quick Summary */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-100 border-green-200">
                <CardHeader>
                    <CardTitle className="text-xl text-green-800">Quick Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-medium text-green-700">{safeState.quickSummary}</p>
                </CardContent>
            </Card>

            {/* B. Daily Snapshot Table */}
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-100 border-blue-200">
                <CardHeader>
                    <CardTitle className="text-xl text-blue-800">Daily Nutrition Snapshot</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-white rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{safeState.dailySnapshot?.calories || 'N/A'}</p>
                            <p className="text-sm text-gray-600">Calories</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{safeState.dailySnapshot?.carbs || 'N/A'}</p>
                            <p className="text-sm text-gray-600">Carbs</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{safeState.dailySnapshot?.protein || 'N/A'}</p>
                            <p className="text-sm text-gray-600">Protein</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{safeState.dailySnapshot?.fat || 'N/A'}</p>
                            <p className="text-sm text-gray-600">Fat</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* C. Day-by-Day Meal Details */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Meal Plan Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {safeState.mealDetails.map((day, dayIndex) => (
                        <div key={dayIndex} className="border rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-4">{day.day}</h3>
                            <div className="space-y-4">
                                {(day.meals || []).map((meal, mealIndex) => (
                                    <div key={mealIndex} className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-medium">{meal.mealType}: {meal.name}</h4>
                                            <Badge variant="outline">{meal.nutrition.calories} cal</Badge>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600 mb-3">
                                            <span>Carbs: {meal.nutrition.carbs}g</span>
                                            <span>Protein: {meal.nutrition.protein}g</span>
                                            <span>Fat: {meal.nutrition.fat}g</span>
                                            <span>Sodium: {meal.nutrition.sodium}mg</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div>
                                                <p className="font-medium text-sm">Ingredients:</p>
                                                <ul className="text-sm text-gray-600 list-disc list-inside">
                                                    {(meal.ingredients || []).map((ingredient, idx) => (
                                                        <li key={idx}>{ingredient}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">Cooking Steps:</p>
                                                <ol className="text-sm text-gray-600 list-decimal list-inside">
                                                    {(meal.cookingSteps || []).map((step, idx) => (
                                                        <li key={idx}>{step}</li>
                                                    ))}
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* E. Grocery List */}
            <Card className="bg-gradient-to-r from-orange-50 to-amber-100 border-orange-200">
                <CardHeader>
                    <CardTitle className="text-xl text-orange-800">Grocery List</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <h4 className="font-semibold text-orange-700 mb-2">Produce</h4>
                            <ul className="text-sm space-y-1">
                                {safeState.groceryList.produce.map((item, idx) => (
                                    <li key={idx} className="flex items-center">
                                        <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-orange-700 mb-2">Proteins</h4>
                            <ul className="text-sm space-y-1">
                                {safeState.groceryList.proteins.map((item, idx) => (
                                    <li key={idx} className="flex items-center">
                                        <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-orange-700 mb-2">Grains</h4>
                            <ul className="text-sm space-y-1">
                                {safeState.groceryList.grains.map((item, idx) => (
                                    <li key={idx} className="flex items-center">
                                        <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* G. Medication-Food Interaction Table */}
            {safeState.medicationInteractions.length > 0 && (
                <Card className="bg-gradient-to-r from-red-50 to-pink-100 border-red-200">
                    <CardHeader>
                        <CardTitle className="text-xl text-red-800">Medication-Food Interactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left p-2">Medication</th>
                                        <th className="text-left p-2">Interaction</th>
                                        <th className="text-left p-2">Explanation</th>
                                        <th className="text-left p-2">Safe Action</th>
                                        <th className="text-left p-2">Severity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {safeState.medicationInteractions.map((interaction, idx) => (
                                        <tr key={idx} className="border-b">
                                            <td className="p-2 font-medium">{interaction.medication}</td>
                                            <td className="p-2">{interaction.interaction}</td>
                                            <td className="p-2">{interaction.explanation}</td>
                                            <td className="p-2">{interaction.safeAction}</td>
                                            <td className="p-2">
                                                <Badge variant={interaction.severity === 'High' ? 'destructive' : interaction.severity === 'Moderate' ? 'default' : 'secondary'}>
                                                    {interaction.severity}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* H. Monitoring & Safety Checklist */}
            <Card className="bg-gradient-to-r from-purple-50 to-violet-100 border-purple-200">
                <CardHeader>
                    <CardTitle className="text-xl text-purple-800">Monitoring & Safety Checklist</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-purple-700 mb-2">What to Log:</h4>
                        <ul className="text-sm space-y-1">
                            {safeState.monitoringChecklist.whatToLog.map((item, idx) => (
                                <li key={idx} className="flex items-center">
                                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-purple-700 mb-2">Red Flags to Watch:</h4>
                        <ul className="text-sm space-y-1">
                            {safeState.monitoringChecklist.redFlags.map((item, idx) => (
                                <li key={idx} className="flex items-center">
                                    <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* I. Eating-Out Tips & Quick Snacks */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-r from-teal-50 to-cyan-100 border-teal-200">
                    <CardHeader>
                        <CardTitle className="text-xl text-teal-800">Eating-Out Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="text-sm space-y-2">
                            {safeState.eatingOutTips.map((tip, idx) => (
                                <li key={idx} className="flex items-start">
                                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-yellow-50 to-amber-100 border-yellow-200">
                    <CardHeader>
                        <CardTitle className="text-xl text-yellow-800">Quick Snacks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="text-sm space-y-2">
                            {safeState.quickSnacks.map((snack, idx) => (
                                <li key={idx} className="flex items-start">
                                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                                    {snack}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* J. Variation Ideas */}
            <Card className="bg-gradient-to-r from-indigo-50 to-blue-100 border-indigo-200">
                <CardHeader>
                    <CardTitle className="text-xl text-indigo-800">Weekly Variation Ideas</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="text-sm space-y-2">
                        {safeState.variationIdeas.map((variation, idx) => (
                            <li key={idx} className="flex items-start">
                                <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                                {variation}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* K. Legal/Medical Disclaimer */}
            <Alert>
                <AlertTriangle className="h-4 w-4"/>
                <AlertTitle>Important Disclaimer</AlertTitle>
                <AlertDescription>{safeState.disclaimer}</AlertDescription>
            </Alert>
        </div>
     );
  }


  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                    <Apple className="h-6 w-6 text-green-600" />
                    AI Diet Planner
                </CardTitle>
                <CardDescription>
                    Generate a comprehensive, personalized diet plan with medication interactions, detailed meal planning, and clinical monitoring guidelines. Fill in any information you have - all fields are optional!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField name="name" control={form.control} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name (optional)</FormLabel>
                                        <FormControl><Input placeholder="Enter your name" value={field.value ?? ""} onChange={field.onChange} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField name="age" control={form.control} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Age (optional)</FormLabel>
                                        <FormControl><Input type="number" placeholder="Age in years" value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField name="sex" control={form.control} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sex (optional)</FormLabel>
                                        <FormControl><Input placeholder="M/F/Other" value={field.value ?? ""} onChange={field.onChange} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField name="height" control={form.control} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Height (optional)</FormLabel>
                                        <FormControl><Input type="number" placeholder="Height in cm" value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField name="weight" control={form.control} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Weight (optional)</FormLabel>
                                        <FormControl><Input type="number" placeholder="Weight in kg" value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField name="activityLevel" control={form.control} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Activity Level (optional)</FormLabel>
                                        <FormControl><Input placeholder="sedentary/light/moderate/active" value={field.value ?? ""} onChange={field.onChange} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </div>

                        {/* Health Goals & Conditions */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Health Goals & Conditions</h3>
                            <FormField name="primaryGoals" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Primary Health Goals (optional)</FormLabel>
                                    <FormControl><Textarea placeholder="e.g., Gain 5 kg, lose weight, maintain current weight, build muscle, improve energy" value={field.value ?? ""} onChange={field.onChange} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField name="medicalConditions" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Medical Conditions (optional)</FormLabel>
                                    <FormControl><Textarea placeholder="e.g., No medical conditions, or list any conditions like diabetes, hypertension, etc." value={field.value ?? ""} onChange={field.onChange} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField name="currentMedications" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Medications (optional)</FormLabel>
                                    <FormControl><Textarea placeholder="e.g., None, or list medications with doses" value={field.value ?? ""} onChange={field.onChange} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField name="recentLabs" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Recent Lab Values (optional)</FormLabel>
                                    <FormControl><Textarea placeholder="e.g., eGFR, K+, Na+, HbA1c, fasting glucose" value={field.value ?? ""} onChange={field.onChange} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        {/* Dietary Preferences */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Dietary Preferences</h3>
                            <FormField name="foodPreferences" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Food Preferences & Restrictions (optional)</FormLabel>
                                    <FormControl><Textarea placeholder="e.g., Vegetarian, halal, no nuts, prefer chicken, dislike spicy food" value={field.value ?? ""} onChange={field.onChange} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField name="budget" control={form.control} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Budget Level (optional)</FormLabel>
                                        <FormControl><Input placeholder="low/medium/high" value={field.value ?? ""} onChange={field.onChange} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField name="cookingSkill" control={form.control} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cooking Skill Level (optional)</FormLabel>
                                        <FormControl><Input placeholder="beginner/intermediate/pro" value={field.value ?? ""} onChange={field.onChange} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField name="equipment" control={form.control} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Available Equipment (optional)</FormLabel>
                                        <FormControl><Input placeholder="e.g., oven, microwave, blender" value={field.value ?? ""} onChange={field.onChange} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField name="mealsPerDay" control={form.control} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Meals per Day (optional)</FormLabel>
                                        <FormControl><Input type="number" placeholder="3" value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField name="planDuration" control={form.control} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Plan Duration (optional)</FormLabel>
                                        <FormControl><Input placeholder="7 days/14 days/custom" value={field.value ?? ""} onChange={field.onChange} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isPending} className="w-full md:w-auto">
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating Diet Plan...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Generate Diet Plan
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
