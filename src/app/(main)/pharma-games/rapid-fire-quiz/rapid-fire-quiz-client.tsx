"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { generateRapidFireQuiz, type RapidFireQuizOutput } from "@/ai/flows/rapid-fire-quiz-generator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Search, Check, X, Sparkles, Trophy, Lightbulb, Repeat, Clock } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Zod schema for the topic selection form
const topicFormSchema = z.object({
  topic: z.string().min(3, "Please enter a topic."),
});
type TopicFormValues = z.infer<typeof topicFormSchema>;

export function RapidFireQuizClient() {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState<RapidFireQuizOutput | { error: string } | null, FormData>(
    async (previousState, formData) => {
      const parsed = topicFormSchema.safeParse(Object.fromEntries(formData));
      if (!parsed.success) return { error: "Invalid topic." };
      try {
        const result = await generateRapidFireQuiz({ topic: parsed.data.topic });
        return result;
      } catch (e) {
        return { error: "Failed to generate quiz." };
      }
    },
    null
  );

  const { toast } = useToast();
  
  const [gameState, setGameState] = useState({
      score: 0,
      currentQuestion: 0,
      timeLeft: 30,
      isPlaying: false,
      selectedAnswer: '',
      showResult: false,
      isCorrect: false,
      gameOver: false,
  });

  const topicForm = useForm<TopicFormValues>({ resolver: zodResolver(topicFormSchema), defaultValues: { topic: "" } });

  useEffect(() => {
    if (state?.error) {
      toast({ variant: "destructive", title: "Error", description: state.error });
    } else if (state?.questions) {
      // Reset game when new quiz is loaded
      setGameState({ score: 0, currentQuestion: 0, timeLeft: 30, isPlaying: false, selectedAnswer: '', showResult: false, isCorrect: false, gameOver: false });
    }
  }, [state, toast]);

  // Timer effect
  useEffect(() => {
    if (gameState.isPlaying && gameState.timeLeft > 0) {
      const timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameState.isPlaying && gameState.timeLeft === 0) {
      // Time's up, move to next question
      handleNextQuestion();
    }
  }, [gameState.isPlaying, gameState.timeLeft]);

  const handleTopicSubmit = topicForm.handleSubmit((data) => {
    const formData = new FormData();
    formData.append("topic", data.topic);
    startTransition(() => formAction(formData));
  });
  
  const handleStartGame = () => {
    setGameState(prev => ({ ...prev, isPlaying: true, timeLeft: 30 }));
  };

  const handleAnswerSelect = (answer: string) => {
    if (!gameState.isPlaying || gameState.showResult) return;
    
    setGameState(prev => ({ ...prev, selectedAnswer: answer }));
  };

  const handleSubmitAnswer = () => {
    if (!state?.questions || !gameState.isPlaying) return;
    
    const currentQuestion = state.questions[gameState.currentQuestion];
    const isCorrect = gameState.selectedAnswer === currentQuestion.answer;
    
    setGameState(prev => ({
      ...prev,
      isCorrect,
      showResult: true,
      score: isCorrect ? prev.score + 1 : prev.score,
      isPlaying: false
    }));
  };

  const handleNextQuestion = () => {
    if (!state?.questions) return;
    
    const nextQuestion = gameState.currentQuestion + 1;
    if (nextQuestion >= state.questions.length) {
      setGameState(prev => ({ ...prev, gameOver: true, isPlaying: false }));
    } else {
      setGameState(prev => ({
        ...prev,
        currentQuestion: nextQuestion,
        timeLeft: 30,
        selectedAnswer: '',
        showResult: false,
        isCorrect: false,
        isPlaying: true
      }));
    }
  };

  const handleRestart = () => {
     setGameState({ score: 0, currentQuestion: 0, timeLeft: 30, isPlaying: false, selectedAnswer: '', showResult: false, isCorrect: false, gameOver: false });
  }
  
  const handleNewGame = () => {
    topicForm.reset({ topic: ""});
    startTransition(() => formAction(new FormData()));
  }

  if (!state?.questions || state.questions.length === 0) {
    return (
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Generate Rapid Fire Quiz</CardTitle>
          <CardDescription>Enter a topic to generate a new rapid fire quiz.</CardDescription>
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
                Generate Quiz
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }

  if (gameState.gameOver) {
    return (
      <Card className="text-center">
        <CardHeader>
          <Trophy className="mx-auto h-12 w-12 text-yellow-400"/>
          <CardTitle>Quiz Complete!</CardTitle>
          <CardDescription>You've completed the rapid fire quiz on {topicForm.getValues('topic')}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-2xl font-bold">Your final score: {gameState.score} / {state.questions.length}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={handleRestart} variant="secondary">
              <Repeat className="mr-2 h-4 w-4"/>Play Again
            </Button>
            <Button onClick={handleNewGame}>Start New Game</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = state.questions[gameState.currentQuestion];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Question {gameState.currentQuestion + 1} of {state.questions.length}</CardTitle>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4"/>
            <span className="text-lg font-bold">{gameState.timeLeft}s</span>
          </div>
        </div>
        <CardDescription>Score: {gameState.score}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-6 bg-muted rounded-lg">
          <p className="text-lg font-medium">{currentQuestion.question}</p>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant={gameState.selectedAnswer === option ? "default" : "outline"}
              className={`p-4 h-auto text-left justify-start ${
                gameState.showResult 
                  ? option === currentQuestion.answer 
                    ? 'bg-green-500 text-white' 
                    : gameState.selectedAnswer === option
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100'
                  : ''
              }`}
              onClick={() => handleAnswerSelect(option)}
              disabled={gameState.showResult || !gameState.isPlaying}
            >
              <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
              {option}
            </Button>
          ))}
        </div>
        
        {!gameState.showResult && gameState.isPlaying && (
          <Button 
            onClick={handleSubmitAnswer} 
            className="w-full" 
            disabled={!gameState.selectedAnswer}
          >
            Submit Answer
          </Button>
        )}
        
        {gameState.showResult && (
          <Alert variant={gameState.isCorrect ? "default" : "destructive"} className={gameState.isCorrect ? "border-green-500 bg-green-500/10" : ""}>
            {gameState.isCorrect ? <Check className="h-4 w-4"/> : <X className="h-4 w-4"/>}
            <AlertTitle>{gameState.isCorrect ? "Correct!" : "Incorrect!"}</AlertTitle>
            <AlertDescription>
              The correct answer is <strong>{currentQuestion.answer}</strong>.
            </AlertDescription>
          </Alert>
        )}
        
        {gameState.showResult && (
          <Button onClick={handleNextQuestion} className="w-full">
            Next Question
          </Button>
        )}
        
        {!gameState.isPlaying && !gameState.showResult && (
          <Button onClick={handleStartGame} className="w-full">
            Start Quiz
          </Button>
        )}
      </CardContent>
    </Card>
  );
}