"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { generateWordSearch, type WordSearchGeneratorOutput } from "@/ai/flows/word-search-generator";
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

export function WordSearchClient() {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState<WordSearchGeneratorOutput | { error: string } | null, FormData>(
    async (previousState, formData) => {
      const parsed = topicFormSchema.safeParse(Object.fromEntries(formData));
      if (!parsed.success) return { error: "Invalid topic." };
      try {
        const result = await generateWordSearch({ topic: parsed.data.topic, size: 10, wordCount: 8 });
        return result;
      } catch (e) {
        return { error: "Failed to generate word search." };
      }
    },
    null
  );

  const { toast } = useToast();
  
  const [gameState, setGameState] = useState({
      score: 0,
      foundWords: [] as string[],
      selectedCells: [] as {row: number, col: number}[],
      isSelecting: false,
  });

  const topicForm = useForm<TopicFormValues>({ resolver: zodResolver(topicFormSchema), defaultValues: { topic: "" } });

  useEffect(() => {
    if (state && 'error' in state) {
      toast({ variant: "destructive", title: "Error", description: state.error });
    } else if (state && 'grid' in state) {
      // Reset game when new word search is loaded
      setGameState({ score: 0, foundWords: [], selectedCells: [], isSelecting: false });
    }
  }, [state, toast]);

  const handleTopicSubmit = topicForm.handleSubmit((data) => {
    const formData = new FormData();
    formData.append("topic", data.topic);
    startTransition(() => formAction(formData));
  });
  
  const handleCellClick = (row: number, col: number) => {
    if (!state || !('grid' in state)) return;
    
    setGameState(prev => {
      // If clicking the same cell, deselect it
      if (prev.selectedCells.some(cell => cell.row === row && cell.col === col)) {
        return {
          ...prev,
          selectedCells: prev.selectedCells.filter(cell => !(cell.row === row && cell.col === col))
        };
      }
      
      const newSelectedCells = [...prev.selectedCells, { row, col }];
      
      // Check if we have a valid word (minimum 3 letters)
      if (newSelectedCells.length >= 3) {
        // Try to form words in different directions
        const possibleWords = getPossibleWords(newSelectedCells, state.grid);
        
        for (const word of possibleWords) {
          if (state.words.includes(word) && !prev.foundWords.includes(word)) {
            return {
              ...prev,
              foundWords: [...prev.foundWords, word],
              score: prev.score + 1,
              selectedCells: []
            };
          }
        }
      }
      
      return {
        ...prev,
        selectedCells: newSelectedCells
      };
    });
  };

  // Helper function to get possible words from selected cells
  const getPossibleWords = (cells: {row: number, col: number}[], grid: string[][]) => {
    if (cells.length < 3) return [];
    
    const words: string[] = [];
    
    // Sort cells by position to maintain order
    const sortedCells = [...cells].sort((a, b) => {
      if (a.row !== b.row) return a.row - b.row;
      return a.col - b.col;
    });
    
    // Try horizontal (left to right)
    if (isHorizontal(sortedCells)) {
      const word = sortedCells.map(cell => grid[cell.row][cell.col]).join('');
      words.push(word);
    }
    
    // Try vertical (top to bottom)
    if (isVertical(sortedCells)) {
      const word = sortedCells.map(cell => grid[cell.row][cell.col]).join('');
      words.push(word);
    }
    
    // Try diagonal (top-left to bottom-right)
    if (isDiagonal(sortedCells)) {
      const word = sortedCells.map(cell => grid[cell.row][cell.col]).join('');
      words.push(word);
    }
    
    // Try reverse diagonal (top-right to bottom-left)
    if (isReverseDiagonal(sortedCells)) {
      const word = sortedCells.map(cell => grid[cell.row][cell.col]).join('');
      words.push(word);
    }
    
    return words;
  };

  // Helper functions to check if cells form a line
  const isHorizontal = (cells: {row: number, col: number}[]) => {
    if (cells.length < 2) return false;
    const firstRow = cells[0].row;
    return cells.every(cell => cell.row === firstRow);
  };

  const isVertical = (cells: {row: number, col: number}[]) => {
    if (cells.length < 2) return false;
    const firstCol = cells[0].col;
    return cells.every(cell => cell.col === firstCol);
  };

  const isDiagonal = (cells: {row: number, col: number}[]) => {
    if (cells.length < 2) return false;
    const firstRow = cells[0].row;
    const firstCol = cells[0].col;
    return cells.every((cell, index) => 
      cell.row === firstRow + index && cell.col === firstCol + index
    );
  };

  const isReverseDiagonal = (cells: {row: number, col: number}[]) => {
    if (cells.length < 2) return false;
    const firstRow = cells[0].row;
    const firstCol = cells[0].col;
    return cells.every((cell, index) => 
      cell.row === firstRow + index && cell.col === firstCol - index
    );
  };

  const handleRestart = () => {
     setGameState({ score: 0, foundWords: [], selectedCells: [], isSelecting: false });
  }
  
  const handleNewGame = () => {
    topicForm.reset({ topic: ""});
    startTransition(() => formAction(new FormData()));
  }

  if (!state || !('grid' in state) || state.grid.length === 0) {
    return (
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Generate Word Search</CardTitle>
          <CardDescription>Enter a topic to generate a new word search puzzle.</CardDescription>
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
                Generate Word Search
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }

  const isGameComplete = state.words.every(word => gameState.foundWords.includes(word));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Word Search: {state.topic}</CardTitle>
            <div className="text-lg font-bold">Score: {gameState.score} / {state.words.length}</div>
          </div>
          <CardDescription>Find all the hidden words in the grid.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Word Search Grid */}
            <div className="space-y-4">
              <h3 className="font-semibold">Word Search Grid</h3>
              <div className="grid grid-cols-12 gap-1 border-2 border-gray-300 p-2">
                {state.grid.map((row, rowIndex) => (
                  row.map((cell, colIndex) => {
                    const isSelected = gameState.selectedCells.some(c => c.row === rowIndex && c.col === colIndex);
                    const isFound = gameState.foundWords.some(word => {
                      // Check if this cell is part of a found word
                      return word.split('').some((letter, i) => 
                        gameState.selectedCells[i]?.row === rowIndex && 
                        gameState.selectedCells[i]?.col === colIndex
                      );
                    });
                    
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`w-8 h-8 border border-gray-200 flex items-center justify-center text-sm font-bold cursor-pointer ${
                          isSelected ? 'bg-blue-200' : 
                          isFound ? 'bg-green-200' : 
                          'bg-white hover:bg-gray-100'
                        }`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                      >
                        {cell}
                      </div>
                    );
                  })
                ))}
              </div>
            </div>

            {/* Word List */}
            <div className="space-y-4">
              <h3 className="font-semibold">Words to Find</h3>
              <div className="grid grid-cols-2 gap-2">
                {state.words.map((word) => (
                  <div 
                    key={word} 
                    className={`p-2 text-sm font-medium rounded ${
                      gameState.foundWords.includes(word) 
                        ? 'bg-green-100 text-green-800 line-through' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {word}
                  </div>
                ))}
              </div>
              
              {isGameComplete && (
                <Alert className="border-green-500 bg-green-500/10">
                  <Trophy className="h-4 w-4"/>
                  <AlertTitle>Congratulations!</AlertTitle>
                  <AlertDescription>
                    You found all the words! Your final score is {gameState.score} / {state.words.length}.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
          
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