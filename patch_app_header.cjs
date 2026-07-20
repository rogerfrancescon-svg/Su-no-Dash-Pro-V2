const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `<span className="text-sm text-slate-500 hidden sm:inline-block">Data de Campo: {new Date().toLocaleDateString('pt-BR')}</span>`;
const replace = `<div className="hidden lg:flex flex-col items-end justify-center mr-2">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Data: {new Date().toLocaleDateString('pt-BR')}</span>
              {lastSyncTime && (
                <span className="text-[10px] text-slate-400 whitespace-nowrap" title={\`Sincronizado por: \${lastSyncUser && lastSyncUser !== 'offline' ? lastSyncUser : 'Você'}\`}>
                  Última sinc: {new Date(lastSyncTime).toLocaleDateString('pt-BR')} {new Date(lastSyncTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  {lastSyncUser && lastSyncUser !== 'offline' && lastSyncUser !== 'Usuário logado' ? \` (\${lastSyncUser.split('@')[0]})\` : ''}
                </span>
              )}
            </div>`;

content = content.replace(target, replace);
fs.writeFileSync('src/App.tsx', content);
