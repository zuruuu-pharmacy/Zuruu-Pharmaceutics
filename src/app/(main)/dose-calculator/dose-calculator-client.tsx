
"use client";

import { useActionState, useEffect, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { calculateDosage, type CalculateDosageOutput } from "@/ai/flows/ai-dose-calculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Beaker, FileText, CheckCircle, AlertTriangle, TestTube } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const formSchema = z.object({
  drugName: z.string().min(2, "Required"),
  indication: z.string().min(3, "Indication is required"),
  patientWeight: z.coerce.number().positive("Must be positive"),
  patientWeightUnit: z.enum(['kg', 'lb']),
  patientAgeYears: z.coerce.number().int().positive("Must be a positive integer"),
  renalFunction: z.string().transform(val => val === '' ? undefined : val).optional(),
  hepaticFunction: z.string().transform(val => val === '' ? undefined : val).optional(),
  availableFormulations: z.string().transform(val => val === '' ? undefined : val).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function DoseCalculatorClient() {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState<CalculateDosageOutput | { error: string } | null, FormData>(
    async (previousState, formData) => {
        
       const data = {
        drugName: formData.get('drugName') || '',
        indication: formData.get('indication') || '',
        patientWeight: formData.get('patientWeight') || '',
        patientWeightUnit: formData.get('patientWeightUnit') || 'kg',
        patientAgeYears: formData.get('patientAgeYears') || '',
        renalFunction: formData.get('renalFunction') || '',
        hepaticFunction: formData.get('hepaticFunction') || '',
        availableFormulations: formData.get('availableFormulations') || '',
      };
      
      const parsed = formSchema.safeParse(data);

      if (!parsed.success) {
        console.error(parsed.error);
        return { error: "Invalid input. Check the form fields." };
      }
      
      let weightInKg = parsed.data.patientWeight;
      if (parsed.data.patientWeightUnit === 'lb') {
        weightInKg = weightInKg / 2.20462;
      }

      try {
        const result = await calculateDosage({
            drugName: parsed.data.drugName,
            indication: parsed.data.indication,
            patientWeightKg: weightInKg,
            patientAgeYears: parsed.data.patientAgeYears,
            renalFunction: parsed.data.renalFunction,
            hepaticFunction: parsed.data.hepaticFunction,
            availableFormulations: parsed.data.availableFormulations
        });
        return result;
      } catch (e) {
        console.error(e);
        return { error: "Failed to calculate dosage. Please try again." };
      }
    },
    null
  );

  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      drugName: "",
      indication: "",
      patientWeight: "" as any,
      patientWeightUnit: "kg",
      patientAgeYears: "" as any,
      renalFunction: "",
      hepaticFunction: "",
      availableFormulations: "",
    },
  });
  
  useEffect(() => {
    if (state && 'error' in state && state.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
  }, [state, toast]);
  
  const weight = form.watch('patientWeight');
  const unit = form.watch('patientWeightUnit');
  const convertedWeight = unit === 'lb' && weight > 0 ? (weight / 2.20462).toFixed(2) + ' kg' : null;

  const handleFormSubmit = form.handleSubmit((data) => {
     startTransition(() => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                formData.append(key, value.toString());
            }
        });
      formAction(formData);
    });
  });

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Patient & Drug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <FormField name="drugName" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Drug Name</FormLabel><FormControl><Input placeholder="e.g., Amoxicillin" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField name="indication" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Indication for Use</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Community-acquired pneumonia, Hypertension, Type 2 diabetes" 
                        {...field} 
                        list="indication-suggestions"
                      />
                    </FormControl>
                    <datalist id="indication-suggestions">
                      <option value="Community-acquired pneumonia" />
                      <option value="Hospital-acquired pneumonia" />
                      <option value="Urinary tract infection" />
                      <option value="Skin and soft tissue infection" />
                      <option value="Hypertension" />
                      <option value="Type 2 diabetes" />
                      <option value="Atrial fibrillation" />
                      <option value="Heart failure" />
                      <option value="Chronic obstructive pulmonary disease" />
                      <option value="Asthma" />
                      <option value="Migraine prophylaxis" />
                      <option value="Depression" />
                      <option value="Anxiety" />
                      <option value="Pain management" />
                      <option value="Nausea and vomiting" />
                      <option value="Gastroesophageal reflux disease" />
                      <option value="Peptic ulcer disease" />
                      <option value="Rheumatoid arthritis" />
                      <option value="Osteoarthritis" />
                      <option value="Seizure disorder" />
                    </datalist>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormItem>
                  <FormLabel>Patient Weight</FormLabel>
                  <div className="flex gap-2">
                    <FormField name="patientWeight" control={form.control} render={({ field }) => (
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="e.g., 70" 
                          {...field} 
                          value={field.value ?? ""}
                          className="flex-grow"
                        />
                      </FormControl>
                    )} />
                     <FormField name="patientWeightUnit" control={form.control} render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-[80px]">
                            <SelectValue/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="lb">lb</SelectItem>
                        </SelectContent>
                      </Select>
                    )} />
                  </div>
                  <FormMessage>{form.formState.errors.patientWeight?.message}</FormMessage>
                  {convertedWeight && <p className="text-xs text-muted-foreground pt-1">Converted: {convertedWeight}</p>}
                </FormItem>

                <FormField name="patientAgeYears" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient Age (years)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="e.g., 45" 
                        {...field} 
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="renalFunction" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Renal Function (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., CrCl 50 ml/min" 
                        {...field} 
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="hepaticFunction" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hepatic Function (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Mild impairment" 
                        {...field} 
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="availableFormulations" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Formulations (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., 250mg, 500mg tablets" 
                        {...field} 
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="space-y-2">
                  <Button type="submit" disabled={isPending} className="w-full">
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Calculate Dose
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full text-xs"
                    onClick={() => {
                      form.setValue('drugName', 'Amoxicillin');
                      form.setValue('indication', 'Community-acquired pneumonia');
                      form.setValue('patientWeight', '70');
                      form.setValue('patientAgeYears', '45');
                    }}
                  >
                    <TestTube className="mr-2 h-3 w-3" />
                    Test: Amoxicillin for Pneumonia
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        {isPending && <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
        {state && 'isIndicationMismatch' in state && (
          state.isIndicationMismatch ? (
            <div className="space-y-4">
              <Alert variant="destructive" className="h-fit">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>⚠️ Indication Mismatch Detected</AlertTitle>
                <AlertDescription className="mt-2">
                  <p className="font-medium">{state.mismatchWarning}</p>
                  <p className="text-sm mt-2 text-red-700">
                    Please verify the drug name and indication. Consider consulting a drug reference or pharmacist for appropriate alternatives.
                  </p>
                </AlertDescription>
              </Alert>
              
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Suggestions:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Double-check the drug name spelling</li>
                    <li>• Verify the indication is correctly specified</li>
                    <li>• Consider if this might be an off-label use</li>
                    <li>• Consult clinical guidelines for appropriate alternatives</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          ) : state.calculatedDosage ? (
            <div className="space-y-6">
              {/* Main Result Card */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-blue-800">Dosage Calculation Results</CardTitle>
                  <CardDescription className="text-blue-600">
                    {form.getValues("drugName")} • {form.getValues("indication")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="p-8 bg-white rounded-xl shadow-sm border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Recommended Dosage</h3>
                    <p className="text-5xl font-bold text-blue-600 mb-2">{state.calculatedDosage}</p>
                    <p className="text-sm text-gray-500">Based on patient weight and indication</p>
                  </div>
                </CardContent>
              </Card>

              {/* Rounding Suggestion */}
              {state.roundedDosageSuggestion && (
                <Card className="bg-gradient-to-r from-amber-50 to-yellow-100 border-amber-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-amber-600" />
                      <div>
                        <h4 className="font-semibold text-amber-800">Dosage Rounding</h4>
                        <p className="text-amber-700">{state.roundedDosageSuggestion}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Calculation Details */}
              <div className="grid md:grid-cols-2 gap-6">
                {state.calculationSteps && (
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-green-800 flex items-center gap-2">
                        <Beaker className="h-5 w-5" />
                        Calculation Steps
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-white rounded-lg border border-green-200">
                        <p className="whitespace-pre-wrap text-sm text-gray-700">{state.calculationSteps}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {state.references && (
                  <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-purple-800 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        References
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-white rounded-lg border border-purple-200">
                        <p className="whitespace-pre-wrap text-sm text-gray-700">{state.references}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
