export const TEAMS = {
  "Atlanta Falcons": "https://static.nfl.com/f_auto,q_auto/league/api/NFL_SHIELD_SECONDARY_on_LTBLUE/12bfa419-09dd-4e26-ada5-49e73b1c2e4e",
  "Tampa Bay Buccaneers": "https://static.nfl.com/f_auto,q_auto/league/api/NFL_SHIELD_SECONDARY_on_LTBLUE/7aeeaa20-8c39-4967-88a3-7e8ac1f5a29b",
  "Jacksonville Jaguars": "https://static.nfl.com/f_auto,q_auto/league/api/NFL_SHIELD_SECONDARY_on_LTBLUE/60dd9e71-220e-49e2-8bae-ddcc76a0a049",
  "Los Angeles Rams": "https://static.nfl.com/f_auto,q_auto/league/api/NFL_SHIELD_SECONDARY_on_LTBLUE/e4eed0c6-1ac9-4caf-8e81-efeb10b5b211",
  "Baltimore Ravens": "https://static.nfl.com/f_auto,q_auto/league/api/NFL_SHIELD_SECONDARY_on_LTBLUE/7f4e9d42-2da7-45e9-9a10-250ecbe16d7b",
  "Miami Dolphins": "https://static.nfl.com/f_auto,q_auto/league/api/NFL_SHIELD_SECONDARY_on_LTBLUE/3b923e20-e383-466e-b4e2-18d4d7257e97",
  "Chicago Bears": "https://static.nfl.com/f_auto,q_auto/league/api/NFL_SHIELD_SECONDARY_on_LTBLUE/55e76c6c-980e-45d7-bfb8-a07302f1f547",
  "Houston Texans": "https://static.nfl.com/f_auto,q_auto/league/api/NFL_SHIELD_SECONDARY_on_LTBLUE/0f4cedf7-fb84-48fa-82ba-d5294b7389d4",
  "New Orleans Saints": "https://static.nfl.com/f_auto,q_auto/league/api/NFL_SHIELD_SECONDARY_on_LTBLUE/8fb17218-2289-46d6-84a8-a7b6d5e0c6d1",
  "San Francisco 49ers": "https://static.nfl.com/f_auto,q_auto/league/api/NFL_SHIELD_SECONDARY_on_LTBLUE/884540e8-8735-406f-9eea-4709f4e879b9",
  "Kansas City Chiefs": "https://static.nfl.com/f_auto,q_auto/league/api/NFL_SHIELD_SECONDARY_on_LTBLUE/e21e0e4f-541f-4d5c-b330-feefba826e77",
  "Detroit Lions": "https://static.nfl.com/f_auto,q_auto/league/api/NFL_SHIELD_SECONDARY_on_LTBLUE/177bd227-4543-4696-b437-78b82bbf0892",
  "Philadelphia Eagles": "https://static.nfl.com/f_auto,q_auto/league/api/NFL_SHIELD_SECONDARY_on_LTBLUE/b6bac75e-50db-43ba-8fce-59999d307da6",
  "Arizona Cardinals": "https://static.nfl.com/f_auto,q_auto/league/api/NFL_SHIELD_SECONDARY_on_LTBLUE/5d1d5b1d-5e45-47e5-8a2a-2d2b3d7e9e1f",
  "Dallas Cowboys": "https://static.nfl.com/f_auto,q_auto/league/api/NFL_SHIELD_SECONDARY_on_LTBLUE/0eb62d7b-86c2-4ded-ad73-87a021b19fcc",
  "Buffalo Bills": "https://static.nfl.com/f_auto,q_auto/league/api/NFL_SHIELD_SECONDARY_on_LTBLUE/8324f43e-66f0-4715-8e9c-a13b2aefb819",
};

export function getTeamLogo(teamName: string): string | undefined {
  return TEAMS[teamName as keyof typeof TEAMS];
}
