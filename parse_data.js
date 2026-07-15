import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cnemtndccfppibecjuep.supabase.co';
const supabaseKey = 'sb_publishable_DhXoLwRfFz1txE63iFDdUg_TivovFvj';
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: previous } = await supabase
        .from('registros')
        .select('"Peso aloj"')
        .eq('Integrado', 'Avelino Casagrande')
        .not('Peso aloj', 'is', null)
        .order('Data', { ascending: false })
        .limit(1);
        
  console.log(previous);
}

main();
