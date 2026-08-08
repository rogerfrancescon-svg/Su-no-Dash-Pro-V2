const fs = require('fs');
let s = fs.readFileSync('src/components/ReferenceCurve.tsx', 'utf8');

const targetStr = '{cv.version === growthCurvesMisto[growthCurvesMisto.length - 1].version ? `Atual (${cv.version.toUpperCase()})` : `Histórico (${cv.version.toUpperCase()}) - Desde ${dateObj.toLocaleDateString(\'pt-BR\')}`}';
const newStr = '{cv.version === growthCurvesMisto[growthCurvesMisto.length - 1].version ? `${cv.version.toUpperCase()} (Atual)` : `${cv.version.toUpperCase()} (${dateObj.toLocaleDateString(\'pt-BR\', {day: \'2-digit\', month: \'2-digit\', year: \'2-digit\'})})`}';

if (s.includes(targetStr)) {
  s = s.replace(targetStr, newStr);
  fs.writeFileSync('src/components/ReferenceCurve.tsx', s);
  console.log('Success');
} else {
  console.log('String not found');
}
