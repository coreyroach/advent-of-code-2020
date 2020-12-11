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

outer:
for (let i = values.length - 1; i>0; i--) {
  for (let j = 0; j<values.length; j++) {
    if (j === i) continue;
    const diff = target - (values[i] + values[j]);
    const idx = mapped[diff];
    if (idx) {
      result = values[i] * values[j] * idx;
      break outer;
    }
  }
  count++;
}

const p1 = performance.now();

console.log(`${result}`);
console.log(`${count} Loops`);
console.log(`${p1 - p0}ms`);