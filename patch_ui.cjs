const fs = require('fs');

let formCode = fs.readFileSync('src/components/VisitForm.tsx', 'utf8');
formCode = formCode.replace('<option value="Misto">Misto</option>', '<option value="Misto">Misto</option>\n              <option value="Macho">Macho</option>');
fs.writeFileSync('src/components/VisitForm.tsx', formCode);

let refCode = fs.readFileSync('src/components/ReferenceCurve.tsx', 'utf8');
refCode = refCode.replace("setTipoLote('Fêmea')} \\n            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${tipoLote === 'Fêmea' ? 'bg-white shadow text-[#2D452B]' : 'text-slate-500 hover:text-slate-700'}`}",
  "setTipoLote('Fêmea')}\n            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${tipoLote === 'Fêmea' ? 'bg-white shadow text-[#2D452B]' : 'text-slate-500 hover:text-slate-700'}`}");
// Actually let's just use string replacement for ReferenceCurve.tsx
