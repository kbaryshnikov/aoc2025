import { readInput } from '../input.js';

const parseRegionLine = (s) => {
  const tokens = s.split(' ');
  const size = tokens.shift().replace(/:\s*$/, '').split('x').map(v => +v);
  const shapes = tokens.map(v => +v);
  return { size, shapes };
};
let readMode = 0;
let fig = [];
const figs = [];
const regions = [];
readInput((s) => {
  switch (readMode) {
    case 1:
      fig.push(s.split('').map(c => c === '#'));
      if (fig.length === 3) {
        fig.squares = fig.reduce((a, b) => a + b.reduce((x, y) => +x + +y), 0);
        figs.push(fig);
        readMode = 0;
      }
      break;
    case 0:
      if (s.endsWith(':')) {
        fig = [];
        readMode = 1;
        break;
      }
      readMode = 2;
    case 2:
      regions.push(parseRegionLine(s));
      break;
  }
});

const canFitIfPackedWithoutGaps = (region) => {
  const squares = region.shapes.map((count, index) => figs[index].squares * count).reduce((a, b) => a + b);
  const wp = Math.floor(region.size[0]);
  const hp = Math.floor(region.size[1]);
  return wp * hp >= squares;
};

let sum = 0;
for (const region of regions) {
  if (canFitIfPackedWithoutGaps(region)) { // :) it works for real input (not the example one)
    sum++;
  }
}

console.log(sum);
