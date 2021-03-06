const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const list = input.split('\n').map(n => Number(n));
const preamble = 25;

function testPreamble(num, slice) {
  let isValid = false;
  outer:
  for (let i = 0; i<slice.length; i++) {
    for (let j = 0; j<slice.length; j++) {
      if (slice[i] !== slice[j] && slice[i] + slice[j] === num) {
        isValid = true;
        break outer;
      }
    }
  }

  return isValid;
}

const p0 = performance.now();

let i = preamble;
let valid = true;
while (i<list.length && valid) {
  valid = testPreamble(list[i], list.slice(i-preamble, i));
  if (valid) i++;
}

const invalid = list[i];

const p1 = performance.now();

console.log(invalid);
console.log(`${p1 - p0}ms`);