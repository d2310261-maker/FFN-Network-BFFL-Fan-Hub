import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  side: "left" | "right";
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
    // LEFT SIDE - Play-In (2 matches)
    { id: "l_pi1", round: 1, side: "left", team1: undefined, team2: undefined },
    { id: "l_pi2", round: 1, side: "left", team1: undefined, team2: undefined },
    // LEFT SIDE - Divisional (2 matches)
    { id: "l_div1", round: 2, side: "left", team1: undefined, team2: undefined },
    { id: "l_div2", round: 2, side: "left", team1: undefined, team2: undefined },
    // LEFT SIDE - Conference (1 match)
    { id: "l_conf", round: 3, side: "left", team1: undefined, team2: undefined },
    // RIGHT SIDE - Play-In (2 matches)
    { id: "r_pi1", round: 1, side: "right", team1: undefined, team2: undefined },
    { id: "r_pi2", round: 1, side: "right", team1: undefined, team2: undefined },
    // RIGHT SIDE - Divisional (2 matches)
    { id: "r_div1", round: 2, side: "right", team1: undefined, team2: undefined },
    { id: "r_div2", round: 2, side: "right", team1: undefined, team2: undefined },
    // RIGHT SIDE - Conference (1 match)
    { id: "r_conf", round: 3, side: "right", team1: undefined, team2: undefined },
    // SUPER BOWL (1 match)
    { id: "sb", round: 4, side: "left", team1: undefined, team2: undefined },
  ]);

  const updateMatch = (matchId: string, field: string, value: any) => {
    if (!isAuthenticated) return;
    setBracket(
      bracket.map((match) =>
        match.id === matchId ? { ...match, [field]: value } : match
      )
    );
  };

  const getMatches = (round: number, side: "left" | "right") => {
    return bracket.filter((m) => m.round === round && m.side === side);
  };

  const MatchBox = ({ match }: { match: BracketMatch }) => (
    <div className="bg-card border border-border rounded-md p-2 min-w-[180px] text-xs" data-testid={`card-match-${match.id}`}>
      <div className="space-y-1.5">
        <div>
          {isAuthenticated ? (
            <Input
              list={`teams-${match.id}-1`}
              value={match.team1?.name || ""}
              onChange={(e) => {
                const newTeam = e.target.value
                  ? { id: `${match.id}-t1`, name: e.target.value }
                  : undefined;
                updateMatch(match.id, "team1", newTeam);
              }}
              placeholder="Team"
              className="text-xs h-7"
              data-testid={`input-team1-${match.id}`}
            />
          ) : (
            <div className="font-medium">{match.team1?.name || "TBD"}</div>
          )}
          <datalist id={`teams-${match.id}-1`}>
            {AVAILABLE_TEAMS.map((t) => <option key={t} value={t} />)}
          </datalist>
        </div>

        <div className="h-px bg-border" />

        <div>
          {isAuthenticated ? (
            <Input
              list={`teams-${match.id}-2`}
              value={match.team2?.name || ""}
              onChange={(e) => {
                const newTeam = e.target.value
                  ? { id: `${match.id}-t2`, name: e.target.value }
                  : undefined;
                updateMatch(match.id, "team2", newTeam);
              }}
              placeholder="Team"
              className="text-xs h-7"
              data-testid={`input-team2-${match.id}`}
            />
          ) : (
            <div className="font-medium">{match.team2?.name || "TBD"}</div>
          )}
          <datalist id={`teams-${match.id}-2`}>
            {AVAILABLE_TEAMS.map((t) => <option key={t} value={t} />)}
          </datalist>
        </div>
      </div>

      {isAuthenticated && match.team1 && match.team2 && (
        <div className="flex gap-0.5 mt-1.5 pt-1.5 border-t">
          <Button
            variant={match.winner === match.team1.id ? "default" : "outline"}
            size="sm"
            onClick={() => updateMatch(match.id, "winner", match.team1?.id)}
            className="flex-1 h-6 text-xs"
            data-testid={`button-winner1-${match.id}`}
          >
            W
          </Button>
          <Button
            variant={match.winner === match.team2?.id ? "default" : "outline"}
            size="sm"
            onClick={() => updateMatch(match.id, "winner", match.team2?.id)}
            className="flex-1 h-6 text-xs"
            data-testid={`button-winner2-${match.id}`}
          >
            W
          </Button>
        </div>
      )}
    </div>
  );

  const BracketColumn = ({ round, side, title }: { round: number; side: "left" | "right"; title: string }) => {
    const matches = getMatches(round, side);
    const spacing = Math.pow(2, round - 1);

    return (
      <div className="flex flex-col items-center px-2">
        <div className="text-xs font-bold mb-3 text-muted-foreground">{title}</div>
        <div className="flex flex-col justify-center gap-8">
          {matches.map((match, idx) => (
            <div key={match.id} style={{ marginTop: idx === 0 ? 0 : `${(spacing - 1) * 30}px` }}>
              <MatchBox match={match} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-full px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-2" data-testid="text-page-title">
            Playoff Bracket
          </h1>
          <p className="text-muted-foreground">BFFL Season 1 - 12 Team Playoff</p>
        </div>

        <div className="overflow-x-auto">
          <div className="flex justify-center items-center min-w-max gap-1 pb-8">
            {/* LEFT SIDE */}
            <div className="flex gap-2">
              <BracketColumn round={1} side="left" title="Play-In" />
              <BracketColumn round={2} side="left" title="Divisional" />
              <BracketColumn round={3} side="left" title="Conf Champ" />
            </div>

            {/* SUPER BOWL CENTER */}
            <div className="flex flex-col items-center px-4">
              <div className="text-xs font-bold mb-3 text-muted-foreground">Super Bowl</div>
              <MatchBox match={bracket.find(m => m.id === "sb")!} />
            </div>

            {/* RIGHT SIDE */}
            <div className="flex gap-2">
              <BracketColumn round={3} side="right" title="Conf Champ" />
              <BracketColumn round={2} side="right" title="Divisional" />
              <BracketColumn round={1} side="right" title="Play-In" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
