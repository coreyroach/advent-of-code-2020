const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');
const mapped = input.split('\n').reduce((acc, val) => {
  acc[val] = parseInt(val);
  return acc;
}, {});

const values = Object.values(mapped);

const target = 2020;
let result = 0;
let count = 0;

const p0 = performance.now();

for (let i = values.length - 1; i>0; i--) {
  const diff = target - values[i];
  const idx = mapped[diff];
  if (idx) {
    result = values[i] * idx;
    break;
  }
  count++;
}

const p1 = performance.now();

console.log(`${result}`);
console.log(`${count} Loops`);
console.log(`${p1 - p0}ms`);