import express, { Request, Response } from 'express';
import { getSummonerByName, getAllArenaMatches } from './riotClient';
import { calculateStats } from '../src/utils/statsCalculator';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const { summonerName, championName } = req.body;

    if (!summonerName || !championName) {
      return res.status(400).json({ error: 'Missing summonerName or championName' });
    }

    console.log(`Analyzing ${championName} for ${summonerName}...`);

    // Get summoner account
    const account = await getSummonerByName(summonerName);
    console.log(`Found account: ${account.gameName}#${account.tagLine}`);

    // Get all arena matches
    const matches = await getAllArenaMatches(account.puuid);
    console.log(`Found ${matches.length} arena matches`);

    // Calculate stats
    const stats = calculateStats(matches, championName);

    res.json(stats);
  } catch (error) {
    console.error('Error in analyze endpoint:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
