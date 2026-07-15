import os

with open('src/components/VisitForm.tsx', 'r') as f:
    lines = f.readlines()

# find where "  return (" is.
return_idx = -1
for i, line in enumerate(lines):
    if line.startswith("  return ("):
        return_idx = i
        break

logic_code = """
  const currentConsumoReal = Number(formData.consumoAcumuladoReal) || null;
  const currentDiffKg = (currentConsumoReal !== null && expectedConsumption !== null) ? (currentConsumoReal - expectedConsumption) : null;
  const currentDiffPct = (currentDiffKg !== null && expectedConsumption && expectedConsumption > 0) ? (currentDiffKg / expectedConsumption * 100) : null;

  const currentIntegradoId = initialData?.integradoId || `i_${(formData.integradoNome || '').replace(/\\s+/g, '').toLowerCase()}_${(formData.alojamentoDate || '').replace(/[-/]/g, '')}`;
  const prevVisit = [...visits]
    .filter(v => v.integradoId === currentIntegradoId && (!initialData || v.id !== initialData.id) && new Date(v.date).getTime() < new Date(formData.date || new Date().toISOString()).getTime())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  let prevVisitInfo = null;
  if (!initialData && prevVisit) {
      const prevIdade = prevVisit.idade || 0;
      const prevExpected = getExpectedConsumption(prevIdade, prevVisit.tipoLote || formData.tipoLote as any, prevVisit.pesoAloj || formData.pesoAloj);
      const prevReal = prevVisit.consumoAcumuladoReal;
      
      let diffInfo = '';
      if (prevReal !== undefined && prevReal !== null && prevExpected) {
          const diffKg = prevReal - prevExpected;
          const diffPct = (diffKg / prevExpected * 100);
          const status = diffKg > 0 ? 'acima' : diffKg < 0 ? 'abaixo' : 'dentro';
          diffInfo = `${Math.abs(diffKg).toFixed(2)} kg ${status} do esperado (${Math.abs(diffPct).toFixed(1)}%)`;
      } else {
          diffInfo = 'Sem dados de consumo na última visita.';
      }
      
      prevVisitInfo = {
          date: prevVisit.date,
          diffInfo
      };
  }

"""

lines.insert(return_idx, logic_code)

content = "".join(lines)
content = content.replace(
    "getExpectedConsumption(currentIdade, formData.tipoLote as any)",
    "getExpectedConsumption(currentIdade, formData.tipoLote as any, formData.pesoAloj)"
)

prev_banner = """
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {prevVisitInfo && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
            <h3 className="text-sm font-semibold text-blue-800">Última Visita: {new Date(prevVisitInfo.date).toLocaleDateString('pt-BR')}</h3>
            <p className="text-sm text-blue-700 mt-1">{prevVisitInfo.diffInfo}</p>
          </div>
        )}
"""
content = content.replace('      <form onSubmit={handleSubmit} className="p-6 space-y-6">', prev_banner)

# Let's insert the diff banner below "Consumo Real (Calculado)" in the summary box.
# It is this line: <span className="flex items-center gap-2 justify-end">Consumo Real (Calculado): <strong className={formData.consumoAcumuladoReal && expectedConsumption && formData.consumoAcumuladoReal < expectedConsumption ? 'text-red-600' : 'text-green-600'}>{formData.consumoAcumuladoReal || '-'} kg/cab</strong></span>

diff_banner = """
                <span className="flex items-center gap-2 justify-end">Consumo Real (Calculado): <strong className={formData.consumoAcumuladoReal && expectedConsumption && formData.consumoAcumuladoReal > expectedConsumption ? 'text-red-600' : 'text-green-600'}>{formData.consumoAcumuladoReal || '-'} kg/cab</strong></span>
                {currentDiffKg !== null && currentDiffPct !== null && (
                  <span className={`flex items-center gap-2 justify-end text-xs font-semibold ${currentDiffKg > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                    Diferença: {currentDiffKg > 0 ? '+' : ''}{currentDiffKg.toFixed(2)} kg ({currentDiffKg > 0 ? '+' : ''}{currentDiffPct.toFixed(1)}%)
                  </span>
                )}
"""
# Note: I also fixed the condition for red/green on Consumo Real. > expected is red (bad), < expected is green (good).

content = content.replace(
    """<span className="flex items-center gap-2 justify-end">Consumo Real (Calculado): <strong className={formData.consumoAcumuladoReal && expectedConsumption && formData.consumoAcumuladoReal < expectedConsumption ? 'text-red-600' : 'text-green-600'}>{formData.consumoAcumuladoReal || '-'} kg/cab</strong></span>""",
    diff_banner
)

with open('src/components/VisitForm.tsx', 'w') as f:
    f.write(content)
