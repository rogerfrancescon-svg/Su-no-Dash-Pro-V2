import os

with open('src/components/VisitForm.tsx', 'r') as f:
    content = f.read()

target1 = """                <span className="flex items-center gap-2 justify-end">Consumo Real (Calculado): <strong className={formData.consumoAcumuladoReal && expectedConsumption && formData.consumoAcumuladoReal > expectedConsumption ? 'text-red-600' : 'text-green-600'}>{formData.consumoAcumuladoReal || '-'} kg/cab</strong></span>"""

replacement1 = """                <span className="flex items-center gap-2 justify-end">Consumo Real (Calculado): <strong className={currentDiffKg !== null && Math.abs(currentDiffKg) <= 5 ? 'text-blue-600' : currentDiffKg !== null && currentDiffKg > 5 ? 'text-red-600' : currentDiffKg !== null && currentDiffKg < -5 ? 'text-green-600' : 'text-slate-600'}>{formData.consumoAcumuladoReal || '-'} kg/cab</strong></span>"""

target2 = """                {currentDiffKg !== null && currentDiffPct !== null && (
                  <span className={`flex items-center gap-2 justify-end text-xs font-semibold ${currentDiffKg > 0 ? 'text-red-600' : 'text-emerald-600'}`}>"""

replacement2 = """                {currentDiffKg !== null && currentDiffPct !== null && (
                  <span className={`flex items-center gap-2 justify-end text-xs font-semibold ${Math.abs(currentDiffKg) <= 5 ? 'text-blue-600' : currentDiffKg > 5 ? 'text-red-600' : 'text-emerald-600'}`}>"""

target3 = """                      <input type="number" step="0.01" name={phase.consKey} value={(formData as any)[phase.consKey] || ''} onChange={handleChange} className={`w-full border border-slate-200 rounded p-1.5 text-xs md:text-sm bg-slate-50 font-semibold focus:ring-2 focus:ring-blue-500 outline-none ${diff && diff > 0 ? 'text-red-600' : diff && diff < 0 ? 'text-green-600' : 'text-slate-600'}`} readOnly placeholder="0.00" />"""

replacement3 = """                      <input type="number" step="0.01" name={phase.consKey} value={(formData as any)[phase.consKey] || ''} onChange={handleChange} className={`w-full border border-slate-200 rounded p-1.5 text-xs md:text-sm bg-slate-50 font-semibold focus:ring-2 focus:ring-blue-500 outline-none ${diff !== null && Math.abs(diff) <= 5 ? 'text-blue-600' : diff !== null && diff > 5 ? 'text-red-600' : diff !== null && diff < -5 ? 'text-green-600' : 'text-slate-600'}`} readOnly placeholder="0.00" />"""

target4 = """                      {diff !== null && diffPct !== null ? (
                        <span className={diff > 0 ? 'text-red-600' : 'text-green-600'}>"""

replacement4 = """                      {diff !== null && diffPct !== null ? (
                        <span className={Math.abs(diff) <= 5 ? 'text-blue-600' : diff > 5 ? 'text-red-600' : 'text-green-600'}>"""


target5 = """                    <input type="number" step="0.01" name="consumoAcumuladoReal" value={formData.consumoAcumuladoReal || ''} onChange={handleChange} className={`w-full border border-slate-200 rounded p-1.5 text-xs md:text-sm font-bold bg-slate-100 focus:ring-2 focus:ring-blue-500 outline-none ${currentDiffKg && currentDiffKg > 0 ? 'text-red-600' : currentDiffKg && currentDiffKg < 0 ? 'text-green-600' : 'text-slate-700'}`} readOnly placeholder="0.00" />"""

replacement5 = """                    <input type="number" step="0.01" name="consumoAcumuladoReal" value={formData.consumoAcumuladoReal || ''} onChange={handleChange} className={`w-full border border-slate-200 rounded p-1.5 text-xs md:text-sm font-bold bg-slate-100 focus:ring-2 focus:ring-blue-500 outline-none ${currentDiffKg !== null && Math.abs(currentDiffKg) <= 5 ? 'text-blue-600' : currentDiffKg !== null && currentDiffKg > 5 ? 'text-red-600' : currentDiffKg !== null && currentDiffKg < -5 ? 'text-green-600' : 'text-slate-700'}`} readOnly placeholder="0.00" />"""

target6 = """                    {currentDiffKg !== null && currentDiffPct !== null ? (
                      <span className={currentDiffKg > 0 ? 'text-red-600' : 'text-green-600'}>"""

replacement6 = """                    {currentDiffKg !== null && currentDiffPct !== null ? (
                      <span className={Math.abs(currentDiffKg) <= 5 ? 'text-blue-600' : currentDiffKg > 5 ? 'text-red-600' : 'text-green-600'}>"""


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

if target3 in content:
    content = content.replace(target3, replacement3)
    print("Patched target 3")
else:
    print("Target 3 not found")

if target4 in content:
    content = content.replace(target4, replacement4)
    print("Patched target 4")
else:
    print("Target 4 not found")

if target5 in content:
    content = content.replace(target5, replacement5)
    print("Patched target 5")
else:
    print("Target 5 not found")

if target6 in content:
    content = content.replace(target6, replacement6)
    print("Patched target 6")
else:
    print("Target 6 not found")

with open('src/components/VisitForm.tsx', 'w') as f:
    f.write(content)
