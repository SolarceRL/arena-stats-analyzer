const RIOT_API_KEY = 'RGAPI-7ee0c24b-c712-4d60-bf0c-0fe3883f6de3';
const AMERICAS_API = 'https://americas.api.riotgames.com';
const REGIONAL_API = 'https://na1.api.riotgames.com';

export async function getSummonerByName(summonerName: string) {
  // Parse summoner name - format: "Name-Tag" or just "Name"
  let name = summonerName;
  let tag = 'NA1';

  if (summonerName.includes('-')) {
    const parts = summonerName.split('-');
    name = parts[0];
    tag = parts.slice(1).join('-');
  }

  try {
    const response = await fetch(
      `${AMERICAS_API}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`,
      {
        headers: {
          'X-Riot-Token': RIOT_API_KEY,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Summoner not found: ${summonerName}`);
      }
      throw new Error(`Riot API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching summoner:', error);
    throw error;
  }
}

export async function getArenaMatches(puuid: string, count: number = 100) {
  try {
    const response = await fetch(
      `${AMERICAS_API}/lol/match/v5/matches/by-puuid/${encodeURIComponent(puuid)}/ids?queue=1700&start=0&count=${count}`,
      {
        headers: {
          'X-Riot-Token': RIOT_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Riot API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching arena matches:', error);
    throw error;
  }
}

export async function getMatchDetails(matchId: string) {
  try {
    const response = await fetch(
      `${AMERICAS_API}/lol/match/v5/matches/${encodeURIComponent(matchId)}`,
      {
        headers: {
          'X-Riot-Token': RIOT_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Riot API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching match details:', error);
    throw error;
  }
}

export async function getAllArenaMatches(puuid: string) {
  const matchIds = await getArenaMatches(puuid, 100);
  const matches = [];

  for (const matchId of matchIds) {
    try {
      const match = await getMatchDetails(matchId);
      matches.push(match);
    } catch (error) {
      console.error(`Failed to fetch match ${matchId}:`, error);
    }
  }

  return matches;
}
