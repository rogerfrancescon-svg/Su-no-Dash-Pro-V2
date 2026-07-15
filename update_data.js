import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://cnemtndccfppibecjuep.supabase.co';
const supabaseKey = 'sb_publishable_DhXoLwRfFz1txE63iFDdUg_TivovFvj';
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: records, error } = await supabase.from('registros').select('*').eq('Data', '2026-07-13');
  if (error) {
    console.error('Error fetching records:', error);
    return;
  }
  
  for (const record of records) {
    let animaisAlojados = null;
    let animaisMortos = record['Animais Mortos'];
    
    // Parse from recommendation
    const text = record['Recomendação'];
    const mortMatch = text.match(/Mortalidade.*?(\d+)\s*animais\s*de\s*(\d+)/i);
    if (mortMatch) {
      animaisMortos = parseInt(mortMatch[1], 10);
      animaisAlojados = parseInt(mortMatch[2], 10);
    } else {
      // Find from previous visits based on Integrado and Alojamento
      const { data: previous } = await supabase
        .from('registros')
        .select('"Animais Alojados"')
        .eq('Integrado', record.Integrado)
        .not('Animais Alojados', 'is', null)
        .order('Data', { ascending: false })
        .limit(1);
        
      if (previous && previous.length > 0) {
        animaisAlojados = previous[0]['Animais Alojados'];
      }
    }
    
    const updateData = {};
    if (animaisAlojados !== null) updateData['Animais Alojados'] = animaisAlojados;
    if (animaisMortos !== null) updateData['Animais Mortos'] = animaisMortos;
    
    if (Object.keys(updateData).length > 0) {
      console.log(`Updating ${record.Integrado} with`, updateData);
      const { error: updateErr } = await supabase
        .from('registros')
        .update(updateData)
        .eq('id', record.id);
        
      if (updateErr) {
        console.error(`Error updating ${record.Integrado}:`, updateErr);
      } else {
        console.log(`Successfully updated ${record.Integrado}`);
      }
    }
  }
}

main();
