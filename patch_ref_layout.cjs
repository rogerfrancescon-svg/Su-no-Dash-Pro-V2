const fs = require('fs');
let s = fs.readFileSync('src/components/ReferenceCurve.tsx', 'utf8');

// The main layout div
s = s.replace(/className="flex flex-col md:flex-row md:items-center gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm"/, 'className="flex flex-col md:flex-row md:items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-sm"');

// The 'Filtros:' span
s = s.replace(/<span className="text-sm font-bold text-slate-500 uppercase">Filtros:<\/span>/, '');

// The curve version text
s = s.replace(/<span className="text-sm font-medium text-slate-500">Versão da Curva:<\/span>/, '<span className="text-xs font-medium text-slate-500">Curva:</span>');

// The select field
s = s.replace(/className="w-full sm:w-auto px-3 py-1\.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-\[#2D452B\] focus:border-\[#2D452B\]"/, 'className="w-full sm:w-auto px-2 py-1 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2D452B] focus:border-[#2D452B]"');

fs.writeFileSync('src/components/ReferenceCurve.tsx', s);
