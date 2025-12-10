import { readInput } from '../input.js';

const reds = readInput((s) => s.split(',').map((c) => +c));

const boxes = [];
const edges = [];

const Box = (a, b) => {
  const [left, right] = a[0] < b[0] ? [a[0], b[0]] : [b[0], a[0]];
  const [top, bottom] = a[1] < b[1] ? [a[1], b[1]] : [b[1], a[1]];
  return { left, right, top, bottom };
};

const areaof = (box) => (box.right - box.left + 1) * (box.bottom - box.top + 1);

const overlaps = (a, b) => !(a.left <= b.right && a.right <= b.left)
                        && !(a.left >= b.right && a.right >= b.left)
                        && !(a.top <= b.bottom && a.bottom <= b.top)
                        && !(a.top >= b.bottom && a.bottom >= b.top);

const intersectsEdge = (box) => edges.some((edge) => overlaps(edge, box));

for (let i = 0; i < reds.length - 1; ++i) {
  let j = i + 1;
  const b = Box(reds[i], reds[j]);
  edges.push(b);
  boxes.push(b);
  while (++j < reds.length) boxes.push(Box(reds[i], reds[j]));
}
edges.push(Box(reds[reds.length - 1], reds[0]));

const max = boxes.reduce((max, box) => intersectsEdge(box) ? max : Math.max(max, areaof(box)), 0);

console.log(max);

