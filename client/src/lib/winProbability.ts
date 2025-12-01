import type { Game, Standings } from "@shared/schema";

/**
 * Calculate win probability for a team based on:
 * - Point Differential (standing indicator)
 * - Current score (during live games)
 * - Quarter progress (game momentum)
 */
export function calculateWinProbability(
  game: Game,
  team: "team1" | "team2",
  standings?: Standings[]
) {
  const standings1 = standings?.find(s => s.team === game.team1);
  const standings2 = standings?.find(s => s.team === game.team2);
  
  const team1PD = standings1?.pointDifferential || 0;
  const team2PD = standings2?.pointDifferential || 0;
  
  // Base probability from PD difference
  const pdDifference = team1PD - team2PD;
  let probability = 50 + (pdDifference / 20); // Each 20 points PD = 10% swing
  
  // During live games, factor in current score
  if (game.isLive && game.quarter && game.quarter !== "Scheduled") {
    const scoreDifference = game.team1Score! - game.team2Score!;
    
    // Score impact increases as game progresses
    const quarterMap: { [key: string]: number } = {
      "Q1": 0.25,
      "Q2": 0.4,
      "Q3": 0.6,
      "Q4": 0.8,
    };
    
    const quarterProgress = quarterMap[game.quarter] || 0.5;
    
    // Score difference contribution: each 3 points = 3% swing
    const scoreImpact = (scoreDifference / 3) * quarterProgress;
    probability += scoreImpact;
  }
  
  // Cap between 1% and 99% (allow extreme differentials to show)
  probability = Math.max(1, Math.min(99, Math.round(probability)));
  
  // Return probability for the requested team
  if (team === "team1") {
    return probability;
  } else {
    return 100 - probability;
  }
}
