import { ArenaMatch, ArenaParticipant, StatsSummary, AugmentStats, ItemStats, SummonerSpellStats } from '../types/arena';

const AUGMENT_NAMES: { [key: string]: string } = {
  'ARENA_AUGMENT_1': 'Augment 1',
  'ARENA_AUGMENT_2': 'Augment 2',
  // Add more mappings as needed
};

const ITEM_NAMES: { [key: number]: string } = {
  1001: 'Boots',
  1004: 'Sheen',
  1026: 'Catalyst of Aeons',
  1029: 'Kindlegem',
  // Add more item mappings as needed
};

const SPELL_NAMES: { [key: number]: string } = {
  1: 'Flash',
  3: 'Exhaust',
  4: 'Flash',
  6: 'Ghost',
  7: 'Heal',
  11: 'Smite',
  12: 'Teleport',
  13: 'Clarity',
  14: 'Ignite',
  21: 'Barrier',
  30: 'To The King!',
  31: 'Pix',
};

export function calculateStats(matches: ArenaMatch[], championName: string): StatsSummary {
  const filteredMatches: ArenaParticipant[] = [];
  const augmentMap = new Map<string, { count: number; wins: number; placements: number[] }>();
  const itemMap = new Map<number, { count: number; wins: number; placements: number[] }>();
  const spellMap = new Map<number, { count: number; wins: number; placements: number[] }>();

  let totalWins = 0;
  const placements: number[] = [];

  // Filter matches and collect participant data
  for (const match of matches) {
    for (const participant of match.info.participants) {
      if (participant.champion_name.toLowerCase() === championName.toLowerCase()) {
        filteredMatches.push(participant);

        // Track wins and placements
        if (participant.win) totalWins++;
        placements.push(participant.placement);

        // Process augments
        for (const augment of participant.augments) {
          if (!augmentMap.has(augment)) {
            augmentMap.set(augment, { count: 0, wins: 0, placements: [] });
          }
          const stats = augmentMap.get(augment)!;
          stats.count++;
          if (participant.win) stats.wins++;
          stats.placements.push(participant.placement);
        }

        // Process items
        for (const itemId of participant.items) {
          if (!itemMap.has(itemId)) {
            itemMap.set(itemId, { count: 0, wins: 0, placements: [] });
          }
          const stats = itemMap.get(itemId)!;
          stats.count++;
          if (participant.win) stats.wins++;
          stats.placements.push(participant.placement);
        }

        // Process summoner spells
        for (const spellId of participant.summoner_spells) {
          if (!spellMap.has(spellId)) {
            spellMap.set(spellId, { count: 0, wins: 0, placements: [] });
          }
          const stats = spellMap.get(spellId)!;
          stats.count++;
          if (participant.win) stats.wins++;
          stats.placements.push(participant.placement);
        }
      }
    }
  }

  const totalMatches = filteredMatches.length;
  const avgPlacement = placements.length > 0 ? placements.reduce((a, b) => a + b, 0) / placements.length : 0;

  // Convert maps to arrays and calculate percentages
  const augments: AugmentStats[] = Array.from(augmentMap.entries())
    .map(([augmentId, stats]) => ({
      augment_id: augmentId,
      augment_name: AUGMENT_NAMES[augmentId] || augmentId,
      pick_count: stats.count,
      pick_rate: totalMatches > 0 ? (stats.count / totalMatches) * 100 : 0,
      wins: stats.wins,
      win_rate: stats.count > 0 ? (stats.wins / stats.count) * 100 : 0,
      avg_placement: stats.placements.length > 0 ? stats.placements.reduce((a, b) => a + b, 0) / stats.placements.length : 0,
    }))
    .sort((a, b) => b.pick_rate - a.pick_rate);

  const items: ItemStats[] = Array.from(itemMap.entries())
    .map(([itemId, stats]) => ({
      item_id: itemId,
      item_name: ITEM_NAMES[itemId] || `Item ${itemId}`,
      pick_count: stats.count,
      pick_rate: totalMatches > 0 ? (stats.count / totalMatches) * 100 : 0,
      wins: stats.wins,
      win_rate: stats.count > 0 ? (stats.wins / stats.count) * 100 : 0,
      avg_placement: stats.placements.length > 0 ? stats.placements.reduce((a, b) => a + b, 0) / stats.placements.length : 0,
    }))
    .sort((a, b) => b.pick_rate - a.pick_rate);

  const summoner_spells: SummonerSpellStats[] = Array.from(spellMap.entries())
    .map(([spellId, stats]) => ({
      spell_id: spellId,
      spell_name: SPELL_NAMES[spellId] || `Spell ${spellId}`,
      pick_count: stats.count,
      pick_rate: totalMatches > 0 ? (stats.count / totalMatches) * 100 : 0,
      wins: stats.wins,
      win_rate: stats.count > 0 ? (stats.wins / stats.count) * 100 : 0,
      avg_placement: stats.placements.length > 0 ? stats.placements.reduce((a, b) => a + b, 0) / stats.placements.length : 0,
    }))
    .sort((a, b) => b.pick_rate - a.pick_rate);

  return {
    champion_name: championName,
    total_matches: totalMatches,
    wins: totalWins,
    win_rate: totalMatches > 0 ? (totalWins / totalMatches) * 100 : 0,
    avg_placement: avgPlacement,
    augments,
    items,
    summoner_spells,
  };
}
