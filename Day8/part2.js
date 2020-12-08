const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');
const lines = input.split('\n');

const p0 = performance.now();

const commands = lines.map(line => line.split(' '));

loop:
for (let i = 0; i < commands.length; i++) {
  let temp = commands.map((x) => x.map((y) => y));
  
  if (commands[i][0] == 'nop') {
    temp[i][0] = 'jmp';
  } else if (commands[i][0] == 'jmp') {
    temp[i][0] = 'nop';
  }

  let pos = 0;
  let acc = 0;
  let visited = {};

  while (temp[pos] && !visited[pos]) {
    visited[pos] = true;
    let [cmd, amt] = temp[pos];
    if (cmd === 'acc') {
      acc += Number(amt);
    } else if (cmd === 'jmp') {
      pos += Number(amt) - 1;
    }
    pos += 1;
  }
  
  if (pos === temp.length) {
    console.log('Accumulator when program terminates: ', acc);
    console.log(pos, temp.length, temp[i], i);
    break loop;
  }
}

const p1 = performance.now();

// console.log(count);
console.log(`${p1 - p0}ms`);