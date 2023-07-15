import { GAMES } from '../config';
import { Random, sample, shuffle } from '../random';
import { countMapArray, countMapCombine, countMapRemove, gameId } from '../util';
import { Pathfinder, PathfinderState } from './pathfind';
import { World } from './world';
import { LogicError, LogicSeedError } from './error';
import { Settings } from '../settings';
import { Monitor } from '../monitor';
import { Location, isLocationRenewable, locationData, makeLocation } from './locations';
import { Item, ItemGroups, ItemHelpers, Items, ItemsCount, PlayerItem, PlayerItems, itemByID, makePlayerItem } from '../items';

export type ItemPlacement = Map<Location, PlayerItem>;

const REWARDS_DUNGEONS = [
  'DT',
  'DC',
  'JJ',
  'Forest',
  'Fire',
  'Water',
  'Shadow',
  'Spirit',
  'WF',
  'SH',
  'GB',
  'ST',
  'BotW',
  'IC',
  'GTG',
  'SSH',
  'OSH',
  'PF',
  'BtW',
  'ACoI',
  'SS',
];

type ItemPools = {
  required: PlayerItems,
  nice: PlayerItems,
  junk: PlayerItems,
};

const removeItemPools = (pools: ItemPools, item: PlayerItem) => {
  const keys = ['required', 'nice', 'junk'] as const;
  for (const key of keys) {
    const items = pools[key];
    if (items.has(item)) {
      countMapRemove(items, item);
      return;
    }
  }
};

type SolverState = {
  items: ItemPlacement;
  pools: ItemPools;
  criticalRenewables: Set<PlayerItem>;
  placedCount: number;
};

const cloneState = (state: SolverState) => {
  return {
    items: new Map(state.items),
    pools: {
      required: new Map(state.pools.required),
      nice: new Map(state.pools.nice),
      junk: new Map(state.pools.junk),
    },
    criticalRenewables: new Set(state.criticalRenewables),
    placedCount: state.placedCount,
  };
};

export class LogicPassSolver {
  private monitor: Monitor;
  private pathfinder!: Pathfinder;
  private junkDistribution!: PlayerItems;
  private locations!: Location[];
  private state: SolverState;
  private pathfinderState: PathfinderState;
  private modeValidate = false;
  private attempts = 0;
  private attemptsMax = 100;

  constructor(
    private readonly input: {
      fixedLocations: Set<Location>,
      worlds: World[],
      settings: Settings,
      random: Random,
      monitor: Monitor,
      pool: PlayerItems;
      renewableJunks: PlayerItems;
    }
  ) {
    this.monitor = this.input.monitor;
    this.locations = this.input.worlds.map((x, i) => [...x.locations].map(l => makeLocation(l, i))).flat();
    this.pathfinder = new Pathfinder(this.input.worlds, this.input.settings);
    this.state = {
      items: new Map,
      pools: { required: new Map, nice: new Map, junk: new Map },
      criticalRenewables: new Set,
      placedCount: 0,
    }
    this.pathfinderState = this.pathfinder.run(null);
    this.makeItemPools();
  }

  private retry(cb: () => void) {
    const stateBackup = cloneState(this.state);

    for (;;) {
      try {
        cb();
        return;
      } catch (e) {
        if ((e instanceof LogicError) && this.attempts < this.attemptsMax) {
          this.attempts++;
          this.state = cloneState(stateBackup);
          this.monitor.log(`Logic: Solver (attempt ${this.attempts + 1})`);
          continue;
        } else {
          throw e;
        }
      }
    }
  }

  validate() {
    this.modeValidate = true;
    this.monitor = new Monitor({ onLog: () => {} });
    this.attemptsMax = 10;
    return this.run();
  }

  run() {
    this.monitor.log(`Logic: Solver`);

    /* Place plando items */
    this.placePlando();

    /* Place junk into junkLocations */
    this.placeJunkLocations();

    /* Fix vanilla items */
    this.fixItems();

    /* Place items fixed to default */
    this.fixTokens();
    this.fixFairies();

    /* Place dungeon rewards (when set to dungeon locs) */
    if (['dungeons', 'dungeonsLimited'].includes(this.input.settings.dungeonRewardShuffle)) {
      this.retry(() => {
        this.placeDungeonRewardsInDungeons();
      });
    }

    /* Place semi-shuffled items */
    this.retry(() => {
      this.placeSemiShuffled();
    });

    /* Handle dungeon items */
    const allDungeons = new Set(this.input.worlds.map(x => Object.keys(x.dungeons)).flat());
    for (const dungeon of allDungeons.values()) {
      this.retry(() => {
        this.fixDungeon(dungeon);
      });
    }

    /* Place required items */
    this.retry(() => {
      this.pathfinderState = this.pathfinder.run(null);

      for (;;) {
        /* Pathfind */
        this.pathfinderState = this.pathfinder.run(this.pathfinderState, { inPlace: true, recursive: true, items: this.state.items });

        /* Stop cond */
        if (this.input.settings.logic === 'beatable') {
          if (this.pathfinderState.goal) {
            break;
          }
        }
        if (this.pathfinderState.locations.size === this.locations.length) {
          break;
        }

        /* We need to place a required item */
        this.randomPlace(this.state.pools.required);
      }
    });

    /* At this point we have a beatable game */
    if (!this.modeValidate) {
      this.fillAll();
    }

    return { items: this.state.items };
  }

  private placePlando() {
    for (const loc in this.input.settings.plando.locations) {
      const plandoItemId = this.input.settings.plando.locations[loc];
      if (plandoItemId) {
        const plandoItem = itemByID(plandoItemId);
        for (let player = 0; player < this.input.settings.players; ++player) {
          const item = makePlayerItem(plandoItem, player);
          const l = makeLocation(loc, player);
          this.place(l, item);
          removeItemPools(this.state.pools, item);
        }
      }
    }
  }

  private fixItems() {
    for (const loc of this.input.fixedLocations.values()) {
      const locD = locationData(loc);
      const item = makePlayerItem(this.input.worlds[locD.world as number].checks[locD.id].item, locD.world as number);
      this.place(loc, item);
    }
  }

  private removePlayersItemPools(pools: ItemPools, item: Item) {
    for (let i = 0; i < this.input.settings.players; ++i) {
      const x = makePlayerItem(item, i);
      removeItemPools(pools, x);
    }
  }

  private makeItemPools() {
    this.junkDistribution = new Map;

    /* Assign every item to its sub-pool */
    for (const [pi, amount] of this.input.pool.entries()) {
      /*
       * Some items are both junk and important.
       * Right now it only concerns sticks.
       */
      const junk = ItemHelpers.isJunk(pi.item);

      if (ItemHelpers.isDungeonReward(pi.item) || ItemHelpers.isKey(pi.item) || ItemHelpers.isStrayFairy(pi.item) || ItemGroups.REQUIRED.has(pi.item)) {
        if (junk && ItemHelpers.isItemConsumable(pi.item)) {
          const renewableCount = this.input.renewableJunks.get(pi) || 0;
          const junkCount = amount - renewableCount;

          if (renewableCount) {
            this.state.pools.required.set(pi, renewableCount);
          }
          if (junkCount) {
            this.state.pools.junk.set(pi, junkCount);
            this.junkDistribution.set(pi, junkCount);
          }
        } else {
          this.state.pools.required.set(pi, amount);
        }
      } else if (junk) {
        this.state.pools.junk.set(pi, amount);
        this.junkDistribution.set(pi, amount);
      } else {
        this.state.pools.nice.set(pi, amount);
      }
    }

    /* Remove starting items */
    for (const itemId in this.input.settings.startingItems) {
      const item = itemByID(itemId);
      if (ItemHelpers.isItemUnlimitedStarting(item))
        continue;
      const count = this.input.settings.startingItems[item.id];
      for (let i = 0; i < count; ++i) {
        this.removePlayersItemPools(this.state.pools, item);
      }
    }
  }

  private goldTokenLocations() {
    const locations = new Set<Location>();
    const setting = this.input.settings.goldSkulltulaTokens;
    const shuffleInDungeons = ['dungeons', 'all'].includes(setting);
    const shuffleInOverworld = ['overworld', 'all'].includes(setting);
    for (let worldId = 0; worldId < this.input.worlds.length; ++worldId) {
      const world = this.input.worlds[worldId];
      const skullLocations = Object.keys(world.checks).filter(x => ItemHelpers.isGoldToken(world.checks[x].item));
      const dungeonLocations = Object.values(world.dungeons).reduce((acc, x) => new Set([...acc, ...x]));

      for (const location of skullLocations) {
        const isDungeon = dungeonLocations.has(location);
        if (!((isDungeon && shuffleInDungeons) || (!isDungeon && shuffleInOverworld))) {
          locations.add(makeLocation(location, worldId));
        }
      }
    }

    return locations;
  }

  private houseTokenLocations() {
    const locations = new Set<Location>();
    for (let worldId = 0; worldId < this.input.worlds.length; ++worldId) {
      const world = this.input.worlds[worldId];
      for (const location in world.checks) {
        const item = world.checks[location].item;
        if (ItemHelpers.isHouseToken(item)) {
          locations.add(makeLocation(location, worldId));
        }
      }
    }
    return locations;
  }

  private fixCrossTokens(gs: Set<Location>, house: Set<Location>) {
    if (this.input.settings.housesSkulltulaTokens !== 'cross') {
      return;
    }

    for (let player = 0; player < this.input.settings.players; ++player) {
      const locations = [...gs, ...house].filter(x => locationData(x).world === player);
      const world = this.input.worlds[player];
      const pool = shuffle(this.input.random, locations.map(loc => makePlayerItem(world.checks[locationData(loc).id].item, player)));
      for (const location of locations) {
        const item = pool.pop()!;
        this.place(location, item);
        removeItemPools(this.state.pools, item);
      }
    }
  }

  private fixTokens() {
    const gsLocations = this.goldTokenLocations();
    const houseLocations = this.houseTokenLocations();

    /* Fix the cross tokens */
    this.fixCrossTokens(gsLocations, houseLocations);

    /* Fix the non-shuffled GS */
    for (const location of gsLocations) {
      const locD = locationData(location);
      const world = this.input.worlds[locD.world as number];
      if (!this.state.items.has(location)) {
        const item = makePlayerItem(world.checks[locD.id].item, locD.world as number);
        this.place(location, item);
        removeItemPools(this.state.pools, item);
      }
    }

    /* Fix the non-shuffled house tokens */
    if (this.input.settings.housesSkulltulaTokens !== 'all') {
      for (const location of houseLocations) {
        const locD = locationData(location);
        const player = locD.world as number;
        const world = this.input.worlds[player];
        if (!this.state.items.has(location)) {
          const item = makePlayerItem(world.checks[locD.id].item, player);
          this.place(location, item);
          removeItemPools(this.state.pools, item);
        }
      }
    }
  }

  private fixFairies() {
    for (let player = 0; player < this.input.settings.players; ++player) {
      const world = this.input.worlds[player];
      for (const locationId in world.checks) {
        const location = makeLocation(locationId, player);
        const check = world.checks[locationId];
        const item = check.item;
        const checkItem = makePlayerItem(item, player);
        if (ItemHelpers.isTownStrayFairy(item) && this.input.settings.townFairyShuffle === 'vanilla') {
          this.place(location, checkItem);
          removeItemPools(this.state.pools, checkItem);
        } else if (ItemHelpers.isDungeonStrayFairy(item)) {
          if (check.type === 'sf') {
            if (this.input.settings.strayFairyShuffle !== 'anywhere' && this.input.settings.strayFairyShuffle !== 'ownDungeon') {
              this.place(location, checkItem);
              removeItemPools(this.state.pools, checkItem);
            }
          } else {
            if (this.input.settings.strayFairyShuffle === 'vanilla') {
              this.place(location, checkItem);
              removeItemPools(this.state.pools, checkItem);
            }
          }
        }
      }
    }
  }

  private fixDungeon(dungeon: string) {
    /* handle IST and ST */
    if (['IST', 'Tower'].includes(dungeon)) {
      return;
    }

    const pool = countMapCombine(this.state.pools.required, this.state.pools.nice);

    for (let player = 0; player < this.input.settings.players; ++player) {
      const world = this.input.worlds[player];
      let locationIds = world.dungeons[dungeon];
      if (dungeon === 'ST') {
        locationIds = new Set([...locationIds, ...world.dungeons['IST']]);
      }
      if (dungeon === 'Ganon') {
        locationIds = new Set([...locationIds, ...world.dungeons['Tower']]);
      }
      for (const game of GAMES) {
        for (const baseItem of ['SMALL_KEY', 'BOSS_KEY', 'STRAY_FAIRY', 'MAP', 'COMPASS']) {
          const itemId = gameId(game, baseItem + '_' + dungeon.toUpperCase(), '_');
          if (!Object.hasOwn(Items, itemId))
            continue;
          const item = itemByID(itemId);
          const playerItem = makePlayerItem(item, player);
          const locations = new Set([...locationIds].map(x => makeLocation(x, player)));

          if (ItemHelpers.isSmallKeyHideout(item) && this.input.settings.smallKeyShuffleHideout === 'anywhere') {
            continue;
          } else if (ItemHelpers.isSmallKeyRegularOot(item) && this.input.settings.smallKeyShuffleOot === 'anywhere') {
            continue;
          } else if (ItemHelpers.isSmallKeyRegularMm(item) && this.input.settings.smallKeyShuffleMm === 'anywhere') {
            continue;
          } else if (ItemHelpers.isGanonBossKey(item) && this.input.settings.ganonBossKey === 'anywhere') {
            continue;
          } else if (ItemHelpers.isRegularBossKeyOot(item) && this.input.settings.bossKeyShuffleOot === 'anywhere') {
            continue;
          } else if (ItemHelpers.isRegularBossKeyMm(item) && this.input.settings.bossKeyShuffleMm === 'anywhere') {
            continue;
          } else if (ItemHelpers.isDungeonStrayFairy(item) && this.input.settings.strayFairyShuffle === 'anywhere') {
            continue;
          } else if (ItemHelpers.isMapCompass(item) && this.input.settings.mapCompassShuffle === 'anywhere') {
            continue;
          }

          while (pool.has(playerItem)) {
            this.randomAssumed(pool, { restrictedLocations: locations, forcedItem: playerItem });
            removeItemPools(this.state.pools, playerItem);
          }
        }
      }
    }
  }

  private placeSemiShuffled() {
    const assumedPool = countMapCombine(this.state.pools.required, this.state.pools.nice);
    const pool = countMapArray(assumedPool);
    let songLocations: Location[] = [];
    let rewardsLocations: Location[] = [];
    let items: PlayerItem[] = [];

    if (this.input.settings.songs === 'songLocations') {
      const songs = pool.filter(x => ItemHelpers.isSong(x.item));
      songLocations = this.input.worlds.map((x, i) => [...x.songLocations].map(l => makeLocation(l, i))).flat();
      items = [ ...items, ...songs ];
    }

    if (this.input.settings.dungeonRewardShuffle === 'dungeonBlueWarps') {
      const rewards = pool.filter(x => ItemHelpers.isDungeonReward(x.item));
      rewardsLocations = this.input.worlds.map((x, i) => [...x.warpLocations].map(l => makeLocation(l, i))).flat();
      items = [ ...items, ...rewards ];
    }

    const locations = [...songLocations, ...rewardsLocations];

    if (items.length > locations.length) {
      throw new Error(`Not enough locations for songs/dungeon rewards`);
    }

    /* Place items */
    items = shuffle(this.input.random, items);
    for (;;) {
      /* Get an item */
      const item = items.pop();
      if (!item) {
        break;
      }

      /* Get the player */
      const player = item.player;

      /* Get available locations */
      let restrictedLocations: Location[];
      if (ItemHelpers.isSong(item.item)) {
        restrictedLocations = songLocations;
      } else {
        restrictedLocations = rewardsLocations;
      }

      const playerLocs = restrictedLocations.filter(x => locationData(x).world === player);

      /* Place the item */
      this.randomAssumed(assumedPool, { restrictedLocations: new Set(playerLocs), forcedItem: item });
      removeItemPools(this.state.pools, item);
    }

    /* Fill extra locations with junk */
    this.fillJunk(locations);
  }

  private placeDungeonRewardsInDungeons() {
    const allDungeons: Set<string>[] = [];
    for (let i = 0; i < this.input.settings.players; ++i) {
      allDungeons.push(new Set([...REWARDS_DUNGEONS]));
    }

    const rewards = shuffle(this.input.random, countMapArray(this.state.pools.required)
      .filter(x => ItemHelpers.isDungeonReward(x.item)));

    for (const reward of rewards) {
      let candidates = allDungeons.flatMap((x, i) => [...x].map(y => ({ player: i, dungeon: y })));
      candidates = shuffle(this.input.random, candidates);
      const pool = new Map(this.state.pools.required);
      let error: LogicSeedError | null = null;

      for (const c of candidates) {
        const { player, dungeon } = c;
        const world = this.input.worlds[player];
        /* We have a reward and a dungeon - try to place it */
        let rawLocations = world.dungeons[dungeon];
        if (dungeon === 'ST') {
          rawLocations = new Set([...rawLocations, ...world.dungeons['IST']]);
        }

        /* Exclude song locs in non-songsanity */
        if (this.input.settings.songs === 'songLocations') {
          rawLocations = new Set([...rawLocations].filter(x => !world.songLocations.has(x)));
        }

        const locations = new Set([...rawLocations].map(x => makeLocation(x, player)));
        error = null;
        try {
          this.randomAssumed(pool, { restrictedLocations: locations, forcedItem: reward });
        } catch (err) {
          if (err instanceof LogicSeedError) {
            error = err;
          } else {
            throw err;
          }
        }

        if (!error) {
          /* We placed the reward */
          removeItemPools(this.state.pools, reward);
          if (this.input.settings.dungeonRewardShuffle === 'dungeonsLimited') {
            allDungeons[player].delete(dungeon);
          }
          break;
        }
      }

      if (error) throw error;
    }
  }

  private makePlayerLocations(locs: string[]) {
    const result: Location[] = [];
    for (let i = 0; i < this.input.settings.players; ++i) {
      result.push(...locs.map(x => makeLocation(x, i)));
    }
    return result;
  }

  private placeJunkLocations() {
    const locs = this.makePlayerLocations(this.input.settings.junkLocations);
    this.fillJunk(locs);
  }

  private randomPlace(pool: PlayerItems) {
    if (this.modeValidate) {
      this.forwardFill(pool);
    } else {
      this.randomAssumed(pool);
    }
  }

  private forwardFill(pool: PlayerItems) {
    /* Only used for validation, needs to be fast */
    const items = countMapArray(pool);
    const unplacedLocs = [...this.pathfinderState.locations].filter(x => !this.state.items.has(x));

    if (items.length === 0) {
      const unreachableLocs = this.locations.filter(x => !this.pathfinderState.locations.has(x));
      throw new LogicError(`Unreachable locations: ${unreachableLocs.join(', ')}`);
    }

    if (unplacedLocs.length === 0) {
      throw new LogicSeedError(`No locations left to place items`);
    }

    const item = sample(this.input.random, items);
    const location = sample(this.input.random, unplacedLocs);
    this.place(location, item);
    countMapRemove(pool, item);
  }

  private randomAssumed(pool: PlayerItems, opts?: { restrictedLocations?: Set<Location>, forcedItem?: PlayerItem }) {
    const options = opts || {};

    /* Select a random item from the required pool */
    let requiredItem: PlayerItem | null = null
    if (options.forcedItem) {
      requiredItem = options.forcedItem;
    } else {
      const items = countMapArray(pool);
      if (items.length === 0) {
        const unreachableLocs = this.locations.filter(x => !this.pathfinderState.locations.has(x));
        throw new LogicError(`Unreachable locations: ${unreachableLocs.join(', ')}`);
      }
      requiredItem = sample(this.input.random, items);
    }

    /* Remove the selected item from the required pool */
    countMapRemove(pool, requiredItem);

    let unplacedLocs: Location[] = [];
    if (this.input.settings.logic !== 'beatable') {
      /* Get all assumed reachable locations */
      //const prevNow = microtime.nowDouble();
      const result = this.pathfinder.run(null, { recursive: true, items: this.state.items, assumedItems: pool });
      //console.log("NEG: " + (microtime.nowDouble() - prevNow));

      /* Get all assumed reachable locations that have not been placed */
      unplacedLocs = Array.from(result.locations)
        .filter(location => !this.state.items.has(location));

        if (options.restrictedLocations) {
          unplacedLocs = unplacedLocs.filter(x => options.restrictedLocations!.has(x));
        }

        /* If the item is a critical renewable and it's all locations, ensure it lands correctly */
        if (this.input.settings.logic === 'allLocations' && ItemHelpers.isItemCriticalRenewable(requiredItem.item) && !this.state.criticalRenewables.has(requiredItem)) {
          const world = this.input.worlds[requiredItem.player];
          unplacedLocs = unplacedLocs.filter(x => isLocationRenewable(world, x));
        }

        /* If there is nowhere to place an item, raise an error */
        if (unplacedLocs.length === 0) {
          throw new LogicSeedError(`No reachable locations for item ${requiredItem.item.id}@${requiredItem.player}`);
        }

      /* Select a random location from the assumed reachable locations */
      const location = sample(this.input.random, unplacedLocs);

      /* Place the selected item at the selected location */
      this.place(location, requiredItem);
    } else {
      /* Get all remainig locations */
      if (options.restrictedLocations) {
        unplacedLocs = Array.from(options.restrictedLocations);
      } else {
        unplacedLocs = this.locations;
      }
      unplacedLocs = shuffle(this.input.random, unplacedLocs.filter(x => !this.state.items.has(x)));

      while (unplacedLocs.length) {
        const loc = unplacedLocs.pop()!;
        const newPlacement = new Map(this.state.items);
        newPlacement.set(loc, requiredItem);
        const result = this.pathfinder.run(null, { recursive: true, stopAtGoal: true, items: newPlacement, assumedItems: pool });
        if (result.goal) {
          this.place(loc, requiredItem);
          return;
        }
      }

      throw new LogicSeedError(`No reachable locations for item ${requiredItem}`);
    }
  }

  private fillAll() {
    /* Get all unplaced locs */
    let locs = this.locations.filter(x => !this.state.items.has(x));

    /* Fill using every pool */
    this.fill(locs, this.state.pools.required, true);
    this.fill(locs, this.state.pools.nice, true);
    this.fillJunk(locs);
  }

  private fillJunk(locs: Location[]) {
    /* Fill using the junk pool */
    this.fill(locs, this.state.pools.junk, false);

    /* Junk pool empty - fill with extra junk */
    locs = shuffle(this.input.random, locs.filter(loc => !this.state.items.has(loc)));
    const junkDistribution = countMapArray(this.junkDistribution);
    const junkDistributionRenewable = countMapArray(this.junkDistribution).filter(x => !ItemHelpers.isItemMajor(x.item));
    for (const loc of locs) {
      const locD = locationData(loc);
      const junkPool = isLocationRenewable(this.input.worlds[locD.world as number], loc) ? junkDistributionRenewable : junkDistribution;
      const item = sample(this.input.random, junkPool);
      this.place(loc, item);
    }
  }

  private fill(locs: Location[], pool: PlayerItems, required: boolean) {
    const items = shuffle(this.input.random, countMapArray(pool));
    const locations = shuffle(this.input.random, locs.filter(loc => !this.state.items.has(loc)));

    for (const item of items) {
      if (locations.length === 0) {
        if (required) {
          throw new Error('Too many items');
        }
        break;
      }
      const loc = locations.pop()!;
      this.place(loc, item);
    }
  }

  private place(location: Location, item: PlayerItem) {
    const locD = locationData(location);
    const world = this.input.worlds[locD.world as number];
    if (world.checks[locationData(location).id] === undefined) {
      throw new Error('Invalid Location: ' + location);
    }
    if (this.state.items.has(location)) {
      throw new Error('Location already placed: ' + location);
    }
    this.state.items.set(location, item);
    if (isLocationRenewable(world, location) && ItemHelpers.isItemCriticalRenewable(item.item)) {
      this.state.criticalRenewables.add(item);
    }

    this.state.placedCount++;
    this.monitor.setProgress(this.state.placedCount, this.locations.length);
  }
}
