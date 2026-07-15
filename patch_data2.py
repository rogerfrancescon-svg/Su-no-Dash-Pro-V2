import os

with open('src/data.ts', 'r') as f:
    content = f.read()

start_marker = "export const getEffectiveDayForWeight ="
end_marker = "// Parser"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    replacement = """export const getExpectedPerformance = (idade: number, tipoLote?: 'Misto' | 'Fêmea' | 'Macho', pesoAloj?: number) => {
  const curve = tipoLote === 'Fêmea' ? growthCurveFemea : growthCurve;
  
  let currentWeight = (pesoAloj && pesoAloj > 0) ? pesoAloj : curve[0].pesoInicial;
  let totalConsumo = 0;
  
  for (let d = 0; d < idade; d++) {
    let point = curve.find(p => currentWeight >= p.pesoInicial && currentWeight < p.pesoFinal);
    if (!point) {
      if (currentWeight < curve[0].pesoInicial) {
        point = curve[0];
      } else {
        point = curve[curve.length - 1];
      }
    }
    
    totalConsumo += point.cmd;
    currentWeight += point.gpd;
  }
  
  return {
    expectedConsumption: Number(totalConsumo.toFixed(2)),
    expectedWeight: Number(currentWeight.toFixed(2))
  };
};

export const getExpectedConsumption = (idade: number, tipoLote?: 'Misto' | 'Fêmea' | 'Macho', pesoAloj?: number): number => {
  return getExpectedPerformance(idade, tipoLote, pesoAloj).expectedConsumption;
};

export const getExpectedWeight = (idade: number, tipoLote?: 'Misto' | 'Fêmea' | 'Macho', pesoAloj?: number): number => {
  return getExpectedPerformance(idade, tipoLote, pesoAloj).expectedWeight;
};

"""
    new_content = content[:start_idx] + replacement + content[end_idx:]
    with open('src/data.ts', 'w') as f:
        f.write(new_content)
    print("Patched successfully")
else:
    print("Markers not found")
