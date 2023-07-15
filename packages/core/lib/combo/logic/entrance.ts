import { Random, sample, shuffle } from '../random';
import { Settings } from '../settings';
import { DUNGEONS_REGIONS, ExprMap, ExprParsers, World, WorldEntrance, cloneWorld } from './world';
import { Pathfinder } from './pathfind';
import { Monitor } from '../monitor';
import { LogicEntranceError, LogicError } from './error';
import { Expr, exprAnd, exprTrue } from './expr';
import { Location, makeLocation } from './locations';
import { LogicPassSolver } from './solve';
import { PlayerItems } from '../items';

const BOSS_INDEX_BY_DUNGEON = {
  DT: 0,
  DC: 1,
  JJ: 2,
  Forest: 3,
  Fire: 4,
  Water: 5,
  Shadow: 6,
  Spirit: 7,
  WF: 8,
  SH: 9,
  GB: 10,
  IST: 11,
} as {[k: string]: number};

const DUNGEON_INDEX = {
  DT: 0,
  DC: 1,
  JJ: 2,
  Forest: 3,
  Fire: 4,
  Water: 5,
  Shadow: 6,
  Spirit: 7,
  WF: 8,
  SH: 9,
  GB: 10,
  IST: 11,
  ST: 12,
  SSH: 13,
  OSH: 14,
  BotW: 15,
  IC: 16,
  GTG: 17,
  BtW: 18,
  ACoI: 19,
  SS: 20,
  BtWE: 21,
  PF: 22,
  Ganon: 23,
  Tower: 24,
} as {[k: string]: number};;

type PlaceOpts = {
  overworld?: boolean;
  noSongOfTime?: boolean;
  ownGame?: boolean;
};

export class LogicPassEntrances {
  private pathfinder!: Pathfinder;
  private worlds!: World[];

  constructor(
    private readonly input: {
      worlds: World[];
      exprParsers: ExprParsers;
      settings: Settings;
      random: Random;
      monitor: Monitor;
      fixedLocations: Set<Location>,
      pool: PlayerItems;
      renewableJunks: PlayerItems;
    },
  ) {
  }

  private getExpr(worldId: number, original: string) {
    const world = this.worlds[worldId];
    const originalWorld = this.input.worlds[worldId];
    const entrance = world.entrances.get(original)!;
    const from = originalWorld.areas[entrance.from];
    const expr = from.exits[entrance.to];
    if (!expr) {
      throw new Error(`No expr for ${original}`);
    }
    return expr;
  }

  private isAssignableNew(worldId: number, original: string, replacement: string, opts?: { ownGame?: boolean, locations?: string[] }) {
    const world = this.worlds[worldId];
    const originalWorld = this.input.worlds[worldId];
    const originalEntrance = world.entrances.get(original)!;
    const replacementEntrance = world.entrances.get(replacement)!;
    const dungeon = originalWorld.areas[replacementEntrance.to].dungeon!;

    /* Reject wrong game */
    if (opts?.ownGame) {
      if (originalEntrance.game !== replacementEntrance.game) {
        return false;
      }
    }

    /* Not all locations */
    if (this.input.settings.logic !== 'allLocations') {
      return true;
    }

    /* Apply an override */
    world.areas[originalEntrance.from].exits[replacementEntrance.to] = this.getExpr(worldId, original);

    /* If the dungeon is ST or IST, we need to allow the other dungeon */
    if (dungeon === 'ST') {
      world.areas['OOT SPAWN'].exits['MM Stone Tower Temple Inverted'] = exprTrue();
    }
    if (dungeon === 'IST') {
      world.areas['OOT SPAWN'].exits['MM Stone Tower Temple'] = exprTrue();
    }

    /* Check if the new world is valid */
    const pathfinderState = this.pathfinder.run(null, { singleWorld: worldId, ignoreItems: true, recursive: true });

    /* Restore the override */
    delete world.areas[originalEntrance.from].exits[replacementEntrance.to]
    delete world.areas['OOT SPAWN'].exits['MM Stone Tower Temple Inverted'];
    delete world.areas['OOT SPAWN'].exits['MM Stone Tower Temple'];

    /* Get the list of required locations */
    let locations: string[];
    if (opts?.locations) {
      locations = opts.locations;
    } else if (['ST', 'IST'].includes(dungeon)) {
      locations = [...world.dungeons['ST'], ...world.dungeons['IST']];
    } else {
      locations = Array.from(world.dungeons[dungeon]);
    }

    /* Turn into world 0 locations */
    const worldLocs = locations.map(l => makeLocation(l, 0));

    /* Check if the new world is valid */
    if (!(worldLocs.every(l => pathfinderState.locations.has(l))))
      return false;

    /* Ganon's tower check */
    if (dungeon === 'Tower' && ['ganon', 'both'].includes(this.input.settings.goal) && !pathfinderState.ws[0].events.has('OOT_GANON'))
      return false;

    return true;
  }

  private fixBosses(worldId: number) {
    const world = this.worlds[worldId];
    const bossEntrances = [...world.entrances.values()].filter(e => e.type === 'boss');
    const bossEntrancesByDungeon = new Map<string, WorldEntrance>();
    const bossEvents = new Map<string, ExprMap>();
    const bossAreas = new Map<string, string[]>();
    const bossLocations = new Map<string, string[]>();

    /* Collect every boss event */
    for (const a in world.areas) {
      const area = world.areas[a];
      const dungeon = area.dungeon!;
      if (area.boss) {
        /* Events */
        if (!bossEvents.has(dungeon)) {
          bossEvents.set(dungeon, {});
        }
        const oldEvents = bossEvents.get(dungeon)!;
        bossEvents.set(dungeon, { ...oldEvents, ...area.events });

        /* Areas */
        if (!bossAreas.has(dungeon)) {
          bossAreas.set(dungeon, []);
        }
        bossAreas.get(dungeon)!.push(a);

        /* Locations */
        if (!bossLocations.has(dungeon)) {
          bossLocations.set(dungeon, []);
        }
        const locs = bossLocations.get(dungeon)!;
        for (const l in area.locations) {
          locs.push(l);
        }

        /* Remove the event */
        area.events = {};
      }
    }

    /* Collect the entrances and delete the original ones */
    for (const e of bossEntrances) {
      const areaFrom = world.areas[e.from];
      const areaTo = world.areas[e.to];

      /* We have a boss entrance */
      const dungeon = areaTo.dungeon!;
      bossEntrancesByDungeon.set(dungeon, e);

      /* Remove the entrance */
      delete areaFrom.exits[e.to];
    }

    /* Actually shuffle bosses */
    const bosses = shuffle(this.input.random, Array.from(bossEntrancesByDungeon.keys()));
    const bossesToPlace = new Set(bosses);
    for (const srcBoss of bosses) {
      const src = bossEntrancesByDungeon.get(srcBoss)!;
      const candidates = shuffle(this.input.random, Array.from(bossesToPlace));
      let dstBoss: string | null = null;
      for (const boss of candidates) {
        const dst = bossEntrancesByDungeon.get(boss)!;
        if (this.isAssignableNew(worldId, src.id, dst.id, { ownGame: this.input.settings.erBoss === 'ownGame', locations: bossLocations.get(boss)! })) {
          dstBoss = boss;
          break;
        }
      }
      if (dstBoss === null) {
        throw new LogicEntranceError(`Nowhere to place boss ${srcBoss}`);
      }
      bossesToPlace.delete(dstBoss);

      /* We found a boss - place it */
      const dst = bossEntrancesByDungeon.get(dstBoss)!;
      this.place(worldId, src.id, dst.id, { noSongOfTime: true });

      /* Mark the boss */
      world.bossIds[BOSS_INDEX_BY_DUNGEON[dstBoss]] = BOSS_INDEX_BY_DUNGEON[srcBoss];

      /* Add the events */
      const areaNames = bossAreas.get(dstBoss)!;
      const lastAreaName = areaNames[areaNames.length - 1];
      const lastArea = world.areas[lastAreaName];
      lastArea.events = { ...lastArea.events, ...bossEvents.get(srcBoss)! };

      /* Change the associated dungeon */
      for (const a of bossAreas.get(dstBoss)!) {
        const area = world.areas[a];
        area.dungeon = srcBoss;
        area.region = DUNGEONS_REGIONS[srcBoss];

        for (const loc in area.locations) {
          world.regions[loc] = DUNGEONS_REGIONS[srcBoss];
          world.dungeons[dstBoss].delete(loc);
          world.dungeons[srcBoss].add(loc);
        }
      }
    }
  }

  private fixDungeons(worldId: number) {
    const world = this.worlds[worldId];
    /* Set the dungeon list */
    let shuffledDungeons = new Set(['DT', 'DC', 'JJ', 'Forest', 'Fire', 'Water', 'Shadow', 'Spirit', 'WF', 'SH', 'GB', 'ST', 'IST']);
    if (this.input.settings.erMinorDungeons) {
      ['BotW', 'IC', 'GTG'].forEach(d => shuffledDungeons.add(d));
    }
    if (this.input.settings.erGanonCastle) {
      shuffledDungeons.add('Ganon');
    }
    if (this.input.settings.erGanonTower) {
      shuffledDungeons.add('Tower');
    }
    if (this.input.settings.erSpiderHouses) {
      ['SSH', 'OSH'].forEach(d => shuffledDungeons.add(d));
    }
    if (this.input.settings.erPirateFortress) {
      shuffledDungeons.add('PF');
    }
    if (this.input.settings.erBeneathWell) {
      ['BtW', 'BtWE'].forEach(d => shuffledDungeons.add(d));
    }
    if (this.input.settings.erIkanaCastle) {
      shuffledDungeons.add('ACoI');
    }
    if (this.input.settings.erSecretShrine) {
      shuffledDungeons.add('SS');
    }

    /* Get the transitions and exprs */
    const dungeonTransitions = [...world.entrances.values()]
      .filter(e => e.type === 'dungeon')
      .filter(e => shuffledDungeons.has(world.areas[e.from].dungeon!) || shuffledDungeons.has(world.areas[e.to].dungeon!));

    const dungeonEntrances = new Map<string, WorldEntrance>();

    for (const e of dungeonTransitions) {
      /* Get the exit */
      const exit = world.entrances.get(e.reverse!)!;

      /* Get the various areas */
      const entranceAreaFrom = world.areas[e.from];
      const entranceAreaTo = world.areas[e.to];
      const exitAreaFrom = world.areas[exit.from];

      /* Save the entrance */
      dungeonEntrances.set(entranceAreaTo.dungeon!, e);

      /* Remove the transitions */
      delete entranceAreaFrom.exits[e.to];
      delete exitAreaFrom.exits[exit.to];
    }

    /* Assign the dungeons */
    const dungeons = shuffle(this.input.random, Array.from(shuffledDungeons));
    const dungeonsDest = new Set(dungeons);
    while (dungeons.length > 0) {
      const dungeon = dungeons.pop()!;
      const candidates = shuffle(this.input.random, Array.from(dungeonsDest));
      let destDungeon: string | null = null;

      for (const c of candidates) {
        const src = dungeonEntrances.get(dungeon)!.id;
        const dst = dungeonEntrances.get(c)!.id;
        const assignable = this.isAssignableNew(worldId, src, dst, { ownGame: this.input.settings.erDungeons === 'ownGame' });
        if (assignable) {
          destDungeon = c;
          break;
        }
      }

      if (!destDungeon) {
        throw new LogicError('Unable to assign a dungeon to location: ' + dungeon);
      }

      /* Change the world */
      dungeonsDest.delete(destDungeon);
      const sourceEntranceId = dungeonEntrances.get(dungeon)!.id;
      const destEntranceId = dungeonEntrances.get(destDungeon)!.id;

      this.place(worldId, sourceEntranceId, destEntranceId, { noSongOfTime: true });

      /* Store the dungeon */
      world.dungeonIds[DUNGEON_INDEX[destDungeon]] = DUNGEON_INDEX[dungeon];
    }
  }

  private songOfTime(e: Expr): Expr {
    const subcond = this.input.exprParsers.mm.parse('can_reset_time');
    return exprAnd([e, subcond]);
  }

  private placeSingle(worldId: number, original: string, replacement: string, opts?: PlaceOpts) {
    opts = opts || {};
    const world = this.worlds[worldId];
    const entranceOriginal = world.entrances.get(original)!;
    const entranceReplacement = world.entrances.get(replacement)!;

    /* Change the world */
    let expr = this.getExpr(worldId, original);
    if (entranceOriginal.game === 'oot' && entranceReplacement.game === 'mm') {
      if (opts.overworld) {
        world.areas[entranceOriginal.from].exits['MM GLOBAL'] = expr;
      }
      if (!opts.noSongOfTime) {
        expr = this.songOfTime(expr);
      }
    }
    world.areas[entranceOriginal.from].exits[entranceReplacement.to] = expr;

    /* Mark the override */
    world.entranceOverrides.set(original, replacement);
  }

  private place(worldId: number, original: string, replacement: string, opts?: PlaceOpts) {
    const world = this.worlds[worldId];
    const entranceOriginal = world.entrances.get(original)!;
    const entranceReplacement = world.entrances.get(replacement)!;

    this.placeSingle(worldId, original, replacement, opts);
    if (entranceOriginal.reverse && entranceReplacement.reverse) {
      this.placeSingle(worldId, entranceReplacement.reverse, entranceOriginal.reverse, opts);
    }
  }

  private placePool(worldId: number, pool: string[], opts?: PlaceOpts) {
    const world = this.worlds[worldId];
    /* Get overworld entrances */
    const entrances = new Set([...world.entrances.values()].filter(e => pool.includes(e.type)));

    /* Delete the overworld entrances from the world */
    for (const e of entrances) {
      delete world.areas[e.from].exits[e.to];
      const reverse = e.reverse;
      if (reverse) {
        const r = world.entrances.get(reverse)!;
        delete world.areas[r.from].exits[r.to];
      }
    }

    /* Shuffle the entrances */
    const shuffledEntrances = shuffle(this.input.random, [...entrances]);

    /* Apply the entrances */
    for (let e of shuffledEntrances) {
      let candidates = [...entrances];
      if (opts?.ownGame) {
        candidates = candidates.filter(c => c.game === e.game);
      }
      const newE = sample(this.input.random, candidates);
      this.place(worldId, e.id, newE.id, opts);
      entrances.delete(newE);
    }
  }

  private placeRegions(worldId: number) {
    this.placePool(worldId, ['region'], { overworld: true, ownGame: this.input.settings.erRegions === 'ownGame' });
  }

  private placeIndoors(worldId: number) {
    const pool = ['indoors'];
    if (this.input.settings.erIndoorsExtra) {
      pool.push('indoors-extra');
    }
    this.placePool(worldId, pool, { ownGame: this.input.settings.erIndoors === 'ownGame' });
  }

  private propagateRegionsStep(worldId: number) {
    const world = this.worlds[worldId];
    let changed = false;
    for (const areaName of Object.keys(world.areas)) {
      const a = world.areas[areaName];
      if (a.region === 'NONE' || a.region === 'ENTRANCE')
        continue;
      /* We need to propagate the region */
      for (const exitName of Object.keys(a.exits)) {
        const exitArea = world.areas[exitName];
        if (exitArea.region === 'ENTRANCE') {
          exitArea.region = a.region;
          for (const loc of Object.keys(exitArea.locations)) {
            if (world.regions[loc] === 'ENTRANCE') {
              world.regions[loc] = a.region;
            }
          }
          changed = true;
        }
      }
    }
    return changed;
  }

  private propagateRegions() {
    /* Propagate regions */
    for (let i = 0; i < this.worlds.length; ++i) {
      for (;;) {
        if (!this.propagateRegionsStep(i)) {
          break;
        }
      }
    }
  }

  private validate() {
    if (this.input.settings.logic === 'none')
      return;
    const pathfinderState = this.pathfinder.run(null, { ignoreItems: true, recursive: true });

    /* We want to make sure everything that needs to is reachable */
    if (!pathfinderState.goal) {
      throw new LogicEntranceError('Goal is not reachable');
    }

    if (this.input.settings.logic === 'allLocations') {
      const allLocsCount = this.worlds.map(x => x.locations.size).reduce((a, b) => a + b, 0);
      if (pathfinderState.locations.size < allLocsCount) {
        throw new LogicEntranceError('Not all locations are reachable');
      }
    }

    /* We don't want child to reach the Fairy OGC exit, and the other way around too */
    const forbiddenAreasChild = ['OOT Near Fairy Fountain Defense'];
    const forbiddenAreasAdult = ['OOT Near Fairy Fountain Din'];

    for (const area of forbiddenAreasChild) {
      if (pathfinderState.ws[0].areas.child.has(area)) {
        throw new LogicEntranceError(`Child can reach ${area}`);
      }
    }

    for (const area of forbiddenAreasAdult) {
      if (pathfinderState.ws[0].areas.adult.has(area)) {
        throw new LogicEntranceError(`Adult can reach ${area}`);
      }
    }

    /* Validate using the solver */
    const solver = new LogicPassSolver({ ...this.input, worlds: this.worlds });
    solver.validate();
  }

  private runAttempt() {
    /* Init */
    this.worlds = [];
    const worldsCount = this.input.settings.distinctWorlds ? this.input.worlds.length : 1;
    for (let worldId = 0; worldId < worldsCount; ++worldId) {
      const world = cloneWorld(this.input.worlds[worldId]);
      world.dungeonIds = Object.values(DUNGEON_INDEX);
      world.bossIds = Object.values(BOSS_INDEX_BY_DUNGEON);
      this.worlds.push(world);
    }
    if (!this.input.settings.distinctWorlds) {
      for (let i = 1; i < this.input.worlds.length; ++i) {
        this.worlds.push(this.worlds[0]);
      }
    }

    let anyEr = false;
    this.pathfinder = new Pathfinder(this.worlds, this.input.settings);

    for (let i = 0; i < worldsCount; ++i) {
      if (this.input.settings.erRegions !== 'none') {
        anyEr = true;
        this.placeRegions(i);
      }

      if (this.input.settings.erIndoors !== 'none') {
        anyEr = true;
        this.placeIndoors(i);
      }

      if (this.input.settings.erDungeons !== 'none') {
        anyEr = true;
        this.fixDungeons(i);
      }

      if (this.input.settings.erBoss !== 'none') {
        anyEr = true;
        this.fixBosses(i);
      }

      if (anyEr) {
        this.validate();
      }
    }

    this.propagateRegions();

    return { worlds: this.worlds };
  }

  run() {
    let attempts = 1;

    for (;;) {
      try {
        this.input.monitor.log(`Logic: Entrances (attempt ${attempts})`);
        return this.runAttempt();
      } catch (e) {
        if (!(e instanceof LogicError) || attempts >= 1000)
          throw e;
        if (e.stack) {
          this.input.monitor.debug(e.stack);
        }
        attempts++;
      }
    }
  }
};

