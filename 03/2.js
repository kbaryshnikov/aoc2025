import { readInput } from '../input.js';

const banks = readInput((s) => s.split('').map(s => parseInt(s, 10)));

function findBestDigits(bank, num, left) {
  left ||= 0;
  let max = -1;
  let index = -1;
  for (let i = bank.length - num; i >= left; i--) {
    if (bank[i] >= max) {
      index = i;
      max = bank[i];
    }
  }
  const value = max * (10 ** (num - 1));
  const increment = num > 1 ? findBestDigits(bank, num - 1, index + 1) : 0;
  const result = value + increment;
  return result;
}

let sum = 0;
for (const bank of banks) {
  const max = findBestDigits(bank, 12);
  sum += max;
}

console.log(sum);
