import { readInput } from '../input.js';

const input = readInput((s) => s);
const tasks = [];
const width = input[0].length;
const height = input.length - 1;

const opsLine = input[height];
const ops = [];
let start = 0;
let end = 0;
let op = '';
for (let i = 0; i < opsLine.length; i++) {
  const chr = opsLine.charAt(i);
  if (chr === '' || chr === ' ') {
    end = i;
  } else {
    if (op !== '') {
      ops.push({ op, start, end });
    }
    op = chr;
    start = i;
    end = i;
  }
}
ops.push({ op, start, end: end + 1 });

for (const { op, start, end } of ops) {
  let values = [];
  for (let x = end; x >= start; --x) {
    let value = '';
    for (let i = 0; i < height; ++i) {
      value += input[i].charAt(x);
    }
    values.push(value);
  }
  values = values.map((v) => v.trim()).filter((v) => v.length).map((v) => +v);
  tasks.push({ op, values });
}

const evaluate = ({ op, values }) => values.reduce((a, b) => ({
  '+': () => a + b,
  '*': () => a * b,
})[op]());

let sum = 0;
for (const task of tasks) {
  const result = evaluate(task);
  sum += result;
}
console.log(sum);
