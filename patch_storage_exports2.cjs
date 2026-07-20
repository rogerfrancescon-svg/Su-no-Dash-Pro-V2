const fs = require('fs');
let content = fs.readFileSync('src/lib/storage.ts', 'utf8');

content = content.replace("const OFFLINE_DELETE_VISIT_QUEUE = 'suino_dashpro_offline_delete_visit';", "export const OFFLINE_DELETE_VISIT_QUEUE = 'suino_dashpro_offline_delete_visit';");
content = content.replace("const OFFLINE_DELETE_INTEGRADO_QUEUE = 'suino_dashpro_offline_delete_integrado';", "export const OFFLINE_DELETE_INTEGRADO_QUEUE = 'suino_dashpro_offline_delete_integrado';");

fs.writeFileSync('src/lib/storage.ts', content);
