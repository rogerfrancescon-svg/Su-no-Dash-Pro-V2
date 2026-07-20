const fs = require('fs');
let content = fs.readFileSync('src/lib/storage.ts', 'utf8');

const targetSync = `        // 3. Process Upserts
        const queueStr = localStorage.getItem(OFFLINE_QUEUE_KEY);
        if (queueStr) {
          const queue = JSON.parse(queueStr);
          if (queue && queue.length > 0) {
            console.log('Pushing offline queue to Supabase before sync:', queue.length, 'records');
            await storage.saveVisits(getVisitsLocal(), queue);
            localStorage.removeItem(OFFLINE_QUEUE_KEY);
          }
        }
      } catch (e) {
        console.error('Error processing offline queue, aborting sync to protect local data:', e);
        return false; // MUST abort sync to prevent overwriting local pending data with server state!
      }`;

const replaceSync = `        // 3. Process Upserts
        const queueStr = localStorage.getItem(OFFLINE_QUEUE_KEY);
        if (queueStr) {
          const queue = JSON.parse(queueStr);
          if (queue && queue.length > 0) {
            console.log('Pushing offline queue to Supabase before sync:', queue.length, 'records');
            localStorage.removeItem(OFFLINE_QUEUE_KEY);
            await storage.saveVisits(getVisitsLocal(), queue);
          }
        }
        
        // Check if offline queue is still populated (meaning saveVisits hit a network error and re-queued)
        if (localStorage.getItem(OFFLINE_QUEUE_KEY) && JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) || '[]').length > 0) {
           console.warn('Offline queue was repopulated due to network error. Aborting sync to protect local pending data.');
           return false;
        }
        
      } catch (e) {
        console.error('Error processing offline queue, aborting sync to protect local data:', e);
        return false; // MUST abort sync to prevent overwriting local pending data with server state!
      }`;

content = content.replace(targetSync, replaceSync);
fs.writeFileSync('src/lib/storage.ts', content);
console.log('Successfully patched syncFromSupabase');
