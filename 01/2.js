import { readInput } from '../input.js';

const input = readInput();

let pos = 50;
let pass = 0;
for (const op of input) {
  const inc = ({ L: -1, R: 1 })[op.charAt(0)];
  const times = parseInt(op.substring(1), 10);
  for (let i = 0; i < times; i++) {
    pos = (pos + inc + 100) % 100;
    if (pos == 0) {
      pass += 1;
    }
  }
}
console.log(pass);
