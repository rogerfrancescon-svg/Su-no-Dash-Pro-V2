const fs = require('fs');
let i = fs.readFileSync('src/components/Integrados.tsx', 'utf8');

i = i.replace(/  const activeLotesCount = integrados\.filter\(i => i\.status === 'Em andamento'\)\.length;\n/, '');

fs.writeFileSync('src/components/Integrados.tsx', i);
