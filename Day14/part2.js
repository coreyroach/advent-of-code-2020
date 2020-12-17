const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs
  .readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8')
  .split('\n')
  .map((x) => x.startsWith('mask')
    ? x.match(/^mask \= (.*)/)[1]
    : x.match(/^mem\[(\d+)\] \= (\d+)/).slice(1).map(BigInt)
  );

const p0 = performance.now();

const memory = {};
let maskOR = 0n;
let floatsPos = [];

for (line of input) {
  if (!Array.isArray(line)) {
    maskOR = BigInt(parseInt(line.replace(/X/g, '0'), 2));
    floatsPos = Array.from(line.matchAll(/X/g), x => BigInt(x.index));
  } else {
    const [address, val] = line;
    const addr = address | maskOR;
    const comboSize = 2 ** floatsPos.length;

    for (let i = 0n; i < comboSize; i++) {
      let maskXOR = 0n;

      floatsPos.forEach((pos, idx) => {
        const pow = BigInt(idx);
        
        if ((i & (2n ** pow)) !== 0n) {
          maskXOR |= 1n << (36n - pos - 1n);
        }
        
        memory[addr ^ maskXOR] = val;
      })
    }
  }
}

const sum = Object.values(memory).reduce((acc, cur) => (acc + cur), 0n);

const p1 = performance.now();

console.log(sum);
console.log(`${p1 - p0}ms`);