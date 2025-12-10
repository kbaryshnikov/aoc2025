import * as fs from 'fs';

export const readFile = (filename, lineParser, sep, filter) => fs.readFileSync(filename, 'utf8').split(sep || /\r?\n/).filter(v => filter ? filter(v) : v.trim().length > 0).map((v, i) => lineParser ? lineParser(v, i) : v);

export const readInput = (parser, sep) => readFile(process.argv[2] ?? 'input', parser, sep);

export const readInputFiltered = (parser, filter, sep) => readFile(process.argv[2] ?? 'input', parser, sep, filter);

