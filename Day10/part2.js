const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const p0 = performance.now();

const list = input.split('\n').map(n => Number(n)).sort((a,b) => a-b);
list.unshift(0);
list.push(list[list.length-1] + 3);

const tribonacci = Array.from(Array(20)).reduce((acc, n, idx) => {
  if (idx > 3) {
    acc.push(acc[idx-1] + acc[idx-2] + acc[idx-3]);
  }
  return acc;
}, [0,1,2,4]);

let arrangements = 1;
let acc = 0;

for (let i = 0; i < list.length; i++) {
  const adapter = list[i];
  const prev = list[i-1];
  const diff = prev ? adapter - prev : adapter;
  if (diff === 1) acc++;
  else {
    if (acc > 0) {
      arrangements *= tribonacci[acc];
      acc = 0;
    }
  }
}

const p1 = performance.now();

console.log(arrangements);
console.log(`${p1 - p0}ms`);