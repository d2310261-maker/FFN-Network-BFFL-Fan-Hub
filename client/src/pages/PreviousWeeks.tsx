import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Game } from "@shared/schema";
import { useLocation } from "wouter";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function PreviousWeeks() {
  const [, setLocation] = useLocation();

  const { data: allGames, isLoading, error } = useQuery<Game[]>({
    queryKey: ["/api/games/all"],
  });

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center gap-3 text-destructive">
          <AlertCircle className="w-5 h-5" />
          <p>Failed to load games</p>
        </div>
      </div>
    );
  }

  const gamesByWeek = allGames?.reduce((acc, game) => {
    if (!acc[game.week]) {
      acc[game.week] = [];
    }
    acc[game.week].push(game);
    return acc;
  }, {} as Record<number, Game[]>) || {};

  const weeks = Object.keys(gamesByWeek).map(Number).sort((a, b) => a - b);

  const getRoundName = (week: number) => {
    if (week === 11) return "WILDCARD";
    if (week === 12) return "DIVISIONAL";
    if (week === 13) return "CONFERENCE";
    if (week === 14) return "SUPER BOWL";
    return `Week ${week}`;
  };

  const GameCardCompact = ({ game }: { game: Game }) => {
    return (
      <Link href={`/game/${game.id}`}>
        <Card className="p-3 hover-elevate cursor-pointer min-w-44" data-testid={`card-game-${game.id}`}>
          <div className="flex flex-col gap-2">
            <Badge
              variant={game.isLive ? "default" : game.isFinal ? "secondary" : "outline"}
              className="text-xs w-fit"
              data-testid={`badge-status-${game.id}`}
            >
              {game.isLive ? "LIVE" : game.isFinal ? "FINAL" : "Scheduled"}
            </Badge>
            <div className="text-sm font-semibold" data-testid={`text-matchup-${game.id}`}>
              <div className="truncate">{game.team1}</div>
              <div className="text-center my-1 text-xs">vs</div>
              <div className="truncate">{game.team2}</div>
            </div>
            {game.isFinal && (
              <div className="text-sm text-muted-foreground font-semibold text-center" data-testid={`text-score-${game.id}`}>
                {game.team1Score} - {game.team2Score}
              </div>
            )}
          </div>
        </Card>
      </Link>
    );
  };

  return (
    <div className="max-w-full mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4" data-testid="text-page-title">
          Previous Weeks
        </h1>
        <p className="text-muted-foreground text-lg">
          Browse all games from throughout the season
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      ) : weeks.length > 0 ? (
        <div className="space-y-12">
          {weeks.map((week) => (
            <div key={week}>
              <h2 className="text-2xl font-bold mb-6 text-primary">{getRoundName(week)}</h2>
              <div className="flex flex-wrap gap-4">
                {gamesByWeek[week].map((game) => (
                  <GameCardCompact key={game.id} game={game} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            No games found
          </p>
        </div>
      )}
    </div>
  );
}
