const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const p0 = performance.now();

const [rawTS, rawList] = input.split('\n');
const ts = Number(rawTS);
const list = rawList.split(',').filter(s => s !== 'x').map(n => Number(n));

let count = ts-1;
let busID = 0;

while(busID === 0) {
  count++;
  for (let i = 0; i<list.length; i++) {
    if (count%list[i] === 0) {
      busID = list[i];
      break;
    }
  }
}

const p1 = performance.now();

console.log(busID * (count-ts));
console.log(`${p1 - p0}ms`);