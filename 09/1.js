import { readInput } from '../input.js';

const reds = readInput((s) => s.split(',').map((c) => +c));
const areaof = (a, b) => Math.abs(a[0] - b[0] + 1) * Math.abs(a[1] - b[1] + 1);

let max = 0;
for (let i = 0; i < reds.length - 1; ++i) {
  for (let j = 0; j < reds.length; ++j) {
    const area = areaof(reds[i], reds[j]);
    if (area > max) max = area;
  }
}
console.log(max);
