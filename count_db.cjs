const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://cnemtndccfppibecjuep.supabase.co', 'sb_publishable_DhXoLwRfFz1txE63iFDdUg_TivovFvj', {
  auth: { persistSession: false }
});

async function run() {
  const { count, error } = await supabase.from('registros').select('*', { count: 'exact', head: true });
  console.log('Total rows:', count, error);
}
run();
