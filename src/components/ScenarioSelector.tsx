import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scenario, Domain, DifficultyLevel } from "@/types/scenario";
import { CheckCircle2, Lock, Play } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ScenarioSelectorProps {
  scenarios: Scenario[];
  onSelect: (scenario: Scenario) => void;
  completedScenarios: Set<string>;
  recommendedDifficulty: {
    "incident-response": DifficultyLevel;
    "cyber-hygiene": DifficultyLevel;
  };
}

export const ScenarioSelector = ({
  scenarios,
  onSelect,
  completedScenarios,
  recommendedDifficulty,
}: ScenarioSelectorProps) => {
  const [selectedDomain, setSelectedDomain] = useState<Domain>("incident-response");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getDomainScenarios = (domain: Domain) => {
    return scenarios.filter((s) => s.domain === domain);
  };

  const renderScenarioCard = (scenario: Scenario) => {
    const isCompleted = completedScenarios.has(scenario.id);
    const isRecommended = scenario.difficulty === recommendedDifficulty[scenario.domain];

    return (
      <Card
        key={scenario.id}
        className={`p-6 hover:shadow-lg transition-all ${
          isRecommended ? "ring-2 ring-primary" : ""
        }`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg">{scenario.title}</h3>
                {isCompleted && (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {scenario.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge className={getDifficultyColor(scenario.difficulty)}>
                {scenario.difficulty}
              </Badge>
              <Badge variant="outline">{scenario.points} pts</Badge>
              {isRecommended && (
                <Badge variant="default">Recommended</Badge>
              )}
            </div>
            
            <Button
              onClick={() => onSelect(scenario)}
              size="sm"
              className="gap-2"
            >
              <Play className="w-4 h-4" />
              {isCompleted ? "Try Again" : "Start"}
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs
        value={selectedDomain}
        onValueChange={(v) => setSelectedDomain(v as Domain)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="incident-response">
            Incident Response
          </TabsTrigger>
          <TabsTrigger value="cyber-hygiene">
            Cyber Hygiene
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="incident-response" className="space-y-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Learn to respond effectively to security incidents
            </p>
            <Badge variant="outline">
              Recommended: {recommendedDifficulty["incident-response"]}
            </Badge>
          </div>
          <div className="grid gap-4">
            {getDomainScenarios("incident-response").map(renderScenarioCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="cyber-hygiene" className="space-y-4 mt-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Master essential security best practices
            </p>
            <Badge variant="outline">
              Recommended: {recommendedDifficulty["cyber-hygiene"]}
            </Badge>
          </div>
          <div className="grid gap-4">
            {getDomainScenarios("cyber-hygiene").map(renderScenarioCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
