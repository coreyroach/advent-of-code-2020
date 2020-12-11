const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const rows = input.split('\n');
const len = rows[0].length;

let treeCount = 0;

const p0 = performance.now();

for (let x = 3, y = 1; y<rows.length; x+=3, y++) {
  if (rows[y].charAt(x%len) === '#') {
    treeCount++;
  }
}

const p1 = performance.now();

console.log(`Rows: ${rows.length}`);
console.log(`Tree Count: ${treeCount}`);
console.log(`${p1 - p0}ms`);