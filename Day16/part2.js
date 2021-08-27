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
    const [,field, rangeA, rangeB] = /^([a-z ]*): ([\d\-]*) or ([\d\-]*)$/.exec(line);
    return {
      field,
      ranges: [
        rangeA.split('-').map(Number),
        rangeB.split('-').map(Number),
      ]
    };
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
  const isValid = ticket.every((val) => {
    return rules.some(({ ranges }) => {
      const [[minA, maxA], [minB, maxB]] = ranges;
      return (val >= minA && val <= maxA) || (val >= minB && val <= maxB);
    });
  });

  return isValid;
}

const validTickets = allTickets.filter(ticket => validate(ticket));
const cols = validTickets.reduce((acc, ticket) => {
  ticket.forEach((val, idx) => acc[idx].push(val));
  return acc;
}, Array.from(Array(myTicket.length)).map(() => []));

const fieldMap = rules.reduce((acc, {field, ranges}) => {
  acc[field] = [];
  const [[minA, maxA], [minB, maxB]] = ranges;
  cols.forEach((col, idx) => {
    const isValid = col.every((val) => {
      return (val >= minA && val <= maxA) || (val >= minB && val <= maxB);
    });
    if (isValid) acc[field].push(idx);
  })
  return acc;
}, {});

const filterOutDuplicates = (array) => {
  return array.reduce((acc, v, index) => {
      const shorter = acc.filter(l => l.length < v.length).flatMap(i => i); // step 2
      const filtered = v.filter(j => !shorter.includes(j)); // step 3
      acc[index] = filtered; // step 4
      return acc; // step 5
  }, [...array]).flatMap(i => i)
}

const order = filterOutDuplicates(Object.values(fieldMap));

Object.keys(fieldMap).forEach((f, i) => fieldMap[f] = order[i]);

const departureIndicies = Object.entries(fieldMap)
  .filter(([k,v]) => k.includes('departure'))
  .map(([k,v]) => v);

const result = departureIndicies.reduce((acc, val) => {
  console.log(myTicket[val]);
  return acc * myTicket[val];
}, 1);

const p1 = performance.now();

console.log('total valid:', validTickets.length);
console.log(result);
console.log(`${p1 - p0}ms`);