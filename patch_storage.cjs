const fs = require('fs');
let content = fs.readFileSync('src/lib/storage.ts', 'utf8');

const target = `          const metas = tipoLote === 'Fêmea' ? defaultMetasFemea : defaultMetas;
          
          visits.push({`;

const replacement = `          const metas = tipoLote === 'Fêmea' ? defaultMetasFemea : defaultMetas;
          
          const animaisAlojados = parseFloatSafe(getCol(row, 'Animais Alojados'));
          const animaisMortos = parseFloatSafe(getCol(row, 'Animais Mortos'));
          const vivos = (animaisAlojados || 0) - (animaisMortos || 0);
          
          const consAloj = parseFloatSafe(getCol(row, 'Cons. Aloj'));
          const consCresc1 = parseFloatSafe(getCol(row, 'Cons. Cresc 1'));
          const consCresc2 = parseFloatSafe(getCol(row, 'Cons. Cresc 2'));
          const consCresc3 = parseFloatSafe(getCol(row, 'Cons. Cresc 3'));
          const consTerm1 = parseFloatSafe(getCol(row, 'Cons. Term 1'));
          const consTerm2 = parseFloatSafe(getCol(row, 'Cons. Term 2'));
          
          visits.push({
            cargaAlojamento: vivos > 0 && consAloj !== undefined ? Number((vivos * consAloj).toFixed(2)) : undefined,
            cargaCrescimento1: vivos > 0 && consCresc1 !== undefined ? Number((vivos * consCresc1).toFixed(2)) : undefined,
            cargaCrescimento2: vivos > 0 && consCresc2 !== undefined ? Number((vivos * consCresc2).toFixed(2)) : undefined,
            cargaCrescimento3: vivos > 0 && consCresc3 !== undefined ? Number((vivos * consCresc3).toFixed(2)) : undefined,
            cargaTerminacao1: vivos > 0 && consTerm1 !== undefined ? Number((vivos * consTerm1).toFixed(2)) : undefined,
            cargaTerminacao2: vivos > 0 && consTerm2 !== undefined ? Number((vivos * consTerm2).toFixed(2)) : undefined,`;

content = content.replace(target, replacement);

fs.writeFileSync('src/lib/storage.ts', content);
