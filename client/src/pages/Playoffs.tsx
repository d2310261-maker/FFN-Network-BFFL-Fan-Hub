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
  const [bracket1, setBracket1] = useState<BracketMatch[]>([
    { id: "wc1", round: 1, team1: undefined, team2: undefined },
    { id: "wc2", round: 1, team1: undefined, team2: undefined },
    { id: "div1", round: 2, team1: undefined, team2: undefined },
    { id: "final", round: 3, team1: undefined, team2: undefined },
  ]);

  const [bracket2, setBracket2] = useState<BracketMatch[]>([
    { id: "wc3", round: 1, team1: undefined, team2: undefined },
    { id: "wc4", round: 1, team1: undefined, team2: undefined },
    { id: "div2", round: 2, team1: undefined, team2: undefined },
    { id: "final2", round: 3, team1: undefined, team2: undefined },
  ]);

  const updateMatch = (matchId: string, field: string, value: any, bracketNum: number) => {
    if (!isAuthenticated) return;
    const bracket = bracketNum === 1 ? bracket1 : bracket2;
    const setBracket = bracketNum === 1 ? setBracket1 : setBracket2;
    setBracket(
      bracket.map((match) =>
        match.id === matchId ? { ...match, [field]: value } : match
      )
    );
  };

  const getMatchesForRound = (round: number, bracketNum: number) => {
    const bracket = bracketNum === 1 ? bracket1 : bracket2;
    return bracket.filter((m) => m.round === round);
  };

  const roundNames: Record<number, string> = {
    1: "Wildcard",
    2: "Divisional",
    3: "Championship",
  };

  const MatchCard = ({ match, bracketNum, isAdmin }: { match: BracketMatch; bracketNum: number; isAdmin: boolean }) => (
    <div className="border rounded-lg p-4 bg-muted/30 space-y-3" data-testid={`card-match-${match.id}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((teamNum) => {
          const teamKey = (teamNum === 1 ? "team1" : "team2") as "team1" | "team2";
          const team = match[teamKey];

          return (
            <div key={teamNum}>
              <Label>Team {teamNum}</Label>
              {isAdmin ? (
                <Input
                  list={`teams-${match.id}-${teamNum}`}
                  value={team?.name || ""}
                  onChange={(e) => {
                    const newTeam = e.target.value
                      ? { id: `${match.id}-t${teamNum}`, name: e.target.value }
                      : undefined;
                    updateMatch(match.id, teamKey, newTeam, bracketNum);
                  }}
                  placeholder="Enter team name"
                  data-testid={`input-team${teamNum}-${match.id}`}
                />
              ) : (
                <div className="p-2 text-sm">{team?.name || "TBD"}</div>
              )}
              <datalist id={`teams-${match.id}-${teamNum}`}>
                {AVAILABLE_TEAMS.map((team) => (
                  <option key={team} value={team} />
                ))}
              </datalist>
            </div>
          );
        })}
      </div>
      {match.team1 && match.team2 && (
        <div className="pt-3 border-t">
          <Label className="mb-2 block">Winner</Label>
          <div className="flex gap-2">
            <Button
              variant={match.winner === match.team1.id ? "default" : "outline"}
              size="sm"
              onClick={() => updateMatch(match.id, "winner", match.team1?.id, bracketNum)}
              className="flex-1"
              data-testid={`button-winner1-${match.id}`}
            >
              {match.team1.name}
            </Button>
            <Button
              variant={match.winner === match.team2?.id ? "default" : "outline"}
              size="sm"
              onClick={() => updateMatch(match.id, "winner", match.team2?.id, bracketNum)}
              className="flex-1"
              data-testid={`button-winner2-${match.id}`}
            >
              {match.team2.name}
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  const BracketColumn = ({ bracketNum, title }: { bracketNum: number; title: string }) => (
    <div>
      <h2 className="text-2xl font-bold mb-6" data-testid={`text-bracket${bracketNum}-title`}>{title}</h2>
      <div className="space-y-8">
        {[1, 2, 3].map((round) => (
          <Card key={round} className="p-6">
            <h3 className="text-lg font-bold mb-4">{roundNames[round]}</h3>
            <div className="space-y-4">
              {getMatchesForRound(round, bracketNum).map((match) => (
                <MatchCard key={match.id} match={match} bracketNum={bracketNum} isAdmin={isAuthenticated} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4" data-testid="text-page-title">
            Playoff Bracket
          </h1>
          <p className="text-muted-foreground text-lg">
            BFFL Season 1 - 12 Team Playoff
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BracketColumn bracketNum={1} title="Left Bracket" />
          <BracketColumn bracketNum={2} title="Right Bracket" />
        </div>
      </div>
    </div>
  );
}
