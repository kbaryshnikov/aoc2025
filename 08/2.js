import { readInput } from '../input.js';

const boxes = readInput((s) => s.split(',').map((c) => +c));

const dist = (a, b) => {
  const parts = [];
  for (let i = 0; i < 3; i++) {
    parts.push((a[i] - b[i])**2);
  }
  return Math.sqrt(parts.reduce((i, j) => i + j));
};

const pairs = [];
for (let i = 0; i < boxes.length - 1; ++i) {
  for (let j = i + 1; j < boxes.length; j++) {
    const distance = dist(boxes[i], boxes[j]);
    pairs.push([distance, boxes[i], boxes[j]]);
  }
}
pairs.sort((a, b) => a[0] - b[0]);

const circuits = new Set();
const getCircuit = (a) => {
  if (!a.circuit) {
    circuits.add(a.circuit = new Set([a]));
  }
  return a.circuit;
}

let lastPair;
pairs.forEach(([, a, b]) => {
  const ca = getCircuit(a);
  const cb = getCircuit(b);
  if (ca === cb) return;
  const c = ca.union(cb);
  for (const x of c) {
    x.circuit = c;
  }
  circuits.delete(ca);
  circuits.delete(cb);
  circuits.add(c);
  lastPair = [a, b];
});

console.log(lastPair[0][0] * lastPair[1][0]);

