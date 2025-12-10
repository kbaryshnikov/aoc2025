import { readInputFiltered } from '../input.js';

const ranges = [];
const avail = [];

let readMode = 0;
readInputFiltered((s) => {
  switch (readMode) {
    case 0: {
      if (s === '') {
        readMode = 1;
      } else {
        const [min, max] = s.split('-').map((v) => parseInt(v, 10));
        ranges.push([min, max]);
      }
      break;
    }
    case 1:
      if (s !== '') {
        avail.push(parseInt(s, 10));
      }
      break;
  }
}, () => true);

let count = 0;
for (const a of avail) {
  for (const [min, max] of ranges) {
    if (a >= min && a <= max) {
      count++;
      break;
    }
  }
}

console.log(count);
