const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://cnemtndccfppibecjuep.supabase.co', 'sb_publishable_DhXoLwRfFz1txE63iFDdUg_TivovFvj', {
  auth: { persistSession: false }
});

async function run() {
  const { data, error } = await supabase.from('registros').select('id, Data, Integrado, Alojamento');
  
  const map = {};
  data.forEach(r => {
    const key = `${r.Integrado}_${r.Data}_${r.Alojamento}`;
    if (!map[key]) map[key] = [];
    map[key].push(r.id);
  });
  
  let toDelete = [];
  Object.entries(map).forEach(([k, ids]) => {
    if (ids.length > 1) {
      // Keep first, delete rest
      toDelete.push(...ids.slice(1));
    }
  });
  
  console.log('Total duplicates to delete:', toDelete.length);
}
run();
