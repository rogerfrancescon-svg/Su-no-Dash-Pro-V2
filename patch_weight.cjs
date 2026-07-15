const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

const newFunc = `
export const getExpectedWeightFromCurve = (day: number, tipoLote?: 'Misto' | 'Fêmea' | 'Macho'): number => {
  const curve = tipoLote === 'Fêmea' ? growthCurveFemea : growthCurve;
  const exactMatch = curve.find(p => p.dia === day);
  if (exactMatch) return exactMatch.pesoInicial;

  const sorted = [...curve].sort((a, b) => a.dia - b.dia);
  if (day <= sorted[0].dia) return sorted[0].pesoInicial;
  if (day >= sorted[sorted.length - 1].dia) return sorted[sorted.length - 1].pesoInicial;

  for (let i = 0; i < sorted.length - 1; i++) {
    if (day > sorted[i].dia && day < sorted[i+1].dia) {
      const p1 = sorted[i];
      const p2 = sorted[i+1];
      const ratio = (day - p1.dia) / (p2.dia - p1.dia);
      return Number((p1.pesoInicial + ratio * (p2.pesoInicial - p1.pesoInicial)).toFixed(2));
    }
  }
  return sorted[0].pesoInicial;
};

export const getExpectedWeight = (idade: number, tipoLote?: 'Misto' | 'Fêmea' | 'Macho', pesoAloj?: number): number => {
  if (pesoAloj && pesoAloj > 0) {
    const effectiveStartDay = getEffectiveDayForWeight(pesoAloj, tipoLote);
    const effectiveCurrentDay = effectiveStartDay + idade;
    return getExpectedWeightFromCurve(effectiveCurrentDay, tipoLote);
  }
  
  return getExpectedWeightFromCurve(idade, tipoLote);
};
`;

code = code.replace(/export const getExpectedWeight =.*?return sorted\[0\]\.pesoInicial; \/\/ Approx\s*};/s, newFunc);
fs.writeFileSync('src/data.ts', code);
