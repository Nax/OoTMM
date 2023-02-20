import fs from 'fs/promises';
import YAML from 'yaml';

import { generate } from "./combo";
import { OptionsInput } from "./combo/options";

const makeOptions = async (args: string[]): Promise<OptionsInput> => {
  const opts: OptionsInput = {};
  opts.settings = {};

  for (let i = 0; i < args.length; i++) {
    const opt = args[i];
    switch (opt) {
    case "--debug":
      opts.debug = true;
      break;
    case "--seed":
      opts.seed = args[++i];
      break;
    case "--config":
      {
        const configFile = await fs.readFile(args[++i]);
        const settings = YAML.parse(configFile.toString());
        opts.settings = settings;
        break;
      }
    default:
      throw new Error(`Unknown option: ${opt}`);
    }
  }
  return opts;
};

const main = async () => {
  const opts = await makeOptions(process.argv.slice(2));
  const [oot, mm] = await Promise.all([
    fs.readFile('./roms/oot.z64'),
    fs.readFile('./roms/mm.z64'),
  ]);
  const gen = generate({ oot, mm, opts });
  const { rom, log } = await gen.run();
  await fs.mkdir('out', { recursive: true });

  if (log === null) {
    return fs.writeFile('out/OoTMM.z64', rom);
  } else {
    return Promise.all([
      fs.writeFile('out/OoTMM.z64', rom),
      fs.writeFile('out/spoiler.txt', log),
    ]);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

