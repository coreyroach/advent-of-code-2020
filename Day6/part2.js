const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const groups = input.split('\n\n');

function uniqueAnswers(acc, curr, idx) {
  const s = curr.split('');
  if (idx === 0) {
    return s;
  } else {
    return acc.filter(a => s.indexOf(a) >= 0);
  }
}

const p0 = performance.now();

const count = groups.reduce((acc, group) => {
  const answers = group.split('\n').reduce(uniqueAnswers, []).sort();
  acc += answers.length;
  return acc;
}, 0);

const p1 = performance.now();

console.log(count);
console.log(`${p1 - p0}ms`);