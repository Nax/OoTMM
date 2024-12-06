import { png } from '../../combo/util/png';

export const font = async (filename: string) => {
  const original = await png(filename, 'i4');
  const newBuffer = new Uint8Array(original.byteLength);
  const indexMax = original.byteLength / ((8 * 12) / 2);

  /* Make font vertical */
  let cursor = 0;
  for (let index = 0; index < indexMax; ++index) {
    const indexX = index % 16;
    const indexY = Math.floor(index / 16);
    for (let row = 0; row < 12; ++row) {
      const rowPos = ((indexY * 12) + row) * ((8 * 16) / 2) + indexX * (8 / 2);
      for (let i = 0; i < 4; ++i) {
        const v = original[rowPos + i];
        newBuffer[cursor] = v;
        cursor++;
      }
    }
  }

  return newBuffer;
};
