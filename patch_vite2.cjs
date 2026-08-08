const fs = require('fs');
let code = fs.readFileSync('vite.config.ts', 'utf8');
code = code.replace(/outDir: 'build',/, "outDir: 'dist',");
fs.writeFileSync('vite.config.ts', code);

let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts.clean = "rm -rf dist";
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
