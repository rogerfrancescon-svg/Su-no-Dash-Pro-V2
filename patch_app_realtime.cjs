const fs = require('fs');
let file = fs.readFileSync('src/App.tsx', 'utf-8');

const target = `        async (payload) => {
          // If a change happens on the server, force a reload to get fresh data
          console.log('Realtime change detected:', payload);
          if (!isSyncing && !localStorage.getItem('EDITING_LOCK')) {
             await loadData();
          }
        }`;

const replacement = `        async (payload) => {
          // If a change happens on the server, force a reload to get fresh data
          console.log('Realtime change detected:', payload);
          
          const lastWriteStr = localStorage.getItem('LAST_WRITE_TIME');
          const lastWrite = lastWriteStr ? parseInt(lastWriteStr, 10) : 0;
          const now = Date.now();
          
          // Ignore realtime events if we recently performed a write (prevents replication lag overwrites)
          if (now - lastWrite < 10000) {
            console.log('Ignoring realtime event because a local write happened recently.');
            return;
          }
          
          if (!isSyncing && !localStorage.getItem('EDITING_LOCK')) {
             await loadData();
          }
        }`;

file = file.replace(target, replacement);
fs.writeFileSync('src/App.tsx', file);
console.log('patched app realtime');
