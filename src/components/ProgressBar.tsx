import { Progress } from "@/components/ui/progress";
import { UserProgress } from "@/types/scenario";

interface ProgressBarProps {
  progress: UserProgress;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const totalScenarios = 11; // Total number of scenarios available
  const completionPercentage = (progress.scenariosCompleted / totalScenarios) * 100;
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium">Overall Progress</span>
        <span className="text-muted-foreground">
          {progress.scenariosCompleted}/{totalScenarios} scenarios
        </span>
      </div>
      <Progress value={completionPercentage} className="h-3" />
      <p className="text-xs text-muted-foreground text-center">
        {Math.round(completionPercentage)}% Complete
      </p>
    </div>
  );
};
