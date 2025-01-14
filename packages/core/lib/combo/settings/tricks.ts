import { Game } from '../config';

/*
 * Each trick should have a user friendly name, a tooltip to explain the trick's function within the logic,
 * and if possible, some supporting documentation like a youtube video or article detailing the trick further for beginners.
 */

/* Typing for each individual trick's values */
export type Trick = {
  game: Game;
  name: string;
  glitch?: boolean;
  tooltip?: string;
  linkVideo?: string;
  linkText?: string;
};

/* Typing for the whole object of tricks */
export type Tricks = {
  [key: string]: Trick;
};

/** Typing for each key of the TRICKS object */
export type TrickKey = string;

/**
 * All the tricks in the randomizer.
 */
export const TRICKS: Tricks = {
  OOT_LENS: {
    game: 'oot',
    name: 'Fewer Lens Requirements (OoT)',
    tooltip: 'Doing things that would normally require Lens no longer will, except for Treasure Chest Game and Haunted Wasteland.',
  },
  OOT_TUNICS: {
    game: 'oot',
    name: 'Fewer Tunic Requirements (OoT)',
    tooltip: 'Most things that would normally require Tunics no longer will. Fire Temple past the big lava room, Volvagia, Fire Trial without Silver Rupee shuffle, and Water Temple central pillar still require Tunics.',
  },
  OOT_HIDDEN_GROTTOS: {
    game: 'oot',
    name: 'Hidden Grottos (OoT) without Stone of Agony',
    tooltip: 'All hidden grottos will no longer require the Stone of Agony for logic.',
    linkText: 'https://www.zeldadungeon.net/wiki/Ocarina_of_Time_Secret_Grottos',
  },
  MM_HIDDEN_GROTTOS: {
    game: 'mm',
    name: 'Hidden Grottos (MM) without Stone of Agony',
    tooltip: 'All hidden grottos will no longer require the Stone of Agony for logic.',
  },
  OOT_MIDO_SKIP: {
    game: 'oot',
    name: 'Backflip Over Mido',
    tooltip: 'As Adult, Mido can be backflipped over from the front with a specific angle. It can be done with nothing, but logic will expect a first-person item to make it easier.',
    linkVideo: 'https://www.youtube.com/watch?v=ll8e7h9vFag&ab_channel=ZeldaSpeedRuns',
  },
  OOT_MAN_ON_ROOF: {
    game: 'oot',
    name: 'Man on Roof with Nothing',
    tooltip: 'Child can sidehop off the watchtower to reach this man, and Adult can jump onto the Potion Shop roof from the gate to Death Mountain to then reach the man.',
    linkVideo: 'https://www.youtube.com/watch?v=3-1BY24Fu-Y&ab_channel=dotzo',
  },
  OOT_BLIND_WASTELAND: {
    game: 'oot',
    name: 'Haunted Wasteland Lensless',
    tooltip: 'Turning this on may expect the player to cross the wasteland both ways without the Poe Guide.',
    linkVideo: 'https://www.youtube.com/watch?v=h5_EiPTjdEk&ab_channel=DanielBaamonde',
  },
  OOT_DEKU_SKIP: {
    game: 'oot',
    name: 'Deku Tree B1 Skip',
    tooltip: 'Child is able to jump to the upper portion of the basement without going around.',
    linkVideo: 'https://www.youtube.com/watch?v=TSAk3x-zHcI&ab_channel=AnnoyedTortoise',
  },
  OOT_DC_JUMP: {
    game: 'oot',
    name: "Dodongo's Cavern Upper Adult Jump",
    tooltip: 'Adult can jump to the upper platforms in the Bomb Bag room, removing the need for a projectile.',
    linkVideo: 'https://www.youtube.com/watch?v=LEvlWAvpqfo&ab_channel=I_Buy_Slingshats',
  },
  OOT_FOREST_HOOK: {
    game: 'oot',
    name: 'Forest Temple Garden Vines with Hookshot',
    tooltip: 'Link is able to hookshot to the vines above the east courtyard using only Hookshot.',
    linkVideo: 'https://www.youtube.com/watch?v=Lr3TpVdNg2k&ab_channel=dotzo',
  },
  OOT_HAMMER_WALLS: {
    game: 'oot',
    name: 'Hammer Through Walls',
    tooltip: 'Using the Megaton Hammer against a wall will cause Link to hammer through it. This can be used to hit some switches through walls.',
    linkVideo: 'https://www.youtube.com/watch?v=R18uZdwXRPA&ab_channel=Numbers',
  },
  OOT_VOLCANO_HOVERS: {
    game: 'oot',
    name: 'Volcano Item with Hover Boots',
    tooltip: "Rolling with Hover Boots next to Darunia's room can get you to the volcano without the bean plant.",
    linkVideo: 'https://www.youtube.com/watch?v=rbxaO5lNUTU&ab_channel=StoneeBadLuck',
  },
  OOT_NIGHT_GS: {
    game: 'oot',
    name: "Nighttime Gold Skulltulas without Sun's Song",
    tooltip: "This will make it so that Gold Skulltulas that only appear at night will no longer expect Sun's Song to get, meaning you will need to wait for nightfall.",
  },
  OOT_DOMAIN_CUCCO: {
    game: 'oot',
    name: "Enter Child Zora's Domain with Cucco",
    tooltip: "Child can carry a cucco from the front or plateau of Zora's River and fly behind the waterfall.",
    linkVideo: 'https://www.youtube.com/watch?v=shR5yahUifs&ab_channel=EmptyGarbageCan',
  },
  OOT_DOMAIN_HOVER: {
    game: 'oot',
    name: "Enter Zora's Domain using Hover Boots",
    tooltip: 'Rolling once with Hover Boots at an angle can get you enough distance to get behind the waterfall.',
    linkVideo: 'https://www.youtube.com/watch?v=y4iK6uiw0Xs&ab_channel=ZeldaSpeedRuns',
  },
  OOT_WATER_LONGSHOT: {
    game: 'oot',
    name: 'Drain Water Temple using Longshot',
    tooltip: 'Using Longshot, Link can hookshot to the torches at the bottom in front of the room he meets Ruto.',
    linkVideo: 'Link Needed',
  },
  OOT_SAND_RIVER_NOTHING: {
    game: 'oot',
    name: 'Cross the River of Sand with Nothing',
    tooltip: 'By backwalking across the left side, one can cross the River of Sand forwards. Going backwards, one can backwalk at a slight angle.',
    linkVideo: 'https://www.youtube.com/watch?v=PLHJY1KRvtg&ab_channel=dotzo',
  },
  OOT_SHADOW_FIRE_ARROW: {
    game: 'oot',
    name: 'Enter Shadow Temple using Fire Arrows',
    tooltip: 'With a precise setup, it is possible to light all of the torches for the Shadow Temple Entrance with a mix of Fire Arrows and normal arrows. The timing is very tight.',
    linkVideo: 'https://www.youtube.com/watch?v=im3IXe__8ww&ab_channel=Exodus122',
  },
  OOT_KZ_SKIP: {
    game: 'oot',
    name: 'Skip King Zora as Adult',
    tooltip: 'Adult can jump onto the fence next to King Zora and then jump down behind him.',
    linkVideo: 'https://www.youtube.com/watch?v=rfp9MZPgme4&ab_channel=Kryal',
  },
  OOT_LOST_WOODS_ADULT_GS: {
    game: 'oot',
    name: 'Lost Woods Adult GS without Magic Beans',
    tooltip: "This Gold Skulltula Token can be collected using Hookshot at a precise angle after killing it with Bow, Din's Fire, Bombchus, or Longshot.",
    linkVideo: 'https://www.youtube.com/watch?v=YFLxEw2_PBw&ab_channel=dotzo',
  },
  OOT_WINDMILL_HP_NOTHING: {
    game: 'oot',
    name: 'Windmill HP as Adult with Nothing',
    tooltip: 'Adult can jump off the small stone posts to reach the central spinning platform.',
    linkVideo: 'https://www.youtube.com/watch?v=vDl7lr4Ecv8&ab_channel=dotzo',
  },
  OOT_LAB_DIVE_NO_GOLD_SCALE: {
    game: 'oot',
    name: 'Laboratory Dive without Golden Scale',
    tooltip: 'Using Iron Boots and Hookshot, it is possible to obtain this check without the Golden Scale.',
    linkVideo: 'https://www.youtube.com/watch?v=7ihH-wBP0PM&ab_channel=dotzo',
  },
  OOT_LAB_WALL_GS: {
    game: 'oot',
    name: 'Laboratory Wall GS with Jump Slash',
    tooltip: 'It is possible to obtain this Gold Skulltula by jump slashing it, then jump slashing into the token.',
    linkVideo: 'https://www.youtube.com/watch?v=ThUyxj3psSM&ab_channel=Link98OoT',
  },
  OOT_PASS_COLLISION: {
    game: 'oot',
    name: 'Pass through Visible One-Way Collisions',
    tooltip: "Some walls and gates, despite their appearance, only have collision on one side. Turning this on may expect you to know of these and walk through them. Some examples are the Kakariko Gate as Child and the awning behind Impa's House.",
    linkVideo: 'https://www.youtube.com/watch?v=OnnNUZVW8Gw&ab_channel=StoneeBadLuck',
  },
  OOT_DMT_RED_ROCK_GS: {
    game: 'oot',
    name: 'DMT Red Rock Skulls without Hammer',
    tooltip: 'Adult can obtain the Gold Skulltulas on Death Mountain without the Hammer. The upper one can be backflipped into after spin attacking it. The lower one can be hookshotted or jumped onto from above to collect.',
    linkVideo: 'https://www.youtube.com/playlist?list=PL7AtrmSRvw6LAJRTwCEb0VzuOFj9BpPZ-',
  },
  OOT_DEAD_HAND_STICKS: {
    game: 'oot',
    name: 'Child Dead Hand without Kokiri Sword',
    tooltip: 'Fighting Dead Hand as Child with Deku Sticks requires all 10 if you only use slashes. This trick removes the mercy of fighting it with a sword.',
    linkVideo: 'https://www.youtube.com/watch?v=gROY5Y66xeA&ab_channel=dotzo',
  },
  OOT_BFA_MUDWALLS: {
    game: 'oot',
    name: 'Break Mud Walls with Blue Fire Arrows',
    tooltip: 'Blue Fire has the ability to break mud walls. Turning this on will allow the Blue Fire Arrows to be logical for breaking these.',
    linkVideo: 'https://www.youtube.com/watch?v=XXAFs1cfRrc&ab_channel=ThatWelshKaren',
  },
  OOT_JABU_BOSS_HOVER: {
    game: 'oot',
    name: 'Access Jabu-Jabu Pre-Boss using Hover Boots',
    tooltip: 'By using Hover Boots, Link can backwalk off the rising platform while carrying the box to skip needing to kill the Parasites and Big Octo.',
  },
  OOT_SPIRIT_CHILD_HOVER: {
    game: 'oot',
    name: 'Access Adult Spirit as Child using Hover Boots',
    tooltip: 'Using Ageless Hover Boots, Child is able to backwalk off the Armos statue to reach the Adult side.',
  },
  OOT_VALLEY_GATE_HOVER: {
    game: 'oot',
    name: 'Reach Gerudo Fortress as Child using Hover Boots',
    tooltip: 'Using Ageless Hover Boots, it is possible to backwalk off the small pegs near the gate, then backflip over it.',
  },
  OOT_MQ_ICE_SCARE_NOTHING: {
    game: 'oot',
    name: 'MQ Ice Cavern GS without Scarecrow or Hover Boots',
    tooltip: 'The Gold Skulltula next to Pierre can be reached using a precise jump.',
  },
  OOT_MQ_ICE_SCARE_HOVER: {
    game: 'oot',
    name: 'MQ Ice Cavern GS using only Hover Boots',
    tooltip: 'The Gold Skulltula next to Pierre can be reached using only Hover Boots and somewhat precise platforming.',
    linkVideo: 'https://www.youtube.com/watch?v=RaggmtTEBuM',
  },
  OOT_MQ_GTG_FLAMES: {
    game: 'oot',
    name: 'MQ Gerudo Training Grounds Lava Room Walk along Flame Circles',
    tooltip: 'It is possible to walk along and jump between the flame rings in the lava room. Footing is very tiny and precise. This can allow reaching the underwater rupees without Fire Arrows and Hookshot.',
  },
  OOT_FORTRESS_JUMPS: {
    game: 'oot',
    name: 'Jump up to higher ledges outside Gerudo Fortress',
    tooltip: 'Outside the Fortress, Adult can jump to the upper vines without needing to go through the kitchen. Child can do the same after going through the kitchen.',
  },
  OOT_COLOSSUS_GS_NO_BEAN: {
    game: 'oot',
    name: 'Desert Colossus Plateau GS without Bean Plant',
    tooltip: 'It is possible to hookshot the Gold Skulltula without using the bean plant, but the Leevers make it a bit difficult to do.',
  },
  OOT_ENTER_JABU: {
    game: 'oot',
    name: 'Enter Jabu-Jabu with Head Collision',
    tooltip: 'Jabu-Jabu has a piece of collision on his head that will trigger the loading zone for the dungeon. Turning this on may expect you to exploit this by using a jump attack, Ageless Hookshot Anywhere, or Climb Anywhere and Hover Boots.',
  },
  OOT_JABU_BOSS_HIGH_SWITCH: {
    game: 'oot',
    name: 'Jabu Boss Switch without Boomerang or Climb Anywhere',
    tooltip: "It is possible to hit the switch before Jabu-Jabu's boss using Bow, Slingshot, Longshot, Bombchu or Hover Boots + Bombs. Having Climb Anywhere logical makes this trickless.",
  },
  OOT_WATER_REVERSE_RIVER: {
    game: 'oot',
    name: 'Water Temple Reverse River with Hookshot Anywhere',
    tooltip: 'Using Hookshot Anywhere, Link can hookshot up from the Dragon Statue room, and then hookshot through the gate blocking the river before it has loaded.',
  },
  OOT_WATER_PIT_GS_CHU: {
    game: 'oot',
    name: 'Water Temple Large Pit GS with Bombchu and Climb Anywhere',
    tooltip: 'It is possible to kill the Gold Skulltula using a Bombchu with a precise angle and timing. This is only relevant if Climb Anywhere is logical.',
  },
  OOT_SHADOW_BOAT_EARLY: {
    game: 'oot',
    name: 'Reach Shadow Temple Boat with Climb Anywhere',
    tooltip: 'From the Spinning Scythes room, Link can climb the fence at the boat shortcut and pop up on top next to Pierre.',
  },
  OOT_SPIRIT_BOSS_CLIMB_NO_HOOK: {
    game: 'oot',
    name: 'Reach Twinrova using Climb Anywhere and Hover Boots',
    tooltip: 'It is possible to reach Twinrova without Hookshot by climbing to the top of the statue, then using Hover Boots and jump slashing to the gate.',
    linkVideo: 'https://www.youtube.com/watch?v=hobCEU1bY-s',
  },
  OOT_ZR_FALLS_HOOK: {
    game: 'oot',
    name: "Use Hookshot Anywhere to get past the Zora's River Waterfall",
    tooltip: 'Hookshot Anywhere can be used next to the shortcut to get behind the waterfall.',
  },
  OOT_DC_BOULDER: {
    game: 'oot',
    name: "Skip Dodongo Cavern's Boulder using Ageless Hookshot Anywhere",
    tooltip: 'Using Ageless Hookshot Anywhere, Child can hookshot through the small hole at the bottom right next to the soft soil. Doing this can get you past the boulder without blowing it up.',
  },
  OOT_LAKE_SHORTCUT: {
    game: 'oot',
    name: "Move Between Lake Hylia and Zora's Domain with Ageless Hookshot Anywhere",
    tooltip: "Ageless Hookshot Anywhere can be used to access the shortcuts in Lake Hylia and Zora's Domain, but the angle is a bit precise. Doing this with Longshot is trickless.",
  },
  OOT_JJB_BOXLESS: {
    game: 'oot',
    name: 'Access Jabu-Jabu Pre-Boss without a box',
    tooltip: 'By doing a jump slash and a precise roll, it is possible to get through the door without a box.',
  },
  OOT_TENT_CHILD: {
    game: 'oot',
    name: 'Enter the Gerudo Valley Tent as Child',
    tooltip: "The Gerudo Valley Tent is only present as Adult, however its entrance is still there as Child. Turning this on may expect the player to know where it is and use it for progress in Interior ER.",
  },
  OOT_WELL_ADULT_TT: {
    game: 'oot',
    name: 'Enter Bottom of the Well as Adult with Time Travel',
    tooltip: 'Entering the drained well as Child and turning Adult behind the blockage grants access to that entrance as Adult. Useful in Entrance Randomizer.',
  },
  OOT_ADULT_GALLERY_TT: {
    game: 'oot',
    name: 'Enter Adult Shooting Gallery as Child with Time Travel',
    tooltip:'It is possible to turn from Child to Adult inside of the construction area, get close to the loading zone, and turn back to Child to enter the loading zone inside of the brick stack. Useful in Entrance Randomizer.',
  },
  OOT_GTG_CHILD_TT: {
    game: 'oot',
    name: 'Enter Gerudo Training Grounds as Child with Time Travel',
    tooltip: 'Turning from Adult to Child inside of the doorframe puts you behind the gates, granting access to that entrance as Child. Useful in Entrance Randomizer.',
  },
  OOT_REVERSE_DAMPE: {
    game: 'oot',
    name: "Navigate Dampé's Grave in Reverse",
    tooltip: "Using Climb Anywhere or Hookshot Anywhere and Age Swap, it is possible to get past the final door of Dampé's Grave and then navigate to the entrance in complete darkness.",
  },
  OOT_GANON_FAIRY_TT: {
    game: 'oot',
    name: "Ganon's Great Fairy with Age Swap and without Gold Gauntlets",
    tooltip: 'Entering the Hyrule Castle Great Fairy entrance as Child, age swapping there, walking out as Adult and then walking right back in grants access to the Outside Ganon\'s Castle Great Fairy entrance.',
  },
  OOT_GANON_CASTLE_ENTRY: {
    game: 'oot',
    name: "Enter Ganon's Castle with Longshot Anywhere",
    tooltip: 'While easy, doing this can bypass a huge chunk of potential logic if this trick is not enabled.',
  },
  OOT_SHADOW_TEMPLE_STICKS: {
    game: 'oot',
    name: 'Enter Shadow Temple with Sticks & Fire Arrows',
    tooltip: 'Turning this on will enable Fire Arrows and Ageless Sticks to enter Shadow Temple in logic.',
    linkVideo: 'Link Needed',
  },
  OOT_WATER_GOLD_SCALE: {
    game: 'oot',
    name: 'Enter Water Temple with Golden Scale and Longshot',
    tooltip: 'It is possible to enter Water Temple without Iron Boots by using the Golden Scale.',
  },
  OOT_COURTYARD_FROM_GANON: {
    game: 'oot',
    name: "Enter Zelda's Courtyard using Age Swap in Ganon's Castle",
    tooltip: "Exiting Ganon's Castle as Child puts you in front of the crawlspace to Zelda. This will allow Age Swap to be logical for doing this.",
  },
  OOT_HIVE_BOMBCHU: {
    game: 'oot',
    name: "Destroy Beehives using Bombchu (OoT)",
    tooltip: "Use some careful timing with a Bombchu to blow up the beehives across Hyrule.",
  },
  OOT_DEKU_MQ_WATER_ROOM_SPIKE_ROLL: {
    game: 'oot',
    name: "Roll Under Deku Tree MQ Water Room's Rotating Spike.",
    tooltip: "Puts crossing the Water Room in Deku Tree MQ in logic with no items, as any age.",
  },
  OOT_BOTW_MQ_BACKFLIP: {
    game: 'oot',
    name: "Backflip/Sidehop Over Gap to Reach BotW MQ's Main Room's Center",
    tooltip: "Makes the center of the main room reachable without Zelda's Lullaby or Hover Boots by entering the left cage and backflipping/sidehopping over the invisible gap",
  },
  MM_LENS: {
    game: 'mm',
    name: 'Fewer Lens Requirements (MM)',
    tooltip: 'Makes Lens of Truth not a required item for most checks, excluding Shiro (Stone Mask check) and climbing the wall to Darmani',
  },
  MM_TUNICS: {
    game: 'mm',
    name: 'Fewer Tunic Requirements (MM)',
    tooltip: 'Most things that would normally require Zora Tunic no longer will. Pirate Fortress Sewers and Pinnacle Rock will still require it.',
  },
  MM_PALACE_BEAN_SKIP: {
    game: 'mm',
    name: 'Skip Planting Beans in Deku Palace',
    tooltip: 'Backflip onto the doorframe in the left side of Deku Palace to skip planting the beans, removing the bottle requirement for the Sonata check',
    linkVideo: 'https://www.youtube.com/watch?v=sL30HLF9tAQ&ab_channel=PushyMisumi',
  },
  MM_DARMANI_WALL: {
    game: 'mm',
    name: 'Climb Mountain Village Wall Blind',
    tooltip: 'Climb the Mountain Village wall without Lens of Truth.',
    linkVideo: 'https://www.youtube.com/watch?v=X_IQYkJ49zA&ab_channel=dodo',
  },
  MM_NO_SEAHORSE: {
    game: 'mm',
    name: 'Pinnacle Rock without Seahorse',
    tooltip: 'Cross Pinnacle Rock blind. The signs are your markers for turns.',
    linkVideo: 'https://www.youtube.com/watch?v=Ye7lu1kSxpQ&ab_channel=Rahylia',
  },
  MM_ZORA_HALL_HUMAN: {
    game: 'mm',
    name: 'Swim to Zora Hall as Human',
    tooltip: "Swim around Zora Hall to reach the back without Zora Mask",
    linkVideo: 'https://www.youtube.com/watch?v=j4GiWM0xgtA&ab_channel=Rahylia',
  },
  MM_ICELESS_IKANA: {
    game: 'mm',
    name: 'Climb Ikana Canyon without Ice Arrows',
    tooltip: 'With a precise Hookshot position, you can hit the first tree directly from the riverside, removing the Ice Arrow requirement',
    linkVideo: 'https://www.youtube.com/watch?v=VtMx8XIE0tA&ab_channel=yogamoanyo',
  },
  MM_ONE_MASK_STONE_TOWER: {
    game: 'mm',
    name: 'Climb Stone Tower with One Mask',
    tooltip: 'Playing the Elegy of Emptiness while standing on a block to move with it, along with other clever Elegy of Emptiness usage, allows you to climb Stone Tower using just two Elegy statues',
    linkVideo: 'https://www.youtube.com/watch?v=I3xLE1X9Iiw&t=3s&ab_channel=dodo',
  },
  MM_ISTT_EYEGORE: {
    game: 'mm',
    name: 'Inverted Stone Tower Temple Early Eyegore',
    tooltip: 'Using either Hookshot and Light Arrows, or bombs for a Recoil Flip, you can access the central bridge with the Eyegore on it early, skipping a portion of the dungeon',
    linkVideo: 'https://www.youtube.com/watch?v=PxUhL6pombo&list=PLJoiLTDPjgenwpASzbu07cLnUSGZcIUnB&index=52&ab_channel=dodo',
  },
  MM_SCT_NOTHING: {
    game: 'mm',
    name: 'South Clock Town Chest with Nothing',
    tooltip: 'Climb the roof with a precise jump to access the South Clock Town Chest',
    linkVideo: 'https://www.youtube.com/watch?v=8_tjO86vRsY&ab_channel=PushyMisumi',
  },
  MM_GORON_BOMB_JUMP: {
    game: 'mm',
    name: 'Bomb Jump Fences as Goron',
    tooltip: 'Place down bombs or a Powder Keg, then use the Goron Pound to leap into the air and get damaged mid-air by the explosion to hop over fences',
    linkVideo: 'https://www.youtube.com/watch?v=lLMT2-wNs9w&ab_channel=KokiriKid07',
  },
  MM_BOMBER_GUESS: {
    game: 'mm',
    name: 'Guess Bombers\' Code',
    tooltip: 'Guess the Bombers\' Code for Astral Observatory from 120 possible combinations. Alternatively, you can backflip over the bomber kid guarding the entrance',
    linkVideo: 'https://www.youtube.com/watch?v=W6DhLXzJn0A&ab_channel=Tyler%2706',
  },
  MM_CAPTAIN_SKIP: {
    game: 'mm',
    name: 'Guess Oceanside Spider House Code',
    tooltip: 'Guess the code on the masks you hit with arrows.',
  },
  MM_ISTT_ENTRY_JUMP: {
    game: 'mm',
    name: 'Inverted Stone Tower Temple Long Jump to Death Armos',
    tooltip: 'Using a precise bomb long jump, you can make it to the switch on the left side of the room',
    linkVideo: 'https://www.youtube.com/watch?v=UAG9jbjKwek&ab_channel=Gigopler',
  },
  MM_HARD_HOOKSHOT: {
    game: 'mm',
    name: 'Precise Short Hookshot Usage',
    tooltip: 'With this trick enabled, using the Short Hookshot gives you logical access to the Deku Palace Bean Grotto chest, the Road to Ikana chest and Ikana Canyon through the Road to Ikana tree',
  },
  MM_PFI_BOAT_HOOK: {
    game: 'mm',
    name: 'Enter Pirates\' Fortress Interior using Hookshot from the Boats',
    tooltip: 'From the boats, you can make a precise shot to the barrels in front of the interior entrance',
  },
  MM_PALACE_GUARD_SKIP: {
    game: 'mm',
    name: 'Backflip over Deku Palace Guards',
    tooltip: 'With a precise backflip on the fence, jump over the guards as Human Link',
    linkVideo: 'https://www.youtube.com/watch?v=-4F9lzES7tM&ab_channel=Pokemongenius88',
  },
  MM_SHT_HOT_WATER: {
    game: 'mm',
    name: 'Complete Snowhead Temple using Hot Spring Water',
    tooltip: 'Use Hot Spring Water to melt all the ice instead of Fire Arrows or Din\'s Fire.',
  },
  MM_SHT_STICKS_RUN: {
    game: 'mm',
    name: 'Access SHT Pillar Fireless with Precise Stick Run',
    tooltip: 'With a precise path, light the three torches.', //Clearer description?
  },
  MM_SHT_PILLARLESS: {
    game: 'mm',
    name: 'Snowhead Temple Skip Raising Pillar',
    tooltip: 'Destroy the snowballs with Fire Arrows or bombs and then jump down. A precise jump slash may help getting onto the platform.',
    linkVideo: 'https://youtube.com/clip/UgkxwCrliqwRiCbljfpozhmsnlzVwSUaAI0N',
  },
  MM_SHT_PILLAR_ROOM_HOOKSHOT: {
    game: 'mm',
    name: 'Snowhead Temple Hookshot Up Pillar Room',
    tooltip: 'From the ground floor of pillar room, use a Hookshot to kill the freezards and then climb using the chest that spawns.',
    linkVideo: 'https://youtu.be/4WVOnjC7xdE',
  },
  MM_KEG_EXPLOSIVES: {
    game: 'mm',
    name: 'Use Powder Kegs as Explosives',
    tooltip: 'Allows Powder Kegs to be an alternative to bombs in logic',
  },
  MM_DOG_RACE_CHEST_NOTHING: {
    game: 'mm',
    name: 'Doggy Racetrack Chest with Nothing',
    tooltip: 'Climb the fence and make a precise jump to get to the chest in the Doggy Racetrack area',
    linkVideo: 'https://www.youtube.com/watch?v=DlpBZq579Ds&ab_channel=PushyMisumi',
  },
  MM_MAJORA_LOGIC: {
    game: 'mm',
    name: 'Fight Majora to Reset Time',
    tooltip: 'Access to fight Majora logically counts as a time reset, as an alternative to playing Song of Time',
  },
  MM_SOUTHERN_SWAMP_SCRUB_HP_GORON: {
    game: 'mm',
    name: 'Southern Swamp Scrub HP as Goron',
    tooltip: "Use Goron's ground pound in front of the Tourist Center door to land on the roof and reach the heart piece",
    linkVideo: 'https://www.youtube.com/watch?v=HvH5NaTsf5w&list=PLuteuW9RqeG0NfhzoiZlJ1HQM2BdHftzg&index=5&ab_channel=Pokemongenius88',
  },
  MM_ZORA_HALL_SCRUB_HP_NO_DEKU: {
    game: 'mm',
    name: 'Zora Hall Scrub HP without Deku',
    tooltip: 'As either Goron or Zora Link, jump up to the heart piece. Linked playlist has both versions.',
    linkVideo: 'https://www.youtube.com/playlist?list=PL7AtrmSRvw6JxohRTRK61ZGSvuIL5rq0w',
  },
  MM_ZORA_HALL_DOORS: {
    game: 'mm',
    name: 'Access the doors in Zora Hall using Short Hookshot Anywhere',
    tooltip: 'Using Hookshot Anywhere, it is possible to hookshot behind the doors and open the doors behind them. It is somewhat precise but works with all doors.', //How does this trick work exactly?
  },
  MM_IKANA_ROOF_PARKOUR: {
    game: 'mm',
    name: "Jump from Ikana Castle's Roof Interior to Exterior",
    tooltip: 'Jump off of a piece of rubble to a sloped wall, walk up, and jump across the block to the outside of the fence. Walk around the edge to get to the other side.',
    linkVideo: 'https://www.youtube.com/watch?v=9af_q8oYBhA&t=1s',
  },
  MM_IKANA_PILLAR_ENTRANCE_FLOAT: {
    game: 'mm',
    name: "Float from Ikana Castle's Roof to Entrance",
    tooltip: 'Float from the Ikana Castle roof to the main entrance of the courtyard using Deku Mask or Hover Boots',
  },
  MM_IKANA_PILLAR_ENTRANCE_JUMP: {
    game: 'mm',
    name: "Jump from Ikana Castle's Roof to Entrance",
    tooltip: 'Jump from the Ikana Castle roof to the main entrance of the courtyard',
  },
  MM_POST_OFFICE_GAME: {
    game: 'mm',
    name: 'Post Office Timing Game without Bunny Hood',
    tooltip: 'Obtain the reward without an on-screen timer to help you',
    linkVideo: 'https://www.youtube.com/watch?v=bAlGLPkp8go&ab_channel=ZZtheCat2',
  },
  MM_WELL_HSW: {
    game: 'mm',
    name: "Well's Hot Spring Water without Killing Dexihand",
    tooltip: 'Grab the water before the hand grabs you.',
  },
  MM_ISTT_CHUCHU_LESS: {
    game: 'mm',
    name: 'ISTT Block Room without Chuchu Jellies',
    tooltip: 'Normally the room contains Chuchu Jellies to restock your arrows and magic. With this trick on, logic can expect you to do this room without the Soul of Chuchus.',
  },
  MM_GBT_WATERWHEEL_GORON: {
    game: 'mm',
    name: 'Cross GBT Waterwheel Room as Goron',
    tooltip: 'Skip the first yellow turnkey with a precise Goron Roll',
  },
  MM_GBT_ENTRANCE_BOW: {
    game: 'mm',
    name: 'Great Bay Temple Entrance Chest using only Bow',
    tooltip: 'Light the four torches using somewhat precise arrow shots',
    linkVideo: 'https://www.youtube.com/watch?v=McXOXYxYiqw',
  },
  MM_OOB_MOVEMENT: {
    game: 'mm',
    name: 'Walk Along Surfaces Out of Bounds',
    tooltip: 'In certain situations, it is required to walk on surfaces that are unable to be reached normally.', //Examples could help
  },
  MM_ST_UPDRAFTS: {
    game: 'mm',
    name: 'Stone Tower Updrafts without Deku Mask',
    tooltip: 'This room can be traversed using Recoil Flips or Goron Mask instead of Deku Mask.',
  },
  MM_ESCAPE_CAGE: {
    game: 'mm',
    name: 'Escape the Monkey Cage with Hookshot Anywhere',
    tooltip: 'For Interior ER, it is possible to hookshot over the fence and land in a spot where Deku Mask can then be used to leave out the front entrance.',
  },
  MM_GBT_FAIRY2_HOOK: {
    game: 'mm',
    name: 'GBT First Underwater Fairy with Short Hookshot Anywhere',
    tooltip: 'The first Stray Fairy in a bubble can be obtained with a precise Hookshot angle.',
  },
  MM_GBT_CENTRAL_GEYSER: {
    game: 'mm',
    name: 'GBT Central Room without Zora using Fire & Ice Arrows or an OoT Magic Spell',
    tooltip: 'Using Fire and Ice Arrows on the water stream above the ladder or an OoT Spell while on the spinning platform, it is possible to sink down during the cutscene, then swim into one of the tunnels.',
  },
  MM_BANK_ONE_WALLET: {
    game: 'mm',
    name: 'Bank Rewards Require One Less Wallet',
    tooltip: 'The 500-Rupee item reward will only require the Child Wallet, and the 1000-rupee item reward will require the Adult Wallet.',
  },
  MM_BANK_NO_WALLET: {
    game: 'mm',
    name: 'Bank Rewards Require No Extra Wallets',
    tooltip: 'All bank rewards will only require the Child Wallet.',
  },
  MM_CLOCK_TOWER_WAIT: {
    game: 'mm',
    name: 'Wait for the Clock Tower to Open When Shuffled',
    tooltip: 'With this trick enabled and the Clock Tower entrance shuffled, it may be expected to wait for the Clock Tower to open without a way to quickly advance time.',
  },
  MM_WFT_RUPEES_ICE: {
    game: 'mm',
    name: 'Collect the Pillar Rupees in Woodfall Temple using Ice Arrows',
    tooltip: "The rupees next to Odolwa's door can be jumped to after creating ice platforms in the water.",
  },
  MM_ISTT_RUPEES_GORON: {
    game: 'mm',
    name: 'Collect the Floating Rupees in ISTT as Goron',
    tooltip: 'In the room before Twinmold, Goron can collect the rupees by rolling on the platform over them.',
  },
  MM_BOMBER_BACKFLIP: {
    game: 'mm',
    name: 'Backflip over the Bomber in East Clock Town',
    tooltip: 'Just backflip over the kid.', // Is Guess Bombers' Code not logically equivalent to this?
  },
  MM_NCT_TINGLE: {
    game: 'mm',
    name: 'Jump Slash Tingle in North Clock Town',
    tooltip: "Jump off the tree and jump slash Tingle's balloon. Sticks will not work.",
  },
  MM_GBT_FIRELESS: {
    game: 'mm',
    name: 'Great Bay Temple without Fire Arrows',
    tooltip: 'It is possible to traverse the final room in the reverse loop using Zora Mask or Adult Link with a jump slash.',
  },
  MM_IGOS_DINS: {
    game: 'mm',
    name: "Burn Igos' curtain with Din's Fire",
    tooltip: "Igos' left curtain can be burned by standing at the top of the stairs next to his throne.",
  },
  MM_BIO_BABA_CHU: {
    game: 'mm',
    name: 'Destroy the Bio Baba Grotto Hives with a Bombchu',
    tooltip: 'The hives in this grotto can be destroyed with a precise bombchu placement.',
  },
  MM_BIO_BABA_LUCK: {
    game: 'mm',
    name: 'Bio Baba Grotto Lilypad Luck',
    tooltip: 'If the item happens to land on one of the lilypads, you can get it without Zora Mask or Iron Boots.',
  },
  MM_WF_SHRINE_HOVERS: {
    game: 'mm',
    name: 'Woodfall Owl Chest with Hover Boots and Jump Slash',
    tooltip: 'The chest can be reached with a tight jump slash at the end of the hover duration.',
  },
  MM_WFT_LOBBY_HOVERS: {
    game: 'mm',
    name: 'Woodfall Temple Lobby with Damage Boost and Hover Boots',
    tooltip: 'The lobby can be traversed by damaging yourself with bombs at certain points. Very difficult.',
  },
  MM_SOARING_ZORA: {
    game: 'mm',
    name: 'Zora Long Jump to the Soaring Tablet',
    tooltip: 'The Soaring Tablet can be long jumped to as Zora from the giant flower in the back of Poison Swamp or from the Woodfall entrance.',
  },
  MM_SOARING_HOVERS: {
    game: 'mm',
    name: 'Jump Slash or Damage Boost to the Soaring Tablet with Hover Boots and Bunny Hood',
    tooltip: 'Using Bunny Hood for extra speed, Hover Boots can be used to reach the Soaring Tablet with a tight jump slash or a damage boost with explosives.',
  },
  MM_LULLABY_SKIP_IRONS: {
    game: 'mm',
    name: 'Skip playing Goron Lullaby by using Iron Boots',
    tooltip: 'By combining Iron Boots to not be blown away by the wind and Goron to roll up the slope, Goron Lullaby can be skipped.',
  },
  MM_PATH_SNOWHEAD_HOVERS: {
    game: 'mm',
    name: 'Cross Path to Snowhead using Hover Boots',
    tooltip: 'Hover Boots can be used to slide off the slopes on the side and get across the gaps.',
  },
  MM_GBT_WATERWHEEL_HOVERS: {
    game: 'mm',
    name: 'Cross GBT Waterwheel Room using Hover Boots',
    tooltip: 'Similar to using Goron, Hover Boots can be used to get on the water wheel and then reach the central room.',
  },
  MM_GBT_CENTER_POT_IRONS: {
    game: 'mm',
    name: 'Great Bay Temple Center Underwater Pot using only Iron Boots',
    tooltip: 'The pot can be broken by rolling into it, allowing you to collect the Stray Fairy.',
  },
  MM_GBT_RED1_HOVERS: {
    game: 'mm',
    name: 'Reach the First Red Turnkey in GBT using Hover Boots, Bunny Hood, and a Jump Slash',
    tooltip: 'The red turnkey in front of Wart can be reached with a precise jump slash after the hover duration, using Bunny Hood for extra speed.',
  },
  MM_GBT_GREEN2_UPPER_HOVERS: {
    game: 'mm',
    name: "Reach the Upper Chest in GBT's Second Green Room using Hover Boots",
    tooltip: "The upper chest in the green water wheel room can be reached by using Hover Boots to move between the wheel's blades.",
  },
  MM_GYORG_IRONS: {
    game: 'mm',
    name: 'Fight Gyorg as Human using Iron Boots and Hookshot',
    tooltip: 'Gyorg can be damaged with Hookshot. Turning this trick on will enable the fight in logic with Iron Boots and Hookshot.',
  },
  MM_STT_LAVA_BLOCK_HOVERS: {
    game: 'mm',
    name: 'Stone Tower Temple Map Chest using Hover Boots',
    tooltip: 'After using the Hookshot to reach the chest on the high platform in the lava room, one can then use the Hover Boots to land on top of the sun block.',
  },
  MM_ISTT_ENTRY_HOVER: {
    game: 'mm',
    name: 'Inverted Stone Tower Temple Death Armos using Hover Boots and Bunny Hood',
    tooltip: 'The switch can be reached by using the Hover Boots and then sidehopping to grab the ledge, using Bunny Hood for extra speed.',
  },
  MM_GYORG_POTS_DIVE: {
    game: 'mm',
    name: "Dive Down for Gyorg's Pots with Blast Mask",
    tooltip: 'After defeating Gyorg, dive down and blow up the pots with Blast Mask.',
  },
  MM_STT_POT_BOMBCHU_DIVE: {
    game: 'mm',
    name: 'STT Water Room Shallow Pots Dive with Bombchu',
    tooltip: 'The pots closer to the surface in the water room can be broken using Bombchus, then dived down to.',
  },
  MM_STOCK_POT_WAIT: {
    game: 'mm',
    name: "Wait outside Stock Pot Inn's roof for closing",
    tooltip: 'Normally, logic will not force you to wait on the roof for night inn checks. Enabling this will remove that restriction.',
  },
  MM_STAGE_LIGHTS_DIN: {
    game: 'mm',
    name: "Light the Zora Hall Stage Lights using Din's Fire, Bow, and Hookshot",
    tooltip: "The item can be obtained without Fire Arrows by first reaching either torch with the hookshot, using Din's Fire, then shooting an arrow to the other torch.",
  },
  MM_RANCH_FARORE: {
    game: 'mm',
    name: "Romani's Ranch locations using Farore's Wind and Time Reset",
    tooltip: "It is possible to place Farore's Wind in Romani Ranch on Day 3, reset time and warp back to Romani Ranch to obtain the Day 1 and 2 checks without the Powder Keg",
  },
  MM_EVAN_FARORE: {
    game: 'mm',
    name: "Evan's Piece of Heart using Farore's Wind and Time Reset",
    tooltip: "After beating Great Bay Temple, the door to Evan's Room will no longer be blocked. Use Farore's Wind inside the empty room, reset time so that Evan reappears in his room, and warp back.",
  },
  MM_KEG_TRIAL_HEATLESS: {
    game: 'mm',
    name: 'Powder Keg Trial without Thawing Ice using Hookshot Anywhere',
    tooltip: "With Hookshot Anywhere, it is possible to hookshot through the little gap in the left bottom corner.",
  },
  MM_STT_LAVA_SWITCH_HAMMER: {
    game: 'mm',
    name: 'Stone Tower Temple Lava Room switch without Goron',
    tooltip: "The switch in the lava room with updrafts can be pressed without Goron by using Megaton Hammer, Iron Boots, and Bunny Hood. It has pretty tight timing.",
    linkVideo: 'https://www.youtube.com/watch?v=_fTKOvkVTTA',
  },
  GLITCH_OOT_EQUIP_SWAP: {
    game: 'oot',
    name: "Equip Swap (OoT)",
    glitch: true,
  },
  GLITCH_OOT_OCARINA_ITEMS: {
    game: 'oot',
    name: "Ocarina Items (OoT)",
    glitch: true,
  },
  GLITCH_OOT_MEGAFLIP: {
    game: 'oot',
    name: "Megaflips (OoT)",
    glitch: true,
  },
  MM_HIVE_BOMBCHU: {
    game: 'mm',
    name: "Destroy Beehives using Bombchu (MM)",
    tooltip: "Use some careful timing with a Bombchu to blow up the beehives across Termina.",
  },
  MM_TWINMOLD_BOW: {
    game: 'mm',
    name: "Twinmold with Bow (MM)",
    tooltip: "Defeat Twinmold using only the Bow.",
  },
};

export const DEFAULT_TRICKS: TrickKey[] = ['OOT_NIGHT_GS'];
