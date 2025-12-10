import { readInput } from '../input.js';

const ranges = readInput((s) => s.split('-').map(s => parseInt(s, 10)), ',');

const digits = (value) => Math.ceil(Math.log10(value + 1));

const toCheck = [];

for (const range of ranges) {
  const [a, b] = range;
  let db = digits(b);
  let min = a;
  let dm;
  while ((dm = digits(min)) < db) {
    toCheck.push([min, (10 ** dm) - 1]);
    min = 10 ** dm;
  }
  toCheck.push([min, b]);
}

const found = new Set();
for (const [min, max] of toCheck) {
  const len = digits(min);
  for (let l = 1; l <= Math.floor(len / 2); l++) {
    const a1 = +(`${min}`.slice(0, l));
    const b1 = +(`${max}`.slice(0, l));
    const rep = len / l;
    for (let i = a1; i <= b1; i++) {
      const n = +(`${i}`.repeat(rep));
      if (n >= min && n <= max) {
        found.add(n);
      }
    }
  }
}

const sum = Array.from(found).reduce((sum, item) => sum + item, 0);

console.log(sum);
