import { Options } from "../options";
import { playthrough } from "./playthrough";
import { ItemPlacement } from "./solve";
import { World } from "./world";

const spoilerRaw = (buffer: string[], placement: ItemPlacement) => {
  for (const loc in placement) {
    buffer.push(`${loc}: ${placement[loc]}`);
  }
  buffer.push('');
};

const spoilerSpheres = (buffer: string[], world: World, placement: ItemPlacement) => {
  const spheres = playthrough(world, placement);
  for (const i in spheres) {
    buffer.push(`Sphere ${i}`);
    const sphere = spheres[i];
    for (const loc of sphere) {
      buffer.push(`  ${loc}: ${placement[loc]}`);
    }
    buffer.push('');
  }
};

export const spoiler = (world: World, placement: ItemPlacement, opts: Options) => {
  const buffer: string[] = [];
  buffer.push(`Seed: ${opts.seed}`);
  buffer.push('');
  spoilerRaw(buffer, placement);
  if (!opts.settings.noLogic) {
    spoilerSpheres(buffer, world, placement);
  }
  return buffer.join("\n");
};
