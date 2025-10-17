import { useState, useEffect } from "react";
import { UserProgress, Badge, DifficultyLevel, Domain } from "@/types/scenario";
import { allBadges } from "@/data/scenarios";

const STORAGE_KEY = "cybersecurity-trainer-progress";

const initialProgress: UserProgress = {
  totalPoints: 0,
  scenariosCompleted: 0,
  domainStats: {
    "incident-response": {
      completed: 0,
      totalAttempts: 0,
      averageScore: 0,
      currentDifficulty: "easy"
    },
    "cyber-hygiene": {
      completed: 0,
      totalAttempts: 0,
      averageScore: 0,
      currentDifficulty: "easy"
    }
  },
  badges: allBadges.map(b => ({ ...b, earned: false }))
};

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialProgress;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (
    domain: Domain,
    score: number,
    maxScore: number,
    points: number,
    scenarioId: string,
    difficulty: DifficultyLevel
  ) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      const domainStats = { ...newProgress.domainStats[domain] };
      
      // Update domain stats
      domainStats.totalAttempts++;
      if (score === maxScore) {
        domainStats.completed++;
      }
      
      // Calculate new average score
      const previousTotal = domainStats.averageScore * (domainStats.totalAttempts - 1);
      domainStats.averageScore = (previousTotal + (score / maxScore * 100)) / domainStats.totalAttempts;
      
      // Adaptive difficulty: increase if doing well, decrease if struggling
      if (domainStats.totalAttempts >= 3) {
        if (domainStats.averageScore > 80 && difficulty !== "hard") {
          domainStats.currentDifficulty = difficulty === "easy" ? "medium" : "hard";
        } else if (domainStats.averageScore < 50 && difficulty !== "easy") {
          domainStats.currentDifficulty = difficulty === "hard" ? "medium" : "easy";
        }
      }
      
      newProgress.domainStats[domain] = domainStats;
      newProgress.totalPoints += score === maxScore ? points : Math.floor(points * (score / maxScore));
      if (score === maxScore) {
        newProgress.scenariosCompleted++;
      }
      
      newProgress.lastAttempt = {
        scenarioId,
        score: (score / maxScore) * 100,
        timestamp: Date.now()
      };
      
      // Check for badge achievements
      newProgress.badges = checkBadges(newProgress);
      
      return newProgress;
    });
  };

  const checkBadges = (progress: UserProgress): Badge[] => {
    return progress.badges.map(badge => {
      if (badge.earned) return badge;
      
      let shouldEarn = false;
      
      switch (badge.id) {
        case "first-scenario":
          shouldEarn = progress.scenariosCompleted >= 1;
          break;
        case "perfect-score":
          shouldEarn = progress.lastAttempt?.score === 100;
          break;
        case "incident-master":
          shouldEarn = progress.domainStats["incident-response"].completed >= 5;
          break;
        case "hygiene-expert":
          shouldEarn = progress.domainStats["cyber-hygiene"].completed >= 5;
          break;
        case "hard-mode":
          shouldEarn = progress.scenariosCompleted >= 1 && progress.lastAttempt?.score === 100;
          break;
        case "point-collector":
          shouldEarn = progress.totalPoints >= 1000;
          break;
        case "dedicated":
          shouldEarn = progress.scenariosCompleted >= 10;
          break;
      }
      
      return shouldEarn ? { ...badge, earned: true, earnedAt: Date.now() } : badge;
    });
  };

  const resetProgress = () => {
    setProgress(initialProgress);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getRecommendedDifficulty = (domain: Domain): DifficultyLevel => {
    return progress.domainStats[domain].currentDifficulty;
  };

  return {
    progress,
    updateProgress,
    resetProgress,
    getRecommendedDifficulty
  };
};
