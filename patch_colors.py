import os

with open('src/components/Visits.tsx', 'r') as f:
    content = f.read()

target1 = """                                    <td className={`px-4 py-2 font-medium ${diff && diff > 0 ? 'text-red-600' : diff && diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>{cons ?? '-'}</td>
                                    <td className={`px-4 py-2 font-medium ${diff && diff > 0 ? 'text-red-600' : diff && diff < 0 ? 'text-green-600' : 'text-slate-600'}`}>"""

replacement1 = """                                    <td className={`px-4 py-2 font-medium ${diff !== null && Math.abs(diff) <= 5 ? 'text-blue-600' : diff !== null && diff > 5 ? 'text-red-600' : diff !== null && diff < -5 ? 'text-green-600' : 'text-slate-600'}`}>{cons ?? '-'}</td>
                                    <td className={`px-4 py-2 font-medium ${diff !== null && Math.abs(diff) <= 5 ? 'text-blue-600' : diff !== null && diff > 5 ? 'text-red-600' : diff !== null && diff < -5 ? 'text-green-600' : 'text-slate-600'}`}>"""


target2 = """                                <span className={`font-semibold ${diffAcumulado && diffAcumulado > 0 ? 'text-red-600' : diffAcumulado && diffAcumulado < 0 ? 'text-green-600' : 'text-slate-700'}`}>"""

replacement2 = """                                <span className={`font-semibold ${diffAcumulado !== null && Math.abs(diffAcumulado) <= 5 ? 'text-blue-600' : diffAcumulado !== null && diffAcumulado > 5 ? 'text-red-600' : diffAcumulado !== null && diffAcumulado < -5 ? 'text-green-600' : 'text-slate-700'}`}>"""

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
