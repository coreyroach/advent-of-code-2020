const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');
const lines = input.split('\n');

const instructions = lines.map(line => line.split(' '));

function run() {
  for (let i = 0; i < instructions.length; i++) {
    let temp = instructions.map((x) => x.map((y) => y));
    
    if (instructions[i][0] == 'nop') {
      temp[i][0] = 'jmp';
    } else if (instructions[i][0] == 'jmp') {
      temp[i][0] = 'nop';
    }
  
    let pos = 0, acc = 0, executed = {};
  
    while (temp[pos] && !executed[pos]) {
      executed[pos] = true;
      let [cmd, amt] = temp[pos];
      if (cmd === 'acc') {
        acc += Number(amt);
      } else if (cmd === 'jmp') {
        pos += Number(amt) - 1;
      }
      pos += 1;
    }
    
    if (pos === temp.length) {
      // console.log(pos, temp.length, temp[i], i);
      return acc;
    }
  }
}

const p0 = performance.now();

const val = run();

const p1 = performance.now();

console.log(val);
console.log(`${p1 - p0}ms`);