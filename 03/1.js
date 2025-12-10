import { readInput } from '../input.js';

const banks = readInput();

const findMax = (bank) => {
  let max1 = [0, bank[0]];
  for (let i = 1; i < bank.length; i++) {
    if (bank[i] > max1[1]) max1 = [i, bank[i]];
  }

  let max2 = [-1, -1];
  for (let i = max1[0] - 1; i >= 0; i--) {
    let value = +(`${bank[i]}${max1[1]}`);
    if (value > max2[1]) {
      max2 = [i, value];
    }
  }

  let max3 = [-1, -1];
  for (let i = max1[0] + 1; i < bank.length; i++) {
    let value = +(`${max1[1]}${bank[i]}`);
    if (value > max3[1]) {
      max3 = [i, value];
    }
  }

  return Math.max( max2[1], max3[1] );
};

let sum = 0;
for (const bank of banks) {
  const max = findMax(bank);
  sum += max;
}

console.log(sum);
