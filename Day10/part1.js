const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const list = input.split('\n').map(n => Number(n)).sort((a,b) => a-b);
let j1 = 1;
let j3 = 1;

const p0 = performance.now();

for (let i = 0; i < list.length - 1; i++) {
  const adapter = list[i];
  const next = list[i+1];
  const diff = next - adapter;
  if (diff === 1) j1++;
  if (diff === 3) j3++;
}

const p1 = performance.now();

console.log(j1*j3);
console.log(`${p1 - p0}ms`);