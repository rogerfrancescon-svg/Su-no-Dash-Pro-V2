const fs = require('fs');
let code = fs.readFileSync('src/components/VisitForm.tsx', 'utf8');

const handleChangeTarget = `    if (name === 'integradoNome' || name === 'alojamentoDate') {
      const nomeToSearch = name === 'integradoNome' ? value : formData.integradoNome;
      const dateToSearch = name === 'alojamentoDate' ? value : undefined;
      
      if (nomeToSearch) {
        const matchingIntegrados = integrados.filter(i => i.name.toLowerCase() === nomeToSearch.toLowerCase());
        let integrado = undefined;
        
        if (matchingIntegrados.length > 0) {
          if (dateToSearch) {
             integrado = matchingIntegrados.find(i => i.alojamentoDate === dateToSearch);
          }
          
          if (!integrado) {
            const emAndamento = matchingIntegrados.filter(i => i.status === 'Em andamento');
            if (emAndamento.length > 0) {
               emAndamento.sort((a, b) => new Date(b.alojamentoDate).getTime() - new Date(a.alojamentoDate).getTime());
               integrado = emAndamento[0];
            } else {
               matchingIntegrados.sort((a, b) => new Date(b.alojamentoDate).getTime() - new Date(a.alojamentoDate).getTime());
               integrado = matchingIntegrados[0];
            }
          }
        }`;

const handleChangeReplacement = `    if (name === 'integradoNome' || name === 'alojamentoDate') {
      const nomeToSearch = name === 'integradoNome' ? value : formData.integradoNome;
      const dateToSearch = name === 'alojamentoDate' ? value : undefined;
      
      if (nomeToSearch) {
        const matchingIntegradosAll = integrados.filter(i => i.name.toLowerCase() === nomeToSearch.toLowerCase());
        const emAndamento = matchingIntegradosAll.filter(i => i.status === 'Em andamento');
        
        let integrado = undefined;
        
        if (emAndamento.length > 0) {
          if (dateToSearch) {
             integrado = emAndamento.find(i => i.alojamentoDate === dateToSearch);
          }
          
          if (!integrado) {
             emAndamento.sort((a, b) => new Date(b.alojamentoDate).getTime() - new Date(a.alojamentoDate).getTime());
             integrado = emAndamento[0];
          }
        }`;

code = code.replace(handleChangeTarget, handleChangeReplacement);

const selectTarget = `{(!isNewLote && formData.integradoNome && integrados.filter(i => i.name.toLowerCase() === formData.integradoNome?.toLowerCase()).length > 1) ? (
              <select
                name="alojamentoDate"
                required
                value={formData.alojamentoDate || ''}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {integrados
                  .filter(i => i.name.toLowerCase() === formData.integradoNome?.toLowerCase())
                  .sort((a, b) => new Date(b.alojamentoDate).getTime() - new Date(a.alojamentoDate).getTime())
                  .map(i => (
                    <option key={i.id} value={i.alojamentoDate}>
                      {i.alojamentoDate.split('-').reverse().join('/')} {i.status === 'Fechado' ? '(Fechado)' : ''}
                    </option>
                  ))
                }
              </select>
            ) : (`;

const selectReplacement = `{(!isNewLote && formData.integradoNome && integrados.filter(i => i.name.toLowerCase() === formData.integradoNome?.toLowerCase() && i.status === 'Em andamento').length > 1) ? (
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

code = code.replace(selectTarget, selectReplacement);

const datalistTarget = `{Array.from(new Set(integrados.map(i => i.name))).map(name => (
                <option key={name} value={name} />
              ))}`;

const datalistReplacement = `{Array.from(new Set(integrados.filter(i => isNewLote ? true : i.status === 'Em andamento').map(i => i.name))).map(name => (
                <option key={name} value={name} />
              ))}`;

code = code.replace(datalistTarget, datalistReplacement);

fs.writeFileSync('src/components/VisitForm.tsx', code);
console.log("VisitForm logic patched");
