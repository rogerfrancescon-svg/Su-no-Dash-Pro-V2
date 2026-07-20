const fs = require('fs');
let content = fs.readFileSync('src/lib/storage.ts', 'utf8');

content = content.replace("const OFFLINE_QUEUE_KEY = 'suino_dashpro_offline_queue';", "export const OFFLINE_QUEUE_KEY = 'suino_dashpro_offline_queue';");
content = content.replace("const OFFLINE_DELETE_INTEGRADO_QUEUE = 'suino_dashpro_offline_delete_integrado_queue';", "export const OFFLINE_DELETE_INTEGRADO_QUEUE = 'suino_dashpro_offline_delete_integrado_queue';");
content = content.replace("const OFFLINE_DELETE_VISIT_QUEUE = 'suino_dashpro_offline_delete_visit_queue';", "export const OFFLINE_DELETE_VISIT_QUEUE = 'suino_dashpro_offline_delete_visit_queue';");

fs.writeFileSync('src/lib/storage.ts', content);
