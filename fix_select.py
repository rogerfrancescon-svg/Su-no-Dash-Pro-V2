import os
with open('src/components/VisitForm.tsx', 'r') as f:
    content = f.read()

# Remove Macho from first occurrence (comedouro)
content = content.replace(
    '<option value="Misto">Misto</option>\\n              <option value="Macho">Macho</option>',
    '<option value="Misto">Misto</option>'
)

# Add Macho to the correct select. The select for tipoLote has name="tipoLote"
# Let's find it.
tipo_lote_select = """            <select 
              name="tipoLote"
              value={formData.tipoLote || 'Misto'}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Misto">Misto</option>
              <option value="Fêmea">Fêmea</option>
            </select>"""
            
new_tipo_lote_select = tipo_lote_select.replace(
    '<option value="Fêmea">Fêmea</option>',
    '<option value="Fêmea">Fêmea</option>\n              <option value="Macho">Macho</option>'
)

content = content.replace(tipo_lote_select, new_tipo_lote_select)

with open('src/components/VisitForm.tsx', 'w') as f:
    f.write(content)
