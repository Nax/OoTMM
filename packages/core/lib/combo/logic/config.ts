import { Confvar } from '../confvars';
import { Items, PlayerItems, itemByID, makePlayerItem } from '../items';
import { Monitor } from '../monitor';
import { Random } from '../random';
import { Settings } from '../settings';
import { countMapAdd, countMapRemove } from '../util';
import { isEntranceShuffle } from './helpers';

/* This pass pre-computes things from the settings */
export class LogicPassConfig {
  private startingItems: PlayerItems;

  constructor(
    private readonly state: {
      monitor: Monitor,
      settings: Settings,
      random: Random,
    }
  ) {
    /* Starting items */
    this.startingItems = new Map;

    for (const [itemId, count] of Object.entries(state.settings.startingItems)) {
      const item = itemByID(itemId);
      for (let playerId = 0; playerId < this.state.settings.players; ++playerId) {
        const pi = makePlayerItem(item, playerId);
        countMapAdd(this.startingItems, pi, count);
      }
    }
  }

  private startingFairies() {
    const { settings } = this.state;

    for (let playerId = 0; playerId < this.state.settings.players; ++playerId) {
      const piWf = makePlayerItem(Items.MM_STRAY_FAIRY_WF, playerId);
      const piSh = makePlayerItem(Items.MM_STRAY_FAIRY_SH, playerId);
      const piGb = makePlayerItem(Items.MM_STRAY_FAIRY_GB, playerId);
      const piSt = makePlayerItem(Items.MM_STRAY_FAIRY_ST, playerId);

      if (settings.strayFairyChestShuffle === 'starting') {
        countMapAdd(this.startingItems, piWf, 3);
        countMapAdd(this.startingItems, piSh, 7);
        countMapAdd(this.startingItems, piGb, 6);
        countMapAdd(this.startingItems, piSt, 15);
      }

      if (['starting', 'removed'].includes(settings.strayFairyOtherShuffle)) {
        countMapAdd(this.startingItems, piWf, 12);
        countMapAdd(this.startingItems, piSh, 8);
        countMapAdd(this.startingItems, piGb, 9);
      }
    }
  }

  run() {
    this.state.monitor.log('Logic: Config');
    const config = new Set<Confvar>;

    const { settings } = this.state;

    /* Handle starting age */
    if (settings.startingAge === 'random') {
      if (this.state.random.next() & 1) {
        settings.startingAge = 'adult';
      } else {
        settings.startingAge = 'child';
      }
    }

    for (let playerId = 0; playerId < this.state.settings.players; ++playerId) {
      const piSword = makePlayerItem(Items.OOT_SWORD, playerId);
      const piSwordMaster = makePlayerItem(Items.OOT_SWORD_MASTER, playerId);

      if (settings.startingAge === 'adult') {
        if (settings.progressiveSwordsOot === 'progressive') {
          if ((this.startingItems.get(piSword) || 0) > 1) {
            countMapRemove(this.startingItems, piSword, 1);
          }
        } else {
          if (this.startingItems.has(piSwordMaster)) {
            countMapRemove(this.startingItems, piSwordMaster, 1);
          }
        }
      }
    }

    /* Handle fairies */
    this.startingFairies();

    const exprs: {[k in Confvar]: boolean} = {
      GANON_NO_BOSS_KEY: settings.ganonBossKey === 'removed',
      SMALL_KEY_SHUFFLE: settings.smallKeyShuffleOot === 'anywhere',
      CSMC: settings.csmc === 'always',
      CSMC_EXTRA: settings.csmcExtra,
      CSMC_AGONY: settings.csmc === 'agony',
      OOT_PROGRESSIVE_SHIELDS: settings.progressiveShieldsOot === 'progressive',
      OOT_PROGRESSIVE_SWORDS: settings.progressiveSwordsOot === 'progressive',
      OOT_PROGRESSIVE_SWORDS_GORON: settings.progressiveSwordsOot === 'goron',
      MM_PROGRESSIVE_SHIELDS: settings.progressiveShieldsMm === 'progressive',
      MM_PROGRESSIVE_LULLABY: settings.progressiveGoronLullaby === 'progressive',
      DOOR_OF_TIME_OPEN: settings.doorOfTime === 'open',
      OOT_OPEN_DEKU: settings.dekuTree === 'open',
      ER_DUNGEONS: settings.erDungeons !== 'none',
      ER_MAJOR_DUNGEONS: settings.erMajorDungeons,
      ER_BOSS: settings.erBoss !== 'none',
      ER_ANY: isEntranceShuffle(settings),
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
      SHARED_SOULS: settings.sharedSouls,
      SHARED_OCARINA_BUTTONS: settings.sharedOcarinaButtons,
      OOT_CROSS_WARP: settings.crossWarpOot,
      MM_CROSS_WARP: settings.crossWarpMm !== 'none',
      MM_CROSS_WARP_ADULT: settings.crossWarpMm === 'full',
      MM_OCARINA_FAIRY: settings.fairyOcarinaMm,
      MM_HOOKSHOT_SHORT: settings.shortHookshotMm,
      MM_SONG_SUN: settings.sunSongMm,
      OOT_SKIP_ZELDA: settings.skipZelda,
      OOT_OPEN_KAKARIKO_GATE: settings.kakarikoGate === 'open',
      OOT_LACS_CUSTOM: settings.lacs === 'custom',
      OOT_GANON_BK_CUSTOM: settings.ganonBossKey === 'custom',
      OOT_ZK_OPEN: settings.zoraKing === 'open',
      OOT_ZK_OPEN_ADULT: settings.zoraKing === 'adult',
      GOAL_GANON: settings.goal === 'ganon' || settings.goal === 'both',
      GOAL_MAJORA: settings.goal === 'majora' || settings.goal === 'both',
      GOAL_TRIFORCE: settings.goal === 'triforce',
      GOAL_TRIFORCE3: settings.goal === 'triforce3',
      MM_MAJORA_CHILD_CUSTOM: settings.majoraChild === 'custom',
      FILL_WALLETS: settings.fillWallets,
      CHILD_WALLET: settings.childWallets,
      OOT_ADULT_WELL: settings.wellAdult,
      COLOSSAL_WALLET: settings.colossalWallets,
      BOTTOMLESS_WALLET: settings.bottomlessWallets,
      OOT_AGELESS_BOOTS: settings.agelessBoots,
      MM_OWL_SHUFFLE: settings.owlShuffle === 'anywhere',
      OOT_CARPENTERS_ONE: settings.gerudoFortress === 'single',
      OOT_CARPENTERS_NONE: settings.gerudoFortress === 'open',
      OOT_NO_BOSS_KEY: settings.bossKeyShuffleOot === 'removed',
      OOT_NO_SMALL_KEY: settings.smallKeyShuffleOot === 'removed',
      MM_NO_BOSS_KEY: settings.bossKeyShuffleMm === 'removed',
      MM_NO_SMALL_KEY: settings.smallKeyShuffleMm === 'removed',
      CSMC_HEARTS: settings.csmcHearts,
      OOT_BLUE_FIRE_ARROWS: settings.blueFireArrows,
      OOT_SILVER_RUPEE_SHUFFLE: settings.silverRupeeShuffle !== 'vanilla',
      OOT_FREE_SCARECROW: settings.freeScarecrowOot,
      OOT_SOULS: settings.enemySoulsOot,
      MM_SOULS: settings.enemySoulsMm,
      MM_REMOVED_FAIRIES: settings.strayFairyOtherShuffle === 'removed',
      SHARED_SKELETON_KEY: settings.sharedSkeletonKey,
      OOT_SHUFFLE_POTS: settings.shufflePotsOot,
      MM_SHUFFLE_POTS: settings.shufflePotsMm,
      OOT_SHUFFLE_GRASS: settings.shuffleGrassOot,
      MM_SHUFFLE_GRASS: settings.shuffleGrassMm,
      MENU_NOTEBOOK: settings.menuNotebook,
      OOT_AGELESS_CHILD_TRADE: settings.agelessChildTrade,
      OOT_START_ADULT: settings.startingAge === 'adult',
      HINT_IMPORTANCE: settings.hintImportance,
      OOT_OCARINA_BUTTONS: settings.ocarinaButtonsShuffleOot,
      MM_OCARINA_BUTTONS: settings.ocarinaButtonsShuffleMm,
      OOT_AGE_CHANGE: settings.ageChange !== 'none',
      OOT_AGE_CHANGE_NEEDS_OOT: settings.ageChange === 'oot',
      OOT_TRIALS: settings.ganonTrials !== 'none',
      MM_PROGRESSIVE_GFS: settings.progressiveGFS === 'progressive',
      OOT_CHEST_GAME_SHUFFLE: settings.smallKeyShuffleChestGame !== 'vanilla',
    };

    for (const v in exprs) {
      if (exprs[v as Confvar]) {
        config.add(v as Confvar);
      }
    }

    return { config, startingItems: this.startingItems };
  }
}
