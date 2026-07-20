const fs = require('fs');
let content = fs.readFileSync('src/lib/storage.ts', 'utf8');

content = content.replace(
  "localStorage.setItem('LAST_SYNC_TIME', new Date().toISOString());",
  "localStorage.setItem('LAST_SYNC_TIME', new Date().toISOString());\n        localStorage.setItem('LAST_SYNC_USER', session?.user?.email || 'Usuário logado');"
);
content = content.replace(
  "localStorage.setItem('LAST_SYNC_TIME', new Date().toISOString());",
  "localStorage.setItem('LAST_SYNC_TIME', new Date().toISOString());\n      localStorage.setItem('LAST_SYNC_USER', session?.user?.email || 'Usuário logado');"
);
content = content.replace(
  "localStorage.setItem('LAST_SYNC_TIME', new Date().toISOString());",
  "localStorage.setItem('LAST_SYNC_TIME', new Date().toISOString());\n        localStorage.setItem('LAST_SYNC_USER', session?.user?.email || 'Usuário logado');"
);

fs.writeFileSync('src/lib/storage.ts', content);
