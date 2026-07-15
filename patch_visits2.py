import os

with open('src/components/Visits.tsx', 'r') as f:
    content = f.read()

target = """              <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">Histórico de Visitas</h4>"""

replacement = """              {(() => {
                const loteVisits = visits.filter(v => v.integradoId === selectedIntegradoDetails)
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                const latestVisit = loteVisits.length > 0 ? loteVisits[0] : null;
                const phases = [
                  { id: 'Alojamento', label: 'Alojamento', metaKey: 'metaAlojamento', consKey: 'consumoAlojamento' },
                  { id: 'Crescimento1', label: 'Crescimento 1', metaKey: 'metaCrescimento1', consKey: 'consumoCrescimento1' },
                  { id: 'Crescimento2', label: 'Crescimento 2', metaKey: 'metaCrescimento2', consKey: 'consumoCrescimento2' },
                  { id: 'Crescimento3', label: 'Crescimento 3', metaKey: 'metaCrescimento3', consKey: 'consumoCrescimento3' },
                  { id: 'Terminacao1', label: 'Terminação 1', metaKey: 'metaTerminacao1', consKey: 'consumoTerminacao1' },
                  { id: 'Terminacao2', label: 'Terminação 2', metaKey: 'metaTerminacao2', consKey: 'consumoTerminacao2' },
                ];
                
                return (
                  <>
                    {latestVisit && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">Consumo por Fase (Última Visita)</h4>
                        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500">
                              <tr>
                                <th className="px-4 py-2 font-medium">Fase</th>
                                <th className="px-4 py-2 font-medium">Meta (kg)</th>
                                <th className="px-4 py-2 font-medium">Consumo (kg)</th>
                                <th className="px-4 py-2 font-medium">Desvio (kg)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {phases.map(phase => {
                                const meta = (latestVisit as any)[phase.metaKey];
                                const cons = (latestVisit as any)[phase.consKey];
                                const diff = (cons && meta) ? Number((cons - meta).toFixed(2)) : null;
                                return (
                                  <tr key={phase.id}>
                                    <td className="px-4 py-2 text-slate-700">{phase.label}</td>
                                    <td className="px-4 py-2 text-slate-600">{meta ?? '-'}</td>
                                    <td className="px-4 py-2 text-slate-600">{cons ?? '-'}</td>
                                    <td className={`px-4 py-2 font-medium ${diff && diff > 0 ? 'text-red-600' : diff && diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>
                                      {diff !== null ? (diff > 0 ? `+${diff}` : diff) : '-'}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    
                    <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">Histórico de Visitas</h4>
                  </>
                );
              })()}"""

if target in content:
    with open('src/components/Visits.tsx', 'w') as f:
        f.write(content.replace(target, replacement))
    print("Patched successfully")
else:
    print("Target not found")
