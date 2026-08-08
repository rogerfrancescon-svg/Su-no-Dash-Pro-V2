const fs = require('fs');
let s = fs.readFileSync('src/lib/storage.ts', 'utf8');

s = s.replace(/return data \? JSON\.parse\(data\) : \[\];/g, 'const parsed = data ? JSON.parse(data) : []; return Array.isArray(parsed) ? parsed : [];');

fs.writeFileSync('src/lib/storage.ts', s);
