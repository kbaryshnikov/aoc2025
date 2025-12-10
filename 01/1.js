import { readInput } from '../input.js';

const input = readInput();

let pos = 50;
let pass = 0;
for (const op of input) {
  const rot = parseInt(({ L: '-', R: '+' })[op.charAt(0)] + op.substring(1), 10);
  pos = (pos + rot + 100) % 100;
  if (pos === 0) pass++;
}
console.log(pass);
