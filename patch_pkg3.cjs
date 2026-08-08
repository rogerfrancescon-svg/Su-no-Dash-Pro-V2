const fs = require('fs');
let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if(pkg.dependencies['@tailwindcss/vite']) {
  pkg.devDependencies['@tailwindcss/vite'] = pkg.dependencies['@tailwindcss/vite'];
  delete pkg.dependencies['@tailwindcss/vite'];
}
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
