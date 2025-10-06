
"use client";

import { useActionState, useEffect, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { checkDrugInteractions, type CheckDrugInteractionsOutput } from "@/ai/flows/ai-interaction-engine";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Salad, AlertTriangle, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useMode } from "@/contexts/mode-context";

const formSchema = z.object({
  drugName: z.string().min(2, "Required"),
  foodItem: z.string().min(2, "Required"),
});

type FormValues = z.infer<typeof formSchema>;

export function DrugFoodInteractionClient() {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState<CheckDrugInteractionsOutput | { error: string } | null, FormData>(
    async (previousState, formData) => {
      const parsed = formSchema.safeParse(Object.fromEntries(formData));
      if (!parsed.success) {
        return { error: "Invalid input. Check the form fields." };
      }
      try {
        const result = await checkDrugInteractions({ 
          medications: [parsed.data.drugName, parsed.data.foodItem],
          labResults: "Checking drug-food interaction"
        });
        return result;
      } catch (e) {
        console.error(e);
        return { error: "Failed to check interaction. Please try again." };
      }
    },
    null
  );

  const { mode } = useMode();
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { drugName: "", foodItem: "" },
  });

  useEffect(() => {
    if (state && 'error' in state && state.error) {
      toast({ variant: "destructive", title: "Error", description: state.error });
    }
  }, [state, toast]);

  const handleFormSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    formData.append("drugName", data.drugName);
    formData.append("foodItem", data.foodItem);
    startTransition(() => {
      formAction(formData);
    });
  });

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Check Drug-Food Interaction</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <FormField name="drugName" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medication Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Warfarin" 
                        {...field} 
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="foodItem" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food/Substance</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Grapefruit, Dairy, Alcohol" 
                        {...field} 
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Check Interaction
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        {isPending && <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
        {state && 'interactions' in state && state.interactions && state.interactions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Salad className="h-6 w-6 text-green-500"/> 
                Drug-Food Interaction Results
              </CardTitle>
              <CardDescription>
                Results for {form.getValues("drugName")} + {form.getValues("foodItem")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.interactions.map((interaction, index) => (
                <Alert key={index} variant={interaction.severity === 'High' ? 'destructive' : 'default'}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="flex items-center gap-2">
                    {interaction.severity} Risk Interaction
                    <span className="text-sm font-normal text-muted-foreground">
                      ({interaction.interactingDrugs.join(' + ')})
                    </span>
                  </AlertTitle>
                  <AlertDescription className="space-y-3">
                    <div>
                      <p className="font-semibold">Mechanism:</p>
                      <p className="text-sm">{interaction.mechanism}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Clinical Consequences:</p>
                      <p className="text-sm">{interaction.clinicalConsequences}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Suggested Actions:</p>
                      <p className="text-sm">{interaction.suggestedActions}</p>
                    </div>
                    {interaction.saferAlternative && interaction.saferAlternative !== "Unable to suggest" && (
                      <div>
                        <p className="font-semibold">Safer Alternative:</p>
                        <p className="text-sm">{interaction.saferAlternative}</p>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold">Educational Note:</p>
                      <p className="text-sm">{interaction.educationalNote}</p>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </CardContent>
          </Card>
        )}
        {state && 'interactions' in state && state.interactions && state.interactions.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-green-500" />
                No Significant Interactions Found
              </CardTitle>
              <CardDescription>
                Results for {form.getValues("drugName")} + {form.getValues("foodItem")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="default" className="border-green-500 bg-green-500/10 text-green-700 dark:text-green-400">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <AlertTitle>Safe to Use Together</AlertTitle>
                <AlertDescription>
                  No significant drug-food interactions were detected between these substances. 
                  However, always consult with a healthcare professional for personalized advice.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
