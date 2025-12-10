import { readInputFiltered } from '../input.js';

const ranges = [];
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
      break;
  }
}, () => true);

ranges.sort((a, b) => a[0] - b[0]);
for (let i = 1; i < ranges.length; ) {
  const last = ranges[i - 1];
  const curr = ranges[i];
  if (curr[0] <= last[1]) {
    last[1] = Math.max(last[1], curr[1]);
    ranges.splice(i, 1);
  } else {
    ++i;
  }
}
const count = ranges.reduce((carry, item) => carry + (item[1] - item[0] + 1), 0);
console.log(count);
