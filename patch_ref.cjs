const fs = require('fs');
let code = fs.readFileSync('src/components/ReferenceCurve.tsx', 'utf8');

code = code.replace(
  /<button \s*onClick=\{\(\) => setTipoLote\('Fêmea'\)\}/,
  `<button \n            onClick={() => setTipoLote('Macho')}\n            className={\`px-4 py-2 rounded-md text-sm font-semibold transition-all \${tipoLote === 'Macho' ? 'bg-white shadow text-[#2D452B]' : 'text-slate-500 hover:text-slate-700'}\`}\n          >\n            Lotes Machos\n          </button>\n          <button \n            onClick={() => setTipoLote('Fêmea')}`
);
fs.writeFileSync('src/components/ReferenceCurve.tsx', code);
