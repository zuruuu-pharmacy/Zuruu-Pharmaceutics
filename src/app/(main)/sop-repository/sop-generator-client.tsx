
"use client";

import { useActionState, useEffect, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { generateSop, type SopGeneratorOutput } from "@/ai/flows/sop-generator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Search, FileJson } from "lucide-react";


const formSchema = z.object({
  experimentTitle: z.string().min(10, "Please enter a descriptive experiment title."),
});
type FormValues = z.infer<typeof formSchema>;

function SopSection({ title, content, isList = false }: { title: string, content?: string | string[], isList?: boolean }) {
    if (!content || (Array.isArray(content) && content.length === 0)) return null;
    return (
        <div className="space-y-2">
            <h3 className="font-semibold text-lg">{title}</h3>
            {isList && Array.isArray(content) ? (
                <ul className="list-decimal list-inside space-y-1">
                    {content.map((item, i) => (
                        <li key={i} className="text-sm">{item}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm whitespace-pre-wrap">{content as string}</p>
            )}
        </div>
    );
}

export function SopGeneratorClient() {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState<SopGeneratorOutput | { error: string } | null, FormData>(
    async (previousState, formData) => {
      const parsed = formSchema.safeParse(Object.fromEntries(formData));
      if (!parsed.success) {
        return { error: "Invalid input." };
      }
      try {
        const result = await generateSop(parsed.data);
        return result;
      } catch (e) {
        console.error(e);
        return { error: "Failed to generate SOP. Please try again." };
      }
    },
    null
  );

  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { experimentTitle: "" },
  });

  useEffect(() => {
    if (state && 'error' in state && state.error) {
      toast({ variant: "destructive", title: "Error", description: state.error });
    }
  }, [state, toast]);

  const handleFormSubmit = form.handleSubmit((data) => {
    const formData = new FormData();
    formData.append("experimentTitle", data.experimentTitle);
    startTransition(() => formAction(formData));
  });

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Generate Comprehensive SOP</CardTitle>
            <CardDescription>Enter the title of the lab experiment to generate a detailed SOP with extensive learning objectives, theoretical background, procedures, observations, results interpretation, and viva voce questions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <FormField control={form.control} name="experimentTitle" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experiment Title</FormLabel>
                      <FormControl>
                        <div className="relative">
                            <FileJson className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input placeholder="e.g., Antibiotic Sensitivity Testing..." className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2" />}
                  Generate SOP
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        {isPending && (
            <div className="flex justify-center items-center h-full">
                <div className="text-center space-y-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground">Generating SOP...</p>
                </div>
            </div>
        )}
        
        {state && 'title' in state ? (
          <Card>
            <CardHeader>
                <CardTitle>{state.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <SopSection title="Learning Objectives" content={state.objectives} isList />
                <SopSection title="Theory & Background" content={state.theory} />
                
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Requirements & Materials</h3>
                    <SopSection title="Reagents & Chemicals" content={state.requirements.reagents} isList />
                    <SopSection title="Instruments & Equipment" content={state.requirements.instruments} isList />
                    <SopSection title="Consumables" content={state.requirements.consumables} isList />
                    {state.requirements.special && (
                        <SopSection title="Special Requirements" content={state.requirements.special} />
                    )}
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Procedure</h3>
                    <ol className="list-decimal list-inside space-y-2">
                        {state.procedure.map((step, i) => (
                            <li key={i} className="text-sm">{step}</li>
                        ))}
                    </ol>
                </div>

                <SopSection title="Observation Guidelines" content={state.observationGuidelines} />
                <SopSection title="Results & Interpretation" content={state.resultAndInterpretation} />
                
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Viva Voce Questions & Answers</h3>
                    {state.vivaVoce.map((viva, i) => (
                        <div key={i} className="space-y-2">
                            <h4 className="font-medium">{i + 1}. {viva.question}</h4>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{viva.answer}</p>
                        </div>
                    ))}
                </div>

                <SopSection title="Safety Precautions" content={state.safetyPrecautions} />
                <SopSection title="Common Errors" content={state.commonErrors} />
                <SopSection title="Virtual Lab Simulation" content={state.virtualLabSimulation} />
                <SopSection title="Lab Report Template" content={state.labReportTemplate} />
                <SopSection title="Compliance Notes" content={state.complianceNotes} />
            </CardContent>
          </Card>
        ) : (
          !isPending && (
             <Card className="text-center p-6">
                <h3 className="text-lg font-semibold text-muted-foreground">SOP Will Appear Here</h3>
                <p className="text-muted-foreground mt-2">Enter an experiment title to generate a new SOP.</p>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
