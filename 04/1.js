import { readInput } from '../input.js';

const map = readInput((s) => s.split('').map((c) => c === '@'));

const countAdjRolls = (y, x) => {
  let count = 0;
  for (let line = y - 1; line <= y + 1; line++) {
    for (let col = x - 1; col <= x + 1; col++) {
      if (line === y && col === x) continue;
      if (map[line]?.[col]) count++;
    }
  }
  return count;
};

const height = map.length;
const width = map[0].length;

let sum = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (map[y][x]) {
      const count = countAdjRolls(y, x);
      if (count < 4) {
        sum++;
      }
    }
  }
}
console.log(sum);
