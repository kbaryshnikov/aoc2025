import { readInput } from '../input.js';

const verboseIdx = process.argv.findIndex((a) => a === '-v');
const verbose = verboseIdx >= 0;
if (verbose) process.argv.splice(verboseIdx, 1);

const err = (e) => { throw new Error(e); }
const enclosing = (s, start, end) => s[0] === start && s[s.length - 1] === end ? s.slice(1, s.length - 1) : err(`Not enclosed in ${start} ${end}: ${s}`);
const parseState = (s) => enclosing(s, '[', ']').split('').reduceRight((acc, c) => (acc << 1) | (c === '#' ? 1 : 0) , 0);
const toMask = (s) => s.reduce((acc, n) => acc | (1 << n), 0);
const parseNumList = (s, start, end) => enclosing(s, start, end).split(',').map((n) => +n);
const parseButton = (s) => toMask(parseNumList(s, '(', ')'));
const parse = (s) => {
  const tokens = s.split(' ');
  const state = parseState(tokens.shift());
  tokens.pop();
  const buttons = tokens.map(parseButton);
  return { state, buttons };
};
const machines = readInput((s) => parse(s));

const toggle = (button, state) => state ^ button;

const findSequence = (machine) => {
  const queue = [];
  const push = (button, state, sequenceLen) => {
    queue.push({ button, state, sequenceLen });
  };
  const pushAllExcept = (lastButton, state, sequenceLen) => {
    machine.buttons.forEach((button) => {
      if (lastButton !== button) {
        push(button, state, sequenceLen);
      }
    });
  };
  pushAllExcept(-1, 0, 0);
  let i = 0;
  while (i < queue.length) {
    const { button, state, sequenceLen } = queue[i++];
    const len = sequenceLen + 1;
    const newState = toggle(button, state);
    if (newState === machine.state) {
      return len;
    }
    verbose && process.stdout.write(`\r${len} | ${queue.length} |`);
    pushAllExcept(button, newState, len);
  }
  throw new Error('Not found');
};

let result = 0;
for (let i = 0; i < machines.length; ++i) {
  verbose && process.stdout.write(`\r                  ${i+1} of ${machines.length}...`);
  const len = findSequence(machines[i]);
  result += len;
}
verbose && process.stdout.write('\n');
console.log(result);
