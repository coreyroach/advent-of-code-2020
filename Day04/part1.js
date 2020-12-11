const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const rows = input.split(/\n\n/g);
const fields = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt'];
let validPassports = 0;

function isValid(passport) {
  const vals = passport.replace(/\n/g, ' ').split(' ').reduce((acc, val) => {
    const kv = val.split(':');
    acc[kv[0]] = kv[1];
    return acc;
  }, {});

  return fields.every(f => vals[f]);
}

const p0 = performance.now();

rows.forEach((passport) => {
  if (isValid(passport)) {
    validPassports++;
  }
});

const p1 = performance.now();

console.log(`Valid Passports: ${validPassports}`);
console.log(`${p1 - p0}ms`);