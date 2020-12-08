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

function testRule(bag) {
  const m = map[bag];
  let contains = false;
  if (m) {
    const c = map[bag].map(b => b.replace(/^([0-9]*)\s/, ''))
    contains = c.indexOf(myBag) !== -1 || c.some(b => testRule(b));
  }
  return contains;
}

const count = Object.keys(map).reduce((acc, key) => {
  if (testRule(key)) acc++;
  return acc;
}, 0);

const p1 = performance.now();

console.log(count);
console.log(`${p1 - p0}ms`);