import os

with open('src/components/Visits.tsx', 'r') as f:
    content = f.read()

target1 = """                        <button 
                          onClick={() => {
                            setDeleteConfirmId(null);
                            onEditVisit(v.id);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-xs font-semibold px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                        >
                          Editar
                        </button>
                        {deleteConfirmId === v.id ? (
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => {
                                onDeleteVisit(v.id);
                                setDeleteConfirmId(null);
                              }}
                              className="text-white bg-red-500 hover:bg-red-600 text-[10px] font-bold px-2 py-1 rounded transition-colors"
                            >
                              Sim
                            </button>
                            <button 
                              onClick={() => setDeleteConfirmId(null)}
                              className="text-slate-600 bg-slate-200 hover:bg-slate-300 text-[10px] font-bold px-2 py-1 rounded transition-colors"
                            >
                              Não
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setDeleteConfirmId(v.id)}
                            className="text-red-600 hover:text-red-800 text-xs font-semibold px-2 py-1 rounded hover:bg-red-50 transition-colors"
                          >
                            Apagar
                          </button>
                        )}"""

replacement1 = """                        <button 
                          onClick={() => {
                            setDeleteConfirmId(null);
                            onEditVisit(v.id);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-xs font-semibold px-2 py-1 rounded hover:bg-blue-50 transition-colors w-full text-center"
                        >
                          Editar
                        </button>
                        {deleteConfirmId === v.id ? (
                          <div className="flex items-center justify-center gap-1 w-full">
                            <button 
                              onClick={() => {
                                onDeleteVisit(v.id);
                                setDeleteConfirmId(null);
                              }}
                              className="text-white bg-red-500 hover:bg-red-600 text-[10px] font-bold px-2 py-1 rounded transition-colors flex-1"
                            >
                              Sim
                            </button>
                            <button 
                              onClick={() => setDeleteConfirmId(null)}
                              className="text-slate-600 bg-slate-200 hover:bg-slate-300 text-[10px] font-bold px-2 py-1 rounded transition-colors flex-1"
                            >
                              Não
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setDeleteConfirmId(v.id)}
                            className="text-red-600 hover:text-red-800 text-xs font-semibold px-2 py-1 rounded hover:bg-red-50 transition-colors w-full text-center"
                          >
                            Apagar
                          </button>
                        )}"""


if target1 in content:
    content = content.replace(target1, replacement1)
    print("Patched target 1")
else:
    print("Target 1 not found")

with open('src/components/Visits.tsx', 'w') as f:
    f.write(content)
