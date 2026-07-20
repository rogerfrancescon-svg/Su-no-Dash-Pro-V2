const fs = require('fs');
let content = fs.readFileSync('src/lib/storage.ts', 'utf8');

// Replace saveVisits
const newSaveVisits = `saveVisits: async (visits: Visit[], visitsToSyncToSupabase?: Visit[]): Promise<Visit[]> => {
    let session = null;
    try {
      const res = await supabase.auth.getSession();
      session = res.data.session;
    } catch (e) {}

    const userId = session?.user?.id;
    const integrados = getIntegradosLocal();
    const toUpdate = [];
    const toInsert = [];
    const originalVisitsWithFakeIds: Visit[] = [];
    const toProcess = visitsToSyncToSupabase || visits;

    for (const v of toProcess) {
      const integrado = integrados.find(i => i.id === v.integradoId);
      const toNum = (val: any) => (val === '' || val === null || val === undefined || isNaN(Number(val))) ? null : Number(val);
      const row: any = {
        'Data': v.date,
        'Integrado': integrado?.name || 'Desconhecido',
        'Alojamento': integrado?.alojamentoDate || '',
        'Tipo Lote': v.tipoLote || 'Misto',
        'Idade': toNum(v.idade) || 0,
        'Animais Alojados': toNum(v.animaisAlojados),
        'Animais Mortos': toNum(v.animaisMortos),
        'Vol. Cargas (kg)': toNum(v.volumeTotalCargas),
        'Recomendação': v.recomendacao || '',
        'Consumo acumulado': toNum(v.consumoAcumuladoReal),
        'Comedouro': v.comedouro || '',
        'Colaborador': v.colaborador || '',
        'Meta Aloj': toNum(v.metaAlojamento),
        'Cons. Aloj': toNum(v.consumoAlojamento),
        'Meta Cresc 1': toNum(v.metaCrescimento1),
        'Cons. Cresc 1': toNum(v.consumoCrescimento1),
        'Meta Cresc 2': toNum(v.metaCrescimento2),
        'Cons. Cresc 2': toNum(v.consumoCrescimento2),
        'Meta Cresc 3': toNum(v.metaCrescimento3),
        'Cons. Cresc 3': toNum(v.consumoCrescimento3),
        'Meta Term 1': toNum(v.metaTerminacao1),
        'Cons. Term 1': toNum(v.consumoTerminacao1),
        'Meta Term 2': toNum(v.metaTerminacao2),
        'Cons. Term 2': toNum(v.consumoTerminacao2),
        'Meta Acum.': toNum(v.metaAcumulada),
        'Peso aloj': toNum(v.pesoAloj),
        'Pontuação Sanitária': toNum(v.pontuacaoSanitaria),
      };

      if (userId) {
        row.user_id = userId;
      }

      if (v.id && !v.id.toString().startsWith('v_') && !v.id.toString().startsWith('dummy_')) {
        row.id = v.id;
        toUpdate.push(row);
      } else {
        toInsert.push(row);
        originalVisitsWithFakeIds.push(v);
      }
    }

    // LOCAL PERSISTENCE FIRST
    // Always save to local storage immediately so it's not lost if network throws
    localStorage.setItem(VISITS_KEY, JSON.stringify(visits));

    try {
      if (!session || session.user?.id === 'offline') {
        console.warn('Offline mode: skipping saveVisits to Supabase');
        addVisitsToOfflineQueue(toProcess);
      } else {
        if (toUpdate.length > 0) {
          for (let i = 0; i < toUpdate.length; i += 500) {
            const chunk = toUpdate.slice(i, i + 500);
            const { error } = await supabase.from('registros').upsert(chunk);
            if (error) {
              if (isNetworkError(error)) {
                console.warn('Network error on upsert, adding to offline queue');
                addVisitsToOfflineQueue(toProcess);
                return visits;
              }
              throw new Error(error.message);
            }
          }
        }
        if (toInsert.length > 0) {
          let insertedRows: any[] = [];
          for (let i = 0; i < toInsert.length; i += 500) {
            const chunk = toInsert.slice(i, i + 500);
            const { data, error } = await supabase.from('registros').insert(chunk).select('id');
            if (error) {
              if (isNetworkError(error)) {
                console.warn('Network error on insert, adding to offline queue');
                addVisitsToOfflineQueue(toProcess);
                return visits;
              }
              throw new Error(error.message);
            }
            if (data) insertedRows = insertedRows.concat(data);
          }

          if (insertedRows.length === originalVisitsWithFakeIds.length) {
            for (let i = 0; i < insertedRows.length; i++) {
              originalVisitsWithFakeIds[i].id = insertedRows[i].id;
            }
            localStorage.setItem(VISITS_KEY, JSON.stringify(visits));
          }
        }
      }
    } catch (e: any) {
      if (isNetworkError(e)) {
         console.warn('Network error caught, adding to offline queue');
         addVisitsToOfflineQueue(toProcess);
      } else {
         console.warn('saveVisits failed with non-network error:', e);
         throw e;
      }
    }

    return visits;
  },`;

const addVisitsHelper = `
function addVisitsToOfflineQueue(toProcess: any[]) {
  try {
    const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]');
    for (const v of toProcess) {
      const existingIdx = queue.findIndex((q: any) => q.id === v.id);
      if (existingIdx >= 0) {
        queue[existingIdx] = v;
      } else {
        queue.push(v);
      }
    }
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
    console.log('Added ' + toProcess.length + ' visits to offline queue');
  } catch (e) {
    console.error('Failed to add to offline queue', e);
  }
}

function isNetworkError(err: any): boolean {
  if (!err) return false;
  const msg = typeof err === 'string' ? err : err.message || '';
  return msg.includes('fetch') || msg.includes('Failed') || err.code === '0' || String(err).includes('fetch') || String(err).includes('Failed');
}
`;

// Insert the helper at the top before storage
content = content.replace('export const storage = {', addVisitsHelper + '\nexport const storage = {');

// We need to replace the exact saveVisits function block. Let's use regex or string replace.
// This might be tricky. Let's find the boundaries.
const startIdx = content.indexOf('saveVisits: async');
const endIdx = content.indexOf('deleteIntegrado: async');

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + newSaveVisits + '\n\n  ' + content.substring(endIdx);
  fs.writeFileSync('src/lib/storage.ts', content);
  console.log('Successfully patched saveVisits');
} else {
  console.log('Could not find saveVisits bounds');
}
