
"use client";

import { useActionState, useEffect, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { compoundingCalculator, type CompoundingCalculatorOutput } from "@/ai/flows/compounding-calculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Beaker, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  preparationType: z.enum(['w/v', 'v/v', 'w/w']),
  desiredVolumeMl: z.coerce.number().optional(),
  desiredWeightG: z.coerce.number().optional(),
  percentageStrength: z.coerce.number().positive("Must be positive"),
});

type FormValues = z.infer<typeof formSchema>;

export function CompoundingCalculatorClient() {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState<CompoundingCalculatorOutput | { error: string } | null, FormData>(
    async (previousState, formData) => {
      const parsed = formSchema.safeParse(Object.fromEntries(formData));
      if (!parsed.success) {
        return { error: "Invalid input. Check the form fields." };
      }
      try {
        const result = await compoundingCalculator(parsed.data);
        return result;
      } catch (e) {
        console.error(e);
        return { error: (e as Error).message || "Failed to calculate. Please try again." };
      }
    },
    null
  );

  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preparationType: 'w/v',
      percentageStrength: "" as any,
    },
  });

  const prepType = form.watch('preparationType');
  
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
            if (value !== undefined && value !== null) {
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
            <CardTitle>Preparation Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <FormField name="preparationType" control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Preparation Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="w/v">% w/v (weight/volume)</SelectItem>
                                <SelectItem value="v/v">% v/v (volume/volume)</SelectItem>
                                <SelectItem value="w/w">% w/w (weight/weight)</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />

                { (prepType === 'w/v' || prepType === 'v/v') && (
                    <FormField name="desiredVolumeMl" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Final Volume (mL)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="e.g., 250" 
                            {...field} 
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                )}

                 { prepType === 'w/w' && (
                    <FormField name="desiredWeightG" control={form.control} render={({ field }) => (
                      <FormItem>
                        <FormLabel>Final Weight (g)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="e.g., 100" 
                            {...field} 
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                )}

                <FormField name="percentageStrength" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Percentage Strength (%)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="e.g., 5" 
                        {...field} 
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Calculate Amount
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        {isPending && <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
        {state && 'soluteNeeded' in state && (
            <div className="space-y-6">
              {/* Main Result Card */}
              <Card className="bg-gradient-to-br from-violet-50 to-purple-100 border-violet-200">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-violet-800">Compounding Calculation Results</CardTitle>
                  <CardDescription className="text-violet-600">
                    Calculated solute amount for compounded preparation
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="p-8 bg-white rounded-xl shadow-sm border border-violet-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Solute Amount Needed</h3>
                    <p className="text-5xl font-bold text-violet-600 mb-2">{state.soluteNeeded}</p>
                    <p className="text-sm text-gray-500">Based on percentage strength</p>
                  </div>
                </CardContent>
              </Card>

              {/* Details Section */}
              <div className="grid md:grid-cols-2 gap-6">
                {state.calculationSteps && (
                  <Card className="bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-200">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-indigo-800 flex items-center gap-2">
                        <Beaker className="h-5 w-5" />
                        Calculation Steps
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-white rounded-lg border border-indigo-200">
                        <p className="whitespace-pre-wrap text-sm text-gray-700">{state.calculationSteps}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {state.explanation && (
                  <Card className="bg-gradient-to-br from-slate-50 to-gray-100 border-slate-200">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        About Compounding
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-white rounded-lg border border-slate-200">
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
