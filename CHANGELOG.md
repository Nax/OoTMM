# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- Completely rework bombchu, behavior is now a setting with 4 values : free like in OoT, tied to bomb bag like in MM, old-style bombchu bags, and a new bombchu bag setting where 3 bags are in the pool, allowing for 20/30/40 bombchu.

### Changed

- Path hints now tell the exact world the path corresponds to in multiworld.

### Changed

- Grass and Pot CAMC is now its own setting and separated from the rest.

### Fixed

- Fix a bug where magical rupee would sometimes require a scene reload to work properly.
- Fix an odd interaction between open MM dungeons and the moon crash.

## [27.0] - 2025-01-04

### Added

- Add the ability to bind region clear states to dungeon clears, dungeon rewards, or set them free.
- Add Path hints.
- Add the ability to play the multiplayer modes as teams, racing each other in the same seed.
- Add the ability to play multiworld random settings.
- Add the Japanese version of Stone Tower Temple.
- Add the Japanese version of Stone Tower.
- Add the Japanese version of Deku Palace & the matching grottos, as a setting.
- Add pause menu save screen for MM and options to return to spawn or dungeon entrance after saving.
- Alter the OoT pause menu saving to be consistent with the new MM pause menu saving.
- Add a trick to climb Snowhead Temple pillar room from ground floor by using hookshot to kill freezards and spawn a hookshot-able chest

### Changed

- Dungeon Maps hinting at dungeon locations now use a significantly better algorithm, which should handle all edge-cases.
- When hint importance is on, unreachable items will be marked as such instead of "not required".
- Removed the cutscenes from the Skull Kid paintings and the Skulltulas spawning from big jars, tree or chandelier in MM Spider Houses.
- Bombchu are now accounted in logic for the SSH Gold Room hives.
- Updated **Allsanity** and **Hell** presets
- Improve OoT Song of Soaring by showing the "Soar to" message without unpausing the game.
- Alter death behavior to return you to the dungeon entrance even if it's cross-game.
- Alter save behavior such that if you save and reset in a dungeon, you will start at the dungeon entrance even if it's an MM dungeon.
- Remoevd Playthrough hint in Blitz pre-completed preset.
- Accessing WFT Pre-Boss room can now be done with Din's Fire in logic.

### Fixed

- Fix a crash when performing some actions after healing Mikau on original hardware.
- Fix talking to Skull Kid OoT sometimes crashing.
- Fix Romani sometimes being present without having collected her soul.
- Some starting items being hinted "nowhere".
- Spin attack with child sword being ridiculously small. Gilded sword spin is now as big as Biggoron sword spin.
- Potential loss of MM sword due to Epona and overworld or region entrances randomization.
- Logic for boat archery mistakenly requiring a bow.
- Fix OoT door locks not being drawn on the back side of knobbed doors.
- Remove unnecessary setting of clock to 6am day 3 after playing Oath to Order on the clock tower roof.
- Remove unnecessary sanity checks for scene time speed.
- Sound setting not sticking over when doing to MM.
- Killing Big Poes in MM no longer considers Hookshot in logic.
- ER in MM only expecting to reach Temple of Time.
- Fix the ground floor pots of Snowhead Temple pillar room not being in logic without the ability to melt ice.
- Fix logic issue for the Gerudo Fortress wonder items expecting Bow instead of Hookshot.
- Fix logic issue for the Gerudo Fortress crates next to the rock not accounting for Gerudo.
- Fix logic issue for Grandma's stories in Reset Moon Behavior not expecting another clock.
- Fix logic issue for accessing the front of swamp with only Zora; now requires Nayru's Love.

## [26.1] - 2024-11-09

### Added

- Add signs in ambiguous logcations in ER, such as generic grottos.

### Fixed

- Fix a bug where some ER seeds would not generate correctly.

## [26.0] - 2024-11-09

### Added

- Add a setting to shuffle the Mask Shop <-> Clock Tower link between the games.
- Add a setting to disable the polarity of entrances in entrance shuffle (e.g. make an entrance lead to an exit).
- Add Spin Attack Upgrade in OoT as a setting, with Shared as an extra setting.
- Add Stone of Agony in MM as a setting, with Shared as an extra setting.
- Add an icon to simulate the stone of agony rumble feature.
- Add an option to not apply cosmetics to freestanding models.
- Add a custom file select with more informations.
- Add MM stick/nut upgrades as items in the pool.
- Add MQ crates.
- Add the Megaton Hammer to Majora's Mask.
- Add butterfly shuffle, for both games.
- Vanilla Small and Boss Keys setting.
- Skipped the camera pan out over Ganon's Castle being demolished.
- New entrance option for Pirate Fortress that includes all the currently shuffled entrances.
- Gerudo souls
- Trick to defeat Twinmold only using arrows.

### Changed

- Make OoT spin attacks scale with the MM swords.
- Grass/Barrels/Pots/Snowballs/Hearts/Rupees/Wonder Items settings were broken up by All/None/Overworld/Dungeons.
- Moon Crash cutscene is skipped in Cycle behavior.
- Hint section now shows the hint importance.
- Hint section format in Spoiler log.
- Default hint distribution for crosskeys preset.
- Logic now accounts for appearing at the well's bottom in Kakariko when coming out of it.
- Logic now accounts for appearing underwater in Zora's Domain when coming from the shortcut.
- Pirate Fortress Sewers Exit door now requires the Pirate Fortress Entrances option to be shuffled.
- Pirate Fortress Sewers Gate and interior passages now require the Pirate Fortress Entrances option to be shuffled.
- Pirate Fortress will no longer be considered a dungeon if its entrances are shuffled among the overworld.

### Fixed

- Fix an issue where song of time immediately after beating snowhead in ER would send you back to a bugged spring state.
- Fix an old bug where swords could get deleted leaving bombchu bowling into MM while playing the minigame.
- Fix a long-standing issue where Anju's reservation worked inconsistently (for real this time).
- Fix precompleted Stone Tower not setting some flags correctly.
- Fix possible softlock in Ice Cavern with shuffled silver rupees.
- Logic for obtaining the Seahorse.
- Logic for Open Bottom of the Well as adult.
- Pre-Activated Owl Statues able to create unbeatable seeds.
- Unshare the flags between late ReDeads and the First Scythe Rupee Puzzle in Shadow Temple (Vanilla + MQ).
- Logic no longer thinks you can swap ages in the Deku Theater.
- Logic now accounts for the Hylian Guard Soul for the Keaton Mask sale in Kakariko.
- The Light Trial Wallmaster warp now goes to the correct location, and logic for it fixed.
- Fix logic issue for getting sticks and nuts in Forest Temple not requiring the Deku Baba Soul.
- Fix time logic for entering the Clock Tower Roof when it is shuffled.
- Crash when feeding a Bombchu to Dodongo.
- Spin attack culling when collecting an item.

## [25.0] - 2024-09-08

### Added

- D-Pad can now fast pass the transformation mask equip cutscene.
- Shuffle MM snowballs.
- Shuffle MM barrels.
- Shuffle the MM potted plants, two checks each, one is a pot, one is grass.
- Hive shuffle, for OoT and MM.
- Behavioral setting for the Gibdos in Beneath The Well (Vanilla, Remorseless and Open).
- Skip Kamaro teaching the dance when healing him.
- Fast elemental arrow equip in MM.
- Ability to choose how many stray fairies are required to obtain a reward.
- Choice to pre-activate owl statues.
- Crates shuffle, for OoT and MM.
- The boat cruise is now faster if you are not playing the archery.

### Changed

- Force Hint Importance off if playing No Logic.
- Tingle no longer has extra text boxes when you first talk to him during a cycle.
- Adult Malon in Lon Lon Ranch no longer has her slow text when you first talk to her.
- Lake Hylia Owl no longer has its slow text when you first talk to it.
- Internal names of the music tracks, for an easier sorting in the cosmetics log.
- Adult can now jump from the windmill to the back of Kakariko within logic.
- It is now logical for adult to cross the Gerudo Fortress gate in reverse by getting captured.
- The trick for Blue Fire Arrows on mudwalls is now logical for the ones in Goron City.

### Fixed

- Issue with Spring not applying properly with ER.
- Logic issue with Romani Ranch Stables access.
- Logic issue with Kafei's check in seeds without shuffled interiors.
- Starting age no longer defaults to either child or adult after generating a random starting age seed.
- Minor collection delay for Bolero.
- Long-standing issue where Anju's reservation worked inconsistently.
- Title cards not being displayed on game transitions.
- MQ Forest Temple freestanding hearts logic issue.
- The two pots next to the hag's potion shop in Kakariko now check for being in the back.
- All adult logic now correctly check for some way to do damage.
- Fixed MQ Spirit Child Hand logic not checking for the Iron Knuckle Soul.

## [24.1] - 2024-07-11

### Added

- The baby chickens in Cucco Shack are now displayed on the mini-map.

### Changed

- Made the Title Screen a little nicer.
- Altered the patch format to support more features in the future.

### Fixed

- The diamond around Link after using Nayru's Love in MM rotates instead of being static
- Entrances for Zora Hall <-> Zora Cape Peninsula were reversed; this is now fixed.
- The Sticks event in MQ Dodongo's Cavern now requires the Deku Baba Soul and has been moved to its correct room.

## [24.0] - 2024-07-06

### Added

- Add a setting to allow one-ways to take you anywhere, alike wallmasters.
- Add a setting to shuffle the few Water Void spots in MM.
- Add a setting altering Shadow Temple boat speed.
- Add ageless Slingshot and Bow.
- Add CAMC to cows, where the cow ring hints at the item. If off, cow rings are collection markers instead.
- Add an optional CAMC setting for maps and compasses.
- Counter upon getting a Piece of Heart, showing your progression until your next heart container.
- Can now shuffle the rewards for selling the OoT masks.
- Add a setting to shuffle Wonder Items (non-MQ).
- Add a setting to make some OoT dungeons open.
- Add a setting to enable using Song of Double Time in OoT.

### Changed

- Make dungeon reward shuffle with one reward per-dungeon respect plando.
- Removed the deku shield in the spirit pot if restore broken actors is off, but make it logical if it's on.
- Hookshot is now visible on child.
- Castle Courtyard can now be revisited.
- Zelda's Soul is now required for the OoT/SoT check.
- The angle of interaction of MM gossip stones is more tolerant.
- If a dungeon is pre-completed, you now start with the boss soul, keys and silver rupees of the dungeon.
- Exiting Ganon's Castle is once again logical as child to reach Hyrule Castle (not the courtyard).
- Logic for soaring and warping in MM with ER is now even more robust, allowing usage everywhere they can be used.

### Fixed

- Fix website tooltips no longer having breaklines.
- Fix Keaton Quiz music continuing at night if the received item was minor.
- Fix song of time sometimes respawning the player in day-0 state until the next scene load.
- Fix bottle issues when changing age.
- Fix a weird interaction between scarecrow and clock shuffle.
- Fix honey and darling behaving oddly when a clock shuffle transition occurs.
- Fix some softlocks with instant transform.
- Fix a softlock with the Roza Sisters in some cases.
- Fix Dungeon Rewards Shuffle not generating with some settings.
- Fix Ikana Wisp showing up even if you did not beat Stone Tower Temple.
- Fix some names in spoiler having their game as a suffix when they're unique.
- Fix Moon Crash sometimes causing the Clock UI to disappear.
- MQ Fire Temple logic issue for the Flare Dancer Soul at the top of the temple.
- Fix an issue where, in certain settings, the game could still expect you to do MM without a way to reset time.
- Fix logic issue pertaining to Lost Woods and Overworld ER.
- Fix Milk Bar being able to appear in places that close at 10pm in All Locations logic.
- Fix bugs from grass allowing Strength as an option to collect them; the bugs will not spawn by picking up and throwing the grass.

## [23.1] - 2024-05-30

### Added

- Add many bank QoL.
- Add a setting to automatically plant beans in OoT.

### Changed

- Make multiworld items much faster to obtain.
- Make triforce pieces in triforce quest land in slightly more challenging locations.
- Make Navi give random junk hints when talked to.
- Make OoT use the correct minimap state for fortress, graveyard and lake.
- The rupee counter now goes much faster when large amounts of rupees are obtained/lost.
- Fill Wallets is now almost instantaneous.
- Using Deku Mask or Hover Boots to float from Ikana Castle to the sun block entrance is now a trick.

### Fixed

- Fix multiple pathfind bugs, leading to odd age-swap logic and very odd sometimes hints.
- Fix MM swords in OoT not working against some ennemies.
- Fix a crash when doing cremia's escort without gorman soul.
- Fix moon crashing having odd side-effects with the clock sometimes.
- Fix custom wisps rarely despawning sometimes.
- Fix Fast Masks softlocks.
- Fix a Fast Mask crash when deku link petals are on screen while transforming.

## [23.0] - 2024-05-22

### Added

- Add a fast mask transforms setting.
- Add a setting to allow the player to keep ammo/rupees/etc. through cycles.
- Add the ability to use music with custom banks.
- Add the ability to use custom fanfares.
- Add fanfares for cross-game items.
- Add a setting to display custom music names in-game.
- Add Free Scarecrow for MM.
- Add NPC souls to MM, more NPC souls in OoT, shared NPC souls.
- Add cutscenes speed-ups for the end of Ganon's Castle Trials.
- Add new junk hints.
- Ruto now spawns on first floor of Jabu-Jabu if it's vanilla layout (not MQ!).

### Changed

- Make the sun song check actually swap day/night like in vanilla.
- Update MM only preset.
- Improved custom music support.
- Make the medallion fanfare and the mask fanfare cross-games.
- Allow compatible OoTR music to play in MM.
- Allow compatible MMR music to play in OoT.
- Woods of Mystery has been logically reorganized to allow for leaving from the Day 2 Grotto in ER.
- Reduced Meg spawn timer after being hit.
- Removed the camera lock upon throwing a bomb-flower onto the rock locking Dodongo's Cavern.
- Boat Archery now ends right as you reach 20 points.
- Hyrulian Castle Guards now ignores you if you are wearing Stone Mask.
- Renamed the "Snowhead Temple without Fire Arrows" trick to "...using Hot Spring Water" to reflect its purpose.

### Fixed

- Fixed the special conditions validator to account for the extra added masks in OoT.
- Fixed a bug with region-state flags that could create unbeatable seeds.
- Fix minor bugs with swordless link.
- Fix phantom shields being equipped on age travel in some very rare cases.
- Fix Tricks section in spoiler log.
- Fix some actors (Part-Timer in Termina Field, Running Man, Punk Kid) not being properly filtered.
- Fix rupee scaling affecting bank withdraws.
- Fix one fish not being properly flagged when obtained in pond fish shuffle.
- Fix some silver blocks being only able to be pushed once in ageless strength.
- Fix Koume/Kotake still giving red potions when they shouldn't.
- Fix damage being wrong against Dead Hand in some cases.
- Fix death after leaving a grotto in MM in ER leading to wrong warps in some cases.
- Fix an issue with rewards within dungeons using only OOT or only MM.
- Fix logic issue for Spirit Temple Statue Upper Right chest not checking for Hookshot or Hover Boots in certain conditions.
- Fix possible softlock on Volvagia when damaging her second hitbox after death cutscene was initiated.
- Update blitz presets.
- Fix crash when trying to calm the council without the souls of all involved parties.
- Fix crash in Twinmold Arena when trying to transform into Giant without Twinmold's soul.
- Fix logic issue with Laundry Pool freestanding rupees checking for Day 2 and Night 2 instead of Night 2 only.
- Fix Farore's Wind in MM not being correctly restricted.
- Fix logic issue regarding the barrier in Ganon's Castle and certain ER cases.

## [22.0] - 2024-04-24

### Jokes

- (**April Fools**) Implement "Daylight Saving Time in MM", removing one hour every night.

### Added

- Add Majora's Mask swords to Ocarina of Time.
- Add the ability to play a single game.
- Add ageless strength upgrades.
- Add a setting to travel through time without the Master Sword.
- Add a setting to play as swordless adult link.
- Render most of the ageless items.
- Add rupee scaling, a setting where rupees are worth more if you have an upgraded wallet.
- Add full overworld ER.
- Add random starting positions.
- Add a setting to allow more granular hint regions.
- Add decoupled entrances.
- Add the ability to mix entrance pools.
- Add Grotto/Grave entrance randomizer, for both games.
- Misc. Souls for both games, which can be shared.
- Added a validator for Special Conditions (web-wise).
- Add setting to allow warping between games using Farore's Wind.
- Add a clear state wisp to ikana valley.
- Add the Ikana Music House to interiors shuffle.
- Add the Goron Racetrack to interiors shuffle.

### Changed

- Change the fishing pond fish model.
- Kotake no longer gives red potion refills when Koume isn't rescued.
- Rework how Deku Tree behaves (it's now either always open, strictly opened by Mido, or vanilla behavior).
- Rework how the sirloin function in indoor ER (+ new overworld ER) to allow shuffling the North in MM.
- Saving is now enabled on the Clock Tower Roof with Moon Crash set to New Cycle.
- Farore's Wind in MM is now tied to Link's age, like in OoT.
- Logic for MM's cursed and cleared states has received an overhaul and is now more robust.
- Powder Keg Trial with Short Hook Anywhere and without thawing the ice is now a trick.
- Clock Town Post Box, Goron Elder, and Keaton Quiz can now be logically obtained in their alternate locations.
- Guessing the Bomber Code for the notebook check is now logical in East Clock Town.

### Fixed

- Fix Epona spawning near Lon Lon ranch by default.
- Fix various crashes in MM when taking Epona to the wrong region in ER.
- Fix Goron Ruby looking odd in MM.
- Ruto's Soul is now accounted in logic for the Big Octo in Jabu-Jabu.
- Logic for entering Woodfall Temple if exiting the temple itself has been fixed.
- The "GBT without Fire Arrows" trick now correctly accounts for being tall and no longer requires Ice Arrows.
- Fixed logic for reaching Swamp Canopy Front in MM.

## [21.0] - 2024-03-28

### Added

- Prettier "Entrances" section in the spoiler log.
- New trick to reach Zelda's Courtyard using Age Swap in Ganon's Castle.
- Adult Link in Majora's Mask.
- New trick to wait on the roof for Stock Pot Inn to close.
- Add tricks for using Farore's Wind and resetting time to get the Romani Ranch checks.
- Hover Boots are now accounted for getting Letter to Kafei and Toilet Hand in Stock Pot Inn.
- Hookshot Anywhere for both games and Climb Anywhere for OOT can now be enabled without logical implications.

### Changed

- Soaring from an MM boss now always returns to the entrance of the dungeon, even if it's a cross-dungeon.
- OOT Warp Songs can now be logically used within MM dungeons.
- Farore's Wind is now logical for Romani's Song, Aliens, and Cremia Escort.
- Farore's Wind is now logical for Stock Pot Inn night access.
- Farore's Wind is now logical to reach the Mountain Village grotto.
- Farore's Wind is now logical for Hot Spring Water in Snowhead Temple's Eenos room without ER.
- Child Hookshot to get past the Gerudo Valley gate no longer requires Hookshot Anywhere enabled to be in logic.
- Adjusted MM dungeon access logic to account for the combination of Moon Crash Cycles and Clock Tower ER.
- Removed the time constraints on Bremen Mask and Doggy Race since those events are always available if you can get in.
- Removed requirements of meeting Kafei for the Curiosity Shop guy's checks.
- Stock Pot Inn's toilet hand now requires night 3 or other night inn access when Stock Pot Inn is not shuffled.
- Make Zora Hall stage lights with Din's Fire a trick.
- Make resetting time with Farore's Wind for Evan a trick.
- Hookshot Anywhere to go behind the waterfall in Zora's River is now a trick.
- Din's Fire is now logical to defeat the Big Octo in Deku Palace.
- Nayru's Love is now logical for various routing in Woodfall.

### Fixed

- Fix Soaring from OoT being able to cancel the GI animation.
- Fix OoT Blast/Stone mask behaving oddly with scene restrictions.
- Fix clock transitions breaking grottos.
- Fix minor discrepancies between song of time and moon crash cycle.
- Fix various bugs with swordless & age swap equips.
- Fix region states in MM being incorrect when coming from OoT.
- Fix Woods of Mystery grass patches being labeled wrong and having incorrect day logic.
- Fix Diving Minigame Purple and Huge Rupees being swapped.
- Fix a very persistent wrong warp issue.
- Fix a weird interaction between plentiful item pool and OoT elegy.
- Fix some items not being received in multi.
- Fix an issue where the grace period could cause a buggy cycle-reset.
- Fixed an issue where Strength got removed from logic for King Dodongo, causing bomb bag to be hard-required.
- Some logic issues involving Shared Din's Fire not being accounted for in some situations.
- Fixed an issue where logic thought you could get Pendant of Memories after 10pm on night 2.
- Fix Farore's Wind in MM not being properly dispelled when used.
- Fixed logic for the hearts in MQ Bottom of the Well.

## [20.0] - 2024-02-19

### Added

- Add cosmetics settings for dpad.
- Add rupoors as optional, extra traps.
- Add non-progressive clocks.
- Add a setting to alter the "getting lost" lost woods exits to take you into the lost woods again. Also add a setting to randomize those entrances.
- Add a trick for using Hookshot anywhere to access the Zora Hall doors.
- Add logic for getting to the Ikana Castle Exterior entrance from the roof.
- Add logic for soaring out of MM's mini-dungeons.
- Add a setting to enable Void Warp in MM.

### Changed

- Change the dpad texture.
- Make bombchu bag and hints play a little nicer.
- Change OoT boss room death/respawn behavior slightly to avoid gaining out of logic access to market.
- Made logic surrounding Evan simpler; now requires getting through the door in cursed state or Farore's Wind.
- Refactor Farore's Wind in MM to make the code more similar to OoT's code.

### Fixed

- Fix room key not working when not the active item.
- Fix the telescope scrub sometimes failing to spawn when not having an ocarina.
- Fix MM Fairy Ocarina not being useable on C buttons in some cases.
- Fix the dpad being useable during some minigames where it shouldn't.
- Fix a bunch of clock/moon crash issues.
- Fix Clock showing (and time flowing) on Clock Tower Roof and Moon.
- Fix a softlock when getting an item on the same frame the player switches to Kafei in Sakon's Hideout.
- Fix the doors in Sakon hideout not respecting enemy souls properly.
- Fix more instances of the Fog Glitch in OoT.
- Fix FW soaring / game over issue.
- Fix an issue where time logic would sometimes lead to contradictions.
- Fix logic issues involving age swap for the Spirit Temple adult statue checks.

## [19.2] - 2024-02-15

### Fixed

- Fix Evan sometimes crashing the game, for real this time.

## [19.1] - 2024-02-14

### Fixed

- Fix Evan sometimes crashing the game.

## [19.0] - 2024-02-14

### Added

- Add Stone Mask to Ocarina of Time.
- Add an Open Zora's Domain Shortcut setting, removing the ice block leading to Zora's Domain from Lake Hylia.
- Add a setting to open Majora's Mask dungeons in the clear state of their respective region.
- Add a Wisp to control the water level in Lake Hylia given you've beaten Water Temple.
- Add the ability to shuffle clocks representing Majora's Mask days.
- Add a Moon Crash setting, letting player keep going after a moon crash.
- Add the ability to auto invert MM Clock Speed either on all cycles or only the first one.
- Add a way to disable crit wiggle.
- Add Goron Bracelet/Silver Gauntlets/Golden Gauntlets to Majora's Mask.
- Small preview for the next item when multiple items are in the same slot.
- Silver Scale/Golden Scale in Majora's Mask.
- Freestanding hearts shuffle for Master Quest.
- Cosmetic setting for OoT Mirror Shield.
- Hide the rupee counter when not having Child Wallet.
- Add a beginner preset to the generator.
- Add deku stick rendering as adult.
- Add masks rendering as adult.
- Add Blast Mask to Ocarina of Time.
- Add Iron Boots/Hover Boots to Majora's Mask.
- Add Goron Tunic/Zora Tunic to Majora's Mask.
- Add dedicated CSMC textures and colors for souls.
- Add shared settings for every new item extension.
- Add logic to MQ heart shuffle.

### Fixed

- Fix minor issues with OoT warp songs and MM bosses.
- Fix the hyrule field glitch happening much more often compared to the vanilla game in OoT.
- Fix a long standing issue where pre-completed dungeons could interfere with the logic in some edge-cases.
- Fix a bug where you could unequip shields and swords or toggle items while hovering the wrong slot.
- Fix stray fairies not restoring health.
- Fix tunic color being off while having Razor Sword.
- Fix nayru's effect being visually off from link in MM in some cases.
- Fix items that don't exist in a given seed being hinted as being in Link's Pocket.
- Fix being able to escape boss rooms as fierce deity by abusing OoT warp songs.
- Fix being able to freeze the MM clock by abusing OoT warp songs.
- Fix zora diving game rupees not working correctly in coop/multiworld.
- Fix bombchu bag looking odd in Majora's Mask.
- Fix minor visual oddities with the Master Sword in Majora's Mask.

### Changed

- Improve OoT headers to make them closer to decomp.
- Improve MM boots logic.
- Rebalance weighted prices to make it more fair.
- Make the rupee counter color more consistent between games, and consistent with wallet colors.
- Improve the behavior of open dungeons with Stone Tower Temple.
- Update the blitz presets.
- Make tunics cosmetics affect their item models.
- Move entrance based game switching from play init to transition done to eliminate jump cuts when changing games.
- Change wallmaster entrance shuffle to initiate the transition as they pull link up.

## [18.3] - 2024-02-05

### Fixed

- Fix fish sharing flags with Deku Tree chests/collectible in multiplayer.
- Fix flying pots not dropping their vanilla content when they should.
- Fix renewables not working correctly in multiplayer.
- Fix Evan logic.
- Fix Dodongo's Cavern MQ silver rupees not working correctly when shuffled.
- Fix King Dodongo logic sometimes expecting bombchu.
- Fix Farore Wind in MM sometimes causing Song of Soaring to warp to the wrong destination.
- Fix various typos.

## [18.2] - 2024-01-23

### Changed

- Add MM spells to the blitz presets.

### Fixed

- Fix various typos.

## [18.1] - 2024-01-23

### Added

- Add OoT spells in Majora's Mask.
- Add shared settings for spells.
- Add a setting to make MM dungeons open.

### Fixed

- Fix diving game not working correctly in multiplayer.
- Fix Woodfall/Woodfall Temple logic.
- Fix Stone Tower logic.

## [18.0] - 2024-01-20

### Added

- Add multiplayer co-op, where players can see each other as flames and share items.
- Add zora diving game rupees shuffle.
- Add shared shields.
- Add bombchu bag, with bombchu drops.
- Add a setting to make the Happy Mask Shop door open at night.
- Add wallmaster ER, where wallmasters can warp you to a variety of areas.
- Add fairy fountain fairies shuffle.
- Add fairy spots big fairires shuffle.
- Add freestanding rupees shuffle.
- Add freestanding hearts shuffle.
- Add a setting to make the item pool extremely barren.
- Add the ability to unequip the kokiri sword and the various shields in OoT.

### Changed

- Make sometimes and always hints respect the no plando hint setting.

### Fixed

- Fix longstanding crashes and other issues on hardware.
- Fix the owl statue sometimes giving duplicate items in owl shuffle.
- Various pathfinder fixes.
- Fix OoT arrow cycling draining magic when OoT chateau is active.
- Fix OoT Zora Mask causing ice trap damage when obtained in a chest in Majora's Mask.
- Fix a vanilla bug where Hover Boots would be displayed over the quiver slot in some cases.
- Fix custom models sometimes causing the web generator to fail.

### Changed

- Make multiworld support the co-op improvements.

## [17.3] - 2024-01-04

### Fixed

- Fix MM arrow drops actually giving bombs.
- Fix a logic issue with gerudo fortress.

## [17.2] - 2024-01-03

### Added

- Add the "Nothing" item, to model things that don't drop anything in vanilla.
- Add shared shields.
- Add sunlight arrows, replacing OoT's light arrows and being able to trigger sun switches.
- Add bottled fairies, poes and big poes for random bottle contents.

### Changed

- Make some pots and grass use the new "Nothing" item.
- Make OoTMM play a bit nicer with flashcarts and some emulators.
- Make silver pouches able to be selected individually or randomly.
- Minor logic improvements to Fire Temple.
- Minor ER logic improvements.
- Add constraints to Clock Tower Roof ER to be more fair.
- Update presets.

### Fixed

- Fix an issue with Spirit MQ soul logic.
- Fix a logic issue with King Dodongo's soul.
- Fix logic issues when ISTT, SHT or GBT gets Gohma as the boss.
- Fix a vanilla bug where collecting a sword while in Fierce Deity Link would caused link to swing the sword uncontrollably.
- Fix a major cause of crashes on hardware.
- Fix a major memory corruption issue in Majora's Mask.
- Fix a broken grass not being shuffled if restore broken actors in enabled.
- Fix OoT magic not filling if foung in Majora's Mask.
- Fix the in-game tracker sometimes rendering silver rupee icons at random locations.
- Fix a large number of minor item-related issues due to a complete rework of the item-adding system.
- Fix being able to save while on the boat in Southern Swamp.
- Fix various issues with Fish Pond Shuffle.

## [17.1] - 2023-12-11

### Added

- Add Fish Pond Shuffle.
- Add Clock Tower Roof ER.
- Add Open Moon setting.
- Add a setting to restore broken actors - actors that are in the game code but fail to spawn, in OoT.

### Changed

- Make setting strings much shorter.
- Make having Cojiro as the active adult trade item force Grog to spawn over Fado.
- Make the dpad-up item in OoT be the adult trade item when the player is adult.
- Prevent the milk crates in hyrule castle from spawning without having Talon's soul.

### Fixed

- Fix talon logic.
- Fix trading with the swamp scrub making the town scrub disappear.
- Fix a crash when leaving a room while an ice-trap effect is active.
- Fix minor internal issues with CSMC.
- Fix the web generator not using the correct defaults for some settings.
- Fix issues related to Dungeon ER.

## [17.0] - 2023-11-16

### Added

- Add hookshot anywhere in Majora's Mask.
- Add experimental NPC souls in OoT.
- Add an always hint for the musical gossip stones.
- Add logic support for Master Quest grass shuffle.
- Add random bottle contents.
- Add bottles of red/blue/green potion for both games.
- Add various tricks.
- Add various sometimes hints.
- Add custom music support.
- Add many junk hints.

### Changed

- Make dampe give his check in OoT even when not over soil.
- Split souls into multiple settings.
- Make the Majora's Mask debug screen come up immediately on crash.
- Move the ocean wisp next to the ocean owl.
- Skip the fleeing sakon cutscene.
- Make bunny hood link faster.
- Shorten dialogue with Link the Goron.
- Make silver boulder throwing and monolith throwing faster.
- Rework one-way ER.
- Make the pictobox tell you the quality and subject of the picture.
- Make the blue potion from the witch tell you that you need magic mushrooms.
- Shorten carpenter cutscenes.
- Make the boat minigame faster.
- Make the fisherman minigame faster.
- Make the OoT fishing hint a sometimes hint.
- Rework the first cycle behavior of Kotake/Koume.
- Allow selecting individual or random ganon trials/keyrings.

### Fixed

- Fix seed generation taking longer than expected in some cases.
- Fix the elder goron logic.
- Fix hammer logic.
- Fix the windmill region not being hinted properly.
- Fix an odd interaction between double/triple hints and WotH.
- Fix the easier fishing QoL not working as intended.
- Fix gerudo fortress logic issues.
- Fix hint grammar issues.
- Fix being able to arrow cycle while playing archery games.
- Fix a typo in the beavers hint.
- Fix logic issues around hot spring water and the frozen grotto.
- Fix a crash when entering town archery on 4th day.
- Fix item pool setting not respecting some settings.
- Minor generator UI issues.

## [16.0] - 2023-10-17

### Added

- Add treasure chest game shuffle.
- Add the ability to swap age in Ocarina of Time by playing song of time.
- Add a trick for reverse dampe grave.
- Add gerudo valley in region ER.
- Add hint importance for static hints.
- Add a setting to control ganon's trials.
- Add a setting to make the great fairy sword progressive.
- Add arrow cycling.

### Changed

- Optimize the pathfinder.
- Improve the moon logic.
- Improve castle great fairy logic in ER.
- Update presets.
- Split a lot of ER settings into individual settings.
- Re-enable the tatl dialogue near the ocean gate to allow for a glitch.

### Fixed

- Fix a specific Like-Like in Fire MQ destroying shields permanently.
- Fix the fog glitch in OoT.
- Fix a logic issue with Spirit MQ.
- Fix a logic issue with gerudo fortress small keys.
- Fix cosmetic issues with goron and zora.
- Fix a logic issue with the gold skulltula on kakariko's ladder.
- Fix a bunch of ER-related logic issues.
- Fix logic for swordsman school in pot shuffle.
- Fix the named triforce piece flames sometimes not rendering properly.
- Fix the inventory and the C buttons being sometimes out of sync.
- Fix being kicked out of the potion shop and the blacksmith leading to the wrong entrance in ER.
- Fix a softlock when talking to the cucco lady while having the sword in hand.
- Fix a softlock related to the zora pot minigame and pot shuffle.

## [15.0] - 2023-09-16

### Added

- Add an extra CSMC option, which colors gold skulltulas depending on the kind of item they give.
- Add grass shuffle in Majora's Mask.
- Add coins, which are placeholder items that can be used by special conditions.
- Add Master Quest support to pot shuffle.
- Add silver pouches, which are similar to keyrings but for silver rupees.
- Add the magical silver rupee, which is like the skeleton key but for silver rupees.
- Add Ocarina button shuffle. The player needs to find the ocarina buttons before being able to play songs.
- Add a random starting age/adult age setting.
- Add a setting that tells the player if an item is required or not in hints.
- Add a Triforce Quest setting, where players need to collect the 3 named Triforce pieces that are placed in difficult locations.
- Add triple hints for kafei and biggoron.
- Add hints for ice cavern final chest, the OoT treasure game heart piece, invisible soldier and shoot the sun.
- Add pre-completed dungeons : rules can be set to make a certain number of sungeons start pre-completed. These dungeons will always be foolish.
- Add megaflip to glitch logic.

### Changed

- Update the magic upgrade models.
- update the wallets models.
- Forbid silver rupees from being hinted WotH.
- Update nice names.
- Update presets.
- Make boss souls use a distinct model.
- Make the generator UI look a bit better.
- Move the swamp wisp next to the swamp owl.
- Make the UI hide some settings that contradict each other.

### Fixed

- Fix shadow temple logic.
- Fix the "SOLD OUT" texture not rendering properly on hardware.
- Fix warp shuffle sometimes not working as intended.
- Fix some item models looking wrong in the opposite game.
- Fix the Majora's Mask file select skybox being visible on game transitions.
- Fix a seed generation issue when ganon tower is shuffled.
- Fix minor hints issues.
- Fix the in-game trakcer sometimes not rendering properly.
- Fix the in-game tracker sometimes listing non-existent triforce pieces outside of Triforce Hunt.

## [14.1] - 2023-09-12

### Changed

- Allow Shared Light Arrow to be hinted by gossip stones if they lock Ganondorf.
- Put the child trade items on dpad-up.

### Fixed

- Fix the Majora's Mask time system being ignored by the logic in edge-cases.
- Fix some key rings being ignored by logic.
- Fix key rings being mislabeled in the spoiler log.
- Fix a vanilla crash when using Din's Fire ina  certain room in Spirit Temple.
- Fix an issue when using the ocarina in the bombchu bowling alley.

## [14.0] - 2023-09-04

### Added

- Add pot shuffle : pots drop checks when broken.
- Add grass shuffle for Ocarina of Time : grass drops checks when cut.
- Add one-way entrances ER.
- Add ageless hookshot.
- Add the skeleton key, a key that can open any door.
- Add keyrings.
- Add tunic color and forms cosmetic settings for Majora's Mask.
- Add souls for Jabu's Parasites, Dark Link, Leevers and Stalchildren.
- Add more regions to Region ER.
- Add Warp Shuffle ER.
- Add the lenient goron spikes setting.
- Add bomber's tracker setting.
- Add logic for climb/hookshot anywhere in OoT.
- Add logic for hookshot anywhere in MM.

### Changed

- Change the versioning scheme, as the previous major version field was largely useless.
- Update presets.
- Update the nice item names.
- Shuffle the market in ER.
- Make elegy much faster to use.
- Make Ocarina of Time NPCs ignore masks.
- Extend the CSMC system to support pots, as well as support more textures in the future.
- Make the plentiful item pool have an extra copy of every soul.
- Allow up to 999 triforce pieces in Triforce Hunt.
- Optimize the in-game tracker to save memory.
- Make leaving the castle courtyard in OoT send you back to the crawl space.
- Make talon's cutscene in castle faster.
- Improve Elder Goron logic.
- Shorten the death cutscene in MM.
- Allow Fierce Deity Link to spin attack with magic.
- Update logic to consider MM souls for minor renewable things.
- Shorten the fleeing pirates cutscene.
- Skip the fire arrow cutscene in OoT.

### Fixed

- Fix Shadow MQ logic in Boss ER.
- Fix the milk bar logic.
- Fix Link the goron giving his check when talked to while he's still rolling.
- Fix the logic for Great Bay Temple.
- Fix the OoT poe refill not updating the bottle icon.
- Fix the Majora's Mask fairy refill item not actually giving a fairy.
- Fix goron elder logic in ER.
- Fix OoT keysy breaking gerudo fortress.
- Fix multiworld seeds failing to generate almost always when random MQ is enabled.
- Fix multiworld seed failing to generate very often.
- Fix various other multiworld generation issues.
- Fix hints not working properly with some combinations of stray fairy shuffle settings.
- Fix an odd interaction between triforce hunt and the beat majora to reset time trick.
- Fix OoT silver rupees not giving 5 rupees when collected in MM with shared wallets.
- Fix fill wallets not working with some settings combinations.
- Fix switching games sometimes emptying the magic meter.
- Various other logic fixes.

## [1.13.1] - 2023-07-31

### Fixed

- Fix a silver rupee softlock.

## [1.13.0] - 2023-07-31

### Added

- Add soul shuffle : souls of enemies and bosses are items that the players need to collect before they can face said ennemies and bosses.
- Add a soul list to the in-game tracker.
- Add custom player models in OoT.
- Add silver rupee shuffle.
- Add glitch logic support, with Ocarina Item.
- Add a setting to generate distinct worlds for each player in multiworld. Disctint worlds don't share ER, prices, etc.
- Add a trick for adult spirit as child.
- Add a trick for GBT  waterwheel as goron.
- Add a setting controlling whether ocarinas are shuffled at all in OoT.
- Add Free Scarecrow in OoT.
- Add more entrances to Interiors ER.
- Add the option to start with or remove stray fairies.

### Changed

- Make the chateau effect work in OoT if shared magic is enabled.
- Split stray fairy shuffle into individual settings.
- Make the bank able to store up to 9999 rupees.
- Make the rupee counter color dynamic based on the wallet in OoT.
- Improved seed generation to fail much less often.
- Internal improvements to the ROM-building process.
- Make ruto's letter model sideways.
- Improvements to the ER algorithm.
- Allow plandoing or starting with trifoce pieces.
- Update the major item chest texture in CSMC.
- Make very long hints break into multiple boxes.
- Update the blitz preset.
- Make soft soil skulltulas spawn faster.
- Remove the Pierre spawning cutscene in OoT.
- Shorten the gate opening cutscene in Water Temple.
- Various logic improvements.

### Fixed

- Fix a bug where checks could rarely become corrupted by special conds triggering on the title screen.
- Fix a logic issue with dog race and child wallet.
- Fix the various bugs related to going to Majora's Mask from Ocarina of Time while riding Epona.
- Fix the error message when an item couldn't be placed.
- Fix scrubs sometimes being shuffled when they shouldn't.
- Fix the dog race QoL not working.
- Fix blue warps leading to wrong warps in some cases.
- Fix the plando UI being broken in some cases.

## [1.12.4] - 2023-07-20

### Added

- Add a safety preventing the use of incompatible patch files.

## [1.12.3] - 2023-07-14

### Fixed

- Fix Triforce Hunt seeds sometimes failing to generate.

## [1.12.2] - 2023-07-08

### Fixed

- Fix major logic issues with the Goron City shortcut.

## [1.12.1] - 2023-07-08

### Fixed

- Fix an issue sometimes causing seeds to fail to generate.

## [1.12.0] - 2023-07-06

### Added

- Add price randomization.
- Add the ability to save anywhere in MM, by pressing L or C-up on the Quest menu.
- Add Indoors ER.
- Add heart chests to CSMC.
- Add various cutscene skips in OoT.
- Add Blue Fire Arrow, replacing Ice Arrow and being bale to melt red ice.
- Add Multiworld support. Players can generate a seed containing multiple worlds, one per player, and find each other's items.
- Add more sometimes and junk hints.
- Add the bottomless wallet, a wallet that can contain up to 9999 rupees.
- Add a setting to make hold targeting the default.

### Changed

- Change the big octo sapphire behavior so that it honors boss ER.
- Make compasses tell you the boss they are for in ER.
- Make maps tell you the entrance they are for in ER.
- Split shared masks into individual settings.
- Large internal changes to the way items and checks work.
- Improvements to ageless boomerang logic.
- Various minor logic improvements.
- Completely reworked the shop system to properly allow or deny buying certain items based on ammo, health, etc.
- Remove save slot 3, which never worked properly.
- Allow manual cooling of hot spring water.
- Disable hot spring water cooling in ER.
- Shorten the termina field scrub flight path.
- Remove first-time transformation cutscenes.
- Remove the shrinking screen in MM when the day is about to end.
- Improve Stock Pot Inn logic.
- Improve Milk Bar logic.
- Improve the pathfinder to be able to model waiting in MM.
- Aggressively optimize the generator.

### Fixed

- Fix hints sometimes not working at all in no logic.
- Fix generating a seed while a new version of the generator is being deployed causing the seed to be corrupted.
- Fix beating ganon allowing huge logic skips in ER.
- Fix fishing sometimes causing the game to crash.
- Fix ER sometimes causing no logic seeds to fail to generate.
- Fix fishing sometimes giving the wrong reward.
- Fix the Ganon Boss Key being spuriously given to the player in some cases.
- Fix a logic issue for the GS above Dodongo's Cavern entrance.
- Fix an issue with hints sometimes preventing seed generation.

## [1.11.0] - 2023-06-09

### Added

- Add the Triforce Hunt game mode.

### Changed

- Update the chateau and milk models.
- Improve logic with respect to soaring.
- Update presets.

### Fixed

- Fix a logic issue with the Deku Tree entrance.
- Do not show the warning about the spoiler log when the user opted-out of spoiler logs.

## [1.10.1] - 2023-05-21

### Fixed

- Fix an issue preventing seed generation in some cases.

## [1.10.0] - 2023-05-18

### Added

- Add custom hints.
- Add the option to remove boss keys and/or small keys.
- Add a setting to control the behavior of carpenters/gerudo fortress.
- Add random settings.
- Add hints for every mask on the Moon's gossip stones.
- Add Ganon Tower ER.
- Add Ganon Castle ER.
- Add chests of agony as a CSMC variant.
- Add a setting to shuffle Gorman Milk and the Milk Bar purchases.
- Add scrub shuffle for Majora's Mask.
- Add owl shuffle, where soaring destinations can be obtained as items and owl statues gives a check when hit.
- Add logic for ageless items.
- Add a sometimes hint for the Beneath the Well cow.
- Add an always hint for the house cow.

### Changed

- Split small and boss key settings into OoT and MM variants.
- Split ageless items into many settings.

### Fixed

- Fix various issues with shop shuffle.
- Fix ageless items not showing up properly on the equipment screen.
- Various fix for ageless items.

## [1.9.0] - 2023-05-11

### Added

- Add ageless items.
- Add fast bunny hood.
- Add scarce, minimal and plentiful item pools.
- Add child Fire Temple.
- Add adult Bottom of the Well.
- Add adult Deku Tree.
- Add a setting controlling the behavior of Deku Tree's entrance.
- Add various speedups to Majora's Mask.
- Add a setting to control the behavior of boss warp pads in Majora's Mask.
- Add a setting to climb anywhere in OoT.
- Add a setting to control the clock speed in MM.
- Add hookshot anywhere for both games.
- Add FD anywhere.
- Add cosmetic settings for OoT tunic colors.

### Changed

- Make the OoT inventory screen default to the item page.
- Allow Zora to play the ocarina underwater using the dpad.
- Make both swamp archery rewards obtainable immediately when getting a perfect with enough time left.
- Make both town archery rewards obtainable immediately when getting 50 points.
- Make both HBA rewards obtainable immediately when getting at least 1500 points.
- Remove the pickup animation when getting deku seeds for the first time.
- Make Farore's Wind remember where it was used when changing ages.
- Update the blitz preset.
- Make the sinking lure easier to obtain.
- Make fishing much easier.
- Make the cursed skulltula people spawn near the ground.
- Spawn a gerudo guard on the other side of the fence.
- Skip more OoT boss cutscenes.
- Change the ice cavern camera to be more similar to later releases of the game.
- Relax item restrictions in some scenes in OoT.
- Make equipping the magical arrows in OoT faster.
- Make the gold dog always win the race when having Mask of Truth.
- Improvements to region ER.

### Fixed

- Fix gerudo behavior in ER.
- Fix logical issues with lon lon scrubs.
- Fix the OoT windmill with nothing trick not checking that Link is adult.
- Fix the big rolling goron not giving his check if the player lacks a bomb bag.
- Fix the gold skulltula static hints sometimes failing to display.
- Fix small OoT 1.0 actor placement mistakes.
- Fix small issues with MQ Spirit logic.

## [1.8.0] - 2023-04-21

### Added

- Add a win condition setting.
- Add tingle shuffle, along with Majora's Mask world maps.
- Add special conditions for LACS, Ganon boss key and the Majora fight.
- Add child wallet, giant wallet, and colossal wallet.
- Add more settings controlling the placement of dungeon rewards.
- Add a setting to make wallets filled upon obtaining them.
- Add descriptions to the various settings.
- Add the blast mask cooldown setting.
- Add a setting to open King Zora.
- Add setting strings.
- Add presets support.
- Add a few new tricks.

### Changed

- Reworked the web generator completely.
- Improve region ER logic.
- Make the big octo sapphire in Jabu-Jabu reflect the actual dungeon reward.
- Make MM Sun's Song a major item for CSMC.

### Fixed

- Fix song of time sometimes interacting poorly with winter/spring.
- Fix progressive items not updating in OoT shops in some cases.
- Fix Boss/Dungeon ER being too restrictive logically in some cases.
- Fix a softlock when obtaining Ganon's boss key in shops.
- Fix the player permanently losing access to ruto.
- Fix getting the longshot not updating the C-buttons.
- Fix an issue with saves loading improperly.

## [1.7.0] - 2023-04-15

### Jokes

- (**April Fools**) Add "working zora mask" in OoT, turns every check into OoT's Zora Mask.

### Added

- Add the probabilistic foolish algorithm, that can detect foolish items in complex seeds.
- Add a setting to change the kakariko gate behavior.
- Add a setting to skip child zelda.
- Add Region ER.
- Add sun song in MM.
- Add minor dungeon ER in Majora's Mask.
- Add scrub shuffle in OoT.
- Add a new batch of tricks.

### Changed

- Split shared magical arrows into individual settings.
- Split shared songs into individual settings.
- Make SoT always send the player back to Clock Town outside of ER.
- Various improvements to the foolish heuristics.
- Improvements to MM ranch logic.
- Make the pathfinder aware of time constraints in both games.
- Reimplemented the pathfinder to be faster and allow more complex logic.
- Make a reset after playing MM song of time always place the player at spawn.
- Update custom text for some shuffled checks.
- Change the various CSMC textures.
- Update internal dependencies.
- Hints are documented better in the spoiler log.
- Allow dungeon rewards in plando/starting items.
- Rework the placement order for dungeon rewards/songs.

### Fixed

- Fix the eggs sometimes not hatching upon use.
- Fix logic issues related to soaring.
- Fix issues with winter/spring and warps in ER.
- Fix two chests being swapped in MQ Jabu logic.
- Fix logic issues with Milk Road.
- Fix the chateau bottle never being considered a logical bottle.
- Fix an issue with boss ER and small keys.
- Fix starting items not checking item availability.
- Fix various minor logic issues.
- Fix a very large amount of ER-related logic issues.
- Fix two MQ spirit chests being swapped in logic.
- Fix the lake hylia owl not leaving.
- Fix grottos in MM sometimes causing wrong warps when ER is on.
- Fix various minor issues with hints.
- Fix deku drowning sometimes softlocking.
- Fix various dungeon ER issues.
- Fix the colossus song check being impossible to obtain in some cases.
- Fix MQ Ganon's light trial chest being impossible to open when big due to CSMC.
- Add missing nice names.

## [1.6.1] - 2023-03-28

### Fixed

- Fix the temple of time altar sometimes crashing the game when read.

## [1.6.0] - 2023-03-27

### Added

- Add Plandomizer support, allowing the player to place specific items at specific locations.
- Add Master Quest dungeons.
- Add Special Conditions, configurable sets of items locking the Ganon bridge and the Moon.
- Add the soaring map to OoT when cross-soaring is enabled.
- Add shop shuffle in Majora's Mask.
- Add Short Hookshot in Majora's Mask.
- Add Fairy Ocarina in Majora's Mask.
- Add shared settings for the new item extensions.
- Add nicer names for shared items.
- Add a static hint for Ganon Boss Key when it's set to anywhere.

### Changed

- Improve foolish hint heuristics.
- Forbid buying bombchu in OoT when lacking a bomb bag and never having found bombchu before.
- Make blue fire from shops logical.
- Make it very unambiguous which shields, if any, are progressive in-game.
- Make the spheres handle events a bit better.
- Improves the spoiler log format.

### Fixed

- Fix some song locations being wrong in full-goron-lullaby.
- Fix the distribution of junk items beingwrong sometimes.
- Fix gyorg sometimes failing to spawn.
- Fix progressive shields messing with the item pool.
- Fix an issue where the player could be spuriously warped to OoT from MM some time after canceling a warp song.
- Fix seeds sometimes failing to generate with some combination of settings related to shields.
- Fix logic issues with ISTT.
- Fix minor issues with Fire Temple logic.
- Fix logic issues with bosses.

## [1.5.1] - 2023-03-14

### Fixed

- Fix a logic issue with Magic Beans in MM.
- Fix various issues with starting items.

## [1.5.0] - 2023-03-12

### Added

- Add the ability to use song of soaring in OoT.
- Add the ability to use warp songs in MM.
- Add egg shuffle.
- Add shop shuffle for OoT.
- Add cow shuffle.
- Add custom text to know what the bean seller is selling.
- Add the ability to start with consumables.

### Changed

- Allow collecting some very limited checks in MM without song of time logically.
- Make beatable only completely ignore unreachable items for hints.
- Minor changes to region names.
- Make the swamp shooting gallery score counting much faster.
- Clarify if bugs/fish/milk/etc. are for OoT or for MM in-game.
- Make most dungeons flags reset on Song of Time, like in vanilla.

### Fixed

- Fix a flag corruption bug.
- Fix gossip stones sometimes being locked by the item they hint.
- Fix great fairies not healing the player.
- Fix the Meddigoron static hint being wrong in some cases.
- Fix lake hylia gossip stones having their vanilla text when swimming.
- Fix using the dpad while climbing a ladder sometimes softlocking.
- Fix spring/winter mixup when exiting snowhead via blue warp in ER.
- Fix minor logic issues in Beneath the Well.
- Fix the seed generation sometimes favoring certain items.

## [1.4.2] - 2023-03-04

### Fixed

- Fix crashes when completing some dungeons in ER.
- Fix the stone tower blue warp sending you to the wrong location.
- Fix seeds sometimes failing to generate when shared items are enabled.
- Fix sometimes falling off the bridge after the Keeta cutscene.
- Fix progressive hookshot sometimes upgrading into the wrong item.

## [1.4.1] - 2023-03-02

### Fixed

- Fix the master sword being sometimes permanently lost in ER.
- Fix own game ER not working.

## [1.4.0] - 2023-02-28

### Added

- Add custom models for Milk and Chateau.
- Add the option to generate a seed without a spoiler log.
- Add shared items settings for bows, bomb bags, magic, magical arrows, songs, sticks and nuts, hookshot, lens, ocarinas, masks, wallets, and health.

### Changed

- Make dungeon ER honor beatable only logic.
- Make the secret shrine hint a double hint.
- Make game transitions a bit smoother on hardware.

### Fixed

- Fix grottos causing wrong warps in ER.
- Fix the ISTT boss warp pad being enabled when it shoudn't.
- Fix hints being sometimes wrong in ER.
- Fix minor issues with stray fairies and hints.

## [1.3.0] - 2023-02-23

### Added

- Add patchfiles for easy seed sharing.
- Add magical wisps to access Majora's Mask region in their cleared states, for ER.
- Add beatable only setting.
- Add a separate setting for hideout small keys.
- Add Dungeon ER.
- Add item counts when collecting skulls/fairies/keys.
- Add various tricks.
- Add the ability to junk locations.

### Changed

- Make logic slightly closer to OoTR.
- Make LACS and ravaged village obtainable from all kakariko entrances.
- Make web and local seeds more similar internally.
- Make Woodfall temple not raise if completed while not raised thanks to ER.
- Prevent time from flowing for Boss ER, when coming from OoT.
- Improve spoiler log readability.
- Add more internal automated tests.
- Major internal changes to the pathfinding.

### Fixed

- Fix bunny hood making the player fall off the cliff after the Keeta cutscene.
- Fix logic issues related to Fire Temple and Goron Tunic.
- Fix a rare issues with spheres not computed properly in some cases.
- Fix logic issues related to boss ER.
- Fix boss ER causing the 0th day in some cases.
- Fix logic for Swamp.
- Fix logic for ISTT.
- Fix some seeds failing to generate properly.
- Fix various issues with swordless link.
- Fix first person camera and arrow position for MM Adult Link

## [1.2.0] - 2023-02-16

### Added

- Add an in-game tracker for various items, such as small keys.
- Add nice item names in the web generator.
- Add Boss ER.

### Changed

- Improve logic regarding Goron Bomb Jump.
- Skip MM boss cutscenes.
- Reworked the rules regarding playthrough hints.
- Skip the deku princess palace cutscene.
- Skip the deku princess jail cutscene.
- Disable the owl auto-talk in MM.
- Skip most of the cremia cutscene.
- Skip the aliens cutscene.
- Skip the epona ranch cutscene.
- Allow using boots on the dpad while rolling.
- Revert to human form when taking a blue warp.

### Fixed

- Fix stray fairies/gold tokens not pausing the game properly when collected in MM.
- Fix the grotto in Zora Domain not opening properly in some cases.
- Fix adult archery giving the reward even when not having a bow.
- Fix heap corruption in OoT.
- Fix some items not having nice names.
- Fix some items being impossible to select in menus in some cases.
- Fix the sheik ice cavern song check rarely giving a corrupted item.
- Fix various minor issues with hints.
- Fix a scarecrow softlock in OoT.
- Fix dpad being very permissive.
- Fix dpad being useable on epona.
- Improved hardware compatibility.
- Fix flags being corrupted in some rare cases.

## [1.1.3] - 2023-02-11

### Added

- Add nice names to items in the spoiler log.

## [1.1.2] - 2023-02-07

### Fixed

- Fix elder goron logic.

## [1.1.1] - 2023-02-07

### Changed

- Make the ikana valley blue potion logical.

## [1.1.0] - 2023-02-01

### Added

- Add custom text to OoT scrubs telling what item they sell.
- Add door of time settings.
- Add progressive goron lullaby setting.
- Add progressive shields settings.
- Add a setting to disable master sword shuffle.
- Add OoT progressive swords setting.
- Add more settings for maps/compass shuffle.

### Changed

- Rename sound check.
- Prevent Sacred Realm and Giant's Dream from being hinted.
- Make the OoT bombchu bowling reward order fixed.
- Various logic improvements.
- Internal changes to the way item IDs work.

### Fixed

- Fix crashes on hardware when coming back to OoT from MM.

## [1.0.1] - 2023-01-30

### Added

- Add hashs to seeds.

### Fixed

- Fix a logic issue with the DMC bean.
- Fix the open chests in the Moon's Goron Trial being affected by CSMC.
- Fix the Mikau check sometimes not working.
- Fix a duplication bug with the Fire Arrow check in OoT.
- Fix MM trade items being permanently lost when duping bottles over them.
- Fix Farore's Wind letting you warp across ages.
- Fix a softlock when closing the scarecrow textbox too fast in OoT.
- Fix drops not having icons when picked up.
- Fix the town guards having inconsistent behavior in MM.
- Fix the vanilla OoT 1.0 empty bomb glitch.
- Fix adult link having initial equips that the player might not be supposed to have.
- Fix a softlock in MM when voiding without having the Deku Mask.
- Fix buying bomb in OoT sometimes not working.
- Fix the ocarina making trumpet noises in MM after doing the monkey check.
- Fix owls always grabbing you after being talked to in OoT.
- Fix swordless link in OoT having weird behavior with the sword slot.
- Worked around a Project64 bug that causes crashes when entering OoT adult Bazaar.
- Fix collecting the ocarina check in MM while having the hookshot in hand causing major glitches and corruption.
- Fix severe issues with the pathfinder causing it to be overly restrictive.
- Fix a flag issue with the pictobox check.

### Changed

- Make tingle airborne even without magic.
- Make time flow normally in MM irrespective of having an ocarina.
- Make the monkey check kick you out of Deku palace.

## [1.0.0] - 2023-01-22

### Added

- Initial stable release.

[Unreleased]: https://github.com/OoTMM/OoTMM/compare/v27.0...HEAD
[27.0]: https://github.com/OoTMM/OoTMM/compare/v26.1...v27.0
[26.1]: https://github.com/OoTMM/OoTMM/compare/v26.0...v26.1
[26.0]: https://github.com/OoTMM/OoTMM/compare/v25.0...v26.0
[25.0]: https://github.com/OoTMM/OoTMM/compare/v24.1...v25.0
[24.1]: https://github.com/OoTMM/OoTMM/compare/v24.0...v24.1
[24.0]: https://github.com/OoTMM/OoTMM/compare/v23.1...v24.0
[23.1]: https://github.com/OoTMM/OoTMM/compare/v23.0...v23.1
[23.0]: https://github.com/OoTMM/OoTMM/compare/v22.0...v23.0
[22.0]: https://github.com/OoTMM/OoTMM/compare/v21.0...v22.0
[21.0]: https://github.com/OoTMM/OoTMM/compare/v20.0...v21.0
[20.0]: https://github.com/OoTMM/OoTMM/compare/v19.2...v20.0
[19.2]: https://github.com/OoTMM/OoTMM/compare/v19.1...v19.2
[19.1]: https://github.com/OoTMM/OoTMM/compare/v19.0...v19.1
[19.0]: https://github.com/OoTMM/OoTMM/compare/v18.3...v19.0
[18.3]: https://github.com/OoTMM/OoTMM/compare/v18.2...v18.3
[18.2]: https://github.com/OoTMM/OoTMM/compare/v18.1...v18.2
[18.1]: https://github.com/OoTMM/OoTMM/compare/v18.0...v18.1
[18.0]: https://github.com/OoTMM/OoTMM/compare/v17.3...v18.0
[17.3]: https://github.com/OoTMM/OoTMM/compare/v17.2...v17.3
[17.2]: https://github.com/OoTMM/OoTMM/compare/v17.1...v17.2
[17.1]: https://github.com/OoTMM/OoTMM/compare/v17.0...v17.1
[17.0]: https://github.com/OoTMM/OoTMM/compare/v16.0...v17.0
[16.0]: https://github.com/OoTMM/OoTMM/compare/v15.0...v16.0
[15.0]: https://github.com/OoTMM/OoTMM/compare/v14.1...v15.0
[14.1]: https://github.com/OoTMM/OoTMM/compare/v14.0...v14.1
[14.0]: https://github.com/OoTMM/OoTMM/compare/v1.13.0...v14.0
[1.13.1]: https://github.com/OoTMM/OoTMM/compare/v1.13.0...v1.13.1
[1.13.0]: https://github.com/OoTMM/OoTMM/compare/v1.12.4...v1.13.0
[1.12.4]: https://github.com/OoTMM/OoTMM/compare/v1.12.3...v1.12.4
[1.12.3]: https://github.com/OoTMM/OoTMM/compare/v1.12.2...v1.12.3
[1.12.2]: https://github.com/OoTMM/OoTMM/compare/v1.12.1...v1.12.2
[1.12.1]: https://github.com/OoTMM/OoTMM/compare/v1.12.0...v1.12.1
[1.12.0]: https://github.com/OoTMM/OoTMM/compare/v1.11.0...v1.12.0
[1.11.0]: https://github.com/OoTMM/OoTMM/compare/v1.10.1...v1.11.0
[1.10.1]: https://github.com/OoTMM/OoTMM/compare/v1.10.0...v1.10.1
[1.10.0]: https://github.com/OoTMM/OoTMM/compare/v1.9.0...v1.10.0
[1.9.0]: https://github.com/OoTMM/OoTMM/compare/v1.8.0...v1.9.0
[1.8.0]: https://github.com/OoTMM/OoTMM/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/OoTMM/OoTMM/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/OoTMM/OoTMM/compare/v1.5.1...v1.6.0
[1.5.1]: https://github.com/OoTMM/OoTMM/compare/v1.5.0...v1.5.1
[1.5.0]: https://github.com/OoTMM/OoTMM/compare/v1.4.2...v1.5.0
[1.4.2]: https://github.com/OoTMM/OoTMM/compare/v1.4.1...v1.4.2
[1.4.1]: https://github.com/OoTMM/OoTMM/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/OoTMM/OoTMM/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/OoTMM/OoTMM/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/OoTMM/OoTMM/compare/v1.1.3...v1.2.0
[1.1.3]: https://github.com/OoTMM/OoTMM/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/OoTMM/OoTMM/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/OoTMM/OoTMM/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/OoTMM/OoTMM/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/OoTMM/OoTMM/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/OoTMM/OoTMM/releases/tag/v1.0.0
