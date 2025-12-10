import { readInput } from '../input.js';
import { init } from 'z3-solver';

const verboseIdx = process.argv.findIndex((a) => a === '-v');
const verbose = verboseIdx >= 0;
if (verbose) process.argv.splice(verboseIdx, 1);

const err = (e) => { throw new Error(e); }
const enclosing = (s, start, end) => s[0] === start && s[s.length - 1] === end ? s.slice(1, s.length - 1) : err(`Not enclosed in ${start} ${end}: ${s}`);
const parseNumList = (s, start, end) => enclosing(s, start, end).split(',').map((n) => +n);
const parseButton = (s) => parseNumList(s, '(', ')');
const parseJoltages = (s) => parseNumList(s, '{', '}');
const parse = (s) => {
  const tokens = s.split(' ');
  tokens.shift();
  const state = parseJoltages(tokens.pop());
  const buttons = tokens.map(parseButton);
  return { state, buttons };
};
const machines = readInput((s) => parse(s));

const extractModelValues = (model) => {
  const result = [];

  for (const decl of model.decls()) {
    const name = decl.name();
    const idx = +name.slice(1);
    const val = model.get(decl);
    result[idx] = +val.toString();
  }

  return result;
}

const solve = async (z3, { state, buttons }) => {
  verbose && process.stdout.write('\r Initializing |');
  const solver = new z3.Optimize();

  const presses = [];
  const which = Array.from({ length: state.length }, () => []);
  for (let i = 0; i < buttons.length; ++i) {
    presses[i] = z3.Int.const(`P${i}`);
    solver.add(presses[i].ge(0));
    for (const idx of buttons[i]) {
      which[idx].push(i);
    }
  }
  for (let j = 0; j < state.length; ++j) {
    solver.add(which[j].reduce((acc, idx) => {
      return acc === null ? presses[idx] : acc.add(presses[idx]);
    }, null).eq(state[j]));
  }

  solver.minimize(presses.reduce((a, b) => a.add(b)));

  verbose && process.stdout.write('\r Solving      |');

  if ('sat' !== await solver.check()) {
    throw new Error('sat expected');
  }
  const results = extractModelValues(solver.model());
  verbose && process.stdout.write('\r Done         |');
  return results.reduce((a, b) => a + b);
};

async function main() {
  const { Context } = await init();
  const { Optimize, Int } = new Context();
  let sum = 0;
  for (let i = 0; i < machines.length; ++i) {
    verbose && process.stdout.write(`\r                  ${i+1} of ${machines.length}...`);
    sum += await solve({ Optimize, Int }, machines[i]);
  }
  verbose && process.stdout.write('\n');
  return sum;
}
main().then(console.log);

