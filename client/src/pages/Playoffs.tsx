import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";
import type { PlayoffMatch } from "@shared/schema";

export default function Playoffs() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const { data: allMatches = [] } = useQuery<PlayoffMatch[]>({
    queryKey: ["/api/playoffs"],
  });

  const createMutation = useMutation({
    mutationFn: async (match: Partial<PlayoffMatch>) => {
      await apiRequest("POST", "/api/playoffs", match);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/playoffs"] });
      toast({ title: "Match created" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<PlayoffMatch> }) => {
      await apiRequest("PATCH", `/api/playoffs/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/playoffs"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/playoffs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/playoffs"] });
    },
  });

  const setupPlayin = async () => {
    for (let i = 1; i <= 4; i++) {
      await createMutation.mutateAsync({
        round: "play_in",
        matchNumber: i,
        seed1: 12 - i,
        seed2: 5 + i,
      });
    }
  };

  const playinMatches = allMatches.filter(m => m.round === "play_in").sort((a, b) => a.matchNumber - b.matchNumber);
  const wildcardMatches = allMatches.filter(m => m.round === "wildcard").sort((a, b) => a.matchNumber - b.matchNumber);
  const divisionalMatches = allMatches.filter(m => m.round === "divisional").sort((a, b) => a.matchNumber - b.matchNumber);
  const conferenceMatches = allMatches.filter(m => m.round === "conference").sort((a, b) => a.matchNumber - b.matchNumber);
  const superBowlMatches = allMatches.filter(m => m.round === "super_bowl").sort((a, b) => a.matchNumber - b.matchNumber);

  const MatchCard = ({ match, onUpdate, onDelete }: { match: PlayoffMatch; onUpdate: (data: Partial<PlayoffMatch>) => void; onDelete: () => void }) => (
    <Card className="p-4 min-w-[220px]" data-testid={`card-match-${match.id}`}>
      {isAuthenticated ? (
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Team 1 (Seed {match.seed1})</Label>
            <Input
              placeholder="Team name"
              value={match.team1 || ""}
              onChange={(e) => onUpdate({ team1: e.target.value })}
              className="text-sm"
              data-testid={`input-team1-${match.id}`}
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Team 2 (Seed {match.seed2})</Label>
            <Input
              placeholder="Team name"
              value={match.team2 || ""}
              onChange={(e) => onUpdate({ team2: e.target.value })}
              className="text-sm"
              data-testid={`input-team2-${match.id}`}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">Score 1</Label>
              <Input
                type="number"
                placeholder="0"
                value={match.team1Score ?? ""}
                onChange={(e) => onUpdate({ team1Score: e.target.value ? parseInt(e.target.value) : null })}
                className="text-sm"
                data-testid={`input-score1-${match.id}`}
              />
            </div>
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">Score 2</Label>
              <Input
                type="number"
                placeholder="0"
                value={match.team2Score ?? ""}
                onChange={(e) => onUpdate({ team2Score: e.target.value ? parseInt(e.target.value) : null })}
                className="text-sm"
                data-testid={`input-score2-${match.id}`}
              />
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={onDelete}
            className="w-full"
            data-testid={`button-delete-${match.id}`}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div>
            <div className="text-sm font-semibold">{match.team1 || `Seed ${match.seed1}`}</div>
            {match.team1Score !== null && <div className="text-lg font-bold">{match.team1Score}</div>}
          </div>
          <div className="border-t"></div>
          <div>
            <div className="text-sm font-semibold">{match.team2 || `Seed ${match.seed2}`}</div>
            {match.team2Score !== null && <div className="text-lg font-bold">{match.team2Score}</div>}
          </div>
        </div>
      )}
    </Card>
  );

  if (allMatches.length === 0 && !isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-black mb-4" data-testid="text-page-title">Playoff Bracket</h1>
        <p className="text-muted-foreground mb-8">BFFL Season 1 - 12 Team Playoff Format</p>
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Playoff bracket coming soon...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2" data-testid="text-page-title">Playoff Bracket</h1>
        <p className="text-muted-foreground mb-4">BFFL Season 1 - 12 Team Playoff Format</p>
        
        {isAuthenticated && playinMatches.length === 0 && (
          <Button onClick={setupPlayin} data-testid="button-setup-playoff">
            <Plus className="w-4 h-4 mr-2" />
            Setup 12-Team Bracket
          </Button>
        )}
      </div>

      {isAuthenticated && playinMatches.length > 0 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-bold mb-4">Play-In Round</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {playinMatches.map(m => (
                <MatchCard 
                  key={m.id} 
                  match={m} 
                  onUpdate={(data) => updateMutation.mutate({ id: m.id!, data })}
                  onDelete={() => deleteMutation.mutate(m.id!)}
                />
              ))}
            </div>
          </div>

          {wildcardMatches.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Wild Card Round</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {wildcardMatches.map(m => (
                  <MatchCard 
                    key={m.id} 
                    match={m} 
                    onUpdate={(data) => updateMutation.mutate({ id: m.id!, data })}
                    onDelete={() => deleteMutation.mutate(m.id!)}
                  />
                ))}
              </div>
            </div>
          )}

          {divisionalMatches.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Divisional Round</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {divisionalMatches.map(m => (
                  <MatchCard 
                    key={m.id} 
                    match={m} 
                    onUpdate={(data) => updateMutation.mutate({ id: m.id!, data })}
                    onDelete={() => deleteMutation.mutate(m.id!)}
                  />
                ))}
              </div>
            </div>
          )}

          {conferenceMatches.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Conference Championship</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {conferenceMatches.map(m => (
                  <MatchCard 
                    key={m.id} 
                    match={m} 
                    onUpdate={(data) => updateMutation.mutate({ id: m.id!, data })}
                    onDelete={() => deleteMutation.mutate(m.id!)}
                  />
                ))}
              </div>
            </div>
          )}

          {superBowlMatches.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Super Bowl</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {superBowlMatches.map(m => (
                  <MatchCard 
                    key={m.id} 
                    match={m} 
                    onUpdate={(data) => updateMutation.mutate({ id: m.id!, data })}
                    onDelete={() => deleteMutation.mutate(m.id!)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!isAuthenticated && playinMatches.length > 0 && (
        <div className="space-y-8">
          {playinMatches.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Play-In Round</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {playinMatches.map(m => (
                  <MatchCard 
                    key={m.id} 
                    match={m} 
                    onUpdate={() => {}}
                    onDelete={() => {}}
                  />
                ))}
              </div>
            </div>
          )}

          {wildcardMatches.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Wild Card Round</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {wildcardMatches.map(m => (
                  <MatchCard 
                    key={m.id} 
                    match={m} 
                    onUpdate={() => {}}
                    onDelete={() => {}}
                  />
                ))}
              </div>
            </div>
          )}

          {divisionalMatches.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Divisional Round</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {divisionalMatches.map(m => (
                  <MatchCard 
                    key={m.id} 
                    match={m} 
                    onUpdate={() => {}}
                    onDelete={() => {}}
                  />
                ))}
              </div>
            </div>
          )}

          {conferenceMatches.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Conference Championship</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {conferenceMatches.map(m => (
                  <MatchCard 
                    key={m.id} 
                    match={m} 
                    onUpdate={() => {}}
                    onDelete={() => {}}
                  />
                ))}
              </div>
            </div>
          )}

          {superBowlMatches.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-4">Super Bowl</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {superBowlMatches.map(m => (
                  <MatchCard 
                    key={m.id} 
                    match={m} 
                    onUpdate={() => {}}
                    onDelete={() => {}}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
