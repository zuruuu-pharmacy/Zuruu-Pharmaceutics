
"use client";

import { useActionState, useEffect, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bsaDoseCalculator, type BsaDoseCalculatorOutput } from "@/ai/flows/bsa-dose-calculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Beaker, FileText, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  drugName: z.string().min(2, "Required"),
  dosePerM2: z.string().min(1, "Dose per m² is required (e.g., 100mg/m²)"),
  patientWeightKg: z.coerce.number().positive("Must be positive"),
  patientHeightCm: z.coerce.number().positive("Must be positive"),
});

type FormValues = z.infer<typeof formSchema>;

export function BsaDoseCalculatorClient() {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState<BsaDoseCalculatorOutput | { error: string } | null, FormData>(
    async (previousState, formData) => {
      const parsed = formSchema.safeParse(Object.fromEntries(formData));
      if (!parsed.success) {
        return { error: "Invalid input. Check the form fields." };
      }
      try {
        const result = await bsaDoseCalculator(parsed.data);
        return result;
      } catch (e) {
        console.error(e);
        return { error: "Failed to calculate BSA-based dose. Please try again." };
      }
    },
    null
  );

  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      drugName: "",
      dosePerM2: "",
      patientWeightKg: "" as any,
      patientHeightCm: "" as any,
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

  const handleFormSubmit = form.handleSubmit((data) => {
     startTransition(() => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value.toString());
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
                  <FormItem><FormLabel>Drug Name</FormLabel><FormControl><Input placeholder="e.g., Carboplatin" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField name="dosePerM2" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Dose per m²</FormLabel><FormControl><Input placeholder="e.g., 100mg/m²" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="patientWeightKg" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Patient Weight (kg)</FormLabel><FormControl><Input type="number" placeholder="e.g., 70" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="patientHeightCm" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Patient Height (cm)</FormLabel><FormControl><Input type="number" placeholder="e.g., 175" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Calculate Dose
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        {isPending && <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
        {state && 'totalDose' in state && (
            <div className="space-y-6">
              {/* Main Results Card */}
              <Card className="bg-gradient-to-br from-teal-50 to-cyan-100 border-teal-200">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-teal-800">BSA Dose Calculation Results</CardTitle>
                  <CardDescription className="text-teal-600">
                    {form.getValues("drugName")} • Body Surface Area Based Dosing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white rounded-xl shadow-sm border border-teal-200 text-center">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Body Surface Area</h3>
                      <p className="text-4xl font-bold text-teal-600 mb-1">{state.bodySurfaceArea}</p>
                      <p className="text-sm text-gray-500">Mosteller Formula</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-sm border border-teal-200 text-center">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Dose</h3>
                      <p className="text-4xl font-bold text-teal-600 mb-1">{state.totalDose}</p>
                      <p className="text-sm text-gray-500">BSA × Dose per m²</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Details Section */}
              <div className="grid md:grid-cols-2 gap-6">
                {state.calculationSteps && (
                  <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-orange-800 flex items-center gap-2">
                        <Beaker className="h-5 w-5" />
                        Calculation Steps
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-white rounded-lg border border-orange-200">
                        <p className="whitespace-pre-wrap text-sm text-gray-700">{state.calculationSteps}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {state.explanation && (
                  <Card className="bg-gradient-to-br from-pink-50 to-rose-100 border-pink-200">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-pink-800 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        About BSA Dosing
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-white rounded-lg border border-pink-200">
                        <p className="whitespace-pre-wrap text-sm text-gray-700">{state.explanation}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
        )}
      </div>
    </div>
  );
}
