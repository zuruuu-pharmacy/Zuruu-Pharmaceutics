"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { generateMatchingGame, type MatchingGameOutput } from "@/ai/flows/matching-game-generator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Search, Check, X, Sparkles, Trophy, Lightbulb, Repeat } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Zod schema for the topic selection form
const topicFormSchema = z.object({
  topic: z.string().min(3, "Please enter a topic."),
});
type TopicFormValues = z.infer<typeof topicFormSchema>;

export function FlashPuzzleClient() {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState<MatchingGameOutput | { error: string } | null, FormData>(
    async (previousState, formData) => {
      const parsed = topicFormSchema.safeParse(Object.fromEntries(formData));
      if (!parsed.success) return { error: "Invalid topic." };
      try {
        const result = await generateMatchingGame({ topic: parsed.data.topic });
        return result;
      } catch (e) {
        return { error: "Failed to generate matching game." };
      }
    },
    null
  );

  const { toast } = useToast();
  
  const [gameState, setGameState] = useState({
      score: 0,
      matchedPairs: [] as string[],
      selectedItems: [] as {id: string, text: string, type: 'left' | 'right'}[],
      isComplete: false,
  });

  const topicForm = useForm<TopicFormValues>({ resolver: zodResolver(topicFormSchema), defaultValues: { topic: "" } });

  useEffect(() => {
    if (state?.error) {
      toast({ variant: "destructive", title: "Error", description: state.error });
    } else if (state?.pairs) {
      // Reset game when new matching game is loaded
      setGameState({ score: 0, matchedPairs: [], selectedItems: [], isComplete: false });
    }
  }, [state, toast]);

  const handleTopicSubmit = topicForm.handleSubmit((data) => {
    const formData = new FormData();
    formData.append("topic", data.topic);
    startTransition(() => formAction(formData));
  });
  
  const handleItemClick = (item: {id: string, text: string, type: 'left' | 'right'}) => {
    if (!state?.pairs) return;
    
    setGameState(prev => {
      const newSelectedItems = [...prev.selectedItems, item];
      
      if (newSelectedItems.length === 2) {
        const [first, second] = newSelectedItems;
        
        // Check if this is a valid match
        const validMatch = state.pairs.find(pair => 
          (pair.item1 === first.text && pair.item2 === second.text) ||
          (pair.item1 === second.text && pair.item2 === first.text)
        );
        
        if (validMatch) {
          const matchId = `${first.id}-${second.id}`;
          return {
            ...prev,
            matchedPairs: [...prev.matchedPairs, matchId],
            score: prev.score + 1,
            selectedItems: [],
            isComplete: prev.score + 1 === state.pairs.length
          };
        } else {
          // Invalid match, clear selection after a brief delay
          setTimeout(() => {
            setGameState(prev => ({ ...prev, selectedItems: [] }));
          }, 1000);
          return prev;
        }
      }
      
      return {
        ...prev,
        selectedItems: newSelectedItems
      };
    });
  };

  const handleRestart = () => {
     setGameState({ score: 0, matchedPairs: [], selectedItems: [], isComplete: false });
  }
  
  const handleNewGame = () => {
    topicForm.reset({ topic: ""});
    startTransition(() => formAction(new FormData()));
  }

  if (!state?.pairs || state.pairs.length === 0) {
    return (
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Generate Flash Puzzle</CardTitle>
          <CardDescription>Enter a topic to generate a new matching game.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...topicForm}>
            <form onSubmit={handleTopicSubmit} className="space-y-4">
              <FormField name="topic" control={topicForm.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Game Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Antibiotics, Cardiovascular Drugs..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate Puzzle
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }

  const leftItems = state.pairs.map((pair, index) => ({
    id: `left-${index}`,
    text: pair.item1,
    type: 'left' as const
  }));

  const rightItems = state.pairs.map((pair, index) => ({
    id: `right-${index}`,
    text: pair.item2,
    type: 'right' as const
  }));

  const isItemSelected = (item: {id: string, text: string, type: 'left' | 'right'}) => {
    return gameState.selectedItems.some(selected => selected.id === item.id);
  };

  const isItemMatched = (item: {id: string, text: string, type: 'left' | 'right'}) => {
    return gameState.matchedPairs.some(pair => pair.includes(item.id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Flash Puzzle: {state.topic}</CardTitle>
            <div className="text-lg font-bold">Score: {gameState.score} / {state.pairs.length}</div>
          </div>
          <CardDescription>Match the items in the left column with their corresponding items in the right column.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <h3 className="font-semibold text-center">{state.column1Title}</h3>
              <div className="space-y-2">
                {leftItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      isItemMatched(item) 
                        ? 'border-green-500 bg-green-100' 
                        : isItemSelected(item)
                        ? 'border-blue-500 bg-blue-100'
                        : 'border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="text-center font-medium">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <h3 className="font-semibold text-center">{state.column2Title}</h3>
              <div className="space-y-2">
                {rightItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      isItemMatched(item) 
                        ? 'border-green-500 bg-green-100' 
                        : isItemSelected(item)
                        ? 'border-blue-500 bg-blue-100'
                        : 'border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="text-center font-medium">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {gameState.isComplete && (
            <Alert className="border-green-500 bg-green-500/10 mt-6">
              <Trophy className="h-4 w-4"/>
              <AlertTitle>Congratulations!</AlertTitle>
              <AlertDescription>
                You completed the puzzle! Your final score is {gameState.score} / {state.pairs.length}.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex gap-4 justify-center mt-6">
            <Button onClick={handleRestart} variant="secondary">
              <Repeat className="mr-2 h-4 w-4"/>Play Again
            </Button>
            <Button onClick={handleNewGame}>Start New Game</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}