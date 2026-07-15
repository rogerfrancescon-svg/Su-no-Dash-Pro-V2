const fs = require('fs');
let code = fs.readFileSync('src/components/VisitForm.tsx', 'utf8');

const targetSelect = `{(!isNewLote && formData.integradoNome && integrados.filter(i => i.name.toLowerCase() === formData.integradoNome?.toLowerCase() && i.status === 'Em andamento').length > 1) ? (
              <select
                name="alojamentoDate"
                required
                value={formData.alojamentoDate || ''}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {integrados
                  .filter(i => i.name.toLowerCase() === formData.integradoNome?.toLowerCase() && i.status === 'Em andamento')
                  .sort((a, b) => new Date(b.alojamentoDate).getTime() - new Date(a.alojamentoDate).getTime())
                  .map(i => (
                    <option key={i.id} value={i.alojamentoDate}>
                      {i.alojamentoDate.split('-').reverse().join('/')}
                    </option>
                  ))
                }
              </select>
            ) : (`;

const newSelect = `{(!initialData && !isNewLote && formData.integradoNome && integrados.filter(i => i.name.toLowerCase() === formData.integradoNome?.toLowerCase() && i.status === 'Em andamento').length > 1) ? (
              <select
                name="alojamentoDate"
                required
                value={formData.alojamentoDate || ''}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {integrados
                  .filter(i => i.name.toLowerCase() === formData.integradoNome?.toLowerCase() && i.status === 'Em andamento')
                  .sort((a, b) => new Date(b.alojamentoDate).getTime() - new Date(a.alojamentoDate).getTime())
                  .map(i => (
                    <option key={i.id} value={i.alojamentoDate}>
                      {i.alojamentoDate.split('-').reverse().join('/')}
                    </option>
                  ))
                }
              </select>
            ) : (`;

code = code.replace(targetSelect, newSelect);

fs.writeFileSync('src/components/VisitForm.tsx', code);
console.log("Patched select.");
