const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const p0 = performance.now();

const rows = input.split('\n').map((r) => {
  const [,act,val] = /^([NESWRLF])([0-9]*)$/.exec(r);
  return {
    act,
    val: Number(val),
  }
});

let x = 0;
let y = 0;
let heading = 90;

for (let i = 0; i<rows.length; i++) {
  const {act, val} = rows[i];
  switch(act) {
    case 'N':
      y += val;
      break;
    case 'S':
      y -= val;
      break;
    case 'E':
      x += val;
      break;
    case 'W':
      x -= val;
      break;
    case 'L':
      heading = (360+heading-val)%360;
      break;
    case 'R':
      heading = (heading+val)%360;
      break;
    case 'F':
      if (heading === 90) x += val;
      if (heading === 270) x -= val;
      if (heading === 180) y -= val;
      if (heading === 0) y += val;
      break;
  }
}

const p1 = performance.now();

console.log(x, y, `Distance: ${Math.abs(x) + Math.abs(y)}`);
console.log(`${p1 - p0}ms`);