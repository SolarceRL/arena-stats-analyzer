import axios, { AxiosInstance } from 'axios';
import { ArenaMatch } from '../types/arena';

const RIOT_API_KEY = 'RGAPI-7ee0c24b-c712-4d60-bf0c-0fe3883f6de3';
const RIOT_API_BASE = 'https://na1.api.riotgames.com';
const AMERICAS_API_BASE = 'https://americas.api.riotgames.com';

class RiotApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      headers: {
        'X-Riot-Token': RIOT_API_KEY,
      },
      timeout: 10000,
    });
  }

  async getSummonerByName(summonerName: string, region: string = 'na1'): Promise<any> {
    try {
      const response = await this.client.get(
        `${RIOT_API_BASE}/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`,
        { params: { region } }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch summoner: ${error}`);
    }
  }

  async getAccountByTag(gameName: string, tagLine: string): Promise<any> {
    try {
      const response = await this.client.get(
        `${AMERICAS_API_BASE}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch account: ${error}`);
    }
  }

  async getArenaMatches(puuid: string, start: number = 0, count: number = 100): Promise<string[]> {
    try {
      const response = await this.client.get(
        `${AMERICAS_API_BASE}/lol/match/v5/matches/by-puuid/${encodeURIComponent(puuid)}/ids`,
        { params: { queue: 1700, start, count } }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch arena matches: ${error}`);
    }
  }

  async getMatchDetails(matchId: string): Promise<ArenaMatch> {
    try {
      const response = await this.client.get(
        `${AMERICAS_API_BASE}/lol/match/v5/matches/${encodeURIComponent(matchId)}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch match details: ${error}`);
    }
  }

  async getAllArenaMatches(puuid: string): Promise<ArenaMatch[]> {
    const matchIds = await this.getArenaMatches(puuid);
    const matches: ArenaMatch[] = [];

    for (const matchId of matchIds) {
      const match = await this.getMatchDetails(matchId);
      matches.push(match);
    }

    return matches;
  }
}

export default new RiotApiClient();
