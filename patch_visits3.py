import os

with open('src/components/Visits.tsx', 'r') as f:
    content = f.read()

target1 = """                                  <tr key={phase.id}>
                                    <td className="px-4 py-2 text-slate-700">{phase.label}</td>
                                    <td className="px-4 py-2 text-slate-600">{meta ?? '-'}</td>
                                    <td className="px-4 py-2 text-slate-600">{cons ?? '-'}</td>
                                    <td className={`px-4 py-2 font-medium ${diff && diff > 0 ? 'text-red-600' : diff && diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>
                                      {diff !== null ? (diff > 0 ? `+${diff}` : diff) : '-'}
                                    </td>
                                  </tr>"""

replacement1 = """                                  <tr key={phase.id}>
                                    <td className="px-4 py-2 text-slate-700">{phase.label}</td>
                                    <td className="px-4 py-2 text-slate-600">{meta ?? '-'}</td>
                                    <td className={`px-4 py-2 font-medium ${diff && diff > 0 ? 'text-red-600' : diff && diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>{cons ?? '-'}</td>
                                    <td className={`px-4 py-2 font-medium ${diff && diff > 0 ? 'text-red-600' : diff && diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>
                                      {diff !== null ? (diff > 0 ? `+${diff}` : diff) : '-'}
                                    </td>
                                  </tr>"""

target2 = """                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div>
                          <span className="text-slate-500 mr-1">Consumo Real:</span>
                          <span className="font-semibold text-slate-700">{visit.consumoAcumuladoReal ?? '-'} kg</span>
                        </div>
                        <div>
                          <span className="text-slate-500 mr-1">Consumo Esperado:</span>
                          <span className="font-semibold text-slate-700">{getExpectedConsumption(visit.idade, visit.tipoLote, visit.pesoAloj)} kg</span>
                        </div>"""

replacement2 = """                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        {(() => {
                          const consumoReal = visit.consumoAcumuladoReal;
                          const consumoEsperado = getExpectedConsumption(visit.idade, visit.tipoLote, visit.pesoAloj);
                          const diffAcumulado = (consumoReal && consumoEsperado) ? Number((consumoReal - consumoEsperado).toFixed(2)) : null;
                          return (
                            <>
                              <div>
                                <span className="text-slate-500 mr-1">Consumo Real:</span>
                                <span className={`font-semibold ${diffAcumulado && diffAcumulado > 0 ? 'text-red-600' : diffAcumulado && diffAcumulado < 0 ? 'text-green-600' : 'text-slate-700'}`}>
                                  {consumoReal ?? '-'} kg
                                  {diffAcumulado !== null && (
                                    <span className="text-xs ml-1 opacity-80">
                                      ({diffAcumulado > 0 ? `+${diffAcumulado}` : diffAcumulado})
                                    </span>
                                  )}
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-500 mr-1">Consumo Esperado:</span>
                                <span className="font-semibold text-slate-700">{consumoEsperado} kg</span>
                              </div>
                            </>
                          );
                        })()}"""

if target1 in content:
    content = content.replace(target1, replacement1)
    print("Patched target 1")
else:
    print("Target 1 not found")

if target2 in content:
    content = content.replace(target2, replacement2)
    print("Patched target 2")
else:
    print("Target 2 not found")

with open('src/components/Visits.tsx', 'w') as f:
    f.write(content)
