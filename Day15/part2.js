const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs
  .readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8')
  .split(',')
  .map(Number);

const p0 = performance.now();

const maxTurns = 30_000_000;
const history = new Map();

input.forEach((val, idx) => history.set(val, idx + 1));

let lastSpoken;
let step = input[input.length - 1];

for (let i = input.length; i<maxTurns; i++) {
  step = history.has(step) ? i - history.get(step) : 0;
  history.set(lastSpoken, i);
  lastSpoken = step;
}

const p1 = performance.now();

console.log(step);
console.log(`${p1 - p0}ms`);