const fs = require('fs');
let content = fs.readFileSync('src/lib/storage.ts', 'utf8');

// Find syncFromSupabase and add LAST_SYNC_TIME update
// Actually, it's easier to just do it where sync succeeds.
const target = `      const integrados = Array.from(integradosMap.values());
      localStorage.setItem(INTEGRADOS_KEY, JSON.stringify(integrados));
      localStorage.setItem(VISITS_KEY, JSON.stringify(visits));
      return true;`;

const replacement = `      const integrados = Array.from(integradosMap.values());
      localStorage.setItem(INTEGRADOS_KEY, JSON.stringify(integrados));
      localStorage.setItem(VISITS_KEY, JSON.stringify(visits));
      localStorage.setItem('LAST_SYNC_TIME', new Date().toISOString());
      window.dispatchEvent(new Event('sync-completed'));
      return true;`;

content = content.replace(target, replacement);

const targetEmpty = `      if (allData.length === 0) {
        localStorage.setItem(INTEGRADOS_KEY, JSON.stringify([]));
        localStorage.setItem(VISITS_KEY, JSON.stringify([]));
        return true;
      }`;
      
const replacementEmpty = `      if (allData.length === 0) {
        localStorage.setItem(INTEGRADOS_KEY, JSON.stringify([]));
        localStorage.setItem(VISITS_KEY, JSON.stringify([]));
        localStorage.setItem('LAST_SYNC_TIME', new Date().toISOString());
        window.dispatchEvent(new Event('sync-completed'));
        return true;
      }`;
      
content = content.replace(targetEmpty, replacementEmpty);

const targetSave = `          if (insertedRows.length === originalVisitsWithFakeIds.length) {
            for (let i = 0; i < insertedRows.length; i++) {
              originalVisitsWithFakeIds[i].id = insertedRows[i].id;
            }
            localStorage.setItem(VISITS_KEY, JSON.stringify(visits));
          }
        }
      }`;

const replacementSave = `          if (insertedRows.length === originalVisitsWithFakeIds.length) {
            for (let i = 0; i < insertedRows.length; i++) {
              originalVisitsWithFakeIds[i].id = insertedRows[i].id;
            }
            localStorage.setItem(VISITS_KEY, JSON.stringify(visits));
          }
        }
        localStorage.setItem('LAST_SYNC_TIME', new Date().toISOString());
        window.dispatchEvent(new Event('sync-completed'));
      }`;

content = content.replace(targetSave, replacementSave);

fs.writeFileSync('src/lib/storage.ts', content);
