import type { Settings } from './type';

type SettingCond = (s: Settings) => boolean;

type SpecialCondField = {
  name: string;
  cond?: SettingCond;
  max: Number | ((s: Settings) => Number);
};

export const SPECIAL_CONDS_FIELDS = {
  stones:           { name: "Spiritual Stones", max: 3 },
  medallions:       { name: "Medallions", max: 6 },
  remains:          { name: "Boss Remains", max: 4 },
  skullsGold:       { name: "Gold Skulltula Tokens", max: 100 },
  skullsSwamp:      { name: "Swamp Skulltula Tokens", max: 30 },
  skullsOcean:      { name: "Ocean Skulltula Tokens", max: 30 },
  fairiesWF:        { name: "Stray Fairies (Woodfall)", max: 15 },
  fairiesSH:        { name: "Stray Fairies (Snowhead)", max: 15 },
  fairiesGB:        { name: "Stray Fairies (Great Bay)", max: 15 },
  fairiesST:        { name: "Stray Fairies (Stone Tower)", max: 15 },
  fairyTown:        { name: "Stray Fairy (Clock Town)", max: 1 },
  masksRegular:     { name: "Regular Masks (MM)", max: 20 },
  masksTransform:   { name: "Transformation Masks (MM)", max: 4 },
  masksOot:         { name: "Masks (OoT)", max: (s: Settings) => 8 + Number(s.blastMaskOot) + Number(s.stoneMaskOot) },
  triforce:         { name: "Triforce Pieces", cond: (s: Settings) => s.goal === 'triforce', max: (s: Settings) => s.triforcePieces },
  coinsRed:         { name: "Coins (Red)", cond: (s: Settings) => s.coinsRed > 0, max: (s: Settings) => s.coinsRed },
  coinsGreen:       { name: "Coins (Green)", cond: (s: Settings) => s.coinsGreen > 0, max: (s: Settings) => s.coinsGreen },
  coinsBlue:        { name: "Coins (Blue)", cond: (s: Settings) => s.coinsBlue > 0, max: (s: Settings) => s.coinsBlue },
  coinsYellow:      { name: "Coins (Yellow)", cond: (s: Settings) => s.coinsYellow > 0, max: (s: Settings) => s.coinsYellow },
};

export type SpecialCond = {[k in keyof typeof SPECIAL_CONDS_FIELDS]: boolean} & { count: number };

export const DEFAULT_SPECIAL_COND = Object.keys(SPECIAL_CONDS_FIELDS).reduce((conds, cond) => {
  conds[cond] = false;
  return conds;
}, { count: 0 } as any) as SpecialCond;

type SpecialCondDefiniton = {
  name: string;
  cond?: SettingCond;
};

export const SPECIAL_CONDS: {[k: string]: SpecialCondDefiniton} = {
  BRIDGE: { name: "Rainbow Bridge", cond: s => s.rainbowBridge === 'custom' },
  MOON: { name: "Moon Access" },
  LACS: { name: "Light Arrow Cutscene", cond: s => s.lacs === 'custom' },
  GANON_BK: { name: "Ganon Boss Key", cond: s => s.ganonBossKey === 'custom' },
  MAJORA: { name: "Majora Child Requirements", cond: s => s.majoraChild === 'custom' },
};

export const DEFAULT_SPECIAL_CONDS: SpecialConds = {
  BRIDGE: { ...DEFAULT_SPECIAL_COND },
  MOON: { ...DEFAULT_SPECIAL_COND, remains: true, count: 4 },
  LACS: { ...DEFAULT_SPECIAL_COND },
  GANON_BK: { ...DEFAULT_SPECIAL_COND },
  MAJORA: { ...DEFAULT_SPECIAL_COND },
};

export type SpecialConds = {[k in keyof typeof SPECIAL_CONDS]: SpecialCond };
