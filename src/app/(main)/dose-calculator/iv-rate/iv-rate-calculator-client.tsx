
"use client";

import { useActionState, useEffect, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ivRateCalculator, type IvRateCalculatorOutput } from "@/ai/flows/iv-rate-calculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Beaker, FileText, Droplets } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  totalVolumeMl: z.coerce.number().positive("Must be positive"),
  totalTimeMinutes: z.coerce.number().positive("Must be positive"),
  dropFactorGttMl: z.coerce.number().positive("Must be positive"),
});

type FormValues = z.infer<typeof formSchema>;

export function IvRateCalculatorClient() {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState<IvRateCalculatorOutput | { error: string } | null, FormData>(
    async (previousState, formData) => {
      const parsed = formSchema.safeParse(Object.fromEntries(formData));
      if (!parsed.success) {
        return { error: "Invalid input. Check the form fields." };
      }
      try {
        const result = await ivRateCalculator(parsed.data);
        return result;
      } catch (e) {
        console.error(e);
        return { error: "Failed to calculate IV rate. Please try again." };
      }
    },
    null
  );

  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalVolumeMl: "" as any,
      totalTimeMinutes: "" as any,
      dropFactorGttMl: "" as any,
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
            <CardTitle>Infusion Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <FormField name="totalVolumeMl" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Total Volume (mL)</FormLabel><FormControl><Input type="number" placeholder="e.g., 1000" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="totalTimeMinutes" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Total Time (minutes)</FormLabel><FormControl><Input type="number" placeholder="e.g., 480" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="dropFactorGttMl" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Drop Factor (gtt/mL)</FormLabel><FormControl><Input type="number" placeholder="e.g., 20" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Calculate Rate
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        {isPending && <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
        {state && 'infusionRateMlHr' in state && (
          <div className="space-y-6">
            {/* Main Results Card */}
            <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-emerald-800">IV Infusion Rate Results</CardTitle>
                <CardDescription className="text-emerald-600">
                  Calculated infusion rates for IV administration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white rounded-xl shadow-sm border border-emerald-200 text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Infusion Rate</h3>
                    <p className="text-4xl font-bold text-emerald-600 mb-1">{state.infusionRateMlHr}</p>
                    <p className="text-sm text-gray-500">Volume per hour</p>
                  </div>
                  <div className="p-6 bg-white rounded-xl shadow-sm border border-emerald-200 text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Drop Rate</h3>
                    <p className="text-4xl font-bold text-emerald-600 mb-1">{state.dropsPerMinute}</p>
                    <p className="text-sm text-gray-500">Drops per minute</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calculation Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                    <Droplets className="h-5 w-5" />
                    mL/hour Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-white rounded-lg border border-blue-200">
                    <p className="whitespace-pre-wrap text-sm text-gray-700">{state.mlHrCalculationSteps}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-50 to-sky-100 border-cyan-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-cyan-800 flex items-center gap-2">
                    <Droplets className="h-5 w-5" />
                    gtt/minute Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-white rounded-lg border border-cyan-200">
                    <p className="whitespace-pre-wrap text-sm text-gray-700">{state.gttMinCalculationSteps}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
