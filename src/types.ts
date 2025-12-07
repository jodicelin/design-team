

export interface CharacterStats {
  strength: number;
  patience: number;
  fashion: number;
  iq: number;
  eq: number;
  sense: number;
}

export interface CharacterProfile {
  id: number;
  name: string;
  jpName: string;
  title: string;
  adjective: string;
  personality: string;
  description: string;
  quote: string;
  imageSeed: number;
  imageUrl: string;
  color: string;
  stats: CharacterStats;
}

export interface DrawRecord {
  id: number;
  playerName: string;
  characterName: string;
  characterTitle: string;
  timestamp: string;
}

// 把 enum 換成 type，用直線 | 隔開每一個狀態
export type AppState = 'IDLE' | 'PULLING' | 'SCANNING' | 'LOCKED' | 'REVEALED' | 'COMPLETED';

