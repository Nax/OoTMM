import { HINTS, ENTRANCES, REGIONS, SCENES, NPC } from '@ootmm/data';

import { LogicResult } from '../logic';
import { isEntranceShuffle } from '../logic/helpers';
import { GI, DATA_HINTS_POOL } from '../data';
import { Game } from '../config';
import { BOSS_INDEX_BY_DUNGEON, World, WorldCheck } from '../logic/world';
import { SETTINGS, Settings, SPECIAL_CONDS, SPECIAL_CONDS_FIELDS } from '../settings';
import { HintGossip, WorldHints } from '../logic/hints';
import { countMapAdd, gameId, padBuffer16, toI8Buffer, toU16Buffer, toU32Buffer, toU8Buffer } from '../util';
import { Patchfile } from './patchfile';
import { locationsZelda, makeLocation, makePlayerLocations, getPreActivatedOwlsLocations } from '../logic/locations';
import { CONFVARS_VALUES, Confvar } from '../confvars';
import { Region, regionData } from '../logic/regions';
import { Item, ItemGroups, ItemHelpers, Items, ItemsCount } from '../items';
import { SharedItemGroups } from '../logic/shared';
import { bufReadU32BE, bufWriteI8, bufWriteU16BE, bufWriteU32BE, bufWriteU8 } from '../util/buffer';
import { concatUint8Arrays } from 'uint8array-extras';
import { mustStartWithMasterSword } from '../settings/util';
import { DUNGEON_ENTRANCES } from '../logic/entrance';
import path from 'path';
import { END_BOSS_METADATA } from '../logic/boss';
import { PATH_EVENT_DATA } from '../logic/analysis-path';
import { DUNGEONS, DUNGEONS_BY_KEY } from '../logic/dungeons';

const DUNGEON_REWARD_LOCATIONS = [
  'OOT Deku Tree Boss',
  'OOT Dodongo Cavern Boss',
  'OOT Jabu-Jabu Boss',
  'OOT Forest Temple Boss',
  'OOT Fire Temple Boss',
  'OOT Water Temple Boss',
  'OOT Shadow Temple Boss',
  'OOT Spirit Temple Boss',
  'MM Woodfall Temple Boss',
  'MM Snowhead Temple Boss',
  'MM Great Bay Temple Boss',
  'MM Stone Tower Temple Inverted Boss',
];

const SHARED_ITEMS_OOT = new Map([
  ['SHARED_SWORD',            'OOT_SWORD_KOKIRI'],
  ['SHARED_BOW',              'OOT_BOW'],
  ['SHARED_BOMB_BAG',         'OOT_BOMB_BAG'],
  ['SHARED_ARROWS_5',         'OOT_ARROWS_5'],
  ['SHARED_ARROWS_10',        'OOT_ARROWS_10'],
  ['SHARED_ARROWS_30',        'OOT_ARROWS_30'],
  ['SHARED_ARROWS_40',        'MM_ARROWS_40'], /* OoT lacks 40 pack */
  ['SHARED_BOMB',             'OOT_BOMB'],
  ['SHARED_BOMBS_5',          'OOT_BOMBS_5'],
  ['SHARED_BOMBS_10',         'OOT_BOMBS_10'],
  ['SHARED_BOMBS_20',         'OOT_BOMBS_20'],
  ['SHARED_BOMBS_30',         'OOT_BOMBS_30'],
  ['SHARED_MAGIC_UPGRADE',    'OOT_MAGIC_UPGRADE'],
  ['SHARED_ARROW_FIRE',       'OOT_ARROW_FIRE'],
  ['SHARED_ARROW_ICE',        'OOT_ARROW_ICE'],
  ['SHARED_ARROW_LIGHT',      'OOT_ARROW_LIGHT'],
  ['SHARED_SONG_TIME',        'OOT_SONG_TIME'],
  ['SHARED_SONG_EPONA',       'OOT_SONG_EPONA'],
  ['SHARED_SONG_STORMS',      'OOT_SONG_STORMS'],
  ['SHARED_SONG_SUN',         'OOT_SONG_SUN'],
  ['SHARED_NUT',              'MM_NUT'] /* OoT lacks single nut */,
  ['SHARED_NUTS_5',           'OOT_NUTS_5'],
  ['SHARED_NUTS_10',          'OOT_NUTS_10'],
  ['SHARED_STICK',            'OOT_STICK'],
  ['SHARED_STICKS_5',         'OOT_STICKS_5'],
  ['SHARED_STICKS_10',        'OOT_STICKS_10'],
  ['SHARED_HOOKSHOT',         'OOT_HOOKSHOT'],
  ['SHARED_LENS',             'OOT_LENS'],
  ['SHARED_OCARINA',          'OOT_OCARINA'],
  ['SHARED_MASK_KEATON',      'OOT_MASK_KEATON'],
  ['SHARED_MASK_BUNNY',       'OOT_MASK_BUNNY'],
  ['SHARED_MASK_TRUTH',       'OOT_MASK_TRUTH'],
  ['SHARED_MASK_GORON',       'OOT_MASK_GORON'],
  ['SHARED_MASK_ZORA',        'OOT_MASK_ZORA'],
  ['SHARED_WALLET',           'OOT_WALLET'],
  ['SHARED_RUPEE_GREEN',      'OOT_RUPEE_GREEN'],
  ['SHARED_RUPEE_BLUE',       'OOT_RUPEE_BLUE'],
  ['SHARED_RUPEE_RED',        'OOT_RUPEE_RED'],
  ['SHARED_RUPEE_PURPLE',     'OOT_RUPEE_PURPLE'],
  ['SHARED_RUPEE_SILVER',     'MM_RUPEE_SILVER'], /* OoT lacks silver rupee */
  ['SHARED_RUPEE_GOLD',       'OOT_RUPEE_HUGE'], /* Equivalent */
  ['SHARED_RUPEE_RAINBOW',    'OOT_RUPEE_RAINBOW'],
  ['SHARED_HEART_PIECE',      'OOT_HEART_PIECE'],
  ['SHARED_HEART_CONTAINER',  'OOT_HEART_CONTAINER'],
  ['SHARED_RECOVERY_HEART',   'OOT_RECOVERY_HEART'],
  ['SHARED_DEFENSE_UPGRADE',  'OOT_DEFENSE_UPGRADE'],
  ['SHARED_SHIELD_HYLIAN',    'OOT_SHIELD_HYLIAN'],
  ['SHARED_SHIELD_MIRROR',    'OOT_SHIELD_MIRROR'],
  ['SHARED_SHIELD',           'OOT_SHIELD'],
  ['SHARED_MAGIC_JAR_SMALL',  'OOT_MAGIC_JAR_SMALL'],
  ['SHARED_MAGIC_JAR_LARGE',  'OOT_MAGIC_JAR_LARGE'],
  ['SHARED_BOMBCHU',          'MM_BOMBCHU'], /* OoT lacks single bombchu */
  ['SHARED_BOMBCHU_5',        'OOT_BOMBCHU_5'],
  ['SHARED_BOMBCHU_10',       'OOT_BOMBCHU_10'],
  ['SHARED_BOMBCHU_20',       'OOT_BOMBCHU_20'],
  ['SHARED_FAIRY_BIG',        'OOT_FAIRY_BIG'],
  ['SHARED_SPELL_FIRE',       'OOT_SPELL_FIRE'],
  ['SHARED_SPELL_WIND',       'OOT_SPELL_WIND'],
  ['SHARED_SPELL_LOVE',       'OOT_SPELL_LOVE'],
  ['SHARED_BOOTS_IRON',       'OOT_BOOTS_IRON'],
  ['SHARED_BOOTS_HOVER',      'OOT_BOOTS_HOVER'],
  ['SHARED_TUNIC_GORON',      'OOT_TUNIC_GORON'],
  ['SHARED_TUNIC_ZORA',       'OOT_TUNIC_ZORA'],
  ['SHARED_MASK_BLAST',       'OOT_MASK_BLAST'],
  ['SHARED_MASK_STONE',       'OOT_MASK_STONE'],
  ['SHARED_SCALE',            'OOT_SCALE'],
  ['SHARED_STRENGTH',         'OOT_STRENGTH'],
  ['SHARED_TRAP_RUPOOR',      'OOT_TRAP_RUPOOR'],
  ['SHARED_SONG_EMPTINESS',   'OOT_SONG_EMPTINESS'],
  ['SHARED_HAMMER',           'OOT_HAMMER'],
  ['SHARED_STICK_UPGRADE',    'OOT_STICK_UPGRADE'],
  ['SHARED_NUT_UPGRADE',      'OOT_NUT_UPGRADE'],
  ['SHARED_STONE_OF_AGONY',   'OOT_STONE_OF_AGONY'],
  ['SHARED_SPIN_UPGRADE',     'OOT_SPIN_UPGRADE'],
  ['SHARED_BOMBCHU_BAG',      'OOT_BOMBCHU_BAG'],
]);

const SHARED_ITEMS_MM = new Map([
  ['SHARED_SWORD',            'MM_SWORD_KOKIRI'],
  ['SHARED_BOW',              'MM_BOW'],
  ['SHARED_BOMB_BAG',         'MM_BOMB_BAG'],
  ['SHARED_ARROWS_5',         'OOT_ARROWS_5'], /* MM lacks 5 pack */
  ['SHARED_ARROWS_10',        'MM_ARROWS_10'],
  ['SHARED_ARROWS_30',        'MM_ARROWS_30'],
  ['SHARED_ARROWS_40',        'MM_ARROWS_40'],
  ['SHARED_BOMB',             'MM_BOMB'],
  ['SHARED_BOMBS_5',          'MM_BOMBS_5'],
  ['SHARED_BOMBS_10',         'MM_BOMBS_10'],
  ['SHARED_BOMBS_20',         'MM_BOMBS_20'],
  ['SHARED_BOMBS_30',         'MM_BOMBS_30'],
  ['SHARED_MAGIC_UPGRADE',    'MM_MAGIC_UPGRADE'],
  ['SHARED_ARROW_FIRE',       'MM_ARROW_FIRE'],
  ['SHARED_ARROW_ICE',        'MM_ARROW_ICE'],
  ['SHARED_ARROW_LIGHT',      'MM_ARROW_LIGHT'],
  ['SHARED_SONG_TIME',        'MM_SONG_TIME'],
  ['SHARED_SONG_EPONA',       'MM_SONG_EPONA'],
  ['SHARED_SONG_STORMS',      'MM_SONG_STORMS'],
  ['SHARED_SONG_SUN',         'MM_SONG_SUN'],
  ['SHARED_NUT',              'MM_NUT'],
  ['SHARED_NUTS_5',           'MM_NUTS_5'],
  ['SHARED_NUTS_10',          'MM_NUTS_10'],
  ['SHARED_STICK',            'MM_STICK'],
  ['SHARED_STICKS_5',         'OOT_STICKS_5'],  /* MM lacks 5 pack */
  ['SHARED_STICKS_10',        'OOT_STICKS_10'], /* MM lacks 10 pack */
  ['SHARED_HOOKSHOT',         'MM_HOOKSHOT'],
  ['SHARED_LENS',             'MM_LENS'],
  ['SHARED_OCARINA',          'OOT_OCARINA'], /* Progressive */
  ['SHARED_MASK_KEATON',      'MM_MASK_KEATON'],
  ['SHARED_MASK_BUNNY',       'MM_MASK_BUNNY'],
  ['SHARED_MASK_TRUTH',       'MM_MASK_TRUTH'],
  ['SHARED_MASK_GORON',       'MM_MASK_GORON'],
  ['SHARED_MASK_ZORA',        'MM_MASK_ZORA'],
  ['SHARED_WALLET',           'MM_WALLET'],
  ['SHARED_RUPEE_GREEN',      'MM_RUPEE_GREEN'],
  ['SHARED_RUPEE_BLUE',       'MM_RUPEE_BLUE'],
  ['SHARED_RUPEE_RED',        'MM_RUPEE_RED'],
  ['SHARED_RUPEE_PURPLE',     'MM_RUPEE_PURPLE'],
  ['SHARED_RUPEE_SILVER',     'MM_RUPEE_SILVER'],
  ['SHARED_RUPEE_GOLD',       'MM_RUPEE_GOLD'],
  ['SHARED_RUPEE_RAINBOW',    'OOT_RUPEE_RAINBOW'], /* No MM equivalent */
  ['SHARED_HEART_PIECE',      'MM_HEART_PIECE'],
  ['SHARED_HEART_CONTAINER',  'MM_HEART_CONTAINER'],
  ['SHARED_RECOVERY_HEART',   'MM_RECOVERY_HEART'],
  ['SHARED_DEFENSE_UPGRADE',  'MM_DEFENSE_UPGRADE'],
  ['SHARED_SHIELD_HYLIAN',    'MM_SHIELD_HERO'],
  ['SHARED_SHIELD_MIRROR',    'MM_SHIELD_MIRROR'],
  ['SHARED_SHIELD',           'OOT_SHIELD'], /* Progressive */
  ['SHARED_MAGIC_JAR_SMALL',  'MM_MAGIC_JAR_SMALL'],
  ['SHARED_MAGIC_JAR_LARGE',  'MM_MAGIC_JAR_LARGE'],
  ['SHARED_BOMBCHU',          'MM_BOMBCHU'],
  ['SHARED_BOMBCHU_5',        'MM_BOMBCHU_5'],
  ['SHARED_BOMBCHU_10',       'MM_BOMBCHU_10'],
  ['SHARED_BOMBCHU_20',       'MM_BOMBCHU_20'],
  ['SHARED_FAIRY_BIG',        'MM_FAIRY_BIG'],
  ['SHARED_SPELL_FIRE',       'MM_SPELL_FIRE'],
  ['SHARED_SPELL_WIND',       'MM_SPELL_WIND'],
  ['SHARED_SPELL_LOVE',       'MM_SPELL_LOVE'],
  ['SHARED_BOOTS_IRON',       'MM_BOOTS_IRON'],
  ['SHARED_BOOTS_HOVER',      'MM_BOOTS_HOVER'],
  ['SHARED_TUNIC_GORON',      'MM_TUNIC_GORON'],
  ['SHARED_TUNIC_ZORA',       'MM_TUNIC_ZORA'],
  ['SHARED_MASK_BLAST',       'MM_MASK_BLAST'],
  ['SHARED_MASK_STONE',       'MM_MASK_STONE'],
  ['SHARED_SCALE',            'MM_SCALE'],
  ['SHARED_STRENGTH',         'MM_STRENGTH'],
  ['SHARED_TRAP_RUPOOR',      'MM_TRAP_RUPOOR'],
  ['SHARED_SONG_EMPTINESS',   'MM_SONG_EMPTINESS'],
  ['SHARED_HAMMER',           'MM_HAMMER'],
  ['SHARED_STICK_UPGRADE',    'MM_STICK_UPGRADE'],
  ['SHARED_NUT_UPGRADE',      'MM_NUT_UPGRADE'],
  ['SHARED_STONE_OF_AGONY',   'MM_STONE_OF_AGONY'],
  ['SHARED_SPIN_UPGRADE',     'MM_SPIN_UPGRADE'],
  ['SHARED_BOMBCHU_BAG',      'MM_BOMBCHU_BAG'],
]);

const SHARED_ITEMS = {
  oot: SHARED_ITEMS_OOT,
  mm: SHARED_ITEMS_MM,
};

const SUBSTITUTIONS: {[k: string]: string} = {
  OOT_SWORD: "OOT_SWORD_KOKIRI",
  OOT_SWORD_GORON: "OOT_SWORD_KNIFE",
  OOT_OCARINA: "OOT_OCARINA_FAIRY",
  OOT_STRENGTH: "OOT_GORON_BRACELET",
  OOT_SCALE: "OOT_SCALE_SILVER",
  OOT_SHIELD: "OOT_PROGRESSIVE_SHIELD_DEKU",
  OOT_ICE_TRAP: "OOT_RUPEE_BLUE",
  MM_SWORD: "MM_SWORD_KOKIRI",
  MM_SHIELD: "MM_PROGRESSIVE_SHIELD_HERO",
  MM_OCARINA: "MM_OCARINA_OF_TIME",
  MM_SCALE: "MM_SCALE_SILVER",
  MM_STRENGTH: "MM_GORON_BRACELET",
  MM_CLOCK: "MM_CLOCK1",
  SHARED_TRIFORCE: "OOT_TRIFORCE",
  SHARED_TRIFORCE_POWER: "OOT_TRIFORCE_POWER",
  SHARED_TRIFORCE_COURAGE: "OOT_TRIFORCE_COURAGE",
  SHARED_TRIFORCE_WISDOM: "OOT_TRIFORCE_WISDOM",
};

const gi = (settings: Settings, game: Game, item: Item, generic: boolean) => {
  let itemId = item.id;
  if (generic) {
    if (ItemHelpers.isSmallKeyHideout(item) && settings.smallKeyShuffleHideout !== 'anywhere') {
      itemId = gameId(game, 'SMALL_KEY', '_');
    } else if (ItemHelpers.isKeyRingHideout(item) && settings.smallKeyShuffleHideout !== 'anywhere') {
      itemId = gameId(game, 'KEY_RING', '_');
    } else if (ItemHelpers.isSmallKeyTCG(item) && settings.smallKeyShuffleChestGame !== 'anywhere') {
      itemId = gameId(game, 'SMALL_KEY', '_');
    } else if (ItemHelpers.isKeyRingTCG(item) && settings.smallKeyShuffleChestGame !== 'anywhere') {
      itemId = gameId(game, 'KEY_RING', '_');
    } else if (ItemHelpers.isSmallKeyRegularOot(item) && settings.smallKeyShuffleOot === 'ownDungeon' && settings.erBoss === 'none') {
      itemId = gameId(game, 'SMALL_KEY', '_');
    } else if (ItemHelpers.isKeyRingRegularOot(item) && settings.smallKeyShuffleOot === 'ownDungeon' && settings.erBoss === 'none') {
      itemId = gameId(game, 'KEY_RING', '_');
    } else if (ItemHelpers.isSmallKeyRegularMm(item) && settings.smallKeyShuffleMm === 'ownDungeon' && settings.erBoss === 'none') {
      itemId = gameId(game, 'SMALL_KEY', '_');
    } else if (ItemHelpers.isKeyRingRegularMm(item) && settings.smallKeyShuffleMm === 'ownDungeon' && settings.erBoss === 'none') {
      itemId = gameId(game, 'KEY_RING', '_');
    } else if (ItemHelpers.isGanonBossKey(item) && settings.ganonBossKey !== 'anywhere') {
      itemId = gameId(game, 'BOSS_KEY', '_');
    } else if (ItemHelpers.isRegularBossKeyOot(item) && settings.bossKeyShuffleOot === 'ownDungeon' && settings.erBoss === 'none') {
      itemId = gameId(game, 'BOSS_KEY', '_');
    } else if (ItemHelpers.isRegularBossKeyMm(item) && settings.bossKeyShuffleMm === 'ownDungeon' && settings.erBoss === 'none') {
      itemId = gameId(game, 'BOSS_KEY', '_');
    } else if (ItemHelpers.isTownStrayFairy(item) && settings.townFairyShuffle === 'vanilla') {
      itemId = gameId(game, 'STRAY_FAIRY', '_');
    } else if (ItemHelpers.isDungeonStrayFairy(item) && settings.strayFairyChestShuffle !== 'anywhere' && settings.strayFairyOtherShuffle !== 'anywhere' && settings.erBoss === 'none') {
      itemId = gameId(game, 'STRAY_FAIRY', '_');
    } else if (ItemHelpers.isMap(item) && settings.mapCompassShuffle === 'ownDungeon' && settings.erBoss === 'none') {
      itemId = gameId(game, 'MAP', '_');
    } else if (ItemHelpers.isCompass(item) && settings.mapCompassShuffle === 'ownDungeon' && settings.erBoss === 'none') {
      itemId = gameId(game, 'COMPASS', '_');
    }
  }

  /* Resolve shared item */
  if (itemId === 'SHARED_OCARINA' && settings.fairyOcarinaMm && game === 'mm') {
    itemId = 'MM_OCARINA';
  } else {
    const sharedItems = SHARED_ITEMS[game];
    const sharedItem = sharedItems.get(itemId);
    if (sharedItem) {
      itemId = sharedItem;
    }
  }

  /* Resolve shared items - new system */
  for (const group of Object.values(SharedItemGroups)) {
    for (const def of group) {
      if (def.shared.id === itemId) {
        itemId = def[game].id;
        break;
      }
    }
  }

  /* Resolve substitutions */
  if (itemId === 'MM_OCARINA' && settings.fairyOcarinaMm) {
    itemId = 'MM_OCARINA_FAIRY';
  } else if (itemId === 'MM_HOOKSHOT' && settings.shortHookshotMm) {
    itemId = 'MM_HOOKSHOT_SHORT';
  } else {
    const subst = SUBSTITUTIONS[itemId];
    if (subst) {
      itemId = subst;
    }
  }

  if (!GI.hasOwnProperty(itemId)) {
    throw new Error(`Unknown item ${itemId}`);
  }
  let value = GI[itemId].index;

  return value;
};

function entrance(srcName: string, world: World) {
  const dstName = world.entranceOverrides.get(srcName) || srcName;
  const srcGame: Game = (/^OOT_/.test(srcName) ? 'oot' : 'mm');
  const dstGame: Game = (/^OOT_/.test(dstName) ? 'oot' : 'mm');
  const entr = ENTRANCES[dstName as keyof typeof ENTRANCES];
  if (entr === undefined) {
    throw new Error(`Unknown entrance ${dstName}`);
  }
  let data = entr.id;
  if (srcGame !== dstGame) {
    data = (data | 0x80000000) >>> 0;
  }
  return data;
}

function entranceAbs(world: World, name: string) {
  const dstName = world.entranceOverrides.get(name) || name;
  const dstGame: Game = (/^OOT_/.test(dstName) ? 'oot' : 'mm');
  const entr = ENTRANCES[dstName as keyof typeof ENTRANCES];
  if (entr === undefined) {
    throw new Error(`Unknown entrance ${dstName}`);
  }
  let data = entr.id;
  if (dstGame === 'mm') {
    data = (data | 0x80000000) >>> 0;
  }
  return data;
}

const entrance2 = (srcGame: Game, dstGame: Game, name: string) => {
  const entr = ENTRANCES[name as keyof typeof ENTRANCES];
  if (entr === undefined) {
    throw new Error(`Unknown entrance ${name}`);
  }
  let data = entr.id;
  if (srcGame !== dstGame) {
    data = (data | 0x80000000) >>> 0;
  }
  return data;
}

const checkId = (check: WorldCheck) => {
  if (check.type === 'npc') {
    if (!NPC.hasOwnProperty(check.id)) {
      throw new Error(`Unknown NPC ${check.id}`);
    }
    return (NPC as any)[check.id];
  }
  return check.id;
}

function zoraSapphireGI(worldId: number, logic: LogicResult): number | null {
  /* Find the dungeon holding the Zora Sapphire */
  const world = logic.worlds[worldId];
  const dungeonId = world.bossIds.indexOf(0x02);
  if (dungeonId === -1)
    return null;

  /* Find the location */
  const locId = DUNGEON_REWARD_LOCATIONS[dungeonId];
  if (!locId)
    return null;
  const loc = makeLocation(locId, worldId);
  const item = logic.items.get(loc);
  if (!item)
    return null;
  return gi(logic.settings, 'oot', item.item, false);
}

function zoraSapphireBuffer(world: number, logic: LogicResult): Uint8Array {
  let value = zoraSapphireGI(world, logic);
  if (value === null)
    value = gi(logic.settings, 'oot', Items.OOT_STONE_SAPPHIRE, false);
  return toU16Buffer([value]);
}

function checkKey(check: WorldCheck): number {
  /* Extract the ID */
  const id = checkId(check);

  /* Extract the type */
  let typeId: number;
  switch (check.type) {
  case 'chest':
    typeId = 0x01;
    break;
  case 'collectible':
    typeId = 0x02;
    break;
  case 'npc':
    typeId = 0x03;
    break;
  case 'gs':
    typeId = 0x04;
    break;
  case 'sf':
    typeId = 0x05;
    break;
  case 'cow':
    typeId = 0x06;
    break;
  case 'shop':
    typeId = 0x07;
    break;
  case 'scrub':
    typeId = 0x08;
    break;
  case 'sr':
    typeId = 0x09;
    break;
  case 'fish':
    typeId = 0x0A;
    break;
  case 'pot':
  case 'crate':
  case 'barrel':
  case 'grass':
  case 'fairy':
  case 'snowball':
  case 'hive':
  case 'rupee':
  case 'heart':
  case 'fairy_spot':
  case 'wonder':
  case 'butterfly':
    /* xflag */
    typeId = 0x10 + ((id >> 16) & 0xf);
    break;
  }

  /* Extract the scene ID */
  let sceneId = 0;
  switch (check.type) {
  case 'chest':
  case 'collectible':
  case 'sf':
  case 'pot':
  case 'crate':
  case 'barrel':
  case 'grass':
  case 'fairy':
  case 'snowball':
  case 'hive':
  case 'rupee':
  case 'heart':
  case 'fairy_spot':
  case 'wonder':
  case 'butterfly':
    sceneId = (SCENES as any)[check.scene];
    if (sceneId === undefined) {
      throw new Error(`Unknown scene ${check.scene}`);
    }
    break;
  default:
    break;
  }

  /* Build the key */
  let key = 0;
  key = (key | ((typeId & 0xff) << 24)) >>> 0;
  key = (key | ((sceneId & 0xff) << 16)) >>> 0;
  key = (key | (id & 0xffff)) >>> 0;

  return key;
}

const gameChecks = (worldId: number, settings: Settings, game: Game, logic: LogicResult): Uint8Array => {
  const buffers: Uint8Array[] = [];
  const world = logic.worlds[worldId];
  for (const locId in world.checks) {
    const loc = makeLocation(locId, worldId);
    const c = world.checks[locId];
    const item = logic.items.get(loc)!;

    if (c.game !== game) {
      continue;
    }

    /* Skip cows if not shuffled */
    if (c.game === 'oot' && c.type === 'cow' && !settings.cowShuffleOot) continue;
    if (c.game === 'mm' && c.type === 'cow' && !settings.cowShuffleMm) continue;

    const key = checkKey(c);
    const itemGi = gi(settings, game, item.item, true);
    const b = new Uint8Array(8);
    bufWriteU32BE(b, 0, key);
    bufWriteU16BE(b, 4, item.player + 1);
    bufWriteU16BE(b, 6, itemGi);
    buffers.push(b);
  }
  /* Sort by key ascending */
  buffers.sort((a, b) => bufReadU32BE(a, 0) < bufReadU32BE(b, 0) ? -1 : 1);
  return padBuffer16(concatUint8Arrays(buffers));
};

const HINT_OFFSETS = {
  KEY: 0,
  TYPE: 1,
  REGION: 2,
  WORLD: 3,
  ITEM: 4,
  ITEM2: 6,
  ITEM3: 8,
  PLAYER: 10,
  PLAYER2: 11,
  PLAYER3: 12,
  IMPORTANCE: 13,
  IMPORTANCE2: 14,
  IMPORTANCE3: 15,
};

const hintBuffer = (settings: Settings, game: Game, gossip: string, hint: HintGossip): Uint8Array => {
  const data = new Uint8Array(0x10);
  data.fill(0xff);
  let gossipData = DATA_HINTS_POOL[game][gossip];
  if (!gossipData) {
    throw new Error(`Unknown gossip ${gossip} for game ${game}`);
  }
  let id = null;
  switch (gossipData.type) {
  case 'gossip':
    id = gossipData.id;
    break;
  case 'gossip-grotto':
    id = gossipData.id | 0x20;
    break;
  case 'gossip-moon':
    id = gossipData.id | 0x40;
    break;
  }
  switch (hint.type) {
  case 'path':
    {
      const { path } = hint;
      const player = path.player === 'all' ? 0xff : path.player + 1;
      let pathId: number;
      let pathSubId: number;
      const regionD = regionData(hint.region);
      const region = (REGIONS as any)[regionD.id];
      if (region === undefined) {
        throw new Error(`Unknown region ${hint.region}`);
      }
      switch (path.type) {
      case 'woth':
        pathId = 0;
        pathSubId = 0;
        break;
      case 'triforce':
        pathId = 1;
        pathSubId = { 'Power': 0, 'Courage': 1, 'Wisdom': 2 }[path.triforce];
        break;
      case 'dungeon':
        pathId = 2;
        pathSubId = DUNGEONS_BY_KEY.get(path.dungeon)!.id;
        break;
      case 'boss':
        pathId = 3;
        pathSubId = BOSS_INDEX_BY_DUNGEON[path.boss];
        break;
      case 'end-boss':
        pathId = 4;
        pathSubId = END_BOSS_METADATA.findIndex((e) => e.name === path.boss);
        break;
      case 'event':
        pathId = 5;
        pathSubId = PATH_EVENT_DATA.findIndex((e) => e.key === path.event);
        break;
      }

      bufWriteU8(data, HINT_OFFSETS.KEY, id);
      bufWriteU8(data, HINT_OFFSETS.TYPE, 0x00);
      bufWriteU8(data, HINT_OFFSETS.REGION, region);
      bufWriteU8(data, HINT_OFFSETS.WORLD, regionD.world + 1);
      bufWriteU16BE(data, HINT_OFFSETS.ITEM, pathId);
      bufWriteU16BE(data, HINT_OFFSETS.ITEM2, pathSubId);
      bufWriteU8(data, HINT_OFFSETS.PLAYER, player);
    }
    break;
  case 'foolish':
    {
      const regionD = regionData(hint.region);
      const region = (REGIONS as any)[regionD.id];
      if (region === undefined) {
        throw new Error(`Unknown region ${hint.region}`);
      }
      bufWriteU8(data, HINT_OFFSETS.KEY, id);
      bufWriteU8(data, HINT_OFFSETS.TYPE, 0x01);
      bufWriteU8(data, HINT_OFFSETS.REGION, region);
      bufWriteU8(data, HINT_OFFSETS.WORLD, regionD.world + 1);
    }
    break;
  case 'item-exact':
    {
      const check = (HINTS as any)[hint.check];
      if (check === undefined) {
        throw new Error(`Unknown named check: ${hint.check}`);
      }
      const items = hint.items;
      const itemsGI = hint.items.map((item) => gi(settings, 'oot', item.item, false));
      bufWriteU8(data, HINT_OFFSETS.KEY, id);
      bufWriteU8(data, HINT_OFFSETS.TYPE, 0x02);
      bufWriteU8(data, HINT_OFFSETS.REGION, check);
      bufWriteU8(data, HINT_OFFSETS.WORLD, hint.world + 1);
      bufWriteU16BE(data, HINT_OFFSETS.ITEM, itemsGI[0]);
      bufWriteU8(data, HINT_OFFSETS.PLAYER, items[0].player + 1);
      bufWriteI8(data, HINT_OFFSETS.IMPORTANCE, hint.importances[0]);
      if (items.length > 1) {
        bufWriteU16BE(data, HINT_OFFSETS.ITEM2, itemsGI[1]);
        bufWriteU8(data, HINT_OFFSETS.PLAYER2, items[1].player + 1);
        bufWriteI8(data, HINT_OFFSETS.IMPORTANCE2, hint.importances[1]);
      }
      if (items.length > 2) {
        bufWriteU16BE(data, HINT_OFFSETS.ITEM3, itemsGI[2]);
        bufWriteU8(data, HINT_OFFSETS.PLAYER3, items[2].player + 1);
        bufWriteI8(data, HINT_OFFSETS.IMPORTANCE3, hint.importances[2]);
      }
    }
    break;
  case 'item-region':
      {
        const regionD = regionData(hint.region);
        const region = (REGIONS as any)[regionD.id];
        const item = hint.item;
        if (region === undefined) {
          throw new Error(`Unknown region ${hint.region}`);
        }
        const itemGI = gi(settings, 'oot', item.item, false);
        bufWriteU8(data, HINT_OFFSETS.KEY, id);
        bufWriteU8(data, HINT_OFFSETS.TYPE, 0x03);
        bufWriteU8(data, HINT_OFFSETS.REGION, region);
        bufWriteU8(data, HINT_OFFSETS.WORLD, regionD.world + 1);
        bufWriteU16BE(data, HINT_OFFSETS.ITEM, itemGI);
        bufWriteU8(data, HINT_OFFSETS.PLAYER, item.player + 1);
        bufWriteI8(data, HINT_OFFSETS.IMPORTANCE, hint.importance);
      }
      break;
  case 'junk':
    {
      bufWriteU8(data, HINT_OFFSETS.KEY, id);
      bufWriteU8(data, HINT_OFFSETS.TYPE, 0x04);
      bufWriteU16BE(data, HINT_OFFSETS.ITEM, hint.id);
    }
    break;
  }
  return data;
}

const gameHints = (settings: Settings, game: Game, hints: WorldHints): Uint8Array => {
  const buffers: Uint8Array[] = [];
  for (const gossip in hints.gossip) {
    const h = hints.gossip[gossip];
    if (h.game !== game) {
      continue;
    }
    buffers.push(hintBuffer(settings, game, gossip, h));
  }
  const b = new Uint8Array(0x10);
  b.fill(0xff);
  buffers.push(b);
  return padBuffer16(concatUint8Arrays(buffers));
}

function dungeonWarpsBuffer(world: World) {
  const defaultWarps = [
    'OOT_KOKIRI_FOREST_FROM_DEKU_TREE',
    'OOT_MOUNTAIN_TRAIL_FROM_DODONGO_CAVERN',
    'OOT_ZORA_FOUNTAIN_FROM_JABU_JABU',
    'OOT_SACRED_MEADOW_FROM_TEMPLE_FOREST',
    'OOT_DEATH_CRATER_FROM_TEMPLE_FIRE',
    'OOT_LAKE_HYLIA_FROM_TEMPLE_WATER',
    'OOT_GRAVEYARD_FROM_TEMPLE_SHADOW',
    'OOT_DESERT_COLOSSUS_FROM_TEMPLE_SPIRIT',
    'MM_WOODFALL_FROM_TEMPLE',
    'MM_SNOWHEAD_FROM_TEMPLE',
    'MM_GREAT_BAY_FROM_TEMPLE',
    'MM_STONE_TOWER_INVERTED_FROM_TEMPLE',
  ];

  const entrances = defaultWarps.map((e) => entranceAbs(world, e));
  return toU32Buffer(entrances);
}

function dungeonEntrancesBuffer(world: World) {
  const buffer = new Uint8Array(DUNGEON_ENTRANCES.length * 4);

  for (let i = 0; i < DUNGEON_ENTRANCES.length; ++i) {
    const entranceName = DUNGEON_ENTRANCES[i];
    const entranceData = world.dungeonsEntrances.get(entranceName) || { type: 'region', region: 'NONE' as Region };
    let data: number;

    if (entranceData.type === 'replace') {
      data = DUNGEON_ENTRANCES.indexOf(entranceData.entrance);
      data = (data | 0x80000000) >>> 0;
    } else {
      data = (REGIONS as any)[entranceData.region];
    }

    bufWriteU32BE(buffer, i * 4, data);
  }

  return buffer;
}

const regionsBuffer = (regions: Region[]) => {
  const data = regions.map((region) => {
    const regionId = (REGIONS as any)[regionData(region).id];
    if (regionId === undefined) {
      throw new Error(`Unknown region ${region}`);
    }
    const world = regionData(region).world + 1;
    return [regionId, world];
  });
  return toU8Buffer(data.flat());
};

const gameEntrances = (worldId: number, game: Game, logic: LogicResult) => {
  const data: number[] = [];
  const world = logic.worlds[worldId];
  for (const [src, dst] of world.entranceOverrides) {
    const srcEntrance = ENTRANCES[src as keyof typeof ENTRANCES];
    const dstEntrance = ENTRANCES[dst as keyof typeof ENTRANCES];
    if (srcEntrance.game !== game)
      continue;
    const srcId = entrance2(srcEntrance.game, srcEntrance.game as Game, src);
    const dstId = entrance2(srcEntrance.game, dstEntrance.game as Game, dst);
    data.push(srcId, dstId);
  }
  data.push(0xffffffff);
  data.push(0xffffffff);
  return padBuffer16(toU32Buffer(data));
};

const randomizerDungeonsBits = (worldId: number, logic: LogicResult): Uint8Array => {
  let mq = 0;
  let preCompleted = 0;
  const world = logic.worlds[worldId];
  const settingDataMQ = SETTINGS.find(x => x.key === 'mqDungeons')!;
  for (let i = 0; i < settingDataMQ.values.length; ++i) {
    const dungeon = settingDataMQ.values[i].value;
    if (world.resolvedFlags.mqDungeons.has(dungeon)) {
      mq |= 1 << i;
    }
  }

  for (let i = 0; i < DUNGEONS.length; ++i) {
    const dungeon = DUNGEONS[i];
    if (world.preCompleted.has(dungeon.key)) {
      preCompleted |= 1 << i;
    }
  }

  const buffer = new Uint8Array(8);
  bufWriteU32BE(buffer, 0, mq);
  bufWriteU32BE(buffer, 4, preCompleted);
  return buffer;
}

function randomizerWarps(worldId: number, logic: LogicResult): Uint8Array {
  const songs = [
    'OOT_WARP_SONG_MEADOW',
    'OOT_WARP_SONG_CRATER',
    'OOT_WARP_SONG_LAKE',
    'OOT_WARP_SONG_DESERT',
    'OOT_WARP_SONG_GRAVE',
    'OOT_WARP_SONG_TEMPLE',
  ];
  const warpSongs = toU32Buffer(songs.map(e => entrance(e, logic.worlds[worldId])));

  const owlStatues = [
    'MM_WARP_OWL_GREAT_BAY',
    'MM_WARP_OWL_ZORA_CAPE',
    'MM_WARP_OWL_SNOWHEAD',
    'MM_WARP_OWL_MOUNTAIN_VILLAGE',
    'MM_WARP_OWL_CLOCK_TOWN',
    'MM_WARP_OWL_MILK_ROAD',
    'MM_WARP_OWL_WOODFALL',
    'MM_WARP_OWL_SOUTHERN_SWAMP',
    'MM_WARP_OWL_IKANA_CANYON',
    'MM_WARP_OWL_STONE_TOWER',
  ];
  const owlStatuesBuffer = toU32Buffer(owlStatues.map(e => entrance(e, logic.worlds[worldId])));

  const spawns = [
    'OOT_SPAWN_ADULT',
    'OOT_SPAWN_CHILD'
  ];
  const spawnsBuffer = toU32Buffer(spawns.map(e => entrance(e, logic.worlds[worldId])));

  return concatUint8Arrays([warpSongs, owlStatuesBuffer, spawnsBuffer]);
}

function worldConfig(world: World, settings: Settings): Set<Confvar> {
  const config = new Set<Confvar>;

  const exprs: {[k in Confvar]: boolean} = {
    GANON_NO_BOSS_KEY: settings.ganonBossKey === 'removed',
    SMALL_KEY_SHUFFLE: settings.smallKeyShuffleOot === 'anywhere',
    CSMC: settings.csmc === 'always',
    CSMC_SKULLTULA: settings.csmcSkulltula,
    CSMC_COW: settings.csmcCow,
    CSMC_GRASS_POT: settings.csmcGrassPot,
    CSMC_AGONY: settings.csmc === 'agony',
    OOT_PROGRESSIVE_SHIELDS: settings.progressiveShieldsOot === 'progressive',
    OOT_PROGRESSIVE_SWORDS: settings.progressiveSwordsOot === 'progressive',
    OOT_PROGRESSIVE_SWORDS_GORON: settings.progressiveSwordsOot === 'goron',
    MM_PROGRESSIVE_SHIELDS: settings.progressiveShieldsMm === 'progressive',
    MM_PROGRESSIVE_LULLABY: settings.progressiveGoronLullaby === 'progressive',
    DOOR_OF_TIME_OPEN: settings.doorOfTime === 'open',
    OOT_OPEN_DEKU: settings.dekuTree === 'open',
    OOT_CLOSED_DEKU: settings.dekuTree === 'closed',
    OOT_ADULT_DEKU: world.resolvedFlags.openDungeonsOot.has('dekuTreeAdult'),
    ER_DUNGEONS: settings.erDungeons !== 'none',
    ER_MAJOR_DUNGEONS: settings.erMajorDungeons,
    ER_BOSS: settings.erBoss !== 'none',
    ER_ANY: isEntranceShuffle(settings),
    SHARED_SWORDS: settings.sharedSwords,
    SHARED_BOWS: settings.sharedBows,
    SHARED_BOMB_BAGS: settings.sharedBombBags,
    SHARED_MAGIC: settings.sharedMagic,
    SHARED_MAGIC_ARROW_FIRE: settings.sharedMagicArrowFire,
    SHARED_MAGIC_ARROW_ICE: settings.sharedMagicArrowIce,
    SHARED_MAGIC_ARROW_LIGHT: settings.sharedMagicArrowLight,
    SHARED_SONG_EPONA: settings.sharedSongEpona,
    SHARED_SONG_STORMS: settings.sharedSongStorms,
    SHARED_SONG_TIME: settings.sharedSongTime,
    SHARED_SONG_SUN: settings.sharedSongSun,
    SHARED_NUTS_STICKS: settings.sharedNutsSticks,
    SHARED_HOOKSHOT: settings.sharedHookshot,
    SHARED_LENS: settings.sharedLens,
    SHARED_OCARINA: settings.sharedOcarina,
    SHARED_MASK_GORON: settings.sharedMaskGoron,
    SHARED_MASK_ZORA: settings.sharedMaskZora,
    SHARED_MASK_BUNNY: settings.sharedMaskBunny,
    SHARED_MASK_TRUTH: settings.sharedMaskTruth,
    SHARED_MASK_KEATON: settings.sharedMaskKeaton,
    SHARED_WALLETS: settings.sharedWallets,
    SHARED_HEALTH: settings.sharedHealth,
    SHARED_SOULS_ENEMY: settings.sharedSoulsEnemy,
    SHARED_SOULS_MISC: settings.sharedSoulsMisc,
    SHARED_SOULS_NPC: settings.sharedSoulsNpc,
    SHARED_OCARINA_BUTTONS: settings.sharedOcarinaButtons,
    SHARED_SHIELDS: settings.sharedShields,
    SHARED_SPELL_FIRE: settings.sharedSpellFire,
    SHARED_SPELL_WIND: settings.sharedSpellWind,
    SHARED_SPELL_LOVE: settings.sharedSpellLove,
    SHARED_BOOTS_IRON: settings.sharedBootsIron,
    SHARED_BOOTS_HOVER: settings.sharedBootsHover,
    SHARED_TUNIC_GORON: settings.sharedTunicGoron,
    SHARED_TUNIC_ZORA: settings.sharedTunicZora,
    SHARED_SCALES: settings.sharedScales,
    SHARED_STRENGTH: settings.sharedStrength,
    OOT_CROSS_WARP: settings.crossWarpOot,
    MM_CROSS_WARP: settings.crossWarpMm !== 'none',
    MM_CROSS_WARP_ADULT: settings.crossWarpMm === 'full',
    MM_CROSS_AGE: settings.crossAge,
    MM_OCARINA_FAIRY: settings.fairyOcarinaMm,
    MM_HOOKSHOT_SHORT: settings.shortHookshotMm,
    MM_SONG_SUN: settings.sunSongMm,
    OOT_SKIP_ZELDA: settings.skipZelda,
    OOT_OPEN_KAKARIKO_GATE: settings.kakarikoGate === 'open',
    OOT_LACS_CUSTOM: settings.lacs === 'custom',
    OOT_GANON_BK_CUSTOM: settings.ganonBossKey === 'custom',
    OOT_KZ_OPEN: settings.zoraKing === 'open',
    OOT_KZ_OPEN_ADULT: settings.zoraKing === 'adult',
    GOAL_GANON: settings.goal === 'ganon' || settings.goal === 'both',
    GOAL_MAJORA: settings.goal === 'majora' || settings.goal === 'both',
    GOAL_TRIFORCE: settings.goal === 'triforce',
    GOAL_TRIFORCE3: settings.goal === 'triforce3',
    MM_MAJORA_CHILD_CUSTOM: settings.majoraChild === 'custom',
    FILL_WALLETS: settings.fillWallets,
    CHILD_WALLET: settings.childWallets,
    OOT_ADULT_WELL: world.resolvedFlags.openDungeonsOot.has('wellAdult'),
    COLOSSAL_WALLET: settings.colossalWallets,
    BOTTOMLESS_WALLET: settings.bottomlessWallets,
    OOT_AGELESS_BOOTS: settings.agelessBoots,
    OOT_AGELESS_STRENGTH: settings.agelessStrength,
    OOT_AGELESS_SWORDS: settings.agelessSwords,
    MM_OWL_SHUFFLE: settings.owlShuffle === 'anywhere',
    OOT_CARPENTERS_ONE: settings.gerudoFortress === 'single',
    OOT_CARPENTERS_NONE: settings.gerudoFortress === 'open',
    OOT_NO_BOSS_KEY: settings.bossKeyShuffleOot === 'removed',
    OOT_NO_SMALL_KEY: settings.smallKeyShuffleOot === 'removed',
    MM_NO_BOSS_KEY: settings.bossKeyShuffleMm === 'removed',
    MM_NO_SMALL_KEY: settings.smallKeyShuffleMm === 'removed',
    CSMC_HEARTS: settings.csmcHearts,
    CSMC_MAP_COMPASS: settings.csmcMapCompass,
    OOT_BLUE_FIRE_ARROWS: settings.blueFireArrows,
    OOT_SUNLIGHT_ARROWS: settings.sunlightArrows,
    OOT_SILVER_RUPEE_SHUFFLE: settings.silverRupeeShuffle !== 'vanilla',
    OOT_FREE_SCARECROW: settings.freeScarecrowOot,
    OOT_SOULS_ENEMY: settings.soulsEnemyOot,
    OOT_SOULS_BOSS: settings.soulsBossOot,
    OOT_SOULS_NPC: settings.soulsNpcOot,
    OOT_SOULS_MISC: settings.soulsMiscOot,
    MM_SOULS_ENEMY: settings.soulsEnemyMm,
    MM_SOULS_BOSS: settings.soulsBossMm,
    MM_SOULS_NPC: settings.soulsNpcMm,
    MM_SOULS_MISC: settings.soulsMiscMm,
    MM_REMOVED_FAIRIES: settings.strayFairyOtherShuffle === 'removed',
    SHARED_SKELETON_KEY: settings.sharedSkeletonKey,
    OOT_SHUFFLE_MASK_TRADES: settings.shuffleMaskTrades,
    MENU_NOTEBOOK: settings.menuNotebook,
    OOT_AGELESS_CHILD_TRADE: settings.agelessChildTrade,
    OOT_START_ADULT: settings.startingAge === 'adult',
    HINT_IMPORTANCE: settings.hintImportance && settings.logic !== 'none',
    OOT_OCARINA_BUTTONS: settings.ocarinaButtonsShuffleOot,
    MM_OCARINA_BUTTONS: settings.ocarinaButtonsShuffleMm,
    OOT_AGE_CHANGE: settings.ageChange !== 'none',
    OOT_AGE_CHANGE_NEEDS_OOT: settings.ageChange === 'oot',
    MM_PROGRESSIVE_GFS: settings.progressiveGFS === 'progressive',
    OOT_CHEST_GAME_SHUFFLE: settings.smallKeyShuffleChestGame !== 'vanilla',
    MM_CLIMB_MOST_SURFACES: settings.climbMostSurfacesMm,
    OOT_TRIAL_LIGHT: world.resolvedFlags.ganonTrials.has('Light'),
    OOT_TRIAL_FOREST: world.resolvedFlags.ganonTrials.has('Forest'),
    OOT_TRIAL_FIRE: world.resolvedFlags.ganonTrials.has('Fire'),
    OOT_TRIAL_WATER: world.resolvedFlags.ganonTrials.has('Water'),
    OOT_TRIAL_SHADOW: world.resolvedFlags.ganonTrials.has('Shadow'),
    OOT_TRIAL_SPIRIT: world.resolvedFlags.ganonTrials.has('Spirit'),
    ER_MOON: settings.erMoon,
    MM_OPEN_MOON: settings.openMoon,
    NO_BROKEN_ACTORS: !settings.restoreBrokenActors,
    SHARED_BOMBCHU: settings.sharedBombchu,
    ER_WALLMASTERS: settings.erWallmasters !== 'none',
    OOT_OPEN_MASK_SHOP: settings.openMaskShop,
    OOT_BRIDGE_VANILLA: settings.rainbowBridge === 'vanilla',
    OOT_BRIDGE_MEDALLIONS: settings.rainbowBridge === 'medallions',
    OOT_BRIDGE_CUSTOM: settings.rainbowBridge === 'custom',
    MULTIPLAYER: settings.mode !== 'single',
    MM_OPEN_WF: world.resolvedFlags.openDungeonsMm.has('WF'),
    MM_OPEN_SH: world.resolvedFlags.openDungeonsMm.has('SH'),
    MM_OPEN_GB: world.resolvedFlags.openDungeonsMm.has('GB'),
    MM_OPEN_ST: world.resolvedFlags.openDungeonsMm.has('ST'),
    MM_CLEAR_OPEN_WF: settings.clearStateDungeonsMm === 'WF' || settings.clearStateDungeonsMm === 'both',
    MM_CLEAR_OPEN_GB: settings.clearStateDungeonsMm === 'GB' || settings.clearStateDungeonsMm === 'both',
    MM_SPELL_FIRE: settings.spellFireMm,
    MM_SPELL_WIND: settings.spellWindMm,
    MM_SPELL_LOVE: settings.spellLoveMm,
    MM_BOOTS_IRON: settings.bootsIronMm,
    MM_BOOTS_HOVER: settings.bootsHoverMm,
    MM_TUNIC_GORON: settings.tunicGoronMm,
    MM_TUNIC_ZORA: settings.tunicZoraMm,
    MM_SCALES: settings.scalesMm,
    MM_STRENGTH: settings.strengthMm,
    OOT_GANON_BOSS_KEY_HINT: settings.ganonBossKey === 'anywhere',
    BLAST_MASK_DELAY_INSTANT: settings.blastMaskCooldown === 'instant',
    BLAST_MASK_DELAY_VERYSHORT: settings.blastMaskCooldown === 'veryshort',
    BLAST_MASK_DELAY_SHORT: settings.blastMaskCooldown === 'short',
    BLAST_MASK_DELAY_LONG: settings.blastMaskCooldown === 'long',
    BLAST_MASK_DELAY_VERYLONG: settings.blastMaskCooldown === 'verylong',
    OOT_MASK_BLAST: settings.blastMaskOot,
    SHARED_MASK_BLAST: settings.sharedMaskBlast,
    OOT_MASK_STONE: settings.stoneMaskOot,
    SHARED_MASK_STONE: settings.sharedMaskStone,
    OOT_SONG_EMPTINESS: settings.elegyOot,
    SHARED_SONG_EMPTINESS: settings.sharedSongElegy,
    MM_FD_ANYWHERE: settings.fierceDeityAnywhere,
    MM_CLOCK_SPEED_VERYSLOW: settings.clockSpeed === 'veryslow',
    MM_CLOCK_SPEED_SLOW: settings.clockSpeed === 'slow',
    MM_CLOCK_SPEED_FAST: settings.clockSpeed === 'fast',
    MM_CLOCK_SPEED_VERYFAST: settings.clockSpeed === 'veryfast',
    MM_CLOCK_SPEED_SUPERFAST: settings.clockSpeed === 'superfast',
    MM_AUTO_INVERT_ALWAYS: settings.autoInvert === 'always',
    MM_AUTO_INVERT_FIRST_CYCLE: settings.autoInvert === 'firstCycle',
    MM_MOON_CRASH_CYCLE: settings.moonCrash === 'cycle',
    MM_KEEP_ITEMS_RESET: settings.keepItemsReset,
    MM_FAST_MASKS: settings.fastMasks,
    OOT_OPEN_ZD_SHORTCUT: settings.openZdShortcut,
    MM_CLOCKS: settings.clocks,
    MM_CLOCKS_PROGRESSIVE: settings.progressiveClocks !== 'separate',
    MM_CLOCKS_PROGRESSIVE_REVERSE: settings.progressiveClocks === 'descending',
    ER_GROTTOS: settings.erGrottos !== 'none',
    ER_OVERWORLD: settings.erOverworld !== 'none',
    ER_INDOORS: settings.erIndoors !== 'none',
    ER_REGIONS_OVERWORLD: settings.erRegions !== 'none' || settings.erOverworld !== 'none',
    CROSS_GAME_FW: settings.crossGameFw,
    RUPEE_SCALING: settings.rupeeScaling,
    OOT_SWORDLESS_ADULT: settings.swordlessAdult,
    OOT_TIME_TRAVEL_REQUIRES_MS: settings.timeTravelSword,
    OOT_EXTRA_CHILD_SWORDS: settings.extraChildSwordsOot,
    ONLY_OOT: settings.games === 'oot',
    ONLY_MM: settings.games === 'mm',
    OOT_PLANTED_BEANS: settings.ootPreplantedBeans,
    OOT_OPEN_JABU_JABU: world.resolvedFlags.openDungeonsOot.has('JJ'),
    OOT_OPEN_SHADOW_TEMPLE: world.resolvedFlags.openDungeonsOot.has('Shadow'),
    OOT_OPEN_DODONGO_CAVERN: world.resolvedFlags.openDungeonsOot.has('DC'),
    OOT_OPEN_WATER_TEMPLE: world.resolvedFlags.openDungeonsOot.has('Water'),
    OOT_OPEN_WELL: world.resolvedFlags.openDungeonsOot.has('BotW'),
    OOT_SONG_OF_DOUBLE_TIME: settings.songOfDoubleTimeOot,
    MM_PRE_ACTIVATED_OWL_CT: world.resolvedFlags.mmPreActivatedOwls.has('clocktown'),
    MM_PRE_ACTIVATED_OWL_MR: world.resolvedFlags.mmPreActivatedOwls.has('milkroad'),
    MM_PRE_ACTIVATED_OWL_SS: world.resolvedFlags.mmPreActivatedOwls.has('swamp'),
    MM_PRE_ACTIVATED_OWL_WF: world.resolvedFlags.mmPreActivatedOwls.has('woodfall'),
    MM_PRE_ACTIVATED_OWL_MV: world.resolvedFlags.mmPreActivatedOwls.has('mountain'),
    MM_PRE_ACTIVATED_OWL_SH: world.resolvedFlags.mmPreActivatedOwls.has('snowhead'),
    MM_PRE_ACTIVATED_OWL_GB: world.resolvedFlags.mmPreActivatedOwls.has('greatbay'),
    MM_PRE_ACTIVATED_OWL_ZC: world.resolvedFlags.mmPreActivatedOwls.has('zoracape'),
    MM_PRE_ACTIVATED_OWL_IC: world.resolvedFlags.mmPreActivatedOwls.has('canyon'),
    MM_PRE_ACTIVATED_OWL_ST: world.resolvedFlags.mmPreActivatedOwls.has('tower'),
    MM_WELL_OPEN: settings.beneathWell === 'open',
    MM_HAMMER: settings.hammerMm,
    SHARED_HAMMER: settings.sharedHammer,
    MM_UPGRADES_STICKS_NUTS: settings.sticksNutsUpgradesMm,
    OOT_SHUFFLE_EGGS: settings.eggShuffle,
    MM_STONE_OF_AGONY: settings.stoneAgonyMm,
    SHARED_STONE_OF_AGONY: settings.sharedStoneAgony,
    OOT_MUST_START_WITH_MS: mustStartWithMasterSword(settings),
    OOT_SPIN_UPGRADE: settings.spinUpgradeOot,
    SHARED_SPIN_UPGRADE: settings.sharedSpinUpgrade,
    MM_JP_LAYOUT_DEKU_PALACE: world.resolvedFlags.jpLayouts.has('DekuPalace'),
    REGION_STATE_DUNGEONS: settings.regionState === 'dungeonBeaten',
    REGION_STATE_REWARDS: settings.regionState === 'reward',
    REGION_STATE_FREE: settings.regionState === 'free',
  };

  for (const v in exprs) {
    if (exprs[v as Confvar]) {
      config.add(v as Confvar);
    }
  }

  return config;
}

export const randomizerConfig = (world: World, settings: Settings): Uint8Array => {
  const config = worldConfig(world, settings);
  const bits = Array.from(config).map((c) => {
    const bit = CONFVARS_VALUES[c];
    if (bit === undefined) {
      throw new Error(`Unknown config ${c}`);
    }
    return bit;
  });
  const block = new Uint8Array(0x40);
  for (const bit of bits) {
    const byte = Math.floor(bit / 8);
    const mask = 1 << (bit % 8);
    block[byte] |= mask;
  }
  return block;
};

export const randomizerHints = (world: number, logic: LogicResult): Uint8Array => {
  const buffers: Uint8Array[] = [];
  const h = logic.hints[world];
  buffers.push(regionsBuffer(h.dungeonRewards));
  buffers.push(regionsBuffer([h.lightArrow]));
  buffers.push(regionsBuffer([h.oathToOrder]));
  buffers.push(regionsBuffer([h.ganonBossKey]));
  return concatUint8Arrays(buffers);
};

const randomizerBoss = (worldId: number, logic: LogicResult): Uint8Array => toU8Buffer(logic.worlds[worldId].bossIds);
const randomizerTriforce = (logic: LogicResult): Uint8Array => toU16Buffer([logic.settings.triforcePieces, logic.settings.triforceGoal]);

function specialConds(settings: Settings) {
  const buffers: Uint8Array[] = [];
  const flagsKeys: keyof typeof SPECIAL_CONDS_FIELDS = Object.keys(SPECIAL_CONDS_FIELDS) as any;
  for (const special in SPECIAL_CONDS) {
    const cond = settings.specialConds[special as keyof typeof SPECIAL_CONDS];
    let flags = 0;
    for (let i = 0; i < flagsKeys.length; ++i) {
      const key = flagsKeys[i];
      if ((cond as any)[key]) {
        flags = (flags | (1 << i)) >>> 0;
      }
    }
    const buffer = new Uint8Array(8);
    bufWriteU32BE(buffer, 0, flags);
    bufWriteU16BE(buffer, 4, cond.count);
    buffers.push(buffer);
  }
  return concatUint8Arrays(buffers);
}

export const prices = (worldId: number, logic: LogicResult): Uint8Array => {
  return toU16Buffer(logic.worlds[worldId].prices);
};

const BOMBCHU_BEHAVIORS = {
  free: 0,
  bombBag: 1,
  bagFirst: 2,
  bagSeparate: 3,
};

function configBombchuBehavior(behavior: keyof typeof BOMBCHU_BEHAVIORS): Uint8Array {
  return new Uint8Array([BOMBCHU_BEHAVIORS[behavior]]);
}

export const randomizerData = (worldId: number, logic: LogicResult): Uint8Array => {
  const buffers = [];
  buffers.push(toU8Buffer([worldId + 1, 0, 0, 0]));
  buffers.push(dungeonWarpsBuffer(logic.worlds[worldId]));
  buffers.push(dungeonEntrancesBuffer(logic.worlds[worldId]));
  buffers.push(randomizerDungeonsBits(worldId, logic));
  buffers.push(randomizerWarps(worldId, logic));
  buffers.push(randomizerConfig(logic.worlds[worldId], logic.settings));
  buffers.push(specialConds(logic.settings));
  buffers.push(toU16Buffer([logic.settings.coinsRed, logic.settings.coinsGreen, logic.settings.coinsBlue, logic.settings.coinsYellow]));
  buffers.push(prices(worldId, logic));
  buffers.push(randomizerTriforce(logic));
  buffers.push(randomizerHints(worldId, logic));
  buffers.push(toI8Buffer(logic.hints[worldId].staticHintsImportances));
  buffers.push(zoraSapphireBuffer(worldId, logic));
  buffers.push(randomizerBoss(worldId, logic));
  buffers.push(toU8Buffer([logic.settings.strayFairyRewardCount]));
  buffers.push(configBombchuBehavior(logic.settings.bombchuBehaviorOot));
  buffers.push(configBombchuBehavior(logic.settings.bombchuBehaviorMm));
  return concatUint8Arrays(buffers);
};

function addStartingItemLocsWorld(world: number, logic: LogicResult, locs: string[], items: ItemsCount) {
  const l = makePlayerLocations(logic.settings, locs);
  const i = l.map(x => logic.items.get(x)!);

  for (const item of i) {
    if (item.player === world) {
      countMapAdd(items, item.item);
    }
  }
}

const effectiveStartingItems = (worldId: number, logic: LogicResult): ItemsCount => {
  const { settings } = logic;
  const itemsCount: ItemsCount = new Map;
  for (const [pi, count] of logic.startingItems) {
    if (pi.player === worldId) {
      itemsCount.set(pi.item, count);
    }
  }

  if (settings.tingleShuffle === 'starting') {
    for (const item of ItemGroups.TINGLE_MAPS) {
      itemsCount.set(item, 1);
    }
  }

  if (settings.mapCompassShuffle === 'starting') {
    for (const item of [...ItemGroups.MAPS, ...ItemGroups.COMPASSES]) {
      itemsCount.set(item, 1);
    }
  }

  if (settings.skipZelda) addStartingItemLocsWorld(worldId, logic, locationsZelda(settings), itemsCount);
  if (settings.gerudoFortress === 'open') addStartingItemLocsWorld(worldId, logic, ['OOT Gerudo Member Card'], itemsCount);
  if (settings.mmPreActivatedOwls.type !== 'none') addStartingItemLocsWorld(worldId, logic, getPreActivatedOwlsLocations(logic.worlds[worldId]), itemsCount);

  return itemsCount;
}

const randomizerStartingItems = (world: number, logic: LogicResult): Uint8Array => {
  const { settings } = logic;
  const ids: number[] = [];
  const ids2: number[] = [];
  const items = effectiveStartingItems(world, logic);
  for (const [item, count] of items.entries()) {
    const id = gi(settings, 'oot', item, false);
    if (gi === undefined) {
      throw new Error(`Unknown item ${item.id}`);
    }
    /* Consumables need to be added late */
    if (ItemHelpers.isItemUnlimitedStarting(item)) {
      ids2.push(id);
      ids2.push(count);
    } else {
      ids.push(id);
      ids.push(count);
    }
  }
  return toU16Buffer([...ids, ...ids2, 0xffff, 0xffff]);
};

export function patchRandomizer(worldId: number, logic: LogicResult, settings: Settings, patchfile: Patchfile) {
  patchfile.addNewFile({ vrom: 0xf0200000, data: randomizerData(worldId, logic), compressed: true });
  patchfile.addNewFile({ vrom: 0xf0300000, data: randomizerStartingItems(worldId, logic), compressed: false });
  patchfile.addNewFile({ vrom: 0xf0400000, data: gameChecks(worldId, settings, 'oot', logic), compressed: false });
  patchfile.addNewFile({ vrom: 0xf0500000, data: gameChecks(worldId, settings, 'mm', logic), compressed: false });
  patchfile.addNewFile({ vrom: 0xf0600000, data: gameHints(settings, 'oot', logic.hints[worldId]), compressed: true });
  patchfile.addNewFile({ vrom: 0xf0700000, data: gameHints(settings, 'mm', logic.hints[worldId]), compressed: true });
  patchfile.addNewFile({ vrom: 0xf0800000, data: gameEntrances(worldId, 'oot', logic), compressed: true });
  patchfile.addNewFile({ vrom: 0xf0900000, data: gameEntrances(worldId, 'mm', logic), compressed: true });
}
