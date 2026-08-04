const fs = require('fs');
const file = fs.readFileSync('src/App.tsx', 'utf-8');

const target = `  useEffect(() => {
    const handleSyncCompleted = () => {`;

const replacement = `  useEffect(() => {
    if (isVisitFormOpen) {
      localStorage.setItem('EDITING_LOCK', 'true');
      if (editingVisitId) {
        localStorage.setItem('EDITING_VISIT_ID', editingVisitId);
      } else {
        localStorage.removeItem('EDITING_VISIT_ID');
      }
    } else {
      localStorage.removeItem('EDITING_LOCK');
      localStorage.removeItem('EDITING_VISIT_ID');
    }
  }, [isVisitFormOpen, editingVisitId]);

  useEffect(() => {
    const handleSyncCompleted = () => {`;

const newFile = file.replace(target, replacement);
fs.writeFileSync('src/App.tsx', newFile);
console.log('patched app');
