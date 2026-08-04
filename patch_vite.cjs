const fs = require('fs');
let file = fs.readFileSync('vite.config.ts', 'utf-8');

const target = `            {
              urlPattern: /^https:\\/\\/cnemtndccfppibecjuep\\.supabase\\.co\\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'supabase-api-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
`;
file = file.replace(target, '');
fs.writeFileSync('vite.config.ts', file);
console.log('patched vite.config.ts');
