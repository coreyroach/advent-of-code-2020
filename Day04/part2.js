const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const rows = input.split(/\n\n/g);
const fields = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt'];
let validPassports = 0;

const rules = {
  byr: v => v >= 1920 && v <= 2002,
  iyr: v => v >= 2010 && v <= 2020,
  eyr: v => v >= 2020 && v <= 2030,
  hgt: (v) => {
    const match = /([0-9]*)(in|cm)?/.exec(v);
    const n = match[1], m = match[2];
    if (m === 'in' && n >= 59 && n <= 76) return true; 
    if (m === 'cm' && n >= 150 && n <= 193) return true; 
    return false;
  },
  hcl: v => /^#[0-9a-f]{6}$/.test(v),
  ecl: v => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v),
  pid: v => /^[0-9]{9}$/.test(v),
  cid: v => 1,
}

function isValid(passport) {
  const vals = passport.replace(/\n/g, ' ').split(' ').reduce((acc, val) => {
    const kv = val.split(':');
    acc[kv[0]] = kv[1];
    return acc;
  }, {});

  if (fields.every(f => vals[f])) {
    return Object.entries(vals).every(([k, v]) => rules[k](v));
  }
  return false;
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