const fs = require('fs');
let file = fs.readFileSync('src/lib/storage.ts', 'utf-8');

const target = `        // 3. Process Upserts
        const queueStr = localStorage.getItem(OFFLINE_QUEUE_KEY);
        if (queueStr) {
          const queue = JSON.parse(queueStr);
          if (queue && queue.length > 0) {
            console.log('Pushing offline queue to Supabase before sync:', queue.length, 'records');
            localStorage.removeItem(OFFLINE_QUEUE_KEY);
            await storage.saveVisits(getVisitsLocal(), queue);
          }
        }`;

const replacement = `        // 3. Process Upserts
        const queueStr = localStorage.getItem(OFFLINE_QUEUE_KEY);
        if (queueStr) {
          const queue = JSON.parse(queueStr);
          if (queue && queue.length > 0) {
            console.log('Pushing offline queue to Supabase before sync:', queue.length, 'records');
            localStorage.removeItem(OFFLINE_QUEUE_KEY);
            await storage.saveVisits(getVisitsLocal(), queue);
            
            // Check if queue was repopulated (network error)
            const newQueueStr = localStorage.getItem(OFFLINE_QUEUE_KEY);
            if (!newQueueStr || JSON.parse(newQueueStr).length === 0) {
                console.log('Offline queue pushed successfully. Skipping full SELECT to prevent replication lag overwrites.');
                window.dispatchEvent(new Event('sync-completed'));
                return true;
            }
          }
        }`;

file = file.replace(target, replacement);
fs.writeFileSync('src/lib/storage.ts', file);
console.log('patched storage 2');
