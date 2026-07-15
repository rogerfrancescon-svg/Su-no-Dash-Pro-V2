const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

code = code.replace(/('Misto' \| 'Fêmea')/g, "('Misto' | 'Fêmea' | 'Macho')");

const newFuncs = `
export const getEffectiveDayForWeight = (weight: number, tipoLote?: 'Misto' | 'Fêmea' | 'Macho'): number => {
  const curve = tipoLote === 'Fêmea' ? growthCurveFemea : growthCurve;
  
  if (weight <= curve[0].pesoInicial) return 1;
  if (weight >= curve[curve.length - 1].pesoFinal) return curve[curve.length - 1].dia;

  for (let i = 0; i < curve.length; i++) {
    const p = curve[i];
    if (weight >= p.pesoInicial && weight <= p.pesoFinal) {
      const ratio = (weight - p.pesoInicial) / (p.pesoFinal - p.pesoInicial);
      return p.dia + ratio;
    }
  }
  return 1;
};

export const getExpectedConsumptionFromCurve = (day: number, tipoLote?: 'Misto' | 'Fêmea' | 'Macho'): number => {
  const curve = tipoLote === 'Fêmea' ? growthCurveFemea : growthCurve;
  const exactMatch = curve.find(p => p.dia === day);
  if (exactMatch) return exactMatch.consumoAcumulado;

  const sorted = [...curve].sort((a, b) => a.dia - b.dia);
  if (day <= sorted[0].dia) return sorted[0].consumoAcumulado;
  if (day >= sorted[sorted.length - 1].dia) return sorted[sorted.length - 1].consumoAcumulado;

  for (let i = 0; i < sorted.length - 1; i++) {
    if (day > sorted[i].dia && day < sorted[i+1].dia) {
      const p1 = sorted[i];
      const p2 = sorted[i+1];
      const ratio = (day - p1.dia) / (p2.dia - p1.dia);
      return Number((p1.consumoAcumulado + ratio * (p2.consumoAcumulado - p1.consumoAcumulado)).toFixed(2));
    }
  }
  return sorted[0].consumoAcumulado;
};

export const getExpectedConsumption = (idade: number, tipoLote?: 'Misto' | 'Fêmea' | 'Macho', pesoAloj?: number): number => {
  if (pesoAloj && pesoAloj > 0) {
    const effectiveStartDay = getEffectiveDayForWeight(pesoAloj, tipoLote);
    const effectiveCurrentDay = effectiveStartDay + idade;
    
    const startConsumo = getExpectedConsumptionFromCurve(effectiveStartDay, tipoLote);
    const currentConsumo = getExpectedConsumptionFromCurve(effectiveCurrentDay, tipoLote);
    
    return Number(Math.max(0, currentConsumo - startConsumo).toFixed(2));
  }
  
  return getExpectedConsumptionFromCurve(idade, tipoLote);
};
`;

code = code.replace(/export const getExpectedConsumption =.*?return sorted\[0\]\.consumoAcumulado; \/\/ Approx\s*};/s, newFuncs);

fs.writeFileSync('src/data.ts', code);
