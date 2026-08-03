const fs = require('fs');

const file = fs.readFileSync('src/data.ts', 'utf-8');
const newCurve = fs.readFileSync('new_curve.txt', 'utf-8');

const regexCurve = /export const growthCurve: GrowthCurvePoint\[\] = \[\s*\{.*?\];/s;
const replacedCurve = `export const growthCurve: GrowthCurvePoint[] = [\n${newCurve}\n];`;

let newFile = file.replace(regexCurve, replacedCurve);

const regexMetas = /export const defaultMetas = \{[^}]+\};/s;
const replacedMetas = `export const defaultMetas = {
  metaAlojamento: 17.65,
  metaCrescimento1: 30.79,
  metaCrescimento2: 29.57,
  metaCrescimento3: 44.06,
  metaTerminacao1: 27.52,
  metaTerminacao2: 63.52,
  metaAcumulada: 213.11
};`;

newFile = newFile.replace(regexMetas, replacedMetas);

fs.writeFileSync('src/data.ts', newFile);
console.log('done');
