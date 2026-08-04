const fs = require('fs');
let file = fs.readFileSync('src/lib/storage.ts', 'utf-8');

const target1 = `      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        console.warn('Cannot sync from Supabase: Navigator is offline');
        return false;
      }`;

const replacement1 = `      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        console.warn('Cannot sync from Supabase: Navigator is offline');
        return false;
      }
      
      // Lock check: abort sync if user is currently editing a form
      if (typeof localStorage !== 'undefined' && localStorage.getItem('EDITING_LOCK') === 'true') {
        console.warn('Sync aborted because a form is currently being edited.');
        return false;
      }`;

file = file.replace(target1, replacement1);
fs.writeFileSync('src/lib/storage.ts', file);
console.log('patched storage');
