import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BracketTeam {
  id: string;
  name: string;
}

interface BracketMatch {
  id: string;
  team1?: BracketTeam;
  team2?: BracketTeam;
  winner?: string;
  round: number;
  side: "top" | "bottom";
}

const AVAILABLE_TEAMS = [
  "Atlanta Falcons",
  "Tampa Bay Buccaneers",
  "Jacksonville Jaguars",
  "Los Angeles Rams",
  "Baltimore Ravens",
  "Miami Dolphins",
  "Chicago Bears",
  "Houston Texans",
  "New Orleans Saints",
  "San Francisco 49ers",
  "Kansas City Chiefs",
  "Detroit Lions",
  "Philadelphia Eagles",
  "Arizona Cardinals",
  "Dallas Cowboys",
  "Buffalo Bills",
];

export default function Playoffs() {
  const { isAuthenticated } = useAuth();
  const [bracket, setBracket] = useState<BracketMatch[]>([
    // Top side (seeds 1-6)
    { id: "wc1", round: 1, side: "top", team1: undefined, team2: undefined },
    { id: "wc2", round: 1, side: "top", team1: undefined, team2: undefined },
    { id: "div1", round: 2, side: "top", team1: undefined, team2: undefined },
    // Bottom side (seeds 7-12)
    { id: "wc3", round: 1, side: "bottom", team1: undefined, team2: undefined },
    { id: "wc4", round: 1, side: "bottom", team1: undefined, team2: undefined },
    { id: "div2", round: 2, side: "bottom", team1: undefined, team2: undefined },
    // Conference Championship
    { id: "conf1", round: 3, side: "top", team1: undefined, team2: undefined },
    { id: "conf2", round: 3, side: "bottom", team1: undefined, team2: undefined },
    // Super Bowl
    { id: "superbowl", round: 4, side: "top", team1: undefined, team2: undefined },
  ]);

  const updateMatch = (matchId: string, field: string, value: any) => {
    if (!isAuthenticated) return;
    setBracket(
      bracket.map((match) =>
        match.id === matchId ? { ...match, [field]: value } : match
      )
    );
  };

  const getMatchesForRound = (round: number, side?: "top" | "bottom") => {
    return bracket.filter((m) => m.round === round && (side ? m.side === side : true));
  };

  const usedTeams = bracket
    .flatMap((m) => [m.team1?.name, m.team2?.name])
    .filter(Boolean) as string[];

  const MatchCard = ({ match, isAdmin }: { match: BracketMatch; isAdmin: boolean }) => (
    <div className="bg-muted/50 rounded border border-border p-3 min-w-[180px]" data-testid={`card-match-${match.id}`}>
      <div className="divide-y text-sm">
        <div className="pb-2 font-medium">
          {isAdmin ? (
            <Input
              size={1}
              value={match.team1?.name || ""}
              onChange={(e) => {
                const newTeam = e.target.value
                  ? { id: `${match.id}-t1`, name: e.target.value }
                  : undefined;
                updateMatch(match.id, "team1", newTeam);
              }}
              placeholder="Team 1"
              className="text-xs"
              data-testid={`input-team1-${match.id}`}
            />
          ) : (
            <>{match.team1?.name || "TBD"}</>
          )}
          {match.winner === match.team1?.id && <span className="ml-2 text-primary font-bold">✓</span>}
        </div>
        <div className="pt-2 font-medium">
          {isAdmin ? (
            <Input
              size={1}
              value={match.team2?.name || ""}
              onChange={(e) => {
                const newTeam = e.target.value
                  ? { id: `${match.id}-t2`, name: e.target.value }
                  : undefined;
                updateMatch(match.id, "team2", newTeam);
              }}
              placeholder="Team 2"
              className="text-xs"
              data-testid={`input-team2-${match.id}`}
            />
          ) : (
            <>{match.team2?.name || "TBD"}</>
          )}
          {match.winner === match.team2?.id && <span className="ml-2 text-primary font-bold">✓</span>}
        </div>
      </div>
      {isAdmin && match.team1 && match.team2 && (
        <div className="mt-2 flex gap-1">
          <Button
            variant={match.winner === match.team1.id ? "default" : "outline"}
            size="sm"
            onClick={() => updateMatch(match.id, "winner", match.team1?.id)}
            className="flex-1 text-xs"
            data-testid={`button-winner1-${match.id}`}
          >
            W
          </Button>
          <Button
            variant={match.winner === match.team2?.id ? "default" : "outline"}
            size="sm"
            onClick={() => updateMatch(match.id, "winner", match.team2?.id)}
            className="flex-1 text-xs"
            data-testid={`button-winner2-${match.id}`}
          >
            W
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black mb-4" data-testid="text-page-title">
          Playoff Bracket
        </h1>
        <p className="text-muted-foreground text-lg">
          BFFL Season 1 - 12 Team Playoff
        </p>
      </div>

      {isAuthenticated ? (
        <div className="space-y-8">
          <Card className="p-6">
            <div className="grid grid-cols-2 gap-8">
              {/* TOP SIDE */}
              <div>
                <h2 className="text-xl font-bold mb-6 pb-2 border-b">Top Bracket</h2>
                <div className="space-y-8">
                  {/* Round 1 */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">Play-In</h3>
                    <div className="space-y-3">
                      {getMatchesForRound(1, "top").map((match) => (
                        <MatchCard key={match.id} match={match} isAdmin={true} />
                      ))}
                    </div>
                  </div>

                  {/* Round 2 */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">Divisional</h3>
                    <div className="space-y-3">
                      {getMatchesForRound(2, "top").map((match) => (
                        <MatchCard key={match.id} match={match} isAdmin={true} />
                      ))}
                    </div>
                  </div>

                  {/* Round 3 */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">Championship</h3>
                    <div className="space-y-3">
                      {getMatchesForRound(3, "top").map((match) => (
                        <MatchCard key={match.id} match={match} isAdmin={true} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM SIDE */}
              <div>
                <h2 className="text-xl font-bold mb-6 pb-2 border-b">Bottom Bracket</h2>
                <div className="space-y-8">
                  {/* Round 1 */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">Play-In</h3>
                    <div className="space-y-3">
                      {getMatchesForRound(1, "bottom").map((match) => (
                        <MatchCard key={match.id} match={match} isAdmin={true} />
                      ))}
                    </div>
                  </div>

                  {/* Round 2 */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">Divisional</h3>
                    <div className="space-y-3">
                      {getMatchesForRound(2, "bottom").map((match) => (
                        <MatchCard key={match.id} match={match} isAdmin={true} />
                      ))}
                    </div>
                  </div>

                  {/* Round 3 */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">Championship</h3>
                    <div className="space-y-3">
                      {getMatchesForRound(3, "bottom").map((match) => (
                        <MatchCard key={match.id} match={match} isAdmin={true} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Super Bowl */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Super Bowl</h2>
            <div className="flex justify-center">
              {getMatchesForRound(4, "top").map((match) => (
                <MatchCard key={match.id} match={match} isAdmin={true} />
              ))}
            </div>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* TOP SIDE - VIEW */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6 pb-2 border-b">Top Bracket</h2>
            <div className="space-y-8">
              {[1, 2, 3].map((round) => (
                <div key={round}>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                    {round === 1 ? "Play-In" : round === 2 ? "Divisional" : "Championship"}
                  </h3>
                  <div className="space-y-3">
                    {getMatchesForRound(round, "top").map((match) => (
                      <MatchCard key={match.id} match={match} isAdmin={false} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* BOTTOM SIDE - VIEW */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6 pb-2 border-b">Bottom Bracket</h2>
            <div className="space-y-8">
              {[1, 2, 3].map((round) => (
                <div key={round}>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                    {round === 1 ? "Play-In" : round === 2 ? "Divisional" : "Championship"}
                  </h3>
                  <div className="space-y-3">
                    {getMatchesForRound(round, "bottom").map((match) => (
                      <MatchCard key={match.id} match={match} isAdmin={false} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
