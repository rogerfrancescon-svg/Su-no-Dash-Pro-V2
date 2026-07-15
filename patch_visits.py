import os

with open('src/components/Visits.tsx', 'r') as f:
    content = f.read()

target_props = """  onNewLote?: () => void;
  onExport?: (data?: Visit[]) => void;
}"""

replacement_props = """  onNewLote?: () => void;
  onExport?: (data?: Visit[]) => void;
  onViewDetails?: (integradoId: string) => void;
}"""

content = content.replace(target_props, replacement_props)

target_args = """export function VisitsList({ visits, integrados, onEditVisit, onDeleteVisit, onNewVisit, onNewLote, onExport }: VisitsListProps) {"""
replacement_args = """export function VisitsList({ visits, integrados, onEditVisit, onDeleteVisit, onNewVisit, onNewLote, onExport, onViewDetails }: VisitsListProps) {"""

content = content.replace(target_args, replacement_args)

target_icon = """import { Search, ArrowUpDown, Download, Plus } from 'lucide-react';"""
replacement_icon = """import { Search, ArrowUpDown, Download, Plus, Eye } from 'lucide-react';"""

content = content.replace(target_icon, replacement_icon)

target_button = """                        <button 
                          onClick={() => {
                            setDeleteConfirmId(null);
                            onEditVisit(v.id);
                          }}"""

replacement_button = """                        <button
                          onClick={() => onViewDetails?.(v.integradoId)}
                          className="text-slate-600 hover:text-slate-900 text-xs font-semibold px-2 py-1 rounded hover:bg-slate-100 transition-colors flex items-center gap-1"
                          title="Ver Detalhes do Lote"
                        >
                          <Eye size={14} /> Detalhes
                        </button>
                        <button 
                          onClick={() => {
                            setDeleteConfirmId(null);
                            onEditVisit(v.id);
                          }}"""

content = content.replace(target_button, replacement_button)

with open('src/components/Visits.tsx', 'w') as f:
    f.write(content)
print("Patched Visits.tsx")
