import os
with open('src/components/VisitForm.tsx', 'r') as f:
    content = f.read()

head_code = """                  <th className="py-2 pr-2 md:pr-4 pl-2 font-semibold text-slate-500 uppercase text-[10px]">Fase</th>
                  <th className="py-2 pr-2 md:pr-4 font-semibold text-slate-500 uppercase text-[10px] w-1/4">Carga Total (kg)</th>
                  <th className="py-2 pr-2 md:pr-4 font-semibold text-slate-500 uppercase text-[10px] w-1/4">Cons. Real (kg/cab)</th>
                  <th className="py-2 pr-2 md:pr-4 font-semibold text-slate-500 uppercase text-[10px]">Meta Ref. (kg)</th>"""
new_head_code = """                  <th className="py-2 pr-2 md:pr-4 pl-2 font-semibold text-slate-500 uppercase text-[10px]">Fase</th>
                  <th className="py-2 pr-2 md:pr-4 font-semibold text-slate-500 uppercase text-[10px] w-1/4">Carga Total (kg)</th>
                  <th className="py-2 pr-2 md:pr-4 font-semibold text-slate-500 uppercase text-[10px] w-1/4">Cons. Real (kg/cab)</th>
                  <th className="py-2 pr-2 md:pr-4 font-semibold text-slate-500 uppercase text-[10px] w-1/4">Meta Ref. (kg)</th>
                  <th className="py-2 pr-2 md:pr-4 font-semibold text-slate-500 uppercase text-[10px]">Desvio</th>"""
content = content.replace(head_code, new_head_code)

row_code = """                ].map((phase) => (
                  <tr key={phase.id} className="hover:bg-slate-50">
                    <td className="py-2 pr-2 md:pr-4 pl-2 font-medium text-slate-700 text-xs md:text-sm">{phase.label}</td>
                    <td className="py-2 pr-2 md:pr-4">
                      <input type="number" step="0.01" name={phase.cargaKey} value={(formData as any)[phase.cargaKey] || ''} onChange={handleChange} className="w-full border border-slate-200 rounded p-1.5 text-xs md:text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0.00" />
                    </td>
                    <td className="py-2 pr-2 md:pr-4">
                      <input type="number" step="0.01" name={phase.consKey} value={(formData as any)[phase.consKey] || ''} onChange={handleChange} className="w-full border border-slate-200 rounded p-1.5 text-xs md:text-sm bg-slate-50 text-slate-600 focus:ring-2 focus:ring-blue-500 outline-none" readOnly placeholder="0.00" />
                    </td>
                    <td className="py-2 pr-2 md:pr-4 text-slate-500 text-xs md:text-sm">
                      {(formData as any)[phase.metaKey] || '-'}
                    </td>
                  </tr>
                ))}"""

new_row_code = """                ].map((phase) => {
                  const cons = Number((formData as any)[phase.consKey]);
                  const meta = Number((formData as any)[phase.metaKey]);
                  const diff = (cons && meta) ? (cons - meta) : null;
                  const diffPct = (diff !== null && meta) ? (diff / meta * 100) : null;
                  
                  return (
                  <tr key={phase.id} className="hover:bg-slate-50">
                    <td className="py-2 pr-2 md:pr-4 pl-2 font-medium text-slate-700 text-xs md:text-sm">{phase.label}</td>
                    <td className="py-2 pr-2 md:pr-4">
                      <input type="number" step="0.01" name={phase.cargaKey} value={(formData as any)[phase.cargaKey] || ''} onChange={handleChange} className="w-full border border-slate-200 rounded p-1.5 text-xs md:text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0.00" />
                    </td>
                    <td className="py-2 pr-2 md:pr-4">
                      <input type="number" step="0.01" name={phase.consKey} value={(formData as any)[phase.consKey] || ''} onChange={handleChange} className={`w-full border border-slate-200 rounded p-1.5 text-xs md:text-sm bg-slate-50 font-semibold focus:ring-2 focus:ring-blue-500 outline-none ${diff && diff > 0 ? 'text-red-600' : diff && diff < 0 ? 'text-green-600' : 'text-slate-600'}`} readOnly placeholder="0.00" />
                    </td>
                    <td className="py-2 pr-2 md:pr-4 text-slate-500 text-xs md:text-sm">
                      {(formData as any)[phase.metaKey] || '-'}
                    </td>
                    <td className="py-2 pr-2 md:pr-4 text-xs md:text-sm font-medium">
                      {diff !== null && diffPct !== null ? (
                        <span className={diff > 0 ? 'text-red-600' : 'text-green-600'}>
                          {diff > 0 ? '+' : ''}{diff.toFixed(2)} kg ({diff > 0 ? '+' : ''}{diffPct.toFixed(1)}%)
                        </span>
                      ) : '-'}
                    </td>
                  </tr>
                )})}"""

content = content.replace(row_code, new_row_code)

foot_code = """              <tfoot className="border-t-2 border-slate-200 font-semibold bg-slate-50">
                <tr>
                  <td className="py-3 pr-2 md:pr-4 pl-2 text-slate-700 text-xs md:text-sm">TOTAL ACUMULADO</td>
                  <td className="py-3 pr-2 md:pr-4">
                    <input type="number" step="0.01" name="volumeTotalCargas" value={formData.volumeTotalCargas || ''} onChange={handleChange} className="w-full border border-slate-200 rounded p-1.5 text-xs md:text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0.00" />
                  </td>
                  <td className="py-3 pr-2 md:pr-4">
                    <input type="number" step="0.01" name="consumoAcumuladoReal" value={formData.consumoAcumuladoReal || ''} onChange={handleChange} className="w-full border border-slate-200 rounded p-1.5 text-xs md:text-sm font-bold bg-slate-100 text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none" readOnly placeholder="0.00" />
                  </td>
                  <td className="py-3 pr-2 md:pr-4 text-slate-500 text-xs md:text-sm">
                    {formData.metaAcumulada || '-'}
                  </td>
                </tr>
              </tfoot>"""
              
new_foot_code = """              <tfoot className="border-t-2 border-slate-200 font-semibold bg-slate-50">
                <tr>
                  <td className="py-3 pr-2 md:pr-4 pl-2 text-slate-700 text-xs md:text-sm">TOTAL ACUMULADO</td>
                  <td className="py-3 pr-2 md:pr-4">
                    <input type="number" step="0.01" name="volumeTotalCargas" value={formData.volumeTotalCargas || ''} onChange={handleChange} className="w-full border border-slate-200 rounded p-1.5 text-xs md:text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0.00" />
                  </td>
                  <td className="py-3 pr-2 md:pr-4">
                    <input type="number" step="0.01" name="consumoAcumuladoReal" value={formData.consumoAcumuladoReal || ''} onChange={handleChange} className={`w-full border border-slate-200 rounded p-1.5 text-xs md:text-sm font-bold bg-slate-100 focus:ring-2 focus:ring-blue-500 outline-none ${currentDiffKg && currentDiffKg > 0 ? 'text-red-600' : currentDiffKg && currentDiffKg < 0 ? 'text-green-600' : 'text-slate-700'}`} readOnly placeholder="0.00" />
                  </td>
                  <td className="py-3 pr-2 md:pr-4 text-slate-500 text-xs md:text-sm">
                    {formData.metaAcumulada || '-'}
                  </td>
                  <td className="py-3 pr-2 md:pr-4 text-xs md:text-sm font-bold">
                    {currentDiffKg !== null && currentDiffPct !== null ? (
                      <span className={currentDiffKg > 0 ? 'text-red-600' : 'text-green-600'}>
                        {currentDiffKg > 0 ? '+' : ''}{currentDiffKg.toFixed(2)} kg
                      </span>
                    ) : '-'}
                  </td>
                </tr>
              </tfoot>"""
              
content = content.replace(foot_code, new_foot_code)

with open('src/components/VisitForm.tsx', 'w') as f:
    f.write(content)
