const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const p0 = performance.now();

function run(arr, lower, upper, max) {
  return arr.reduce((acc, d) => {
    const [x,y] = acc;
    if (d === lower) acc = [x, Math.floor(y-(y-x)/2)];
    if (d === upper) acc = [Math.ceil(y-(y-x)/2), y];
    return acc;
  }, [0, max]);
}

const seats = input.split(/\n/g);
const seatIDs = seats.map((seat) => {
  const [,r,c] = /^([FB]{7})([LR]{3})$/.exec(seat);
  const row = run(r.split(''), 'F', 'B', 127);
  const col = run(c.split(''), 'L', 'R', 7);

  return row[0] * 8 + col[0];
}).sort((a,b) => a-b);

const p1 = performance.now();

console.log(seatIDs[seatIDs.length-1]);
console.log(`${p1 - p0}ms`);