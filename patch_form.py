import re

with open('src/components/VisitForm.tsx', 'r') as f:
    content = f.read()

# 1. Update getExpectedConsumption call
content = content.replace(
    "getExpectedConsumption(currentIdade, formData.tipoLote as any)",
    "getExpectedConsumption(currentIdade, formData.tipoLote as any, formData.pesoAloj)"
)

# 2. Add prevVisit and difference logic
diff_logic = """
  const currentConsumoReal = Number(formData.consumoAcumuladoReal) || null;
  const currentDiffKg = (currentConsumoReal !== null && expectedConsumption !== null) ? (currentConsumoReal - expectedConsumption) : null;
  const currentDiffPct = (currentDiffKg !== null && expectedConsumption && expectedConsumption > 0) ? (currentDiffKg / expectedConsumption * 100) : null;

  const currentIntegradoId = initialData?.integradoId || `i_${(formData.integradoNome || '').replace(/\s+/g, '').toLowerCase()}_${(formData.alojamentoDate || '').replace(/[-/]/g, '')}`;
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

  return (
"""
content = content.replace("  return (\n", diff_logic)

# 3. Inject banners in the UI
# Let's find a good place for prevVisit banner, maybe just below the header inside the form?
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

# Let's find where Consumo Acumulado is and put a banner for current difference next to it or under it.
# We can find `name="consumoAcumuladoReal"`
current_diff_banner = """
              <div className="mt-2 text-xs">
                {currentDiffKg !== null && currentDiffPct !== null && (
                  <span className={`font-semibold ${currentDiffKg > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {currentDiffKg > 0 ? '+' : ''}{currentDiffKg.toFixed(2)} kg ({currentDiffKg > 0 ? '+' : ''}{currentDiffPct.toFixed(1)}%) em relação ao esperado
                  </span>
                )}
              </div>
            </div>
"""
content = content.replace('className="w-full border border-slate-200 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"\n            />\n          </div>', 'className="w-full border border-slate-200 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"\n            />' + current_diff_banner, 1)
# Wait, this replace might hit the first input instead of consumoAcumuladoReal.
with open('src/components/VisitForm.tsx', 'w') as f:
    f.write(content)
