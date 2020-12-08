const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const inst = input.split('\n').map((i) => {
  const [rule, val] = i.split(' ');
  return {
    rule,
    val: Number(val),
    hasRun: false,
  }
});

const p0 = performance.now();

let run = true;
let pos = 0;
let count = 0;

while (run) {
  const instruction = inst[pos];
  if (!instruction.hasRun) {
    switch(instruction.rule) {
      case 'acc':
        count += instruction.val;
        pos++
        break;
      case 'jmp':
        pos += instruction.val;
        break;
      case 'nop':
        pos++;
        break;
    }
    instruction.hasRun = true;
  } else {
    run = false;
  }
}

const p1 = performance.now();

console.log(count);
console.log(`${p1 - p0}ms`);