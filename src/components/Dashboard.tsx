import { Card } from "@/components/ui/card";
import { UserProgress } from "@/types/scenario";
import { Trophy, Target, TrendingUp, Award } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

interface DashboardProps {
  progress: UserProgress;
}

export const Dashboard = ({ progress }: DashboardProps) => {
  const radarData = [
    {
      domain: "Incident Response",
      score: progress.domainStats["incident-response"].averageScore,
      fullMark: 100,
    },
    {
      domain: "Cyber Hygiene",
      score: progress.domainStats["cyber-hygiene"].averageScore,
      fullMark: 100,
    },
  ];

  const earnedBadges = progress.badges.filter(b => b.earned);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Points</p>
              <p className="text-2xl font-bold">{progress.totalPoints}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-950 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold">{progress.scenariosCompleted}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-950 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Score</p>
              <p className="text-2xl font-bold">
                {Math.round(
                  (progress.domainStats["incident-response"].averageScore +
                    progress.domainStats["cyber-hygiene"].averageScore) / 2
                )}%
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-950 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Badges</p>
              <p className="text-2xl font-bold">
                {earnedBadges.length}/{progress.badges.length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Performance by Domain</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="domain" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Domain Statistics</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Incident Response</h4>
                <span className="text-sm text-muted-foreground">
                  {progress.domainStats["incident-response"].completed} completed
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Average Score:</span>
                  <span className="font-semibold">
                    {Math.round(progress.domainStats["incident-response"].averageScore)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Current Difficulty:</span>
                  <span className="font-semibold capitalize">
                    {progress.domainStats["incident-response"].currentDifficulty}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Cyber Hygiene</h4>
                <span className="text-sm text-muted-foreground">
                  {progress.domainStats["cyber-hygiene"].completed} completed
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Average Score:</span>
                  <span className="font-semibold">
                    {Math.round(progress.domainStats["cyber-hygiene"].averageScore)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Current Difficulty:</span>
                  <span className="font-semibold capitalize">
                    {progress.domainStats["cyber-hygiene"].currentDifficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Achievements</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {progress.badges.map((badge) => (
            <div
              key={badge.id}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border ${
                badge.earned
                  ? "border-primary bg-primary/5"
                  : "border-muted bg-muted/20 opacity-50"
              }`}
            >
              <span className="text-3xl">{badge.icon}</span>
              <p className="text-xs font-medium text-center">{badge.name}</p>
              <p className="text-xs text-muted-foreground text-center">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
