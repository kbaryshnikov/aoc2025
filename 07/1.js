import { readInput } from '../input.js';

let pos = 0;
const beams = new Set();
const splitters = [];
let width;
let height = 0;
readInput((s, line) => {
  if (line === 0) width = s.length;
  height++;
  return s.split('').map((c, idx) => {
    switch (c) {
      case 'S':
        beams.add(idx);
        break;
      case '^':
        if (!splitters[line]) splitters[line] = new Set();
        splitters[line].add(idx);
        break;
    }
  })
});
let splits = 0;
const add = (pos) => {
  if (beams.has(pos)) return;
  beams.add(pos);
}
while (++pos < height) {
  if (splitters[pos]) {
    for (const beam of beams) {
      if (splitters[pos].has(beam)) {
        beams.delete(beam);
        if (beam > 0) {
          add(beam - 1);
        }
        if (beam < width - 1) {
          add(beam + 1);
        }
        splits++;
      }
    }
  }
}
console.log(splits);
