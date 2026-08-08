const fs = require('fs');
let v = fs.readFileSync('vite.config.ts', 'utf8');

v = v.replace(/export default defineConfig\(\(\) => \{[\s\S]*?return \{/, 'export default defineConfig({');
v = v.replace(/base: process\.env\.GITHUB_ACTIONS \? repoName : '\.\/',/, 'base: "/",\n    build: {\n      outDir: "dist",');
v = v.replace(/server: \{/, 'server: {');

fs.writeFileSync('vite.config.ts', v);
