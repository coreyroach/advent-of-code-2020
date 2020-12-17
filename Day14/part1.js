const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs
  .readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8')
  .split('\n');

const p0 = performance.now();

const memory = {};
let currMask;

function applyMask(val, mask) {
  const masked = val.split('').map((v, i) => {
    if (mask[i] === 'X') return v;
    return mask[i];
  }).join('');

  return masked;
}

for (line of input) {
  if (line.indexOf('mask') === 0) {
    currMask = line.split(' = ')[1].split('');
  } else {
    const [, addr, val] = /^mem\[(\d+)*\] = (\d+)/.exec(line);
    const bin = parseInt(val, 10).toString(2).padStart(36, '0');
    const masked = applyMask(bin, currMask);

    memory[addr] = parseInt(masked, 2);
  }
}

const sum = Object.values(memory).reduce((acc, cur) => (acc + cur), 0);

const p1 = performance.now();

console.log(sum);
console.log(`${p1 - p0}ms`);