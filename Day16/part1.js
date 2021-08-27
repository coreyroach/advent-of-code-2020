const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs
  .readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8')
  .split('\n\n');

const p0 = performance.now();

const rules = input[0]
  .split('\n')
  .map((line) => {
    const [,rangeA, rangeB] = /^[a-z ]*: ([\d\-]*) or ([\d\-]*)$/.exec(line);
    return [
      rangeA.split('-').map(Number),
      rangeB.split('-').map(Number),
    ];
  });

const myTicket = input[1]
  .split('\n')
  .pop()
  .split(',')
  .map(Number);

const allTickets = input[2]
  .split('\n')
  .slice(1)
  .reduce((acc, line) => {
    acc.push(line.split(',').map(Number));
    return acc;
  }, []);

function validate(ticket) {
  const invalid = [];
  const isValid = ticket.every((val) => {
    const result = rules.some((rule) => {
      const [[minA, maxA], [minB, maxB]] = rule;
      return (val >= minA && val <= maxA) || (val >= minB && val <= maxB);
    });
    if (!result) invalid.push(val);
    return result;
  });

  return {
    isValid,
    invalid,
  };
}

const sum = allTickets.reduce((acc, ticket, idx) => {
  const { invalid } = validate(ticket);
  invalid.forEach(val => acc += val);
  return acc;
}, 0);

const p1 = performance.now();

console.log(sum);
console.log(`${p1 - p0}ms`);