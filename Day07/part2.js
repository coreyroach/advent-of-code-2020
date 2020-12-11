const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const rules = input.split('\n');
const myBag = 'shiny gold';

const p0 = performance.now();

const map = rules.reduce((acc, rule) => {
  const [a, b = ''] = rule.split('contain').map(s => s.replace(/bags?|\./g, ''));
  acc[a.trim()] = b.split(',').map(r => r.trim());
  return acc;
}, {});

function countBags(bag, bagCount) {
  const m = map[bag];
  if (m) {
    const mm = m.map(b => /^([0-9]*)\s([a-z\s]*)$/.exec(b));
    mm.forEach((b) => {
      if (b) {
        const c = parseInt(b[1]);
        const cb = countBags(b[2], 0);
        bagCount += + c + c * cb;
      }
    });
  }
  return bagCount;
}

const count = countBags(myBag, 0);

const p1 = performance.now();

console.log(count);
console.log(`${p1 - p0}ms`);