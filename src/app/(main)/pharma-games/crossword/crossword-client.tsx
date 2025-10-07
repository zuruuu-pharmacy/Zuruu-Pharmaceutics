"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { generateCrossword, type CrosswordGeneratorOutput } from "@/ai/flows/crossword-generator";
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

export function CrosswordClient() {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState<CrosswordGeneratorOutput | { error: string } | null, FormData>(
    async (previousState, formData) => {
      const parsed = topicFormSchema.safeParse(Object.fromEntries(formData));
      if (!parsed.success) return { error: "Invalid topic." };
      try {
        const result = await generateCrossword({ topic: parsed.data.topic, size: 8, wordCount: 10 });
        return result;
      } catch (e) {
        return { error: "Failed to generate crossword." };
      }
    },
    null
  );

  const { toast } = useToast();
  
  const [gameState, setGameState] = useState({
      score: 0,
      currentClue: 0,
      showResult: false,
      isCorrect: false,
      userAnswers: {} as Record<string, string>,
      selectedCell: null as {row: number, col: number} | null,
      inputValue: '',
  });

  const topicForm = useForm<TopicFormValues>({ resolver: zodResolver(topicFormSchema), defaultValues: { topic: "" } });

  useEffect(() => {
    if (state && 'error' in state) {
      toast({ variant: "destructive", title: "Error", description: state.error });
    } else if (state && 'grid' in state) {
      // Reset game when new crossword is loaded
      setGameState({ 
        score: 0, 
        currentClue: 0, 
        showResult: false, 
        isCorrect: false, 
        userAnswers: {},
        selectedCell: null,
        inputValue: ''
      });
    }
  }, [state, toast]);

  const handleTopicSubmit = topicForm.handleSubmit((data) => {
    const formData = new FormData();
    formData.append("topic", data.topic);
    startTransition(() => formAction(formData));
  });
  
  const handleCellClick = (row: number, col: number) => {
    if (!state || !('grid' in state)) return;
    
    const cell = state.grid[row][col];
    if (!cell.letter) return; // Can't select black cells
    
    setGameState(prev => ({
      ...prev,
      selectedCell: { row, col },
      inputValue: prev.userAnswers[`${row}-${col}`] || ''
    }));
  };

  const handleInputChange = (value: string) => {
    setGameState(prev => ({ ...prev, inputValue: value.toUpperCase() }));
  };

  const handleInputSubmit = () => {
    if (!gameState.selectedCell || !state || !('grid' in state)) return;
    
    const { row, col } = gameState.selectedCell;
    const cell = state.grid[row][col];
    
    if (!cell.letter) return;
    
    setGameState(prev => ({
      ...prev,
      userAnswers: { ...prev.userAnswers, [`${row}-${col}`]: prev.inputValue },
      selectedCell: null,
      inputValue: ''
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputSubmit();
    }
  };

  const getCellValue = (row: number, col: number) => {
    return gameState.userAnswers[`${row}-${col}`] || '';
  };

  const isCellSelected = (row: number, col: number) => {
    return gameState.selectedCell?.row === row && gameState.selectedCell?.col === col;
  };

  const handleRestart = () => {
     setGameState({ 
       score: 0, 
       currentClue: 0, 
       showResult: false, 
       isCorrect: false, 
       userAnswers: {},
       selectedCell: null,
       inputValue: ''
     });
  }
  
  const handleNewGame = () => {
    topicForm.reset({ topic: ""});
    setGameState({ 
      score: 0, 
      currentClue: 0, 
      showResult: false, 
      isCorrect: false, 
      userAnswers: {},
      selectedCell: null,
      inputValue: ''
    });
    startTransition(() => formAction(new FormData()));
  }

  if (!state || !('grid' in state) || state.grid.length === 0) {
    return (
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Generate Crossword</CardTitle>
          <CardDescription>Enter a topic to generate a new crossword puzzle.</CardDescription>
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
                Generate Crossword
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }

  const allClues = [...(state.clues.across || []), ...(state.clues.down || [])];
  const currentClue = allClues[gameState.currentClue];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Crossword Puzzle: {state.topic}</CardTitle>
            <div className="flex gap-4">
              <div className="text-lg font-bold">Score: {gameState.score}</div>
              <Button onClick={handleRestart} variant="outline" size="sm">
                <Repeat className="mr-2 h-4 w-4" />
                Restart
              </Button>
              <Button onClick={handleNewGame} variant="outline" size="sm">
                <Sparkles className="mr-2 h-4 w-4" />
                New Game
              </Button>
            </div>
          </div>
          <CardDescription>Click on a cell to fill in the answer. Use the clues to help you solve the puzzle.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Crossword Grid */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-semibold">Crossword Grid</h3>
              <div className="grid grid-cols-10 gap-1 border-2 border-gray-300 p-2 bg-white">
                {state.grid.map((row, rowIndex) => (
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`w-8 h-8 border border-gray-200 flex items-center justify-center text-sm font-bold relative cursor-pointer transition-colors ${
                        cell.letter 
                          ? isCellSelected(rowIndex, colIndex)
                            ? 'bg-blue-200 border-blue-400' 
                            : 'bg-white hover:bg-gray-50'
                          : 'bg-gray-800 cursor-not-allowed'
                      }`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                      {cell.number && (
                        <span className="absolute top-0 left-0 text-xs text-gray-600 -mt-1 -ml-1">
                          {cell.number}
                        </span>
                      )}
                      {cell.letter && (
                        <span className="text-gray-800">
                          {getCellValue(rowIndex, colIndex) || cell.letter}
                        </span>
                      )}
                    </div>
                  ))
                ))}
              </div>
              
              {/* Input Section */}
              {gameState.selectedCell && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Enter Answer for Selected Cell:</h4>
                  <div className="flex gap-2">
                    <Input
                      value={gameState.inputValue}
                      onChange={(e) => handleInputChange(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter letter..."
                      maxLength={1}
                      className="w-20 text-center font-bold text-lg"
                    />
                    <Button onClick={handleInputSubmit} size="sm">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button 
                      onClick={() => setGameState(prev => ({ ...prev, selectedCell: null, inputValue: '' }))} 
                      variant="outline" 
                      size="sm"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Clues */}
            <div className="space-y-4">
              <h3 className="font-semibold">Clues</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-600 mb-2">Across</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {state.clues.across?.map((clue) => (
                      <div key={clue.number} className="text-sm p-2 bg-gray-50 rounded">
                        <span className="font-bold text-blue-600">{clue.number}.</span> {clue.clue}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-600 mb-2">Down</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {state.clues.down?.map((clue) => (
                      <div key={clue.number} className="text-sm p-2 bg-gray-50 rounded">
                        <span className="font-bold text-green-600">{clue.number}.</span> {clue.clue}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}