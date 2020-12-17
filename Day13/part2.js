const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

Number.prototype.mod = function(n) {
  return ((this % n) + n) % n;
}

const p0 = performance.now();

const [, rawList] = input.split('\n');
const busList = rawList.split(',').map(b => (b === 'x' ? 'x' : parseInt(b)));

const start = busList.reduce((acc, curr) => {
  if (curr === 'x') return acc;
  return acc * curr;
}, 1);

const getInverse = (a, mod) => {
  const b = a % mod;
  for (let i = 1; i < mod; i++) {
    if ((b * i) % mod === 1) {
      return i;
    }
  }
  return 1;
};

function run(list) {
  const sum = list.reduce((acc, curr, idx) => {
    if (curr === 'x') return acc;

    const a = (curr - idx).mod(curr);
    const nU = start / curr;
    const inverse = getInverse(nU, curr);
    
    return acc + BigInt(BigInt(a) * BigInt(nU) * BigInt(inverse));
  }, 0n);

  return sum % BigInt(start);
}

const p1 = performance.now();

console.log(run(busList).toString());
console.log(`${p1 - p0}ms`);