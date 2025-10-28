import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Trophy, Users, Zap } from "lucide-react";
import { HeroStatsCard } from "./HeroStatsCard";
import { useQuery } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/getSummary";

export const HeroStats = () => {
  const { data: summary } = useQuery({
    queryKey: ["summary"],
    queryFn: () => getSummaryAction(),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Characters
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary?.totalHeroes}</div>
          <div className="flex gap-1 mt-2">
            <Badge variant="secondary" className="text-xs">
              {summary?.heroCount} Heroes
            </Badge>
            <Badge variant="destructive" className="text-xs">
              {summary?.villainCount} Villains
            </Badge>
          </div>
        </CardContent>
      </Card>

      <HeroStatsCard
        title="Favorites"
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-2xl font-bold text-red-600">3</div>
        <p className="text-xs text-muted-foreground">18.8% of total</p>
      </HeroStatsCard>
      <HeroStatsCard
        title="Strongest"
        icon={<Zap className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">{summary?.strongestHero.name}</div>
        <p className="text-xs text-muted-foreground">
          Strength: {summary?.strongestHero.strength}
        </p>
      </HeroStatsCard>
      <HeroStatsCard
        title="Smartest"
        icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">{summary?.smartestHero.name}</div>
        <p className="text-xs text-muted-foreground">
          Intelligence: {summary?.smartestHero.intelligence}
        </p>
      </HeroStatsCard>

      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Favorites</CardTitle>
          <Heart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">3</div>
          <p className="text-xs text-muted-foreground">18.8% of total</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Strongest</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">Superman</div>
          <p className="text-xs text-muted-foreground">Strength: 10/10</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Smartest</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold">Batman</div>
          <p className="text-xs text-muted-foreground">Intelligence: 10/10</p>
        </CardContent>
      </Card> */}
    </div>
  );
};
