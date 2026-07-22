const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://cnemtndccfppibecjuep.supabase.co', 'sb_publishable_DhXoLwRfFz1txE63iFDdUg_TivovFvj', {
  auth: { persistSession: false }
});

async function run() {
  const { data, error } = await supabase.from('registros').select('id, created_at, Data, Integrado, Alojamento').eq('Integrado', 'Darlan Silva').eq('Data', '2026-07-22');
  console.log(data);
}
run();
