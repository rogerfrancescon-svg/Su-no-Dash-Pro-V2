const fs = require('fs');
let content = fs.readFileSync('src/components/VisitForm.tsx', 'utf8');

const targetDot = `fill={Number(formData.consumoAcumuladoReal) >= (expectedConsumption || 0) ? "#22c55e" : "#ef4444"}`;
const replacementDot = `fill={(currentDiffKg !== null && currentDiffKg >= -5 && currentDiffKg <= 5) ? "#10b981" : (currentDiffKg !== null && currentDiffKg < -5) ? "#ef4444" : "#3b82f6"}`;

content = content.replace(targetDot, replacementDot);

const targetLegend = `<p className="text-xs text-center text-slate-500 mt-2">
                O ponto colorido mostra o consumo real atual vs a curva esperada.
                <span className="inline-block w-3 h-3 rounded-full bg-green-500 ml-2 mr-1 align-middle"></span> Acima/Na meta
                <span className="inline-block w-3 h-3 rounded-full bg-red-500 ml-2 mr-1 align-middle"></span> Abaixo
              </p>`;

const replacementLegend = `<p className="text-xs text-center text-slate-500 mt-2">
                O ponto colorido mostra o consumo real atual vs a curva esperada.<br className="md:hidden" />
                <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 ml-2 mr-1 align-middle"></span> Na meta (±5kg)
                <span className="inline-block w-3 h-3 rounded-full bg-red-500 ml-2 mr-1 align-middle"></span> Abaixo (&lt;-5kg)
                <span className="inline-block w-3 h-3 rounded-full bg-blue-500 ml-2 mr-1 align-middle"></span> Acima (&gt;5kg)
              </p>`;

content = content.replace(targetLegend, replacementLegend);

fs.writeFileSync('src/components/VisitForm.tsx', content);
