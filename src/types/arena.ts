export interface ArenaMatch {
  metadata: {
    match_id: string;
    participants: string[];
    version: string;
    data_version: string;
  };
  info: {
    game_mode: string;
    game_type: string;
    game_version: string;
    participants: ArenaParticipant[];
  };
}

export interface ArenaParticipant {
  summoner_id: string;
  puuid: string;
  champion_id: number;
  champion_name: string;
  placement: number;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  damage_dealt_to_champions: number;
  gold_earned: number;
  cs: number;
  items: number[];
  augments: string[];
  summoner_spells: number[];
}

export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

export interface StatsSummary {
  champion_name: string;
  total_matches: number;
  wins: number;
  win_rate: number;
  avg_placement: number;
  augments: AugmentStats[];
  items: ItemStats[];
  summoner_spells: SummonerSpellStats[];
}

export interface AugmentStats {
  augment_id: string;
  augment_name: string;
  pick_count: number;
  pick_rate: number;
  wins: number;
  win_rate: number;
  avg_placement: number;
}

export interface ItemStats {
  item_id: number;
  item_name: string;
  pick_count: number;
  pick_rate: number;
  wins: number;
  win_rate: number;
  avg_placement: number;
}

export interface SummonerSpellStats {
  spell_id: number;
  spell_name: string;
  pick_count: number;
  pick_rate: number;
  wins: number;
  win_rate: number;
  avg_placement: number;
}
