const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://cnemtndccfppibecjuep.supabase.co', 'sb_publishable_DhXoLwRfFz1txE63iFDdUg_TivovFvj', {
  auth: { persistSession: false }
});

async function run() {
  const { data, error } = await supabase.from('registros').select('Data, Integrado, Alojamento');
  
  const map = {};
  data.forEach(r => {
    const key = `${r.Integrado}_${r.Data}_${r.Alojamento}`;
    if (!map[key]) map[key] = 0;
    map[key]++;
  });
  
  const dups = Object.entries(map).filter(([k, v]) => v > 1);
  console.log('Duplicates:', dups.slice(0, 10));
}
run();
