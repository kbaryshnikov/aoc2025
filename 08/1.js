import { readInput } from '../input.js';

const limit = parseInt(process.argv[3], 10);
if (!(limit > 1)) process.exit(1);
const resLimit = process.argv[4] ? parseInt(process.argv[4], 10) : 3;

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
    let p = 0;
    while (p < pairs.length && distance > pairs[p][0]) p++;
    if (p < limit) {
      pairs.splice(p, 0, [distance, boxes[i], boxes[j]]);
    }
    pairs.splice(limit);
  }
}

const circuits = new Set();
const getCircuit = (a) => {
  if (!a.circuit) {
    circuits.add(a.circuit = new Set([a]));
  }
  return a.circuit;
}

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
});

const sortedCircuirs = [...circuits].sort((a, b) => b.size - a.size);
const res = sortedCircuirs.slice(0, resLimit).map((s) => s.size);

console.log(res.reduce((a, b) => a * b, 1));

