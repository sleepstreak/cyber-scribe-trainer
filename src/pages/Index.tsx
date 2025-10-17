import { useState } from "react";
import { ScenarioTrainer } from "@/components/ScenarioTrainer";
import { Dashboard } from "@/components/Dashboard";
import { ProgressBar } from "@/components/ProgressBar";
import { ScenarioSelector } from "@/components/ScenarioSelector";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { scenarios } from "@/data/scenarios";
import { useProgress } from "@/hooks/useProgress";
import { Scenario, AttemptResult } from "@/types/scenario";
import { Shield, BarChart3, Home } from "lucide-react";

const Index = () => {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [activeTab, setActiveTab] = useState("scenarios");
  const { progress, updateProgress, getRecommendedDifficulty } = useProgress();

  const completedScenarios = new Set(
    scenarios
      .filter((s) => {
        const domainStats = progress.domainStats[s.domain];
        return domainStats.completed > 0;
      })
      .map((s) => s.id)
  );

  const handleScenarioComplete = (result: AttemptResult) => {
    if (currentScenario) {
      updateProgress(
        currentScenario.domain,
        result.score,
        currentScenario.actions.length,
        currentScenario.points,
        currentScenario.id,
        currentScenario.difficulty
      );
    }
  };

  const handleBackToScenarios = () => {
    setCurrentScenario(null);
    setActiveTab("scenarios");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">CyberScribe Trainer</h1>
                <p className="text-sm text-muted-foreground">
                  Interactive Cybersecurity Scenario Training
                </p>
              </div>
            </div>
            {currentScenario && (
              <Button variant="outline" onClick={handleBackToScenarios}>
                <Home className="w-4 h-4 mr-2" />
                Back to Scenarios
              </Button>
            )}
          </div>
          {!currentScenario && (
            <div className="mt-6">
              <ProgressBar progress={progress} />
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentScenario ? (
          <ScenarioTrainer
            scenario={currentScenario}
            onComplete={handleScenarioComplete}
          />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="scenarios" className="gap-2">
                <Shield className="w-4 h-4" />
                Scenarios
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="scenarios" className="mt-6">
              <ScenarioSelector
                scenarios={scenarios}
                onSelect={setCurrentScenario}
                completedScenarios={completedScenarios}
                recommendedDifficulty={{
                  "incident-response": getRecommendedDifficulty("incident-response"),
                  "cyber-hygiene": getRecommendedDifficulty("cyber-hygiene"),
                }}
              />
            </TabsContent>

            <TabsContent value="dashboard" className="mt-6">
              <Dashboard progress={progress} />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default Index;
