const fs = require('fs');
let content = fs.readFileSync('src/lib/storage.ts', 'utf8');

// Revert the bad patch manually
content = content.replace(
  "localStorage.setItem('LAST_SYNC_TIME', new Date().toISOString());\\n        localStorage.setItem('LAST_SYNC_USER', session?.user?.email || 'Usuário logado');\\n      localStorage.setItem('LAST_SYNC_USER', session?.user?.email || 'Usuário logado');\\n        localStorage.setItem('LAST_SYNC_USER', session?.user?.email || 'Usuário logado');",
  "localStorage.setItem('LAST_SYNC_TIME', new Date().toISOString());"
);

// Better way to do it: Regex replace
content = content.replace(/localStorage\.setItem\('LAST_SYNC_TIME', new Date\(\)\.toISOString\(\)\);\s*localStorage\.setItem\('LAST_SYNC_USER', [^\)]+\);\s*localStorage\.setItem\('LAST_SYNC_USER', [^\)]+\);\s*localStorage\.setItem\('LAST_SYNC_USER', [^\)]+\);/g, "localStorage.setItem('LAST_SYNC_TIME', new Date().toISOString());");

content = content.replace(/localStorage\.setItem\('LAST_SYNC_TIME', new Date\(\)\.toISOString\(\)\);\n?\s*localStorage\.setItem\('LAST_SYNC_USER'[^;]+;/g, "localStorage.setItem('LAST_SYNC_TIME', new Date().toISOString());");

// Now apply it globally
content = content.replace(/localStorage\.setItem\('LAST_SYNC_TIME', new Date\(\)\.toISOString\(\)\);/g, "localStorage.setItem('LAST_SYNC_TIME', new Date().toISOString());\n        localStorage.setItem('LAST_SYNC_USER', session?.user?.email || 'Usuário logado');");

fs.writeFileSync('src/lib/storage.ts', content);
