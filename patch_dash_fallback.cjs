const fs = require('fs');
let d = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

d = d.replace(/try \{ return JSON\.parse\(saved\); \} catch \(e\) \{\}/, 'try { const parsed = JSON.parse(saved); if (Array.isArray(parsed)) return parsed; } catch (e) {}');

fs.writeFileSync('src/components/Dashboard.tsx', d);
