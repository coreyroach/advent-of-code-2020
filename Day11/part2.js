const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const p0 = performance.now();

const rows = input.split('\n').map(r => r.split(''));
const cols = rows[0].length;

const offsetPairs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [1, 1],
  [1, -1],
  [-1, 0],
  [-1, 1],
  [-1, -1],
];

function occupiedSeats(all, row, col) {
  let occupied = 0;

  offsetPairs.forEach(([xOff, yOff]) => {
    for (
      let x = row+xOff, y = col+yOff;
      x >= 0 && x < cols && y >= 0 && y < all.length;
      x += xOff, y += yOff
    ) {
      const seat = all[x][y];
      if (seat === 'L') break;
      if (seat === '#') {
        occupied++;
        break;
      }
    }
  });

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
      if (seat === '#' && occupied >= 5) {
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

console.log(`Total: ${count}`);
console.log(`${p1 - p0}ms`);