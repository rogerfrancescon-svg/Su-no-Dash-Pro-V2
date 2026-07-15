import os
import re

with open('src/data.ts', 'r') as f:
    content = f.read()

# Replace getEffectiveDayForWeight and everything until the end of getExpectedWeight with new logic
pattern = re.compile(r"export const getEffectiveDayForWeight = .*?export const getExpectedWeight = [^}]+};\n", re.DOTALL)

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

new_content = pattern.sub(replacement, content)

with open('src/data.ts', 'w') as f:
    f.write(new_content)
