import os

with open('src/components/Visits.tsx', 'r') as f:
    content = f.read()

target1 = """                <th className="px-5 py-4 border-b border-slate-200 w-48 sticky right-0 top-0 bg-slate-50 z-30">Ações</th>"""

replacement1 = """                <th className="px-3 py-2 border-b border-slate-200 w-[70px] sticky right-0 top-0 bg-slate-50 z-30 text-center">Ações</th>"""

if target1 in content:
    content = content.replace(target1, replacement1)
    print("Patched header")
else:
    print("Header not found")

with open('src/components/Visits.tsx', 'w') as f:
    f.write(content)
