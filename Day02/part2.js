const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const exp = /^([0-9]*)-([0-9]*) ([a-z]): ([a-z]*)$/gim;

const p0 = performance.now();

function testPolicy(a, b, ltr, pass) {
  const charA = pass.charAt(a - 1);
  const charB = pass.charAt(b - 1);
  if (charA === charB) return false;
  return charA === ltr || charB === ltr;
}

let match = exp.exec(input);
let validCount = 0;
let count = 0;

while (match !== null) {
  match.shift();
  if (testPolicy(...match)) {
    validCount++;
  }
  count++;
  match = exp.exec(input);
}

const p1 = performance.now();

console.log(`Records: ${count}`);
console.log(`Valid Passwords: ${validCount}`);
console.log(`${p1 - p0}ms`);