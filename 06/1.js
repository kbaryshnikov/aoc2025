import { readInput } from '../input.js';

const input = readInput((s) => s.trim().split(/\s+/));
const tasks = [];
const width = input[0].length;
const height = input.length - 1;
for (let i = 0; i < width; ++i) {
  const op = input[height][i];
  const values = [];
  for (let j = 0; j < height; ++j) {
    values.push(+input[j][i]);
  }
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
