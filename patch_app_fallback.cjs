const fs = require('fs');
let a = fs.readFileSync('src/App.tsx', 'utf8');

a = a.replace(/setIntegrados\(dataIntegrados\);/g, 'setIntegrados(Array.isArray(dataIntegrados) ? dataIntegrados : []);');
a = a.replace(/setVisits\(dataVisits\);/g, 'setVisits(Array.isArray(dataVisits) ? dataVisits : []);');

fs.writeFileSync('src/App.tsx', a);
