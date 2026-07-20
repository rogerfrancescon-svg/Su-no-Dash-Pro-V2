const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `  const [isSyncing, setIsSyncing] = useState(false);`;
const replace = `  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(typeof window !== 'undefined' ? localStorage.getItem('LAST_SYNC_TIME') : null);
  const [lastSyncUser, setLastSyncUser] = useState<string | null>(typeof window !== 'undefined' ? localStorage.getItem('LAST_SYNC_USER') : null);

  useEffect(() => {
    const handleSyncCompleted = () => {
      setLastSyncTime(localStorage.getItem('LAST_SYNC_TIME'));
      setLastSyncUser(localStorage.getItem('LAST_SYNC_USER'));
    };
    window.addEventListener('sync-completed', handleSyncCompleted);
    return () => window.removeEventListener('sync-completed', handleSyncCompleted);
  }, []);`;

content = content.replace(target, replace);
fs.writeFileSync('src/App.tsx', content);
