import express, { Request, Response } from 'express';
import { getSummonerByName, getAllArenaMatches } from './riotClient.ts';
import { calculateStats } from '../src/utils/statsCalculator.ts';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Enable CORS for frontend requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

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

    if (matches.length === 0) {
      return res.status(400).json({ error: 'No arena matches found for this summoner' });
    }

    // Calculate stats
    const stats = calculateStats(matches, championName);

    if (stats.total_matches === 0) {
      return res.status(400).json({ error: `No matches found with ${championName}` });
    }

    res.json(stats);
  } catch (error) {
    console.error('Error in analyze endpoint:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
