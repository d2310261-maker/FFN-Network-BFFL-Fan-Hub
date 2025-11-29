export const TEAMS = {
  "Atlanta Falcons": "https://a.espncdn.com/media/motion/2015/1105/dm_151105_nfl_falcons_logo.png",
  "Tampa Bay Buccaneers": "https://a.espncdn.com/media/motion/2015/1105/dm_151105_nfl_buccaneers_logo.png",
  "Jacksonville Jaguars": "https://a.espncdn.com/media/motion/2015/1105/dm_151105_nfl_jaguars_logo.png",
  "Los Angeles Rams": "https://a.espncdn.com/media/motion/2015/1105/dm_151105_nfl_rams_logo.png",
  "Baltimore Ravens": "https://a.espncdn.com/media/motion/2015/1105/dm_151105_nfl_ravens_logo.png",
  "Miami Dolphins": "https://a.espncdn.com/media/motion/2015/1105/dm_151105_nfl_dolphins_logo.png",
  "Chicago Bears": "https://a.espncdn.com/media/motion/2015/1105/dm_151105_nfl_bears_logo.png",
  "Houston Texans": "https://a.espncdn.com/media/motion/2015/1105/dm_151105_nfl_texans_logo.png",
  "New Orleans Saints": "https://a.espncdn.com/media/motion/2015/1105/dm_151105_nfl_saints_logo.png",
  "San Francisco 49ers": "https://a.espncdn.com/media/motion/2015/1105/dm_151105_nfl_49ers_logo.png",
  "Kansas City Chiefs": "https://a.espncdn.com/media/motion/2015/1105/dm_151105_nfl_chiefs_logo.png",
  "Detroit Lions": "https://a.espncdn.com/media/motion/2015/1105/dm_151105_nfl_lions_logo.png",
  "Philadelphia Eagles": "https://a.espncdn.com/media/motion/2015/1105/dm_151105_nfl_eagles_logo.png",
  "Arizona Cardinals": "https://a.espncdn.com/media/motion/2015/1105/dm_151105_nfl_cardinals_logo.png",
  "Dallas Cowboys": "https://a.espncdn.com/media/motion/2015/1105/dm_151105_nfl_cowboys_logo.png",
  "Buffalo Bills": "https://a.espncdn.com/media/motion/2015/1105/dm_151105_nfl_bills_logo.png",
};

export function getTeamLogo(teamName: string): string | undefined {
  return TEAMS[teamName as keyof typeof TEAMS];
}
