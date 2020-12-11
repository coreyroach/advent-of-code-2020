const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const rows = input.split('\n');
const len = rows[0].length;

const p0 = performance.now();

function countTrees(iX, iY) {
  let count = 0;
  for (let x = iX, y = iY; y<rows.length; x+=iX, y+=iY) {
    if (rows[y].charAt(x%len) === '#') {
      count++;
    }
  }
  return count;
}

const treeCount = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
].reduce((acc, vals) => {
  return acc * countTrees(...vals);
}, 1);

const p1 = performance.now();

console.log(`Rows: ${rows.length}`);
console.log(`Tree Count: ${treeCount}`);
console.log(`${p1 - p0}ms`);