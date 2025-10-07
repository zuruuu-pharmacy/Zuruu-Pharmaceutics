
"use client";

import { useActionState, useEffect, useTransition } from "react";
import { getLifestyleSuggestions, testLifestyleSuggester } from "@/ai/flows/lifestyle-suggester";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lightbulb, AlertTriangle, Sparkles } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { type PatientHistory } from "@/contexts/patient-context";

type Suggestion = {
    priority: 'High' | 'Medium' | 'Low';
    emoji: string;
    title: string;
    suggestion: string;
};

type State = {
    suggestions?: Suggestion[];
    error?: string;
} | null;


export function LifestyleSuggestions({ patientHistory }: { patientHistory?: PatientHistory }) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    
    const [state, setState] = useActionState<State, void>(
        async (previousState, payload) => {
            try {
                // Safe access to patientHistory with fallback
                const patientName = patientHistory?.name || 'Anonymous User';
                console.log('Fetching lifestyle suggestions for:', patientName);
                
                // If no patient history, provide general suggestions
                if (!patientHistory) {
                    return {
                        suggestions: [
                            {
                                priority: 'Medium' as const,
                                emoji: '💧',
                                title: 'Stay Hydrated',
                                suggestion: 'Drink at least 8 glasses of water daily to maintain optimal health and support your body\'s functions.'
                            },
                            {
                                priority: 'High' as const,
                                emoji: '🏃‍♂️',
                                title: 'Daily Exercise',
                                suggestion: 'Aim for at least 30 minutes of moderate physical activity daily to boost your energy and overall well-being.'
                            },
                            {
                                priority: 'Medium' as const,
                                emoji: '🥗',
                                title: 'Balanced Nutrition',
                                suggestion: 'Include a variety of fruits, vegetables, whole grains, and lean proteins in your daily meals.'
                            }
                        ]
                    };
                }
                
                const result = await getLifestyleSuggestions(patientHistory);
                console.log('Lifestyle suggestions result:', result);
                
                if (result && result.suggestions && result.suggestions.length > 0) {
                    return { suggestions: result.suggestions };
                } else {
                    console.warn('Empty or invalid suggestions received');
                    return { error: "No suggestions available. Please try again." };
                }
            } catch (e) {
                console.error('Error fetching lifestyle suggestions:', e);
                return { error: "Failed to load health tips. Please try again later." };
            }
        }, null);

    useEffect(() => {
        if (state?.error) {
            toast({ variant: 'destructive', title: "Error", description: state.error });
        }
    }, [state, toast]);
    
    const handleGetTips = () => {
        console.log('Getting tips...');
        startTransition(() => {
            setState();
        });
    }

    const testAI = async () => {
        try {
            const isWorking = await testLifestyleSuggester();
            if (isWorking) {
                toast({ title: "AI Test Passed", description: "Lifestyle suggester is working correctly" });
            } else {
                toast({ variant: "destructive", title: "AI Test Failed", description: "Lifestyle suggester is not responding properly" });
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Test Error", description: "Failed to test AI functionality" });
        }
    }
    
    // Initial call on component mount
    useEffect(() => {
        console.log('Component mounted, fetching initial tips');
        handleGetTips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (isPending && !state?.suggestions) {
         return (
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Lightbulb className="text-yellow-400"/> Daily Health Alerts</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-24">
                   <Loader2 className="h-6 w-6 animate-spin text-primary" />
                   <p className="ml-2 text-muted-foreground">Generating personalized tips...</p>
                </CardContent>
            </Card>
        )
    }

    if (state?.suggestions) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Lightbulb className="text-yellow-400"/> Daily Health Alerts</CardTitle>
                    <CardDescription>
                        Personalized tips for you. 
                        <div className="flex gap-2 mt-2">
                            <Button variant="link" onClick={handleGetTips} disabled={isPending}>
                                 {isPending ? <Loader2 className="h-4 w-4 animate-spin"/> : null}
                                Refresh
                            </Button>
                            <Button variant="outline" size="sm" onClick={testAI}>
                                Test AI
                            </Button>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {state.suggestions.map((tip, index) => (
                        <Alert key={index} variant={tip.priority === 'High' ? 'destructive' : 'default'} className="bg-background/70">
                            <AlertTitle className="flex items-center gap-2">
                                <span className="text-lg">{tip.emoji}</span>
                                {tip.title}
                            </AlertTitle>
                            <AlertDescription>{tip.suggestion}</AlertDescription>
                        </Alert>
                    ))}
                </CardContent>
            </Card>
        )
    }

    // Fallback or error state
    return (
        <Card className="text-center">
            <CardHeader>
                <CardTitle>Daily Health Tips</CardTitle>
                <CardDescription>Get personalized, AI-powered health and wellness suggestions for your day.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <Button onClick={handleGetTips} disabled={isPending} className="w-full">
                    {isPending ? <Loader2 className="mr-2 animate-spin" /> : <Sparkles className="mr-2"/>}
                    Get Today's Health Tips
                </Button>
                <Button variant="outline" onClick={testAI} className="w-full">
                    Test AI Functionality
                </Button>
            </CardContent>
        </Card>
    );
}
