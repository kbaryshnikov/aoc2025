import { readInput } from '../input.js';

const ranges = readInput((s) => s.split('-').map(s => parseInt(s, 10)), ',');

const digits = (value) => Math.ceil(Math.log10(value + 1));
const split2 = (value) => {
  let s = `${value}`;
  if (s.length % 2) throw new Error('!');
  const mid = s.length / 2;
  return [+s.slice(0, mid), +s.slice(mid)];
}
const join2 = (a, b) => +`${a}${b}`;

const toCheck = [];

for (const range of ranges) {
  const [a, b] = range;
  let db = digits(b);
  let min = a;
  let dm;
  while ((dm = digits(min)) < db) {
    if (dm % 2 === 0) {
      toCheck.push([min, (10 ** dm) - 1]);
    }
    min = 10 ** dm;
  }
  if (dm % 2 === 0) {
    toCheck.push([min, b]);
  }
}

const found = [];
for (const [min, max] of toCheck) {
  const [a1] = split2(min);
  const [b1] = split2(max);
  for (let i = a1; i <= b1; i++) {
    const n = join2(i, i);
    if (n >= min && n <= max) {
      found.push(n);
    }
  }
}

const sum = found.reduce((sum, item) => sum + item, 0);

console.log(sum);
