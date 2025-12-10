import { readInput } from '../input.js';

let pos = 0;
const splitters = [];
let width;
let height = 0;
let initial;
readInput((s, line) => {
  if (line === 0) width = s.length;
  height++;
  return s.split('').map((c, idx) => {
    switch (c) {
      case 'S':
        initial = idx;
        break;
      case '^':
        if (!splitters[line]) splitters[line] = new Set();
        splitters[line].add(idx);
        break;
    }
  })
});

let beams = Array.from({ length: width }).map((_, idx) => idx === initial ? 1 : 0);
let sum = 0;

while (++pos < height) {
  let reach = Array.from({ length: width }).map((_, idx) => 0);
  if (splitters[pos]) {
    for (let i = 0; i < width; ++i) {
      if (splitters[pos].has(i)) {
        beams[i - 1] += beams[i];
        beams[i + 1] += beams[i];
        reach[i] += beams[i];
        beams[i] = 0;
      }
    }
  }
  sum += reach.reduce((a, b) => a + b);
}

console.log(1 + sum);
