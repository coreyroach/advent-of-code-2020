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

let wayX = 10;
let wayY = 1;
let shipX = 0;
let shipY = 0;

function rotate([x,y], deg) {
  const rad = deg / (180/Math.PI);
  const nx = Math.round((x * Math.cos(rad)) - (y * Math.sin(rad)));
  const ny = Math.round((x * Math.sin(rad)) + (y * Math.cos(rad)));
  return [nx, ny];
}

for (let i = 0; i<rows.length; i++) {
  const {act, val} = rows[i];

  switch(act) {
    case 'N':
      wayY += val;
      break;
    case 'S':
      wayY -= val;
      break;
    case 'E':
      wayX += val;
      break;
    case 'W':
      wayX -= val;
      break;
    case 'L': {
      const [nx, ny] = rotate([wayX, wayY], val);
      wayX = nx;
      wayY = ny;
      break;
    }
    case 'R': {
      const [nx, ny] = rotate([wayX, wayY], -val);
      wayX = nx;
      wayY = ny;
      break;
    }
    case 'F':
      shipX += wayX * val;
      shipY += wayY * val;
      break;
  }
}

const p1 = performance.now();

console.log(shipX, shipY, `Distance: ${Math.abs(shipX) + Math.abs(shipY)}`);
console.log(`${p1 - p0}ms`);