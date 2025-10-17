import { useState, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableAction } from "./SortableAction";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge as BadgeUI } from "@/components/ui/badge";
import { Scenario, AttemptResult } from "@/types/scenario";
import { CheckCircle2, XCircle, AlertCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface ScenarioTrainerProps {
  scenario: Scenario;
  onComplete: (result: AttemptResult) => void;
}

export const ScenarioTrainer = ({ scenario, onComplete }: ScenarioTrainerProps) => {
  const [actions, setActions] = useState(() => 
    [...scenario.actions].sort(() => Math.random() - 0.5)
  );
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<AttemptResult | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setActions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSubmit = () => {
    const userSequence = actions.map(a => a.text);
    const correctSequence = [...scenario.actions]
      .sort((a, b) => a.correctOrder - b.correctOrder)
      .map(a => a.text);
    
    let correctCount = 0;
    actions.forEach((action, index) => {
      if (action.correctOrder === index + 1) {
        correctCount++;
      }
    });

    const isCorrect = correctCount === actions.length;
    const score = correctCount;
    
    let feedback = "";
    if (isCorrect) {
      feedback = "Perfect! You've correctly ordered all actions.";
      toast.success("Excellent work! 🎉", {
        description: `You earned ${scenario.points} points!`
      });
    } else {
      const percentage = Math.round((correctCount / actions.length) * 100);
      feedback = `You got ${correctCount} out of ${actions.length} actions in the correct position (${percentage}%). Review the correct sequence and try again!`;
      toast.error("Not quite right", {
        description: `You got ${percentage}% correct. Keep learning!`
      });
    }

    const attemptResult: AttemptResult = {
      correct: isCorrect,
      score,
      feedback,
      correctSequence,
      userSequence
    };

    setResult(attemptResult);
    setSubmitted(true);
    onComplete(attemptResult);
  };

  const handleReset = () => {
    setActions([...scenario.actions].sort(() => Math.random() - 0.5));
    setSubmitted(false);
    setResult(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "hard": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold">{scenario.title}</h2>
              <BadgeUI className={getDifficultyColor(scenario.difficulty)}>
                {scenario.difficulty}
              </BadgeUI>
              <BadgeUI variant="outline">{scenario.points} pts</BadgeUI>
            </div>
            <p className="text-muted-foreground text-lg">{scenario.description}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          {submitted ? "Your Answer vs Correct Sequence" : "Drag actions into the correct order:"}
        </h3>
        
        {!submitted ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={actions.map(a => a.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {actions.map((action, index) => (
                  <SortableAction
                    key={action.id}
                    id={action.id}
                    text={action.text}
                    index={index}
                    submitted={false}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Your Sequence
              </h4>
              <div className="space-y-2">
                {actions.map((action, index) => {
                  const isCorrectPosition = action.correctOrder === index + 1;
                  return (
                    <div
                      key={action.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        isCorrectPosition
                          ? "border-green-500 bg-green-50 dark:bg-green-950"
                          : "border-red-500 bg-red-50 dark:bg-red-950"
                      }`}
                    >
                      {isCorrectPosition ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      )}
                      <span className="font-medium text-sm mr-2">{index + 1}.</span>
                      <span className="text-sm">{action.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Correct Sequence
              </h4>
              <div className="space-y-2">
                {[...scenario.actions]
                  .sort((a, b) => a.correctOrder - b.correctOrder)
                  .map((action, index) => (
                    <div
                      key={action.id}
                      className="flex items-center gap-3 p-3 rounded-lg border border-green-500 bg-green-50 dark:bg-green-950"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="font-medium text-sm mr-2">{index + 1}.</span>
                      <span className="text-sm">{action.text}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </Card>

      {result && (
        <Card className={`p-6 ${result.correct ? "border-green-500" : "border-yellow-500"}`}>
          <div className="flex items-start gap-4">
            {result.correct ? (
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            ) : (
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">
                {result.correct ? "Excellent Work!" : "Keep Learning!"}
              </h3>
              <p className="text-muted-foreground">{result.feedback}</p>
            </div>
          </div>
        </Card>
      )}

      <div className="flex gap-3">
        {!submitted ? (
          <Button onClick={handleSubmit} className="flex-1" size="lg">
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleReset} className="flex-1" size="lg" variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};
