import os

with open('src/data.ts', 'r') as f:
    content = f.read()

target = """  let currentWeight = (pesoAloj && pesoAloj > 0) ? pesoAloj : curve[0].pesoInicial;"""
replacement = """  let currentWeight = (pesoAloj && Number(pesoAloj) > 0) ? Number(pesoAloj) : curve[0].pesoInicial;"""

if target in content:
    with open('src/data.ts', 'w') as f:
        f.write(content.replace(target, replacement))
    print("Patched successfully")
else:
    print("Target not found")
