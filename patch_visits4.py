import os

with open('src/components/Visits.tsx', 'r') as f:
    content = f.read()

target1 = """                    <td className="px-5 py-4 whitespace-nowrap sticky right-0 bg-white group-hover:bg-slate-50 transition-colors z-10">
                      <div className="flex flex-col gap-1 items-start">
                        <button
                          onClick={() => setSelectedIntegradoDetails(v.integradoId)}
                          className="text-slate-600 hover:text-slate-900 text-xs font-semibold px-2 py-1 rounded hover:bg-slate-100 transition-colors flex items-center gap-1"
                          title="Ver Detalhes do Lote"
                        >
                          <Eye size={14} /> Detalhes
                        </button>"""

replacement1 = """                    <td className="px-3 py-2 whitespace-nowrap sticky right-0 bg-white group-hover:bg-slate-50 transition-colors z-10 w-[70px]">
                      <div className="flex flex-col gap-1 items-center">
                        <button
                          onClick={() => setSelectedIntegradoDetails(v.integradoId)}
                          className="text-slate-600 hover:text-slate-900 text-xs font-semibold px-2 py-1 rounded hover:bg-slate-100 transition-colors w-full text-center"
                          title="Ver Detalhes do Lote"
                        >
                          Detalhes
                        </button>"""

if target1 in content:
    content = content.replace(target1, replacement1)
    print("Patched target 1")
else:
    print("Target 1 not found")

with open('src/components/Visits.tsx', 'w') as f:
    f.write(content)
