import os

with open('src/App.tsx', 'r') as f:
    content = f.read()

target = """                onNewVisit={() => { setEditingVisitId(null); setIsNewLoteMode(false); setIsVisitFormOpen(true); }}
                onNewLote={() => { setEditingVisitId(null); setIsNewLoteMode(true); setIsVisitFormOpen(true); }}"""

replacement = """                onNewVisit={() => { setEditingVisitId(null); setIsNewLoteMode(false); setIsVisitFormOpen(true); }}
                onNewLote={() => { setEditingVisitId(null); setIsNewLoteMode(true); setIsVisitFormOpen(true); }}
                onViewDetails={(integradoId) => {
                  window.dispatchEvent(new CustomEvent('dashboard:select-lote', { detail: integradoId }));
                  setCurrentTab('dashboard');
                }}"""

if target in content:
    with open('src/App.tsx', 'w') as f:
        f.write(content.replace(target, replacement))
    print("Patched App.tsx")
else:
    print("Target not found in App.tsx")
