const fs = require('fs');
let c = fs.readFileSync('src/components/ReferenceCurve.tsx', 'utf8');

c = c.replace(
  /<select[\s\S]*?className="[^"]*"[\s\S]*?>[\s\S]*?<\/select>/,
  \`<select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value)}
              className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D452B] focus:border-[#2D452B]"
            >
              {growthCurvesMisto.map(cv => {
                const [y, m, d] = cv.effectiveDate.split('-');
                const dateObj = new Date(Number(y), Number(m)-1, Number(d));
                return (
                  <option key={cv.version} value={cv.version}>
                    {cv.version === growthCurvesMisto[growthCurvesMisto.length - 1].version ? \\\`Atual (\\\${cv.version.toUpperCase()})\\\` : \\\`Histórico (\\\${cv.version.toUpperCase()}) - Desde \\\${dateObj.toLocaleDateString('pt-BR')}\\\`}
                  </option>
                );
              })}
            </select>\`
);

fs.writeFileSync('src/components/ReferenceCurve.tsx', c);
