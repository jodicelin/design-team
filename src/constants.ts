
import type { CharacterProfile } from './types';

const generateStats = (): any => ({
  strength: Math.floor(Math.random() * 5) + 1,
  patience: Math.floor(Math.random() * 5) + 1,
  fashion: Math.floor(Math.random() * 5) + 1,
  iq: Math.floor(Math.random() * 5) + 1,
  eq: Math.floor(Math.random() * 5) + 1,
  sense: Math.floor(Math.random() * 5) + 1,
});

const colors = [
  '#FFC0CB', // Pink
  '#A0C4FF', // Blue
  '#9BF6FF', // Cyan
  '#FDFFB6', // Yellow
  '#FFADAD', // Red/Pink
  '#CAFFBF', // Green
  '#BDB2FF', // Purple
  '#FFD6A5', // Orange
];

const RAW_DATA = [
  { name: 'Pin', adjective: '冷面笑匠', personality: '默默搞笑的暗黑諧星' },
  { name: 'Ina', adjective: '飲料團團長', personality: '每天都在揪喝的飲料霸主' },
  { name: 'Kelly', adjective: '氣質女神', personality: '走到哪裡都是風景線' },
  { name: 'Aura', adjective: '主動積極', personality: '走路都有風的主動小火球' },
  { name: 'Linda', adjective: '脾氣溫和', personality: '一秒融化人的暖心綿花糖' },
  { name: 'Wendy', adjective: '重點王', personality: '一開口就直戳靶心高手' },
  { name: 'Amber', adjective: '天然呆', personality: '呆萌得讓人想全程守護' },
  { name: 'Kuei', adjective: '熊派掌門人', personality: '召喚熊力的可愛宗師' },
  { name: 'Ann', adjective: '認真負責', personality: '認真到連表格都怕他' },
  { name: 'Hua', adjective: '定海神針', personality: '團隊大地震也不會晃之柱' },
  { name: 'Jodice', adjective: '超前部署', personality: '預知能力疑似點到滿級' },
  { name: 'Lily', adjective: '喜好自由', personality: '比風還自由的流浪氣質' },
  { name: 'Haruko', adjective: '造型達人', personality: '造型神力加持的萌系戰士' },
  { name: 'Haku', adjective: '跳舞達人', personality: '一跳就開秀的街舞精靈' },
  { name: 'Hedy', adjective: '老鳥熟手', personality: '一出手就老司機的氣場' },
  { name: 'Penny', adjective: '做事很快', personality: '做事快到以為在快轉' },
];

// Encoded path for '成員' to ensure URL compatibility
const BASE_IMAGE_URL = 'https://pub.hhgalaxy.com.tw/pub/ds-hhg/%E6%88%90%E5%93%A1';

export const CHARACTERS: CharacterProfile[] = RAW_DATA.map((data, i) => ({
  id: i,
  name: data.name,
  jpName: data.name, // Using English name as placeholder for now
  title: data.adjective, // Redundant but keeping for type compatibility
  adjective: data.adjective,
  personality: data.personality,
  description: 'HHG Team Member', // Generic description
  quote: '今天又是漂亮的一天。',
  imageSeed: 100 + i,
  imageUrl: `${BASE_IMAGE_URL}/${data.name.toUpperCase()}.jpg`,
  color: colors[i % colors.length],
  stats: generateStats(),
}));
