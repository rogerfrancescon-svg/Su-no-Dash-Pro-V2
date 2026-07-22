const fs = require('fs');
let content = fs.readFileSync('src/lib/storage.ts', 'utf8');

const target = `          const metas = tipoLote === 'Fêmea' ? defaultMetasFemea : defaultMetas;
          
          visits.push({
            id: getCol(row, 'id'),
            integradoId: integradoId,
            date: dataVisita,
            idade: calculatedIdade,
            animaisAlojados: parseFloatSafe(getCol(row, 'Animais Alojados')),
            animaisMortos: parseFloatSafe(getCol(row, 'Animais Mortos')),
            mortalidade: parseFloatSafe(getCol(row, 'Mortalidade')),
            volumeTotalCargas: parseFloatSafe(getCol(row, 'Vol. Cargas (kg)')),
            recomendacao: getCol(row, 'Recomendação') || '',
            consumoAcumuladoReal: parseFloatSafe(getCol(row, 'Consumo Acumulado Real') ?? getCol(row, 'Consumo acumulado')),

            comedouro: (getCol(row, 'Comedouro') as any) || 'Automático',
            tipoLote,
            colaborador: getCol(row, 'Colaborador') || '',
            pesoAloj: parseFloatSafe(getCol(row, 'Peso aloj')),
            pontuacaoSanitaria: parseFloatSafe(getCol(row, 'Pontuação Sanitária')),
            metaAlojamento: parseFloatSafe(getCol(row, 'Meta Aloj')) ?? metas.metaAlojamento,
            consumoAlojamento: parseFloatSafe(getCol(row, 'Cons. Aloj')),
            metaCrescimento1: parseFloatSafe(getCol(row, 'Meta Cresc 1')) ?? metas.metaCrescimento1,
            consumoCrescimento1: parseFloatSafe(getCol(row, 'Cons. Cresc 1')),
            metaCrescimento2: parseFloatSafe(getCol(row, 'Meta Cresc 2')) ?? metas.metaCrescimento2,
            consumoCrescimento2: parseFloatSafe(getCol(row, 'Cons. Cresc 2')),
            metaCrescimento3: parseFloatSafe(getCol(row, 'Meta Cresc 3')) ?? metas.metaCrescimento3,
            consumoCrescimento3: parseFloatSafe(getCol(row, 'Cons. Cresc 3')),
            metaTerminacao1: parseFloatSafe(getCol(row, 'Meta Term 1')) ?? metas.metaTerminacao1,
            consumoTerminacao1: parseFloatSafe(getCol(row, 'Cons. Term 1')),
            metaTerminacao2: parseFloatSafe(getCol(row, 'Meta Term 2')) ?? metas.metaTerminacao2,
            consumoTerminacao2: parseFloatSafe(getCol(row, 'Cons. Term 2')),
            metaAcumulada: parseFloatSafe(getCol(row, 'Meta Acum.')) ?? metas.metaAcumulada,
          });`;

const replacement = `          const metas = tipoLote === 'Fêmea' ? defaultMetasFemea : defaultMetas;
          
          const alojados = parseFloatSafe(getCol(row, 'Animais Alojados'));
          const mortos = parseFloatSafe(getCol(row, 'Animais Mortos')) || 0;
          const vivos = alojados ? alojados - mortos : 0;
          const calcCarga = (cons: number | undefined) => (cons !== undefined && vivos > 0) ? Number((cons * vivos).toFixed(2)) : undefined;

          const consumoAlojamento = parseFloatSafe(getCol(row, 'Cons. Aloj'));
          const consumoCrescimento1 = parseFloatSafe(getCol(row, 'Cons. Cresc 1'));
          const consumoCrescimento2 = parseFloatSafe(getCol(row, 'Cons. Cresc 2'));
          const consumoCrescimento3 = parseFloatSafe(getCol(row, 'Cons. Cresc 3'));
          const consumoTerminacao1 = parseFloatSafe(getCol(row, 'Cons. Term 1'));
          const consumoTerminacao2 = parseFloatSafe(getCol(row, 'Cons. Term 2'));

          visits.push({
            id: getCol(row, 'id'),
            integradoId: integradoId,
            date: dataVisita,
            idade: calculatedIdade,
            animaisAlojados: alojados,
            animaisMortos: parseFloatSafe(getCol(row, 'Animais Mortos')),
            mortalidade: parseFloatSafe(getCol(row, 'Mortalidade')),
            volumeTotalCargas: parseFloatSafe(getCol(row, 'Vol. Cargas (kg)')),
            recomendacao: getCol(row, 'Recomendação') || '',
            consumoAcumuladoReal: parseFloatSafe(getCol(row, 'Consumo Acumulado Real') ?? getCol(row, 'Consumo acumulado')),

            comedouro: (getCol(row, 'Comedouro') as any) || 'Automático',
            tipoLote,
            colaborador: getCol(row, 'Colaborador') || '',
            pesoAloj: parseFloatSafe(getCol(row, 'Peso aloj')),
            pontuacaoSanitaria: parseFloatSafe(getCol(row, 'Pontuação Sanitária')),
            metaAlojamento: parseFloatSafe(getCol(row, 'Meta Aloj')) ?? metas.metaAlojamento,
            consumoAlojamento,
            cargaAlojamento: calcCarga(consumoAlojamento),
            metaCrescimento1: parseFloatSafe(getCol(row, 'Meta Cresc 1')) ?? metas.metaCrescimento1,
            consumoCrescimento1,
            cargaCrescimento1: calcCarga(consumoCrescimento1),
            metaCrescimento2: parseFloatSafe(getCol(row, 'Meta Cresc 2')) ?? metas.metaCrescimento2,
            consumoCrescimento2,
            cargaCrescimento2: calcCarga(consumoCrescimento2),
            metaCrescimento3: parseFloatSafe(getCol(row, 'Meta Cresc 3')) ?? metas.metaCrescimento3,
            consumoCrescimento3,
            cargaCrescimento3: calcCarga(consumoCrescimento3),
            metaTerminacao1: parseFloatSafe(getCol(row, 'Meta Term 1')) ?? metas.metaTerminacao1,
            consumoTerminacao1,
            cargaTerminacao1: calcCarga(consumoTerminacao1),
            metaTerminacao2: parseFloatSafe(getCol(row, 'Meta Term 2')) ?? metas.metaTerminacao2,
            consumoTerminacao2,
            cargaTerminacao2: calcCarga(consumoTerminacao2),
            metaAcumulada: parseFloatSafe(getCol(row, 'Meta Acum.')) ?? metas.metaAcumulada,
          });`;

content = content.replace(target, replacement);
fs.writeFileSync('src/lib/storage.ts', content);
