export type DifficultyLevel = "easy" | "medium" | "hard";
export type Domain = "incident-response" | "cyber-hygiene";

export interface Action {
  id: string;
  text: string;
  correctOrder: number;
}

export interface Scenario {
  id: string;
  domain: Domain;
  title: string;
  description: string;
  actions: Action[];
  difficulty: DifficultyLevel;
  points: number;
}

export interface UserProgress {
  totalPoints: number;
  scenariosCompleted: number;
  domainStats: {
    [key in Domain]: {
      completed: number;
      totalAttempts: number;
      averageScore: number;
      currentDifficulty: DifficultyLevel;
    };
  };
  badges: Badge[];
  lastAttempt?: {
    scenarioId: string;
    score: number;
    timestamp: number;
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: number;
}

export interface AttemptResult {
  correct: boolean;
  score: number;
  feedback: string;
  correctSequence: string[];
  userSequence: string[];
}
