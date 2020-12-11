const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const p0 = performance.now();

const rows = input.split('\n').map(r => r.split(''));
const cols = rows[0].length;

function occupiedSeats(all, row, col) {
  const numCols = all[0].length;
  let occupied = 0;

  for (let i = -1; i<2; i++) {
    for (let j = -1; j<2; j++) {
      const r = row + i;
      const c = col + j;
      if (
        (r === row && c === col) ||
        (r < 0 || r > all.length - 1) || 
        (c < 0 || c > numCols - 1)
      ) {
        continue;
      };
      const seat = all[r][c];
      if (seat === '#') occupied++;
    }
  }

  return occupied;
}

let totalOccupied = 0;

function run(seats) {
  const next = seats.map(r => [...r]);
  let nextOccupied = 0;

  for (let i = 0; i<seats.length; i++) {
    for (let j = 0; j<cols; j++) {
      const seat = seats[i][j];
      if (seat === '.') continue;

      const occupied = occupiedSeats(seats, i, j);

      if (seat === 'L' && occupied === 0) {
        next[i][j] = '#';
      }
      if (seat === '#' && occupied >= 4) {
        next[i][j] = 'L';
      }

      if (next[i][j] === '#') nextOccupied++;
    }
  }

  if (nextOccupied !== totalOccupied) {
    totalOccupied = nextOccupied;
    return run(next);
  }

  return nextOccupied;
}

const count = run(rows);

const p1 = performance.now();

console.log(count);
console.log(`${p1 - p0}ms`);